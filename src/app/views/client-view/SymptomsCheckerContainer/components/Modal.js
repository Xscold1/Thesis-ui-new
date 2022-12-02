import React from "react";

function Modal({ setOpenModal }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <span
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </span>
        </div>
        <div className="title no__margin">
          <h1>Understanding Your Results</h1>
          <p>Match strength shows how well the symptoms you entered match the symptoms of each condition. It is not the likelihood of having the condition.</p>
          <p>Just because a condition is listed here, does not mean that you have it. Some of the conditions on this list are less frequently diagnosed.</p>
          <p>Talk to your doctor to understand what your symptoms may mean.</p>
          
        </div>
        <div className="body">
          <h1>Match Strength Key</h1>

          {/* Low Result */}
          <div className="strength-key__container">
            <div className="strength__key">
                  <div className="modal-conditions__div">
                    <a className="condition__result" href="#"> Low </a>

                    <div className="modal__progress-segment">
                      <div className="item fill-bar"></div>
                      <div className="item hollow-bar"></div>
                      <div className="item hollow-bar"></div>
                      <div className="item hollow-bar"></div>
                    </div>

                    <p className="match__strength">
                      LOW MATCH
                    </p>

                  </div>
            </div>

            <div className="strength-key__description"><p>The symptoms you entered have a relatively <strong>low match (0.1% to 25%)</strong> with the symptoms of this condition.</p></div>
          </div>

          {/* Fair Result */}
          <div className="strength-key__container">
            <div className="strength__key">
                  <div className="modal-conditions__div">
                    <a className="condition__result" href="#"> Fair </a>

                    <div className="modal__progress-segment">
                      <div className="item fill-bar"></div>
                      <div className="item fill-bar"></div>
                      <div className="item hollow-bar"></div>
                      <div className="item hollow-bar"></div>
                    </div>

                    <p className="match__strength">
                      FAIR MATCH
                    </p>

                  </div>
            </div>

            <div className="strength-key__description"><p>The symptoms you entered appear to have a <strong>fair match (25.1% to 50%)</strong> with the symptoms of this condition.</p></div>
          </div>

          {/* Moderate Result */}
          <div className="strength-key__container">
            <div className="strength__key">
                  <div className="modal-conditions__div">
                    <a className="condition__result" href="#"> Moderate </a>

                    <div className="modal__progress-segment">
                      <div className="item fill-bar"></div>
                      <div className="item fill-bar"></div>
                      <div className="item fill-bar"></div>
                      <div className="item hollow-bar"></div>
                    </div>

                    <p className="match__strength">
                      MODERATE MATCH
                    </p>

                  </div>
            </div>

            <div className="strength-key__description"><p>The symptoms you entered are a <strong>moderate match (50.1% to 75%)</strong> with the symptoms of this condition.</p></div>
          </div>

          {/* Strong Result */}
          <div className="strength-key__container">
            <div className="strength__key">
                  <div className="modal-conditions__div">
                    <a className="condition__result" href="#"> Strong </a>

                    <div className="modal__progress-segment">
                      <div className="item fill-bar"></div>
                      <div className="item fill-bar"></div>
                      <div className="item fill-bar"></div>
                      <div className="item fill-bar"></div>
                    </div>

                    <p className="match__strength">
                      STRONG MATCH
                    </p>

                  </div>
            </div>

            <div className="strength-key__description"><p>The symptoms you entered are a <strong>strong match (75.1% to 100%)</strong> with the symptoms of this condition.</p></div>
          </div>

        </div>

        
      </div>
    </div>
  );
}

export default Modal;