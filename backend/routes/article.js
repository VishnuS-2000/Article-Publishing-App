const { getArticles, getArticleById,getArticleByQuery } = require('./controllers/articleController');

const router=require('express').Router()




router.get("/search",getArticleByQuery)
router.get("/",getArticles)
router.get("/:id",getArticleById)


module.exports=router;