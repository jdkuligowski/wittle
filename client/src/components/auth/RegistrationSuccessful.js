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
import { loadStripe } from '@stripe/stripe-js'




const RegistrationSuccessful = () => {

  const navigate = useNavigate()

  // Function for setting user token to local storage
  const setUserTokenToLocalStorage = (token) => {
    window.localStorage.setItem('wittle-user-token', token)
  }

  useEffect(() => {
    const fetchToken = async () => {
      const params = new URLSearchParams(window.location.search)
      const tempTokenId = params.get('identifier')

      if (tempTokenId) {
        try {
          const response = await axios.get(`/api/get-token/${tempTokenId}`)
          const { token } = response.data
          localStorage.setItem('wittle-user-token', token)
          navigate('/agents/profile')
        } catch (error) {
          console.error('Failed to fetch token:', error)
          navigate('/login')
        }
      } else {
        console.error('No identifier provided')
        navigate('/login')
      }
    }

    fetchToken()
  }, [navigate])

  // Get cookie implementation remains same as before
  function getCookie(name) {
    name = name.replace(/([.$?*|{}()[]\\\/+^])/g, '\\$1')
    const regex = new RegExp('(?:^|; )' + name + '=([^;]*)')
    const matches = document.cookie.match(regex)
    return matches ? decodeURIComponent(matches[1]) : undefined
  }


  return (

    <>

    </>
  )
}

export default RegistrationSuccessful