const {Author}=require("../../models/author")
const {Article}=require('../../models/article')

const {QueryTypes}=require('sequelize')
const {sequelize}=require("../../config/database")

module.exports.getAuthors=async(req,res)=>{

        await Author.findAndCountAll({offset:req.body.offset,limit:req.body.limit,include:[Article]}).then((authors)=>{
            res.status(200).json({success:true,result:authors,message:"Data loaded successfully"})
        }).catch((err)=>{
            res.status(404).json({success:false,message:"Unknown Error Occurred"})
        })      
           
}


module.exports.getAuthorById=async(req,res)=>{

    await Author.findOne({where:{id:req.params.id},include:[Article]}).then((author)=>{

        res.status(200).json({success:true,result:author,message:"Data loaded successfully"})

    }).catch((err)=>res.status(404).json({success:false,error:err,message:"Author with given id not found"}))
    
    

}


module.exports.getAuthorByQuery=async(req,res)=>{
    await sequelize.query(req.body.query,{type:QueryTypes.SELECT}).then((result)=>{

        res.status(200).json({success:true,result,message:'Query executed'})

    }).then((err)=>{
       res.status(401).json({success:false,error:err,message:'Query Failed'})
    })
}


module.exports.createAuthor=async(req,res)=>{
    

    const author=Author.build({
        id:req.body.id,
        name:req.body.name,
        email:req.body.email,
        bio:req.body.bio,
        photo:req.body.photo,
        specialization:req.body.specialization

    })
    author.save().then((author)=>{
        res.status(201).json({success:true,result:author,messge:"Author Created"})

    }).catch((err)=>res.status(422).json({success:false,error:err,message:"Unable to create new author"}))

}



module.exports.updateAuthor=async(req,res)=>{
 
    const author=await Author.findOne({where:{id:req.params.id}}).then((author)=>{
        
        author.set(req.body)
        return author

    }).catch((err)=>res.status(401).json({success:false,error:err,message:"author with given id not found"}))

    await author.save().then((author)=>{

        res.status(200).json({sucess:true,result:author,message:"Author updated"})

    }).catch((err)=>{
        res.status(422).json({success:false,error:err,message:"Unable to update the author"})
    })

}



module.exports.deleteAuthor=async(req,res)=>{
    const author=await Author.findOne({where:{id:req.params.id}}).then((author)=>{
        return author
    }).catch((err)=>{
        
        res.status(401).json({success:false,error:err,message:"Author with given id not found"})
    })

    author.destroy().then(()=>{
        res.status(200).json({success:true,messge:"Author deleted"})
    }).catch(err=>res.status(422).json({success:false,error:err,message:"Unable to delete the author"}))

}

