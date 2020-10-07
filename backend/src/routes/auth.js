const express= require('express');
const {
    signup,
    signin,
    
} = require('../controllers/auth');
const router= express.Router();
const { validateRequestSignup, validateRequestSignin,  isRequestValidated }= require('../validators/auth');


router.post('/signup',validateRequestSignup, isRequestValidated, signup('user'));

router.post('/signin', validateRequestSignin, isRequestValidated, signin('user'));



module.exports= router;