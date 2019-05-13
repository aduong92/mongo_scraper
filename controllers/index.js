'use strict';


// dependencies
const express = require('express'),
      router = express.Router(),
      Article = require('../models/article');

//routes
// root route
router.get('/', function(req, res) {
    Article
        .find({})
        .where('saved').equals(false)
        .where('deleted').equals(false)
        .sort('-date')
        .limit(20)
        .exec(function(error, articles) {
            if (error) {
                console.log(error);
                res.status(500);
            } else {
                console.log(articles);
                let hbsObj = {
                    title: 'News Scraper',
                    subtitle: 'All the News That is Fit To Scrape',
                    articles: articles
                };
                res.render('index', hbsObj);
            }
        });
});

// saved articles
router.get('/saved', function(req, res) {
    Article
        .find({})
        .where('saved').equals(true)
        .where('deleted').equals(false)
        .populate('notes')
        .sort('-date')
        .exec(function(error, articles) {
            if (error) {
                console.log(error);
                res.status(500);
            } else {
                console.log(articles);
                let hbsObj = {
                    title: 'News Scraper',
                    subtitle: 'Saved Articles',
                    articles: articles
                };
                res.render("saved" ,hbsObj);
            }
        });
});

// require controllers aka api
router.use('/api', require('./api'));

module.exports = router;