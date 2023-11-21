import { Box, Flex, Text } from '@chakra-ui/react'
import React, { type ReactElement } from 'react'

export default function WelcomePage (): ReactElement {
  return (
        <Flex>
            <Box>
                <Text>Welcome, select an option from the menu on the left</Text>
            </Box>
        </Flex>
  )
}
