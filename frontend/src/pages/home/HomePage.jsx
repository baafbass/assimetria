import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getArticles } from '../../api/client';
import ArticleCard from '../../components/ArticleCard';
import './HomePage.css';

const HomePage = () => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const data = await getArticles();
      setArticles(data);
      setError(null);
    } catch (err) {
      setError('Failed to load articles. Please try again later.');
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading articles...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={fetchArticles}>Retry</button>
      </div>
    );
  }

  return (
    <div className="home-page">
      <h2>Latest Articles</h2>
      <div className="articles-grid">
        {articles.length === 0 ? (
          <p className="no-articles">No articles yet. Check back soon!</p>
        ) : (
          articles.map(article => (
            <ArticleCard key={article.id} article={article} />
          ))
        )}
      </div>
    </div>
  );
}

export default HomePage;