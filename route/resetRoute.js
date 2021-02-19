const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/verifyUser")

const {resetRender, resetSubmit, resetParams, resetFormSubmit} = require("../controller/resetController");

router.get("/reset", resetRender);

router.post("/reset", resetSubmit);

router.get("/reset/:token", resetParams);

router.post("/resetForm", resetFormSubmit );





module.exports = router;