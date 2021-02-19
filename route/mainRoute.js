const express = require("express");

const router = express.Router();
const verifyUser = require("../middleware/verifyUser")

const {homeRender} = require("../controller/homeController");

//lägga till ("/", verifyUser, homeRender) 
router.get("/", homeRender)

router.get("/logout", (req, res) => {

    res.clearCookie("jwtToken").redirect("/login")
    
})

module.exports = router;