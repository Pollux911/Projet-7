import axios from 'axios';
import authHeader from "./auth-header";
const API_URL = 'http://localhost:3000/api/auth/';

class AuthService {
    login(user) {
        return axios.post( API_URL + "login", {
                email: user.email,
                password: user.password
        })
            .then(res => {
                if (res.data.token) {
                    localStorage.setItem('user', JSON.stringify(res.data));
                }
                return res.data;
            })
    }
    logout() {
        localStorage.removeItem('user')
    }
    signup(user) {
        return axios.post( API_URL + "signup", {
            email: user.email,
            password: user.password,
            lastName: user.lastName,
            firstName: user.firstName
        })
    }
    deleteUser(user){
        return axios.delete( API_URL +'deleteUser', {
            headers: authHeader(),
            data: {
                email: user.email
            }
        })
    }
}
export default new AuthService();