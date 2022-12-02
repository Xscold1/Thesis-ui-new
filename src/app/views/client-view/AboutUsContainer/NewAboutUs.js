import React from 'react'
import * as MdIcons from 'react-icons/md'
import * as BiIcons from 'react-icons/bi'
import * as DiIcons from 'react-icons/di'
import * as BsIcons from 'react-icons/bs'
import * as FaIcons from 'react-icons/fa'
import * as FiIcons from 'react-icons/fi'
import * as SiIcons from 'react-icons/si'
import * as GrIcons from 'react-icons/gr'

// Dependencies
import { useSpring, animated } from 'react-spring'

// Components 
import UserNavbar from "../Components/UserNavbar";
import Footer from "../Components/Footer";

// Styling
import './NewAboutUs.scss'

// Images
import Van from '../../../styles/images/Van.png'
import AC from '../../../styles/images/AC.png'
import Jer from '../../../styles/images/Jer.jpg'
import Vash from '../../../styles/images//Vash.jpg'
import Charles from '../../../styles/images/Charles.jpg'
import Ferry from '../../../styles/images/Ferry.jpg'
import Jarish from '../../../styles/images/Jarish.png'
import Quila from '../../../styles/images/Quila.png'

function NewAboutUs() {
    const textAnimation = useSpring({
        delay: 400,
        from: { opacity: 0, translateY: 50 },
        to: { opacity: 1, translateY: 0 },
    });

    const firstRowAnimation = useSpring({
        delay: 400,
        from: { opacity: 0, translateX: -70 },
        to: { opacity: 1, translateX: 0 },
    });

    const secondRowAnimation = useSpring({
        delay: 400,
        from: { opacity: 0, translateX: 70 },
        to: { opacity: 1, translateX: 0 },
    });

  return (
    <div className="new__container">
        <section className="first__section">
        <section className="second__section">  
            <UserNavbar />
            <br/><br/><br/>

            <animated.div style={textAnimation}>
                <h1 className="about__header">Meet our Team!</h1> <br/><br/>
            </animated.div>

            <animated.div style={firstRowAnimation}>
            <div className="cards__parent__container">
            
            {/* Card Div1 */}
            <div className="about__card">
                <div className="about__circle">
                    <div className="about__imgBox">
                        <img className="member__image" src={Van} alt="Van" />
                    </div>
                </div>
                <div className="about__content">
                    {/* <SiIcons.SiJavascript size={20} color="#00B2C0" />&nbsp; */}
                    <MdIcons.MdDesignServices size={20} color="#00B2C0" />&nbsp;
                    <GrIcons.GrReactjs size={20} color="#00B2C0" />&nbsp;
                    <BiIcons.BiCodeAlt size={20} color="#00B2C0" />&nbsp;
                    <h3 className="about__h3">Van Ezekiel U. Payumo</h3>
                    <div className="about__textIcon">
                        <h4 className="about__h4">Front-end Lead</h4>
                        <a href="#">
                            {/* <i className="fa fa-arrow-right" /> */}
                        </a>
                    </div>
                </div>
            </div>

            {/* Card Div2 */}
            <div className="about__card">
                <div className="about__circle">
                    <div className="about__imgBox">
                        <img className="member__image" src={Jer} alt="Jer" />
                    </div>
                </div>
                <div className="about__content">
                    <SiIcons.SiJavascript size={20} color="#00B2C0" />&nbsp;
                    <FaIcons.FaPython size={20} color="#00B2C0" />&nbsp;
                    <BiIcons.BiCodeAlt size={20} color="#00B2C0" />&nbsp;
                    <h3 className="about__h3">Jer Carlo D. <br/>Catallo</h3>
                    <div className="about__textIcon">
                        <h4 className="about__h4">Machine Learning Developer</h4>
                        <a href="#">
                            {/* <i className="fa fa-arrow-right" /> */}
                        </a>
                    </div>
                </div>
            </div>
            {/* Card Div */}
            <div className="about__card">
                <div className="about__circle">
                    <div className="about__imgBox">
                        <img className="member__image" src={Vash} alt="Vash" />
                    </div>
                </div>
                <div className="about__content">
                    <SiIcons.SiJavascript size={20} color="#00B2C0" />&nbsp;
                    <SiIcons.SiMysql size={20} color="#00B2C0" />&nbsp;
                    <BiIcons.BiCodeAlt size={20} color="#00B2C0" />&nbsp;
                    <h3 className="about__h3">Vash Ivan Rey S. Ramos</h3>
                    <div className="about__textIcon">
                        <h4 className="about__h4">Back-end Developer</h4>
                        <a href="#">
                            {/* <i className="fa fa-arrow-right" /> */}
                        </a>
                    </div>
                </div>
            </div>
            {/* Card Div */}
            <div className="about__card">
                <div className="about__circle">
                    <div className="about__imgBox">
                        <img className="member__image" src={Charles} alt="Charles" />
                    </div>
                </div>
                <div className="about__content">
                    <BsIcons.BsFillJournalBookmarkFill size={20} color="#00B2C0" />&nbsp;
                    <FaIcons.FaFileWord size={20} color="#00B2C0" />&nbsp;
                    <DiIcons.DiGoogleAnalytics size={20} color="#00B2C0" />&nbsp;
                    <h3 className="about__h3">Charles Jeofrey G. Absalon</h3>
                    <div className="about__textIcon">
                        <h4 className="about__h4">Documentation/Data Analyst</h4>
                        <a href="#">
                            {/* <i className="fa fa-arrow-right" /> */}
                        </a>
                    </div>
                </div>
            </div>

            </div>
            </animated.div>

            <animated.div style={secondRowAnimation}>
            <div className="cards__parent__container">
                
            

            {/* Card Div */}
            <div className="about__card">
                <div className="about__circle">
                    <div className="about__imgBox">
                        <img className="member__image" src={Ferry} alt="Ferry" />
                    </div>
                </div>
                <div className="about__content">
                    <BsIcons.BsFillJournalBookmarkFill size={20} color="#00B2C0" />&nbsp;
                    <FaIcons.FaFileWord size={20} color="#00B2C0" />&nbsp;
                    <DiIcons.DiGoogleAnalytics size={20} color="#00B2C0" />&nbsp;
                    <h3 className="about__h3">Fernando N. Sumandal III</h3>
                    <div className="about__textIcon">
                        <h4 className="about__h4">Documentation/Data Analyst</h4>
                        <a href="#">
                            {/* <i className="fa fa-arrow-right" /> */}
                        </a>
                    </div>
                </div>
            </div>
            {/* Card Div */}
            <div className="about__card">
                <div className="about__circle">
                    <div className="about__imgBox">
                        <img className="member__image" src={Jarish} alt="Jarish" />
                    </div>
                </div>
                <div className="about__content">
                    <BsIcons.BsFillJournalBookmarkFill size={20} color="#00B2C0" />&nbsp;
                    <FaIcons.FaFileWord size={20} color="#00B2C0" />&nbsp;
                    <DiIcons.DiGoogleAnalytics size={20} color="#00B2C0" />&nbsp;
                    <h3 className="about__h3">Jarish Jade M. Ramos</h3>
                    <div className="about__textIcon">
                        <h4 className="about__h4">Data Analyst/Design</h4>
                        <a href="#">
                            {/* <i className="fa fa-arrow-right" /> */}
                        </a>
                    </div>
                </div>
            </div>
            {/* Card Div */}
            <div className="about__card">
                <div className="about__circle">
                    <div className="about__imgBox">
                        <img className="member__image" src={AC} alt="AC" />
                    </div>
                </div>
                <div className="about__content">
                    <BsIcons.BsFillJournalBookmarkFill size={20} color="#00B2C0" />&nbsp;
                    {/* <SiIcons.SiAdobeillustrator size={20} color="#00B2C0" />&nbsp; */}
                    <FiIcons.FiFigma size={20} color="#00B2C0" />&nbsp;
                    <MdIcons.MdDesignServices size={20} color="#00B2C0" />&nbsp;
                    <h3 className="about__h3">Ann Catherine M. De Guia</h3>
                    <div className="about__textIcon">
                        <h4 className="about__h4">Documentation | Designer</h4>
                        <a href="#">
                            {/* <i className="fa fa-arrow-right" /> */}
                        </a>
                    </div>
                </div>
            </div>
            {/* Card Div */}
            <div className="about__card">
                <div className="about__circle">
                    <div className="about__imgBox">
                        <img className="member__image" src={Quila} alt="Quila" />
                    </div>
                </div>
                <div className="about__content">
                <BsIcons.BsFillJournalBookmarkFill size={20} color="#00B2C0" />&nbsp;
                    <FaIcons.FaFileWord size={20} color="#00B2C0" />&nbsp;
                    <MdIcons.MdDesignServices size={20} color="#00B2C0" />&nbsp;
                    <h3 className="about__h3">Quila Arthady G. Sengson</h3>
                    <div className="about__textIcon">
                        <h4 className="about__h4">Documentation | Front-end</h4>
                        <a href="#">
                            {/* <i className="fa fa-arrow-right" /> */}
                        </a>
                    </div>
                </div>
            </div>

            </div>
            </animated.div>

        </section>
        </section>
    </div>
  )
}

export default NewAboutUs