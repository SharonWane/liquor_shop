 const express = require("express");
 const {basketget, basketadd, basketremove, basketclear} = require("../controllers/pageController");
 const pagesRouter = express.Router();


pagesRouter.get("/basket", basketget);
pagesRouter.post("/basket/:id/add", basketadd);
pagesRouter.post("/basket/:id/remove", basketremove);
// pagesRouter.delete("/basket/clear", basketclear);

 module.exports = pagesRouter;