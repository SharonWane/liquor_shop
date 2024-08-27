const {User} = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const { productAdmin } = require("../controllers/productController");

//middleware for authentication
const authenticated = function(req,res,next){
    let token = req.cookies._token;
    if(!token){
        res.redirect("/login");
        return;
    }
    jwt.verify(token, process.env.JWT_SECRET, (err,token)=>{
        if(err){
            res.redirect("/login");
            return;
        }
        next();
    })
}

const adminOnly = async function(req,res,next){
    let token = req.cookies._token;
    if(!token){
        res.redirect("/login");
        return;
    }
    jwt.verify(token, process.env.JWT_SECRET, async(err,token)=>{
        if(err){
            res.redirect("/login");
            return;
        }
        let user = await User.findById(token.id);
        if(user && user.role != "admin"){
            res.redirect("/");
            return;
        }

        next();
    })
}




//middleware 
const injectUser = function(req,res,next){
    let token = req.cookies._token;
    console.log({token})
    if(!token){
        console.log("no token")
        next()
        return;
    }
    jwt.verify(token, process.env.JWT_SECRET, async(err,token)=>{
        if(err){
            next()
            return;
        }
        let user = await User.findById(token.id);
        if(user){
            res.locals.user = user;
        }
        next();
    })
}

module.exports={authenticated,injectUser,adminOnly};