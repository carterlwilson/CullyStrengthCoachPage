import React, { useState } from 'react'
import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import DataPersistence from '../../services/DataPersistence';

function EditLastNameModal(props: any) {

    const dataPersistence = new DataPersistence();
    
    const [editedName, setEditedName] = useState('')

    const updateName = () => {
        const updatedClient = {...props.client}
        updatedClient.lastName = editedName
        dataPersistence.updateClient(updatedClient)
        props.editLastNameDialog.onClose()
        props.setNewName(editedName)
    }

    return(
        <Modal isOpen={props.editLastNameDialog.isOpen} onClose={props.editLastNameDialog.onClose}>
            <ModalContent>
                <ModalBody>
                    <FormControl>
                        <FormLabel>Last Name</FormLabel>
                        <Input type="text" onChange={(event) => setEditedName(event.target.value)}/>
                        <Button onClick={props.editLastNameDialog.onClose} mt={5} mr={5}>
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

export default EditLastNameModal