let initialState = {};

const patientReducer = (state= initialState, action) => {
    switch (action.type) {
        case 'testing': {
            return state;
        }

        default: {
            return state;
        }
    }
};

export default patientReducer;