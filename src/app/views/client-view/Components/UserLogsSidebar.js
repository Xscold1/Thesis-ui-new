import React, { useState, useEffect } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css'
import paginationFactory from 'react-bootstrap-table2-paginator'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
import axios from 'axios';
import { successToast, errorToast } from '../../../mixins/utils/toastMessageMixins';

// Styling
import './UserLogsSidebar.scss';

// import './UserProfileSidebar.scss';
import * as IoIcons from 'react-icons/io'

function UserLogsSidebar(props) {
  const auth_token = localStorage.getItem('auth_token') // Can be removed later on
  const user_email = localStorage.getItem('user_email')

  const [diseases, setDiseases] = useState([]) // To be changed to logs
  const [logs, setLogs] = useState([]) // To be changed to logs

  // console.log('logs', logs)

  useEffect(()=>{
    const init = async ()=>{
        const diseasesRes = await axios.get(`${process.env.REACT_APP_API_URL}/symptom-checker/logs`, {
            headers: {
                Authorization: `Bearer ${auth_token}`
            }
          });
        //   console.log('diseasesRes', diseasesRes)
          let diseasesFormatted = diseasesRes.data.response.data;
        //   console.log('diseasesFormatted', diseasesFormatted)

          diseasesFormatted = diseasesFormatted.map(disease =>{
            return {
                id: disease.id,
                // name: disease.diseaseName,
                createdAt: disease.createdAt,
            }
          })

          setDiseases(diseasesFormatted)
    }
    init()
  }, [])

  useEffect(()=>{
    const init = async ()=>{
        const logsRes = await axios.get(`${process.env.REACT_APP_API_URL}/symptom-checker/get-logs-by-email?email=vash@gmail.34com`, {
            headers: {
                Authorization: `Bearer ${auth_token}`
            }
          });

          let logsFormatted = logsRes.data.response.data;
        // console.log('logsFormatted', JSON.parse(logsFormatted[0].prediction));

        setLogs(logsFormatted);

        const predictFormatted = JSON.parse(logsFormatted[0].prediction);
        const diseaseName = Object.keys(predictFormatted)[0];
        const percentage = predictFormatted[diseaseName]*100

        console.log('predictFormatted', diseaseName);
        console.log('percentageFormatted', percentage);

        console.log('dateFormatted', logsFormatted[0].createdAt);
    }
    init()
  }, [])

  const dateConverter = (props) => {
    let date = new Date(props);
    
    // return date.toDateString();
    // return date.toGMTString();
    return date.toLocaleString();
  }

  const objectConvert = (props) => {
    const objectName = Object.keys(props)[0];

    return objectName;
  }

  const columns = [
    {dataField:'prediction', text: 'Matched Condition',
        formatter: (cellContent, row) => {
          const predictFormatted = JSON.parse(cellContent);
          // const diseaseName = Object.keys(predictFormatted)[0];
            return (
                <div>
                    {/* <span className="highlighted__data">{cellContent}</span><br /><br /> */}
                    {/* <span className="highlighted__data">{diseaseName}</span><br /><br /> */}
                    <span className="normal__data">
                      {/* {predictFormatted[diseaseName]*100} */}

                      <span className="highlighted__data">{cellContent}</span><br /><br />

                      
                    </span>
                </div>
            );
        },
        sort: true
    },
    {
        // classes : 'center__cell',
        dataField:'createdAt', 
        text: 'Date',
        formatter: (cellContent, row) => {
            return (
              //   <button className="edit__button">
              //    Edit
              // </button>
              // <span className="highlighted__data">{row.createdAt}</span>
              <span className="highlighted__data">{dateConverter(row.createdAt)}</span>
            );
        },
        sort: true
    },
    // {
    //     dataField:'delete', 
    //     text: 'Delete',
    //     classes : 'center__cell',
    //     formatter: (cellContent, row) => {
    //         return (
    //             <button className="delete__button" onClick={() => { deleteFunction(row.name) }}>
    //              Delete
    //           </button>
    //         );
    //     },
    // },
    ]

    // const pagination = paginationFactory({
    //   page: 1,
    //   sizePerPage: 6,
    //   lastPageText: 'Last',
    //   firstPageText: 'First',
    //   nextPageText: '>',
    //   prePageText: '<',
    //   showTotal: true,
    //   alwaysShowAllBtns: true,
    //   onPageChange: function(page, sizePerPage) {
    //       // console.log('page', page);
    //       // console.log('sizePerPage', sizePerPage);
    //   },
    //   onSizePerPageChange: function (page, sizePerPage) {
    //       // console.log('page', page);
    //       // console.log('sizePerPage', sizePerPage);
    //   }
    // });

  return (
    <div className={`user__sidebar__container symptoms__checker__logs__width ${props.isOpen ? 'animated__open' : 'logs__closed__sidebar'}`}>
        <IoIcons.IoIosArrowDroprightCircle onClick={() => props.toggleOpen()} className="profile__toggle__arrow" />

        <br />

        {/* E-mail Label */}
        <div className="profile__input__div">
          <label className="profile__email__label"> <span className="profile__blue"><i className="fas fa-history" /> SYMPTOMS</span> <span className="profile__orange"> CHECKER LOGS</span> </label>
            <h1 className="profile__email">{user_email}</h1>
        </div>

        <div className="logs__hidden__scroll">
          <BootstrapTable 
              bootstrap4 
              keyField='id' 
              columns={columns} 
              data={logs} 
              // pagination={pagination}
          />
        </div>
    </div>
  )
}

export default UserLogsSidebar