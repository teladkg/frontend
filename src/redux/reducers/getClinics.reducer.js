import { GET_CLINICS } from '../actions/constants'

const initialState = {
    clinics: [],
}

const getClinics = (state = initialState, action) => {
    switch (action.type) {
        case GET_CLINICS:
            return { 
                ...state, clinics: action.payload
            }
        default: return state;
    }
}

export default getClinics;