const User = require("../model/user");
const bcrypt = require("bcrypt");

const registerRender = (req, res) => {
  res.render("register.ejs", { err: " " });
};

const registerSubmit = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    await new User({
      username: username,
      email: email,
      password: hashedPassword,
    }).save();
    return res.redirect("/login");
  } catch (err) {
    if (err) {
      res.render("register.ejs", { err: " " });
      console.log(err);
      return;
    }
  }
};

module.exports = {
  registerRender,
  registerSubmit,
};
