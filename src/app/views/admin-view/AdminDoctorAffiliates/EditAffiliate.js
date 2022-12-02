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
import { updateAffiliateSchema } from '../../../schemas/updateAffiliateSchema';

// Components
import timeData from './timeData';
import sampleHospitals from '../AdminHospitalsContainer/sampleHospitals';

// Utils
import authenticate from '../../../utils/authenticate';

//Initial Values for Formik
// const initialValues = {
//   contact: "",
//   schedules: "",
// };

function EditAffiliate() {
  const auth_token = localStorage.getItem('auth_token')
  useEffect(()=>{
    authenticate();
  },[]);
  let history = useHistory();

  const location = useLocation();
  const [facilityId, setFacilityId] = useState('');
  const[hospitals, setHospitals] = useState([])

  const [initialValues, setInitialValues] = useState({
    contact: "",
    schedules: "",
  });
  const idNum = location.search.substring(4)
  console.log('idNum', idNum);

  React.useEffect(() => {
    const fetchAffiliateInformation = async () => {
    const resultName = await axios.get(`${process.env.REACT_APP_API_URL}/doctor/get-doctor-affiliation-info/${idNum}`, {
      headers: {
          Authorization: `Bearer ${auth_token}`
      }
    });

    const { data, status, status_code } = resultName.data.response;

    console.log('newResult', data.schedules[1].time)

    setInitialValues({
      contact: data.contactInfo,
      schedules: `Weekday: ${data.schedules[1].time}, Weekends: ${data.schedules[1].time}`,
    })

    } 

    fetchAffiliateInformation();
  }, [])

  useEffect(() => {
    
    // setFacilityId(idNum);
    // console.log('outside facilityId', facilityId);
    
    // console.log('facilityId', facilityId);

    //  console.log(location.search); // result: '?id={number}'
      // setFacilityId(location.search)
  }, [location]);



  const timeList = props => timeData.map(details => {
    return (
      <option key={details.id} id={details.id} value={details.time} selected={details.time === props}>{details.time}</option>
    )
  })

  const sampleHospitalList = hospitals.map(details => {
    return (
      <option key={details.name} value={details.name}>{details.name}</option>
    )
  })

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      const queryParams = new URLSearchParams(location.search)
      const schedules = values.schedules.split(',');

      const formattedSchedules = [];
      
      for(const schedule of schedules){
        const timeDay = schedule.split(':')

        formattedSchedules.push({day: timeDay[0],time: timeDay[1] })
      }
      console.log('formattedSchedules', formattedSchedules)
      // Weekday: 8 A.M. to 5 P.M., Weekends: 1 P.M. to 5 P.M.

      try {
        const insertAffiliateRes = await axios.put(`${process.env.REACT_APP_API_URL}/doctor/update-affiliation/${queryParams.get("id")}`, {
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
          successToast('Successfully updated doctor affiliation')
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
    validationSchema: updateAffiliateSchema,
  });

  const handleChange = (event) => {
    formik.handleChange(event)
  }

  return (
    <div className="admin__average__content">
      <h1 className="header__title">Update Affiliate</h1>

      <h5 className="form__header">Edit Affiliate Details</h5>

        <div className="form__container">
          <center>
          <form onSubmit={formik.handleSubmit}>

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
                  Update
                </button>
            </form>
            </center>
        </div>
    </div>
  )
}

export default EditAffiliate