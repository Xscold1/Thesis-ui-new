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
import './AdminDoctors.scss'

// Images
import Image from '../../../styles/images/sample_image.png'

// Sample Data List
import doctors from './sampleDoctors'

// Components
import Modal from '../Components/Modal'

// Utils
import authenticate from '../../../utils/authenticate';

function DoctorDatalist() {
    const auth_token = localStorage.getItem('auth_token')
    useEffect(()=>{
    authenticate();
  },[]);
    const [doctors,setDoctors] = useState([]);
    let history = useHistory();

    useEffect(()=>{
        const init = async ()=>{
            const doctorsRes = await axios.get(`${process.env.REACT_APP_API_URL}/doctor/get-all-doctor`, {
                headers: {
                    Authorization: `Bearer ${auth_token}`
                }
              });

              let doctorFormatted = doctorsRes.data.response.data;
   
              doctorFormatted = doctorFormatted.map(thisDoctor =>{
                return {
                    id:thisDoctor.id,
                    name: {name: thisDoctor.firstName, image: thisDoctor.image_url},
                    expertise: JSON.parse(thisDoctor.specialization),
                    image: thisDoctor.image_url
                }
              })

              setDoctors(doctorFormatted)
        }
        init()
    }, [])

    const handleClick = (id, path)=>{
        history.push({
            pathname: path,
            search: `?id=${id}`,
        })
    }

    const [modalOpen, setModalOpen] = useState(false);

    const [deleteId, setDeleteId] = useState('');

    const deleteFunction = async (id) => {
        setDeleteId(id);
       
        setModalOpen(true);
    }

    const confirmDelete = async () =>{
        try{
            console.log('delete id: ', deleteId);
            const deleteDoctorRest = await axios.delete(`${process.env.REACT_APP_API_URL}/doctor/delete-doctor?id=${deleteId}`, {
                headers: {
                    Authorization: `Bearer ${auth_token}`
                }
              });
        
              successToast('Successfully deleted doctor')
              setModalOpen(false);
              setDoctors(state=> state.filter((doctor) => doctor.id !== deleteId))
            //   history.push('/admin/view-doctors');
        }catch(err){
            errorToast('Failed to delete doctor');
        }
    }

    const columns = [
        {dataField:'name', text: 'Doctor Names',
            formatter: (cellContent, row) => {
                return (
                    <div className="cell__name__div">
                        <img className="cell__image" src={`${process.env.REACT_APP_API_RAW_URL}/${cellContent.image}`} alt="Doctor" />

                        {/* <img className="cell__image" src={`data:image/jpeg;base64,${imagePrefix}`} alt="Doctor" /> */}
                        <div className="cell__name">
                            <span className="highlighted__data">{cellContent.name}</span><br /><br />
                            <span className="normal__data">Updated 1 day ago</span>
                        </div>
                    </div>
                );
            },
            sort: true
        },
        {dataField:'expertise', text: 'Expertise', 
            formatter: (cellContent, row) => {
                // console.log('cellContent', cellContent)
                const parsed = cellContent.join(', ')
                return (
                    <div>
                        <span className="highlighted__data">{parsed}</span> <br /><br />
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
                //   <button className="edit__button" onClick={() => handleClick(row.id, `edit-doctor/&id=${row.id}`)}>
                     <button className="edit__button" onClick={() => handleClick(row.id, `edit-doctor`)}>
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
                //   <button className="delete__button" onClick={() => handleClick(row.id)}>
                  <button className="delete__button" onClick={() => { deleteFunction(row.id) }}>
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

        {modalOpen && <Modal setOpenModal={setModalOpen} confirm={confirmDelete} deleteId={deleteId} />}

        <BootstrapTable 
            bootstrap4 
            keyField='id' 
            columns={columns} 
            data={doctors} 
            pagination={pagination}
        />

    </div>
  )
}

export default DoctorDatalist