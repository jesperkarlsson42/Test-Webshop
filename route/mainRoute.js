const express = require("express");
const router = express.Router();
//const User = require("../model/user");

const homeRender = require("../controller/homeController");


router.get("/", homeRender);


module.exports = router;