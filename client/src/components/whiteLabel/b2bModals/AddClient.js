import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { isUserAuth, getUserToken, getAccessToken } from '../../auth/Auth'
import { NumericFormat } from 'react-number-format'
import Loading from '../../helpers/Loading'
import { Modal } from 'react-bootstrap'
import ReactSwitch from 'react-switch'


const AddClient = ({ clientInputShow, handleClientInputClose, clientInputDetails, setClientInputDetails, addNewClient }) => {

  return (

    <>
      <Modal show={clientInputShow} onHide={handleClientInputClose} backdrop='static' className='add-client-modal'>
        <section className='overall-body'>
          <section className='input-header'>
            <div className='input-title'>
              <h1>Add client details</h1>
              <h1 className='close-modal' onClick={handleClientInputClose}>X</h1>
            </div>
          </section>
          <section className='input-main'>
            <div className='input-row'>
              <h3 className='input-title'>First name</h3>
              <input placeholder='' className='dropdown' value={clientInputDetails.first_name || ''} onChange={(e) => setClientInputDetails(prevData => ({ ...prevData, first_name: e.target.value }))}></input>
            </div>
            <div className='input-row'>
              <h3 className='input-title'>Last name</h3>
              <input placeholder='' className='dropdown' value={clientInputDetails.last_name || ''} onChange={(e) => setClientInputDetails(prevData => ({ ...prevData, last_name: e.target.value }))}></input>
            </div>
            <div className='input-row'>
              <h3 className='input-title'>Email</h3>
              <input placeholder='' className='dropdown' value={clientInputDetails.email || ''} onChange={(e) => setClientInputDetails(prevData => ({ ...prevData, email: e.target.value }))}></input>
            </div>
            <div className='input-row'>
              <h3 className='input-title'>Current area</h3>
              <input placeholder='' className='dropdown' value={clientInputDetails.area || ''} onChange={(e) => setClientInputDetails(prevData => ({ ...prevData, area: e.target.value }))}></input>
            </div>
            <div className='input-row'>
              <h3 className='input-title'>Area looking</h3>
              <input placeholder='' className='dropdown' value={clientInputDetails.looking || ''} onChange={(e) => setClientInputDetails(prevData => ({ ...prevData, looking: e.target.value }))}></input>
            </div>
          </section>
          <section className='input-footer'>
            <button className='load-properties' onClick={addNewClient}>Add client</button>
          </section>


        </section>



      </Modal>

    </>
  )

}

export default AddClient


