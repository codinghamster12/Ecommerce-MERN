const express= require('express');
const {
    signup,
    signin,
    signout
    
} = require('../../controllers/auth');
const { requireSignin }= require('../../common_middleware');
const router= express.Router();
const { validateRequestSignup, validateRequestSignin, isRequestValidated }= require('../../validators/auth');



router.post('/admin/signup', validateRequestSignup, isRequestValidated, signup('admin'));

router.post('/admin/signin',validateRequestSignin, isRequestValidated, signin('admin'));
router.post('/admin/signout', signout)


module.exports= router;