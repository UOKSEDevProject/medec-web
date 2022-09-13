import {dataStore} from "../../constants/constants";

const createDoctorList = (doctors) => {
  return {
      type: dataStore.AddDoctors,
      payload: doctors
  };
};

const addSearchList = (doctors) => {
  return {
      type: dataStore.AddSearchList,
      payload: doctors
  };
};

const addDoctorSessionList = (sessions) => {
    return {
        type: dataStore.AddDoctorTimeSchedule,
        payload: sessions
    }
}

export const doctorActions = {
    createDoctorList: createDoctorList,
    addSearchList: addSearchList,
    addDoctorSessionList: addDoctorSessionList
};