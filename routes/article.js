const { getArticles, getArticleById,getArticlesByQuery, getStudentArticles } = require('./controllers/articleController');

const router=require('express').Router()



router.get('/search',getArticlesByQuery)
router.get("/",getArticles)

router.get('/student',getStudentArticles)

router.get("/:id",getArticleById)




module.exports=router;