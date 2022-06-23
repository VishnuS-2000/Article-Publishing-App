const {Author}=require('../../models/author')
const {Article}=require('../../models/article')
const {Op}=require('sequelize')



module.exports.commonSearch=async(req,res)=>{

    console.log(req.headers,req.query)
    

    if(req.headers.article){

        await Article.findAndCountAll({where:{
            [Op.or]:[
                {title:{
                    [Op.iLike]:req.query.term?`%${req.query.term}%`:'% %'
                },
                topic:{
                    [Op.iLike]:req.query.term?`%${req.query.term}%`:'% %'
                }
            
                }]

        },include:[{
            model:Author,
            where:{
                [Op.or]:[
                {name:{
                    [Op.iLike]:req.query.term?`%${req.query.term}%`:'% %'
                }
            
            }

                ]}
        }],limit:req.headers.limit,offset:req.headers.offset}).then((result)=>{
            res.status(200).json({success:true,result:result})
        }).catch((err)=>{
            res.status(401).json({success:false,message:'No results found'})
        })
        
        

    }

    else if(req.headers.author){

        console.log('In search',req.query)

        await Author.findAndCountAll({where:{
   
                name:{
                    [Op.iLike]:`%${req.query.term}%`
                }

        },limit:req.headers.limit,offset:req.headers.offset,include:[Article]}).then((result)=>{
            console.log(result)
            res.status(200).json({success:true,result:result})
        }).catch((err)=>{
            res.status(401).json({success:false,message:'No results found'})
        })
        

    }

    else{
    res.status(401).json({success:false,message:'No results found'})


    }

}
