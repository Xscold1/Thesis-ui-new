import React, { useState } from "react";
// import {BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

// Components
import UserNavbar from "../Components/UserNavbar";
import Footer from "../Components/Footer";
import ReadMoreModal from "../Components/ReadMoreModal";

// Styling
import './bootstrap.scss';
import './LandingPageContainer.scss';

// Images
import Logo from '../../../styles/images/logo.svg'
import Scope from '../../../styles/images/scope-icon.svg'
import Calendar from '../../../styles/images/calendar-icon.svg'
import Hospital from '../../../styles/images/hospital-icon.svg'
import Person from '../../../styles/images/person-icon.svg'
// import Image2 from '../../../styles/images/image2.svg'
import Happykid from '../../../styles/images/happy-kid.png'
import {useEffect} from 'react'

function LandingPageContainer() {
    const [readMoreOpen, setReadMoreOpen] = useState(false);
    const handleReadMore = () => {
        setReadMoreOpen(prevState => !prevState)
    }
    
    useEffect(()=>{
        localStorage.removeItem('symptomsList')
        // localStorage.removeItem('patientInfo')
      },[])
	return (
    <div className='landing__page__container'>
        {readMoreOpen && <ReadMoreModal setReadMoreOpen={setReadMoreOpen} />}

        {/* Navigation Bar */}
        <div>
            <UserNavbar />
        </div>

		{/* Hero section */}
        <section className="cta">
        <h1 className="circle"></h1>
            <div className="cta-content">
                <div className="hero_content">
                    {/* <h2 className="hero__h2 ">
                        Our Vision is for  the world to be free of Lung disease. 
                    </h2> */}
                    <h2 className="hero__h2 ">
                        Our Vision is to make healthcare more accessible to the general public while minimizing financial burden.
                    </h2>
                    <p className="hero_subheadline">MalapitLungs was developed by the 4th year Bachelor of Science in Computer Science 
                    students of Don Honorio Ventura State University to
                    provide a tool to monitor the number of lung health-related cases.</p>
                    <div>
                        <div className="landing__button">
                                <a href="#how-it-works" className="learnmore__button">Learn More</a>
                        </div>
                    </div>
                        
                </div>
            </div>
        </section>

		{/* How it works section  */}
		<section className="how__it__works" id="how-it-works">
            <div className="container px-5">
                <div className="row gx-5 align-items-center">
                    <h2 className="text-center font-alt mb-4 section__title">HOW IT WORKS</h2>
                    
                <div className="row gx-4 gx-lg-5">
                    <div className="col-lg-3 col-md-6 text-center">
                        <div className="mt-5">
						<div className="mb-2"> <img  src={Person} alt="Logo" /> </div>
                            <h3 className="hiw__step">Signup/Login</h3>
                            <p className=" mb-0 mt-4">Signup/Login with the use of email address.</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 text-center">
                        <div className="mt-5">
						<div className="mb-2 mt-4"> <img  src={Scope} alt="Logo" /> </div>
                            <h3 className="hiw__step">Symptoms Checker</h3>
                            {/* <p className=" mb-0 mt-4">Input and check symptoms with the use of Machine Learning.</p> */}
                            <p className=" mb-0 mt-4">Input and correlate symptoms to conditions with the use of Machine Learning. <a className="hiw__learnmore" onClick={() => handleReadMore()} href="#how-it-works">Read More</a></p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 text-center">
                        <div className="mt-5">
						<div className="mb-2"> <img  src={Hospital} alt="Logo" /> </div>
                            <h3 className="hiw__step">Hospital Finder</h3>
                            <p className="mb-0 mt-4">Locate nearest hospital based on user address.</p>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6 text-center">
                        <div className="mt-5">
						<div className="mb-2"> <img  src={Calendar} alt="Logo" /> </div>
                            <h3 className="hiw__step">Check available schedule</h3>
                            <p className=" mb-0 mt-4">Find available doctors nearby and look at their operating hours.</p>
                        </div>
                    </div>
                </div>
                    
                    
                </div>
            </div>
        </section>

		{/* Our Mission Section  */}

		<section id="mission">
            {/* <aside className="text-center bg-gradient-primary-to-secondary"> */}
            <aside className="mission__bg">
                <div className="container my-0 py-0 text-center res ">
                    <div className="row mb-5">
                        <div className="col mission_specific__height">
                            <h1 className="mission__text ">OUR MISSION</h1>
                            <div className="mission_div ">
                                {/* <img className="img2 " src={Happykid} alt="smilingkid" /> */}
                                <p className="mission_text_2">To provide a tool that could potentially save lives and prevent lung disease through education, advocacy and research.</p></div>
                            
                            {/* <p className="mt-3 text-white">Sample Mission description</p> */}
                            <br /><br />
                        </div>

                        <div className="row mission__left__margin">
                            <div className="col-12 col-lg-4 col-md-6">
                                <div className="card">
                                    <div className="card-body card_body_height">
                                        <br />
                                        <h3>Find a hospital near you</h3>
                                        <br />
                                        
                                        <p className="card__justify__2">Our website makes it easier for you to locate the closest medical facility/personnel by giving you an overview with a map.
                                            
                                        </p>

                                        <p className="card__justify__2">We aim to reduce lung disease morbidity rate and provide Hospital locations along with their basic information in Floridablanca, Pampanga.</p>
                                        </div>
                                        
                                </div>
                            </div>

							<div className="col-12 col-lg-4 col-md-6">
                                <div className="card">
                                    <div className="card-body card_body_height">
                                    <br />
                                    <h3>Check your symptoms</h3>
                                        <br />
                                        
                                        <p className="card__justify__2"><span className="malapit__span">Malapit</span> <span className="lungs__span">Lungs’</span> <span className="strong">symptoms checker</span> will assist you in identifying potential causes of your symptoms. 
                                        It will show you a list of potential conditions once you provide a few details about your symptoms 
                                        and some basic health information. </p>
                                        
                                </div>
                                        
                                </div>
                            </div>
							<div className="col-12 col-lg-4 col-md-6">
                                <div className="card">
                                    <div className="card-body card_body_height">
                                    <br />
                                    <h3>Analytics</h3>
                                    <br />
                                        
                                        <p className="card__justify">This system can be of help in forewarning healthcare officials in resource-limited communities. 
                                            Officials can thus allocate resources accordingly and stay ahead of many illnesses and disease outbreaks. 
                                            The symptom checker is a valuable tool that healthcare personnel must delve into further to harness its true 
                                            potential—international health surveillance. </p>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        </section>

        {/* <section className="lung-health">
           <h3>Lung Health</h3>
        </section>
        <div>
            <div>
                <h4 className="subheadline">Most Recent</h4>
                
            </div>
            <div>
                <h4 className="subheadline">Top Stories</h4>
            </div>
        </div> */}

        {/* <div className="responsive"></div> */}
        {/* Bottom */}

    <div className="pre__footer">
        <div className="container">
            <div className="footer_alignment">
                <div className="space__between">

                    {/* <div className="socmed__div">
                        <span className="follow__contact">FOLLOW US</span>
                        <a href="#" className ="pre-footer__item"><i className="socmed__icon lab la-facebook-square" />Facebook</a>  
                        <a href="#" className ="pre-footer__item"><i className="socmed__icon lab la-twitter" />Twitter</a>  
                        <a href="#" className ="pre-footer__item"><i className="socmed__icon lab la-instagram" />Instagram</a>  
                    </div>
                     
                    <div className="contact__div">
                        <span className="follow__contact">CONTACT US</span> 
                        <span className ="pre-footer__item contact__item">group63@email.com</span>  
                        <span className ="pre-footer__item contact__item">+639631211707</span>  
                    </div> */}


                    <img className="footer__logo" src={Logo} alt="Logo" />

                    <div className="socmed__div">
                        <span className="follow__contact">FOLLOW US</span>
                        <div>
                            <i className="socmed__icon lab la-facebook-square" />
                            <i className="socmed__icon lab la-twitter" />
                            <i className="socmed__icon lab la-instagram" />
                        </div>
                    </div>
                     
                            
                </div>
                    <div className="newsletter">
                        <span className="newsletter__header" href="#">SUBSCRIBE TO OUR NEWSLETTER</span>
                        <div className="custom-search">
                            <input id="subscribe" type="email" className="newsletter__input" placeholder="Enter e-mail"></input>
                            <button className="newsletter__button" type="button"><i className="fas fa-paper-plane"/></button>
                        </div>
                    </div>

            </div>
        </div>
    </div>

        {/* Footer */}
        <Footer />
    </div>
    
	)
}

export default LandingPageContainer
