import {API, BASE_URL} from './config';

export default {
    getAllStates: async ()=>{
        try {
            const response = await API.get(`${BASE_URL}/getallstates`);
            return response;
        } catch (error) {
            console.log('error', error)
            return error.response;
        }
    }
}