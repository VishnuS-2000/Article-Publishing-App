const router=require('express').Router()





router.get("/",(req,res)=>{
    res.send("Welcome to Admin Route")
})


module.exports=router;