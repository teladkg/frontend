import { userConstants } from '../_constants';
import { userService } from '../_services/user.service';
import { alertActions } from './';

export const userActions = {
    checkToken,
    registration
};


function checkToken(idtoken) {
  return dispatch => {
    dispatch(request(idtoken));

    userService.checkToken(idtoken)
      .then(
        idtoken => { 
          dispatch(success());
          dispatch(alertActions.success('Phone checked successful'));
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      );
  };
    
  function request(idtoken) { return { type: userConstants.CHECK_TOKEN_REQUEST, idtoken } }
  function success(idtoken) { return { type: userConstants.CHECK_TOKEN_SUCCESS, idtoken } }
  function failure(error) { return { type: userConstants.CHECK_TOKEN_FAILURE, error } }
}


function registration(data) {
  return dispatch => {
    dispatch(request(data));

    userService.registration(data)
      .then(
        data => { 
          dispatch(success(data));
          dispatch(alertActions.success('User registered successfully'));
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      );
  };
    
  function request(data) { return { type: userConstants.REGISTER_REQUEST, data } }
  function success(data) { return { type: userConstants.REGISTER_SUCCESS, data } }
  function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}