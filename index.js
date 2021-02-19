const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const router = require("./route/mainRoute");
require("dotenv").config();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.set("useFindAndModify", false);

app.set("view engine", "ejs");

app.use(bodyParser.json())

app.use("/", router);



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

