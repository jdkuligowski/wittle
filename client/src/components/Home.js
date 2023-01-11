import { useNavigate, Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { isUserAuth } from './auth/Auth'
import Select from 'react-select'
import NavBar from './tools/NavBar'

const Home = () => {


  return (
    <>
      <section className='homepage-wrapper'>
        {/* Home page section 1: Opening section to site - introduction page and call to a ction for different user journies */}
        <section className='website-opening'>
          {/* <section className='nav-section'>
            <div className='logo'>
              <h2>Wittle</h2>
            </div> */}
          <NavBar />
          {/* </section> */}

          <h1>You can&apos;t renovate the location...</h1>
          <h3>Based on your values and interests, we will help you find the perfect property <strong>in the perfect location</strong> for your next move</h3>
          <div className='call-to-action'>
            <div className='front-page-options' id='small'>
              <h4>Property Search</h4>
              <p>What you are used to - select your property criteria, your chosen area and begin your search.</p>
              <button className='action' id='transparent'>Start</button>
            </div>
            <div className='front-page-options' id='large'>
              <h4>Wittle Magic</h4>
              <p>Combine your interests, lifestyle and property criteria and we will find you the perfect property match.</p>
              <Link to={'/wittle-search'}><button className='action' id='solid'>Start</button></Link>
            </div>
            <div className='front-page-options' id='small'>
              <h4>Area Search</h4>
              <p>Tell us what you are interested in and we will find you a great area. From here you can filter the properties and begin your search.</p>
              <button className='action' id='transparent'>Start</button>
            </div>
            {/* <button className='action'>Property search</button>
            <Link to={'/property-search'}><button className='action'>
              Wittle search</button></Link> */}
          </div>
        </section>
        {/* Home page section 2: detail around product for users that haven't visited site before */}
        <section className='website-detail'>


        </section>

      </section>
    </>
  )
}

export default Home





