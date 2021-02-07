const router = require("express").Router();
const pieceRoutes = require("./pieces");
const moveRoutes = require("./moves");

router.use("/pieces", pieceRoutes);
router.use("/moves", moveRoutes);

module.exports = router;
