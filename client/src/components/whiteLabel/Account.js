import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import NavBarRevised from '../tools/NavBarRevised'
import WhiteNavbar from '../tools/WhiteNavbar'
import WhiteSidebar from './WhiteSidebar'
import { getAccessToken, getUserToken, isUserAuth } from '../auth/Auth'






const Account = () => {

  // state to enable navigation between pages
  const navigate = useNavigate()

  // state for determining what content shows
  const [profileContent, setProfileContent] = useState('My saved items')
  const [profileDetail, setProfileDetail] = useState('My saved items')

  // states for pop outs on the side
  const [variableSide, setVariableSide] = useState(false)

  // set state for user data
  const [userData, setUserData] = useState()

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

  // remove login token from storage
  const removeItemFromStorage = (token) => {
    localStorage.removeItem('wittle-user-token')
    localStorage.removeItem('wittle-username')
    // window.location.reload()

    navigate('/login')
  }

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
          variableSide={variableSide}
          setProfileContent={setProfileContent}
          setVariableSide={setVariableSide}
        />
        <section className='main-body'>
          <section className='main-body-details'  >
            <section className='account-section'>
              <div className='listing-options'>
                <div className='listing-buttons'>
                </div>
                <div className='logout-button' onClick={removeItemFromStorage}>
                  <div className='logout-icon'></div>
                </div>


              </div>
              <hr className='title-line' />
              {userData ?
                <div className='details-section'>
                  <h3 className='sub-title'>Account info</h3>
                  <div className='info-block'>
                    <h5 className='title'>Name: </h5>
                    <h5 className='detail'>{userData.first_name} {userData.last_name}</h5>
                  </div>
                  <div className='info-block'>
                    <h5 className='title'>Username: </h5>
                    <h5 className='detail'>{userData.username}</h5>
                  </div>
                  <div className='info-block'>
                    <h5 className='title'>Email: </h5>
                    <h5 className='detail'>{userData.email}</h5>
                  </div>
                  <div className='info-block'>
                    <h5 className='title'>Package: </h5>
                    <h5 className='detail'>{userData.usage_stats[0].package}</h5>
                  </div>

                  <h3 className='sub-title second'>Account stats</h3>
                  <div className='info-block'>
                    <h5 className='title'>Property finder searches this month: </h5>
                    <h5 className='detail'>{userData.usage_stats[0].epc_monthly_count}</h5>
                  </div>
                  <div className='info-block'>
                    <h5 className='title'>Searches until next product tier: </h5>
                    <h5 className='detail'>{userData.usage_stats[0].package === 'Unlimited' ? 'No limit' : userData.usage_stats[0].package === 'Advanced Pilot' ? 100 - userData.usage_stats[0].epc_monthly_count : userData.usage_stats[0].package === 'Basic' ? 10 - userData.usage_stats[0].epc_monthly_count : ''}</h5>
                  </div>
                  <div className='info-block'>
                    <h5 className='title'>Listing related searches this month: </h5>
                    <h5 className='detail'>{userData.usage_stats[0].listing_monthly_count}</h5>
                  </div>
                  <div className='info-block'>
                    <h5 className='title'>Searches until next product tier: </h5>
                    <h5 className='detail'>{userData.usage_stats[0].package === 'Unlimited' ? 'No limit' : userData.usage_stats[0].package === 'Advanced Pilot' ? 100 - userData.usage_stats[0].listing_monthly_count : userData.usage_stats[0].package === 'Basic' ? 10 - userData.usage_stats[0].listing_monthly_count : ''}</h5>
                  </div>
                </div>

                : ''}

            </section>
          </section>
        </section>

      </section>

    </>
  )
}

export default Account