import React from 'react'

// Styling
import './PrivacyPolicy.scss'

function PrivacyPolicy({ setPrivacyPolicyOpen }) {
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
              setPrivacyPolicyOpen(false);
            }}
          >
            X<AiIcons.AiOutlineCloseCircle className="disclaimer__close__icon" />
          </span> */}
        </div>
        <div className="title">
          <h1>Privacy Policy</h1>
          <center>
          <div className="text__container__size">
            <p>BEFORE USING THE WEBSITE, PLEASE READ THROUGH THIS ENTIRE PRIVACY
            POLICY CAREFULLY. IF YOU DO NOT AGREE WITH ANY OF THE FOLLOWING TERMS
            OF THIS PRIVACY POLICY CLOSE THE WEBSITE IMMEDIATELY. </p>

            <p className="indent__1"><strong className="strong">1. General Information</strong></p>
                <p className="indent__2">Malapit Lungs ("we," "us," and "our") value your personal information's privacy
                    and security. Therefore, we created this "Privacy Policy" to explain how we
                    manage information gathered when you visit and use our website.
                </p>

            <p className="indent__1"><strong className="strong">2. Collected information</strong></p>
                <p className="indent__2">We may ask you for certain information that identifies you individually in order
                    for you to access particular areas of the Website. Personal Information such as
                    your name, age address, and email address will be collected. Any information
                    you share with us when you contact us, for example, through the email
                    address posted on the website, may be collected.
                </p>
                <p className="indent__2"><strong className="strong">Registration</strong></p>
                <p className="indent__2">While you are not required to register to use the website, services like the
                    Symptom Checker do require that you do so in order to be accessed. You may
                    be needed to provide certain personal information if you choose to register or
                    update an existing account with MalapitLungs. You are solely responsible for
                    the accuracy of the personal information you provide to MalapitLungs.
                </p>
                <p className="indent__2"><strong className="strong">Use of Symptom Checker</strong></p>
                <p className="indent__2">MalapitLungs Symptom Checker may request that you submit health-related
                    information, along with other information, such as your age, gender, and
                    address
                </p>

            <p className="indent__1"><strong className="strong">3. Data Privacy Act of 2012</strong></p>
            <p className="indent__2">We abide by and uphold user data privacy rights in accordance with Republic
                Act 10173, or the Data Privacy Act of 2012. The information gathered won't be
                misused, maliciously disclosed, or improperly disposed of. We make every
                effort to assure compliance with each. If you believe our Privacy Policy is not
                in accordance with the act, please contact us at cs63@gmail.com.
            </p>

            <p className="indent__1"><strong className="strong">4. Disclosure of Your Information</strong></p>
            <p className="indent__2">We do not sell your Personal Information, and we do not share it with any
                third party for promotional purposes. DOH will receive some Personal
                Information to help them with data analytics. The DOH will use the data to
                look for correlations and trends, identify the areas with high morbidity rates
                for lung disease, and learn about the disease’s seasonality. It will help health
                officials to become aware of and target the areas where and when lung
                disease is most prevalent in their community.
            </p>

            <p className="indent__1"><strong className="strong">5. Security</strong></p>
            <p className="indent__2">We value the security of your Personal Information. To protect the Personal
                Information given to us, we adhere to generally established industry standards
                both during transmission and after the reception. For example, we have a
                login system to make sure that authorized persons only have access to the
                system data. We also used token-based authentication to have a digital
                signature of the authenticated user which is being passed and validated in the
                back-end, which protects all API endpoints from unwanted access. We also
                use famous, secure, and trusted web hosting to handle the deployment of the
                site. We also adhere to the best security standards during development to
                guarantee that data is safely kept, managed, and processed. If there is a data
                breach, we have security countermeasures in place.
            </p>

            <p className="indent__1"><strong className="strong">6. Storage, Correction, and Deletion of Information</strong></p>
            <p className="indent__2">We keep data for as long as it is required to offer you and others services. Your
                account information will be maintained until your account is deleted. You
                have the option to delete your account at any moment. Since we archive data
                on a regular basis, it can be kept indefinitely, even after deletion. To modify or
                complete your account information, you can access and update your account
                settings at any time.
            </p>

            <p className="indent__1"><strong className="strong">7. Contact Us</strong></p>
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
              setPrivacyPolicyOpen(false);
            }} >
                Confirm
            </button>
            
            {/* 
            <button type="submit" className="decline__button" disabled={!checked ? "disabled" : ""} onClick={() => {
              setPrivacyPolicyOpen(false);
            }} >
                Decline
            </button> */}
          
        </div>
        
      </div>
    </div>
    )
}

export default PrivacyPolicy