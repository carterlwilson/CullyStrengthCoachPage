import { Block, Exercise, Week, WorkoutSchedule } from "./types"

export type ChangeMultiplierPayload = {
    multiplier: number,
    scheduleIndex: number,
    blockIndex: number,
    weekIndex: number,
    dayIndex: number,
    exerciseIndex: number
}

export type UpdateExercisePayload = {
    name: string,
    sets: number,
    reps: number,
    multiplier: number,
    scheduleIndex: number,
    blockIndex: number,
    weekIndex: number,
    dayIndex: number,
    exerciseIndex: number
}

export type SetSchedulePayload = {
    schedule: WorkoutSchedule,
    index: number
}

export type DeleteSchedulePayload = {
    index: number,
    id: string
}

export type AddExercisePayload = {
    exercise: Exercise,
    scheduleIndex: number,
    blockIndex: number,
    weekIndex: number,
    dayIndex: number
}

export type SetDailyExercisesPayload = {
    exercises: Exercise[],
    scheduleIndex: number,
    blockIndex: number,
    weekIndex: number,
    dayIndex: number
}

export type DeleteExercisePayload = {
    scheduleIndex: number,
    blockIndex: number,
    weekIndex: number,
    dayIndex: number,
    exerciseIndex: number
}

export type AddWeekPayload = {
    scheduleIndex: number,
    blockIndex: number,
    week: Week
}

export type EditIterationsPayload = {
    scheduleIndex: number,
    block: number,
    week: number
}

export type DeleteWeekPayload = {
    scheduleIndex: number,
    blockIndex: number,
    weekIndex: number
}

export type AddBlockPayload = {
    scheduleIndex: number,
    block: Block
}

export type DeleteBlockPayload = {
    scheduleIndex: number,
    blockIndex: number,
}

export type UpdateClientNamePayload = {
    name: string
}

export {}