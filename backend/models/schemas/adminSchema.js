const mongoose=require('mongoose')

const adminSchema=new mongoose.Schema({

    username:String,
    password:String,
    salt:String,
    lastLogin:Date,
    details:Array,
    settings:Array

})

module.exports=adminSchema;