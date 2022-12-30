import React, { useEffect, useState } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { Col, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import TextError from "../../helpers/FormikHelper/TextError";
import { toast } from 'react-toastify';
import { GallerySchema } from "../../schema/GallerySchema";
import galleryServices from "../../services/gallery.services";
const initialValues = {
    title: '',
    file: '',
    videoUrl: ''
}

const GalleryForm = ({ toggle, isAddMode, getData, selectedRow }) => {
    const [file, setFile] = useState(selectedRow?.imgUrl);
    function handleChange(e) {
        if(e.target.files.length>0){
        setFile(URL.createObjectURL(e.target.files[0]));
    }else{
        setFile('')
    }
    }
    const savedValues = {
        title: selectedRow?.title,
        file: '',
        videoUrl: selectedRow?.videoUrl
    }
    const onSubmit = async (values) => {
        if (isAddMode === 'Add') {
            const result = await galleryServices.creatApi(values);
            if (result.data.status === true) {
                // actions.resetForm();
                getData()
                toggle()
                setFile('')
                toast.success('Record added successfully', { toastId: 'registration_success', autoClose: 3000 });
            } else {
                toast.error(result.data.message, { toastId: 'registration_fail', autoClose: 3000 });
            }
        } else {
            const result = await galleryServices.updateApi(selectedRow?._id, values)
            if (result.data.status === true) {
                // actions.resetForm();
                getData()
                toggle()
                setFile('')
                toast.success('Record updated successfully', { toastId: 'update_success', autoClose: 3000 });
            } else {
                toast.error(result.data.message, { toastId: 'update_fail', autoClose: 3000 });
            }
        }
    }
    
    useEffect(()=>{
        if(isAddMode==='Add'){
            setFile('')
        }
    },[isAddMode])
    return (
        <React.Fragment>
            <Formik
                initialValues={isAddMode === 'Add' ? initialValues : savedValues}
                validationSchema={GallerySchema('add')}
                onSubmit={onSubmit}
                enableReinitialize
            >
                {({ setFieldValue, values }) => (<Form encType="multipart/form-data">
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
                                    <label htmlFor="title" className="form-label">
                                        Title
                                    </label>
                                    <Field type="text" className="form-control" id="title" name='title'
                                    />
                                    <ErrorMessage name='title' component={TextError} />
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="videoUrl" className="form-label">
                                        Video Url
                                    </label>
                                    <Field type="url" className="form-control" id="videoUrl" name='videoUrl' placeholder="https://example.com/users/" />
                                    <ErrorMessage name='videoUrl' component={TextError} />
                                </div>
                                <div className="col-md-12">
                                    <label htmlFor="file" className="form-label">
                                        Upload Image 
                                    </label>

                                    <input id="file" name="file" type="file" onChange={(event) => {
                                        setFieldValue("file", event.currentTarget.files[0]);
                                        handleChange(event)
                                    }} className="form-control" />
                           
                                       {file===undefined || file ===''?'': <img src={file}
                                              alt={selectedRow?.imgUrl}
                                            className="img-thumbnail mt-2"
                                            height={150}
                                            width={150} />}
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
                            {isAddMode === "Add" ? "Save" : "Update"}
                        </button>
                    </ModalFooter>
                </Form>
                )}
            </Formik>
        </React.Fragment>
    );
}

export default GalleryForm;