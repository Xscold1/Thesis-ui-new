import React, { useState, useEffect } from 'react'
import axios from 'axios';

// Styling
import './AdminDiseases.scss'

//Dependencies
import { useHistory, Link, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Constants
import { STATUS_CODES, ERROR_MSG, SUCCESS_MSG } from '../../../constants/status-constants';

// Mixins
import { successToast, errorToast } from '../../../mixins/utils/toastMessageMixins';

// Schemas
import { insertDiseaseSchema } from '../../../schemas/insertDiseaseSchema';

// Utils
import authenticate from '../../../utils/authenticate';

//Initial Values for Formik
// const initialValues = {
// 	diseaseName: "",
//   // diseaseReference: "",
//   diseaseSpecialist: "",
//   diseaseOverview: "",
//   diseaseHistory: "",
//   diseaseTreatments: "",
//   diseaseSymptoms: ""
// };

function EditDisease() {
  const auth_token = localStorage.getItem('auth_token')
  useEffect(()=>{
    authenticate();
  },[]);

  const location = useLocation();
  let history = useHistory();
	const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);

  const [initialValues, setInitialValues] = useState({
    diseaseName: "",
    // diseaseReference: "",
    diseaseSpecialist: "",
    diseaseOverview: "",
    diseaseHistory: "",
    diseaseTreatments: "",
    diseaseSymptoms: ""
  });

  const diseaseName = location.search;
  console.log ('diseaseName2', diseaseName);

  React.useEffect(() => {
    const fetchDiseaseInformation = async () => {
    const resultName = await axios.get(`${process.env.REACT_APP_API_URL}/disease/get-disease-information${diseaseName}`);

    const { data, status, status_code } = resultName.data.response;

    // console.log('errsult', data)

    const filteredSymptoms1 = (data.symptoms).replace(/"/g, '');
    const filteredSymptoms2 = filteredSymptoms1.replace(/[\[\]']+/g,'');
    // console.log('filteredSymptoms', filteredSymptoms2)

    setInitialValues({
      diseaseName: data.diseaseName,
      diseaseSpecialist: data.specialists,
      diseaseOverview: data.overview,
      diseaseHistory: data.history,
      diseaseTreatments: data.treatment,
      diseaseSymptoms: filteredSymptoms2
    })

    } 

    fetchDiseaseInformation();
  }, [])

  React.useEffect(() => {
    
  }, [initialValues])

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
    
      try {
        const queryParams = new URLSearchParams(location.search)
        const data = {
          diseaseName: values.diseaseName,
          symptoms: values.diseaseSymptoms.split(','),
          // diseaseReference: values.diseaseReference,
          // specialistDoctor: values.diseaseSpecialist.split(','),
          specialistDoctor: values.diseaseSpecialist,
          overview: values.diseaseOverview,
          history: values.diseaseHistory,
          treatment: values.diseaseTreatments,
        }
        // actions.setSubmitting(false);
        const insertDiseaseRes = await axios.put(`${process.env.REACT_APP_API_URL}/disease/update-disease-information${diseaseName}`,data, {
          headers: {
              Authorization: `Bearer ${auth_token}`
          }
        });
        console.log('insertDiseaseRes', insertDiseaseRes)
  
        if (insertDiseaseRes.data.status_code === 200) {
          actions.setSubmitting(true);
            successToast('Successfully updated disease information')
            history.push('/admin/view-diseases')
            actions.resetForm()
        } else {
          actions.setSubmitting(false);
            errorToast('Failed to update disease information');
        }
  
        
      } catch (err) {
        console.log(err)
        errorToast(ERROR_MSG.INTERNAL_ERROR_TITLE)
      }
    },
    validationSchema: insertDiseaseSchema,
  });
  
  useEffect(() => {
    // Effect Hooks
    return () => {
      // Clean up Function
    };
  }, []);

  const handleChange = (event) => {
    formik.handleChange(event);
    setIsInvalidCredentials(false);
  }

  return (
    <div className="admin__disease__content">
      <h1 className="header__title">Edit disease information</h1>
      <h5 className="form__header">Lung Disease Details</h5>

        <div className="form__container">
          <center>
          <form onSubmit={formik.handleSubmit}>

              {/* Disease Name Input */}
              <div>
                <label className="form__label" htmlFor="diseaseName">Disease Name</label>
                <input
                  type="text"
                  className={`admin__input__field admin__disease__field ${formik.touched.diseaseName && formik.errors.diseaseName ? 'is-invalid' : ''}`}
                  placeholder="Disease Name"
                  name="diseaseName"
                  onChange={e => { handleChange(e) }}
                  onBlur={formik.handleBlur}
                  value={formik.values.diseaseName} />
              </div>

              {/* Disease Name Error Message */}
              {formik.touched.diseaseName && formik.errors.diseaseName ? (
                <div className="form__error">{formik.errors.diseaseName}</div>
              ) : (
                <div className="form__error-holder"><br /></div>
              )}


              {/* <div>
                <label className="form__label" htmlFor="diseaseName">Reference</label>
                <input
                  type="text"
                  className={`admin__input__field admin__disease__field ${formik.touched.diseaseReference && formik.errors.diseaseReference ? 'is-invalid' : ''}`}
                  placeholder="Disease Reference"
                  name="diseaseReference"
                  onChange={e => { handleChange(e) }}
                  onBlur={formik.handleBlur}
                  value={formik.values.diseaseReference} />
              </div>

              {formik.touched.diseaseReference && formik.errors.diseaseReference ? (
                <div className="form__error">{formik.errors.diseaseReference}</div>
              ) : (
                <div className="form__error-holder"><br /></div>
              )} */}

              {/* Disease Specialist Input */}
              <div>
                <label className="form__label" htmlFor="diseaseName">Specialist</label>
                <input
                  type="text"
                  className={`admin__input__field admin__disease__field ${formik.touched.diseaseSpecialist && formik.errors.diseaseSpecialist ? 'is-invalid' : ''}`}
                  placeholder="Disease Specialist"
                  name="diseaseSpecialist"
                  onChange={e => { handleChange(e) }}
                  onBlur={formik.handleBlur}
                  value={formik.values.diseaseSpecialist} />
              </div>

              {/* Disease Specialist Error Message */}
              {formik.touched.diseaseSpecialist && formik.errors.diseaseSpecialist ? (
                <div className="form__error">{formik.errors.diseaseSpecialist}</div>
              ) : (
                <div className="form__error-holder"><br /></div>
              )}

              <div>
                <label className="form__label" htmlFor="diseaseName">Disease Symptoms</label>
                <input
                  type="text"
                  className={`admin__input__field admin__disease__field ${formik.touched.diseaseSymptoms && formik.errors.diseaseSymptoms ? 'is-invalid' : ''}`}
                  placeholder="Disease Symptoms"
                  name="diseaseSymptoms"
                  onChange={e => { handleChange(e) }}
                  onBlur={formik.handleBlur}
                  value={formik.values.diseaseSymptoms} />
              </div>

              {/* Disease Specialist Error Message */}
              {formik.touched.diseaseSymptoms && formik.errors.diseaseSymptoms ? (
                <div className="form__error">{formik.errors.diseaseSymptoms}</div>
              ) : (
                <div className="form__error-holder"><br /></div>
              )}


              {/* Disease Overview Input */}
              <div className="formfield">
                <label className="form__label" htmlFor="diseaseOverview">Overview</label>
                <textarea
                  type="text"
                  className={`admin__textarea__field ${formik.touched.diseaseOverview && formik.errors.diseaseOverview ? 'is-invalid' : ''}`}
                  placeholder="Disease Overview"
                  name="diseaseOverview"
                  onChange={e => { handleChange(e) }}
                  onBlur={formik.handleBlur}
                  value={formik.values.diseaseOverview} />
              </div>

              {/* Disease Overview Error Message */}
              {formik.touched.diseaseOverview && formik.errors.diseaseOverview ? (
                <div className="form__error">{formik.errors.diseaseOverview}</div>
              ) : (
                <div className="form__error-holder"><br /></div>
              )}


              {/* Disease History Input */}
              <div className="formfield">
                <label className="form__label" htmlFor="diseaseHistory">History</label>
                <textarea
                  type="text"
                  className={`admin__textarea__field ${formik.touched.diseaseHistory && formik.errors.diseaseHistory ? 'is-invalid' : ''}`}
                  placeholder="Disease History"
                  name="diseaseHistory"
                  onChange={e => { handleChange(e) }}
                  onBlur={formik.handleBlur}
                  value={formik.values.diseaseHistory} />
              </div>

              {/* Disease History Error Message */}
              {formik.touched.diseaseHistory && formik.errors.diseaseHistory ? (
                <div className="form__error">{formik.errors.diseaseHistory}</div>
              ) : (
                <div className="form__error-holder"><br /></div>
              )}


              {/* Disease Treatments Input */}
              <div className="formfield">
                <label className="form__label" htmlFor="diseaseTreatments">Treatments</label>
                <textarea
                  type="text"
                  className={`admin__textarea__field ${formik.touched.diseaseTreatments && formik.errors.diseaseTreatments ? 'is-invalid' : ''}`}
                  placeholder="Disease Treatments"
                  name="diseaseTreatments"
                  onChange={e => { handleChange(e) }}
                  onBlur={formik.handleBlur}
                  value={formik.values.diseaseTreatments} />
              </div>

              {/* Disease Treatments Error Message */}
              {formik.touched.diseaseTreatments && formik.errors.diseaseTreatments ? (
                <div className="form__error">{formik.errors.diseaseTreatments}</div>
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

export default EditDisease