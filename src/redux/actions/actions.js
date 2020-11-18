import axios from 'axios';
import { GET_DOCTORS } from './constants';


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
    await axios.get('http://167.172.109.15:8000/userinfo/doctor/')
    .then(res => {
      dispatch(getDoctorsSuccess(res.data))
      // dispatch(hideLoader())
    })
  }
}





export {
  getDoctors
}