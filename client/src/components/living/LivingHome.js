import { useNavigate, Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { isUserAuth } from '../auth/Auth'
import Select from 'react-select'
import NavBar from '../tools/NavBar'





const LivingHome = () => {

  // state to enable navigation between pages
  const navigate = useNavigate()


  return (
    <>
      <section className='living-wrapper'>
        <section className='living-opening'>
          <NavBar />
          <div className='headline-section-living'>
            <h1>Wittle Living makes living easier</h1>
            <h3>Get on top of your admin and get the most out of where you live</h3>
            <button className='mobile-button'>Simplify my life</button>

            <div className='headline-features'>
              <div className='feature'>
                <h4>Admin Portal</h4>

                <div className='icon-box'>
                  <img className='icon' src='/website_icons/scale.png' alt='admin icon' />
                </div>
                <h5>Stay on top of your monthly bills and household admin</h5>
              </div>
              <hr className='mobile-separator'/>

              <div className='feature'>
                <h4>Lifestyle Portal</h4>

                <div className='icon-box'>
                  <img className='icon' src='/website_icons/lifestyle.png' alt='lifestyle icon' />

                </div>
                <h5>Get recommendations on new and popular things to do in your area</h5>
              </div>
              <hr className='mobile-separator'/>

              <div className='feature'>
                <h4>Property Portal</h4>

                <div className='icon-box'>
                  <img className='icon' src='/website_icons/property-market.png' alt='property icon' />

                </div>
                <h5>Understand more about the value of your property and how it compares to the rest of the market</h5>
              </div>
            </div>

            <button>Simplify my life</button>

          </div>
        </section>
      </section>
    </>
  )
}

export default LivingHome