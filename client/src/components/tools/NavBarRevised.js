import { useNavigate, Link } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { isUserAuth, getUserToken, getAccessToken } from '../auth/Auth'
import Select from 'react-select'
import { useDetectOutsideClick } from './ClickDropdown'
import { Modal } from 'react-bootstrap'
import { GoogleLogin } from '@react-oauth/google'
import { isEmail, isLength, matches } from 'validator'
import MenuModal from './MenuModal'



const NavBarRevised = ({ setProfileContent, profileContent, profileDetail, setProfileDetail }) => {

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

  // update registration data and enter errors where relevant
  const registerChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value })
    if (!isEmail(registerData.email)) {
      setRegisterError({ ...registerError, email: 'Invalid email address' })

    } else if (e.target.name === 'first_name') {
      if (e.target.value.length < 1) {
        setRegisterError({ ...registerError, first_name: 'Add first name' })
      } else {
        setRegisterError({ ...registerError, first_name: '' })
      }

    } else if (e.target.name === 'last_name') {
      if (e.target.value.length < 1) {
        setRegisterError({ ...registerError, last_name: 'Add last name' })
      } else {
        setRegisterError({ ...registerError, last_name: '' })
      }

    } else if (e.target.name === 'username') {
      if (e.target.value.length < 1) {
        setRegisterError({ ...registerError, username: 'Add username' })
      } else {
        setRegisterError({ ...registerError, username: '' })
      }

    } else if (e.target.name === 'password') {
      const passwordError = validatePassword(e.target.value)
      setRegisterError({ ...registerError, password: passwordError })

    } else if (e.target.name === 'password_confirmation') {
      if (e.target.value !== registerData.password) {
        setRegisterError({ ...registerError, password_confirmation: 'Passwords don\'t match' })
      } else {
        setRegisterError({ ...registerError, password_confirmation: '' })
      }
    }
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
      console.log(err)
      setRegisterError({ ...registerError, post: 'Wittle account with this email already exists' })
    }
  }


  // ? Section 3: controlling the state and functions for the nav bar changing color and section
  // state for colour of navbar
  const [navColour, setNavColour] = useState('#051885')
  const [titleColour, setTitleColour] = useState('#FFA7E5')
  const [textColour, setTextColour] = useState('#FFA7E5')

  // function for selecting home page
  const homeSelect = () => {
    setProfileContent('Property hub')
    setProfileDetail('Property hub')
  }

  // function for selecting wittle search
  const searchSelect = () => {
    setProfileContent('Search')
    setProfileDetail('Wittle search')
  }

  // function for selecting wittle lifestyle
  const lifestyleSelect = () => {
    setProfileContent('My area')
    setProfileDetail('My area')
  }

  // function for selecting wittle lifestyle
  const adminSelect = () => {
    setProfileContent('My household')
    setProfileDetail('Admin dashboard')
  }

  // function for selecting wittle lifestyle
  const accountSelect = () => {
    setProfileContent('Account')
    setProfileDetail('Account')

  }

  return (
    <>
      <section className='centered-nav-bar' style={{ backgroundColor: navColour }}>
        <section className='top-section'>

          <div className='logo'>
            <h2 style={{ color: titleColour }} onClick={() => navigate('/')}>Wittle</h2>
            {/* {profileContent === 'Home' ? <h3 style={{ color: titleColour }}>Home</h3> :
              profileContent === 'Search' ? <h3 style={{ color: titleColour }}>Search</h3> :
                profileContent === 'Lifestyle' ? <h3 style={{ color: titleColour }}>Lifestyle</h3> :
                  profileContent === 'Admin' ? <h3 style={{ color: titleColour }}>Admin</h3> :
                    profileContent === 'Account' ? <h3 style={{ color: titleColour }}>Account</h3> : ''} */}
          </div>
          {isUserAuth() ?
            <div className="menu-container" onClick={handleMenuShow} >
              <div className="menu-trigger" >
                <span>
                  <div className='burger-icon'>
                    <hr className='burger-icon-line' />
                    <hr className='burger-icon-line' />
                    <hr className='burger-icon-line' />
                  </div>
                </span>
              </div>
              <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
                <ul>
                  <li className='dropdowns'><a href="/property-search">New property search</a></li>
                  <li className='dropdowns'><a href="/wittle-search">New Wittle search</a></li>
                  <li className='dropdowns'><a onClick={() => navigate(`/profile/${getUserToken()}`)}>Property hub</a></li>
                  <li className='dropdowns' onClick={removeItemFromStorage}><a>Sign out</a></li>
                </ul>
              </nav>
            </div>
            :
            <>
              <div className='menu-container' onClick={handleMenuShow} >
                <div className="menu-trigger" >
                  <span>
                    <div className='burger-icon'>
                      <hr className='burger-icon-line' />
                      <hr className='burger-icon-line' />
                      <hr className='burger-icon-line' />
                    </div>
                  </span>
                </div>
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
                    <button onClick={openDropdown} className='sign-up' type='submit'>
                      <span>
                        <div className='burger-icon'>
                          <hr style={{ border: `1.5px solid ${titleColour}` }} className='burger-icon-line' />
                          <hr style={{ border: `1.5px solid ${titleColour}` }} className='burger-icon-line' />
                          <hr style={{ border: `1.5px solid ${titleColour}` }} className='burger-icon-line' />
                        </div>
                      </span>
                    </button>
                    {/* <GoogleLogin onSuccess={googleLogin} onError={errorMessage} /> */}

                    <h5>New to Wittle?
                      <span onClick={handleRegisterShow}> Join us</span>
                    </h5>
                  </form>
                </nav>
              </div>
              {/* <div className='register-modal-container'> */}
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
                    {registerError.first_name && <p className="error">* {registerError.first_name}</p>}
                    {/* Last namee */}
                    <input type='text' name='last_name' className='input' placeholder='Last name' value={registerData.last_name} onChange={registerChange} />
                    {registerError.last_name && <p className="error">* {registerError.last_name}</p>}
                    {/* Email */}
                    <input type='email' name='email' className='input' placeholder='Email' value={registerData.email} onChange={registerChange} />
                    {registerError.email && <p className="error">* {registerError.email}</p>}
                    {/* Username */}
                    <input type='text' name='username' className='input' placeholder='Username' value={registerData.username} onChange={registerChange} />
                    {registerError.username && <p className="error">* {registerError.username}</p>}
                    {/* Password */}
                    <div className='login-input'>
                      <input type={registerPasswordType} name='password' className='password-input-register' placeholder='Password' value={registerData.password} onChange={registerChange} />
                      <div className='password-icon-container' onClick={passwordRegisterReveal}>
                        <div className='password-icon'></div>
                      </div>
                    </div>
                    {registerError.password && <p className="error">* {registerError.password}</p>}
                    {/* Password confirmation */}
                    <input type='password' name='password_confirmation' className='input' placeholder='Password confirmation' value={registerData.password_confirmation} onChange={registerChange} />
                    {registerError.password_confirmation && <p className="error">* {registerError.password_confirmation}</p>}

                    <button type='submit'>Register</button>
                    {registerError.post && <p className="error">* {registerError.post}</p>}

                  </form>
                  <div className='register-bottom'>
                    <button className='register-close' onClick={handleRegisterClose}>Close</button>
                  </div>
                </Modal.Body>
              </Modal>
              {/* </div> */}

            </>
          }


        </section>
        <section className='nav-slider'>
          <h4 style={{ color: textColour, textDecoration: profileContent === 'Property hub' ? `underline 3px ${textColour}` : '', textUnderlineOffset: profileContent === 'Property hub' ? '5px' : '' }} onClick={homeSelect}>PROPERTY HUB</h4>
          <h4 style={{ color: textColour, textDecoration: profileContent === 'Search' ? `underline 3px ${textColour}` : '', textUnderlineOffset: profileContent === 'Search' ? '5px' : '' }} onClick={searchSelect}>SEARCH</h4>
          <h4 style={{ color: textColour, textDecoration: profileContent === 'My area' ? `underline 3px ${textColour}` : '', textUnderlineOffset: profileContent === 'My area' ? '5px' : '' }} onClick={lifestyleSelect}>MY AREA</h4>
          <h4 style={{ color: textColour, textDecoration: profileContent === 'My household' ? `underline 3px ${textColour}` : '', textUnderlineOffset: profileContent === 'My household' ? '5px' : '' }} onClick={adminSelect}>MY HOUSEHOLD</h4>
          <h4 style={{ color: textColour, textDecoration: profileContent === 'Account' ? `underline 3px ${textColour}` : '', textUnderlineOffset: profileContent === 'Account' ? '5px' : '' }} onClick={accountSelect}>ACCOUNT</h4>
        </section>
      </section>
      <MenuModal
        menuShow={menuShow}
        setMenuShow={setMenuShow}
        handleMenuClose={handleMenuClose}
        removeItemFromStorage={removeItemFromStorage}
      />
    </>
  )
}

export default NavBarRevised