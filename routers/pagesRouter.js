 const express = require("express");
 const {basketget} = require("../controllers/pageController");
// const { risingdesklink,contactuslink,hblink,basketlink } = require("../controllers/productController");
 const pagesRouter = express.Router();


pagesRouter.get("/basket", basketget);

 module.exports = pagesRouter;