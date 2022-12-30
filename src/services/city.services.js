import {API, BASE_URL} from './config';

export default {
    getAllCity: async ()=>{
        try {
            const response = await API.get(`${BASE_URL}/getallcities`);
            return response;
        } catch (error) {
            console.log('error', error)
            return error.response;
        }
    }
}