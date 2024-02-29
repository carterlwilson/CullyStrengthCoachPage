import React, { useEffect, type ReactElement, useState } from 'react'
import { Flex, Box, Card, CardBody, FormControl, FormLabel, NumberInput, NumberInputField, CardFooter, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Select, HStack, useToast, IconButton } from '@chakra-ui/react'
import DataPersistence from '../services/DataPersistence'
import { type Client, type ExerciseReference, type Max } from '../types/types'
import { DeleteIcon } from '@chakra-ui/icons'

export default function MaxesPage (): ReactElement {
  const id = window.localStorage.getItem('userId') ?? ''
  const dataPersistence = new DataPersistence()

  const [client, setClient] = useState<Client>()
  const [maxes, setMaxes] = useState<Max[]>([])
  const [editedMaxes, setEditedMaxes] = useState<Max[]>([])
  const [exercises, setExercises] = useState<ExerciseReference[]>([])
  const [newMaxName, setNewMaxName] = useState('')
  const [newMaxWeight, setNewMaxWeight] = useState<number>(0)

  const addNewMaxModal = useDisclosure()

  const toast = useToast()

  useEffect(() => {
    dataPersistence.getClient(id).then((value) => {
      setMaxes(value.maxes)
      setEditedMaxes(value.maxes)
      setClient(value)
    }).catch(() => {})
    dataPersistence.getExercises().then((value) => { setExercises(value) }).catch(() => {})
  }, [])

  const addNewMax = (): void => {
    console.log(newMaxName)
    console.log(newMaxWeight)
    addNewMaxModal.onClose()
    const newMax: Max = {
      name: newMaxName,
      weight: newMaxWeight
    }

    const tempEditedMaxes = [...editedMaxes]
    tempEditedMaxes.push(newMax)
    setEditedMaxes(tempEditedMaxes)

    const tempShownMaxes = [...maxes]
    tempShownMaxes.push(newMax)
    setMaxes(tempShownMaxes)
  }

  const editMaxWeight = (index: number, name: string, weight: number): void => {
    const tempMaxes = [...editedMaxes]
    tempMaxes[index] = {
      name,
      weight
    }
    setEditedMaxes(tempMaxes)
  }

  const deleteMax = (index: number): void => {
    const tempMaxes = [...editedMaxes]
    tempMaxes.splice(index, 1)
    setEditedMaxes(tempMaxes)
    setMaxes(tempMaxes)
  }

  const submitChanges = (): void => {
    if (client != null) {
      const editedClient = { ...client }
      editedClient.maxes = editedMaxes
      dataPersistence.updateClient(editedClient).then(() => {
        toast({
          title: 'Maxes Updated.',
          description: "We've updated your maxes for you.",
          status: 'success',
          duration: 9000,
          isClosable: true
        })
        setMaxes(editedMaxes)
      }).catch(() => {
        toast({
          title: 'Error Updating.',
          description: 'We ran into an error updating your maxes, contact your coach.',
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      })
    }
  }

  return (
      <Flex justifyContent='center'>
        <Card w="75%" mt={20}>
          <CardBody>
            <FormControl>
              { maxes.map((max: Max, index: number) => {
                return (
                  <Box key={index} mb={10}>
                    <HStack>
                      <FormLabel>{max.name}</FormLabel>
                      <IconButton
                      onClick={() => { deleteMax(index) }}
                      aria-label='Search database'
                      icon={<DeleteIcon />} />
                    </HStack>
                    <FormLabel>Current Max: {max.weight}</FormLabel>
                    <HStack>
                      <FormLabel>New Max: </FormLabel>
                      <NumberInput>
                        <NumberInputField onChange={(event) => { editMaxWeight(index, max.name, Number(event.target.value)) }}/>
                      </NumberInput>
                    </HStack>
                  </Box>
                )
              })}
            </FormControl>
          </CardBody>
          <CardFooter>
            <Box>
              <Button onClick={addNewMaxModal.onOpen} mb={5} mr={5}>Add New Max</Button>
              <Button onClick={submitChanges}>Submit Changes</Button>
            </Box>
          </CardFooter>
        </Card>
        <Modal isOpen={addNewMaxModal.isOpen} onClose={addNewMaxModal.onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontSize='lg' fontWeight='bold'>Add New Max</ModalHeader>
            <ModalBody>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Select placeholder='Select name' onChange={(event) => { setNewMaxName(event.target.value) }}>
                    {exercises.map((ex, index) => {
                      return (
                            <option key={index} value={ex.name}>{ex.name}</option>
                      )
                    })}
                </Select>
                <FormLabel>Weight</FormLabel>
                <NumberInput>
                  <NumberInputField onChange={(event) => { setNewMaxWeight(Number(event.target.value)) }}/>
                </NumberInput>
              </FormControl>
              <Button onClick={addNewMax} mt={10}>Submit</Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
  )
}
