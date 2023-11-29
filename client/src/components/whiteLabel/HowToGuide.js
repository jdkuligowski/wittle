import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getUserToken, isUserAuth, getAccessToken } from '../auth/Auth'
import WhiteNavbar from '../tools/WhiteNavbar'
import NavBarRevised from '../tools/NavBarRevised'
import WhiteSidebar from './WhiteSidebar'



const HowToGuide = () => {

  // state to enable navigation between pages
  const navigate = useNavigate()


  // state for determining what content shows
  const [profileContent, setProfileContent] = useState('Comparison')
  const [profileDetail, setProfileDetail] = useState('Comparison')

  // states for pop outs on the side
  const [variableSide, setVariableSide] = useState(false)

  // set state for user
  const [userData, setUserData] = useState()

  // remove login token from storage
  const removeItemFromStorage = (token) => {
    localStorage.removeItem('wittle-user-token')
    localStorage.removeItem('wittle-username')
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
          userData={userData}
        />
        <section className='main-body'>
          <section className='main-body-details'  >

            <div className='how-to-guide'>

              <div className='how-to-content'>
                <div className='title-section'>
                  <div className='title-text'>
                    <h1>How to use Wittle</h1>
                    <h5>One of our key goals is to simplfy the activities that take up your time. These short videos will show you the ropes. Don&apos;t hesitate to get in touch if you have any issues or questions 🤝</h5>
                  </div>
                  <div className='logout-button' onClick={removeItemFromStorage}>
                    <div className='logout-icon'></div>
                  </div>
                </div>
              </div>
              <div className='video-section'>

                <div className='video-array'>
                  <div className='video-container'>
                    <h3>AI Listing Generator</h3>
                    <div className='video-content' style={{ position: 'relative', paddingBottom: '60.70826306913997%', height: 0 }}>
                      <iframe
                        src="https://www.loom.com/embed/c12b4d15ae98439a972b904c2e360312?sid=13b7eb29-8911-4d0e-be23-64d5767ecc0c"
                        frameBorder="0"
                        webkitallowfullscreen
                        mozallowfullscreen
                        allowfullscreen
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      ></iframe>
                    </div>
                    <h4>Key steps</h4>
                    <div className='row'>
                      <p>1</p>
                      <p>Open Listing generator</p>
                    </div>
                    <div className='row'>
                      <p>2</p>
                      <p>Navigate to &apos;AI listing generator&apos;</p>
                    </div>
                    <div className='row'>
                      <p>3</p>
                      <p>Insert key information about listing, starting with property details, features and lifestyle elements</p>
                    </div>
                    <div className='row'>
                      <p>4</p>
                      <p>Hit &apos;load description&apos; and wait for Wittle to do it&apos;s magic</p>
                    </div>
                    <div className='row'>
                      <p>5</p>
                      <p>Export your fresh listing</p>
                    </div>
                  </div>
                  <div className='video-container'>
                    <h3>Lead generator</h3>
                    <div className='video-content' style={{ position: 'relative', paddingBottom: '60.70826306913997%', height: 0 }}>
                      <iframe
                        src="https://www.loom.com/embed/6e0cfc7750b247f188ac6693016f78e1?sid=406b6c8b-bec7-4591-b502-fb4952bb0d93"
                        frameBorder="0"
                        webkitallowfullscreen
                        mozallowfullscreen
                        allowfullscreen
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      ></iframe>
                    </div>
                    <h4>Key steps</h4>
                    <div className='row'>
                      <p>1</p>
                      <p>Open Lead generator</p>
                    </div>
                    <div className='row'>
                      <p>2</p>
                      <p>Set your search criteria - which postcodes do you want to track? Do you only want to see properties over £2m? Add that here.</p>
                    </div>
                    <div className='row'>
                      <p>3</p>
                      <p>Hit &apos;save details&apos; and wait for your results to load. You&apos;ll see the latest properties for sale or to rent.</p>
                    </div>
                    <div className='row'>
                      <p>4</p>
                      <p>Select the properties you like and save these using the checkbox at the end of the row.</p>
                    </div>
                    <div className='row'>
                      <p>5</p>
                      <p>If you want export properties, hit &apos;export&apos; and they&apos;ll be saved to a csv.</p>
                    </div>
                  </div>
                  <div className='video-container'>
                    <h3>Property insights</h3>
                    <div className='video-content' style={{ position: 'relative', paddingBottom: '60.70826306913997%', height: 0 }}>
                      <iframe
                        src="https://www.loom.com/embed/205afd2a0cef4a2eb49d81337779ae4c?sid=668c168d-e9a2-4ab9-a737-60d2021e6ee9"
                        frameBorder="0"
                        webkitallowfullscreen
                        mozallowfullscreen
                        allowfullscreen
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                      ></iframe>
                    </div>
                    <h4>Key steps</h4>
                    <div className='row'>
                      <p>1</p>
                      <p>Open Listing generator</p>
                    </div>
                    <div className='row'>
                      <p>2</p>
                      <p>Enter the postcode, address and channel of the property you want to explore</p>
                    </div>
                    <div className='row'>
                      <p>3</p>
                      <p>See summary of key lifestyle features of a property on the &apos;Property overview&apos; tab. Print this to share with customers.</p>
                    </div>
                    <div className='row'>
                      <p>4</p>
                      <p>Dive into more detail onn the &apos;Property details&apos; tab, with a long list of insights about to every propetty, in a table or on a map.</p>
                    </div>
                    <div className='row'>
                      <p>5</p>
                      <p>Explore the data further by clicking into some of the items (only available for schools). Drill down into school results, ratings and catchment areas.</p>
                    </div>
                  </div>

                </div>
              </div>


            </div>




          </section>
        </section>





      </section>


    </>
  )
}


export default HowToGuide