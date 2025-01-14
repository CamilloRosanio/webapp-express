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
function index(req, res) {

    // URL QUERY (ARGUMENTS AS FILTERS)
    const filterTitle = req.query.title;
    const filterGenre = req.query.genre;

    // SQL INDEX QUERY
    let sqlIndex = `
    SELECT 
        id,
        title,
        image
    FROM movies.movies`;

    // FILTERS ARRAY
    let filtersArray = [];
    let firstFilter = true;

    if (filterTitle) {
        sqlIndex += ` ${firstFilter ? `WHERE` : `AND`} title LIKE ?`;
        filtersArray.push(`%${filterTitle}%`);
        firstFilter = false;
    }

    if (filterGenre) {
        sqlIndex += ` ${firstFilter ? `WHERE` : `AND`} genre LIKE ?`;
        filtersArray.push(`%${filterGenre}%`);
        firstFilter = false;
    }

    // CALL INDEX QUERY
    connection.query(sqlIndex, filtersArray, (err, results) => {

        // ERROR HANDLER
        if (err) {
            return errorHandler500(err, res);
        }

        const movies = results.map(movie => ({
            ...movie,
            image: generateCompleteImagePath(movie.image)
        }));

        // POSITIVE RESPONSE
        res.json({
            status: 'OK',
            movies: movies
        });
    });
};


// SHOW
function show(req, res) {

    // URL PARAMETER
    const id = req.params.id;

    // SQL SHOW QUERY
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
        if (err) {
            return errorHandler500(err, res);
        }

        // ERROR HANDLER
        if (results.length === 0) {
            return errorHandler404(null, res);
        }

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
        connection.query(sqlIndexReviews, [id], (err, reviewResults) => {

            // ERROR HANDLER
            if (err) {
                return errorHandler500(err, res);
            }

            // PROPERTY ADDED TO THE ELEMENT
            movie.reviews = reviewResults;

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
const generateCompleteImagePath = (imageName) => {
    if (!imageName) {
        return `${config.APP_HOST}:${config.APP_PORT}/img/movies_cover/default.jpg`;
    }
    return `${config.APP_HOST}:${config.APP_PORT}/img/movies_cover/${imageName}`;
};

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

// ERROR HANDLER (404)
const errorHandler404 = (item, res) => {
    if (!item) {
        return res.status(404).json({
            status: 'KO',
            message: 'Not found'
        });
    }
};
