const {
  addProductForm,
  addProductFormSubmit,
  showProducts,
  addToShoppingCart,
  checkout
} = require("../controller/productController");

const express = require("express");
const router = express.Router();
const verifyUser = require("../middleware/verifyUser");

router.get("/addProduct", verifyUser, addProductForm);
router.post("/addProduct", verifyUser, addProductFormSubmit);
router.get("/showProducts", verifyUser, showProducts);
router.get("/showShoppingCart", verifyUser, addToShoppingCart);
router.get("/addToCart/:id", verifyUser, addToShoppingCart);
router.get("/checkout", verifyUser, checkout);

module.exports = router;
