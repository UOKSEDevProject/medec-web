import {dataStore} from "../../constants/constants";

const authResponse = (data) => {
    return {
        type: dataStore.AuthResponse,
        payload: data
    }
};

const addImgSrc = (data) => {
    return {
        type: "IMG_HOLDER",
        payload: data
    }
};

const addPatientProfileData = (data) => {
    return {
        type: dataStore.addPatientProfileData,
        payload: data
    }
}

export const userActions = {
    authResponse: authResponse,
    addImgSrc: addImgSrc,
    addPatientProfileData: addPatientProfileData
};