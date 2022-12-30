import React, { useEffect, useState } from "react";
import { Row, Col, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Modal } from "reactstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone, SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import userServices from "../services/user.services";
import { useFormik } from "formik";
import { UserSchema } from "../schema/UserSchema";
import { toast } from 'react-toastify';
import stateServices from "../services/state.services";
import cityServices from "../services/city.services";
import UserForm from "./User/UserForm";
import BootstrapSwitchButton from "bootstrap-switch-button-react";
const UserList = () => {
    const [modal, setModal] = React.useState(false);
    const toggle = () => setModal(!modal);
    const [users, setUsers] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedRow, setSelectedRow] = useState();
    const [isAddMode, setIsAddMode] = useState('Add');
    const getAllUsers = () => {
        const result = userServices.getAllUsers()
            .then((res) => {
                if (res.data.status === true) {
                    const rs = res.data.users.filter((item) => {
                        return item.user_type_id === 1;
                    })

                    
                    setUsers(rs)
                }

            }).catch((error) => {
                console.log('error', error)
            })
    }
    const filterUser = users.map((center)=>{
        states.map((state)=>{
            if(center.state===state.unique_id){
                center.state_name = state.name
            }
        })
        return center
    })
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            fullName: '',
            mobile: '',
            location: '',
            city: '',
            state: '',
        },
        validationSchema: UserSchema('user'),
        onSubmit: async (values, actions) => {
            const reqBody = {
                name: values.fullName,
                gender: "male",
                mobile: values.mobile,
                email: values.email,
                user_type_id: 1,
                password: values.password,
                location: values.location,
                state: values.state,
                city: values.city,
                latitude: "45.1254",
                longitude: "46.2548"
            }

            const result = await userServices.createUser(reqBody);
            if (result.data.status === true) {
                actions.resetForm();
                getAllUsers()
                toggle()
                toast.success('User registration successfully', { toastId: 'registration_success', autoClose: 3000 });
            } else {
                toast.error(result.data.message, { toastId: 'registration_fail', autoClose: 3000 });
            }
        },
        enableReinitialze: true,
    });

    const tblColumn = [{
        dataField: 'name',
        text: 'Name',
        sort: true
    }, {
        dataField: 'email',
        text: 'Email',
        sort: false
    }, {
        dataField: 'mobile',
        text: 'Mobile',
        sort: false
    }, {
        dataField: 'gender',
        text: 'Gender',
        sort: true
    }, {
        dataField: 'location',
        text: 'Location',
        sort: true
    }, {
        dataField: 'city',
        text: 'City',
        sort: true
    }, {
        dataField: 'state_name',
        text: 'State',
        sort: true
    }, {
        dataField: 'status',
        text: 'Status',
        formatter: (value, row) => {
            return (
                <BootstrapSwitchButton
                    checked={row.status === 1 ? true : false}
                    onChange={(checked) => {
                        console.log('Checked ', checked)
                        handleChangeStatus(row._id, checked)
                    }}
                    offstyle="secondary"
                />
            )
        }
    }, {
        dataField: '',
        text: 'action',
        formatter: (value, row) => {
            return (
                <UncontrolledDropdown>
                    <DropdownToggle className="card-drop" tag="a">
                        <i className="lni lni-more-alt font-size-16" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-end action_drop_down">
                        <DropdownItem onClick={() => {
                            setSelectedRow(row);
                            setIsAddMode('Edit');
                            setModal(true)
                        }}>
                            <i className="lni lni-pencil font-size-16 text-success me-1" />{" "}
                            Edit
                        </DropdownItem>
                        {/* <DropdownItem onClick={() => localStorage.setItem("isCustomerEdit", 1)}>
                            <i className="lni lni-eye font-size-16 text-primary me-1" />{" "}
                            View
                        </DropdownItem>
                        <DropdownItem onClick={() => localStorage.setItem("isCustomerEdit", 1)}>
                            <i className="bx bx-copy font-size-16 text-default me-1" />{" "}
                            Copy
                        </DropdownItem> */}
                        <DropdownItem onClick={() => {
                            localStorage.setItem("isCustomerEdit", value);
                            deleteUserById(row._id)
                        }}>
                            <i className="lni lni-trash font-size-16 text-danger me-1" />{" "}
                            Delete
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            );
        }
    }];


    const defaultSorted = [{
        dataField: '_id',
        order: 'asc'
    }];
    const pzipcodeOptions = {
        sizePerPzipcode: 10,
        totalSize: filterUser.length, // replace later with size(customers),
        custom: true
    };

    const deleteUserById = async (id) => {
        const result = await userServices.deleteUserById({ id: id });
        if (result.data.status === true) {
            toast.success(result.data.message, { toastId: 'userDelete_success', autoClose: 3000 });
            getAllUsers();
        } else {
            toast.error(result.data.message, { toastId: 'userDelete_faild', autoClose: 3000 });
        }
    }

    const handleChangeStatus = async (id, status) => {
        console.log('status', status);
        const result = await userServices.updateUserById(id, { status: status })
        if (result.data.status === true) {
            getAllUsers()
            toast.success('Status updated successfully', { toastId: 'update_success', autoClose: 3000 });
        } else {
            toast.error(result.data.message, { toastId: 'update_fail', autoClose: 3000 });
        }
    }

    
    useEffect(() => {
        getAllUsers();
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
                                <div className="breadcrumb-title pe-3">Users</div>
                                <div className="ps-3">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb mb-0 p-0">
                                            <li className="breadcrumb-item">
                                                <a href="#">
                                                    <i className="bx bx-home-alt" />
                                                </a>
                                            </li>
                                            <li className="breadcrumb-item active" aria-current="page">
                                                user
                                            </li>
                                        </ol>
                                    </nav>
                                </div>
                                <div className="ms-auto">
                                    <div className="btn-group">
                                        <button className="btn btn-primary"
                                            onClick={() => {
                                                toggle();
                                                setIsAddMode('Add')
                                            }}><i className="bx bx plus" />&nbsp;Add</button>
                                        <Modal isOpen={modal} toggle={toggle} size="lg">
                                            {/* <form onSubmit={formik.handleSubmit}>
                                                <ModalHeader toggle={toggle}>
                                                    <div className="card-title d-flex align-items-center">
                                                        <div>
                                                            <i className="bx bxs-user me-1 font-22 text-primary" />
                                                        </div>
                                                        <h5 className="mb-0 text-primary">{isAddMode==='Add'?'Add User':'Update User'}</h5>
                                                    </div>
                                                </ModalHeader>
                                                <ModalBody className="">
                                                    <Col md={12}>
                                                        <div className="row g-3" >
                                                            <div className="col-md-6">
                                                                <label htmlFor="fullName" className="form-label">
                                                                    Full Name
                                                                </label>
                                                                <input type="text" className="form-control" id="fullName"
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    value={formik.values.fullName}
                                                                   />
                                                                {formik.touched.fullName && formik.errors.fullName ? (
                                                                    <small className="text-danger">{formik.errors.fullName}</small>
                                                                ) : null}
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label htmlFor="mobile" className="form-label">
                                                                    Mobile No
                                                                </label>
                                                                <input type="text" className="form-control" id="mobile"
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    value={formik.values.mobile}
                                                                />
                                                                {formik.touched.mobile && formik.errors.mobile ? (
                                                                    <small className="text-danger">{formik.errors.mobile}</small>
                                                                ) : null}
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label htmlFor="email" className="form-label">
                                                                    Email
                                                                </label>
                                                                <input type="email" className="form-control" id="email"
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    value={formik.values.email}
                                                                   
                                                                />
                                                                {formik.touched.email && formik.errors.email ? (
                                                                    <small className="text-danger">{formik.errors.email}</small>
                                                                ) : null}
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label htmlFor="password" className="form-label">
                                                                    Password
                                                                </label>
                                                                <input type="password" className="form-control" id="password"
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    value={formik.values.password}
                                                                />
                                                                {formik.touched.password && formik.errors.password ? (
                                                                    <small className="text-danger">{formik.errors.password}</small>
                                                                ) : null}
                                                            </div>
                                                            <div className="col-12">
                                                                <label htmlFor="location" className="form-label">
                                                                    Location
                                                                </label>
                                                                <textarea
                                                                    className="form-control"
                                                                    id="location"
                                                                    placeholder="Address..."
                                                                    rows={3}
                                                                    defaultValue={""}
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    value={formik.values.location}
                                                                />
                                                                {formik.touched.location && formik.errors.location ? (
                                                                    <small className="text-danger">{formik.errors.location}</small>
                                                                ) : null}
                                                            </div>
                                                            <div className="col-md-6">
                                                                <label htmlFor="city" className="form-label">
                                                                    City
                                                                </label>
                                                                <select id="city" className="form-select"
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    value={formik.values.city}
                                                                >
                                                                    <option selected="">Select city</option>
                                                                    {cities.map((e, key) => {
                                                                        return <option key={key} value={e.value}>{e.city}</option>;
                                                                    })}
                                                                </select>
                                                                {formik.touched.city && formik.errors.city ? (
                                                                    <small className="text-danger">{formik.errors.city}</small>
                                                                ) : null}
                                                            </div>

                                                            <div className="col-md-6">
                                                                <label htmlFor="state" className="form-label">
                                                                    State
                                                                </label>
                                                                <select id="state" className="form-select"
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    value={formik.values.state}
                                                                >
                                                                    <option selected="">Select State</option>
                                                                    {states.map((e, key) => {
                                                                        return <option key={key} value={e.value}>{e.name}</option>;
                                                                    })}
                                                                </select>
                                                                {formik.touched.state && formik.errors.state ? (
                                                                    <small className="text-danger">{formik.errors.state}</small>
                                                                ) : null}
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
                                            </form> */}
                                            <UserForm toggle={toggle} isAddMode={isAddMode} cities={cities} states={states} getAllUsers={getAllUsers} selectedRow={selectedRow} />
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

                                    <React.Fragment>
                                        <PaginationProvider
                                            pagination={paginationFactory(pzipcodeOptions)}
                                            keyField='id'
                                            columns={tblColumn}
                                            data={filterUser}
                                        >
                                            {({ paginationProps, paginationTableProps }) => (
                                                <ToolkitProvider
                                                    keyField='_id'
                                                    columns={tblColumn}
                                                    data={filterUser}
                                                >
                                                    {toolkitProps => (
                                                        <React.Fragment>
                                                            <Row className="mb-2" style={{ display: 'none' }}>
                                                                <Col md="4">
                                                                    <div className="search-box me-2 mb-2 d-inline-block">
                                                                        <div className="status-relative">
                                                                        </div>
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col xl="12">
                                                                    <div className="table-responsive">
                                                                        <BootstrapTable
                                                                            noDataIndication={<h6 className='d-flex justify-content-center'>No record found</h6>}
                                                                            keyField={"id"}
                                                                            responsive
                                                                            bordered={false}
                                                                            striped={false}
                                                                            defaultSorted={defaultSorted}
                                                                            classes={
                                                                                "table table-striped align-middle table-nowrap"
                                                                            }
                                                                            headerWrapperClasses={"thead-light"}
                                                                            {...toolkitProps.baseProps}
                                                                            {...paginationTableProps}
                                                                        />
                                                                    </div>
                                                                </Col>
                                                            </Row>
                                                            {filterUser.length > 0 &&
                                                                <Row className="align-items-md-center mt-30">
                                                                    <Col className="inner-custom-pagination mt-2 d-flex">
                                                                        <div className="d-inline">
                                                                            <SizePerPageDropdownStandalone
                                                                                {...paginationProps}
                                                                            />
                                                                        </div>
                                                                        <div className="text-md-right ms-auto">
                                                                            <PaginationListStandalone
                                                                                {...paginationProps}
                                                                            />
                                                                        </div>
                                                                    </Col>
                                                                </Row>
                                                            }
                                                        </React.Fragment>
                                                    )
                                                    }
                                                </ToolkitProvider>
                                            )
                                            }</PaginationProvider>
                                    </React.Fragment>
                                </div>
                            </div>

                        </>

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default UserList;