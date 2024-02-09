import React, { type ReactElement } from 'react'
import { Box, Flex, Heading, Text } from '@chakra-ui/react'

export default function NotesView (): ReactElement {
  return (
        <Box
        padding='10px'>
            <Heading size='md'>Release Notes: Feb 9, 2024</Heading>
            <Flex
            flexDirection='column'
            justifyContent='start'>
                <Text>Added ability to edit max reference for exercises in schedule builder</Text>
                <Text>Can now copy exercises in schedule builder</Text>
                <Text>General UI Improvements</Text>
            </Flex>
        </Box>
  )
}
