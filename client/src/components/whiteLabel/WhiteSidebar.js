import { useParams, useNavigate, Link } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'
import { getAccessToken, getUserToken, isUserAuth } from '../auth/Auth'
import axios from 'axios'


const WhiteSidebar = ({ setProfileDetail, variableSide, setProfileContent, setVariableSide }) => {



  // state to enable navigation between pages
  const navigate = useNavigate()

  // userdata state
  const [userData, setUserData] = useState()

  // errors
  const [errors, setErrors] = useState()


  const [activeItem, setActiveItem] = useState('')

  

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
  
  useEffect(() => {
    setTimeout(() => {
      if (activeItem === 'Home') {
        navigate('/agents/profile')
      } else if (activeItem === 'Saved items') {
        navigate('/agents/favourites')
      }
      // ... other conditions
    }, 100)
  },[activeItem])




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
              setTimeout(() => {
                setProfileDetail('Home')
                setProfileContent('Home')
              }, 0)
            }}>
            <div className='icon' id='home-icon' ></div>
            <h2>Wittle home</h2>
          </div>
          <div className={`profile-button-title ${activeItem === 'Saved items' ? 'active' : ''}`}
            onClick={() => {
              setActiveItem('Saved items')
              setTimeout(() => {
                setProfileDetail('Saved items')
                setProfileContent('Saved items')
                // navigate('/agents/favourites')
              }, 0)
            }}>
            <div className='icon' id='saved-icon'></div>
            <h2 >My saved items</h2>
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
          <div className={`profile-button-title ${activeItem === 'AI listing generator' ? 'active' : ''}`}
            onClick={() => {
              setActiveItem('AI listing generator')
              setProfileDetail('AI listing generator')
              setProfileContent('AI listing generator')
              navigate('/agents/ai-listing-generator')
            }}>
            <div className='icon' id='ai-icon'></div>
            <h2>AI Listing generator</h2>
          </div>
          <div className={`profile-button-title ${activeItem === 'Property finder' ? 'active' : ''}`}
            onClick={() => {
              setActiveItem('Property finder')
              setProfileContent('Property finder')
              setProfileDetail('Property finder')
              navigate('/agents/finder')
            }}>
            <div className='icon' id='finder-icon'></div>
            <h2>Property finder</h2>
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




        {/* <div className='profile-buttons'>
          <div className='profile-button-title' >
            <h2 onClick={() => {
              setProfileDetail('Home')
              setProfileContent('Home')
              navigate('/agents/profile')
            }}>🧘‍♂️ Wittle home</h2>
          </div>
          <div className='profile-button-title' id='second-title'>
            <h2 onClick={() => {
              setProfileDetail('Saved items')
              setProfileContent('Saved items')
              navigate('/agents/favourites')
            }}>🏡 Saved items</h2>
          </div>
          <div className='profile-button-title' id='second-title'>
            <h2 onClick={() => {
              setProfileDetail('Listing generator')
              setProfileContent('Listing generator')
              navigate('/agents/listing-generator')
            }}>🧠 Listing generator</h2>
          </div>
          <div className='profile-button-title' id='second-title'>
            <h2 onClick={() => {
              setProfileDetail('AI listing generator')
              setProfileContent('AI listing generator')
              navigate('/agents/ai-listing-generator')
            }}>🧠 AI Listing generator</h2>
          </div>


          <div className='profile-button-title' id='second-title'>
            <h2 onClick={() => {
              setProfileContent('Property finder')
              setProfileDetail('Property finder')
              navigate('/agents/finder')
            }}>🔎 Property finder</h2>
          </div>
          <div className='profile-button-title' id='second-title'>
            <h2 onClick={() => {
              setProfileContent('Account')
              setProfileDetail('Account')
              navigate('/agents/account')

            }}>🖥 Account details</h2>
          </div>
        </div> */}
      </section>
    </>
  )
}

export default WhiteSidebar