const {pool} = require('../config/database');

const _getAllArticles = async () => {
  const result = await pool.query(
    'SELECT id, title, content, created_at FROM articles ORDER BY created_at DESC'
  );
  return result.rows;
}

const _getArticleById = async (id) => {
  const result = await pool.query(
    'SELECT id, title, content, created_at FROM articles WHERE id = $1',
    [id]
  );
  return result.rows[0];
}

const _createArticle = async (title, content) => {
  const result = await pool.query(
    'INSERT INTO articles (title, content) VALUES ($1, $2) RETURNING *',
    [title, content]
  );
  return result.rows[0];
}

module.exports = {
  _getAllArticles,
  _getArticleById,
  _createArticle
}