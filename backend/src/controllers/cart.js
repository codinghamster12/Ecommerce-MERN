const Cart = require("../models/cart");

function runUpdate(condition, updateData) {
  return new Promise((resolve, reject) => {
    Cart.findOneAndUpdate(condition, updateData, { upsert: true })
      .then((result) => resolve())
      .catch((err) => reject(err));
  });
}
exports.addItemToCart = (req, res) => {
  Cart.findOne({ user: req.user._id }).exec((error, cart) => {
    if (error)
      return res.status(400).json({
        error,
      });
    if (cart) {
      let promiseArray = [];
      req.body.cartItems.forEach((cartItem) => {
        const product = cartItem.product;
        console.log(product)
        const item = cart.cartItems.find((c) => c.product == product);
        console.log(item)
        let condition, update;

        if (item) {
          condition = { user: req.user._id, "cartItems.product": product };
          update = {
            $set: {
              "cartItems.$": cartItem,
            },
          };
        } else {
          condition = { user: req.user._id };
          update = {
            $push: {
              "cartItems": cartItem,
            },
          };
        }

        promiseArray.push(runUpdate(condition, update));
      });

      Promise.all(promiseArray)
        .then((response) =>
          res.status(201).json({
            response,
          })
        )
        .catch((err) => res.status(400).json({ error }));
    } else {
      //if cart not exists then craete a new cart.
      const cart = new Cart({
        user: req.user._id,
        cartItems: req.body.cartItems,
      });

      cart.save((error, cart) => {
        if (error) {
          return res.status(400).json({
            error,
          });
        }
        if (cart) {
          return res.status(201).json({
            cart,
          });
        }
      });
    }
  });
};

exports.getCartItems = (req, res) => {
  Cart.findOne({ user: req.user._id })
  .populate('cartItems.product', '_id name price productPictures')
  .exec((error, cart) => {
    if(error) return res.status(400).json({ error })
    if(cart){
      let cartItems={};
      cart.cartItems.forEach((item, index) => {
        cartItems[item.product._id.toString()]={
          _id: item.product._id.toString(),
          name: item.product.name,
          img: item.product.productPictures[0].img,
          price: item.product.price,
          qty: item.quantity

        }

      })

      return res.status(200).json({
        cartItems

      })
     
    }
    else{
      return res.status(400).json({
        message: 'No items in cart'
      })
    }

  })
};
