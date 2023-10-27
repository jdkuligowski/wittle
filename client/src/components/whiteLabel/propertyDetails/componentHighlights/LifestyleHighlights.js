import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import NavBar from '../../../tools/NavBar'
import { isUserAuth, getUserToken, getAccessToken } from '../../../auth/Auth'





const LifestyleHighlights = ({ restaurants1, cuisines, topRestaurants, gyms1, mainGyms, supermarkets1, mainSupermarkets, pubs1, topPubs }) => {

  // ? Section 1: Define states

  // state for errors
  const [errors, setErrors] = useState()


  return (

    <>
      <section className='box-highlights'>
        <div className='row'>
          <div className='column'>
            <div className='variable-title'>
              <div className='variable-icon' id='restaurants'></div>
              <h5 className='block-title'>Restaurants</h5>

            </div>
            {restaurants1 ?
              <>
                <ul className='results-details'>
                  <li>{restaurants1.length} restaurants within 15 mins walk</li>
                  <li>more than {cuisines} cuisines available</li>
                  <li>{topRestaurants[0]}, {topRestaurants[1]} & {topRestaurants[2]} are well rated</li>
                </ul>
              </>
              : ''}

          </div>
          <div className='column'>
            <div className='variable-title'>
              <div className='variable-icon' id='pubs'></div>
              <h5 className='block-title'>Pubs</h5>

            </div>
            {pubs1 ?
              <>
                <ul className='results-details'>
                  <li>{pubs1.length} pubs within 15 mins walk</li>
                  <li>{topPubs[0]}, {topPubs[1]} & {topPubs[2]} are well rated</li>
                </ul>
              </>
              : ''}
          </div>
        </div>
        <div className='row'>
          <div className='column'>
            <div className='variable-title'>
              <div className='variable-icon' id='gyms'></div>
              <h5 className='block-title'>Fitness</h5>

            </div>
            {gyms1 ?
              <>
                <ul className='results-details'>
                  <li>{gyms1.length} gyms within 15 mins walk</li>
                  {mainGyms.length === 3 ? <li>includes {mainGyms[0]}, {mainGyms[1]} & {mainGyms[2]}</li> : mainGyms.length === 2 ? <li>includes {mainGyms[0]} & {mainGyms[1]} </li> : mainGyms.length === 1 ? <li>includes {mainGyms[0]}</li> : ''}
                </ul> </>
              : ''}

          </div>
          <div className='column'>
            <div className='variable-title'>
              <div className='variable-icon' id='supermarkets'></div>
              <h5 className='block-title'>Supermarket</h5>

            </div>
            {supermarkets1 ?
              <>
                <ul className='results-details'>
                  <li>🛒 {supermarkets1.length} supermarkets within 15 mins walk</li>
                  {mainSupermarkets.length === 3 ? <li>🛒 includes {mainSupermarkets[0]}, {mainSupermarkets[1]} & {mainSupermarkets[2]}</li> : mainSupermarkets.length === 2 ? <li>🛒 includes {mainSupermarkets[0]} & {mainSupermarkets[1]} </li> : mainSupermarkets.length === 1 ? <li>🛒 includes {mainSupermarkets[0]}</li> : ''}
                </ul></>
              : ''}
          </div>
        </div>

      </section>
    </>
  )
}

export default LifestyleHighlights