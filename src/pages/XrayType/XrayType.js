import React, { useEffect, useState } from "react";
import { Modal, } from "reactstrap";
import { toast } from 'react-toastify';
import XrayForm from "../../components/Xray/XrayForm";
import XrayList from "../../components/Xray/XrayList";
import xrayServices from "../../services/xray.services";
const Index = () => {
    const [modal, setModal] = React.useState(false);
    const toggle = () => setModal(!modal);
    const [xrayTypes, setXrayTypes] = useState([]);
    const [selectedRow, setSelectedRow] = useState();
    const [isAddMode, setIsAddMode]=useState('Add');

    const getAllXrayTypes = () => {
        const result = xrayServices.getAllXrayType()
            .then((res) => {
                if (res.data.status === true) {
                    setXrayTypes(res.data.xrays)
                }
            }).catch((error) => {
                console.log('error', error)
            })
    }

    const deleteXrayTypesById = async (id) => {
        const result = await xrayServices.deleteXrayTypeById({ id: id });
        if (result.data.status === true) {
            toast.success('Record deleted successfully', { toastId: 'userDelete_success', autoClose: 3000 });
            getAllXrayTypes();
        } else {
            toast.error(result.data.message, { toastId: 'userDelete_faild', autoClose: 3000 });
        }
    }

    const handleChangeStatus =async(id,status) =>{
        const result = await xrayServices.updateXrayTypeById(id,{status:status})
        if (result.data.status === true) {
            getAllXrayTypes()
            toast.success('Status updated successfully', { toastId: 'update_success', autoClose: 3000 });
        } else {
            toast.error(result.data.message, { toastId: 'update_fail', autoClose: 3000 });
        }
    }
    useEffect(() => {
        getAllXrayTypes();
    }, [])
    return (
        <React.Fragment>
            {/*page-wrapper*/}
            <div className="page-wrapper">
                {/*page-content-wrapper*/}
                <div className="page-content-wrapper">
                    <div className="page-content">
                        <>
                            {/*breadcrumb*/}
                            <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                                <div className="breadcrumb-title pe-3">X-ray Type</div>
                                <div className="ps-3">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb mb-0 p-0">
                                            <li className="breadcrumb-item">
                                                <a href="#">
                                                    <i className="bx bx-home-alt" />
                                                </a>
                                            </li>
                                            <li className="breadcrumb-item active" aria-current="page">
                                            X-ray Type
                                            </li>
                                        </ol>
                                    </nav>
                                </div>
                                <div className="ms-auto">
                                    <div className="btn-group">
                                        <button className="btn btn-primary"
                                            onClick={() =>{
                                                toggle();
                                                setIsAddMode('Add')
                                                }}><i className="bx bx plus" />Add</button>
                                        <Modal isOpen={modal} toggle={toggle} size="sm">
                                            <XrayForm toggle={toggle} isAddMode={isAddMode} getAllXrayTypes={getAllXrayTypes} selectedRow={selectedRow} />
                                        </Modal>
                                    </div>
                                </div>
                            </div>
                            {/*end breadcrumb*/}
                            <div className="card">
                                <div className="card-body">
                                    <div className="card-title">
                                        {/* <h4 className="mb-0">Users</h4> */}
                                    </div>
                                    <hr />
                                    <XrayList 
                                        xrayTypes={xrayTypes} 
                                        setIsAddMode={setIsAddMode} 
                                        setSelectedRow={setSelectedRow} 
                                        setModal={setModal} 
                                        deleteXrayTypesById={deleteXrayTypesById} 
                                        getAllXrayTypes={getAllXrayTypes}
                                        handleChangeStatus={handleChangeStatus}
                                        />
                                </div>
                            </div>

                        </>

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Index;