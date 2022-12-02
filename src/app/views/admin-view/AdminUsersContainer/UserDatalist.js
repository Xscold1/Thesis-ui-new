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

// Components
import Modal from '../Components/Modal'

import authenticate from '../../../utils/authenticate';

function UserDatalist() {
    const auth_token = localStorage.getItem('auth_token')
    useEffect(()=>{
    authenticate();
  },[]);
    const [users, setUsers] = useState([])
    let history = useHistory();

    const [modalOpen, setModalOpen] = useState(false);

    const [deleteUser, setDeleteUser] = useState('');
    console.log('deleteUser', deleteUser);

    const deleteFunction = (id) => {
        setDeleteUser(id);
        // console.log('delete id: ', deleteUser);
        setModalOpen(true);
    }

    useEffect(()=>{
        const init = async ()=>{
            const usersRes = await axios.get(`${process.env.REACT_APP_API_URL}/user/get-all-user`, {
                headers: {
                    Authorization: `Bearer ${auth_token}`
                }
              });
              console.log('usersRes', usersRes)
            //   console.log('usersRes', usersRes)
              let usersFormatted = usersRes.data.response.data;
              console.log('usersFormatted', usersFormatted)
            //   console.log('usersFormatted', usersFormatted)
   
              usersFormatted = usersFormatted.map(user =>{
                return {
                    id: user.id,
                    email: user.email,
                    address: user.address
                }
              })

              setUsers(usersFormatted)
        }
        init()
    }, [])
    const confirmDelete = async () =>{
        try{
            const deleteDoctorRest = await axios.delete(`${process.env.REACT_APP_API_URL}/user/delete?id=${deleteUser}`, {
                headers: {
                    Authorization: `Bearer ${auth_token}`
                }
              });
        
              successToast('Successfully deleted user')
              setModalOpen(false);
              setUsers(state=> state.filter((user) => user.id !== deleteUser))
              history.push('/admin/view-users');
        }catch(err){
            errorToast('Failed to delete user');
        }
    }
    const columns = [
        {dataField:'email', text: 'User Email',
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
            dataField:'address', 
            text: 'address',
            formatter: (cellContent, row) => {
                return (
                    <div>
                        <span className="highlighted__data">{cellContent}</span> <br /><br />
                        <span className="normal__data">FLORIDABLANCA, PAMPANGA</span>
                         {/* {row.edit__id} */}
                    </div>
                );
            },
            sort: true
        },
        {
            dataField:'id', 
            text: 'Delete',
            classes : 'center__cell',
            formatter: (cellContent, row) => {
                return (
                    <button className="delete__button" onClick={() => { deleteFunction(cellContent) }}>
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

        {modalOpen && <Modal setOpenModal={setModalOpen} confirm={confirmDelete} deleteUser={deleteUser} />}

        <BootstrapTable 
            bootstrap4 
            keyField='id' 
            columns={columns} 
            data={users} 
            pagination={pagination}
        />

    </div>
  )
}

export default UserDatalist