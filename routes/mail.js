const express = require("express");
const router = express.Router();
const asyncWrap = require("../utils/wrapAsync.js");
const {Users }= require("../models/users.js");
const passport = require("passport");
const {sendMail} = require("../middleware.js");

router.get("/",(req,res)=>{
    res.send("sending mail");
});

module.exports = router;

