const express= require('express');
const router= express.Router();
const {
addItemToCart
}= require('../controllers/cart');
const { requireSignin, userMiddleware } = require('../common_middleware');


router.post('/user/cart/addtocart',requireSignin, userMiddleware, addItemToCart);


module.exports= router;