'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { User, Settings, Target, Activity, Save, Edit } from 'lucide-react'

interface UserProfile {
  id: string
  name: string
  email: string
  age: number
  weight: number
  height: number
  goalWeight: number
  activityLevel: string
}

export function UserProfile() {
  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    age: 28,
    weight: 75.5,
    height: 180,
    goalWeight: 70.0,
    activityLevel: 'moderate'
  })

  const [isEditing, setIsEditing] = useState(false)
  const [editProfile, setEditProfile] = useState({ ...profile })

  const activityLevels = [
    { value: 'sedentary', label: 'Sedentary (little or no exercise)' },
    { value: 'light', label: 'Light (1-3 days/week)' },
    { value: 'moderate', label: 'Moderate (3-5 days/week)' },
    { value: 'active', label: 'Active (6-7 days/week)' },
    { value: 'very_active', label: 'Very Active (twice per day)' }
  ]

  const calculateBMI = () => {
    const heightInMeters = profile.height / 100
    return (profile.weight / (heightInMeters * heightInMeters)).toFixed(1)
  }

  const calculateBMR = () => {
    const age = profile.age
    const weight = profile.weight
    const height = profile.height
    
    // Mifflin-St Jeor Equation for men
    let bmr = 10 * weight + 6.25 * height - 5 * age + 5
    
    // Adjust for activity level
    const activityMultipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    }
    
    return Math.round(bmr * (activityMultipliers[profile.activityLevel as keyof typeof activityMultipliers] || 1.2))
  }

  const saveProfile = () => {
    setProfile({ ...editProfile })
    setIsEditing(false)
  }

  const cancelEdit = () => {
    setEditProfile({ ...profile })
    setIsEditing(false)
  }

  const bmi = parseFloat(calculateBMI())
  const bmr = calculateBMR()
  const weightToGoal = profile.weight - profile.goalWeight

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return { status: 'Underweight', color: 'text-blue-600' }
    if (bmi < 25) return { status: 'Normal', color: 'text-green-600' }
    if (bmi < 30) return { status: 'Overweight', color: 'text-yellow-600' }
    return { status: 'Obese', color: 'text-red-600' }
  }

  const bmiStatus = getBMIStatus(bmi)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <CardTitle className="text-2xl">{profile.name}</CardTitle>
                  <CardDescription>{profile.email}</CardDescription>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                {isEditing ? 'Save' : 'Edit'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="profile" className="w-full">
              <TabsList>
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="goals">Goals</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Age</Label>
                    <div className="text-lg font-semibold">{profile.age} years</div>
                  </div>
                  <div>
                    <Label>Height</Label>
                    <div className="text-lg font-semibold">{profile.height} cm</div>
                  </div>
                  <div>
                    <Label>Weight</Label>
                    <div className="text-lg font-semibold">{profile.weight} kg</div>
                  </div>
                  <div>
                    <Label>Activity Level</Label>
                    <div className="text-lg font-semibold capitalize">{profile.activityLevel.replace('_', ' ')}</div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="goals" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Current Weight</Label>
                    <div className="text-lg font-semibold">{profile.weight} kg</div>
                  </div>
                  <div>
                    <Label>Goal Weight</Label>
                    <div className="text-lg font-semibold">{profile.goalWeight} kg</div>
                  </div>
                  <div className="md:col-span-2">
                    <Label>Weight to Goal</Label>
                    <div className={`text-lg font-semibold ${weightToGoal > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      {weightToGoal > 0 ? `Lose ${weightToGoal.toFixed(1)} kg` : `Maintain current weight`}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <div className="space-y-4">
                  <div>
                    <Label>Email Notifications</Label>
                    <div className="flex items-center gap-2 mt-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Daily workout reminders</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Weekly progress reports</span>
                    </div>
                  </div>
                  <div>
                    <Label>Units</Label>
                    <Select defaultValue="metric">
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                        <SelectItem value="imperial">Imperial (lbs, ft)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Health Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-500" />
              Health Stats
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{bmi}</div>
              <div className="text-sm text-muted-foreground">BMI</div>
              <Badge className={`mt-2 ${bmiStatus.color}`}>
                {bmiStatus.status}
              </Badge>
            </div>
            
            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{bmr}</div>
              <div className="text-sm text-muted-foreground">Daily Calories (BMR)</div>
            </div>

            <div className="text-center p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold">{Math.round(bmr * 1.2)}</div>
              <div className="text-sm text-muted-foreground">Calorie Goal</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Profile</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={editProfile.name}
                  onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={editProfile.email}
                  onChange={(e) => setEditProfile({ ...editProfile, email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={editProfile.age}
                  onChange={(e) => setEditProfile({ ...editProfile, age: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={editProfile.height}
                  onChange={(e) => setEditProfile({ ...editProfile, height: parseFloat(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  value={editProfile.weight}
                  onChange={(e) => setEditProfile({ ...editProfile, weight: parseFloat(e.target.value) })}
                />
              </div>
              <div>
                <Label htmlFor="goalWeight">Goal Weight (kg)</Label>
                <Input
                  id="goalWeight"
                  type="number"
                  step="0.1"
                  value={editProfile.goalWeight}
                  onChange={(e) => setEditProfile({ ...editProfile, goalWeight: parseFloat(e.target.value) })}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="activityLevel">Activity Level</Label>
                <Select
                  value={editProfile.activityLevel}
                  onValueChange={(value) => setEditProfile({ ...editProfile, activityLevel: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {activityLevels.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={saveProfile} className="flex-1">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={cancelEdit} className="flex-1">
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}