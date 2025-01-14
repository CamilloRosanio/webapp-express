// DICHIARAZIONE INIT EXPRESS
const express = require('express');
const router = express.Router();


// IMPORT CONTROLLER
const { store } = require('../controllers/reviewsController');


// DICHIARAZIONE ROUTES
router.post('/', store);


// EXPORT ROUTER
module.exports = router;