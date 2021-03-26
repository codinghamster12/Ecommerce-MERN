const express= require('express');
const router= express.Router();
const {
addItemToCart, getCartItems,

}= require('../controllers/cart');
const { requireSignin, userMiddleware } = require('../common_middleware');


router.post('/user/cart/addtocart',requireSignin, userMiddleware, addItemToCart);
router.post('/user/cart/getCartItems', requireSignin, userMiddleware, getCartItems )


module.exports= router;