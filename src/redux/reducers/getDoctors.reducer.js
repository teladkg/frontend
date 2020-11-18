import { GET_DOCTORS } from '../actions/constants'

const initialState = {
    data: [],
}

const getDoctors = (state = initialState, action) => {
    switch (action.type) {
        case GET_DOCTORS:
            return { 
                ...state, data: action.payload
            }
        default: return state;
    }
}

export default getDoctors;