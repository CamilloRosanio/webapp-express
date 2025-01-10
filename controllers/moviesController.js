/******************************************************************************
# SETUP
******************************************************************************/

// IMPORT DB CONNECTION
const connection = require('../db/connectionDB_movies');


// IMPORT ENV + DEFAULT
const { APP_HOST, APP_PORT } = process.env;

const config = {
    APP_HOST: APP_HOST || 'http://localhost',
    APP_PORT: APP_PORT || '3000'
};


/******************************************************************************
# CRUD
******************************************************************************/

// INDEX
function index(req, res) {

    // SQL QUERY
    let sqlIndex = `
    SELECT 
        id,
        title,
        image
    FROM movies.movies`;

    // CALL INDEX QUERY
    connection.query(sqlIndex, (err, results) => {

        // ERROR HANDLER
        // NOTES_1.1.1
        errorHandler500(err);

        // ITEMS IMAGE PATH MAPPING
        const movies = results.map(movie => ({
            ...movie,
            image: generateCompleteImagePath(movie.image)
        }));

        // POSITIVE RESPONSE
        res.json({
            status: 'OK',
            movies: movies
        });
    })
};


// SHOW
function show(req, res) {

    // URL PARAMETER
    const id = req.params.id;

    // SQL QUERY
    const sqlShow = `
    SELECT 
        id,
        title,
        image,
        abstract
    FROM movies.movies
    WHERE id = ?`;

    // CALL SHOW QUERY
    connection.query(sqlShow, [id], (err, results) => {

        // ERROR HANDLER
        errorHandler500(err);

        const [movie] = results;

        // ITEM IMAGE PATH MAPPING
        movie.image = generateCompleteImagePath(movie.image);

        // REVIEWS QUERY
        const sqlIndexReviews = `
            SELECT 
                id,
                name,
                vote,
                text
            FROM movies.reviews
            WHERE movie_id = ?`;

        // CALL INDEX REVIEWS QUERY
        connection.query(sqlIndexReviews, [id], (err, results) => {

            // ERROR HANDLER
            errorHandler500(err);

            // PROPERTY ADDED TO THE ELEMENT
            movie.reviews = results;

            // POSITIVE RESPONSE
            res.json(movie);
        });
    });
};


// EXPORT CRUD
module.exports = { index, show };


/******************************************************************************
# UTILITY FUNCTIONS
******************************************************************************/

// IMAGE PATH MAPPING
// NOTES_1.1.2
const generateCompleteImagePath = (imageName) => (
    `${config.APP_HOST}:${config.APP_PORT}/img/movies_cover/${imageName}`
);

// ERROR HANDLER (500)
const errorHandler500 = (err) => {
    if (err) {
        console.log(err);
        return res.status(500).json({
            status: 'KO',
            message: 'Database query failed'
        })
    };
};