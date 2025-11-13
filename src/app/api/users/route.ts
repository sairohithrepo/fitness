import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const users = await db.user.findMany({
      include: {
        meals: true,
        workouts: {
          include: {
            exercises: {
              include: {
                exercise: true
              }
            }
          }
        },
        progress: true
      }
    })
    
    return NextResponse.json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const user = await db.user.create({
      data: {
        email: data.email,
        name: data.name,
        age: data.age,
        weight: data.weight,
        height: data.height,
        goalWeight: data.goalWeight,
        activityLevel: data.activityLevel
      }
    })
    
    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error('Error creating user:', error)
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 })
  }
}