import {dataStore} from "../../constants/constants";

let initialState = {};

const userReducer = (state= initialState, action) => {
    switch (action.type) {
        case dataStore.AuthResponse: {
            return action.payload;
        }

        default: {
            return state;
        }
    }
};

export default userReducer;