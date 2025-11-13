'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Dumbbell, Clock, Flame, CheckCircle, Plus, Play, Calendar } from 'lucide-react'

interface Workout {
  id: string
  name: string
  description: string
  duration: number
  calories: number
  date: string
  completed: boolean
  exercises: Exercise[]
}

interface Exercise {
  id: string
  name: string
  sets: number
  reps: number
  weight?: number
  duration?: number
  completed: boolean
}

export function WorkoutSchedule() {
  const [workouts, setWorkouts] = useState<Workout[]>([
    {
      id: '1',
      name: 'Upper Body Strength',
      description: 'Focus on chest, shoulders, and arms',
      duration: 45,
      calories: 320,
      date: new Date().toISOString(),
      completed: false,
      exercises: [
        { id: '1', name: 'Bench Press', sets: 4, reps: 10, weight: 60, completed: true },
        { id: '2', name: 'Shoulder Press', sets: 3, reps: 12, weight: 20, completed: true },
        { id: '3', name: 'Bicep Curls', sets: 3, reps: 15, weight: 12, completed: false },
        { id: '4', name: 'Tricep Dips', sets: 3, reps: 10, weight: 0, completed: false }
      ]
    },
    {
      id: '2',
      name: 'Lower Body Power',
      description: 'Legs and glutes workout',
      duration: 50,
      calories: 400,
      date: new Date(Date.now() + 86400000).toISOString(),
      completed: false,
      exercises: [
        { id: '5', name: 'Squats', sets: 4, reps: 12, weight: 80, completed: false },
        { id: '6', name: 'Lunges', sets: 3, reps: 10, weight: 20, completed: false },
        { id: '7', name: 'Calf Raises', sets: 4, reps: 15, weight: 30, completed: false }
      ]
    },
    {
      id: '3',
      name: 'Cardio HIIT',
      description: 'High-intensity interval training',
      duration: 30,
      calories: 350,
      date: new Date(Date.now() - 86400000).toISOString(),
      completed: true,
      exercises: [
        { id: '8', name: 'Burpees', sets: 5, duration: 1, completed: true },
        { id: '9', name: 'Mountain Climbers', sets: 4, duration: 1, completed: true },
        { id: '10', name: 'Jump Squats', sets: 4, duration: 1, completed: true }
      ]
    }
  ])

  const [activeWorkout, setActiveWorkout] = useState<Workout | null>(null)

  const toggleExerciseComplete = (workoutId: string, exerciseId: string) => {
    setWorkouts(workouts.map(workout => {
      if (workout.id === workoutId) {
        const updatedExercises = workout.exercises.map(exercise =>
          exercise.id === exerciseId ? { ...exercise, completed: !exercise.completed } : exercise
        )
        const allCompleted = updatedExercises.every(ex => ex.completed)
        return { ...workout, exercises: updatedExercises, completed: allCompleted }
      }
      return workout
    }))
  }

  const startWorkout = (workout: Workout) => {
    setActiveWorkout(workout)
  }

  const completeWorkout = (workoutId: string) => {
    setWorkouts(workouts.map(workout =>
      workout.id === workoutId ? { ...workout, completed: true } : workout
    ))
    setActiveWorkout(null)
  }

  const upcomingWorkouts = workouts.filter(w => !w.completed && new Date(w.date) >= new Date())
  const completedWorkouts = workouts.filter(w => w.completed)
  const weeklyStats = {
    totalWorkouts: workouts.length,
    completedWorkouts: completedWorkouts.length,
    totalCalories: workouts.reduce((sum, w) => sum + w.calories, 0),
    totalMinutes: workouts.reduce((sum, w) => sum + w.duration, 0)
  }

  return (
    <div className="space-y-6">
      {/* Weekly Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{weeklyStats.totalWorkouts}</div>
            <div className="text-sm text-muted-foreground">Total Workouts</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{weeklyStats.completedWorkouts}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">{weeklyStats.totalCalories}</div>
            <div className="text-sm text-muted-foreground">Calories Burned</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{weeklyStats.totalMinutes}</div>
            <div className="text-sm text-muted-foreground">Minutes Active</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Workouts</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="library">Exercise Library</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingWorkouts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Dumbbell className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">No upcoming workouts</p>
                <p className="text-sm text-muted-foreground">Schedule your next workout!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {upcomingWorkouts.map((workout) => (
                <Card key={workout.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{workout.name}</CardTitle>
                        <CardDescription>{workout.description}</CardDescription>
                      </div>
                      <Badge variant={workout.completed ? "default" : "secondary"}>
                        {workout.completed ? "Completed" : "Scheduled"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{workout.duration} min</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Flame className="w-4 h-4" />
                          <span>{workout.calories} kcal</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(workout.date).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{workout.exercises.filter(ex => ex.completed).length}/{workout.exercises.length} exercises</span>
                        </div>
                        <Progress 
                          value={(workout.exercises.filter(ex => ex.completed).length / workout.exercises.length) * 100} 
                          className="h-2" 
                        />
                      </div>

                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="flex-1">
                              View Details
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>{workout.name}</DialogTitle>
                              <DialogDescription>{workout.description}</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                              <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="p-3 bg-muted rounded-lg">
                                  <div className="font-semibold">{workout.duration} min</div>
                                  <div className="text-sm text-muted-foreground">Duration</div>
                                </div>
                                <div className="p-3 bg-muted rounded-lg">
                                  <div className="font-semibold">{workout.calories} kcal</div>
                                  <div className="text-sm text-muted-foreground">Calories</div>
                                </div>
                                <div className="p-3 bg-muted rounded-lg">
                                  <div className="font-semibold">{workout.exercises.length}</div>
                                  <div className="text-sm text-muted-foreground">Exercises</div>
                                </div>
                              </div>
                              <div className="space-y-3">
                                <h4 className="font-semibold">Exercises</h4>
                                {workout.exercises.map((exercise) => (
                                  <div key={exercise.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                                    <div>
                                      <div className="font-medium">{exercise.name}</div>
                                      <div className="text-sm text-muted-foreground">
                                        {exercise.sets} sets × {exercise.reps} reps
                                        {exercise.weight && ` • ${exercise.weight}kg`}
                                        {exercise.duration && ` • ${exercise.duration} min`}
                                      </div>
                                    </div>
                                    <Button
                                      size="sm"
                                      variant={exercise.completed ? "default" : "outline"}
                                      onClick={() => toggleExerciseComplete(workout.id, exercise.id)}
                                    >
                                      {exercise.completed ? (
                                        <CheckCircle className="w-4 h-4" />
                                      ) : (
                                        <div className="w-4 h-4 border-2 border-current rounded" />
                                      )}
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={() => startWorkout(workout)}
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Start
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedWorkouts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <CheckCircle className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">No completed workouts yet</p>
                <p className="text-sm text-muted-foreground">Complete your first workout to see it here!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {completedWorkouts.map((workout) => (
                <Card key={workout.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{workout.name}</h4>
                        <p className="text-sm text-muted-foreground">{workout.description}</p>
                      </div>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{workout.duration} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Flame className="w-3 h-3" />
                        <span>{workout.calories} kcal</span>
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-muted-foreground">
                      Completed on {new Date(workout.date).toLocaleDateString()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="library">
          <Card>
            <CardHeader>
              <CardTitle>Exercise Library</CardTitle>
              <CardDescription>Browse exercises to add to your workouts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <Dumbbell className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Exercise library coming soon...</p>
                <p className="text-sm">Browse and add exercises to create custom workouts</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}