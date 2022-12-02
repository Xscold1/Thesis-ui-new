import React from "react";
import * as AiIcons from 'react-icons/ai'

// Styling
import './ReadMoreModal.scss'

function ReadMoreModal({ setReadMoreOpen }) {
    const [checked, setChecked] = React.useState(false);

    const handleChecked = () => {
        setChecked(prevState => prevState = !prevState)
    }

  return (
    <div className="modalBackground">
      <div className="altDisclaimerModalContainer">
        <div className="titleCloseBtn white">
        </div>
        <div className="title">
          <h1>How it works</h1>
          <center>
          <div className="text__container__size">
            <p className="text__indent">Malapit Lungs' Symptoms Checker aims to aid people with self-triage and provide them with a list of possible conditions by comparing 
              a condition's common symptoms with the symptoms the user is experiencing. <strong>It is more of a symptoms-to-condition calculator rather than a diagnostic 
              tool. </strong></p>

            <p className="text__indent">The results do not indicate the likelihood of you having the said condition. <strong>It only shows you how much of your symptoms 
              match the description a disease/condition. </strong></p>

            <p className="text__indent">However, if you have been experiencing moderate to intense pain for a prolonged period, you would be better off going to a medical 
              facility immediately <strong>by utilizing the Hospital Finder </strong>rather than attempting to use any symptoms checker tool. </p>

            <p className="text__indent">The provided information is not meant to diagnose or treat any health issues or prescribe drugs or other therapies. Before changing 
              or discontinuing any prescribed medications, treatments, or services, beginning any diet, exercise, or supplements program, or if you have or fear you could 
              have a health condition, you should consult with a medical practitioner.</p>
          </div>
          </center>

            <label htmlFor="agreeCheckbox" className="address__terms"><input className="form-check-input address__checkbox" 
                type="checkbox" id="agreeCheckbox" name="agreeCheckbox" onClick={handleChecked} /> 

                &nbsp; I understand and I wish to proceed
            </label><br />

            <button type="submit" className="confirm__button" disabled={!checked ? "disabled" : ""} onClick={() => {
              setReadMoreOpen(false);
            }} >
                Confirm
            </button>
          
        </div>
        
      </div>
    </div>
  );
}

export default ReadMoreModal;