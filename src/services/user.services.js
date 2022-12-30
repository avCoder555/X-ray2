import {API, BASE_URL} from './config';

export default {
    getAllUsers: async ()=>{
        try {
            const response = await API.get(`${BASE_URL}/webapi/getallusers`);
            // console.log('response', response.data)
            return response;
        } catch (error) {
            console.log('error', error)
            return error.response;
        }
    },

    createUser: async(reqBody)=>{
        try {
            const response = await API.post(`${BASE_URL}/auth/register`,reqBody);
            return response;
        } catch (error) {
            console.log('err', error)
            return error.response;
        }
    },

    deleteUserById: async(reqBody)=>{
        try {
            const response = await API.post(`${BASE_URL}/webapi/deleteuserbyid`,reqBody);
            return response;
        } catch (error) {
            return error.response
        }
    },

    updateUserById: async(id,reqBody)=>{
        try {
            const response = await API.post(`${BASE_URL}/webapi/updatuserbyid/${id}`,reqBody);
            return response;
        } catch (error) {
            console.log("error", error)
            return error.response
        }
    }
}