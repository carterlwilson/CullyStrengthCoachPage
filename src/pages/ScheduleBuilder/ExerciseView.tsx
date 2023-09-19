// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button, Td, Tr, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input, ModalFooter, useDisclosure, Radio } from '@chakra-ui/react'
import React, { type ReactElement, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateExercise, deleteExercise } from '../../features/workoutScheduleSlice'
import { type DeleteExercisePayload, type UpdateExercisePayload } from '../../types/PayloadTypes'

export function ExerciseView (props: any): ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()

  const [editedName, setEditedName] = useState(props.exercise.Name)
  const [editedSets, setEditedSets] = useState(props.exercise.Sets)
  const [editedReps, setEditedReps] = useState(props.exercise.Reps)
  const [editedMultiplier, setEditedMultiplier] = useState(props.exercise.Multiplier)

  const saveExerciseData = (): void => {
    const payload: UpdateExercisePayload = {
      multiplier: editedMultiplier,
      scheduleIndex: props.scheduleIndex,
      blockIndex: props.blockIndex,
      weekIndex: props.weekIndex,
      dayIndex: props.dayIndex,
      exerciseIndex: props.index,
      name: editedName,
      sets: editedSets,
      reps: editedReps
    }
    dispatch(updateExercise(payload))
    onClose()
  }

  const removeExercise = (): void => {
    const payload: DeleteExercisePayload = {
      scheduleIndex: props.scheduleIndex,
      blockIndex: props.blockIndex,
      weekIndex: props.weekIndex,
      dayIndex: props.dayIndex,
      exerciseIndex: props.index
    }
    dispatch(deleteExercise(payload))
  }

  return (
            <Tr key={props.index}>
                <Td>
                    <Text>
                        {props.exercise.Name}
                    </Text>
                </Td>
                <Td>
                    <Text>
                        {props.exercise.Sets}
                    </Text>
                </Td>
                <Td>
                    <Text>
                        {props.exercise.Reps}
                    </Text>
                </Td>
                <Td>
                    <Text>
                        {props.exercise.Multiplier}
                    </Text>
                </Td>
                <Td>
                    <Text>
                        {props.exercise.Type === 1 ? 'Primary' : 'Accessory'}
                    </Text>
                </Td>
                <Td>
                    <Button onClick={onOpen} ml={3}>Edit</Button>
                    <Button onClick={removeExercise} ml={3}>Delete</Button>
                </Td>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Edit Exercise</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Text mb='8px'>Name:</Text>
                            <Input
                                value={editedName}
                                onChange={event => { setEditedName(event.target.value) }}
                                size='sm'
                            />
                            <Text mb='8px'>Sets:</Text>
                            <Input
                                type="number"
                                value={editedSets}
                                onChange={event => { setEditedSets(Number(event.target.value)) }}
                                size='sm'
                            />
                            <Text mb='8px'>Reps:</Text>
                            <Input
                                type="number"
                                value={editedReps}
                                onChange={event => { setEditedReps(Number(event.target.value)) }}
                                size='sm'
                            />
                            <Text mb='8px'>Multiplier:</Text>
                            <Input
                                type="number"
                                value={editedMultiplier}
                                onChange={event => { setEditedMultiplier(Number(event.target.value)) }}
                                size='sm'
                            />
                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={saveExerciseData}>Save</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Tr>
  )
}
