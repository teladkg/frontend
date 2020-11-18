export function authHeader() {
    // return authorization header with jwt token
    let token = JSON.parse(localStorage.getItem('userToken'));

    if (token) {
        return { 'Authorization': 'Token ' + token };
    } else {
        return {};
    }
}