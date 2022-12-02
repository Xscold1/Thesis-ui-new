
import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import { setUserToken } from "../../../stores/actions/userAction";
import axios from 'axios'

// Styling
import './LoginPage.scss';

//Dependencies
import { Route, useHistory, Link } from "react-router-dom";
import { useFormik } from "formik";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Components
// import Register from '../register/Register'
import UserNavbar from "../Components/UserNavbar";
import Footer from '../Components/Footer'

// Services
// import userService from '../../../../../services/main/user/user-service';

// Contants
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

function LandingPage(props) {
	useEffect(()=>{
		localStorage.removeItem('symptomsList')
		// localStorage.removeItem('patientInfo')
	  },[])
	let history = useHistory();
	const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);
	const token = props.userToken || localStorage.getItem("auth_token");

	// if (token) {
	// 	history.push("/admin/overview");
	// }

	// Update to token verification later

	const userEmail = localStorage.getItem('user_email') || null;
	const adminEmail = localStorage.getItem('admin_email') || null;

	if(userEmail) {
		history.push("/");
	} else if (adminEmail) {
		history.push("/admin/overview");
	}

	const formik = useFormik({
		initialValues,
		onSubmit: async (values, actions) => {
			console.log('values', values)
			actions.setSubmitting(false);
			try {

				const loginRes = await axios.post(`${process.env.REACT_APP_API_URL}/user/login`, {

					email: values.email,
					password: values.password
				  })

				if(loginRes.data.status_code !== 200){
					toast.dismiss();
					errorToast(loginRes.data.response.error)
					console.log(loginRes)
				}else if(loginRes.data.status_code === 200){
					toast.dismiss();
					localStorage.setItem('auth_token', loginRes.data.response.token)

					if (loginRes.data.response.data.roleId === 1) {
						localStorage.setItem('admin_email', values.email)
						successToast('Logged in as Administrator')
						history.push("/admin/overview");
					} else {
						const userData = loginRes.data.response.data

						localStorage.setItem('user_email', values.email)
						localStorage.setItem('patientInfo', JSON.stringify({
						step: 4,
						// roleId: userData.roleId,
						id: userData.id,
						email: userData.email,
						firstName: userData.firstName,
						lastName: userData.lastName,
						sex: userData.sex, 
						ageNumber: userData.age, 
						ageMonthYear: "Year", 
						address: `${userData.address}, FLORIDABLANCA, PAMPANGA`,
						exercise: '', 
						posture: '', 
						smoker: '', 
						healthyDiet: ''
						}))

						successToast('Successfully Logged in')
						console.log('userData', userData)
						history.push("/");
					}
				}

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

		{/* Navigation Bar */}
		<UserNavbar />

			<div className="login__div">
				<div className="login__form__div">
					<div ><br /><br /><br />
						{/* <h5 className="main-header">Login as Admin</h5>   */}
						<h5 className="login__h5">LOGIN</h5>  
					</div>

                     {/* <div className="description">
						<p>Login using social network <span className="italic">{`(Coming Soon!)`}</span></p>
					 </div>

					 <div className="logos"> 
					 <img className="social-media-icon" src={Ggl} alt="ggl" />
					 <img className="social-media-icon"  src={Fb} alt="ggl" />
					 </div>

				           <div className="separation-text">OR </div> */}
					<br />
					
					<form onSubmit={formik.handleSubmit} >
						{/* <div style={{justifyContent: "center"}} className="input-group  a"> */}
						<div style={{justifyContent: "center"}} className="input__div">
							
							<label htmlFor="password" className="input__label">EMAIL</label>
							{/* Email Input */}{" "}
							<input	
								type="text"
								className={`form__input ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
								// placeholder="Email"
								name="email"
								onChange={e => { handleChange(e) }}
								onBlur={formik.handleBlur}
								value={formik.values.email} />
						</div>
						
						{/* Email Error Message */}{" "}
						{formik.touched.email && formik.errors.email ? (
							<div className="login__error">{formik.errors.email}</div>
						) : (
							<div className="login__error-holder"><br /></div>
						)}

						<div style={{justifyContent: "center"}} className="input__div">
							{/* Password icon */}{" "}
							<label htmlFor="password" className="input__label">PASSWORD</label>
							{/* Password Input */}{" "}
							<input
								type="password"
								className={`form__input ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
								// placeholder="Password"
								name="password"
								onChange={e => { handleChange(e) }}
								// onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.password} />
						</div>

						{/* Password Error Message */}{" "}
						{formik.touched.password && formik.errors.password ? (
							<div className="login__error">{formik.errors.password}</div>
						) : (
							<div className="login__error-holder"><br /></div>
						)}

						{/* Authentication Error Message */}{" "}
						{isInvalidCredentials ? (
							<div className="login__error">{ERROR_MSG.AUTH_SERVICE_400_MSG}</div>
						) : (
							<div className="login__error-holder"><br /></div>
						)}

						<button type="submit" className="btn__login">
							Login
						</button>
						<br /><br />
						<p className="register__link" >New to Malapit Lungs? <Link to="/register" className="register__link clickable">Create Account</Link></p>
						{/* <Route path="/Register" render={Register} /> */}
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
			
			<Footer />
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
export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)
