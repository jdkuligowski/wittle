
import React, { useState, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import axios from 'axios'



const ArchivedPropertiesModal = ({ archivedActionShow, handleArchivedSavedClose, setLeadGenSection, latestFavourites }) => {

  const closeAndLeave = () => {
    setLeadGenSection('Archived properties')
    handleArchivedSavedClose()
  }

  // useEffect(() => {
  //   console.log('passed favourite ->', latestFavourites)
  // })

  return (
    <>
      <Modal show={archivedActionShow} onHide={handleArchivedSavedClose} backdrop='static' className='saved-action-modal'>
        <Modal.Body>
          <>
            <div className='inner-wrapper'>
              <div className='header-section'>
                <h1 onClick={handleArchivedSavedClose}>X</h1>
              </div>
              <div className='core-body'>
                <h3 className='message'>We&apos;ve added {latestFavourites === 1 ? `${latestFavourites} property` : `${latestFavourites} properties`} to your archived list 🤝</h3>
              </div>
              <div className='cta-section'>
                <button className='saved' onClick={closeAndLeave}>Go to archived</button>
                <button className='stay' onClick={handleArchivedSavedClose}>Stay here</button>
              </div>
            </div>
          </>
        </Modal.Body>
      </Modal>

    </>
  )
}

export default ArchivedPropertiesModal