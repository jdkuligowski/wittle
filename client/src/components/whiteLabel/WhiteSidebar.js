import { useParams, useNavigate, Link } from 'react-router-dom'
import React, { useState, useEffect, useContext } from 'react'
import { getAccessToken, getUserToken, isUserAuth } from '../auth/Auth'
import axios from 'axios'
import { eventBus } from '../../utils/EventBus'

const WhiteSidebar = ({ setProfileDetail, variableSide, setProfileContent, setVariableSide }) => {



  // state to enable navigation between pages
  const navigate = useNavigate()

  // userdata state
  const [userData, setUserData] = useState()

  // errors
  const [errors, setErrors] = useState()


  const [activeItem, setActiveItem] = useState('')

  // state for changing the view to insights results
  const [insightView, setInsightView] = useState('Search')


  const [leadGenRemaining, setLeadGenRemaining] = useState(0)

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
          if (data.usage_stats && data.usage_stats[0].package === 'Free') {
            const limit = 20 // Assuming a limit of 200 for free users
            const used = data.usage_stats[0].save_lead_gen_month_total
            setLeadGenRemaining(limit - used)
          } else if (data.usage_stats && data.usage_stats[0].package === 'Boost') {
            const limit = 250 // Assuming a limit of 200 for free users
            const used = data.usage_stats[0].save_lead_gen_month_total
            setLeadGenRemaining(limit - used)
          }
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

  // useEffect(() => {
  //   setTimeout(() => {
  //     if (activeItem === 'Home') {
  //       navigate('/agents/profile')
  //     } else if (activeItem === 'Saved items') {
  //       navigate('/agents/favourites')
  //     }
  //     // ... other conditions
  //   }, 100)
  // }, [activeItem])


  useEffect(() => {
    const updateUserData = () => {
      loadUserData() // Call the function to refresh user data in the sidebar
    }

    // Listen for the userDataUpdated event
    eventBus.on('userDataUpdated', updateUserData)

    // Clean up the listener when the component unmounts
    return () => {
      eventBus.off('userDataUpdated', updateUserData)
    }
  }, [])




  return (
    <>
      <section className='profile-sidebar-open no-print remove-margin'>
        <div className='logo-section'>
          <div className='logo' onClick={() => navigate('/')}>
            {/* <h2 onClick={() => navigate('/')}>Wittle</h2> */}
          </div>
        </div>


        <div className='profile-buttons'>
          <div className={`profile-button-title ${activeItem === 'Home' ? 'active' : ''}`}
            onClick={() => {
              setActiveItem('Home')
              setProfileDetail('Home')
              setProfileContent('Home')
            }}>
            <div className='icon' id='home-icon' ></div>
            <h2>Wittle home</h2>
          </div>
          <div className={`profile-button-title ${activeItem === 'Listing generator' ? 'active' : ''}`}
            onClick={() => {
              setActiveItem('Listing generator')
              setProfileDetail('Listing generator')
              setProfileContent('Listing generator')
              navigate('/agents/listing-generator')
            }}>
            <div className='icon' id='listing-icon'></div>
            <h2>Listing generator</h2>
          </div>
          <div className={`profile-button-title ${activeItem === 'Lead generator test' ? 'active' : ''}`}
            onClick={() => {
              setActiveItem('Lead generator test')
              setProfileContent('Lead generator test')
              setProfileDetail('Lead generator test')
              navigate('/agents/lead-gen')
            }}>
            <div className='icon' id='finder-icon'></div>
            <h2>Lead generator</h2>
          </div>
          <div className={`profile-button-title ${activeItem === 'Property search' ? 'active' : ''}`}
            onClick={() => {
              setActiveItem('Property search')
              setProfileContent('Property search')
              setProfileDetail('Property search')
              navigate('/agents/wittle-search')
            }}>
            <div className='icon' id='search-icon'></div>
            <h2>Wittle search</h2>
          </div>
          <div className={`profile-button-title ${activeItem === 'How to guide' ? 'active' : ''}`}
            onClick={() => {
              setActiveItem('How to guide')
              setProfileContent('How to guide')
              setProfileDetail('How to guide')
              navigate('/agents/guide')
            }}>
            <div className='icon' id='help-icon'></div>
            <h2>How-to guide</h2>
          </div>
          <div className={`profile-button-title ${activeItem === 'Account' ? 'active' : ''}`}
            onClick={() => {
              setActiveItem('Account')
              setProfileContent('Account')
              setProfileDetail('Account')
              navigate('/agents/account')
            }}>
            <div className='icon' id='account-icon'></div>
            <h2>Account details</h2>
          </div>

        </div>
        {userData && userData.usage_stats && userData.usage_stats[0] && userData.usage_stats[0].package === 'Free' ? (
          <>
            <div className='progress-section'>
              <div className="progress-container">
                <div className="progress-bar" style={{ width: `${((leadGenRemaining / 20) * 100).toFixed(0)}%` }}></div>
              </div>
              <p className='leads-remaining'>{leadGenRemaining} leads remaining</p>
            </div>
          </>
        )
          : userData && userData.usage_stats && userData.usage_stats[0] && userData.usage_stats[0].package === 'Boost' ?
            <>
              <div className='progress-section'>
                <div className="progress-container">
                  <div className="progress-bar" style={{ width: `${((leadGenRemaining / 250) * 100).toFixed(0)}%` }}></div>
                </div>
                <p className='leads-remaining'>{leadGenRemaining} leads remaining</p>
              </div>
            </>

            : ''
        }

      </section>
    </>
  )
}

export default WhiteSidebar