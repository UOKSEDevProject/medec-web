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

const addLabReportList = (data) => {
    return {
        type: dataStore.AddLabReportList,
        payload: data,
    }
}

const addMedicalHistory = (data) => {
    return {
        type: dataStore.AddMedicalHistory,
        payload: data,
    }
}

const updateAppointmentList = (data) => {
    return {
        type: dataStore.UpdateAppointmentList,
        payload: data,
    }
}

export const patientActions = {
    createPatient: createPatient,
    addAppointmentList: addAppointmentList,
    addLabReportList: addLabReportList,
    addMedicalHistory: addMedicalHistory,
    updateAppointmentList: updateAppointmentList
}