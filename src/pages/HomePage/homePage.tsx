import '../../App.css'
import { Box, ChakraProvider, useColorModeValue, Flex } from '@chakra-ui/react'
import { Outlet } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from '../../app/Store'
import React, { type ReactElement } from 'react'
import 'firebaseui/dist/firebaseui.css'
import MenuBar from '..//HomePage/menuBar'

function HomePage (): ReactElement {
  return (
    <Provider store={store}>
      <ChakraProvider>
          <Flex flexDirection={'row'}>
            <Box
              minH="100vh"
              bg={useColorModeValue('gray.100', 'gray.900')}
              w={['30%', '15%']}
              id='sidebar_box'
              position='fixed'
              zIndex={1}
              p='10px'>
              <MenuBar isAdmin={true}/>
            </Box>
            <Box w="100%" id='content-container' ml='15%' zIndex={0}>
              <Outlet />
            </Box>
          </Flex>
      </ChakraProvider>
    </Provider>
  )
}

export default HomePage
