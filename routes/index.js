const router = require('express').Router();

router.use("/auth", require("./auth.route"));
router.use("/restaurant", require('./restaurant.route'));


module.exports = router;