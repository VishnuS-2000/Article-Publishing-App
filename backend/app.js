const express=require('express')
const app=express()
const cors=require('cors')

app.use(cors())
app.use("/admin",require("./routes/admin"))
app.use("/articles",require("./routes/article"))
app.use("/authors",require("./routes/author"))

app.listen(4000,()=>{

    console.log("The Server started at port 3000...")

})

