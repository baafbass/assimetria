const express = require('express');
const router = express.Router();

const { getAllArticles, getArticle } = require('../controllers/articles');

router.get('/articles', getAllArticles );
router.get('/articles/:id', getArticle);

module.exports = router;