import React, { useState, useEffect, useRef } from 'react'
import { Modal } from 'react-bootstrap'
import { isEmail, isLength, matches } from 'validator'
import axios from 'axios'


const AgentSubmitted = ({ handleSubmitClose, handleSubmitShow, agentSubmittedShow }) => {


  return (

    <>
      <Modal show={agentSubmittedShow} onHide={handleSubmitClose} backdrop='static' className='agent-success-modal'>
        <Modal.Body>

          <div className='agent-signed-up'>
            <h3>🤝 thanks, we&apos;ll be in touch soon to discuss</h3>
            <button className='waitlist-close' onClick={handleSubmitClose}>Close</button>
          </div>
        </Modal.Body>

      </Modal>
    </>
  )
}

export default AgentSubmitted