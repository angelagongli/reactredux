const router = require("express").Router();
const pieceRoutes = require("./pieces");

router.use("/pieces", pieceRoutes);

module.exports = router;
