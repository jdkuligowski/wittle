
import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import axios from 'axios'



const RemoveProperties = ({ propertyRemoveShow, handleRemovePropertyClose, removeProperty }) => {

  const closeAndLeave = () => {
    // setLeadGenSection('Saved properties')
    handleRemovePropertyClose()
  }

  // useEffect(() => {
  //   console.log('passed favourite ->', latestFavourites)
  // })

  return (
    <>
      <Modal show={propertyRemoveShow} onHide={handleRemovePropertyClose} backdrop='static' className='saved-action-modal'>
        <Modal.Body>
          <>
            <div className='inner-wrapper'>
              <div className='header-section'>
                <h1 onClick={handleRemovePropertyClose}>X</h1>
              </div>
              <div className='core-body'>
                <h3 className='message'>Are you sure you don&apos;t want to see these properties any more?</h3>
                <h3 className='sub-message'>Once you do this, they won&apos;t appear in your latest or saved properties.</h3>
              </div>
              <div className='cta-section'>
                <button className='saved' onClick={removeProperty}>Remove</button>
                <button className='stay' onClick={handleRemovePropertyClose}>Go back</button>
              </div>
            </div>
          </>
        </Modal.Body>
      </Modal>

    </>
  )
}

export default RemoveProperties