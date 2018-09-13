const router = require("express").Router();
const articlesController = require("../../controllers/nytartControllers");

// Matches with "/api/saved"
router.route("/")
    .get(articlesController.findAll)
    .post(articlesController.create);

// Matches with "/api/saved/:id"
router
    .route("/:id"); 
//     .get(articlesController.findById)
//     .put(articlesController.update)
//     .delete(articlesController.remove);

module.exports = router;