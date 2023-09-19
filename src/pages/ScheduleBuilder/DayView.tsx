import { AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from '@chakra-ui/react'
import ExercisesView from './ExercisesView'
import React, { type ReactElement } from 'react'

export default function DayView (props: any): ReactElement {
  return (
        <Box>
            <AccordionItem >
                <h2>
                    <AccordionButton>
                        <Box as="span" flex='1' textAlign='left'>
                            Day {props.dayNumber + 1}
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <ExercisesView
                        exercises={props.day.Exercises}
                        scheduleIndex={props.scheduleIndex}
                        workoutIndex={props.workoutIndex}
                        blockIndex={props.blockIndex}
                        weekIndex={props.weekIndex}
                        dayIndex={props.dayIndex}
                        index={props.dayNumber}/>
                </AccordionPanel>
            </AccordionItem>
        </Box>
  )
}
