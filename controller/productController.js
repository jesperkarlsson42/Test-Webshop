const Product = require("../model/product");
const User = require("../model/user");
require("dotenv").config();
//const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const addProductForm = (req, res) => {
  res.render("productForm.ejs", { err: " " });
};

const addProductFormSubmit = async (req, res) => {
  const { name, description, price } = req.body;

  const product = await new Product({
    name: name,
    description: description,
    price: price,
  }).save();

  const user = await User.findOne({ _id: req.user.user._id });

  user.addProductList(product._id);
  //console.log(user)

  res.redirect("/showProducts");
};

const showProducts = async (req, res) => {
  const products = await Product.find();

  res.render("productPage.ejs", { err: " ", products: products });
};

const addToShoppingCart = async (req, res) => {
  const productId = req.params.id;
  //console.log("hej", req.user.user)

  const user = await User.findOne({ _id: req.user.user._id });
  //console.log("hej", user)

  user.addToCart(productId);
  //console.log(user);

  const userWithProductData = await User.findOne({
    _id: req.user.user._id,
  }).populate("shoppingCart");
  //console.log(userWithProductData.shoppingCart)
  res.render("shoppingCart.ejs", {
    cartItem: userWithProductData.shoppingCart,
    err: "",
  });
};

module.exports = {
  addProductForm,
  addProductFormSubmit,
  showProducts,
  addToShoppingCart
};
