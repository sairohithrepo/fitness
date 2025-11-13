import { db } from '@/lib/db'

async function main() {
  // Create a sample user
  const user = await db.user.create({
    data: {
      email: 'john.doe@example.com',
      name: 'John Doe',
      age: 28,
      weight: 75.5,
      height: 180,
      goalWeight: 70.0,
      activityLevel: 'moderate'
    }
  })

  // Create sample exercises
  const exercises = await Promise.all([
    db.exercise.create({
      data: {
        name: 'Bench Press',
        category: 'strength',
        description: 'Classic chest exercise',
        instructions: 'Lie on bench, lower bar to chest, push up',
        muscleGroups: 'chest,shoulders,triceps'
      }
    }),
    db.exercise.create({
      data: {
        name: 'Squats',
        category: 'strength',
        description: 'Fundamental lower body exercise',
        instructions: 'Stand with feet shoulder-width apart, lower hips, stand back up',
        muscleGroups: 'quadriceps,hamstrings,glutes'
      }
    }),
    db.exercise.create({
      data: {
        name: 'Running',
        category: 'cardio',
        description: 'Cardiovascular exercise',
        instructions: 'Run at steady pace for designated time',
        muscleGroups: 'legs,core'
      }
    }),
    db.exercise.create({
      data: {
        name: 'Pull-ups',
        category: 'strength',
        description: 'Upper body pulling exercise',
        instructions: 'Hang from bar, pull body up until chin over bar',
        muscleGroups: 'back,biceps,forearms'
      }
    })
  ])

  // Create sample meals
  await Promise.all([
    db.meal.create({
      data: {
        name: 'Oatmeal with Berries',
        calories: 320,
        protein: 12,
        carbs: 45,
        fat: 8,
        mealType: 'breakfast',
        date: new Date(),
        userId: user.id
      }
    }),
    db.meal.create({
      data: {
        name: 'Grilled Chicken Salad',
        calories: 450,
        protein: 35,
        carbs: 20,
        fat: 15,
        mealType: 'lunch',
        date: new Date(),
        userId: user.id
      }
    }),
    db.meal.create({
      data: {
        name: 'Protein Shake',
        calories: 180,
        protein: 25,
        carbs: 10,
        fat: 3,
        mealType: 'snack',
        date: new Date(),
        userId: user.id
      }
    })
  ])

  // Create sample workouts
  const workout1 = await db.workout.create({
    data: {
      name: 'Upper Body Strength',
      description: 'Focus on chest, shoulders, and arms',
      duration: 45,
      calories: 320,
      date: new Date(),
      completed: false,
      userId: user.id
    }
  })

  const workout2 = await db.workout.create({
    data: {
      name: 'Lower Body Power',
      description: 'Legs and glutes workout',
      duration: 50,
      calories: 400,
      date: new Date(Date.now() + 86400000),
      completed: false,
      userId: user.id
    }
  })

  // Create workout exercises
  await Promise.all([
    db.workoutExercise.create({
      data: {
        workoutId: workout1.id,
        exerciseId: exercises[0].id, // Bench Press
        sets: 4,
        reps: 10,
        weight: 60
      }
    }),
    db.workoutExercise.create({
      data: {
        workoutId: workout2.id,
        exerciseId: exercises[1].id, // Squats
        sets: 4,
        reps: 12,
        weight: 80
      }
    })
  ])

  // Create progress entry
  await db.progress.create({
    data: {
      weight: 75.5,
      bodyFat: 18.5,
      measurements: {
        chest: 102,
        waist: 82,
        arms: 35,
        thighs: 60
      },
      date: new Date(),
      userId: user.id
    }
  })

  console.log('Sample data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })