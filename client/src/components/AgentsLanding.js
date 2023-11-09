import Footer from './tools/Footer'
import NavBar from './tools/NavBar'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { isEmail, isLength, matches } from 'validator'
import AgentSignup from './helpers/modals/AgentSignup'
import AgentSubmitted from './helpers/modals/AgentSubmitted'
import ReactGA from 'react-ga'
import AgentAccess from './tools/buttons/AgentAccess'



const AgentsHome = () => {

  // state to enable navigation between pages
  const navigate = useNavigate()

  // set state for the page
  const [pageType, setPageType] = useState('Agents')

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
  })

  const [submitError, setSubmitError] = useState({
    email: '',
    name: '',
    company: '',
    position: '',
    post: '',
  })

  // set state if email is valid
  const [validEmail, setValidEmail] = useState(false)

  // determine whether the waitlist email entered is valid

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
        <section className='agents-home'>
          <NavBar
            loginColour={'#FDF7F0'}
            burgerColour={'#1A276C'}
            pageType={'Agents'}
          />
          <section className='agent-top-section'>
            <div className='title-content'>
              <div className='wittle-logo' onClick={() => navigate('/')}></div>
              <h3>Insights partner for London Estate Agents.</h3>
              <h1>Transform your customer relationships and streamline time consuming activities.</h1>
              <h5>Tap into Wittle&apos;s vast pool of insights with a single click. Leverage our AI-powered tools to refine your strategy and optimise your operations for unparalleled efficiency.</h5>
              <AgentAccess
                agentButtonWidth={'225px'}
                agentBackgroundColour={'#ED6B86'}
                agentOtherColour={'#FDF7F0'}
                handleAgentShow={handleAgentShow}
              />
            </div>

            <AgentSignup
              agentShow={agentShow}
              handleAgentClose={handleAgentClose}
              handleAgentShow={handleAgentShow}
              submitError={submitError}
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
          <section className='agent-image-section'>
            <div className='image-text'>
              <h3>Unlock over 50,000 data points, transformed into actionable insights. Equip yourself with the knowledge to conduct meaningful client discussions that differentiate you from the competition.</h3>
            </div>
            <div className='image-arrows'>

            </div>
            <div className='image-block'>

            </div>
            <AgentAccess
              agentButtonWidth={'225px'}
              agentOtherColour={'#ED6B86'}
              agentBackgroundColour={'#FDF7F0'}
              handleAgentShow={handleAgentShow}
            />
          </section>
          <section className='agent-image-section-mobile'>
            <div className='mobile-set-width'>
              <div className='image-text'>
                <h3>In seconds, get access to 40,000 data points which are converted to useable insights, giving you what you need for quality sales conversations that help you stand out from the crowd.</h3>
              </div>
              <div className='image-arrows-mobile'>

              </div>
              <div className='image-block-mobile'>

              </div>
            </div>


          </section>

          <section className='agent-benefits-section'>
            <div className='benefit-array'>
              <div className='benefit-card'>
                <div className='benefit-image' id='ai-generator'></div>
                <h3>AI Property Details Generator</h3>
                <h5>Take advantage of Wittle AI to create a detailed property listing in seconds.</h5>
              </div>
              <div className='benefit-card'>
                <div className='benefit-image' id='leads'></div>
                <h3>Lead Generation</h3>
                <h5>Supercharge your prospecting by utilising Wittle&apos;s lead generation tools to refine your outreach.</h5>
              </div>
              <div className='benefit-card'>
                <div className='benefit-image' id='summary'></div>
                <h3>Property Summaries</h3>
                <h5>Access Wittle&apos;s database of essential property details, spanning 15 critical variables, to empower your conversations.</h5>
              </div>
              <div className='benefit-card'>
                <div className='benefit-image' id='valuations'></div>
                <h3>Valuation Support</h3>
                <h5>Gain access to Wittle&apos;s extensive data that underpins your property valuations, ensuring accuracy and confidence.</h5>
              </div>
              <div className='benefit-card'>
                <div className='benefit-image' id='compare'></div>
                <h3>Property Performance</h3>
                <h5>Compare a property&apos;s features against the wider London market to pinpoint its unique selling points.</h5>
              </div>
              <div className='benefit-card'>
                <div className='benefit-image' id='insights'></div>
                <h3>Detailed Insights</h3>
                <h5>Dive into over 15 variables across 50,000 data points to unlock insights that drive informed decisions.</h5>
              </div>
            </div>
          </section>

          <section className='agent-bottom'>
            <div className='wittle-logo'></div>
            <AgentAccess
              agentButtonWidth={'225px'}
              agentBackgroundColour={'#ED6B86'}
              agentOtherColour={'#FDF7F0'}
              handleAgentShow={handleAgentShow}
            />
          </section>
          <Footer
            textColour={'#1A276C'}
          />
        </section>
      </section>

    </>
  )
}

export default AgentsHome