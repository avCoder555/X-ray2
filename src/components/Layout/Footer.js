import React from "react";
const Footer = () => {
    return (
        <React.Fragment>
            {/*start overlay*/}
            <div className="overlay toggle-btn-mobile" />
            {/*end overlay*/}
            {/*Start Back To Top Button*/}{" "}
            <a href="#" className="back-to-top">
                <i className="bx bxs-up-arrow-alt" />
            </a>
            {/*End Back To Top Button*/}
            {/*footer */}
            <div className="footer">
                <p className="mb-0">
                    {/* TestiGo @2022 | Developed By : <a href="#"></a> */}
                    TestiGo @2022
                </p>
            </div>
            {/* end footer */}
        </React.Fragment >
    )
}

export default Footer;