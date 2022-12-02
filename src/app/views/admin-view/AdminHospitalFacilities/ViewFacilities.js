import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';

// Components
import FacilitiesDatalist from './FacilitiesDatalist'

// Styling
import './AdminHospitalFacilities.scss'

import { useHistory } from "react-router-dom";

// Utils
import authenticate from '../../../utils/authenticate';

function ViewFacilities() {
  useEffect(()=>{
    authenticate();
  },[]);
    let history = useHistory();

    const changeTab = (path, id) => {
      // history.push(path);
  
      history.push({
        pathname: path,
        search: `${id}`,
    })}
  
    const location = useLocation();
    const [hospitalId, setHospitalId] = useState('');
  
    useEffect(() => {
      //  console.log(location.search); // result: '?id={number}'
        setHospitalId(location.search)
    }, [location]);

    const addFacility = (path, id) => {
      // history.push(path)

      history.push({
          pathname: path,
          search: `${id}`,
      })
  }

  return (
    <div className="admin__large__content">
      <h1 className="header__title inactive__title" onClick={() => changeTab('edit-hospital', hospitalId)}>Edit Hospital</h1>
      <h1 className="header__title__second margin__left">Facilities</h1>

      {/* <h5 className="form__header">Doc. {hospitalName}'s List of Facilities</h5> */}
      <h5 className="form__header">List of Facilities <span onClick={() => addFacility('add-hospital-facility', hospitalId)} className="add__affiliate__span">[Add facility]</span></h5>

      <FacilitiesDatalist />
    </div>
  )
}

export default ViewFacilities