const express = require("express");
const router = express.Router();
const boddyParser =  require("body-parser");
const axious = require("axios");
const key = 'fe1268ecca9744664ab7e27a728464a9';
function middlewar(req,res,next){
    
}
router.get("/",(req,res)=>{
    res.render("Home.ejs");
})

module.exports = router;