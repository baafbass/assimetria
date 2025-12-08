import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSanitize from "rehype-sanitize";
import "./ArticlePage.css";

import { getArticle } from "../../api/client";
import { FaArrowLeft } from "react-icons/fa";

const ArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticle();
  }, [id]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const data = await getArticle(id);
      setArticle(data);
      setError(null);
    } catch (err) {
      setError("Article not found.");
      console.error("Error fetching article:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading article...</div>;

  if (error || !article)
    return (
      <div className="error">
        <p>{error}</p>
        <Link to="/" className="back-link">
          <FaArrowLeft /> Back to Home
        </Link>
      </div>
    );

  return (
    <div className="article-page">
      <Link to="/" className="back-link">
        <FaArrowLeft /> Back to Articles
      </Link>

      <article className="article-content">
        <h1 className="article-title">{article.title}</h1>
        <p className="article-date">
          {new Date(article.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div className="article-body">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({node, ...props}) => <h1 className="article-h1" {...props} />,
              h2: ({node, ...props}) => <h2 className="article-h2" {...props} />,
              h3: ({node, ...props}) => <h3 className="article-h3" {...props} />,
              p: ({node, ...props}) => <p className="article-p" {...props} />,
              img: ({node, ...props}) => (
                <img className="article-image" {...props} />
              ),
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
};

export default ArticlePage;
