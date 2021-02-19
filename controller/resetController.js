const User = require("../model/user");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const sgMail = require("@sendgrid/mail");
var sgTransport = require('nodemailer-sendgrid-transport');
require("dotenv").config();

//om vi vill använda vår egna gmail konto
// const transport = nodemailer.createTransport({
//   service: "gmail",
//     auth: {
//       user: process.env.USER,
//       pass: process.env.PASS
//     }
//   })


sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  var options = {
    auth: {
           api_key: process.env.SENDGRID_API_KEY,
         }
  }
  
  var transport = nodemailer.createTransport(sgTransport(options));

const resetRender = (req, res) => {
  res.render("reset.ejs", { err: " " });
};

const resetSubmit = async (req, res) => {
  const email = req.body.email;

  const user = await User.findOne({ email: email });

  if (!user) return res.redirect("/register");

  const token = await crypto.randomBytes(32).toString("hex");

  user.token = token;
  user.tokenExpiration = Date.now() + 3600000;
  await user.save();

  await transport.sendMail({
    from: process.env.USER,
    to: user.email,
    subject: "Reset password requested",
    html: `<h2>Klicka <a href="http://localhost:8000/reset/${user.token} " > Här </a>  för att kunna återställa lösenord </h2>`,
  });

  res.render("checkMail.ejs");
};

const resetParams = async (req, res) => {

  const token = req.params.token;
  try {
    const user = await User.findOne({
      token: token,
      tokenExpiration: { $gt: Date.now() },
    });

    if (!user) return res.redirect("/register");

    res.render("resetForm.ejs", { err: " ", email: user.email });
  } catch (err) {
    res.render("reset.ejs", { err: " Försök igen" });
  }
};

const resetFormSubmit = async (req, res) => {
  const password = req.body.password;
  const email = req.body.email;

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.findOne({ email: email });

  user.password = hashedPassword;
  await user.save();
  res.redirect("/login");
};

module.exports = {
  resetRender,
  resetSubmit,
  resetParams,
  resetFormSubmit,
};
