const express= require('express');
const router= express.Router();
const { requireSignin, adminMiddleware } = require('../../common_middleware')
const { getInitialData } = require('../../controllers/initialData');

router.post('/initialData',requireSignin, adminMiddleware, getInitialData)

module.exports= router;