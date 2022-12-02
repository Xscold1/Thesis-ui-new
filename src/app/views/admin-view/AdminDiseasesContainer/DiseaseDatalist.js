import React, { useState, useEffect } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css'
import paginationFactory from 'react-bootstrap-table2-paginator'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
import axios from 'axios';
import { successToast, errorToast } from '../../../mixins/utils/toastMessageMixins';

//Dependencies
import { useHistory } from "react-router-dom";

// Styling
import './AdminDiseases.scss'

// Sample Data List
import sampleDiseases from './sampleDiseases'

// Components
import Modal from '../Components/Modal'

import authenticate from '../../../utils/authenticate';

function DiseaseDatalist() {
    const auth_token = localStorage.getItem('auth_token')
    useEffect(()=>{
    authenticate();
  },[]);
    const [diseases, setDiseases] = useState([])
    let history = useHistory();

    const handleClick = (id, path)=>{
        console.log('edit__id', id)
    
        // history.push(path);
        // console.log(path)

        history.push({
            pathname: path,
            search: `?diseaseName=${id}`,
        })
    }

    const [diseaseList, setDiseaseList] = useState([]);

    const imagePrefix = "../../../styles/images"

    const [modalOpen, setModalOpen] = useState(false);

    const [deleteDisease, setDeleteDisease] = useState('');

    const deleteFunction = (id) => {
        setDeleteDisease(id);
        // console.log('delete id: ', deleteDisease);
        setModalOpen(true);
    }

    useEffect(()=>{
        const init = async ()=>{
            const diseasesRes = await axios.get(`${process.env.REACT_APP_API_URL}/disease/get-all-disease-information`, {
                headers: {
                    Authorization: `Bearer ${auth_token}`
                }
              });
              console.log('diseasesRes', diseasesRes)
            //   console.log('diseasesRes', diseasesRes)
              let diseasesFormatted = diseasesRes.data.response.data;
              console.log('diseasesFormatted', diseasesFormatted)
            //   console.log('diseasesFormatted', diseasesFormatted)
   
              diseasesFormatted = diseasesFormatted.map(disease =>{
                return {
                    id: disease.id,
                    name: disease.diseaseName,
                }
              })

              setDiseases(diseasesFormatted)
        }
        init()
    }, [])
    const confirmDelete = async () =>{
        try{
            const deleteDoctorRest = await axios.delete(`${process.env.REACT_APP_API_URL}/disease/delete-disease-information?diseaseName=${deleteDisease}`, {
                headers: {
                    Authorization: `Bearer ${auth_token}`
                }
              });
        
              successToast('Successfully deleted disease')
              setModalOpen(false);
              setDiseases(state=> state.filter((disease) => disease.name !== deleteDisease))
            //   history.push('/admin/view-doctors');
        }catch(err){
            errorToast('Failed to delete disease');
        }
    }
    const columns = [
        {dataField:'name', text: 'Disease Names',
            formatter: (cellContent, row) => {
                return (
                    <div>
                        <span className="highlighted__data">{cellContent}</span><br /><br />
                        <span className="normal__data">Updated 1 day ago</span>
                    </div>
                );
            },
            sort: true
        },
        {
            classes : 'center__cell',
            dataField:'edit', 
            text: 'Edit',
            formatter: (cellContent, row) => {
                return (
                    <button className="edit__button" onClick={() => handleClick(row.name, `edit-disease`)}>
                     Edit
                  </button>
                );
            },
        },
        {
            dataField:'delete', 
            text: 'Delete',
            classes : 'center__cell',
            formatter: (cellContent, row) => {
                return (
                    <button className="delete__button" onClick={() => { deleteFunction(row.name) }}>
                     Delete
                  </button>
                );
            },
        },
    ]

    const pagination = paginationFactory({
        page: 1,
        sizePerPage: 6,
        lastPageText: 'Last',
        firstPageText: 'First',
        nextPageText: '>',
        prePageText: '<',
        showTotal: true,
        alwaysShowAllBtns: true,
        onPageChange: function(page, sizePerPage) {
            // console.log('page', page);
            // console.log('sizePerPage', sizePerPage);
        },
        onSizePerPageChange: function (page, sizePerPage) {
            // console.log('page', page);
            // console.log('sizePerPage', sizePerPage);
        }
    });

  return (
    <div>

        {modalOpen && <Modal setOpenModal={setModalOpen} confirm={confirmDelete} deleteDisease={deleteDisease} />}

        <BootstrapTable 
            bootstrap4 
            keyField='id' 
            columns={columns} 
            data={diseases} 
            pagination={pagination}
        />

    </div>
  )
}

export default DiseaseDatalist