import React, { useState, useEffect } from 'react'
import axios from 'axios';

// Styling
import './AdminHospitals.scss'

//Dependencies
import { useHistory, useLocation, Link } from "react-router-dom";
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
// const initialValues = {
//   hospitalName: "",
//   barangay: "",
//   province: "",
//   municipality: "",
//   street: "",
//   zip: "",
//   image: "",
//   longitude: "",
//   latitude: "",
//   overview: "",
//   contactInfo: "",
// };

function EditHospital() {
  const location = useLocation();

  const [initialValues, setInitialValues] = useState({
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
  });

  const idNum = location.search.substring(4);
  const [hospitalId, setHospitalId] = useState('');
  const [hospitalIm, setHospitalIm] = useState(null)

    React.useEffect(() => {
      const fetchHospitalInformation = async () => {
      const resultName = await axios.get(`${process.env.REACT_APP_API_URL}/hospital/get-hospital-by-id?id=${idNum}`);

      const { data, status, status_code } = resultName.data.response;

      console.log('deta', data.Hospital_Data)

      setInitialValues({
        hospitalName: data.Hospital_Data.HospitalName,
        barangay: data.Hospital_Data.barangay,
        province: data.Hospital_Data.province,
        municipality: data.Hospital_Data.municipality,
        street: data.Hospital_Data.street,
        zip: data.Hospital_Data.zip,
        image: hospitalIm,
        longitude: data.Hospital_Data.longitude,
        latitude: data.Hospital_Data.latitude,
        overview: data.Hospital_Data.overview,
        contactInfo: data.Hospital_Data.contactInfo,
      })

      } 

      fetchHospitalInformation();
    }, [])

    React.useEffect(() => {
      
    }, [initialValues])

    console.log('initialValues', initialValues)
  
  const auth_token = localStorage.getItem('auth_token')
  useEffect(()=>{
    authenticate();
  },[]);
  let history = useHistory();
	const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);

  const changeTab = (path, id) => {
    // history.push(path);

    history.push({
      pathname: path,
      search: `${id}`,
    })}

  useEffect(() => {
    //  console.log(location.search); // result: '?id={number}'
      setHospitalId(location.search)
  }, [location]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      console.log('values', values)
     
      try {
        const queryParams = new URLSearchParams(location.search)
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
        
        const updateHospitalRes = await axios.put(`${process.env.REACT_APP_API_URL}/hospital/update-hospital?id=${queryParams.get("id")}`, data, {
          

          headers: {
              Authorization: `Bearer ${auth_token}`
          }
        });
        console.log('updateHospitalRes', updateHospitalRes)
        if (updateHospitalRes.data.status_code === 200) {
          actions.setSubmitting(true);
          successToast('Successfully updated hospital')
          history.push('view-hospitals')
          actions.resetForm()
        } else {
          actions.setSubmitting(false);
          errorToast('Failed to update hospital');
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
      <h1 className="header__title">Edit Hospital</h1>
      <h1 className="header__title__second inactive__title  margin__left" onClick={() => changeTab('view-hospital-facilities', hospitalId)}>Facilities</h1>

      <h5 className="form__header">Update Hospital Details</h5>

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
                  Update
                </button>
            </form>
            </center>
        </div>
    </div>
  )
}

export default EditHospital