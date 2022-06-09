const mongoose=require('mongoose')

const articleSchema=require("../models/schemas/articleSchema")

const Article=new mongoose.model('article',articleSchema)

module.exports.Article=Article