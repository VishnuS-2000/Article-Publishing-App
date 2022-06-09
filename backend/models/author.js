const mongoose=require('mongoose')

const authorSchema=require("../models/schemas/authorSchema")

const Author=new mongoose.model('author',authorSchema)

module.exports.Author=Author