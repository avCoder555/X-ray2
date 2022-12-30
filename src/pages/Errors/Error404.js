import React from 'react';
import { Link } from 'react-router-dom';
import errorImg from '../../assets/images/errors-images/404-error.png';
const Error404 = () => {
    return (
        <React.Fragment>
            <div className="error-404 d-flex align-items-center justify-content-center">
                <div className="container">
                    <div className="card radius-15 shadow-none">
                        <div className="row g-0">
                            <div className="col-lg-6">
                                <div className="card-body p-5">
                                    <h1 className="display-1">
                                        <span className="text-primary">4</span>
                                        <span className="text-danger">0</span>
                                        <span className="text-success">4</span>
                                    </h1>
                                    <h2 className="font-weight-bold display-4">Lost in Space</h2>
                                    <p>
                                        You have reached the edge of the universe.
                                        <br />
                                        The page you requested could not be found.
                                        <br />
                                        Dont'worry and return to the previous page.
                                    </p>
                                    <div className="mt-5">
                                        <a
                                            href="#"
                                            className="btn btn-lg btn-primary px-md-5 radius-30"
                                        >
                                            Go Home
                                        </a>
                                        {/* <a
                                            href="#"
                                            className="btn btn-lg btn-outline-dark ms-3 px-md-5 radius-30"
                                        >
                                            Back
                                        </a> */}
                                        <Link to="login" className="btn btn-lg btn-outline-dark ms-3 px-md-5 radius-30">
                                            Back
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <img
                                    src={errorImg}
                                    className="card-img"
                                    alt=""
                                />
                            </div>
                        </div>
                        {/*end row*/}
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}
export default Error404;