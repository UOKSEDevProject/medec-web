import {dataStore} from "../../constants/constants";

let initialState = {};

const patientReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'testing': {
            return state;
        }

        case dataStore.AddAppointmentList: {
            return {
                ...state,
                appointmentList: action.payload
            }
        }

        case dataStore.AddLabReportList: {
            return {
                ...state,
                labReportList: action.payload
            }
        }

        case dataStore.AddMedicalHistory: {
            return {
                ...state,
                medicalHistoryList: action.payload
            }
        }

        default: {
            return state;
        }
    }
};

export default patientReducer;