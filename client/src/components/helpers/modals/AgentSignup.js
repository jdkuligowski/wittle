import React, { useState, useEffect, useRef } from 'react'
import { Modal } from 'react-bootstrap'
import { isEmail, isLength, matches } from 'validator'
import axios from 'axios'





const AgentSignup = ({ agentShow, handleAgentClose, handleAgentShow, submitError, handleChange, handleSubmit, agentSubmitted }) => {




  return (
    <>
      {/* <section className="waitlist-wrapper"> */}
      <Modal show={agentShow} onHide={handleAgentClose} backdrop='static' className='agent-modal'>
        <Modal.Body>
          <>          
            <div className='header-section'>
              <h3>📝 Share some details so we can contact you</h3>
              <h3 className='close-button' onClick={handleAgentClose}>x</h3>
            </div>
            <div className='body-section'>
              <div className='body-row'>
                <h4>Name</h4>
                <input name='name' onChange={handleChange}></input>
                {submitError.name && <p className="error">* {submitError.name}</p>}

              </div>
              <div className='body-row'>
                <h4>Email</h4>
                <input name='email' onChange={handleChange}></input>
                {submitError.email && <p className="error">* {submitError.email}</p>}

              </div>
              <div className='body-row'>
                <h4>Company</h4>
                <input name='company' onChange={handleChange}></input>
                {submitError.company && <p className="error">* {submitError.company}</p>}

              </div>
              <div className='body-row'>
                <h4>Position</h4>
                <input name='position' onChange={handleChange}></input>
                {submitError.position && <p className="error">* {submitError.position}</p>}

              </div>
            </div>
            <button className='waitlist-close' onClick={handleSubmit}>Submit</button>
            {submitError.post && <p className="error" id='submit'>* {submitError.post}</p>}
          </>

        </Modal.Body>
      </Modal>
      {/* </section> */}
    </>
  )
}

export default AgentSignup