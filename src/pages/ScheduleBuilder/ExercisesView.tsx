import { AccordionItem, Text, NumberInput, NumberInputField, Button, useDisclosure, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, RadioGroup, Stack, Radio, Box, VStack } from '@chakra-ui/react'
import React, { type ReactElement, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { type Exercise, type ExerciseReference } from '../../types/types'
import { ExerciseView } from './ExerciseView'
import { addExercise, setDailyExercises } from '../../features/workoutScheduleSlice'
import { type SetDailyExercisesPayload, type AddExercisePayload } from '../../types/PayloadTypes'
import DataPersistence from '../../services/DataPersistence'
import { v4 as uuidv4 } from 'uuid'
import { Reorder } from 'framer-motion'

export default function ExercisesView (props: any): ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [newExerciseName, setNewExerciseName] = useState('')
  const [newExerciseType, setNewExerciseType] = useState('1')
  const [newSets, setNewSets] = useState(0)
  const [newReps, setNewReps] = useState(0)
  const [newMultiplier, setNewMultiplier] = useState(0)
  const [newMaxReference, setNewMaxReference] = useState('')
  const [exercises, setExercises] = useState<ExerciseReference[]>([])
  const [scheduledExercises, setScheduledExercises] = useState<Exercise[]>([])

  const dispatch = useDispatch()

  useEffect(() => {
    const dataPersistence = new DataPersistence()
    dataPersistence.getExercises().then(
      (response) => {
        setExercises(response)
      }).catch(() => {})
  }, [])

  useEffect(() => {
    setScheduledExercises(props.exercises as Exercise[])
  }, [props.exercises])

  const setNewExerciseOrder = (newOrder: Exercise[]): void => {
    setScheduledExercises(newOrder)
    const payload: SetDailyExercisesPayload = {
      exercises: newOrder,
      scheduleIndex: props.scheduleIndex,
      blockIndex: props.blockIndex,
      weekIndex: props.weekIndex,
      dayIndex: props.dayIndex
    }
    dispatch(setDailyExercises(payload))
  }

  const replaceExercise = (index: number, newExercise: Exercise): void => {
    const newScheduleExercises = [...scheduledExercises]
    newScheduleExercises[index] = newExercise
    setScheduledExercises(newScheduleExercises)
  }

  const addNewExercise = (): void => {
    const payload: AddExercisePayload = {
      exercise: {
        Id: uuidv4(),
        Name: newExerciseName,
        Multiplier: newMultiplier,
        Sets: newSets,
        Reps: newReps,
        Type: Number(newExerciseType),
        MaxReference: newMaxReference
      },
      scheduleIndex: props.scheduleIndex,
      blockIndex: props.blockIndex,
      weekIndex: props.weekIndex,
      dayIndex: props.dayIndex
    }
    const newExercise: Exercise = {
      Id: payload.exercise.Id,
      Name: payload.exercise.Name,
      Multiplier: payload.exercise.Multiplier,
      Sets: payload.exercise.Sets,
      Reps: payload.exercise.Reps,
      Type: payload.exercise.Type,
      MaxReference: newMaxReference
    }
    const newScheduleExercises = [...scheduledExercises]
    newScheduleExercises.push(newExercise)
    setScheduledExercises(newScheduleExercises)
    dispatch(addExercise(payload))
    onClose()
  }

  return (
        <Box>
            <AccordionItem key={props.index}>
                <Reorder.Group
                axis="y"
                values={scheduledExercises}
                onReorder={setNewExerciseOrder}>
                    <VStack
                    w='100%'
                    m='5px'
                    p='5px'>
                        {scheduledExercises.map((exercise: any, index: number) => {
                          return (
                            <Reorder.Item
                            key={exercise.Id}
                            value={exercise}
                            style={{
                              width: '100%',
                              listStyleType: 'none'
                            }}>
                                <ExerciseView
                                  key={index}
                                  exercise={exercise}
                                  index={index}
                                  scheduleIndex={props.scheduleIndex}
                                  workoutIndex={props.workoutIndex}
                                  blockIndex={props.blockIndex}
                                  weekIndex={props.weekIndex}
                                  dayIndex={props.dayIndex}
                                  exercises={exercises}
                                  replaceExercise={replaceExercise}/>
                            </Reorder.Item>
                          )
                        })}
                    </VStack>
                </Reorder.Group>
                <Button onClick={onOpen}>Add New Exercise</Button>
            </AccordionItem>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add New Exercise</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text mb='8px'>Name:</Text>
                        <Select placeholder='Select name' onChange={(event) => { setNewExerciseName(event.target.value) }}>
                            {exercises.map((ex, index) => {
                              return (
                                    <option key={index} value={ex.name}>{ex.name}</option>
                              )
                            })}
                        </Select>
                        <Text mb='8px'>Sets:</Text>
                        <NumberInput>
                            <NumberInputField
                                value={newSets}
                                onChange={event => { setNewSets(Number(event.target.value)) }}/>
                        </NumberInput>
                        <Text mb='8px'>Reps:</Text>
                        <NumberInput>
                            <NumberInputField
                                type="number"
                                value={newReps}
                                onChange={event => { setNewReps(Number(event.target.value)) }}/>
                        </NumberInput>
                        <Text mb='8px'>Multiplier:</Text>
                        <NumberInput>
                            <NumberInputField
                                type="number"
                                value={newMultiplier}
                                onChange={event => { setNewMultiplier(Number(event.target.value)) }}/>
                        </NumberInput>
                        <RadioGroup onChange={setNewExerciseType} value={newExerciseType}>
                            <Stack direction='row'>
                                <Radio value='1'>Primary </Radio>
                                <Radio value='2'>Accessory</Radio>
                            </Stack>
                        </RadioGroup>
                        <Select placeholder='Select max reference' onChange={(event) => { setNewMaxReference(event.target.value) }}>
                            {exercises.map((ex, index) => {
                              return (
                                    <option key={index} value={ex.name}>{ex.name}</option>
                              )
                            })}
                        </Select>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={addNewExercise}>Save</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
  )
}
