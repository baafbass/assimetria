#!/bin/bash

set -e

echo "Updating system packages..."
sudo yum update -y

echo "Installing Docker..."
sudo yum install docker -y
sudo service docker start
sudo usermod -a -G docker ec2-user

echo "Installing Docker Compose..."
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

echo "Installing AWS CLI..."
sudo yum install aws-cli -y

echo "Creating application directory..."
mkdir -p /home/ec2-user/assimetria
cd /home/ec2-user/assimetria

echo "Cloning repository..."
git clone REPO_URL .

echo "Creating environment files..."
cat > .env << EOF
HF_API_KEY=huggingface_api_key
AWS_REGION=aws_region
AWS_ACCOUNT_ID=account_id
EOF

echo "Setup completed!"