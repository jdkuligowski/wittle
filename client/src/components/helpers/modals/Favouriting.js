import React, { useState, useEffect } from 'react'
import { NumericFormat } from 'react-number-format'
import { Modal, ModalBody } from 'react-bootstrap'
import { useParams, useNavigate, Link } from 'react-router-dom'



const Favouriting = ({ favouritingShow, handleFavouriteClose, favourited, otherFavourites,
  currentFavInfo, otherFavInfo, deleteShow, handleDeleteClose,
  favouriteAuth, handleFavAuthClose, deleted }) => {



  return (
    <>
      <Modal show={favouritingShow} onHide={handleFavouriteClose} backdrop='static' className='favouriting-modal'>
        <ModalBody>
          <div className='favourite-modal-body'>
            <div className='favourites-title'>
              <h1 className='title-message'>😎 Property saved</h1>
              <h1 className='closing-x' onClick={handleFavouriteClose}>x</h1>
            </div>

            {favourited ?
              <div className='favourites-recent'>
                {favourited.map((property, index) => {
                  return (
                    <>
                      <div className='favourite-property' key={index}>
                        <Link to={(`/wittle-results/${property.id}`)}>
                          <div className='property-image' style={{ backgroundImage: `url('${property.property_image_1}')` }}></div>
                        </Link>
                        <div className='property-content'>
                          <h3>🏠 {property.property_name}</h3>
                          <h3>🔥 {currentFavInfo.total_score}% match</h3>
                          <h3 key={index}>🔎 Original search: {currentFavInfo.search_name}</h3>
                          <h3>💷 <NumericFormat value={property.value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                          <h3>🛌 {property.bedrooms} bedrooms</h3>
                        </div>
                      </div>
                    </>
                  )
                })}

              </div>
              : ''
            }
            <hr className='favourite-section-splitter' />
            {otherFavourites ?
              <div className='favourites-other'>
                <h1 className='title-message'>🏠 {otherFavourites.length} other saved properties</h1>
                {otherFavourites.map((property, index) => {
                  return (
                    <>
                      <div className='favourite-property' key={index}>
                        <Link to={(`/wittle-results/${property.id}`)}>
                          <div className='property-image' style={{ backgroundImage: `url('${property.property_image_1}')` }}></div>
                        </Link>
                        <div className='property-content'>
                          <h3>🏠 {property.property_name}</h3>
                          {otherFavInfo.map((fav, index) => {
                            return (
                              fav.property === property.id ?
                                <>
                                  <h3>🔥 {fav.total_score}% match</h3>
                                  <h3 key={index}>🔎 Original search: {fav.search_name}</h3>
                                </>
                                : ''
                            )
                          })}
                          <h3>💷 <NumericFormat value={property.value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                          <h3>🛌 {property.bedrooms} bedrooms</h3>
                        </div>
                      </div>
                      <hr className='favourite-property-splitter' />

                    </>
                  )
                })}

              </div>
              : ''
            }
          </div>
        </ModalBody>
      </Modal>


      <Modal show={favouriteAuth} onHide={handleFavAuthClose} backdrop='static' className='favourite-auth-modal'>
        <ModalBody>
          <div className='favourite-modal-body'>
            <div className='favourites-title'>
              <h1 className='title-message'>😬 Oops! </h1>
              <h1 className='closing-x' onClick={handleFavAuthClose}>x</h1>
            </div>
            <div className='favourites-non-auth'>
              <h3>Only fully fledged Wittlers can save properties.</h3>
              {/* <div className='non-auth-buttons'>
                <button>Sign in</button>
                <button>Register</button>
              </div> */}
            </div>


          </div>
        </ModalBody>
      </Modal>

      <Modal show={deleteShow} onHide={handleDeleteClose} backdrop='static' className='deleting-modal'>
        <ModalBody>
          <div className='favourite-modal-body'>
            <div className='favourites-title'>
              <h1 className='title-message'>🗑 Property deleted</h1>
              <h1 className='closing-x' onClick={handleDeleteClose}>x</h1>
            </div>

            {deleted ?
              <div className='favourites-recent'>
                {deleted.map((property, index) => {
                  return (
                    <>
                      <div className='favourite-property' key={index}>
                        <Link to={(`/wittle-results/${property.id}`)}>
                          <div className='property-image' style={{ backgroundImage: `url('${property.property_image_1}')` }}></div>
                        </Link>
                        <div className='property-content'>
                          <h3>🏠 {property.property_name}</h3>
                          <h3>🔥 {property.first_match}% match</h3>
                          <h3 key={index}>🔎 Original search: {currentFavInfo.search_name}</h3>
                          <h3>💷 <NumericFormat value={property.value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                          <h3>🛌 {property.bedrooms} bedrooms</h3>
                        </div>
                      </div>
                    </>
                  )
                })}

              </div>
              : ''
            }
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}


export default Favouriting