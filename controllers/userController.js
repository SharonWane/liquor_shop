const {User} = require("../Models/UserModel");
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

    module.exports.getUserByID = async(req,res)=>{
       
            User.findById(req.params.id)
            .then(document =>{
                res.status(200).json(document);
        
            })
            .catch(err =>{
                console.log("GG")
                res.status(404).json(
                    {
                        message: "Not Found"
                    }
                );
            });
        
    }