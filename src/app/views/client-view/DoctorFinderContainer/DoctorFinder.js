import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch, useHistory, Redirect } from "react-router-dom";
import { useLocation } from 'react-router-dom'
import axios from 'axios';

// Components
import UserNavbar from "../Components/UserNavbar";
import Footer from "../Components/Footer";
import { toast } from 'react-toastify';
import { successToast } from '../../../mixins/utils/toastMessageMixins';

// Styling
import './DoctorFinder.scss';

//Images
import Doctor from '../../../styles/images/sample_image.png'

function DoctorFinder() {
    const history = useHistory();
	const location = useLocation();

    const redirectHospital = (id) => {
        history.push(`/hospital-overview?id=${id}`);
    }

    const onStepChange = (path)=>{
		history.push(path)
	}

    const [filter, setFilter] = useState('');
    const [specializationList, setSpecializationList] = useState('');
    const [specializationMap, setSpecializationMap] = useState('');
    const [doctorList, setDoctorList] = useState([]);

    const handleFilter = e => {
        setFilter(e.target.value)
    }

    React.useEffect(()=>{
        const init = async ()=>{
            const specializationRes = await axios.get(`${process.env.REACT_APP_API_URL}/doctor/get-all-doctor-specialization`);
              let specializationFormatted = specializationRes.data.response.data;
              console.log('specFormatted', specializationFormatted);

              setSpecializationList(specializationFormatted)

        }
        init()
    }, [])

	React.useEffect(() => {
		const fetchHospitalInformation = async () => {
		const resultName = await axios.get(`${process.env.REACT_APP_API_URL}/doctor/get-all-doctor-by-specialization?specialization=${filter}`);
		// console.log('resultName', resultName)
	
	
		const { data, status, status_code } = resultName.data.response;

		console.log('Spec', data)

		setDoctorList(data);
        
            if (filter !== '') {
                toast.dismiss();
                successToast('Successfully filtered doctors')
            }

        } 
	
		fetchHospitalInformation();
	}, [filter])

    const doctorsMap = doctorList.map((doc) => 
        <div className="py-1 card__size">
            <div className="card__2">
                <div className="row ">
                    <div className="col">
                    <img src={`${process.env.REACT_APP_API_RAW_URL}/${doc.image_url}`} alt="Doctor" className='doctors-images'/>
                    </div>
                    <div className="col">
                    <div className="card-block px-0">
                        <p className="doctor-name">{doc.firstName} {doc.lastName}</p>
                        <p className="speciality">{(doc.specialization).replace(/[\[\]"]+/g,'')}</p>

                        <div className="labels__div">
                        <p className="doctor-name" style={{paddingTop: '1em', fontSize: '0.8em'}}>Main Affiliate:</p>
                        <p className="availability" style={{fontSize: '0.8em'}}>DR. GIL G. DECIERTO MEDICAL CLINIC</p>
                        </div>
                        
                    </div>
                    
                    <a onClick={()=> redirectHospital(doc.Affiliate[0].affiliateHospitalId)} className="affiliate__button">View Main Affiliate</a>
                    </div>
                </div>
            </div>
        </div>
    );

    React.useEffect(() => {
        if (specializationList) {
            const specializationMap = specializationList.map((specialization) => 
                <option key={specialization} value={specialization}>{specialization}</option>
            )

            setSpecializationMap(specializationMap);
        }
    }, [specializationList]) 

  return (
    <center>
        <UserNavbar />
        
        <div className="doctor-finder__header__div">
			<div className='overview_header_2'>
				<div className='overview'>
					<h1 className='h1_styles'>Doctor Finder</h1>
                    <select onChange={handleFilter} className="filter__doctor__dropdown" name="barangay" id="barangay" value={filter}>
                        <option value="" hidden disabled="disabled" selected>Filter by Specialization</option>
                        <option key="All" value="" >ALL DOCTORS</option>
                        {specializationMap}
                    </select>
				</div>
			</div>
        </div>

        <div className="overview__main__content">
        <div className='alignment'>

            {/* <div className="py-1 card__size">
                <div className="card__2">
                    <div className="row ">
                        <div className="col">
                        <img src={Doctor} alt="Doctor" className='doctors-images'/>
                        </div>
                        <div className="col">
                        <div className="card-block px-0">
                            <p className="doctor-name">Dr. Jane S. Domagoso</p>
                            <p className="speciality">Adobo</p>

                            <div className="labels__div">
                            <p className="doctor-name" style={{paddingTop: '1em', fontSize: '0.8em'}}>Main Affiliate:</p>
                            <p className="availability" style={{fontSize: '0.8em'}}>DR. GIL G. DECIERTO MEDICAL CLINIC</p>
                            </div>
                            
                        </div>
                        
                        <a onClick={()=> redirectHospital(5)} className="affiliate__button">View Main Affiliate</a>
                        </div>
                    </div>
                </div>
            </div> */}

            {doctorList.length===0 ? 
            <div className='center__grid'>
                <h1>Pick a specialization to see results</h1>
            </div>
                : 
                ''
            }

            {doctorsMap} 
            

        </div>
        </div>

        <br /><br /><br /><br /><br /><br />
        <Footer />
    </center>
  )
}

export default DoctorFinder