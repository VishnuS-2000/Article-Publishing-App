const {Author}=require("../../models/author")

module.exports.getAuthors=async(req,res)=>{

    try{
        const authors=await Author.find()
        res.status(200).json({result:authors,message:"Data loaded successfully"})
    }
    catch(err){
        res.status(404).json({message:"Requested authors was not found"})
    }        
}


module.exports.getAuthorById=async(req,res)=>{

try{


    const author=await Author.findOne({_id:req.params.id})
    res.status(200).json({result:author,message:"Data loaded successfully"})

}
catch(err){
    res.status(404).json({error:err,message:"Requested resource not found"})
}

}


module.exports.getAuthorByQuery=async(req,res)=>{

}


module.exports.createAuthor=async(req,res)=>{
    

    const author=new Author({
        id:req.body.id,
        name:req.body.name,
        photo:req.body.photo,
        designation:req.body.designation,
        misc:req.body.misc,
        createdAt:Date.now()
    })
    author.save().then((author)=>{
        res.status(201).json({success:true,result:author,messge:"Created a new author"})

    }).catch((err)=>res.status(422).json({error:err,message:"Unable to create new author"}))

}



module.exports.updateAuthor=async(req,res)=>{
    await Author.updateOne({_id:req.params.id}).then((author)=>{

        res.status(200).json({success:true,result:author,message:"Updated the author"})
    }).catch((err)=>{
        
        res.status(422).json({error:err,message:"Unable to update the author"})
    })

}



module.exports.deleteAuthor=async(req,res)=>{
    await Author.deleteOne({_id:req.params.id}).then((author)=>{

        res.status(200).json({success:true,messge:"Deleted the author"})
    }).catch((err)=>{
        
        res.status(422).json({error:err,message:"Unable to delete the author"})
    })

}