// DICHIARAZIONE INIT EXPRESS
const express = require('express');
const app = express();


// IMPORT ENV
// NOTES_1.1.1
const { APP_HOST, APP_PORT } = process.env;

const config = {
    APP_HOST: APP_HOST || 'http://localhost',
    APP_PORT: APP_PORT || '3000'
};


// REGISTERING MIDDLEWARES
// NOTES_2.1.1
app.use(express.json());
app.use(express.static('public'));


// REGISTERING ROUTES
// NOTES_1.1.2
const moviesRouter = require('./routers/moviesRouter');
app.use('/movies', moviesRouter);


// SERVER LISTENING
app.listen(config.APP_PORT, () => {
    console.log(`Server listening at: ${config.APP_HOST}:${config.APP_PORT}`)
});