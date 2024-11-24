const express = require("express");
const userRouter = express.Router();
const {userPost, userGet, getUserByID, UserUpdatePost, userDelete} = require("../controllers/userController");


userRouter.post("/users" , userPost);
userRouter.get("/users", userGet);
userRouter.get("/users:id", getUserByID);
userRouter.put("/userupdate" , UserUpdatePost);
userRouter.delete("/userDelete/:id" , userDelete);

module.exports  = userRouter;