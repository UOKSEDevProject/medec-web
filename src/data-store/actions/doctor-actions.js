import {dataStore} from "../../constants/constants";

const createDoctorList = (doctors) => {
  return {
      type: dataStore.CreateDoctors,
      payload: doctors
  }
}

export const doctorActions = {
    createDoctorList: createDoctorList
}