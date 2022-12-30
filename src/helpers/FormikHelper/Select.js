import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
const Select = (props) =>{
    const { label, name, optons, ...rest} = props;
    return(
        <div>
            <label htmlFor={name} className="form-label">{label}</label>
            <Field as='select' className='form-select' id={name} name={name} {...rest}>
                
                    <option disabled value="">Select State</option>
                    {
                        optons.map((e, key) => {
                            return <option key={key} value={e.value}>{e.name}</option>;
                        })
                    }
            
            </Field>
            <ErrorMessage name={name} component={TextError} />
        </div>
    )
}

export default Select;