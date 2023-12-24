import React, { type ReactElement, useState } from 'react'
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent } from '@chakra-ui/react'
import DataPersistence from '../../services/DataPersistence'
import { type Client } from '../../types/types'

function EditEmailModal (props: any): ReactElement {
  const dataPersistence = new DataPersistence()
  const [editedEmail, setEditedEmail] = useState('')

  const updateEmail = (): void => {
    const updatedClient: Client = { ...props.client }
    updatedClient.email = editedEmail
    dataPersistence.updateClient(updatedClient).catch(() => {})
    props.editEmailDialog.onClose()
    props.setNewEmail(editedEmail)
  }

  return (
        <Modal isOpen={props.editEmailDialog.isOpen} onClose={props.editEmailDialog.onClose}>
            <ModalContent>
                <ModalBody>
                    <FormControl>
                        <FormLabel>Email</FormLabel>
                        <Input type="text" onChange={(event) => { setEditedEmail(event.target.value) }}/>
                        <Button onClick={props.editEmailDialog.onClose} mt={5} mr={5}>
                            Cancel
                        </Button>
                        <Button colorScheme='green' onClick={updateEmail} mt={5} mr={5}>
                            Submit
                        </Button>
                    </FormControl>
                </ModalBody>
            </ModalContent>
        </Modal>
  )
}

export default EditEmailModal
