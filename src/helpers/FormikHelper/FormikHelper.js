import { useFormik } from 'formik';
export const initFormik = (initialValues, validationSchema=null, callback=null, reinitialize=false) => {
    const formik = useFormik({
        initialValues,
        enableReinitialize:reinitialize,
        validationSchema,
        onSubmit: values => {
            callback(values);
        }
    });
    return formik;
};