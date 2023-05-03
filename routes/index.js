const express = require("express");
const router = express.Router();
const home = require("./modules/home");
const records = require("./modules/records");
const users = require("./modules/users");
const { authenticator } = require("../middleware/auth.js");



//要注意載入的順序
router.use("/users", users);
router.use("/records", authenticator, records);
router.use("/", authenticator, home);

module.exports = router;