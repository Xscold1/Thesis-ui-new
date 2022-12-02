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

// Styling
import './Analytics.scss';

// Utils
import authenticate from '../../../utils/authenticate';

// JSON Libraries
import RegionIII from './components/Region-III.json';

ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function SymptomsHotspot() {
    useEffect(()=>{
        authenticate();
    },[]);

    const auth_token = localStorage.getItem('auth_token')

    const [fetchedSymptoms, setFetchedSymptoms] = useState([])
    const [fetchedConditions, setFetchedConditions] = useState([])
    const [conditionLabels, setConditionLabels] = useState([])
    const [conditionData, setConditionData] = useState([])

    const [symptomLabels, setSymptomLabels] = useState([])
    const [symptomData, setSymptomData] = useState([])

    // console.log('symptomData', symptomData);
    // console.log('symptomLabels', symptomLabels);

    const [symptomsSet, setSymptomsSet] = React.useState([]);
    const [conditionsSet, setConditionsSet] = React.useState([]);

    const [symptomsData, setSymptomsData] = useState({
        datasets: [],
    })
    const [symptomsOptions, setSymptomsOptions] = useState({});

    const [conditionsData, setConditionsData] = useState({
        datasets: [],
    })
    const [conditionsOptions, setConditionsOptions] = useState({});

    const [selectedSymptom, setSelectedSymptom] = React.useState('')

    const handleSelectedSymptom = e => {
        setSelectedSymptom(e.target.value)
    }

    const [selectedCondition, setSelectedCondition] = React.useState('')

    const handleSelectedCondition = e => {
        setSelectedCondition(e.target.value)
    }

    const [symptomsDateFilter, setSymptomsDateFilter] = React.useState({
        month: '',
        year: 2022
    });

    const [conditionsDateFilter, setConditionsDateFilter] = React.useState({
        month: '',
        year: 2022
    });
    
    const handleSymptomsDateMonth = e => {
        setSymptomsDateFilter(prevDetails => ({
            ...prevDetails,
            month: e.target.value
        }))
    }

    const handleSymptomsDateYear = e => {
        setSymptomsDateFilter(prevDetails => ({
            ...prevDetails,
            year: e.target.value
        }))
    }

    const handleConditionsDateMonth = e => {
        setConditionsDateFilter(prevDetails => ({
            ...prevDetails,
            month: e.target.value
        }))
    }

    const handleConditionsDateYear = e => {
        setConditionsDateFilter(prevDetails => ({
            ...prevDetails,
            year: e.target.value
        }))
    }

    useEffect(() => {
      const fetchedSymptoms = async () => {
      const resultName = await axios.get(`${process.env.REACT_APP_API_URL}/analytics/symptoms-hotspot?symptoms=${selectedSymptom}&year=${symptomsDateFilter.year}&month=${symptomsDateFilter.month}`);
    
      const { data, status, status_code } = resultName.data.response;

      // console.log("data", data);
  
      setFetchedSymptoms(data);
  
      } 
  
      fetchedSymptoms();
    }, [selectedSymptom, symptomsDateFilter])

    useEffect(() => {
      const symptoms = fetchedSymptoms.barangay

      if (fetchedSymptoms.barangay) {
          setSymptomLabels([]);
          setSymptomData([]);
      }
  
      for(const key in symptoms) {
        setSymptomLabels(prevData => [...prevData, key]);
        setSymptomData(prevData => [...prevData, symptoms[key]])
      }
  }, [fetchedSymptoms])

  useEffect(() => {
    const fetchedConditions = async () => {
    const resultName = await axios.get(`${process.env.REACT_APP_API_URL}/analytics/diseases-hotspot?disease=${selectedCondition}&year=${conditionsDateFilter.year}&month=${conditionsDateFilter.month}`);
  
    const { data, status, status_code } = resultName.data.response;

    console.log("conddata", data);

    setFetchedConditions(data);

    } 

    fetchedConditions();
  }, [selectedCondition, conditionsDateFilter])

  useEffect(() => {
    const conditions = fetchedConditions.barangay

    if (fetchedConditions.barangay) {
        setConditionLabels([]);
        setConditionData([]);
    }

    for(const key in conditions) {
      setConditionLabels(prevData => [...prevData, key]);
      setConditionData(prevData => [...prevData, conditions[key]])
    }
}, [fetchedConditions])

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

    useEffect(() => {
        setSymptomsData({
            labels: symptomLabels,
            datasets: [
              {
                label: 'No. of People',
                data: symptomData,
              }
            ]
          });
      
          setSymptomsOptions({
            responsive: true,
            indexAxis: 'y',
            plugins : {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: 'Most barangays with symptoms'
              }
            },
            // borderColor: "red"
            backgroundColor: [
              '#E78D6D'
            ],
            borderColor: [
              "#DF744E"
            ],
            borderWidth: 3
          })

          setConditionsData({
            labels: conditionLabels,
            datasets: [
              {
                label: 'No. of People',
                data: conditionData,
              }
            ]
          });
      
          setConditionsOptions({
            responsive: true,
            indexAxis: 'y',
            plugins : {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: 'Most barangays with condition'
              }
            },
            // borderColor: "red"
            backgroundColor: [
              "#ea5252"
            ],
            borderColor: [
                "#D22B2B"
            ],
            borderWidth: 3
          })
    }, [symptomLabels, conditionLabels])

    return (
        <>

        <div className="analytics__filter__div">
            <h1 className="header__title">Symptoms Hotspot</h1>
            <h5 className="demographic__header">Barangays with most No. of Symptoms</h5>

            <div className="filter__group">
                <div className="filter__barangay__div">
                    <p className="filter__barangay__text">Filter by Symptom:&nbsp;&nbsp;&nbsp;</p>
                    <select className="filter__barangay__dropdown" name="symptom" id="symptom" onChange={handleSelectedSymptom}>
                        <option value="" hidden disabled="disabled" selected>Enter Symptom</option>
                        <option value="">ALL SYMPTOMS</option>
                        {symptomsSetMap}
                    </select>
                </div>

                <div className="filter__date__div">
                    <p className="filter__barangay__text">Filter by Date: </p>
                    <select className="filter__date__dropdown" name="month" id="month" onChange={handleSymptomsDateMonth}>
                        <option value="" hidden disabled="disabled" selected>Enter Month</option>
                        <option value="">All Months</option>
                        <option key="January">January</option>
                        <option key="February">February</option>
                        <option key="March">March</option>
                        <option key="April">April</option>
                        <option key="May">May</option>
                        <option key="June">June</option>
                        <option key="July">July</option>
                        <option key="August">August</option>
                        <option key="September">September</option>
                        <option key="October">October</option>
                        <option key="November">November</option>
                        <option key="December">December</option>
                    </select>
                    <select className="filter__date__dropdown" name="year" id="year" onChange={handleSymptomsDateYear}>
                        <option value="" hidden disabled="disabled" selected>Enter Year</option>
                        <option key="2021">2021</option>
                        <option key="2022">2022</option>
                        <option key="2023">2023</option>
                    </select>
                </div>
            </div>
        </div>

        <br />
        
        <div className="symptom__chart-group__div">
        <h1 className="header__title">&nbsp;</h1>
        {/* <h5 className="demographic__header">Most Common Symptoms [Municipality of Floridablanca, Pampanga]</h5> */}

            <div className="demographic__contents">
                <div className="symptoms__bar-chart__div">
                    <Bar data={symptomsData} options={symptomsOptions} />
                </div>
                <div className="num-respondents__div">
                    <p>Total No. of Respondents
                    <br />
                    {/* <center>{fetchedSymptoms.total}</center> */}
                    <center>{lodash.sum(symptomData)}</center>
                    </p>
                </div>
                <div className="most__symptoms__div">
                    <p>Barangay with most symptoms<br />
                    <center>{symptomLabels[0] || 'N/A'}</center>
                    </p>
                </div>
                <div className="num-symptoms__div">
                    <p>No. of People with Symptom
                    <br />
                    <center>{symptomData[0] || 'N/A'}</center>
                    </p>
                </div>
            </div>
        </div>

        <br />
        <div className="analytics__filter__div">
            <h5 className="demographic__header">Barangays with most No. of Matched Diseases</h5>

            <div className="filter__group1">
                <div className="filter__barangay__div">
                    <p className="filter__barangay__text">Filter by Condition:&nbsp;&nbsp;&nbsp;</p>
                    <select className="filter__barangay__dropdown" name="condition" id="condition" onChange={handleSelectedCondition}>
                        <option value="" hidden disabled="disabled" selected>Enter Condition</option>
                        <option value="">ALL CONDITIONS</option>
                        {conditionsSetMap}
                    </select>
                </div>

                <div className="filter__date__div">
                    <p className="filter__barangay__text">Filter by Date: </p>
                    <select className="filter__date__dropdown" name="month" id="month" onChange={handleConditionsDateMonth}>
                        <option value="" hidden disabled="disabled" selected>Enter Month</option>
                        <option value="">All Months</option>
                        <option key="January">January</option>
                        <option key="February">February</option>
                        <option key="March">March</option>
                        <option key="April">April</option>
                        <option key="May">May</option>
                        <option key="June">June</option>
                        <option key="July">July</option>
                        <option key="August">August</option>
                        <option key="September">September</option>
                        <option key="October">October</option>
                        <option key="November">November</option>
                        <option key="December">December</option>
                    </select>
                    <select className="filter__date__dropdown" name="year" id="year" onChange={handleConditionsDateYear}>
                        <option value="" hidden disabled="disabled" selected>Enter Year</option>
                        <option key="2021">2021</option>
                        <option key="2022">2022</option>
                        <option key="2023">2023</option>
                    </select>
                </div>
            </div>
        </div>

        <br />
        
        <div className="symptom__chart-group__div">
        
        {/* <h5 className="demographic__header">Most Common Symptoms [Municipality of Floridablanca, Pampanga]</h5> */}
        <h1 className="header__title2">&nbsp;</h1>
            <div className="demographic__contents">
                <div className="symptoms__bar-chart__div">
                    <Bar data={conditionsData} options={conditionsOptions} />
                </div>
                <div className="num-respondents__div">
                    <p>Total No. of Respondents
                    <br />
                    {/* <center>{fetchedSymptoms.total}</center> */}
                    <center>{lodash.sum(conditionData)}</center>
                    </p>
                </div>
                <div className="most__symptoms__div">
                    <p>Barangay with most conditions<br />
                    <center>{conditionLabels[0] || 'N/A'}</center>
                    </p>
                </div>
                <div className="num-symptoms__div">
                    <p>No. of People with Condition
                    <br />
                    <center>{conditionData[0] || 'N/A'}</center>
                    </p>
                </div>
            </div>
        </div>
        </>
    )
}

export default SymptomsHotspot