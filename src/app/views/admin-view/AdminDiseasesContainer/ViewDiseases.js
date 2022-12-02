import React, { useEffect } from 'react'

// Components
import DiseaseDatalist from './DiseaseDatalist'
import authenticate from '../../../utils/authenticate';

function ViewDiseases() {
  useEffect(()=>{
    authenticate();
  },[]);
  return (
    <div className="admin__large__content">
      <h1 className="header__title">View Lung Diseases</h1>

      <h5 className="form__header">Diseases</h5>

      <DiseaseDatalist />
    </div>
  )
}

export default ViewDiseases