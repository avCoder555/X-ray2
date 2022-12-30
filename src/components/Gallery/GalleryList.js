import React, { useState } from "react";
import { Row, Col, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone, SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import ModalImage from "react-modal-image";

const GalleryList = ({ tblData, setSelectedRow, setModal, setIsAddMode, deleteById, getData, handleChangeStatus }) => {
    const [isOpen, setIsOpen] =useState(false)
    const imageOpen= () =>  setIsOpen(!isOpen);
    const tblColumn = [{
        dataField: 'title',
        text: 'Title',
        sort: true
    }, {
        dataField: 'videoUrl',
        text: 'Video Url',
        sort: true,
        formatter: (value, row) => {
            return (
                <>
                    <a href={row.videoUrl} target="_blank" rel="noopener noreferrer">{row.videoUrl}</a>
                </>
            )
        }
    },
    {
        dataField: 'imgUrl',
        text: 'Image',
        sort: true,
        formatter: (value, row) => {
            return (
                <>
                    <ModalImage className="modal_image"
                        medium={row.imgUrl}
                        large={row.imgUrl}
                        alt={row.title}
                        small={row.imgUrl}
                        onClose={imageOpen}
                    />
                </>
            )
        }
    },
    {
        dataField: 'status',
        text: 'Status',
        // sort: false
        formatter: (value, row) => {
            return (
                <BootstrapSwitchButton
                    checked={row.status === 1 ? true : false}
                    onChange={(checked) => {
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
                            // localStorage.setItem("isCustomerEdit", value);
                            deleteById(row._id);
                            getData();
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
        totalSize: tblData.length, // replace later with size(customers),
        custom: true
    };
    return (

        <React.Fragment>
            <PaginationProvider
                pagination={paginationFactory(pzipcodeOptions)}
                keyField='id'
                columns={tblColumn}
                data={tblData}
            >
                {({ paginationProps, paginationTableProps }) => (
                    <ToolkitProvider
                        keyField='_id'
                        columns={tblColumn}
                        data={tblData}
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
                                                noDataIndication={<h6 className='d-flex justify-content-center'>Record Not Found</h6>}
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
                                {tblData.length > 0 &&
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

    )
}

export default GalleryList;
