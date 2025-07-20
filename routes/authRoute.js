const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();

router.route("/register").post(userController.register);
router.route("/login").post(userController.login);
router.route("/logout").get(userController.logout);
router.route("/google").get(userController.googleAuth);
// router.route("/google/callback").get(userController.googleAuthCallback);

module.exports = router;
