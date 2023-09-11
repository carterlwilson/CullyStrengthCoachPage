import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Root } from 'react-dom/client'
import type { RootState } from '../app/Store'
import DataPersistence from '../services/DataPersistence';
import { ChangeMultiplierPayload, UpdateExercisePayload, SetSchedulePayload, AddExercisePayload, DeleteExercisePayload, AddWeekPayload, DeleteWeekPayload, AddBlockPayload, DeleteBlockPayload, DeleteSchedulePayload, EditIterationsPayload } from '../types/PayloadTypes';
import { WorkoutScheduleState, WorkoutSchedule } from '../types/types';

// Define the initial state using that type
const initialState = {
    Schedules: []
} as WorkoutScheduleState;

const dataPersistence = new DataPersistence();

export const workoutScheduleSlice = createSlice({
  name: 'workoutSchedule',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    changeMultiplier: (state, action: PayloadAction<ChangeMultiplierPayload>) => {
      state
        .Schedules[action.payload.scheduleIndex]
        .Blocks[action.payload.blockIndex]
        .Weeks[action.payload.weekIndex]
        .Days[action.payload.dayIndex]
        .Exercises[action.payload.exerciseIndex].Multiplier = action.payload.multiplier
    },
    updateExercise: (state, action: PayloadAction<UpdateExercisePayload>) => {
      state
        .Schedules[action.payload.scheduleIndex]
        .Blocks[action.payload.blockIndex]
        .Weeks[action.payload.weekIndex]
        .Days[action.payload.dayIndex]
        .Exercises[action.payload.exerciseIndex].Name = action.payload.name;

      state
        .Schedules[action.payload.scheduleIndex]
        .Blocks[action.payload.blockIndex]
        .Weeks[action.payload.weekIndex]
        .Days[action.payload.dayIndex]
        .Exercises[action.payload.exerciseIndex].Sets = action.payload.sets;

      state
        .Schedules[action.payload.scheduleIndex]
        .Blocks[action.payload.blockIndex]
        .Weeks[action.payload.weekIndex]
        .Days[action.payload.dayIndex]
        .Exercises[action.payload.exerciseIndex].Reps = action.payload.reps;

      state
        .Schedules[action.payload.scheduleIndex]
        .Blocks[action.payload.blockIndex]
        .Weeks[action.payload.weekIndex]
        .Days[action.payload.dayIndex]
        .Exercises[action.payload.exerciseIndex].Multiplier = action.payload.multiplier;

      dataPersistence.updateSchedules(state);
    },
    setSchedule: (state, action: PayloadAction<SetSchedulePayload>) => {
        state.Schedules[action.payload.index] = action.payload.schedule;
    },
    addSchedule: (state, action: PayloadAction<WorkoutSchedule>) => {
      state.Schedules.push(action.payload);
      dataPersistence.addNewSchedule(action.payload);
    },
    deleteSchedule: (state, action: PayloadAction<DeleteSchedulePayload>) => {
      state.Schedules.splice(action.payload.index, 1);
      dataPersistence.deleteSchedule(action.payload.id);
    },
    setInitialSchedules: (state, action: PayloadAction<WorkoutSchedule[]>) => {
      state.Schedules = action.payload;
    },
    addExercise: (state, action: PayloadAction<AddExercisePayload>) => {
      state
      .Schedules[action.payload.scheduleIndex]
      .Blocks[action.payload.blockIndex]
      .Weeks[action.payload.weekIndex]
      .Days[action.payload.dayIndex]
      .Exercises.push(action.payload.exercise);
      dataPersistence.updateSchedules(state);
    },
    deleteExercise: (state, action: PayloadAction<DeleteExercisePayload>) => {
      state
      .Schedules[action.payload.scheduleIndex]
      .Blocks[action.payload.blockIndex]
      .Weeks[action.payload.weekIndex]
      .Days[action.payload.dayIndex]
      .Exercises.splice(action.payload.exerciseIndex, 1);
      dataPersistence.updateSchedules(state);
    },
    addWeek: (state, action: PayloadAction<AddWeekPayload>) => {
      state
      .Schedules[action.payload.scheduleIndex]
      .Blocks[action.payload.blockIndex]
      .Weeks = 
        state
          .Schedules[action.payload.scheduleIndex]
          .Blocks[action.payload.blockIndex]
          .Weeks.concat(action.payload.week);
      dataPersistence.updateSchedules(state);
    },
    deleteWeek: (state, action: PayloadAction<DeleteWeekPayload>) => {
      state
      .Schedules[action.payload.scheduleIndex]
      .Blocks[action.payload.blockIndex]
      .Weeks.splice(action.payload.weekIndex, 1);
      dataPersistence.updateSchedules(state);
    },
    addBlock: (state, action: PayloadAction<AddBlockPayload>) => {
      state
        .Schedules[action.payload.scheduleIndex]
        .Blocks = 
          state
            .Schedules[action.payload.scheduleIndex]
            .Blocks.concat(action.payload.block);
        dataPersistence.updateSchedules(state);
    },
    deleteBlock: (state, action: PayloadAction<DeleteBlockPayload>) => {
      state
        .Schedules[action.payload.scheduleIndex]
        .Blocks.splice(action.payload.blockIndex, 1);
      dataPersistence.updateSchedules(state);
    },
    editIterations: (state, action: PayloadAction<EditIterationsPayload>) => {
      state
        .Schedules[action.payload.scheduleIndex]
        .CurrentBlock = action.payload.block;
      state
        .Schedules[action.payload.scheduleIndex]
        .CurrentWeek = action.payload.week;
      dataPersistence.updateSchedules(state);
    }
  },
})

export const { 
  changeMultiplier, 
  setSchedule, 
  addSchedule, 
  updateExercise, 
  setInitialSchedules, 
  addExercise, 
  deleteExercise,
  addWeek,
  deleteWeek,
  addBlock,
  deleteBlock,
  deleteSchedule,
  editIterations } = workoutScheduleSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectMultipliers = (state: RootState, scheduleIndex: number, blockIndex: number, weekIndex: number, dayIndex: number) => {
    state.workoutSchedule.Schedules[scheduleIndex].Blocks[blockIndex].Weeks[weekIndex].Days[dayIndex];
}

export const selectSchedule = (state: RootState, scheduleIndex: number) => state.workoutSchedule.Schedules[scheduleIndex];

export default workoutScheduleSlice.reducer
