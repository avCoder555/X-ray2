import React, { useEffect, useState } from "react";
import { Modal, } from "reactstrap";
import { toast } from 'react-toastify';
import userServices from "../../services/user.services";
import stateServices from "../../services/state.services";
import cityServices from "../../services/city.services";
import CenterForm from "../../components/Center/CenterForm";
import CenterList from "../../components/Center/CenterList";
const Index = () => {
    const [modal, setModal] = React.useState(false);
    const toggle = () => setModal(!modal);
    const [centers, setCenters] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedRow, setSelectedRow] = useState();
    const [isAddMode, setIsAddMode]=useState('Add');

    const getAllCenters = () => {
        const result = userServices.getAllUsers()
            .then((res) => {
                if (res.data.status === true) {
                    const rs=  res.data.users.filter((item)=>{
                        return item.user_type_id ===2;
                    })
                    
                    setCenters(rs)
                }
            }).catch((error) => {
                console.log('error', error)
            })
    }

    const deleteDoctorById = async (id) => {
        const result = await userServices.deleteUserById({ id: id });
        if (result.data.status === true) {
            toast.success('Record deleted successfully', { toastId: 'userDelete_success', autoClose: 3000 });
            getAllCenters();
        } else {
            toast.error(result.data.message, { toastId: 'userDelete_faild', autoClose: 3000 });
        }
    }
    const handleChangeStatus = async (id, status) => {
        const result = await userServices.updateUserById(id, { status: status })
        if (result.data.status === true) {
            getAllCenters()
            toast.success('Status updated successfully', { toastId: 'update_success', autoClose: 3000 });
        } else {
            toast.error(result.data.message, { toastId: 'update_fail', autoClose: 3000 });
        }
    }
    useEffect(() => {
        getAllCenters();
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
    const filterCenter = centers.map((center)=>{
        states.map((state)=>{
            if(center.state===state.unique_id){
                center.state_name = state.name
            }
        })
        return center
    })
//   const filterCenter =()=>{
//       const arr = []
//     for (let index = 0; index < centers.length; index++) {
//         const element = centers[index];
//         arr.push(element)
//         for (let index = 0; index < states.length; index++) {
//             if(element.state===states[index].unique_id){
//                 element.state_name = states[index].name
//            }
//         }
//         console.log('aarr', arr)
//     }
//   }
//   filterCenter()

//   const filterC = centers.map((center)=>{
//       states.map((state)=>{
//           if(center.state===state.unique_id){
//              center.state_name = state.name
//             }
//         })
//         return center
//   })
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
                                <div className="breadcrumb-title pe-3">Center</div>
                                <div className="ps-3">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb mb-0 p-0">
                                            <li className="breadcrumb-item">
                                                <a href="#">
                                                    <i className="bx bx-home-alt" />
                                                </a>
                                            </li>
                                            <li className="breadcrumb-item active" aria-current="page">
                                            Center
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
                                            <CenterForm toggle={toggle} isAddMode={isAddMode} cities={cities} states={states} getAllCenters={getAllCenters} selectedRow={selectedRow} />
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
                                    <CenterList centers={filterCenter} setIsAddMode={setIsAddMode} setSelectedRow={setSelectedRow} setModal={setModal} deleteDoctorById={deleteDoctorById} getAllCenters={getAllCenters} handleChangeStatus={handleChangeStatus} />
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