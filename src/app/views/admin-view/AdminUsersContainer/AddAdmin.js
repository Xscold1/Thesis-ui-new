import React, { useState, useEffect } from 'react'
import axios from 'axios';

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
import { insertAdminSchema } from '../../../schemas/insertAdminSchema';

// Utils
import authenticate from '../../../utils/authenticate';

//Initial Values for Formik
const initialValues = {
	  email: '',
    password: '',
    confirmPassword: ''
};

function AddAdmin() {
    const auth_token = localStorage.getItem('auth_token')
  useEffect(()=>{
    authenticate();
  },[]);
  let history = useHistory();

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, actions) => {
      const data = {
        email: values.email,
        password: values.password,
      }

      try {
        // const data = new FormData();

        // console.log('appendData', data);
        const insertAdminRes = await axios.post(`${process.env.REACT_APP_API_URL}/admin/create-admin`, data, {
          headers: {
              Authorization: `Bearer ${auth_token}`
          }
        });
        console.log('insertAdminRes', insertAdminRes)
        if (insertAdminRes.data.status_code === 200) {
          actions.setSubmitting(true);
          successToast('Successfully added admin')
          history.push('/admin')
          actions.resetForm()
        } else {
          actions.setSubmitting(false);
          errorToast('Failed to add admin');
        }
  
        
      } catch (err) {
        errorToast(ERROR_MSG.INTERNAL_ERROR_TITLE)
      }
    },
    validationSchema: insertAdminSchema,
  });

  const handleChange = (event) => {
    formik.handleChange(event);
  }

  // console.log('formik', formik.values);

  return (
    <div className="admin__average__content">
      <h1 className="header__title">Add an Administrator</h1>

      <h5 className="form__header">Admin Details</h5>

        <div className="form__container">
          <center>
          <form onSubmit={formik.handleSubmit}>

              {/* Admin Email Input */}
              <div>
                <label className="form__label" htmlFor="email">Email</label>
                <input
                  type="email"
                  className={`admin__input__field ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                  placeholder="Admin Email"
                  name="email"
                  onChange={e => { handleChange(e) }}
                  onBlur={formik.handleBlur}
                  value={formik.values.email} />
              </div>

              {/* Admin Email Error Message */}
              {formik.touched.email && formik.errors.email ? (
                <div className="form__error">{formik.errors.email}</div>
              ) : (
                <div className="form__error-holder"><br /></div>
              )}

              {/* Admin Password Input */}
              <div>
                <label className="form__label" htmlFor="password">Password</label>
                <input
                  type="password"
                  className={`admin__input__field ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                  placeholder="Admin Password"
                  name="password"
                  onChange={e => { handleChange(e) }}
                  onBlur={formik.handleBlur}
                  value={formik.values.password} />
              </div>

              {/* Admin Password Error Message */}
              {formik.touched.password && formik.errors.password ? (
                <div className="form__error">{formik.errors.password}</div>
              ) : (
                <div className="form__error-holder"><br /></div>
              )}

              {/* Admin Confirm Password Input */}
              <div>
                <label className="form__label" htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  className={`admin__input__field ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}`}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  onChange={e => { handleChange(e) }}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword} />
              </div>

              {/* Admin Confirm Password Error Message */}
              {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                <div className="form__error">{formik.errors.confirmPassword}</div>
              ) : (
                <div className="form__error-holder"><br /></div>
              )}

    
              <br />
                <button type="submit" className="admin__button" >
                  Add Admin
                </button>
            </form>
            </center>
        </div>
    </div>
  )
}

export default AddAdmin