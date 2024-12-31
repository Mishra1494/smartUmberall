const { number } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const local = require("passport-local-mongoose");



const User = new Schema({
    name : {
        type : String
    },
    email : {
        type : String,
        require : true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    }
})


User.plugin(local);
const Users = mongoose.model("Users",User);
module.exports = {Users};