import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getUserToken, isUserAuth, getAccessToken } from '../auth/Auth'
import NavBar from '../tools/NavBar'
import { Modal } from 'react-bootstrap'



const AccessDenied = () => {

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
      <section className='denied-page'>
        <NavBar />
        <section className='denied-section'>
          <div className='no-access-body'>
            <div className='no-access-image'></div>
            <h1 className='no-access-title'>Oops! Dead end</h1>
            <h3 className='no-access-message'>Your session has timed out. Log back in to unlock the Wittle magic 🪄</h3>
            <button onClick={() => navigate('/login')}>Agent login</button>
          </div>
        </section>
      </section>
    </>

  )
}

export default AccessDenied