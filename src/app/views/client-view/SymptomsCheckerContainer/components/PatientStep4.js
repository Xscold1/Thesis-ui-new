import React from 'react';

function PatientStep3(props) {
    const proceed = e => {
      e.preventDefault();
      props.nextStep();
    };

    const back = e => {
        e.preventDefault();
        props.prevStep();
    };
  
      const { values, handleChange } = props;
      return (
        <center>
          <div className="main__content">
          {/* <p className="step__indicator">Step 1 out of 2</p> */}
          <p className="step__indicator">Step 1/2</p>
            <div className="table__div">
              <label className="step3__label">Please check all the statements below that apply to you</label><br /><br />

                <table className="table table__design">
                  <thead>
                    <tr>
                      <th scope="col">Select one answer in each row</th>
                      <th className="text-center" scope="col">Yes</th>
                      <th className="text-center" scope="col">No</th>
                      {/* <th className="text-center" scope="col">I don't know</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th className="table__data" scope="row">&nbsp; I regularly exercise</th>
                      <td className="text-center"><input onChange={handleChange('exercise')} type="radio" id="exerciseYes" name="exercise" value='Yes' checked={values.exercise === 'Yes'} /></td>
                      <td className="text-center"><input onChange={handleChange('exercise')} type="radio" id="exerciseNo" name="exercise" value='No' checked={values.exercise === 'No'} /></td>
                      {/* <td className="text-center"><input onChange={handleChange('exercise')} type="radio" id="exerciseDunno" name="exercise" value="Don't Know" checked={values.exercise === "Don't Know"} /></td> */}

                    </tr>
                    <tr>
                      <th className="table__data" scope="row">&nbsp; I maintain a relatively good posture</th>
                      <td className="text-center"><input onChange={handleChange('posture')} type="radio" id="postureYes" name="posture" value='Yes' checked={values.posture === 'Yes'} /></td>
                      <td className="text-center"><input onChange={handleChange('posture')} type="radio" id="postureNo" name="posture" value='No' checked={values.posture === 'No'} /></td>
                      {/* <td className="text-center"><input onChange={handleChange('posture')} type="radio" id="postureDunno" name="posture" value="Don't Know" checked={values.posture === "Don't Know"} /></td> */}

                    </tr>
                    <tr>
                      <th className="table__data" scope="row">&nbsp; I have a healthy diet</th>
                      <td className="text-center"><input onChange={handleChange('healthyDiet')} type="radio" id="healthyDietYes" name="healthyDiet" value='Yes' checked={values.healthyDiet === 'Yes'} /></td>
                      <td className="text-center"><input onChange={handleChange('healthyDiet')} type="radio" id="healthyDietNo" name="healthyDiet" value='No' checked={values.healthyDiet === 'No'} /></td>
                      {/* <td className="text-center"><input onChange={handleChange('healthyDiet')} type="radio" id="healthyDietDunno" name="healthyDiet" value="Don't Know" checked={values.healthyDiet === "Don't Know"} /></td> */}

                    </tr>
                    <tr>
                      <th className="table__data" scope="row">&nbsp; I smoke cigarettes</th>
                      <td className="text-center"><input onChange={handleChange('smoker')} type="radio" id="SmokingYes" name="smoking" value='Yes' checked={values.smoker === 'Yes'} /></td>
                      <td className="text-center"><input onChange={handleChange('smoker')} type="radio" id="SmokingNo" name="smoking" value='No' checked={values.smoker === 'No'} /></td>
                      {/* <td className="text-center"><input onChange={handleChange('smoker')} type="radio" id="SmokingDunno" name="smoking" value="Don't Know" checked={values.smoker === "Don't Know"} /></td> */}

                    </tr>
                  </tbody>
                </table>

                <br /><br />
            
            </div>
            
          </div>

          <div className="patient-info__buttons">
            {/* <a className="patient-info__prev" onClick={back}><i className="fas fa-arrow-left"></i>Previous</a>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
            <button className="patient-info__next" disabled={values.exercise && values.posture && values.smoker && values.healthyDiet ? '' : 'disabled'} onClick={proceed}>Next {`>`}</button> 
          </div>
        </center>
      );
  }
  
  export default PatientStep3;