const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mainRouter = require("./route/mainRoute");
const registerRouter = require("./route/registerRoute");
const loginRouter = require("./route/loginRoute");
const app = express();
require("dotenv").config();

//app middlewares
app.set("view engine", "ejs");
//för att kunna parsa/konvertera json data till js
app.use(express.json());

//för att kunna parsa/konvertera ejs data till js
app.use(express.urlencoded({extended: false}))

app.use(bodyParser.json())

app.use(cookieParser())

app.use(mainRouter);
app.use(registerRouter);
app.use(loginRouter);


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

