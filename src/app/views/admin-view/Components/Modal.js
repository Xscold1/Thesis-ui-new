import React from "react";

function Modal({ setOpenModal, deleteId, confirm }) {
  console.log('modal deleteId', deleteId);
  return (
    <div className="modalBackground">
      <div className="adminModalContainer">
        <div className="titleCloseBtn white">
          <span
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </span>
        </div>
        <div className="title">

          <h1>Confirm Deletion</h1>
          <p>Are you sure you want to delete the data of this record?</p>

          <br />

          {/* Add function props to this button to make this Modal universal??? */}
        <button onClick={() => {confirm()}} className="confirm__deletion__button" >
            Confirm
        </button>
            <br /><br />
        <button onClick={() => {
              setOpenModal(false);
            }} className="cancel__deletion__button" >
            Cancel
        </button>
          
        </div>
        
      </div>
    </div>
  );
}

export default Modal;