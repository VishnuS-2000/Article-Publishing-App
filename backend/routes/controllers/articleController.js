const {Article}=require("../../models/article")
const {QueryTypes}=require('sequelize')
const {sequelize}=require("../../config/database")

module.exports.getArticles=async(req,res)=>{


            await Article.findAndCountAll({offset:req.body.offset,limit:req.body.limit}).then((result)=>{
                res.status(200).json({result,message:"Data loaded successfully"})
            }).catch((err)=>res.status(404).json({error:err,message:"Unkown Error Occured"}))
            
         
}


module.exports.getArticleById=async(req,res)=>{


        await Article.findOne({where:{id:req.params.id}}).then((article)=>{

            res.status(200).json({result:article,message:"Data loaded successfully"})
        }).catch((err)=>res.status(404).json({error:err,message:"Article with given id was not found"}))
        


}



module.exports.getArticleByQuery=async(req,res)=>{
    await sequelize.query(req.body.query,{type:QueryTypes.SELECT}).then((result)=>{

        res.status(200).json({success:true,result,message:'Query executed'})

    }).then((err)=>{
       res.status(401).json({success:false,error:err,message:'Query Failed'})
    })
    
}





module.exports.createArticle=async(req,res)=>{
    

    const article=await Article.build({
        title:req.body.title,
        subtitle:req.body.subtitle,
        topic:req.body.topic,
        outline:req.body.outline,
        content:req.body.content,
        references:req.body.references,
        authorId:req.body.authorId
    })

    article.save().then((article)=>{
        res.status(201).json({success:true,result:article,messge:"Article Created"})

    }).catch((err)=>res.status(422).json({error:err,message:"Unable to create new article"}))
    
}



module.exports.updateArticle=async(req,res)=>{
    const article=await Article.findOne({where:{id:req.params.id}}).then((article)=>{

        article.set(req.body)

        return article
       
    }).catch((err)=>{
        
        res.status(422).json({error:err,message:"Article with given id not found"})

    })

    article.save().then((article)=>{
        res.status(200).json({success:true,result:article,message:"Article Updated"})
    })

}


module.exports.deleteArticle=async(req,res)=>{
    const article=await Article.findOne({where:{id:req.params.id}}).then((article)=>{
        return article

    }).catch((err)=>{
        
        res.status(401).json({success:false,error:err,message:"Article with given id not found"})

    })

    article.destroy().then(()=>{
        res.status(200).json({success:true,messge:"Article Deleted"})
    }).catch((err)=>res.status(422).json({success:false,error:err,message:"Unable to delete the article"}))

   

}

