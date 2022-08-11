import {dataStore} from "../../constants/constants";

const authResponse = (data) => {
    return {
        type: dataStore.AuthResponse,
        payload: data
    }
};

export const userActions = {
    authResponse: authResponse
};