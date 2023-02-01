import {dataStore} from "../../constants/constants";

const createDoctorList = (doctors) => {
    return {
        type: dataStore.AddDoctors,
        payload: doctors
    };
};

const addSearchList = (doctors) => {
    return {
        type: dataStore.AddSearchList,
        payload: doctors
    };
};

const addDoctorSessionList = (sessions) => {
    return {
        type: dataStore.AddDoctorTimeSchedule,
        payload: sessions
    }
}

const addNewSessionToDoctorSessionList = (session) => {
    return {
        type: dataStore.AddSessionToDoctorTimeSchedule,
        payload: session
    }
}

const updateSessionOfDoctorSessionList = (session) => {
    return {
        type: dataStore.UpdateSessionOfDoctorTimeSchedule,
        payload: session
    }
}

const deleteSessionFromDoctorSessionList = (sessionId) => {
    return {
        type: dataStore.DeleteSessionFromDoctorSessionList,
        payload: sessionId
    }
}

const updateDoctorSession = (session) => {
    return {
        type: dataStore.updateDoctorSession,
        payload: session
    }
}

export const doctorActions = {
    createDoctorList: createDoctorList,
    addSearchList: addSearchList,
    addDoctorSessionList: addDoctorSessionList,
    addNewSessionToDoctorSessionList: addNewSessionToDoctorSessionList,
    updateSessionOfDoctorSessionList: updateSessionOfDoctorSessionList,
    deleteSessionFromDoctorSessionList: deleteSessionFromDoctorSessionList,
    updateDoctorSession: updateDoctorSession
};