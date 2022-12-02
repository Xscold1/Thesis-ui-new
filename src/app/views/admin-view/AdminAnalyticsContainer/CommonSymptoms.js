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

function CommonSymptoms() {
    useEffect(()=>{
    authenticate();
  },[]);

    const barangays = RegionIII["PAMPANGA"].municipality_list["FLORIDABLANCA"].barangay_list;
    const barangayList = barangays.map(barangayName => {
        return (
            <option key={barangayName}>{barangayName}</option>
        )
    })

    const [barangay, setBarangay] = React.useState('')

    const handleBarangay = e => {
        setBarangay(e.target.value)
    }

    const [dateFilter, setDateFilter] = React.useState({
        month: '',
        year: 2022
    });

    console.log('dateFilter', dateFilter);
    
    const handleDateMonth = e => {
        setDateFilter(prevDetails => ({
            ...prevDetails,
            month: e.target.value
        }))
    }

    const handleDateYear = e => {
        setDateFilter(prevDetails => ({
            ...prevDetails,
            year: e.target.value
        }))
    }

    const [symptomsData, setSymptomsData] = useState({
        datasets: [],
    })
    const [symptomsOptions, setSymptomsOptions] = useState({});

    // const [fetchedSymptoms, setFetchedSymptoms] = useState({
    //     labels: [ 'Difficulty Breathing', 'Cough', 'Headache', 'Chills'],
    //     data: [50, 20, 5, 1],
    //     total: 100,
    // });

    const [fetchedSymptoms, setFetchedSymptoms] = useState({})

    const [labels, setLabels] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchSymptoms = async () => {
        const resultName = await axios.get(`${process.env.REACT_APP_API_URL}/analytics/get-sc-cs-analytics-by-location?country=Philippines&region=Region III&province=Pampanga&municipality=Floridablanca&barangay=${barangay}&year=${dateFilter.year}&month=${dateFilter.month}`);
      
        const { data, status, status_code } = resultName.data.response;
    
        setFetchedSymptoms(data);

        console.log('fetchSymptoms', data)
    
        } 
    
        fetchSymptoms();
    }, [barangay, dateFilter])

    useEffect(() => {
        const diseases = fetchedSymptoms.disease

        if (fetchedSymptoms.disease) {
            setLabels([]);
            setData([]);
        }
    
        for(const key in diseases) {
          setLabels(prevData => [...prevData, key]);
          setData(prevData => [...prevData, diseases[key]])
        }
    }, [fetchedSymptoms])

    // console.log('labels', labels);
    // console.log('data', data);
    // console.log('fetchedSymptoms', fetchedSymptoms)

    useEffect(() => {
        setSymptomsData({
            labels: labels,
            datasets: [
              {
                label: 'No. of People',
                data: data,
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
                text: 'Most common symptoms'
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
    }, [labels])

    return (
        <>

        <div className="analytics__filter__div">
            <h1 className="header__title">Common Symptoms</h1>
            <h5 className="demographic__header">Most Common Symptoms [Municipality of Floridablanca, Pampanga]</h5>
            {/* <h5 className="demographic__header">Most Common Symptoms [Filterable by Location]</h5> */}

            <div className="filter__group">
                <div className="filter__barangay__div">
                    {/* <p className="filter__barangay__text">Filter by Barangay: </p> */}
                    {/* <select className="filter__address__dropdown" disabled name="region" id="region" onChange={handleBarangay} value={barangay}>
                        <option value="" hidden disabled="disabled" selected>Region III</option>
                    </select>
                    <select className="filter__address__dropdown" disabled name="province" id="province" onChange={handleBarangay} value={barangay}>
                        <option value="" hidden disabled="disabled" selected>Pampanga</option>
                    </select>
                    <select className="filter__address__dropdown" disabled name="municipality" id="municipality" onChange={handleBarangay} value={barangay}>
                        <option value="" hidden disabled="disabled" selected>Floridablanca</option>
                    </select> */}
                    <p className="filter__barangay__text">Filter by Barangay: </p>&nbsp;&nbsp;&nbsp;&nbsp;
                    <select className="filter__barangay__dropdown" name="barangay" id="barangay" onChange={handleBarangay} value={barangay}>
                        <option value="" hidden disabled="disabled" selected>Enter Barangay</option>
                        <option value="">ALL BARANGAYS</option>
                        {barangayList}
                    </select>
                </div>

                <div className="filter__date__div">
                    <p className="filter__barangay__text">Filter by Date: </p>
                    <select className="filter__date__dropdown" name="month" id="month" onChange={handleDateMonth} value={dateFilter.month}>
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
                    <select className="filter__date__dropdown" name="year" id="year" onChange={handleDateYear} value={dateFilter.year}>
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
                    <center>{lodash.sum(data)}</center>
                    </p>
                </div>
                <div className="most__symptoms__div">
                    <p>Most Common Symptom<br />
                    <center>{labels[0] || 'N/A'}</center>
                    </p>
                </div>
                <div className="num-symptoms__div">
                    <p>No. of People with Symptom
                    <br />
                    <center>{data[0] || 'N/A'}</center>
                    </p>
                </div>
            </div>
        </div>
        </>
    )
}

export default CommonSymptoms