const mongoose=require('mongoose')

const authorSchema=mongoose.Schema({
    id:Number,
    name:String,
    photo:String,
    designation:String,
    misc:Array,
    createdAt:Date
})


module.exports=authorSchema;

