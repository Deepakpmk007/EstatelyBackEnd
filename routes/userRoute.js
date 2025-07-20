const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();

router.route("/").get(userController.getAllUser);
router.route("/:id").get(userController.getUserById);
router.route("/:id").patch(userController.updateUser);
router.route("/:id").delete(userController.deleteUser);

// router.route("/google/callback").get(userController.googleAuthCallback);

module.exports = router;
