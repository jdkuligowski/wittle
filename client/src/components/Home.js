import { useNavigate, Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { isUserAuth } from './auth/Auth'
import Select from 'react-select'
import NavBar from './tools/NavBar'

const Home = () => {

  // state to enable navigation between pages
  const navigate = useNavigate()

  return (
    <>
      <section className='homepage-wrapper'>
        {/* Home page section 1: Opening section to site - introduction page and call to a ction for different user journies */}
        <section className='website-opening'>
          <NavBar />
          <div className='headline-title-section'>
            <div className='headline-detail'>
              <h1>Finding you the perfect property in the perfect location..</h1>
              <h3>Tell us what you care about when you&apos;re finding somewhere to live and we&apos;ll find you a property that fits the bill</h3>
              <button>Find my home</button>
            </div>
            <div className='headline-right'>
              <div className='headline-image'>
              </div>

            </div>
          </div>


        </section>
        {/* Home page section 2: detail around benefits of product for users that haven't visited site before */}
        <section className='wittle-benefits'>
          <h1>How will Wittle help you?</h1>
          <h3>Wittle gives you the information and tools to help you decide where to live</h3>
          <div className='wittle-detail-screens'>
            <div className='wittle-detail-content'>
              <div className='wittle-detail-image-1'>
              </div>
              <h4>Get a list of properties in areas that best match your preference</h4>
            </div>
            <div className='wittle-detail-content'>
              <div className='wittle-detail-image-2'>
              </div>
              <h4>See what points of interest there are nearby (e.g. schools, pubs, restaurants)</h4>
            </div>
            <div className='wittle-detail-content'>
              <div className='wittle-detail-image-3'>
              </div>
              <h4>Compare favourite properties to make a final decision</h4>
            </div>
          </div>
        </section>

        {/* Section 3: details on how to use the site */}
        <section className='wittle-process'>
          <h1>How does it work?</h1>
          <h3 className='sub-title'>Spend 5-10 minutes telling us what&apos;s important to you, and our algorithm will serve up the properties that best match your inputs</h3>

          <div className='process-steps' >
            <div className='process-text-left'>
              <h2>Step 1</h2>
              <h2>Select the things you care about</h2>
              <h3>Choose from 13 different inputs depending on your lifestyle and interests to help determine the best location for you</h3>
            </div>
            <div className='process-image-right'>
              <div className='process-image-form'>

              </div>

            </div>
          </div>
          <hr />
          <div className='process-steps' id='process-right'>
            <div className='process-image-left'>
              <div className='process-image-form-detail'>

              </div>
            </div>
            <div className='process-text-right'>
              <h2>Step 2</h2>
              <h2>Add in some details for each input</h2>
              <h3>Add in specific details relating to each input and the maximum distance you would like to be from it</h3>
            </div>

          </div>
          <hr />
          <div className='process-steps'>
            <div className='process-text-left'>
              <h2>Step 3</h2>
              <h2>Input the final details</h2>
              <h3>Tell us what kind of property your looking for and save your search so you can come back to it</h3>
            </div>
            <div className='process-image-right'>
              <div className='process-image-final'>

              </div>

            </div>
          </div>
          <hr />
          <div className='process-steps' id='process-right'>
            <div className='process-image-left'>
              <div className='process-image-results'>

              </div>
            </div>
            <div className='process-text-right'>
              <h2>Step 4</h2>
              <h2>Enjoy the benefits of Wittle</h2>
              <h3>Get a ranked list of all properties that match your inputs with all the information you need to find the perfect property</h3>
            </div>

          </div>

          <button onClick={() => navigate('/wittle-search')}>Start Wittling</button>
        </section>

      </section>
    </>
  )
}

export default Home





