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
          <section className='main-body'>
            <section className='main-body-details'>

              <section className='profile-summary'>
                <div className='welcome'>
                  <>
                    <h1>Welcome back <span>{userData ? userData.first_name : ''}!</span></h1>
                    {userData && userData.usage_stats[0].package === 'Trial expired' ? <h3>Your trial period has ended, please get in touch to upgrade your plan.</h3> : <h3>Thanks for being part of Wittle! Please keep us in the loop with how you&apos;re enjoying our products.</h3>}
                  </>


                </div>
              </section>
              <section className='product-section'>
                <div className='product-suite'>
                  <div className='product-card' onClick={() => navigate('/agents/listing-generator')}>
                    <div className='summary-icon' id='icon1'></div>
                    <h1>Property listing generator</h1>
                    <h3>Build a property listing in less than 2 minutes. Save hours of time curating your listings and get access to the data you need to attract buyers.</h3>
                  </div>
                  <div className='product-card' onClick={() => navigate('/agents/finder')}>
                    <div className='summary-icon' id='icon2'></div>
                    <h1>Lead generator</h1>
                    <h3>Find the full details about properties on the market in seconds. Everything you need to know about the properties you want on your books, helping you optimise your lead gen.</h3>
                  </div>
                  <div className='product-card' id='coming-soon'>
                    <div className='coming-soon-banner'>
                      <h3>Coming soon</h3>
                    </div>
                    <div className='summary-icon' id='icon3'></div>
                    <h1>Valuation guide</h1>
                    <h3>Get property valuation in seconds and see insights into what is driving the valuation.</h3>
                  </div>
                </div>
              </section>
            </section>
          </section>

        </>
      </section>




    </>



  )
}

export default WhiteHome