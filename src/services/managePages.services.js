import {API, BASE_URL} from './config';

export default {
    listApi: async ()=>{
        try {
            const response = await API.get(`${BASE_URL}/webapi/manage-pages/list`);
            // console.log('response', response.data)
            return response;
        } catch (error) {
            console.log('error', error)
            return error.response;
        }
    },

    creatApi: async(reqBody)=>{
        try {
            const response = await API.post(`${BASE_URL}/webapi/manage-pages/create`,reqBody);
            return response;
        } catch (error) {
            console.log('err', error)
            return error.response;
        }
    },

    deleteApi: async(reqBody)=>{
        try {
            const response = await API.post(`${BASE_URL}/webapi/manage-pages/deletebyid`,reqBody);
            return response;
        } catch (error) {
            return error.response
        }
    },

    updateApi: async(id,reqBody)=>{
        try {
            const response = await API.post(`${BASE_URL}/webapi/manage-pages/update/${id}`,reqBody);
            return response;
        } catch (error) {
            console.log("error", error)
            return error.response
        }
    }
}