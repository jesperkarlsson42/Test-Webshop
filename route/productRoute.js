const {
  addProductForm,
  addProductFormSubmit,
  showProducts,
  addToShoppingCart
} = require("../controller/productController");

const express = require("express");
const router = express.Router();
const verifyUser = require("../middleware/verifyUser");

router.get("/addProduct", addProductForm, verifyUser);
router.post("/addProduct", addProductFormSubmit, verifyUser);
router.get("/showProducts", showProducts, verifyUser);
router.get("/showShoppingCart", addToShoppingCart, verifyUser);
router.get("/addToCart/:id", addToShoppingCart, verifyUser);

module.exports = router;
