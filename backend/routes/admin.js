const passport=require('passport')
const router=require('express').Router()
const {createAuthor,updateAuthor,deleteAuthor, groupDeleteAuthors}=require("./controllers/authorController")
const {createArticle, updateArticle,deleteArticle, groupDeleteArticles}=require("./controllers/articleController")
const {signUp,signIn, forgotPassword,verifyPassword, changePassword, getAdmin, changeEmail}=require("../routes/controllers/adminController")


const {authMiddleware}=require("../utils/auth")

const {upload}=require("../config/multer")

router.post("/register",signUp)
router.post("/login",signIn)
router.post("/forgotPassword",forgotPassword)
router.post('/verifyPassword',verifyPassword)


router.use(passport.authenticate('jwt',{session:false}))

router.get('/',getAdmin)
router.post('/changeEmail',changeEmail)
router.post('/changePassword',changePassword)


router.post("/authors",createAuthor)
router.put("/author/:id",updateAuthor)

router.delete("/authors/",groupDeleteAuthors)
router.delete("/author/:id",deleteAuthor)



router.post("/articles",createArticle)

router.put("/article/:id",updateArticle)

router.delete("/articles/",groupDeleteArticles)
router.delete("/article/:id",deleteArticle)


router.post("/upload",upload.single('file'),(req,res)=>{

    if(!req.file){
        res.status(500).json({success:false,message:"Internal Error,file not found"})
    }

    res.status(200).json({success:true,filename:req.file.filename,message:'Image upload successfull'})
})


module.exports=router;