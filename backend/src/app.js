require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');

const articleRoutes = require('./routes/articles');
const { initDB } = require('./config/database');
const {_getAllArticles} = require('./services/database');
const { generateAndSaveArticle } = require('./services/articleJob');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api', articleRoutes);


app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Initialize database and start server
async function start() {
  try {
    
    await initDB();
    console.log('Database initialized');

    const articles = await _getAllArticles();
    
    if (articles.length === 0) {
      console.log('Generating initial articles...');
      for (let i = 0; i < 3; i++) {
        await generateAndSaveArticle();
        console.log(`Generated article ${i + 1}/3`);
      }
    }

    // Schedule daily article generation at 9 AM
    cron.schedule('0 9 * * *', async () => {
      console.log('Running scheduled article generation...');
      try {
        await generateAndSaveArticle();
        console.log('Scheduled article generated successfully');
      } catch (error) {
        console.error('Error generating scheduled article:', error);
      }
    });

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Backend server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();