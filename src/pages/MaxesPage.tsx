import React, { useEffect, type ReactElement, useState } from 'react'
import { Flex, Box, Card, CardBody, FormControl, FormLabel, NumberInput, NumberInputField, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Select, HStack, useToast, IconButton, CardHeader, Heading, Text, Stack, StackDivider } from '@chakra-ui/react'
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
  }, [dataPersistence])

  const addNewMax = (): void => {
    addNewMaxModal.onClose()
    const newMax: Max = {
      name: newMaxName,
      weight: newMaxWeight
    }

    const tempEditedMaxes = [...editedMaxes]
    tempEditedMaxes.unshift(newMax)
    setEditedMaxes(tempEditedMaxes)

    const tempShownMaxes = [...maxes]
    tempShownMaxes.unshift(newMax)
    setMaxes(tempShownMaxes)

    submitChangesOnAdd(tempEditedMaxes)
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

  const submitChangesOnAdd = (maxesToSubmit: Max[]): void => {
    if (client != null) {
      const editedClient = { ...client }
      editedClient.maxes = maxesToSubmit
      dataPersistence.updateClient(editedClient).then(() => {
        toast({
          title: 'Maxes Updated.',
          description: "We've updated your maxes for you.",
          status: 'success',
          duration: 9000,
          isClosable: true
        })
        setMaxes(maxesToSubmit)
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
        <Card w={['60%', '75%']} mt={20}>
          <CardHeader>
            <Heading>Welcome {client?.firstName}!</Heading>
            <Text>You can set your maxes here. Nothing will be changed until you click the submit button.</Text>
          </CardHeader>
          <CardBody>
            <Stack divider={<StackDivider />} spacing='4'>
              <Box>
                <Button onClick={addNewMaxModal.onOpen} mr={5} mb={5}>Add New Max</Button>
                <Button onClick={submitChanges} mb={5}>Submit Changes</Button>
              </Box>
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
            </Stack>
          </CardBody>
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
