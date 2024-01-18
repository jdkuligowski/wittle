import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { isUserAuth, getUserToken, getAccessToken } from '../../auth/Auth'

import TopProperties from '../propertyList.js/TopProperties'
import AgentSavedProperties from './AgentSavedProperties'
import AgentSavedSearches from './AgentSavedSearches'




const PersonalPage = ({ personalView, userData, loadUserData, setListingSelection, agentFavourites, addAgentFavourite, deleteAgentFavourite, propertyFilters,
  setPropertyFilters, addAgentSearch, agentSearches, setPersonalView, editAgentSearch, isClient, setIsClient }) => {


  // state for properties
  const [properties, setProperties] = useState()

  const [loading, setLoading] = useState(false)


  // managing modal for properties to be removed from list
  const [propertyInputShow, setPropertyInputShow] = useState(false)

  // detemrine whether its a normal search or an edit searrch
  const [previousLocation, setPreviousLocation] = useState('')


  // close modal
  const handlePropertyInputShow = () => {
    setPropertyInputShow(true)
  }

  // show the modal
  const handlePropertyInputClose = (e) => {
    setPropertyInputShow(false)
  }



  const loadProperties = async () => {
    setLoading(true)
    handlePropertyInputClose()
    if (propertyFilters.search_name !== '') {
      addAgentSearch()
    }
    // Create the query string from propertyFilters state
    const queryParams = new URLSearchParams()
    Object.entries(propertyFilters).forEach(([key, value]) => {
      // Exclude null or undefined values and the 'channel' key
      if (value !== null && value !== undefined && key !== 'channel') {
        queryParams.append(key, value)
      }
    })

    try {
      let url = ''
      if (propertyFilters.channel === 'Lettings') {
        url = `/api/personas/rental/?${queryParams.toString()}`
      } else if (propertyFilters.channel === 'Sales') {
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
      window.localStorage.setItem('top-property-filters', JSON.stringify(propertyFilters))
      setLoading(false)
    } catch (error) {
      console.error('can\'t access combined data ->', error)
    }
  }


  const loadPropertiesFromSearch = async (newFilters) => {
    setLoading(true)
    setPersonalView('Properties')
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




  // calculation to determine the inputs on the form and the toggle
  const toggleStatus = (key) => {
    setPropertyFilters(prevData => ({
      ...prevData,
      [key]: prevData[key] === true ? false : true,
    }))
  }

  return (

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
          agentFavourites={agentFavourites}
          addAgentFavourite={addAgentFavourite}
          deleteAgentFavourite={deleteAgentFavourite}
          propertyFilters={propertyFilters}
          setPropertyFilters={setPropertyFilters}
          addAgentSearch={addAgentSearch}
          properties={properties}
          setProperties={setProperties}
          loadProperties={loadProperties}
          loading={loading}
          propertyInputShow={propertyInputShow}
          handlePropertyInputShow={handlePropertyInputShow}
          handlePropertyInputClose={handlePropertyInputClose}
          toggleStatus={toggleStatus}
        // fetchData={fetchData}
        />

        : personalView === 'Saved properties' ?
          <>
            <AgentSavedProperties
              agentFavourites={agentFavourites}
              deleteAgentFavourite={deleteAgentFavourite}
              userData={userData}
              loadUserData={loadUserData}
            />
          </>
          : personalView === 'Saved searches' ?
            <>
              <AgentSavedSearches
                userData={userData}
                loadUserData={loadUserData}
                agentSearches={agentSearches}
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
                isClient={'No'}
                setIsClient={setIsClient}
              />
            </>
            : ''}

    </>
  )
}

export default PersonalPage