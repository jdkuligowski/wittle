import { useNavigate, Link, useParams } from 'react-router-dom'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import NavBar from './tools/NavBar'
import NormalPropertySearchModal from './helpers/modals/NormalPropertySearchModal'
import LivingSignup from './helpers/modals/LivingSignup'
import Footer from './tools/Footer'
import WaitlistSignup from './helpers/modals/WaitlistSignup'
import { isEmail, isLength, matches } from 'validator'
import ReactGA from 'react-ga'

import schoolsImage from '../images/school-pencils-2.png'
import richmondImage from '../images/richmond.webp'
import londonImage from '../images/london-image-2.png'

const Home = () => {

  // state for switching page
  const { borough } = useParams()

  // track page view with google analytics
  useEffect(() => {
    ReactGA.pageview(window.location.pathname)
  }, [])

  // state to enable navigation between pages
  const navigate = useNavigate()

  // state for errors
  const [errors, setErrors] = useState(false)

  // state for completion
  const [complete, setComplete] = useState(false)

  // manageing the modal pop up for property search
  const [waitlistShow, setWaitlistShow] = useState(false)

  // cstate for whether email eexists
  const [emailExists, setEmailExists] = useState(false)

  // borough states
  const [boroughs, setBoroughs] = useState()

  // close modal
  const handleWaitlistClose = () => {
    setWaitlistShow(false)
  }

  // show the modal
  const handleWaitlistShow = (e) => {
    setErrors(true)
    setComplete(false)
    setWaitlistShow(true)
  }

  // set the state for the waitlist signup data capture
  const [waitlistData, setWaitlistData] = useState({
    email: '',
    channel: 'consumer',
    preferences: false,
  })

  // set state if email is valid
  const [validEmail, setValidEmail] = useState(false)

  // determine whether the waitlist email entered is valid
  const handleChange = (e) => {
    setWaitlistData({ ...waitlistData, [e.target.name]: e.target.value.toLowerCase() })
    // console.log(e.target.value)
  }

  useEffect(() => {
    if (isEmail(waitlistData.email)) {
      setValidEmail(true)
      setErrors(false)
    } else if (!isEmail(waitlistData.email)) {
      setValidEmail(false)
    }
  }, [waitlistData.email])

  // submit email address to waitlist
  const handleSubmit = async (e) => {
    setErrors(false)
    e.preventDefault()
    // console.log('trying')
    ReactGA.event({
      category: 'User',
      action: 'Clicked Button',
      label: 'Submit join waitlist',
    })

    try {
      // console.log('trying')
      const { data } = await axios.post('/api/waitlist/', waitlistData)
      setComplete(true)
    } catch (err) {
      // console.log('incorrect data error')
      setErrors(true)
    }
  }


  // cheeck email
  const checkEmail = async (e) => {
    e.preventDefault()
    setComplete(false)
    setWaitlistShow(true)
    ReactGA.event({
      category: 'User',
      action: 'Clicked Button',
      label: 'Join waitlist',
    })

    try {
      const response = await axios.post('/api/waitlist/check-email/', waitlistData)
      setEmailExists(true)
    } catch (err) {
      console.error('An error occurred while making the request:', err)
      if (err.response) {
        setEmailExists(false)
      }
    }
  }


  // load in borughs
  const loadBoroughs = () => {
    const getBoroughs = async () => {
      try {
        const { data } = await axios.get('/api/boroughs/')
        const richmondBorough = data.filter(object => object.borough === 'Richmond upon Thames')

        console.log('borough data ->', richmondBorough[0])
        setBoroughs(richmondBorough[0])
      } catch (error) {
        setErrors(true)
        console.log(error)
      }
    }
    getBoroughs()
  }

  // carry out calculation
  useEffect(() => {
    loadBoroughs()
  }, [])



  return (
    <>
      <head>
        <title>Wittle</title>
        <meta name="description" content="Wittle helps you find properties based on things you care about. Tell us about your lifestyle and we'll find a property that suits." />

        {/* Open Graph/ Facbook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.wittle.co/" />
        <meta property="og:title" content="Wittle" />
        <meta property="og:description" content="Wittle helps you find properties based on things you care about. Tell us about your lifestyle and we'll find a property that suits." />
        {/* <meta property="og:image" content="https://yourwebsite.com/images/og-image.jpg" /> */}

        {/* Twitter */}
        {/* <meta property="twitter:card" content="summary_large_image" /> */}
        <meta property="twitter:url" content="https://www.wittle.co/" />
        <meta property="twitter:title" content="Wittle" />
        <meta property="twitter:description" content="Wittle helps you find properties based on things you care about. Tell us about your lifestyle and we'll find a property that suits." />
        {/* <meta property="twitter:image" content="https://yourwebsite.com/images/twitter-image.jpg" /> */}
      </head>
      <>
        <section className='homepage-wrapper'>
          {/* Home page section 1: Opening section to site - introduction page and call to a ction for different user journies */}
          <section className='website-opening'>
            <NavBar />
            <section className='content-wrapper'>

              <div className='headline-title-section'>
                <div className='headline-left'>
                  <div className='mobile-logo'></div>
                  <h1>Matchmaking Homes & Lifestyles.</h1>

                  <div className='headline-description'>
                    <h4>Find a home that suits your interests in an area that you love - because you can&apos;t renovate the location.</h4>
                    <h5>Wittle will redefine your property search experience. Launching soon.</h5>
                  </div>

                  <div className='waitlist-consumer'>
                    <input className='waitlist-email' name='email' placeholder='✉️ Join the waitlist' onChange={handleChange}></input>
                    <button className='consumer-sign-up' onClick={checkEmail}>Join</button>
                    <WaitlistSignup
                      waitlistShow={waitlistShow}
                      handleWaitlistClose={handleWaitlistClose}
                      validEmail={validEmail}
                      errors={errors}
                      handleSubmit={handleSubmit}
                      handleChange={handleChange}
                      complete={complete}
                      emailExists={emailExists} />
                  </div>
                </div>
                <div className='headline-right'>
                  <div className='headline-image'></div>
                </div>


              </div>
              <div className='consumer-process'>
                <div className='process-steps'>
                  <h5 className='mobile-description'>Start by telling us what matters to you.</h5>
                  <div className='arrow' id='arrow1'></div>
                  <div className='process-item'>
                    <div className='process-text'>
                      <h5>Start by telling us what matters to you</h5>
                      <div className='process-line'></div>
                    </div>
                    <div className='process-screen' id='screen1'></div>
                  </div>
                  <div className='process-item'>
                    <div className='process-screen' id='screen2'></div>
                    <div className='process-text'>
                      <h5>Flesh it out... what food, what vibe, how far?</h5>
                      <div className='process-line'></div>
                    </div>
                  </div>
                  <div className='arrow' id='arrow2'></div>
                  <h5 className='mobile-description'>Flesh it out... what food, what vibe, how far?</h5>

                </div>
                <div className='process-steps'>
                  <h5 className='mobile-description'>...and we&apos;ll Wittle it down for you, giving you unparalelled insights...</h5>
                  <div className='arrow' id='arrow3'></div>
                  <div className='process-item'>
                    <div className='process-text'>
                      <h5>...and we&apos;ll Wittle it down for you, giving you unparalelled insights...</h5>
                      <div className='process-line'></div>
                    </div>
                    <div className='process-screen' id='screen3'></div>
                  </div>
                  <div className='process-item'>
                    <div className='process-screen' id='screen4'></div>
                    <div className='process-text'>
                      <h5>...then we&apos;ll help you decide on the perfect home.</h5>
                      <div className='process-line'></div>
                    </div>
                  </div>
                  <div className='arrow' id='arrow4'></div>
                  <h5 className='mobile-description'>...then we&apos;ll help you decide on the perfect home.</h5>

                </div>
              </div>


              <section className='blog-section-summary'>
                <h1 className='blog-section-title'>Insights</h1>
                <div className='blog-list'>
                  <div className='blog-item' onClick={() => navigate('/blogs/school-search-simplified')}>
                    <img className='blog-image-box' alt='school-search-img' src={schoolsImage} id='box-1' loading='lazy' />
                    <div className='blog-content'>
                      <h2>Lifestyle insights</h2>
                      <h3 className='blog-item-summary'>School Search Simplified: An In-Depth Analysis of London&apos;s Primary Schools</h3>
                      <p>We disect everything you neeed to know if primary schools are a factor in your property search.</p>
                    </div>
                  </div>
                  <div className='blog-item' onClick={() => navigate('/blogs/redefining-property-search')}>
                    <img className='blog-image-box' alt='school-search-img' src={londonImage} id='box-2' loading='lazy' />
                    <div className='blog-content'>
                      <h2>Perspective</h2>
                      <h3 className='blog-item-summary'>Redefining Property Search: Our Blueprint for the Future</h3>
                      <p>Our take on what&apos;s wrong with property search and what we&apos;re doing to change it.</p>
                    </div>
                  </div>
                  <div className='blog-item' onClick={() => navigate(`/blogs/borough-guides/${boroughs.borough}`)}>
                    <img className='blog-image-box' alt='school-search-img' src={richmondImage} id='box-3' loading='lazy' />
                    <div className='blog-content'>
                      <h2>Borough guides</h2>
                      <h3 className='blog-item-summary'>Richmond upon Thames</h3>
                      <p>The stats on everything you neeed to know about Richmond, including schools, where to eat, where to live, and more.</p>
                    </div>
                  </div>


                </div>


              </section>
              <section className='consumer-bottom'>
                <div className='wittle-logo'></div>
                <div className='waitlist-consumer'>
                  <input className='waitlist-email' name='email' placeholder='✉️ Join the waitlist' onChange={handleChange}></input>
                  <button className='consumer-sign-up' onClick={handleWaitlistShow}>Join</button>
                  <WaitlistSignup
                    waitlistShow={waitlistShow}
                    handleWaitlistClose={handleWaitlistClose}
                    validEmail={validEmail}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                    complete={complete}
                    emailExists={emailExists} />
                </div>
              </section>
              <Footer textColour={'#ED6B86'} />
            </section>


          </section>
        </section>

      </></>
  )
}

export default Home

