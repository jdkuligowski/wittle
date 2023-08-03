import React, { useState, useEffect, useRef } from 'react'
import { Modal } from 'react-bootstrap'




const WaitlistSignup = ({ waitlistShow, handleWaitlistClose, validEmail, errors, handleSubmit, handleChange, complete, emailExists }) => {




  return (
    <>
      {/* <section className="waitlist-wrapper"> */}
      <Modal show={waitlistShow} onHide={handleWaitlistClose} backdrop='static' className='waitlist-modal'>
        <Modal.Body>
          <div className='body-section'>
            {validEmail && !emailExists && !complete ?
              <>
                <h2>One last thing...</h2>
                <div className='preferences'>
                  <h3>Please uncheck this box if you don&apos;t want to receive updates about Wittle</h3>
                  <input type='checkbox' name='preferences' defaultChecked={true} onChange={handleChange}></input>
                </div>
                <button className='waitlist-close' onClick={handleSubmit}>Submit</button>
              </>
              : !validEmail ?
                <>
                  <h3> 😬 Looks like that email isn&apos;t valid.</h3>
                  <button className='waitlist-close' onClick={handleWaitlistClose}>Close</button>
                </>
                : emailExists ?
                  <>
                    <h3>😬 This email address is already in use. Try another one!</h3>
                    <button className='waitlist-close' onClick={handleWaitlistClose}>Close</button>
                  </>
                  : complete ?
                    <>
                      <h3>💪 Done! It won&apos;t be long until you&apos;re Wittling, we promise. Stay tuned to your emails.</h3>
                      <button className='waitlist-close' onClick={handleWaitlistClose}>Close</button>
                    </>
                    : null
            }
          </div>
        </Modal.Body>
      </Modal>
      {/* </section> */}
    </>
  )
}

export default WaitlistSignup