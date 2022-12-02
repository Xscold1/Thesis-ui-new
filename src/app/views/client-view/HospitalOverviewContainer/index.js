import React from 'react'
import { BrowserRouter as Router, Route, Switch, useHistory, Redirect } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import * as GoIcons from 'react-icons/go'
import * as BsIcons from 'react-icons/bs'

// Components
import UserNavbar from "../Components/UserNavbar";
import Footer from "../Components/Footer";
import Overview from "./components/Overview"
import Providers from './components/Providers';
import Facilities from './components/Facilities';

// Styling
import './HospitalOverviewContainer.scss';

//Images
import Hospital from '../../../styles/images/Hospital.png'

function HospitalOverview() {
    const history = useHistory();

	const location = useLocation();

	const isOverview = history.location.pathname === '/hospital-overview';
	const isProvider = history.location.pathname === '/hospital-overview/healthcare-providers';
    const isFacilities = history.location.pathname === '/hospital-overview/facilities';

    const onStepChange = (path)=>{
		history.push(path)
	}
	const [overviewDetails, setOverviewDetails] = React.useState (
		JSON.parse(localStorage.getItem("overviewDetails")) || {
			hospitalDetails: {
				hospitalName: "",
				address: "",
				contactInfo: "",
				timeAvailability: "",
				overview: ""
			},
			doctorDetails: [],
			facilityDetails: []
	});

	const idNum = location.search.substring(4);

	React.useEffect(() => {
		const fetchHospitalInformation = async () => {
		const resultName = await axios.get(`${process.env.REACT_APP_API_URL}/hospital/get-hospital-by-id?id=${idNum}`);
		console.log('resultName', resultName)
	
	
		const { data, status, status_code } = resultName.data.response;

		console.log('deta', data)

		setOverviewDetails({
			hospitalDetails: {
				image: data.Hospital_Data.image_url,
				hospitalName: data.Hospital_Data.HospitalName,
				address: `${data.Hospital_Data.barangay}, Floridablanca, Pampanga`,
				contactInfo: data.Hospital_Data.contactInfo,
				timeAvailability: "24 Hours",
				overview: data.Hospital_Data.overview
			},
			doctorDetails: data.Doctor_Data,
			facilityDetails: data.Facility_Data
		})

		} 
	
		fetchHospitalInformation();
	}, [])

	React.useEffect(() => {
		localStorage.setItem("overviewDetails", JSON.stringify(overviewDetails))
	}, [overviewDetails])

  return (
    <center>
        <UserNavbar />
        
        <div className="overview__header__div">
			<div className='overview_header_2'>
				<img src={`${process.env.REACT_APP_API_RAW_URL}/${overviewDetails.hospitalDetails.image}`}alt="hospital" className='image_size'/>
				<div className='overview'>
					<h1 className='h1_styles'>{overviewDetails.hospitalDetails.hospitalName}</h1>
					{/* <h1 className='h1_styles'>Florida Doctor's Hospital Inc.</h1> */}
					<div className='details'>
						{/* <p><i className="las la-map-marker" /> &nbsp;&nbsp;{overviewDetails.hospitalDetails.address}</p> */}
						<p><GoIcons.GoLocation color={"black"} /> &nbsp;&nbsp;{overviewDetails.hospitalDetails.address}</p>
					</div>
					<div className='additional_details'>
						<p><BsIcons.BsTelephone color={"black"} /> &nbsp;&nbsp;{overviewDetails.hospitalDetails.contactInfo}</p>
					</div>
					<div className='additional_details'>
						<p ><BsIcons.BsClockHistory color={"black"} /> &nbsp;&nbsp;{overviewDetails.hospitalDetails.timeAvailability}</p>
					</div>

				</div>
			</div>
        </div>



        <div className={`overview__wrapper`}>
			<div className="overview__bread__crumbs">
				<ul>
					<li id="item1" className={`overview__breadcrumb__item ${isOverview ? 'overview__breadcrumb__active' : ''} ${isOverview ? 'overview__highlight__active' : ''}`} onClick={()=> onStepChange('/hospital-overview')}><a className={`${isOverview ? 'overview__highlight__breadcrumb' : ''}`} href=""><i className="fas fa-search"></i> &nbsp;&nbsp;&nbsp;Overview
					</a></li>
					<li id="item2" className={`overview__breadcrumb__item ${isProvider ? 'overview__breadcrumb__active' : ''} ${isProvider ? 'overview__highlight__active' : ''}`} onClick={()=> onStepChange('/hospital-overview/healthcare-providers')}><a className={`${isProvider ? 'overview__highlight__breadcrumb' : ''}`} href=""><i className="fas fa-stethoscope"></i> &nbsp;&nbsp;&nbsp;Healthcare Providers
					</a></li>
					<li id="item3" className={`overview__breadcrumb__item ${isFacilities ? 'overview__breadcrumb__active' : ''} ${isFacilities ? 'overview__highlight__active' : ''}`} onClick={()=> onStepChange('/hospital-overview/facilities')}><a className={`${isFacilities ? 'overview__highlight__breadcrumb' : ''}`} href=""><i className="fas fa-hospital"></i> &nbsp;&nbsp;&nbsp;Facilities
					</a></li>
				</ul>
			</div>
		</div>

        {/* Breadcrumbs navigation */}
		<Switch>
			<Route path='/hospital-overview' exact>  
                <Overview overview={overviewDetails.hospitalDetails.overview} />
			</Route>
			<Route path='/hospital-overview/healthcare-providers' exact>  
                <Providers doctors={overviewDetails.doctorDetails}  />
			</Route>
			<Route path='/hospital-overview/facilities' exact>  
                <Facilities facilities={overviewDetails.facilityDetails} />
			</Route>
			<Route path='*'>
				{ <Redirect to="/hospital-overview'" /> }
			</Route>
		</Switch>

        <br /><br /><br /><br /><br /><br />
        <Footer />
    </center>
  )
}

export default HospitalOverview