import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import NavBar from './tools/NavBar'
import NormalPropertySearchModal from './helpers/modals/NormalPropertySearchModal'
import LivingSignup from './helpers/modals/LivingSignup'
import Footer from './tools/Footer'
import WaitlistSignup from './helpers/modals/WaitlistSignup'
import { isEmail, isLength, matches } from 'validator'
import ReactGA from 'react-ga'

const Home = () => {

  // track page view with google analytics
  useEffect(() => {
    ReactGA.pageview(window.location.pathname)
  }, [])

  // state to enable navigation between pages
  const navigate = useNavigate()

  // state for errors
  const [errors, setErrors] = useState(false)

  // manageing the modal pop up for property search
  const [waitlistShow, setWaitlistShow] = useState(false)

  // close modal
  const handleWaitlistClose = () => {
    setWaitlistShow(false)
  }

  // show the modal
  const handleWaitlistShow = (e) => {
    setWaitlistShow(true)
  }

  // set the state for the waitlist signup data capture
  const [waitlistData, setWaitlistData] = useState({
    email: '',
    channel: 'consumer',
  })

  // set state if email is valid
  const [validEmail, setValidEmail] = useState(false)

  // determine whether the waitlist email entered is valid
  const handleChange = (e) => {
    setWaitlistData({ ...waitlistData, [e.target.name]: e.target.value })
    if (isEmail(waitlistData.email)) {
      setValidEmail(true)
    }
  }

  // submit email address to waitlist
  const handleSubmit = async (e) => {
    setErrors(false)
    e.preventDefault()
    if (validEmail) {
      handleWaitlistShow()
      try {
        const { data } = await axios.post('/api/waitlist/', waitlistData)
      } catch (err) {
        console.log('incorrect data error')
        setErrors(true)
      }
    } else {
      handleWaitlistShow()
    }
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
                  <input className='waitlist-email' name='email' placeholder='✉️ Join the waitlist' onChange={handleChange}></input>
                  <button className='consumer-sign-up' onClick={handleSubmit}>Join</button>  
                  <WaitlistSignup 
                    waitlistShow={waitlistShow}
                    handleWaitlistClose={handleWaitlistClose}
                    validEmail={validEmail}
                    errors={errors}
                  />
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
                <input className='waitlist-email' name='email' placeholder='✉️ Join the waitlist' onChange={handleChange}></input>
                <button className='consumer-sign-up' onClick={handleSubmit}>Join</button>  
                <WaitlistSignup 
                  waitlistShow={waitlistShow}
                  handleWaitlistClose={handleWaitlistClose}
                  validEmail={validEmail}
                  errors={errors}

                />
              </div>         
            </section>
            <Footer 
              textColour={'#FFA7E5'}
            />
          </section>


        </section>
      </section>

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

