const router = require("express").Router();
const moveController = require("../../controllers/moveController");

router.route("/")
    .get(moveController.findAll)
    .post(moveController.create);

router.route("/:id")
    .get(moveController.findAllByGame);

module.exports = router;
