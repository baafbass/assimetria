import React from 'react';
import { Link } from 'react-router-dom';
import './ArticleCard.css';

import { FaArrowRight } from "react-icons/fa";

const ArticleCard = ({ article }) => {

  const getPreview = (content) => {
    const preview = content.substring(0, 200);
    return preview + (content.length > 200 ? '...' : '');
  };

  return (
    <div className="article-card">
      <h3>{article.title}</h3>
      <p className="article-date">
        {new Date(article.created_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        })}
      </p>
      <p className="article-preview">{getPreview(article.content)}</p>
      <Link to={`/article/${article.id}`} className="read-more">
        Read More <FaArrowRight/>
      </Link>
    </div>
  );
}

export default ArticleCard;