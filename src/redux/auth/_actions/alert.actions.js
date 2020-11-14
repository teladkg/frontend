import { alertConstants } from '../_constants';
// import { userConstants } from '../_constants';

export const alertActions = {
    success,
    error,
    clear,
    // changeSuccessPosted
};

function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    return { type: alertConstants.ERROR, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}


// function changeSuccessPosted() {
//     return { type:  userConstants.POST_NEW_RENTAL_SUCCESS_AFTER}
// }