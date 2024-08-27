const mongoose = require("mongoose");

const uri = "mongodb://localhost:27017/expressDB";

function db_connect(){
    return mongoose.connect(uri);
}

mongoose.connection.on("connected",()=>{
    console.log("connected to database");
});

mongoose.connection.on("error",()=>{
    console.log("We fucked up. Here is the error log.");
    console.log(err);
});

module.exports.db_connect = db_connect;

// mongoose.connect(uri)
//     .then(
//         ()=>{
//             console.log("connected to DB");
//         }
//     )
//     .catch(
//         err =>{
//             console.log("We fucked up. Here is the error log.");
//             console.log(err);
//         }
//     );