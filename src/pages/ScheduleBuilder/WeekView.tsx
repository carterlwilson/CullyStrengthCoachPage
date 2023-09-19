import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, HStack } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { deleteWeek } from '../../features/workoutScheduleSlice'
import { type DeleteWeekPayload } from '../../types/PayloadTypes'
import DayView from './DayView'
import React, { type ReactElement } from 'react'

export default function WeekView (props: any): ReactElement {
  const dispatch = useDispatch()

  const deleteThisWeek = (): void => {
    const payload: DeleteWeekPayload = {
      scheduleIndex: props.scheduleIndex,
      blockIndex: props.blockIndex,
      weekIndex: props.weekIndex
    }
    dispatch(deleteWeek(payload))
  }

  return (
        <Box>
            <AccordionItem>
                <h2>
                    <HStack>
                        <AccordionButton>
                            <Box as="span" flex='1' textAlign='left'>
                                Week {props.weekIndex + 1}
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                        <Button onClick={deleteThisWeek}>Delete</Button>
                    </HStack>
                </h2>
                <AccordionPanel pb={4}>
                    <Accordion allowMultiple>
                        {props.week.Days.map((day: any, index: number) => {
                          return (
                                <DayView
                                    day={day}
                                    dayNumber={index}
                                    key={index}
                                    scheduleIndex={props.scheduleIndex}
                                    blockIndex={props.blockIndex}
                                    weekIndex={props.weekIndex}
                                    dayIndex={index}/>
                          )
                        })}
                    </Accordion>
                </AccordionPanel>
            </AccordionItem>
        </Box>
  )
}
