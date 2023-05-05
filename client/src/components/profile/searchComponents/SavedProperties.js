import { useParams, useNavigate, Link } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { isUserAuth, getAccessToken, getUserToken } from '../../auth/Auth'
import { NumericFormat } from 'react-number-format'
import ProfileMobileSlider from '../../tools/ProfileMobileSlider'



const SavedProperties = ({ profileDetail, profileContent, favouriteProperties, setChannel, channel, deleteProperty, setProfileContent, setProfileDetail }) => {


  // state to enable navigation between pages
  const navigate = useNavigate()

  return (

    <>
      {isUserAuth() && favouriteProperties && favouriteProperties.length > 0 ?
        <>
          <h2 className='section-title'>You&apos;ve got {favouriteProperties ? favouriteProperties.length : ''} saved properties</h2>

          <div className='property-choice' name='channel' onChange={(e) => setChannel({ ...channel, channel: e.target.value })}>
            <select>
              <option>For Sale</option>
              <option>For Rent</option>
            </select>
          </div>
          <div className='property-grid'>
            {favouriteProperties && channel.channel === 'For Rent' ?
              <div className='property-card'>
                {favouriteProperties.filter(property => property.channel === 'Rent').map(property => {
                  return (
                    <>
                      <div className='property-detail'>
                        <div className='property-image' onClick={() => navigate(`/wittle-results/${property.id}`)} style={{ backgroundImage: `url('${property.property_image_1}')` }}>
                        </div>
                        <div className='property-text-top'>
                          <h5>{property.property_name}</h5>
                          <h5><NumericFormat value={property.monthly} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h5>
                        </div>
                        <div className='property-text-bottom'>
                          <h5>{property.type}</h5>
                          <h5>🛌 {property.bedrooms}</h5>
                          <button id={property.id} onClick={deleteProperty}>Delete</button>
                        </div>
                      </div>
                    </>
                  )
                })}
              </div>
              :
              favouriteProperties && channel.channel === 'For Sale' ?
                <div className='property-card'>
                  {favouriteProperties.filter(property => property.channel === 'Sale').map(property => {
                    return (
                      <>
                        <div className='property-detail'>
                          <div className='property-image' onClick={() => navigate(`/wittle-results/${property.id}`)} style={{ backgroundImage: `url('${property.property_image_1}')` }}>
                          </div>
                          <div className='property-text-top'>
                            <h5>{property.property_name}</h5>
                            <h5><NumericFormat value={property.value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h5>
                          </div>
                          <div className='property-text-bottom'>
                            <h5>{property.type}</h5>
                            <h5>🛌 {property.bedrooms}</h5>
                            <button id={property.id} onClick={deleteProperty}>Delete</button>
                          </div>
                        </div>
                      </>
                    )
                  })}
                </div>
                : ''}
          </div>
        </>
        :
        isUserAuth() && favouriteProperties && favouriteProperties.length === 0 ?
          <>
            <div className='no-properties'>
              <ProfileMobileSlider
                setProfileContent={setProfileContent}
                profileContent={profileContent}
                profileDetail={profileDetail}
                setProfileDetail={setProfileDetail}
              />
              <h4 className='no-properties-text'>😕</h4>
              <h4 className='no-properties-text'>You don&apos;t have any properties saved yet.</h4>
              <h4 className='no-properties-subtext'>Once you&apos;ve found somewhere you like, favourite it and you&apos;ll find it here.</h4>
              <div className='favourite-instructions'>
                <div className='favourite-button-on'>

                </div>
                {/* <h3>^</h3> */}
                <h4>Look out for this icon when you&apos;re looking at properties</h4>
              </div>
            </div>
          </>
          :
          !isUserAuth() ?
            <>
              <div className='no-properties'>
                <h4 className='no-properties-text'>😕</h4>
                <h4 className='no-properties-text'>You need a Wittle account to be able to save properties</h4>
                <button>Finalise account</button>
              </div>
            </>
            :
            ''}
    </>
  )
}

export default SavedProperties