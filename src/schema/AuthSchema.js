import { required, yup } from "./CommonValidation";
import * as Yup from 'yup';
export const AuthSchema = (type) => { 
    if (type === 'login') {
        return yup({
            email: Yup.string().required("Please enter email").email('Please enter a valid email address.'),
            password: required("Please enter password"),
        });
    }
};