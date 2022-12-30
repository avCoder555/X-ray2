import { required, yup } from "./CommonValidation";
import * as Yup from 'yup';
export const ManagePageSchema = (type) => { 
    if (type === 'add') {
        return yup({
            pageTitle: required("Please enter page title"),
            pageDescription: required("Please enter page discription")
        });
    } 
};