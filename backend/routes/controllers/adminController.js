const {Admin}=require("../../models/admin")
const {genPassword,validatePassword,issueJWT}=require("../../utils/auth")



module.exports.signUp=async(req,res)=>{

    console.log(req.body)
    const {salt,hash}=genPassword(req.body.password)
    
    const newAdmin=Admin.build({
        username:req.body.username,
        password:hash,
        salt:salt
    })  

    await newAdmin.save().then((admin)=>{

        // console.log(admin.toJSON())
        const data=issueJWT(admin)

        res.status(200).json({success:true,admin:admin,token:data.token,expiresIn:data.expiresIn,message:"Successfully registered Admin"})
    }).catch((err)=>{
    res.status(422).json({error:err,message:"Unknown Error Occured"})
})

}



module.exports.signIn=async(req,res)=>{

  
    const admin=await Admin.findOne({where:{username:req.body.username}}).then((admin)=>{

        if(admin){

        

        if(validatePassword(req.body.password,admin.password,admin.salt)){
            const data=issueJWT(admin)
            res.status(200).json({success:true,token:data.token,expiresIn:data.expiresIn,message:"Successfully authenticated Admin"})
            
     
    }
}
    throw new Error("Invalid Credentials")
    


    }).catch((err)=>res.status(401).json({success:false,message:err.message}))
    

}

module.exports.forgotPassword=()=>{

}

module.exports.changePassword=()=>{
    
}
