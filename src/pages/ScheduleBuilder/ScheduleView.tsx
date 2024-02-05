import { CopyIcon, DeleteIcon } from '@chakra-ui/icons'
import { Accordion, Box, Button, Heading, Stack, useDisclosure, Text, HStack, FormControl, FormLabel, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Modal, ModalContent, ModalOverlay, ModalHeader, ModalCloseButton, Input, ModalBody, ModalFooter } from '@chakra-ui/react'
import React, { type ReactElement, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlock, addSchedule, deleteSchedule, editIterations } from '../../features/workoutScheduleSlice'
import { type AddBlockPayload, type DeleteSchedulePayload, type EditIterationsPayload } from '../../types/PayloadTypes'
import { type WorkoutSchedule, type Block, type Day, type Week } from '../../types/types'
import BlockView from './BlockView'
import { v4 as uuidv4 } from 'uuid'

export default function ScheduleView (props: any): ReactElement {
  const { onClose } = useDisclosure()
  const copyScheduleModal = useDisclosure()

  const dispatch = useDispatch()
  const [newScheduleName, setNewScheduleName] = useState('')

  const addNewBlock = (): void => {
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
    dispatch(addBlock(payload))
    onClose()
  }

  const getWeeksMax = (blockNum: number): number => {
    return props.workout?.Blocks[blockNum]?.Weeks?.length
  }

  const _deleteSchedule = (): void => {
    props.resetIndex()
    const payload: DeleteSchedulePayload = {
      index: props.scheduleIndex,
      id: props.workout.Id
    }
    dispatch(deleteSchedule(payload))
  }

  const editBlock = (value: number): void => {
    const payload: EditIterationsPayload = {
      scheduleIndex: props.scheduleIndex,
      block: value,
      week: props.workout.CurrentWeek
    }
    dispatch(editIterations(payload))
  }

  const editWeek = (value: number): void => {
    const payload: EditIterationsPayload = {
      scheduleIndex: props.scheduleIndex,
      block: props.workout.CurrentBlock,
      week: value
    }
    dispatch(editIterations(payload))
  }

  const onConfirmCopySchedule = (): void => {
    const newSchedule: WorkoutSchedule = { ...props.workout }
    newSchedule.Name = newScheduleName
    newSchedule.Id = uuidv4()
    dispatch(addSchedule(newSchedule))
  }

  return (
        <Box ml={5} mt={5} mr={5}>
            <Stack>
                <Heading>
                    <HStack>
                        <Text>
                            {props.workout.Name}
                        </Text>
                        <Button>
                            <CopyIcon onClick={copyScheduleModal.onOpen}/>
                        </Button>
                        {props.workout.Name !== 'Default' &&
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
                            value={props.workout.CurrentBlock + 1}
                            min={1}
                            max={props.workout.Blocks.length}
                            w='75px'
                            onChange={(value) => { editBlock(Number(value) - 1) }}>
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
                            value={props.workout.CurrentWeek + 1}
                            min={1}
                            max={getWeeksMax(props.workout.CurrentBlock as number)}
                            w='75px'
                            onChange={(value) => { editWeek(Number(value) - 1) }}>
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </Box>
                    </HStack>
                </FormControl>
                <Accordion allowMultiple>
                    {props.workout.Blocks.map((block: any, index: number) => {
                      return (
                            <BlockView
                                key={index}
                                block={props.workout.Blocks[index]}
                                scheduleIndex={props.scheduleIndex}
                                blockIndex={index}/>
                      )
                    })}
                </Accordion>
                <Button onClick={addNewBlock}>Add New Block</Button>
            </Stack>
            <Modal isOpen={copyScheduleModal.isOpen} onClose={copyScheduleModal.onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Copy Schedule</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text mb='8px'>What do you want to name the new schedule?</Text>
                        <Input
                            value={newScheduleName}
                            onChange={event => { setNewScheduleName(event.target.value) }}
                            size='sm'
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onConfirmCopySchedule}>Add</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
  )
}
