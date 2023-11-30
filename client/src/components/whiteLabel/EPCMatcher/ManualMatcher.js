import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getUserToken, isUserAuth, getAccessToken } from '../../auth/Auth'
import Loading from '../../helpers/Loading'
import SavedProperties from '../b2bModals/SavedProperties'
import { CarouselItem } from 'react-bootstrap'



const ManualMatcher = ({ increaseUsageCount, setErrors, userData, loadUserData, savedProperties, archivedProperties, handleVisitUrl,
  savedActionShow, handleSavedActionClose, setLeadGenSection, latestFavourites, handleSavedActionShow, setLatestFavourites, setSavedActionShow }) => {


  // set state for loading
  const [loading, setLoading] = useState()

  // navigation
  const navigate = useNavigate()

  // form inputs
  const [postcodeSubstring, setPostcodeSubstring] = useState('')
  const [roadSubstring, setRoadSubstring] = useState('')
  const [currentEnergy, setCurrentEnergy] = useState()
  const [potentialEnergy, setPotentialEnergy] = useState()
  const [longPropertyList, setLongPropertyList] = useState([])
  const [propertyList, setPropertyList] = useState([])

  // set state for completing a search
  const [search, setSearch] = useState(false)

  const [channel, setChannel] = useState()


  const [inputType, setInputType] = useState('Efficiency')

  const [expandedItems, setExpandedItems] = useState(new Set()) // State to keep track of expanded items

  const [matchingProperties, setMatchingProperties] = useState({}) // State to store matching properties



  const toggleExpandedItem = async (index) => {
    const newExpandedItems = new Set(expandedItems)
    const property = propertyList[index]

    if (newExpandedItems.has(index)) {
      newExpandedItems.delete(index)
    } else {
      newExpandedItems.add(index)
      // Fetch matching properties if not already fetched for this item
      if (!matchingProperties[index]) {
        const matches = await liveProperties(property.postcode)
        console.log('matches ->', matches)
        setMatchingProperties({ ...matchingProperties, [index]: matches })
      }
    }
    setExpandedItems(newExpandedItems)
  }


  // ? Section 2: loading properties
  // function to load properties from EPC database
  const loadProperties = async () => {
    setMatchingProperties({})
    setExpandedItems(new Set())
    setLoading(true)
    setSearch(false)


    const sanitizedPostcode = postcodeSubstring.replace(/\s+/g, '')

    try {
      const { data } = await axios.get(`/api/epc/${sanitizedPostcode}`)
      console.log('Postcode data ->', data)
      setLongPropertyList(data)

      if (data && Array.isArray(data) && data.length > 0) {
        let filteredData = data

        if (inputType === 'Efficiency') {
          filteredData = filteredData.filter(property =>
            (!roadSubstring || property.address.toLowerCase().includes(roadSubstring.toLowerCase())) &&
            (!currentEnergy || property.current_energy_efficiency === Number(currentEnergy)) &&
            (!potentialEnergy || property.potential_energy_efficiency === Number(potentialEnergy))
          )
        } else if (inputType === 'Rating') {
          filteredData = filteredData.filter(property =>
            (!roadSubstring || property.address.toLowerCase().includes(roadSubstring.toLowerCase())) &&
            (!currentEnergy || property.current_energy_rating === currentEnergy.toUpperCase()) &&
            (!potentialEnergy || property.potential_energy_rating === potentialEnergy.toUpperCase())
          )
        }

        filteredData = filteredData.sort((a, b) => new Date(b.inspection_date) - new Date(a.inspection_date))

        if (filteredData.length > 0) {
          setPropertyList(filteredData)
          console.log('filtered data->', filteredData)
          increaseUsageCount()
        } else if (filteredData.length === 0) {
          setPropertyList('')
        }

        setLoading(false)
      } else {
        console.log('No postcode data available')
        setLoading(false)
      }
    } catch (error) {
      setPropertyList('')
      setErrors(true)
      console.log(error)
      setLoading(false)
    }

    setSearch(true)
  }


  const liveProperties = async (postcode) => {
    try {
      console.log(postcode)
      const { data } = await axios.get(`/api/epc_properties_rental/${postcode}`)
      return data // Returns the list of matching properties
    } catch (error) {
      console.log(error)
      return [] // Return an empty array in case of an error
    }
  }



  // ? Section 3: Handling favourites data - selecting, adding, editing and  deleting
  // function for adding favourites based on relevant row
  const addFavourite = async (matchingProperties, epcData) => {
    if (isUserAuth()) {


      const newFavourites = [{
        'rightmove_id': matchingProperties.rightmove_id,
        'postcode': matchingProperties.postcode,
        'address': epcData.address,
        'agent': matchingProperties.agent,
        'type': matchingProperties.type,
        'addedOn': matchingProperties.addedOn,
        'propertyType': matchingProperties.propertyType,
        'price': matchingProperties.price,
        'bathrooms': matchingProperties.bathrooms,
        'bedrooms': matchingProperties.bedrooms,
        'let_available_date': matchingProperties.let_available_date,
        'date_added_db': matchingProperties.date_added_db,
        'url': matchingProperties.url,
        'current_epc': matchingProperties.current_epc,
        'potential_epc': matchingProperties.potential_epc,
        'action': 'Saved',
        'added_revised': matchingProperties.added_revised,
        'reduced_revised': matchingProperties.reduced_revised,

      }]

      try {
        const response = await axios.post('/api/epc_favourite/', newFavourites, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })

        console.log('Response:', response.data)

        setLatestFavourites(1)
        handleSavedActionShow()
        loadUserData()


      } catch (error) {
        console.error('Error saving favourite:', error)
      }
    } else {
      navigate('/access-denied')
      console.log('logged out')
    }
  }


  // function for adding favourites based on relevant row
  const addPartialFavourite = async (epcData) => {
    if (isUserAuth()) {
      const random12DigitNumber = Math.floor(Math.random() * 1e12)
      const newFavourites = [{
        'rightmove_id': random12DigitNumber.toString(),
        'postcode': epcData.postcode,
        'address': epcData.address,
        'agent': '',
        'type': '',
        'addedOn': '',
        'propertyType': '',
        'price': null,
        'bathrooms': null,
        'bedrooms': null,
        'let_available_date': null,
        'date_added_db': null,
        'url': '',
        'current_epc': epcData.current_energy_efficiency,
        'potential_epc': epcData.potential_energy_efficiency,
        'action': 'Saved',
        'added_revised': null,
        'reduced_revised': null,

      }]

      try {
        const response = await axios.post('/api/epc_favourite/', newFavourites, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })

        console.log('Response:', response.data)

        setLatestFavourites(1)
        handleSavedActionShow()
        loadUserData()


      } catch (error) {
        console.error('Error saving favourite:', error)
      }
    } else {
      navigate('/access-denied')
      console.log('logged out')
    }
  }





  return (

    <>
      <div className='epc-matcher'>
        <div className='input-section'>
          <h3 className='sub-title'>Input property details to find  details about live listings</h3>
          {!loading ?
            <>
              <div className='double-input-block'>

                <div className='input-block half'>
                  <h3>Postcode</h3>
                  <input
                    type="text"
                    value={postcodeSubstring}
                    onChange={e => setPostcodeSubstring(e.target.value)}
                    placeholder="Enter postcode..."></input>
                </div>
                <div className='input-block half'>
                  <h3>Road name</h3>
                  <input
                    type="text"
                    value={roadSubstring}
                    onChange={e => setRoadSubstring(e.target.value)}
                  ></input>
                </div>
              </div>
              <div className='single-input-block'>

                <div className='input-block large'>
                  <h3>Efficiency (numbers) or Rating (letters)</h3>
                  <select onChange={(e) => setInputType(e.target.value)}>
                    <option>Efficiency</option>
                    <option>Rating</option>
                  </select>
                </div>
              </div>
              {inputType === 'Efficiency' ?
                <>
                  <div className='double-input-block'>

                    <div className='input-block half'>
                      <h3>Current Energy Efficiency</h3>
                      <input
                        type="number"
                        value={currentEnergy}
                        onChange={e => setCurrentEnergy(e.target.value)}
                      ></input>
                    </div>
                    <div className='input-block half'>
                      <h3>Potential Energy Efficiency</h3>
                      <input
                        type="number"
                        value={potentialEnergy}
                        onChange={e => setPotentialEnergy(e.target.value)}
                      ></input>
                    </div>
                  </div>
                </>
                :
                <>
                  <div className='double-input-block'>

                    <div className='input-block half'>
                      <h3>Current Energy Rating</h3>
                      <input
                        type="text"
                        value={currentEnergy}
                        onChange={e => setCurrentEnergy(e.target.value)}
                      ></input>
                    </div>
                    <div className='input-block half'>
                      <h3>Potential Energy Rating</h3>
                      <input
                        type="text"
                        value={potentialEnergy}
                        onChange={e => setPotentialEnergy(e.target.value)}
                      ></input>
                    </div>
                  </div>
                </>
              }
              <div className='single-input-block'>

                <div className='input-block large'>
                  <h3>Property category</h3>
                  <select className='dropdown' value={channel || 'Lettings'} onChange={(e) => setChannel(e.target.value)}>
                    <option>Lettings</option>
                    <option>Sales</option>
                  </select>
                </div>
              </div>
              <div className='search-section'>
                <button className='load-insights' onClick={loadProperties}>Load Properties</button>

              </div>
            </>
            :
            <Loading />}
        </div>


        <div className='manual-property-results'>
          <div className='results-block'>
            {longPropertyList.length === 0 && !search ? <h3 className='sub-title'>Start new search to see results</h3> :
              search && propertyList.length === 0 ? <h3 className='sub-title'>We couldn&apos;t find anything that matched your search</h3> :
                search && propertyList.length > 0 ?
                  <>
                    <h3 className='sub-title'>You have {propertyList.length} matching results</h3>
                    <div className='results-details'>
                      {propertyList ? propertyList
                        .map((item, index) => {
                          return (
                            <>
                              <div className='results-content' key={index}>
                                <h5 className='row-value'>{index + 1}</h5>
                                <div className='results-items'>
                                  <div className='results-line'>
                                    <div className='result-icon' id='catchment'></div>
                                    <div className='results-text'>
                                      <h5 className='text-title' >Address: </h5>
                                      <h5 className='text-result'>{item.address}</h5>
                                    </div>
                                  </div>
                                  <div className='results-line'>
                                    <div className='result-icon' id='house'></div>
                                    <div className='results-text'>
                                      <h5 className='text-title'>Floor area: </h5>
                                      <h5 className='text-result'>{item.floor_area} sq.m</h5>
                                    </div>
                                  </div>
                                  <div className='results-line'>
                                    <div className='result-icon' id='location'></div>
                                    <div className='results-text'>
                                      <h5 className='text-title'>Postcode: </h5>
                                      <h5 className='text-result'>{item.postcode}</h5>
                                    </div>
                                  </div>
                                  <div className='results-line'>
                                    <div className='result-icon' id='building'></div>
                                    <div className='results-text'>
                                      <h5 className='text-title'>Floor level: </h5>
                                      <h5 className='text-result'>{item.final_floor_level}</h5>
                                    </div>
                                  </div>
                                  <div className='results-line'>
                                    <div className='result-icon' id='search'></div>
                                    <div className='results-text'>
                                      <h5 className='text-title'>last inspection: </h5>
                                      <h5 className='text-result'>{item.inspection_date}</h5>
                                    </div>
                                  </div>
                                </div>
                                <div className='buttons'>
                                  {savedProperties.some(property => property.address === item.address && property.postcode === item.postcode) ?
                                    <div className='saved-message'>
                                      <h3>❤️</h3>
                                      <h3>Saved</h3>
                                    </div>
                                    :
                                    archivedProperties.some(property => property.address === item.address && property.postcode === item.postcode) ?
                                      <div className='saved-message'>
                                        <h3>⭐️</h3>
                                        <h3>Archived</h3>
                                      </div>
                                      :
                                      <>
                                        <div className='heart-icon' onClick={() => addPartialFavourite(item)} ></div>
                                        <button className='expansion' style={{ backgroundColor: expandedItems.has(index) ? '#1A276C' : '#1A276C' }} onClick={() => toggleExpandedItem(index)}>
                                          {expandedItems.has(index) ? '-' : '+'}
                                        </button>
                                      </>
                                  }
                                </div>

                              </div>


                              {expandedItems.has(index) && (
                                <>
                                  <hr className='property-divider' />

                                  {matchingProperties[index] && matchingProperties[index].length > 0 ?
                                    <>
                                      <h3 className='matching-title'>Matching properties</h3>
                                      <div className='expanded-section-titles'>
                                        <p className='column' id='column1'>#</p>
                                        <p className='column' id='column2'>Address</p>
                                        <p className='column' id='column3'>Postcode</p>
                                        <p className='column' id='column4'>Price</p>
                                        <p className='column' id='column5'>Bedrooms</p>
                                        <p className='column' id='column6'></p>
                                      </div>

                                    </>
                                    : ''}

                                  <div className='expanded-section'>
                                    {matchingProperties[index] && matchingProperties[index].length > 0 ?
                                      matchingProperties[index].map((matchingItem, matchingIndex) => (
                                        // Render each matching property here
                                        <div className='expanded-content' key={matchingIndex} >
                                          <p className='column' id='column1' onClick={() => handleVisitUrl(matchingItem.url)}>{matchingIndex + 1} </p>
                                          <p className='column' id='column2' onClick={() => handleVisitUrl(matchingItem.url)}>{matchingItem.displayAddress}</p>
                                          <p className='column' id='column3' onClick={() => handleVisitUrl(matchingItem.url)}>{matchingItem.postcode}</p>
                                          <p className='column' id='column4' onClick={() => handleVisitUrl(matchingItem.url)}>{matchingItem.price}</p>
                                          <p className='column' id='column5' onClick={() => handleVisitUrl(matchingItem.url)}>{matchingItem.bedrooms}</p>
                                          <div className='column' id='column6' >
                                            {savedProperties.some(property => property.rightmove_id === matchingItem.rightmove_id) ?
                                              <div className='saved-message'>
                                                <h3>❤️</h3>
                                                <h3>Saved</h3>
                                              </div>
                                              :
                                              archivedProperties.some(property => property.rightmove_id === matchingItem.rightmove_id) ?
                                                <div className='saved-message'>
                                                  <h3>⭐️</h3>
                                                  <h3>Archived</h3>
                                                </div>
                                                :

                                                <div className='heart-icon' onClick={() => addFavourite(matchingItem, item)} ></div>
                                            }
                                          </div>

                                        </div>
                                      )) :
                                      <p className='denied'>No matching properties found for {item.address}.</p>
                                    }
                                  </div>
                                </>
                              )}
                              <hr className='property-divider' />

                            </>
                          )
                        })
                        : ''}

                    </div>
                  </>
                  : ''}
          </div>


        </div>
      </div>
      <SavedProperties
        savedActionShow={savedActionShow}
        handleSavedActionClose={handleSavedActionClose}
        setLeadGenSection={setLeadGenSection}
        latestFavourites={latestFavourites}
      />
    </>
  )
}


export default ManualMatcher