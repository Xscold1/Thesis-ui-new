import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';

// Styling
import './AdminDoctorAffiliates.scss'

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
import { insertAffiliateSchema } from '../../../schemas/insertAffiliateSchema';

// Components
import timeData from './timeData';
import sampleHospitals from '../AdminHospitalsContainer/sampleHospitals';
import authenticate from '../../../utils/authenticate';

//Initial Values for Formik
const initialValues = {
	  hospitalName: "",
    contact: "",
    schedules: "Weekday:8 A.M. to 5 P.M.,Weekends:1 P.M. to 5 P.M.",
};

function AddAffiliate() {
  const auth_token = localStorage.getItem('auth_token')
  let history = useHistory();
	const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);

  const location = useLocation();
  const [doctorId, setDoctorId] = useState('');
  const[hospitals, setHospitals] = useState([])

  useEffect(() => {
    const idNum = location.search.substring(4)
    setDoctorId(idNum);
  }, [location]);



  const sampleHospitalList = hospitals.map(details => {
    return (
      <option key={details.name} value={details.name}>{details.name}</option>
    )
  })

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, actions) => {
      const queryParams = new URLSearchParams(location.search)
      const schedules = values.schedules.split(',');
      // console.log('schedules', schedules)
      const formattedSchedules = [];
      
      for(const schedule of schedules){
        const timeDay = schedule.split(':')

        formattedSchedules.push({day: timeDay[0],time: timeDay[1] })
      }
      console.log('formattedSchedules', formattedSchedules)
      // Weekday:8 A.M. to 5 P.M.,Weekends:1 P.M. to 5 P.M.

      try {
        const insertAffiliateRes = await axios.post(`${process.env.REACT_APP_API_URL}/doctor/create-affiliation/${queryParams.get("id")}`, {
          hospitalName: values.hospitalName,
          contactInfo: values.contact,
          schedules: formattedSchedules
        },{
          headers: {
              Authorization: `Bearer ${auth_token}`
          }
        });
        console.log('insertAffiliateRes', insertAffiliateRes)
        if (insertAffiliateRes.data.statusCode === 200) {
          actions.setSubmitting(true);
          successToast('Successfully added doctor affiliation')
          history.push('view-doctors')
          actions.resetForm()
        } else {
          actions.setSubmitting(false);
          errorToast('Failed to add doctor affiliation');
        }
  
        // console.log('insertAffiliateResStatus', insertAffiliateRes.data.response.data.status);
        
      } catch (err) {
        errorToast(ERROR_MSG.INTERNAL_ERROR_TITLE)
      }
    },
    validationSchema: insertAffiliateSchema,
  });
  
  useEffect(() => {
    const init = async ()=>{
      const hospitalRes = await axios.get(`${process.env.REACT_APP_API_URL}/hospital/get-all-hospital`, {
          headers: {
              Authorization: `Bearer ${auth_token}`
          }
        });

        let hospitalFormatted = hospitalRes.data.response.data;

        hospitalFormatted = hospitalFormatted.map(hospital =>{
          
          return {
              name: hospital.hospitalName,
          }
        })

        setHospitals(hospitalFormatted)
  }
  init()
    return () => {
      // Clean up Function
    };
  }, []);

  const handleChange = (event) => {
    formik.handleChange(event);
    setIsInvalidCredentials(false);
  }

  return (
    <div className="admin__average__content">
      <h1 className="header__title">Add an Affiliate</h1>

      <h5 className="form__header">Affiliate Details</h5>

        <div className="form__container">
          <center>
          <form onSubmit={formik.handleSubmit}>

              {/* Affiliate Name Input */}
              <div>
                <label className="form__label" htmlFor="hospitalName">Hospital Name</label>
                <select
                  type="text"
                  className={`admin__dropdown__field whole ${formik.touched.hospitalName && formik.errors.hospitalName ? 'is-invalid' : ''}`}
                  name="hospitalName"
                  onChange={e => { handleChange(e) }}
                  onBlur={formik.handleBlur}
                  value={formik.values.hospitalName} >

                  <option className="placehold" value="" hidden disabled="disabled" selected>Affiliate Name</option>
                  { sampleHospitalList }
                </select>
              </div>

              {/* Affiliate Name Error Message */}
              {formik.touched.hospitalName && formik.errors.hospitalName ? (
                <div className="form__error">{formik.errors.hospitalName}</div>
              ) : (
                <div className="form__error-holder"><br /></div>
              )}


              {/* Affiliate Contact Input */}
              <div>
                <label className="form__label" htmlFor="contact">Contact No.</label>
                <input
                  type="text"
                  className={`admin__input__field black__placeholder ${formik.touched.contact && formik.errors.contact ? 'is-invalid' : ''}`}
                  placeholder="Affiliate Contact No."
                  name="contact"
                  onChange={e => { handleChange(e) }}
                  onBlur={formik.handleBlur}
                  value={formik.values.contact} />
              </div>

              {/* Affiliate Contact Error Message */}
              {formik.touched.contact && formik.errors.contact ? (
                <div className="form__error">{formik.errors.contact}</div>
              ) : (
                <div className="form__error-holder"><br /></div>
              )}
              <div>
                <label className="form__label" htmlFor="contact">Schedules</label>
                <input
                  type="text"
                  className={`admin__input__field black__placeholder ${formik.touched.schedules && formik.errors.schedules ? 'is-invalid' : ''}`}
                  placeholder="Weekday: 8 A.M. to 5 P.M., Weekends: 1 P.M. to 5 P.M."
                  name="schedules"
                  onChange={e => { handleChange(e) }}
                  onBlur={formik.handleBlur}
                  value={formik.values.schedules} />
              </div>

              {/* Affiliate Contact Error Message */}
              {formik.touched.schedules && formik.errors.schedules ? (
                <div className="form__error">{formik.errors.schedules}</div>
              ) : (
                <div className="form__error-holder"><br /></div>
              )}
              <br />
                <button type="submit" className="add__affiliate__button" >
                  Add Affiliate
                </button>
            </form>
            </center>
        </div>
    </div>
  )
}

export default AddAffiliate