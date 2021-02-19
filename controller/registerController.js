const User = require("../model/user");
const bcrypt = require("bcrypt");

//renderar ejs filen
const registerRender = (req, res) => {
  res.render("register.ejs", {err:""});
};

const registerSubmit = async (req, res) => {
    //Läsa data från req.body
    const { username, email, password } = req.body;
    
    //spara lösenord med salt och bcrypt: hash password
    try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt)

 //Skapa en new user utifrån req.body
    new User({
        username: username,
        email: email,
        password: hashedPassword
    }).save();

  return res.redirect("/login");
}
 catch (err) {
     if(err) return res.render("register.ejs", {err:err})
 }
};

module.exports = {
  registerRender,
  registerSubmit
};

