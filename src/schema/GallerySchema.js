import { required, yup } from "./CommonValidation";
import * as Yup from 'yup';
export const GallerySchema = (type) => { 
    if (type === 'add') {
        return yup({
            title: required("Please enter   title"),
            // url: required("Please enter social media link url").url()
        });
    } 
};