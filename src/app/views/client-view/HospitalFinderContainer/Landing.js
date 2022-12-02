import React from 'react'
import { useHistory, Link } from "react-router-dom";

// Images
import HospitalFinderIndex from '../../../styles/images/HospitalFinderIndex.png'

function Landing(props) {
  return (
    <div className="landing__div">
        <h1 className="landing__h1">Find the closest hospital in your area</h1>
        <p className="landing__p">Our website makes it easier for you to locate the closest medical facility/personnel by giving you an overview with a map.</p>
        <div className="finder__blue__rounded-corner">
            <img src={HospitalFinderIndex} alt="Index Pic" className="landing__image" />
        </div>

        <Link to="/hospital-finder/map" className="give__try">
          <h4 className="try__text">Proceed to Maps &nbsp;<i className="fas fa-arrow-right right-icon" /></h4>
        </Link>
    </div>
  )
}

export default Landing