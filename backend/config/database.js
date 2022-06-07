const mongoose=require('mongoose')

const connection=mongoose.connect(process.env.DB_STRING,(err)=>{
    if(err){
        console.log(err)

    }

    else{
        console.log("Connected to the Database")
    }
})

