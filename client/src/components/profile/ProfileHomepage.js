import { useParams, useNavigate, Link } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { isUserAuth, getAccessToken, getUserToken } from '../auth/Auth'
import Select from 'react-select'
import NavBar from '../tools/NavBar'
import { Modal } from 'react-bootstrap'
import PropertyComparison from './PropertyComparison'
import { NumericFormat } from 'react-number-format'


const ProfileHomepage = () => {


  // ? Section 1: Define states to be used on page

  // state to enable navigation between pages
  const navigate = useNavigate()

  // states for pop outs on the side
  const [searchSide, setSearchSide] = useState(false)
  const [livingSide, setLivingSide] = useState(false)
  const [accountSide, setAccountSide] = useState(false)

  // state for determining what content shows
  const [profileContent, setProfileContent] = useState('Homepage')

  // set params for accessing specific pages
  const { id } = useParams()

  // setting formdata
  const [formData, setFormData] = useState({})

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

  // state for list of favourite properties
  const [favouriteProperties, setFavouriteProperties] = useState()

  // define a list of properties that can be cmpared
  const [propertyList, setPropertyList] = useState()

  // define state for postcode lookup
  const [locations, setLocations] = useState([])

  // define state for wittle living inputs
  const [livingDetails, setLivingDetails] = useState()

  // state for the different lifestyle variables
  const [restaurants, setRestaurants] = useState([])
  const [restaurants1, setRestaurants1] = useState([])
  const [restaurants2, setRestaurants2] = useState([])
  const [restaurants3, setRestaurants3] = useState([])
  const [gyms, setGyms] = useState([])
  const [gyms1, setGyms1] = useState([])
  const [gyms2, setGyms2] = useState([])
  const [gyms3, setGyms3] = useState([])
  const [pubs, setPubs] = useState([])
  const [pubs1, setPubs1] = useState([])
  const [pubs2, setPubs2] = useState([])
  const [pubs3, setPubs3] = useState([])
  const [takeaways, setTakeaways] = useState([])
  const [takeaways1, setTakeaways1] = useState([])
  const [takeaways2, setTakeaways2] = useState([])
  const [takeaways3, setTakeaways3] = useState([])


  // state for dropdowns
  const [lifestyleDropdown, setLifestyleDropdown] = useState('Restaurants')

  // staet for long lat
  const [lifestyleLong, setLifestyleLong] = useState()
  const [lifestyleLat, setLifestyleLat] = useState()



  // ? Section 2: User and property information - load in key info required for profile
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
          setLivingDetails(data.living_details[0])
          console.log('living inputs ->', data.living_details[0])
          console.log('favourite propertes ->', data.favourites)
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

  // carry out calculation to load user data
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

  // carry oiut calculationo to load propeerty data
  useEffect(() => {
    getProperties()
  }, [])

  // create dropdown property list with proeprtties that can be compared
  useEffect(() => {
    if (favouriteProperties) {
      const list = []
      favouriteProperties.forEach(property => list.includes(property.property_name) ? '' : list.push(property.property_name))
      setPropertyList(list)
      console.log('names of favourite properties ->', list)
    }
  }, [favouriteProperties])



  // ? Section 3: Favourite properties and saved searcheds
  // define the id of favourite properties
  useEffect(() => {
    if (favouritesData) {
      const favouriteList = []
      favouritesData.forEach(user => favouriteList.includes(user.property) ? '' : favouriteList.push(user.property))
      setFavouriteIds(favouriteList)
      console.log('favourite ids ->', favouriteList)
    }
  }, [favouritesData])


  // filter property data to only show the favourite properties
  useEffect(() => {
    if (properties && favouriteIds) {
      const result = properties.filter(property => favouriteIds.includes(property.id))
      setFavouriteProperties(result)
      console.log('favourited properties ->', result)
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

  // state to handle the properties for sale or rent
  const [channel, setChannel] = useState({
    channel: 'For Sale',
  })

  // ? Section 4: Editing and deleting  a search
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


  // ? Section 5: Lifestyle data section
  // location data extarction
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/locations/')
        console.log('locations ->', data)
        setLocations(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  // load in restaurants
  useEffect(() => {
    const getRestaurants = async () => {
      try {
        const { data } = await axios.get('/api/restaurants/')
        console.log('restaurants ->', data)
        setRestaurants(data)
      } catch (err) {
        console.log(err)
      }
    }
    getRestaurants()
  }, [])

  // load in gyms
  useEffect(() => {
    const getGyms = async () => {
      try {
        const { data } = await axios.get('/api/gyms/')
        console.log('gyms ->', data)
        setGyms(data)
      } catch (err) {
        console.log(err)
      }
    }
    getGyms()
  }, [])

  // load in pubs
  useEffect(() => {
    const getPubs = async () => {
      try {
        const { data } = await axios.get('/api/pubs/')
        console.log('pubs ->', data)
        setPubs(data)
      } catch (err) {
        console.log(err)
      }
    }
    getPubs()
  }, [])

  // load in takeaways
  useEffect(() => {
    const getTakeaways = async () => {
      try {
        const { data } = await axios.get('/api/takeaways/')
        console.log('takeaways ->', data)
        setTakeaways(data)
      } catch (err) {
        console.log(err)
      }
    }
    getTakeaways()
  }, [])


  // get long, lat for the input postcode
  useEffect(() => {
    if (livingDetails) {
      const getLocation = async () => {
        try {
          const postcode = livingDetails.postcode
          const { data } = await axios.get(`https://api.postcodes.io/postcodes/${postcode}`)
          console.log('api location results ->', data)
          setLifestyleLat(parseFloat(data.result.latitude))
          setLifestyleLong(parseFloat(data.result.longitude))
          console.log('long ->', data.result.longitude)
          console.log('coordinates retrieved')
        } catch (error) {
          setErrors(true)
          console.log('postcode error ->', error.response.data.error)
        }
      }
      getLocation()
    }
  }, [livingDetails])

  // carry out first distance calculations
  useEffect(() => {
    if (lifestyleLong && restaurants) {
      const restaurantCalc = () => {
        const calculation =
          restaurants.map(item => {
            return {
              ...item,
              distance_km: (12742 * Math.sin(Math.sqrt(0.5 - Math.cos((item.lat - parseFloat(lifestyleLat)) * (Math.PI / 180)) / 2 + Math.cos(parseFloat(lifestyleLat) * (Math.PI / 180)) * Math.cos(item.lat * (Math.PI / 180)) * (1 - Math.cos((item.long - parseFloat(lifestyleLong)) * (Math.PI / 180))) / 2))) * 1.2,
            }
          })
        // console.log('restaurant calc 1 ->', calculation)
        setRestaurants1(calculation)
      }
      restaurantCalc()
    }
  }, [lifestyleLong, restaurants])


  // cvarry out second distance calculation
  useEffect(() => {
    if (restaurants1) {
      const restaurantCalc = () => {
        const calculation =
          restaurants1.map(item => {
            return {
              ...item,
              distance_walk_mins: ((item.distance_km / 5) * 60).toFixed(0),
            }
          })
        // console.log('restaurant calc 2 ->', calculation)
        setRestaurants2(calculation)
      }
      restaurantCalc()
    }
  }, [restaurants1])


  // filter out any that are not in the local area
  useEffect(() => {
    if (restaurants2) {
      const calculation =
        restaurants2.filter(item => {
          return item.distance_walk_mins <= 20
        })
      console.log('local restaurants ->', calculation)
      setRestaurants3(calculation)
    }
  }, [restaurants2])

  // carry out first distance calculations - gyms
  useEffect(() => {
    if (lifestyleLong && gyms) {
      const gymCalc = () => {
        const calculation =
          gyms.map(item => {
            return {
              ...item,
              distance_km: (12742 * Math.sin(Math.sqrt(0.5 - Math.cos((item.Lat - parseFloat(lifestyleLat)) * (Math.PI / 180)) / 2 + Math.cos(parseFloat(lifestyleLat) * (Math.PI / 180)) * Math.cos(item.Lat * (Math.PI / 180)) * (1 - Math.cos((item.long - parseFloat(lifestyleLong)) * (Math.PI / 180))) / 2))) * 1.2,
            }
          })
        console.log('gym calc 1 ->', calculation)
        setGyms1(calculation)
      }
      gymCalc()
    }
  }, [lifestyleLong, gyms])


  // cvarry out second distance calculation
  useEffect(() => {
    if (gyms1) {
      const gymCalc = () => {
        const calculation =
          gyms1.map(item => {
            return {
              ...item,
              distance_walk_mins: ((item.distance_km / 5) * 60).toFixed(0),
            }
          })
        console.log('gyms calc 2 ->', calculation)
        setGyms2(calculation)
      }
      gymCalc()
    }
  }, [gyms1])


  // filter out any that are not in the local area
  useEffect(() => {
    if (gyms2) {
      const calculation =
        gyms2.filter(item => {
          return item.distance_walk_mins <= 20
        })
      console.log('local gyms ->', calculation)
      setGyms3(calculation)
    }
  }, [gyms2])

  // carry out first distance calculations - pubs
  useEffect(() => {
    if (lifestyleLong && pubs) {
      const pubCalc = () => {
        const calculation =
          pubs.map(item => {
            return {
              ...item,
              distance_km: (12742 * Math.sin(Math.sqrt(0.5 - Math.cos((item.Lat - parseFloat(lifestyleLat)) * (Math.PI / 180)) / 2 + Math.cos(parseFloat(lifestyleLat) * (Math.PI / 180)) * Math.cos(item.Lat * (Math.PI / 180)) * (1 - Math.cos((item.long - parseFloat(lifestyleLong)) * (Math.PI / 180))) / 2))) * 1.2,
            }
          })
        console.log('pub calc 1 ->', calculation)
        setPubs1(calculation)
      }
      pubCalc()
    }
  }, [lifestyleLong, pubs])


  // cvarry out second distance calculation
  useEffect(() => {
    if (pubs1) {
      const pubCalc = () => {
        const calculation =
          pubs1.map(item => {
            return {
              ...item,
              distance_walk_mins: ((item.distance_km / 5) * 60).toFixed(0),
            }
          })
        console.log('pubs calc 2 ->', calculation)
        setPubs2(calculation)
      }
      pubCalc()
    }
  }, [pubs1])


  // filter out any that are not in the local area
  useEffect(() => {
    if (pubs2) {
      const calculation =
        pubs2.filter(item => {
          return item.distance_walk_mins <= 20
        })
      console.log('local pubs ->', calculation)
      setPubs3(calculation)
    }
  }, [pubs2])

  // carry out first distance calculations - takeaways
  useEffect(() => {
    if (lifestyleLong && takeaways) {
      const takeawayCalc = () => {
        const calculation =
          takeaways.map(item => {
            return {
              ...item,
              distance_km: (12742 * Math.sin(Math.sqrt(0.5 - Math.cos((item.lat - parseFloat(lifestyleLat)) * (Math.PI / 180)) / 2 + Math.cos(parseFloat(lifestyleLat) * (Math.PI / 180)) * Math.cos(item.lat * (Math.PI / 180)) * (1 - Math.cos((item.long - parseFloat(lifestyleLong)) * (Math.PI / 180))) / 2))) * 1.2,
            }
          })
        console.log('takeaway calc 1 ->', calculation)
        setTakeaways1(calculation)
      }
      takeawayCalc()
    }
  }, [lifestyleLong, takeaways])


  // cvarry out second distance calculation
  useEffect(() => {
    if (takeaways1) {
      const takeawayCalc = () => {
        const calculation =
          takeaways1.map(item => {
            return {
              ...item,
              distance_walk_mins: ((item.distance_km / 5) * 60).toFixed(0),
            }
          })
        console.log('takeaways calc 2 ->', calculation)
        setTakeaways2(calculation)
      }
      takeawayCalc()
    }
  }, [takeaways1])


  // filter out any that are not in the local area
  useEffect(() => {
    if (takeaways2) {
      const calculation =
        takeaways2.filter(item => {
          return item.distance_walk_mins <= 20
        })
      console.log('local takeaways ->', calculation)
      setTakeaways3(calculation)
    }
  }, [takeaways2])

  // function to change state for the lifestyle dropdown
  const lifestyleChange = (e) => {
    setLifestyleDropdown(e.target.value)
  }



  return (
    <>
      <section className='profile-page'>
        <NavBar />
        <section className='profile-sidebar-open'>
          <div className='logo'>
            <h2 onClick={() => navigate('/')}>Wittle</h2>
          </div>
          <div className='profile-buttons'>
            <div className='profile-button-title'>
              <h2 onClick={() => setSearchSide(!searchSide)}>🔎 Wittle Search</h2>
              {!searchSide ? <h4>v</h4> : <h4>^</h4>}
            </div>
            {searchSide ?
              <div className='profile-button-sub'>
                <h3 onClick={() => setProfileContent('Saved properties')}>🤍 Saved properties</h3>
                <h3 onClick={() => setProfileContent('Saved searches')}>🔎 Saved searches</h3>
                <h3 onClick={() => setProfileContent('Property comparison')}>🧐 Property comparison</h3>
              </div>
              :
              ''}
            <div className='profile-button-title' id='second-title'>
              <h2 onClick={() => setLivingSide(!livingSide)}>🏠 Wittle Living</h2>
              {!livingSide ? <h4>v</h4> : <h4>^</h4>}
            </div>
            {livingSide ?
              <div className='profile-button-sub'>
                <h3 onClick={() => setProfileContent('Lifestyle')}>💃 Local lifestyle portal</h3>
                <h3 onClick={() => setProfileContent('Admin')}>📱 Admin portal</h3>
                <h3 onClick={() => setProfileContent('Property market')}>🏠 Local property portal</h3>
                <h3 onClick={() => setProfileContent('Property market')}>🔎 Lifestyle search</h3>
              </div>
              :
              ''}
            <div className='profile-button-title' id='second-title'>
              <h2 onClick={() => setProfileContent('Account')}>🖥 Account details</h2>
            </div>
          </div>
        </section>
        <section className='profile-main-section'>
          {favouriteProperties ?
            <div className='profile-content'>
              <div className='selection-detail'>
                {profileContent === 'Homepage' ?
                  <div className='profile-top'>
                    <div className='profile-intro'>
                      <h1 className='profile-name'>👋 {userData ? userData.first_name : ''}</h1>
                      <p className='profile-bio'>Thanks for being part of Wittle. Welcome to your account, this is a collection of everything you like on Wittle.. enjoy!</p>
                    </div>
                    <div className='top-insights'>
                      <div onClick={() => setProfileContent('Saved properties')} className='box-insights'>
                        <h1>{favouriteProperties ? favouriteProperties.length : ''}</h1>
                        <p>Saved properties</p>
                      </div>
                      <div onClick={() => setProfileContent('Saved searches')} className='box-insights'>
                        <h1>{propertySearch ? propertySearch.length : ''}</h1>
                        <p>Saved searches</p>
                      </div>
                      <div onClick={() => setProfileContent('Admin')} className='box-insights'>
                        <h1>£1,300</h1>
                        <p>Monthly bills</p>
                      </div>
                      <div onClick={() => setProfileContent('Admin')} className='box-insights'>
                        <h1>3</h1>
                        <p>Saved locations</p>
                      </div>
                    </div>
                  </div>
                  :
                  profileContent === 'Saved properties' && favouriteProperties.length > 0 ?
                    <>
                      <h2 className='section-title'>You&apos;ve got {favouriteProperties ? favouriteProperties.length : ''} saved properties</h2>

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
                    profileContent === 'Saved properties' && favouriteProperties.length === 0 ?
                      <>
                        <div className='no-properties'>
                          <h4 className='no-properties-text'>😕</h4>
                          <h4 className='no-properties-text'>You don&apos;t have any properties saved yet.</h4>
                          <h4 className='no-properties-subtext'>Once you&apos;ve found somewhere you like, favourite it and you&apos;ll find it here.</h4>
                          <div className='favourite-instructions'>
                            <div className='favourite-button-on'>

                            </div>
                            {/* <h3>^</h3> */}
                            <h4>Look out for this icon when you&apos;re looking at properties</h4>
                          </div>
                        </div>
                      </>
                      :
                      profileContent === 'Saved searches' && userData.property_search_details.length > 0 ?
                        <>
                          <h2 className='section-title'> You&apos;ve made {propertySearch ? propertySearch.length : ''} searches</h2>

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
                        :
                        profileContent === 'Saved searches' && userData.property_search_details.length === 0 ?
                          <>
                            <div className='no-properties'>
                              <h4 className='no-properties-text'>😕</h4>
                              <h4 className='no-properties-text'>You haven&apos;t saved any searches yet.</h4>
                              <h4 className='no-properties-subtext'>As soon as you&apos;ve saved a search, it&apos;ll show here, then you can change or update it whenever you like.</h4>
                              <button onClick={() => navigate('/wittle-search')}>Start Wittling</button>
                            </div>
                          </>

                          // Property Comparison section //
                          : profileContent === 'Property comparison' && favouriteProperties.length > 0 ?
                            <PropertyComparison
                              favouritesData={favouritesData}
                              favouriteProperties={favouriteProperties}
                              propertyList={propertyList}
                            />
                            :
                            profileContent === 'Property comparison' && favouriteProperties.length === 0 ?
                              <>
                                <div className='no-properties'>
                                  <h4 className='no-properties-text'>😕</h4>
                                  <h4 className='no-properties-text'>You haven&apos;t saved any properties yet.</h4>
                                  <h4 className='no-properties-subtext'>Once you&apos;ve saved some properties, you can compare them and decide on your favourite. Then you&apos;ll really be Wittling.</h4>
                                </div>
                              </>
                              :
                              ''}
              </div>
            </div>
            : ''}
          {profileContent === 'Lifestyle' ?
            <>
              <div className='profile-content'>
                <div className='selection-detail'>
                  <h2 className='section-title'>Everything you need to know about the things you care about near <span>{livingDetails.postcode}</span></h2>
                  {restaurants3 ?
                    <div className='lifestyle-table'>
                      <div className='table-filters'>
                        <div className='filter'>
                          <h3 className='filter-title'>Area</h3>
                          <select className='filter-dropdown'>
                            <option>Local</option>
                          </select>
                        </div>
                        <div className='filter'>
                          <h3 className='filter-title'>Lifestyle feature</h3>
                          <select className='filter-dropdown' onChange={lifestyleChange}>
                            <option>Restaurants</option>
                            <option>Pubs</option>
                            <option>Takeaways</option>
                            <option>Gyms</option>
                            {/* <option>Primary schools</option>
                            <option>Secondary schools</option>
                            <option>6th form colleges</option> */}
                          </select>
                        </div>
                        <div className='filter'>
                          <h3 className='filter-title'>Lifestyle detail</h3>
                          <select className='filter-dropdown'>
                            <option>Cuisines</option>
                          </select>
                        </div>
                        <div className='filter'>
                          <h3 className='filter-title'>Rating</h3>
                          <select className='filter-dropdown'>
                            <option>Value</option>
                          </select>
                        </div>
                        <div className='filter'>
                          <h3 className='filter-title'>Distance</h3>
                          <select className='filter-dropdown'>
                            <option>Value</option>
                          </select>
                        </div>
                      </div>
                      {lifestyleDropdown === 'Restaurants' ?
                        <div className='table-content'>
                          <div className='table-titles'>
                            <h5 className='column-1'>#</h5>
                            <h5 className='column-2'>Name</h5>
                            <h5 className='column-3'>Cuisine</h5>
                            <h5 className='column-4'>Rating</h5>
                            <h5 className='column-5'>Distance (mins)</h5>
                            <h5 className='column-6'>Contact</h5>
                          </div>
                          <div className='table-details-wrap'>
                            {restaurants3.map((item, index) => {
                              return (
                                <>
                                  <div className='table-details' key={index}>
                                    <h5 className='column-1'>{index + 1}</h5>
                                    <h5 className='column-2'>{item.restaurant_name}</h5>
                                    <h5 className='column-3'>{item.master_cuisine}</h5>
                                    <h5 className='column-4'>{item.rating}</h5>
                                    <h5 className='column-5'>{item.distance_walk_mins}</h5>
                                    <h5 className='column-6'><a href={item.url} style={{ textDecoration: 'none', color: '#051885' }}>Go to site</a></h5>
                                  </div>
                                </>
                              )
                            })}
                          </div>
                        </div>
                        :
                        lifestyleDropdown === 'Gyms' ?
                          <div className='table-content'>
                            <div className='table-titles'>
                              <h5 className='column-1'>#</h5>
                              <h5 className='column-2'>Studio</h5>
                              <h5 className='column-3' id='gym-option'>Studio offering</h5>
                              {/* <h5 className='column-4'>Rating</h5> */}
                              <h5 className='column-5'>Distance (mins)</h5>
                              <h5 className='column-6'>Contact</h5>
                            </div>
                            <div className='table-details-wrap'>
                              {gyms3.map((item, index) => {
                                return (
                                  <>
                                    <div className='table-details' key={index}>
                                      <h5 className='column-1'>{index + 1}</h5>
                                      <h5 className='column-2'>{item.gym_name}</h5>
                                      <h5 className='column-3' id='gym-option'>{item.class_type}</h5>
                                      <h5 className='column-5'>{item.distance_walk_mins}</h5>
                                      <h5 className='column-6'><a href={item.url} style={{ textDecoration: 'none', color: '#051885' }}>Go to site</a></h5>
                                    </div>
                                  </>
                                )
                              })}
                            </div>
                          </div>
                          :
                          lifestyleDropdown === 'Pubs' ?
                            <div className='table-content'>
                              <div className='table-titles'>
                                <h5 className='column-1'>#</h5>
                                <h5 className='column-2'>Name</h5>
                                <h5 className='column-3' id='gym-option'>Category</h5>
                                {/* <h5 className='column-4'>Rating</h5> */}
                                <h5 className='column-5'>Distance (mins)</h5>
                                <h5 className='column-6'>Contact</h5>
                              </div>
                              <div className='table-details-wrap'>
                                {pubs3.map((item, index) => {
                                  return (
                                    <>
                                      <div className='table-details' key={index}>
                                        <h5 className='column-1'>{index + 1}</h5>
                                        <h5 className='column-2'>{item.Pub_name}</h5>
                                        <h5 className='column-3' id='gym-option'>{item.Pub_category}</h5>
                                        <h5 className='column-5'>{item.distance_walk_mins}</h5>
                                        <h5 className='column-6'><a href={item.url} style={{ textDecoration: 'none', color: '#051885' }}>Go to site</a></h5>
                                      </div>
                                    </>
                                  )
                                })}
                              </div>
                            </div>
                            :
                            lifestyleDropdown === 'Takeaways' ?
                              <div className='table-content'>
                                <div className='table-titles'>
                                  <h5 className='column-1'>#</h5>
                                  <h5 className='column-2'>Name</h5>
                                  <h5 className='column-3'>Cuisine</h5>
                                  <h5 className='column-4'>Rating</h5>
                                  <h5 className='column-5'>Distance (mins)</h5>
                                  <h5 className='column-6'>Contact</h5>
                                </div>
                                <div className='table-details-wrap'>
                                  {takeaways3.map((item, index) => {
                                    return (
                                      <>
                                        <div className='table-details' key={index}>
                                          <h5 className='column-1'>{index + 1}</h5>
                                          <h5 className='column-2'>{item.name}</h5>
                                          <h5 className='column-3'>{item.cuisine}</h5>
                                          <h5 className='column-4'>{item.wittle_rating}</h5>
                                          <h5 className='column-5'>{item.distance_walk_mins}</h5>
                                          <h5 className='column-6'><a href={item.url} style={{ textDecoration: 'none', color: '#051885' }}>Go to site</a></h5>
                                        </div>
                                      </>
                                    )
                                  })}
                                </div>
                              </div>
                              : ''

                      }

                    </div>
                    :
                    ''}
                </div>
              </div>
            </>
            :
            ''
          }
        </section>
      </section>
    </>
  )
}

export default ProfileHomepage