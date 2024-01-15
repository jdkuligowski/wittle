import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { isUserAuth, getUserToken, getAccessToken } from '../../auth/Auth'

import NavBarRevised from '../../tools/NavBarRevised'
import WhiteNavbar from '../../tools/WhiteNavbar'
import WhiteSidebar from '../WhiteSidebar'
import TopProperties from '../propertyList.js/TopProperties'




const propertySearch = () => {

  // state to enable navigation between pages
  const navigate = useNavigate()

  // state for determining what content shows
  const [profileContent, setProfileContent] = useState('Comparison')
  const [profileDetail, setProfileDetail] = useState('Comparison')
  const [listingSelection, setListingSelection] = useState('')
  const [searchSelection, setSearchSelection] = useState('Home')
  const [personalView, setPersonalView] = useState('Properties')

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
    navigate('/login')
  }

  // // function to allow us to see property insights
  // const fetchData = async () => {
  //   const listing = JSON.parse(localStorage.getItem('listing-route'))
  //   console.log('listing route ->', listing)
  //   if (listing === 'On') {
  //     setInsightView('Results')
  //     const postcodeRoute = JSON.parse(localStorage.getItem('listing-postcode'))
  //     console.log('postcode-route', postcodeRoute)
  //     try {
  //       const { data } = await axios.post('/api/postcodes/', { postcode: postcodeRoute })
  //       console.log('postcode data ->', data)
  //       setPostcodes(data)
  //       window.localStorage.setItem('listing-route', JSON.stringify('Off'))
  //       setListingRoute('Off')
  //     } catch (error) {
  //       console.error('Error fetching postcodes:', error)
  //     }
  //   }
  // }


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
        {userData && userData.usage_stats[0].package === 'Trial expired' ?

          <section className='main-body remove-margin'>
            <section className='main-body-details'  >
              <section className='listing-generator'>
                <div className='listing-options'>
                  <div className='listing-buttons'></div>
                  <div className='logout-button' onClick={removeItemFromStorage}>
                    <div className='logout-icon'></div>
                  </div>
                </div>
                <div className='no-access-body'>
                  <div className='no-access-image'></div>
                  <h1 className='no-access-title'>Oops! Dead end</h1>
                  <h3 className='no-access-message'>You no longer have access to this content. Get in touch to upgrade your account and access the Wittle magic.</h3>
                  {/* <div className='no-access-email'>
                    <a href="mailto:james@wittle.co" style={{ textDecoration: 'none' }}>
                      <button className='email-button'>Get in touch</button>
                    </a>
                  </div> */}
                </div>
              </section>
            </section>
          </section>
          :
          <section className='main-body'>
            <section className='main-body-details'>
              <section className='property-search'>

                <div className='listing-options'>
                  <div className='listing-buttons'>
                    <h5 className='no-print' onClick={() => setSearchSelection('Home')} style={{ borderBottom: searchSelection === 'Home' ? '3px solid #ED6B86' : 'none', textUnderlineOffset: searchSelection === 'Home' ? '0.5em' : 'initial', fontWeight: searchSelection === 'Home' ? '700' : '400' }}>Home</h5>
                    <h5 className='no-print' onClick={() => setSearchSelection('Client view')} style={{ borderBottom: searchSelection === 'Client view' ? '3px solid #ED6B86' : 'none', textUnderlineOffset: searchSelection === 'Client view' ? '0.5em' : 'initial', fontWeight: searchSelection === 'Client view' ? '700' : '400' }}>Client view</h5>
                    <h5 className='no-print' onClick={() => setSearchSelection('Personal view')} style={{ borderBottom: searchSelection === 'Personal view' ? '3px solid #ED6B86' : 'none', textUnderlineOffset: searchSelection === 'Personal view' ? '0.5em' : 'initial', fontWeight: searchSelection === 'Personal view' ? '700' : '400' }}>Personal view</h5>
                  </div>
                  <div className='logout-button' onClick={removeItemFromStorage}>
                    <div className='logout-icon'></div>
                  </div>


                </div>
                <hr className='title-line' />

                {searchSelection === 'Home' ?


                  '' : searchSelection === 'Client view' ?


                    '' : searchSelection === 'Personal view' ?
                      <>
                        <div className="section-selectors">
                          <h3 className={`selector-button ${personalView === 'Properties' ? 'active' : 'inactive'}`} id='left' onClick={() => setPersonalView('Properties')}>Properties</h3>
                          <h3 className={`selector-button ${personalView === 'Saved properties' ? 'active' : 'inactive'}`} id='middle' onClick={() => setPersonalView('Saved properties')}>Saved properties</h3>
                          <h3 className={`selector-button ${personalView === 'Saved searches' ? 'active' : 'inactive'}`} id='right' onClick={() => setPersonalView('Saved searches')}>Saved searches</h3>
                        </div>

                        {personalView === 'Properties' ?
                          <TopProperties
                            userData={userData}
                            loadUserData={loadUserData}
                            setListingSelection={setListingSelection}
                          // fetchData={fetchData}
                          />

                          : personalView === 'Saved properties' ?
                            <>

                            </>
                            : personalView === 'Saved searches' ?
                              <>

                              </>
                              : ''}
                      </>
                      : ''}

              </section>
            </section>
          </section>
        }
      </section>
    </>


  )
}

export default propertySearch