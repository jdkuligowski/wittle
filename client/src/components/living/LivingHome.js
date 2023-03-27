import { useNavigate, Link } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { isUserAuth } from '../auth/Auth'
import Select from 'react-select'
import NavBar from '../tools/NavBar'
import { Modal } from 'react-bootstrap'





const LivingHome = () => {

  // state to enable navigation between pages
  const navigate = useNavigate()

  // states for thiumb logic on sign up to wittle living page
  const [member, setMember] = useState(false)
  const [lifestyle, setLifestyle] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [property, setProperty] = useState(false)
  const [extra, setExtra] = useState(false)

  const [email, setEmail] = useState()

  // enabling scroll to height when button is clickedd
  const buttonRef = useRef()

  function detailClick() {
    buttonRef.current.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'start' })
  }

  // set error state for capturing errors
  const [errors, setErrors] = useState(false)

  // ? Section 2: Modals
  // set state for showing full wittle living modal
  const [livingShow, setLivingShow] = useState(false)

  // close modal
  const handleLivingClose = () => {
    setLivingShow(false)
  }

  // show living modal
  const handleLivingShow = () => {
    setLivingShow(true)
  }


  // ? Section 3: Auth section 
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
    setErrors(false)
  }

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
      console.log({ data })
      window.localStorage.setItem('wittle-username', data.username)
      window.localStorage.setItem('wittle-email', data.email)
      console.log('username ->', data.username)
      setMember(!member)
    } catch (error) {
      setErrors(true)
    }
    setLivingData({ ...livingData, email_address: registerData.email })
  }


  // get email address from storage
  const getEmailFromStorage = () => {
    const email = JSON.parse(localStorage.getItem('wittle-email'))
    setEmail(email)
    console.log('email ->', email)
  }

  // useEffect(() => {
  //   getEmailFromStorage()
  // }, [])


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
    } catch (err) {
      // setErrors(err.response.status + ' ' + err.response.statusText)
      setErrors(err)
      console.log(err)
      console.log(err.response.data)
    }
  }

  // wittle living inputs form
  const [livingData, setLivingData] = useState({
    email_address: null,
    postcode: null,
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


  // submit registration form
  const livingSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/living/', livingData)
      window.localStorage.setItem('wittle-living-data', data)
      console.log('wittle living info ->', data)
    } catch (err) {
      setErrors(err)
      console.log(err)
      console.log(err.response.data)
    }
  }

  return (
    <>
      <section className='living-wrapper'>
        <section className='living-opening'>
          <NavBar />
          <div className='headline-section-living'>
            <h1>Make living easier</h1>
            <h3>Wittle Living helps you get on top of your admin and make the most out of where you live</h3>


            <h5 className='sign-up-action'>Want your own personal property portal?</h5>
            <h6 className='living-question' onClick={detailClick} ref={buttonRef}>🧐 what is this?</h6>
            <button className='mobile-button' onClick={handleLivingShow}>Simplify my life</button>

            <h5 className='subscribe-action'>Or happy with a weekly newsletter about what&apos;s going on in your area for now?</h5>
            <input className='living-input' type='text' name='email_address' placeholder='Email address'></input>
            <input className='living-input' type='text' name='postcode' placeholder='Postcode'></input>
            <button className='mobile-button'>Subscribe</button>





            <div className='headline-features' ref={buttonRef}>
              <div className='feature' >
                <h4>Admin Portal</h4>

                <div className='icon-box'>
                  <img className='icon' src='/website_icons/scale.png' alt='admin icon' />
                </div>
                <h5>Stay on top of your monthly bills and household admin</h5>
              </div>
              {/* <hr className='mobile-separator'/> */}

              <div className='feature'>
                <h4>Lifestyle Portal</h4>

                <div className='icon-box'>
                  <img className='icon' src='/website_icons/lifestyle.png' alt='lifestyle icon' />

                </div>
                <h5>Get recommendations on new and popular things to do in your area</h5>
              </div>
              {/* <hr className='mobile-separator'/> */}

              <div className='feature'>
                <h4>Property Portal</h4>

                <div className='icon-box'>
                  <img className='icon' src='/website_icons/property-market.png' alt='property icon' />

                </div>
                <h5>Understand more about the value of your property and how it compares to the rest of the market</h5>
              </div>
            </div>

            <button className='living-button' onClick={handleLivingShow}>Simplify my life</button>

          </div>
        </section>
      </section>

      <div className='wittle-living-modal-box'>
        <Modal show={livingShow} onHide={handleLivingClose} backdrop='static' className='wittle-living-modal'>
          <Modal.Body>
            <section className='living-modal-header'>
              <div className='living-title'>
                <h2>A property manager in your pocket</h2>
                <h2 className='close-button' onClick={handleLivingClose}>x</h2>
              </div>
              <div className='living-sub-title'>
                <h5>Tell us what you want to track and we&apos;ll do the rest</h5>
              </div>

            </section>
            <hr className='living-divider' />

            {!isUserAuth() ?
              <section className='living-modal-auth'>
                <h3>The boring bit...</h3>
                <div className='living-auth-logic'>
                  <h5>Already a Wittler?</h5>
                  {!member ? <h5 className='thumb' onClick={() => setMember(true)}>👎</h5> : <h5 className='thumb' onClick={() => setMember(false)}>👍</h5>}
                </div>
                {!member ?
                  <>
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
                    <button type='submit' onClick={registerSubmit}>Register</button>
                  </>
                  :
                  <>
                    <input type='email' name='email' className='input' placeholder='Email' value={registerData.email} onChange={registerChange} />
                    <input type='password' name='password' className='input' placeholder='Password' value={registerData.password} onChange={registerChange} />
                    <button type='submit' onClick={handleSubmit}>Sign in</button>
                  </>
                }
              </section>
              : ''
            }

            {isUserAuth() ?
              <>
                <section className='living-modal-details'>
                  <h3>Let&apos;s add some details...</h3>
                  <h5>Select the things you&apos;re interested in, then add in some details</h5>
                  <div className='logic-buttons'>
                    <h5>Admin</h5>
                    {livingData.admin_status === 0 ? <h5 className='thumb' onClick={() => setLivingData({ ...livingData, admin_status: 1 })}>👎</h5> : <h5 className='thumb' onClick={() => setLivingData({ ...livingData, admin_status: 0 })}>👍</h5>}
                  </div>
                  {livingData.admin_status === 1 ?
                    <>
                      <h5 className='logic-sub-title'>Bills you want to track</h5>

                      {/* Mortgage */}
                      <div className='selection-logic'>
                        <h5 className='selection'>🧾 Mortgage or rent</h5>
                        {livingData.mortgage_status === 1 ? <button name='mortgage_status' onClick={() => setLivingData({ ...livingData, mortgage_status: 0 })} value='false' className='delete-button'>Remove</button> : <button name='mortgage_status' onClick={() => setLivingData({ ...livingData, mortgage_status: 1 })} value='true' className='add-button'>Add</button>}
                      </div>
                      {livingData.mortgage_status === 1 ?
                        <div className='selection-block'>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Provider</h5>
                            <input className='selection-input' type='text' name='mortgage_provider' onChange={(e) => setLivingData({ ...livingData, mortgage_provider: e.target.value })} placeholder={livingData.mortgage_provider}></input>
                          </div>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Monthly payment</h5>
                            <input className='selection-input' type='number' name='mortgage_value' onChange={(e) => setLivingData({ ...livingData, mortgage_value: e.target.value })} placeholder={livingData.mortgage_value}></input>
                          </div>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Renewal date</h5>
                            <input className='selection-input' type='date' name='mortgage_date' onChange={(e) => setLivingData({ ...livingData, mortgage_date: e.target.value })} placeholder={livingData.mortgage_date}></input>
                          </div>
                        </div>
                        : ''
                      }

                      {/* Boiler */}
                      <div className='selection-logic'>
                        <h5 className='selection'>🔧 Boiler maintenance</h5>
                        {livingData.boiler_status === 1 ? <button name='boiler_status' onClick={() => setLivingData({ ...livingData, boiler_status: 0 })} value='false' className='delete-button'>Remove</button> : <button name='boiler_status' onClick={() => setLivingData({ ...livingData, boiler_status: 1 })} value='true' className='add-button'>Add</button>}
                      </div>
                      {livingData.boiler_status === 1 ?
                        <div className='selection-block'>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Provider</h5>
                            <input className='selection-input' type='text' name='boiler_provider' onChange={(e) => setLivingData({ ...livingData, boiler_provider: e.target.value })} placeholder={livingData.boiler_provider}></input>
                          </div>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Annual payment</h5>
                            <input className='selection-input' type='number' name='boiler_value' onChange={(e) => setLivingData({ ...livingData, boiler_value: e.target.value })} placeholder={livingData.boiler_value}></input>
                          </div>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Renewal date</h5>
                            <input className='selection-input' type='date' name='boiler_date' onChange={(e) => setLivingData({ ...livingData, boiler_date: e.target.value })} placeholder={livingData.boiler_date}></input>
                          </div>
                        </div>
                        : ''
                      }

                      {/* House insurance */}
                      <div className='selection-logic'>
                        <h5 className='selection'>🏠 House insurance</h5>
                        {livingData.insurance_status === 1 ? <button name='insurance_status' onClick={() => setLivingData({ ...livingData, insurance_status: 0 })} value='false' className='delete-button'>Remove</button> : <button name='insurance_status' onClick={() => setLivingData({ ...livingData, insurance_status: 1 })} value='true' className='add-button'>Add</button>}
                      </div>
                      {livingData.insurance_status === 1 ?
                        <div className='selection-block'>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Provider</h5>
                            <input className='selection-input' type='text' name='insurance_provider' onChange={(e) => setLivingData({ ...livingData, insurance_provider: e.target.value })} placeholder={livingData.insurance_provider}></input>
                          </div>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Annual payment</h5>
                            <input className='selection-input' type='number' name='insurance_value' onChange={(e) => setLivingData({ ...livingData, insurance_value: e.target.value })} placeholder={livingData.insurance_value}></input>
                          </div>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Renewal date</h5>
                            <input className='selection-input' type='date' name='insurance_date' onChange={(e) => setLivingData({ ...livingData, insurance_date: e.target.value })} placeholder={livingData.insurance_date}></input>
                          </div>
                        </div>
                        : ''
                      }

                      {/* Council Tax */}
                      <div className='selection-logic'>
                        <h5 className='selection'>🏛 Council Tax</h5>
                        {livingData.council_tax_status === 1 ? <button name='council_tax_status' onClick={() => setLivingData({ ...livingData, council_tax_status: 0 })} value='false' className='delete-button'>Remove</button> : <button name='council_tax_status' onClick={() => setLivingData({ ...livingData, council_tax_status: 1 })} value='true' className='add-button'>Add</button>}
                      </div>
                      {livingData.council_tax_status === 1 ?
                        <div className='selection-block'>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Monthly payment</h5>
                            <input className='selection-input' type='number' name='council_tax_value' onChange={(e) => setLivingData({ ...livingData, council_tax_value: e.target.value })} placeholder={livingData.council_tax_value}></input>
                          </div>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Renewal date</h5>
                            <input className='selection-input' type='date' name='council_tax_date' onChange={(e) => setLivingData({ ...livingData, council_tax_date: e.target.value })} placeholder={livingData.council_tax_date}></input>
                          </div>
                        </div>
                        : ''
                      }

                      {/* Energy */}
                      <div className='selection-logic'>
                        <h5 className='selection'>🔥 Energy</h5>
                        {livingData.energy_status === 1 ? <button name='energy_status' onClick={() => setLivingData({ ...livingData, energy_status: 0 })} value='false' className='delete-button'>Remove</button> : <button name='energy_status' onClick={() => setLivingData({ ...livingData, energy_status: 1 })} value='true' className='add-button'>Add</button>}
                      </div>
                      {livingData.energy_status === 1 ?
                        <>
                          <div className='selection-logic-2'>
                            <h5 className='additional-logic'>Do you have one provider or two?</h5>
                            <select name='energy_detail' onChange={(e) => setLivingData({ ...livingData, energy_detail: e.target.value })}>
                              <option type='number' value={1}>1</option>
                              <option value={2}>2</option>
                            </select>
                          </div>
                          {livingData.energy_detail === 1 ?
                            <div className='selection-block'>
                              <div className='selection-detail'>
                                <h5 className='detail-title'>Energy Provider</h5>
                                <input className='selection-input' type='text' name='energy_provider' onChange={(e) => setLivingData({ ...livingData, energy_provider: e.target.value })} placeholder={livingData.energy_provider}></input>
                              </div>
                              <div className='selection-detail'>
                                <h5 className='detail-title'>Monthly payment</h5>
                                <input className='selection-input' type='number' name='energy_value' onChange={(e) => setLivingData({ ...livingData, energy_value: e.target.value })} placeholder={livingData.energy_value}></input>
                              </div>
                              <div className='selection-detail'>
                                <h5 className='detail-title'>Renewal date</h5>
                                <input className='selection-input' type='date' name='energy_date' onChange={(e) => setLivingData({ ...livingData, energy_date: e.target.value })} placeholder={livingData.energy_date}></input>
                              </div>
                            </div>
                            :
                            <>
                              <div className='selection-block'>
                                <div className='selection-detail'>
                                  <h5 className='detail-title'>Gas Provider</h5>
                                  <input className='selection-input' type='text' name='gas_provider' onChange={(e) => setLivingData({ ...livingData, gas_provider: e.target.value })} placeholder={livingData.gas_provider}></input>
                                </div>
                                <div className='selection-detail'>
                                  <h5 className='detail-title'>Monthly payment</h5>
                                  <input className='selection-input' type='number' name='gas_value' onChange={(e) => setLivingData({ ...livingData, gas_value: e.target.value })} placeholder={livingData.gas_value}></input>
                                </div>
                                <div className='selection-detail'>
                                  <h5 className='detail-title'>Renewal date</h5>
                                  <input className='selection-input' type='date' name='gas_date' onChange={(e) => setLivingData({ ...livingData, gas_date: e.target.value })} placeholder={livingData.gas_date}></input>
                                </div>
                              </div>
                              <div className='selection-block'>
                                <div className='selection-detail'>
                                  <h5 className='detail-title'>Electricity Provider</h5>
                                  <input className='selection-input' type='text' name='electric_provider' onChange={(e) => setLivingData({ ...livingData, electric_provider: e.target.value })} placeholder={livingData.electric_provider}></input>
                                </div>
                                <div className='selection-detail'>
                                  <h5 className='detail-title'>Monthly payment</h5>
                                  <input className='selection-input' type='number' name='electric_value' onChange={(e) => setLivingData({ ...livingData, electric_value: e.target.value })} placeholder={livingData.electric_value}></input>
                                </div>
                                <div className='selection-detail'>
                                  <h5 className='detail-title'>Renewal date</h5>
                                  <input className='selection-input' type='date' name='electric_date' onChange={(e) => setLivingData({ ...livingData, electric_date: e.target.value })} placeholder={livingData.electric_date}></input>
                                </div>
                              </div>
                            </>
                          }

                        </>
                        : ''
                      }

                      {/* Broadband */}
                      <div className='selection-logic'>
                        <h5 className='selection'>📶 Broadband</h5>
                        {livingData.broadband_status === 1 ? <button name='broadband_status' onClick={() => setLivingData({ ...livingData, broadband_status: 0 })} value='false' className='delete-button'>Remove</button> : <button name='broadband_status' onClick={() => setLivingData({ ...livingData, broadband_status: 1 })} value='true' className='add-button'>Add</button>}
                      </div>
                      {livingData.broadband_status === 1 ?
                        <div className='selection-block'>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Provider</h5>
                            <input className='selection-input' type='text' name='broadband_provider' onChange={(e) => setLivingData({ ...livingData, broadband_provider: e.target.value })} placeholder={livingData.broadband_provider}></input>
                          </div>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Monthly payment</h5>
                            <input className='selection-input' type='number' name='broadband_value' onChange={(e) => setLivingData({ ...livingData, broadband_value: e.target.value })} placeholder={livingData.broadband_value}></input>
                          </div>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Renewal date</h5>
                            <input className='selection-input' type='date' name='broadband_date' onChange={(e) => setLivingData({ ...livingData, broadband_date: e.target.value })} placeholder={livingData.broadband_date}></input>
                          </div>
                        </div>
                        : ''
                      }

                      {/* Sky */}
                      <div className='selection-logic'>
                        <h5 className='selection'>📺 Satelite TV</h5>
                        {livingData.sky_status === 1 ? <button name='sky_status' onClick={() => setLivingData({ ...livingData, sky_status: 0 })} value='false' className='delete-button'>Remove</button> : <button name='sky_status' onClick={() => setLivingData({ ...livingData, sky_status: 1 })} value='true' className='add-button'>Add</button>}
                      </div>
                      {livingData.sky_status === 1 ?
                        <div className='selection-block'>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Provider</h5>
                            <select name='sky_provider' className='provider-dropdown' onChange={(e) => setLivingData({ ...livingData, sky_provider: e.target.value })}>
                              <option>Sky</option>
                              <option>Virgin</option>
                              <option>TalkTalk</option>
                              <option>Now TV</option>
                            </select>
                          </div>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Monthly payment</h5>
                            <input className='selection-input' type='number' name='sky_value' onChange={(e) => setLivingData({ ...livingData, sky_value: e.target.value })} placeholder={livingData.sky_value}></input>
                          </div>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Renewal date</h5>
                            <input className='selection-input' type='date' name='sky_date' onChange={(e) => setLivingData({ ...livingData, sky_date: e.target.value })} placeholder={livingData.sky_date}></input>
                          </div>
                        </div>
                        : ''
                      }

                      {/* Netflix */}
                      <div className='selection-logic'>
                        <h5 className='selection'>💻 Netflix</h5>
                        {livingData.netflix_status === 1 ? <button name='netflix_status' onClick={() => setLivingData({ ...livingData, netflix_status: 0 })} value='false' className='delete-button'>Remove</button> : <button name='netflix_status' onClick={() => setLivingData({ ...livingData, netflix_status: 1 })} value='true' className='add-button'>Add</button>}
                      </div>
                      {livingData.netflix_status === 1 ?
                        <div className='selection-block'>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Monthly payment</h5>
                            <input className='selection-input' type='number' name='netflix_value' onChange={(e) => setLivingData({ ...livingData, netflix_value: e.target.value })} placeholder={livingData.netflix_value}></input>
                          </div>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Renewal date</h5>
                            <input className='selection-input' type='date' name='netflix_date' onChange={(e) => setLivingData({ ...livingData, netflix_date: e.target.value })} placeholder={livingData.netflix_date}></input>
                          </div>
                        </div>
                        : ''
                      }

                      {/* Amazon */}
                      <div className='selection-logic'>
                        <h5 className='selection'>📦 Amazon</h5>
                        {livingData.amazon_status === 1 ? <button name='amazon_status' onClick={() => setLivingData({ ...livingData, amazon_status: 0 })} value='false' className='delete-button'>Remove</button> : <button name='amazon_status' onClick={() => setLivingData({ ...livingData, amazon_status: 1 })} value='true' className='add-button'>Add</button>}
                      </div>
                      {livingData.amazon_status === 1 ?
                        <div className='selection-block'>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Monthly payment</h5>
                            <input className='selection-input' type='number' name='amazon_value' onChange={(e) => setLivingData({ ...livingData, amazon_value: e.target.value })} placeholder={livingData.amazon_value}></input>
                          </div>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Renewal date</h5>
                            <input className='selection-input' type='date' name='amazon_date' onChange={(e) => setLivingData({ ...livingData, amazon_date: e.target.value })} placeholder={livingData.amazon_date}></input>
                          </div>
                        </div>
                        : ''
                      }

                      {/* Disney */}
                      <div className='selection-logic'>
                        <h5 className='selection'>🦄 Disney</h5>
                        {livingData.disney_status === 1 ? <button name='disney_status' onClick={() => setLivingData({ ...livingData, disney_status: 0 })} value='false' className='delete-button'>Remove</button> : <button name='disney_status' onClick={() => setLivingData({ ...livingData, disney_status: 1 })} value='true' className='add-button'>Add</button>}
                      </div>
                      {livingData.disney_status === 1 ?
                        <div className='selection-block'>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Monthly payment</h5>
                            <input className='selection-input' type='number' name='disney_value' onChange={(e) => setLivingData({ ...livingData, disney_value: e.target.value })} placeholder={livingData.disney_value}></input>
                          </div>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Renewal date</h5>
                            <input className='selection-input' type='date' name='disney_date' onChange={(e) => setLivingData({ ...livingData, disney_date: e.target.value })} placeholder={livingData.disney_date}></input>
                          </div>
                        </div>
                        : ''
                      }

                      {/* Apple */}
                      <div className='selection-logic'>
                        <h5 className='selection'>🍏 Apple TV</h5>
                        {livingData.apple_status === 1 ? <button name='apple_status' onClick={() => setLivingData({ ...livingData, apple_status: 0 })} value='false' className='delete-button'>Remove</button> : <button name='apple_status' onClick={() => setLivingData({ ...livingData, apple_status: 1 })} value='true' className='add-button'>Add</button>}
                      </div>
                      {livingData.apple_status === 1 ?
                        <div className='selection-block'>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Monthly payment</h5>
                            <input className='selection-input' type='number' name='apple_value' onChange={(e) => setLivingData({ ...livingData, apple_value: e.target.value })} placeholder={livingData.apple_value}></input>
                          </div>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Renewal date</h5>
                            <input className='selection-input' type='date' name='apple_date' onChange={(e) => setLivingData({ ...livingData, apple_date: e.target.value })} placeholder={livingData.apple_date}></input>
                          </div>
                        </div>
                        : ''
                      }

                      {/* TV license */}
                      <div className='selection-logic'>
                        <h5 className='selection'>📺 TV license</h5>
                        {livingData.tv_status === 1 ? <button name='tv_status' onClick={() => setLivingData({ ...livingData, tv_status: 0 })} value='false' className='delete-button'>Remove</button> : <button name='tv_status' onClick={() => setLivingData({ ...livingData, tv_status: 1 })} value='true' className='add-button'>Add</button>}
                      </div>
                      {livingData.tv_status === 1 ?
                        <div className='selection-block'>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Monthly payment</h5>
                            <input className='selection-input' type='number' name='tv_value' onChange={(e) => setLivingData({ ...livingData, tv_value: e.target.value })} placeholder={livingData.tv_value}></input>
                          </div>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Renewal date</h5>
                            <input className='selection-input' type='date' name='tv_date' onChange={(e) => setLivingData({ ...livingData, tv_date: e.target.value })} placeholder={livingData.tv_date}></input>
                          </div>
                        </div>
                        : ''
                      }

                      {/* Phone contract */}
                      <div className='selection-logic'>
                        <h5 className='selection'>📱 Phone contract</h5>
                        {livingData.phone_status === 1 ? <button name='phone_status' onClick={() => setLivingData({ ...livingData, phone_status: 0 })} value='false' className='delete-button'>Remove</button> : <button name='phone_status' onClick={() => setLivingData({ ...livingData, phone_status: 1 })} value='true' className='add-button'>Add</button>}
                      </div>
                      {livingData.phone_status === 1 ?
                        <div className='selection-block'>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Provider</h5>
                            <input className='selection-input' type='text' name='phone_provider' onChange={(e) => setLivingData({ ...livingData, phone_provider: e.target.value })} placeholder={livingData.phone_provider}></input>
                          </div>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Monthly payment</h5>
                            <input className='selection-input' type='number' name='phone_value' onChange={(e) => setLivingData({ ...livingData, phone_value: e.target.value })} placeholder={livingData.phone_value}></input>
                          </div>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Renewal date</h5>
                            <input className='selection-input' type='date' name='phone_date' onChange={(e) => setLivingData({ ...livingData, phone_date: e.target.value })} placeholder={livingData.phone_date}></input>
                          </div>
                        </div>
                        : ''
                      }

                      {/* Gym */}
                      <div className='selection-logic'>
                        <h5 className='selection'>🏋️‍♂️ Gym</h5>
                        {livingData.gym_status === 1 ? <button name='gym_status' onClick={() => setLivingData({ ...livingData, gym_status: 0 })} value='false' className='delete-button'>Remove</button> : <button name='gym_status' onClick={() => setLivingData({ ...livingData, gym_status: 1 })} value='true' className='add-button'>Add</button>}
                      </div>
                      {livingData.gym_status === 1 ?
                        <div className='selection-block'>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Studio</h5>
                            <input className='selection-input' type='text' name='gym_provider' onChange={(e) => setLivingData({ ...livingData, gym_provider: e.target.value })} placeholder={livingData.gym_provider}></input>
                          </div>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Monthly payment</h5>
                            <input className='selection-input' type='number' name='gym_value' onChange={(e) => setLivingData({ ...livingData, gym_value: e.target.value })} placeholder={livingData.gym_value}></input>
                          </div>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Renewal date</h5>
                            <input className='selection-input' type='date' name='gym_date' onChange={(e) => setLivingData({ ...livingData, gym_date: e.target.value })} placeholder={livingData.gym_date}></input>
                          </div>
                        </div>
                        : ''
                      }

                      {/* Additional elements */}
                      <div className='selection-logic'>
                        <h5 className='missing-title'>Something missing? Add up to 3 more</h5>
                        {extra ? <button onClick={() => setExtra(false)} value='false' className='delete-button'>Remove</button> : <button onClick={() => setExtra(true)} value='true' className='add-button'>Add</button>}
                      </div>

                      {extra ?
                        <>
                          <div className='selection-logic'>
                            <h5 className='selection'>❓ Extra #1</h5>
                            {livingData.other_status_1 === 1 ? <button name='other_status_1' onClick={() => setLivingData({ ...livingData, other_status_1: 0 })} value='false' className='delete-button'>Remove</button> : <button name='other_status_1' onClick={() => setLivingData({ ...livingData, other_status_1: 1 })} value='true' className='add-button'>Add</button>}
                          </div>
                          {livingData.other_status_1 === 1 ?

                            <div className='selection-block-other'>
                              <div className='selection-detail'>
                                <h5 className='detail-title'>Bill type</h5>
                                <input className='selection-input' type='text' name='other_type_1' onChange={(e) => setLivingData({ ...livingData, other_type_1: e.target.value })} placeholder={livingData.other_type_1}></input>
                              </div>
                              <div className='selection-detail'>
                                <h5 className='detail-title'>Provider</h5>
                                <input className='selection-input' type='text' name='other_provider_1' onChange={(e) => setLivingData({ ...livingData, other_provider_1: e.target.value })} placeholder={livingData.other_provider_1}></input>
                              </div>
                              <div className='selection-detail'>
                                <h5 className='detail-title'>Monthly payment</h5>
                                <input className='selection-input' type='number' name='other_value_1' onChange={(e) => setLivingData({ ...livingData, other_value_1: e.target.value })} placeholder={livingData.other_value_1}></input>
                              </div>
                              <div className='selection-detail'>
                                <h5 className='detail-title'>Renewal date</h5>
                                <input className='selection-input' type='date' name='other_date_1' onChange={(e) => setLivingData({ ...livingData, other_date_1: e.target.value })} placeholder={livingData.other_date_1}></input>
                              </div>
                            </div>
                            : ''
                          }
                          <div className='selection-logic'>
                            <h5 className='selection'>❓ Extra #2</h5>
                            {livingData.other_status_2 === 1 ? <button name='other_status_2' onClick={() => setLivingData({ ...livingData, other_status_2: 0 })} value='false' className='delete-button'>Remove</button> : <button name='other_status_2' onClick={() => setLivingData({ ...livingData, other_status_2: 1 })} value='true' className='add-button'>Add</button>}
                          </div>
                          {livingData.other_status_2 === 1 ?

                            <div className='selection-block-other'>
                              <div className='selection-detail'>
                                <h5 className='detail-title'>Bill type</h5>
                                <input className='selection-input' type='text' name='other_type_2' onChange={(e) => setLivingData({ ...livingData, other_type_2: e.target.value })} placeholder={livingData.other_type_2}></input>
                              </div>
                              <div className='selection-detail'>
                                <h5 className='detail-title'>Provider</h5>
                                <input className='selection-input' type='text' name='other_provider_2' onChange={(e) => setLivingData({ ...livingData, other_provider_2: e.target.value })} placeholder={livingData.other_provider_2}></input>
                              </div>
                              <div className='selection-detail'>
                                <h5 className='detail-title'>Monthly payment</h5>
                                <input className='selection-input' type='number' name='other_value_2' onChange={(e) => setLivingData({ ...livingData, other_value_2: e.target.value })} placeholder={livingData.other_value_2}></input>
                              </div>
                              <div className='selection-detail'>
                                <h5 className='detail-title'>Renewal date</h5>
                                <input className='selection-input' type='date' name='other_date_2' onChange={(e) => setLivingData({ ...livingData, other_date_2: e.target.value })} placeholder={livingData.other_date_2}></input>
                              </div>
                            </div>
                            : ''
                          }
                          <div className='selection-logic'>
                            <h5 className='selection'>❓ Extra #3</h5>
                            {livingData.other_status_3 === 1 ? <button name='other_status_3' onClick={() => setLivingData({ ...livingData, other_status_3: 0 })} value='false' className='delete-button'>Remove</button> : <button name='other_status_3' onClick={() => setLivingData({ ...livingData, other_status_3: 1 })} value='true' className='add-button'>Add</button>}
                          </div>
                          {livingData.other_status_3 === 1 ?

                            <div className='selection-block-other'>
                              <div className='selection-detail'>
                                <h5 className='detail-title'>Bill type</h5>
                                <input className='selection-input' type='text' name='other_type_3' onChange={(e) => setLivingData({ ...livingData, other_type_3: e.target.value })} placeholder={livingData.other_type_3}></input>
                              </div>
                              <div className='selection-detail'>
                                <h5 className='detail-title'>Provider</h5>
                                <input className='selection-input' type='text' name='other_provider_3' onChange={(e) => setLivingData({ ...livingData, other_provider_3: e.target.value })} placeholder={livingData.other_provider_3}></input>
                              </div>
                              <div className='selection-detail'>
                                <h5 className='detail-title'>Monthly payment</h5>
                                <input className='selection-input' type='number' name='other_value_3' onChange={(e) => setLivingData({ ...livingData, other_value_3: e.target.value })} placeholder={livingData.other_value_3}></input>
                              </div>
                              <div className='selection-detail'>
                                <h5 className='detail-title'>Renewal date</h5>
                                <input className='selection-input' type='date' name='other_date_3' onChange={(e) => setLivingData({ ...livingData, other_date_3: e.target.value })} placeholder={livingData.other_date_3}></input>
                              </div>
                            </div>
                            : ''
                          }
                        </>
                        : ''
                      }

                    </>
                    : ''
                  }


                  <div className='logic-buttons'>
                    <h5>Lifestyle</h5>
                    {!lifestyle ? <h5 className='thumb' onClick={() => setLifestyle(true)}>👎</h5> : <h5 className='thumb' onClick={() => setLifestyle(false)}>👍</h5>}
                  </div>
                  {lifestyle ?
                    <>
                      <div className='selection-block' >
                        <div className='selection-detail' id='lifestyle-block'>
                          <h5 className='detail-title'>Postcode</h5>
                          <input className='selection-input' type='input' name='postcode' onChange={(e) => setLivingData({ ...livingData, postcode: e.target.value })} placeholder={livingData.postcode}></input>
                        </div>
                      </div>
                      <h5 className='logic-sub-title'>That&apos;s all we need, sit tight for some great info about your area</h5>
                    </>
                    : ''
                  }
                  <div className='logic-buttons'>
                    <h5>Property</h5>
                    {!property ? <h5 className='thumb' onClick={() => setProperty(true)}>👎</h5> : <h5 className='thumb' onClick={() => setProperty(false)}>👍</h5>}
                  </div>
                  {property ?
                    <h5 className='logic-sub-title'>We can&apos;t do this just yet, but keep it selected and we&apos;ll share some insights as soon as we can</h5>
                    : ''
                  }
                </section>
                <hr className='living-divider' />
                <section className='living-modal-footer'>
                  <div className='footer-submit'>
                    <h5 className='submit-text'>Happy with you selections? Head to the portal 🚀</h5>
                    <button className='submit-button' onClick={livingSubmit}>Submit</button>
                  </div>
                  <div className='footer-details'>
                    <h5 className='submit-sub-text'>Not sure you&apos;ve added in everything? Don&apos;t worry, you can update whenever you want</h5>
                  </div>
                </section>
              </>
              : ''
            }

          </Modal.Body>
        </Modal>
      </div>
    </>
  )
}

export default LivingHome