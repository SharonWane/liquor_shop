// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;



// const AdminSchema = new Schema({
    
//     home1img_1: {
//         type: String,
//     },
//     home1text_1:{
//         type: String
//     },
//     home1long_1:{
//         type: String
//     },
//     home1img_2: {
//         type: String,
//     },
//     home1text_2:{
//         type: String
//     },
//     home1long_2:{
//         type: String
//     },
//     home1img_3: {
//         type: String,
//     },
//     home1text_3:{
//         type: String
//     },
//     home1long_3:{
//         type: String
//     },



    

// });


// AdminSchema.set("toJSON", {
//     transform: (doc, ret) => {
//         ret.id = ret._id; // Convert _id to id
//         delete ret._id;
//         delete ret.__v;
//         return ret;
//     }
// });

// const Admin = mongoose.model("adminsManagement", AdminSchema);
// module.exports = Admin;