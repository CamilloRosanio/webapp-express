// DICHIARAZIONE INIT EXPRESS
const express = require('express');
const router = express.Router();


// IMPORT CONTROLLER
// NOTES_1.1.1
const { index, show } = require('../controllers/moviesController');


// DICHIARAZIONE ROUTES
router.get('/', index);
router.get('/:id', show);


// EXPORT ROUTER
module.exports = router;