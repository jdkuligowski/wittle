import React, { useState, useEffect, useRef } from 'react'


const ProfileMobileSlider = ({ setProfileContent, profileContent, profileDetail, setProfileDetail }) => {

  return (
    <>
      <div className='mobile-selector-section'>
        <div className='mobile-title-slider'>
          {profileContent === 'Search' ?
            <>
              <h2 className='pills' onClick={() => setProfileDetail('Wittle search')} style={{ fontWeight: profileDetail === 'Wittle search' ? '700' : '500', backgroundColor: profileDetail === 'Wittle search' ? '#FFA7E5' : 'rgba(255, 167, 229, 0.1)' }}>Wittle search</h2>
              <h2 className='pills' onClick={() => setProfileDetail('Property search')} style={{ fontWeight: profileDetail === 'Property search' ? '700' : '500', backgroundColor: profileDetail === 'Property search' ? '#FFA7E5' : 'rgba(255, 167, 229, 0.1)' }}>Property search</h2>
              <h2 className='pills' onClick={() => setProfileDetail('Saved properties')} style={{ fontWeight: profileDetail === 'Saved properties' ? '700' : '500', backgroundColor: profileDetail === 'Saved properties' ? '#FFA7E5' : 'rgba(255, 167, 229, 0.1)' }}>Saved properties</h2>
              <h2 className='pills' onClick={() => setProfileDetail('Saved searches')} style={{ fontWeight: profileDetail === 'Saved searches' ? '700' : '500', backgroundColor: profileDetail === 'Saved searches' ? '#FFA7E5' : 'rgba(255, 167, 229, 0.1)' }}>Saved searches</h2>
              <h2 className='pills' onClick={() => setProfileDetail('Property comparison')} style={{ fontWeight: profileDetail === 'Property comparison' ? '700' : '500', backgroundColor: profileDetail === 'Property comparison' ? '#FFA7E5' : 'rgba(255, 167, 229, 0.1)' }}>Property comparison</h2>
            </>
            :
            profileContent === 'Lifestyle' ?
              <>
                <h2 className='pills' onClick={() => setProfileDetail('Lifestyle search')} style={{ fontWeight: profileDetail === 'Lifestyle search' ? '700' : '500', backgroundColor: profileDetail === 'Lifestyle search' ? '#FFA7E5' : 'rgba(255, 167, 229, 0.1)' }}>Search</h2>
                <h2 className='pills' onClick={() => setProfileDetail('List')} style={{ fontWeight: profileDetail === 'List' ? '700' : '500', backgroundColor: profileDetail === 'List' ? '#FFA7E5' : 'rgba(255, 167, 229, 0.1)' }}>Saved places</h2>
                <h2 className='pills' onClick={() => setProfileDetail('Lifestyle insights')} style={{ fontWeight: profileDetail === 'Lifestyle insights' ? '700' : '500', backgroundColor: profileDetail === 'Lifestyle insights' ? '#FFA7E5' : 'rgba(255, 167, 229, 0.1)' }}>Insights</h2>
              </>
              :
              profileContent === 'Admin' ?
                <>
                  <h2 className='pills' onClick={() => setProfileDetail('Admin dashboard')} style={{ fontWeight: profileDetail === 'Admin dashboard' ? '700' : '500', backgroundColor: profileDetail === 'Admin dashboard' ? '#FFA7E5' : 'rgba(255, 167, 229, 0.1)' }}>Dashboard</h2>
                  <h2 className='pills' onClick={() => setProfileDetail('Admin opportunities')} style={{ fontWeight: profileDetail === 'Admin opportunities' ? '700' : '500', backgroundColor: profileDetail === 'Admin opportunities' ? '#FFA7E5' : 'rgba(255, 167, 229, 0.1)' }}>Opportunity</h2>
                </>
                :
                ''
          }
        </div>
        {/* } */}
      </div>


    </>
  )
}

export default ProfileMobileSlider