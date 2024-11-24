const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
        
    },
    price: {
        type: mongoose.Types.Decimal128,
        required: true
        
    },
    finalPrice:{
        type: mongoose.Types.Decimal128
    },
    image: {
        type: String,
        required: true,
       
    },
    description:{
        type: String,
        required: true
    },
    // discount:[
       
    //     {
    //         code: String,
    //         percent: mongoose.Types.Decimal128,
    //         start_date: Date,
    //         end_date: Date,
    //         isActive: Boolean
    //     }
    // ],

    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    },
    isDeleted:{
        type: Boolean,
        default: false
    }

});

// UserSchema.pre('save', async function (next) {
//     let salt = await bcrypt.genSalt();
//     let hashedPw = await bcrypt.hash(this.password, salt);
//     this.password = hashedPw;
//     next();
// });
ProductSchema.set("toJSON",{
    transform:(doc,ret)=>{
        ret.price = Number(doc.price.toString()).toFixed(2);
        // ret.discount = filter a discount with start_date < today < end_date
        //
        // 
    }
})

const Product = mongoose.model("products", ProductSchema);
module.exports = Product;