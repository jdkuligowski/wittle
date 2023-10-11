import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { isUserAuth, getUserToken , getAccessToken } from '../auth/Auth'



import NavBarRevised from '../tools/NavBarRevised'
import WhiteNavbar from '../tools/WhiteNavbar'
import WhiteSidebar from './WhiteSidebar'





const WhiteHome = () => {

  // state to enable navigation between pages
  const navigate = useNavigate()

  // state for determining what content shows
  const [profileContent, setProfileContent] = useState('My properties')
  const [profileDetail, setProfileDetail] = useState('My properties')  

  // set state for user data
  const [userData, setUserData] = useState()

  // set state for company data
  const [companyData, setCompany] = useState()

  // set state for errors
  const [errors, setErrors] = useState()



  // ? Section 2: Load user information
  const loadUserData = () => {
    // Assuming the user is authorized, we want to load their profile information and set states based on relevant sections of this
    if (isUserAuth()) {
      const getUser = async () => {
        try {
          const { data } = await axios.get(`/api/auth/profile/${getUserToken()}/`, {
            headers: {
              Authorization: `Bearer ${getAccessToken()}`,
            },
          })
          console.log('user data ->', data)
          setUserData(data)
          setCompany(data.company)
          console.log('company ->', data.company)
        } catch (error) {
          setErrors(true)
          console.log(error)
        }
      }
      getUser()
    } else {
      navigate('/access-denied')
      console.log('no account')
    }
  }
  

  // carry out calculation to load user data
  useEffect(() => {
    loadUserData()
  }, [])

  return (

    <>
      <section className='agent-profile-page'>
        <div className='desktop-nav'>
          <WhiteNavbar
            navbarColour='#FDF7F0'
          />
        </div>
        <div className='mobile-nav'>
          <NavBarRevised
            setProfileContent={setProfileContent}
            profileContent={profileContent}
            profileDetail={profileDetail}
            setProfileDetail={setProfileDetail}
          />
        </div>
        <WhiteSidebar 
          setProfileDetail={setProfileDetail}
          setProfileContent={setProfileContent} 
        />
        {/* {profileContent === 'My properties' ? */}
        <>
          <section className='profile-summary'>
            <div className='welcome'>
              <>
                <h1>👋 Welcome back {userData ? userData.first_name : ''}</h1>
                <h3>Thanks for being part of the Wittle pilot! Please keep us in the loop with how you&apos;re enjoying our products.</h3>
              </>


            </div>
          </section>
          <section className='product-section'>
            <div className='product-suite'>
              <div className='product-card' onClick={() => navigate('/agents/properties')}>
                <h1>Property insights</h1>
                <div className='summary-icon' id='icon1'></div>
                <h3>Extract insights about any location in London to help populate your listings and enable great conversations with customers</h3>
                  
              </div>
              <div className='product-card' onClick={() => navigate('/agents/finder')}>
                <h1>Property address finder</h1>
                <div className='summary-icon' id='icon2'></div>
                <h3>Find the full address of properties on the market</h3>
              </div>
              <div className='product-card' id='coming-soon'>
                <h1>Property listing generator</h1>
                <div className='summary-icon' id='icon3'></div>
                <h3>Generate a listing based on property features and our lifestyle insights library</h3>
                <p>Coming soon!</p>
              </div>
            </div>
          </section>
        </>
      </section>




    </>



  )
}

export default WhiteHome