import React from "react";

import './Modal.scss'

function DisclaimerModal({ setOpenDisclaimerModal }) {
    const [checked, setChecked] = React.useState(false);

    const handleChecked = () => {
        setChecked(prevState => prevState = !prevState)
    }

  return (
    <div className="modalBackground">
      <div className="disclaimerModalContainer">
        <div className="titleCloseBtn white">
          {/* <span
            onClick={() => {
              setOpenDisclaimerModal(false);
            }}
          >
            X
          </span> */}
        </div>
        <div className="title">
          <h1>Disclaimer</h1>
          <p>The symptom checker tool is not intended to replace professional medical advice, diagnosis, or treatment in any way. </p>

          <p>Medical professionals must still analyze the potential condition through a series of laboratory tests, which our 
            symptom checker cannot provide. </p>

          <p>It is still preferable to be diagnosed by a certified medical professional as they 
            have the necessary tools and technology to properly diagnose and treat patients. The tool provided can only help with 
            self-triage and supplement additional information to residents so that they will be more aware of their lung health.</p>

          <p>If you think you may have a medical emergency, immediately call your doctor or dial 911.</p>

            <label htmlFor="agreeCheckbox" className="address__terms"><input className="form-check-input address__checkbox" 
                type="checkbox" id="agreeCheckbox" name="agreeCheckbox" onClick={handleChecked} /> 

                &nbsp; I understand and I wish to proceed
            </label><br />

            <button type="submit" className="confirm__button" disabled={!checked ? "disabled" : ""} onClick={() => {
              setOpenDisclaimerModal(false);
            }} >

            {/* <button className="confirm__button" disabled="" > */}
                Confirm
            </button>
          
        </div>
        
      </div>
    </div>
  );
}

export default DisclaimerModal;