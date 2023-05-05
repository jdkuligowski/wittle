
import { useParams, useNavigate, Link } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { isUserAuth, getAccessToken, getUserToken } from '../../auth/Auth'
import { NumericFormat } from 'react-number-format'
import ProfileMobileSlider from '../../tools/ProfileMobileSlider'



const SavedSearches = ({ profileDetail, userData, propertySearch, deleteSearch, handleEditShow, setID }) => {


  // state to enable navigation between pages
  const navigate = useNavigate()


  return (

    <>
      {isUserAuth() && userData && userData.property_search_details.length > 0 ?
        <>
          <h2 className='section-title'> You&apos;ve made {propertySearch ? propertySearch.length : ''} searches</h2>

          <div className='search-grid'>
            {userData ?
              <div className='search-card'>
                {userData.property_search_details.map((search, index) => {
                  return (
                    <>
                      <div className='search-detail' key={index}>
                        <div className='search-title'>
                          <h3>{search.search_name}</h3>
                          <div className='search-buttons'>
                            <button onClick={deleteSearch} id={search.result_id} className='transparent-btn'>Delete</button>
                            <button onClick={handleEditShow} id={search.result_id} className='transparent-btn'>Edit</button>
                            <button onClick={setID} key={index} id={search.result_id} className='block-btn'>Results</button>
                          </div>
                        </div>
                        <div className='search-footer'>
                          <div className='search-footer-property'>
                            <div className='search-summary'>
                              <h1 className='search-count'>{search.total_properties}</h1>
                              <p className='search-description'>properties</p>
                            </div>
                          </div>
                          <div className='search-footer-scores'>
                            <div className='search-summary'>
                              <h1 className='search-count'>🔥 {search.top_score}%</h1>
                              <p className='search-description'>max match</p>
                            </div>
                            <div className='search-summary'>
                              <h1 className='search-count'>🔥 {search.average_score}%</h1>
                              <p className='search-description'>avg match</p>
                            </div>
                          </div>
                        </div>
                        <div className='search-content'>
                          <div className='search-left'>
                            <h4>Property criteria</h4>
                            <div className='search-section-detail'>
                              <p>🏠  Type: {search.property_type}</p>
                              <p>💷  Price: <NumericFormat value={search.property_price_min} displayType={'text'} thousandSeparator={true} prefix={'£'} /> - <NumericFormat value={search.property_price_max} displayType={'text'} thousandSeparator={true} prefix={'£'} /></p>
                              <p>🛌  Bedrooms: {search.property_bed_min} - {search.property_bed_max}</p>
                            </div>
                          </div>
                          <div className='search-right'>
                            <h4>Search requirements</h4>
                            {propertySearch ?
                              <div className='search-section-detail'>
                                {search.restaurant_selection ? <button className='pills'>Restaurants</button> : ''}
                                {search.takeaway_selection ? <button className='pills'>Takeaways</button> : ''}
                                {search.pubs_selection ? <button className='pills'>Pubs</button> : ''}
                                {search.cafes_selection ? <button className='pills'>Cafes</button> : ''}
                                {search.supermarket_selection ? <button className='pills'>Supermarkets</button> : ''}
                                {search.gym_selection ? <button className='pills'>Gyms</button> : ''}
                                {search.park_selection ? <button className='pills'>Parks</button> : ''}
                                {search.workplace_selection ? <button className='pills'>Work</button> : ''}
                                {search.tube_selection ? <button className='pills'>Tubes</button> : ''}
                                {search.train_selection ? <button className='pills'>Trains</button> : ''}
                                {search.primary_selection ? <button className='pills'>Primaries</button> : ''}
                                {search.secondary_selection ? <button className='pills'>Secondaries</button> : ''}
                                {search.college_selection ? <button className='pills'>Colleges</button> : ''}
                                {search.family_selection ? <button className='pills'>Family</button> : ''}
                              </div>
                              : ''}
                          </div>
                        </div>
                      </div>
                    </>
                  )
                }).sort((a, b) => b.result_id - a.result_id)}
              </div> : ''}
          </div>
        </>
        :
        isUserAuth() && userData && userData.property_search_details.length === 0 ?
          <>
            <div className='no-properties'>
              <h4 className='no-properties-text'>😕</h4>
              <h4 className='no-properties-text'>You haven&apos;t saved any searches yet.</h4>
              <h4 className='no-properties-subtext'>As soon as you&apos;ve saved a search, it&apos;ll show here, then you can change or update it whenever you like.</h4>
              <button onClick={() => navigate('/wittle-search')}>Start Wittling</button>
            </div>
          </>

          : !isUserAuth() ?
            <>
              <div className='no-properties'>
                <h4 className='no-properties-text'>😕</h4>
                <h4 className='no-properties-text'>You need a Wittle account to be able to save searches</h4>
                <button>Finalise account</button>
              </div>
            </>

            : ''}
    </>
  )
}

export default SavedSearches