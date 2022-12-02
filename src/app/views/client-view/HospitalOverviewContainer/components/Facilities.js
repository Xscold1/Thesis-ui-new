import React from 'react'

//Images
import Hospital from '../../../../styles/images/Hospital.png'
import Facility from '../../../../styles/images/sample_facility.png'

function Facilities(props) {
  const facilitiesMap = props.facilities.map((fac) => 
        <div key={fac.facilityName} className="py-1">
          <div className="card__2__facility">
            <div className="row">
              <div className="col">
                <img style={{objectFit: 'cover'}} src={`${process.env.REACT_APP_API_RAW_URL}/${fac.image_url}`} alt="hospital" className='facility-images'/>
              </div>
              <div className="col">
                <div className="card-block px-0">
                  <p className="facility-name">{fac.facilityName}</p>

                </div>
              </div>
            </div>
          </div>
        </div>
  );
  return (
    <div>
      <div className="overview__main__content">

      <div className='alignment__facility'>

      {facilitiesMap}

      </div>

      </div>
    </div>
  )
}

export default Facilities