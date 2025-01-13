// DICHIARAZIONE INIT EXPRESS
const express = require('express');
const router = express.Router();


// IMPORT CONTROLLER
// NOTES_1.1.1
const { index, show, destroy } = require('../controllers/moviesController');


// DICHIARAZIONE ROUTES
router.get('/', index);
router.get('/:id', show);
router.delete('/:id', destroy);


// EXPORT ROUTER
module.exports = router;