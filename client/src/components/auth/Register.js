import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { isEmail, isLength, matches } from 'validator'
import NavBar from '../tools/NavBar'
import { getAccessToken } from './Auth'
import Select from 'react-select'


const Register = () => {

  // state to enable navigation between pages
  const navigate = useNavigate()

  // state to store the branches
  const [branches, setBranches] = useState()
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [companiesOptions, setCompaniesOptions] = useState([])


  // function to laod the branches
  const loadBranches = async () => {
    try {
      const url = '/api/branch_list/'

      // extract data based on url
      const { data } = await axios.get(url)
      console.log('agent list ->', data)
      setBranches(data)
      const options = data.map(company => ({ value: company.id, label: company.branch_name }))
      setCompaniesOptions(options)
      console.log('company list ->', options)
    } catch (error) {
      console.log(error)
    }
  }

  // loading the branches on render
  useEffect(() => {
    loadBranches()
  }, [])

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
    company_name: '',
    password: '',
    password_confirmation: '',
    first_name: '',
    last_name: '',
  })

  // register data erros
  const [registerError, setRegisterError] = useState({
    email: '',
    username: '',
    company_name: '',
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
    if (e.target.name === 'first_name') {
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

    } else if (e.target.name === 'company_name') {
      if (e.target.value.length < 1) {
        setRegisterError({ ...registerError, company_name: 'Add company_name' })
      } else {
        setRegisterError({ ...registerError, company_name: '' })
      }

    } else if (e.target.name === 'username') {
      if (e.target.value.length < 1) {
        setRegisterError({ ...registerError, username: 'Add username' })
      } else {
        setRegisterError({ ...registerError, username: '' })
      }

    } else if (e.target.name === 'email') {
      if (!isEmail(registerData.email)) {
        setRegisterError({ ...registerError, email: 'Invalid email address' })
      } else {
        setRegisterError({ ...registerError, email: '' })
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
      // const { data } = await axios.post('/api/auth/login/', registerData)
      // setUserTokenToLocalStorage(data.token)
      // window.localStorage.setItem('wittle-username', data.username)
      // console.log('username ->', data.username)()
      // setRegisterData()
      // navigate('/agents/profile')
    } catch (err) {
      console.log(err)
      setRegisterError({ ...registerError, post: 'Wittle account with this email already exists' })
    }
  }

  const handleCompanyChange = selectedOption => {
    setSelectedCompany(selectedOption)
    setRegisterData({ ...registerData, company_name: selectedOption.label })
  }

  const customStyles = {
    control: (provided) => ({
      ...provided,
      fontSize: '0.8rem', // Adjust font size
      fontFamily: 'Poppins',
      color: '#FDF7F0', // This affects the input text color
      borderColor: '#FDF7F0', // Adjust border color
      borderRadius: '10px',
      backgroundColor: '#1A276C',
      padding: '0px 0px',
      minHeight: '35px', // Reduce the minimum height

      // height: '25px',
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'white' : '#333', // Adjust option text color
      backgroundColor: state.isSelected ? '#1A276C' : 'white', // Adjust option background color
      fontSize: '0.8rem', // Adjust font size

      // Additional styles
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: '#FDF7F0', // This will correctly adjust the selected item text color
      fontSize: '0.8rem', // Ensure consistency in font size
      fontFamily: 'Poppins', // Ensure consistency in font family
    }),
  }


  return (
    <>
      {/* <NavBar
        navbarColour='#051885'
      /> */}

      <section className='login-page' id='register'>
        {/* <section className='wrapper'> */}
        <section className='login-content'>
          {/* <div className='logo-section'>

            <div className='wittle-logo' onClick={() => navigate('/')}></div>


          </div> */}
          {/* <form className='form-detail' onSubmit={registerSubmit} > */}
          <div className='register-title'>
            <h1>Unlock the benefits of Wittle</h1>
          </div>
          <div className='register-section'>
            {/* First name */}
            <div className='login-input'>
              <h3>First name</h3>
              <input type='text' name='first_name' className='input' value={registerData.first_name} onChange={registerChange} />
              {registerError.first_name && <p className="error">* {registerError.first_name}</p>}
            </div>
            {/* Last namee */}
            <div className='login-input'>

              <h3>Last name</h3>
              <input type='text' name='last_name' className='input' value={registerData.last_name} onChange={registerChange} />
              {registerError.last_name && <p className="error">* {registerError.last_name}</p>}
            </div>



            {/* Company */}
            <div className='login-input'>
              <h3>Company</h3>
              <Select
                value={selectedCompany}
                onChange={handleCompanyChange}
                options={companiesOptions}
                styles={customStyles}

                className="input"
                placeholder="Select or search a company..."
              />
              {registerError.company_name && <p className="error">* {registerError.company_name}</p>}
            </div>

            {/* Username */}
            <div className='login-input'>

              <h3>Username</h3>

              <input type='text' name='username' className='input' value={registerData.username} onChange={registerChange} />
              {registerError.username && <p className="error">* {registerError.username}</p>}
            </div>

            {/* Email */}
            <div className='login-input'>

              <h3>Email</h3>
              <input type='email' name='email' className='input' value={registerData.email} onChange={registerChange} />
              {registerError.email && <p className="error">* {registerError.email}</p>}
            </div>

            {/* Password */}
            <div className='login-input'>

              <h3>Password</h3>


              <input type={registerPasswordType} name='password' className='password-input-register' value={registerData.password} onChange={registerChange} />

              {/* <div className='login-input'>
            <div className='password-icon-container' onClick={passwordRegisterReveal}>
              <div className='password-icon'></div>
            </div>
          </div> */}
              {registerError.password && <p className="error">* {registerError.password}</p>}
            </div>

            {/* Password confirmation */}
            <div className='login-input'>

              <h3>Confirm password</h3>

              <input type='password' name='password_confirmation' className='input' value={registerData.password_confirmation} onChange={registerChange} />
              {registerError.password_confirmation && <p className="error">* {registerError.password_confirmation}</p>}
            </div>

          </div>
          <button type='submit' onClick={registerSubmit}>Register</button>
          {registerError.post && <p className="error">* {registerError.post}</p>}
          {/* <h5>Already have an account? <Link to={'/login'}>
            <span>Login</span></Link> </h5> */}
          {/* </form> */}
        </section>

        {/* </section> */}
      </section>
    </>
  )
}

export default Register