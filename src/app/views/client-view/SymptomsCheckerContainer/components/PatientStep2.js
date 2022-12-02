import React from 'react';

function PatientStep2(props) {
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
            <p className="step__indicator">Step 2/5</p>

                <label className="age__label">Enter Age:</label><br /><br />

                <div className="age__dropdown__div">

                <input name="number" id="number" type="number" 
                    /* start of 2-digit limit JS code */ onInput={(e) => {
                    if (e.target.value.length > e.target.maxLength)
                      e.target.value = e.target.value.slice(0,e.target.maxLength);
                    }}
                      maxLength = {2} 
                    /* end of 2-digit limit JS code */
                    className="age__dropdown__number" onChange={handleChange('ageNumber')} value={values.ageNumber} />
                &nbsp;&nbsp;
                <select className="age__dropdown__monthyear" onChange={handleChange('ageMonthYear')} name="monthyear" id="monthyear" value={values.ageMonthYear}>
                    <option value="" hidden disabled selected>Month/Year</option>

                    <option value="Month" disabled={values.ageNumber>12 ? 'disabled' : 'disabled'}>Month(s)</option>
                    <option value="Year">Year(s)</option>
                    
                </select>
                </div>

                <br /><br /><br />
                {/* <p className="patientAge__error">{ values.ageNumber < 18 && values.ageNumber && values.ageMonthYear ? `Must be 18 years old and above to proceed.` : values.ageNumber === '' ? `` : ``}&nbsp;</p> */}
                {values.ageNumber < 18 && values.ageNumber && values.ageMonthYear && <p className="patientAge__error"> Must be 18 years old and above to proceed.&nbsp;</p>}
                {values.ageNumber < 18 && values.ageNumber && values.ageMonthYear && <p className="patientAge__guardian"> If you are the child's guardian however, <span onClick={proceed}>Click Here to Proceed</span>&nbsp;</p>}

          </div>

          <div className="patient-info__buttons">
            <a className="patient-info__prev" onClick={back}><i className="fas fa-arrow-left"></i>Previous</a>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button className="patient-info__next" disabled={values.ageNumber && values.ageMonthYear && values.ageNumber > 17 ? '' : 'disabled'} onClick={proceed}>Next</button> 
          </div>
        </center>
      );
  }
  
  export default PatientStep2;