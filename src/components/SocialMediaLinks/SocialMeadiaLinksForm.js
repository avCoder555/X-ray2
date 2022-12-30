import React from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { Col, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import TextError from "../../helpers/FormikHelper/TextError";
import { toast } from 'react-toastify';
import { SocialMediaLinksSchema } from "../../schema/SocialMedaLinksSchema";
import socialMediaLinkServices from "../../services/socialMediaLink.services";

const initialValues = {
    socialMediaTitle: '',
    url:''
}

const SocialMediaLinksForm = ({ toggle, isAddMode, getData, selectedRow }) => {  
     const savedValues = {
        socialMediaTitle: selectedRow?.socialMediaTitle,
        url:selectedRow?.url
    }
    const onSubmit = async (values) => {
       if(isAddMode==='Add'){
        const result = await socialMediaLinkServices.creatApi(values);
        if (result.data.status === true) {
            // actions.resetForm();
            getData()
            toggle()
            toast.success('Record added successfully', { toastId: 'registration_success', autoClose: 3000 });
        } else {
            toast.error(result.data.message, { toastId: 'registration_fail', autoClose: 3000 });
        }
    }else{
        const result = await socialMediaLinkServices.updateApi(selectedRow?._id,values)
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
                validationSchema={SocialMediaLinksSchema('add')}
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
                                <div className="col-md-4">
                                    <label htmlFor="socialMediaTitle" className="form-label">
                                        Social Media Title
                                    </label>
                                    <Field type="text" className="form-control" id="socialMediaTitle" name='socialMediaTitle'
                                    />
                                    <ErrorMessage name='socialMediaTitle' component={TextError} />
                                </div>
                                <div className="col-md-8">
                                    <label htmlFor="url" className="form-label">
                                        Social Media Url
                                    </label>
                                    <Field type="url" className="form-control" id="url" name='url' placeholder="https://example.com/users/"
                                    />
                                    <ErrorMessage name='url' component={TextError} />
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

export default SocialMediaLinksForm;