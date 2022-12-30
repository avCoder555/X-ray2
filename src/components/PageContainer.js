import React from "react";

const PageContainer = (props) => {
    return (
        <React.Fragment>
            {/*page-wrapper*/}
            <div className="page-wrapper">
                {/*page-content-wrapper*/}
                <div className="page-content-wrapper">
                    <div className="page-content">
                        {/*breadcrumb*/}
                        <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
                            <div className="breadcrumb-title pe-3">{props.title}</div>
                            <div className="ps-3">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb mb-0 p-0">
                                        <li className="breadcrumb-item">
                                            <a href="#">
                                                <i className="bx bx-home-alt" />
                                            </a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">
                                            {props.subtitle}
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                            {props.isButton ? <div className="ms-auto">
                                <div className="btn-group">
                                    <button className="btn btn-primary"
                                        onClick={() => {
                                            props.toggle();
                                            props.setIsAddMode('Add')
                                        }}><i className="bx bx plus" />{props.buttonText}</button>
                                </div>
                            </div>
                                : ''}
                        </div>
                        {props.children}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default PageContainer;