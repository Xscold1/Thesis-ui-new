import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";

function PatientStep4(props) {
  const [breadcrumbProgress, setBreadcrumbProgress] = useState(
		JSON.parse(localStorage.getItem("breadcrumbProgress")) 
  );

  const updateCrumb = () => {
		setBreadcrumbProgress(prevInfo => ({
			...prevInfo,
			twoQuarters: true
		}));
	}

	React.useEffect(() => {
		localStorage.setItem("breadcrumbProgress", JSON.stringify(breadcrumbProgress))
	}, [breadcrumbProgress])

  const back = e => {
      e.preventDefault();
      props.prevStep();
  };
  
      const { values, handleChange } = props;

      const addressArr = values.address.split(', ');
      return (
        <center>
          <div className="main__content">
          {/* <p className="step__indicator">Step 2 out of 2</p> */}
          <p className="step__indicator">Step 2/2</p>
            <div className="table__div">
              <h4>Confirm Inputs</h4>

              
                <table className="table table__border">
                  <thead>
                    <tr>
                      <th scope="col">User Info Field</th>
                      <th className="text-center" scope="col">Input</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className="table__data" scope="row">&nbsp; Sex</th>
                      <td className="text-center"> {values.sex} </td>
                    </tr>  
                    <tr>
                      <th className="table__data" scope="row">&nbsp; Age</th>
                      <td className="text-center"> {values.ageNumber} </td>
                    </tr>  
                    <tr>
                      <th className="table__data" scope="row">&nbsp; Address (Barangay)</th>
                      <td className="text-center"> {`${addressArr[0]}`} </td>
                    </tr>  
                    {/* <tr>
                      <th className="table__data" scope="row">&nbsp; Address (Municipality)</th>
                      <td className="text-center"> {`${addressArr[1]}`} </td>
                    </tr>  
                    <tr>
                      <th className="table__data" scope="row">&nbsp; Address (Province)</th>
                      <td className="text-center"> {`${addressArr[2]}`} </td>
                    </tr>   */}
                    <tr>
                      <th className="table__data" scope="row">&nbsp; Regular Exercise</th>
                      <td className="text-center"> {values.exercise} </td>
                    </tr>  
                    <tr>
                      <th className="table__data" scope="row">&nbsp; Good Posture</th>
                      <td className="text-center"> {values.posture} </td>
                    </tr>  
                    <tr>
                      <th className="table__data" scope="row">&nbsp; Healthy Diet</th>
                      <td className="text-center"> {values.healthyDiet} </td>
                    </tr>  
                    <tr>
                      <th className="table__data" scope="row">&nbsp; Smokes Cigarettes</th>
                      <td className="text-center"> {values.smoker} </td>
                    </tr>  
                    
                  </tbody>
                </table>

                <br /><br />
                
            </div>
                
          </div>

          <div className="patient-info__buttons">
            <a className="patient-info__prev" onClick={back}><i className="fas fa-arrow-left"></i>Previous</a>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
              <Link to="symptoms"><button className="patient-info__next" onClick={updateCrumb}>Next {`>`}</button></Link> 
          </div>

          {/* <a className="patient__next__page" onClick={updateCrumb} href="symptoms">Next <span>&#x3009;</span></a> */}

        </center>
      );
  }
  
  export default PatientStep4;