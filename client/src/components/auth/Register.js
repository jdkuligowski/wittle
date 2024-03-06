import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { isEmail, isLength, matches } from 'validator'
import NavBar from '../tools/NavBar'
import { getAccessToken } from './Auth'
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'
import Loading from '../helpers/Loading'


const Register = () => {

  // state to enable navigation between pages
  const navigate = useNavigate()

  // set loading for when registratino is done
  const [loading, setloading] = useState(false)

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
    const { name, value } = e.target
  
    // If the input is for the email, convert it to lowercase
    if (name === 'email') {
      setRegisterData({ ...registerData, [name]: value.toLowerCase() })
    } else {
      setRegisterData({ ...registerData, [name]: value })
    }
  
    // Real-time validation for password fields only
    if (name === 'password') {
      const passwordError = validatePassword(value)
      setRegisterError({ ...registerError, password: passwordError })
    } else if (name === 'password_confirmation') {
      const passwordConfirmationError = value !== registerData.password ? 'Passwords don\'t match' : ''
      setRegisterError({ ...registerError, password_confirmation: passwordConfirmationError })
    }
  }


  // submit registration form
  const registerSubmit = async (e) => {
    e.preventDefault()
    setloading(true)
    // Pre-submit validation for all fields except passwords
    const newErrors = {
      ...registerError,
      first_name: registerData.first_name.length < 1 ? 'Add first name' : '',
      last_name: registerData.last_name.length < 1 ? 'Add last name' : '',
      company_name: registerData.company_name.length < 1 ? 'Add company' : '',
      username: registerData.username.length < 1 ? 'Add username' : '',
      email: isEmail(registerData.email) ? '' : 'Invalid email address',
    }
    setRegisterError(newErrors)

    // Check if there are any new errors (excluding passwords as they are already checked in real-time)
    const hasNewErrors = Object.values(newErrors).some(error => error !== '')

    if (hasNewErrors) {
      // Prevent form submission if there are new errors
      return
    }

    // Proceed with form submission if there are no new errors
    try {
      await axios.post('/api/auth/register/', registerData)
      const { data } = await axios.post('/api/auth/login/', {
        email: registerData.email,
        password: registerData.password,
      })
      setUserTokenToLocalStorage(data.token)
      window.localStorage.setItem('wittle-username', data.username)
      console.log('username ->', data.username)
      setRegisterData({})
      navigate('/agents/profile')
      setloading(false)
    } catch (err) {
      console.log(err)
      setloading(false)
      // Handle errors from the registration attempt, potentially setting more specific errors if your API provides them
      setRegisterError({ ...registerError, post: 'Error registering account. Username or email may already exist.' })

    }
  }




  // Function to handle company change or addition
  const handleCompanyChange = (newValue, actionMeta) => {

    setSelectedCompany(newValue)
    const companyName = newValue ? newValue.label : ''
    setRegisterData({ ...registerData, company_name: companyName })
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
      // padding: '0px 0px',

      // Additional styles
    }),
    singleValue: (provided, state) => ({
      ...provided,
      color: '#FDF7F0', // This will correctly adjust the selected item text color
      fontSize: '0.8rem', // Ensure consistency in font size
      fontFamily: 'Poppins', // Ensure consistency in font family
      padding: '0px 0px',

    }),
  }


  return (
    <>

      <section className='login-page' id='register'>
        {/* <section className='wrapper'> */}

        <section className='login-content'>
          {/* <div className='logo-section'>

            <div className='wittle-logo' onClick={() => navigate('/')}></div>


          </div> */}
          {/* <form className='form-detail' onSubmit={registerSubmit} > */}
          {loading ?
            <Loading />
            :
            <>
              <div className='register-title'>
                <h1>Unlock the benefits of Wittle</h1>
              </div><div className='register-section'>
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
                  <CreatableSelect
                    isClearable
                    onChange={handleCompanyChange}
                    options={companiesOptions} // Assuming this is populated with existing company options
                    value={selectedCompany}
                    styles={customStyles} // Use your custom styles
                    placeholder="Select or add a company..."
                    name='company_name' />
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


                  {registerError.password && <p className="error">* {registerError.password}</p>}
                </div>

                {/* Password confirmation */}
                <div className='login-input'>

                  <h3>Confirm password</h3>

                  <input type='password' name='password_confirmation' className='input' value={registerData.password_confirmation} onChange={registerChange} />
                  {registerError.password_confirmation && <p className="error">* {registerError.password_confirmation}</p>}
                </div>

              </div><button type='submit' onClick={registerSubmit}>Register</button>
              {registerError.post && <p className="error">* {registerError.post}</p>}
            </>
          }
        </section>


        {/* </section> */}
      </section>
    </>
  )
}

export default Register