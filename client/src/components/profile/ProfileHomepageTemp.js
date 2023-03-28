import { useNavigate, Link } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { isUserAuth, getAccessToken } from '../auth/Auth'
import Select from 'react-select'
import NavBar from '../tools/NavBar'
import { Modal } from 'react-bootstrap'


const ProfileHomepageTemp = () => {



  return (
    <>
      <section className='profile-page'>
        <NavBar />
        <section className='holding-loading'>
          <h1>Your profile is getting a revamp, it&apos;ll be back soon...</h1>
        </section>
      </section>
    </>
  )
}

export default ProfileHomepageTemp