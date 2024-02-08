import { Button, Flex, VStack } from '@chakra-ui/react'
import React, { useEffect, type ReactElement, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../auth'
import { signOut } from 'firebase/auth'
import Utilities from '../../app/Utilities'

export default function MenuBar (props: any): ReactElement {
  const navigate = useNavigate()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const username = window.localStorage.getItem('username')
    if (username != null) {
      Utilities.IsAdminUser(username).then((response) => {
        if (response) {
          setIsAdmin(response)
        }
      }).catch((error) => { console.log(error) })
    }
  }, [])

  const logOut = (): void => {
    signOut(auth).then(() => {
      navigate('/')
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <Flex
        flexDirection={'column'}
        justifyContent='space-between'
        id='sidebar_flexbox'
        h='90vh'>
        <VStack>
          {(isAdmin)
            ? (
          <Link
            style={{ width: '100%' }}
            to="/home/clients">
            <Button
              variant="solid"
              colorScheme="green"
              width="100%"
              id='link_btn_1'
              mb='5px'>
              Clients
            </Button>
          </Link>
              )
            : (<div/>)}
          {isAdmin
            ? (
              <Link
                to="/home/schedule-builder"
                style={{ width: '100%' }}>
                <Button
                  variant="solid"
                  colorScheme="green"
                  width="100%"
                  id='lind_btn_2'
                  mb='5px'>
                  Schedule Builder
                </Button>
            </Link>
              )
            : (<div/>)}
          {isAdmin
            ? (
            <Link
              to="/home/exercises"
              style={{ width: '100%' }}>
              <Button
                variant="solid"
                colorScheme="green"
                width="100%"
                id='lind_btn_2'
                mb='5px'>
                Exercise Editor
              </Button>
            </Link>
              )
            : (<div/>)}
          {!isAdmin
            ? (
            <Link to="/home/max-editor">
              <Button
                variant="solid"
                colorScheme="green"
                width="100%"
                id='lind_btn_2'>
                Edit Maxes
              </Button>
            </Link>
              )
            : (<div/>)}
        </VStack>
        <Button
          onClick={logOut}
          variant='outline'
          colorScheme='green'>Log Out</Button>
      </Flex>
  )
}
