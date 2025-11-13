#!/bin/bash

echo "🚀 Deploying Rohith's Gym Website to Vercel..."

# Install Vercel CLI if not already installed
npm install -g vercel

# Build the project
echo "📦 Building the project..."
npm run build

# Deploy to Vercel with the project name "rohith"
echo "🌐 Deploying to Vercel..."
npx vercel --prod --name rohith

echo "✅ Deployment complete!"
echo "🌍 Your website will be available at: https://rohith.vercel.app"