# 🏋️‍♂️ Rohith FitTrack Pro 2024

A comprehensive fitness tracking web application that helps users regulate calories and maintain their gym schedule.

## ✨ Features

- 🍎 **Calorie Tracking**: Log meals, track nutrition, and monitor daily calorie intake
- 💪 **Workout Management**: Schedule workouts, track exercises, and monitor progress
- 📊 **Progress Tracking**: Monitor weight, body measurements, and fitness goals
- 👤 **User Profile**: Personal information, health stats, and goal settings
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation
```bash
# Clone repository
git clone <your-repo-url>
cd rohith-fittrack-pro-2024

# Install dependencies
npm install

# Set up database
npm run db:push

# Seed the database with sample data
npx tsx prisma/seed.ts

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui
- **Database**: Prisma ORM with SQLite
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push database schema
npm run db:generate  # Generate Prisma client
```

## 🚀 Deployment

### Vercel (Recommended)
1. Install Vercel CLI: `npm install -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel --prod`

### Netlify
1. Build the project: `npm run build`
2. Deploy the `.next` folder to Netlify

## 📱 Live Demo

🌍 **Live URL**: [https://rohith-fittrack-pro-2024.vercel.app](https://rohith-fittrack-pro-2024.vercel.app)

## 🗄️ Database Schema

The application uses the following main models:
- **Users**: Personal information and fitness goals
- **Meals**: Nutrition tracking and meal logging
- **Workouts**: Exercise routines and schedules
- **Progress**: Body measurements and fitness progress
- **Exercises**: Exercise library for workouts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit them
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

Created by Rohith - Personal Fitness Tracking Solution for 2024

---

**Note**: This is a personal fitness tracking application designed to help users maintain their gym schedule and regulate their calorie intake effectively.