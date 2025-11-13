'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Flame, Dumbbell, Target, TrendingUp } from 'lucide-react'

export function DashboardStats() {
  const stats = [
    {
      title: "Today's Calories",
      value: "1,300 / 2,000",
      unit: "kcal",
      icon: Flame,
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-950",
      progress: 65
    },
    {
      title: "Weekly Workouts",
      value: "4 / 5",
      unit: "sessions",
      icon: Dumbbell,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      progress: 80
    },
    {
      title: "Monthly Goal",
      value: "85%",
      unit: "complete",
      icon: Target,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950",
      progress: 85
    },
    {
      title: "Weight Change",
      value: "-2.3",
      unit: "kg",
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      progress: 70
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.unit}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}