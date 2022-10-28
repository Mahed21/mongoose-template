const express = require("express");
const productController = require("../controller/Product.Controller");
const router = express.Router();
router
  .route("/")
  .get(productController.getProduct)
  .post(productController.createProduct);

router.route("/update-many").patch(productController.updateProductMany);

//dynamic route always to be bellow of all route
router.route("/:id").patch(productController.updateContorller);

module.exports = router;
