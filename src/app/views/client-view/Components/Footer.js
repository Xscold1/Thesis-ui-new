import React, { useState } from 'react'
import { useHistory, Link } from "react-router-dom";

// Styling
import './Footer.scss';

// Components
import DisclaimerModal from './DisclaimerModal';
import PrivacyPolicy from './PrivacyPolicy';

// Images
import Twitter from '../../../styles/images/Twitter.png'
import Facebook from '../../../styles/images/facebook.png'
import Gmail from '../../../styles/images/Gmail.png'

function Footer() {
  let history = useHistory();
  const [disclaimerModalOpen, setDisclaimerModalOpen] = useState(false);
  const [privacyPolicyOpen, setPrivacyPolicyOpen] = useState(false);

  const handleDisclaimer = () => {
    setDisclaimerModalOpen(prevState => !prevState)
  }

  const handlePolicy = () => {
    setPrivacyPolicyOpen(prevState => !prevState)
  }

  const aboutUsLink = () => {
    window.location.href = '/about-us'
  }

  return (
    <footer className="bg_footer">
      {disclaimerModalOpen && <DisclaimerModal setOpenDisclaimerModal={setDisclaimerModalOpen} />}
      {privacyPolicyOpen && <PrivacyPolicy setPrivacyPolicyOpen={setPrivacyPolicyOpen} />}

        <div className="container">
            <div className="footer_alignment">
                <div className="space__between">

                    {/* <a className="footer__item about__footer" onClick={() => history.push("/about-us")}>About Us</a>    */}
                    {/* <a className="footer__item about__footer" href="/about-us">About Us</a> */}
                    {/* <Link className="footer__item about__footer" to="/about-us">About Us</Link> */}
                    <a className="footer__item about__footer" href="#" onClick={() => aboutUsLink()}>About Us</a>
                    <a onClick={() => handleDisclaimer()} className="pointer footer__item about__footer">Disclaimer</a>  
                    <a onClick={() => handlePolicy()} className="pointer footer__item">Privacy Policy</a>
                            
                </div>
                    <a className="all-rights__reserved">© 2022 All rights reserved. </a>

                    <div className="div__contact">
                      <span className="footer__item" href="#">Contact Us </span>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <img src={Twitter} className="footer__icon" alt="twt" />&nbsp;&nbsp;
                      <img src={Facebook} className="footer__icon" alt="fb" />&nbsp;&nbsp;
                      <img src={Gmail} className="footer__icon" alt="gm" />&nbsp;&nbsp;
                    </div>
            </div>
        </div>
    </footer>
  )
}

export default Footer