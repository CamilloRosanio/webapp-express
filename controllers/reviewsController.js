/******************************************************************************
# SETUP
******************************************************************************/

// IMPORT DB CONNECTION
const connection = require('../db/connectionDB_movies');


// IMPORT ENV + DEFAULT
const { APP_HOST, APP_PORT } = process.env;

if (!APP_HOST || !APP_PORT) {
    console.log('Missing ENV variables');
}

const config = {
    APP_HOST: APP_HOST || 'http://localhost',
    APP_PORT: APP_PORT || '3000'
};


/******************************************************************************
# CRUD
******************************************************************************/

// INDEX
function store(req, res) {

    // REQUEST BODY PARAMS
    const { movie_id, name, vote, text, created_at, updated_at } = req.body;

    // ERROR HANDLER
    const validationError = paramsValidation({ movie_id, name, vote, text, created_at, updated_at });
    if (validationError) {
        return res.status(400).json(validationError);
    };

    // QUERY PARAMS ARRAY
    const sqlParams = [movie_id, name, vote, text, created_at, updated_at];

    // SQL STORE QUERY
    let sqlStore = `
    INSERT INTO movies.reviews (
        movie_id,
        name,
        vote,
        text,
        created_at,
        updated_at)
    VALUES (?, ?, ?, ?, ?, ?);`;

    // CALL STORE QUERY
    connection.query(sqlStore, sqlParams, (err, results) => {

        // ERROR HANDLER
        if (err) {
            return errorHandler500(err, res);
        }

        // POSITIVE RESPONSE
        res.status(201).json({
            message: 'Review successfully posted',
            reviewId: results.insertId
        });
    });
};


// EXPORT CRUD
module.exports = { store };


/******************************************************************************
# UTILITY FUNCTIONS
******************************************************************************/

// ERROR HANDLER (500)
const errorHandler500 = (err, res) => {
    if (err) {
        console.error(err);
        return res.status(500).json({
            status: 'KO',
            message: 'Database query failed'
        });
    }
};

// PARAMS VALIDATION
function paramsValidation({ movie_id, name, vote, text, created_at, updated_at }) {

    // WORDS BLACKLIST
    const forbiddenWords = ['parolaccia', 'insulto'];

    // VALIDATION - MOVIE_ID
    if (!movie_id) {
        return {
            status: 'KO',
            message: 'Invalid field: movie_id',
            validation_details: 'movie_id is required and must be of "int" type.'
        };
    }

    // VALIDATION - NAME
    if (!name || typeof name !== 'string' || name.length > 255) {
        return {
            status: 'KO',
            message: 'Invalid field: name',
            validation_details: 'name is required and must be a string of 255 characters max.'
        };
    }

    for (let word of forbiddenWords) {
        if (name.toLowerCase().includes(word.toLowerCase())) {
            return {
                status: 'KO',
                message: 'Invalid field: name',
                validation_details: `name cannot contain blacklisted words like '${word}'.`
            };
        }
    }

    // VALIDATION - VOTE
    if (!vote || typeof vote !== 'number' || vote < 1 || vote > 5) {
        return {
            status: 'KO',
            message: 'Invalid field: vote',
            validation_details: 'vote is required and must be a number between 1 and 5.'
        };
    }

    // VALIDATION - TEXT
    if (!text || typeof text !== 'string') {
        return {
            status: 'KO',
            message: 'Invalid field: text',
            validation_details: 'text is required and must be a string.'
        };
    }

    for (let word of forbiddenWords) {
        if (text.toLowerCase().includes(word.toLowerCase())) {
            return {
                status: 'KO',
                message: 'Invalid field: text',
                validation_details: `text cannot contain blacklisted words like '${word}'.`
            };
        }
    }

    // VALIDATION - CREATED_AT
    const timestampRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    if (!created_at || !timestampRegex.test(created_at)) {
        return {
            status: 'KO',
            message: 'Invalid field: created_at',
            validation_details: 'created_at is required and must be in the format "YYYY-MM-DD HH:MM:SS".'
        };
    }

    // VALIDATION - UPDATED_AT
    if (!updated_at || !timestampRegex.test(updated_at)) {
        return {
            status: 'KO',
            message: 'Invalid field: updated_at',
            validation_details: 'updated_at is required and must be in the format "YYYY-MM-DD HH:MM:SS".'
        };
    }

    // END OF VALIDATION
    return null;
};

