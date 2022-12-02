import React, { useEffect, useState, useCallback } from 'react'
import { toast } from 'react-toastify';
import { BrowserRouter as Router, Route, Switch, useHistory, Redirect } from "react-router-dom";

// Import react-circular-progressbar module and styles
import {
    CircularProgressbar,
    buildStyles
  } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

// Components
import UserNavbar from "../Components/UserNavbar";
import LandingPage from './components/LandingPage';
import Patient from './components/Patient'
import Symptoms from './components/symptoms'
import Conditions from './components/conditions'
import Treatments from './components/treatments'

// https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage

// Styling
import './SymptomsCheckerContainer.scss';

// Mixins
import { successToast, errorToast } from '../../../mixins/utils/toastMessageMixins';

// Auth
import authenticate from '../../../utils/authenticate';


function SymptomsCheckerContainer() {
	const [breadcrumbProgress, setBreadcrumbProgress] = useState(
		JSON.parse(localStorage.getItem("breadcrumbProgress")) || {
		oneQuarter: true,
		twoQuarters: false,
		threeQuarters: false,
		fourQuarters: false,
	});

	// const auth_token = localStorage.getItem('auth_token')
	
	const userEmail = localStorage.getItem('user_email') || null
	const auth_token = localStorage.getItem('auth_token') && userEmail

	// Handle breadcrumb update
	const handleCrumb = input => {
		setBreadcrumbProgress(prevInfo => ({
			...prevInfo,
			[input]: true
		}))
	};

	React.useEffect(() => {
		localStorage.setItem("breadcrumbProgress", JSON.stringify(breadcrumbProgress))
	}, [breadcrumbProgress])

	const isTwoQuarters = breadcrumbProgress.twoQuarters;
	const isThreeQuarters = breadcrumbProgress.threeQuarters;
	const isFourQuarters = breadcrumbProgress.fourQuarters;

	const history = useHistory();

	const isLanding = history.location.pathname === '/symptoms-checker';
	const isLandingVisited = JSON.parse(localStorage.getItem("isLandingVisited")) || false;
	
	const isPatient = history.location.pathname === '/symptoms-checker/patient';
	const checkPatientInfo = JSON.parse(localStorage.getItem("patientInfo")) || {};
	
	const isSymptoms = history.location.pathname === '/symptoms-checker/symptoms';
	const checkSymptoms = JSON.parse(localStorage.getItem("symptomsList")) || [];
	
	const isCondition = history.location.pathname === '/symptoms-checker/conditions';
	const checkCondition = JSON.parse(localStorage.getItem("highlightedResult")) || {resultId: ''};

	const isTreatment = history.location.pathname === '/symptoms-checker/treatments';


	// Checking values on localStorage for URL protection
	const isPatientInfoIncomplete = Object.keys(checkPatientInfo).length === 0 || checkPatientInfo.ageMonthYear === '' 
		|| checkPatientInfo.ageNumber === '' || checkPatientInfo.address === '' || checkPatientInfo.exercise === '' 
		|| checkPatientInfo.healthyDiet === '' || checkPatientInfo.posture === '' || checkPatientInfo.sex === '' 
		|| checkPatientInfo.smoker === '';
	const isSymptomsEmpty = checkSymptoms === undefined || checkSymptoms.length === 0;
	const isConditionEmpty = checkCondition === undefined || checkCondition.resultId === '';


	const onStepChange = (path)=>{
		// console.log('path', path)
		history.push(path)
	}

	// const urlProtect2 = () => {
	// 	history.push('/')
	// 	toast.dismiss()
	// 	errorToast("You must login first")
	// 	console.log('yes')
	// }

	// const errorFunc = useCallback(() => {
	// 	errorToast("You must login first")
	// }, [])

	
	// const urlProtect = () => {
	// 	history.push('/')
	// 	errorFunc();
	// 	console.log('yessir')
	// }

	const customId = "error-toast";

	const urlProtect = () => {
		history.push('/login')
		toast.error("You must login as a user first", {
		  toastId: customId
		});
		console.log('re-render counter')

		authenticate();
	}

  return (
    <div className="body">
        {/* Navigation Bar */}
		<UserNavbar />

		<div>
        
		<br /><br /><br /><br /><br /><br /><br />
		

		<div className={`wrapper ${isLanding ? 'invisible__breadcrumb' : ''}`}>
			<div className="bread__crumbs">
				<div className="progress__container">
					{/* <div className={`progress__circle ${isPatient ? 'first__quarter':  isSymptoms || isTwoQuarters ? 'second__quarter' : isCondition || isThreeQuarters ? 'third__quarter' : isTreatment || isFourQuarters ? 'fourth__quarter' : ''}`}>
						
					</div> */}
					{/* <div className={`progress__circle ${isTreatment || isFourQuarters ? 'fourth__quarter':  isCondition || isThreeQuarters ? 'third__quarter' : isSymptoms || isTwoQuarters ? 'second__quarter' : isPatient ? 'first__quarter' : ''}`} />
					<div className={isTreatment || isFourQuarters ? 'progress__value__100' : 'progress__value'}>{`${isTreatment || isFourQuarters ? '100%':  isCondition || isThreeQuarters ? '75%' : isSymptoms || isTwoQuarters ? '50%' : isPatient ? '25%' : ''}`}</div> */}
					<CircularProgressbar
						className="progress__bar"
						value={isTreatment || isFourQuarters ? 100:  isCondition || isThreeQuarters ? 100 : isSymptoms || isTwoQuarters ? 67 : isPatient ? 33 : 0}
						text={isTreatment || isFourQuarters ? '100%':  isCondition || isThreeQuarters ? '100%' : isSymptoms || isTwoQuarters ? '67%' : isPatient ? '33%' : ''}
						backgroundPadding={7}
						strokeWidth={19}
						styles={buildStyles({
							textColor: "#3a3d41",
							pathColor: "#81D0D7",
							trailColor: "#E78D6D",
							strokeLinecap: "butt"
						})}
					/>
				</div>
				<ul>
					<li id="item1" className={`breadcrumb__item ${isPatient || isSymptoms || isCondition || isTreatment ? 'breadcrumb__active' : 'breadcrumb__inactive'} ${isPatient ? 'highlight__active' : ''}`} onClick={()=> onStepChange('/symptoms-checker/patient')}><a className={`${isPatient ? 'highlight__breadcrumb' : ''}`} href=""><i className="fas fa-user"></i> &nbsp;&nbsp;&nbsp;Patient
					</a></li>
					<li id="symptoms" className={`breadcrumb__item ${isSymptoms || isCondition || isTreatment || isTwoQuarters ? 'breadcrumb__active' : 'breadcrumb__inactive'} ${isSymptoms ? 'highlight__active' : ''}`} onClick={()=> onStepChange('/symptoms-checker/symptoms')}><a className={`${isSymptoms ? 'highlight__breadcrumb' : ''}`} href=""><i className="fas fa-stethoscope"></i> &nbsp;&nbsp;&nbsp;Symptoms
					</a></li>
					<li id="item3" className={`breadcrumb__item ${isCondition || isTreatment || isThreeQuarters ? 'breadcrumb__active' : 'breadcrumb__inactive'} ${isCondition ? 'highlight__active' : ''}`} onClick={()=> onStepChange('/symptoms-checker/conditions')}><a className={`${isCondition ? 'highlight__breadcrumb' : ''}`} href=""><i className="fas fa-user-injured"></i> &nbsp;&nbsp;&nbsp;Conditions
					</a></li>
					{/* <li id="item4" className={`breadcrumb__item ${isTreatment || isFourQuarters ? 'breadcrumb__active' : 'breadcrumb__inactive'} ${isTreatment ? 'highlight__active' : ''}`} onClick={()=> onStepChange('/symptoms-checker/treatments')}><a className={`${isTreatment ? 'highlight__breadcrumb' : ''}`} href=""><i className="fas fa-medkit"></i> &nbsp;&nbsp;&nbsp;Treatments
					</a></li> */}
				</ul>
			</div>
		</div>


		{/* Breadcrumbs navigation */}
		<Switch>
			<Route path='/symptoms-checker' exact>  
				{ !auth_token ? urlProtect() : isLandingVisited ? ( <Redirect to="/symptoms-checker/patient" /> ) : ( <LandingPage /> ) }	

			</Route>
			<Route path='/symptoms-checker/patient' exact>
				{ !auth_token ? <Redirect to="/" /> :  isLandingVisited ? ( <Patient /> ) : ( <Redirect to="/symptoms-checker" /> ) }	  

			</Route>
			<Route path='/symptoms-checker/symptoms' exact>
				{ !auth_token ? <Redirect to="/" /> : !isLandingVisited ? ( <Redirect to="/symptoms-checker" /> ) :  isPatientInfoIncomplete ? ( <Redirect to="/symptoms-checker/patient" /> ) : ( <Symptoms handleCrumb={handleCrumb} /> ) }
			</Route>
			<Route path='/symptoms-checker/conditions' exact>
				{ !auth_token ? <Redirect to="/" /> : !isLandingVisited ? ( <Redirect to="/symptoms-checker" /> ) :  isPatientInfoIncomplete ? ( <Redirect to="/symptoms-checker/patient" /> ) : isSymptomsEmpty ? ( <Redirect to="/symptoms-checker/symptoms" /> ) : <Conditions /> }

			</Route>
			<Route path='/symptoms-checker/treatments' exact>
				{ !auth_token ? <Redirect to="/" /> : !isLandingVisited ? ( <Redirect to="/symptoms-checker" /> ) :  isPatientInfoIncomplete ? ( <Redirect to="/symptoms-checker/patient" /> ) : isSymptomsEmpty ? ( <Redirect to="/symptoms-checker/symptoms" /> ) : isConditionEmpty ? ( <Redirect to="/symptoms-checker/conditions" /> ) : <Treatments /> }

			</Route>
			<Route path='*'>
				{ !auth_token ? <Redirect to="/" /> : <Redirect to="/symptoms-checker/patient" /> }
			</Route>
		</Switch>

		</div>

		<script src="https://kit.fontawesome.come/b99e675b6e.js"></script>
        
    </div>
  )
}

export default SymptomsCheckerContainer