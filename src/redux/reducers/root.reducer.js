import { combineReducers } from "redux";

// import authReducer from '../auth/_reducers/auth.reducer';
import checkToken from '../auth/_reducers/checkToken.reducer';
import registration from '../auth/_reducers/registration.reducer';
import registrateclient from '../auth/_reducers/registrateclient.reducer';
import getPCDoctor from '../auth/_reducers/getPCDoctor.reducer';
import editPCDoctor from '../auth/_reducers/editPCDoctor.reducer';

import getDoctors from '../reducers/getDoctors.reducer';
import getDoctorById from '../reducers/getDoctorById.reducer';
import getSpecialties from '../reducers/getSpecialties.reducer';

export const rootReducer = combineReducers({
    // authReducer: authReducer,
    checkToken: checkToken,
    registration: registration,
    registrateclient: registrateclient,
    getPCDoctor: getPCDoctor,
    editPCDoctor: editPCDoctor,
    
    getDoctors: getDoctors,
    getDoctorById: getDoctorById,
    getSpecialties: getSpecialties
})