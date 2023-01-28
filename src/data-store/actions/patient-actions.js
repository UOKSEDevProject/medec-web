import {dataStore} from "../../constants/constants";

const createPatient = (data) => {
    return {
        type: 'something',
        payload: data
    }
}

const addAppointmentList = (data) => {
    return {
        type: dataStore.AddAppointmentList,
        payload: data,
    }
}

export const patientActions = {
    createPatient: createPatient,
    addAppointmentList: addAppointmentList
}