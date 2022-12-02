import React from 'react'

function TermsOfUse({ setTermsOpen }) {
    const [checked, setChecked] = React.useState(false);

    const handleChecked = () => {
        setChecked(prevState => prevState = !prevState)
    }

    return (
        <div className="modalBackground">
      <div className="altDisclaimerModalContainer">
        <div className="titleCloseBtn white">
          {/* <span
            onClick={() => {
              setTermsOpen(false);
            }}
          >
            X<AiIcons.AiOutlineCloseCircle className="disclaimer__close__icon" />
          </span> */}
        </div>
        <div className="title">
          <h1>Terms of Use</h1>
          <center>
          <div className="text__container__size">
            <p>BEFORE USING THIS WEBSITE KINDLY READ THE TERMS AND CONDITIONS
                CAREFULLY. IF YOU DO NOT AGREE WITH ANY OF THE FOLLOWING TERMS, CLOSE
                THE WEBSITE IMMEDIATELY. </p>

            <p className="indent__1"><strong className="strong">1. General Information</strong></p>
                <p className="indent__2">You may access and use the Website only in accordance with the terms and
                    conditions set forth in these terms and conditions. You accept these Terms of
                    Use and the processing of your personal data in accordance with our Privacy
                    Policy, which is incorporated herein by reference, by accessing and browsing
                    any area of the Website. Use of the Website should end right once if you
                    disagree with any term or condition of these Terms of Use or our Privacy
                    Policy.
                </p>

            <p className="indent__1"><strong className="strong">2. Your Use of the Website</strong></p>
                <p className="indent__2">You are only permitted to access and use the Website for authorized,
                    non-commercial purposes. You may not access or use the Website in any way
                    that may damage, disable, overburden, or impair our servers or networks, or
                    interfere with the access, use, or enjoyment of the Website by any other
                    individual. You may not use hacking, password mining, or any other method
                    to gain unauthorized access to any user account, user information, computer
                    systems, or networks.
                </p>

                <p className="indent__2">If we find, in our absolute discretion, that you have violated any of these Terms
                    of Use, your permission to use the website is immediately terminated without
                    notice.
                </p>

            {/* <p className="indent__1"><strong className="strong">3. Liability of MalapitLungs</strong></p>
            <p className="indent__2">==========================================================
            </p> */}

            {/* <p className="indent__1"><strong className="strong">4. Contact Us</strong></p> */}
            <p className="indent__1"><strong className="strong">3. Contact Us</strong></p>
            <p className="indent__2">Use the email address cs63@gmail.com to contact us if you have any queries
                or concerns about this Privacy Policy or your data.
            </p>


          </div>
          </center>

            <label htmlFor="agreeCheckbox" className="address__terms"><input className="form-check-input address__checkbox" 
                type="checkbox" id="agreeCheckbox" name="agreeCheckbox" onClick={handleChecked} /> 

                &nbsp; I understand and I wish to proceed
            </label><br />

            <button type="submit" className="confirm__button" disabled={!checked ? "disabled" : ""} onClick={() => {
              setTermsOpen(false);
            }} >
                Confirm
            </button>
            
            {/* 
            <button type="submit" className="decline__button" disabled={!checked ? "disabled" : ""} onClick={() => {
              setTermsOpen(false);
            }} >
                Decline
            </button> */}
          
        </div>
        
      </div>
    </div>
    )
}

export default TermsOfUse