import { required, yup } from "./CommonValidation";
import * as Yup from 'yup';
export const SliderSchema = (type) => { 
    if (type === 'add') {
        return yup({
            sliderTitle: required("Please enter slider title"),
            sliderDescription: required("Please enter slider discription")
        });
    } 
};