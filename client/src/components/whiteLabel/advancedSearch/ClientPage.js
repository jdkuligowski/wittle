import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { isUserAuth, getUserToken, getAccessToken } from '../../auth/Auth'
import AddClient from '../b2bModals/AddClient'
import ClientProperties from './ClientProperties'
import AgentSavedProperties from './AgentSavedProperties'
import AgentSavedSearches from './AgentSavedSearches'


const ClientPage = ({ clientList, loadUserData, userData, agentFavourites, personalView, setListingSelection,
  agentSearches, setPersonalView, editAgentSearch, isClient, setIsClient, loadPrimaryData,
  primarySearchDetails, setPrimarySearchDetails, selectedPrimary, setSelectedPrimary }) => {

  // state for properties
  const [properties, setProperties] = useState()

  const [loading, setLoading] = useState(false)

  // state for adding client modal
  const [clientInputShow, setClientInputShow] = useState('')

  // state for determining client page
  const [clientView, setClientView] = useState('Overview')

  // state for identifying currrent client
  const [currentClient, setCurrentClient] = useState()

  // state for previous location
  const [previousLocation, setPreviousLocation] = useState('')

  // managing modal for properties to be removed from list
  const [propertyInputShow, setPropertyInputShow] = useState(false)

  // state for client favourites
  const [finalClientFavourites, setFinalClientFavourites] = useState()

  // state for client searches
  const [finalClientSearches, setFinalClientSearches] = useState()

  // state for the client details
  const [clientInputDetails, setClientInputDetails] = useState({
    first_name: '',
    last_name: '',
    area: '',
    looking: '',
    link_sent: '',
    link_replied: '',
    email: '',
  })

  // filter array for proeprties to search
  const [propertyFilters, setPropertyFilters] = useState({
    channel: 'Sales',
    area: '',
    search_name: '',
    search_type: '',
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


  // close modal
  const handleClientInputShow = () => {
    setClientInputShow(true)
  }

  // show the modal
  const handleClientInputClose = (e) => {
    setClientInputShow(false)
  }

  // close modal
  const handlePropertyInputShow = () => {
    setPropertyInputShow(true)
    loadPrimaryData()
  }

  // show the modal
  const handlePropertyInputClose = (e) => {
    setPropertyInputShow(false)
  }


  useEffect(() => {
    if (currentClient && agentFavourites) {
      const faves = agentFavourites.filter(client => client.id === currentClient.id)
      setFinalClientFavourites(faves[0].client_saved_properties)
      setFinalClientSearches(faves[0].client_saved_searches)
      console.log('individual client details ->', faves)
      console.log('client searches ->', faves[0].client_saved_searches)
    }
  }, agentFavourites, currentClient)


  // function for posting client details to database
  // add favourite
  const addNewClient = async (item) => {
    if (isUserAuth()) {
      try {
        const response = await axios.post('/api/agent_clients/add_client/', clientInputDetails, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        console.log('Response: ', response)
        loadUserData()
        handleClientInputClose()
      } catch (error) {
        console.error('Error saving favourite:', error)
      }
    }
  }


  // function to go to client page
  const goToClient = (item) => {
    setClientView('Profile')
    const current = clientList.filter(client => client.email === item.email)[0]
    setCurrentClient(current)
    console.log('current client ->', current)
    const faves = agentFavourites.filter(client => client.id === current.id)
    setFinalClientFavourites(faves[0].client_saved_properties)
    setFinalClientSearches(faves[0].client_saved_searches)
    console.log('actual favourites ->', faves)
  }



  const loadProperties = async () => {
    setLoading(true)
    handlePropertyInputClose()
    console.log('activated')
    if (propertyFilters.search_name !== '') {
      addAgentSearch()
    }
    console.log('client property filters', propertyFilters)
    // Create the query string from propertyFilters state
    const queryParams = new URLSearchParams()
    Object.entries(propertyFilters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && key !== 'channel') {
        queryParams.append(key, value)
      }
    })

    try {
      let url = ''
      if (propertyFilters.search_type === 'Amenity') {
        // For 'Amenity' search, use the school's ID
        const schoolId = selectedPrimary.value.id
        url = `/api/personas/sales/primaries/?school_id=${schoolId}`
      } else {
        // For 'Wittle' or other types, use the existing logic
        if (propertyFilters.channel === 'Lettings') {
          url = `/api/personas/rental/?${queryParams.toString()}`
        } else if (propertyFilters.channel === 'Sales') {
          url = `/api/personas/sales/?${queryParams.toString()}`
        }
      }

      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })

      if (propertyFilters.search_type !== 'Amenity') {
        data.sort((a, b) => b.overall_lifestyle_score - a.overall_lifestyle_score)
      }
      console.log('combined data ->', data)
      setProperties(data)
      window.localStorage.setItem('client-properties', JSON.stringify(data))
      window.localStorage.setItem('client-property-filters', JSON.stringify(propertyFilters))
      window.localStorage.setItem('client-email', JSON.stringify(currentClient.email))
      setLoading(false)
    } catch (error) {
      console.error('can\'t access combined data ->', error)
    }
  }



  const loadPropertiesFromSearch = async (newFilters) => {
    setLoading(true)
    setClientView('Client properties')
    // Create the query string from propertyFilters state
    const queryParams = new URLSearchParams()
    Object.entries(newFilters).forEach(([key, value]) => {
      // Exclude null or undefined values and the 'channel' key
      if (value !== null && value !== undefined && key !== 'channel') {
        queryParams.append(key, value)
      }
    })
    try {
      let url = ''
      if (newFilters.channel === 'Lettings') {
        url = `/api/personas/rental/?${queryParams.toString()}`
      } else if (newFilters.channel === 'Sales') {
        url = `/api/personas/sales/?${queryParams.toString()}`
      }

      // Extract data based on url
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      data.sort((a, b) => b.overall_lifestyle_score - a.overall_lifestyle_score)
      console.log('combined data ->', data)
      setProperties(data)
      window.localStorage.setItem('top-properties', JSON.stringify(data))
      window.localStorage.setItem('top-property-filters', JSON.stringify(newFilters))
      setLoading(false)
    } catch (error) {
      console.error('can\'t access combined data ->', error)
    }
  }



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
      client_id: currentClient.id,
    }
    if (isUserAuth()) {
      try {
        const response = await axios.post('/api/agent_client_favourites/post/', favouriteToAdd, {
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


  // delete favourite
  const deleteAgentFavourite = async (item) => {
    const rightmoveIdToDelete = item.rightmove_id

    if (isUserAuth()) {
      try {
        const response = await axios.delete('/api/agent_client_favourites/delete/', {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
          data: {
            rightmove_id: rightmoveIdToDelete,
            client_id: currentClient.id,
          },
        })
        console.log('Response: ', response)
        loadUserData()
      } catch (error) {
        console.error('Error deleting favourite:', error)
      }
    }
  }


  // add search
  const addAgentSearch = async () => {
    if (isUserAuth()) {
      try {
        const payload = {
          ...propertyFilters,
          price_min: propertyFilters.rental_price_min,
          price_max: propertyFilters.rental_price_max,
          client_id: currentClient.id,
          bedrooms_min: Number.isInteger(propertyFilters.bedrooms_min) ? propertyFilters.bedrooms_min : null,
          bedrooms_max: Number.isInteger(propertyFilters.bedrooms_max) ? propertyFilters.bedrooms_max : null,

        }
        delete payload.rental_price_min
        delete payload.rental_price_max
        const response = await axios.post('/api/client_searches/post/', payload, {
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




  // calculation to determine the inputs on the form and the toggle
  const toggleStatus = (key) => {
    setPropertyFilters(prevData => ({
      ...prevData,
      [key]: prevData[key] === true ? false : true,
    }))
  }


  return (

    <>

      <section className='client-property-search'>

        {clientView === 'Overview' ?
          <>
            <div className="client-search-title">
              {clientList && clientList.length > 0 ? <h3>You have {clientList.length === 1 ? '1 client' : `${clientList.length} clients`} in your Wittle client database</h3> : <h3>You don&apos;t have any clients yet, add clients to get Wittling!</h3>}
              <button onClick={handleClientInputShow}>Add new client</button>
            </div>

            <div className='client-list-body'>
              <div className='client-list-table'>
                <div className='table-headers'>
                  <div id='column1' className='column'>
                    <h5></h5>
                  </div>
                  <div id='column2' className='column' >
                    <h5>#</h5>
                  </div>
                  <div id='column3' className='column'>
                    <h5>Name</h5>
                  </div>
                  <div id='column4' className='column'>
                    <h5>Current area</h5>
                  </div>
                  <div id='column5' className='column'>
                    <h5>Looking</h5>
                  </div>
                  <div id='column6' className='column'>
                    <h5>Date onboarded</h5>
                    {/* <h5>⬇️</h5> */}
                  </div>
                  <div id='column7' className='column'>
                    <h5>Action</h5>
                  </div>
                </div>
                <hr className='property-divider' />
                <div className='table-detail'>
                  {clientList ? clientList.map((item, index) => {
                    return (
                      <>
                        <div className='table-content' onClick={() => goToClient(item)}>
                          <div className='column' id='column1' >
                            <h5>{item.first_name.charAt(0)}{item.last_name.charAt(0)}</h5>
                          </div>
                          <div className='column' id='column2' >
                            <h5>{index + 1}</h5>
                          </div>
                          <div className='column' id='column3' >
                            <h5>{item.first_name} {item.last_name}</h5>
                          </div>
                          <div className='column' id='column4' >
                            <h5>{item.area}</h5>
                          </div>
                          <div className='column' id='column5' >
                            <h5>{item.looking}</h5>
                          </div>
                          <div className='column' id='column6' >
                            <h5>{item.date_onboarded}</h5>
                          </div>
                          <div className='column' id='column7' >
                            <h5>{ }</h5>
                          </div>
                        </div>
                        <hr className='property-divider' />
                      </>
                    )
                  }) : ''}
                </div>
              </div>

            </div>
          </>

          :

          <>
            <div className='client-top-summary'>
              <div className='go-back-button' id='go-back' onClick={() => setClientView('Overview')}></div>
              <div className='summary-block'>
                <h3 className='summary-title'>Name</h3>
                <h3 className='summary-detail'>{currentClient ? currentClient.first_name : ''}</h3>
              </div>
              <div className='summary-block'>
                <h3 className='summary-title'>Area</h3>
                <h3 className='summary-detail'>{currentClient ? currentClient.area : ''}</h3>

              </div>
              <div className='summary-block'>
                <h3 className='summary-title'>Desired location</h3>
                <h3 className='summary-detail'>{currentClient ? currentClient.looking : ''}</h3>

              </div>
            </div>
            <div className="section-selectors">
              <h3 className={`selector-button ${clientView === 'Profile' ? 'active' : 'inactive'}`} id='left' onClick={() => setClientView('Profile')}>Profile</h3>
              <h3 className={`selector-button ${clientView === 'Client properties' ? 'active' : 'inactive'}`} id='middle' onClick={() => setClientView('Client properties')}>Properties</h3>
              <h3 className={`selector-button ${clientView === 'Client saved properties' ? 'active' : 'inactive'}`} id='middle' onClick={() => setClientView('Client saved properties')}>Saved properties</h3>
              <h3 className={`selector-button ${clientView === 'Client saved searches' ? 'active' : 'inactive'}`} id='right' onClick={() => setClientView('Client saved searches')}>Saved searches</h3>
            </div>

          </>}

        {clientView === 'Profile' ?
          <>
            {currentClient ?
              <>
                <div className='client-detail-block'>
                  <h3 className='client-detail-title'>Name</h3>
                  <h3 className='client-detail-content'>{currentClient.first_name} {currentClient.last_name}</h3>
                </div>
                <div className='client-detail-block'>
                  <h3 className='client-detail-title'>Email</h3>
                  <h3 className='client-detail-content'>{currentClient.email}</h3>
                </div>
                <div className='client-detail-block'>
                  <h3 className='client-detail-title'>Area</h3>
                  <h3 className='client-detail-content'>{currentClient.area}</h3>
                </div>
                <div className='client-detail-block'>
                  <h3 className='client-detail-title'>Desired location</h3>
                  <h3 className='client-detail-content'>{currentClient.looking}</h3>
                </div>
                <div className='client-detail-block'>
                  <h3 className='client-detail-title'>Date onboarded</h3>
                  <h3 className='client-detail-content'>{currentClient.date_onboarded}</h3>
                </div>
                <div className='client-detail-block'>
                  <h3 className='client-detail-title'>Link sent</h3>
                  <h3 className='client-detail-content'>{currentClient.link_sent === '' ? 'No' : currentClient.link_sent}</h3>
                </div>
                <div className='client-detail-block'>
                  <h3 className='client-detail-title'>Details recieved</h3>
                  <h3 className='client-detail-content'>{currentClient.link_replied === '' ? 'No' : currentClient.link_replied}</h3>
                </div>

              </>
              : ''}

          </>

          : clientView === 'Client properties' ?

            <>
              <ClientProperties
                clientList={clientList}
                userData={userData}
                loadUserData={loadUserData}
                propertyFilters={propertyFilters}
                setPropertyFilters={setPropertyFilters}
                agentFavourites={finalClientFavourites}
                deleteAgentFavourite={deleteAgentFavourite}
                addAgentFavourite={addAgentFavourite}
                currentClient={currentClient}
                handlePropertyInputShow={handlePropertyInputShow}
                propertyInputShow={propertyInputShow}
                handlePropertyInputClose={handlePropertyInputClose}
                toggleStatus={toggleStatus}
                loading={loading}
                setLoading={setLoading}
                properties={properties}
                setProperties={setProperties}
                loadProperties={loadProperties}
                primarySearchDetails={primarySearchDetails}
                setPrimarySearchDetails={setPrimarySearchDetails}
                selectedPrimary={selectedPrimary}
                setSelectedPrimary={setSelectedPrimary}
              />

            </>
            : clientView === 'Client saved properties' ?

              <>
                <AgentSavedProperties
                  agentFavourites={finalClientFavourites}
                  deleteAgentFavourite={deleteAgentFavourite}
                  addAgentFavourite={addAgentFavourite}
                  userData={userData}
                  loadUserData={loadUserData}
                  currentClient={currentClient}
                />
              </>
              : clientView === 'Client saved searches' ?

                <>
                  <AgentSavedSearches
                    userData={userData}
                    loadUserData={loadUserData}
                    agentSearches={finalClientSearches}
                    setPersonalView={setPersonalView}
                    loadPropertiesFromSearch={loadPropertiesFromSearch}
                    handlePropertyInputShow={handlePropertyInputShow}
                    propertyInputShow={propertyInputShow}
                    handlePropertyInputClose={handlePropertyInputClose}
                    propertyFilters={propertyFilters}
                    setPropertyFilters={setPropertyFilters}
                    toggleStatus={toggleStatus}
                    setPropertyInputShow={setPropertyInputShow}
                    editAgentSearch={editAgentSearch}
                    previousLocation={previousLocation}
                    setPreviousLocation={setPreviousLocation}
                    isClient={'Yes'}
                    setIsClient={setIsClient}
                    currentClient={currentClient}

                  />

                </>

                : ''}


      </section>
      <AddClient
        clientInputShow={clientInputShow}
        handleClientInputClose={handleClientInputClose}
        clientInputDetails={clientInputDetails}
        setClientInputDetails={setClientInputDetails}
        addNewClient={addNewClient}
      />
    </>
  )
}
export default ClientPage