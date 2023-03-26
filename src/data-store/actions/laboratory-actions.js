import {dataStore} from "../../constants/constants";

const addCustomerDetails = (customer) => {
    return {
        type: dataStore.addCustomerDetails,
        payload: customer
    }
}
const addCustomerList = (customers) => {
    return {
        type: dataStore.addCustomerList,
        payload: customers
    }
}

export const laboratoryActions = {
    addCustomerDetails: addCustomerDetails,
    addCustomerList: addCustomerList
}