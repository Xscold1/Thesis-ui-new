import React from "react";
import { useHistory, Link } from "react-router-dom";

function SevereModal({ setSevereModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <span
            onClick={() => {
              setSevereModal(false);
            }}
          >
            X
          </span>
        </div>
        <div className="title no__margin">
          <h1>Severe Symptom Detected</h1>
          <p style={{textIndent: "1.5rem", fontSize: ".85rem"}}>When you are experiencing severe conditions for a prolonged period, health professionals will always advise you to go to a doctor for a check-up immediately for a proper diagnosis instead of attempting to find refuge anywhere on the internet.</p>
          <p style={{textIndent: "1.5rem", fontSize: ".85rem"}}>	If you have been experiencing the said severe symptom for more than a week already, we recommend <strong>using our Hospital Finder</strong> to locate the nearest hospital around your vicinity.</p>
          <p style={{textIndent: "1.5rem", fontSize: ".85rem"}}>Talk to your doctor to understand what your symptoms may mean.</p>
          
        </div>
        <div style={{marginTop: "1rem"}}>
          <center><h1 style={{fontSize: "1.2rem"}}>Would you like to go to the Hospital Finder?</h1></center>
          <div style={{marginTop: "-.3rem"}}>
          <Link to="/hospital-finder"><button className="confirm__button">Yes</button></Link>
          <button onClick={() => {
              setSevereModal(false);
            }} className="decline__button" style={{marginLeft: ".9rem"}}>No Thanks</button>
          </div>


        </div>

        
      </div>
    </div>
  );
}

export default SevereModal;