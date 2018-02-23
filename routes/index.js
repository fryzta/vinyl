'use strict';

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('pages/index');
    });

    app.get('/about', function(req, res) {
        res.render('pages/about');
    });

    app.get('/article1', function(req, res) {
        res.render('pages/article1');
    });

    app.get('/article2', function(req, res) {
        res.render('pages/article2');
    });

    app.get('/article3', function(req, res) {
        res.render('pages/article3');
    });
};
