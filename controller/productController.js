const Product = require("../model/product");
//const User = require("../model/user");
require("dotenv").config();
//const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const addProductForm = (req, res) => {

res.render("productForm.ejs", {err:" "})
}

const addProductFormSubmit = async (req, res) => {

    const {name, description, price} = req.body

    const product = await new Product({name:name, description:description, price:price}).save();

    //const user = await User.findOne({_id:req.user.user._id})

    // user.addCourseList(course._id);
    // console.log(user)

    res.redirect("/showProducts")
}

const showProducts = async (req, res) => {

    const products = await Product.find()

    res.render("productPage.ejs", {products: products, err: " "})
}

module.exports = {addProductForm, addProductFormSubmit, showProducts}
