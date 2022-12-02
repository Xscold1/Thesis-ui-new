import React from 'react'
import { useHistory, Link } from "react-router-dom";

function TreatmentsPage3(props) {
    // const back = e => {
    //     e.preventDefault();
    //     props.prevPage();
    // };

  return (
    <div className="main__content">
            {/* <p className="step__indicator">Step 3 out of 3</p> */}
            <p className="step__indicator">Step 3/3</p>

            <p className="sex__title">&nbsp;</p>
            
            <p className="nearby-hospi__title"> Would you like to see nearby hospitals? </p>

                <hr className="treatment__hr" />

                <div className="hospital__redirect__buttons">
                    <Link className="hospital__yes" to="/hospital-finder">Yes</Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {/* <a className="hospital__yes" onClick={back} href="#">No</a> */}
                    <Link className="hospital__yes" to="/">No</Link>
                </div>


            <br /><br /><br /><br /><br />

        {/* <div className="treatment__buttons">
            <a className="treatment__prev" onClick={back}><i className="fas fa-arrow-left"></i>Previous</a>
        </div> */}
    </div>
  )
}

export default TreatmentsPage3