import React, { useState, useEffect } from 'react'
import BootstrapTable from 'react-bootstrap-table-next'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.css'
import paginationFactory from 'react-bootstrap-table2-paginator'
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css'
import axios from 'axios';
import { successToast, errorToast } from '../../../mixins/utils/toastMessageMixins';


//Dependencies
import { useHistory, useLocation } from "react-router-dom";

// Styling
import './AdminHospitalFacilities.scss'

// Sample Data List
import sampleFacilities from './sampleFacilities'

// Components
import Modal from '../Components/Modal'

// Images
import Facility from '../../../styles/images/sample_facility.png'

// Utils
import authenticate from '../../../utils/authenticate';

function FacilitiesDatalist() {
    const auth_token = localStorage.getItem('auth_token')
    useEffect(()=>{
    authenticate();
  },[]);
    let history = useHistory();
    const location = useLocation();
    const handleClick = (id, path)=>{
        console.log('edit__id', id)
    
        // history.push(path);
        // console.log(path)

        history.push({
            pathname: path,
            search: `?id=${id}`,
        })
    }

    const [facilityList, setFacilityList] = useState([]);
    const [facilities, setFacilities] = useState([])

    const imagePrefix = "../../../styles/images"

    const [modalOpen, setModalOpen] = useState(false);

    const [deleteId, setDeleteId] = useState('');

    const deleteFunction = (id) => {
        setDeleteId(id);
        setModalOpen(true);
    }
    useEffect(()=>{
        const init = async ()=>{
            const queryParams = new URLSearchParams(location.search)
            const facilitiesRes = await axios.get(`${process.env.REACT_APP_API_URL}/hospital/hospital-facilities/${queryParams.get("id")}`, {
                
                headers: {
                    Authorization: `Bearer ${auth_token}`
                }
              });
              console.log('facilitiesRes', facilitiesRes)
              let facilitiesFormatted = facilitiesRes.data.response.data;
              console.log('facilitiesFormatted', facilitiesFormatted)
   
              facilitiesFormatted = facilitiesFormatted.map(thisFacilty =>{
                 
                return {
                    id:thisFacilty.id,
                    name: {name: thisFacilty.facilityName, image: thisFacilty.image_url},
                }
              })

              setFacilities(facilitiesFormatted)
        }
        init()
        
    }, [])

    const confirmDelete = async () =>{
        try{
            console.log('delete id: ', deleteId);
            const deleteDoctorRest = await axios.delete(`${process.env.REACT_APP_API_URL}/hospital/delete-hospital-facility/${deleteId}`, {
                headers: {
                    Authorization: `Bearer ${auth_token}`
                }
              });
        
              successToast('Successfully deleted facility')
              setModalOpen(false);
              setFacilities(state=> state.filter((facility) => facility.id !== deleteId))
            //   history.push('/admin/view-doctors');
        }catch(err){
            errorToast('Failed to delete facility');
        }
    }
    const columns = [
        {dataField:'name', text: 'Facility Name',
            formatter: (cellContent, row) => {
                return (
                    // <div>
                    //     <span className="highlighted__data">{cellContent}</span><br /><br />
                    //     <span className="normal__data">Updated 1 day ago</span>
                    // </div>

                    <div className="cell__name__div">
                        <img className="cell__image" src={`${process.env.REACT_APP_API_RAW_URL}/${cellContent.image}`} alt="Facility" />

                        {/* <img className="cell__image" src={`data:image/jpeg;base64,${imagePrefix}`} alt="Facility" /> */}
                        <div className="cell__name">
                            <span className="highlighted__data">{cellContent.name}</span><br /><br />
                            <span className="normal__data">Updated 1 day ago</span>
                        </div>
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
                    <button className="edit__button" onClick={() => handleClick(row.id, `edit-hospital-facility`)}>
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
            data={facilities} 
            pagination={pagination}
        />

    </div>
  )
}

export default FacilitiesDatalist