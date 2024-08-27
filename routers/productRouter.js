const express = require("express");
const productRouter = express.Router();
const {authenticated, adminOnly, injectUser} = require("../middlewares/middleware");
const  productController = require("../controllers/productController");

productRouter.use(authenticated)
productRouter.get("/product", productController.productlink);

productRouter.post("/product",injectUser, productController.productPost);
productRouter.get("/addproduct", adminOnly, productController.addproduct );
productRouter.get("/find-products", productController.searchProduct);
productRouter.get("/productview/:id", productController.productview);
productRouter.put("/updateproduct",adminOnly, productController.productUpdatePost);
productRouter.get("/updateproduct", productController.productUpdateGet);
productRouter.delete("/deleteproduct/:id",adminOnly, productController.productDelete);
productRouter.delete("/product/:id/delete",adminOnly, productController.productSoftDelete);

module.exports = productRouter;