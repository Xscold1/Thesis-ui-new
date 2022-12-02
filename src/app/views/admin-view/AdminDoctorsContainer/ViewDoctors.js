import React, {useEffect} from 'react'

// Components
import DoctorDatalist from './DoctorDatalist'

// Utils
import authenticate from '../../../utils/authenticate';

function ViewDoctors() {
  useEffect(()=>{
    authenticate();
  },[]);
  return (
    <div className="admin__large__content">
      <h1 className="header__title">View Doctors</h1>

      <h5 className="form__header">Doctors</h5>

      <DoctorDatalist />
    </div>
  )
}

export default ViewDoctors