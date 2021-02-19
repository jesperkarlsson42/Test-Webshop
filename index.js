const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mainRouter = require("./route/mainRoute");
const registerRouter = require("./route/registerRoute");
const app = express();
require("dotenv").config();

app.set("view engine", "ejs");

app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.urlencoded({​​extended: false}​​))

//mongoose.set("useFindAndModify", false);

app.use(bodyParser.json())

app.use(mainRouter);
app.use(registerRouter);


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

