import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import NavBar from '../tools/NavBar'

const CompleteReset = () => {
  const [passwordValue, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  // State to hold uid and token
  const [uid, setUid] = useState(null)
  const [token, setToken] = useState(null)

  useEffect(() => {
    // Extract the uid and token from the URL
    const params = new URLSearchParams(location.search)
    const uidFromParams = (params.get('uid'))
    const tokenFromParams = (params.get('token'))

    setUid(uidFromParams)
    setToken(tokenFromParams)

    if (!uidFromParams || !tokenFromParams) {
      navigate('/')
    } 

  }, [location])

  const handlePasswordResetConfirm = async (event) => {
    event.preventDefault()

    // Ensure the passwords match
    if (passwordValue !== confirmPassword) {
      setMessage('Passwords do not match.')
      return
    }

    // Now uid and token are available for the POST request
    try {
      console.log({ uid, token, passwordValue })
      const response = await axios.post('api/auth/password-reset/', { uid, token, password: passwordValue })
      setMessage(response.data.message)
      navigate('/login')
    } catch (error) {
      console.error(error)
    }
  }

  // setting password
  const changePassword = (e) => {
    setPassword(e.target.value)
    console.log(e.target.value)
  }

  // setting password confirmation
  const changePasswordConfirmation = (e) => {
    setConfirmPassword(e.target.value)
    console.log(e.target.value)
  }

  return (
    <>
      <NavBar navbarColour='#051885' />
      <div className='login-page'>
        <div className='login-content'>
          <div className='form-section'>
            <form className='form-detail' onSubmit={handlePasswordResetConfirm}>
              <h2>Reset Password</h2>
              <p>New Password</p>

              <input
                type="password"
                name="password"
                value={passwordValue}
                onChange={changePassword}
                required
              />
              <p>Confirm New Password</p>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={changePasswordConfirmation}
                required
              />
              <button className='sign-up' type="submit">Set New Password</button>
              {message && <p className='error1'>*{message}</p>}

            </form>
          </div>
        </div>
      </div>  
    </>
  )
}

export default CompleteReset