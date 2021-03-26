import React , { useState, useEffect} from "react";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import CartItem from "./CartItem";
import { addToCart, getCartItems } from '../../actions/cart'
import { useSelector, useDispatch } from "react-redux";
import "./style.css";

export default function CartPage(props) {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector(state => state.auth)
  // const cartItems = cart.cartItems;
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const dispatch= useDispatch();

  useEffect(() => {
    setCartItems(cart.cartItems)
  }, [cart.cartItems])

  useEffect(() => {
    if(auth.authenticate){
      console.log('cart page - get cart items')
      dispatch(getCartItems())
    }
  }, [auth.authenticate])

  const onQuantityIncrement = (_id, qty) => {
    const { name, price, img }= cartItems[_id]
    dispatch(addToCart({ _id,name, price, img}, 1))

  }

  const onQuantityDecrement = (_id, qty) => {
    const { name, price, img }= cartItems[_id]
    dispatch(addToCart({ _id,name, price, img}, -1))

  }

  return (
    <Layout>
      <div className="cartContainer">
        <Card
          headerLeft={"My Cart"}
          headerRight={<div>Deliver to</div>}
          style={{ width: 'calc(100% - 40px)',
          height: '100%',
          margin: '20px'}}>
        
          {Object.keys(cartItems).map((item, index) => (
            <div key={index} className="flexRow">
              <CartItem 
              key={index}
              cartItem={cartItems[item]}
              onQuantityInc= {onQuantityIncrement}
              onQuantityDec= {onQuantityDecrement}/>
            </div>
          ))}
        </Card>
        <Card 
        headerLeft={"Price"} 
        style={{ width: "500px" }}>
        </Card>
      </div>
    </Layout>
  );
}
