import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { isUserAuth, getUserToken, getAccessToken } from '../../auth/Auth'





const SavedListings = ({ userData, loadUserData }) => {

  // ? Section 1: Define states
  // state to enable navigation between pages
  const navigate = useNavigate()

  // state for handling locations
  const location = useLocation()

  // set state for determineing which favourites you see
  const [favouriteTab, setFavouriteTab] = useState('Property prospects')



  // ? Section 2: Functions to access
  // function to delete favourites
  const deleteListingFavourite = async (property) => {
    if (isUserAuth()) {
      try {
        // Use the ID in the endpoint URL
        const { data } = await axios.delete(`/api/listing_favourites/${property.id}/`, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        loadUserData()
      } catch (error) {
        console.error('Error deleting favourite:', error)
      }
    } else {
      navigate('/access-denied')
      console.log('logged out')
    }
  }


  // function to move to the listings
  const goToListing = (item) => {
    console.log('postcode ->', item.postcode)
    window.localStorage.setItem('listing-postcode', JSON.stringify(item.postcode))
    window.localStorage.setItem('listing-route', JSON.stringify('On'))
    navigate('/agents/listing-generator')
  }



  return (
    <>
      <section className='saved-listings'>
        {userData && userData.listing_favourites.length > 0 ?
          <>
            <div className='favourite-count'>
              <h3>You have {userData ? userData.listing_favourites.length : ''} {userData && userData.listing_favourites.length === 1 ? 'listing' : 'listings'} saved</h3>

            </div>

            <div className='table-section'>
              <div className='table-headers'>
                <h5 id='column1' className='column'>#</h5>
                <div id='column2' className='column'>
                  <h5>Address</h5>
                </div>
                <div id='column3' className='column'>
                  <h5>Postcode</h5>
                </div>
                <div id='column4' className='column'>
                  <h5>Channel</h5>
                </div>
                <div id='column5' className='column'>
                  <h5>Date saved</h5>
                </div>
                <div id='column6' className='column'>
                  <h5>Action</h5>
                </div>
              </div>
              <hr className='property-divider' />
              <div className='table-details'>
                {userData ? userData.listing_favourites
                  .map((item, index) => {
                    return (
                      <>
                        <div key={index}
                          className='results-content'
                        >
                          <div className='column' id='column1'>
                            <h5>{index + 1}</h5>
                          </div>
                          <div className='column' id='column2' onClick={() => goToListing(item)}>
                            <h5>{item.address === '' ? 'N/a' : item.address}</h5>
                          </div>
                          <div className='column' id='column3'>
                            <h5>{item.postcode === '' ? 'N/a' : item.postcode}</h5>
                          </div>
                          <div className='column' id='column4'>
                            <h5>{item.channel}</h5>
                          </div>
                          <div className='column' id='column5'>
                            <h5>{item.date_added}</h5>
                          </div>
                          <div className='column' id='column6' onClick={() => deleteListingFavourite(item)}>
                            <h5 className='remove'>🗑</h5>
                          </div>
                        </div>
                        <hr className='property-divider' />
                      </>
                    )
                  })
                  : ''}

              </div>

            </div>
          </>
          : favouriteTab === 'Listings' && userData && userData.listing_favourites.length === 0 ?
            <>
              <div className='favourite-count'>
                <h3>😕 You don&apos;t have any properties saved here. Head to the listing generator tab to get started!</h3>
              </div>
            </>
            : ''}
      </section>
    </>
  )
}

export default SavedListings