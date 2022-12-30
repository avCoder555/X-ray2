import React, { useEffect, useState } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { Col, ModalBody, ModalHeader, ModalFooter } from "reactstrap";
import TextError from "../../helpers/FormikHelper/TextError";
import { toast } from 'react-toastify';
import sliderServices from "../../services/slider.services";
import { ManagePageSchema } from "../../schema/ManagePagesSchema";
import App from './Img'
import { SliderSchema } from "../../schema/SliderSchema";
const initialValues = {
    sliderTitle: '',
    sliderDescription: '',
    file: ''
}

// class Thumb extends React.Component {
//     state = {
//         loading: false,
//         thumb: undefined,
//     };

//     componentWillReceiveProps(nextProps) {
//         if (!nextProps.file) { return; }

//         this.setState({ loading: true }, () => {
//             let reader = new FileReader();

//             reader.onloadend = () => {
//                 this.setState({ loading: false, thumb: reader.result });
//             };

//             reader.readAsDataURL(nextProps.file);
//         });
//     }

//     render() {
//         const { file } = this.props;
//         const { loading, thumb } = this.state;

//         if (!file) { return null; }

//         if (loading) { return <p>loading...</p>; }

//         return (<img src={thumb}
//             // alt={file.name}
//             className="img-thumbnail mt-2"
//             height={200}
//             width={200} />);
//     }
// }
const SliderForm = ({ toggle, isAddMode, getData, selectedRow }) => {
    const [file, setFile] = useState(selectedRow?.imgUrl);
    function handleChange(e) {
        if(e.target.files.length>0){
        setFile(URL.createObjectURL(e.target.files[0]));
    }else{
        setFile('')
    }
    }
    const savedValues = {
        sliderTitle: selectedRow?.sliderTitle,
        sliderDescription: selectedRow?.sliderDescription,
        file: ''
    }
    const onSubmit = async (values) => {
        if (isAddMode === 'Add') {
            const result = await sliderServices.creatApi(values);
            if (result.data.status === true) {
                // actions.resetForm();
                getData()
                toggle()
                toast.success('Record added successfully', { toastId: 'registration_success', autoClose: 3000 });
            } else {
                toast.error(result.data.message, { toastId: 'registration_fail', autoClose: 3000 });
            }
        } else {
            const result = await sliderServices.updateApi(selectedRow?._id, values)
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
    useEffect(()=>{
        if(isAddMode==='Add'){
            setFile('')
        }
    },[isAddMode])
    return (
        <React.Fragment>
            <Formik
                initialValues={isAddMode === 'Add' ? initialValues : savedValues}
                validationSchema={SliderSchema('add')}
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
                                <div className="col-md-6">
                                    <label htmlFor="sliderTitle" className="form-label">
                                        Slider Title
                                    </label>
                                    <Field type="text" className="form-control" id="sliderTitle" name='sliderTitle'
                                    />
                                    <ErrorMessage name='sliderTitle' component={TextError} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="sliderDescription" className="form-label">
                                        Slider Description
                                    </label>
                                    <Field type="text" className="form-control" id="sliderDescription" name='sliderDescription'
                                    />
                                    <ErrorMessage name='sliderDescription' component={TextError} />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="file" className="form-label">
                                        Slider Image
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
                                    {/* <ErrorMessage name='file' component={TextError} /> */}

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

export default SliderForm;