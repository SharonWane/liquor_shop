const {User} = require("../Models/UserModel")
const bcrypt = require("bcrypt")
const {createToken,errHandler} = require("../helper/helper")

module.exports.registerGet = function(req,res){
    res.render("register",{
        title_name: "Register"
    });
}

module.exports.loginGet = (req,res)=>{
    console.log("HHH")
    res.render("login", {title_name: "Login"});
    
}

module.exports.loginPost = async(req,res)=>{
    console.log("login starting...")
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.findOne({email: email});
    if(!user){
        res.status(404).json({
            "errors":{
                "email":"email not found"
            }
        });
        return;
    }
    let check_password = await bcrypt.compare(password, user.password);
    if(!check_password){
        res.status(400).json({
            errors:{
                "password":"wrong password"
            }
        });
        return;
    }
    let token = createToken(user.id);
    res.cookie("_token", token, {maxAge: 1000*60*60*24})
    res.status(200).json({
        "data": "ok"
    });
};

module.exports.logout = function(req,res){
    res.clearCookie("_token");
    res.redirect("/");
}

