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
    const { movie_id, name, vote, text } = req.body;

    // DATE AND TIME PARAMS
    const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // QUERY PARAMS ARRAY
    const sqlParams = [movie_id, name, vote, text, currentDate, currentDate];

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

    // CALL INDEX QUERY
    connection.query(sqlStore, sqlParams, (err, results) => {

        // ERROR HANDLER
        if (err) {
            return errorHandler500(err, res);
        }

        // POSITIVE RESPONSE
        res.status(201).json({
            message: 'Review successfully posted',
            reviewId: result.insertId
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
