const express = require("express");
const registerRouter = express.Router();
const User = require("../model/user");

const {registerRender, registerSubmit} = require("../controller/registerController");

registerRouter.get('/register', registerRender);
registerRouter.post('/register', registerSubmit);

module.exports = registerRouter;