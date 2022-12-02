import React, { useState, useEffect } from 'react'
import axios from 'axios';

// Styling
import './AdminDoctors.scss'

//Dependencies
import { useHistory, Link } from "react-router-dom";
import { useFormik } from "formik";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Constants
import { STATUS_CODES, ERROR_MSG, SUCCESS_MSG } from '../../../constants/status-constants';

// Mixins
import { successToast, errorToast } from '../../../mixins/utils/toastMessageMixins';

// Schemas
import { insertDoctorSchema } from '../../../schemas/insertDoctorSchema';

// Utils
import authenticate from '../../../utils/authenticate';

//Initial Values for Formik
const initialValues = {
	firstName: "",
	lastName: "",
	specialization: "",
	doctorImg: ""
};

function InsertDoctor() {
  const auth_token = localStorage.getItem('auth_token')
  useEffect(()=>{
    authenticate();
  },[]);
  let history = useHistory();
  const [doctorIm, setDoctorIm] = useState(null)

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, actions) => {
    

      try {
        const data = new FormData();
        
        data.append("firstName", values.firstName)
        data.append("lastName", values.lastName)
        data.append("specialization", JSON.stringify(values.specialization.split(',')))
        data.append("image", doctorIm)
        const insertDoctorRes = await axios.post(`${process.env.REACT_APP_API_URL}/doctor/doctor-register`, data, {
          headers: {
              Authorization: `Bearer ${auth_token}`
          }
        });
        console.log('insertDoctorRes', insertDoctorRes)
        if (insertDoctorRes.data.status_code === 200) {
          actions.setSubmitting(true);
          successToast('Successfully added doctor')
          history.push('view-doctors')
          actions.resetForm()
        } else {
          actions.setSubmitting(false);
          errorToast('Failed to add doctor');
        }
  
        
      } catch (err) {
        errorToast(ERROR_MSG.INTERNAL_ERROR_TITLE)
      }
    },
    validationSchema: insertDoctorSchema,
  });

  const handleChange = (event) => {
    if(event.target.name === 'doctorImg'){
      setDoctorIm(event.target.files[0])
    }
    formik.handleChange(event);
  }

  return (
    <div className="admin__average__content">
      <h1 className="header__title">Add a Doctor</h1>

      <h5 className="form__header">Doctor Details</h5>

        <div className="form__container">
          <center>
          <form onSubmit={formik.handleSubmit}>

              {/* Doctor Name Input */}
              <div>
                <label className="form__label" htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className={`admin__input__field ${formik.touched.firstName && formik.errors.firstName ? 'is-invalid' : ''}`}
                  placeholder="Doctor Name"
                  name="firstName"
                  onChange={e => { handleChange(e) }}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName} />
              </div>

              {/* Doctor Name Error Message */}
              {formik.touched.firstName && formik.errors.firstName ? (
                <div className="form__error">{formik.errors.firstName}</div>
              ) : (
                <div className="form__error-holder"><br /></div>
              )}

              {/* Doctor Expertise Input */}
              <div>
                <label className="form__label" htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className={`admin__input__field ${formik.touched.lastName && formik.errors.lastName ? 'is-invalid' : ''}`}
                  placeholder="Doctor Name"
                  name="lastName"
                  onChange={e => { handleChange(e) }}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName} />
              </div>

              {/* Doctor Expertise Error Message */}
              {formik.touched.lastName && formik.errors.lastName ? (
                <div className="form__error">{formik.errors.lastName}</div>
              ) : (
                <div className="form__error-holder"><br /></div>
              )}

              {/* Doctor Years of Experience Input */}
              <div>
                <label className="form__label" htmlFor="lastName">Specialization</label>
                <input
                  type="text"
                  className={`admin__input__field ${formik.touched.specialization && formik.errors.specialization ? 'is-invalid' : ''}`}
                  placeholder="Doctor Exp"
                  name="specialization"
                  onChange={e => { handleChange(e) }}
                  onBlur={formik.handleBlur}
                  value={formik.values.specialization} />
              </div>

              {/* Doctor Years of Experience Error Message */}
              {formik.touched.specialization && formik.errors.specialization ? (
                <div className="form__error">{formik.errors.specialization}</div>
              ) : (
                <div className="form__error-holder"><br /></div>
              )}

              {/* Doctor Profile Image Input */}
              <div>
                <label className="form__label" htmlFor="lastName">Profile Image</label>
                {/* <div className="admin__file__input__div"> */}
                  <input
                    type="file"
                    className={`admin__file__input ${formik.touched.doctorImg && formik.errors.doctorImg ? 'is-invalid' : ''}`}
                    name="doctorImg"
                    onChange={e => { handleChange(e) }}
                    onBlur={formik.handleBlur}
                    value={formik.values.doctorImg} />
                {/* </div> */}
              </div>

              {/* Doctor Profile Image Error Message */}
              {formik.touched.doctorImg && formik.errors.doctorImg ? (
                <div className="form__error">{formik.errors.doctorImg}</div>
              ) : (
                <div className="form__error-holder"><br /></div>
              )}

    
              <br />
                <button type="submit" className="admin__button" >
                  Add Doctor
                </button>
            </form>
            </center>
        </div>
    </div>
  )
}

export default InsertDoctor