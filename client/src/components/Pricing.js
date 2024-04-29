import { useNavigate, Link } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import NavBar from './tools/NavBar'
import Footer from './tools/Footer'





const Pricing = () => {

  // state to enable navigation between pages
  const navigate = useNavigate()

  const goFree = () => {
    window.localStorage.setItem('wittle-subscription-tier', 'Free')
    navigate('/register')
  }

  const goLite = () => {
    window.localStorage.setItem('wittle-subscription-tier', 'Lite')
    navigate('/register')
  }

  const goBoost = () => {
    window.localStorage.setItem('wittle-subscription-tier', 'Boost')
    navigate('/register')
  }

  const goElite = () => {
    window.localStorage.setItem('wittle-subscription-tier', 'Elite')
    navigate('/register')
  }



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
                  <h2 className='time-period'>per month</h2>
                  <button className='sign-up' onClick={goFree}>Sign up</button>
                  <hr className='pricing-line-split' />
                  <div className='feature-section'>
                    <p className='feature-title'>Monthly features include:</p>
                    <div className='feature-row'>
                      <div className='feature-icon'>
                        <div className='icon'></div>
                      </div>
                      <h3 className='feature'>10 valuation lead extracts</h3>
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
                  {/* <h3 className='view-all'>See all features</h3> */}

                </div>

                {/* Pricing column 2 */}
                <div className='pricing-column'>
                  <h3 className='tier-tab'>Lite</h3>
                  <h1 className='price'>£45</h1>
                  <h2 className='time-period'>per month</h2>
                  <button className='sign-up' onClick={goLite}>Sign up</button>
                  <hr className='pricing-line-split' />
                  <div className='feature-section'>
                    <p className='feature-title'>Monthly features include:</p>
                    <div className='feature-row'>
                      <div className='feature-icon'>
                        <div className='icon'></div>
                      </div>
                      <h3 className='feature'>75 valuation lead extracts</h3>
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
                  {/* <h3 className='view-all'>See all features</h3> */}
                </div>

                {/* Pricing column 3 */}
                <div className='pricing-column most-popular'>
                  <div className='popular-banner'>Most Popular</div>
                  <h3 className='tier-tab'>Boost</h3>
                  <h1 className='price'>£99</h1>
                  <h2 className='time-period'>per month</h2>
                  <button className='sign-up' onClick={goBoost}>Sign up</button>
                  <hr className='pricing-line-split' />
                  <div className='feature-section'>
                    <p className='feature-title'>Monthly features include:</p>
                    <div className='feature-row'>
                      <div className='feature-icon'>
                        <div className='icon'></div>
                      </div>
                      <h3 className='feature'>250 valuation lead extracts</h3>
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
                  {/* <h3 className='view-all'>See all features</h3> */}
                </div>

                {/* Pricing column 4 */}
                <div className='pricing-column'>
                  <h3 className='tier-tab'>Elite</h3>
                  <h1 className='price'>£249</h1>
                  <h2 className='time-period'>per month</h2>
                  <button className='sign-up' onClick={goElite}>Sign up</button>
                  <hr className='pricing-line-split' />
                  <div className='feature-section'>
                    <p className='feature-title'>Monthly features include:</p>
                    <div className='feature-row'>
                      <div className='feature-icon'>
                        <div className='icon'></div>
                      </div>
                      <h3 className='feature'>850 valuation lead extracts</h3>
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
                  {/* <h3 className='view-all'>See all features</h3> */}
                </div>
              </div>
            </div>
            <h3 className='bespoke-option'>Multiple users? Get in touch.</h3>
          </div>

          <div className='product-details-mobile'>
            <div className='product-details-table'>
              <div className='product-row' id='headers'>
                <div className='cell'>Monthly usage</div>
                <div className='cell'>Free</div>
                <div className='cell'>Lite</div>
                <div className='cell'>Boost</div>
                <div className='cell'>Elite</div>
              </div>
              <div className='product-row' id='body'>
                <div className='cell'>Extracted leads</div>
                <div className='cell'>10</div>
                <div className='cell'>75</div>
                <div className='cell'>250</div>
                <div className='cell'>850</div>
              </div>
              <div className='product-row' id='body'>
                <div className='cell'>AI listings</div>
                <div className='cell'>3</div>
                <div className='cell'>10</div>
                <div className='cell'>No limit</div>
                <div className='cell'>No limit</div>
              </div>
              <div className='product-row' id='body'>
                <div className='cell'>Insights queries</div>
                <div className='cell'>3</div>
                <div className='cell'>10</div>
                <div className='cell'>No limit</div>
                <div className='cell'>No limit</div>
              </div>
              <div className='product-row' id='body'>
                <div className='cell'>Automated letters</div>
                <div className='cell'>No</div>
                <div className='cell'>Soon</div>
                <div className='cell'>Soon</div>
                <div className='cell'>Soon</div>
              </div>
            </div>
          </div>
        </div>
        <Footer />


      </section>
    </>
  )
}

export default Pricing