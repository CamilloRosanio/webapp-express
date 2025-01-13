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

    // URL QUERY (ARGUMENTS AS FILTERS)
    const filterTitle = req.query.title;
    const filterGenre = req.query.genre;

    // SQL INDEX QUERY
    let sqlIndex = `
    SELECT 
        movies.id,
        movies.title,
        movies.image,
        AVG(reviews.vote) AS vote_avg
    FROM movies.movies
    JOIN movies.reviews
    ON movies.id = reviews.movie_id
    GROUP BY movies.id`;

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

        // ERROR HANDLER 500
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

    // SQL SHOW QUERY
    const sqlShow = `
    SELECT 
        movies.id,
        movies.title,
        movies.image,
        movies.abstract,
        AVG(reviews.vote) AS vote_avg
    FROM movies.movies
    JOIN movies.reviews
    ON movies.id = reviews.movie_id
    GROUP BY movies.id
    HAVING id = ?`;

    // CALL SHOW QUERY
    connection.query(sqlShow, [id], (err, results) => {

        // ERROR HANDLER 500
        errorHandler500(err);

        const [movie] = results;

        // ERROR HANDLER 404
        errorHandler404(movie);

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
        // NOTES_1.1.3
        connection.query(sqlIndexReviews, [id], (err, results) => {

            // ERROR HANDLER 500
            errorHandler500(err);

            // PROPERTY ADDED TO THE ELEMENT
            movie.reviews = results;

            // POSITIVE RESPONSE
            res.json(movie);
        });
    });
};

// DESTROY
function destroy(req, res) {

    // // URL PARAMETER
    // const id = req.params.id;

    // // SQL DESTROY QUERY
    // const sqlDestroy = `
    // DELETE 
    // FROM movies.movies
    // WHERE id = ?`;

    // // CALL DESTROY QUERY
    // connection.query(sqlDestroy, [id], (err, results) => {

    //     // ERROR HANDLER 500
    //     errorHandler500(err);

    //     // POSITIVE RESPOSE
    //     res.json({
    //         status: 'OK',
    //         message: `Item with ID ${id} deleted`
    //     });
    // });

    // CRUD disabled
    res.json({
        status: 'RESTRICTED',
        message: `DESTROY CRUD disabled`
    });
};

// EXPORT CRUD
module.exports = { index, show, destroy };


/******************************************************************************
# UTILITY FUNCTIONS
******************************************************************************/

// IMAGE PATH MAPPING
// NOTES_1.1.2
const generateCompleteImagePath = (imageName) => (
    `${config.APP_HOST}: ${config.APP_PORT} / img / movies_cover / ${imageName}`
);

// ERROR HANDLER (500)
const errorHandler500 = (err, res) => {
    if (err) {
        console.log(err);
        return res.status(500).json({
            status: 'KO',
            message: 'Database query failed'
        })
    };
};

// ERROR HANDLER (404)
// NOTES_1.1.4
const errorHandler404 = (item) => {
    if (!item) {
        return res.status(404).json({
            status: 'KO',
            message: 'Not found'
        })
    };
};