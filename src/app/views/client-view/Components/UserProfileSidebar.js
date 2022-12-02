import React, { useState, useEffect } from 'react'
import axios from 'axios';

// JSON Libraries
import RegionIII from './Region-III.json';

// Styling
import './UserProfileSidebar.scss';
import * as IoIcons from 'react-icons/io'
import * as MdIcons from 'react-icons/md'
import * as BsIcons from 'react-icons/bs'

//Dependencies
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";

// Constants
import { STATUS_CODES, ERROR_MSG, SUCCESS_MSG } from '../../../constants/status-constants';

// Mixins
import { successToast, errorToast } from '../../../mixins/utils/toastMessageMixins';

// Schemas
import { registerSchema } from '../../../schemas/registerSchema';
import { toast } from 'react-toastify';

function UserProfileSidebar(props) {
  const [patientInfo, setPatientInfo] = useState(
    JSON.parse(localStorage.getItem("patientInfo")) || {
      address: '',
      ageMonthYear: '',
      ageNumber: '',
      email: '',
      exercise: '',
      firstName: '',
      healthyDiet: '',
      id: '',
      lastName: '',
      posture: '',
      sex: '',
      smoker: '',
      step: 4
    }
  );

  React.useEffect(() => {
    localStorage.setItem("patientInfo", JSON.stringify(patientInfo))
  }, [patientInfo])

  const patientAddress = patientInfo.address.split(", ")

  console.log('patientInfo', patientAddress[0]);

  //Initial Values for Formik
  const [initialValues, setInitialValues] = useState({
    id: patientInfo.id,
    firstName: patientInfo.firstName,
    lastName: patientInfo.lastName,
    age: patientInfo.ageNumber,
    sex: patientInfo.sex,
    address: patientAddress[0],
    email: patientInfo.email,
    password: "",
    confirmPassword: ""
  });

  let history = useHistory();
  const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);

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
				const updateUserRes = await axios.put(`${process.env.REACT_APP_API_URL}/user/update?id=${patientInfo.id}`,data);

				if (updateUserRes.data.status == "FAILED") {
					actions.setSubmitting(false);
					errorToast(ERROR_MSG.EM100);
					console.log('Error', updateUserRes.data.response.data);
				} else {
          toast.dismiss();
          props.toggleOpen();
					actions.setSubmitting(true);
					successToast("User Info Update Successful")

          setPatientInfo(prevInfo => ({
            ...prevInfo,
            firstName: values.firstName,
            lastName: values.lastName,
            ageNumber: values.age,
            sex: values.sex,
            address: `${values.address}, FLORIDABLANCA, PAMPANGA`,
            email: values.email,
            exercise: "", // Comment out if values aren't required to reset
            healthyDiet: "",
            posture: "",
            smoker: "",
            step: 4
          }))

					history.push('/');
				}

				// console.log('updateUserResStatus', updateUserRes.data.status);
				
			} catch (err) {
        console.log(err)
				errorToast(ERROR_MSG.INTERNAL_ERROR_TITLE)
			}
		},
		validationSchema: registerSchema,
	});

  const handleChange = (event) => {
		formik.handleChange(event);
		setIsInvalidCredentials(false);
	}

  const [guardianCheckbox, setGuardianCheckbox] = useState(true);
  
  const handleGuardian = () => {
    setGuardianCheckbox(prevState => !prevState)
  }

  useEffect(() => {
    formik.values.age < 18 ? setGuardianCheckbox(false) : setGuardianCheckbox(true)
  }, [formik.values.age])
  

	useEffect(() => {
		// Effect Hooks
		return () => {
			// Clean up Function
		};
	}, []);

  const barangays = RegionIII["PAMPANGA"].municipality_list["FLORIDABLANCA"].barangay_list;
    const barangayList = barangays.map(barangayName => {
        return (
            <option key={barangayName} selected={barangayName === formik.values.address} >{barangayName}</option>
        )
  })

  // console.log('formikvalues', formik.values)

  return (
    <div className={`user__sidebar__container ${props.isOpen ? 'animated__open' : 'closed__sidebar'}`}>
      {/* <IoIcons.IoIosArrowDroprightCircle color={"black"} /> */}
      <IoIcons.IoIosArrowDroprightCircle onClick={() => props.toggleOpen()} className="profile__toggle__arrow" />
      <br />
      <div className="profile__form__div profile__hidden__scroll">
        <form onSubmit={formik.handleSubmit}>

        {/* E-mail Label */}
        <div className="profile__input__div">
          {/* <label className="profile__email__label"> <span className="profile__blue">USER</span> <span className="profile__orange">ACCOUNT</span> <MdIcons.MdManageAccounts /></label> */}
          <label className="profile__email__label"> <span className="profile__blue">USER</span> <span className="profile__orange">ACCOUNT</span> <BsIcons.BsGearFill /></label>
            <h1 className="profile__email">{patientInfo.email}</h1>
        </div>
          
        {/* Password Input */}
        <div className="profile__input__div">
          <label className="profile__input__label">Password</label>
            {/* Password Input */}
            <input
              type="password"
              className={`profile__form__input ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''} `}
              placeholder="Enter Password"
              name="password"
              onChange={e => { handleChange(e) }}
              onBlur={formik.handleBlur}
              value={formik.values.password} />
        </div>

        {/* Password Error Message */}
        <center>
          {formik.touched.password && formik.errors.password ? (
            <div className="signup__error">{formik.errors.password}</div>
          ) : (
            <div className="signup__error-holder"></div>
          )}
        </center>

        {/* Confirm Password Input */}
        <div className="profile__input__div">
          <label className="profile__input__label">Confirm Password</label>
            {/* Confirm Password Input */}
            <input
              type="password"
              className={`profile__form__input ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''} `}
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={e => { handleChange(e) }}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword} />
        </div>

        {/* Confirm Password Error Message */}
        <center>
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <div className="signup__error">{formik.errors.confirmPassword}</div>
          ) : (
            <div className="signup__error-holder"></div>
          )}
        </center>

        <br />
        <div className="profile__input__div">
          <label className="profile__email__label"> <span className="profile__blue">USER</span> <span className="profile__orange">PROFILE </span><i className="fas fa-user-circle" /></label>
        </div>
        {/* First Name Input */}
        <div className="profile__input__div">
          <label className="profile__input__label">First Name</label>
            {/* First Name Input */}
            <input
              type="text"
              className={`profile__form__input ${formik.touched.firstName && formik.errors.firstName ? 'is-invalid' : ''} `}
              placeholder="Enter First Name"
              name="firstName"
              onChange={e => { handleChange(e) }}
              onBlur={formik.handleBlur}
              value={formik.values.firstName} />
        </div>

        {/* First Name Error Message */}
        <center>
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className="signup__error">{formik.errors.firstName}</div>
          ) : (
            <div className="signup__error-holder"></div>
          )}
        </center>

        {/* Last Name Input */}
        <div className="profile__input__div">
          <label className="profile__input__label">Last Name</label>
            {/* Last Name Input */}
            <input
              type="text"
              className={`profile__form__input ${formik.touched.lastName && formik.errors.lastName ? 'is-invalid' : ''} `}
              placeholder="Enter Last Name"
              name="lastName"
              onChange={e => { handleChange(e) }}
              onBlur={formik.handleBlur}
              value={formik.values.lastName} />
        </div>

        {/* Last Name Error Message */}
        <center>
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="signup__error">{formik.errors.lastName}</div>
          ) : (
            <div className="signup__error-holder"></div>
          )}
        </center>

        {/* Address Input */}
        <div className="profile__input__div">
          <label className="profile__input__label">Address</label>
            {/* Last Name Input */}
            <select
              name="address"
              className={`profile__dropdown__input ${formik.touched.address && formik.errors.address ? 'is-invalid' : ''} `}
              onChange={e => { handleChange(e) }}
              onBlur={formik.handleBlur}
              >
                <option value="" hidden disabled="disabled" selected>Enter Barangay</option>
                {barangayList}
            </select>
        </div>

        {/* Address Error Message */}
        <center>
          {formik.touched.address && formik.errors.address ? (
            <div className="signup__error">{formik.errors.address}</div>
          ) : (
            <div className="signup__error-holder"></div>
          )}
        </center>

        {/* Sex and Age Input Div */}
        <div className="multiple__input__div">

        {/* Sex Input Div */}
        <div className="profile__input__div">
          <label className="profile__input__label">Sex</label>
            {/* Sex Input */}
            <select
              name="sex"
              className={`profile__form__input profile__half__input ${formik.touched.sex && formik.errors.sex ? 'is-invalid' : ''} `}
              onChange={e => { handleChange(e) }}
              onBlur={formik.handleBlur}
              value={formik.values.sex}
              >
              <option value="" hidden disabled="disabled" selected>Enter Sex</option>
              <option key="Male">Male</option>
              <option key="Female">Female</option>
            </select>
        </div>

        {/* Age Input Div */}
        <div className="profile__input__div">
          <label className="profile__input__label">Age</label>
            {/* Age Input */}
            <input
              type="text"
              className={`profile__form__input profile__half__input ${formik.touched.age && formik.errors.age ? 'is-invalid' : ''} `}
              placeholder="Enter Age"
              name="age"
              onChange={e => { handleChange(e) }}
              onBlur={formik.handleBlur}
              value={formik.values.age} />
        </div>
        </div>

        <div className="multiple__input__div">
            {/* Sex Error Message */}
              {formik.touched.sex && formik.errors.sex ? (
                <div className="profile__half__error">{formik.errors.sex}</div>
              ) : formik.touched.age && formik.errors.age ? (
								<div className="profile__half__error">&nbsp;</div>
							) : formik.values.age < 18 ? (
                <div className="profile__half__error">&nbsp;</div>
              ) : (
                <div className="profile__half__error-holder"></div>
              )}

              {formik.touched.age && formik.errors.age ? (
                <div className="profile__half__error">{formik.errors.age}</div>
              ) : formik.touched.age && formik.values.age < 18 ? (
                <div className="profile__half__error"> <input onClick={() => handleGuardian()} checked={guardianCheckbox} className="profile__address__checkbox" type="checkbox" name="minorCheckbox" id="minorCheckbox" />Guardian</div>
              ) : (
                <div className="profile__half__error-holder"></div>
              )}
        </div>

        <br /><br /><br />
        <center>
          <button type="submit" className="profile__changes__button" disabled={!guardianCheckbox} >
              Save Changes
          </button>
        </center>

        </form>

        <br /><br /><br />
      </div>

    </div>
  )
}

export default UserProfileSidebar