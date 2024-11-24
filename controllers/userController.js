const {User} = require("../Models/UserModel");
const bcrypt = require("bcrypt");
const {createToken,errHandler} = require("../helper/helper");



module.exports.userPost = async(req,res)=>{
    let newUser = User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    newUser.save()
    .then(
        ()=>{
            let token = createToken(newUser.id);
            res.cookie("_token",token,{maxAge: 1000 * 60 * 60 *24});
            res.status(201).json({id: newUser.id});
            
        }
        )
        .catch(
            err=>{
                let errors = errHandler(err)
                console.log(err.message);
                res.status(400).json({
                    errors
                    // {errors : {}}
                });
            }
        );
    }

    module.exports.userGet = async(req,res)=>{
        try{
            let users = await User.find();
            res.status(200).json({data: users});
        } catch(err){
            res.status(500).json({
                message:"Something is worng"
            });
        }
    };

    module.exports.UserUpdatePost = async(req,res)=>{
        const Id = req.body.userId;
        let update_username = req.body.updateUsername;
        let update_email = req.body.updateEmail;
        let update_password = req.body.updatePassword;
        
        
        //console.log(Id);
        console.log(`${Id} is now in controller`)
        try {
            if (update_password) {
                const salt = await bcrypt.genSalt();
                update_password = await bcrypt.hash(update_password, salt);
            }
    
            const result = await User.findByIdAndUpdate(Id, {
                username: update_username,
                email: update_email,
                password: update_password,
            });
            
            if (!result) {
                return res.status(404).json({ error: "User not found." });
            }
            res.render("home",{ title_name:"Home"}, (err, html)=>{
                if(err){
                    res.status(500).json({
                        error:"something went wrong"
                    })
                    return;
                }
                res.status(200).json({
                    message: "User profile updated successfully.",
                    user: result,
                })
            })
          } catch (err) {
            console.log(err)
            res.status(400).json({
                error:[{
                    user: err.message
                }]
            })
          }
    
       
    }

    module.exports.userDelete = async(req,res)=>{
        const userId = req.params.id;
        try{
            console.log(`we are trying to delete ${userId}`);
           const result= await User.findByIdAndDelete(userId);
           if (!result) {
            return res.status(404).json({ error: "User not found." });
        }
            
           
            res.status(200).json({
                data: "Success"
               
            })
            // res.clearCookie("_token");
            // return res.redirect("/");
            
        }catch(err){
            console.log(err)
            res.status(500).json({
                errors:[
                    {
                        user:"something is worng"
                    }
                ]
            })
        }
    }

    module.exports.getUserByID = async(req,res)=>{
       
            User.findById(req.params.id)
            .then(document =>{
                res.status(200).json(document);
        
            })
            .catch(err =>{
                //console.log("GG")
                res.status(404).json(
                    {
                        message: "Not Found"
                    }
                );
            });
        
    }