import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { useHistory, Link } from "react-router-dom";
import * as BsIcons from 'react-icons/bs'
import * as MdIcons from 'react-icons/md'

// Mixins
import { successToast, errorToast } from '../../../mixins/utils/toastMessageMixins';

// Images 
import Logo from '../../../styles/images/logo.svg'
import Malapitlungs from '../../../styles/images/malapitLungs.svg'

// User Sidebar
import UserProfileSidebar from './UserProfileSidebar';
import UserLogsSidebar from './UserLogsSidebar';

function UserNavbar() {
    const history = useHistory();

    const isHome = history.location.pathname === '/';
    const isSymptomsChecker = history.location.pathname === '/symptoms-checker' 
		|| history.location.pathname === '/symptoms-checker/patient' 
		|| history.location.pathname === '/symptoms-checker/symptoms' 
		|| history.location.pathname === '/symptoms-checker/conditions' 
		|| history.location.pathname === '/symptoms-checker/treatments';
    const isHospitalFinder = history.location.pathname === '/hospital-finder'
		|| history.location.pathname === '/hospital-finder/map';
    const isLungHealth = history.location.pathname === '/lung-health';
	const isHospitalOverview = history.location.pathname === '/hospital-overview'
		|| history.location.pathname === '/hospital-overview/healthcare-providers'
		|| history.location.pathname === '/hospital-overview/facilities';
	const isDoctorFinder = history.location.pathname === '/doctor-finder';

    const isLogin = history.location.pathname === '/login';
    const isRegister = history.location.pathname === '/register';

	const [settingsDropdownOpen, setSettingsDropdownOpen] = React.useState(false);

	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const [isLogsOpen, setIsLogsOpen] = useState(false);

	const handleSettingsDropdown = () => {
		setSettingsDropdownOpen(prevState => !prevState)
	}

	const handleProfileOpen = () => {
		setIsProfileOpen(prevState => !prevState)
	}

	const handleLogsOpen = () => {
		setIsLogsOpen(prevState => !prevState)
	}

	const profileMenuClick = () => {
		setSettingsDropdownOpen();
		handleProfileOpen();
	}

	const logsMenuClick = () => {
		setSettingsDropdownOpen();
		handleLogsOpen();
	}

	const userEmail = localStorage.getItem('user_email') || null
	const auth_token = localStorage.getItem('auth_token') && userEmail
	// const auth_token = localStorage.getItem('auth_token')

	const Logout = () =>{
		toast.dismiss();
		localStorage.removeItem('patientInfo');
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user_email');
        successToast("Successfully Logged out")
        history.push('/')
    }

	let buttons;

	if (!auth_token) {
		buttons = 
		<div className="login__register space__between"   >
			{/* <a href={`${isLogin ? "#" : "/login"}`} className="collapse navbar-collapse btn  px-3 mb-2 mb-lg-0 login__button"> */}
			<Link to={`${isLogin ? "#" : "/login"}`} className="collapse navbar-collapse btn  px-3 mb-2 mb-lg-0 login__button">
				<span className="d-flex align-items-center">
					<span className="font_size">Login</span>
				</span>
			</Link>
			<Link to={`${isRegister ? "#" : "/register"}`} className="collapse navbar-collapse btn  px-3 mb-2 mb-lg-0 signup__button">
				<span className="d-flex align-items-center">
					<span className="font_size">SignUp</span>
				</span>
			</Link>
		</div>
	} else {
		buttons = 
		<div className="sec-center"> 	
			<input onChange={() => handleSettingsDropdown()} className="dropdown" type="checkbox" id="dropdown" name="dropdown" checked={settingsDropdownOpen} />
			<label className="for-dropdown" htmlFor="dropdown">User Settings <BsIcons.BsGearFill className="gear__icon" /></label>
			<div className="section-dropdown"> 
				<a onClick={() => profileMenuClick()}>User Profile <i className="fas fa-user-circle" /></a>
				<a onClick={() => logsMenuClick()}>Checker Logs <i className="fas fa-history" /></a>
				<a onClick={() => Logout()} className="logout" href="#">Logout <MdIcons.MdLogout className="gear__icon" /></a>
			</div>
		</div>
	}

  return (
    <nav className="navbar navbar-expand-lg navbar-light fixed-top shadow-sm" id="mainNav">
			<UserProfileSidebar isOpen={isProfileOpen} toggleOpen={handleProfileOpen} />
			<UserLogsSidebar isOpen={isLogsOpen} toggleOpen={handleLogsOpen} />
			<div className="container logo__div__override">
                <Link className="home__clickable" to={`${isHome ? "#" : "/"}`}></Link>
					<div className="items items__center">
						<img className="title__logo" src={Logo} alt="Logo" />
						<img className="logomark" src={Malapitlungs} alt="Logo" />
					</div>
				
                {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<button className="navbar-toggler signup__button" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
					Menu
					<i className="bi-list"></i>
				</button> */}
			
				<div className="collapse navbar-collapse space__between"  id="navbarResponsive">
					<ul className="navbar-nav my-3 my-lg-0 nav__center__width">
						<li className="nav-item "><Link className="nav-link me-lg-4  multiline" to={`${isHome ? "#" : "/"}`}> <span className={`${isHome ? "active" : ""}`}>Home</span></Link></li>
						<li className="nav-item"><Link className="nav-link me-lg-4  multiline" to={`${isSymptomsChecker ? "#" : "/symptoms-checker"}`}><span className={`${isSymptomsChecker ? "active" : ""}`}>Symptoms Checker</span></Link></li>
						<li className="nav-item"><Link className="nav-link me-lg-4 multiline" to={`${isHospitalFinder ? "#" : "/hospital-finder"}`}><span className={`${isHospitalFinder ? "active" : ""}`}>Hospital Finder</span></Link></li>
						<li className="nav-item"><Link className="nav-link me-lg-4 multiline" to={`${isDoctorFinder ? "#" : "/doctor-finder"}`}><span className={`${isDoctorFinder ? "active" : ""}`}>Doctor Finder</span></Link></li>
						{/* <li className="nav-item"><a className="nav-link multiline" href={`${isHospitalOverview ? "#" : "/hospital-overview"}`}><span className={`${isHospitalOverview ? "active" : ""}`}>Hospital Overview</span></a></li> */}
						{/* <li className="nav-item"><a className="nav-link multiline" href="#"><span className="">Lung Health</span></a></li> */}

					</ul>
				</div>    

				{buttons}

			</div>
		</nav>
  )
}

export default UserNavbar