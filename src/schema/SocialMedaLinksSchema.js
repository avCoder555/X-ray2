import { required, yup } from "./CommonValidation";
import * as Yup from 'yup';
export const SocialMediaLinksSchema = (type) => { 
    if (type === 'add') {
        return yup({
            socialMediaTitle: required("Please enter social media  title"),
            url: required("Please enter social media link url").url()
        });
    } 
};