import axios from "axios";


const checkToken = async(idtoken) => { 
    try {
        const response = await axios.post('http://167.172.109.15:8000/users/gettoken/', {
            idtoken: idtoken
        });
        localStorage.setItem('userToken', response.data.token);
        // console.log(response.data);
        // console.log(response.data.token);
        // console.log(localStorage.getItem('user'));
        // console.log(localStorage.getItem('user'));
    } catch (err) {
        console.error(err);
    }
};


const registration = async(data) => { 
    const idtoken = localStorage.getItem('fireToken');
    const response = await axios.post('http://167.172.109.15:8000/users/application/', {
        idtoken: idtoken,
        first_name: data.firstname,
        last_name: data.lastname,
        reference: null
    });
    console.log(response);
};


// async function checkToken(idtoken) {
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({idtoken})
//     };

//     const response = await fetch(`http://167.172.109.15:8000​/users​/gettoken​/`, requestOptions);
//     return handleResponse(response);
// }


// function logout() {
//     // remove user from local storage to log user out
//     localStorage.removeItem('user');
// }



function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
                // window.location.reload(true);
                console.log("error 401")
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

export const userService = {
    checkToken,
    registration
};