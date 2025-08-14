# Deployment Guide

This guide explains how to deploy your Portfolio Analyzer using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose installed
- Port 80 (or custom port) available

## Quick Start

### 1. Development Deployment

```bash
# Start development environment
npm run docker:dev

# Access at http://localhost:3000
```

### 2. Production Deployment

```bash
# Build and start production container
npm run docker:prod

# Access at http://localhost:80
```

## Manual Docker Commands

### Build Image
```bash
docker build -t portfolio-analyzer:latest .
```

### Run Container
```bash
# Standard port 80
docker run -d -p 80:80 --name portfolio-analyzer portfolio-analyzer:latest

# Custom port
docker run -d -p 8080:80 --name portfolio-analyzer portfolio-analyzer:latest
```

### Stop and Remove
```bash
docker stop portfolio-analyzer
docker rm portfolio-analyzer
```

## Production Considerations

### Environment Variables
Create a `.env` file for production:
```env
NODE_ENV=production
PORT=80
```

### Reverse Proxy
For production, consider using a reverse proxy like Nginx:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### SSL/HTTPS
Use Let's Encrypt with Certbot for free SSL certificates:

```bash
# Install certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com
```

## Cloud Deployment

### AWS EC2
1. Launch EC2 instance
2. Install Docker
3. Clone repository
4. Run `npm run docker:prod`

### Google Cloud Run
```bash
# Build and push to Container Registry
docker tag portfolio-analyzer:latest gcr.io/PROJECT-ID/portfolio-analyzer:latest
docker push gcr.io/PROJECT-ID/portfolio-analyzer:latest

# Deploy to Cloud Run
gcloud run deploy portfolio-analyzer \
  --image gcr.io/PROJECT-ID/portfolio-analyzer:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Docker Hub
```bash
# Tag and push to Docker Hub
docker tag portfolio-analyzer:latest yourusername/portfolio-analyzer:latest
docker push yourusername/portfolio-analyzer:latest

# Pull and run on any server
docker pull yourusername/portfolio-analyzer:latest
docker run -d -p 80:80 yourusername/portfolio-analyzer:latest
```

## Monitoring and Maintenance

### Health Check
The app includes a health check endpoint:
```bash
curl http://localhost/health
# Should return: healthy
```

### Logs
```bash
# View container logs
docker logs portfolio-analyzer

# Follow logs in real-time
docker logs -f portfolio-analyzer
```

### Updates
```bash
# Pull latest changes
git pull origin main

# Rebuild and restart
npm run docker:prod
```

## Troubleshooting

### Port Already in Use
```bash
# Check what's using port 80
sudo lsof -i :80

# Kill process or use different port
docker run -d -p 8080:80 portfolio-analyzer:latest
```

### Container Won't Start
```bash
# Check container logs
docker logs portfolio-analyzer

# Check container status
docker ps -a
```

### Permission Issues
```bash
# Run with sudo if needed
sudo docker run -d -p 80:80 portfolio-analyzer:latest
```
