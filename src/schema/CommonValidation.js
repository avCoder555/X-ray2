import * as Yup from 'yup';
export const yup = (data) => {
    return (
        Yup.object().shape(data)
    );
};
export const required = (msg) => {
    return (
        Yup.string().required(msg)
    );
};
export const firstName = required('Please enter first name.').max(10, 'Max length must be 10');
export const lastName = required('Please enter last name.').max(10, 'Max length must be 10');