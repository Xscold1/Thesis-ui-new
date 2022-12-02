import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify';
import { BrowserRouter as Router, Route, Switch, Link, useHistory, Redirect } from "react-router-dom";
import { IconContext } from 'react-icons/lib'
import { successToast } from '../../mixins/utils/toastMessageMixins';

// Components
import SubMenu from './Components/SubMenu'
import Overview from './AdminDashboardContainer'
import Analytics from './AdminAnalyticsContainer/Analytics';
import DemographicReports from './AdminAnalyticsContainer/DemographicReports';
import MachineLearning from './AdminAnalyticsContainer/MachineLearning';
import CommonSymptoms from './AdminAnalyticsContainer/CommonSymptoms';
import MatchedDiseases from './AdminAnalyticsContainer/MatchedConditions';
import Lifestyles from './AdminAnalyticsContainer/Lifestyles';
import Datasets from './AdminAnalyticsContainer/Datasets';
import InsertHospital from './AdminHospitalsContainer/InsertHospital';
import ViewHospitals from './AdminHospitalsContainer/ViewHospitals';
import EditHospital from './AdminHospitalsContainer/EditHospital';
import AddFacility from './AdminHospitalFacilities/AddFacility';
import ViewFacilities from './AdminHospitalFacilities/ViewFacilities';
import EditFacility from './AdminHospitalFacilities/EditFacility';
import InsertDoctor from './AdminDoctorsContainer/InsertDoctor';
import ViewDoctors from './AdminDoctorsContainer/ViewDoctors';
import EditDoctor from './AdminDoctorsContainer/EditDoctor';
import AddAffiliate from './AdminDoctorAffiliates/AddAffiliate';
import ViewAffiliates from './AdminDoctorAffiliates/ViewAffiliates';
import EditAffiliate from './AdminDoctorAffiliates/EditAffiliate';
import InsertDisease from './AdminDiseasesContainer/InsertDisease';
import ViewDiseases from './AdminDiseasesContainer/ViewDiseases';
import EditDisease from './AdminDiseasesContainer/EditDisease';
import InsertDataset from './AdminDatasetsContainer/InsertDataset';
import ViewDatasets from './AdminDatasetsContainer/ViewDatasets';
import EditDataset from './AdminDatasetsContainer/EditDataset';
import AddAdmin from './AdminUsersContainer/AddAdmin';
import ViewUsers from './AdminUsersContainer/ViewUsers';

import SymptomsHotspot from './AdminAnalyticsContainer/Hotspots';

// Data
import { SidebarData } from './Components/SidebarData'

// Utils
import authenticate from '../../utils/authenticate';

// Styling
import './Components/SidebarStyling.scss'

// Images 
import Logo from './../../styles/images/logo.svg'
import Malapitlungs from './../../styles/images/malapitLungs.svg'
import Van from './../../styles/images/aboutus/Van.png'

// Variables 
// const sidebarBackground = "#363740";
const headerbackground = "#f7f8fc";
// const headerbackground = "#15171c";
const sidebarBackground = "#15171c";

// Eto yung sa taas
const Nav = styled.div`
    background: ${headerbackground};
    // height: 80px;
    height: 120px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    // box-shadow: rgba(0, 0, 0, 0.04) 0px 5px 15px;
`;

const NavIcon = styled(Link)`
    margin-left: 2rem;
    font-size: 2rem;
    // height: 80px;
    height: 120px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const SidebarNav = styled.nav`
    background: ${sidebarBackground};
    width: 270px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0;
    left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
    transition: 350ms;
    z-index: 10;
`;

const SidebarWrap = styled.div`
    width: 100%;
`;

function Sidebar() {
    let history = useHistory();
    useEffect(()=>{
    authenticate();
  },[]);
    const [sidebar, setSidebar] = useState(true);
    const adminEmail = localStorage.getItem('admin_email') || null
    // const adminEmail = localStorage.getItem('admin_email') || 'Admin'

    const Logout = () =>{
        toast.dismiss();
        localStorage.removeItem('patientInfo');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('admin_email');
        successToast("Successfully Logged out")
        history.push('/login')
    }

    const auth_token = localStorage.getItem('auth_token') && adminEmail
    // const auth_token = localStorage.getItem('auth_token')

  return (
    <>
    <IconContext.Provider value={{ color: '#fff'}}>
        <Nav className="">
            <div className="admin__info">
                <p className="admin__name">{adminEmail}</p>
                <p className="admin__logout">Administrator | <span onClick={() => Logout()}>Logout</span></p>
                {/* <div className="profile__picture__div__rework">
                    <img className="admin__picture__rework" src={Van} alt="AdminProfile" />
                </div> */}
            </div>
            {/* <div className="admin-profile__right">
                <div className="profile__picture__div">
                    <img className="admin__picture" src={Van} alt="AdminProfile" />
                </div>
            </div> */}
            <NavIcon to="#">
                {/* <FaIcons.FaBars onClick={showSidebar} /> <= dito yung close button if you want. Pero fixed yung sidebar sa Figma so disabled muna hehehe*/}
            </NavIcon>
        </Nav>

        {/* <SidebarNav style={{overflow: "hidden", overflowY: "scroll"}} sidebar={sidebar}> */}
        <SidebarNav sidebar={sidebar}>
            <SidebarWrap>
                <NavIcon to="#">
                    {/* <AiIcons.AiOutlineClose onClick={showSidebar} /> <= open button */}
                    <div className="items__center">
						<img className="admin__title__logo" src={Logo} alt="Logo" />
						<img className="admin__logomark" src={Malapitlungs} alt="Logo" />
					</div>
                </NavIcon>

            <div className="hidden__scroll">
                {SidebarData.map((item, index) => {
                    return <SubMenu item={item} key={index} />;
                })}
            </div>
            </SidebarWrap>       
        </SidebarNav>

            {/* <h1 style={{position: "relative", zIndex: 10, color: "red"}}>Atdog</h1> */}

        {/* <SidebarNav sidebar={sidebar}>
            <h1>Atdog</h1>
        </SidebarNav> */}
        
    </IconContext.Provider>

        {/* Sidebar navigation */}
		<Switch>
			<Route path='/admin' exact>
                { !auth_token ? <Redirect to='/' /> : <Redirect to='/admin/overview' /> }
			</Route>
			<Route path='/admin/overview' exact>  
                { !auth_token ? <Redirect to='/' /> : <Overview /> }
			</Route>
			<Route path='/admin/analytics/demographic-reports' exact>  
                { !auth_token ? <Redirect to='/' /> : <DemographicReports /> }
			</Route>
			<Route path='/admin/machine-learning' exact>  
                { !auth_token ? <Redirect to='/' /> : <MachineLearning /> }
			</Route>
			<Route path='/admin/analytics/common-symptoms' exact>  
                { !auth_token ? <Redirect to='/' /> : <CommonSymptoms /> }
			</Route>
			<Route path='/admin/analytics/symptoms-hotspot' exact>  
                { !auth_token ? <Redirect to='/' /> : <SymptomsHotspot /> }
			</Route>
			<Route path='/admin/analytics/matched-conditions' exact>  
                { !auth_token ? <Redirect to='/' /> : <MatchedDiseases /> }
			</Route>
			<Route path='/admin/analytics/lifestyles' exact>  
                { !auth_token ? <Redirect to='/' /> : <Lifestyles /> }
			</Route>
			<Route path='/admin/analytics/datasets' exact>  
                { !auth_token ? <Redirect to='/' /> : <Datasets /> }
			</Route>
			<Route path='/admin/insert-doctor' exact>  
                { !auth_token ? <Redirect to='/' /> : <InsertDoctor /> }
			</Route>
			<Route path='/admin/view-doctors' exact>  
                { !auth_token ? <Redirect to='/' /> : <ViewDoctors /> }
			</Route>
			<Route path='/admin/edit-doctor' exact>  
                { !auth_token ? <Redirect to='/' /> : <EditDoctor /> }
			</Route>
            <Route path='/admin/view-doctor-affiliates' exact>  
                { !auth_token ? <Redirect to='/' /> : <ViewAffiliates /> }
			</Route>
            <Route path='/admin/add-doctor-affiliate' exact>  
                { !auth_token ? <Redirect to='/' /> : <AddAffiliate /> }
			</Route>
            <Route path='/admin/edit-doctor-affiliate' exact>  
                { !auth_token ? <Redirect to='/' /> : <EditAffiliate /> }
			</Route>
			<Route path='/admin/insert-hospital' exact>  
                { !auth_token ? <Redirect to='/' /> : <InsertHospital /> }
			</Route>
			<Route path='/admin/view-hospitals' exact>  
                { !auth_token ? <Redirect to='/' /> : <ViewHospitals /> }
			</Route>
			<Route path='/admin/edit-hospital' exact>  
                { !auth_token ? <Redirect to='/' /> : <EditHospital /> }
			</Route>
			<Route path='/admin/add-hospital-facility' exact>  
                { !auth_token ? <Redirect to='/' /> : <AddFacility /> }
			</Route>
			<Route path='/admin/view-hospital-facilities' exact>  
                { !auth_token ? <Redirect to='/' /> : <ViewFacilities /> }
			</Route>
			<Route path='/admin/edit-hospital-facility' exact>  
                { !auth_token ? <Redirect to='/' /> : <EditFacility /> }
			</Route>
			<Route path='/admin/insert-disease' exact>  
                { !auth_token ? <Redirect to='/' /> : <InsertDisease /> }
			</Route>
			<Route path='/admin/view-diseases' exact>  
                { !auth_token ? <Redirect to='/' /> : <ViewDiseases /> }
			</Route>
			<Route path='/admin/edit-disease' exact>  
                { !auth_token ? <Redirect to='/' /> : <EditDisease /> }
			</Route>
			<Route path='/admin/insert-dataset' exact>  
                { !auth_token ? <Redirect to='/' /> : <InsertDataset /> }
			</Route>
			<Route path='/admin/view-datasets' exact>  
                { !auth_token ? <Redirect to='/' /> : <ViewDatasets /> }
			</Route>
            <Route path='/admin/edit-dataset' exact>  
                { !auth_token ? <Redirect to='/' /> : <EditDataset /> }
			</Route>
            <Route path='/admin/add-admin' exact>  
                { !auth_token ? <Redirect to='/' /> : <AddAdmin /> }
			</Route>
            <Route path='/admin/view-users' exact>  
                { !auth_token ? <Redirect to='/' /> : <ViewUsers /> }
			</Route>
            <Route path='*'>
				{ <Redirect to="/admin" /> }
			</Route>
		</Switch>
    </>
  )
}

export default Sidebar