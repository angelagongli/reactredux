const router = require("express").Router();
const pieceController = require("../../controllers/pieceController");

router.route("/")
    .get(pieceController.findAll);

router.route("/:id")
    .put(pieceController.update);

module.exports = router;
