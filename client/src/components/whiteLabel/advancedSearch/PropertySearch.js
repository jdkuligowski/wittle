import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { isUserAuth, getUserToken, getAccessToken } from '../../auth/Auth'

import NavBarRevised from '../../tools/NavBarRevised'
import WhiteNavbar from '../../tools/WhiteNavbar'
import WhiteSidebar from '../WhiteSidebar'
import TopProperties from './TopProperties'
import AgentSavedProperties from './AgentSavedProperties'
import ClientPage from './ClientPage'
import AgentSearchHome from './AgentSearchHome'
import AgentSavedSearches from './AgentSavedSearches'
import PersonalPage from './PersonalPage'




const propertySearch = () => {

  // state to enable navigation between pages
  const navigate = useNavigate()

  // state for determining what content shows
  const [profileContent, setProfileContent] = useState('Comparison')
  const [profileDetail, setProfileDetail] = useState('Comparison')
  const [listingSelection, setListingSelection] = useState('')
  const [searchSelection, setSearchSelection] = useState('Home')
  const [personalView, setPersonalView] = useState('Properties')

  // logic for whether its client or personal search
  const [isClient, setIsClient] = useState()

  // states for pop outs on the side
  const [variableSide, setVariableSide] = useState(false)

  // set state for user data
  const [userData, setUserData] = useState()

  // set state for errors
  const [errors, setErrors] = useState()

  // set state for agent favourites
  const [agentFavourites, setAgentFavourites] = useState()

  // set state for agent searchs
  const [agentSearches, setAgentSearches] = useState()

  // set state for agent's clients
  const [clientList, setClientList] = useState()

  // set favourites for client
  const [clientFavourites, setClientFavourites] = useState()

  // set favourites for client
  const [clientSearches, setClientSearches] = useState()

  // filter array for proeprties to search
  const [propertyFilters, setPropertyFilters] = useState({
    channel: 'Sales',
    area: '',
    search_name: '',
    propertyType: '',
    garden: false,
    size: null,
    bedrooms_min: null,
    bedrooms_max: null,
    rental_price_min: null,
    rental_price_max: null,
    primaries: false,
    primaries_score: null,
    secondaries: false,
    secondaries_score: null,
    parks: false,
    parks_score: null,
    playgrounds: false,
    playgrounds_score: null,
    gyms: false,
    gyms_score: null,
    restaurants: false,
    restaurants_score: null,
    pubs: false,
    pubs_score: null,
    tubes: false,
    tubes_score: null,
    supermarkets: false,
    supermarkets_score: null,
    ev: false,
    ev_score: null,
    crime: false,
    crime_score: null,
  })


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
          setAgentFavourites(data.agent_saved_properties)
          setClientList(data.client_details)
          setClientFavourites(data.client_details)
          setAgentSearches(data.agent_searches)
          console.log('client details ->', data.client_details)


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

  // ? Functions for favouriting properties for agents
  // add favourite
  const addAgentFavourite = async (item) => {
    const favouriteToAdd = {
      rightmove_id: item.property_data.rightmove_id,
      url: item.property_data.url,
      displayAddress: item.property_data.displayAddress,
      bathrooms: item.property_data.bathrooms,
      bedrooms: item.property_data.bedrooms,
      agent: item.property_data.agent,
      propertyType: item.property_data.propertyType,
      price_numeric: item.property_data.price_numeric,
      images: item.property_data.images,
      score: item.overall_lifestyle_score,
      channel: propertyFilters.channel,
    }
    if (isUserAuth()) {
      try {
        const response = await axios.post('/api/agent_favourites/', favouriteToAdd, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        console.log('Response: ', response)
        loadUserData()
      } catch (error) {
        console.error('Error saving favourite:', error)
      }
    }
  }


  // delete favourrite
  const deleteAgentFavourite = async (item) => {
    const rightmoveIdToDelete = item.property_data.rightmove_id

    if (isUserAuth()) {
      try {
        const response = await axios.delete('/api/agent_favourites/delete/', {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
          data: { rightmove_id: rightmoveIdToDelete },
        })
        console.log('Response: ', response)
        loadUserData()  // Assuming this refreshes the list of favourites
      } catch (error) {
        console.error('Error deleting favourite:', error)
      }
    }
  }


  // add search
  const addAgentSearch = async (item) => {
    if (isUserAuth()) {
      try {
        const payload = {
          ...propertyFilters,
          price_min: propertyFilters.rental_price_min,
          price_max: propertyFilters.rental_price_max,
        }
        delete payload.rental_price_min
        delete payload.rental_price_max
        const response = await axios.post('/api/agent_searches/', payload, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        console.log('Response: ', response)
        loadUserData()
      } catch (error) {
        console.error('Error saving search:', error)
      }
    }
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
                  <AgentSearchHome
                    setSearchSelection={setSearchSelection}
                  />

                  : searchSelection === 'Client view' ?
                    <ClientPage
                      clientList={clientList}
                      userData={userData}
                      loadUserData={loadUserData}
                      setListingSelection={setListingSelection}
                      agentFavourites={clientFavourites}
                      isClient={isClient}
                    />

                    : searchSelection === 'Personal view' ?
                      <>
                        <PersonalPage
                          userData={userData}
                          loadUserData={loadUserData}
                          setListingSelection={setListingSelection}
                          agentFavourites={agentFavourites}
                          addAgentFavourite={addAgentFavourite}
                          deleteAgentFavourite={deleteAgentFavourite}
                          propertyFilters={propertyFilters}
                          setPropertyFilters={setPropertyFilters}
                          addAgentSearch={addAgentSearch}
                          agentSearches={agentSearches}
                          setPersonalView={setPersonalView}
                          personalView={personalView}
                          isClient={isClient}
                          setIsClient={setIsClient}
                          // editAgentSearch={editAgentSearch}
                        />
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