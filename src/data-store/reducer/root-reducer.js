import {combineReducers, createStore} from "redux";
import doctorReducer from "./doctor-reducer";
import patientReducer from "./patient-reducer";
import laboratoryReducer from "./laboratory-reducer";
import {composeWithDevTools} from "redux-devtools-extension";
import userReducer from "./user-reducer";
import {authConstants} from "../../constants/constants";
import {rootActions} from "../actions/root-actions";
import {notifyMessage} from "../../utils/notification";

const mergerReducers = combineReducers({
    doctorDS: doctorReducer,
    patientDS: patientReducer,
    userDs: userReducer,
    laboratoryDs: laboratoryReducer
});

const rootReducer = (state, action) => {
    if (action.type === 'LOG_OUT') {
        window.sessionStorage.clear();
        window.location.replace(window.location.origin);
        notifyMessage('You have been logout', 0);

        return mergerReducers(undefined, action)
    }

    return mergerReducers(state, action);
}

const store = createStore(rootReducer, composeWithDevTools());

store.subscribe(() => {
    let currentState = store.getState();

    if (currentState && currentState.userDs && currentState.userDs.authSts && currentState.userDs.authSts === authConstants.authLogout) {
       store.dispatch(rootActions.clearStore());
    }
})

export default store;