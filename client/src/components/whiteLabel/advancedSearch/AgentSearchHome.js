
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { isUserAuth, getUserToken, getAccessToken } from '../../auth/Auth'



const AgentSearchHome = ({ setSearchSelection }) => {


  return (

    <>
      <section className='agent-search-home'>
        <h1 className='title'>Wittle property search</h1>
        <h3 className='sub-title'>Wittle&apos;s property search is a new way to find properties. Scan your properties and the wider market based on your client&apos;s requirements. Tailor searches to lifestyle needs, properrty size or within school catchments</h3>
        <div className='search-options'>
          <div className='search-option' onClick={() => setSearchSelection('Client view')}>
            <div className='search-image' id='personal'></div>
            <h3>Client search</h3>
            <p>Search and save properties that suit your clients&apos; needs.</p>
          </div>
          <div className='search-option' onClick={() => setSearchSelection('Personal view')}>
            <div className='search-image' id='client'></div>
            <h3>Personal search</h3>
            <p>Browse search functionality freely to test how it works for you.</p>
          </div>
        </div>
      </section>
    </>

  )
}


export default AgentSearchHome