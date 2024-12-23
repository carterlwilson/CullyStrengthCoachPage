// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button, Text, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Input, ModalFooter, useDisclosure, Radio, Card, HStack, Select, IconButton } from '@chakra-ui/react'
import React, { type ReactElement, useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateExercise, deleteExercise, copyExercise } from '../../features/workoutScheduleSlice'
import { type CopyExercisePayload, type DeleteExercisePayload, type UpdateExercisePayload } from '../../types/PayloadTypes'
import { motion } from 'framer-motion'
import { type ExerciseReference, type Exercise } from '../../types/types'
import { EditIcon } from '@chakra-ui/icons'

export function ExerciseView (props: any): ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()

  const [editedName, setEditedName] = useState(props.exercise.Name)
  const [editedSets, setEditedSets] = useState(props.exercise.Sets)
  const [editedReps, setEditedReps] = useState(props.exercise.Reps)
  const [editedMultiplier, setEditedMultiplier] = useState(props.exercise.Multiplier)
  const [editedMaxReference, setEditedMaxReference] = useState(props.exercise.MaxReference)

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
      reps: editedReps,
      maxReference: editedMaxReference
    }
    dispatch(updateExercise(payload))
    const updatedExercise: Exercise = {
      Id: props.exercise.Id,
      Name: payload.name,
      Multiplier: payload.multiplier,
      Sets: payload.sets,
      Reps: payload.reps,
      Type: props.exercise.Type,
      MaxReference: props.exercise.MaxReference
    }
    props.replaceExercise(payload.exerciseIndex, updatedExercise)
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

  const addDuplicateExercise = (): void => {
    const payload: CopyExercisePayload = {
      scheduleIndex: props.scheduleIndex,
      blockIndex: props.blockIndex,
      weekIndex: props.weekIndex,
      dayIndex: props.dayIndex,
      exerciseIndex: props.index
    }
    dispatch(copyExercise(payload))
  }

  return (
    <Card
    direction='row'
    justify='space-between'
    overflow='hidden'
    variant='outline'
    w='full'
    p='5px'
    as={motion.div}
    whileHover={{ cursor: 'pointer' }}
    >
        <HStack
        justify='space-between'
        w='full'>
            <Text>
                {props.exercise.Name}
            </Text>
            <Text>
                {props.exercise.Sets} Sets
            </Text>
            <Text>
                {props.exercise.Reps} Reps
            </Text>
            <Text>
                {props.exercise.Multiplier} x max
            </Text>
            <Text>
                {props.exercise.Type === 1 ? 'Primary' : 'Accessory'}
            </Text>
            <Text>
                {props.exercise.MaxReference} as max
            </Text>
            <HStack>
                <Button onClick={addDuplicateExercise} ml={3}>Copy</Button>
                <Button onClick={onOpen} ml={3}>Edit</Button>
                <Button onClick={removeExercise} ml={3}>Delete</Button>
                <IconButton aria-label='Edit exercise' icon={<EditIcon />} />
            </HStack>
        </HStack>

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
                        mb='10px'
                    />
                    <Text mb='8px'>Sets:</Text>
                    <Input
                        type="number"
                        value={editedSets}
                        onChange={event => { setEditedSets(Number(event.target.value)) }}
                        size='sm'
                        mb='10px'
                    />
                    <Text mb='8px'>Reps:</Text>
                    <Input
                        type="number"
                        value={editedReps}
                        onChange={event => { setEditedReps(Number(event.target.value)) }}
                        size='sm'
                        mb='10px'
                    />
                    <Text mb='8px'>Multiplier:</Text>
                    <Input
                        type="number"
                        value={editedMultiplier}
                        onChange={event => { setEditedMultiplier(Number(event.target.value)) }}
                        size='sm'
                        mb='10px'
                    />
                    <Select placeholder='Select max reference' onChange={(event) => { setEditedMaxReference(event.target.value) }}>
                        {props.exercises.map((ex: ExerciseReference, index: number) => {
                          return (
                                <option key={index} value={ex.name}>{ex.name}</option>
                          )
                        })}
                    </Select>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={saveExerciseData}>Save</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </Card>
  )
}
