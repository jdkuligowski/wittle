import { useParams, useNavigate, Link } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'


const WhiteSidebar = ({ setProfileDetail, variableSide, setProfileContent, setVariableSide, userData }) => {



  // state to enable navigation between pages
  const navigate = useNavigate()


  return (
    <>
      <section className='profile-sidebar-open no-print remove-margin'>
        <div className='logo'>
          <h2 onClick={() => navigate('/')}>Wittle</h2>
        </div>
        <div className='profile-buttons'>
          <div className='profile-button-title'>
            <h2 onClick={() => {
              setProfileDetail('My properties')
              setProfileContent('My properties')
              navigate('/agents/profile')
            }}>🧘‍♂️ My properties</h2>
          </div>
          <div className='profile-button-title' id='second-title'>
            <h2 onClick={() => {
              setProfileContent('Variables')
              setProfileDetail('Variables')
              setVariableSide(!variableSide)
              navigate('/agents/explore')
            }
            }>🔎 Explore</h2>
            {variableSide ? <h4>v</h4> : <h4>^</h4>}
          </div>
          {variableSide ?
            <div className='profile-button-sub'>
              <h3 onClick={() => setProfileDetail('Primary schools')}>🏫 Primary schools</h3>
              <h3 onClick={() => setProfileDetail('Secondary schools')}>👨‍🏫 Secondary schools</h3>
              <h3 onClick={() => setProfileDetail('Restaurants')}>🍽 Restaurants </h3>
              <h3 onClick={() => setProfileDetail('Fitness')}>🏋️‍♂️ Fitness </h3>
              <h3 onClick={() => setProfileDetail('Supermarkets')}>🛒 Supermarkets </h3>
              <h3 onClick={() => setProfileDetail('EVs')}>⛽️ EVs </h3>
              {/* <h3 onClick={() => setProfileDetail('6th forms')}>🎓 6th forms</h3> */}
              {/* <h3 onClick={() => setProfileDetail('Saved searches')}>🔎 Saved searches</h3>
              <h3 onClick={() => setProfileDetail('Property comparison')}>🧐 Property comparison</h3> */}
            </div>
            :
            ''}
          <div className='profile-button-title' id='second-title'>
            <h2 onClick={() => {
              setProfileContent('Comparison')
              setProfileDetail('Comparison')
              navigate('/agents/compare')
            }}>↔️ Comparison</h2>
          </div>
          <div className='profile-button-title' id='second-title'>
            <h2 onClick={() => {
              setProfileContent('Account')
              setProfileDetail('Account')
            }}>🖥 Account details</h2>
          </div>
        </div>
      </section>
    </>
  )
}

export default WhiteSidebar