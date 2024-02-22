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
import laptopImage from '../images/laptop-leadgen-image.png'
import charlieImage from '../images/charlie_headshot.png'
import joshImage from '../images/josh_headshot.jpeg'
import leadGenImage from '../images/lead-gen-small.png'
import insightsImage from '../images/insights-small.png'
import aiImage from '../images/ai-generator-small.png'
import wittleSearch from '../images/wittle-search-small.png'
import AgentSignup from './helpers/modals/AgentSignup'
import AgentSubmitted from './helpers/modals/AgentSubmitted'
// import openImage from '../images/open.png'


const NewHomepage = () => {

  // track page view with google analytics
  useEffect(() => {
    ReactGA.pageview(window.location.pathname)
  }, [])

  // state for errors
  const [errors, setErrors] = useState(false)

  // state for submitting
  const [agentSubmitted, setAgentSubmitted] = useState(false)

  // set the state for the waitlist signup data capture
  const [agentData, setAgentData] = useState({
    email: '',
    name: '',
    company: '',
    position: '',
    message: '',
  })

  const [submitError, setSubmitError] = useState({
    email: '',
    name: '',
    company: '',
    position: '',
    post: '',
  })


  // update registration data
  const handleChange = (e) => {
    setAgentData({ ...agentData, [e.target.name]: e.target.value })
    if (e.target.name === 'name') {
      if (e.target.value.length < 1) {
        setSubmitError({ ...submitError, name: 'Add name' })
      } else {
        setSubmitError({ ...submitError, name: '' })
      }

    } else if (e.target.name === 'email') {
      if (!isEmail(agentData.email)) {
        setSubmitError({ ...submitError, email: 'Invalid email address' })
      } else {
        setSubmitError({ ...submitError, email: '' })
      }

    } else if (e.target.name === 'company') {
      if (e.target.value.length < 1) {
        setSubmitError({ ...submitError, company: 'Add company' })
      } else {
        setSubmitError({ ...submitError, company: '' })
      }

    } else if (e.target.name === 'position') {
      if (e.target.value.length < 1) {
        setSubmitError({ ...submitError, position: 'Add position' })
      } else {
        setSubmitError({ ...submitError, position: '' })
      }
    }
  }

  // submit email address to waitlist
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/agentsignup/', agentData)
      handleAgentClose()
      setAgentSubmitted(true)
      handleSubmitShow()
      setAgentData(false)
    } catch (err) {
      setSubmitError({ ...submitError, post: 'Make sure you\'ve populated all fields before you submit' })
    }

  }


  // manageing the modal pop up for property search
  const [agentShow, setAgentShow] = useState(false)

  // close modal
  const handleAgentClose = () => {
    setAgentShow(false)
    setSubmitError(false)
    setAgentSubmitted(false)
    setAgentData(false)
  }

  // show the modal
  const handleAgentShow = (e) => {
    setAgentSubmitted(false)
    setAgentShow(true)
  }

  // manageing modal for submitted 
  const [agentSubmittedShow, setAgentSubmittedShow] = useState(false)

  // close modal
  const handleSubmitClose = () => {
    setAgentSubmittedShow(false)
    setSubmitError(false)
    setAgentSubmitted(false)
  }

  // show the modal
  const handleSubmitShow = (e) => {
    setAgentSubmittedShow(true)
  }


  return (

    <>
      <section className='homepage-wrapper'>
        <section className='website-opening'>
          <NavBar
            burgerColour={'#FDF7F0'}
            loginColour={'#1A276C'}
            pageType={'Consumer'}
          />
        </section>

        <section className='content-wrapper-new'>
          <div className='headline-top-section'>
            <h1 className='main-message'>10x your leads and maximise your customer service</h1>
            <h4 className='secondary-message'>Wittle is a property companion for Estate Agents that uses data and AI to help you generate leads, save time and serve customers more effectively.</h4>
            <div className='cta-buttons'>
              <button className='start' onClick={handleAgentShow}>Get in touch</button>
              <button className='more'>Learn more</button>
            </div>
            <div className='top-line-benefits'>
              <div className='benefit-row'>
                <div className='tick'></div>
                <h3>Money back guarantee</h3>
              </div>
              <div className='benefit-row'>
                <div className='tick'></div>
                <h3>Personal account support</h3>
              </div>
            </div>
          </div>
          <div className='product-image-section'>
            <img className='laptop-image' src={laptopImage} alt='Laptop' />

          </div>

          <div className='client-testamonials'>
            <h2>Generate more leads from day 1</h2>
            <div className='testimonial-slider'>
              <div className='single-testimonial'>
                <img className='testimonial-image' src={charlieImage} alt='Charlie Image' />
                <div className='testimonial-body'>
                  <div className='quotes'></div>
                  <h3 className='feedback'>Wittle is an absolute game changer. As a start-up with no database there is no better tool to generate instructions. By leveraging Wittle we are more effective than a 30-man property services team.</h3>
                  <h5 className='name'>Charlie Syson</h5>
                  <h6 className='title'>Founder at Teddy</h6>
                </div>
              </div>
              <div className='single-testimonial'>
                <img className='testimonial-image' src={joshImage} alt='Josh Image' />
                <div className='testimonial-body'>
                  <div className='quotes'></div>
                  <h3 className='feedback'>I love using Wittle, it&apos;s been key to making me more efficient in my day-to-day role. What I love most is how it&apos; constantly developing and improving. James is super, always touching base to hear my thoughts and evolve around my needs!</h3>
                  <h5 className='name'>Josh Burfitt</h5>
                  <h6 className='title'>Associate at Chestertons</h6>
                </div>
              </div>
            </div>
          </div>
          <div className='cta-section'>
            <div className='cta-buttons'>
              <button className='start' onClick={handleAgentShow}>Get in touch</button>
              <button className='more'>Learn more</button>
            </div>
          </div>

          <div className='benefits'>
            <div className='benefit-array'>
              <div className='benefit-list'>
                <div className='single-benefit'>
                  <h3>Wittle User Stats</h3>

                </div>
                <div className='single-benefit'>
                  <h1>10x</h1>
                  <p>increase in leads</p>
                </div>

                <div className='single-benefit'>
                  <h1>30+</h1>
                  <p>hours saved per month</p>
                </div>
                <div className='single-benefit'>
                  <h1>5+</h1>
                  <p>mundane tasks eliminated</p>
                </div>
              </div>
            </div>
          </div>
          <div className='product-section'>
            <div className='product'>
              <img className='product-image' src={leadGenImage} alt='LeadGen Image' />

              <div className='product-info'>
                <h1 className='info-title'>Increase your market share with automated lead gen</h1>
                <div className='cta-buttons'>
                  <button className='start' onClick={handleAgentShow}>Get in touch</button>
                  <button className='more'>Learn more</button>
                </div>
              </div>
            </div>
            <div className='product'>
              <img className='product-image' src={insightsImage} alt='Property Insights Image' />

              <div className='product-info'>
                <h1 className='info-title'>Know everything about every postcode in London</h1>
                <div className='cta-buttons'>
                  <button className='start' onClick={handleAgentShow}>Get in touch</button>
                  <button className='more'>Learn more</button>
                </div>
              </div>
            </div>
            <div className='product'>
              <img className='product-image' src={wittleSearch} alt='Property Search Image' />

              <div className='product-info'>
                <h1 className='info-title'>Match customers with the perfect properties</h1>
                <div className='cta-buttons'>
                  <button className='start' onClick={handleAgentShow}>Get in touch</button>
                  <button className='more'>Learn more</button>
                </div>
              </div>
            </div>
            <div className='product'>
              <img className='product-image' src={aiImage} alt='AI Listing generator image' />

              <div className='product-info'>
                <h1 className='info-title'>Automate your listing generation</h1>
                <div className='cta-buttons'>
                  <button className='start' onClick={handleAgentShow}>Get in touch</button>
                  <button className='more'>Learn more</button>
                </div>
              </div>
            </div>
          </div>
          <Footer textColour={'#ED6B86'} />
          <AgentSignup
            agentShow={agentShow}
            handleAgentClose={handleAgentClose} handleAgenthandAgentShow submitError={submitError}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            agentSubmitted={agentSubmitted}
            handleSubmitShow={handleSubmitShow}
          />
          <AgentSubmitted
            handleSubmitClose={handleSubmitClose}
            agentSubmittedShow={agentSubmittedShow}
            handleSubmitShow={handleSubmitShow}
          />

        </section>



      </section>

    </>
  )
}

export default NewHomepage