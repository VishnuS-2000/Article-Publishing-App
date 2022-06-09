const {Article}=require("../../models/article")


module.exports.getArticles=async(req,res)=>{

        try{
            const articles=await Article.find()
            res.status(200).json({result:articles,message:"Data loaded successfully"})
        }
        catch(err){
            res.status(404).json({message:"Requested articles was not found"})
        }        
}


module.exports.getArticleById=async(req,res)=>{

    try{


        const article=await Article.findOne({_id:req.params.id})
        res.status(200).json({result:article,message:"Data loaded successfully"})
    
    }
    catch(err){
        res.status(404).json({error:err,message:"Requested resource not found"})
    }

}

module.exports.getArticleByQuery=(req,res)=>{
    console.log(req.query)

}



module.exports.createArticle=async(req,res)=>{
    

    const article=new Article({
        title:req.body.title,
        subtitle:req.body.subtitle,
        topic:req.body.topic,
        publishedAt:Date.now(),
        outline:req.body.outline,
        content:req.body.content,
        references:req.body.references,
        visiblity:true
    })
    article.save().then((article)=>{
        res.status(201).json({success:true,result:article,messge:"Created a new article"})

    }).catch((err)=>res.status(422).json({error:err,message:"Unable to create new resource"}))
    

}



module.exports.updateArticle=async(req,res)=>{
    await Article.updateOne({_id:req.params.id}).then((article)=>{

        res.status(200).json({success:true,result:article,message:"Updated the article"})
    }).catch((err)=>{
        
        res.status(422).json({error:err,message:"Unable to update the aricle"})
    })

}





module.exports.deleteArticle=async(req,res)=>{
    await Article.deleteOne({_id:req.params.id}).then((article)=>{

        res.status(200).json({success:true,messge:"Deleted the article"})
    }).catch((err)=>{
        
        res.status(422).json({error:err,message:"Unable to delete the aricle"})
    })

}

