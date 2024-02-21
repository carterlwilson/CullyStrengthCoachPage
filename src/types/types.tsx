export interface WorkoutScheduleState {
  Schedules: WorkoutSchedule[]
}

export interface WorkoutSchedule {
  Id: string
  Name: string
  Blocks: Block[]
  CurrentBlock: number
  CurrentWeek: number
}

export interface Day {
  Exercises: Exercise[]
}

export interface Exercise {
  Id: string
  Name: string
  Multiplier: number
  Sets: number
  Reps: number
  Type: number
  MaxReference: string
}

export interface Week {
  Days: Day[]
}

export interface Block {
  Weeks: Week[]
}

export interface Client {
  id: string
  firstName: string
  lastName: string
  email: string
  maxes: Max[]
  scheduleId: string
}

export interface Max {
  name: string
  weight: number
}

export interface ExerciseReference {
  name: string
  type: number
  id: string
}

export interface ExerciseType {
  Name: string
}

export interface Iteration {
  Block: number
  Week: number
}

export interface UserMetadata {
  Role: number
  Username: string
  Id: string
}

export {}
