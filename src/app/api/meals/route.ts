import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const date = searchParams.get('date')
    
    const where: any = {}
    if (userId) where.userId = userId
    if (date) {
      const startDate = new Date(date)
      const endDate = new Date(date)
      endDate.setDate(endDate.getDate() + 1)
      where.date = {
        gte: startDate,
        lt: endDate
      }
    }
    
    const meals = await db.meal.findMany({
      where,
      include: {
        user: true
      },
      orderBy: {
        date: 'desc'
      }
    })
    
    return NextResponse.json(meals)
  } catch (error) {
    console.error('Error fetching meals:', error)
    return NextResponse.json({ error: 'Failed to fetch meals' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const meal = await db.meal.create({
      data: {
        name: data.name,
        calories: data.calories,
        protein: data.protein,
        carbs: data.carbs,
        fat: data.fat,
        mealType: data.mealType,
        date: new Date(data.date),
        userId: data.userId
      },
      include: {
        user: true
      }
    })
    
    return NextResponse.json(meal, { status: 201 })
  } catch (error) {
    console.error('Error creating meal:', error)
    return NextResponse.json({ error: 'Failed to create meal' }, { status: 500 })
  }
}