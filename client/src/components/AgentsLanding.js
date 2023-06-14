import Footer from './tools/Footer'
import NavBar from './tools/NavBar'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { isEmail, isLength, matches } from 'validator'
import AgentSignup from './helpers/modals/AgentSignup'
import AgentSubmitted from './helpers/modals/AgentSubmitted'
import ReactGA from 'react-ga'



const AgentsHome = () => {

  ReactGA.initialize('G-B899F8SK12')


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
          <NavBar />
          <section className='agent-top-section'>
            <h3>Wittle sales companion. Loved by estate agents.</h3>
            <h1>Impress your customers and supercharge your property sales</h1>
            <h5>In one click, get access to all the information you need to deliver exceptional value to your customers and increase your sales.</h5>
            <button className='agent-access' onClick={handleAgentShow}>Get early access for free</button>
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
            <div className='agent-portal-image' id='agent1'></div>
            <div className='agent-portal-image' id='agent2'></div>
            <div className='agent-portal-image' id='agent3'></div>
          </section>
          <section className='agent-detail-section'>
            <div className='agent-summary'>
              <h3>In seconds, get access to 20,000 data points which are converted to usable insights, giving you what you need for quality sales conversations that help you stand out from the crowd.</h3>
            </div>
            <div className='agent-summary-stats'>
              <div className='summary-row' id='row1'>
                <div className='summary-box'>
                  <div className='summary-icon' id='icon1'></div>
                  <h3>Summarise properties</h3>
                  <p>Get a summary of everything there is to know about a property across 20+ variables.</p>
                </div>
                <div className='summary-box'>
                  <div className='summary-icon' id='icon2'></div>
                  <h3>Get detailed insights</h3>
                  <p>Drill down into each variable to understand more.</p>
                </div>
              </div>
              <div className='summary-row' id='row2'>
                <div className='summary-box'>
                  <div className='summary-icon' id='icon3'></div>
                  <h3>Compare performance</h3>
                  <p>See how the property or local area compares to other properties and areas in London.</p>
                </div>
                <div className='summary-box'>
                  <div className='summary-icon' id='icon4'></div>
                  <h3>Customise views</h3>
                  <p>Create customised summaries of properties based on the things your clients care about the most.</p>
                </div>
              </div>
              <div className='summary-row' id='row3'>
                <div className='summary-box'>
                  <div className='summary-icon' id='icon5'></div>
                  <h3>Enable better conversations</h3>
                  <p>Unlock the ability for every agent to have a high quality conversation with every potential customer.</p>
                </div>
                <div className='summary-box'>
                  <div className='summary-icon' id='icon6'></div>
                  <h3>Generate efficiencies</h3>
                  <p>Spend less time researching and more time having effective conversations.</p>
                </div>
              </div>

            </div>
          </section>
          <section className='agent-bottom'>
            <button className='agent-access' onClick={handleAgentShow}>Get early access for free</button>

          </section>
          <Footer 
            textColour={'#051885'}
          />
        </section>
      </section>

    </>
  )
}

export default AgentsHome