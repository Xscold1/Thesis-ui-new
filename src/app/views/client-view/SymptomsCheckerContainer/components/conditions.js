import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";

import axios from 'axios';
import { sample } from "lodash";

// Components
import Modal from './Modal'

function Conditions() {
  const symptomList = JSON.parse(localStorage.getItem("symptomsList"));
  const patientInfo = JSON.parse(localStorage.getItem("patientInfo"));
  const [breadcrumbProgress, setBreadcrumbProgress] = useState(
		JSON.parse(localStorage.getItem("breadcrumbProgress")) 
  );

  const [modalOpen, setModalOpen] = useState(false);
  const user_email = localStorage.getItem('user_email');

  const firstRender = () => {
		setBreadcrumbProgress(prevInfo => ({
			...prevInfo,
      twoQuarters: true,
			threeQuarters: true,
		}));
	}

  const constant = 0;

  
  const [highlightedResult, setHighlightedResult] = useState(
    JSON.parse(localStorage.getItem("highlightedResult")) || {
      resultId:'',
    });
    
    const [diseaseDetails, setDiseaseDetails] = useState({
      specialist: '',
      overview: '',
      history: '',
      treatment: ''
    });
    
    // console.log('diseaseDetails', diseaseDetails);

  React.useEffect(() => {
    localStorage.setItem("highlightedResult", JSON.stringify(highlightedResult))

    const fetchDiseaseInformation = async () => {
      const resultName = await axios.get(`${process.env.REACT_APP_API_URL}/disease/get-disease-information?diseaseName=${highlightedResult.resultId}`);
    
    // console.log('Data', resultName)

    const { data, status, status_code } = resultName.data.response;

    // console.log('disease Data Overview: ', data.overview);
    // console.log('disease Data History: ', data.history);
    // console.log('disease Data Treatment: ', data.treatment);

    setDiseaseDetails({
      specialist: data.specialists,
      overview: data.overview,
      history: data.history,
      treatment: data.treatment
    })
    } 

    fetchDiseaseInformation();
  }, [highlightedResult])

  React.useEffect(() => {
    firstRender()
  }, [constant])

  const updateCrumb = () => {
		setBreadcrumbProgress(prevInfo => ({
			...prevInfo,
      fourQuarters: true
		}));
	}

	React.useEffect(() => {
		localStorage.setItem("breadcrumbProgress", JSON.stringify(breadcrumbProgress))
	}, [breadcrumbProgress])

  const [conditions, setConditions] = useState(
    "Looking good! Your symptoms does not match any data on our system"
  );

  const addressArr = patientInfo.address.split(', ');

  const fetchConditions = async () => {
    const payload = {
      gender: patientInfo.sex,
      age: Number(patientInfo.ageNumber),
      address: {
        country: "Philippines",
        region: "Region III",
        province: addressArr[2],
        municipality: addressArr[1],  
        barangay: addressArr[0]
      },
      additionalInfo: {
        smoker: patientInfo.smoker === "Yes" ? true : false,
        exercise: patientInfo.exercise === "Yes" ? true : false,
        posture:  patientInfo.posture === "Yes" ? true : false,
        healthyDiet:  patientInfo.healthyDiet === "Yes" ? true : false
      },
      symptoms: symptomList,
    };

    const predictRes = await axios.post(`${process.env.REACT_APP_API_URL}/symptom-checker/predict?email=${user_email}`,payload);
    
    // console.log('predict', predictRes)

    const { data, status, status_code } = predictRes.data.response;

    console.log('dataresponse', data.response)

    setConditions(data.response);
  };

  useEffect(() => {
    fetchConditions();
  }, []);

  // console.log('modalopen', modalOpen);
  // console.log(highlightedResult.resultId === '')

  // For Condition Percentage and Decimals
  function roundToTwo(num) {
    num = num*100;
    return +(Math.round(num + "e+2")  + "e-2");
  }

  return (
    <center>
      {modalOpen && <Modal setOpenModal={setModalOpen} />}
      <div className="main__content">
        {/* <p className="step__indicator">Step 1 out of 1</p> */}
        <p className="step__indicator">Step 1/1</p>

        <p className="sex__title">Possible conditions</p>

        <p className="condition__text">
          Please keep in mind that the list below is not conclusive and is
          provided solely for informational purposes, not as a substitute for
          medical advice. <br></br><span onClick={() => { setModalOpen(true); }} className="results__modal__link">Understanding your results.<i className="fas fa-info-circle" /></span>
        </p>
        
        { conditions && Object.keys(conditions).length>0 && <div className="condition__results">
          {conditions && Object.keys(conditions).length>0 &&
          typeof conditions === "object" &&
          Object.keys(conditions).length &&
          Object.keys(conditions).map((condition) => (
            <div style={{cursor:'pointer'}} onClick={() => setHighlightedResult( {
              resultId: condition, 
            })} className={`conditions__div ${ condition === highlightedResult.resultId ? 'highlighted__result' : ''}`}>
              <a className="condition__result" href="#"> { condition } &nbsp; </a>

              {/* Results div */}
              <div className="progress-segment">
                <div className={`item ${conditions[condition] > 0 ? 'fill-bar' : 'hollow-bar'} `}></div>
                <div className={`item ${conditions[condition] >= 0.25 ? 'fill-bar' : 'hollow-bar'} `}></div>
                <div className={`item ${conditions[condition] >= 0.50 ? 'fill-bar' : 'hollow-bar'} `}></div>
                <div className={`item ${conditions[condition] >= 0.75 ? 'fill-bar' : 'hollow-bar'} `}></div>
              </div>
              <div className="point-right" />

              <p className="right-bracket">&#x3009;</p>

              <p className="match__strength">
                {
                  // conditions[condition] >= 0.75 ? `STRONG MATCH (${roundToTwo(conditions[condition])}%)` :
                  // conditions[condition] >= 0.50 ? `MODERATE MATCH (${roundToTwo(conditions[condition])}%)` :
                  // conditions[condition] >= 0.25 ? `FAIR MATCH (${roundToTwo(conditions[condition])}%)` :
                  // conditions[condition] > 0 ? `LOW MATCH (${roundToTwo(conditions[condition])}%)` :
                  // 'NO MATCH'
                  conditions[condition] >= 0.75 ? `STRONG MATCH ` :
                  conditions[condition] >= 0.50 ? `MODERATE MATCH ` :
                  conditions[condition] >= 0.25 ? `FAIR MATCH ` :
                  conditions[condition] > 0 ? `LOW MATCH ` :
                  'NO MATCH'
                }

                {/* <b>({roundToTwo(conditions[condition])}%)</b> */}
              </p>

            </div>
          ))}

        </div> 
        }

        { conditions && Object.keys(conditions).length>0 && highlightedResult.resultId !== '' ? 
            <div className="results__info">
              <h4>{highlightedResult.resultId}</h4>
              <p className="justified result__details"><span>Specialist </span><br />{diseaseDetails.specialist}</p>
              <p className="justified result__details"><span>Overview</span><br />{diseaseDetails.overview}</p>
              <p className="justified result__details"><span>History</span><br />{diseaseDetails.history}</p>
              {/* <p className="justified result__details"><span>Reference</span><br />Sample Reference</p> */}
            </div>
        : conditions && Object.keys(conditions).length>0 && highlightedResult.resultId === '' ?
            <div className="results__info">
              <h4 className="results__boilerplate">Select a result for details</h4>
            </div> 
        : 
            <div className="no__conditions">
              <p>Looking good! Your symptoms do not match any data on our system</p>
            </div>
        }

      </div>

      {/* <a className="conditions__prev__page" href="symptoms">
        <span>〈 </span> Previous
      </a>
      <a className={`conditions__next__page ${highlightedResult.resultId !== '' ? '' : 'disabled__next'}`} onClick={updateCrumb} href="treatments">
        Next <span>&#x3009;</span>
      </a> */}

      <div className="conditions__button__div">
        <Link className="conditionss__prev__page" to="symptoms"><i className="fas fa-arrow-left"></i>Previous</Link>
        {/* <a className={`symptoms__next__page ${highlightedResult.resultId !== '' ? '' : 'disabled__next'}`} onClick={updateCrumb} href="treatments"><button className="patient-info__next">Next {`>`}</button></a> */}
        <Link className={`conditionss__next__page`} onClick={updateCrumb} to="../hospital-finder"><button className="condition__next">Hospital Finder {`>`}</button></Link>
      </div>

    </center>
  );
}

export default Conditions;