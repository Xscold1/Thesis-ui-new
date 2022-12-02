import React, { useState, useEffect } from 'react'
import axios from 'axios';

// Styling
import './AdminDatasetsContainer.scss'

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
import { insertDatasetSchema } from '../../../schemas/insertDatasetSchema'

// Utils
import authenticate from '../../../utils/authenticate';

//Initial Values for Formik
const initialValues = {
	diseaseName: "",
    symptoms: "",
    age: "",
    gender: "",
    exercise: "",
    posture: "",
    smoker: "",
    unhealthyDiet: "",
};

function InsertDataset() {
  const auth_token = localStorage.getItem('auth_token')
  useEffect(()=>{
    authenticate();
  },[]);
  let history = useHistory();
	const [isInvalidCredentials, setIsInvalidCredentials] = useState(false);

  const formik = useFormik({
    initialValues,
    onSubmit: async (values, actions) => {
      const data = {
        disease: values.diseaseName,
        age: values.age,
        gender: values.gender,
        symptoms: values.symptoms.split(','),
        additionalInfo :{
          exercise: values.exercise,
          posture: values.posture,
          smoker: values.smoker,
          unhealthyDiet: values.unhealthyDiet,
        }
      }

        try {
          const insertDatasetRes = await axios.post(`${process.env.REACT_APP_API_URL}/dataset/add-dataset`,data, {
            headers: {
                Authorization: `Bearer ${auth_token}`
            }
          });
          console.log('insertDatasetRes', insertDatasetRes)
          if (insertDatasetRes.data.status_code === 200) {
            actions.setSubmitting(true);
            successToast('Successfully added dataset')
            actions.resetForm()
          } else {
            actions.setSubmitting(false);
            errorToast('Failed to add dataset');
          }
        } catch (err) {
          errorToast(ERROR_MSG.INTERNAL_ERROR_TITLE)
        }
    },
    validationSchema: insertDatasetSchema,
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
    <div className="admin__dataset__content">
      <h1 className="header__title">Add a Dataset</h1>
      <h5 className="form__header">Dataset Details</h5>

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

              {/* Age Input */}
              <div>
                <label className="form__label" htmlFor="age">Age</label>
                <input
                  type="text"
                  className={`admin__input__field admin__disease__field ${formik.touched.age && formik.errors.age ? 'is-invalid' : ''}`}
                  placeholder="Age"
                  name="age"
                  onChange={e => { handleChange(e) }}
                  onBlur={formik.handleBlur}
                  value={formik.values.age} />
              </div>

              {/* Age Error Message */}
              {formik.touched.age && formik.errors.age ? (
                <div className="form__error">{formik.errors.age}</div>
              ) : (
                <div className="form__error-holder"><br /></div>
              )}

              {/* Sex Input */}
              <div>
                <label className="form__label" htmlFor="exercise">Sex</label>
                <select
                  className={`dataset__dropdown__field  whole ${formik.touched.gender && formik.errors.gender ? 'is-invalid' : ''}`}
                  name="gender"
                  onChange={e => { handleChange(e) }}
                  onBlur={formik.handleBlur}
                  value={formik.values.gender}>
                    <option value="" hidden disabled="disabled" selected></option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
              </div>

              {/* Sex Error Message */}
              {formik.touched.gender && formik.errors.gender ? (
                <div className="form__error">{formik.errors.gender}</div>
              ) : (
                <div className="form__error-holder"><br /></div>
              )}

              {/* Does Exercise Input */}
              <div>
                <label className="form__label" htmlFor="exercise">Does Exercise</label>
                <select
                  className={`dataset__dropdown__field  whole ${formik.touched.exercise && formik.errors.exercise ? 'is-invalid' : ''}`}
                  name="exercise"
                  onChange={e => { handleChange(e) }}
                  onBlur={formik.handleBlur}
                  value={formik.values.exercise}>
                    <option value="" hidden disabled="disabled" selected></option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
              </div>

              {/* Does Exercise Error Message */}
              {formik.touched.exercise && formik.errors.exercise ? (
                <div className="form__error">{formik.errors.exercise}</div>
              ) : (
                <div className="form__error-holder"><br /></div>
              )}

              {/* Does Posture Input */}
              <div>
                <label className="form__label" htmlFor="posture">Good Posture</label>
                <select
                  className={`dataset__dropdown__field  whole ${formik.touched.posture && formik.errors.posture ? 'is-invalid' : ''}`}
                  name="posture"
                  onChange={e => { handleChange(e) }}
                  onBlur={formik.handleBlur}
                  value={formik.values.posture}>
                    <option value="" hidden disabled="disabled" selected></option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
              </div>

              {/* Does Posture Error Message */}
              {formik.touched.posture && formik.errors.posture ? (
                <div className="form__error">{formik.errors.posture}</div>
              ) : (
                <div className="form__error-holder"><br /></div>
              )}

              {/* Does Smoke Input */}
              <div>
                <label className="form__label" htmlFor="smoker">Smokes Cigarettes</label>
                <select
                  className={`dataset__dropdown__field  whole ${formik.touched.smoker && formik.errors.smoker ? 'is-invalid' : ''}`}
                  name="smoker"
                  onChange={e => { handleChange(e) }}
                  onBlur={formik.handleBlur}
                  value={formik.values.smoker}>
                    <option value="" hidden disabled="disabled" selected></option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
              </div>

              {/* Does Smoke Error Message */}
              {formik.touched.smoker && formik.errors.smoker ? (
                <div className="form__error">{formik.errors.smoker}</div>
              ) : (
                <div className="form__error-holder"><br /></div>
              )}

              {/* Healthy Diet Input */}
              <div>
                <label className="form__label" htmlFor="unhealthyDiet">Healthy Diet</label>
                <select
                  className={`dataset__dropdown__field  whole ${formik.touched.unhealthyDiet && formik.errors.unhealthyDiet ? 'is-invalid' : ''}`}
                  name="unhealthyDiet"
                  onChange={e => { handleChange(e) }}
                  onBlur={formik.handleBlur}
                  value={formik.values.unhealthyDiet}>
                    <option value="" hidden disabled="disabled" selected></option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
              </div>

              {/* Healthy Diet Error Message */}
              {formik.touched.unhealthyDiet && formik.errors.unhealthyDiet ? (
                <div className="form__error">{formik.errors.unhealthyDiet}</div>
              ) : (
                <div className="form__error-holder"><br /></div>
              )}

              {/* Dataset Symptoms Input */}
              <div className="formfield">
                <label className="form__label" htmlFor="symptoms">Symptoms</label>
                <textarea
                  type="text"
                  className={`admin__textarea__field ${formik.touched.symptoms && formik.errors.symptoms ? 'is-invalid' : ''}`}
                  placeholder="Symptoms List"
                  name="symptoms"
                  onChange={e => { handleChange(e) }}
                  onBlur={formik.handleBlur}
                  value={formik.values.symptoms} />
              </div>

              {/* Dataset Symptoms Error Message */}
              {formik.touched.symptoms && formik.errors.symptoms ? (
                <div className="form__error">{formik.errors.symptoms}</div>
              ) : (
                <div className="form__error-holder"><br /></div>
              )}

              <br />
                <button type="submit" className="admin__button" >
                  Add Dataset
                </button>
            </form>
            </center>
        </div>
    </div>
  )
}

export default InsertDataset