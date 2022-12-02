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
import './AdminHospitals.scss'

// Images
import Hospital from '../../../styles/images/Hospital.png'

// Sample Data List
import sampleHospitals from './sampleHospitals'

// Components
import Modal from '../Components/Modal'

// Utils
import authenticate from '../../../utils/authenticate';

function HospitalDatalist() {
    const auth_token = localStorage.getItem('auth_token')
    useEffect(()=>{
    authenticate();
  },[]);
    const [hospitalList, setHospitalList] = useState([]);

    let history = useHistory();
    const [hospitals, setHospitals] = useState([])
    const handleClick = (id, path)=>{
        history.push({
            pathname: path,
            search: `?id=${id}`,
        })
    }

    const [modalOpen, setModalOpen] = useState(false);

    const [deleteId, setDeleteId] = useState('');

    const deleteFunction = (id) => {
        console.log('id', id)
        setDeleteId(id);
        console.log('delete id: ', deleteId);
        setModalOpen(true);
    }

    useEffect(()=>{
        const init = async ()=>{
            const hospitalRes = await axios.get(`${process.env.REACT_APP_API_URL}/hospital/get-all-hospital`, {
                headers: {
                    Authorization: `Bearer ${auth_token}`
                }
              });

              let hospitalsFormatted = hospitalRes.data.response.data;
              console.log('hospitalsFormatted', hospitalsFormatted)
   
              hospitalsFormatted = hospitalsFormatted.map(thisDoctor =>{
                return {
                    id: thisDoctor.id,
                    hospitalName: {name: thisDoctor.hospitalName, image: thisDoctor.image_url},
                    address: {barangay: thisDoctor.barangay, municipality: thisDoctor.municipality, province: thisDoctor.province},
                    // image: thisDoctor.image_url
                }
              })

              setHospitals(hospitalsFormatted)
        }
        init()
    }, [])

    const confirmDelete = async () =>{
        try{
            console.log('delete id: ', deleteId);
            const deleteDoctorRest = await axios.delete(`${process.env.REACT_APP_API_URL}/hospital/delete-hospital?id=${deleteId}`, {
                headers: {
                    Authorization: `Bearer ${auth_token}`
                }
              });
        
              successToast('Successfully deleted hospital')
              setModalOpen(false);
              setHospitals(state=> state.filter((hospital) => hospital.id !== deleteId))
            //   history.push('/admin/view-doctors');
        }catch(err){
            errorToast('Failed to delete hospital');
        }
    }


    const columns = [
        {dataField:'hospitalName', text: 'Hospital Names',
            formatter: (cellContent, row) => {
                return (
                    <div className="cell__name__div">
                        {/* <span><img className="cell__image" src={Hospital} alt="Hospital" /></span> */}
                        <img className="cell__image" src={`${process.env.REACT_APP_API_RAW_URL}/${cellContent.image}`} alt="Hospital" />
                        <div className="cell__name">
                            <span className="highlighted__data">{cellContent.name}</span><br /><br />
                            <span className="normal__data">Updated 1 day ago</span>
                        </div>
                    </div>
                );
            },
            sort: true
        },
        {dataField:'address', text: 'Hospital Address', 
            formatter: (cellContent, row) => {
                // console.log('cellContent', cellContent)
                // const addressArr = cellContent.split(', ');
                return (
                    <div>
                        <span className="highlighted__data">{cellContent.barangay}</span> <br /><br />
                        <span className="normal__data">{cellContent.municipality}, {cellContent.province}</span>
                         {/* {row.edit__id} */}
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
                    <button className="edit__button" onClick={() => handleClick(row.id, `edit-hospital`)}>
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
            data={hospitals} 
            pagination={pagination}
        />

        {/* <table>
            <tr>
                <th>Hospital Name</th>
                <th>Address</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>

            { hospitals && hospitals.length>0 ?
                hospitals.map(hospi =>
                    <tr>
                        <td>{hospi.hospital__name}</td>
                        <td>{hospi.address}</td>
                        <td>Edit</td>
                        <td>Delete</td>
                    </tr>
                )
                : 'Loading...'
            }
        </table> */}
    </div>
  )
}

export default HospitalDatalist