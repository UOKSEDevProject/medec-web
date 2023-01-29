import { act } from "react-dom/test-utils";
import {dataStore} from "../../constants/constants";

let initialState = {};

const doctorReducer = (state = initialState, action) => {
    switch (action.type) {
        case dataStore.AddDoctors: {
            return {
                ...state,
                doctorList: action.payload
            };
        }

        case dataStore.AddDoctorTimeSchedule: {
            return {
                ...state,
                sessionList: action.payload
            }
        }

        case dataStore.AddSessionToDoctorTimeSchedule: {

            let object = {
                __typename: action.payload.__typename,
                id: action.payload._id,
                appointments: action.payload.totApts,
                date:  action.payload.date,
                maximumAppointments: action.payload.maxApts,
                time: action.payload.strTime,
            };

            return {
                ...state,
                sessionList: {...state.sessionList, sessionsList: [...state.sessionList.sessionsList, object]}
             }
        }

        case dataStore.UpdateSessionOfDoctorTimeSchedule: {

            let list=[];

            if(state?.sessionList?._id===action?.payload?.dctId){
                state.sessionList.sessionsList.find((item) => {

                    if(item.id===action.payload._id){

                        let object = {
                            __typename: item.__typename,
                            id: item.id,
                            appointments: action.payload.totApts,
                            date:  action.payload.date,
                            maximumAppointments: action.payload.maxApts,
                            time: action.payload.strTime,
                        };
                        list.push(object);
                    }else{
                        list.push(item);
                    }
                })
            }
            
            return {
               ...state,
               sessionList: {...state.sessionList, sessionsList: list}
            }
        }

        case dataStore.DeleteSessionFromDoctorSessionList: {
    
            return {
                ...state,
                sessionList: {...state.sessionList, sessionsList: state?.sessionList?.sessionsList.filter((item) => {
                   return item.id!==action.payload
                })}
            }
        }

        case dataStore.AddSearchList: {

            return {
                ...state,
                searchList: action.payload
            }
        }

        default: {
            return state;
        }
    }
};

export default doctorReducer;