const mongoose=requires('mongoose')

const authorSchema=require("../models/schemas/adminSchema")

const Author=new mongoose.model('author',authorSchema)

module.exports=Author