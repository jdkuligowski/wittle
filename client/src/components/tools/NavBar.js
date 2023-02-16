import { useNavigate, Link } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { isUserAuth, getUserToken, getAccessToken } from '../auth/Auth'
import Select from 'react-select'
import { useDetectOutsideClick } from './ClickDropdown'
import { Modal } from 'react-bootstrap'

const NavBar = () => {

  // remove login token from storage
  const removeItemFromStorage = (token) => {
    localStorage.removeItem('wittle-user-token')
    localStorage.removeItem('wittle-username')
    window.location.reload()
    setIsActive(false)
  }

  // state to enable navigation between pages
  const navigate = useNavigate()

  const dropdownRef = useRef(null)
  // const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const [isActive, setIsActive] = useState(false)
  const openDropdown = () => setIsActive(!isActive)


  // ? Section for login form detail within navbar
  // set form data required for login
  // const [formData, setFormData] = useState({
  //   email: '',
  //   password: '',
  // })

  // set error state
  // const [errors, setErrors] = useState(false)

  const [errors, setErrors] = useState({
    email: '',
    // username: '',
    password: '',
    passwordConfirmation: '',
    // first_name: '',
    // last_name: '',
  })

  // function for setting user to local storage when log in is successful
  const setUserTokenToLocalStorage = (token) => {
    window.localStorage.setItem('wittle-user-token', token)
  }

  // send form to back end to log in
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login/', registerData)
      console.log(registerData)
      setUserTokenToLocalStorage(data.token)
      //console.log(data.token)
      console.log({ data })
      window.localStorage.setItem('wittle-username', data.username)
      console.log('username ->', data.username)
      navigate('/')
    } catch (error) {
      setErrors(true)
    }
  }

  // update form dtail when logging in
  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value })
    setErrors(false)
  }

  // state for determining password state type
  const [loginPasswordType, setLoginPasswordType] = useState('password')
  const [registerPasswordType, setRegisterPasswordType] = useState('password')

  // password reveal button
  const passwordReveal = () => {
    if (loginPasswordType === 'password') {
      setLoginPasswordType('text')
    } else {
      setLoginPasswordType('password')
    }
  }

  // password reveal button
  const passwordRegisterReveal = () => {
    if (registerPasswordType === 'password') {
      setRegisterPasswordType('text')
    } else {
      setRegisterPasswordType('password')
    }
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

  // update registration data
  const registerChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value })
    console.log(e.target.name)
    console.log(e.target.value)
    // setErrors({ ...errors, [e.target.name]: '' })
  }

  // submit registration form
  const registerSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/auth/register/', registerData)
      const { data } = await axios.post('/api/auth/login/', registerData)
      setUserTokenToLocalStorage(data.token)
      window.localStorage.setItem('wittle-username', data.username)
      console.log('username ->', data.username)
      handleRegisterClose()
      setRegisterData()
    } catch (err) {
      // setErrors(err.response.status + ' ' + err.response.statusText)
      setErrors(err)
      console.log(err)
      console.log(err.response.data)
    }
  }

  return (
    <>
      <section className='nav-section'>
        <div className='logo'>
          <h2 onClick={() => navigate('/')}>Wittle</h2>
        </div>
        {isUserAuth() ?
          <div className="menu-container">
            <button onClick={openDropdown} className="menu-trigger" id='desktop-nav-button'>
              <span>My Wittle</span>
            </button>
            <button onClick={openDropdown} className="menu-trigger" id='mobile-nav-button'>
              <span>
                <div className='burger-icon'>
                  <hr className='burger-icon-line' />
                  <hr className='burger-icon-line' />
                  <hr className='burger-icon-line' />
                </div>
              </span>
            </button>
            <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
              <ul>
                <li className='dropdowns'><a href="/property-search">New property search</a></li>
                <li className='dropdowns'><a href="/wittle-search">New Wittle search</a></li>
                <li className='dropdowns'><a onClick={() => navigate(`/profile/${getUserToken()}`)}>Profile</a></li>
                <li className='dropdowns' onClick={removeItemFromStorage}><a>Sign out</a></li>
              </ul>
            </nav>
          </div>
          :
          <>
            <div className='menu-container'>
              <button onClick={openDropdown} className="menu-trigger">
                <span className='sign-in'>Sign in</span>
              </button>
              <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
                <form className='form-detail' onSubmit={handleSubmit}>
                  <p>Log in to your account</p>
                  <input type='email' name='email' className='input' placeholder='Email' value={registerData.email} onChange={handleChange} />
                  <div className='login-input'>
                    <input type={loginPasswordType} name='password' className='password-input' placeholder='Password' value={registerData.password} onChange={handleChange} />
                    <div className='password-icon-container' onClick={passwordReveal}>
                      <div className='password-icon'></div>
                    </div>
                  </div>
                  <button onClick={openDropdown} className='sign-up' type='submit'>Sign in</button>
                  <h5>New to Wittle?
                    <span onClick={handleRegisterShow}> Join us</span>
                  </h5>
                </form>
              </nav>
            </div>
            <div className='register-modal-container'>
              <Modal show={registerShow} onHide={handleRegisterClose} backdrop='static' className='register-modal'>
                <Modal.Body>
                  <form className='form-detail' onSubmit={registerSubmit} >
                    <div className='register-title'>
                      <h1>Unlock the benefits of Wittle</h1>
                      <h1 className='x-close' onClick={handleRegisterClose}>x</h1>
                    </div>
                    <p className='form-overview'>Set up an account to help you find the perfect home</p>
                    <hr />
                    {/* First name */}
                    <input type='text' name='first_name' className='input' placeholder='First name' value={registerData.first_name} onChange={registerChange} />
                    {(registerData.first_name === '' && errors) ? <p className='denied-text'>*Please enter your first name</p> : ''}
                    {/* Last namee */}
                    <input type='text' name='last_name' className='input' placeholder='Last name' value={registerData.last_name} onChange={registerChange} />
                    {(registerData.last_name === '' && errors) ? <p className='denied-text'>*Please enter your last name</p> : ''}
                    {/* Email */}
                    <input type='email' name='email' className='input' placeholder='Email' value={registerData.email} onChange={registerChange} />
                    {(registerData.email === '' && errors) ? <p className='denied-text'>*Please enter your email address</p> : (registerData.email !== '' && errors) ? <p className='denied-text'>*This adress is invalid or has been used before</p> : ''}
                    {/* Username */}
                    <input type='text' name='username' className='input' placeholder='Username' value={registerData.username} onChange={registerChange} />
                    {(registerData.username === '' && errors) ? <p className='denied-text'>*Please enter your username</p> : ''}
                    {/* Password */}
                    <div className='login-input'>
                      <input type={registerPasswordType} name='password' className='password-input-register' placeholder='Password' value={registerData.password} onChange={registerChange} />
                      <div className='password-icon-container' onClick={passwordRegisterReveal}>
                        <div className='password-icon'></div>
                      </div>
                    </div>
                    {(registerData.password === '' && errors) ? <p className='denied-text'>*Please enter your password</p> : (registerData.password <= 8 && errors) ? <p className='denied-text'>*Password needs to be at least 8 letters</p> : errors ? <p className='denied-text'>*Password too common</p> : ''}
                    {/* Password confirmation */}
                    <input type='password' name='password_confirmation' className='input' placeholder='Password confirmation' value={registerData.password_confirmation} onChange={registerChange} />
                    {(registerData.password_confirmation === '' && errors) ? <p className='denied-text'>*Please confirm your password</p> : (registerData.password !== registerData.password_confirmation && errors) ? <p className='denied-text'>*Passwords don&apos;t match</p> : ''}

                    <button type='submit'>Register</button>
                  </form>
                  <div className='register-bottom'>
                    <button className='register-close' onClick={handleRegisterClose}>Close</button>
                  </div>
                </Modal.Body>
              </Modal>
            </div>

          </>
        }
      </section>
    </>
  )

}

export default NavBar