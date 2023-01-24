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
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  // set error state
  const [errors, setErrors] = useState(false)

  // function for setting user to local storage when log in is successful
  const setUserTokenToLocalStorage = (token) => {
    window.localStorage.setItem('wittle-user-token', token)
  }

  // send form to back end to log in
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login/', formData)
      console.log(formData)
      setUserTokenToLocalStorage(data.token)
      //console.log(data.token)
      console.log({ data })
      window.localStorage.setItem('wittle-username', data.username)
      navigate('/')
    } catch (error) {
      setErrors(true)
    }
  }

  // update form dtail when logging in
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors(false)
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
      handleRegisterClose()
    } catch (err) {
      // setErrors(err.response.status + ' ' + err.response.statusText)
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
                  <input type='email' name='email' className='input' placeholder='Email' value={formData.email} onChange={handleChange} />
                  <input type='password' name='password' className='input' placeholder='Password' value={formData.password} onChange={handleChange} />
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
                    <h1>Unlock the benefits of Wittle</h1>
                    <p>Set up an account to help you find the perfect home</p>
                    <hr />
                    <input type='text' name='first_name' className='input' placeholder='First name' value={registerData.first_name} onChange={registerChange} />
                    <input type='text' name='last_name' className='input' placeholder='Last name' value={registerData.last_name} onChange={registerChange} />
                    <input type='text' name='username' className='input' placeholder='Username' value={registerData.username} onChange={registerChange} />
                    {/* {errors && <p className = 'denied-text'>Please input username</p>} */}
                    <input type='email' name='email' className='input' placeholder='Email' value={registerData.email} onChange={registerChange} />
                    {/* {errors && <p className = 'denied-text'>Please input email</p>} */}
                    <input type='password' name='password' className='input' placeholder='Password' value={registerData.password} onChange={registerChange} />
                    {/* {errors && <p className = 'denied-text'>Please input password</p>} */}
                    <input type='password' name='password_confirmation' className='input' placeholder='Password confirmation' value={registerData.password_confirmation} onChange={registerChange} />
                    {/* Submit */}
                    {/* <hr/> */}
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