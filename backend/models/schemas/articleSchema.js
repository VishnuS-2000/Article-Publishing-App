const mongoose=require('mongoose')

const authorSchema=require("./authorSchema")

const articleSchema=new mongoose.Schema({
    id:Number,
    author:[authorSchema],
    title:String,
    subtitle:String,
    publishedAt:Date,
    outline:Array,
    content:String,
    references:Array,
    visiblity:Boolean
    
})

module.exports=articleSchema;