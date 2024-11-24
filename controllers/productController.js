const jwt = require("jsonwebtoken");
const Product = require("../Models/ProductModel");
const { User } = require("../Models/UserModel");


module.exports.productlink = async (req, res) => {
    try {
       
         let token = req.cookies._token;
     if(!token){
        res.redirect("/login");
        return;
    }
        jwt.verify(token, process.env.JWT_SECRET, async(err,token)=>{
    //     // Assuming you have the user ID in req.cookies._token;
        
    //     // Fetch the user from the database
        let user = await User.findById(token.id);

         console.log(user)

        // Check the user's role
        const query = user.role === "admin" ? {} : { isDeleted: false };

        // Fetch products based on the user's role
        const products = await Product.find(query);

        // Render the product page with the fetched products
        res.render("product", { title_name: "Products", products: products });
     })
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");
    }
};

// module.exports.productlink = async(req,res)=>{
    
//     if(User.role === "admin"){
//         let products = await Product.find();
//         res.render("product",{ title_name:"Products", products: products});
//     }
//     else{
//         let products = await Product.find({isDeleted:false});
//         res.render("product",{ title_name:"Products", products: products});
//     }
    
// }





module.exports.productPost = async function(req,res){
    let name = req.body.Name;
    let price = req.body.Price;
    let image = req.body.Image;
    let description = req.body.Description;
    console.log(`we have ${name}, ${price} , ${image}, ${description}`);
    product = new Product({
        name,price,image,description
    })
    try{
        product = await product.save();
        res.status(201).json({
            product
        })
    } catch(err){
        res.json({
            errors: err.message
        })
    }
}

// module.exports.addproduct= (req,res)=>{
//     res.render("addproduct", {title_name:"Add-Product"});
// }
module.exports.searchProduct = async function(req,res){
    let keyword = req.query.keyword;
    if(keyword === ""){
        console.log("keyword is empty")
        res.redirect("/product")
        return;

    }
    //searching form mongodb
    let products = await Product.find({"name": {"$regex": keyword, "$options":"i"}});

    
    res.render("partials/selection-section",{selection: products}, (err, html)=>{
        if(err){
            res.status(500).json({
                "error":"something went wrong"
            })
            return;
        }
        res.status(200).json({
            html
        })
    })
   
}
module.exports.productview = async(req,res)=>{
    const productID = req.params.id;
    console.log(productID);
    try{
        const productDetail = await Product.findOne({_id:(productID)});
        console.log("Discount: ")
        console.log(Object.keys(productDetail))
        res.render("productview", {title_name:"Product Details", productDetail:productDetail });
        if(!productDetail){
            res.status(404).json({
                error:[{
                    product: "Not Found"
                }]
            })
            
        }
    }catch(err){
        res.status(400).json({
            error:[{
                product: err.message
            }]
        })
    }
    

    
}

module.exports.productUpdatePost = async(req,res)=>{
    const productId = req.body.productId;
    let update_name = req.body.update_name;
    let update_price = req.body.update_price;
    let update_image = req.body.update_img;
    let update_description = req.body.update_dec;
    let updatedAt = new Date();
    let discount = req.body.discount;
    let start_date = new Date();
    let Code = req.body.code;
    // let end_date = req.body.end_date;
    let isactive = req.body.isActive;
    
    console.log(productId);
    try {
        await Product.findByIdAndUpdate(productId, {
          name: update_name,
          price: update_price,
          description: update_description,
          image: update_image,
          updatedAt: updatedAt,
        //   discount:[
        //     {
        //         code: Code,
        //         percent: discount,
        //         isActive : isactive
        //     }
        //   ]
        });
        res.render("product",{ title_name:"Products"}, (err, html)=>{
            if(err){
                res.status(500).json({
                    "error":"something went wrong"
                })
                return;
            }
            res.status(200).json({
                html
            })
        })
      } catch (err) {
        console.log(err)
        res.status(400).json({
            error:[{
                product: err.message
            }]
        })
      }

   
}
module.exports.productUpdateGet = (req,res)=>{
    // res.render("product",{title_name:"Products"});
    res.redirect("/product");
}

module.exports.productDelete = async(req,res)=>{
    const productId = req.params.id;
    try{
        await Product.findByIdAndDelete(productId);
        res.status(200).json({
            data: "Success"
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            errors:[
                {
                    product:"samething is worng"
                }
            ]
        })
    }
}

module.exports.productSoftDelete = async(req,res)=>{
    const productId = req.params.id;
    try{
        await Product.findByIdAndUpdate(productId,{isDeleted:true});
        res.status(200).json({
            data: "Success"
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            errors:[
                {
                    product:"samething is worng"
                }
            ]
        })
    }
}

module.exports.discount = (req,res)=>{
    
}