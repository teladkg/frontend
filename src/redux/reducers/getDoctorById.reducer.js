import { GET_DOCTOR_BY_ID } from '../actions/constants'

const initialState = {
    doctorById: ''
}

const getDoctorById = (state = initialState, action) => {
    switch (action.type) {
        case GET_DOCTOR_BY_ID:
            return {
                doctorById: action.payload
            };

        default: 
            return {
                ...state
        };   
    }
};

export default getDoctorById;