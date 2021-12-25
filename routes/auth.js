const express = require("express");
const {
    registerUser,
    forgotPassword,
    updatePassword,
    emailValidation,
} = require("../controllers/auth");

const router = express.Router();

router.route("/").post(registerUser);
router.route("/forgot-password").post(forgotPassword);
router.route("/update-password").post(updatePassword);
router.route("/email-validation/:userId/:randomStr").post(emailValidation);

module.exports = router;