import React, {useEffect, useState} from "react";
import { AlertDialog, AlertDialogBody, AlertDialogHeader, Box, Button, Flex, FormControl, FormLabel, Input, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useDisclosure, Text, Modal, ModalHeader, ModalBody, ModalContent, ModalOverlay, SimpleGrid, Card, CardHeader, Heading, CardBody, RadioGroup, Stack, Radio, IconButton, Spacer } from '@chakra-ui/react';
import DataPersistence from '../services/DataPersistence';
import { Client, ExerciseReference, ExerciseType, Max } from '../types/types';
import {v4 as uuidv4} from 'uuid';
import { useToast } from '@chakra-ui/react'
import Exercise from '../../Models/Exercise'
import { DeleteIcon } from "@chakra-ui/icons";

function ExerciseEditorPage() {

    const dataPersistence = new DataPersistence();

    const [exercises, setExercises] = useState<ExerciseReference[]>([])
    const [newExerciseName, setNewExerciseName] = useState<string>("")

    const addExercise = useDisclosure();

    const getExercises = () => {
        dataPersistence.getExercises().then(response => {
            setExercises(response)
        })
    }

    const addNewExercise = async () => {
        const newExercise : ExerciseType = {
            Name: newExerciseName,
        }
        await dataPersistence.addNewExercise(newExercise)
        await dataPersistence.getExercises()
        addExercise.onClose()
    }

    const deleteExercise = async (id: string) => {
        await dataPersistence.deleteExercise(id)
        await getExercises()
    }

    useEffect(() => {
       getExercises()
    }, [exercises])

    return(
        <Box mt={5} ml={5} mr={5}>
            <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                {exercises.map((ex, index) => {
                    return(
                        <Card key={index}>
                            <CardHeader>
                                <Flex flexDirection={"row"}>
                                    <Heading size='md'>{ex.name}</Heading>
                                    <Spacer />
                                    <IconButton aria-label='Search database' icon={<DeleteIcon />} onClick={() => deleteExercise(ex.id)}/>
                                </Flex>
                            </CardHeader>
                            <CardBody>
                                <Text>Whatever else we want here</Text>
                            </CardBody>
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
                            <Input type="text" onChange={(event) => setNewExerciseName(event.target.value)}/>                            
                            <Button onClick={addNewExercise}>
                                Submit
                            </Button>
                        </FormControl>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    )
}

export default ExerciseEditorPage