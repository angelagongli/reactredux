const path = require("path");
const router = require("express").Router();
const APIRoutes = require("./api");

router.use("/api", APIRoutes);

router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
