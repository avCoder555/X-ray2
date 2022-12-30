import React, { useEffect, useState } from "react";
import { Modal, } from "reactstrap";
import { toast } from 'react-toastify';
import userServices from "../../services/user.services";
import stateServices from "../../services/state.services";
import cityServices from "../../services/city.services";
import DoctorForm from "../../components/Doctor/DoctorForm";
import DoctorList from "../../components/Doctor/DoctorList";
const Index = () => {
    const [modal, setModal] = React.useState(false);
    const toggle = () => setModal(!modal);
    const [doctors, setDoctors] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedRow, setSelectedRow] = useState();
    const [isAddMode, setIsAddMode]=useState('Add');

    const getAllDoctors = () => {
        const result = userServices.getAllUsers()
            .then((res) => {
                if (res.data.status === true) {
                  const rs=  res.data.users.filter((item)=>{
                        return item.user_type_id ===4;
                    })
                    setDoctors(rs)
                }
            }).catch((error) => {
                console.log('error', error)
            })
    }

    const deleteDoctorById = async (id) => {
        const result = await userServices.deleteUserById({ id: id });
        if (result.data.status === true) {
            toast.success('Record deleted successfully', { toastId: 'userDelete_success', autoClose: 3000 });
            getAllDoctors();
        } else {
            toast.error(result.data.message, { toastId: 'userDelete_faild', autoClose: 3000 });
        }
    }
    const handleChangeStatus = async (id, status) => {
        const result = await userServices.updateUserById(id, { status: status })
        if (result.data.status === true) {
            getAllDoctors()
            toast.success('Status updated successfully', { toastId: 'update_success', autoClose: 3000 });
        } else {
            toast.error(result.data.message, { toastId: 'update_fail', autoClose: 3000 });
        }
    }
    useEffect(() => {
        getAllDoctors();
        const getAllStates = stateServices.getAllStates().then((res) => {
            if (res.data.status === true) {
                setStates(res.data.states)
            }
        });
        const getAllCity = cityServices.getAllCity().then((res) => {
            if (res.data.status === true) {
                setCities(res.data.cities)
            }
        });
    }, [])
    const filterCenter = doctors.map((center)=>{
        states.map((state)=>{
            if(center.state===state.unique_id){
                center.state_name = state.name
            }
        })
        return center
    })
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
                                <div className="breadcrumb-title pe-3">Doctor</div>
                                <div className="ps-3">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb mb-0 p-0">
                                            <li className="breadcrumb-item">
                                                <a href="#">
                                                    <i className="bx bx-home-alt" />
                                                </a>
                                            </li>
                                            <li className="breadcrumb-item active" aria-current="page">
                                            Doctor
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
                                            <DoctorForm toggle={toggle} isAddMode={isAddMode} cities={cities} states={states} getAllDoctors={getAllDoctors} selectedRow={selectedRow} />
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
                                    <DoctorList doctors={filterCenter} setIsAddMode={setIsAddMode} setSelectedRow={setSelectedRow} setModal={setModal} deleteDoctorById={deleteDoctorById} getAllDoctors={getAllDoctors} handleChangeStatus={handleChangeStatus}/>
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