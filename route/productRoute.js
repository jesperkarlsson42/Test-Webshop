const {
  addProductForm,
  addProductFormSubmit,
  showProducts,
  addToShoppingCart,
} = require("../controller/productController");

const express = require("express");
const router = express.Router();

router.get("/addProduct", addProductForm);
router.post("/addProduct", addProductFormSubmit);
router.get("/showProducts", showProducts);
router.get("/showShoppingCart", addToShoppingCart);
router.get("/addToCart/:id", addToShoppingCart);

module.exports = router;
