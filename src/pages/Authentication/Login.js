import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoIcon from '../../assets/images/TestigoLogo.png';
import searchSvg from '../../assets/images/icons/search.svg';
import loginFrentImg from '../../assets/images/login-images/login-frent-img.jpg'
import authServices from '../../services/auth.services';
import { useFormik, Field } from "formik";
import * as yup from "yup";
import { AuthSchema } from '../../schema/AuthSchema';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loginFrentImgNew from '../../assets/images/login-frent-img.png'
const Login = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
          email: '',
          password:''
        },
        validationSchema: AuthSchema('login'),
        onSubmit:  async(values) => {
          const reqBody = {
                    "mobile":values.email,
                    "password":values.password,
                    "user_type_id":"5"  //1 = user, 2 = center, 3 = operator, 4 = doctor, 5 = Admin
                }
            // alert(JSON.stringify(reqBody, null, 2));
            const result = await authServices.loginApi(reqBody);
            if(result.data.status===true){
                localStorage.setItem('auth',  true)
                localStorage.setItem('user', JSON.stringify(result.data.user))
                navigate("/users");
            }else{
                toast.error('Invalid  Credentials', { toastId: 'login_fail', autoClose: 3000 });
            }
        },
      });
    
    useEffect(()=>{
        const auth = localStorage.getItem('auth');
        if(auth==='true'){
            navigate("/users");
        }
    });
    return (
        <div className="bg-login">
            <div className="wrapper">
                <div className="section-authentication-login d-flex align-items-center justify-content-center mt-4">
                    <div className="row">
                        <div className="col-12 col-lg-8 mx-auto">
                            <div className="card radius-15 overflow-hidden">
                                <div className="row g-0">
                                    <div className="col-xl-6">
                                        <div className="card-body p-5">
                                            <div className="text-center">
                                                <img src={logoIcon} width={120} alt="" />
                                                
                                                <h3 className="mt-4 font-weight-bold">Sign in Your account</h3>
                                            </div>
                                            <div className="">
                                                {/* <div className="d-grid">
                                                    <a
                                                        className="btn my-4 shadow-sm btn-white"
                                                        href="#"
                                                    >
                                                        {" "}
                                                        <span className="d-flex justify-content-center align-items-center">
                                                            <img
                                                                className="me-2"
                                                                src={searchSvg}
                                                                width={16}
                                                                alt="Image Description"
                                                            />
                                                            <span>Sign in with Google</span>
                                                        </span>
                                                    </a>{" "}
                                                    <a href="#" className="btn btn-facebook">
                                                        <i className="bx bxl-facebook" />
                                                        Sign in with Facebook
                                                    </a>
                                                </div>
                                                <div className="login-separater text-center mb-4">
                                                    {" "}
                                                    <span>OR SIGN IN WITH EMAIL</span>
                                                    <hr />
                                                </div> */}
                                                <div className="form-body"  >
                                                    <form className="row g-3" onSubmit={formik.handleSubmit}>
                                                        <div className="col-12">
                                                            <label
                                                                htmlFor="email"
                                                                className="form-label"
                                                            >
                                                                Email Address
                                                            </label>
                                                            <input
                                                                type="email"
                                                                className="form-control"
                                                                id="email"
                                                                placeholder="Email Address"
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur}
                                                                value={formik.values.email}
                                                                
                                                            />
                                                            {formik.touched.email && formik.errors.email ? (
                                                        <small className="text-danger">{formik.errors.email}</small>
                                                    ) : null}
                                                        </div>
                                                        <div className="col-12">
                                                            <label
                                                                htmlFor="password"
                                                                className="form-label"
                                                            >
                                                                Enter Password
                                                            </label>
                                                            <div className="input-group" id="show_hide_password">
                                                                <input
                                                                    type="password"
                                                                    className="form-control border-end-0"
                                                                    id="password"
                                                                    placeholder="Enter Password"
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    value={formik.values.password}
                                                                />{" "}
                                                                <a
                                                                    href="#"
                                                                    className="input-group-text bg-transparent"
                                                                    >
                                                                    <i className="bx bx-hide" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                                    {formik.touched.password && formik.errors.password ? (
                                                            <small className="text-danger">{formik.errors.password}</small>
                                                        ) : null}
                                                        {/* <div className="col-md-6">
                                                            <div className="form-check form-switch">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    id="flexSwitchCheckChecked"
                                                                    defaultChecked=""
                                                                />
                                                                <label
                                                                    className="form-check-label"
                                                                    htmlFor="flexSwitchCheckChecked"
                                                                >
                                                                    Remember Me
                                                                </label>
                                                            </div>
                                                        </div> */}
                                                        {/* <div className="col-md-6 text-end">
                                                            {" "}
                                                            <a href="authentication-forgot-password.html">
                                                                Forgot Password ?
                                                            </a>
                                                        </div> */}
                                                        <div className="col-12">
                                                            <div className="d-grid">
                                                                <button type="submit" className="btn btn-primary">
                                                                    <i className="bx bxs-lock-open" />
                                                                    Sign in
                                                                </button>
                                                            </div>
                                                        </div>
                                                        {/* <div className="col-12 text-center">
                                                            <p>
                                                                Don't have an account yet?{" "}
                                                                <a href="authentication-register.html">
                                                                    Sign up here
                                                                </a>
                                                            </p>
                                                        </div> */}
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="col-xl-6 bg-login-color d-flex align-items-center justify-content-center"> */}
                                    <div className="col-xl-6 d-flex align-items-center justify-content-center">
                                        <img
                                            src={loginFrentImgNew}
                                            className="img-fluid"
                                            alt="..."
                                        />
                                    </div>
                                </div>
                                {/*end row*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
};

export default Login;