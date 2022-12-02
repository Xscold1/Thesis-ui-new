import React, { useEffect, useState } from "react";
import axios from 'axios';

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
import { Bar, Pie } from 'react-chartjs-2';

// Styling
import './Analytics.scss';

// Utils
import authenticate from '../../../utils/authenticate';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function DemographicReports() {
  useEffect(()=>{
    authenticate();
  },[]);

  const [demographicData, setDemographicData] = useState({
    datasets: [],
  })
  const [demographicOptions, setDemographicOptions] = useState({});

  const [ageData, setAgeData] = useState({
    datasets: [],
  })

  const [fetchedDemographicData, setFetchedDemographicData] = useState([
    {

    }
  ]);
  // console.log('fetchedDemographicData', fetchedDemographicData);

  const [ageOptions, setAgeOptions] = useState({});

  const [genderData, setGenderData] = useState({
    datasets: [],
  })

  const [genderOptions, setGenderOptions] = useState();

  const [labels, setLabels] = useState([])
  const [data, setData] = useState([])

  React.useEffect(() => {

    const fetchDemographics = async () => {
    const resultName = await axios.get(`${process.env.REACT_APP_API_URL}/analytics/get-respondents-by-location?municipality=Floridablanca&province=Pampanga&region=Region III&country=Philippines`);
  
    const { data, status, status_code } = resultName.data.response;

    setFetchedDemographicData(data);

    } 

    fetchDemographics();
  }, [])

  console.log('fetchedDemographicData', fetchedDemographicData);

  useEffect(() => {
    const locations = fetchedDemographicData.location

    for(const key in locations) {
      setLabels(prevData => [...prevData, key]);
      setData(prevData => [...prevData, locations[key]])
    }
  }, [fetchedDemographicData])

  useEffect(() => {
    setDemographicData({
      labels: labels,
      datasets: [
        {
          label: 'No. of People',
          data: data,
        }
      ]
    });

    setDemographicOptions({
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
        '#81D0D7'
      ],
      borderColor: [
        "#00B2C0"
      ],
      borderWidth: 3
    })

    setAgeData({
      labels: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
      datasets: [
        {
          label: 'No. of People',
          data: [2, 15, 13, 15, 8, 13],
        }
      ]
    });

    setAgeOptions({
      responsive: true,
      indexAxis: 'x',
      plugins : {
        title: {
          display: true,
          text: 'Age of Respondents per Barangay'
        }
      },
      // borderColor: "red"
      backgroundColor: [
        '#81D0D7'
      ],
      borderColor: [
        "#00B2C0"
      ],
      borderWidth: 3
    })

    setGenderData({
      labels: ["Male", "Female"],
      datasets: [
        {
          data: [70, 50],
          backgroundColor: [
            "#00B2C0",
            "#E78D6D",
          ],
          borderColor: [
            "#00B2C0",
          ],
          // borderWidth: [1, 1, 1, 1, 1]
        }
      ]
    });

    setGenderOptions({
      responsive: true,
      legend: {
        display: true,
        position: "bottom",
        labels: {
          fontColor: "black",
          fontSize: 30
        }
      }
    })
  }, [labels])

  return (
    <>
    <div className="admin__demographics__div">
      <h1 className="header__title">Demographic Reports - Overview</h1>
      <h5 className="demographic__header">Demographic Reports [Municipality of Floridablanca, Pampanga]</h5>

        <div className="demographic__contents">
          <div className="bar-chart__div">
            <Bar data={demographicData} options={demographicOptions} />
          </div>
          <div className="most__respondents__div">
            <p>Most Respondents<br />
              <center>{fetchedDemographicData.mostRespondents}</center>
            </p>
          </div>
          <div className="num-users__div">
            <p>Total No. of Respondents
              <br />
              <center>{fetchedDemographicData.totalRespondents}</center>
            </p>
          </div>
        </div>
    </div>

    <br />
    <div className="admin__demographics__div">
      <div className="demographic__age__div">
        <center><h5 className="demographic__age-gender__header">Age</h5></center>
        <Bar data={ageData} options={ageOptions} />
      </div>
      <div className="demographic__gender__div">
      <center><h5 className="demographic__age-gender__header">Gender</h5></center>
        <Pie data={genderData} options={genderOptions} />
      </div>
    </div>
    <br /><br />
    </>
  )
}

export default DemographicReports