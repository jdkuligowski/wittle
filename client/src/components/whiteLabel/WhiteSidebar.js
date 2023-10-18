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

  return (
    <>
      <section className='profile-sidebar-open no-print remove-margin'>
        <div className='logo'>
          <h2 onClick={() => navigate('/')}>Wittle</h2>
        </div>
        <div className='profile-buttons'>
          <div className='profile-button-title' >
            <h2 onClick={() => {
              setProfileDetail('Home')
              setProfileContent('Home')
              navigate('/agents/profile')
            }}>🧘‍♂️ Wittle home</h2>
          </div>
          <div className='profile-button-title' id='second-title'>
            <h2 onClick={() => {
              setProfileDetail('My things')
              setProfileContent('My things')
              navigate('/agents/favourites')
            }}>🏡 My things</h2>
          </div>
          {/* <div className='profile-button-title' id='second-title'>
            <h2 onClick={() => {
              setProfileDetail('My properties')
              setProfileContent('My properties')
              navigate('/agents/properties')
            }}>🏡 My property list</h2>
          </div> */}
          <div className='profile-button-title' id='second-title'>
            <h2 onClick={() => {
              setProfileDetail('Listing generator')
              setProfileContent('Listing generator')
              navigate('/agents/listing-generator')
            }}>🧠 Listing generator</h2>
          </div>
          {userData && (userData.id === 1 || userData.id === 55) ?
            <div className='profile-button-title' id='second-title'>
              <h2 onClick={() => {
                setProfileDetail('AI listing generator')
                setProfileContent('AI listing generator')
                navigate('/agents/ai-listing-generator')
              }}>🧠 AI Listing generator</h2>
            </div>
            : ''
          }
          {/* <div className='profile-button-title' id='second-title'>
            <h2 onClick={() => {
              setProfileContent('Variables')
              setProfileDetail('Variables')
              setVariableSide(!variableSide)
              navigate('/agents/explore')
            }
            }>🔎 Explore</h2>
            {variableSide ? <h4>v</h4> : <h4>^</h4>}
          </div> */}

          {/* <div className='profile-button-sub'>
            <h3 onClick={() => setProfileDetail('Primary schools')}>🏫 Primary schools</h3>
            <h3 onClick={() => setProfileDetail('Secondary schools')}>👨‍🏫 Secondary schools</h3>
            <h3 onClick={() => setProfileDetail('Restaurants')}>🍽 Restaurants </h3>
            <h3 onClick={() => setProfileDetail('Pubs')}>🍺 Pubs </h3>
            <h3 onClick={() => setProfileDetail('Fitness')}>🏋️‍♂️ Fitness </h3>
            <h3 onClick={() => setProfileDetail('Supermarkets')}>🛒 Supermarkets </h3>
            <h3 onClick={() => setProfileDetail('EVs')}>⛽️ EVs </h3>

          </div> */}
          {/* <div className='profile-button-title' id='second-title'>
            <h2 onClick={() => {
              setProfileContent('Comparison')
              setProfileDetail('Comparison')
              navigate('/agents/compare')
            }}>↔️ Comparison</h2>
          </div> */}
          <div className='profile-button-title' id='second-title'>
            <h2 onClick={() => {
              setProfileContent('Property finder')
              setProfileDetail('Property finder')
              navigate('/agents/finder')
            }}>🔎 Property finder</h2>
          </div>
          {/* <div className='profile-button-title' id='second-title'>
            <h2 onClick={() => {
              setProfileContent('Account')
              setProfileDetail('Account')
            }}>🖥 Account details</h2>
          </div> */}
        </div>
      </section>
    </>
  )
}

export default WhiteSidebar