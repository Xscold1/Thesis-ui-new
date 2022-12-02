import React from 'react'

//Images
import Doctor from '../../../../styles/images/sample_image.png'

function Providers(props) {
  console.log('provprops', props);
  const  doctorsMap = props.doctors.map((doc) => 
    <div className="py-1 card__size">
    <div className="card__2">
      <div className="row ">
        <div className="col">
          <img src={`${process.env.REACT_APP_API_RAW_URL}/${doc.image_url}`} alt="sample doctor" className='doctors-images'/>
        </div>
        <div className="col">
          <div className="card-block px-0">
            <p className="doctor-name">{doc.firstName} {doc.lastName}</p>
            <p className="speciality">{JSON.parse(doc.specialization) && JSON.parse(doc.specialization).map((special)=>{
              return <>
              <p className="availability" style={{fontSize: '0.8em'}}>{special}</p>
              </>
            })}</p>
            {doc.schedule && doc.schedule.map(sched =>{
              return <>
              <p className="doctor-name" style={{paddingTop: '1em', fontSize: '0.8em'}}>{sched.day}</p>
              <p className="availability" style={{fontSize: '0.8em'}}>{sched.time}</p>
              </>
            })}
          </div>
        </div>
      </div>
    </div>
    </div>
);
  return (
    <div>
      <div className="overview__main__content">

        <div className='alignment'>

          {doctorsMap}

        </div>

      </div>
    </div>
  )
}

export default Providers