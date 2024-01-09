import { useNavigate, Link } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { isUserAuth, getUserToken, getAccessToken } from '../auth/Auth'
import Select from 'react-select'
import { Modal } from 'react-bootstrap'
import { GoogleLogin } from '@react-oauth/google'
import { isEmail, isLength, matches } from 'validator'
import MenuModal from '../helpers/modals/MenuModal'


const WhiteNavbar = ({ navbarColour }) => {

  // remove login token from storage
  const removeItemFromStorage = (token) => {
    localStorage.removeItem('wittle-user-token')
    localStorage.removeItem('wittle-username')
    window.location.reload()
  }

  // state to enable navigation between pages
  const navigate = useNavigate()


  return (
    <>
      <section className='nav-section no-print' style={{ backgroundColor: navbarColour }}>
        <div className='left-section'>
          <div className='logo'>
            <h2 onClick={() => navigate('/')}></h2>
            {/* <div className='logo-image'></div> */}
          </div>
        </div>
    
        {isUserAuth() ?
          <div className="menu-container" >
            <h3 className='cta' onClick={removeItemFromStorage}><a>Sign out</a></h3>
          </div>

          :
          <div className="menu-container" >
            <h3 className='cta' onClick={() => navigate('/login')}><a>Sign in</a></h3>
          </div>

        }
      </section>

    </>
  )

}

export default WhiteNavbar