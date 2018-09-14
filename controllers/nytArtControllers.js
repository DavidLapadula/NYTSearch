const db = require("../models");

// Defining methods for the articlesController
module.exports = {
    create: function (req, res) {
        const article = {
            title: req.body.title,
            url: req.body.url,
            date: req.body.date
        };
        db.Article
            .create(article)
            .then(dbArticle => res.json(dbArticle))
            .catch(err => res.status(422).json(err));
    },
    findAll: function (req, res) {
        db.Article
            .find(req.query)
            .then(dbArticle => res.json(dbArticle))
            .catch(err => res.status(422).json(err));
    }, 
    
    delete: function (req, res) {
        db.Article
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    }
};