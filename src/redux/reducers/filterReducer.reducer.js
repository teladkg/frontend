import { GET_FILTER_RESULT } from '../actions/constants'

const initialState = {
    filterData: [],
}

const getFilterData = (state = initialState, action) => {
    switch (action.type) {
        case GET_FILTER_RESULT:
            return { 
                ...state, filterData: action.filterData
            }
            
        default: 
            return state;
    }
}

export default getFilterData;