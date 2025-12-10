# Backend - Assimetria
Node.js/Express backend with AI-powered article generation.

## Features

- **RESTful API** for article management
- **AI** article generation using **HuggingFace**
- Automated daily scheduling with **node-cron**
- **PostgreSQL** integration
- **Docker** support

## Setup

### Install Dependencies

```bash
npm install
```

## Environment Variables

### Create a ```.env``` file:

```env
PORT=3001
DB_HOST=localhost
DB_PORT=5432
DB_NAME=assimetriaDB
DB_USER=
DB_PASSWORD=
HF_API_KEY=your_huggingface_api_key
HF_MODEL=deepseek-ai/DeepSeek-V3.2:novita
```

## Run Locally

```bash
npm run dev
```

## API Endpoints

### Get All Articles

```http
GET /api/articles
```

### Response:

```json
[
  {
    "id": 1,
    "title": "Article Title",
    "content": "Article content...",
    "created_at": "2024-12-05T10:00:00.000Z"
  }
]
```

### Get Single Article

```http
GET /api/articles/:id
```

### Response:

```json
{
  "id": 1,
  "title": "Article Title",
  "content": "Full article content...",
  "created_at": "2024-12-05T10:00:00.000Z"
}
```

### Health Check

```http
GET /health
```

### Response:

```json
{
  "status": "ok",
  "timestamp": "2024-12-05T10:00:00.000Z"
}
```

## Article Generation

### The system automatically generates articles using:

- Model: **deepseek-ai/DeepSeek-V3.2:novita** via **HuggingFace**
- Schedule: Daily at **9:00 AM**
- Topics: Randomly selected from predefined list

## Database Schema

```sql
CREATE TABLE articles (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Project Structure

```
backend/
    ├── src/
        ├── config/
            └── database.js
        ├── controllers/
            └── articles.js
        ├── routes/
            └── articles.js
        ├── services/
            ├── aiClient.js
            ├── articleJob.js
            └── database.js
        └── app.js
    ├── Dockerfile
    ├── package-lock.json
    ├── package.json
    └── README.md
```

## Docker

### Build:

```bash
docker build -t autoblog-backend .
```
### Run:

```bash
docker run -p 3001:3001 -e DB_HOST=postgres -e HF_API_KEY=your_key assimetria-backend
```

## Testing

### Test the API:

```bash
# Health check
curl http://localhost:3001/health

# Get articles
curl http://localhost:3001/api/articles

# Get specific article
curl http://localhost:3001/api/articles/1
```