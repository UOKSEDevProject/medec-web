import {dataStore} from "../../constants/constants";

let initialState = {};

const processGettingDoctors = (data) => {
    if (data && data.getDoctors) {
        return data.getDoctors.map((data) => {
            return {
                name: data.name,
                displayName: data.disName,
                nameWithInitials: data.nameWithInitials,
                mediCenter: 'somthing',
                specialties: data.spec,
                status: true,
                imageSrc: data.prfImgUrl,
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

      default: {
          return state;
      }
  }
};

export default doctorReducer;