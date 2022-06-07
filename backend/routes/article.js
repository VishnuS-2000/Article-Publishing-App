const router=require('express').Router()





router.get("/",(req,res)=>{
    res.send("Welcome to Article Route")
})

module.exports=router;