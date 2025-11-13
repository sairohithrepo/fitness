@echo off
echo 🚀 Deploying Rohith's Gym Website...

REM Step 1: Install Vercel CLI
echo 📦 Installing Vercel CLI...
npm install -g vercel

REM Step 2: Login to Vercel
echo 🔐 Please login to Vercel...
vercel login

REM Step 3: Build the project
echo 📦 Building the project...
npm run build

REM Step 4: Deploy to Vercel
echo 🌐 Deploying to Vercel...
vercel --prod

echo ✅ Deployment complete!
echo 🌍 Your website is now live at: https://rohith.vercel.app
pause