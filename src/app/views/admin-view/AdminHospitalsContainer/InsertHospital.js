  import React, { useState, useEffect } from 'react'
import axios from 'axios';

// Styling
import './AdminHospitals.scss'

//Dependencies
import { useHistory, Link } from "react-router-dom";
import { useFormik } from "formik";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Contants
import { STATUS_CODES, ERROR_MSG, SUCCESS_MSG } from '../../../constants/status-constants';

// Mixins
import { successToast, errorToast } from '../../../mixins/utils/toastMessageMixins';

// Schemas
import { insertHospitalSchema } from '../../../schemas/insertHospitalSchema';

// Utils
import authenticate from '../../../utils/authenticate';

//Initial Values for Formik
const initialValues = {
  hospitalName: "",
  barangay: "",
  province: "",
  municipality: "",
  street: "",
  zip: "",
  image: "",
  longitude: "",
  latitude: "",
  overview: "",
  contactInfo: "",
};

function InsertHospital() {
  const auth_token = localStorage.getItem('auth_token')
  useEffect(()=>{
    authenticate();
  },[]);
  let history = useHistory();
	const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);

  const [hospitalIm, setHospitalIm] = useState(null)
  const formik = useFormik({
    initialValues,
    onSubmit: async (values, actions) => {
      console.log('values', values)
     
      try {
        const data = new FormData();
        data.append("hospitalName", values.hospitalName)
        data.append("country", 'Philippines')
        data.append("region", 'Region III')
        data.append("barangay", values.barangay)
        data.append("province", values.province)
        data.append("municipality", values.municipality)
        data.append("street", values.street)
        data.append("zip", values.zip)
        data.append("longitude", values.longitude)
        data.append("latitude", values.latitude)
        data.append("overview", values.overview)
        data.append("contactInfo", values.contactInfo)
        data.append("image", hospitalIm)

        actions.setSubmitting(false);

        const insertHospitalRes = await axios.post(`${process.env.REACT_APP_API_URL}/hospital/add-hospital`, data, {
          

          headers: {
              Authorization: `Bearer ${auth_token}`
          }
        });
        console.log('insertHospitalRes', insertHospitalRes)
        if (insertHospitalRes.data.status_code === 200) {
          actions.setSubmitting(true);
          successToast('Successfully added hospital')
          actions.resetForm()
          history.push('view-hospitals')
        } else {
          actions.setSubmitting(false);
          errorToast('Failed to add hospital');
        }
  
        // console.log('insertHospitalResStatus', insertHospitalRes.data.response.data.status);
        
      } catch (err) {
        errorToast(ERROR_MSG.INTERNAL_ERROR_TITLE)
      }
    },
    validationSchema: insertHospitalSchema,
  });
  
  useEffect(() => {
    // Effect Hooks
    return () => {
      // Clean up Function
    };
  }, []);

  const handleChange = (event) => {
    if(event.target.name === 'image'){
      setHospitalIm(event.target.files[0])
    }
    formik.handleChange(event);
  }

  return (
    <div className="admin__hospital__content">
      <h1 className="header__title">Add a Hospital</h1>

      <h5 className="form__header">Hospital Details</h5>

        <div className="form__container">
          <center>
          <form onSubmit={formik.handleSubmit}>

              {/* Hospital Name Input */}
              <div>
                <label className="form__label" htmlFor="hospitalName">Hospital Name</label>
                <input
                  type="text"
                  className={`admin__input__field ${formik.touched.hospitalName && formik.errors.hospitalName ? 'is-invalid' : ''}`}
                  placeholder="Hospital Name"
                  name="hospitalName"
                  onChange={e => { handleChange(e) }}
                  onBlur={formik.handleBlur}
                  value={formik.values.hospitalName} />
              </div>

              {/* Hospital Name Error Message */}
              {formik.touched.hospitalName && formik.errors.hospitalName ? (
                <div className="form__error">{formik.errors.hospitalName}</div>
              ) : (
                <div className="form__error-holder"><br /></div>
              )}


              {/* Hospital Address Input */}
              <div>
                <label className="form__label" htmlFor="barangay">Barangay</label>
                <input
                  type="text"
                  className={`admin__input__field ${formik.touched.barangay && formik.errors.barangay ? 'is-invalid' : ''}`}
                  placeholder="Barangay"
                  name="barangay"
                  onChange={e => { handleChange(e) }}
                  onBlur={formik.handleBlur}
                  value={formik.values.barangay} />
              </div>

              {/* Hospital Address Error Message */}
              {formik.touched.barangay && formik.errors.barangay ? (
                <div className="form__error">{formik.errors.barangay}</div>
              ) : (
                <div className="form__error-holder"><br /></div>
              )}


              {/* Hospital Contact No. Input */}
              <div>
                <label className="form__label" htmlFor="province">Province</label>
                <input
                  type="text"
                  className={`admin__input__field ${formik.touched.province && formik.errors.province ? 'is-invalid' : ''}`}
                  placeholder="Province"
                  name="province"
                  onChange={e => { handleChange(e) }}
                  onBlur={formik.handleBlur}
                  value={formik.values.province} />
              </div>

              {/* Hospital Contact No. Error Message */}
              {formik.touched.province && formik.errors.province ? (
                <div className="form__error">{formik.errors.province}</div>
              ) : (
                <div className="form__error-holder"><br /></div>
              )}

              
              {/* Hospital Hours Input */}
              <div>
                <label className="form__label" htmlFor="municipality">Municipality</label>
                <input
                  type="text"
                  className={`admin__input__field ${formik.touched.municipality && formik.errors.municipality ? 'is-invalid' : ''}`}
                  placeholder="Municipality"
                  name="municipality"
                  onChange={e => { handleChange(e) }}
                  onBlur={formik.handleBlur}
                  value={formik.values.municipality} />
              </div>

              {/* Hospital Hours Error Message */}
              {formik.touched.municipality && formik.errors.municipality ? (
                <div className="form__error">{formik.errors.municipality}</div>
              ) : (
                <div className="form__error-holder"><br /></div>
              )}
              {/* Hospital Hours Input */}
              <div>
                <label className="form__label" htmlFor="municipality">Street</label>
                <input
                  type="text"
                  className={`admin__input__field ${formik.touched.street && formik.errors.street ? 'is-invalid' : ''}`}
                  placeholder="Street"
                  name="street"
                  onChange={e => { handleChange(e) }}
                  onBlur={formik.handleBlur}
                  value={formik.values.street} />
              </div>

              {/* Hospital Hours Error Message */}
              {formik.touched.street && formik.errors.street ? (
                <div className="form__error">{formik.errors.street}</div>
              ) : (
                <div className="form__error-holder"><br /></div>
              )}
              {/* Hospital Hours Input */}
              <div>
                <label className="form__label" htmlFor="zip">Zip</label>
                <input
                  type="text"
                  className={`admin__input__field ${formik.touched.zip && formik.errors.zip ? 'is-invalid' : ''}`}
                  placeholder="Zip"
                  name="zip"
                  onChange={e => { handleChange(e) }}
                  onBlur={formik.handleBlur}
                  value={formik.values.zip} />
              </div>

              {/* Hospital Hours Error Message */}
              {formik.touched.zip && formik.errors.zip ? (
                <div className="form__error">{formik.errors.zip}</div>
              ) : (
                <div className="form__error-holder"><br /></div>
              )}

              {/* Hospital Hours Input */}
              <div>
                <label className="form__label" htmlFor="longitude">Longitude</label>
                <input
                  type="text"
                  className={`admin__input__field ${formik.touched.longitude && formik.errors.longitude ? 'is-invalid' : ''}`}
                  placeholder="Longitude"
                  name="longitude"
                  onChange={e => { handleChange(e) }}
                  onBlur={formik.handleBlur}
                  value={formik.values.longitude} />
              </div>

              {/* Hospital Hours Error Message */}
              {formik.touched.longitude && formik.errors.longitude ? (
                <div className="form__error">{formik.errors.longitude}</div>
              ) : (
                <div className="form__error-holder"><br /></div>
              )}

              {/* Hospital Hours Input */}
              <div>
                <label className="form__label" htmlFor="latitude">Latitude</label>
                <input
                  type="text"
                  className={`admin__input__field ${formik.touched.latitude && formik.errors.latitude ? 'is-invalid' : ''}`}
                  placeholder="Latitude"
                  name="latitude"
                  onChange={e => { handleChange(e) }}
                  onBlur={formik.handleBlur}
                  value={formik.values.latitude} />
              </div>

              {/* Hospital Hours Error Message */}
              {formik.touched.latitude && formik.errors.latitude ? (
                <div className="form__error">{formik.errors.latitude}</div>
              ) : (
                <div className="form__error-holder"><br /></div>
              )}

              {/* Hospital Hours Input */}
              <div>
                <label className="form__label" htmlFor="contactInfo">Contact Info</label>
                <input
                  type="text"
                  className={`admin__input__field ${formik.touched.contactInfo && formik.errors.contactInfo ? 'is-invalid' : ''}`}
                  placeholder="Contact Info"
                  name="contactInfo"
                  onChange={e => { handleChange(e) }}
                  onBlur={formik.handleBlur}
                  value={formik.values.contactInfo} />
              </div>

              {/* Hospital Hours Error Message */}
              {formik.touched.contactInfo && formik.errors.contactInfo ? (
                <div className="form__error">{formik.errors.contactInfo}</div>
              ) : (
                <div className="form__error-holder"><br /></div>
              )}
              {/* Hospital Image 1 Input */}
              <div>
                <label className="form__label">Hospital Image</label>
                {/* <div className="admin__file__input__div"> */}
                  <input
                    type="file"
                    className={`admin__file__input ${formik.touched.image && formik.errors.image ? 'is-invalid' : ''}`}
                    name="image"
                    onChange={e => { handleChange(e) }}
                    onBlur={formik.handleBlur}
                    value={formik.values.image} />
                {/* </div> */}
              </div>

              {/* Hospital Image 1 Error Message */}
              {formik.touched.image && formik.errors.image ? (
                <div className="form__error">{formik.errors.image}</div>
              ) : (
                <div className="form__error-holder"><br /></div>
              )}

              {/* Hospital Overview Input */}
              <div className="formfield">
                <label className="form__label" htmlFor="overview">Overview</label>
                <textarea
                  type="text"
                  className={`admin__textarea__field ${formik.touched.overview && formik.errors.overview ? 'is-invalid' : ''}`}
                  placeholder="Hospital Overview"
                  name="overview"
                  onChange={e => { handleChange(e) }}
                  onBlur={formik.handleBlur}
                  value={formik.values.overview} />
              </div>

              {/* Hospital Overview Error Message */}
              {formik.touched.overview && formik.errors.overview ? (
                <div className="form__error">{formik.errors.overview}</div>
              ) : (
                <div className="form__error-holder"><br /></div>
              )}

              <br />
                <button type="submit" className="admin__button" >
                  Add Hospital
                </button>
            </form>
            </center>
        </div>
    </div>
  )
}

export default InsertHospital