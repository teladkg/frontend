import axios from 'axios';
import { GET_DOCTORS, GET_DOCTOR_BY_ID, GET_SPECIALTIES, GET_CITIES, GET_FILTER_RESULT, ADD_FILTER_CHARECTER, GET_CLINICS, GET_CLINIC_BY_ID } from './constants';


/* ДЛЯ ОБЩЕГО GET-ЗАПРОСА ДЛЯ ДОКТОРОВ */
const getDoctorsSuccess = (json) => {
  return {
    type: GET_DOCTORS,
    payload: json
  }
}
const getDoctors = () => {
  return async dispatch => {
    // dispatch(showLoader())
    await axios.get('http://167.172.109.15/userinfo/doctor/?limit=200')
    .then(res => {
      dispatch(getDoctorsSuccess(res.data))
      // dispatch(hideLoader())
    })
  }
}


/* ДЛЯ ОБЩЕГО GET-ЗАПРОСА ДЛЯ КЛИНИК */
const getClinicsSuccess = (json) => {
  return {
    type: GET_CLINICS,
    payload: json
  }
}
const getClinics = () => {
  return async dispatch => {
    // dispatch(showLoader())
    await axios.get('http://167.172.109.15/userinfo/clinic/?limit=200')
    .then(res => {
      dispatch(getClinicsSuccess(res.data))
      // dispatch(hideLoader())
    })
  }
}


/* ДЛЯ ДОКТОРА ПО АЙДИ */
const getDoctorById = (id) => {
  return async dispatch => {
    await axios.get(`http://167.172.109.15/userinfo/doctor/${id}`)
    .then(json => {
      dispatch({ type: GET_DOCTOR_BY_ID, payload: json })
    })
  }
}


/* ДЛЯ КЛИНИКИ ПО АЙДИ */
const getClinicById = (id) => {
  return async dispatch => {
    await axios.get(`http://167.172.109.15/userinfo/clinic/${id}`)
    .then(json => {
      dispatch({ type: GET_CLINIC_BY_ID, payload: json })
    })
  }
}


/* ДЛЯ СПЕЦИАЛЬНОСТЕЙ */
const getSpecialtiesSuccess = (json) => {
  return {
    type: GET_SPECIALTIES,
    payload: json
  }
}
const getSpecialties = () => {
  return async dispatch => {
    await axios.get('http://167.172.109.15/userinfo/specialty/?limit=200')
    .then(res => {
      dispatch(getSpecialtiesSuccess(res.data))
    })
  }
}


/* ДЛЯ СПЕЦИАЛЬНОСТЕЙ */
const getCitiesSuccess = (json) => {
  return {
    type: GET_CITIES,
    payload: json
  }
}
const getCities = () => {
  return async dispatch => {
    await axios.get('http://167.172.109.15/userinfo/city/')
    .then(res => {
      dispatch(getCitiesSuccess(res.data))
    })
  }
}


/* ДЛЯ ФИЛЬТРА ПО ОБЪЯВЛЕНИЯМ */
function getFilterData(items) {
  return async dispatch => {
    // dispatch(showLoader())
    // let itemsArr = items.slice(0, -1)
    const response = await fetch(`http://167.172.109.15/userinfo/doctor/?${items}`)
    // const response = await fetch(`http://167.172.109.15/userinfo/doctor/?${itemsArr}`)
    const json = await response.json()
    dispatch({type: GET_FILTER_RESULT, filterData: json})
    // dispatch(hideLoader())
  }
}
/* ДЛЯ ДОБАВЛЕНИЯ ПАРАМЕТРОВ ФИЛЬТРА */
const setFilterItems = (param) => {
  return dispatch => {
    dispatch({ type: ADD_FILTER_CHARECTER, param: param })
  }
}


export {
  getDoctors,
  getDoctorById,
  getSpecialties,
  getCities,
  getFilterData,
  setFilterItems,
  getClinics,
  getClinicById
}