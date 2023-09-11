import { DeleteIcon } from "@chakra-ui/icons";
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Heading, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, useDisclosure, Text, HStack, Input, FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBlock, deleteSchedule, editIterations } from "../../features/workoutScheduleSlice";
import { AddBlockPayload, DeleteSchedulePayload, EditIterationsPayload } from "../../types/PayloadTypes";
import { Block, Day, Week } from "../../types/types";
import BlockView from "./BlockView";

export default function ScheduleView(props: any) {

    const { isOpen, onOpen, onClose } = useDisclosure()

    const dispatch = useDispatch();

    const [newBlockName, setNewBlockName] = useState("newBlock");
    const [editedBlockNumber, setEditedBlockNumber] = useState(0);
    const [editedWeekNumber, setEditedWeekNumber] = useState(0);

    const addNewBlock = () => {
        const newDay1: Day = {
            Exercises: []
        }
        const newDay2: Day = {
            Exercises: []
        }
        const newDay3: Day = {
            Exercises: []
        }
        const newWeek1: Week = {
            Days: [newDay1, newDay2, newDay3]
        }
        const newBlock: Block = {
            Weeks: [newWeek1]
        }
        const payload: AddBlockPayload = {
            scheduleIndex: props.scheduleIndex,
            block: newBlock
        }
        dispatch(addBlock(payload));
        onClose();
    }

    const getWeeksMax = (blockNum: number) => {
        return props.workout.Blocks[blockNum].Weeks.length
    }

    const _deleteSchedule = () => {
        props.resetIndex();
        const payload: DeleteSchedulePayload = {
            index: props.scheduleIndex,
            id: props.workout.Id
        }
        dispatch(deleteSchedule(payload));
    }

    const _editIterations = () => {
        const payload: EditIterationsPayload = {
            scheduleIndex: props.scheduleIndex,
            block: editedBlockNumber,
            week: editedWeekNumber
        }
        dispatch(editIterations(payload));
    }

    return(
        <Box ml={5} mt={5} mr={5}>
            <Stack>
                <Heading>
                    <HStack>
                        <Text>
                            {props.workout.Name}
                        </Text>
                        {props.workout.Name != "Default" &&
                            <Button onClick={_deleteSchedule}>
                                <DeleteIcon _hover={{ color: 'green' }}/>
                            </Button>
                        }
                    </HStack>
                </Heading>
                <FormControl>
                    <HStack>
                        <Box>
                            <FormLabel>Current Block</FormLabel>
                            <NumberInput 
                            defaultValue={props.workout.CurrentBlock + 1}
                            min={1}
                            max={props.workout.Blocks.length}
                            w='75px'
                            onChange={(value) => setEditedBlockNumber(Number(value) - 1)}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>         
                        </Box>
                        <Box>
                            <FormLabel>Current Week</FormLabel>
                            <NumberInput 
                            defaultValue={props.workout.CurrentWeek + 1}
                            min={1}
                            max={getWeeksMax(editedBlockNumber)}
                            w='75px'
                            onChange={(value) => setEditedWeekNumber(Number(value) - 1)}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput> 
                        </Box>
                    </HStack>           
                    <Button colorScheme='green' onClick={_editIterations} mt={3} mb={3}>
                        Submit Iteration Changes
                    </Button>
                </FormControl>
                <Accordion allowMultiple>
                    {props.workout.Blocks.map((block: any, index: number) => {
                        return(
                            <BlockView 
                                key={index} 
                                block={props.workout.Blocks[index]}
                                scheduleIndex={props.scheduleIndex}
                                blockIndex={index}/>
                        );
                    })}
                </Accordion>
                <Button onClick={addNewBlock}>Add New Block</Button>
            </Stack>
        </Box>
    );
}