// DICHIARAZIONE DELLE ROUTES

function index(req, res) {
    res.json({
        message: 'movies INDEX'
    });
};


// EXPORT ROUTES
module.exports = { index };