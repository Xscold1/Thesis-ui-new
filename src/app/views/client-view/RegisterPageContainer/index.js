
import React, { useState, useEffect } from "react";
import axios from 'axios';

// Components
import UserNavbar from "../Components/UserNavbar";
import Footer from '../Components/Footer'
import TermsOfUse from "./TermsOfUse";

// Styling
import './RegisterPage.scss';

//Dependencies
import { useHistory, Link } from "react-router-dom";
import { useFormik } from "formik";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// JSON Libraries
import RegionIII from '../Components/Region-III.json';

// Constants
import { STATUS_CODES, ERROR_MSG, SUCCESS_MSG } from '../../../constants/status-constants';

// Mixins
import { successToast, errorToast } from '../../../mixins/utils/toastMessageMixins';

// Schemas
import { registerSchema } from '../../../schemas/registerSchema';

//Initial Values for Formik
const initialValues = {
	firstName: "",
	lastName: "",
	age: "",
	sex: "",
	address: "",
	email: "",
	password: "",
	confirmPassword: ""
};

// export default Form;

function RegisterPage(props) {
	let history = useHistory();

	if (localStorage.getItem("user_email")) {
		history.push('/')
	}
	
	const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);

	const [guardianCheckbox, setGuardianCheckbox] = useState(true);
  
	const handleGuardian = () => {
		setGuardianCheckbox(prevState => !prevState)
	}

	const [termsOpen, setTermsOpen] = useState(false);

	const handleTerms = () => {
		setTermsOpen(prevState => !prevState)
	}

	const formik = useFormik({
		initialValues,
		onSubmit: async (values, actions) => {
			const data = {
				firstName: values.firstName,
				lastName: values.lastName,
				age: values.age,
				sex: values.sex,
				address: values.address,
				email: values.email,
				password: values.password,
			}
			// actions.setSubmitting(false);
			try {
				const registerUserRes = await axios.post(`${process.env.REACT_APP_API_URL}/user/register`,data);

				if (registerUserRes.data.status_code == 400) {
					actions.setSubmitting(false);
					errorToast("Email already exists!");
				} else if (registerUserRes.data.status == "FAILED") {
					actions.setSubmitting(false);
					errorToast(ERROR_MSG.EM100);
					console.log('Error', registerUserRes);
				} else {
					actions.setSubmitting(true);
					successToast(SUCCESS_MSG.REGISTER_SUCCESS)
					history.push('/');
				}

				// console.log('registerUserResStatus', registerUserRes);
				
			} catch (err) {
				errorToast(ERROR_MSG.INTERNAL_ERROR_TITLE)
				console.log('error', err)
			}
		},
		validationSchema: registerSchema,
	});

	useEffect(() => {
		formik.values.age < 18 ? setGuardianCheckbox(false) : setGuardianCheckbox(true)
	}, [formik.values.age])

	const barangays = RegionIII["PAMPANGA"].municipality_list["FLORIDABLANCA"].barangay_list;
    const barangayList = barangays.map(barangayName => {
        return (
            <option key={barangayName}>{barangayName}</option>
        )
    })

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
		<center className="register__page__height">
			{termsOpen && <TermsOfUse setTermsOpen={setTermsOpen} />}

		{/* Navigation Bar */}
		<UserNavbar />

			<div className="register__div">
					<h5 className="register__h5 ">REGISTER</h5>
					
			<div className=" d-flex justify-content-center">
				
					<form onSubmit={formik.handleSubmit}>
					{/* <form onSubmit={handleSubmit} className="signup__form border p-5"> */}

						{/* E-mail Input */}
						<div className="input__div">
							<label htmlFor="password" className="register__input__label">EMAIL</label>
							{/* Email Input */}
							<input
								type="email"
								className={`form__input ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''} `}
								placeholder="Email"
								name="email"
								onChange={e => { handleChange(e) }}
								onBlur={formik.handleBlur}
								value={formik.values.email} />
						</div>
						
						{/* Email Error Message */}
						{formik.touched.email && formik.errors.email ? (
							<div className="signup__error margin__bottom">{formik.errors.email}</div>
						) : (
							<div className="signup__error-holder"><br /></div>
						)}

						<div className="multiple__input__div">
						{/* First name Input */}
						<div className="input__div">
							<label htmlFor="firstName" className="register__input__label non-email__label">FIRST NAME</label>
							<input
								type="text"
								className={`half__input ${formik.touched.firstName && formik.errors.firstName ? 'is-invalid' : ''} `}
								placeholder="First name"
								name="firstName"
								onChange={e => { handleChange(e) }}
								onBlur={formik.handleBlur}
								value={formik.values.firstName} />
						</div>
					
							<div className="input__div">
								{/* Last name Input */}
								<label htmlFor="lastName" className="register__input__label non-email__label">LAST NAME</label>
								<input
									type="text"
									className={`half__input ${formik.touched.lastName && formik.errors.lastName ? 'is-invalid' : ''} `}
									placeholder="Last name"
									name="lastName"
									onChange={e => { handleChange(e) }}
									onBlur={formik.handleBlur}
									value={formik.values.lastName} />
							
							</div>		
						</div>

						<div className="multiple__input__div">
							{/* First Name Error Message */}
							{formik.touched.firstName && formik.errors.firstName ? (
								<div className="half__error margin__bottom">{formik.errors.firstName}</div>
							) : formik.touched.lastName && formik.errors.lastName ? (
								<div className="half__error">&nbsp;</div>
							) : (
								<div className="signup__error-holder"><br /></div>
							)}

							{/* Last Name Error Message */}
							{formik.touched.lastName && formik.errors.lastName ? (
								// <div className="signup__error margin__bottom">{formik.errors.lastName}</div>
								<div className="half__error margin__bottom">{formik.errors.lastName}</div>
							) : (
								<div className="signup__error-holder"><br /></div>
							)}
						</div>


                        {/* <div className="  d-flex justify-content-center a">

							<input
								type="number"
								className={`form__input ${formik.touched.age && formik.errors.age ? 'is-invalid' : ''} `}
								placeholder="Age"
								name="age"
								onChange={e => { handleChange(e) }}
								onBlur={formik.handleBlur}
								value={formik.values.age} />
						</div>

						{formik.touched.age && formik.errors.age ? (
							<div className="signup__error">{formik.errors.age}</div>
						) : (
							<div className="signup__error-holder"><br /></div>
						)} */}
	

						<div className="multiple__input__div">
						<div className="input__div">
							<label htmlFor="password" className="register__input__label non-email__label">PASSWORD</label>
							{/* Password Input */}
							<input
								type="password"
								className={`half__input ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''} `}
								placeholder="Password"
								name="password"
								onChange={e => { handleChange(e) }}
								// onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.password} />
						</div>

							<div className="input__div">
							<label htmlFor="confirmPassword" className="register__input__label non-email__label">CONFIRM PASSWORD</label>
								{/* Confirm Password Input */}
								<input
									type="password"
									className={`half__input ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''} `}
									placeholder="Confirm Password"
									name="confirmPassword"
									onChange={e => { handleChange(e) }}
									// onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.confirmPassword} />
							</div>

						</div>

						<div className="profile__multiple__input__div">
							{/* Password Error Message */}
							{formik.touched.password && formik.errors.password ? (
								<div className="half__error margin__bottom">{formik.errors.password}</div>
							) : formik.touched.confirmPassword && formik.errors.confirmPassword ? (
								<div className="half__error margin__bottom">&nbsp;</div>
							) : (
								<div className="signup__error-holder"><br /></div>
							)}

							{/* Confirm Password Error Message */}
							{formik.touched.confirmPassword && formik.errors.confirmPassword ? (
								<div className="half__error margin__bottom">{formik.errors.confirmPassword}</div>
							) : (
								<div className="signup__error-holder"><br /></div>
							)}
						</div>

						<div className="multiple__input__div">
							<div className="input__div">
							<label htmlFor="age" className="register__input__label non-email__label">AGE</label>
								{/* Age Input */}
								<input
									type="number"
									className={`one-third__input ${formik.touched.age && formik.errors.age ? 'is-invalid' : ''} `}
									placeholder="Age"
									name="age"
									onChange={e => { handleChange(e) }}
									onBlur={formik.handleBlur}
									value={formik.values.age} />
							</div>

							<div className="input__div">
								<label htmlFor="sex" className="register__input__label non-email__label">SEX</label>
								{/* Sex Input */}
								<select
									className={`one-third__input ${formik.touched.sex && formik.errors.sex ? 'is-invalid' : ''} `}
									name="sex"
									onChange={e => { handleChange(e) }}
									// onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.sex} >
									
									<option value="" hidden disabled="disabled" selected>Sex at birth</option>
									<option key="Male" value="Male">Male</option>
									<option key="Female" value="Female">Female</option>
								</select>
							</div>

							<div className="input__div">
							<label htmlFor="address" className="register__input__label non-email__label">ADDRESS</label>
								{/* Age Input */}
								<select
									className={`one-third__input barangay__dropdown ${formik.touched.address && formik.errors.address ? 'is-invalid' : ''} `}
									name="address"
									onChange={e => { handleChange(e) }}
									onBlur={formik.handleBlur}
									value={formik.values.address}>
									<option value="" hidden disabled="disabled" selected>Enter Barangay</option>
									{barangayList}
								</select>
							</div>
						</div>

						<div className="multiple__input__div">
							{/* Age Error Message */}
							{formik.touched.age && formik.errors.age ? (
								<div className="one-third__error margin__bottom">{formik.errors.age}</div>
							) : formik.touched.age && formik.values.age < 18 ? (
								<div className="one-third__error"> <input onClick={() => handleGuardian()} checked={guardianCheckbox} className="profile__address__checkbox" type="checkbox" name="minorCheckbox" id="minorCheckbox" />Guardian</div>
							) : (formik.touched.address && formik.errors.address) || (formik.touched.sex && formik.errors.sex) ? (
								<div className="one-third__error margin__bottom">&nbsp;</div>
							) : (
								<div className="signup__error-holder"><br /></div>
							)}

							{/* Sex Error Message */}
							{formik.touched.sex && formik.errors.sex ? (
								<div className="one-third__error margin__bottom">{formik.errors.sex}</div>
							) : formik.touched.address && formik.errors.address ? (
								<div className="one-third__error margin__bottom">&nbsp;</div>
							) : (
								<div className="signup__error-holder"><br /></div>
							)}

							{/* Address Error Message */}
							{formik.touched.address && formik.errors.address ? (
								<div className="one-third__error margin__bottom">{formik.errors.address}</div>
							) : (
								<div className="signup__error-holder"><br /></div>
							)}
						</div>

						<p className="termconditions__link">By registering, you are agreeing to Malapit Lungs'  <Link  onClick={() => handleTerms()} to="#" className="termconditions__link clickable">Terms and Conditions</Link></p>


						<button type="submit" className="btn__register" disabled={!guardianCheckbox} >
							SignUp
						</button>
						<br /><br />

						<p className="login__link">Already have an account? <Link to="/login" className="login__link clickable">Login</Link></p>

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

export default RegisterPage;