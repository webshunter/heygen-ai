#!/bin/bash

echo "=== Starting Docker deployment process ==="

# Step 1: Check and remove existing container
echo "Step 1: Checking existing container..."
if docker ps -a | grep -q "nextjs-container"; then
    echo "Found existing container, stopping and removing it..."
    docker stop nextjs-container
    docker rm nextjs-container
    echo "Container removed successfully"
else
    echo "No existing container found"
fi

# Step 2: Check and remove existing image
echo "Step 2: Checking existing image..."
if docker images | grep -q "nextjs-app"; then
    echo "Found existing image, removing it..."
    docker rmi nextjs-app
    echo "Image removed successfully"
else
    echo "No existing image found"
fi

# Step 3: Build new image
echo "Step 3: Building new image..."
docker build -t nextjs-app .
echo "New image built successfully"

# Step 4: Run new container
echo "Step 4: Starting new container..."
docker run -d \
    --name nextjs-container \
    -p 3001:3000 \
    --restart unless-stopped \
    nextjs-app

echo "=== Deployment completed successfully ==="
echo "Your application is now running at: http://localhost:3001" 