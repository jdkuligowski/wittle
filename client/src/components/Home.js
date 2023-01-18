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
              <h1>Find the perfect property in the perfect location</h1>
              <h3>A property&apos;s features are important, but so is the area that surrounds it. We&apos;ll find you a property that ticks every box.</h3>
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
          <h3>Decisions don&apos; get bigger than deciding where to live. Wittle gives you all of the information you need to make a truly informed decision.</h3>
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
          <h3 className='sub-title'>Do you like to grab a Pret every morning? Do you want to be by a certain tube line? Tell us what matters to you and our algorithm will serve up the properties that suit you best</h3>

          <div className='process-steps' >
            <div className='process-text-left'>
              <h2>Step 1</h2>
              <h2>Tell us what you care about</h2>
              <h3>Give us an idea about your lifestyle and interests. It will take a few minutes, but choosing where to live is a big decision.</h3>
            </div>
            <div className='process-image-right'>
              <div className='process-image-form'>

              </div>

            </div>
          </div>
          <hr />
          <div className='process-steps' id='process-right'>
            <div className='process-image-left'>
              <div className='process-image-final'>
              </div>
            </div>
            <div className='process-text-right'>
              <h2>Step 2</h2>
              <h2>Tell us about your ideal property</h2>
              <h3>Two bedrooms or three? What kind of property are you looking for…</h3>
            </div>

          </div>
          <hr />
          <div className='process-steps'>
            <div className='process-text-left'>
              <h2>Step 3</h2>
              <h2>Enjoy the benefits of Wittle</h2>
              <h3>See all of the properties which match your criteria, starting with the one&apos;s that most suit your lifestyle. You&apos;ll have everything you need at your fingertips.</h3>
            </div>
            <div className='process-image-right'>
              <div className='process-image-results'>

              </div>

            </div>
          </div>
          <hr />
          {/* <div className='process-steps' id='process-right'>
            <div className='process-image-left'>
              <div className='process-image-results'>

              </div>
            </div>
            <div className='process-text-right'>
              <h2>Step 4</h2>
              <h2>Enjoy the benefits of Wittle</h2>
              <h3>See all of the properties which match your criteria, ranked in order of best to worst based on your lifestyle, with all the information you could possibly wish for! Magic.</h3>
            </div>

          </div> */}

          <button onClick={() => navigate('/wittle-search')}>Start Wittling</button>
        </section>

      </section>
    </>
  )
}

export default Home





