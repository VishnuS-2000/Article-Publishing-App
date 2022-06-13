const { getArticles, getArticleById,getArticlesByQuery } = require('./controllers/articleController');

const router=require('express').Router()




router.get('/search',getArticlesByQuery)
router.get("/",getArticles)
router.get("/:id",getArticleById)



module.exports=router;