import React, { type ReactElement, useEffect, useState } from 'react'
import { Box, Button, Flex, FormControl, FormLabel, Input, useDisclosure, Text, Modal, ModalBody, ModalContent, ModalOverlay, SimpleGrid, Card, CardHeader, Heading, IconButton, Spacer, CardFooter, ModalHeader, ModalCloseButton } from '@chakra-ui/react'
import DataPersistence from '../services/DataPersistence'
import { type ExerciseReference, type ExerciseType } from '../types/types'
import { DeleteIcon, EditIcon } from '@chakra-ui/icons'

function ExerciseEditorPage (): ReactElement {
  const dataPersistence = new DataPersistence()

  const [exercises, setExercises] = useState<ExerciseReference[]>([])
  const [newExerciseName, setNewExerciseName] = useState<string>('')

  const addExercise = useDisclosure()
  const editExercise = useDisclosure()

  const getExercises = (): void => {
    dataPersistence.getExercises().then(response => {
      setExercises(response)
    }).catch(() => {})
  }

  const addNewExercise = (): void => {
    const newExercise: ExerciseType = {
      Name: newExerciseName
    }
    dataPersistence.addNewExercise(newExercise).then(() => {
      dataPersistence.getExercises().catch(() => {})
      addExercise.onClose()
    }).catch(() => {})
  }

  const deleteExercise = (id: string): void => {
    dataPersistence.deleteExercise(id).then(() => { getExercises() }).catch(() => {})
  }

  const submitDisabled = (): boolean => {
    if (newExerciseName === '') {
      return true
    } else return false
  }

  const getType = (type: number): string => {
    if (type === 1) return 'Primary'
    else return 'Accessory'
  }

  useEffect(() => {
    getExercises()
  })

  return (
        <Box mt={5} ml={5} mr={5}>
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                {exercises.map((ex, index) => {
                  return (
                        <Card key={index}>
                            <CardHeader>
                                <Flex flexDirection={'row'}>
                                    <Heading size='md'>{ex.name}</Heading>
                                </Flex>
                                <Text>{getType(Number(ex.type))}</Text>
                            </CardHeader>
                            <CardFooter>
                                <IconButton aria-label='Delete Exercise' icon={<DeleteIcon />} onClick={() => { deleteExercise(ex.id) }}/>
                                    <Spacer />
                                <IconButton aria-label='Edit Exercise' icon={<EditIcon />} onClick={() => { editExercise.onOpen() }}/>
                            </CardFooter>
                        </Card>
                  )
                })}
                <Button onClick={addExercise.onOpen}>
                    Add Exercise
                </Button>
            </SimpleGrid>
            <Modal
                isOpen={addExercise.isOpen}
                onClose={addExercise.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <FormControl>
                        <FormLabel>Exercise Name</FormLabel>
                            <Input type="text" onChange={(event) => { setNewExerciseName(event.target.value) }}/>
                            <Button onClick={addNewExercise} mt={5} isDisabled={submitDisabled()}>
                                Submit
                            </Button>
                        </FormControl>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Modal isOpen={editExercise.isOpen} onClose={editExercise.onClose}>
              <ModalOverlay/>
              <ModalContent>
                <ModalHeader>Edit exercise</ModalHeader>
                <ModalCloseButton/>
                <ModalBody></ModalBody>
              </ModalContent>
            </Modal>
        </Box>
  )
}

export default ExerciseEditorPage
