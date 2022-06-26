const {Author}=require('../../models/author')
const {Article}=require('../../models/article')
const {Op}=require('sequelize')



module.exports.commonSearch=async(req,res)=>{



    

    if(req.headers.article){
 
        await Article.findAndCountAll({where:{
         
                title:{
                    [Op.iLike]:`%${req.query.term}%`
                }
                
                

        },include:[{
            model:Author,
        }],limit:req.headers.limit,offset:req.headers.offset}).then((result)=>{


            res.status(200).json({success:true,result:result})
        }).catch((err)=>{
            res.status(401).json({success:false,message:'No results found'})
        })
        

        
        

    }

    else if(req.headers.author){

  

        await Author.findAndCountAll({where:{
   
                name:{
                    [Op.iLike]:`${req.query.term}%`
                }

        },limit:req.headers.limit,offset:req.headers.offset,distinct:true,include:[Article]}).then((result)=>{
          
            res.status(200).json({success:true,result:result})
        }).catch((err)=>{
            res.status(401).json({success:false,message:'No results found'})
        })
        

    }

    else{
    res.status(401).json({success:false,message:'No results found'})


    }

}
