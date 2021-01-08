import { GET_CLINIC_BY_ID } from '../actions/constants'

const initialState = {
    clinicById: ''
}

const getClinicById = (state = initialState, action) => {
    switch (action.type) {
        case GET_CLINIC_BY_ID:
            return {
                clinicById: action.payload
            };

        default: 
            return {
                ...state
        };   
    }
};

export default getClinicById;