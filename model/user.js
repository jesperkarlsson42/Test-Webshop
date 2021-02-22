const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {type:String, required: true, unique: true},
    email: {type:String, required: true, unique: true},
    password: {type:String, required: true},
    token: String,
    tokenExpiration: Date,
    shoppingCart: [
        {
        type:mongoose.Schema.Types.ObjectId,
        ref: "product"
    }
],
productList: [{
    type:mongoose.Schema.Types.ObjectId,
    ref: "product"
}]
})

userSchema.methods.addToCart = function(productId) {
    //pushar in i shoppingCart
    this.shoppingCart.push(productId)
    //Filtrera data så att användare inte kan lägga till samma course två ggr
    this.save();
}

userSchema.methods.addProductList = function(productId) {

this.productList.push(productId);
this.save();
}

const User = mongoose.model("user", userSchema);

module.exports = User;