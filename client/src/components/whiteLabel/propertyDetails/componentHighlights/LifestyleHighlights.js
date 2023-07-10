import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import NavBar from '../../../tools/NavBar'
import { isUserAuth, getUserToken , getAccessToken } from '../../../auth/Auth'





const LifestyleHighlights = ({ restaurants1, cuisines, topRestaurants, gyms1, mainGyms, supermarkets1, mainSupermarkets }) => {

  // ? Section 1: Define states

  // state for errors
  const [errors, setErrors] = useState()


  return (

    <>
      <section className='box-highlights'>
        <div className='row'>
          <div className='column'>
            <h5 className='block-title'>Restaurants</h5>
            {restaurants1 ? 
              <>
                <h5>🍽 {restaurants1.length} restaurants within 15 mins walk</h5>
                <h5>🍽 more than {cuisines} cuisines available</h5>
                <h5>🍽 {topRestaurants[0]}, {topRestaurants[1]} & {topRestaurants[2]} are well rated</h5>
              </>
              : '' }

          </div>
          <div className='column'>
            <h5 className='block-title'>Pubs</h5>

          </div>
        </div>
        <div className='row'>
          <div className='column'>
            <h5 className='block-title'>Fitness</h5>
            {gyms1 ? 
              <>
                <h5>🏋️‍♂️ {gyms1.length} gyms within 15 mins walk</h5>
                {mainGyms.length === 3 ? <h5>🏋️‍♂️ includes {mainGyms[0]}, {mainGyms[1]} & {mainGyms[2]}</h5> : mainGyms.length === 2 ? <h5>🏋️‍♂️ includes {mainGyms[0]} & {mainGyms[1]} </h5> : mainGyms.length === 1 ? <h5>🏋️‍♂️ includes {mainGyms[0]}</h5> : '' }
              </>
              : '' }

          </div>
          <div className='column'>
            <h5 className='block-title'>Supermarkets</h5>
            {supermarkets1 ? 
              <>
                <h5>🛒 {supermarkets1.length} supermarkets within 15 mins walk</h5>
                {mainSupermarkets.length === 3 ? <h5>🛒 includes {mainSupermarkets[0]}, {mainSupermarkets[1]} & {mainSupermarkets[2]}</h5> : mainSupermarkets.length === 2 ? <h5>🛒 includes {mainSupermarkets[0]} & {mainSupermarkets[1]} </h5> : mainSupermarkets.length === 1 ? <h5>🛒 includes {mainSupermarkets[0]}</h5> : '' }
              </>
              : '' }
          </div>
        </div>
        
      </section>
    </>
  )
}

export default LifestyleHighlights