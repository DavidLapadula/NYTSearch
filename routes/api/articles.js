const router = require("express").Router();
const articlesController = require("../../controllers/nytArtControllers");

// Matches with "/api/articles"
router
    .route("/")
    .get(articlesController.findAll)
    .post(articlesController.create);

// Matches with "/api/articles/:id"
router
    .route("/:id")
    .delete(articlesController.delete);

module.exports = router;