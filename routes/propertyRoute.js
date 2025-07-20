const express = require("express");
const propertyController = require("../controller/propertyConteoller");
const auth = require("../middleware/auth");

const router = express.Router();

router
  .route("/")
  .get(propertyController.getAllProperty)
  .post(auth.ensureAuthenticated, propertyController.createProperty);
router
  .route("/:id")
  .get(propertyController.getProperty)
  .patch(auth.ensureAuthenticated, propertyController.updateProperty);

module.exports = router;
