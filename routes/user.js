const express = require("express");
const router = express.Router();
const asyncWrap = require("../utils/wrapAsync.js");
const {Users }= require("../models/users.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");

router.get("/signUp",(req,res)=>{
    res.render("users/signUp.ejs");
})

router.post("/signUp",asyncWrap(async(req,res,next)=>{
    try{
        let {username,email,password,name} = req.body;
        const newUser = new Users({email,username,name});
        const registerUser = await Users.register(newUser,password);
        console.log(registerUser);
        req.login(registerUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success","You registered Succesfully");
            res.redirect("/Home");   
        })
    }catch(e){
        console.log(e);
        req.flash("success",e.message);
        res.redirect("/Home");
    }
}
))

router.get("/login",(req,res)=>{
    res.render("users/login.ejs");
})

router.post("/login",passport.authenticate("local",{failureRedirect:'/login',failureFlash:true}),
    async(req,res)=>{
        req.flash("success","welcome to smartUmberella");
        const redirectUrl = res.locals.redirectUrl || "/Home"
        res.redirect(redirectUrl);
})

router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","logged You Out");
        res.redirect("/Home");
    })
})
module.exports = router;
