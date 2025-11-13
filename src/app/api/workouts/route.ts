import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const completed = searchParams.get('completed')
    
    const where: any = {}
    if (userId) where.userId = userId
    if (completed !== null) where.completed = completed === 'true'
    
    const workouts = await db.workout.findMany({
      where,
      include: {
        user: true,
        exercises: {
          include: {
            exercise: true
          }
        }
      },
      orderBy: {
        date: 'desc'
      }
    })
    
    return NextResponse.json(workouts)
  } catch (error) {
    console.error('Error fetching workouts:', error)
    return NextResponse.json({ error: 'Failed to fetch workouts' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const workout = await db.workout.create({
      data: {
        name: data.name,
        description: data.description,
        duration: data.duration,
        calories: data.calories,
        date: new Date(data.date),
        completed: data.completed || false,
        userId: data.userId
      },
      include: {
        user: true,
        exercises: {
          include: {
            exercise: true
          }
        }
      }
    })
    
    return NextResponse.json(workout, { status: 201 })
  } catch (error) {
    console.error('Error creating workout:', error)
    return NextResponse.json({ error: 'Failed to create workout' }, { status: 500 })
  }
}