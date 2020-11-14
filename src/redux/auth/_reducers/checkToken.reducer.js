import { userConstants } from '../_constants';

function checkToken(state = {}, action) {
  switch (action.type) {
    case userConstants.CHECK_TOKEN_REQUEST:
      return { checking: true };
    case userConstants.CHECK_TOKEN_SUCCESS:
      return { checked: true,
               idtoken: localStorage.getItem('userToken')
             };
    case userConstants.CHECK_TOKEN_FAILURE:
      return {  };
    default:
      return state
  }
}

export default checkToken;