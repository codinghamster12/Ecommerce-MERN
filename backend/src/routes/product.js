const express= require('express');
const router= express.Router();
//const { addCategory, getCategories } = require('../controllers/category');
const { requireSignin, adminMiddleware } = require('../common_middleware');
const { createProduct, getProductsBySlug }= require('../controllers/product');
const multer= require('multer');
const path= require('path');
const shortid= require('shortid');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })
   
const upload = multer({ storage })

const Product= require('../models/product');

router.post('/product/create',requireSignin, adminMiddleware, upload.array('productPicture'), createProduct);
router.get('/products/:slug', getProductsBySlug)
//router.get('/category/getCategories', getCategories);


module.exports= router;