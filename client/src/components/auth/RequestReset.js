import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import NavBar from '../tools/NavBar'

const RequestReset = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState()
  const navigate = useNavigate()

  const handlePasswordReset = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post('/api/auth/password-reset-request/', { email })
      setMessage(response.data.detail)
      console.log(response.data.detail)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      {/* <NavBar navbarColour='#051885' /> */}
      <div className='login-page'>

        <div className='login-content' style={{ width: '25%' }}>
          <div className='logo-section'>
            <div className='wittle-logo' onClick={() => navigate('/')}></div>
          </div>
          <h1>Recover password</h1>
          <div className='input-section'>
            <div className='login-input'>
              <h3>Email</h3>
              <input
                type="email"
                name="email"
                className='iinput'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
            </div>
          </div>

          <button onClick={handlePasswordReset} className='sign-up' type="submit">Reset Password</button>
          {message && <p className='error1'>{message}</p>}





        </div>

      </div>
    </>
  )
}

export default RequestReset
