import { useNavigate, Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import NavBar from './tools/NavBar'
import NormalPropertySearchModal from './helpers/modals/NormalPropertySearchModal'
import LivingSignup from './helpers/modals/LivingSignup'
import Footer from './tools/Footer'

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
          <section className='content-wrapper'>

            <div className='headline-title-section'>
              <div className='headline-top'>
                <h1>Matchmaking Homes and Lifestyles.</h1>

                <h4>Find the perfect home that suits your interests in an area that you love - because you can&apos;t renovate a location.</h4>
                <h5>Wittle is revolutionising the way you search for properties. Launching soon 🚀</h5>
                <div className='waitlist-consumer'>
                  <input className='waitlist-email' placeholder='✉️ Join the waitlist'></input>
                  <button className='consumer-sign-up'>Join</button>  
                </div>
              </div>
            


            </div>
            <div className='consumer-process'>
              <div className='process-steps'>
                <div className='process-item'>
                  <div className='process-screen' id='screen1'>

                  </div>
                  <h5>Start by telling us what matters to you</h5>
                </div>
                <div className='process-item'>
                  <div className='process-screen' id='screen2'>

                  </div>
                  <h5>Flesh it out... what food, what vibe, how far?</h5>
                </div>
                <div className='process-item'>
                  <div className='process-screen' id='screen3'>

                  </div>
                  <h5>...and we&apos;ll Wittle it down for you, giving you unparalelled insights...</h5>
                </div>
                <div className='process-item'>
                  <div className='process-screen' id='screen4'>

                  </div>
                  <h5>...then we&apos;ll help you decide on the perfect home.</h5>
                </div>
              </div>
            </div>
            <section className='consumer-bottom'>
              <div className='waitlist-consumer'>
                <input className='waitlist-email' placeholder='✉️ Join the waitlist'></input>
                <button className='consumer-sign-up'>Join</button>  
              </div>            
            </section>
            <Footer 
              textColour={'#FFA7E5'}
            />
          </section>


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



// <div className='headline-content'>
//               <div className='product-box' id='search-box'>
//                 <div className='product-title' id='search'>
//                   <h1>Looking for a property?</h1>
//                 </div>
//                 <div className='product-group'>
//                   <div className='product-detail'>
//                     <h3>Wittle Search</h3>
//                     <div className='homepage-image-1'></div>
//                     <p>AI driven search, taking the things you care about and finding you the right property</p>
//                     <div className='buttons'>
//                       <button className='cta-1' onClick={() => navigate('/wittle-search/fields')}>Start Wittling</button>
//                     </div>
//                   </div>
//                   <div className='product-detail'>
//                     <h3>Property Search</h3>
//                     <div className='homepage-image-2'></div>
//                     <p>What you&apos;re used to. Find properties based on location.</p>
//                     <div className='buttons'>
//                       <button className='cta-1' onClick={handleSearchShow}>Find properties</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className='product-box' id='live-box' >
//                 <div className='product-title' id='live'>
//                   <h1>Happy with where you&apos;re living?</h1>
//                 </div>
//                 <div className='product-group'>
//                   <div className='product-detail'>
//                     <h3>Area Portal</h3>
//                     <div className='homepage-image-3'></div>
//                     <p>Keep track of everything going on in your area and the rest of London</p>
//                     <div className='buttons'>
//                       <button className='cta-1' onClick={handleLivingRegisterShow}>Explore my area</button>
//                     </div>
//                   </div>
//                   <div className='product-detail'>
//                     <h3>Household Portal</h3>
//                     <div className='homepage-image-4'></div>
//                     <p>Stay on top of your household admin and get insights on your spend</p>
//                     <div className='buttons'>
//                       <button className='cta-1' onClick={handleLivingRegisterShow}>Manage household</button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//             </div>

