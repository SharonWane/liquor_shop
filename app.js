const express = require("express");
const session = require('express-session');
const {db_connect} = require("./database/dbHelper");
const bodyParser = require("body-parser");
const app = express();

const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const {injectUser}= require("./middlewares/middleware")

const userRouter = require("./routers/userRouter");
const authRouter = require("./routers/authRouter");
const productRouter = require("./routers/productRouter");
const pagesRouter = require("./routers/pagesRouter")
const {everyMinute} = require("./services/cronService");
const Admin = require("./Models/AdminModel");

dotenv.config();

//setting express api in localhost:3000
app.set("port",3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());
//setting ejs for view
app.set("view engine", "ejs");

//import static file like css js and image
app.use("/static",express.static(`${__dirname}/publics`));


app.use("*", injectUser);
app.get("/ping", (req, res)=>{
    res.send("pong")
})

// Set up session middleware
app.use(session({
    secret: 'yourSecretKey',  // Replace with a strong secret key in production
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));

app.get("/", async(req,res)=>{

    // const homeItems = await Admin.find();
    // try{
    //     res.render("home",
    //      {wellcomeString : "Nice to See you",
    //      title_name: "Home", homeItems:homeItems});
    //     } catch (error) {
    //         console.error("Error fetching products:", error);
    //         res.status(500).send("Internal Server Error");
    //     }
    res.render("home",
    {wellcomeString : "Nice to See you",
    title_name: "Home"})
});



// app.get("/run-job", (req, res) => {
//     everyMinute.fireOnTick();
//     res.status(200).json({
//         data: "running"
//     })
// })

app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", pagesRouter);
app.use("/", productRouter);




// // Initialize basket in session as an array
// app.use((req, res, next) => {
//     if (!req.session.basket) {
//         req.session.basket = [];
//     }
//     next();
// });




db_connect().then(
    ()=>{
        app.listen(app.get("port"),()=>{
            console.log(`Serve is up and running at localhost:${app.get("port")}`);
        });
    }
).catch(
    err =>{
        console.log("Can't start the server");
    }
);