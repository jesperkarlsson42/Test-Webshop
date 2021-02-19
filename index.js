const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mainRouter = require("./route/mainRoute");
const registerRouter = require("./route/registerRoute");
const loginRouter = require("./route/loginRoute");
const resetRouter = require("./route/resetRoute");
const app = express();
require("dotenv").config();

app.set("view engine", "ejs");

app.use(express.json());

//för att kunna parsa/konvertera ejs data till js
app.use(express.urlencoded({extended: false}))

app.use(bodyParser.json())

app.use(cookieParser())

app.use(mainRouter);
app.use(registerRouter);
app.use(loginRouter);
app.use(resetRouter);

mongoose.set("useFindAndModify", false);

const options = {
  useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true,
};

mongoose.connect(
    process.env.DATABASE_URL,options,
    (err) => {
      console.log(err);
      if (err) return;
      console.log("Connected to db!");
  
      app.listen(process.env.PORT, (err) =>
       console.log("Server is running")
      );
    }
  );

