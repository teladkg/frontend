import { combineReducers } from "redux";

// import authReducer from '../auth/_reducers/auth.reducer';
import checkToken from '../auth/_reducers/checkToken.reducer';
import registration from '../auth/_reducers/registration.reducer'

export const rootReducer = combineReducers({
    // authReducer: authReducer,
    checkToken: checkToken,
    registration: registration,
})