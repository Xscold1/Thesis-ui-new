import React, {useEffect} from 'react'

// Styling
import './Analytics.scss';
import "react-circular-progressbar/dist/styles.css";

// Components
import MachineLearning from './MachineLearning';

// Utils
import authenticate from '../../../utils/authenticate';

function Analytics() {

  useEffect(()=>{
    authenticate();
  },[]);

  return (

      <MachineLearning />

  )
}

export default Analytics