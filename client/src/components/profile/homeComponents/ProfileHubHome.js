import { useParams, useNavigate, Link } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { isUserAuth, getAccessToken, getUserToken } from '../../auth/Auth'
import LivingSignup from '../../helpers/modals/LivingSignup'




const ProfileHubHome = ({ userData, setProfileDetail, favouriteProperties, propertySearch }) => {

  // set state for showing wittle living signup
  const [livingRegisterShow, setLivingResgisterShow] = useState(false)

  // close modal
  const handleLivingRegisterClose = () => {
    setLivingResgisterShow(false)
  }

  // show living modal
  const handleLivingRegisterShow = () => {
    setLivingResgisterShow(true)
  }



  return (
    <>
      {isUserAuth() ?

        <div className='profile-top' >
          <div className='profile-intro'>
            <h1 className='profile-name'>👋 {userData ? userData.first_name : ''}</h1>
            <p className='profile-bio'>Welcome to Wittle</p>
          </div>
          <div className='top-insights'>
            <div onClick={() => setProfileDetail('Saved properties')} className='box-insights'>
              <h1>{favouriteProperties ? favouriteProperties.length : ''}</h1>
              <p>Saved properties</p>
            </div>
            <div onClick={() => setProfileDetail('Saved searches')} className='box-insights'>
              <h1>{propertySearch ? propertySearch.length : ''}</h1>
              <p>Saved searches</p>
            </div>
            <div onClick={() => setProfileDetail('Admin')} className='box-insights'>
              <h1>£1,300</h1>
              <p>Monthly bills</p>
            </div>
            <div onClick={() => setProfileDetail('Lifestyle portal')} className='box-insights'>
              <h1>3</h1>
              <p>Saved locations</p>
            </div>
          </div>
        </div >

        :
        <>
          <div className='profile-top'>
            <div className='profile-intro'>
              <h1 className='profile-name'>👋 Welcome to Wittle</h1>
              <p className='profile-bio'>Unlock some amazing additional features by setting up your account</p>
              <button onClick={handleLivingRegisterShow}>Finalise account</button>
            </div>
            <div className='top-insights'>
              <div className='box-insights'>
                <h1>0</h1>
                <p>Saved properties</p>
              </div>
              <div className='box-insights'>
                <h1>0</h1>
                <p>Saved searches</p>
              </div>
              <div className='box-insights'>
                <h1>£0</h1>
                <p>Monthly bills</p>
              </div>
              <div className='box-insights'>
                <h1>0</h1>
                <p>Saved locations</p>
              </div>
            </div>
          </div>
          <div className='profile-bottom'>
            <h3>Check out Wittle&apos;s features</h3>
            <p>By registering for a free account, you can unlock some cool features</p>
            <div className='comparison-table'>
              <div className='title-row'>
                <h4 className='feature'>Feature</h4>
                <h4 className='detail'>Account</h4>
                <h4 className='detail'>No account</h4>
              </div>
              <div className='body-row'>
                <h4 className='feature'>Property search</h4>
                <div className='detail'>
                  <h4 id='tick'></h4>
                </div>
                <div className='detail'>
                  <h4 id='tick'></h4>
                </div>
              </div>
              <div className='body-row'>
                <h4 className='feature'>Wittle search</h4>
                <div className='detail'>
                  <h4 id='tick'></h4>
                </div>
                <div className='detail'>
                  <h4 id='tick'></h4>
                </div>
              </div>
              <div className='body-row'>
                <h4 className='feature'>Lifestyle search</h4>
                <div className='detail'>
                  <h4 id='tick'></h4>
                </div>
                <div className='detail'>
                  <h4 id='tick'></h4>
                </div>
              </div>
              <div className='body-row'>
                <h4 className='feature'>Save Wittle searches</h4>
                <div className='detail'>
                  <h4 id='tick'></h4>
                </div>
                <div className='detail'>
                  <h4 id='cross'></h4>
                </div>
              </div>
              <div className='body-row'>
                <h4 className='feature'>Save properties</h4>
                <div className='detail'>
                  <h4 id='tick'></h4>
                </div>
                <div className='detail'>
                  <h4 id='cross'></h4>
                </div>
              </div>
              <div className='body-row'>
                <h4 className='feature'>Compare properties</h4>
                <div className='detail'>
                  <h4 id='tick'></h4>
                </div>
                <div className='detail'>
                  <h4 id='cross'></h4>
                </div>
              </div>
              <div className='body-row'>
                <h4 className='feature'>Save lifestyle items</h4>
                <div className='detail'>
                  <h4 id='tick'></h4>
                </div>
                <div className='detail'>
                  <h4 id='cross'></h4>
                </div>
              </div>
              <div className='body-row'>
                <h4 className='feature'>Track monthly bills</h4>
                <div className='detail'>
                  <h4 id='tick'></h4>
                </div>
                <div className='detail'>
                  <h4 id='cross'></h4>
                </div>
              </div>
              <div className='body-row'>
                <h4 className='feature'>Saving tips</h4>
                <div className='detail'>
                  <h4 id='tick'></h4>
                </div>
                <div className='detail'>
                  <h4 id='cross'></h4>
                </div>
              </div>
              <div className='body-row'>
                <h4 className='feature'>Weekly newsletter</h4>
                <div className='detail'>
                  <h4 id='tick'></h4>
                </div>
                <div className='detail'>
                  <h4 id='cross'></h4>
                </div>
              </div>
            </div>
          </div>
        </>
      }
      <LivingSignup
        livingRegisterShow={livingRegisterShow}
        handleLivingRegisterClose={handleLivingRegisterClose}
      />
    </>


  )
}

export default ProfileHubHome