/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getUserToken, isUserAuth, getAccessToken } from '../auth/Auth'
import { Modal } from 'react-bootstrap'
import { NumericFormat } from 'react-number-format'
import NavBar from '../tools/NavBar'



const Profile = () => {

  // set params for accessing specific pages
  const { id } = useParams()

  // state to enable navigation between pages
  const navigate = useNavigate()

  // set error state for capturing errors
  const [errors, setErrors] = useState(false)

  // set state for user data
  const [userData, setUserData] = useState([])

  // state to collect properties
  const [properties, setProperties] = useState()

  // state for favourite data
  const [favouritesData, setFavouritesData] = useState()

  // state for favourite ids
  const [favouriteIds, setFavouriteIds] = useState()

  // state for setting the property search data
  const [propertySearch, setPropertySearch] = useState({})

  // set for capturing the id of the edit search
  const [editSearch, setEditSearch] = useState()

  // state for determining length of time been a user
  const [joinedDate, setJoinedDate] = useState()
  const [memberTime, setMemberTime] = useState()

  // state for controlling the buttons at the top of the page
  const [selection, setSelection] = useState({
    choice: 'My properties',
  })

  // state for list of favourite properties
  const [favouriteProperties, setFavouriteProperties] = useState()

  // states for holding the tube information
  const [tubeDataset, setTubeDataset] = useState([])
  const [stations, setStations] = useState([])
  const [lines, setLines] = useState([])

  // states for holding the train information
  const [trains, setTrains] = useState([])
  const [trainStations, setTrainStations] = useState([])

  // favourites id setting
  useEffect(() => {
    if (favouritesData) {
      const favouriteList = []
      favouritesData.forEach(user => favouriteList.includes(user.property) ? '' : favouriteList.push(user.property))
      setFavouriteIds(favouriteList)
      // console.log('favourite ids ->', favouriteList)
    }
  }, [favouritesData])


  // load in the user information
  const loadUserData = () => {
    if (isUserAuth()) {
      try {
        const getUser = async () => {
          const { data } = await axios.get(`/api/auth/profile/${getUserToken()}/`, {
            headers: {
              Authorization: `Bearer ${getAccessToken()}`,
            },
          })
          console.log('user data ->', data)
          setUserData(data)
          setFavouritesData(data.favourites)
          console.log(data.favourites)
          setJoinedDate(data.date_joined)
          setPropertySearch(data.property_search_details)
        }
        getUser()
      } catch (error) {
        setErrors(true)
        console.log(error)
      }
    } else {
      console.log('no access')
      navigate('/access-denied')
    }
  }

  useEffect(() => {
    loadUserData()
  }, [])

  // load in property data
  const getProperties = async () => {
    try {
      const { data } = await axios.get('/api/properties/')
      setProperties(data)
      console.log('property data ->', data)
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  useEffect(() => {
    getProperties()
  }, [])


  // filter property data to only show the favourite properties
  useEffect(() => {
    if (properties && favouriteIds) {
      const result = properties.filter(property => favouriteIds.includes(property.id))
      setFavouriteProperties(result)
      console.log('favourite properties ->', result)
    }
  }, [properties])


  // set specific searech details on click of button
  const setID = e => {
    const result = propertySearch.filter(property => {
      return property.result_id === parseInt(e.target.id)
    })
    window.localStorage.setItem('wittle-form-input', JSON.stringify(result[0]))
    // console.log('indivdual search ->', result)
    navigate('/wittle-results/')
  }



  // ? Managing states for modal to edit a search
  // set state for showing insights modal
  const [editShow, setEditShow] = useState(false)

  // close modal
  const handleEditClose = () => {
    setEditShow(false)
  }

  // show the modal
  const handleEditShow = (e) => {
    const result = propertySearch.filter(property => {
      return property.result_id === parseInt(e.target.id)
    })
    setEditSearch(result[0])
    console.log('edit parameters ->', result)
    setEditShow(true)
  }



  const postEditSearch = async (e) => {
    try {
      const formData = {
        owner: editSearch.owner,
        start_search: editSearch.start_search,
        search_name: editSearch.search_name,
        restaurant_selection: editSearch.restaurant_selection,
        restaurant_decision: editSearch.restaurant_decision,
        restaurant_distance: editSearch.restaurant_distance,
        restaurant_cuisine_1: editSearch.restaurant_cuisine_1,
        restaurant_cuisine_2: editSearch.restaurant_cuisine_2,
        takeaway_selection: editSearch.takeaway_selection,
        takeaway_decision: editSearch.takeaway_decision,
        takeaway_distance: editSearch.takeaway_distance,
        takeaway_cuisine_1: editSearch.takeaway_cuisine_1,
        takeaway_cuisine_2: editSearch.takeaway_cuisine_2,
        pubs_selection: editSearch.pubs_selection,
        pubs_distance: editSearch.pubs_distance,
        cafes_selection: editSearch.cafes_selection,
        cafes_decision: editSearch.cafes_decision,
        cafes_detail: editSearch.cafes_detail,
        cafes_distance: editSearch.cafes_distance,
        tube_selection: editSearch.tube_selection,
        tube_decision: editSearch.tube_decision,
        tube_detail: editSearch.tube_detail,
        tube_distance: editSearch.tube_distance,
        train_selection: editSearch.train_selection,
        train_decision: editSearch.train_decision,
        train_detail: editSearch.train_detail,
        train_distance: editSearch.train_distance,
        primary_selection: editSearch.primary_selection,
        primary_religion: editSearch.primary_religion,
        primary_mode: editSearch.primary_mode,
        primary_distance: editSearch.primary_distance,
        college_selection: editSearch.college_selection,
        college_religion: editSearch.college_religion,
        college_mode: editSearch.college_mode,
        college_distance: editSearch.college_distance,
        secondary_selection: editSearch.secondary_selection,
        secondary_religion: editSearch.secondary_religion,
        secondary_mode: editSearch.secondary_mode,
        secondary_distance: editSearch.secondary_distance,
        supermarket_selection: editSearch.supermarket_selection,
        supermarket_decision: editSearch.supermarket_decision,
        supermarket_segment: editSearch.supermarket_segment,
        supermarket_size: editSearch.supermarket_size,
        supermarket_distance: editSearch.supermarket_distance,
        gym_selection: editSearch.gym_selection,
        gym_studio_name: editSearch.gym_studio_name,
        gym_class_type: editSearch.gym_class_type,
        gym_distance: editSearch.gym_distance,
        park_selection: editSearch.park_selection,
        park_type: editSearch.park_type,
        park_distance: editSearch.park_distance,
        workplace_selection: editSearch.workplace_selection,
        workplace_detail: editSearch.workplace_detail,
        workplace_transport: editSearch.workplace_transport,
        workplace_distance: editSearch.workplace_distance,
        family_selection: editSearch.family_selection,
        family_detail_1: editSearch.family_detail_1,
        family_distance_1: editSearch.family_distance_1,
        family_detail_2: editSearch.family_detail_2,
        family_distance_2: editSearch.family_distance_2,
        family_detail_3: editSearch.family_detail_3,
        family_distance_3: editSearch.family_distance_3,
        property_price_min: editSearch.property_price_min,
        property_price_max: editSearch.property_price_max,
        property_bed_min: editSearch.property_bed_min,
        property_bed_max: editSearch.property_bed_max,
        property_type: editSearch.property_type,
      }
      const { data } = await axios.put(`/api/property-search/${e.target.value}`, formData, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      window.localStorage.setItem('wittle-form-input', JSON.stringify(data))
      console.log(e.target.id)
      if (e.target.id === 'Submit')
        navigate('/wittle-results/')
      else if (e.target.id === 'Save')
        getProperties()
      setEditShow(false)
      loadUserData()
    } catch (error) {
      console.log(error)
    }
  }

  // function to delete the search
  const deleteSearch = async (e) => {
    try {
      const { data } = await axios.delete(`/api/property-search/${parseInt(e.target.id)}`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
    } catch (error) {
      console.log('error message ->', error)
      console.log('error detail ->', error.response.data)
    }
    loadUserData()
    getProperties()
  }


  // Function to delete property
  const deleteProperty = async (e) => {
    try {
      const { data } = await axios.delete(`/api/favourites/${parseInt(e.target.id)}/`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
    } catch (error) {
      console.log(error)
      console.log('error detail ->', error.response.data)
    }
    loadUserData()
    getProperties()
  }


  // ? Managing states for the drop down menus of stations and lines
  // ectract tube data from the database
  useEffect(() => {
    const getTubes = async () => {
      try {
        const { data } = await axios.get('/api/tubes/')
        setTubeDataset(data)
        // console.log('tube data ->', data)
      } catch (error) {
        setErrors(true)
        console.log(error)
      }
    }
    getTubes()
  }, [])

  // extract train data from the database
  useEffect(() => {
    const getTrains = async () => {
      try {
        const { data } = await axios.get('/api/trains/')
        setTrains(data)
        // console.log('train data ->', data)
      } catch (error) {
        setErrors(true)
        console.log(error)
      }
    }
    getTrains()
  }, [])

  // create lsits so we have a dropdown
  useEffect(() => {
    if (trains.length) {
      const stationList = []
      trains.forEach(station => stationList.includes(station.station_name) ? '' : stationList.push(station.station_name))
      setTrainStations(stationList)
    }
  }, [trains])

  // create lsits so we have a dropdown
  useEffect(() => {
    if (tubeDataset.length) {
      const stationList = []
      const lineList = []
      tubeDataset.forEach(station => stationList.includes(station.station_name) ? '' : stationList.push(station.station_name))
      tubeDataset.forEach(line => lineList.includes(line.line) ? '' : lineList.push(line.line))
      setStations(stationList)
      setLines(lineList)
    }
  }, [tubeDataset])


  // ? Organising the elements for the property comparison section
  // setting states
  const [property1, setProperty1] = useState()
  const [property2, setProperty2] = useState()

  const [propertyList, setPropertyList] = useState()

  const [property1Numbers, setProperty1Numbers] = useState([])
  const [property2Numbers, setProperty2Numbers] = useState()

  // create dropdown property list
  useEffect(() => {
    if (favouriteProperties) {
      const list = []
      favouriteProperties.forEach(property => list.includes(property.property_name) ? '' : list.push(property.property_name))
      setPropertyList(list)
      console.log(list)
    }
  }, [favouriteProperties])

  // useEffect(() => {
  //   if (property1 & ) {


  //   }
  // })


  const [propertyColours, setPropertyColours] = useState({
    property1_total: '',
    property2_total: '',
    property1_restaurant: '',
    property2_reestaurant: '',
    property1_pub: '',
    property2_pub: '',
    property1_cafe: '',
    property2_cafe: '',
    property1_takeaway: '',
    property2_takeaway: '',
    property1_tube: '',
    property2_tube: '',
    property1_train: '',
    property2_train: '',
    property1_supermarket: '',
    property2_supermarket: '',
    property1_gym: '',
    property2_gym: '',
    property1_park: '',
    property2_park: '',
    property1_primary: '',
    property2_primary: '',
    property1_secondary: '',
    property2_secondary: '',
  })

  const updateComparison1 = (e) => {
    setProperty1(e.target.value)
    const result = favouritesData.filter(property => {
      return property.property_name === e.target.value
    })
    setProperty1Numbers(result)
    console.log('1 ->', result)
  }


  const updateComparison2 = (e) => {
    setProperty2(e.target.value)
    const result = favouritesData.filter(property => {
      return property.property_name === e.target.value
    })
    setProperty2Numbers(result)
    console.log('2 ->', result)
  }

  // state to handle the properties for sale or rent
  const [channel, setChannel] = useState({
    channel: 'For Sale',
  })

  return (
    <>
      <section className='profile-page'>
        <NavBar />
        {errors ?
          <section className='denied-section'>

          </section>
          :
          <>
            <section className='profile-page-body'>
              <div className='profile-top'>
                <div className='profile-intro'>
                  <h1 className='profile-name'>{userData ? userData.first_name : '' }</h1>
                  <p className='profile-bio'>Thanks for being part of Wittle. Welcome to your account, this is a collection of everything you like on Wittle.. enjoy!</p>
                </div>
                <div className='top-insights'>
                  <div className='box-insights'>
                    <h1>{favouriteProperties ? favouriteProperties.length : ''}</h1>
                    <p>Saved properties</p>
                  </div>
                  <div className='box-insights'>
                    <h1>{propertySearch ? propertySearch.length : ''}</h1>
                    <p>Saved searches</p>
                  </div>
                  <div className='box-insights'>
                    <h1>3</h1>
                    <p>Saved areas</p>
                  </div>
                </div>
              </div>
              <div className='profile-content'>
                <div className='selection-buttons'>
                  <h4 onClick={() => setSelection({ ...selection, choice: 'My properties' })} style={{ color: selection.choice === 'My properties' ? '#152BA4' : '#152BA4', textDecoration: selection.choice === 'My properties' ? 'underline 3px #FFA7E5' : 'none', fontWeight: selection.choice === 'My properties' ? '700' : '400' }}>My properties</h4>
                  <h4 onClick={() => setSelection({ ...selection, choice: 'My searches' })} style={{ color: selection.choice === 'My searches' ? '#152BA4' : '#152BA4', textDecoration: selection.choice === 'My searches' ? 'underline 3px #FFA7E5' : 'none', fontWeight: selection.choice === 'My searches' ? '700' : '400' }}>My searches</h4>
                  <h4 onClick={() => setSelection({ ...selection, choice: 'Property comparison' })} style={{ color: selection.choice === 'Property comparison' ? '#152BA4' : '#152BA4', textDecoration: selection.choice === 'Property comparison' ? 'underline 3px #FFA7E5' : 'none', fontWeight: selection.choice === 'Property comparison' ? '700' : '400' }}>Property comparison</h4>
                  <h4 onClick={() => setSelection({ ...selection, choice: 'Personal details' })} style={{ color: selection.choice === 'Personal details' ? '#152BA4' : '#152BA4', textDecoration: selection.choice === 'Personal details' ? 'underline 3px #FFA7E5' : 'none', fontWeight: selection.choice === 'Personal details' ? '700' : '400' }}>Personal details</h4>
                  <h4 onClick={() => setSelection({ ...selection, choice: 'Contact preferences' })} style={{ color: selection.choice === 'Contact preferences' ? '#152BA4' : '#152BA4', textDecoration: selection.choice === 'Contact preferences' ? 'underline 3px #FFA7E5' : 'none', fontWeight: selection.choice === 'Contact preferences' ? '700' : '400' }}>Contact preferences</h4>
                </div>
                <div className='selection-detail'>
                  {selection.choice === 'My properties' ?
                    <>
                      <div className='property-choice' name='channel' onChange={(e) => setChannel({ ...channel, channel: e.target.value })}>
                        <select>
                          <option>For Sale</option>
                          <option>For Rent</option>
                        </select>
                      </div>
                      <div className='property-grid'>
                        {favouriteProperties && channel.channel === 'For Rent' ?
                          <div className='property-card'>
                            {favouriteProperties.filter(property => property.channel === 'Rent').map(property => {
                              return (
                                <>
                                  <div className='property-detail'>
                                    <div className='property-image' onClick={() => navigate(`/wittle-results/${property.id}`)} style={{ backgroundImage: `url('${property.property_image_1}')` }}>
                                    </div>
                                    <div className='property-text-top'>
                                      <h5>{property.property_name}</h5>
                                      <h5><NumericFormat value={property.monthly} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h5>
                                    </div>
                                    <div className='property-text-bottom'>
                                      <h5>{property.type}</h5>
                                      <h5>🛌 {property.bedrooms}</h5>
                                      <button id={property.id} onClick={deleteProperty}>Delete</button>
                                    </div>
                                  </div>
                                </>
                              )
                            })}
                          </div>
                          :
                          favouriteProperties && channel.channel === 'For Sale' ?
                            <div className='property-card'>
                              {favouriteProperties.filter(property => property.channel === 'Sale').map(property => {
                                return (
                                  <>
                                    <div className='property-detail'>
                                      <div className='property-image' onClick={() => navigate(`/wittle-results/${property.id}`)} style={{ backgroundImage: `url('${property.property_image_1}')` }}>
                                      </div>
                                      <div className='property-text-top'>
                                        <h5>{property.property_name}</h5>
                                        <h5><NumericFormat value={property.value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h5>
                                      </div>
                                      <div className='property-text-bottom'>
                                        <h5>{property.type}</h5>
                                        <h5>🛌 {property.bedrooms}</h5>
                                        <button id={property.id} onClick={deleteProperty}>Delete</button>
                                      </div>
                                    </div>
                                  </>
                                )
                              })}
                            </div>
                            : ''}
                      </div>
                    </>
                    :
                    selection.choice === 'My searches' ?
                      <>
                        <div className='search-grid'>
                          {userData ?
                            <div className='search-card'>
                              {userData.property_search_details.map((search, index) => {
                                return (
                                  <>
                                    <div className='search-detail' key={index}>
                                      <div className='search-title'>
                                        <h3>{search.search_name}</h3>
                                        <div className='search-buttons'>
                                          <button onClick={deleteSearch} id={search.result_id} className='transparent-btn'>Delete</button>
                                          <button onClick={handleEditShow} id={search.result_id} className='transparent-btn'>Edit</button>
                                          <button onClick={setID} key={index} id={search.result_id} className='block-btn'>Results</button>
                                        </div>
                                      </div>
                                      <div className='search-footer'>
                                        <div className='search-footer-property'>
                                          <div className='search-summary'>
                                            <h1 className='search-count'>{search.total_properties}</h1>
                                            <p className='search-description'>properties</p>
                                          </div>
                                        </div>
                                        <div className='search-footer-scores'>
                                          <div className='search-summary'>
                                            <h1 className='search-count'>🔥 {search.top_score}%</h1>
                                            <p className='search-description'>max match</p>
                                          </div>
                                          <div className='search-summary'>
                                            <h1 className='search-count'>🔥 {search.average_score}%</h1>
                                            <p className='search-description'>avg match</p>
                                          </div>
                                        </div>
                                      </div>
                                      <div className='search-content'>
                                        <div className='search-left'>
                                          <h4>Property criteria</h4>
                                          <div className='search-section-detail'>
                                            <p>🏠  Type: {search.property_type}</p>
                                            <p>💷  Price: <NumericFormat value={search.property_price_min} displayType={'text'} thousandSeparator={true} prefix={'£'} /> - <NumericFormat value={search.property_price_max} displayType={'text'} thousandSeparator={true} prefix={'£'} /></p>
                                            <p>🛌  Bedrooms: {search.property_bed_min} - {search.property_bed_max}</p>
                                          </div>
                                        </div>
                                        <div className='search-right'>
                                          <h4>Search requirements</h4>
                                          {propertySearch ?
                                            <div className='search-section-detail'>
                                              {search.restaurant_selection ? <button className='pills'>Restaurants</button> : ''}
                                              {search.takeaway_selection ? <button className='pills'>Takeaways</button> : ''}
                                              {search.pubs_selection ? <button className='pills'>Pubs</button> : ''}
                                              {search.cafes_selection ? <button className='pills'>Cafes</button> : ''}
                                              {search.supermarket_selection ? <button className='pills'>Supermarkets</button> : ''}
                                              {search.gym_selection ? <button className='pills'>Gyms</button> : ''}
                                              {search.park_selection ? <button className='pills'>Parks</button> : ''}
                                              {search.workplace_selection ? <button className='pills'>Work</button> : ''}
                                              {search.tube_selection ? <button className='pills'>Tubes</button> : ''}
                                              {search.train_selection ? <button className='pills'>Trains</button> : ''}
                                              {search.primary_selection ? <button className='pills'>Primaries</button> : ''}
                                              {search.secondary_selection ? <button className='pills'>Secondaries</button> : ''}
                                              {search.college_selection ? <button className='pills'>Colleges</button> : ''}
                                              {search.family_selection ? <button className='pills'>Family</button> : ''}
                                            </div>
                                            : ''}
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )
                              }).sort((a, b) => b.result_id - a.result_id)}
                            </div> : ''}
                        </div>
                      </>
                      // Property Comparison section //
                      : selection.choice === 'Property comparison' ?
                        <>
                          <div className='comparison-grid'>
                            <div className='comparison-title'>
                              <h1>Property 1</h1>
                              <h1 className='desktop-results'>Results</h1>
                              <h1>Property 2</h1>
                            </div>
                            <div className='comparison-subtitle'>
                              <select className='comparison-dropdown' onChange={updateComparison1}>
                                <option>Select property</option>
                                {propertyList.map((property, index) => <option key={index} value={property}>{property}</option>)}
                              </select>
                              <select className='comparison-dropdown' onChange={updateComparison2}>
                                <option>Select property</option>
                                {propertyList.map((property, index) => <option key={index} value={property}>{property}</option>)}
                              </select>
                            </div>
                            {/* create section to be used on mobile */}
                            <div className='comparison-properties-mobile'>
                              {favouriteProperties ? favouriteProperties.filter(property => property.property_name === property1).map((property, index) => {
                                return (
                                  <div className='comparison-property' key={index} onClick={() => navigate(`/wittle-results/${property.id}`)}>
                                    <>
                                      <div className='comparison-image' style={{ backgroundImage: `url('${property.property_image_1}')` }}></div>
                                      <div className='comparison-content'>
                                        <h4>{property.property_name}</h4>
                                        <h5><NumericFormat value={property.value} displayType={'text'} thousandSeparator={true} prefix={'£'} /> offers over</h5>
                                        <h5>Bedrooms: {property.bedrooms}</h5>
                                        <h5>Type: {property.type}</h5>
                                      </div>
                                    </>
                                  </div>
                                )
                              }) : ''}
                              {favouriteProperties ? favouriteProperties.filter(property => property.property_name === property2).map((property, index) => {
                                return (
                                  <div className='comparison-property' key={index} onClick={() => navigate(`/wittle-results/${property.id}`)}>
                                    <>
                                      <div className='comparison-image' style={{ backgroundImage: `url('${property.property_image_1}')` }}></div>
                                      <div className='comparison-content'>
                                        <h4>{property.property_name}</h4>
                                        <h5><NumericFormat value={property.value} displayType={'text'} thousandSeparator={true} prefix={'£'} /> offers over</h5>
                                        <h5>Bedrooms: {property.bedrooms}</h5>
                                        <h5>Type: {property.type}</h5>
                                      </div>
                                    </>
                                  </div>
                                )
                              }) : ''}
                            </div>

                            {/* Main section used on desktop */}
                            <div className='comparison-body'>
                              {favouriteProperties ? favouriteProperties.filter(property => property.property_name === property1).map((property, index) => {
                                return (
                                  <div className='comparison-property' key={index} onClick={() => navigate(`/wittle-results/${property.id}`)}>
                                    <>
                                      <div className='comparison-image' style={{ backgroundImage: `url('${property.property_image_1}')` }}></div>
                                      <div className='comparison-content'>
                                        <h4>{property.property_name}</h4>
                                        <h5><NumericFormat value={property.value} displayType={'text'} thousandSeparator={true} prefix={'£'} /> offers over</h5>
                                        <h5>Bedrooms: {property.bedrooms}</h5>
                                        <h5>Type: {property.type}</h5>
                                      </div>
                                    </>
                                  </div>
                                )
                              }) : ''}
                              <div className='comparison-results'>
                                {(property1 || property2) ?
                                  <>
                                    {/* Total */}
                                    <div className='result-title'>
                                      <h5>Total score</h5>
                                    </div>
                                    <div className='results-rows'>
                                      <div className='results-left'>
                                        {favouritesData.filter(property => property.property_name === property1).map((property, index) => {
                                          return (
                                            <>
                                              {[...Array(100 - property.total_score)].map((choice, index) => {
                                                return (
                                                  <div className='blank-bars' key={index} >
                                                    <div>.</div>
                                                  </div>
                                                )
                                              })}
                                              <h5 className='left-score' name={propertyColours.property1_total}>{property.total_score}%</h5>
                                              {[...Array(property.total_score)].map((choice, index) => {
                                                return (
                                                  <div className='bars' style={{
                                                    backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                                      return parseInt(property.total_score)
                                                    })) : 0) < ((property2Numbers) ? parseInt(property2Numbers.map((property, index) => {
                                                      return parseInt(property.total_score)
                                                    })) : 0) ? '#152BA4' : '#FFA7E5',
                                                  }} key={index} >
                                                    <div>.</div>
                                                  </div>
                                                )
                                              })}
                                            </>
                                          )
                                        })}
                                      </div>
                                      <div className='results-right'>
                                        {favouritesData.filter(property => property.property_name === property2).map((property, index) => {
                                          return (
                                            <>
                                              {[...Array(property.total_score)].map((choice, index) => {
                                                return (
                                                  <div className='bars' style={{
                                                    backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                                      return property.total_score
                                                    })) : 0) > (property2Numbers ? parseInt(property2Numbers.map((property, index) => {
                                                      return property.total_score
                                                    })) : 0) ? '#152BA4' : '#FFA7E5',
                                                  }} key={index} >
                                                    <div>.</div>
                                                  </div>
                                                )
                                              })}
                                              <h5 className='right-score'>{property.total_score}%</h5>
                                            </>
                                          )
                                        })}
                                      </div>
                                    </div>
                                    {/* Restaurants */}
                                    <div className='result-title'>
                                      <h5>Restaurants</h5>
                                    </div>
                                    <div className='results-rows'>
                                      <div className='results-left'>
                                        {favouritesData.filter(property => property.property_name === property1).map((property, index) => {
                                          return (
                                            <>
                                              {[...Array(100 - property.restaurant_score)].map((choice, index) => {
                                                return (
                                                  <div className='blank-bars' key={index} >
                                                    <div>.</div>
                                                  </div>
                                                )
                                              })}
                                              <h5 className='left-score' name={propertyColours.property1_total}>{property.restaurant_score}%</h5>
                                              {[...Array(property.restaurant_score)].map((choice, index) => {
                                                return (
                                                  <div className='bars' style={{
                                                    backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                                      return parseInt(property.restaurant_score)
                                                    })) : 0) < ((property2Numbers) ? parseInt(property2Numbers.map((property, index) => {
                                                      return parseInt(property.restaurant_score)
                                                    })) : 0) ? '#152BA4' : '#FFA7E5',
                                                  }} key={index} >
                                                    <div>.</div>
                                                  </div>
                                                )
                                              })}
                                            </>
                                          )
                                        })}
                                      </div>
                                      <div className='results-right'>
                                        {favouritesData.filter(property => property.property_name === property2).map((property, index) => {
                                          return (
                                            <>
                                              {[...Array(property.restaurant_score)].map((choice, index) => {
                                                return (
                                                  <div className='bars' style={{
                                                    backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                                      return property.restaurant_score
                                                    })) : 0) > (property2Numbers ? parseInt(property2Numbers.map((property, index) => {
                                                      return property.restaurant_score
                                                    })) : 0) ? '#152BA4' : '#FFA7E5',
                                                  }} key={index} >
                                                    <div>.</div>
                                                  </div>
                                                )
                                              })}
                                              <h5 className='right-score'>{property.restaurant_score}%</h5>
                                            </>
                                          )
                                        })}
                                      </div>
                                    </div>
                                    {/* Pubs */}
                                    <div className='result-title'>
                                      <h5>Pubs</h5>
                                    </div>
                                    <div className='results-rows'>
                                      <div className='results-left'>
                                        {favouritesData.filter(property => property.property_name === property1).map((property, index) => {
                                          return (
                                            <>
                                              {[...Array(100 - property.pubs_score)].map((choice, index) => {
                                                return (
                                                  <div className='blank-bars' key={index} >
                                                    <div>.</div>
                                                  </div>
                                                )
                                              })}
                                              <h5 className='left-score' name={propertyColours.property1_total}>{property.pubs_score}%</h5>
                                              {[...Array(property.pubs_score)].map((choice, index) => {
                                                return (
                                                  <div className='bars' style={{
                                                    backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                                      return parseInt(property.pubs_score)
                                                    })) : 0) < ((property2Numbers) ? parseInt(property2Numbers.map((property, index) => {
                                                      return parseInt(property.pubs_score)
                                                    })) : 0) ? '#152BA4' : '#FFA7E5',
                                                  }} key={index} >
                                                    <div>.</div>
                                                  </div>
                                                )
                                              })}
                                            </>
                                          )
                                        })}
                                      </div>
                                      <div className='results-right'>
                                        {favouritesData.filter(property => property.property_name === property2).map((property, index) => {
                                          return (
                                            <>
                                              {[...Array(property.pubs_score)].map((choice, index) => {
                                                return (
                                                  <div className='bars' style={{
                                                    backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                                      return property.pubs_score
                                                    })) : 0) > (property2Numbers ? parseInt(property2Numbers.map((property, index) => {
                                                      return property.pubs_score
                                                    })) : 0) ? '#152BA4' : '#FFA7E5',
                                                  }} key={index} >
                                                    <div>.</div>
                                                  </div>
                                                )
                                              })}
                                              <h5 className='right-score'>{property.pubs_score}%</h5>
                                            </>
                                          )
                                        })}
                                      </div>
                                    </div>
                                    {/* Takeaways */}
                                    <div className='result-title'>
                                      <h5>Takeaways</h5>
                                    </div>
                                    <div className='results-rows'>
                                      <div className='results-left'>
                                        {favouritesData.filter(property => property.property_name === property1).map((property, index) => {
                                          return (
                                            <>
                                              {[...Array(100 - property.takeaway_score)].map((choice, index) => {
                                                return (
                                                  <div className='blank-bars' key={index} >
                                                    <div>.</div>
                                                  </div>
                                                )
                                              })}
                                              <h5 className='left-score' name={propertyColours.property1_total}>{property.takeaway_score}%</h5>
                                              {[...Array(property.takeaway_score)].map((choice, index) => {
                                                return (
                                                  <div className='bars' style={{
                                                    backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                                      return parseInt(property.takeaway_score)
                                                    })) : 0) < ((property2Numbers) ? parseInt(property2Numbers.map((property, index) => {
                                                      return parseInt(property.takeaway_score)
                                                    })) : 0) ? '#152BA4' : '#FFA7E5',
                                                  }} key={index} >
                                                    <div>.</div>
                                                  </div>
                                                )
                                              })}
                                            </>
                                          )
                                        })}
                                      </div>
                                      <div className='results-right'>
                                        {favouritesData.filter(property => property.property_name === property2).map((property, index) => {
                                          return (
                                            <>
                                              {[...Array(property.takeaway_score)].map((choice, index) => {
                                                return (
                                                  <div className='bars' style={{
                                                    backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                                      return property.takeaway_score
                                                    })) : 0) > (property2Numbers ? parseInt(property2Numbers.map((property, index) => {
                                                      return property.takeaway_score
                                                    })) : 0) ? '#152BA4' : '#FFA7E5',
                                                  }} key={index} >
                                                    <div>.</div>
                                                  </div>
                                                )
                                              })}
                                              <h5 className='right-score'>{property.takeaway_score}%</h5>
                                            </>
                                          )
                                        })}
                                      </div>
                                    </div>
                                    {/* Cafes */}
                                    <div className='result-title'>
                                      <h5>Cafes</h5>
                                    </div>
                                    <div className='results-rows'>
                                      <div className='results-left'>
                                        {favouritesData.filter(property => property.property_name === property1).map((property, index) => {
                                          return (
                                            <>
                                              {[...Array(100 - property.cafes_score)].map((choice, index) => {
                                                return (
                                                  <div className='blank-bars' key={index} >
                                                    <div>.</div>
                                                  </div>
                                                )
                                              })}
                                              <h5 className='left-score' name={propertyColours.property1_total}>{property.cafes_score}%</h5>
                                              {[...Array(property.cafes_score)].map((choice, index) => {
                                                return (
                                                  <div className='bars' style={{
                                                    backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                                      return parseInt(property.cafes_score)
                                                    })) : 0) < ((property2Numbers) ? parseInt(property2Numbers.map((property, index) => {
                                                      return parseInt(property.cafes_score)
                                                    })) : 0) ? '#152BA4' : '#FFA7E5',
                                                  }} key={index} >
                                                    <div>.</div>
                                                  </div>
                                                )
                                              })}
                                            </>
                                          )
                                        })}
                                      </div>
                                      <div className='results-right'>
                                        {favouritesData.filter(property => property.property_name === property2).map((property, index) => {
                                          return (
                                            <>
                                              {[...Array(property.cafes_score)].map((choice, index) => {
                                                return (
                                                  <div className='bars' style={{
                                                    backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                                      return property.cafes_score
                                                    })) : 0) > (property2Numbers ? parseInt(property2Numbers.map((property, index) => {
                                                      return property.cafes_score
                                                    })) : 0) ? '#152BA4' : '#FFA7E5',
                                                  }} key={index} >
                                                    <div>.</div>
                                                  </div>
                                                )
                                              })}
                                              <h5 className='right-score'>{property.cafes_score}%</h5>
                                            </>
                                          )
                                        })}
                                      </div>
                                    </div>
                                    {/* Tubes */}
                                    <div className='result-title'>
                                      <h5>Tubes</h5>
                                    </div>
                                    <div className='results-rows'>
                                      <div className='results-left'>
                                        {favouritesData.filter(property => property.property_name === property1).map((property, index) => {
                                          return (
                                            <>
                                              {[...Array(100 - property.tube_score)].map((choice, index) => {
                                                return (
                                                  <div className='blank-bars' key={index} >
                                                    <div>.</div>
                                                  </div>
                                                )
                                              })}
                                              <h5 className='left-score' name={propertyColours.property1_total}>{property.tube_score}%</h5>
                                              {[...Array(property.tube_score)].map((choice, index) => {
                                                return (
                                                  <div className='bars' style={{
                                                    backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                                      return parseInt(property.tube_score)
                                                    })) : 0) < ((property2Numbers) ? parseInt(property2Numbers.map((property, index) => {
                                                      return parseInt(property.tube_score)
                                                    })) : 0) ? '#152BA4' : '#FFA7E5',
                                                  }} key={index} >
                                                    <div>.</div>
                                                  </div>
                                                )
                                              })}
                                            </>
                                          )
                                        })}
                                      </div>
                                      <div className='results-right'>
                                        {favouritesData.filter(property => property.property_name === property2).map((property, index) => {
                                          return (
                                            <>
                                              {[...Array(property.tube_score)].map((choice, index) => {
                                                return (
                                                  <div className='bars' style={{
                                                    backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                                      return property.tube_score
                                                    })) : 0) > (property2Numbers ? parseInt(property2Numbers.map((property, index) => {
                                                      return property.tube_score
                                                    })) : 0) ? '#152BA4' : '#FFA7E5',
                                                  }} key={index} >
                                                    <div>.</div>
                                                  </div>
                                                )
                                              })}
                                              <h5 className='right-score'>{property.tube_score}%</h5>
                                            </>
                                          )
                                        })}
                                      </div>
                                    </div>
                                    {/* Supermarkets */}
                                    <div className='result-title'>
                                      <h5>Supermarkets</h5>
                                    </div>
                                    <div className='results-rows'>
                                      <div className='results-left'>
                                        {favouritesData.filter(property => property.property_name === property1).map((property, index) => {
                                          return (
                                            <>
                                              {[...Array(100 - property.supermarket_score)].map((choice, index) => {
                                                return (
                                                  <div className='blank-bars' key={index} >
                                                    <div>.</div>
                                                  </div>
                                                )
                                              })}
                                              <h5 className='left-score' name={propertyColours.property1_total}>{property.supermarket_score}%</h5>
                                              {[...Array(property.supermarket_score)].map((choice, index) => {
                                                return (
                                                  <div className='bars' style={{
                                                    backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                                      return parseInt(property.supermarket_score)
                                                    })) : 0) < ((property2Numbers) ? parseInt(property2Numbers.map((property, index) => {
                                                      return parseInt(property.supermarket_score)
                                                    })) : 0) ? '#152BA4' : '#FFA7E5',
                                                  }} key={index} >
                                                    <div>.</div>
                                                  </div>
                                                )
                                              })}
                                            </>
                                          )
                                        })}
                                      </div>
                                      <div className='results-right'>
                                        {favouritesData.filter(property => property.property_name === property2).map((property, index) => {
                                          return (
                                            <>
                                              {[...Array(property.supermarket_score)].map((choice, index) => {
                                                return (
                                                  <div className='bars' style={{
                                                    backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                                      return property.supermarket_score
                                                    })) : 0) > (property2Numbers ? parseInt(property2Numbers.map((property, index) => {
                                                      return property.supermarket_score
                                                    })) : 0) ? '#152BA4' : '#FFA7E5',
                                                  }} key={index} >
                                                    <div>.</div>
                                                  </div>
                                                )
                                              })}
                                              <h5 className='right-score'>{property.supermarket_score}%</h5>
                                            </>
                                          )
                                        })}
                                      </div>
                                    </div>
                                    {/* Gyms */}
                                    <div className='result-title'>
                                      <h5>Gyms</h5>
                                    </div>
                                    <div className='results-rows'>
                                      <div className='results-left'>
                                        {favouritesData.filter(property => property.property_name === property1).map((property, index) => {
                                          return (
                                            <>
                                              {[...Array(100 - property.gym_score)].map((choice, index) => {
                                                return (
                                                  <div className='blank-bars' key={index} >
                                                    <div>.</div>
                                                  </div>
                                                )
                                              })}
                                              <h5 className='left-score' name={propertyColours.property1_total}>{property.gym_score}%</h5>
                                              {[...Array(property.gym_score)].map((choice, index) => {
                                                return (
                                                  <div className='bars' style={{
                                                    backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                                      return parseInt(property.gym_score)
                                                    })) : 0) < ((property2Numbers) ? parseInt(property2Numbers.map((property, index) => {
                                                      return parseInt(property.gym_score)
                                                    })) : 0) ? '#152BA4' : '#FFA7E5',
                                                  }} key={index} >
                                                    <div>.</div>
                                                  </div>
                                                )
                                              })}
                                            </>
                                          )
                                        })}
                                      </div>
                                      <div className='results-right'>
                                        {favouritesData.filter(property => property.property_name === property2).map((property, index) => {
                                          return (
                                            <>
                                              {[...Array(property.gym_score)].map((choice, index) => {
                                                return (
                                                  <div className='bars' style={{
                                                    backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                                      return property.gym_score
                                                    })) : 0) > (property2Numbers ? parseInt(property2Numbers.map((property, index) => {
                                                      return property.gym_score
                                                    })) : 0) ? '#152BA4' : '#FFA7E5',
                                                  }} key={index} >
                                                    <div>.</div>
                                                  </div>
                                                )
                                              })}
                                              <h5 className='right-score'>{property.gym_score}%</h5>
                                            </>
                                          )
                                        })}
                                      </div>
                                    </div>
                                    {/* Parks */}
                                    <div className='result-title'>
                                      <h5>Parks</h5>
                                    </div>
                                    <div className='results-rows'>
                                      <div className='results-left'>
                                        {favouritesData.filter(property => property.property_name === property1).map((property, index) => {
                                          return (
                                            <>
                                              {[...Array(100 - property.park_score)].map((choice, index) => {
                                                return (
                                                  <div className='blank-bars' key={index} >
                                                    <div>.</div>
                                                  </div>
                                                )
                                              })}
                                              <h5 className='left-score' name={propertyColours.property1_total}>{property.park_score}%</h5>
                                              {[...Array(property.park_score)].map((choice, index) => {
                                                return (
                                                  <div className='bars' style={{
                                                    backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                                      return parseInt(property.park_score)
                                                    })) : 0) < ((property2Numbers) ? parseInt(property2Numbers.map((property, index) => {
                                                      return parseInt(property.park_score)
                                                    })) : 0) ? '#152BA4' : '#FFA7E5',
                                                  }} key={index} >
                                                    <div>.</div>
                                                  </div>
                                                )
                                              })}
                                            </>
                                          )
                                        })}
                                      </div>
                                      <div className='results-right'>
                                        {favouritesData.filter(property => property.property_name === property2).map((property, index) => {
                                          return (
                                            <>
                                              {[...Array(property.park_score)].map((choice, index) => {
                                                return (
                                                  <div className='bars' style={{
                                                    backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                                      return property.park_score
                                                    })) : 0) > (property2Numbers ? parseInt(property2Numbers.map((property, index) => {
                                                      return property.park_score
                                                    })) : 0) ? '#152BA4' : '#FFA7E5',
                                                  }} key={index} >
                                                    <div>.</div>
                                                  </div>
                                                )
                                              })}
                                              <h5 className='right-score'>{property.park_score}%</h5>
                                            </>
                                          )
                                        })}
                                      </div>
                                    </div>
                                    {/* Primaries */}
                                    <div className='result-title'>
                                      <h5>Primary Schools</h5>
                                    </div>
                                    <div className='results-rows'>
                                      <div className='results-left'>
                                        {favouritesData.filter(property => property.property_name === property1).map((property, index) => {
                                          return (
                                            <>
                                              {[...Array(100 - property.primary_score)].map((choice, index) => {
                                                return (
                                                  <div className='blank-bars' key={index} >
                                                    <div>.</div>
                                                  </div>
                                                )
                                              })}
                                              <h5 className='left-score' name={propertyColours.property1_total}>{property.primary_score}%</h5>
                                              {[...Array(property.primary_score)].map((choice, index) => {
                                                return (
                                                  <div className='bars' style={{
                                                    backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                                      return parseInt(property.primary_score)
                                                    })) : 0) < ((property2Numbers) ? parseInt(property2Numbers.map((property, index) => {
                                                      return parseInt(property.primary_score)
                                                    })) : 0) ? '#152BA4' : '#FFA7E5',
                                                  }} key={index} >
                                                    <div>.</div>
                                                  </div>
                                                )
                                              })}
                                            </>
                                          )
                                        })}
                                      </div>
                                      <div className='results-right'>
                                        {favouritesData.filter(property => property.property_name === property2).map((property, index) => {
                                          return (
                                            <>
                                              {[...Array(property.primary_score)].map((choice, index) => {
                                                return (
                                                  <div className='bars' style={{
                                                    backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                                      return property.primary_score
                                                    })) : 0) > (property2Numbers ? parseInt(property2Numbers.map((property, index) => {
                                                      return property.primary_score
                                                    })) : 0) ? '#152BA4' : '#FFA7E5',
                                                  }} key={index} >
                                                    <div>.</div>
                                                  </div>
                                                )
                                              })}
                                              <h5 className='right-score'>{property.primary_score}%</h5>
                                            </>
                                          )
                                        })}
                                      </div>
                                    </div>
                                    {/* Secondaries*/}
                                    <div className='result-title'>
                                      <h5>Secondary Schools</h5>
                                    </div>
                                    <div className='results-rows'>
                                      <div className='results-left'>
                                        {favouritesData.filter(property => property.property_name === property1).map((property, index) => {
                                          return (
                                            <>
                                              {[...Array(100 - property.secondary_score)].map((choice, index) => {
                                                return (
                                                  <div className='blank-bars' key={index} >
                                                    <div>.</div>
                                                  </div>
                                                )
                                              })}
                                              <h5 className='left-score' name={propertyColours.property1_total}>{property.secondary_score}%</h5>
                                              {[...Array(property.secondary_score)].map((choice, index) => {
                                                return (
                                                  <div className='bars' style={{
                                                    backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                                      return parseInt(property.secondary_score)
                                                    })) : 0) < ((property2Numbers) ? parseInt(property2Numbers.map((property, index) => {
                                                      return parseInt(property.secondary_score)
                                                    })) : 0) ? '#152BA4' : '#FFA7E5',
                                                  }} key={index} >
                                                    <div>.</div>
                                                  </div>
                                                )
                                              })}
                                            </>
                                          )
                                        })}
                                      </div>
                                      <div className='results-right'>
                                        {favouritesData.filter(property => property.property_name === property2).map((property, index) => {
                                          return (
                                            <>
                                              {[...Array(property.secondary_score)].map((choice, index) => {
                                                return (
                                                  <div className='bars' style={{
                                                    backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                                      return property.secondary_score
                                                    })) : 0) > (property2Numbers ? parseInt(property2Numbers.map((property, index) => {
                                                      return property.secondary_score
                                                    })) : 0) ? '#152BA4' : '#FFA7E5',
                                                  }} key={index} >
                                                    <div>.</div>
                                                  </div>
                                                )
                                              })}
                                              <h5 className='right-score'>{property.secondary_score}%</h5>
                                            </>
                                          )
                                        })}
                                      </div>
                                    </div>
                                  </>
                                  : ''}
                              </div>

                              {favouriteProperties ? favouriteProperties.filter(property => property.property_name === property2).map((property, index) => {
                                return (
                                  <div className='comparison-property' key={index} onClick={() => navigate(`/wittle-results/${property.id}`)}>
                                    <>
                                      <div className='comparison-image' style={{ backgroundImage: `url('${property.property_image_1}')` }}></div>
                                      <div className='comparison-content'>
                                        <h4>{property.property_name}</h4>
                                        <h5><NumericFormat value={property.value} displayType={'text'} thousandSeparator={true} prefix={'£'} /> offers over</h5>
                                        <h5>Bedrooms: {property.bedrooms}</h5>
                                        <h5>Type: {property.type}</h5>
                                      </div>
                                    </>
                                  </div>
                                )
                              }) : ''}
                            </div>
                          </div>
                        </>
                        : ''}
                </div>
              </div>
            </section>
            <div className='edit-modal-section'>
              <Modal show={editShow} onHide={handleEditClose} backdrop='static' className='edit-modal'>
                <Modal.Body>
                  {editSearch ?
                    <>
                      <div className='modal-header'>
                        <div className='modal-header-text'>
                          <h1 className='submit-title'>Edit your Wittle search</h1>
                          <p className='submit-detail'>Make changes to current inputs, or add some that you missed off last time</p>

                        </div>
                        <button onClick={handleEditClose} className='edit-close'>Close</button>
                      </div>
                      <hr className='edit-divider' />
                      <div className='modal-detail'>
                        <div className='input-section'>
                          <h1 className='submit-title'>Hospitality</h1>
                          {/* Restaurants */}

                          <div className='input-line'>
                            <div className='title-section'>
                              <h3 className='sub-title'>Restaurants</h3>

                              <div className='section-buttons'>
                                {editSearch.restaurant_selection ? <button name='restaurant_selection' onClick={() => setEditSearch({ ...editSearch, restaurant_selection: false })} value='false' className='delete-button'>Remove</button> : <button name='restaurant_selection' onClick={() => setEditSearch({ ...editSearch, restaurant_selection: true })} value='true' className='add-button'>Add</button>}
                              </div>
                            </div>
                            {editSearch.restaurant_selection ?
                              <div className='section-detail'>
                                <h3>Restaurant decision</h3>
                                <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, restaurant_decision: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='restaurant_decision'>
                                  <option>{editSearch.restaurant_decision} (selected)</option>
                                  <option>Any restaurants</option>
                                  <option>Specific cuisine</option>
                                </select>

                                <h3>Cuisine</h3>
                                <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, restaurant_cuisine_1: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='restaurant_cuisine_1'>
                                  <option>{editSearch.restaurant_cuisine_1} (selected)</option>
                                  <option>American</option>
                                  <option>Asian</option>
                                  <option>Bar</option>
                                  <option>British</option>
                                  <option>Central American</option>
                                  <option>Central Asian</option>
                                  <option>Chicken</option>
                                  <option>Chinese</option>
                                  <option>European</option>
                                  <option>French</option>
                                  <option>Gastro Pub</option>
                                  <option>Greek</option>
                                  <option>Indian</option>
                                  <option>International</option>
                                  <option>Italian</option>
                                  <option>Japanese</option>
                                  <option>Meat & Grill</option>
                                  <option>Mediterranean</option>
                                  <option>Mexican</option>
                                  <option>Middle Eastern</option>
                                  <option>Modern</option>
                                  <option>North African</option>
                                  <option>Pizza</option>
                                  <option>Pub food</option>
                                  <option>Seafood</option>
                                  <option>South African</option>
                                  <option>South American</option>
                                  <option>South East Asian</option>
                                  <option>Spanish</option>
                                  <option>Thai</option>
                                  <option>Turkish</option>
                                  <option>Vegetarian/ Vegan</option>
                                  <option>Vietnamese</option>
                                  <option>Wine Bar</option>
                                </select>
                                <h3>Walking distance</h3>
                                <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, restaurant_distance: e.target.value })} name='restaurant_distance' placeholder={editSearch.restaurant_distance}></input>
                              </div>
                              : ''}
                          </div>
                          {/* Cafes */}
                          <div className='input-line'>
                            <div className='title-section'>
                              <h3 className='sub-title'>Cafes</h3>
                              <div className='section-buttons'>
                                {editSearch.cafes_selection ? <button name='cafes_selection' onClick={() => setEditSearch({ ...editSearch, cafes_selection: false })} value='false' className='delete-button'>Remove</button> : <button name='cafes_selection' onClick={() => setEditSearch({ ...editSearch, cafes_selection: true })} value='true' className='add-button'>Add</button>}
                              </div>
                            </div>
                            {editSearch.cafes_selection ?
                              <div className='section-detail'>
                                <h3>Cafe decision</h3>
                                <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, cafes_decision: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='cafes_decision'>
                                  <option>{editSearch.cafes_decision} (selected)</option>
                                  <option>General cafes</option>
                                  <option>Specific cafe</option>
                                </select>
                                {editSearch.cafes_decision !== '' || editSearch.cafes_decision === 'Specific cafe' ?
                                  <>
                                    <h3>Cafe</h3>
                                    <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, cafes_detail: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='cafes_detail'>
                                      <option>{editSearch.cafes_detail} (selected)</option>
                                      <option>#152BA4 Sheep Coffee</option>
                                      <option>Cafe Nero</option>
                                      <option>Costa Coffee</option>
                                      <option>Gail&apos;s</option>
                                      <option>Grind</option>
                                      <option>Joe & The Juice</option>
                                      <option>Pattiserie Valerie</option>
                                      <option>Pret</option>
                                    </select>
                                  </>
                                  : ''}
                                <h3>Walking distance</h3>
                                <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, cafes_distance: e.target.value })} name='cafes_distance' placeholder={editSearch.cafes_distance}></input>
                              </div>
                              : ''}
                          </div>
                          {/* Takeaways */}
                          <div className='input-line'>
                            <div className='title-section'>
                              <h3 className='sub-title'>Takeaways</h3>

                              <div className='section-buttons'>
                                {editSearch.takeaway_selection ? <button name='takeaway_selection' onClick={() => setEditSearch({ ...editSearch, takeaway_selection: false })} value='false' className='delete-button'>Remove</button> : <button name='takeaway_selection' onClick={() => setEditSearch({ ...editSearch, takeaway_selection: true })} value='true' className='add-button'>Add</button>}
                              </div>
                            </div>
                            {editSearch.takeaway_selection ?
                              <div className='section-detail'>
                                <h3>Takeaway decision</h3>
                                <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, takeaway_decision: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='takeaway_decision'>
                                  <option>{editSearch.takeaway_decision} (selected)</option>
                                  <option>Any takeaway</option>
                                  <option>Specific cuisine</option>
                                </select>
                                <h3>Cuisine</h3>
                                <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, takeaway_cuisine_1: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='takeaway_cuisine_1'>
                                  <option>{editSearch.takeaway_cuisine_1} (selected)</option>
                                  <option>American</option>
                                  <option>Asianfusion</option>
                                  <option>Breakfast</option>
                                  <option>British</option>
                                  <option>Brunch</option>
                                  <option>Chinese</option>
                                  <option>Healthy</option>
                                  <option>Indian</option>
                                  <option>Italian</option>
                                  <option>Japanese</option>
                                  <option>Korean</option>
                                  <option>Mediterranean</option>
                                  <option>Mexican</option>
                                  <option>Thai</option>
                                  <option>Turkish</option>
                                  <option>Vietnamese</option>
                                </select>
                                <h3>Walking distance</h3>
                                <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, takeaway_distance: e.target.value })} name='takeaway_distance' placeholder={editSearch.takeaway_distance}></input>
                              </div>
                              : ''}
                          </div>
                          {/* Pubs */}
                          <div className='input-line'>
                            <div className='title-section'>
                              <h3 className='sub-title'>Pubs</h3>
                              <div className='section-buttons'>
                                {editSearch.pubs_selection ? <button name='pubs_selection' onClick={() => setEditSearch({ ...editSearch, pubs_selection: false })} value='false' className='delete-button'>Remove</button> : <button name='pubs_selection' onClick={() => setEditSearch({ ...editSearch, pubs_selection: true })} value='true' className='add-button'>Add</button>}
                              </div>
                            </div>
                            {editSearch.pubs_selection ?
                              <div className='section-detail'>
                                <h3>Walking distance</h3>
                                <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, pubs_distance: e.target.value })} name='pubs_distance' placeholder={editSearch.pubs_distance}></input>
                              </div>
                              : ''}
                          </div>
                          <hr className='inner-divider' />
                          {/* Second section - lifestyle */}
                          <h1 className='section-header'>Lifestyle</h1>
                          {/* Supermarkets */}
                          <div className='input-line'>
                            <div className='title-section'>
                              <h3 className='sub-title'>Supermarkets</h3>
                              <div className='section-buttons'>
                                {editSearch.supermarket_selection ? <button name='supermarket_selection' onClick={() => setEditSearch({ ...editSearch, supermarket_selection: false })} value='false' className='delete-button'>Remove</button> : <button name='supermarket_selection' onClick={() => setEditSearch({ ...editSearch, supermarket_selection: true })} value='true' className='add-button'>Add</button>}
                              </div>
                            </div>
                            {editSearch.supermarket_selection ?
                              <div className='section-detail'>
                                <h3>Supermarket decision</h3>
                                <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, supermarket_decision: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='supermarket_decision'>
                                  <option>{editSearch.supermarket_decision} (selected)</option>
                                  <option>Any supermarket</option>
                                  <option>Specific supermarket</option>
                                </select>
                                <h3>Type</h3>
                                <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, supermarket_segment: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='supermarket_segment'>
                                  <option>{editSearch.supermarket_segment} (selected)</option>
                                  <option>Budget</option>
                                  <option>Convenience</option>
                                  <option>Mainstream</option>
                                  <option>Premium</option>
                                </select>
                                <h3>Size</h3>
                                <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, supermarket_size: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='supermarket_size'>
                                  <option>{editSearch.supermarket_size} (selected)</option>
                                  <option>Don&apos;t mind</option>
                                  <option>Small </option>
                                  <option>Medium</option>
                                  <option>Large</option>
                                </select>
                                <h3>Walking distance</h3>
                                <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, supermarket_distance: e.target.value })} name='supermarket_distance' placeholder={editSearch.supermarket_distance}></input>
                              </div>
                              : ''}
                          </div>
                          {/* Gyms */}
                          <div className='input-line'>
                            <div className='title-section'>
                              <h3 className='sub-title'>Gyms</h3>
                              <div className='section-buttons'>
                                {editSearch.gym_selection ? <button name='gym_selection' onClick={() => setEditSearch({ ...editSearch, gym_selection: false })} value='false' className='delete-button'>Remove</button> : <button name='gym_selection' onClick={() => setEditSearch({ ...editSearch, gym_selection: true })} value='true' className='add-button'>Add</button>}
                              </div>
                            </div>
                            {editSearch.gym_selection ?
                              <div className='section-detail'>
                                <h3>Studio</h3>
                                <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, gym_studio_name: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='gym_studio_name'>
                                  <option>{editSearch.gym_studio_name} (selected)</option>
                                  <option>No preference</option>
                                  <option>1Rebel</option>
                                  <option>Barry&apos;s</option>
                                  <option>Fitness First</option>
                                  <option>Gymbox</option>
                                  <option>MoreYoga</option>
                                  <option>Nuffield Health</option>
                                  <option>Pure Gym</option>
                                  <option>The Gym Group</option>
                                  <option>Third Space</option>
                                  <option>Virgin</option>
                                </select>
                                <h3>Walking distance</h3>
                                <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, gym_distance: e.target.value })} name='gym_distance' placeholder={editSearch.gym_distance}></input>
                              </div>
                              : ''}
                          </div>
                          {/* Parks */}
                          <div className='input-line'>
                            <div className='title-section'>
                              <h3 className='sub-title'>Parks</h3>

                              <div className='section-buttons'>
                                {editSearch.park_selection ? <button name='park_selection' onClick={() => setEditSearch({ ...editSearch, park_selection: false })} value='false' className='delete-button'>Remove</button> : <button name='park_selection' onClick={() => setEditSearch({ ...editSearch, park_selection: true })} value='true' className='add-button'>Add</button>}
                              </div>
                            </div>
                            {editSearch.park_selection ?
                              <div className='section-detail'>
                                <h3>Park</h3>
                                <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, park_type: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='park_type'>
                                  <option>{editSearch.park_type} (selected)</option>
                                  <option>Large park &#40;long walks or runs&#41;</option>
                                  <option>Medium sized park &#40;big enough for activities&#41;</option>
                                  <option>Small square &#40;read a book&#41;</option>
                                </select>

                                <h3>Walking distance</h3>
                                <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, park_distance: e.target.value })} name='park_distance' placeholder={editSearch.park_distance}></input>
                              </div>
                              : ''}
                          </div>
                          {/* Workplace */}
                          <div className='input-line'>
                            <div className='title-section'>
                              <h3 className='sub-title'>Workplace</h3>
                              <div className='section-buttons'>
                                {editSearch.workplace_selection ? <button name='workplace_selection' onClick={() => setEditSearch({ ...editSearch, workplace_selection: false })} value='false' className='delete-button'>Remove</button> : <button name='workplace_selection' onClick={() => setEditSearch({ ...editSearch, workplace_selection: true })} value='true' className='add-button'>Add</button>}
                              </div>
                            </div>
                            {editSearch.workplace_selection ?
                              <div className='section-detail'>
                                <h3>Postcode</h3>
                                <input className='input-postcode' onChange={(e) => setEditSearch({ ...editSearch, workplace_detail: e.target.value })} name='workplace_detail' placeholder={editSearch.workplace_detail}></input>
                                <h3>Transport</h3>
                                <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, workplace_transport: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='workplace_transport'>
                                  <option>{editSearch.workplace_transport} (selected)</option>
                                  <option>Walking</option>
                                  <option>Cycling</option>
                                  <option>Driving/ transport</option>
                                </select>
                                <h3>Walking distance</h3>
                                <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, workplace_distance: e.target.value })} name='workplace_distance' placeholder={editSearch.workplace_distance}></input>
                              </div>
                              : ''}
                          </div>
                          <hr className='inner-divider' />

                          {/* Third section - Travel */}
                          <h1 className='section-header'>Travel</h1>
                          {/* Tubes */}
                          <div className='input-line'>
                            <div className='title-section'>
                              <h3 className='sub-title'>Tubes</h3>
                              <div className='section-buttons'>
                                {editSearch.tube_selection ? <button name='tube_selection' onClick={() => setEditSearch({ ...editSearch, tube_selection: false })} value='false' className='delete-button'>Remove</button> : <button name='tube_selection' onClick={() => setEditSearch({ ...editSearch, tube_selection: true })} value='true' className='add-button'>Add</button>}
                              </div>
                            </div>
                            {editSearch.tube_selection ?
                              <div className='section-detail'>
                                <h3>Tube decision</h3>
                                <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, tube_decision: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='tube_decision'>
                                  <option>{editSearch.tube_decision} (selected)</option>
                                  <option>General tube station</option>
                                  <option>Specific tube station</option>
                                  <option>Specific tube line</option>
                                </select>
                                {editSearch.tube_decision === 'Specific tube station' ?
                                  <>
                                    <h3>Station</h3>
                                    <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, tube_detail: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='tube_detail'>
                                      <option>{editSearch.tube_detail} (selected)</option>
                                      {stations ? stations.map(station => <option key={station} value={station}>{station}</option>) : ''}
                                    </select>
                                  </>
                                  : editSearch.tube_decision === 'Specific tube line' ?
                                    <>
                                      <h3>Line</h3>
                                      <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, tube_detail: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='tube_detail'>
                                        <option>{editSearch.tube_detail} (selected)</option>
                                        {lines.map(line => <option key={line} value={line}>{line}</option>)}
                                      </select>
                                    </>
                                    : ''}
                                <h3>Walking distance</h3>
                                <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, tube_distance: e.target.value })} name='tube_distance' placeholder={editSearch.tube_distance}></input>
                              </div>
                              : ''}
                          </div>
                          {/* Trains */}
                          <div className='input-line'>
                            <div className='title-section'>
                              <h3 className='sub-title'>Trains</h3>
                              <div className='section-buttons'>
                                {editSearch.train_selection ? <button name='train_selection' onClick={() => setEditSearch({ ...editSearch, train_selection: false })} value='false' className='delete-button'>Remove</button> : <button name='train_selection' onClick={() => setEditSearch({ ...editSearch, train_selection: true })} value='true' className='add-button'>Add</button>}
                              </div>
                            </div>
                            {editSearch.train_selection ?
                              <div className='section-detail'>
                                <h3>Train decision</h3>
                                <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, train_decision: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='train_decision'>
                                  <option>{editSearch.train_decision} (selected)</option>
                                  <option>General train station</option>
                                  <option>Specific train station</option>
                                </select>
                                {editSearch.tube_decision === 'Specific train station' ?
                                  <>
                                    <h3>Station</h3>
                                    <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, train_detail: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='train_detail'>
                                      <option>{editSearch.train_detail} (selected)</option>
                                      {trainStations.map(station => <option key={station} value={station}>{station}</option>)}
                                    </select>
                                  </>
                                  : ''}
                                <h3>Walking distance</h3>
                                <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, train_distance: e.target.value })} name='train_distance' placeholder={editSearch.train_distance}></input>
                              </div>
                              : ''}
                          </div>
                          <hr className='inner-divider' />

                          {/* Fourth section - Family */}
                          <h1 className='section-header'>Family</h1>
                          {/* Primary schools */}
                          <div className='input-line'>
                            <div className='title-section'>
                              <h3 className='sub-title'>Primary Schools</h3>
                              <div className='section-buttons'>
                                {editSearch.primary_selection ? <button name='primary_selection' onClick={() => setEditSearch({ ...editSearch, primary_selection: false })} value='false' className='delete-button'>Remove</button> : <button name='primary_selection' onClick={() => setEditSearch({ ...editSearch, primary_selection: true })} value='true' className='add-button'>Add</button>}
                              </div>
                            </div>
                            {editSearch.primary_selection ?
                              <div className='section-detail'>
                                <h3>Distance</h3>
                                <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, primary_distance: e.target.value })} name='primary_distance' placeholder={editSearch.primary_distance}></input>
                                <h3>Transport</h3>
                                <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, primary_mode: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='primary_mode'>
                                  <option>{editSearch.primary_mode} (selected)</option>
                                  <option>Walk</option>
                                  <option>Cycle</option>
                                  <option>Drive/ transport</option>
                                </select>
                                <h3>Religion</h3>
                                <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, primary_religion: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='primary_religion'>
                                  <option>{editSearch.primary_religion} (selected)</option>
                                  <option>No requirement</option>
                                  <option>Anglican/ Church of England</option>
                                  <option>Islam</option>
                                  <option>Jewish</option>
                                  <option>Roman Catholic</option>
                                </select>
                              </div>
                              : ''}
                          </div>
                          {/* Secondary schools */}
                          <div className='input-line'>
                            <div className='title-section'>
                              <h3 className='sub-title'>Secondary Schools</h3>
                              <div className='section-buttons'>
                                {editSearch.secondary_selection ? <button name='secondary_selection' onClick={() => setEditSearch({ ...editSearch, secondary_selection: false })} value={false} className='delete-button'>Remove</button> : <button name='secondary_selection' onClick={() => setEditSearch({ ...editSearch, secondary_selection: true })} value={true} className='add-button'>Add</button>}
                              </div>
                            </div>
                            {editSearch.secondary_selection ?
                              <div className='section-detail'>
                                <h3>Distance</h3>
                                <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, secondary_distance: e.target.value })} name='secondary_distance' placeholder={editSearch.secondary_distance}></input>
                                <h3>Transport</h3>
                                <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, secondary_mode: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='secondary_mode'>
                                  <option>{editSearch.secondary_mode} (selected)</option>
                                  <option>Walk</option>
                                  <option>Cycle</option>
                                  <option>Drive/ transport</option>
                                </select>
                                <h3>Religion</h3>
                                <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, secondary_religion: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='secondary_religion'>
                                  <option>{editSearch.secondary_religion} (selected)</option>
                                  <option>No requirement</option>
                                  <option>Anglican/ Church of England</option>
                                  <option>Islam</option>
                                  <option>Jewish</option>
                                  <option>Roman Catholic</option>
                                </select>
                              </div>
                              : ''}
                          </div>
                          {/* 6th forms */}
                          <div className='input-line'>
                            <div className='title-section'>
                              <h3 className='sub-title'>6th Forms</h3>
                              <div className='section-buttons'>
                                {editSearch.college_selection ? <button name='college_selection' onClick={() => setEditSearch({ ...editSearch, college_selection: false })} value='false' className='delete-button'>Remove</button> : <button name='college_selection' onClick={() => setEditSearch({ ...editSearch, college_selection: true })} value='true' className='add-button'>Add</button>}
                              </div>
                            </div>
                            {editSearch.college_selection ?
                              <div className='section-detail'>
                                <h3>Distance</h3>
                                <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, college_distance: e.target.value })} name='college_distance' placeholder={editSearch.college_distance}></input>
                                <h3>Transport</h3>
                                <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, college_mode: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='college_mode'>
                                  <option>{editSearch.college_mode} (selected)</option>
                                  <option>Walk</option>
                                  <option>Cycle</option>
                                  <option>Drive/ transport</option>
                                </select>
                                <h3>Religion</h3>
                                <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, college_religion: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='college_religion'>
                                  <option>{editSearch.college_religion} (selected)</option>
                                  <option>No requirement</option>
                                  <option>Anglican/ Church of England</option>
                                  <option>Islam</option>
                                  <option>Jewish</option>
                                  <option>Roman Catholic</option>
                                </select>
                              </div>
                              : ''}
                          </div>
                          <hr className='inner-divider' />
                          <h1 className='section-header'>Property details</h1>
                          {/* Property price */}
                          <div className='input-line'>
                            <div className='title-section'>
                              <h3 className='sub-title'>Price</h3>
                            </div>
                            <div className='section-detail'>
                              <h3>Min price</h3>
                              <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, property_price_min: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='property_price_min'>
                                <option><NumericFormat value={editSearch.property_price_min} displayType={'text'} thousandSeparator={true} prefix={'£'} /> (selected)</option>                          <option>No min</option>
                                <option>£200,000</option>
                                <option>£300,000</option>
                                <option>£400,000</option>
                                <option>£500,000</option>
                                <option>£600,000</option>
                                <option>£700,000</option>
                                <option>£800,000</option>
                                <option>£900,000</option>
                                <option>£1,000,000</option>
                                <option>£1,250,000</option>
                                <option>£1,500,000</option>
                                <option>£1,750,000</option>
                                <option>£2,000,000</option>
                                <option>£2,500,000</option>
                                <option>£3,000,000</option>
                                <option>£3,500,000</option>
                                <option>£4,000,000</option>
                                <option>£5,000,000</option>
                              </select>
                              <h3>Max price</h3>
                              <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, property_price_max: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='property_price_max'>
                                <option><NumericFormat value={editSearch.property_price_max} displayType={'text'} thousandSeparator={true} prefix={'£'} /> (selected)</option>
                                <option>No max</option>
                                <option>£300,000</option>
                                <option>£400,000</option>
                                <option>£500,000</option>
                                <option>£600,000</option>
                                <option>£700,000</option>
                                <option>£800,000</option>
                                <option>£900,000</option>
                                <option>£1,000,000</option>
                                <option>£1,250,000</option>
                                <option>£1,500,000</option>
                                <option>£1,750,000</option>
                                <option>£2,000,000</option>
                                <option>£2,500,000</option>
                                <option>£3,000,000</option>
                                <option>£3,500,000</option>
                                <option>£4,000,000</option>
                                <option>£5,000,000</option>
                                <option>£10,000,000</option>
                              </select>
                            </div>
                          </div>
                          {/* Property Bedrooms */}
                          <div className='input-line'>
                            <div className='title-section'>
                              <h3 className='sub-title'>Bedrooms</h3>
                            </div>
                            <div className='section-detail'>
                              <h3>Min bedrooms</h3>
                              <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, property_bed_min: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='property_bed_min'>
                                <option>{editSearch.property_bed_min} (selected)</option>
                                <option>No min</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                              </select>
                              <h3>Max bedrooms</h3>
                              <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, property_bed_max: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='property_bed_max'>
                                <option>{editSearch.property_bed_max} (selected)</option>
                                <option>No min</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                              </select>
                            </div>
                          </div>
                          {/* Property type */}
                          <div className='input-line'>
                            <div className='title-section'>
                              <h3 className='sub-title'>Other details</h3>
                            </div>
                            <div className='section-detail'>
                              <h3>Type</h3>
                              <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, property_type: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='property_type'>
                                <option>{editSearch.property_type} (selected)</option>
                                <option>Any</option>
                                <option>House</option>
                                <option>Flat</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <hr className='inner-divider' />
                      </div>
                      <div className='edit-footer'>
                        <div className='submission'>
                          <button name='result_id' value={editSearch.result_id} id='Save' onClick={postEditSearch} className='edit-submit'>Save</button>
                          <button name='result_id' value={editSearch.result_id} id='Submit' onClick={postEditSearch} className='edit-submit'>View Results</button>
                        </div>
                        <button onClick={handleEditClose} className='edit-close'>Close</button>

                      </div>
                    </>
                    : ''}
                </Modal.Body>
              </Modal>
            </div>
          </>
        }
      </section>

    </>
  )

}

export default Profile

