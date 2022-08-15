import {dataStore} from "../../constants/constants";

let initialState = {};

const processGettingDoctors = (data) => {
    if (data && data.getDoctors) {
        return data.getDoctors.map((data) => {
            return {
                disName: data.disName,
                mediCenter: data.mediCenter,
                specialization: data.specialization,
                status: data.status,
                imageSrc: data.imageSrc,
                id: data._id
            };
        });
    }
};

const doctorReducer = (state = initialState, action) => {
  switch (action.type) {
      case dataStore.CreateDoctors: {
          return {
              ...state,
              doctors: processGettingDoctors(action.payload)
          };
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