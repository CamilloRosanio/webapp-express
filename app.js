// DICHIARAZIONE INIT EXPRESS
const express = require('express');
const app = express();


// IMPORT ENV + DEFAULT
// NOTES_1.1.1
const { APP_HOST, APP_PORT } = process.env;

const config = {
    APP_HOST: APP_HOST || 'http://localhost',
    APP_PORT: APP_PORT || '3000'
};


// REGISTERING CORS
// NOTES_4.1.1
const cors = require('cors');
const corsOptions = {
    origin: 'http://localhost:5173',
    optionSuccessStatus: 200
};


// REGISTERING MIDDLEWARES
// NOTES_2.1.1
app.use(express.json());
app.use(express.static('public'));
app.use(cors(corsOptions));


// REGISTERING ROUTES
// NOTES_1.1.2
const moviesRouter = require('./routers/moviesRouter');
// NOTES_1.1.3
app.use('/api/movies', moviesRouter);


// ERROR HANDLERS
// NOTES_3.1.1
const notFound = require('./middlewares/notFound');
app.use(notFound);

const errorsHandler = require('./middlewares/errorsHandler');
app.use(errorsHandler);


// SERVER LISTENING
app.listen(config.APP_PORT, () => {
    console.log(`Server listening at: ${config.APP_HOST}:${config.APP_PORT}`)
});