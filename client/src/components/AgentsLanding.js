import Footer from './tools/Footer'
import NavBar from './tools/NavBar'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { isEmail, isLength, matches } from 'validator'
import AgentSignup from './helpers/modals/AgentSignup'
import AgentSubmitted from './helpers/modals/AgentSubmitted'
import ReactGA from 'react-ga'



const AgentsHome = () => {


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
          />
          <section className='agent-top-section'>
            <div className='title-content'>
              <div className='wittle-logo'></div>
              <h3>Wittle sales companion. Loved by estate agents.</h3>
              <h1>Impress your customers and supercharge your property sales</h1>
              <h5>In one click, get access to all the information you need to deliver exceptional value to your customers and increase your sales.</h5>
              <button className='agent-access' onClick={handleAgentShow}>Get early access for free</button>
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
              <h3>In seconds, get access to 40,000 data points which are converted to useable insights, giving you what you need for quality sales conversations that help you stand out from the crowd.</h3>
            </div>
            <div className='image-arrows'>

            </div>
            <div className='image-block'>

            </div>
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
                <h3>AI listing generator</h3>
                <h5>Create a listing in under 2 minutes.</h5>
              </div>
              <div className='benefit-card'>
                <div className='benefit-image' id='leads'></div>
                <h3>Generate leads</h3>
                <h5>Optimise your outreach with our lead gen tools.</h5>
              </div>
              <div className='benefit-card'>
                <div className='benefit-image' id='summary'></div>
                <h3>Summarise properties</h3>
                <h5>Get a summary of everything there is to know about a property across 15 variables.</h5>
              </div>
              <div className='benefit-card'>
                <div className='benefit-image' id='valuations'></div>
                <h3>Valuation support</h3>
                <h5>All the data you need to support valuations available in seconds.</h5>
              </div>
              <div className='benefit-card'>
                <div className='benefit-image' id='compare'></div>
                <h3>Compare performance</h3>
                <h5>See how a property compares to other properties across London.</h5>
              </div>
              <div className='benefit-card'>
                <div className='benefit-image' id='insights'></div>
                <h3>Get detailed insights</h3>
                <h5>Drill down into 14 variables across 50,000 data points in London to understand more.</h5>
              </div>
            </div>
          </section>

          <section className='agent-bottom'>
            <div className='wittle-logo'></div>

            <button className='agent-access' onClick={handleAgentShow}>Get early access for free</button>

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