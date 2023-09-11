import { Button, FormControl, FormLabel, Modal, ModalBody, ModalContent, Select } from "@chakra-ui/react"
import { useState } from "react"
import DataPersistence from "../../services/DataPersistence";
import { WorkoutSchedule } from "../../types/types";

function EditScheduleModal(props: any) {

    const dataPersistence = new DataPersistence();

    const [updatedScheduleId, setUpdatedScheduleId] = useState("")

    const scheduleListCopy = [...props.scheduleList] as WorkoutSchedule[]

    const updateSchedule = () => {
        const updatedClient = {...props.client}
        updatedClient.scheduleId = updatedScheduleId
        dataPersistence.updateClient(updatedClient)
        props.editScheduleDialog.onClose()
        props.setSchedule(updatedScheduleId)
    }

    return(
        <Modal isOpen={props.editScheduleDialog.isOpen} onClose={props.editScheduleDialog.onClose}>
            <ModalContent>
                <ModalBody>
                    <FormControl>      
                        <Select placeholder='Select schedule' onChange={(event) => setUpdatedScheduleId(event.target.value)}>
                            {scheduleListCopy.map((s, index) => {
                                return(
                                    <option key={index} value={s.Id}>{s.Name}</option>
                                )
                            })}
                        </Select>               
                        <Button onClick={props.editScheduleDialog.onClose} mt={5} mr={5}>
                            Cancel
                        </Button>
                        <Button colorScheme='green' onClick={updateSchedule} mt={5} mr={5}>
                            Submit
                        </Button>
                    </FormControl>
                </ModalBody>
            </ModalContent>
        </Modal>
    )

}

export default EditScheduleModal