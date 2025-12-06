const {_getAllArticles,_getArticleById } = require('../services/database');

const getAllArticles = async (req, res) => {
  try {
    const articles = await _getAllArticles();
    res.status(200).json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
}

const getArticle = async (req, res) => {
  try {
    const article = await _getArticleById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.status(200).json(article);
  } catch (error) {
    console.error('Error fetching article:', error);
    res.status(500).json({ error: 'Failed to fetch article' });
  }
}

module.exports = {
	getAllArticles,
	getArticle
}