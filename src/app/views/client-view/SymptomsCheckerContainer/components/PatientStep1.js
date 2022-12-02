import React from 'react';


function PatientStep1(props) {
  const proceed = e => {
    e.preventDefault();
    props.nextStep();
  };

    const { values, handleChange } = props;

    return (
      <center>
        <div className="main__content">
        <p className="step__indicator">Step 1/5</p>

          <p className="sex__title">Select your sex:</p>

          <br /><br />
          <div className="radio-buttons">
            <label className="custom-radio">
              <input onChange={handleChange('sex')} type="radio" id="Male" name="sex" value='Male' checked={values.sex === 'Male'} />
              <span className="radio-btn"
                ><i className="las la-check"></i>
                <div className="sex-icon">
                  {/* <i className="fas fa-mars"></i> */}
                  <i className="la la-mars"></i>
                  <h3>Male</h3>
                </div>
              </span>
            </label>
            <label className="custom-radio">
            <input onChange={handleChange('sex')} type="radio" id="Female" name="sex" value='Female' checked={values.sex === 'Female'} />
              <span className="radio-btn"
                ><i className="las la-check"></i>
                <div className="sex-icon">
                  <i className="las la-venus"></i>
                  <h3>Female</h3>
                </div>
              </span>
            </label>
          </div>

        </div>

        <div className="patient-info__buttons">
          <button className='patient-info__next' disabled={values.sex ? '' : 'disabled'} onClick={proceed}>Next</button>
        </div>
      </center>
    );
}
  
export default PatientStep1;