import React, { useState } from 'react'
import axios from 'axios';

function TreatmentsPage2(props) {
    const proceed = e => {
        e.preventDefault();
        props.nextPage();
    };

    const back = e => {
        e.preventDefault();
        props.prevPage();
    };

    const [highlightedResult, setHighlightedResult] = useState(
        JSON.parse(localStorage.getItem("highlightedResult")) || {
          resultId:'',
    });

    const [diseaseDetails, setDiseaseDetails] = useState({
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
        treatment: data.treatment
      })
      } 
  
      fetchDiseaseInformation();
    }, [highlightedResult])

    // console.log('local', highlightedResult)
    console.log('diseaseDetails', diseaseDetails);
    
    return (
        // <div className="main__content">
        //     <p className="step__indicator">Step 2/3</p>

        //     <p className="sex__title">Treatment</p>

        //     <p className="treatment__text">{diseaseDetails.treatment}</p>

        //         <hr className="treatment__hr" />

 
        //     <div className="treatments__div">
                

        //     </div>

        //     <div className="treatment__buttons">
        //         <a className="treatment__prev" onClick={back}><i className="fas fa-arrow-left"></i>Previous</a>
        //         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        //         <button className="treatment__next" onClick={proceed}>Next</button> 
        //     </div>
        // </div>

        <div className="main__content">
            {/* <p className="step__indicator">Step 2 out of 3</p> */}
            <p className="step__indicator">Step 2/3</p>

            <p className="sex__title">Treatment</p>
                <hr className="treatment__hr" />

            <div className="treatment__text__div">
            <p className="treatment__text">{diseaseDetails.treatment}</p>
            </div>
            


 
            {/* <div className="treatments__div">
                

            </div> */}

            <div className="treatment__buttons">
                <a className="treatment__prev" onClick={back}><i className="fas fa-arrow-left"></i>Previous</a>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className="treatment__next" onClick={proceed}>Next {'>'}</button> 
            </div>
        </div>
    )
}

export default TreatmentsPage2