import React, { type ReactElement, useState } from 'react'
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent } from '@chakra-ui/react'
import DataPersistence from '../../services/DataPersistence'
import { type Client } from '../../types/types'

function EditFirstNameModal (props: any): ReactElement {
  const dataPersistence = new DataPersistence()

  const [editedName, setEditedName] = useState('')

  const updateName = (): void => {
    const updatedClient: Client = { ...props.client }
    updatedClient.firstName = editedName
    dataPersistence.updateClient(updatedClient).catch((() => {}))
    props.editFirstNameDialog.onClose()
    props.setNewName(editedName)
  }

  return (
        <Modal isOpen={props.editFirstNameDialog.isOpen} onClose={props.editFirstNameDialog.onClose}>
            <ModalContent>
                <ModalBody>
                    <FormControl>
                        <FormLabel>First Name</FormLabel>
                        <Input type="text" onChange={(event) => { setEditedName(event.target.value) }}/>
                        <Button onClick={props.editFirstNameDialog.onClose} mt={5} mr={5}>
                            Cancel
                        </Button>
                        <Button colorScheme='green' onClick={updateName} mt={5} mr={5}>
                            Submit
                        </Button>
                    </FormControl>
                </ModalBody>
            </ModalContent>
        </Modal>
  )
}

export default EditFirstNameModal
