import React from 'react'
import { useHistory, Link } from "react-router-dom";

function TreatmentsPage1(props) {
    const proceed = e => {
        e.preventDefault();
        props.nextPage();
    };
      
    return (
        <div className="main__content">
            {/* <p className="step__indicator">Step 1 out of 3</p> */}
            <p className="step__indicator">Step 1/3</p>

            {/* <p className="sex__title">&nbsp;</p> */}
            <p className="sex__title">Disclaimer</p>

            {/* <p className="condition__text">If caring for ringworm on your own with over-the-counter skin products doesn't work, or if ringworm affects your scalp or
            beard, see your doctor for other treatments such as:</p> */}

            {/* <p className="treatments__disclaimer"> Disclaimer </p> */}

                <hr className="treatment__hr" />

            <div className="treatment__text__div">
            <p className="treatment__disclaimer__text">This tool is not a substitute for medical professional advice. It is intended for informational purposes only. 
            You acknowledge that you are using this tool on your own initiative and in compliance with this disclaimer. You shouldn't dismiss or put off seeking 
            professional advice because of information you found through this. In case of any medical emergency, contact your doctor right away.</p>
            </div>

            {/* <br /><br /> */}
            <div className="treatment__buttons">
                <Link className="treatment__prev" to='conditions'><i className="fas fa-arrow-left"></i>Previous</Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button className='treatment__next' onClick={proceed}>Next {'>'}</button>
            </div>
        </div>
    )
}

export default TreatmentsPage1