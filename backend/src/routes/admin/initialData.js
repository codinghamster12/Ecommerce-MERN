const express= require('express');
const router= express.Router();
const { getInitialData } = require('../../controllers/initialData');

router.post('/initialData', getInitialData)

module.exports= router;