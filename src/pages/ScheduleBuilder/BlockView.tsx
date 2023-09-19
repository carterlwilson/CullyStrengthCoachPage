import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, HStack } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { addWeek, deleteBlock } from '../../features/workoutScheduleSlice'
import { type AddWeekPayload, type DeleteBlockPayload } from '../../types/PayloadTypes'
import { type Day, type Week } from '../../types/types'
import WeekView from './WeekView'
import React, { type ReactElement } from 'react'

export default function BlockView (props: any): ReactElement {
  const dispatch = useDispatch()

  const addNewWeek = (): void => {
    const newDay1: Day = {
      Exercises: []
    }
    const newDay2: Day = {
      Exercises: []
    }
    const newDay3: Day = {
      Exercises: []
    }
    const newWeek: Week = {
      Days: [newDay1, newDay2, newDay3]
    }
    const addWeekPayload: AddWeekPayload = {
      scheduleIndex: props.scheduleIndex,
      blockIndex: props.blockIndex,
      week: newWeek
    }
    console.log(props.blockIndex)
    dispatch(addWeek(addWeekPayload))
  }

  const deleteThisBlock = (): void => {
    const payload: DeleteBlockPayload = {
      scheduleIndex: props.scheduleIndex,
      blockIndex: props.blockIndex
    }
    dispatch(deleteBlock(payload))
  }

  return (
        <Box>
            <AccordionItem>
                <h2>
                    <HStack>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                                Block {props.blockIndex + 1}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <Button onClick={deleteThisBlock}>Delete</Button>
                    </HStack>
                </h2>
                <AccordionPanel pb={4}>
                    <Accordion allowMultiple>
                        {props.block.Weeks.map((week: any, index: number) => {
                          return (
                                <WeekView
                                    week={week}
                                    scheduleIndex={props.scheduleIndex}
                                    blockIndex={props.blockIndex}
                                    weekIndex={index}
                                    key={index}/>
                          )
                        })}
                    </Accordion>
                    <Button onClick={addNewWeek}>Add New Week</Button>
                </AccordionPanel>
            </AccordionItem>
        </Box>
  )
}
