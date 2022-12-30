import {API, BASE_URL} from './config';

export default {
    loginApi: async (reqBody)=>{
        // const reqBody = {
        //     "mobile":"kia@gmail.com",
        //     //"mobile":"9752073917",
        //     "password":"admin",
        //     "user_type_id":"1"
        // }
        try {
            const response = await API.post(`${BASE_URL}/auth/login`,reqBody);
            return response;
        } catch (error) {
            console.log('error', error)
            return error.response;
        }
    }
}