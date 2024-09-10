 const express = require("express");
 const {basketget, basketadd, basketremove, basketclear} = require("../controllers/pageController");
 const {authenticated, adminOnly, injectUser} = require("../middlewares/middleware");
 const pagesRouter = express.Router();

pagesRouter.use(authenticated);
pagesRouter.get("/basket", basketget);
pagesRouter.post("/basket/:id/add", basketadd);
pagesRouter.post("/basket/:id/remove", basketremove);
// pagesRouter.delete("/basket/clear", basketclear);

 module.exports = pagesRouter;