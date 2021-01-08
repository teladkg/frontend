import { combineReducers } from "redux";

// import authReducer from '../auth/_reducers/auth.reducer';
import checkToken from '../auth/_reducers/checkToken.reducer';
import registration from '../auth/_reducers/registration.reducer';
import registrateclient from '../auth/_reducers/registrateclient.reducer';
import getPCDoctor from '../auth/_reducers/getPCDoctor.reducer';
import editPCDoctor from '../auth/_reducers/editPCDoctor.reducer';
import postFeedback from '../auth/_reducers/postFeedback.reducer';
import postClinicFeedback from '../auth/_reducers/postClinicFeedback.reducer';

import getDoctors from '../reducers/getDoctors.reducer';
import getDoctorById from '../reducers/getDoctorById.reducer';
import getClinics from '../reducers/getClinics.reducer';
import getClinicById from '../reducers/getClinicById.reducer';
import getSpecialties from '../reducers/getSpecialties.reducer';
import getCities from '../reducers/getCities.reducer';
import setFilterItem from '../reducers/filterItems.reducer';
import getFilterData from '../reducers/filterReducer.reducer';

export const rootReducer = combineReducers({
    checkToken: checkToken,
    registration: registration,
    registrateclient: registrateclient,
    getPCDoctor: getPCDoctor,
    editPCDoctor: editPCDoctor,
    postFeedback: postFeedback,
    postClinicFeedback: postClinicFeedback,
    
    getDoctors: getDoctors,
    getDoctorById: getDoctorById,
    getClinics: getClinics,
    getClinicById: getClinicById,
    getSpecialties: getSpecialties,
    getCities: getCities,

    filter: setFilterItem,
    getFilterData: getFilterData,
})