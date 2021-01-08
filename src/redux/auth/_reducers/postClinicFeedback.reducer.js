import { userConstants } from '../_constants';

function postClinicFeedback(state = {}, action) {
  switch (action.type) {
    case userConstants.POST_CLINIC_FEEDBACK_REQUEST:
      return { adding: true };
    case userConstants.POST_CLINIC_FEEDBACK_SUCCESS:
      return { added: true };
    case userConstants.POST_CLINIC_FEEDBACK_FAILURE:
      return {};
    default:
      return state
  }
}

export default postClinicFeedback;