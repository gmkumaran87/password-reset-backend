const express = require("express");
const {
    registerUser,
    forgotPassword,
    resetPassword,
} = require("../controllers/auth");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:userId/:randomStr").post(resetPassword);

module.exports = router;