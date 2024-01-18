import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { isUserAuth, getUserToken, getAccessToken } from '../../auth/Auth'
import { NumericFormat } from 'react-number-format'
import KYCInput from '../b2bModals/KYCInput'


const AgentSavedSearches = ({ agentSearches, loadUserData, currentClient, loadPropertiesFromSearch, handlePropertyInputShow, propertyInputShow,
  propertyFilters, setPropertyFilters, toggleStatus, handlePropertyInputClose, setPropertyInputShow, previousLocation, setPreviousLocation,
  isClient, setIsClient }) => {

  // state for which properties to show on screen
  const [displayChannel, setDisplayChannel] = useState('Sales')

  // state for adjusted property details to go into edit modal
  const [adjustedFilters, setAdjustedFilters] = useState({})

  const setSearchDetails = (details) => {
    const info = {
      ...details,
      rental_price_min: details.price_min,
      rental_price_max: details.price_max,
    }
    console.log(details)
    loadPropertiesFromSearch(info)
  }


  // delete search
  const deleteAgentSearch = async (item) => {
    const idToDelete = item.id
    console.log('client id->', item.client)

    if (isUserAuth()) {
      try {
        let url = ''
        const config = {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        }

        if (isClient === 'Yes') {
          url = `/api/client_searches/delete/${idToDelete}/`
          config.headers['Client-ID'] = item.client // Example of sending client_id in headers
        } else {
          url = `/api/agent_searches/delete/${idToDelete}/`
        }
        const response = await axios.delete(url, config)
        console.log('Response: ', response)
        loadUserData()
      } catch (error) {
        console.error('Error deleting search:', error)
      }
    }
  }


  // edit search inputs to show on modal
  const setEditSearchDetails = (details) => {
    const info = {
      ...details,
      rental_price_min: details.price_min,
      rental_price_max: details.price_max,
    }
    delete details.price_min
    delete details.price_max
    setPropertyFilters(info)
    setPropertyInputShow(true)
  }

  // edit search function to actually change search
  const editAgentSearch = async (item) => {
    if (isUserAuth()) {
      try {
        const payload = {
          ...propertyFilters,
          price_min: propertyFilters.rental_price_min,
          price_max: propertyFilters.rental_price_max,
        }
        delete payload.rental_price_min
        delete payload.rental_price_max

        let url = ''
        if (isClient === 'Yes') {
          url = `/api/client_searches/update/${propertyFilters.id}/`
          payload.client_id =  item.client
          // payload.client_id =  currentClient.id
        } else {
          url = `/api/agent_searches/update/${propertyFilters.id}/`
        }
        const response = await axios.patch(url, payload, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        console.log('Response: ', response)
        loadUserData() 
        handlePropertyInputClose()
        loadPropertiesFromSearch(propertyFilters)
      } catch (error) {
        console.error('Error updating search:', error)
      }
    }
  }


  return (


    <>
      <section className='agent-saved-properties'>

        {agentSearches ?
          <div className='saved-properties-body'>
            {currentClient ? <h3 className='saved-number'>{currentClient.first_name} {currentClient.last_name} has {(agentSearches.filter(item => item.channel === displayChannel)).length} saved {(displayChannel).toLocaleLowerCase()} searches </h3> :
              <h3 className='saved-number'>You have {(agentSearches.filter(item => item.channel === displayChannel)).length} saved {(displayChannel).toLocaleLowerCase()} searches </h3>}


            <div className='saved-properties-grid'>
              <div className='saved-properties-array'>
                {agentSearches ? agentSearches
                  .map((item, index) => {
                    return (
                      <>
                        <div className='saved-property' id='search-item'>
                          <h3 className='search-title'>{item.search_name}</h3>
                          <div className='search-buttons'>
                            <button onClick={() => setSearchDetails(item)}>Load</button>
                            <button onClick={() => setEditSearchDetails(item)}>Edit</button>
                            <button onClick={() => deleteAgentSearch(item)}>Delete</button>
                          </div>
                          <div className='saved-item'>
                            <div className='saved-icon' id='money'></div>
                            {item.channel === 'Sales' ?
                              <h3><NumericFormat value={item.price_min} displayType={'text'} thousandSeparator={true} prefix={'£'} /> - <NumericFormat value={item.price_max} displayType={'text'} thousandSeparator={true} prefix={'£'} /> </h3> :
                              <h3><NumericFormat value={item.price_min} displayType={'text'} thousandSeparator={true} prefix={'£'} /> - <NumericFormat value={item.price_max} displayType={'text'} thousandSeparator={true} prefix={'£'} /> pcm</h3>
                            }
                          </div>
                          <div className='saved-item'>
                            <div className='saved-icon' id='bed'></div>
                            <h3>{item.bedrooms_min} - {item.bedrooms_max} bedrooms</h3>
                          </div>
                          <h3 className='search-title'>Lifestyle</h3>
                          <div className='lifestyle-pills'>
                            {item.restaurants ? <button className='pills'>Restaurants</button> : ''}
                            {item.pubs ? <button className='pills'>Pubs</button> : ''}
                            {item.supermarkets ? <button className='pills'>Supermarkets</button> : ''}
                            {item.gyms ? <button className='pills'>Gyms</button> : ''}
                            {item.parks ? <button className='pills'>Parks</button> : ''}
                            {item.playgrounds ? <button className='pills'>Playgrounds</button> : ''}
                            {item.tubes ? <button className='pills'>Tubes</button> : ''}
                            {item.primaries ? <button className='pills'>Primaries</button> : ''}
                            {item.secondaries ? <button className='pills'>Secondaries</button> : ''}
                            {item.ev ? <button className='pills'>EVs</button> : ''}
                            {item.crime ? <button className='pills'>Crime</button> : ''}
                          </div>

                        </div>
                      </>
                    )
                  }) : ''}
              </div>
            </div>
          </div>


          : ''}
      </section>
      <KYCInput
        propertyInputShow={propertyInputShow}
        handlePropertyInputClose={handlePropertyInputClose}
        propertyFilters={propertyFilters}
        setPropertyFilters={setPropertyFilters}
        // adjustedFilters={adjustedFilters}
        loadProperties={loadPropertiesFromSearch}
        toggleStatus={toggleStatus}
        editAgentSearch={editAgentSearch}
        setPreviousLocation={setPreviousLocation}
        previousLocation={'Edit'}
      />


    </>
  )
}

export default AgentSavedSearches