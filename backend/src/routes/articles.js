const express = require('express');
const router = express.Router();

const { getAllArticles, getArticle } = require('../controllers/articles');

router.get('/articles', getAllArticles );
router.get('/:id', getArticle);

module.exports = router;