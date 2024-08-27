const express = require("express");
const authRouter = express.Router();
const {registerGet,loginGet,loginPost,logout} = require("../controllers/authController");

authRouter.get("/register", registerGet);
authRouter.get("/login", (req, res) => {
    console.log("HEREE");
    loginGet(req, res);
});
authRouter.post("/login", loginPost);
authRouter.get("/logout", logout);

module.exports = authRouter;
