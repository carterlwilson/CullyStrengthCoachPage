import { AccordionItem, Text, Table, TableContainer, Tr, Th, Tbody, Thead, NumberInput, NumberInputField, Button, useDisclosure, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Select, RadioGroup, Stack, Radio, Box } from '@chakra-ui/react'
import React, { type ReactElement, useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Exercise, type ExerciseReference } from '../../types/types'
import { ExerciseView } from './ExerciseView'
import { addExercise } from '../../features/workoutScheduleSlice'
import { type AddExercisePayload } from '../../types/PayloadTypes'
import DataPersistence from '../../services/DataPersistence'

export default function ExercisesView (props: any): ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const dataPersistence = new DataPersistence()

  const [newExerciseName, setNewExerciseName] = useState('')
  const [newExerciseType, setNewExerciseType] = useState('1')
  const [newSets, setNewSets] = useState(0)
  const [newReps, setNewReps] = useState(0)
  const [newMultiplier, setNewMultiplier] = useState(0)
  const [exercises, setExercises] = useState<ExerciseReference[]>([])

  useEffect(() => {
    getExercises().then((response) => {
      setExercises(response)
    }).catch(() => {})
  }, [])

  const getExercises = useCallback(async (): Promise<ExerciseReference[]> => {
    const exercises = await dataPersistence.getExercises()
    return exercises
  }, [dataPersistence])

  const dispatch = useDispatch()

  const addNewExercise = (): void => {
    const payload: AddExercisePayload = {
      exercise: {
        Name: newExerciseName,
        Multiplier: newMultiplier,
        Sets: newSets,
        Reps: newReps,
        Type: Number(newExerciseType)
      },
      scheduleIndex: props.scheduleIndex,
      blockIndex: props.blockIndex,
      weekIndex: props.weekIndex,
      dayIndex: props.dayIndex
    }
    dispatch(addExercise(payload))
    onClose()
  }

  return (
        <Box>
            <AccordionItem key={props.index}>
                <TableContainer>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Sets</Th>
                                <Th>Reps</Th>
                                <Th>Multiplier</Th>
                                <Th>Type</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {props.exercises.map((exercise: any, index: number) => {
                              return (
                                    <ExerciseView
                                    key={index}
                                    exercise={exercise}
                                    index={index}
                                    scheduleIndex={props.scheduleIndex}
                                    workoutIndex={props.workoutIndex}
                                    blockIndex={props.blockIndex}
                                    weekIndex={props.weekIndex}
                                    dayIndex={props.dayIndex}/>
                              )
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
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
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={addNewExercise}>Save</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
  )
}
