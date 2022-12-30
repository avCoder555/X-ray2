import React, { useEffect, useState } from "react";
import { Modal, } from "reactstrap";
import { toast } from 'react-toastify';
import xrayServices from "../../services/xray.services";
import managePagesServices from "../../services/managePages.services";
import ManageForm from "../../components/ManagePages/ManageForm";
import ManagePageList from "../../components/ManagePages/ManagePageList";
const ManagePages = () => {
    const [modal, setModal] = React.useState(false);
    const toggle = () => setModal(!modal);
    const [managePages, setManagePages] = useState([]);
    const [selectedRow, setSelectedRow] = useState();
    const [isAddMode, setIsAddMode]=useState('Add');

    const getData = () => {
        const result = managePagesServices.listApi()
            .then((res) => {
                if (res.data.status === true) {
                    setManagePages(res.data.managePages)
                }
            }).catch((error) => {
                console.log('error', error)
            })
    }

    const deleteById = async (id) => {
        const result = await managePagesServices.deleteApi({ id: id });
        if (result.data.status === true) {
            toast.success('Record deleted successfully', { toastId: 'userDelete_success', autoClose: 3000 });
            getData();
        } else {
            toast.error(result.data.message, { toastId: 'userDelete_faild', autoClose: 3000 });
        }
    }

    const handleChangeStatus =async(id,status) =>{
        const result = await managePagesServices.updateApi(id,{status:status})
        if (result.data.status === true) {
            getData()
            toast.success('Status updated successfully', { toastId: 'update_success', autoClose: 3000 });
        } else {
            toast.error(result.data.message, { toastId: 'update_fail', autoClose: 3000 });
        }
    }
    useEffect(() => {
        getData();
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
                                <div className="breadcrumb-title pe-3">Manage Pages</div>
                                <div className="ps-3">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb mb-0 p-0">
                                            <li className="breadcrumb-item">
                                                <a href="#">
                                                    <i className="bx bx-home-alt" />
                                                </a>
                                            </li>
                                            <li className="breadcrumb-item active" aria-current="page">
                                            Manage Pages
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
                                        <Modal isOpen={modal} toggle={toggle} size="lg">
                                            <ManageForm toggle={toggle} isAddMode={isAddMode} getData={getData} selectedRow={selectedRow} />
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
                                    <ManagePageList 
                                        tblData={managePages} 
                                        setIsAddMode={setIsAddMode} 
                                        setSelectedRow={setSelectedRow} 
                                        setModal={setModal} 
                                        deleteById={deleteById} 
                                        getData={getData}
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

export default ManagePages;