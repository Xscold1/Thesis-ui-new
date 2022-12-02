import React, {useEffect} from 'react'

// Components
import UserDatalist from './UserDatalist'

// Utils
import authenticate from '../../../utils/authenticate';

function ViewUsers() {
  useEffect(()=>{
    authenticate();
  },[]);
  return (
    <div className="admin__large__content">
      <h1 className="header__title">View Users</h1>

      <h5 className="form__header">List of all Users</h5>

      <UserDatalist />

    </div>
  )
}

export default ViewUsers