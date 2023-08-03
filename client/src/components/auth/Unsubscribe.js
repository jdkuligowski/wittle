import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { isEmail, isLength, matches } from 'validator'
import NavBar from '../tools/NavBar'

const Unsubscribe = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleChange = (event) => {
    setEmail(event.target.value)
    console.log(event.target.value)
  }

  const unsubscribeEmail = async (event) => {
    event.preventDefault() // prevent default form submission behavior
    const emailData = { email: email }

    try {
      const response = await axios.post('/api/waitlist/unsubscribe/', emailData)
      console.log('Unsubscribe response:', response)
      alert('You have successfully unsubscribed.')
      setEmail('')
    } catch (err) {
      console.error('An error occurred while making the request:', err)
      if (err.response) {
        console.error(err.response.data)
        console.error(err.response.status)
        console.error(err.response.headers)
        setError('An error occurred while trying to unsubscribe. Please try again.')
      } 
    }
  }

  return (
    <>
      <NavBar navbarColour='#051885' />

      <section className='login-page'>
        <section className='login-content'>
          <section className='form-section'>
            <form className='form-detail' onSubmit={unsubscribeEmail}>

              <p>Enter your email address to unsubscribe</p>
              <input type='email' name='email' className='input' value={email} onChange={handleChange} />
              {error && <p className="error">* {error}</p>}
              <button className='sign-up' type='submit'>Unsubscribe</button>

            </form>
          </section>
        </section>
      </section>
    </>
  )
}

export default Unsubscribe
