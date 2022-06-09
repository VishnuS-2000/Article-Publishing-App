const Admin=require("../../models/admin")
const {genPassword,validatePassword,issueJWT}=require("../../utils/auth")



module.exports.signUp=(req,res)=>{
    console.log(req.body.username,req.body.password)

    const {salt,hash}=genPassword(req.body.password)
    
    const newAdmin=new Admin({
        username:req.body.username,
        password:hash,
        salt:salt
    })  

    newAdmin.save().then((admin)=>{

        console.log(admin)
        const data=issueJWT(admin)

        res.status(200).json({success:true,admin:admin,token:data.token,expiresIn:data.expiresIn,message:"Successfully registered Admin"})
    }).catch((err)=>{
    res.status(422).json({error:err,message:"Unknown Error Occured"})
})

}

module.exports.signIn=async(req,res)=>{

    try
    {
    const admin=await Admin.findOne({username:req.body.username})
    if(admin){

   
        if(validatePassword(req.body.password,admin.password,admin.salt)){
            const data=issueJWT(admin)
            res.status(200).json({success:true,token:data.token,expiresIn:data.expiresIn,message:"Successfully authenticated Admin"})
        }

        else{
            throw new Error("Invalid Password")
        }
    }

    else{
        throw new Error("Username does not exist")
    }

    }

    catch(err){
     res.status(404).json({success:false,message:err.message})
    
    }
    

}


