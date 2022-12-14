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

function MatchedConditions() {
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

    const [conditionsData, setConditionsData] = useState({
        datasets: [],
    })
    const [conditionsOptions, setConditionsOptions] = useState({});

    // const [fetchedConditions, setFetchedConditions] = useState({
    //         labels: ['Common Colds', 'Sinus Headache', 'Sore Throat', 'Tuberculosis'],
    //         data: [45, 25, 5, 10],
    //         total: 85,
    // });

    const [fetchedConditions, setFetchedConditions] = useState({})

    const [labels, setLabels] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchConditions = async () => {
        const resultName = await axios.get(`${process.env.REACT_APP_API_URL}/analytics/get-common-disease-analytics-by-location?country=Philippines&region=Region III&province=Pampanga&municipality=Floridablanca&barangay=${barangay}&year=${dateFilter.year}&month=${dateFilter.month}`);
      
        const { data, status, status_code } = resultName.data.response;
    
        setFetchedConditions(data);
    
        } 
    
        fetchConditions();
    }, [barangay, dateFilter])

    useEffect(() => {
        const conditions = fetchedConditions.prediction

        if (fetchedConditions.prediction) {
            setLabels([]);
            setData([]);
        }
    
        for(const key in conditions) {
          setLabels(prevData => [...prevData, key]);
          setData(prevData => [...prevData, conditions[key]])
        }
    }, [fetchedConditions])

    useEffect(() => {
        setConditionsData({
            labels: labels,
            datasets: [
              {
                label: 'No. of People',
                data: data,
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
                text: 'Most common conditions'
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
    }, [labels])

    return (
        <>

        <div className="analytics__filter__div">
            <h1 className="header__title">Matched Conditions/Diseases</h1>
            <h5 className="demographic__header">Matched Disease per Location [Municipality of Floridablanca, Pampanga]</h5>
            {/* <h5 className="demographic__header">Matched Disease per Location [Filterable by Location]</h5> */}

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
                    <Bar data={conditionsData} options={conditionsOptions} />
                </div>
                <div className="num-respondents__div">
                    <p>Total No. of Respondents
                    <br />
                    <center>{lodash.sum(data)}</center>
                    </p>
                </div>
                <div className="most__symptoms__div">
                    <p>Most Common Condition<br />
                    <center>{labels[0] || 'N/A'}</center>
                    </p>
                </div>
                <div className="num-symptoms__div">
                    <p>No. of Matches
                    <br />
                    <center>{data[0] || 'N/A'}</center>
                    </p>
                </div>
            </div>
        </div>
        </>
    )
}

export default MatchedConditions