import {combineReducers, createStore} from "redux";
import doctorReducer from "./doctor-reducer";
import patientReducer from "./patient-reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import userReducer from "./user-reducer";

const mergerReducers = combineReducers({
    doctorDS: doctorReducer,
    patientDS: patientReducer,
    userDs: userReducer
});

const store = createStore(mergerReducers, composeWithDevTools());

export default store;