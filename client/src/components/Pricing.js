import { useNavigate, Link } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import NavBar from './tools/NavBar'





const Pricing = () => {

  return (

    <>
      <section className='pricing-page-wrapper'>
        <NavBar
          burgerColour={'#FDF7F0'}
          loginColour={'#1A276C'}
          pageType={'Consumer'}
        />
        <div className='pricing-content-wrapper'>
          <div className='core-table-section'>
            <h1 className='page-title'>Choose a plan to get you Wittling</h1>
            <div className='pricing-tables'>
              <div className='pricing-table-array'>
                {/* Pricing column 1 */}
                <div className='pricing-column'>
                  <h3 className='tier-tab'>Free</h3>
                  <h1 className='price'>£0</h1>
                  <h2 className='time-period'>per month per branch</h2>
                  <button className='sign-up'>Sign up</button>
                  <hr className='pricing-line-split' />
                  <div className='feature-section'>
                    <p className='feature-title'>Features include:</p>
                    <div className='feature-row'>
                      <div className='feature-icon'>
                        <div className='icon'></div>
                      </div>
                      <h3 className='feature'>15 valuation lead extracts</h3>
                    </div>
                    <div className='feature-row'>
                      <div className='feature-icon'>
                        <div className='icon'></div>
                      </div>
                      <h3 className='feature'>3 AI generated listings</h3>
                    </div>
                    <div className='feature-row'>
                      <div className='feature-icon'>
                        <div className='icon'></div>
                      </div>
                      <h3 className='feature'>3 insights database queries</h3>
                    </div>
                  </div>
                  <h3 className='view-all'>See all features</h3>

                </div>

                {/* Pricing column 2 */}
                <div className='pricing-column'>
                  <h3 className='tier-tab'>Basic</h3>
                  <h1 className='price'>£45</h1>
                  <h2 className='time-period'>per month per branch</h2>
                  <button className='sign-up'>Sign up</button>
                  <hr className='pricing-line-split' />
                  <div className='feature-section'>
                    <p className='feature-title'>Features include:</p>
                    <div className='feature-row'>
                      <div className='feature-icon'>
                        <div className='icon'></div>
                      </div>
                      <h3 className='feature'>65 valuation lead extracts</h3>
                    </div>
                    <div className='feature-row'>
                      <div className='feature-icon'>
                        <div className='icon'></div>
                      </div>
                      <h3 className='feature'>10 AI generated listings</h3>
                    </div>
                    <div className='feature-row'>
                      <div className='feature-icon'>
                        <div className='icon'></div>
                      </div>
                      <h3 className='feature'>10 insights database queries</h3>
                    </div>
                  </div>
                  <h3 className='view-all'>See all features</h3>
                </div>

                {/* Pricing column 3 */}
                <div className='pricing-column most-popular'>
                  <div className='popular-banner'>Most Popular</div>
                  <h3 className='tier-tab'>Boost</h3>
                  <h1 className='price'>£99</h1>
                  <h2 className='time-period'>per month per branch</h2>
                  <button className='sign-up'>Sign up</button>
                  <hr className='pricing-line-split' />
                  <div className='feature-section'>
                    <p className='feature-title'>Features include:</p>
                    <div className='feature-row'>
                      <div className='feature-icon'>
                        <div className='icon'></div>
                      </div>
                      <h3 className='feature'>200 valuation lead extracts</h3>
                    </div>
                    <div className='feature-row'>
                      <div className='feature-icon'>
                        <div className='icon'></div>
                      </div>
                      <h3 className='feature'>Unlimited AI listings</h3>
                    </div>
                    <div className='feature-row'>
                      <div className='feature-icon'>
                        <div className='icon'></div>
                      </div>
                      <h3 className='feature'>Unlimited insights database queries</h3>
                    </div>
                  </div>
                  <h3 className='view-all'>See all features</h3>
                </div>

                {/* Pricing column 4 */}
                <div className='pricing-column'>
                  <h3 className='tier-tab'>Elite</h3>
                  <h1 className='price'>£249</h1>
                  <h2 className='time-period'>per month per branch</h2>
                  <button className='sign-up'>Sign up</button>
                  <hr className='pricing-line-split' />
                  <div className='feature-section'>
                    <p className='feature-title'>Features include:</p>
                    <div className='feature-row'>
                      <div className='feature-icon'>
                        <div className='icon'></div>
                      </div>
                      <h3 className='feature'>650 valuation lead extracts</h3>
                    </div>
                    <div className='feature-row'>
                      <div className='feature-icon'>
                        <div className='icon'></div>
                      </div>
                      <h3 className='feature'>Unlimited AI listings</h3>
                    </div>
                    <div className='feature-row'>
                      <div className='feature-icon'>
                        <div className='icon'></div>
                      </div>
                      <h3 className='feature'>Unlimited insights database queries</h3>
                    </div>
                  </div>
                  <h3 className='view-all'>See all features</h3>
                </div>
              </div>
            </div>
            <h3 className='bespoke-option'>Enterprise contract? Get in touch.</h3>
          </div>
        </div>


      </section>
    </>
  )
}

export default Pricing