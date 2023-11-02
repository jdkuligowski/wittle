import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { isEmail, isLength, matches } from 'validator'
import NavBar from '../tools/NavBar'





const Login = () => {

  // state to enable navigation between pages
  const navigate = useNavigate()

  // state to manage navbar colour depending on page
  // const [navbarColour, setNavBarColour] = useState('#051885')


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
      window.localStorage.setItem('wittle-username', data.username)
      navigate('/agents/profile')
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


  return (
    <>


      <section className='login-page'>
        <section className='login-content'>
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

