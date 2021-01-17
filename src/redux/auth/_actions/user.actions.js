import { userConstants } from '../_constants';
import { userService } from '../_services/user.service';
import { alertActions } from './';
import axios from 'axios'
import authHeader from '../_helpers/auth-header';
import { toast } from "react-toastify";

export const userActions = {
  checkToken,
  registration,
  registrateclient,
  logout,
  getPCDoctor,
  editPCDoctor,
  postFeedback,
  postClinicFeedback
};


function checkToken(idtoken) {
  return async dispatch => {
    dispatch(request(idtoken));

    await userService.checkToken(idtoken)
      .then(
        idtoken => { 
          dispatch(success());
          dispatch(alertActions.success('Phone checked successful'));
        },
        error => {
          dispatch(failure(error));
          dispatch(alertActions.error(error));
        }
      )
      .catch((err) => {
        console.log(err);
      })
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
      )
      .catch((err) => {
        console.log(err);
      })
  };
    
  function request(data) { return { type: userConstants.DOCTOR_REGISTER_REQUEST, data } }
  function success(data) { return { type: userConstants.DOCTOR_REGISTER_SUCCESS, data } }
  function failure(error) { return { type: userConstants.DOCTOR_REGISTER_FAILURE, error } }
}


function getPCDoctor() {
  return async dispatch => {
    dispatch(request());
    await axios.get('http://167.172.109.15/userinfo/editdoctor/', {
      headers: authHeader()
    })
      .then(
        res => dispatch(success(res.data)),
        error => dispatch(failure(error))
      )
      .catch((err) => {
        console.log(err);
      })
  };

  function request() { return { type: userConstants.GET_PCDOCTOR_REQUEST } }
  function success(data) { return { type: userConstants.GET_PCDOCTOR_SUCCESS, data } }
  function failure(error) { return { type: userConstants.GET_PCDOCTOR_FAILURE, error } }
}


function editPCDoctor(data) {
  return async dispatch => {
    dispatch(request(data));
    userService.editPCDoctor(data)
      .then(
        data => {
          dispatch(success());
          toast.success('Изменения сохранены', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          dispatch(alertActions.success('Doctor edited successfully'));
        },
        error => {
          dispatch(failure(error));
          toast.error('Ошибка!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
          dispatch(alertActions.error(error));
        }
      )
      .catch(err => {
        console.log(err);
      })
  };

  function request(data) { return { type: userConstants.EDIT_PCDOCTOR_REQUEST, data } }
  function success() { return { type: userConstants.EDIT_PCDOCTOR_SUCCESS } }
  function failure(error) { return { type: userConstants.EDIT_PCDOCTOR_FAILURE, error } }
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
      )
      .catch(err => {
        console.log(err);
      })
  };
    
  function request(data) { return { type: userConstants.CLIENT_REGISTER_REQUEST, data } }
  function success(data) { return { type: userConstants.CLIENT_REGISTER_SUCCESS, data } }
  function failure(error) { return { type: userConstants.CLIENT_REGISTER_FAILURE, error } }
}


function postFeedback(data) {
  console.log(data);
  return async dispatch => {
    dispatch(request(data));
    console.log(data);
    await userService.postFeedback(data)
      .then(
        data => {
          dispatch(success(data));
          console.log(data);
          toast.success('Отзыв оставлен', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          dispatch(alertActions.success('Your feedback sent successfully!'));
        },
        error => {
          dispatch(failure(error));
          console.log(data);
          toast.error('Вы уже оставляли отзыв', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          dispatch(alertActions.error(error));
        }
      )
      .catch(err => {
        console.log(err);
      })
  };

  function request(data) { return { type: userConstants.POST_FEEDBACK_REQUEST, data } }
  function success(data) { return { type: userConstants.POST_FEEDBACK_SUCCESS, data } }
  function failure(error) { return { type: userConstants.POST_FEEDBACK_FAILURE, error } }
}


function postClinicFeedback(data) {
  console.log(data);
  return async dispatch => {
    dispatch(request(data));
    console.log(data);
    await userService.postClinicFeedback(data)
      .then(
        data => {
          dispatch(success(data));
          console.log(data);
          toast.success('Отзыв оставлен', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          dispatch(alertActions.success('Your feedback sent successfully!'));
        },
        error => {
          dispatch(failure(error));
          console.log(data);
          toast.error('Вы уже оставляли отзыв', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          dispatch(alertActions.error(error));
        }
      )
      .catch(err => {
        console.log(err);
      })
  };

  function request(data) { return { type: userConstants.POST_CLINIC_FEEDBACK_REQUEST, data } }
  function success(data) { return { type: userConstants.POST_CLINIC_FEEDBACK_SUCCESS, data } }
  function failure(error) { return { type: userConstants.POST_CLINIC_FEEDBACK_FAILURE, error } }
}


function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}