#!/bin/bash

# Build script for Portfolio Analyzer
echo "🚀 Building Portfolio Analyzer..."

# Build the Docker image
docker build -t portfolio-analyzer:latest .

echo "✅ Build complete!"
echo ""
echo "To run the container:"
echo "  docker run -p 80:80 portfolio-analyzer:latest"
echo ""
echo "Or use docker-compose:"
echo "  npm run docker:prod"
