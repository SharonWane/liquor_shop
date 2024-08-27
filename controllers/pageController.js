const jwt = require("jsonwebtoken");
const Product = require("../Models/ProductModel");
const { User } = require("../Models/UserModel");

module.exports.basketget = (req,res)=>{
    res.render("basket" , {title_name: "Basket"});
}