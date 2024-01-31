
import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import axios from 'axios'



const UnhiddenModal = ({ hiddenSavedShow, handleHiddenSavedClose, setLeadGenSection, latestFavourites }) => {

  const closeAndLeave = () => {
    setLeadGenSection('Saved properties')
    handleHiddenSavedClose()
  }

  // useEffect(() => {
  //   console.log('passed favourite ->', latestFavourites)
  // })

  return (
    <>
      <Modal show={hiddenSavedShow} onHide={handleHiddenSavedClose} backdrop='static' className='saved-action-modal'>
        <Modal.Body>
          <>
            <div className='inner-wrapper'>
              <div className='header-section'>
                <h1 onClick={handleHiddenSavedClose}>X</h1>
              </div>
              <div className='core-body'>
                <h3 className='message'>We&apos;ve moved {latestFavourites === 1 ? `${latestFavourites} property` : `${latestFavourites} properties`} back to your saved list 🤝</h3>
              </div>
              <div className='cta-section'>
                <button className='saved' onClick={closeAndLeave}>Go to saved</button>
                <button className='stay' onClick={handleHiddenSavedClose}>Stay here</button>
              </div>
            </div>
          </>
        </Modal.Body>
      </Modal>

    </>
  )
}

export default UnhiddenModal