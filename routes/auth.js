const express = require("express");
const { registerUser, forgotPassword } = require("../controllers/auth");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/forgot-password").post(forgotPassword);

module.exports = router;