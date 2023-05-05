import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { isEmail, isLength, matches } from 'validator'
import NavBar from '../tools/NavBar'


const Register = () => {

  // state to enable navigation between pages
  const navigate = useNavigate()


  // function for setting user to local storage when log in is successful
  const setUserTokenToLocalStorage = (token) => {
    window.localStorage.setItem('wittle-user-token', token)
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


  return (
    <>
      <NavBar
        navbarColour='#051885'
      />

      <section className='login-page'>
        <section className='wrapper'>
          <section className='register-content'>
            <form className='form-detail' onSubmit={registerSubmit} >
              <div className='register-title'>
                <h1>Unlock the benefits of Wittle</h1>
              </div>
              {/* First name */}
              <p>First name</p>
              <input type='text' name='first_name' className='input' value={registerData.first_name} onChange={registerChange} />
              {registerError.first_name && <p className="error">* {registerError.first_name}</p>}
              {/* Last namee */}
              <p>Last name</p>
              <input type='text' name='last_name' className='input' value={registerData.last_name} onChange={registerChange} />
              {registerError.last_name && <p className="error">* {registerError.last_name}</p>}
              {/* Email */}
              <p>Email</p>
              <input type='email' name='email' className='input' value={registerData.email} onChange={registerChange} />
              {registerError.email && <p className="error">* {registerError.email}</p>}
              {/* Username */}
              <p>Username</p>

              <input type='text' name='username' className='input' value={registerData.username} onChange={registerChange} />
              {registerError.username && <p className="error">* {registerError.username}</p>}
              {/* Password */}
              <p>Password</p>

              <div className='login-input'>
                <input type={registerPasswordType} name='password' className='password-input-register' value={registerData.password} onChange={registerChange} />
                <div className='password-icon-container' onClick={passwordRegisterReveal}>
                  <div className='password-icon'></div>
                </div>
              </div>
              {registerError.password && <p className="error">* {registerError.password}</p>}
              {/* Password confirmation */}
              <p>Confirm password</p>

              <input type='password' name='password_confirmation' className='input' value={registerData.password_confirmation} onChange={registerChange} />
              {registerError.password_confirmation && <p className="error">* {registerError.password_confirmation}</p>}

              <button type='submit'>Register</button>
              {registerError.post && <p className="error">* {registerError.post}</p>}

            </form>
          </section>
          <h5>Already have an account? <Link to={'/login'}>
            <span>Login</span></Link> </h5>
        </section>
      </section>
    </>
  )
}

export default Register