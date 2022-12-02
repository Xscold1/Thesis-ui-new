import React from "react";

// Components 
import UserNavbar from "../Components/UserNavbar";
import Footer from "../Components/Footer";

// Styling
import './AboutUs.scss';

// Images
import Jer from '../../../styles/images/Jer.png'
import Van from '../../../styles/images/Van.png'
import Vash from '../../../styles/images//Vash.png'
import Charles from '../../../styles/images/Charles.png'
import Ferry from '../../../styles/images/Ferry.png'
import Jarish from '../../../styles/images/Jarish.png'
import AC from '../../../styles/images/AC.png'
import Quila from '../../../styles/images/Quila.png'
import {useEffect} from 'react'

function AboutUsContainer () {
  useEffect(()=>{
    localStorage.removeItem('symptomsList')
    // localStorage.removeItem('patientInfo')
  },[])
    return(
      <center>
        {/* Navigation Bar */}
        <UserNavbar />

        <section>
        <div className="aboutus__container" >
          <h1 className="heading">Meet our Team!</h1>

          <div className="aboutus_group"> 

            <div className="profiles">
              <div className="profile">
              <img className="profile-image" src = {Van}></img>
                <h3 className="profile-name">VAN EZEKIEL U. PAYUMO</h3>
                <h5 className="caption"> Front-End Lead</h5>
              </div>
            </div>
          
            <div className="profiles">
                <div className="profile">
                <img className="profile-image" src = {Jer}></img>
                  <h3 className="profile-name">JER CARLO D. CATALLO</h3>
                  <h5 className="caption" > Machine Learning Developer</h5>
                </div>
            </div>

            <div className="profiles">
              <div className="profile">
              <img className="profile-image" src = {Vash}></img>
                <h3 className="profile-name">VASH IVAN REY S. RAMOS</h3>
                <h5 className="caption">Back-End Developer</h5>
              </div>
            </div>

            <div className="profiles">
              <div className="profile">
              <img className="profile-image" src = {Charles}></img>
                <h3 className="profile-name">CHARLES JEOFREY G. ABSALON</h3>
                <h5 className="caption">Documentation/Data Analyst</h5>
              </div>
            </div>

          </div>         

          <div className="aboutus_group">

                <div className="profiles">
                  <div className="profile">
                  <img className="profile-image" src = {Ferry}></img>
                    <h3 className="profile-name">FERNANDO N. SUMANDAL III</h3>
                    <h5 className="caption">Documentation/Data Analyst</h5>
                  </div>
                </div>

                
                <div className="profiles">
                  <div className="profile">
                  <img className="profile-image" src = {Jarish}></img>
                    <h3 className="profile-name">JARISH JADE M. RAMOS</h3>
                    <h5 className="caption">Data Analyst/Design</h5>
                  </div>
                </div>

                
                <div className="profiles">
                  <div className="profile">
                  <img className="profile-image" src = {AC}></img>
                    <h3 className="profile-name">ANN CATHERINE M. DE GUIA</h3>
                    <h5 className="caption">Graphic/Front-End Designer</h5>
                  </div>
                </div>
                

                
                <div className="profiles">
                  <div className="profile">
                  <img className="profile-image" src = {Quila}></img>
                    <h3 className="profile-name">QUILA ARTHADY G. SENGSON </h3>
                    <h5 className="caption">Front-End Developer</h5>
                  </div>
                </div>
          </div> 
        </div>
        </section>
        <br />
        <Footer />
      </center>
    )
}

export default AboutUsContainer