import { userConstants } from '../_constants';

function registrateclient(state = {}, action) {
  switch (action.type) {
    case userConstants.CLIENT_REGISTER_REQUEST:
      return { registering: true };
    case userConstants.CLIENT_REGISTER_SUCCESS:
      return { registered: true };
    case userConstants.CLIENT_REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}

export default registrateclient;