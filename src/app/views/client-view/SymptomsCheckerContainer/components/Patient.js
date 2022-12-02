import React, { useState, useEffect } from 'react';
import PatientStep1 from './PatientStep1';
import PatientStep2 from './PatientStep2';
import PatientStep3 from './PatientStep3';
import PatientStep4 from './PatientStep4';
import PatientStep5 from './PatientStep5';

function Patient() {
  const [patientInfo, setPatientInfo] = useState(
    JSON.parse(localStorage.getItem("patientInfo")) || {
      step: 1,
      sex: '', 
      ageNumber: '', 
      ageMonthYear: '', 
      // address: {
      //   // province: 'sampol prabins',
      //   // municipality: 'sampol muni',
      //   // barangay: 'sampol brgy.'
      //   province: '',
      //   municipality: '',
      //   barangay: ''
      // },
      address: '',
      exercise: '', 
      posture: '', 
      smoker: '', 
      healthyDiet: ''
    }
  );

  const breadcrumbProgress = JSON.parse(localStorage.getItem("breadcrumbProgress")) ;

  React.useEffect(() => {
		localStorage.setItem("breadcrumbProgress", JSON.stringify(breadcrumbProgress))
	}, [breadcrumbProgress])

  React.useEffect(() => {
    localStorage.setItem("patientInfo", JSON.stringify(patientInfo))
  }, [patientInfo])

  // Proceed to next step
  const nextStep = () => {
    const { step } = patientInfo;

    setPatientInfo(prevInfo => ({
        ...prevInfo,
        step: step + 1
    }))
  };

  // Go back to prev step
  const prevStep = () => {
    const { step } = patientInfo;

    setPatientInfo(prevInfo => ({
        ...prevInfo,
        step: step - 1
    }))
    
  };

  // Handle fields change
  const handleChange = input => e => {

    setPatientInfo(prevInfo => ({
        ...prevInfo,
        [input]: e.target.value
    }))
  };

  // Handle address change
  const handleAddress = input => {

    setPatientInfo(prevInfo => ({
        ...prevInfo,
        address: input 
    }))
  };

    const { step } = patientInfo;
    const { sex, ageNumber, ageMonthYear, address, exercise, posture, smoker, healthyDiet} = patientInfo;
    const values = { sex, ageNumber, address, ageMonthYear, exercise, posture, smoker, healthyDiet};

    switch (step) {
      case 1:
        return (
          <PatientStep1
            nextStep={nextStep}
            handleChange={handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <PatientStep2
            prevStep={prevStep}
            nextStep={nextStep}
            handleChange={handleChange}
            values={values}
          />
        );
      case 3:
        return (
          <PatientStep3
            prevStep={prevStep}
            nextStep={nextStep}
            handleChange={handleChange}
            handleAddress={handleAddress}
            values={values}
          />
        );
      case 4:
        return (
          <PatientStep4
            prevStep={prevStep}
            nextStep={nextStep}
            handleChange={handleChange}
            values={values}
          />
        );
      case 5:
        return (
          <PatientStep5
          prevStep={prevStep}
          handleChange={handleChange}
          values={values}
        />
      );
      default:
        (console.log('This is a multi-step form built with React.'))
    }
}

export default Patient