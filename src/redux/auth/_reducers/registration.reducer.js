import { userConstants } from '../_constants';

function registration(state = {}, action) {
  switch (action.type) {
    case userConstants.DOCTOR_REGISTER_REQUEST:
      return { registering: true };
    case userConstants.DOCTOR_REGISTER_SUCCESS:
      return { registered: true };
    case userConstants.DOCTOR_REGISTER_FAILURE:
      return {};
    default:
      return state
  }
}

export default registration;