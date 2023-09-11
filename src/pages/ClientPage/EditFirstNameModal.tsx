import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import DataPersistence from '../../services/DataPersistence';

function EditFirstNameModal(props: any) {

    const dataPersistence = new DataPersistence();
    
    const [editedName, setEditedName] = useState('')

    const updateName = () => {
        const updatedClient = {...props.client}
        updatedClient.firstName = editedName
        dataPersistence.updateClient(updatedClient)
        props.editFirstNameDialog.onClose()
        props.setNewName(editedName)
    }

    return(
        <Modal isOpen={props.editFirstNameDialog.isOpen} onClose={props.editFirstNameDialog.onClose}>
            <ModalContent>
                <ModalBody>
                    <FormControl>
                        <FormLabel>First Name</FormLabel>
                        <Input type="text" onChange={(event) => setEditedName(event.target.value)}/>
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