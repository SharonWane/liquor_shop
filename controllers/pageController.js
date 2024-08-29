const jwt = require("jsonwebtoken");
const Product = require("../Models/ProductModel");
const { User } = require("../Models/UserModel");

// Route to display the basket page
module.exports.basketget = (req, res) => {
    
    if (!req.session.basket) {
        req.session.basket = []; // Initialize basket if it doesn't exist
    }
    console.log("Type of req.session.basket:", typeof req.session.basket);

    console.log("Basket contents:", req.session.basket); // Debugging line to check basket contents
    res.render("basket", { title_name: "Basket", basket: req.session.basket || [] });
};

// Route to add an item to the basket
module.exports.basketadd = async (req, res) => {
    const productID = req.params.id;

    if (!Array.isArray(req.session.basket)) {
        req.session.basket = [];
    }
    //console.log("Type of req.session.basket:", typeof req.session.basket);

    try {
        product = await Product.findOne({_id:productID}); // Assuming Product.find is an async function
        product = product.toJSON()
        console.log(product);
        Name= product.name;
        Price= product.price;
        img = product.image;
        Description = product.description;
        console.log({
            Name,
            Price,
            img,
            Description
        })

        if (product) {

           // if(req.session.basket.length === 0){
                req.session.basket.push({
                    productId: productID,
                    name: Name,
                    price: Price,
                    image: img,
                    dec: Description,
                    quantity: 1
                });
           // }
           //else{
                // const existingItem = req.session.basket.find(item => item.productId === productID);

                // if (existingItem) {
                //     existingItem.quantity += 1;
                // }
            //}
        

            
           
            
            

            console.log("Updated basket:", req.session.basket); // Log the updated basket
        } else {
            console.log("Product not found"); // Log if product is not found
            res.status(404).send("Product not found");
            return;
        }

        res.redirect('/product');
    } catch (err) {
        console.error("Error adding product to basket:", err); // Log any errors
        res.status(500).send("Server error");
    }

};


// Route to remove an item from the basket
module.exports.basketremove = (req, res) => {
    const productID = req.params.id;
    req.session.basket = req.session.basket.filter(item => item.productId != productID);
    res.redirect('/basket');
};

//Route to clear the basket
module.exports.basketclear = (req, res) => {
    req.session.basket = [];
    res.redirect('/basket');
};