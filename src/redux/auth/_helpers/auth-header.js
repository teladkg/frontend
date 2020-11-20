function authHeader() {
    // return authorization header with jwt token
    let token = localStorage.getItem('userToken');

    if (token) {
        return { 'Authorization': 'Token ' + token, };
    } else {
        return {};
    }
}

export default authHeader;