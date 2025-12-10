# Architecture Documentation

## System Overview
This is an auto-generated blog platform that uses AI to create daily articles. The system consists of three main components:

1. **Frontend**: React-based web interface
2. **Backend**: Node.js API server with automated article generation
3. **Database**: PostgreSQL for persistent storage

## Architecture Diagram

```
┌─────────────┐
│   User      │
└──────┬──────┘
       │
       ▼
┌─────────────────────┐
│  Frontend (React)   │
│  - Article List     │
│  - Article View     │
│  - Nginx Server     │
└──────┬──────────────┘
       │ HTTP/REST
       ▼
┌─────────────────────┐
│  Backend (Node.js)  │
│  - Express API      │
│  - Article Routes   │
│  - AI Generation    │
│  - Cron Scheduler   │
└──────┬──────────────┘
       │ SQL
       ▼
┌─────────────────────┐
│  PostgreSQL DB      │
│  - Articles Table   │
└─────────────────────┘
```

## Component Details

### Frontend (React)

- **Technology**: React 19 with React Router
- **Build**: Multi-stage Docker build with Nginx
- **Features**:
  - List all articles
  - View individual articles
  - Responsive design
  -Client-side routing

### Backend (Node.js)

- **Technology**: Express.js
- **Features**:
  - RESTful API endpoints
  - AI-powered article generation using HuggingFace
  - Automated scheduling with node-cron
  - Database operations

### Endpoints:

  - ```http GET /api/articles``` - List all articles
  - ```http GET /api/articles/:id``` - Get specific article
  - ```http GET /health``` - Health check

### Database (PostgreSQL)

- Schema:

```sql  
CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
```

## AI Integration
The system uses HuggingFace Inference API with the deepseek-ai/DeepSeek-V3.2:novita model for article generation. The AI service:

- Generates articles on random topics
- Runs automatically once per day at 9 AM
- Creates 3 initial articles on first startup

## Deployment Architecture

### AWS Infrastructure

```
GitHub Repository
       ↓
AWS CodeBuild
       ↓
AWS ECR (Docker Images)
       ↓
EC2 Instance
   ├── Frontend Container (Port 80)
   ├── Backend Container (Port 3001)
   └── PostgreSQL Container
```

### Deployment Flow

1. Code pushed to GitHub
2. CodeBuild triggers automatically
3. Builds Docker images for frontend and backend
4. Pushes images to ECR
5. EC2 pulls latest images
6. Docker Compose starts containers

## Security Considerations

- Environment variables for sensitive data
- Database not exposed to public internet
- API accessible only through frontend proxy
- ECR images scanned for vulnerabilities
- EC2 security groups configured for minimal access

## Scalability

### Current setup is for single EC2 instance. For scaling:

- Add load balancer
- Multiple EC2 instances
- RDS for managed PostgreSQL
- ElastiCache for caching
- S3 for static assets

## Monitoring

- Docker health checks
- Application logs
- Database connection pooling
- Error handling with proper logging