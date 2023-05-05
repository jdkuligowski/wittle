import { useParams, useNavigate, Link } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'


const ProfileSidebar = ({ setProfileDetail, searchSide, setProfileContent, livingSide, adminSide, setSearchSide, setLivingSide, setAdminSide, setViewport }) => {



  // state to enable navigation between pages
  const navigate = useNavigate()


  return (
    <>
      <section className='profile-sidebar-open'>
        <div className='logo'>
          <h2 onClick={() => navigate('/')}>Wittle</h2>
        </div>
        <div className='profile-buttons'>
          <div className='profile-button-title'>
            <h2 onClick={() => {
              setProfileDetail('Profile')
              setProfileContent('Profile')
            }}>🧘‍♂️ Wittle Home</h2>
          </div>
          <div className='profile-button-title' id='second-title'>
            <h2 onClick={() => {
              setProfileContent('Search')
              setSearchSide(!searchSide)
            }
            }>🔎 Wittle Search</h2>
            {searchSide ? <h4>v</h4> : <h4>^</h4>}
          </div>
          {searchSide ?
            <div className='profile-button-sub'>
              <h3 onClick={() => setProfileDetail('Wittle search')}>🏠 Wittle search</h3>
              <h3 onClick={() => setProfileDetail('Property search')}>🔎 Property search</h3>
              <h3 onClick={() => setProfileDetail('Saved properties')}>🤍 Saved properties</h3>
              <h3 onClick={() => setProfileDetail('Saved searches')}>🔎 Saved searches</h3>
              <h3 onClick={() => setProfileDetail('Property comparison')}>🧐 Property comparison</h3>
            </div>
            :
            ''}
          <div className='profile-button-title' id='second-title'>
            <h2 onClick={() => {
              setProfileContent('Lifestyle')
              setLivingSide(!livingSide)
            }
            }>🏠 Wittle Lifestyle</h2>
            {livingSide ? <h4>v</h4> : <h4>^</h4>}
          </div>
          {livingSide ?
            <div className='profile-button-sub'>
              <h3 onClick={() => {
                setViewport({
                  latitude: 51.515419,
                  longitude: -0.141099,
                  zoom: 11.5,
                })
                setProfileDetail('Lifestyle search')
              }
              }>💃 Find something</h3>
              <h3 onClick={() => setProfileDetail('List')}>📱 Saved items</h3>
              <h3 onClick={() => setProfileDetail('Lifestyle insights')}>🏠 Insights</h3>
            </div>
            :
            ''}
          <div className='profile-button-title' id='second-title'>
            <h2 onClick={() => {
              setProfileContent('Admin')
              setAdminSide(!adminSide)
            }}>🏠 Wittle Admin</h2>
            {adminSide ? <h4>v</h4> : <h4>^</h4>}
          </div>
          {adminSide ?
            <div className='profile-button-sub'>
              <h3 onClick={() => setProfileDetail('Admin dashboard')}>💃 Dashboard</h3>
              <h3 onClick={() => setProfileDetail('Admin opportunities')}>📱 Opportunities </h3>
            </div>
            :
            ''}
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

export default ProfileSidebar