import { useNavigate, Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import NavBar from './tools/NavBar'
import NormalPropertySearchModal from './helpers/modals/NormalPropertySearchModal'
import LivingSignup from './helpers/modals/LivingSignup'

const Home = () => {

  // state to enable navigation between pages
  const navigate = useNavigate()

  // manageing the modal pop up for property search
  const [propertySearch, setPropertySearch] = useState(false)

  // close modal
  const handleSearchClose = () => {
    setPropertySearch(false)
  }

  // show the modal
  const handleSearchShow = (e) => {
    setPropertySearch(true)
  }

  // set state for showing wittle living signup
  const [livingRegisterShow, setLivingResgisterShow] = useState(false)

  // close modal
  const handleLivingRegisterClose = () => {
    setLivingResgisterShow(false)
  }

  // show living modal
  const handleLivingRegisterShow = () => {
    setLivingResgisterShow(true)
  }


  return (
    <>
      <section className='homepage-wrapper'>
        {/* Home page section 1: Opening section to site - introduction page and call to a ction for different user journies */}
        <section className='website-opening'>
          <NavBar />
          <div className='headline-title-section'>
            <div className='headline-top'>
              <h1>You can&apos;t renovate your location</h1>
              <h4>Wittle helps you find the perfect place to live based on things you care about, and helps you optimise your life even when you&apos;re not looking for a property</h4>
            </div>
            <div className='headline-content'>
              <div className='product-box' id='search-box'>
                <div className='product-title' id='search'>
                  <h1>Looking for a property?</h1>
                </div>
                <div className='product-group'>
                  <div className='product-detail'>
                    <h3>Wittle Search</h3>
                    <div className='homepage-image-1'></div>
                    <p>AI driven search, taking the things you care about and finding you the right property</p>
                    <div className='buttons'>
                      <button className='cta-1' onClick={() => navigate('/wittle-search/fields')}>Start Wittling</button>
                      <button className='cta-2' onClick={() => navigate('/wittle-search')}>Learn more</button>
                    </div>
                  </div>
                  <div className='product-detail'>
                    <h3>Property Search</h3>
                    <div className='homepage-image-2'></div>
                    <p>What you&apos;re used to. Find properties based on location.</p>
                    <div className='buttons'>
                      <button className='cta-1'>Find properties</button>
                      {/* <button className='cta-2'>Learn more</button> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className='product-box' id='live-box' >
                <div className='product-title' id='live'>
                  <h1>Happy with where you&apos;re living?</h1>
                </div>
                <div className='product-group'>
                  <div className='product-detail'>
                    <h3>Lifestyle Portal</h3>
                    <div className='homepage-image-3'></div>
                    <p>Keep track of everything going on in your area and the rest of London</p>
                    <div className='buttons'>
                      <button className='cta-1' onClick={handleLivingRegisterShow}>Simplify my life</button>
                      <button className='cta-2'>Learn more</button>
                    </div>
                  </div>
                  <div className='product-detail'>
                    <h3>Admin Portal</h3>
                    <div className='homepage-image-4'></div>
                    <p>Stay on top of your household admin and get insights on your spend</p>
                    <div className='buttons'>
                      <button className='cta-1' onClick={handleLivingRegisterShow}>Simplify my life</button>
                      <button className='cta-2'>Learn more</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>


          </div>

        </section>
      </section>
      <NormalPropertySearchModal
        propertySearch={propertySearch}
        handleSearchClose={handleSearchClose}
      />
      <LivingSignup
        livingRegisterShow={livingRegisterShow}
        handleLivingRegisterClose={handleLivingRegisterClose}
      />
    </>
  )
}

export default Home





