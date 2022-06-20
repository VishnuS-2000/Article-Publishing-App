const {Admin}=require("../../models/admin")
const {Token}=require('../../models/token')
const {genPassword,validatePassword,issueJWT}=require("../../utils/auth")
const crypto=require('crypto')
const {sendMail}=require('../../config/nodemailer')




module.exports.signUp=async(req,res)=>{

    console.log(req.body)
    const {salt,hash}=genPassword(req.body.password)
    
    const newAdmin=Admin.build({
        username:req.body.username,
        password:hash,
        email:req.body.email,
        salt:salt
    })  

    await newAdmin.save().then((admin)=>{

        // console.log(admin.toJSON())

        res.status(200).json({success:true,admin:admin,message:"Successfully registered Admin"})
    }).catch((err)=>{
    res.status(422).json({error:err,message:"Unknown Error Occured"})
})

}



module.exports.signIn=async(req,res)=>{

    await Admin.findOne({where:{username:req.body.username}}).then((admin)=>{

        if(admin){


        if(validatePassword(req.body.password,admin.password,admin.salt)){
            const data=issueJWT(admin,'1d')
            console.log(data)
            res.status(200).json({success:true,user:{name:admin.username,data},message:"Successfully authenticated Admin"})
            
    }

    else{
        throw new Error("Invalid Credentials")
        
    }
    
}   

else{
    throw new Error("Invalid Credentials")
    
}


    }).catch((err)=>res.status(401).json({success:false,message:err.message}))
    

}



module.exports.forgotPassword=async(req,res)=>{

 


  try{
    const admin=await Admin.findOne({where:{email:req.body.email}})

    if(!admin){
      throw new Error('Invalid Email')
    }
        const token=await Token.findOne({userId:admin.id})
        if(token){
         token.destroy()
        }

    const newToken=crypto.randomBytes(6).toString('hex')
    console.log(newToken)
    const tokenEntry=Token.build({id:admin.id,token:newToken})

    sendMail(admin.email,'Password Reset',`<h3>Verification Code for Admin Password Reset  :<b>${newToken}</b></h3>`)

    tokenEntry.save()
    res.status(200).json({success:true,message:'Password reset mail sent successfully'})

  }
  catch(err){
    res.status(422).json({success:false,message:err.message})
  }


}



module.exports.verifyPassword=async(req,res)=>{

    try{
        if(!req.body.token){
            throw new Error('Invalid Token')
        }

        const admin=await Admin.findOne({where:{email:req.body.email}})
        
     
        const tokenEntry=await Token.findOne({userId:admin.id})

        if(tokenEntry.token===req.body.token){
            console.log('verified')
            const {salt,hash}=genPassword(req.body.password)
            
            admin.set({salt:salt,password:hash})

            admin.save()

            res.status(200).json({success:true,message:'Password successfully updated '})
        }
        else{
            throw new Error('Unauthorized')
        }

    }
    catch(err){
        res.status(401).json({sucess:true,message:err.message})
    }

}





module.exports.changePassword=()=>{
    
    
}
