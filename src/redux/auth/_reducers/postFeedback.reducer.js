import { userConstants } from '../_constants';

function postFeedback(state = {}, action) {
  switch (action.type) {
    case userConstants.POST_FEEDBACK_REQUEST:
      return { adding: true };
    case userConstants.POST_FEEDBACK_SUCCESS:
      return { added: true };
    case userConstants.POST_FEEDBACK_FAILURE:
      return {};
    default:
      return state
  }
}

export default postFeedback;