import axios from "axios";
import authHeader from "@/services/auth-header";
const API_URL = 'http://localhost:3000/api/posts/';
class UserService {
    getPublicContent(){
        return axios.get( API_URL, {
            headers: {
                authHeader
            },
        })
    }
    getModeratorContent(){ // TODO : change route and headers to get mod tools
        return fetch( API_URL, {
            method: "GET",
            headers: {
                authHeader
            },
        })
    }
}
export default new UserService();

