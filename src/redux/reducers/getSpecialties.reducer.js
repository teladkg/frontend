import { GET_SPECIALTIES } from '../actions/constants'

const initialState = {
    specialties: [],
}

const getSpecialties = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPECIALTIES:
            return { 
                ...state, specialties: action.payload
            }
        default: return state;
    }
}

export default getSpecialties;