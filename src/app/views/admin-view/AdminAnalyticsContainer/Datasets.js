import React, { useEffect, useState } from "react";
import axios from 'axios';
import lodash from 'lodash';

import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import RadialSeparators from "./components/RadialSeparators";

// Styling
import './Analytics.scss';

// Utils
import authenticate from '../../../utils/authenticate';

// Constants
import { STATUS_CODES, ERROR_MSG, SUCCESS_MSG } from '../../../constants/status-constants';

// Mixins
import { successToast, errorToast } from '../../../mixins/utils/toastMessageMixins';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Datasets() {
  useEffect(()=>{
    authenticate();
  },[]);

  const auth_token = localStorage.getItem('auth_token')

  const [datasetsData, setDatasetsData] = useState({
    datasets: [],
  })
  const [datasetsOptions, setDatasetsOptions] = useState({});

  const [fetchedDatasets, setFetchedDatasets] = useState({})

  const [labels, setLabels] = useState([])
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchDatasets = async () => {
    const resultName = await axios.get(`${process.env.REACT_APP_API_URL}/dataset/datasets-per-disease`, {
      headers: {
          Authorization: `Bearer ${auth_token}`
      }
    });
  
    const { data, status, status_code } = resultName.data.response;

    setFetchedDatasets(data);

    } 

    fetchDatasets();
  }, [])

  useEffect(() => {
    const datasets = fetchedDatasets

    if (fetchedDatasets) {
      setLabels([]);
      setData([]);
  }

    for(const key in datasets) {
      setLabels(prevData => [...prevData, key]);
      setData(prevData => [...prevData, datasets[key]])
    }
  }, [fetchedDatasets])

  // const migrateDatasets = async () => {
    // await axios.post(`${process.env.REACT_APP_API_URL}/dataset/create`, {
    //   headers: {
    //       Authorization: `Bearer ${auth_token}`
    //   }
    // });
  // } 

  const migrateDatasets = async () => {
    try {

      const migrateRes = await axios.post(`${process.env.REACT_APP_API_URL}/dataset/create`, {}, {
        headers: {
            Authorization: `Bearer ${auth_token}`
        }
      });

      if(migrateRes.data.status_code !== 200){
        errorToast(migrateRes.data.response.error)
      }else if(migrateRes.data.status_code === 200){
        successToast('Dataset Migration Successful')
      }

    } catch (err) {
      errorToast(ERROR_MSG.INTERNAL_ERROR_TITLE)
    }
  } 

  useEffect(() => {
    setDatasetsData({
      labels: labels,
      datasets: [
        {
          label: 'No. of Datasets',
          data: data,
        }
      ]
    });

    setDatasetsOptions({
      responsive: true,
      indexAxis: 'y',
      plugins : {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: 'No. of Respondents per Barangay'
        }
      },
      // borderColor: "red"
      backgroundColor: [
        "#363740"
      ],
      borderColor: [
        "#00B2C0"
      ],
      borderWidth: 3
    })
  }, [labels])

    const [variable, setVariable] = useState('');
    const [condition, setCondition] = useState('');

    const [symptomsSet, setSymptomsSet] = React.useState([]);
    const [conditionsSet, setConditionsSet] = React.useState([]);
    const [relationPercentage, setRelationPercentage] = React.useState(0);

    const handleVariable = e => {
      setVariable(e.target.value)
    }

    const handleCondition = e => {
      setCondition(e.target.value)
    }

    React.useEffect(() => {
      const fetchOptionsInformation = async () => {

        const resultName = await axios.get(`${process.env.REACT_APP_API_URL}/symptom-checker/supported-symptoms`);

        setSymptomsSet(resultName.data.response)

        const resultName2 = await axios.get(`${process.env.REACT_APP_API_URL}/analytics/list-of-diseases`, {
          headers: {
              Authorization: `Bearer ${auth_token}`
          }
        });

        setConditionsSet(resultName2.data.data)

      } 
    
      fetchOptionsInformation();
    }, [])

    React.useEffect(() => {
      const fetchRelationInformation = async () => {

        try {
          const percentage = await axios.get(`${process.env.REACT_APP_API_URL}/analytics/variable-to-disease-relationship?variable=${variable}&disease=${condition}`, {
            headers: {
                Authorization: `Bearer ${auth_token}`
            }
          });
  
          setRelationPercentage(Math.round(percentage.data.data.result*100));
        } catch(err) {
          setRelationPercentage(0)
        }
        

      } 
    
      fetchRelationInformation();
    }, [variable, condition])

    // Sort symptomsSet in ascending order
    let sortedSymptomsSet = symptomsSet.sort();

    const symptomsSetMap = sortedSymptomsSet.map(symptomName => {
      return (
        <option key={symptomName} value={symptomName}>{symptomName}</option>
      )
    })
    
    // Sort conditionsSet in ascending order
    let sortedConditionsSet = conditionsSet.sort();

    const conditionsSetMap = sortedConditionsSet.map(conditionName => {
      return (
        <option key={conditionName} value={conditionName}>{conditionName}</option>
      )
    })

  return (
    <>
    <div className="admin__datasets__div">
      <h1 className="header__title">Datasets Overview</h1>
      <h5 className="demographic__header">Total Number of Datasets: {lodash.sum(data)}</h5>
        <button type="submit" onClick={() => migrateDatasets()} className="migrate__datasets__button" >
          MIGRATE DATASETS
        </button>

        <div className="datasets__contents">
            <center>
          <div className="datasets__bar-chart__div">
            <Bar data={datasetsData} options={datasetsOptions} />
          </div>
            </center>
          {/* <div className="num__datasets__div">
            <p>No. of Datasets<br />
              <center>50</center>
            </p>
          </div> */}
          {/* <div className="migrate__datasets__div">
            <button type="submit" className="migrate__datasets__button" >
              Migrate Datasets
            </button>
          </div> */}
        </div>
    </div>

    <br />
    <div className="disease-relation__title__div">
      <h5 className="demographic__header">Variable to Disease Relationship</h5>
      <p className="disease__desc">With the current collection of datasets, we can see the relationship of a variable with a specific disease</p>
    </div>
    {/* <br /> */}

    <div className="admin__disease-chart__div">
        <div className="">
          <div className="disease-relation__div">
          {/* <center><h5 className="datasets__age-gender__header">Gender</h5></center> */}
          <center>
            <div className="disease-relation__chart">
            <CircularProgressbarWithChildren
              value={relationPercentage}
              text={`${relationPercentage}%`}
              strokeWidth={10}
              styles={buildStyles({
                  textColor: "#363740",
                  pathColor: "#363740",
                  trailColor: "#00B2C0",
                strokeLinecap: "butt"
              })}
            >
              <RadialSeparators
                count={12}
                style={{
                  background: "#fff",
                  width: "2px",
                  // This needs to be equal to props.strokeWidth
                  height: `${10}%`
                }}
              />
            </CircularProgressbarWithChildren>
            </div>
            </center>
          </div>
          <div className="most__respondents__div">
          <select name="symptom" id="symptom" onChange={handleVariable} className="disease-relation__dropdown">
            <option value="" hidden disabled="disabled" selected>Enter Variable</option>
              {symptomsSetMap}
          </select>
          </div>
          <div className="num-users__div">
          <select name="disease" id="disease" onChange={handleCondition} className="disease-relation__dropdown">
            <option value="" hidden disabled="disabled" selected>Enter Condition</option>
            {conditionsSetMap}
            </select>
          </div>
        </div>
      {/* <div className="datasets__age__div">
        <center><h5 className="datasets__age-gender__header">Age</h5></center>
        <Bar data={ageData} options={ageOptions} />
      </div>
      <div className="datasets__gender__div">
      <center><h5 className="datasets__age-gender__header">Gender</h5></center>
        <Pie data={genderData} options={genderOptions} />
      </div> */}
    </div>
    <br /><br />
    </>
  )
}

export default Datasets