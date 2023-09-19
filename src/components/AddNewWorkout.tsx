import { AddIcon } from '@chakra-ui/icons'
import { Box, FormControl, FormLabel, HStack, Input, Tag, TagLabel, TagRightIcon } from '@chakra-ui/react'
import React, { type ReactElement, useState } from 'react'

export default function AddNewWorkout (): ReactElement {
  const [, setNewWorkoutName] = useState('')

  const [addNewBlockToggle, setAddNewBlockToggle] = useState(false)
  const [addNewWeekToggle, setAddNewWeekToggle] = useState(false)

  return (
        <Box>
            <FormControl>
                <FormLabel>Name</FormLabel>
                <Input type="text" onChange={(event) => { setNewWorkoutName(event.target.value) }}/>
            </FormControl>
            <HStack>
                <Tag onClick={e => { setAddNewBlockToggle(!addNewBlockToggle) }}>
                    <TagLabel>Add Block</TagLabel>
                    <TagRightIcon as={AddIcon} />
                </Tag>
            </HStack>
            {addNewBlockToggle &&
                <HStack>
                    <Tag onClick={e => { setAddNewWeekToggle(!addNewWeekToggle) }}>
                        <TagLabel>Add Week</TagLabel>
                        <TagRightIcon as={AddIcon} />
                    </Tag>
                </HStack>
            }
        </Box>
  )
}
