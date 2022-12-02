import React, { useState, useEffect } from 'react'
import axios from 'axios';

// Styling
import './AdminHospitalFacilities.scss'

//Dependencies
import { useHistory,  useLocation, Link } from "react-router-dom";
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
// const initialValues = {
//     facilityName: "",
//     facilityImg: "",
// };

function EditFacility() {
  const auth_token = localStorage.getItem('auth_token')
  useEffect(()=>{
    authenticate();
  },[]);
  let history = useHistory();
	const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);

  const [initialValues, setInitialValues] = useState({
    facilityName: "",
    facilityImg: "",
});

  const location = useLocation();
  const [facilityId, setFacilityId] = useState('');
  const [facilityIm, setFacilityIm] = useState(null);
  console.log('facilityIm', facilityIm);

  const idNum = location.search.substring(4)

  useEffect(() => {
    setFacilityId(idNum);
  }, [location]);

  React.useEffect(() => {
    const fetchFacilityInformation = async () => {
    const resultName = await axios.get(`${process.env.REACT_APP_API_URL}/hospital/get-facility-by-id?id=${idNum}`);

    const { data, status, status_code } = resultName.data.response;

    setInitialValues({
      facilityName: data.facilityName,
      facilityImg: facilityIm
    })

    // console.log('deta', data)

    } 

    fetchFacilityInformation();
  }, [])

  React.useEffect(() => {
    
  }, [initialValues])

  // console.log('initialValues', initialValues)

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      try {
        const data = new FormData();
        const queryParams = new URLSearchParams(location.search)
        
        data.append("facilityName", values.facilityName)
        data.append("image", facilityIm)

        actions.setSubmitting(false);

        const updateFacilityRes = await axios.put(`${process.env.REACT_APP_API_URL}/hospital/update-hospital-facility/${queryParams.get("id")}`,data, {
          headers: {
              Authorization: `Bearer ${auth_token}`
          }
        });
  
        if (updateFacilityRes.data.status_code === 200) {
          actions.setSubmitting(true);
          successToast('Successfully updated facility')
          actions.resetForm()
          history.push('view-hospitals')
        } else {
          actions.setSubmitting(false);
          errorToast('Failed to update facility');
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

  // console.log('formikValues', formik.values);

  return (
    <div className="admin__average__content">
      <h1 className="header__title">Edit Facility</h1>

      <h5 className="form__header">Update Facility Details</h5>

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
                  Save Changes
                </button>
            </form>
            </center>
        </div>
    </div>
  )
}

export default EditFacility