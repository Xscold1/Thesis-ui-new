import React, { useState } from 'react'
import { useEffect } from 'react';
import { BodyComponent } from "reactjs-human-body";
import HumanBody from '../../../../styles/images/HumanBody.png';
import HumanBodyArrow from '../../../../styles/images/humanbody_arrow.png';
import Logo from '../../../../styles/images/logo.svg'
import axios from 'axios';
import { useHistory, Link } from "react-router-dom";

// Walking GIF
import WalkingGIF from '../../../../styles/images/walking-glowing-body.gif';
import SevereModal from './SevereModal';

function Symptoms() {
  const [inputBox, setInputBox] = React.useState('')
  const [list,setList] = React.useState();
  const [symptomsList, setSymptomsList] = React.useState(
    JSON.parse(localStorage.getItem("symptomsList")) || []
  );
  const [severeModal, setSevereModal] = useState(false);

  const [breadcrumbProgress, setBreadcrumbProgress] = useState(
		JSON.parse(localStorage.getItem("breadcrumbProgress")) 
  );

  const firstRender = () => {
		setBreadcrumbProgress(prevInfo => ({
			...prevInfo,
			twoQuarters: true
		}));
	}

  const constant = 0;

  React.useEffect(() => {
    firstRender()
  }, [constant])

  const updateCrumb = () => {
		setBreadcrumbProgress(prevInfo => ({
			...prevInfo,
			threeQuarters: true
		}));
	}

	React.useEffect(() => {
		localStorage.setItem("breadcrumbProgress", JSON.stringify(breadcrumbProgress))
	}, [breadcrumbProgress])

  const [symptomsSet, setSymptomsSet] = React.useState([]);

  React.useEffect(() => {
		const fetchSymptomsInformation = async () => {
		  const resultName = await axios.get(`${process.env.REACT_APP_API_URL}/symptom-checker/supported-symptoms`);

		console.log('deta', resultName.data.response)

    setSymptomsSet(resultName.data.response)

		} 
	
		fetchSymptomsInformation();
	}, [])


  const symptomsInputMap = symptomsList.map((item) => 
    <div className="symptoms-list__div">
      <p key={item}>{item}</p>
      <i className="delete__icon fas fa-trash" onClick={() => setSymptomsList(list => list.filter((li) => li !== item))} />
    </div>
  );
 
  React.useEffect(() => {
    localStorage.setItem("symptomsList", JSON.stringify(symptomsList))
  }, [symptomsList])

  const [highlightedResult, setHighlightedResult] = useState({
      resultId:'',
      details: ''
    });

  React.useEffect(() => {
    localStorage.setItem("highlightedResult", JSON.stringify(highlightedResult))
  }, [highlightedResult])

  function addSymptom(value) {
    if (symptomsList.includes(value)) {
      return;
    } else {
      setSymptomsList(prevState => {
        return [...prevState, value]
      })
    }
    setInputBox("");
  }

  // Body parts
  const headArea = document.getElementById('head');
  const lShoulderArea = document.getElementById('left_shoulder');
  const rShoulderArea = document.getElementById('right_shoulder');
  const lArmArea = document.getElementById('left_arm');
  const rArmArea = document.getElementById('right_arm');
  const chestArea = document.getElementById('chest');
  const stomachArea = document.getElementById('stomach');
  const lLegArea = document.getElementById('left_leg');
  const rLegArea = document.getElementById('right_leg');
  const lHandArea = document.getElementById('left_hand');
  const rHandArea = document.getElementById('right_hand');
  const lFootArea = document.getElementById('left_foot');
  const rFootArea = document.getElementById('right_foot');

  // Conditionals
  const isHead = symptomsList.includes('Cough (0-2 days)') || symptomsList.includes('Cough (3-4 days)') || symptomsList.includes('Cough (5-6 days)') || symptomsList.includes('Cough (more than 1 week)')
    || symptomsList.includes('Shortness Of Breath') || symptomsList.includes('Dizziness') || symptomsList.includes('Blue Lips Or Fingers')
    || symptomsList.includes('Headache (0-7 hours)') || symptomsList.includes('Wheezing') || symptomsList.includes('Difficulty Breathing') || symptomsList.includes('Chronic Cough')
    || symptomsList.includes('Phlegm') || symptomsList.includes('Cough With Phlegm') || symptomsList.includes('Frequent Fever') || symptomsList.includes('Sudden Onset Fever')
    || symptomsList.includes('Dry Cough') || symptomsList.includes('Headache (8-15 hours)') || symptomsList.includes('Headache (16-23 hours)') || symptomsList.includes('Headache (more than 1 day)')
    || symptomsList.includes('Runny Nose') || symptomsList.includes('Sore Throat') || symptomsList.includes('Fever') || symptomsList.includes('Vomiting') || symptomsList.includes('Sweating')
    || symptomsList.includes('Cough With Blood') || symptomsList.includes('Hoarseness') || symptomsList.includes('Nausea') || symptomsList.includes('High Fever') 
    || symptomsList.includes('Swelling In The Neck') || symptomsList.includes('Infections Keep Coming Back (Pneumonia And Bronchitis)') || symptomsList.includes('Chills');

  const isShoulder = symptomsList.includes('Muscle Pain') || symptomsList.includes('Sweating') || symptomsList.includes('Chills');
  const isArm = symptomsList.includes('Muscle Pain') || symptomsList.includes('Sweating') || symptomsList.includes('Chills');
  const isChest = symptomsList.includes('Cough (0-2 days)') || symptomsList.includes('Cough (3-4 days)') || symptomsList.includes('Cough (5-6 days)') || symptomsList.includes('Cough (more than 1 week)')
    || symptomsList.includes('Chest Pain') || symptomsList.includes('Shortness of Breath') || symptomsList.includes('Rapid Breathing') || symptomsList.includes('Chest Tightness')
    || symptomsList.includes('Wheezing') || symptomsList.includes('Difficulty Breathing') || symptomsList.includes('Chronic Cough')|| symptomsList.includes('Phlegm') || symptomsList.includes('Cough With Phlegm')
    || symptomsList.includes('Dry Cough') || symptomsList.includes('Sore Throat') || symptomsList.includes('Sweating') || symptomsList.includes('Hoarseness')
    || symptomsList.includes('Infections Keep Coming Back (Pneumonia And Bronchitis)') || symptomsList.includes('Chills')|| symptomsList.includes('Cough With Blood') || symptomsList.includes('Shortness Of Breath')
    || symptomsList.includes('Muscle Pain');
  const isStomach = symptomsList.includes('Loss Of Appetite') || symptomsList.includes('Sweating') || symptomsList.includes('Unintended Weight Loss') || symptomsList.includes('Muscle Pain');
  const isLeg = symptomsList.includes('Muscle Pain') || symptomsList.includes('Swollen Feet, Ankles Or Legs') || symptomsList.includes('Unintended Weight Loss');
  const isHand = symptomsList.includes('Blue Lips Or Fingers') || symptomsList.includes('Clubbing Of Fingers And Toes');
  const isFeet = symptomsList.includes('Clubbing Of Fingers And Toes') || symptomsList.includes('Swollen Feet, Ankles Or Legs');

  const [bodyState, setBodyState] = useState({
    head: {
      show: true,
      selected: isHead,
    },
    left_shoulder: {
      show: true,
      selected: isShoulder
    },
    right_shoulder: {
      show: true,
      selected: isShoulder
    },
    left_arm: {
      show: true,
      selected: isArm
    },
    right_arm: {
      show: true,
      selected: isArm
    },
    chest: {
      show: true,
      selected: isChest
    },
    stomach: {
      show: true,
      selected: isStomach
    },
    left_leg: {
      show: true,
      selected: isLeg
    },
    right_leg: {
      show: true,
      selected: isLeg
    },
    left_hand: {
      show: true,
      selected: isHand
    },
    right_hand: {
      show: true,
      selected: isHand
    },
    left_foot: {
      show: true,
      selected: isFeet
    },
    right_foot: {
      show: true,
      selected: isFeet
    }
  });

  function filterFunction(area, isTrue){
    if (isTrue) {
      area.classList.add('selected');
    } else {
      area.classList.remove('selected');
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('This will run after .05 seconds!')
      filterFunction(headArea, isHead)
      filterFunction(lShoulderArea, isShoulder)
      filterFunction(rShoulderArea, isShoulder)
      filterFunction(lArmArea, isArm)
      filterFunction(rArmArea, isArm)
      filterFunction(chestArea, isChest)
      filterFunction(stomachArea, isStomach)
      filterFunction(lFootArea, isFeet)
      filterFunction(rFootArea, isFeet)
      filterFunction(lLegArea, isLeg)
      filterFunction(rLegArea, isLeg)
      filterFunction(lHandArea, isHand)
      filterFunction(rHandArea, isHand)
    }, 50);
    return () => clearTimeout(timer);
  }, [symptomsList]);

  function clearSymptoms() {
    setSymptomsList([]);
    setInputBox("");
  }

  // Severe symptoms
  React.useEffect(() => {
    const lastElement = symptomsList[symptomsList.length-1];
    if (lastElement === ("Chronic Cough") || lastElement === ("Cough With Blood")) {
      setSevereModal(true);
    }
  }, [symptomsList])

  // ===== Start of autocomplete JS code ===== //

    // Sort symptomsSet in ascending order
    let sortedSymptomsSet = symptomsSet.sort();

  function removeElements() {
    setList(null)
  }  

  React.useEffect(()=>{
    // console.log(list)
  },[list])

  // ===== End of autocomplete JS code ===== //
  
  return (
    <center>

    { severeModal && <SevereModal setSevereModal={setSevereModal} /> }
    <div className="main__content">

    {/* <p className="step__indicator">Step 1 out of 1</p> */}
    <p className="step__indicator">Step 1/1</p>
    <label className="symptoms__label" htmlFor="symptoms">Add your symptoms</label><br />

    
      <div className="symptoms__autocomplete">
      <input className="symptoms__searchbar" onKeyUp={(e)=>{
   
        let inputSymp = e.target;
          // Initially remove all elements (so if user erases a letter or adds new letter then clean previous outputs)
          removeElements();

          if(inputSymp){
            
          }
        let arr = []
        
        for(let i of sortedSymptomsSet) {
          let matchIndex = i.toLowerCase().indexOf(inputSymp.value.toLowerCase());

          // Convert input to lowercase and compare with each string
          if(i.toLowerCase().includes(inputSymp.value.toLowerCase()) && inputSymp.value !== "") {
              arr.push(
                <li className="list-items" key={i}>
                  
                    {/* Fetch the first characters for suggestion string (unhighlighted) */}
                    <span>{i.substring(0, matchIndex)}</span>

                      {/* Highlight matched string from input box */}
                      <b>
                        {i.substring(matchIndex, matchIndex+inputSymp.value.length)}
                      </b>

                    {/* Fetch the rest of the characters */}
                    <span>{i.substring(matchIndex+inputSymp.value.length)}</span>

                  {symptomsList.includes(i) ? <span className="added__symptom__button">&#10004;</span> : <span onClick={()=> addSymptom(i)} className="add__symptom__button">ADD</span>}
                
                </li>)
          }
         
      }
        setList(
          arr
        )
      }} autoComplete="off" placeholder="Search eg. Fever" name="symptoms" id="symptoms" value={inputBox} onChange={e => setInputBox(e.target.value)} />
      <i className="las la-search search__input__icon" />
        <ul className={`list ${!list || inputBox === '' ? 'hidden' : ''}`}>
          {list && list.map(item=>{
            return item;
          })}
          {/* <li className={`list-items hidden ${ list.length===0 ? 'unhidden' : ''}`}>No Results</li> */}
        </ul>
      </div>

      {/* <img alt="humanbody" src={Logo} className="humanbody__image"></img> */}
      <div className="humanbody__div" />
      <div className="humanbody__image">
        <BodyComponent partsInput={bodyState} />
      </div>
    
      <br /><br />

      <p className="symptoms__array__header">My symptoms:</p>

      <div className="symptoms__input__div">
        {/* {symptomsInputMap.length>0 ? props.handleCrumb('twoQuarters') : ''} */}
        {symptomsInputMap.length>0 ? <div>{symptomsInputMap}</div> : <center><p className="symptoms__array">No symptoms added</p></center>}
      </div>

    </div>

    <div className="symptom__buttons">
      <button className='clear__symptom' onClick={clearSymptoms} disabled={symptomsInputMap.length>0 ? '' : 'disabled'}>Clear</button>
      &nbsp;&nbsp;
    </div>

      <Link className="symptoms__prev__page" to="patient"><i className="fas fa-arrow-left"></i>Previous</Link>

      {/* <a className={`symptoms__prev__page`} href="patient"><span>〈 </span> Previous</a> */}
      {/* <a className={`symptoms__next__page ${symptomsInputMap.length>0 ? '' : 'disabled__next'}`} onClick={updateCrumb} href="conditions">Next <span>&#x3009;</span></a> */}

      <Link className={`symptoms__next__page ${symptomsInputMap.length>0 ? '' : 'disabled__next'}`} onClick={updateCrumb} to="conditions"><button className="patient-info__next">Next {`>`}</button></Link> 
    </center>
    
  
  )
}

export default Symptoms