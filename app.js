const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStratgey  =  require("passport-local");
const {Users} = require("./models/users.js");
const expressError = require("./utils/expressError.js");
const wrapAsynv = require("./utils/wrapAsync.js");
const userRouter = require("./routes/user.js");
const homeRouter = require("./routes/HomePage.js");
const mailRouter = require("./routes/mail.js");



app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
const sessionOptions = {
    secret:"Smart Umberalla",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires : Date.now()+1000*60*60*24*7,// cookie will expire in seven days here time is in millisecond here
        maxAge : 1000*60*60*24*7,
        httpOnly : true // to avoid cross scripting attack we are using it 
    }
}
app.use(session(sessionOptions));
app.use(flash());
//passport uses the session here so we are writing the passport below the  session middlewaere
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStratgey(Users.authenticate()));
passport.serializeUser(Users.serializeUser());
passport.deserializeUser(Users.deserializeUser());
app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    res.locals.currUser = req.user;
    next();
})


// setting initialize path for user
app.use("/home",homeRouter);
app.use("/",userRouter);
app.use("/sendMail",mailRouter);

// mongoose connections

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/smartUmberella");
    console.log("created");
}

main().then(()=>{
    console.log("Connected Succesfully");
}).catch((err)=>{
    console.log(err);
});


//server setup
app.listen(8080,()=>{
    console.log("Use port 8080");

})


app.all("*",(req,res,next)=>{
    next(new expressError(404," page  not found"));
})

app.use((err,req,res,next)=>{
    let {status=500,message="something Went wrong"} = err;
    console.log(message);
    res.render("error.ejs",{message});
    // res.status(status).send(message);
})