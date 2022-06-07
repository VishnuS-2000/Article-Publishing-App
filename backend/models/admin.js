const mongoose=requires('mongoose')

const adminSchema=require("../models/schemas/adminSchema")

const Admin=new mongoose.model('admin',adminSchema)

module.exports=Admin