import { userConstants } from '../_constants'

const initialState = {
    data: {},
}

const getPCDoctor = (state = initialState, action) => {
    switch (action.type) {
        case userConstants.GET_PCDOCTOR_REQUEST:
            return { 
                loggingIn: true,          
            }
        case userConstants.GET_PCDOCTOR_SUCCESS:
            return {
                loggedIn: true,
                data: action.data 
            };
        case userConstants.GET_PCDOCTOR_FAILURE:
            return { 
                error: action.error
            };
            
        default: return state;
    }
}

export default getPCDoctor;