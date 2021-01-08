import axios from "axios";
import authHeader from '../_helpers/auth-header';


const checkToken = async(idtoken) => { 
    const response = await axios.post('http://167.172.109.15/users/gettoken/', {
        idtoken: idtoken
    });

    if (response.data.tokenState === false) {
        localStorage.setItem('userToken', response.data.tokenState);
    }
    else {
        localStorage.setItem('userToken', response.data.token);
    } 
    console.log(response.data);
};


const registration = async(data) => { 
    console.log(data);
    const response = await axios.post('http://167.172.109.15/users/application/', data, {"Content-Type": "multipart/form-data"});
    console.log(response);
};


const editPCDoctor = async(data) => {
    console.log(data);
    const response = await axios.patch('http://167.172.109.15/userinfo/editdoctor/', data, {
        headers: authHeader()
    })
    console.log(response);
}


const registrateclient = async(data) => {
    const idtoken = localStorage.getItem('fireToken');
    const response = await axios.post('http://167.172.109.15/users/createclient/', {
        idtoken: idtoken,
    });
    console.log(response.data);
}


const postFeedback = async(data) => {
    console.log(data);
    const response = await axios.post('http://167.172.109.15​/userinfo/feedback/', data, {
        headers: authHeader() 
    })
    console.log(response);
}


const postClinicFeedback = async(data) => {
    console.log(data);
    const response = await axios.post('http://167.172.109.15​​/userinfo/clinicfeedback/', data, {
        headers: authHeader() 
    })
    console.log(response);
}


// const getPCDoctor = async() => {
//     let token = localStorage.getItem('userToken');
//     const data = await axios.get('http://167.172.109.15/userinfo/editdoctor/', {
//         headers: {
//             "Authorization": "Token " + token
//         }
//     }).then((res)=> res.data)
//     console.log(data);
// }


const logout = () => {
    // remove user from local storage to log user out
    localStorage.removeItem('fireToken');
    localStorage.removeItem('userToken');
}


export const userService = {
    checkToken,
    registration,
    registrateclient,
    logout,
    editPCDoctor,
    postFeedback,
    postClinicFeedback
    // getPCDoctor
};