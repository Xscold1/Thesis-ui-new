
import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { setUserToken } from "../../../stores/actions/userAction";

// Styling
import './AdminLoginContainer.scss';

//Dependencies
import { Route, useHistory, Link } from "react-router-dom";
import { useFormik } from "formik";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Constants
import { STATUS_CODES, ERROR_MSG, SUCCESS_MSG } from '../../../constants/status-constants';

// Mixins
import { successToast, errorToast } from '../../../mixins/utils/toastMessageMixins';

// Schemas
import { loginSchema } from '../../../schemas/loginSchema';

//Initial Values for Formik
const initialValues = {
	email: "",
	password: "",
};

function AdminLoginPage(props) {
	let history = useHistory();
	const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);
	const token = props.userToken || localStorage.getItem("token");

	if (token) {
		history.push("/admin");
	}

	const formik = useFormik({
		initialValues,
		onSubmit: async (values, actions) => {
			actions.setSubmitting(false);
			try {
				// const loginResponse = await userService.postUser(values);

				// if (loginResponse.status === STATUS_CODES.SUCCESS) {
				// 	const token = loginResponse.data;

				// 	props.setUserToken(token);
				// 	history.push("/dashboard");
				// 	successToast(SUCCESS_MSG.SUCCESS_TITLE)
				// } else if (loginResponse.status === STATUS_CODES.UNAUTHORIZED) {
				// 	setIsInvalidCredentials(true);
				// }

				// const login = {
				// 	email: "Email",
				// 	password: "Passw"
				// }

				// if(values.email === login.email && values.password === login.password){
				// 	console.log("Correct credentials")
				// } else {
				// 	console.log("Incorrect credentials")
				// 	setIsInvalidCredentials(true);
				// }

			} catch (err) {
				errorToast(ERROR_MSG.INTERNAL_ERROR_TITLE)
			}
		},
		validationSchema: loginSchema,
	});

	const handleChange = (event) => {
		formik.handleChange(event);
		setIsInvalidCredentials(false);
	}

	useEffect(() => {
		// Effect Hooks
		return () => {
			// Clean up Function
		};
	}, []);

	return (
		<center>

			<div className="admin__login__div">

                <div className="admin__form__div">
                    <form onSubmit={formik.handleSubmit} >
                        <div className="">
                            
                        {/* Email Input */}{" "}
                        <input	
                            type="text"
                            className={` admin-login__input ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''} `}
                            placeholder="Email"
                            name="email"
                            onChange={e => { handleChange(e) }}
                            onBlur={formik.handleBlur}
                            value={formik.values.email} />
                        </div>

                        {/* Email Error Message */}{" "}
                        {formik.touched.email && formik.errors.email ? (
                            <div className="">{formik.errors.email}</div>
                        ) : (
                            <div className=""><br /></div>
                        )}

                        <div className="">
                            {/* Password icon */}{" "}
                            
                            {/* Password Input */}{" "}
                            <input
                                type="password"
                                className={`admin-login__input ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''} `}
                                placeholder="Password"
                                name="password"
                                onChange={e => { handleChange(e) }}
                                // onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password} />
                        </div>

                        {/* Password Error Message */}{" "}
                        {formik.touched.password && formik.errors.password ? (
                            <div className="">{formik.errors.password}</div>
                        ) : (
                            <div className=""><br /></div>
                        )}

                        {/* Authentication Error Message */}{" "}
                        {isInvalidCredentials ? (
                            <div className="">{ERROR_MSG.AUTH_SERVICE_400_MSG}</div>
                        ) : (
                            <div className=""><br /></div>
                        )}

                        <button type="submit" className="">
                            Login
                        </button>
                        <br /><br />
                    </form>
                </div>

				{/* <ToastContainer
					position="bottom-center"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover /> */}
			</div>
		</center>
	)
}
const mapStateToProps = (state) => {
	return {
		userToken: state.userReducer.userToken,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		setUserToken: (name) => {
			dispatch(setUserToken(name))
		}
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminLoginPage)
