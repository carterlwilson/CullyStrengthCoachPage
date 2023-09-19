import { AddIcon } from '@chakra-ui/icons'
import { Box, Text, Button, HStack, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Input } from '@chakra-ui/react'
import React, { type ReactElement, useEffect, useState } from 'react'
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { type RootState } from '../../app/Store'
import AddNewWorkout from '../../components/AddNewWorkout'
import { addSchedule, setInitialSchedules } from '../../features/workoutScheduleSlice'
import DataPersistence from '../../services/DataPersistence'
import { type Block, type Day, type Week, type WorkoutSchedule } from '../../types/types'
import ScheduleView from './ScheduleView'
import { v4 as uuidv4 } from 'uuid'

export default function ScheduleBuilder (): ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [addNewWorkoutToggle, setAddNewWorkoutToggle] = useState(false)
  const [showExistingWorkoutToggle, setShowExistingWorkoutToggle] = useState(false)
  const [currentlyShownWorkoutIndex, setCurrentlyShownWorkoutIndex] = useState(-1)
  const [newScheduleName, setNewScheduleName] = useState('')

  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
  const dispatch = useDispatch()

  const existingWorkouts: WorkoutSchedule[] = useTypedSelector((state) => state.workoutSchedule.Schedules)

  useEffect(() => {
    const dataPersistence = new DataPersistence()
    dataPersistence.getSchedules().then(response => {
      dispatch(setInitialSchedules(response))
    }).catch(() => {})
  }, [dispatch])

  const getScheduleButtonTheme = (index: number): string => {
    if (index === currentlyShownWorkoutIndex) {
      return 'green'
    } else return 'gray'
  }

  const selectExistingWorkout = (index: number): void => {
    setCurrentlyShownWorkoutIndex(index)
    setShowExistingWorkoutToggle(true)
  }

  const onConfirmAddSchedule = (): void => {
    const id = uuidv4()
    const newDay: Day = {
      Exercises: []
    }
    const newWeek: Week = {
      Days: [newDay, newDay, newDay]
    }
    const newBlock: Block = {
      Weeks: [newWeek]
    }
    const newSchedule: WorkoutSchedule = {
      Id: id,
      Name: newScheduleName,
      Blocks: [newBlock],
      CurrentBlock: 0,
      CurrentWeek: 0
    }
    dispatch(addSchedule(newSchedule))
    onClose()
  }

  const resetCurrentScheduleIndex = (): void => {
    setCurrentlyShownWorkoutIndex(-1)
  }

  return (
        <Box>
            <HStack mt={5} ml={5}>
                {existingWorkouts.map((workout, index) => {
                  return (
                        <Button
                        colorScheme={getScheduleButtonTheme(index)}
                        key={index}
                        onClick={e => {
                          selectExistingWorkout(index)
                          setAddNewWorkoutToggle(false)
                        }}>
                            {workout.Name}
                        </Button>
                  )
                })}
                <Button onClick={onOpen}>
                    <Text mr={2}>Add New Schedule</Text>
                    <AddIcon/>
                </Button>
            </HStack>
            {addNewWorkoutToggle &&
                <AddNewWorkout />
            }
            {showExistingWorkoutToggle &&
                existingWorkouts[currentlyShownWorkoutIndex] != null &&
                <ScheduleView
                workout={existingWorkouts[currentlyShownWorkoutIndex]}
                scheduleIndex={currentlyShownWorkoutIndex}
                resetIndex={resetCurrentScheduleIndex}/>
            }
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add new schedule</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text mb='8px'>What do you want to name the new schedule?</Text>
                        <Input
                            value={newScheduleName}
                            onChange={event => { setNewScheduleName(event.target.value) }}
                            size='sm'
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onConfirmAddSchedule}>Add</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
  )
}
