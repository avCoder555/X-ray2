import { required, yup } from "./CommonValidation";
import * as Yup from 'yup';
export const XraySchema = (type) => { 
    if (type === 'xray') {
        return yup({
            name: required("Please enter x-ray type name"),
          
        });
    } else if(type==='ADD_XRYMACHINE'){
        return yup({
            name: required("Please enter x-ray machine name"),
        });
    } 
};