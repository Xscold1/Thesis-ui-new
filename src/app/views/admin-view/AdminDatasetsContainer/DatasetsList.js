//Dependencies
import { useHistory } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css'
import paginationFactory from 'react-bootstrap-table2-paginator'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
import axios from 'axios';
import { successToast, errorToast } from '../../../mixins/utils/toastMessageMixins';



// Styling
import './AdminDatasetsContainer.scss'

// Sample Data List
import sampleDatasets from './sampleDatasets'

// Components
import Modal from '../Components/Modal'

import authenticate from '../../../utils/authenticate';

function DatasetsList() {
    const auth_token = localStorage.getItem('auth_token')
    useEffect(()=>{
        authenticate();
    },[]);

    let history = useHistory();

    const handleClick = (id, path)=>{
        console.log('edit__id', id)
    
        // history.push(path);
        // console.log(path)

        history.push({
            pathname: path,
            search: `?id=${id}`,
        })
    }

    const [datasets, setDatasets] = useState([])
    const [datasetsList, setDatasetsList] = useState([]);

    // useEffect(() => {
    //     fetch('')
    //     .then(response => response.json)
    //     .then(result => setDatasetsList(result))
    //     .catch(error => console.log(error));
    // }, [])

    const [modalOpen, setModalOpen] = useState(false);

    const [deleteId, setDeleteId] = useState('');

    const deleteFunction = (id) => {
        setDeleteId(id);
        console.log('delete id: ', deleteId);
        setModalOpen(true);
    }
    useEffect(()=>{
        const init = async ()=>{
            const datasetsRes = await axios.get(`${process.env.REACT_APP_API_URL}/dataset/get-datasets`, {
                headers: {
                    Authorization: `Bearer ${auth_token}`
                }
              });
              console.log('datasetsRes', datasetsRes)
              let datasetsFormatted = datasetsRes.data.data.datasets;
              console.log('datasetsFormatted', datasetsFormatted)
   
              datasetsFormatted = datasetsFormatted.map(dataset =>{
                return {
                    id: dataset.id,
                    name: dataset.disease,
                }
              })

              setDatasets(datasetsFormatted)
        }
        init()
    }, [])
    const columns = [
        {dataField:'name', text: 'Dataset Names',
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
                    <button className="edit__button" onClick={() => handleClick(row.id, `edit-dataset`)}>
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
                    <button className="delete__button" onClick={() => { deleteFunction(row.id) }}>
                        Delete
                    </button>
                );
            },
        },
    ]

    const confirmDelete = async () =>{
        try{
            console.log('delete id: ', deleteId);
            const deleteDoctorRest = await axios.delete(`${process.env.REACT_APP_API_URL}/dataset/delete-dataset/${deleteId}`, {
                headers: {
                    Authorization: `Bearer ${auth_token}`
                }
              });
        
              successToast('Successfully deleted dataset')
              setModalOpen(false);
              setDatasets(state=> state.filter((dataset) => dataset.id !== deleteId))
            //   history.push('/admin/view-doctors');
        }catch(err){
            errorToast('Failed to delete dataset');
        }
    }

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

        {modalOpen && <Modal setOpenModal={setModalOpen} confirm={confirmDelete} deleteId={deleteId} />}

        <BootstrapTable 
            bootstrap4 
            keyField='id' 
            columns={columns} 
            data={datasets} 
            pagination={pagination}
        />

    </div>
    )
}

export default DatasetsList