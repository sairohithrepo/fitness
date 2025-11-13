'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { TrendingUp, TrendingDown, Plus, Calendar, Weight, Activity } from 'lucide-react'

interface ProgressEntry {
  id: string
  weight: number
  bodyFat: number
  measurements: {
    chest: number
    waist: number
    arms: number
    thighs: number
  }
  date: string
}

export function ProgressTracker() {
  const [progressEntries, setProgressEntries] = useState<ProgressEntry[]>([
    {
      id: '1',
      weight: 75.5,
      bodyFat: 18.5,
      measurements: {
        chest: 102,
        waist: 82,
        arms: 35,
        thighs: 60
      },
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '2',
      weight: 75.0,
      bodyFat: 18.2,
      measurements: {
        chest: 101,
        waist: 81,
        arms: 35.5,
        thighs: 60.5
      },
      date: new Date().toISOString()
    }
  ])

  const [newEntry, setNewEntry] = useState({
    weight: '',
    bodyFat: '',
    chest: '',
    waist: '',
    arms: '',
    thighs: ''
  })

  const latestEntry = progressEntries[progressEntries.length - 1]
  const previousEntry = progressEntries[progressEntries.length - 2]

  const calculateChange = (current: number, previous: number) => {
    const change = current - previous
    return {
      value: Math.abs(change),
      direction: change > 0 ? 'up' : change < 0 ? 'down' : 'neutral',
      percentage: previous ? Math.abs((change / previous) * 100) : 0
    }
  }

  const weightChange = previousEntry ? calculateChange(latestEntry.weight, previousEntry.weight) : null
  const bodyFatChange = previousEntry ? calculateChange(latestEntry.bodyFat, previousEntry.bodyFat) : null

  const addProgressEntry = () => {
    if (newEntry.weight && newEntry.bodyFat) {
      const entry: ProgressEntry = {
        id: Date.now().toString(),
        weight: parseFloat(newEntry.weight),
        bodyFat: parseFloat(newEntry.bodyFat),
        measurements: {
          chest: parseFloat(newEntry.chest) || 0,
          waist: parseFloat(newEntry.waist) || 0,
          arms: parseFloat(newEntry.arms) || 0,
          thighs: parseFloat(newEntry.thighs) || 0
        },
        date: new Date().toISOString()
      }
      setProgressEntries([...progressEntries, entry])
      setNewEntry({
        weight: '',
        bodyFat: '',
        chest: '',
        waist: '',
        arms: '',
        thighs: ''
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Weight</p>
                <p className="text-2xl font-bold">{latestEntry.weight} kg</p>
                {weightChange && (
                  <div className={`flex items-center text-sm ${
                    weightChange.direction === 'down' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {weightChange.direction === 'down' ? (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    ) : (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    )}
                    {weightChange.direction === 'down' ? '-' : '+'}{weightChange.value.toFixed(1)} kg
                  </div>
                )}
              </div>
              <Weight className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Body Fat</p>
                <p className="text-2xl font-bold">{latestEntry.bodyFat}%</p>
                {bodyFatChange && (
                  <div className={`flex items-center text-sm ${
                    bodyFatChange.direction === 'down' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {bodyFatChange.direction === 'down' ? (
                      <TrendingDown className="w-4 h-4 mr-1" />
                    ) : (
                      <TrendingUp className="w-4 h-4 mr-1" />
                    )}
                    {bodyFatChange.direction === 'down' ? '-' : '+'}{bodyFatChange.value.toFixed(1)}%
                  </div>
                )}
              </div>
              <Activity className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Chest</p>
                <p className="text-2xl font-bold">{latestEntry.measurements.chest} cm</p>
                <p className="text-sm text-muted-foreground">Waist: {latestEntry.measurements.waist} cm</p>
              </div>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold text-sm">📏</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Arms</p>
                <p className="text-2xl font-bold">{latestEntry.measurements.arms} cm</p>
                <p className="text-sm text-muted-foreground">Thighs: {latestEntry.measurements.thighs} cm</p>
              </div>
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-bold text-sm">💪</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="history" className="w-full">
        <TabsList>
          <TabsTrigger value="history">Progress History</TabsTrigger>
          <TabsTrigger value="add">Add Entry</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {progressEntries.map((entry, index) => (
              <Card key={entry.id}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">
                      {new Date(entry.date).toLocaleDateString()}
                    </CardTitle>
                    {index === progressEntries.length - 1 && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Latest
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Weight</span>
                      <span className="font-semibold">{entry.weight} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Body Fat</span>
                      <span className="font-semibold">{entry.bodyFat}%</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Chest</span>
                        <span>{entry.measurements.chest} cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Waist</span>
                        <span>{entry.measurements.waist} cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Arms</span>
                        <span>{entry.measurements.arms} cm</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Thighs</span>
                        <span>{entry.measurements.thighs} cm</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Add Progress Entry</CardTitle>
              <CardDescription>Record your current measurements and stats</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    value={newEntry.weight}
                    onChange={(e) => setNewEntry({ ...newEntry, weight: e.target.value })}
                    placeholder="75.5"
                  />
                </div>
                <div>
                  <Label htmlFor="bodyFat">Body Fat (%)</Label>
                  <Input
                    id="bodyFat"
                    type="number"
                    step="0.1"
                    value={newEntry.bodyFat}
                    onChange={(e) => setNewEntry({ ...newEntry, bodyFat: e.target.value })}
                    placeholder="18.5"
                  />
                </div>
                <div>
                  <Label htmlFor="chest">Chest (cm)</Label>
                  <Input
                    id="chest"
                    type="number"
                    step="0.1"
                    value={newEntry.chest}
                    onChange={(e) => setNewEntry({ ...newEntry, chest: e.target.value })}
                    placeholder="102"
                  />
                </div>
                <div>
                  <Label htmlFor="waist">Waist (cm)</Label>
                  <Input
                    id="waist"
                    type="number"
                    step="0.1"
                    value={newEntry.waist}
                    onChange={(e) => setNewEntry({ ...newEntry, waist: e.target.value })}
                    placeholder="82"
                  />
                </div>
                <div>
                  <Label htmlFor="arms">Arms (cm)</Label>
                  <Input
                    id="arms"
                    type="number"
                    step="0.1"
                    value={newEntry.arms}
                    onChange={(e) => setNewEntry({ ...newEntry, arms: e.target.value })}
                    placeholder="35"
                  />
                </div>
                <div>
                  <Label htmlFor="thighs">Thighs (cm)</Label>
                  <Input
                    id="thighs"
                    type="number"
                    step="0.1"
                    value={newEntry.thighs}
                    onChange={(e) => setNewEntry({ ...newEntry, thighs: e.target.value })}
                    placeholder="60"
                  />
                </div>
              </div>
              <Button onClick={addProgressEntry} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Progress Entry
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charts">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weight Progress</CardTitle>
                <CardDescription>Track your weight changes over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Weight progress chart coming soon...</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Body Composition</CardTitle>
                <CardDescription>Monitor your body fat percentage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Body composition chart coming soon...</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}