'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Flame, Utensils, Calendar } from 'lucide-react'

interface Meal {
  id: string
  name: string
  calories: number
  protein: number
  carbs: number
  fat: number
  mealType: string
  time: string
}

export function CalorieTracker() {
  const [meals, setMeals] = useState<Meal[]>([
    {
      id: '1',
      name: 'Oatmeal with Berries',
      calories: 320,
      protein: 12,
      carbs: 45,
      fat: 8,
      mealType: 'breakfast',
      time: '08:00'
    },
    {
      id: '2',
      name: 'Grilled Chicken Salad',
      calories: 450,
      protein: 35,
      carbs: 20,
      fat: 15,
      mealType: 'lunch',
      time: '12:30'
    },
    {
      id: '3',
      name: 'Protein Shake',
      calories: 180,
      protein: 25,
      carbs: 10,
      fat: 3,
      mealType: 'snack',
      time: '15:00'
    }
  ])

  const [newMeal, setNewMeal] = useState({
    name: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    mealType: ''
  })

  const dailyGoal = 2000
  const totalCalories = meals.reduce((sum, meal) => sum + meal.calories, 0)
  const totalProtein = meals.reduce((sum, meal) => sum + meal.protein, 0)
  const totalCarbs = meals.reduce((sum, meal) => sum + meal.carbs, 0)
  const totalFat = meals.reduce((sum, meal) => sum + meal.fat, 0)

  const caloriesProgress = (totalCalories / dailyGoal) * 100

  const mealTypes = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'snack', label: 'Snack' }
  ]

  const commonFoods = [
    { name: 'Banana', calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
    { name: 'Greek Yogurt', calories: 150, protein: 15, carbs: 8, fat: 4 },
    { name: 'Almonds (30g)', calories: 170, protein: 6, carbs: 6, fat: 15 },
    { name: 'Brown Rice (1 cup)', calories: 216, protein: 5, carbs: 45, fat: 2 }
  ]

  const addMeal = () => {
    if (newMeal.name && newMeal.calories && newMeal.mealType) {
      const meal: Meal = {
        id: Date.now().toString(),
        name: newMeal.name,
        calories: parseInt(newMeal.calories),
        protein: parseFloat(newMeal.protein) || 0,
        carbs: parseFloat(newMeal.carbs) || 0,
        fat: parseFloat(newMeal.fat) || 0,
        mealType: newMeal.mealType,
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }
      setMeals([...meals, meal])
      setNewMeal({ name: '', calories: '', protein: '', carbs: '', fat: '', mealType: '' })
    }
  }

  const addQuickFood = (food: typeof commonFoods[0]) => {
    const meal: Meal = {
      id: Date.now().toString(),
      name: food.name,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
      mealType: 'snack',
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
    setMeals([...meals, meal])
  }

  const deleteMeal = (id: string) => {
    setMeals(meals.filter(meal => meal.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calorie Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              Daily Calorie Summary
            </CardTitle>
            <CardDescription>Track your daily nutrition intake</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-lg font-semibold">{totalCalories} / {dailyGoal} kcal</span>
                  <Badge variant={caloriesProgress > 100 ? "destructive" : "secondary"}>
                    {Math.round(caloriesProgress)}%
                  </Badge>
                </div>
                <Progress value={Math.min(caloriesProgress, 100)} className="h-3" />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                  <span>{dailyGoal - totalCalories > 0 ? `${dailyGoal - totalCalories} kcal remaining` : 'Goal exceeded!'}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold text-blue-600">{totalProtein}g</div>
                  <div className="text-xs text-muted-foreground">Protein</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold text-green-600">{totalCarbs}g</div>
                  <div className="text-xs text-muted-foreground">Carbs</div>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg">
                  <div className="text-lg font-bold text-yellow-600">{totalFat}g</div>
                  <div className="text-xs text-muted-foreground">Fat</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Add */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Quick Add
            </CardTitle>
            <CardDescription>Add common foods quickly</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {commonFoods.map((food, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full justify-between"
                  onClick={() => addQuickFood(food)}
                >
                  <span className="text-sm">{food.name}</span>
                  <span className="text-xs text-muted-foreground">{food.calories} kcal</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Meal Management */}
      <Tabs defaultValue="meals" className="w-full">
        <TabsList>
          <TabsTrigger value="meals">Today's Meals</TabsTrigger>
          <TabsTrigger value="add">Add Custom Meal</TabsTrigger>
        </TabsList>

        <TabsContent value="meals" className="space-y-4">
          {meals.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Utensils className="w-12 h-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <p className="text-muted-foreground">No meals logged yet today</p>
                <p className="text-sm text-muted-foreground">Start by adding your first meal!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {meals.map((meal) => (
                <Card key={meal.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">{meal.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-3 h-3" />
                          <span>{meal.time}</span>
                          <Badge variant="outline" className="text-xs">
                            {mealTypes.find(t => t.value === meal.mealType)?.label}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteMeal(meal.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </Button>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-center text-sm">
                      <div>
                        <div className="font-semibold text-orange-600">{meal.calories}</div>
                        <div className="text-xs text-muted-foreground">kcal</div>
                      </div>
                      <div>
                        <div className="font-semibold text-blue-600">{meal.protein}g</div>
                        <div className="text-xs text-muted-foreground">protein</div>
                      </div>
                      <div>
                        <div className="font-semibold text-green-600">{meal.carbs}g</div>
                        <div className="text-xs text-muted-foreground">carbs</div>
                      </div>
                      <div>
                        <div className="font-semibold text-yellow-600">{meal.fat}g</div>
                        <div className="text-xs text-muted-foreground">fat</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Add Custom Meal</CardTitle>
              <CardDescription>Log a custom meal with detailed nutrition information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="meal-name">Meal Name</Label>
                  <Input
                    id="meal-name"
                    value={newMeal.name}
                    onChange={(e) => setNewMeal({ ...newMeal, name: e.target.value })}
                    placeholder="e.g., Grilled Chicken Breast"
                  />
                </div>
                <div>
                  <Label htmlFor="meal-type">Meal Type</Label>
                  <Select value={newMeal.mealType} onValueChange={(value) => setNewMeal({ ...newMeal, mealType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select meal type" />
                    </SelectTrigger>
                    <SelectContent>
                      {mealTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="calories">Calories</Label>
                  <Input
                    id="calories"
                    type="number"
                    value={newMeal.calories}
                    onChange={(e) => setNewMeal({ ...newMeal, calories: e.target.value })}
                    placeholder="e.g., 250"
                  />
                </div>
                <div>
                  <Label htmlFor="protein">Protein (g)</Label>
                  <Input
                    id="protein"
                    type="number"
                    value={newMeal.protein}
                    onChange={(e) => setNewMeal({ ...newMeal, protein: e.target.value })}
                    placeholder="e.g., 30"
                  />
                </div>
                <div>
                  <Label htmlFor="carbs">Carbs (g)</Label>
                  <Input
                    id="carbs"
                    type="number"
                    value={newMeal.carbs}
                    onChange={(e) => setNewMeal({ ...newMeal, carbs: e.target.value })}
                    placeholder="e.g., 25"
                  />
                </div>
                <div>
                  <Label htmlFor="fat">Fat (g)</Label>
                  <Input
                    id="fat"
                    type="number"
                    value={newMeal.fat}
                    onChange={(e) => setNewMeal({ ...newMeal, fat: e.target.value })}
                    placeholder="e.g., 10"
                  />
                </div>
              </div>
              <Button onClick={addMeal} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Meal
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}