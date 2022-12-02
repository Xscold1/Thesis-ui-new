import React, {useState} from 'react'
import { useHistory, Link } from "react-router-dom";
import SymptomsLanding from '../../../../styles/images/SymptomsLanding.png'

// Components
import DisclaimerModal from './DisclaimerModal'

function LandingPage() {
  const [isLandingVisited, setIsLandingVisited] = useState(
		JSON.parse(localStorage.getItem("isLandingVisited")) || false
	);

	const handleVisited = () => {
		setIsLandingVisited(true);

    window.location.href = "/symptoms-checker/patient";
	} 
	
	React.useEffect(() => {
		localStorage.setItem("isLandingVisited", JSON.stringify(isLandingVisited))
	}, [isLandingVisited])

  const [modalOpen, setDisclaimerModalOpen] = useState(true);

  return (
    <center>
        {modalOpen && <DisclaimerModal setOpenDisclaimerModal={setDisclaimerModalOpen} />}
        <div>

            <div className="landing__description__div">
            <label className="landing__label">Check your symptoms</label>
                <p className="landing__description">
                    <span className="malapit__span">Malapit</span> <span className="lungs__span">Lungs’</span> <span className="strong">symptoms checker</span> will assist you in identifying potential causes of your symptoms. 
                    It will show you a list of potential condtions once you provide a few details about your symptoms 
                    and some basic health information. 
                </p>
                <div className="symptoms-checker__blue__rounded-corner">
                  <img src={SymptomsLanding} alt="Index Pic" className="symptoms__landing__image" />
                </div>
                {/* <br />
                <p className="landing__description">
                This tool is not a substitute for medical professional advice. It is intended for informational purposes 
                only. You acknowledge that you are using this tool on your own initiative and in compliance with this disclaimer. 
                You shouldn't dismiss or put off seeking professional advice because of information you found through this. 
                In case of any medical emergency, contact your doctor right away.
                </p> */}
            </div>

            <a href="#" onClick={handleVisited} className="get__started__button ">Get Started</a>
        </div>

        <br /><br /><br />
        
    </center>
  )
}

export default LandingPage