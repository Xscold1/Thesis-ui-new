import React, {useState, useMemo, useEffect} from 'react'
import { toast } from 'react-toastify';
import Map, {
    Marker,
    Popup,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl
  } from 'react-map-gl';
import axios from 'axios';

//Dependencies
import { Route, useHistory, Link } from "react-router-dom";

// Data
import sampleHospitalDetails from "./hospitalDetails"
import { useFormik } from "formik";
// Mixins
import { successToast, errorToast } from '../../../mixins/utils/toastMessageMixins';
import { useLocation } from 'react-router-dom'

// Images
import Hospital from '../../../styles/images/Hospital.png'
import mapPlaceHolder from '../../../styles/images/mapPlaceholder.png'

// JSON
import RegionIII from '../Components/Region-III.json'

const TOKEN = 'pk.eyJ1IjoidmFucGF5dW1vIiwiYSI6ImNsOHRqdjd2ZjA4NWQzd3MwaGs2cWVmbWkifQ.C16e6sD0B4JUFTauOTK1dA'; // Set your mapbox token here

//Initial Values for Formik
const initialValues = {
    barangay: "",
};

function Maps(props) {
    const auth_token = localStorage.getItem('auth_token')
    const location = useLocation();
    const [viewState, setViewState] = React.useState({
        longitude: 120.5483188480984,
        latitude: 14.986775929083882,
        zoom: 10.5
    });

    const barangays = RegionIII["PAMPANGA"].municipality_list["FLORIDABLANCA"].barangay_list;
    const barangayList = barangays.map(barangayName => {
        return (
            <option key={barangayName}>{barangayName}</option>
        )
    })

    let history = useHistory();

    const redirectHospital = (id) => {
      history.push(`/hospital-overview?id=${id}`);
    }
    
    const [popupInfo, setPopupInfo] = useState(null);
    console.log('popupInfo', popupInfo);
    const [destination, setDestination] = useState('');
    const [hospitalDetails, setHospitalDetails] = useState([])
    const markerFocus = (markerDeets) => {
        setPopupInfo(markerDeets)
        setDestination(markerDeets.hospitalAddress)
    }

    const hospitalFocus = (hospitalDeets) => {
        setPopupInfo(hospitalDeets)
        setDestination(hospitalDeets.hospitalAddress)
        setViewState({
            longitude: hospitalDeets.longitude,
            latitude: hospitalDeets.latitude,
            zoom: hospitalDeets.zoom,
        })
    }

    const hospitalUnfocus = (remove) => {
        setPopupInfo(remove)
        setDestination('')
    }

    const formik = useFormik({
        initialValues,
        onSubmit: async (values, actions) => {
            console.log('values', values)
          try {
            const data = {
                municipality: 'Floridablanca',
                barangay: values.barangay
            };
            // const queryParams = new URLSearchParams(location.search)
            
            // // data.append("barangay", values.barangay)
            // // data.append("image", facilityIm)
    
            const searchHospital = await axios.post(`${process.env.REACT_APP_API_URL}/hospital/get-hospital-by-location`,data);
            // console.log('searchHospital', searchHospital)
            
            if (searchHospital.data.status_code === 200) {
            const hospitals = searchHospital.data.response.data;
            let formattedHospitals = hospitals.map(hospital =>{
                return {
                    id: hospital.id,
                    image: hospital.image_url,
                    hospitalName: hospital.hospitalName,
                    hospitalHours: "24 hours",
                    hospitalAddress: `${hospital.barangay}, ${hospital.municipality}, ${hospital.province}`,
                    hospitalContact: hospital.contactInfo,
                    latitude:  Number(hospital.latitude),
                    longitude:  Number(hospital.longitude),
                    zoom: 10.5
                }
            })

            console.log('hospitals', hospitals)
            console.log('formattedHospitals', formattedHospitals)
            setHospitalDetails(formattedHospitals)
              actions.setSubmitting(true);
              toast.dismiss();
              successToast('Successfully filtered hospitals')
            } else {
              actions.setSubmitting(false);
              errorToast('Failed to get hospitals');
            }
          } catch (err) {
            errorToast('Something went wrong!')
          }
        },
      });
    
      const handleChange = (event) => {
        formik.handleChange(event);
        formik.handleSubmit();
      }

      useEffect(()=>{
        const init = async () =>{
            try {
                const data = {
                    municipality: 'Floridablanca',
                    barangay: ''
                };
                // const queryParams = new URLSearchParams(location.search)
                
                // // data.append("barangay", values.barangay)
                // // data.append("image", facilityIm)
        
                const searchHospital = await axios.post(`${process.env.REACT_APP_API_URL}/hospital/get-hospital-by-location`,data);
                // console.log('searchHospital', searchHospital)
                
                if (searchHospital.data.status_code === 200) {
                const hospitals = searchHospital.data.response.data;
    
                let formattedHospitals = hospitals.map(hospital =>{
                    
                    return {
                        id: hospital.id,
                        image: hospital.image_url,
                        hospitalName: hospital.hospitalName,
                        hospitalHours: "24 hours",
                        hospitalAddress: `${hospital.barangay}, ${hospital.municipality}, ${hospital.province}`,
                        hospitalContact: hospital.contactInfo,
                        latitude:  Number(hospital.latitude),
                        longitude:  Number(hospital.longitude),
                        zoom: 10.5
                    }
                })
                console.log('formattedHospitals', formattedHospitals)
                setHospitalDetails(formattedHospitals)
                  successToast('Successfully found hospitals')
                } else {
                  errorToast('Failed to get hospitals');
                }
              } catch (err) {
                errorToast('Something went wrong!')
              }
        }
        init();
      },[])


    const hospitalList = hospitalDetails.map(details => {
        return (
        <div className="results__div" key={details.id}>
        <img src={`${process.env.REACT_APP_API_RAW_URL}/${details.image}`} alt="hospital" className="hospital__pic" />
        <p className="hospital__name">{details.hospitalName}</p>
        <div>
            <p className="hospital__details"><i className="details__icon las la-clock" />&nbsp;&nbsp;{details.hospitalHours}</p>
            <p className="hospital__details"><i className="details__icon las la-map-marker" />&nbsp;&nbsp;{details.hospitalAddress}</p>
            <p className="hospital__details"><i className="details__icon las la-phone" />&nbsp;&nbsp;{details.hospitalContact}</p>
            <a href="#" className="appointment__button" onClick={()=> hospitalFocus(details)}>Go to hospital</a>
        </div>
        </div> )
    })
  return (
    <center>

    <div className="maps__page">
        <h6 className="search__results__h6">Hospitals within {formik.values.barangay ? `${formik.values.barangay}, ` : ''} FLORIDABLANCA, PAMPANGA:</h6>
        {/* <h6 className="search__results__h6">Search results <span>"{props.origin}"</span> {hospitalList.length} Medical facilities found</h6> */}
        
        <div className="maps__div">
        <form onSubmit={formik.handleSubmit}>
            {/* <select className="filter__province__dropdown" name="province" id="province" disabled>
              <option value="" hidden disabled="disabled" selected>PAMPANGA</option>
            </select>
            <select className="filter__municipality__dropdown" name="municipality" id="municipality" disabled>
              <option value="" hidden disabled="disabled" selected>FLORIDABLANCA</option>
            </select> */}
            <div className="filter__brgy__div" />
            <p className="filter__brgy__label">Filter by barangay:</p>
            <select className="filter__brgy__dropdown" name="barangay" id="barangay" onChange={e => { handleChange(e) }} value={formik.values.barangay}>
              <option value="" hidden disabled="disabled" selected>Enter Barangay</option>
              <option value="">ALL BARANGAYS</option>
              {barangayList}
            </select>
        </form>
            <div className="map__container">
                <Map
                    {...viewState}
                    onMove={evt => setViewState(evt.viewState)}
                    // mapStyle="mapbox://styles/mapbox/dark-v9"
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                    // mapStyle="mapbox://styles/vanpayumo/cl8tk945y00gz16pi58hmjjt4"
                    mapboxAccessToken={TOKEN}
                >
                    <GeolocateControl position="top-left" />
                    <FullscreenControl position="top-left" />
                    <NavigationControl position="top-left" />
                    <ScaleControl />

                    {hospitalDetails && hospitalDetails.map((hospital, index) => (
                        <Marker
                            style={{ cursor: 'pointer' }}
                            key={`marker-${index}`}
                            id={hospital.id}
                            longitude={hospital.longitude}
                            latitude={hospital.latitude}
                            anchor="bottom"
                            onClick={e => {
                                // If we let the click event propagates to the map, it will immediately close the popup
                                // with `closeOnClick: true`
                                e.originalEvent.stopPropagation();
                                markerFocus(hospital);
                            }}
                            >
                            {/* <Pin /> */}
                            {/* <img className="map__marker" src={Hospital} alt="Hospital" /> */}
                        </Marker>
                    ))}

                  {popupInfo && (
                  <Popup
                      anchor="top"
                      longitude={Number(popupInfo.longitude)}
                      latitude={Number(popupInfo.latitude)}
                      onClose={() => hospitalUnfocus(null)}
                  >
                      <div>
                      {popupInfo.hospitalName} |{' '}
                      <a onClick={()=> redirectHospital(popupInfo.id)}
                          href="#"
                      >
                          View Hospital
                      </a>
                      </div>
                      <img width="100%" src={`${process.env.REACT_APP_API_RAW_URL}/${popupInfo.image}`} />
                  </Popup>
                  )}
              </Map>
          </div>
            
        </div>

        <div className="search__results">

            {hospitalList.length > 0 ? 
             hospitalList :
             <div className="no-results__div">
              <span className="no-results__text">
                No Hospitals Found
              </span>
             </div>
             }

        </div>

    </div>

    
    </center>
  )
}

export default Maps