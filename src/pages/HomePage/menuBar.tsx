import { Button, Flex } from '@chakra-ui/react'
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
    <Flex flexDirection={'column'}
        id='sidebar_flexbox'>
        {(isAdmin)
          ? (
        <Link to="/home/clients">
            <Button
              variant="ghost"
              colorScheme="green"
              width="100%"
              id='link_btn_1'>
              Clients
            </Button>
          </Link>
            )
          : (<div/>)}
        {isAdmin
          ? (
            <Link to="/home/schedule-builder">
            <Button
              variant="ghost"
              colorScheme="green"
              width="100%"
              id='lind_btn_2'>
              Schedule Builder
            </Button>
          </Link>
            )
          : (<div/>)}
        {isAdmin
          ? (
          <Link to="/home/exercises">
            <Button
              variant="ghost"
              colorScheme="green"
              width="100%"
              id='lind_btn_2'>
              Exercise Editor
            </Button>
          </Link>
            )
          : (<div/>)}
        {!isAdmin
          ? (
          <Link to="/home/max-editor">
            <Button
              variant="ghost"
              colorScheme="green"
              width="100%"
              id='lind_btn_2'>
              Edit Maxes
            </Button>
          </Link>
            )
          : (<div/>)}
        <Button onClick={logOut}>Log Out</Button>
      </Flex>
  )
}
