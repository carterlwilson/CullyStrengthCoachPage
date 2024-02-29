export type WorkoutScheduleState = {
  Schedules: WorkoutSchedule[]
}

export type WorkoutSchedule = {
  Id: string
  Name: string
  Blocks: Block[]
  CurrentBlock: number
  CurrentWeek: number
}

export type Day = {
  Exercises: Exercise[]
}

export type Exercise = {
  Id: string
  Name: string
  Multiplier: number
  Sets: number
  Reps: number
  Type: number
  MaxReference: string
}

export type Week = {
  Days: Day[]
}

export type Block = {
  Weeks: Week[]
}

export type Client = {
  id: string
  firstName: string
  lastName: string
  email: string
  maxes: Max[]
  scheduleId: string
}

export type Max = {
  name: string
  weight: number
}

export type ExerciseReference = {
  name: string
  type: number
  id: string
}

export type ExerciseType = {
  Name: string
}

export type Iteration = {
  Block: number
  Week: number
}

export type UserMetadata = {
  Role: number
  Username: string
  Id: string
}

export {}
