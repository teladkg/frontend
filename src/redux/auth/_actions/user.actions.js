import { responsiveFontSizes } from '@material-ui/core';
import { userConstants } from '../_constants';
import { userService } from '../_services/user.service';
import { alertActions } from './';
import axios from 'axios'
import authHeader from '../_helpers/auth-header';

export const userActions = {
  checkToken,
  registration,
  registrateclient,
  logout,
  getPCDoctor
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
    
  function request(data) { return { type: userConstants.DOCTOR_REGISTER_REQUEST, data } }
  function success(data) { return { type: userConstants.DOCTOR_REGISTER_SUCCESS, data } }
  function failure(error) { return { type: userConstants.DOCTOR_REGISTER_FAILURE, error } }
}


function registrateclient(data) {
  return dispatch => {
    dispatch(request(data));

    userService.registrateclient(data)
      .then(
        data => { 
          dispatch(success(data));
          dispatch(alertActions.success('Client registered successfully'));
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      );
  };
    
  function request(data) { return { type: userConstants.CLIENT_REGISTER_REQUEST, data } }
  function success(data) { return { type: userConstants.CLIENT_REGISTER_SUCCESS, data } }
  function failure(error) { return { type: userConstants.CLIENT_REGISTER_FAILURE, error } }
}


function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}


function getPCDoctor() {
  return async dispatch => {
    dispatch(request());

      // let token = localStorage.getItem('userToken');
      await axios.get('http://167.172.109.15:8000/userinfo/editdoctor/', {
        headers: authHeader()
      })
      .then(
        res => dispatch(success(res.data)),
        error => dispatch(failure(error))
      );
  };

  function request() { return { type: userConstants.GET_PCDOCTOR_REQUEST } }
  function success(data) { return { type: userConstants.GET_PCDOCTOR_SUCCESS, data } }
  function failure(error) { return { type: userConstants.GET_PCDOCTOR_FAILURE, error } }
}

