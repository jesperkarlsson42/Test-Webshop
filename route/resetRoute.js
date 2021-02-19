const express = require("express");

const router = express.Router();


const {resetRender} = require("../controller/resetController");

router.get("/reset", resetRender);




module.exports = router;