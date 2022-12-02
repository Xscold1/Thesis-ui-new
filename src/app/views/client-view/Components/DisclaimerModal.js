import React from "react";
import * as AiIcons from 'react-icons/ai'

// Styling
import './AltDisclaimerModal.scss'

function DisclaimerModal({ setOpenDisclaimerModal }) {
    const [checked, setChecked] = React.useState(false);

    const handleChecked = () => {
        setChecked(prevState => prevState = !prevState)
    }

  return (
    <div className="modalBackground">
      <div className="altDisclaimerModalContainer">
        <div className="titleCloseBtn white">
          {/* <span
            onClick={() => {
              setOpenDisclaimerModal(false);
            }}
          >
            X<AiIcons.AiOutlineCloseCircle className="disclaimer__close__icon" />
          </span> */}
        </div>
        <div className="title">
          <h1>Disclaimer</h1>
          <center>
          <div className="text__container__size">
            <p className="text__indent"> <strong>The website is not intended to replace professional medical advice, diagnosis, or treatment in any way.</strong> Medical professionals 
              must still analyze the potential condition through a series of laboratory tests, which the symptom checker cannot provide. It 
              is still preferable to be diagnosed by a certified medical professional as they have the necessary tools and technology to 
              properly diagnose and treat patients. The tool provided can only help with self-triage and additional information to residents 
              so that they will be more aware of their lung health.  </p>

            <p className="text__indent">If the result may cause you to panic, it would be advisable to go to a medical facility immediately rather than using the symptom 
              checker tool provided on this website. <strong>Keep in mind that the system simply assesses and matches the symptoms you have entered to a list of 
              potential conditions. </strong>Medical professionals must still conduct a series of laboratory tests to conclude a diagnosis. </p>

            <p className="text__indent">The content available on and accessed through this website is provided solely for informative purposes and should not be regarded 
              as medical advice, diagnosis, treatment, or prescription. </p>

            <p className="text__indent">The provided information is not meant to diagnose or treat any health issues or prescribe drugs or other therapies. Before changing 
              or discontinuing any prescribed medications, treatments, or services, beginning any diet, exercise, or supplements program, or if you have or fear you could have 
              a health condition, you should consult with a medical practitioner.</p>
          </div>
          </center>

            <label htmlFor="agreeCheckbox" className="address__terms"><input className="form-check-input address__checkbox" 
                type="checkbox" id="agreeCheckbox" name="agreeCheckbox" onClick={handleChecked} /> 

                &nbsp; I understand and I wish to proceed
            </label><br />

            <button type="submit" className="confirm__button" disabled={!checked ? "disabled" : ""} onClick={() => {
              setOpenDisclaimerModal(false);
            }} >
                Confirm
            </button>
            
            {/* 
            <button type="submit" className="decline__button" disabled={!checked ? "disabled" : ""} onClick={() => {
              setOpenDisclaimerModal(false);
            }} >
                Decline
            </button> */}
          
        </div>
        
      </div>
    </div>
  );
}

export default DisclaimerModal;