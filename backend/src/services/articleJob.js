const { generateArticle } = require('./aiClient');
const {_createArticle} = require('./database');

const generateAndSaveArticle = async () => {
  try {
    console.log('Generating new article...');
    const article = await generateArticle();
    
    const saved = await _createArticle(article.title, article.content);
    console.log(`Article created: ${saved.title} (ID: ${saved.id})`);
    
    return saved;
  } catch (error) {
    console.error('Error in article generation job:', error);
    throw error;
  }
}

module.exports = {
  generateAndSaveArticle
};