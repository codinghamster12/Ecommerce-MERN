import React , { useState, useEffect} from "react";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import CartItem from "./CartItem";
import { addToCart } from '../../actions/cart'
import { useSelector, useDispatch } from "react-redux";
import "./style.css";

export default function CartPage(props) {
  const cart = useSelector((state) => state.cart);
  // const cartItems = cart.cartItems;
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const dispatch= useDispatch();

  useEffect(() => {
    setCartItems(cart.cartItems)
  }, [cart.cartItems])

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
