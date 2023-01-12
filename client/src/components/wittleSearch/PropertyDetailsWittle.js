import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
// import  Modal from 'react-modal'
import { getAccessToken, isUserAuth, getUserToken } from '../auth/Auth'
import { Modal } from 'react-bootstrap'
import { NumericFormat } from 'react-number-format'

// import Modal from 'react-bootstrap/Modal'
// import 'bootstrap/dist/css/bootstrap.min.css'



import Timeline1 from '../tools/Timeline1'
import Timeline2 from '../tools/TImeline2'
import Timeline3 from '../tools/Timeline3'
import Timeline4 from '../tools/Timeline4'
import Timeline5 from '../tools/Timeline5'
import NavBar from '../tools/NavBar'

const PropertyDetailsWittle = () => {

  // state to enable navigation between pages
  const navigate = useNavigate()

  // set error state for capturing errors
  const [errors, setErrors] = useState(false)

  // states for filling out the form
  const [formData, setFormData] = useState({
    start_search: true,
    search_name: '',
    search_type: 'Wittle',
    search_channel: '',
    restaurant_selection: false,
    restaurant_decision: '',
    restaurant_distance: 0,
    restaurant_cuisine_1: '',
    restaurant_cuisine_2: '',
    takeaway_selection: false,
    takeaway_decision: '',
    takeaway_distance: 0,
    takeaway_cuisine_1: '',
    takeaway_cuisine_2: '',
    pubs_selection: false,
    pubs_distance: 0,
    cafes_selection: '',
    cafes_decision: '',
    cafes_detail: '',
    cafes_distance: 0,
    tube_selection: false,
    tube_decision: '',
    tube_detail: '',
    tube_distance: 0,
    train_selection: false,
    train_decision: '',
    train_detail: '',
    train_distance: 0,
    primary_selection: false,
    primary_religion: '',
    primary_mode: '',
    primary_distance: 0,
    college_selection: false,
    college_religion: '',
    college_mode: '',
    college_distance: 0,
    secondary_selection: false,
    secondary_religion: '',
    secondary_mode: '',
    secondary_distance: 0,
    supermarket_selection: false,
    supermarket_decision: '',
    supermarket_segment: '',
    supermarket_size: '',
    supermarket_distance: 0,
    gym_selection: false,
    gym_studio_name: '',
    gym_class_type: '',
    gym_distance: 0,
    park_selection: false,
    park_type: '',
    park_distance: 0,
    workplace_selection: false,
    workplace_detail: '',
    workplace_transport: '',
    workplace_distance: 0,
    family_selection: false,
    family_detail_1: '',
    family_distance_1: 0,
    family_detail_2: '',
    family_distance_2: 0,
    family_detail_3: '',
    family_distance_3: 0,
    property_price_min: '',
    property_price_max: '',
    property_bed_min: '',
    property_bed_max: '',
    property_type: '',
  })



  // get form data from storage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('wittle-form-input'))
    if (data) setFormData(data)
  }, [])


  // ? Setting up the ability to retain the form data across pages by saving the data to local storage for us to access on another pagee
  // define function to set state to storage
  const setStateToLocalStorage = (token) => {
    window.localStorage.setItem('wittle-form-input', JSON.stringify(formData))
    console.log(formData)
  }

  // execute setting state to local storage
  // useEffect(() => {
  //   if (formData) {
  //     setStateToLocalStorage()
  //   }
  // }, [formData])

  // general update for drop down menus
  const handleChange = e => {
    const test = e.target.value
    if (test.includes('£')) {
      const newValue = test.replace('£', '').replace(',', '').replace(',', '')
      setFormData({ ...formData, [e.target.name]: newValue })
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  }

  // ? Managing state for modal pop up for saving the search
  // Setting state and handles for submit modal
  const [show, setShow] = useState(false)

  // closing thee modal
  const handleClose = () => {
    setShow(false)
  }

  // showing the modal
  const handleShow = () => setShow(true)

  // no access modal
  const [noAccess, noAccessShow] = useState(false)

  // closing access modal
  const accessClose = () => {
    noAccessShow(false)
  }

  // showing access modal
  const accessShow = () => noAccessShow(true)

  // function with logic for different modal depending on log in status
  const accessLogic = () => {
    isUserAuth() ? handleShow() : accessShow()
  }

  // function for logic when you click login from the access modal
  const loginLogic = () => {
    accessClose()
    openDropdown()
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
    accessClose()
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
      handleRegisterClose()
    } catch (err) {
      // setErrors(err.response.status + ' ' + err.response.statusText)
    }
  }

  // function for setting user to local storage when log in is successful
  const setUserTokenToLocalStorage = (token) => {
    window.localStorage.setItem('wittle-user-token', token)
  }


  // ? Posting the results of the wittle-search form to the database
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/property-search/', formData, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      localStorage.removeItem('wittle-form-input')
      window.localStorage.setItem('wittle-form-input', JSON.stringify(formData))
      navigate('/wittle-results')
    } catch (error) {
      setErrors(true)
    }
  }


  // remove login token from storage
  const removeItemFromStorage = (token) => {
    localStorage.removeItem('wittle-user-token')
    localStorage.removeItem('wittle-username')
    window.location.reload()
    setIsActive(false)
  }

  // handling the dropdown section of the navbar
  const dropdownRef = useRef(null)
  // const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false)
  const [isActive, setIsActive] = useState(false)
  const openDropdown = () => setIsActive(!isActive)


  // ? Section for login form detail within navbar  
  // send form to back end to log in
  const loginSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login/', registerData)
      console.log(registerData)
      setUserTokenToLocalStorage(data.token)
      console.log({ data })
      window.localStorage.setItem('wittle-username', data.username)
      // window.location.reload()
      // navigate('/')
    } catch (error) {
      setErrors(true)
    }
  }

  // update form dtail when logging in
  const loginChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value })
    setErrors(false)
  }

  return (
    <>
      <section className='main-form-pages'>
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
                  <span>Sign in</span>
                </button>
                <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
                  <form className='form-detail' onSubmit={loginSubmit}>
                    <p>Log in to your account</p>
                    <input type='email' name='email' className='input' placeholder='Email' value={registerData.email} onChange={loginChange} />
                    <input type='password' name='password' className='input' placeholder='Password' value={registerData.password} onChange={loginChange} />
                    <button onClick={openDropdown} className='sign-up' type='submit'>Sign in</button>
                    <h5>New to Wittle?
                      <span onClick={handleRegisterShow}> Join us</span>
                    </h5>
                  </form>
                </nav>
              </div>
            </>
          }
        </section>
        <section className='form-input-page'>
          {/* Top section of the page with header and timeline bar */}
          <section className='title-section'>
            <h1>The final step</h1>
            <Timeline4 />
            <div className='form-selections-large'>
              {formData.restaurant_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 1)' }}>Restaurants</button> : ''}
              {formData.cafes_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 1)' }}>Cafes</button> : ''}
              {formData.takeaway_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 1)' }}>Takeaways</button> : ''}
              {formData.pubs_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 1)' }}>Pubs & Bars</button> : ''}
              {formData.tube_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 1)' }}>Tubes</button> : ''}
              {formData.train_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 1)' }}>Trains</button> : ''}
              {formData.supermarket_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 1)' }}>Supermarkets</button> : ''}
              {formData.gym_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 1)' }}>Gyms</button> : ''}
              {formData.park_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 1)' }}>Parks</button> : ''}
              {formData.workplace_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 1)' }}>Workplace</button> : ''}
              {formData.primary_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 1)' }}>Primary Schools</button> : ''}
              {formData.secondary_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 1)' }}>Secondary Schools</button> : ''}
              {formData.college_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 1)' }}>6th Forms</button> : ''}
              {formData.family_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 1)' }}>Friends & Family</button> : ''}
            </div>
            <div className='form-selections-small'>
              {formData.restaurant_selection || formData.cafes_selection || formData.takeaway_selection || formData.pubs_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 1)' }}>Hospitality</button> : ''}
              {formData.train_selection || formData.tube_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 1)' }}>Travel</button> : ''}
              {formData.supermarket_selection || formData.gym_selection || formData.park_selection || formData.workplace_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 1)' }}>Lifestyle</button> : ''}
              {formData.primary_selection || formData.secondary_selection || formData.college_selection || formData.family_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 1)' }}>Family</button> : ''}

            </div>
          </section>

          {/* Lower section of the page containing the main content */}
          <section className='main-content-detail'>
            <div className='form-selection'>
              <h1>Property details</h1>

              <div className='form-filling-section-1' id='property-search-grid'>
                <div className='form-filling-grid'>
                  <div className='form-filling-detail-left'>
                    <p className='search-bold'>Are you interested in buying or renting?</p>
                    <div className='form-detail' id='final-step'>
                      <div className='form-detail-address'>
                        <select className='property-control' id='cuisine-drop-1' placeholder='Pick cuisine' name='search_channel' onChange={handleChange}>
                          <option>Buying</option>
                          <option>Renting</option>
                        </select>
                      </div>
                    </div>
                    <p className='search-bold'>Price range</p>
                    {formData.search_channel === 'Renting' ?
                      <>
                        <div className='form-detail' id='final-step'>
                          <div className='form-detail-address' id='property'>
                            <select className='property-control' id='cuisine-drop-1' placeholder='Pick cuisine' name='property_price_min' onChange={handleChange} >Pick cuisine
                              <option>No min</option>
                              <option><NumericFormat value={500} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={600} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={700} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={800} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={900} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={1000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={1250} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={1500} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={1750} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={2000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={2250} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={2500} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={2750} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={3000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={3500} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={4000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={4500} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={5000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={6000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={7000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={8000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                            </select>
                          </div>
                          <div className='form-detail-address'>
                            <select className='property-control' id='cuisine-drop-1' placeholder='Pick cuisine' name='property_price_max' onChange={handleChange} >Pick cuisine
                              <option>No max</option>
                              <option><NumericFormat value={500} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={600} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={700} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={800} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={900} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={1000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={1250} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={1500} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={1750} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={2000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={2250} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={2500} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={2750} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={3000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={3500} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={4000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={4500} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={5000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={6000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={7000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={8000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={10000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                            </select>
                          </div>
                        </div>
                      </>

                      :
                      <>
                        <div className='form-detail' id='final-step'>
                          <div className='form-detail-address' id='property'>
                            <select className='property-control' id='cuisine-drop-1' placeholder='Pick cuisine' name='property_price_min' onChange={handleChange} >Pick cuisine
                              <option>No min</option>
                              <option><NumericFormat value={200000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={300000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={400000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={500000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={600000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={700000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={800000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={900000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={1000000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={1250000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={1500000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={1750000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={2000000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={2500000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={3000000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={3500000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={4000000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={5000000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                            </select>
                          </div>
                          <div className='form-detail-address'>
                            <select className='property-control' id='cuisine-drop-1' placeholder='Pick cuisine' name='property_price_max' onChange={handleChange} >Pick cuisine
                              <option>No max</option>
                              <option><NumericFormat value={300000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={400000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={500000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={600000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={700000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={800000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={900000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={1000000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={1250000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={1500000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={1750000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={2000000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={2500000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={3000000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={3500000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={4000000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={5000000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                              <option><NumericFormat value={10000000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                            </select>
                          </div>
                        </div>
                      </>
                    }
                    <p className='search-bold'>Number of bedrooms</p>
                    <div className='form-detail' id='final-step'>
                      <div className='form-detail-address' id='property'>
                        <select className='property-control' id='cuisine-drop-1' placeholder='Pick cuisine' name='property_bed_min' onChange={handleChange} >Pick cuisine
                          <option>No min</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                        </select>
                      </div>
                      <div className='form-detail-address'>
                        <select className='property-control' id='cuisine-drop-1' placeholder='Pick cuisine' name='property_bed_max' onChange={handleChange} >Pick cuisine
                          <option>No max</option>
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </select>
                      </div>
                    </div>
                    <p className='search-bold'>Property type</p>
                    <div className='cuisine-dropdowns' id='property-type'>
                      <select className='property-control' id='cuisine-drop-1' placeholder='Pick cuisine' name='property_type' onChange={handleChange} >Pick cuisine
                        <option>Any</option>
                        <option>House</option>
                        <option>Flat</option>
                      </select>
                    </div>
                  </div>
                  <div className='form-filling-image-right' id='property-image'>

                  </div>
                </div>
              </div>

              <button className='next' onClick={accessLogic} data-toggle='modal' >Next</button>
              {/* Modal for saving searchc */}
              <Modal show={show} onHide={handleClose} backdrop='static' className='search-modal'>
                <Modal.Body>
                  <h1 className='submit-title'>Let&apos;s save your search</h1>
                  <p className='submit-detail'>Once you have saved this search, you can view the results against it at any time.</p>
                  <h3 className='submit-name'>Name of search</h3>
                  <div className='search-name'>
                    {/* <h4>Name</h4> */}
                    <input type="text" name='search_name' className='submit-input' onChange={handleChange} />
                    <Link to={'/wittle-results'}><button className='next' onClick={handleSubmit}> Submit</button></Link>
                  </div>
                </Modal.Body>
              </Modal>

              {/* Modal for no access */}
              <Modal show={noAccess} onHide={accessClose} backdrop='static' className='access-modal'>
                <Modal.Body>
                  <h1 className='submit-title'>Oops! You need an account to complete a search</h1>
                  <p className='submit-detail'>Log in or register for access to all Wittle content</p>
                  <div className='search-name'>
                    <button className='next' onClick={accessClose}>Close</button>
                    <div className='submission'>
                      <button id='login' className='next' onClick={loginLogic}>Login</button>
                      <button className='next' onClick={handleRegisterShow}>Register</button>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>

              {/* Modal for regitration when no access */}
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
          </section>
        </section>
      </section>

    </>
  )

}

export default PropertyDetailsWittle