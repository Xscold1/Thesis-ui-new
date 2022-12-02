import React, {useState} from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

// Components
import UserNavbar from "../Components/UserNavbar";
import Maps from './Maps'
import Landing from './Landing'

// Styling
import './HospitalFinderContainer.scss';
import { useEffect } from 'react';

function HospitalFinder() {

    useEffect(()=>{
      localStorage.removeItem('symptomsList')
      // localStorage.removeItem('patientInfo')
    },[])
    // const initialAddress = JSON.parse(localStorage.getItem("patientInfo") || {address: ''});
    // console.log('initialAddress', initialAddress.address);

    const [hospitalFinder, setHospitalFinder] = useState(
        JSON.parse(localStorage.getItem("hospitalFinder")) || {
          // origin: initialAddress.address || '',
          origin: '',
          destination: ''
        }
      );
    
    React.useEffect(() => {
        localStorage.setItem("hospitalFinder", JSON.stringify(hospitalFinder))
    }, [hospitalFinder])

    console.log(hospitalFinder);

    // Handle fields change
  const handleChange = input => e => {

    setHospitalFinder(prevInfo => ({
        ...prevInfo,
        [input]: e.target.value
    }))
  };

  return (
    <center>
		{/* Navigation Bar */}
		<UserNavbar />

    <Switch>
			<Route path='/hospital-finder' exact>  
        <Landing
            origin={hospitalFinder.origin}
            handleChange={handleChange}
        />
			</Route>
			<Route path='/hospital-finder/map' exact>  
        <Maps
          origin={hospitalFinder.origin}
          destination={hospitalFinder.destination}
          handleChange={handleChange}
        /> 
			</Route>
      <Route path='*'>  
        <Redirect to="/hospital-finder" />
			</Route>
		</Switch>

    </center>
  )
}

export default HospitalFinder