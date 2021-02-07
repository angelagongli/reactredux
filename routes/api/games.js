const router = require("express").Router();
const gameController = require("../../controllers/gameController");

router.route("/")
    .get(gameController.findAll)
    .post(gameController.create);

router.route("/:id")
    .put(gameController.update);

module.exports = router;
