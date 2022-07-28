import {dataStore} from "../../constants/constants";

const createDoctorList = (doctors) => {
  return {
      type: dataStore.CreateDoctors,
      payload: doctors
  };
};

const addSearchList = (doctors) => {
  return {
      type: dataStore.AddSearchList,
      payload: doctors
  };
};

export const doctorActions = {
    createDoctorList: createDoctorList,
    addSearchList: addSearchList
};