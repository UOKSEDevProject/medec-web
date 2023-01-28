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