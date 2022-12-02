import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';

// Components
import AffiliateDatalist from './AffiliateDatalist'

// Styling
import './AdminDoctorAffiliates.scss'

import { useHistory } from "react-router-dom";

// Utils
import authenticate from '../../../utils/authenticate';

function ViewAffiliates() {
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
    const [doctorId, setDoctorId] = useState('');
  
    useEffect(() => {
      //  console.log(location.search); // result: '?id={number}'
        setDoctorId(location.search)
    }, [location]);

    const addAffiliate = (path, id) => {
      // history.push(path)

      history.push({
          pathname: path,
          search: `${id}`,
      })
  }

  return (
    <div className="admin__large__content">
      <h1 className="header__title inactive__title" onClick={() => changeTab('edit-doctor', doctorId)}>Doctor Profile</h1>
      <h1 className="header__title__second">Affiliated Hospitals</h1>

      {/* <h5 className="form__header">Doc. {doctorName}'s List of Affiliated Hospitals</h5> */}
      <h5 className="form__header">List of Affiliated Hospitals <span onClick={() => addAffiliate('add-doctor-affiliate', doctorId)} className="add__affiliate__span">[Add an affiliate]</span></h5>

      <AffiliateDatalist />
    </div>
  )
}

export default ViewAffiliates