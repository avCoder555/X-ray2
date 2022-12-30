import {API, BASE_URL} from './config';

export default {
    createOperator: async(reqBody)=>{
        try {
            const response = await API.post(`${BASE_URL}/webapi/createoperator`,reqBody);
            return response;
        } catch (error) {
            console.log('err', error)
            return error.response;
        }
    },
}