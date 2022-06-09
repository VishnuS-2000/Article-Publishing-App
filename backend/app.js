const express=require('express')
const app=express()
const cors=require('cors')
const passport=require('passport')
require("./config/database")
require("./config/passport")(passport)



app.use(cors())

app.use(passport.initialize())

app.use(express.urlencoded({extended:false}))
app.use(express.json())




app.use("/admin",require("./routes/admin"))
app.use("/articles",require("./routes/article"))
app.use("/authors",require("./routes/author"))

app.listen(4000,()=>{

    console.log("The Server started at port 3000...")

})

