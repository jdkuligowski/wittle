import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { isEmail, isLength, matches } from 'validator'
import NavBar from '../tools/NavBar'
import { getAccessToken, isUserAuth } from './Auth'
import Swal from 'sweetalert2'





const Login = () => {

  const navigate = useNavigate()
  const location = useLocation() // This hook returns the location object that represents the current URL.

  useEffect(() => {
    console.log('Checking URL:', window.location.search) // Log the current search part of the URL.
    const params = new URLSearchParams(window.location.search)
    const registerSuccess = params.get('success')
    console.log('Register Success:', registerSuccess) // Log the parameter value.

    if (registerSuccess) {
      Swal.fire({
        title: 'Registration Successful!',
        text: 'You\'ve successfully registered your account - log in to start Wittling',
        icon: 'success',
        confirmButtonColor: '#ED6B86',
        confirmButtonText: 'Log In',
        customClass: {
          title: 'popup-swal-title',
          popup: 'popup-swal-body',
          confirmButton: 'popup-swal-confirm',
          cancelButton: 'popup-swal-cancel',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login') // Redirect to the login page
        }
      })
    }
  }, [location, navigate]) // React to changes in location

  // ? Section for login form detail within navbar
  // set form data required for login

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    account: '',
  })

  // function for setting user to local storage when log in is successful
  const setUserTokenToLocalStorage = (token) => {
    window.localStorage.setItem('wittle-user-token', token)
  }

  // send form to back end to log in
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (errors.email || errors.password) {
      return
    }

    try {
      const { data } = await axios.post('/api/auth/login/', registerData)
      setUserTokenToLocalStorage(data.token)
      console.log('token ->', data)
      window.localStorage.setItem('wittle-username', data.email)
      navigate('/agents/profile')
      increaseUsageCount()
    } catch (error) {
      // Here you should handle the error returned by your API when account does not exist
      // Assuming your API returns a response with error details in error.response.data
      const errorData = error.response.data.detail
      if (errorData && errorData === 'Invalid credentials') { // change this condition based on your API response
        setErrors({ ...errors, account: 'Account not found' })
      }
    }
  }

  // update form dtail when logging in
  const handleChange = (e) => {
    const { name, value } = e.target
    let error = ''

    if (name === 'email' && !isEmail(value)) {
      error = 'Invalid email address'
    } else if (name === 'password') {
      error = validatePassword(value)
    }

    setRegisterData({ ...registerData, [name]: value })
    setErrors({ ...errors, [name]: error })
  }

  // state for determining password state type
  const [loginPasswordType, setLoginPasswordType] = useState('password')

  // password reveal button
  const passwordReveal = () => {
    if (loginPasswordType === 'password') {
      setLoginPasswordType('text')
    } else {
      setLoginPasswordType('password')
    }
  }


  // ? Menu modal
  // state for the menu modal
  const [menuShow, setMenuShow] = useState(false)

  // close modal
  const handleMenuClose = () => {
    setMenuShow(false)
  }

  // open modal
  const handleMenuShow = () => {
    setMenuShow(true)
  }

  // ? Registration modal
  // set state for showing insights modal
  const [registerShow, setRegisterShow] = useState(false)

  // close modal
  const handleRegisterClose = () => {
    setRegisterShow(false)
  }

  // show the modal
  const handleRegisterShow = () => {
    setRegisterShow(true)
  }

  // register data
  const [registerData, setRegisterData] = useState({
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
    first_name: '',
    last_name: '',
  })

  // register data erros
  const [registerError, setRegisterError] = useState({
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
    first_name: '',
    last_name: '',
    post: '',
  })

  // function to validate the password
  const validatePassword = (password) => {
    const minLength = 8
    const hasUppercase = matches(password, /[A-Z]/)
    const hasLowercase = matches(password, /[a-z]/)
    const hasDigit = matches(password, /\d/)
    const hasSpecialChar = matches(password, /[^A-Za-z0-9]/)

    if (!isLength(password, { min: minLength })) {
      return 'Password must be at least 8 characters long'
    }
    if (!hasUppercase) {
      return 'Password must contain at least one uppercase letter'
    }
    if (!hasLowercase) {
      return 'Password must contain at least one lowercase letter'
    }
    if (!hasDigit) {
      return 'Password must contain at least one digit'
    }
    if (!hasSpecialChar) {
      return 'Password must contain at least one special character'
    }
    return ''
  }

  // increase value in db based on successful response
  const increaseUsageCount = async () => {
    if (isUserAuth()) {
      console.log('trying to increase')
      try {
        const { data } = await axios.post('/api/usage/overall/', {}, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        console.log(data)
        if (data.status === 'success') {
          console.log('Usage count increased successfully')
        } else {
          console.error('Failed to increase usage count:', data.message)
        }
      } catch (error) {
        console.error('Error:', error)
      }
    } else {
      navigate('/access-denied')
      console.log('logged out')
    }
  }


  return (
    <>


      <section className='login-page'>
        <section className='login-content login'>
          <div className='logo-section'>

            <div className='wittle-logo' onClick={() => navigate('/')}></div>


          </div>
          <h1>Sign in</h1>
          <div className='input-section'>
            <div className='login-input'>
              <h3>Email address</h3>
              <input placeholder='Enter email address' type='email' name='email' className='input' value={registerData.email} onChange={handleChange}></input>
              {errors.email && <p className="error">* {errors.email}</p>}

            </div>
            <div className='login-input'>
              <h3>Password</h3>
              <input placeholder='Enter password' type={loginPasswordType} name='password' className='password-input' value={registerData.password} onChange={handleChange}></input>
              {errors.password && <p className="error">* {errors.password}</p>}

            </div>
          </div>
          <button onClick={handleSubmit} type='submit'>Sign in</button>
          {errors.account && <p className="error" id='account'>* {errors.account}</p>}

          <p>Forgotten your login details? <Link to={'/password-reset-request/'}><span>Request reset</span></Link></p>

        </section>


      </section>
    </>
  )
}

export default Login

