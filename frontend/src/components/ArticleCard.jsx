import React from "react";
import { Link } from "react-router-dom";
import "./ArticleCard.css";
import { FaArrowRight } from "react-icons/fa";

import {extractFirstImageUrl,markdownToPlain,getPreview} from '../utils/article';

const ArticleCard = ({ article }) => {
  const imageUrl = extractFirstImageUrl(article.content);
  const preview = getPreview(article.content);

  return (
    <article className="article-card" aria-labelledby={`article-title-${article.id}`}>
      {imageUrl && (
        <div className="article-card-thumb">
          <img src={imageUrl} alt={article.title + " thumbnail"} className="article-thumb-img" />
        </div>
      )}

      <div className="article-card-body">
        <h3 id={`article-title-${article.id}`} className="article-card-title">
          {article.title}
        </h3>

        <p className="article-date">
          {new Date(article.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>

        <p className="article-preview">{preview}</p>

        <Link to={`/article/${article.id}`} className="read-more" aria-label={`Read more about ${article.title}`}>
          Read More <FaArrowRight />
        </Link>
      </div>
    </article>
  );
};

export default ArticleCard;
