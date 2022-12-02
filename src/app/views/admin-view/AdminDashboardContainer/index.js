import React, { useState, useEffect } from 'react'
import axios from 'axios';

// Styling
import './AdminDashboardContainer.scss';
import '../GeneralAdminStyling.scss'
// Utils
import authenticate from '../../../utils/authenticate';
  

function AdminDashboard() {
  useEffect(()=>{
    authenticate();
  },[]);

  const [dashboardInfo, setDashboardInfo] = useState({
    hospitalCount: 0,
    doctorsCount: 0,
    sypmtomsCheckerUsageCount: 0
  })

  useEffect(() => {
    const init = async ()=>{
      // const dashboardRes = await axios.get(`${process.env.REACT_APP_API_URL}/admin/admin-dashboard`, {
      //     headers: {
      //         Authorization: `Bearer ${auth_token}`
      //     }
      //   });
      const dashboardRes = await axios.get(`${process.env.REACT_APP_API_URL}/admin/admin-dashboard`);

      // console.log('dashboardRes', dashboardRes)

        let dashboardFormatted = dashboardRes.data.respone.data;
        console.log('dashboardFormatted', dashboardFormatted)

        setDashboardInfo(dashboardFormatted)
    }
    init()
  }, [])

  const date = new Date();
  // var date = new Date().toISOString().slice(0,10);
  let dateText = date.toString();

  return (
    <div className="admin__content">
      <h1 className="header__title">Admin Overview / Dashboard</h1>

      <div className="first-row__div">
          <div className="top__div">
            <h4>Number of Hospital(s)</h4>
            <p className="date__text">{dateText}</p>
            <h2>{dashboardInfo.hospitalCount}</h2>
          </div>
          <div className="top__div">
            <h4>Number of Doctor(s)</h4>
            <p className="date__text">{dateText}</p>
            <h2>{dashboardInfo.doctorsCount}</h2>
          </div>
      </div>

      <div className="first-row__div">
          <div className="top__div">
            <h4>Symptoms Checker Usage(s)</h4>
            <p className="date__text">{dateText}</p>
            <h2>{dashboardInfo.sypmtomsCheckerUsageCount}</h2>
          </div>
          <div className="top__div">
            <h4>Hospital Finder Usage(s)</h4>
            <p className="date__text">{dateText}</p>
            <h2>5</h2>
          </div>
      </div>

    </div>
  )
}

export default AdminDashboard