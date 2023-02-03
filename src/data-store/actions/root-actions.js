import {dataStore} from "../../constants/constants";

const clearStore = () => {
    return {
        type: dataStore.Logout,
    }
};

export const rootActions = {
    clearStore: clearStore
};