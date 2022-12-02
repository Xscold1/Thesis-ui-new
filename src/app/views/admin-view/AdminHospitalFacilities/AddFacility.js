import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';

// Styling
import './AdminHospitalFacilities.scss'

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
import { insertFacilitySchema } from '../../../schemas/insertFacilitySchema';

// Utils
import authenticate from '../../../utils/authenticate';

//Initial Values for Formik
const initialValues = {
    facilityName: "",
    facilityImg: "",
};

function AddFacility() {
  const auth_token = localStorage.getItem('auth_token')
  useEffect(()=>{
    authenticate();
  },[]);
  let history = useHistory();
	const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);

  const location = useLocation();
  const [hospitalId, setHospitalId] = useState('');
  const [facilityIm, setFacilityIm] = useState('');
  useEffect(() => {
    const idNum = location.search.substring(4)
    setHospitalId(idNum);
  }, [location]);

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, actions) => {
     
      try {
        const data = new FormData();
        const queryParams = new URLSearchParams(location.search)
        
        data.append("facilityName", values.facilityName)
        data.append("image", facilityIm)

        const insertFacilityRes = await axios.post(`${process.env.REACT_APP_API_URL}/hospital/add-hospital-facility/${queryParams.get("id")}`,data, {
          headers: {
              Authorization: `Bearer ${auth_token}`
          }
        });
  
        if (insertFacilityRes.data.status_code === 200) {
          actions.setSubmitting(true);
          successToast('Successfully added facility')
          actions.resetForm()
          history.push('view-hospitals')
        } else {
          actions.setSubmitting(false);
          errorToast('Failed to add facility');
        }
      } catch (err) {
        errorToast(ERROR_MSG.INTERNAL_ERROR_TITLE)
      }
    },
    validationSchema: insertFacilitySchema,
  });
  
  const handleChange = (event) => {
    if(event.target.name === 'facilityImg'){
      setFacilityIm(event.target.files[0])
    }
    formik.handleChange(event);
  }

  return (
    <div className="admin__average__content">
      <h1 className="header__title">Add Facility</h1>

      <h5 className="form__header">Facility Details</h5>

        <div className="form__container">
          <center>
          <form onSubmit={formik.handleSubmit}>

              {/* Facility Name Input */}
              <div>
                <label className="form__label" htmlFor="facilityName">Name</label>
                <input
                  type="text"
                  className={`admin__input__field ${formik.touched.facilityName && formik.errors.facilityName ? 'is-invalid' : ''}`}
                  placeholder="Facility Name"
                  name="facilityName"
                  onChange={e => { handleChange(e) }}
                  onBlur={formik.handleBlur}
                  value={formik.values.facilityName} />

              </div>

              {/* Facility Name Error Message */}
              {formik.touched.facilityName && formik.errors.facilityName ? (
                <div className="form__error">{formik.errors.facilityName}</div>
              ) : (
                <div className="form__error-holder"><br /></div>
              )}

              {/* Facility Image Input */}
              <div>
                <label className="form__label">Facility Image</label>
                {/* <div className="admin__file__input__div"> */}
                  <input
                    type="file"
                    className={`admin__file__input ${formik.touched.facilityImg && formik.errors.facilityImg ? 'is-invalid' : ''}`}
                    name="facilityImg"
                    onChange={e => { handleChange(e) }}
                    onBlur={formik.handleBlur}
                    value={formik.values.facilityImg} />
                {/* </div> */}
              </div>

              {/* Facility Image Error Message */}
              {formik.touched.facilityImg && formik.errors.facilityImg ? (
                <div className="form__error">{formik.errors.facilityImg}</div>
              ) : (
                <div className="form__error-holder"><br /></div>
              )}
    
              <br />
                <button type="submit" className="add__affiliate__button" >
                  Add Facility
                </button>
            </form>
            </center>
        </div>
    </div>
  )
}

export default AddFacility