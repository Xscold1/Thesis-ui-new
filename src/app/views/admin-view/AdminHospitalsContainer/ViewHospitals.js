import React, {useEffect} from 'react'

// Components
import HospitalDatalist from './HospitalDatalist'

// Utils
import authenticate from '../../../utils/authenticate';

function ViewHospitals() {
  useEffect(()=>{
    authenticate();
  },[]);
  return (
    <div className="admin__large__content" style={{height: "53rem"}}>
      <h1 className="header__title">View Hospitals</h1>

      <h5 className="form__header">Hospitals</h5>

      <HospitalDatalist />

    </div>
  )
}

export default ViewHospitals