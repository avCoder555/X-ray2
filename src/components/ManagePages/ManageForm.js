import React from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { Col, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import TextError from "../../helpers/FormikHelper/TextError";
import { toast } from 'react-toastify';
import managePagesServices from "../../services/managePages.services";
import { ManagePageSchema } from "../../schema/ManagePagesSchema";

const initialValues = {
    pageTitle: '',
    pageDescription:''
}

const ManageForm = ({ toggle, isAddMode, getData, selectedRow }) => {  
     const savedValues = {
        pageTitle: selectedRow?.pageTitle,
        pageDescription:selectedRow?.pageDescription
    }
    const onSubmit = async (values) => {
       if(isAddMode==='Add'){
        const result = await managePagesServices.creatApi(values);
        if (result.data.status === true) {
            // actions.resetForm();
            getData()
            toggle()
            toast.success('Record added successfully', { toastId: 'registration_success', autoClose: 3000 });
        } else {
            toast.error(result.data.message, { toastId: 'registration_fail', autoClose: 3000 });
        }
    }else{
        const result = await managePagesServices.updateApi(selectedRow?._id,values)
        if (result.data.status === true) {
            // actions.resetForm();
            getData()
            toggle()
            toast.success('Record updated successfully', { toastId: 'update_success', autoClose: 3000 });
        } else {
            toast.error(result.data.message, { toastId: 'update_fail', autoClose: 3000 });
        }
    }
    }
    return (
        <React.Fragment>
            <Formik
                initialValues={isAddMode==='Add'?initialValues:savedValues}
                validationSchema={ManagePageSchema('add')}
                onSubmit={onSubmit}
                enableReinitialize
            >
                <Form>
                    <ModalHeader toggle={toggle}>
                        <div className="card-title d-flex align-items-center">
                            <div>
                                <i className="bx bxs-user me-1 font-22 text-primary" />
                            </div>
                            <h5 className="mb-0 text-primary">{isAddMode === 'Add' ? 'Add Record' : 'Update Record'}</h5>
                        </div>
                    </ModalHeader>
                    <ModalBody className="">
                        <Col md={12}>
                            <div className="row g-3" >
                                <div className="col-md-12">
                                    <label htmlFor="pageTitle" className="form-label">
                                        Page Title
                                    </label>
                                    <Field type="text" className="form-control" id="pageTitle" name='pageTitle'
                                    />
                                    <ErrorMessage name='pageTitle' component={TextError} />
                                </div>
                               
                                <div className="col-md-12">
                                    <label htmlFor="pageDescription" className="form-label">
                                        Page Description
                                    </label>
                                    <Field type="text" className="form-control" id="pageDescription" name='pageDescription'
                                    />
                                    <ErrorMessage name='pageDescription' component={TextError} />
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
                            {isAddMode==="Add"? "Save":"Update"}
                        </button>
                    </ModalFooter>
                </Form>

            </Formik>
        </React.Fragment>
    );
}

export default ManageForm;