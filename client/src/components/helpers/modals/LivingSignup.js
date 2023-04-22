import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { NumericFormat } from 'react-number-format'
import { getUserToken, getAccessToken, isUserAuth } from '../../auth/Auth'
import { Modal } from 'react-bootstrap'
import ReactSwitch from 'react-switch'
import { isEmail, isLength, matches } from 'validator'
import AutoCompleteSearch from '../../tools/AutoCompleteSearch'


const LivingSignup = ({ livingRegisterShow, handleLivingRegisterClose, loadUserData, setComplete2 }) => {

  // state to enable navigation between pages
  const navigate = useNavigate()

  // state to determine which page of the flow we're on
  const [formFlow, setFormFlow] = useState('Page 1')

  // state to identify whether user is already a member
  const [member, setMember] = useState(0)

  // ? Section 1: Log in and register functions
  // register data
  const [registerData, setRegisterData] = useState({
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
    first_name: '',
    last_name: '',
  })


  const [registerError, setRegisterError] = useState({
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
    first_name: '',
    last_name: '',
    post: '',
  })

  // update registration data
  const registerChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value, email: userEmail.email_address })
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

  // function for setting user to local storage when log in is successful
  const setUserTokenToLocalStorage = (token) => {
    window.localStorage.setItem('wittle-user-token', token)
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
      setRegisterData()
      setFormFlow('Page 3')
    } catch (err) {
      setRegisterError({ ...registerError, post: err.response.statusText })
      console.log(err.response.statusText)
    }
  }

  // submit login
  const loginSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login/', registerData)
      console.log(registerData)
      setUserTokenToLocalStorage(data.token)
      console.log({ data })
      window.localStorage.setItem('wittle-username', data.username)
      window.localStorage.setItem('wittle-email', data.email)
      console.log('username ->', data.username)
      setFormFlow('Page 3')
    } catch (err) {
      setRegisterError({ ...registerError, post: err.response.statusText })
      console.log(err.response.statusText)
    }
  }

  
  // ? Section 3: Contains functions that allow users to change the form
  // user email
  const [userEmail, setUserEmail] = useState({
    email_address: '',
    long: '',
    lat: '',
    email_confirmation: 0,
  })

  // user email errors
  const [userErrors, setUserErrors] = useState({
    email_address: '',
    address: '',
    post: '',
  })

  // wittle living inputs form
  const [livingData, setLivingData] = useState({
    email_address: null,
    long: null,
    lat: null,
    email_status: 0,
    subscription_type: 1,
    admin_status: 0,
    lifestyle_status: 0,
    property_status: 0,
    mortgage_status: 0,
    mortgage_provider: '',
    mortgage_value: null,
    mortgage_date: null,
    boiler_status: 0,
    boiler_provider: '',
    boiler_value: null,
    boiler_date: null,
    insurance_status: 0,
    insurance_provider: '',
    insurance_value: null,
    insurance_date: null,
    energy_status: 0,
    energy_detail: 1,
    energy_provider: '',
    energy_value: null,
    energy_date: null,
    gas_provider: '',
    gas_value: null,
    gas_date: null,
    electric_provider: '',
    electric_value: null,
    electric_date: null,
    council_tax_status: 0,
    council_tax_value: null,
    council_tax_date: null,
    broadband_status: 0,
    broadband_provider: '',
    broadband_value: null,
    broadband_date: null,
    sky_status: 0,
    sky_provider: '',
    sky_value: null,
    sky_date: null,
    netflix_status: 0,
    netflix_value: null,
    netflix_date: null,
    amazon_status: 0,
    amazon_value: null,
    amazon_date: null,
    disney_status: 0,
    disney_value: null,
    disney_date: null,
    apple_status: 0,
    apple_value: null,
    apple_date: null,
    tv_status: 0,
    tv_value: null,
    tv_date: null,
    phone_status: 0,
    phone_provider: '',
    phone_value: null,
    phone_date: null,
    gym_status: 0,
    gym_provider: '',
    gym_value: null,
    gym_date: null,
    other_status_1: 0,
    other_type_1: '',
    other_provider_1: '',
    other_value_1: null,
    other_date_1: null,
    other_status_2: 0,
    other_type_2: '',
    other_provider_2: '',
    other_value_2: null,
    other_date_2: null,
    other_status_3: 0,
    other_type_3: '',
    other_provider_3: '',
    other_value_3: null,
    other_date_3: null,
  })


  // function to update data based on email address
  const emailChange = (e) => {
    setUserEmail({ ...userEmail, email_address: e.target.value })
    setLivingData({ ...livingData, email_address: e.target.value })
    setRegisterData({ ...registerData, email: e.target.value })
  }

  // function to update data based on checkbox
  const checkboxChange = (e) => {
    if (userEmail.email_confirmation === 0) {
      setUserEmail({ ...userEmail, email_confirmation: 1 })
      setLivingData({ ...livingData, email_status: 1 })
    } else if (userEmail.email_confirmation === 1) {
      setUserEmail({ ...userEmail, email_confirmation: 0 })
      setLivingData({ ...livingData, email_status: 0 })
    }
  }

  // function for toggling login and register info
  const memberCheck = () => {
    if (member === 0) {
      setMember(1)
    } else if (member === 1) {
      setMember(0)
    }
  }


  // ? Section 4: Functions to post form to the database
  // functoin to change the page from 1 to 2 and push form to database
  const firstSubmit = async (e) => {
    if (!isEmail(userEmail.email_address)) {
      setUserErrors({ ...userErrors, email_address: 'Invalid email address' })
    } else if (userEmail.lat === '' || userEmail.lat === undefined) {
      setUserErrors({ ...userErrors, email_address: '' })
      setUserErrors({ ...userErrors, address: 'Enter valid address' })
    } else {
      try {
        const { data } = await axios.post('/api/emails/', userEmail)
        console.log('email-data ->', data)
        setFormFlow('Page 2')
      } catch (err) {
        console.log(err)
        setUserErrors({ ...userErrors, email_address: 'Living account with this email already exists' })
      }
    }
  }

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

  // toggle for admin
  const adminToggle = () => {
    if (livingData.admin_status === 0) {
      setLivingData({ ...livingData, admin_status: 1 })
    } else {
      setLivingData({ ...livingData, admin_status: 0 })
    }
  }

  // toggle for lifestyle
  const lifestyleToggle = () => {
    if (livingData.lifestyle_status === 0) {
      setLivingData({ ...livingData, lifestyle_status: 1 })
    } else {
      setLivingData({ ...livingData, lifestyle_status: 0 })
    }
  }

  // toggle for property market
  const marketToggle = () => {
    if (livingData.property_status === 0) {
      setLivingData({ ...livingData, property_status: 1 })
    } else {
      setLivingData({ ...livingData, property_status: 0 })
    }
  }


  // submit registration form
  const livingSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/living/', livingData, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      window.localStorage.setItem('wittle-living-data', data)
      console.log('wittle living info ->', data)
      navigate(`/profile/${getUserToken()}/`)
      loadUserData()
      setComplete2(true)
      handleLivingRegisterClose(true)
    } catch (err) {
      // setErrors(err)
      console.log(err)
      console.log(err.response.data)
    }
  }


  return (
    <>


      <div className='wittle-living-signup'>
        <Modal show={livingRegisterShow} onHide={handleLivingRegisterClose} backdrop='static' className='wittle-living-signup-modal'>
          <Modal.Body>
            {formFlow === 'Page 1' ?
              <>
                <section className='content-section'>
                  <div className='nav-section'>
                    <div className='logo'>
                      <h2 onClick={() => navigate('/')}>Wittle</h2>
                    </div>
                    <h1 className='mobile-close' onClick={handleLivingRegisterClose}>x</h1>
                  </div>
                  <div className='body-section'>
                    <div className='body-title'>
                      <h1>Step One</h1>
                      <h5>Add your contact email and let us know the area you want to know about</h5>
                    </div>
                    <div className='body-detail'>
                      <div className='body-block'>
                        <h5>Enter email</h5>
                        <input type='text' name='email_address' value={userEmail.email_address} onChange={emailChange}></input>
                        {userErrors.email_address && <p className="error">* {userErrors.email_address}</p>}
                      </div>
                      <div className='body-block'>
                        <h5>Enter address</h5>
                        <AutoCompleteSearch
                          livingData={livingData}
                          setLivingData={setLivingData}
                          userEmail={userEmail}
                          setUserEmail={setUserEmail}
                        />
                        {userErrors.address && <p className="error">* {userErrors.address}</p>}

                      </div>
                      <div className='body-block'>
                        <h5>Our default catchment area is a 20 min walk in all directions</h5>
                        <div className='map-radius'></div>
                      </div>
                      <div className='tick-block'>
                        <input type='checkbox' name='email_confirmation' onChange={checkboxChange} checked={userEmail.email_confirmation === 1 ? true : false}></input>
                        <h5>I&apos;d like a weekly email giving me insights about my area</h5>
                      </div>
                      <button className='living-next' onClick={firstSubmit}>Continue</button>
                      <h5 className='terms'>By continuing, you accept you have read our terms and privacy notice</h5>
                    </div>
                  </div>
                </section>
                <section className='image-section'>
                  <h1 className='desktop-close' onClick={handleLivingRegisterClose}>x</h1>
                  <div className='image-flow-1'></div>
                </section>
              </>

              : formFlow === 'Page 2' ?
                <>
                  <section className='content-section'>
                    <div className='nav-section'>
                      <div className='logo'>
                        <h2 onClick={() => navigate('/')}>Wittle</h2>
                      </div>
                      <h1 className='mobile-close' onClick={handleLivingRegisterClose}>x</h1>
                    </div>
                    <div className='body-section'>
                      <div className='body-title'>
                        <h1>Step Two</h1>
                        <h5>Log in to your account or register with Wittle</h5>

                      </div>
                      <div className='body-detail'>
                        <div className='tick-block'>
                          <h5>Are you a member of Wittle?</h5>
                          <ReactSwitch
                            checked={member === 1}
                            onChange={memberCheck}
                          />
                        </div>
                        {member === 0 ?
                          <>
                            <div className='body-block'>
                              <h5>First name</h5>
                              <input type='text' name='first_name' className='input' placeholder='First name' value={registerData.first_name} onChange={registerChange} />
                              {registerError.first_name && <p className="error">* {registerError.first_name}</p>}
                            </div>
                            <div className='body-block'>
                              <h5>Last name</h5>
                              <input type='text' name='last_name' className='input' placeholder='Last name' value={registerData.last_name} onChange={registerChange} />
                              {registerError.last_name && <p className="error">* {registerError.last_name}</p>}
                            </div>
                            <div className='body-block'>
                              <h5>Username</h5>
                              <input type='text' name='username' className='input' placeholder='Username' value={registerData.username} onChange={registerChange} />
                              {registerError.username && <p className="error">* {registerError.username}</p>}
                            </div>
                            <div className='body-block'>
                              <h5>Enter password</h5>
                              <input type='password' name='password' className='input' placeholder='Password' value={registerData.password} onChange={registerChange} />
                              {registerError.password && <p className="error">* {registerError.password}</p>}
                            </div>
                            <div className='body-block'>
                              <h5>Confrm password</h5>
                              <input type='password' name='password_confirmation' className='input' placeholder='Password confirmation' value={registerData.password_confirmation} onChange={registerChange} />
                              {registerError.password_confirmation && <p className="error">* {registerError.password_confirmation}</p>}
                            </div>
                            <button className='living-next' onClick={registerSubmit}>Continue</button>
                          </>
                          : member === 1 ?
                            <>
                              <div className='body-block'>
                                <h5>Enter email</h5>
                                <input type='text' name='email_address' value={userEmail.email_address} onChange={registerChange}></input>
                              </div>
                              <div className='body-block'>
                                <h5>Confrm password</h5>
                                <input type='password' name='password' className='input' placeholder='Password password' value={registerData.password} onChange={registerChange} />
                              </div>
                              <button className='living-next' onClick={loginSubmit}>Continue</button>

                            </>
                            : ''}
                      </div>
                    </div>
                    <div className='ghosts'>
                      <h1 className='order-box' onClick={() => setFormFlow('Page 1')}>1</h1>
                    </div>
                  </section>
                  <section className='image-section'>
                    <h1 className='desktop-close' onClick={handleLivingRegisterClose}>x</h1>
                    <div className='image-flow-2'></div>
                  </section>
                </>
                : formFlow === 'Page 3' ?
                  <>
                    <section className='content-section'>
                      <div className='nav-section'>
                        <div className='logo'>
                          <h2 onClick={() => navigate('/')}>Wittle</h2>
                        </div>
                        <h1 className='mobile-close' onClick={handleLivingRegisterClose}>x</h1>

                      </div>
                      <div className='body-section'>
                        <div className='body-title'>
                          <h1>Step Three</h1>
                          <h5>Finally, tell us what you want to see</h5>
                        </div>
                        <div className='body-detail'>
                          <div className='body-block' id='final-step'>
                            <div className='block-left'>
                              <h5>Lifestyle</h5>
                              <p>Find out about what&apos;s going on near you and in all of London</p>
                            </div>
                            <ReactSwitch
                              checked={livingData.lifestyle_status === 1}
                              onChange={lifestyleToggle}
                            />
                          </div>
                          <div className='body-block' id='final-step'>
                            <div className='block-left'>
                              <h5>Property management</h5>
                              <p>Manage and get insights on your bills in one place, keep on top of maintenance, insurance and more</p>
                            </div>
                            <ReactSwitch
                              checked={livingData.admin_status === 1}
                              onChange={adminToggle}
                            />
                          </div>
                          <div className='body-block' id='final-step'>
                            <div className='block-left'>
                              <h5>Area metrics</h5>
                              <p>Keep on top of individual property sales in the area, average pricing and more</p>
                            </div>
                            <ReactSwitch
                              checked={livingData.property_status === 1}
                              onChange={marketToggle}
                            />
                          </div>
                          <button className='living-next' onClick={livingSubmit}>Submit</button>

                        </div>
                      </div>
                      <div className='ghosts'>
                        <h1 className='order-box' onClick={() => setFormFlow('Page 1')}>1</h1>
                        <h1 className='order-box' onClick={() => setFormFlow('Page 2')}>2</h1>
                      </div>
                    </section>
                    <section className='image-section'>
                      <h1 className='desktop-close' onClick={handleLivingRegisterClose}>x</h1>
                      <div className='image-flow-3'></div>
                    </section>
                  </>
                  :
                  ''}

          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}

export default LivingSignup