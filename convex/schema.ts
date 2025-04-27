import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    imageUrl: v.optional(v.string()),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    clerkId: v.string(), // Link to Clerk user ID
    height: v.optional(v.number()), // in preferred unit (e.g., cm)
    weight: v.optional(v.number()), // in preferred unit (e.g., kg)
    // fitnessGoal: v.optional(v.string()), // Keep or replace with structured goals table
    activityLevel: v.optional(v.string()), // e.g., 'sedentary', 'light', 'moderate', 'very active'
    preferredUnitSystem: v.optional(v.string()), // e.g., 'metric', 'imperial'

    // --- Enhanced User Fields for Personalization/AI ---
    equipmentIds: v.optional(v.array(v.id("equipment"))), // Equipment the user has access to
    injuriesLimitations: v.optional(v.array(v.string())), // Any physical considerations
    fitnessLevel: v.optional(v.string()), // More specific level: 'beginner', 'intermediate', 'advanced'
    preferredWorkoutTypes: v.optional(v.array(v.string())), // e.g., ['strength', 'cardio']
    preferredMuscleGroups: v.optional(v.array(v.string())), // e.g., ['chest', 'legs']
    createdAt: v.optional(v.string()),
    updatedAt: v.optional(v.string()),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"]), // Often useful for lookup

  exercises: defineTable({
    name: v.string(),
    description: v.string(),
    category: v.string(), // e.g., 'strength', 'cardio', 'flexibility', 'recovery'
    difficulty: v.string(), // e.g., 'beginner', 'intermediate', 'advanced'
    muscleGroups: v.array(v.string()), // Primary and secondary muscle groups
    instructions: v.array(v.string()), // Step-by-step instructions
    imageUrl: v.optional(v.string()),
    videoUrl: v.optional(v.string()),
    // equipment: v.optional(v.array(v.string())), // Can replace with IDs if using equipment table
    equipmentRequired: v.optional(v.array(v.id("equipment"))), // Link to required equipment
    // --- Enhanced Exercise Fields ---
    relatedExerciseIds: v.optional(v.array(v.id("exercises"))), // e.g., variations, progressions, regressions
    precautions: v.optional(v.array(v.string())), // Safety notes
    forceType: v.optional(v.string()), // e.g., 'push', 'pull', 'static'
    mechanicsType: v.optional(v.string()), // e.g., 'compound', 'isolation'

    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_category", ["category"])
    .index("by_difficulty", ["difficulty"]),

  // --- NEW TABLE: Workouts ---
  workouts: defineTable({
    userId: v.id("users"), // User who created/owns the template (optional if many are predefined)
    name: v.string(),
    description: v.string(),
    type: v.string(), // e.g., 'strength', 'cardio', 'hiit', 'full-body', 'push', 'legs', etc.
    difficulty: v.string(),
    durationMinutes: v.optional(v.number()), // Estimated duration in minutes
    // exercises: v.array(...) -> Kept the same structure, it's good for defining the plan
    exercises: v.array(
      v.object({
        exerciseId: v.id("exercises"),
        sets: v.optional(v.number()), // Planned sets
        reps: v.optional(v.number()), // Planned reps
        durationSeconds: v.optional(v.number()), // Planned duration for time-based exercises
        weightKg: v.optional(v.number()), // Planned weight (standardized unit)
        restTimeSeconds: v.optional(v.number()), // Planned rest time between sets/exercises
        notes: v.optional(v.string()), // Specific notes for this exercise within the workout
      })
    ),
    // --- Enhanced Workout Fields ---
    isTemplate: v.boolean(), // true if it's a template, false if a user-saved copy/personalized plan
    source: v.optional(v.string()), // e.g., 'user-created', 'ai-generated', 'admin-template'
    equipmentRequired: v.optional(v.array(v.id("equipment"))), // equipment needed for this workout
    tags: v.optional(v.array(v.string())), // e.g., 'quick', 'beginner-friendly', 'no-equipment'

    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"]) // Index for user's own workouts/templates
    .index("by_type", ["type"])
    .index("by_isTemplate", ["isTemplate"]) // Important for querying templates vs user workouts
    .index("by_difficulty", ["difficulty"]),

  workoutLogs: defineTable({
    userId: v.id("users"),
    workoutId: v.id("workouts"), // Link to the workout *plan* that was logged
    startTime: v.number(),
    endTime: v.number(),
    completed: v.boolean(), // Did they finish?
    // exerciseLogs: v.array(...) -> Kept the same structure, but refine fields slightly
    exerciseLogs: v.array(
      v.object({
        exerciseId: v.id("exercises"),
        sets: v.array(
          v.object({
            // Logged actual performance per set
            setNumber: v.optional(v.number()), // Which set was this (1st, 2nd, etc.)
            repsCompleted: v.optional(v.number()),
            weightUsedKg: v.optional(v.number()), // Standardized unit
            durationSeconds: v.optional(v.number()),
            // completed: v.boolean(), // Removed - implied by being in the log
            notes: v.optional(v.string()), // Notes specific to this set
          })
        ),
        // Optional: notes specific to this exercise within the workout log
        notes: v.optional(v.string()),
      })
    ),
    notes: v.optional(v.string()), // Overall workout log notes
    rating: v.optional(v.number()), // User's rating of the workout (1-5)
    // --- Enhanced Workout Log Fields ---
    loggedDurationSeconds: v.optional(v.number()), // Actual time spent (could be calculated, but storing is easier)
    moodBefore: v.optional(v.string()), // e.g., 'energized', 'tired', 'stressed'
    moodAfter: v.optional(v.string()),
    caloriesBurned: v.optional(v.number()), // Estimated calories

    createdAt: v.number(), // Log creation time
  })
    .index("by_user", ["userId"])
    .index("by_workout", ["workoutId"]) // Link back to the plan
    .index("by_startTime", ["startTime"]), // Useful for chronological logs

  progressMetrics: defineTable({
    userId: v.id("users"),
    type: v.string(), // e.g., 'weight', 'body-fat', 'bicep-circumference', 'bench-press-max', 'run-distance'
    value: v.number(),
    unit: v.string(), // e.g., 'kg', '%', 'cm', 'kg', 'km' - Ensure consistency or allow flexibility
    date: v.number(), // Timestamp of when the metric was recorded
    notes: v.optional(v.string()),
    // --- Enhanced Progress Metric Field ---
    source: v.optional(v.string()), // e.g., 'manual', 'workout-log', 'integrated-device'
    workoutLogId: v.optional(v.id("workoutLogs")), // Link to a specific log if metric was taken then

    createdAt: v.number(), // Record creation time (might differ from date)
  })
    .index("by_user", ["userId"])
    .index("by_type", ["type"])
    .index("by_date", ["date"]) // Essential for charting progress
    .index("by_user_type_date", ["userId", "type", "date"]), // For efficient filtering and sorting

  // --- NEW TABLE: Equipment ---
  equipment: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    // Add categories? e.g., 'dumbbells', 'barbells', 'machines', 'bodyweight'
  }).index("equipment_name", ["name"]), // Allow searching equipment

  // --- NEW TABLE: Goals ---
  // More structured goal tracking beyond a single string on the user
  goals: defineTable({
    userId: v.id("users"),
    type: v.string(), // e.g., 'weight-loss', 'muscle-gain', 'endurance', 'specific-exercise-target', 'consistency'
    description: v.optional(v.string()), // User-defined description
    targetValue: v.optional(v.number()), // e.g., target weight, target reps/weight
    targetUnit: v.optional(v.string()), // Unit for the target value
    targetDate: v.optional(v.number()), // Timestamp for target completion date
    startDate: v.number(), // Timestamp for when the goal was set
    status: v.string(), // 'active', 'completed', 'abandoned'
    progressValue: v.optional(v.number()), // Current value towards the goal (can be updated)
    progressUnit: v.optional(v.string()), // Unit for current progress value
    // Link to related exercises or metrics if applicable
    relatedExerciseId: v.optional(v.id("exercises")), // e.g., for a 'bench-press-max' goal
    relatedMetricId: v.optional(v.id("progressMetrics")), // e.g., for a 'weight-loss' goal

    createdAt: v.number(), // Goal creation time
    updatedAt: v.number(), // When status or progress was last updated
  })
    .index("by_user", ["userId"])
    .index("by_user_status", ["userId", "status"]), // Useful for finding active goals

  // --- NEW TABLE: AI Insights / Recommendations ---
  // Store analysis results or recommendations generated by AI
  aiInsights: defineTable({
    userId: v.id("users"),
    type: v.string(), // e.g., 'progress-summary', 'workout-recommendation', 'form-feedback', 'goal-analysis'
    title: v.string(), // A brief title for the insight
    summaryText: v.string(), // The main body of the insight/recommendation
    generatedDate: v.number(), // Timestamp when the insight was generated
    // Optional: Link to data that informed this insight
    relatedWorkoutLogIds: v.optional(v.array(v.id("workoutLogs"))),
    relatedMetricIds: v.optional(v.array(v.id("progressMetrics"))),
    relatedGoalIds: v.optional(v.array(v.id("goals"))),
    relatedWorkoutId: v.optional(v.id("workouts")), // If recommending a specific workout

    // Optional: Add structure for action items based on insight
    actionItems: v.optional(
      v.array(
        v.object({
          description: v.string(),
          status: v.string(), // 'pending', 'completed'
          link: v.optional(v.string()), // e.g., a link to a recommended workout or exercise
        })
      )
    ),
    read: v.boolean(), // Has the user seen this insight? Defaults to false.

    createdAt: v.number(),
    updatedAt: v.number(), // For tracking when read status changes
  }).index("by_user_generatedDate", ["userId", "generatedDate"]), // Show latest insights first

  foods: defineTable({
    name: v.string(),
    calories: v.number(), // per standard unit/serving
    protein: v.number(), // per standard unit/serving
    carbs: v.number(), // per standard unit/serving
    fat: v.number(), // per standard unit/serving
    unit: v.string(), // Standard unit, e.g., '100g', 'per serving'
    description: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    // Source? 'USDA', 'user-added', 'brand'
  }).index("food_name", ["name"]),

  meals: defineTable({
    userId: v.id("users"),
    date: v.number(), // Timestamp for the day
    mealTime: v.string(), // e.g., 'breakfast', 'lunch', 'dinner', 'snack', 'other'
    notes: v.optional(v.string()),
    // Array of food items consumed in this meal
    foodItems: v.array(
      v.object({
        foodId: v.id("foods"),
        quantity: v.number(), // How much of the food item
        unit: v.string(), // Unit used for quantity (e.g., 'grams', 'oz', 'cups', 'each')
        // Could also store macro breakdown for this specific item *in this meal*
      })
    ),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_user_date", ["userId", "date"]), // Efficiently get meals for a day
});