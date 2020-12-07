import { userConstants } from '../_constants';

function editPCDoctor(state = {}, action) {
  switch (action.type) {
    case userConstants.EDIT_PCDOCTOR_REQUEST:
      return { editing: true };
    case userConstants.EDIT_PCDOCTOR_SUCCESS:
      return { edited: true };
    case userConstants.EDIT_PCDOCTOR_FAILURE:
      return {};
    default:
      return state
  }
}

export default editPCDoctor;