import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
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
import './AdminDoctorAffiliates.scss';

// Components
import Modal from '../Components/Modal';

// Utils
import authenticate from '../../../utils/authenticate';

function AffiliateDatalist() {
    const auth_token = localStorage.getItem('auth_token')
    useEffect(()=>{
    authenticate();
  },[]);
    let history = useHistory();

    const [affiliates, setAffiliates] = useState([])
    
    const handleClick = (id, path)=>{
        console.log('edit__id', id)
    
        history.push({
            pathname: path,
            search: `?id=${id}`,
        })
    }

    const location = useLocation();
    const [doctorId, setDoctorId] = useState('');

    useEffect(() => {
      //  console.log(location.search); // result: '?id={number}'
       setDoctorId(location.search)
    }, [location]);

    const [modalOpen, setModalOpen] = useState(false);

    const [deleteId, setDeleteId] = useState('');

    const deleteFunction = (id) => {
        setDeleteId(id);
        // console.log('delete id: ', deleteId);
        setModalOpen(true);
    }

    const confirmDelete = async () =>{
        try{
            const deleteDoctorRest = await axios.delete(`${process.env.REACT_APP_API_URL}/doctor/delete-affiliation/${deleteId}`, {
                headers: {
                    Authorization: `Bearer ${auth_token}`
                }
              });
        
              successToast('Successfully deleted affiliate')
              setModalOpen(false);
              setAffiliates(state=> state.filter((doctor) => doctor.id !== deleteId))
            //   history.push('/admin/view-doctors');
        }catch(err){
            errorToast('Failed to delete affiliate');
        }
    }

    useEffect(()=>{
        const init = async ()=>{
            const queryParams = new URLSearchParams(location.search)
            const affiliateRes = await axios.get(`${process.env.REACT_APP_API_URL}/doctor/get-doctor-affiliations/${queryParams.get("id")}`, {
                
                headers: {
                    Authorization: `Bearer ${auth_token}`
                }
              });
            //   console.log('affiliateRes', affiliateRes)
              let affiliateFormatted = affiliateRes.data.response.data;
   
              affiliateFormatted = affiliateFormatted.map(thisDoctor =>{
                
                return {
                    id:thisDoctor.id,
                    name: {name: thisDoctor.hospital[0].hospitalName, image: thisDoctor.hospital[0].image_url},
                    contact: thisDoctor.contactInfo,
                    // image: thisDoctor.image_url
                }
              })

              setAffiliates(affiliateFormatted)
        }
        init()
        
    }, [])

    const columns = [
        {dataField:'name', text: 'Affiliate Names',
            formatter: (cellContent, row) => {
                return (
                    <div className="cell__name__div">
                        <img className="cell__image" src={`${process.env.REACT_APP_API_RAW_URL}/${cellContent.image}`} alt="Affiliate" />
                        {/* <img className="cell__image" src={`../../../styles/images/Hospital.png`} alt="Affiliates" /> */}

                        <div className="cell__name">
                            <span className="highlighted__data">{cellContent.name}</span><br /><br />
                            <span className="normal__data">Updated 1 day ago</span>
                        </div>
                    </div>
                );
            },
            sort: true
        },
        {dataField:'contact', text: 'Contact No./Schedule', 
            formatter: (cellContent, row) => {
                return (
                    <div>
                        <span className="highlighted__data">{row.contact}</span> <br /><br />
                        <span className="normal__data">{row.schedule}</span>
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
                  <button className="edit__button" onClick={() => handleClick(row.id, `edit-doctor-affiliate`)}>
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
            data={affiliates} 
            pagination={pagination}
        />

        {/* <button type="submit" className="add__affiliate__button" onClick={() => addAffiliate('add-doctor-affiliate', doctorId)}>
            Add Affiliate
        </button> */}

    </div>
  )
}

export default AffiliateDatalist