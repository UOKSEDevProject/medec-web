import {dataStore} from "../../constants/constants";

let initialState = {};

const laboratoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case dataStore.addCustomerDetails: {
            return {
                ...state,
                customerDetails: action.payload
            }
        }
        case dataStore.addCustomerList: {
            return {
                ...state,
                customerList: action.payload
            }
        }
        default: {
            return state;
        }
    }
};

export default laboratoryReducer;