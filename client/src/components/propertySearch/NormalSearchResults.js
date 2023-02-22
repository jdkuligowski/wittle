import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getUserToken, getAccessToken, isUserAuth } from '../auth/Auth'
import { NumericFormat } from 'react-number-format'
import NavBar from '../tools/NavBar'


const NormalSearchResults = () => {

  // state to enable navigation between pages
  const navigate = useNavigate()



  return (
    <section className='property-detail-pages'>
      <NavBar />
      <section className='normal-results-page'>
        <h1>Normal property search coming soon...</h1>
        <h3>But you&apos;ve still got the power of Wittle at your fingertips</h3>
        <button onClick={() => navigate('/wittle-search')}>Start Wittling</button>
      </section>
    </section>
  )
}

export default NormalSearchResults