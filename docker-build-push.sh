#!/bin/bash

# Set variables
IMAGE_NAME="gugusd999/heygen-ai"
VERSION="latest"

echo "=== Starting Docker build and push process ==="

# Step 1: Build the image
echo "Step 1: Building Docker image..."
docker build -t ${IMAGE_NAME}:${VERSION} .

# Step 2: Push the image
echo "Step 2: Pushing image to registry..."
docker push ${IMAGE_NAME}:${VERSION}

echo "=== Build and push completed successfully ==="
echo "Image pushed to: ${IMAGE_NAME}:${VERSION}" 