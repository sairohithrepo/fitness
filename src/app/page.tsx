'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Calendar, Flame, Dumbbell, TrendingUp, Plus, CheckCircle } from 'lucide-react'
import { DashboardStats } from '@/components/dashboard-stats'
import { CalorieTracker } from '@/components/calorie-tracker'
import { WorkoutSchedule } from '@/components/workout-schedule'
import { ProgressTracker } from '@/components/progress-tracker'
import { UserProfile } from '@/components/user-profile'

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Rohith FitTrack Pro</h1>
            <p className="text-muted-foreground">Your personal fitness and nutrition companion</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Today
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Quick Add
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="calories">Calories</TabsTrigger>
            <TabsTrigger value="workouts">Workouts</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <DashboardStats />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-500" />
                    Today's Calories
                  </CardTitle>
                  <CardDescription>Track your daily nutrition intake</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Daily Goal</span>
                      <span className="text-sm text-muted-foreground">2,000 kcal</span>
                    </div>
                    <Progress value={65} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span>1,300 consumed</span>
                      <span>700 remaining</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-muted rounded p-2">
                        <div className="text-xs text-muted-foreground">Protein</div>
                        <div className="font-semibold text-sm">45g</div>
                      </div>
                      <div className="bg-muted rounded p-2">
                        <div className="text-xs text-muted-foreground">Carbs</div>
                        <div className="font-semibold text-sm">180g</div>
                      </div>
                      <div className="bg-muted rounded p-2">
                        <div className="text-xs text-muted-foreground">Fat</div>
                        <div className="font-semibold text-sm">55g</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Dumbbell className="w-5 h-5 text-blue-500" />
                    Today's Workout
                  </CardTitle>
                  <CardDescription>Your scheduled training session</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <h4 className="font-semibold">Upper Body Strength</h4>
                        <p className="text-sm text-muted-foreground">45 minutes • 320 kcal</p>
                      </div>
                      <Button size="sm" variant="outline">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Start
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Exercises</span>
                        <span>6 of 6 completed</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Next: Cardio tomorrow at 7:00 AM
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  Weekly Progress
                </CardTitle>
                <CardDescription>Your fitness journey over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-green-600">5</div>
                    <div className="text-sm text-muted-foreground">Workouts Completed</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">12,450</div>
                    <div className="text-sm text-muted-foreground">Calories Burned</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-orange-600">280</div>
                    <div className="text-sm text-muted-foreground">Minutes Active</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">-1.2</div>
                    <div className="text-sm text-muted-foreground">Weight (kg)</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calories">
            <CalorieTracker />
          </TabsContent>

          <TabsContent value="workouts">
            <WorkoutSchedule />
          </TabsContent>

          <TabsContent value="progress">
            <ProgressTracker />
          </TabsContent>

          <TabsContent value="profile">
            <UserProfile />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}