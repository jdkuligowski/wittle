import React, { useState, useEffect, useRef } from 'react'
import { Modal } from 'react-bootstrap'




const WaitlistSignup = ({ waitlistShow, handleWaitlistClose, validEmail, errors }) => {




  return (
    <>
      {/* <section className="waitlist-wrapper"> */}
      <Modal show={waitlistShow} onHide={handleWaitlistClose} backdrop='static' className='waitlist-modal'>
        <Modal.Body>
          <div className='body-section'>
            {validEmail && !errors ?
              <h3>💪 Done! It won&apos;t be long until you&apos;re Wittling, we promise. Stay tuned to your emails.</h3>
              : 
              <h3> 😬 Looks like that email&apos;s already been used or is invalid</h3>
            }
          </div>
          <button className='waitlist-close' onClick={handleWaitlistClose}>Close</button>

        </Modal.Body>
      </Modal>
      {/* </section> */}
    </>
  )
}

export default WaitlistSignup