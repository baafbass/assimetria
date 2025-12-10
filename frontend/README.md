# Frontend - Assimetria
React-based frontend for displaying AI-generated blog articles.

## Features

- Modern **React 18** + **Vite**
- **React Router** for navigation
- Responsive design
- Article list and detail views
- **Nginx** for production serving

## Setup

### Install Dependencies
 ```bash
 npm install
 ```

### Environment Variables
 ```env
 VITE_API_URL=/api
 ```

### Run Development Server
 ```bash
 npm start
 ```
 App opens at http://localhost:5173/

## Project Structure

frontend/
    ├── public/
        └── vite.svg
    ├── src/
        ├── api/
            └── client.js
        ├── assets/
            └── react.svg
        ├── components/
            ├── ArticleCard.css
            └── ArticleCard.jsx
        ├── pages/
            ├── article/
                ├── ArticlePage.css
                └── ArticlePage.jsx
            └── home/
                ├── HomePage.css
                └── HomePage.jsx
        ├── utils/
            └── article.js
        ├── App.css
        ├── App.jsx
        ├── index.css
        └── main.jsx
    ├── .gitignore
    ├── Dockerfile
    ├── eslint.config.js
    ├── index.html
    ├── nginx.conf
    ├── package-lock.json
    ├── package.json
    ├── README.md
    └── vite.config.js

## Components

### HomePage

- Fetches and displays all articles
- Grid layout with article cards
- Loading and error states

### ArticlePage

- Displays full article content
- Dynamic routing with article ID
- Back navigation

### ArticleCard

- Reusable article preview
- Shows title, date, and excerpt
- Links to full article

### Styling

- CSS Modules for component styles
- Responsive design (mobile-first)
- Clean, modern UI

## Docker

### Build:

```bash
docker build -t autoblog-frontend .
```

## The Docker build:

1. Builds React app
2. Copies to Nginx
3. Serves on port 80

## Nginx Configuration

### The nginx.conf file:

- Serves React app
- Proxies /api requests to backend
- Handles client-side routing