import { Box, Button, Flex, FormControl, FormLabel, Input, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure, Text, Modal, ModalHeader, ModalBody, ModalContent, ModalOverlay, IconButton, Select, HStack, useToast } from '@chakra-ui/react'
import React, { type ReactElement, useEffect, useState } from 'react'
import DataPersistence from '../../services/DataPersistence'
import { type Client, type ExerciseReference, type Max, type WorkoutSchedule } from '../../types/types'
import { v4 as uuidv4 } from 'uuid'
import { AddIcon, EditIcon } from '@chakra-ui/icons'
import EditFirstNameModal from './EditFirstNameModal'
import EditLastNameModal from './EditLastNameModal'
import EditScheduleModal from './EditScheduleModal'

function ClientPage (): ReactElement {
  const initialClient: Client = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    maxes: [],
    scheduleId: ''
  }

  const dataPersistence = new DataPersistence()
  const [clientList, setClientList] = useState<Client[]>([])
  const [scheduleList, setScheduleList] = useState<WorkoutSchedule[]>([])
  const [newFirstName, setNewFirstName] = useState('')
  const [newLastName, setNewLastName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newScheduleId, setNewScheduleId] = useState('')
  const [newMaxName, setNewMaxName] = useState('')
  const [activeClient, setActiveClient] = useState(initialClient)
  const [clientToDelete, setClientToDelete] = useState(initialClient)
  const [exerciseRefs, setExerciseRefs] = useState<ExerciseReference[]>([])
  const { isOpen, onOpen, onClose } = useDisclosure()
  const deleteDialog = useDisclosure()
  const maxesDialog = useDisclosure()
  const newMaxNameDialog = useDisclosure()
  const editFirstNameDialog = useDisclosure()
  const editLastNameDialog = useDisclosure()
  const editScheduleDialog = useDisclosure()
  const cancelRef = React.useRef() as any
  const toast = useToast()

  const addClient = (): void => {
    const id = uuidv4()
    const newMaxes: Max[] = []
    const newClient: Client = {
      firstName: newFirstName,
      lastName: newLastName,
      email: newEmail,
      maxes: newMaxes,
      id,
      scheduleId: newScheduleId
    }
    dataPersistence.addNewClient(newClient)
      .then(success => {
        setClientList(clientList.concat(newClient))
        toast({
          description: 'Client Added successfully',
          status: 'success',
          duration: 3000,
          isClosable: true
        })
      })
      .catch(error => {
        console.log(error)
        toast({
          description: 'Error adding client',
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      })
  }

  const openEditMaxesDialog = (client: Client): void => {
    setActiveClient(client)
    maxesDialog.onOpen()
  }

  const updateMax = (changeMaxEvent: React.ChangeEvent<HTMLInputElement>, index: number): void => {
    const updatedClient = { ...activeClient }
    updatedClient.maxes[index].weight = parseInt(changeMaxEvent.currentTarget.value)
    setActiveClient(updatedClient)
  }

  const updateClientMaxes = (): void => {
    maxesDialog.onClose()
    dataPersistence.updateClient(activeClient)
      .then(success => {
        toast({
          description: 'Client Maxes updated successfully',
          status: 'success',
          duration: 3000,
          isClosable: true
        })
      })
      .catch(error => {
        console.log(error)
        toast({
          description: 'Error updating client maxes',
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      })
  }

  const onClickDelete = (client: Client): void => {
    setClientToDelete(client)
    deleteDialog.onOpen()
  }

  const addMax = (): void => {
    const newMax: Max = {
      name: newMaxName,
      weight: 0
    }
    const updatedClient = { ...activeClient }
    updatedClient.maxes.push(newMax)
    setActiveClient(updatedClient)
    newMaxNameDialog.onClose()
  }

  const deleteClient = (): void => {
    deleteDialog.onClose()
    dataPersistence.deleteClient(clientToDelete)
      .then(success => {
        toast({
          description: 'Client Deleted successfully',
          status: 'success',
          duration: 3000,
          isClosable: true
        })
        const updatedClientList = clientList.filter(client => client.id !== clientToDelete.id)
        setClientList(updatedClientList)
      })
      .catch(error => {
        console.log(error)
        toast({
          description: 'Error deleting client',
          status: 'error',
          duration: 3000,
          isClosable: true
        })
      })
  }

  const getScheduleNameFromId = (id: string): string | undefined => {
    return scheduleList.find(s => s.Id === id)?.Name
  }

  const openFirstNameEdit = (id: string): void => {
    const matchingClient = clientList.find(c => c.id === id)
    if (matchingClient != null) {
      setActiveClient(matchingClient)
    }
    editFirstNameDialog.onOpen()
  }

  const openLastNameEdit = (id: string): void => {
    const matchingClient = clientList.find(c => c.id === id)
    if (matchingClient != null) {
      setActiveClient(matchingClient)
    }
    editLastNameDialog.onOpen()
  }

  const openScheduleEdit = (id: string): void => {
    const matchingClient = clientList.find(c => c.id === id)
    if (matchingClient != null) {
      setActiveClient(matchingClient)
    }
    editScheduleDialog.onOpen()
  }

  const updateFirstName = (name: string): void => {
    const updatedActiveClient = { ...activeClient }
    updatedActiveClient.firstName = name
    setActiveClient(updatedActiveClient)
  }

  const updateLastName = (name: string): void => {
    const updatedActiveClient = { ...activeClient }
    updatedActiveClient.lastName = name
    setActiveClient(updatedActiveClient)
  }

  const updateSchedule = (scheduleId: string): void => {
    const updatedActiveClient = { ...activeClient }
    updatedActiveClient.scheduleId = scheduleId
    setActiveClient(updatedActiveClient)
  }

  useEffect(() => {
    dataPersistence.getClients()
      .then(response => {
        setClientList(response)
      })
      .catch((error: any) => { console.log(error) })

    dataPersistence.getExercises()
      .then(response => {
        setExerciseRefs(response)
      })
      .catch(() => {})

    dataPersistence.getSchedules()
      .then(response => {
        setScheduleList(response)
      })
      .catch(() => {})
  }, [])

  return (
        <Flex direction="column" mt={5}>
            <Button
                w="100px"
                ml="25px"
                onClick={onOpen}>Add Client</Button>
            <TableContainer>
                <Table variant="simple">
                    <Thead>
                        <Tr>
                            <Th>First Name</Th>
                            <Th>Last Name</Th>
                            <Th>Schedule</Th>
                            <Th>Maxes</Th>
                            <Th>Remove</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {clientList.map((client, index) => {
                          return (
                                <Tr key={index}>
                                    <Td>
                                        <HStack>
                                            <Text>
                                                {client.firstName}
                                            </Text>
                                            <IconButton
                                                aria-label='Edit Name'
                                                icon={<EditIcon />}
                                                onClick={() => { openFirstNameEdit(client.id) }}
                                            />
                                        </HStack>
                                    </Td>
                                    <Td>
                                        <HStack>
                                            <Text>
                                                {client.lastName}
                                            </Text>
                                            <IconButton
                                                aria-label='Edit Name'
                                                icon={<EditIcon />}
                                                onClick={() => { openLastNameEdit(client.id) }}
                                            />
                                        </HStack>
                                    </Td>
                                    <Td>
                                        <HStack>
                                            <Text>
                                                {getScheduleNameFromId(client.scheduleId)}
                                            </Text>
                                            <IconButton
                                                aria-label='Change Schedule'
                                                icon={<EditIcon />}
                                                onClick={() => { openScheduleEdit(client.id) }}
                                            />
                                        </HStack>
                                    </Td>
                                    <Td>
                                        <Button colorScheme='green' onClick={() => { openEditMaxesDialog(client) }}>
                                            Edit Maxes
                                        </Button>
                                    </Td>
                                    <Td>
                                        <Button
                                            onClick={() => { onClickDelete(client) }}
                                            colorScheme='red'>
                                            Delete Client
                                        </Button>
                                    </Td>
                                </Tr>
                          )
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
            <Modal
                isOpen={deleteDialog.isOpen}
                onClose={deleteDialog.onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <FormControl>
                            <Text>Are you sure you want to delete this client? This is permanent.</Text>
                            <Button onClick={deleteDialog.onClose}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme='red'
                                onClick={() => { deleteClient() }}
                                ml={3}>
                                Delete
                            </Button>
                        </FormControl>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize='lg' fontWeight='bold'>
                        Add Client
                    </ModalHeader>
                    <ModalBody>
                        <FormControl>
                            <FormLabel>First Name</FormLabel>
                            <Input type="text" onChange={(event) => { setNewFirstName(event.target.value) }}/>
                            <FormLabel>Last Name</FormLabel>
                            <Input type="text" onChange={(event) => { setNewLastName(event.target.value) }}/>
                            <FormLabel>Email</FormLabel>
                            <Input type="text" onChange={(event) => { setNewEmail(event.target.value) }}/>
                            <FormLabel>Schedule</FormLabel>
                            <Select placeholder='Select name' onChange={(event) => { setNewScheduleId(event.target.value) }}>
                                {scheduleList.map((s, index) => {
                                  return (
                                        <option key={index} value={s.Id}>{s.Name}</option>
                                  )
                                })}
                            </Select>
                            <Button ref={cancelRef} onClick={onClose} mt={5}>
                                Cancel
                            </Button>
                            <Button colorScheme='green' onClick={addClient} ml={3} mt={5}>
                                Submit
                            </Button>
                        </FormControl>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Modal
            isOpen={maxesDialog.isOpen}
            onClose={maxesDialog.onClose}>
                <ModalContent>
                    <ModalHeader>Edit Maxes for {activeClient.firstName} {activeClient.lastName}</ModalHeader>
                    <ModalBody>
                        <FormControl>
                            {activeClient.maxes?.map((max, index) => {
                              return (
                                    <Box key={index}>
                                        <FormLabel>{max.name}</FormLabel>
                                        <Input onChange={(event) => { updateMax(event, index) }} type="number" placeholder={max.weight.toString()} mb='20px'/>
                                    </Box>
                              )
                            })}
                            <Button colorScheme='red' ref={cancelRef} onClick={maxesDialog.onClose} mt='20px'>
                                Cancel
                            </Button>
                            <Button colorScheme='green' ml={3} mt='20px' onClick={updateClientMaxes}>
                                Submit
                            </Button>
                            <IconButton aria-label="Add Max" icon={<AddIcon/>} onClick={newMaxNameDialog.onOpen} mt='20px' ml={3}/>
                        </FormControl>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Modal
            isOpen={newMaxNameDialog.isOpen}
            onClose={newMaxNameDialog.onClose}>
                <ModalContent>
                    <ModalHeader>Select exercise name</ModalHeader>
                    <ModalBody>
                        <FormControl>
                            <Select placeholder='Select name' onChange={(event) => { setNewMaxName(event.target.value) }}>
                                {exerciseRefs.map((ex, index) => {
                                  return (
                                        <option key={index} value={ex.name}>{ex.name}</option>
                                  )
                                })}
                            </Select>
                            <Button colorScheme='red' ref={cancelRef} onClick={newMaxNameDialog.onClose} mt='20px'>
                                Cancel
                            </Button>
                            <Button colorScheme='green' ml={3} mt='20px' onClick={addMax}>
                                Ok
                            </Button>
                        </FormControl>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <EditFirstNameModal
                client={activeClient}
                editFirstNameDialog={editFirstNameDialog}
                setNewName={updateFirstName}/>
            <EditLastNameModal
                client={activeClient}
                editLastNameDialog={editLastNameDialog}
                setNewName={updateLastName}/>
            <EditScheduleModal
                client={activeClient}
                scheduleList={scheduleList}
                editScheduleDialog={editScheduleDialog}
                setSchedule={updateSchedule}/>
        </Flex>
  )
}

export default ClientPage
