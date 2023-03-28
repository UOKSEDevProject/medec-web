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

        case dataStore.UpdateAppointmentList: {
            if (state && state.appointmentList) {
                let lists = state.appointmentList.map((value) => {
                    if (value._id === action.payload._id) {
                        let list = {
                            aptNo: value.aptNo,
                            channelCenter: value.channelCenter,
                            currAptNo: action.payload.curAptNo ? action.payload.curAptNo : value.currAptNo,
                            date: action.payload.date ? action.payload.date : value.date,
                            dctName: value.dctName,
                            refNo: value.refNo,
                            time: action.payload.strTime ? action.payload.strTime : value.time,
                            totApts: action.payload.totApts ? action.payload.totApts : 0,
                            __typename: "Appointment",
                            _id: value._id
                        }

                        return list;
                    }

                    return value;
                });

                return {...state, appointmentList: lists};
            }

            return state;
        }

        default: {
            return state;
        }
    }
};

export default patientReducer;