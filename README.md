# Assimetria
An AI-powered blog platform that automatically generates and publishes articles daily using HuggingFace's free API. Built with React, Node.js, PostgreSQL, and deployed on AWS.

## Features

- AI-generated articles using HuggingFace **Deepseek-ai**
- Automated **daily article generation**
- Responsive **React** frontend
- **RESTful API** backend
- **PostgreSQL** database
- Fully **Dockerized**
- **AWS** deployment (**EC2, ECR, CodeBuild**)

## Tech Stack

- **Frontend**: React 19 + Vite , React Router, Axios
- **Backend**: Node.js, Express, node-cron
- **Database**: PostgreSQL 16
- **AI**: HuggingFace Inference API (Deepseek-ai)
- **Infrastructure**: Docker, AWS EC2, ECR, CodeBuild

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
docs/
    └── ARCHITECTURE.md
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
infra/
    ├── scripts/
        ├── deploy.sh
        └── init-ec2.sh
    ├── buildspec.yml
    ├── docker-compose.prod.yml
    └── docker-compose.yml
.gitignore
```

## Local Development Setup

### Prerequisites

- Node.js 18+
- Docker & Docker Compose
- HuggingFace API key (free)

## Step 1: Clone Repository

```bash
git clone <your-repo-url>
cd assimetria
```

## Step 2: Setup Backend

```bash
cd backend
cp .env.example .env
# Edit .env and add your HF_API_KEY,DB_USER,DB_PASSWORD...etc
npm install
```

## Step 3: Setup Frontend

```bash
cd ../frontend
cp .env.example .env
npm install
```

## Step 4: Run with Docker Compose

```bash
cd ../infra
docker-compose up --build
```

The application will be available at:

- Frontend: http://localhost
- Backend API: http://localhost:3001
- PostgreSQL: localhost:5432

## Getting HuggingFace API Key (Free)

1. Go to https://huggingface.co/
2. Sign up for a free account
3. Go to Settings → Access Tokens
4. Create a new token
5. Copy and use in your ```.env``` file

## AWS Deployment Guide

### Prerequisites

- AWS Account
- AWS CLI configured
- GitHub repository

## Step 1: Create ECR Repositories

```bash
aws ecr create-repository --repository-name assimetria-backend --region your_region
aws ecr create-repository --repository-name assimetria-frontend --region your_region
```

## Step 2: Create CodeBuild Project

1. Go to AWS CodeBuild console
2. Create new project:
   - Source: Connect to your GitHub repo
   - Environment: Managed image, Ubuntu, Standard, aws/codebuild/standard:7.0
   - Buildspec: Use the infra/buildspec.yml file
   - Service role: Create new or use existing


3. Add environment variables:
   - ```AWS_DEFAULT_REGION```: your region
   - ```AWS_ACCOUNT_ID```: your account ID

## Step 3: Launch EC2 Instance

1. Launch t3.micro (free tier) Amazon Linux 2 instance
2. Security Group rules:
   - SSH (22): Your IP
   - HTTP (80): 0.0.0.0/0
   - Custom TCP (3001): 0.0.0.0/0
3. Attach IAM role with ECR pull permissions

## Step 4: Setup EC2

### SSH into your instance and run:

```bash
# Download init script
curl -O https://raw.githubusercontent.com/YOUR_REPO/main/infra/scripts/init-ec2.sh
chmod +x init-ec2.sh
./init-ec2.sh

# Configure environment
cd /home/ec2-user/assimetria
nano .env
# Add your variables:
# HF_API_KEY=your_key
# AWS_REGION=your_region
# AWS_ACCOUNT_ID=your_id
```

## Step 5: Deploy

```bash
./infra/scripts/deploy.sh
```
Your application is now live at your EC2 public IP!

## Environment Variables

### Backend

```env
PORT=3001
DB_HOST=postgres
DB_PORT=5432
DB_NAME=assimetriaDB
DB_USER=postgres
DB_PASSWORD=postgres
HF_API_KEY=your_huggingface_api_key
```

### Frontend

```env
VITE_API_URL=/api
```

## API Endpoints

- ```GET /api/articles``` - Get all articles
- ```GET /api/articles/:id``` - Get specific article
- ```GET /health``` - Health check

## Article Generation

- Runs daily at 9:00 AM (configurable in backend/src/app.js)
- Generates 3 articles on first startup
- Uses HuggingFace deepseek-ai/DeepSeek-V3.2:novita model

## Future Enhancements

- Add user authentication
- Implement article categories
- Add search functionality
- Implement caching layer
- Add CI/CD automation
- Implement blue-green deployment
- Add monitoring and alerting