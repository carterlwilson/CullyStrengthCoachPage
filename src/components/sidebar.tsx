import { Box, VStack } from '@chakra-ui/react'
import React, { type ReactElement } from 'react'

export default function Sidebar (): ReactElement {
  return (
        <Box>
            <VStack>
                <a href='../pages/testPage1'>
                    <span>Test Page 1</span>
                </a>
                <a href='../pages/testPage2'>
                    <span>Test Page 2</span>
                </a>
            </VStack>
        </Box>
  )
}
