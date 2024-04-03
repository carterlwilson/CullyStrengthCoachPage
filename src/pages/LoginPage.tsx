import { Button, Card, FormControl, FormLabel, Input, CardBody, Flex, Stack, Box, StackDivider, Heading, Text, useToast } from '@chakra-ui/react'
import React, { useState, type ReactElement, useEffect } from 'react'
import { signInWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail } from 'firebase/auth'

import { auth } from '../auth'
import { useNavigate } from 'react-router-dom'
import DataPersistence from '../services/DataPersistence'
import { type UserMetadata, type WorkoutSchedule } from '../types/types'

export default function LoginPage (): ReactElement {
  const [email, setEmail] = useState('')
  const [passwordChangeEmail, setPasswordChangeEmail] = useState('')
  const [password, setPassword] = useState('')
  const [scheduleList, setScheduleList] = useState<WorkoutSchedule[]>([])
  const navigate = useNavigate()
  const dataPersistence = new DataPersistence()
  const toast = useToast()

  useEffect(() => {
    dataPersistence.getSchedules()
      .then(response => {
        setScheduleList(scheduleList)
      })
      .catch(() => {})
  }, [])

  onAuthStateChanged(auth, (user) => {
    if (user?.email != null) {
      window.localStorage.setItem('username', user.email.toLowerCase())
      dataPersistence.getUserMetadata(user.email).then((metadata: UserMetadata) => {
        window.localStorage.setItem('userId', metadata.Id)
        window.localStorage.setItem('userRole', metadata.Role.toString())
        navigate('/home')
      }).catch((error) => { console.log(error) })
    } else {
      // User is signed out
      // ...
    }
  })

  const login = (): void => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        navigate('/clients')
        // ...
      })
      .catch((error) => {
        console.log('error logging in', error)
        toast({
          description: 'Error logging in, make sure you are using the correct email and password',
          status: 'error',
          duration: 9000,
          isClosable: true
        })
      })
  }

  const _sendPasswordResetEmail = (): void => {
    sendPasswordResetEmail(auth, passwordChangeEmail)
      .then((result) => {
        toast({
          description: "If you're a registered user, we'll send an email shortly. Thanks!",
          status: 'success',
          duration: 9000,
          isClosable: true
        })
      })
      .catch((error) => { console.log(error) })
  }

  return (
    <Flex p='10' alignItems='center' justifyContent='center'>
        <Card w={['90%', '60%']}>
            <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                    <Box mb={10}>
                        <Heading size='md'>Welcome to Cully Strength! Please log in</Heading>
                        <FormControl isRequired>
                            <FormLabel>Email Address</FormLabel>
                            <Input type='email' onChange={(x => { setEmail(x.target.value) })}/>
                        </FormControl>
                        <FormControl isRequired >
                            <FormLabel>Password</FormLabel>
                            <Input type='password' onChange={(x => { setPassword(x.target.value) })}/>
                        </FormControl>
                        <Button onClick={login} mt={5}>Submit</Button>
                    </Box>
                    <Box>
                      <FormControl>
                        <Text>Forgot your password? Submit your email and we will send you a message with instructions.</Text>
                        <FormLabel>Your Email</FormLabel>
                        <Input type='email' onChange={(x => { setPasswordChangeEmail(x.target.value) })}/>
                      </FormControl>
                      <Button onClick={_sendPasswordResetEmail} mt={5}>Submit</Button>
                    </Box>
{/*                     <Box mt={10}>
                        <Heading size='md'>New member? Create your account here</Heading>
                        <FormControl isRequired>
                            <FormLabel>Email Address</FormLabel>
                            <Input type='email' onChange={(x => { setNewEmail(x.target.value) })}/>
                        </FormControl>
                        <FormControl isRequired >
                            <FormLabel>Create a Password</FormLabel>
                            <Input type='password' onChange={(x => { setNewPassword1(x.target.value) })}/>
                        </FormControl>
                        <FormControl isRequired >
                            <FormLabel>Re-enter Password</FormLabel>
                            <Input type='password' onChange={(x => { console.log('stuff') })}/>
                        </FormControl>
                        <FormControl isRequired >
                            <FormLabel>First Name</FormLabel>
                            <Input type='name' onChange={(x => { setFirstName(x.target.value) })}/>
                        </FormControl>
                        <FormControl isRequired >
                            <FormLabel>Last Name</FormLabel>
                            <Input type='name' onChange={(x => { setLastName(x.target.value) })}/>
                        </FormControl>
                        <Button onClick={createNewUser} mt={5}>Submit</Button>
                    </Box> */}
                </Stack>
            </CardBody>
        </Card>
    </Flex>
  )
}
