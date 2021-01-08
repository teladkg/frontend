import { ADD_FILTER_CHARECTER } from '../actions/constants';

const initialState = {
    param: ''
};

const setFilterItem = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FILTER_CHARECTER:
            return { 
                ...state, param: action.param
            };

        default: 
            return state
    }
}

export default setFilterItem;