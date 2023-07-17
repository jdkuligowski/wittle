import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import NavBar from '../tools/NavBar'

const RequestReset = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handlePasswordReset = async (event) => {
    event.preventDefault()

    try {
      const response = await axios.post('/api/auth/password-reset-request/', { email })
      setMessage(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <NavBar navbarColour='#051885' />
      <div className='login-page'>
        <div className='login-content'>
          <div className='form-section'>
            <form className='form-detail' onSubmit={handlePasswordReset}>
              <h1>Recover password</h1>
              <p>Email</p>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required />
              <button className='sign-up' type="submit">Reset Password</button>
            </form>
            {message && <p>{message}</p>}

          </div>



        </div>

      </div>
    </>
  )
}

export default RequestReset
