import React from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { UserSchema } from "../../schema/UserSchema";
import { Col, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import TextError from "../../helpers/FormikHelper/TextError";
import Select from "../../helpers/FormikHelper/Select";
import userServices from "../../services/user.services";
import { toast } from 'react-toastify';

const initialValues = {
    email: '',
    password: '',
    fullName: '',
    mobile: '',
    location: '',
    city: '',
    state: ''
}

const UserForm = ({ toggle, isAddMode, cities, states, getAllUsers, selectedRow }) => {  
     const savedValues = {
        email: selectedRow?.email,
        password: selectedRow?.password,
        fullName: selectedRow?.name,
        mobile: selectedRow?.mobile,
        location: selectedRow?.location,
        city: selectedRow?.city,
        state: selectedRow?.state
    }
    const onSubmit = async (values) => {
        const reqBody = {
            name: values.fullName,
            gender: "male",
            mobile: values.mobile,
            email: values.email,
            user_type_id: "1",
            password: values.password,
            location: values.location,
            state: values.state,
            city: values.city,
            latitude: "45.1254",
            longitude: "46.2548"
        }
       if(isAddMode==='Add'){
        const result = await userServices.createUser(reqBody);
        if (result.data.status === true) {
            // actions.resetForm();
            getAllUsers()
            toggle()
            toast.success('User registration successfully', { toastId: 'registration_success', autoClose: 3000 });
        } else {
            toast.error(result.data.message, { toastId: 'registration_fail', autoClose: 3000 });
        }
    }else{
        const reqBody = {
            name: values.fullName,
            gender: "male",
            mobile: values.mobile,
            email: values.email,
            location: values.location,
            state: values.state,
            city: values.city,
        }
        const result = await userServices.updateUserById(selectedRow?._id,reqBody)
        if (result.data.status === true) {
            // actions.resetForm();
            getAllUsers()
            toggle()
            toast.success(result.data.message, { toastId: 'update_success', autoClose: 3000 });
        } else {
            toast.error(result.data.message, { toastId: 'update_fail', autoClose: 3000 });
        }
    }
    }
    return (
        <React.Fragment>
            <Formik
                initialValues={isAddMode==='Add'?initialValues:savedValues}
                validationSchema={UserSchema('user')}
                onSubmit={onSubmit}
                enableReinitialize
            >
               {({  setFieldValue, values }) => (  <Form>
                    <ModalHeader toggle={toggle}>
                        <div className="card-title d-flex align-items-center">
                            <div>
                                <i className="bx bxs-user me-1 font-22 text-primary" />
                            </div>
                            <h5 className="mb-0 text-primary">{isAddMode === 'Add' ? 'Add User' : 'Update User'}</h5>
                        </div>
                    </ModalHeader>
                    <ModalBody className="">
                        <Col md={12}>
                            <div className="row g-3" >
                                <div className="col-md-6">
                                    <label htmlFor="fullName" className="form-label">
                                        Full Name
                                    </label>
                                    <Field type="text" className="form-control" id="fullName" name='fullName'
                                    />
                                    <ErrorMessage name='fullName' component={TextError} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="mobile" className="form-label">
                                        Mobile No
                                    </label>
                                    <Field type="text" className="form-control" id="mobile" name='mobile'
                                    />
                                    <ErrorMessage name='mobile' component={TextError} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="email" className="form-label">
                                        Email
                                    </label>
                                    <Field type="email" className="form-control" id="email" name='email'
                                    />
                                    <ErrorMessage name='email' component={TextError} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="password" className="form-label">
                                        Password
                                    </label>
                                    <Field type="password" className="form-control" id="password" name='password' disabled={isAddMode==='Add'?false:true}/>
                                    <ErrorMessage name='password' component={TextError} />
                                </div>
                                <div className="col-12">
                                    <label htmlFor="location" className="form-label">
                                        Location
                                    </label>
                                    <Field
                                        className="form-control"
                                        id="location"
                                        // placeholder="Address..."
                                        name='location'
                                        type='text'
                                    />
                                    <ErrorMessage name="location" component={TextError} />
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="state" className="form-label">
                                        State
                                    </label>
                                    <Field as='select' className='form-select' id="state" name="state" >
                                        <option disabled value="">Select State</option>
                                        {
                                            states.map((e, key) => {
                                                return <option key={key} value={e.unique_id}>{e.name}</option>;
                                            })
                                        }
                                    </Field>
                                    <ErrorMessage name="state" component={TextError} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="city" className="form-label"> City </label>
                                    <Field as='select' className='form-select' id="city" name="city">
                                        <option  disabled value="">Select city</option>
                                        {
                                            cities.map((e, key) => {
                                                if( e.state_id === values.state){
                                                return <option key={key} value={e.value}>{e.city}</option>;
                                            }
                                            })
                                        }
                                    </Field>
                                    <ErrorMessage name="city" component={TextError} />
                                </div>
                                
                            </div>
                        </Col>
                    </ModalBody>
                    <ModalFooter>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={toggle}
                        >
                            Close
                        </button>
                        <button type="submit" className="btn btn-primary px-5">
                            Register
                        </button>
                    </ModalFooter>
                </Form>
 )}
            </Formik>
        </React.Fragment>
    );
}

export default UserForm;