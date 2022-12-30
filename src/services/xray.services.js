import {API, BASE_URL} from './config';

export default {
    getAllXrayType: async ()=>{
        try {
            const response = await API.get(`${BASE_URL}/webapi/getallxray`);
            // console.log('response', response.data)
            return response;
        } catch (error) {
            console.log('error', error)
            return error.response;
        }
    },

    createXrayType: async(reqBody)=>{
        try {
            const response = await API.post(`${BASE_URL}/webapi/createxraytype`,reqBody);
            return response;
        } catch (error) {
            console.log('err', error)
            return error.response;
        }
    },

    deleteXrayTypeById: async(reqBody)=>{
        try {
            const response = await API.post(`${BASE_URL}/webapi/deletexraytypebyid`,reqBody);
            return response;
        } catch (error) {
            return error.response
        }
    },

    updateXrayTypeById: async(id,reqBody)=>{
        try {
            const response = await API.post(`${BASE_URL}/webapi/updatexraytypebyid/${id}`,reqBody);
            return response;
        } catch (error) {
            console.log("error", error)
            return error.response
        }
    }
}