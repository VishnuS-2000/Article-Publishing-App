const mongoose=require('mongoose')

const authorSchema=require("./authorSchema")

const articleSchema=new mongoose.Schema({
    author:[authorSchema],
    title:String,
    subtitle:String,
    topic:String,
    publishedAt:Date,
    outline:Array,
    content:String,
    references:Array,
    visiblity:Boolean
    
})

module.exports=articleSchema;