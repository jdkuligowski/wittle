import { useParams, useNavigate, Link } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { isUserAuth, getAccessToken, getUserToken } from '../auth/Auth'
import NavBar from '../tools/NavBar'
import Dropdown from 'react-dropdown'





const ProfileMobileSlider = ({ setProfileContent, profileContent }) => {

  const dropdownList = ['Saved properties', 'Saved searches', 'Property comparison', 'Lifestyle portal', 'Admin portal', 'Property market', 'Account']


  return (
    <>
      <div className='mobile-selector-section'>
        {/* {profileContent === '🧐 What do you want to do?' ?
          <>
            <div className='mobile-title-dropdown'>
              <Dropdown
                options={dropdownList}
                value={profileContent}
                onChange={(selected) => setProfileContent(selected.value)}
              />
            </div>
          </>
          : */}
        <div className='mobile-title-slider'>
          {<h2 className='pills' onClick={() => setProfileContent('🧐 What do you want to do?')} style={{ fontWeight: profileContent === '🧐 What do you want to do?' ? '700' : '500', backgroundColor: profileContent === '🧐 What do you want to do?' ? '#FFA7E5' : 'rgba(255, 167, 229, 0.1)' }}>Wittle Home</h2>}
          {<h2 className='pills' onClick={() => setProfileContent('Saved properties')} style={{ fontWeight: profileContent === 'Saved properties' ? '700' : '500', backgroundColor: profileContent === 'Saved properties' ? '#FFA7E5' : 'rgba(255, 167, 229, 0.1)' }}>Saved properties</h2>}
          {<h2 className='pills' onClick={() => setProfileContent('Saved searches')} style={{ fontWeight: profileContent === 'Saved searches' ? '700' : '500', backgroundColor: profileContent === 'Saved searches' ? '#FFA7E5' : 'rgba(255, 167, 229, 0.1)' }}>Saved searches</h2>}
          {<h2 className='pills' onClick={() => setProfileContent('Property comparison')} style={{ fontWeight: profileContent === 'Property comparison' ? '700' : '500', backgroundColor: profileContent === 'Property comparison' ? '#FFA7E5' : 'rgba(255, 167, 229, 0.1)' }}>Property comparison</h2>}
          {<h2 className='pills' onClick={() => setProfileContent('Lifestyle portal')} style={{ fontWeight: profileContent === 'Lifestyle portal' ? '700' : '500', backgroundColor: profileContent === 'Lifestyle portal' ? '#FFA7E5' : 'rgba(255, 167, 229, 0.1)' }}>Lifestyle portal</h2>}
          {<h2 className='pills' onClick={() => setProfileContent('Admin')} style={{ fontWeight: profileContent === 'Admin' ? '700' : '500', backgroundColor: profileContent === 'Admin' ? '#FFA7E5' : 'rgba(255, 167, 229, 0.1)' }}>Admin portal</h2>}
          {/* {<h2 className='pills' onClick={() => setProfileContent('Property market')} style={{ fontWeight: profileContent === 'Property market' ? '700' : '500', backgroundColor: profileContent === 'Property market' ? '#FFA7E5' : 'rgba(255, 167, 229, 0.1)' }}>Local property search</h2>} */}
          {/* {<h2 className='pills' onClick={() => setProfileContent('Account')} style={{ fontWeight: profileContent === 'Account' ? '700' : '500', backgroundColor: profileContent === 'Account' ? '#FFA7E5' : 'rgba(255, 167, 229, 0.1)' }}>Account</h2>} */}

        </div>
        {/* } */}
      </div>


    </>
  )
}

export default ProfileMobileSlider