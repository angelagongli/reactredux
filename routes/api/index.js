const router = require("express").Router();
const pieceRoutes = require("./pieces");
const moveRoutes = require("./moves");
const gameRoutes = require("./games");

router.use("/pieces", pieceRoutes);
router.use("/moves", moveRoutes);
router.use("/games", gameRoutes);

module.exports = router;
