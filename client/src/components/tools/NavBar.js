import { useNavigate, Link } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { isUserAuth, getUserToken, getAccessToken } from '../auth/Auth'
import Select from 'react-select'
import { Modal } from 'react-bootstrap'
import { GoogleLogin } from '@react-oauth/google'
import { isEmail, isLength, matches } from 'validator'
import MenuModal from '../helpers/modals/MenuModal'


const NavBar = ({ navbarColour }) => {

  // remove login token from storage
  const removeItemFromStorage = (token) => {
    localStorage.removeItem('wittle-user-token')
    localStorage.removeItem('wittle-username')
    window.location.reload()
    setIsActive(false)
  }

  // state to enable navigation between pages
  const navigate = useNavigate()

  // state to manage navbar colour depending on page
  // const [navbarColour, setNavBarColour] = useState('#051885')

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


  const responseMessage = (response) => {
    console.log(response)
  }

  const errorMessage = (error) => {
    console.log(error)
  }


  // post google information for authentication
  const googleLogin = async (response) => {
    try {
      // await axios.post('/api/auth/google/', registerData)
      const auth = { 'auth_token': response.credential }
      console.log(auth)
      const { data } = await axios.post('/api/auth/google/', {
        body: JSON.stringify(auth),
      })
      console.log(data)
    } catch (err) {
      setErrors(err)
      console.log(err)
      console.log(err.response.data)
    }
  }

  return (
    <>
      <section className='nav-section' style={{ backgroundColor: navbarColour }}>
        <div className='left-section'>
          <div className='logo'>
            <h2 onClick={() => navigate('/')}>Wittle</h2>
            {/* <div className='logo-image'></div> */}
          </div>
          <h4 onClick={() => navigate('/agents')} className='agent-button'>For agents</h4>
          <h4 onClick={() => navigate('/blogs/school-search-simplified')} className='agent-button'>Insights</h4>
        </div>
        <div className='menu-container' onClick={handleMenuShow}>
          <div className="menu-trigger">
            <span>
              <div className='burger-icon'>
                <hr className='burger-icon-line' />
                <hr className='burger-icon-line' />
                <hr className='burger-icon-line' />
              </div>
            </span>
          </div>
        </div>
        <button onClick={() => navigate('/login')} className='agent-login'>Agent login</button>
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

export default NavBar