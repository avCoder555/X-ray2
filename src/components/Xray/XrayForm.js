import React from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { Col, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import TextError from "../../helpers/FormikHelper/TextError";
import { toast } from 'react-toastify';
import { XraySchema } from "../../schema/XraySchema";
import xrayServices from "../../services/xray.services";

const initialValues = {
    name: '',
}

const XrayForm = ({ toggle, isAddMode, getAllXrayTypes, selectedRow }) => {  
     const savedValues = {
        name: selectedRow?.name,
    }
    const onSubmit = async (values) => {
        const reqBody = {
            name: values.name,
        }
       if(isAddMode==='Add'){
        const result = await xrayServices.createXrayType(reqBody);
        if (result.data.status === true) {
            // actions.resetForm();
            getAllXrayTypes()
            toggle()
            toast.success('Record added successfully', { toastId: 'registration_success', autoClose: 3000 });
        } else {
            toast.error(result.data.message, { toastId: 'registration_fail', autoClose: 3000 });
        }
    }else{
        const reqBody = {
            name: values.name,
         
        }
        const result = await xrayServices.updateXrayTypeById(selectedRow?._id,reqBody)
        if (result.data.status === true) {
            // actions.resetForm();
            getAllXrayTypes()
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
                validationSchema={XraySchema('xray')}
                onSubmit={onSubmit}
                enableReinitialize
            >
                <Form>
                    <ModalHeader toggle={toggle}>
                        <div className="card-title d-flex align-items-center">
                            <div>
                                <i className="bx bxs-user me-1 font-22 text-primary" />
                            </div>
                            <h5 className="mb-0 text-primary">{isAddMode === 'Add' ? 'Add X-ray Type' : 'Update X-ray Type'}</h5>
                        </div>
                    </ModalHeader>
                    <ModalBody className="">
                        <Col md={12}>
                            <div className="row g-3" >
                                <div className="col-md-12">
                                    <label htmlFor="name" className="form-label">
                                        X-ray Type Name
                                    </label>
                                    <Field type="text" className="form-control" id="name" name='name'
                                    />
                                    <ErrorMessage name='name' component={TextError} />
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

export default XrayForm;