const passport=require('passport')
const router=require('express').Router()
const {createAuthor,updateAuthor,deleteAuthor}=require("./controllers/authorController")
const {createArticle, updateArticle,deleteArticle}=require("./controllers/articleController")
const {signUp,signIn}=require("../routes/controllers/adminController")



router.post("/register",signUp)
router.post("/login",signIn)

 router.use(passport.authenticate('jwt',{session:false}))




router.post("/authors",createAuthor)
router.put("/author/:id",updateAuthor)
router.delete("/author/:id",deleteAuthor)


router.post("/articles",createArticle)
router.put("/article/:id",updateArticle)
router.delete("/article/:id",deleteArticle)





module.exports=router;