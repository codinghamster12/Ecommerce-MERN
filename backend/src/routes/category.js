const express= require('express');
const router= express.Router();
const { addCategory, getCategories, updateCategories, deleteCategories } = require('../controllers/category');
const { requireSignin, adminMiddleware } = require('../common_middleware');

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

router.post('/category/create',requireSignin, adminMiddleware, upload.single('categoryImage'), addCategory)
router.get('/category/getCategories', getCategories);
router.post('/category/update',upload.array('categoryImage'), updateCategories)
router.post('/category/delete', deleteCategories)




module.exports= router;