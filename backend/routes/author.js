const router=require('express').Router()
const {getAuthorByQuery,getAuthors,getAuthorById}=require("./controllers/authorController")






router.get("/search",getAuthorByQuery)
router.get("/",getAuthors)
router.get("/:id",getAuthorById)

module.exports=router;