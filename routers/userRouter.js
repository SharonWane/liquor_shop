const express = require("express");
const userRouter = express.Router();
const {userPost, userGet, getUserByID} = require("../controllers/userController");


userRouter.post("/users" , userPost);
userRouter.get("/users", userGet);
userRouter.get("/users:id", getUserByID);

module.exports  = userRouter;