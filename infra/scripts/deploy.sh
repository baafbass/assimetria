#!/bin/bash

set -e

echo "Starting deployment..."

# Variables
AWS_REGION=""
AWS_ACCOUNT_ID=""
ECR_BACKEND="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/assimetria-backend:latest"
ECR_FRONTEND="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/assimetria-frontend:latest"

echo "Logging into ECR..."
aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com

echo "Pulling latest images..."
docker pull ${ECR_BACKEND}
docker pull ${ECR_FRONTEND}


echo "Stopping old containers..."
docker-compose -f /home/ec2-user/assimetria/infra/docker-compose.prod.yml down || true

echo "Starting new containers..."
docker-compose -f /home/ec2-user/assimetria/infra/docker-compose.prod.yml up -d

echo "Deployment completed successfully!"

echo "Cleaning up old images..."
docker image prune -f