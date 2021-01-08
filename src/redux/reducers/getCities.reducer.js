import { GET_CITIES } from '../actions/constants'

const initialState = {
    cities: [],
}

const getCities = (state = initialState, action) => {
    switch (action.type) {
        case GET_CITIES:
            return { 
                ...state, cities: action.payload
            }
        default: return state;
    }
}

export default getCities;