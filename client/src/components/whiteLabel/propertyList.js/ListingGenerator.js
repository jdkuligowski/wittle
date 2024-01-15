import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getUserToken, isUserAuth, getAccessToken } from '../../auth/Auth'
import { Modal } from 'react-bootstrap'
import { NumericFormat } from 'react-number-format'
import NavBar from '../../tools/NavBar'
import ProfileMobileSlider from '../../tools/ProfileMobileSlider'
import WhiteNavbar from '../../tools/WhiteNavbar'
import WhiteSidebar from '../WhiteSidebar'
import NavBarRevised from '../../tools/NavBarRevised'
import ReactSwitch from 'react-switch'
import AIListingGenrator from './AIListingGenrator'
import PropertyInsightsOverview from '../propertyDetails/PropertyInsightsOverview'
import SavedListings from './SavedListings'
import TopProperties from './TopProperties'



axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const ListingGenerator = () => {


  // state to enable navigation between pages
  const navigate = useNavigate()

  // set state for errors
  const [errors, setErrors] = useState()

  // set state for user data
  const [userData, setUserData] = useState()

  // set state for loading
  const [loading, setLoading] = useState()


  // Create a reference to the div
  const textDivRef = useRef(null)

  // set state for completing a search
  const [search, setSearch] = useState(false)

  // state for determining what content shows
  const [profileContent, setProfileContent] = useState('Listing generator')
  const [profileDetail, setProfileDetail] = useState('Listing generator')

  // state for changing the view to insights results
  const [insightView, setInsightView] = useState('Search')

  // lisrting options
  const [listingSelection, setListingSelection] = useState('Property insights')

  const [postcodeSubstring, setPostcodeSubstring] = useState('')

  const [addressSubstring, setAddressSubstring] = useState('')

  const [listingRoute, setListingRoute] = useState('Off')

  // listing generator form
  const [listingFields, setListingFields] = useState({
    postcode: '',
    address: '',
    description: '',
    channel: '',
    bedrooms: '',
    bathrooms: '',
    property_type: '',
    tenure: '',
    size: '',
    on_road_parking: '',
    off_road_parking: '',
    balcony: '',
    primary_schools: 0,
    secondary_schools: 0,
    tubes: 0,
    trains: 0,
    restaurants: 0,
    pubs: 0,
    supermarkets: 0,
    gyms: 0,
    parks: 0,
    evs: 0,
    crime: 0,
  })


  // ai listing fields
  const [aiFields, setAiFields] = useState({
    'location': '',
    'size': '',
    'property_type': '',
    'bedrooms': '',
    'bathrooms': '',
    'en_suites': '',
    'amenities': [],
    'channel': '',
    'additional_info': '',
    'price': '',
    'restaurants': '',
    'pubs': '',
    'supermarkets': '',
    'tube': '',
    'trains': '',
    'parks': '',
    'evs': '',
    'primary_schools': '',
    'secondary_schools': '',
    'gyms': '',
  })

  // features to include in checkbox: 
  const features = [
    'balcony', 'on-road parking', 'off-road parking',
    'private gated', 'private garage', 'shared garage',
    'lift', 'open-plan', 'concierge', 'gym',
    'pool & spa', 'penthouse', 'duplex', 'garden'
  ]



  // set state for user data
  const [postcodeData, setPostcodes] = useState()

  // set state for schools data
  const [primaryData, setPrimaryData] = useState()
  const [primaryData1, setPrimaryData1] = useState()
  const [secondaryData, setSecondaryData] = useState()
  const [secondaryData1, setSecondaryData1] = useState()

  // additional scvhool states
  const [topPrimaries, setTopPrimaries] = useState()
  const [topSecondaries, setTopSecondaries] = useState()

  // set states for lifestyle information
  const [restaurants, setRestaurants] = useState()
  const [gyms, setGyms] = useState()
  const [pubs, setPubs] = useState()
  const [supermarkets, setSupermarkets] = useState()
  const [ev, setEv] = useState()

  // set states for first calculations
  const [restaurants1, setRestaurants1] = useState()
  const [gyms1, setGyms1] = useState()
  const [pubs1, setPubs1] = useState()
  const [supermarkets1, setSupermarkets1] = useState()
  const [ev1, setEv1] = useState()

  // additional restaurant states
  const [cuisines, setCuisines] = useState()
  const [topRestaurants, setTopRestaurants] = useState([])
  const [topPubs, setTopPubs] = useState([])

  // additional gym states
  const [mainGyms, setMainGyms] = useState([])

  // additional supermarket states
  const [mainSupermarkets, setMainSupermarkets] = useState([])

  // set states for lifestyle information
  const [tubes, setTubes] = useState()
  const [trains, setTrains] = useState()

  // set states for first calculations
  const [tubes1, setTubes1] = useState()
  const [trains1, setTrains1] = useState()

  const [aiSearch, setAiSearch] = useState()

  const [aiReady, setAiReady] = useState(false)

  // start ai seearch
  const [searchGo, setSearchGo] = useState(false)

  const [secondaryDetail, setSecondaryDetail] = useState('Table')
  const [primaryDetail, setPrimaryDetail] = useState('Table')



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



  // ? Section 2: Load postcode and user data
  const loadPostcodeData = async (listingType) => {
    try {

      // if its an ai load, then we need to set a state to organise the loading of the dataset
      if (listingType === 'listing_ai_total') {
        setAiReady(false) // Before loading the data for AI
      }

      // we need to access the postcode data in all eventualities
      const { data } = await axios.post('/api/postcodes/', { postcode: postcodeSubstring })
      console.log('postcode data ->', data)
      setPostcodes(data)

      increaseUsageCount(listingType) // Pass the listing type to the increaseUsageCount function

      // if the postcode data arrives and its an ai search, we want to load the rest of the data
      if (listingType === 'listing_ai_total') {
        setSearchGo(true)
      }

      // if its just an insights load, wee want to add this to th db then navigate to the insights page
      if (listingType === 'listing_insight_total') {
        // const { data } = await axios.get(`/api/postcodes/${postcodeSubstring}`)
        const modifiedData = {
          ...listingFields,
          postcode: postcodeSubstring,
          request_type: 'Insights',
        }
        const response = await axios.post('/api/listing_favourites/', modifiedData, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        setResultsToLocalStorage()
      }

      // if its a normal listing build, then we want to run the code for that
      if (listingType === 'listing_normal_total') {
        const modifiedData = {
          ...listingFields,
          postcode: postcodeSubstring,
          request_type: 'Listing',
        }
        const response = await axios.post('/api/listing_favourites/', modifiedData, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
      }

    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }


  // define function for setting results to storage
  const setResultsToLocalStorage = (token) => {
    window.localStorage.setItem('listing-postcode', JSON.stringify(postcodeSubstring))
  }



  // ? Section 3: Load primaries data
  const loadPrimaryData = () => {
    // Assuming th user is authorised, we want to load their profile information and set states based on relevant sections of this
    try {
      const getPrimaries = async () => {
        const { data } = await axios.get('/api/primaries/')
        // console.log('primaries data ->', data)
        setPrimaryData(data)
      }
      getPrimaries()
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  useEffect(() => {
    if (postcodeData) {
      loadPrimaryData()
    }
  }, [postcodeData])


  // set distance
  const walkDistanceKm20 = 5 * (20 / 60) // updated for 20 mins

  const R = 6371 // Radius of the earth in km
  const toRad = (value) => value * Math.PI / 180 // Convert degrees to radians
  const kmPerMinute = 5 / 60 // average walking speed is 5 km per hour

  // function for restaurants with least walking distance
  const getNearbyPrimaries = () => {
    // filter out restaurants firther than 20 mins walk away and add distanceKm and walkTimeMin to each item
    const nearbyPrimaries = primaryData.filter(item => {
      const dLat = toRad(parseFloat(item.latitude) - parseFloat(postcodeData[0].longitude))
      const dLon = toRad(parseFloat(item.longitude) - parseFloat(postcodeData[0].latitude))
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(parseFloat(postcodeData[0].longitude))) * Math.cos(toRad(parseFloat(item.latitude))) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      const distanceKm = R * c

      item.distance_between = distanceKm
      item.walkTimeMin = Math.round(distanceKm / kmPerMinute)

      // logic to determine whether school is in the catchment area
      const distancePercent = distanceKm / item.max_distance

      // handle independent schools
      if (item.school_type === 'Independent school') {
        item.within_catchment = 'N/a'

        // handle special schools
      } else if (item.school_type === 'Special school') {
        item.within_catchment = 'N/a'
      } else if (item.max_distance === 'On request') {
        item.within_catchment = 'N/a'

        // handle schools with a map catchment
      } else if (item.additional_status === 'Based on map') {
        item.within_catchment = 'Check catchment map'

        // handle schools that have religioius requirement and have no distane measurement
      } else if (item.max_distance === 'Religion' & item.distance_between < 0.6) {
        item.within_catchment = 'Very likely if religious critera met'
      } else if (item.max_distance === 'Religion' & item.distance_between < 0.8) {
        item.within_catchment = 'Likely if religious critera met'
      } else if (item.max_distance === 'Religion' & item.distance_between < 1) {
        item.within_catchment = 'Probably if religious critera met'
      } else if (item.max_distance === 'Religion' & item.distance_between < 1.5) {
        item.within_catchment = 'Unlikely, even if religious critera met'
      } else if (item.max_distance === 'Religion' & item.distance_between > 1.5) {
        item.within_catchment = 'Very unlikely, even if religious critera met'

        // handle schools that have not specified their catchment
      } else if (item.max_distance === 'Not specified' & item.distance_between < 0.4) {
        item.within_catchment = 'Very likely but no distance specified'
      } else if (item.max_distance === 'Not specified' & item.distance_between < 0.7) {
        item.within_catchment = 'Likely but no distance specified'
      } else if (item.max_distance === 'Not specified' & item.distance_between < 1) {
        item.within_catchment = 'Probably but no distance specified'
      } else if (item.max_distance === 'Not specified' & item.distance_between > 1) {
        item.within_catchment = 'Unlikely, but no distance specified'

        // handle schools that have not been incliuded in the catchment extract
      } else if (item.max_distance === null & item.distance_between < 0.6) {
        item.within_catchment = 'Very likely, but no distance data available'
      } else if (item.max_distance === null & item.distance_between < 0.8) {
        item.within_catchment = 'Likely, but no distance data available'
      } else if (item.max_distance === null & item.distance_between < 1) {
        item.within_catchment = 'Probably, but no distance data available'
      } else if (item.max_distance === null & item.distance_between < 1.5) {
        item.within_catchment = 'Unlikely, but no distance data available'
      } else if (item.max_distance === null & item.distance_between > 1.5) {
        item.within_catchment = 'Very unlikely, but no distance data available'

        // handle schools with actual distance measurements
      } else if (distancePercent <= 0.6) {
        item.within_catchment = 'Yes'
      } else if (distancePercent <= 0.8) {
        item.within_catchment = 'Very likely'
      } else if (distancePercent <= 1.0) {
        item.within_catchment = 'Probably'
      } else if (distancePercent <= 1.2) {
        item.within_catchment = 'Probably not'

        // handle schools that have no catchment
      } else if (item.max_distance === 'Does not apply') {
        item.within_catchment = 'Yes'

        // handle any other schools
      } else {
        item.within_catchment = 'No'
      }

      return distanceKm <= walkDistanceKm20

    }).sort((b, a) => b.walkTimeMin - a.walkTimeMin)

    const firstSchoolNames = nearbyPrimaries.slice(0, 8)


    setTopPrimaries(firstSchoolNames)
    setPrimaryData1(nearbyPrimaries)

    console.log('nearby primaries ->', nearbyPrimaries)
  }


  // load data 
  useEffect(() => {
    if (primaryData) {
      getNearbyPrimaries()
    }
  }, [primaryData])




  // ? Section 4: Load secondary school data  
  const loadSecondaryData = () => {
    // Assuming th user is authorised, we want to load their profile information and set states based on relevant sections of this
    try {
      const getSecondaries = async () => {
        const { data } = await axios.get('/api/secondaries/')
        // console.log('secondaries data ->', data)
        setSecondaryData(data)
      }
      getSecondaries()
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  useEffect(() => {
    if (postcodeData) {
      loadSecondaryData()
    }
  }, [postcodeData])

  // function for restaurants with least walking distance

  const walkDistanceKm30 = 5 * (30 / 60) // updated for 20 mins

  const getNearbySecondaries = () => {
    // filter out restaurants firther than 20 mins walk away and add distanceKm and walkTimeMin to each item
    const nearbySecondaries = secondaryData.filter(item => {
      const dLat = toRad(parseFloat(item.latitude) - parseFloat(postcodeData[0].longitude))
      const dLon = toRad(parseFloat(item.longitude) - parseFloat(postcodeData[0].latitude))
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(parseFloat(postcodeData[0].longitude))) * Math.cos(toRad(parseFloat(item.latitude))) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      const distanceKm = R * c

      item.distance_between = distanceKm
      item.walkTimeMin = Math.round(distanceKm / kmPerMinute)

      // logic to determine whether school is in the catchment area
      const maxDistancePercent = distanceKm / item.max_distance
      const minDistancePercent = distanceKm / item.min_distance

      // handle independent schools, special schools and examination requirements
      if (item.school_type.includes('independent')) {
        item.within_catchment = 'N/a'
      } else if (item.school_type.includes('special')) {
        item.within_catchment = 'N/a'
      } else if (item.max_distance === 'Exam' || item.max_distance === 'Test score') {
        item.within_catchment = 'Dependent on test results'
      } else if (item.max_distance === 'Random') {
        item.within_catchment = 'Random selection based on performance'
      } else if (item.max_distance === 'Catchment score') {
        item.within_catchment = 'School uses catchment score - check'

        // handle schools with a map catchment
      } else if (item.max_distance === 'Based on map') {
        item.within_catchment = 'Check catchment map'

        // handle schools with religious requirements and no specified distance
      } else if (item.max_distance === 'Religion' & item.distance_between < 0.7) {
        item.within_catchment = 'Very likely if religious critera met'
      } else if (item.max_distance === 'Religion' & item.distance_between < 0.9) {
        item.within_catchment = 'Likely if religious critera met'
      } else if (item.max_distance === 'Religion' & item.distance_between < 1.5) {
        item.within_catchment = 'Probably if religious critera met'
      } else if (item.max_distance === 'Religion' & item.distance_between > 1.5) {
        item.within_catchment = 'Unlikely, even if religious critera met'

        // handle schools without a catchment
      } else if (item.max_distance === 'Does not apply') {
        item.within_catchment = 'Yes'

        // handle schools with a lower and an upper catchment
      } else if (item.min_distance !== null & minDistancePercent <= 1) {
        item.within_catchment = 'Yes'
      } else if (item.min_distance !== null & maxDistancePercent <= 0.5) {
        item.within_catchment = 'Very likely'
      } else if (item.min_distance !== null & maxDistancePercent <= 0.7) {
        item.within_catchment = 'Probably'

        // handle schools with only uppeer catchment
      } else if (maxDistancePercent <= 0.6) {
        item.within_catchment = 'Yes'
      } else if (maxDistancePercent <= 0.8) {
        item.within_catchment = 'Very likely'
      } else if (maxDistancePercent <= 1.0) {
        item.within_catchment = 'Probably'
      } else if (maxDistancePercent <= 1.2) {
        item.within_catchment = 'Probably not'
      } else {
        item.within_catchment = 'No'
      }

      return distanceKm <= walkDistanceKm30

    }).sort((b, a) => b.walkTimeMin - a.walkTimeMin)

    const firstSchoolNames = nearbySecondaries.slice(0, 8)


    setTopSecondaries(firstSchoolNames)
    setSecondaryData1(nearbySecondaries)

    // console.log('nearby secondaries ->', nearbySecondaries)
  }

  // load data 
  useEffect(() => {
    if (secondaryData) {
      getNearbySecondaries()
    }
  }, [secondaryData])



  // ? Section 5: Load and sort restaurant data
  const loadRestaurantData = () => {
    // Assuming th user is authorised, we want to load their profile information and set states based on relevant sections of this
    try {
      const getData = async () => {
        const { data } = await axios.get('/api/restaurants/')
        // console.log('restaurant data ->', data)
        setRestaurants(data)
      }
      getData()
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  useEffect(() => {
    if (postcodeData) {
      loadRestaurantData()
    }
  }, [postcodeData])

  // calculatgion for adding distances to the data based on the input coordinates
  // Average walking speed is 5km/h. Therefore, in 15 minutes, a person can walk approximately 1.25 km
  const walkDistanceKm15 = 5 * (15 / 60)

  // function for restaurants with least walking distance
  const getNearbyRestaurants = () => {

    // filter out restaurants firther than 15 mins walk away
    const nearbyRestaurants = restaurants.filter(item => {
      const dLat = toRad(parseFloat(item.latitude) - parseFloat(postcodeData[0].longitude))
      const dLon = toRad(parseFloat(item.longitude) - parseFloat(postcodeData[0].latitude))
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(parseFloat(postcodeData[0].longitude))) * Math.cos(toRad(parseFloat(item.latitude))) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      const distanceKm = R * c

      item.distance_between = distanceKm
      item.walkTimeMin = Math.round(distanceKm / kmPerMinute)

      return distanceKm <= walkDistanceKm15
    }).sort((a, b) => b.rating - a.rating)

    // count the number of cuisines in the area
    const countUniqueCuisines = (restaurants) => {
      const cuisines = new Set(restaurants.map(restaurant => restaurant.cuisine))
      return cuisines.size
    }

    // extract the top 3 restaurants
    const topThreeRestaurants = nearbyRestaurants
      .filter(restaurant => restaurant.cuisine !== 'No Cuisine Data')
      .slice(0, 3)
      .map(restaurant => restaurant.restaurant_name)

    setCuisines(countUniqueCuisines(nearbyRestaurants))
    setRestaurants1(nearbyRestaurants)
    setTopRestaurants(topThreeRestaurants)
    // console.log('cuisines ->', countUniqueCuisines(nearbyRestaurants))
    // console.log('Nearby restaurants ->', nearbyRestaurants)
    // console.log('Top restaurants ->', topThreeRestaurants)
    if (listingFields.restaurants === 1) {
      setAiFields(prevState => ({
        ...prevState,
        restaurants: `${nearbyRestaurants.length} restaurants within 15 min walk, with more than ${cuisines} cuisines available`,
      }))
    }
  }

  // load data for nearest restaurants
  useEffect(() => {
    if (restaurants) {
      getNearbyRestaurants()
    }
  }, [restaurants])





  // ? Section 6: Load and sort fitness data
  const loadFitnessData = () => {
    // Assuming th user is authorised, we want to load their profile information and set states based on relevant sections of this
    try {
      const getData = async () => {
        const { data } = await axios.get('/api/gyms/')
        // console.log('gyms data ->', data)
        setGyms(data)
      }
      getData()
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  useEffect(() => {
    if (postcodeData) {
      loadFitnessData()
    }
  }, [postcodeData])

  // calculatgion for adding distances to the data based on the input coordinates
  // Average walking speed is 5km/h. Therefore, in 15 minutes, a person can walk approximately 1.25 km

  // function for restaurants with least walking distance
  const getNearbyStudios = () => {

    const specificGyms = ['third space', 'pure gym', '1 rebel', 'virgin', 'barry\'s', 'the gym group']
    const uniqueGyms = new Set() // Used to store unique gym names



    // filter out restaurants firther than 15 mins walk away
    const nearbyStudios = gyms.filter(item => {
      const dLat = toRad(parseFloat(item.Lat) - parseFloat(postcodeData[0].longitude))
      const dLon = toRad(parseFloat(item.long) - parseFloat(postcodeData[0].latitude))
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(parseFloat(postcodeData[0].longitude))) * Math.cos(toRad(parseFloat(item.Lat))) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      const distanceKm = R * c

      item.distance_between = distanceKm
      item.walkTimeMin = Math.round(distanceKm / kmPerMinute)

      return distanceKm <= walkDistanceKm15
    }).sort((a, b) => a.walkTimeMin - b.walkTimeMin)

    // extract the key studios
    const topThreeStudios = []

    for (let i = 0; i < nearbyStudios.length; i++) {
      const gym = nearbyStudios[i]
      if (gym.gym_group && specificGyms.includes(gym.gym_group.toLowerCase()) && !uniqueGyms.has(gym.gym_group)) {
        topThreeStudios.push(gym.gym_group)
        uniqueGyms.add(gym.gym_group)

        if (topThreeStudios.length === 3) {
          break
        }
      }
    }

    setGyms1(nearbyStudios)
    setMainGyms(topThreeStudios)
    // console.log('Nearby gyms ->', nearbyStudios)
    // console.log('Main gyms ->', topThreeStudios)
    if (listingFields.gyms === 1) {
      setAiFields(prevState => ({
        ...prevState,
        gyms: `${nearbyStudios.length} gyms within 15 min walk, including ${topThreeStudios[0]} and  ${topThreeStudios[1]}`,
      }))
    }
  }

  // load data for nearest restaurants
  useEffect(() => {
    if (gyms) {
      getNearbyStudios()
    }
  }, [gyms])




  // ? Section 7: Load and sort supermarket data
  const loadSupermarketData = () => {
    // Assuming th user is authorised, we want to load their profile information and set states based on relevant sections of this
    try {
      const getData = async () => {
        const { data } = await axios.get('/api/supermarkets/')
        // console.log('supermarkets data ->', data)
        setSupermarkets(data)
      }
      getData()
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  useEffect(() => {
    if (postcodeData) {
      loadSupermarketData()
    }
  }, [postcodeData])

  // calculatgion for adding distances to the data based on the input coordinates
  // Average walking speed is 5km/h. Therefore, in 15 minutes, a person can walk approximately 1.25 km

  // function for restaurants with least walking distance
  const getNearbySupermatkets = () => {

    const specificSupermarkets = ['m&s', 'waitrose', 'aldi', 'lidl', 'sainsburys', 'tesco', 'asda']
    const uniqueSupermarkets = new Set() // Used to store unique gym names



    // filter out restaurants firther than 15 mins walk away
    const allSupermarkets = supermarkets.map(item => {
      const dLat = toRad(parseFloat(item.latitude) - parseFloat(postcodeData[0].longitude))
      const dLon = toRad(parseFloat(item.longitude) - parseFloat(postcodeData[0].latitude))
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(parseFloat(postcodeData[0].longitude))) * Math.cos(toRad(parseFloat(item.latitude))) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      const distanceKm = R * c

      item.distance_between = distanceKm
      item.walkTimeMin = Math.round(distanceKm / kmPerMinute)

      return { ...item, distance: distanceKm }
    })

    const nearbySupermarkets = allSupermarkets
      .filter(item => item.distance <= walkDistanceKm15)

    // extract the key studios
    const topThreeSupermarkets = []

    for (let i = 0; i < nearbySupermarkets.length; i++) {
      const supermarket = nearbySupermarkets[i]
      if (specificSupermarkets.includes(supermarket.supermarket_brand.toLowerCase()) && !uniqueSupermarkets.has(supermarket.supermarket_brand)) {
        topThreeSupermarkets.push(supermarket.supermarket_brand)
        uniqueSupermarkets.add(supermarket.supermarket_brand)

        if (topThreeSupermarkets.length === 3) {
          break
        }
      }
    }

    setSupermarkets1(nearbySupermarkets)
    setMainSupermarkets(topThreeSupermarkets)
    // console.log('Nearby supermarkets ->', nearbySupermarkets)
    if (listingFields.supermarkets === 1) {
      setAiFields(prevState => ({
        ...prevState,
        supermarkets: `${nearbySupermarkets.length} supermarkets within 15 min walk, including ${topThreeSupermarkets[0]} and ${topThreeSupermarkets[1]}`,
      }))
    }
    // console.log('Main supermarktets ->', topThreeSupermarkets)
  }

  // load data for nearest restaurants
  useEffect(() => {
    if (supermarkets) {
      getNearbySupermatkets()
    }
  }, [supermarkets])



  // ? Section 8: Load and sort tubes data
  const loadTubesData = () => {
    // Assuming th user is authorised, we want to load their profile information and set states based on relevant sections of this
    try {
      const getData = async () => {
        const { data } = await axios.get('/api/tubes/')
        // console.log('tubes data ->', data)
        setTubes(data)
      }
      getData()
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  useEffect(() => {
    if (postcodeData) {
      loadTubesData()
    }
  }, [postcodeData])

  // calculatgion for adding distances to the data based on the input coordinates  
  // function for restaurants with least walking distance
  const getNearbyTubes = () => {

    // filter out restaurants firther than 15 mins walk away
    const nearbyTubes = tubes.filter(item => {
      const dLat = toRad(parseFloat(item.lat) - parseFloat(postcodeData[0].longitude))
      const dLon = toRad(parseFloat(item.long) - parseFloat(postcodeData[0].latitude))
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(parseFloat(postcodeData[0].longitude))) * Math.cos(toRad(parseFloat(item.lat))) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      const distanceKm = R * c

      item.distance_between = distanceKm
      item.walkTimeMin = Math.round(distanceKm / kmPerMinute)

      return distanceKm <= walkDistanceKm20
    }).sort((b, a) => b.walkTimeMin - a.walkTimeMin)


    setTubes1(nearbyTubes)
    console.log('Nearby tubes ->', nearbyTubes)

    if (listingFields.tubes === 1) {
      setAiFields(prevState => ({
        ...prevState,
        tubes: `${nearbyTubes.length} within 15 min walk, including ${nearbyTubes[0].station_name} and ${nearbyTubes[1].station_name}`,
      }))
    }

  }

  // load data for nearest restaurants
  useEffect(() => {
    if (tubes) {
      getNearbyTubes()
    }
  }, [tubes])



  // ? Section 9: Load and sort EV data
  const loadEVdata = () => {
    // Assuming th user is authorised, we want to load their profile information and set states based on relevant sections of this
    try {
      const getData = async () => {
        const { data } = await axios.get('/api/evs/')
        // console.log('ev data ->', data)
        setEv(data)
        // Average walking speed is 5km/h. 
        const walkDistanceKm10 = 5 * (10 / 60)

        // filter out restaurants firther than 15 mins walk away
        const nearbyChargers = data.filter(item => {
          const dLat = toRad(parseFloat(item.latitude) - parseFloat(postcodeData[0].longitude))
          const dLon = toRad(parseFloat(item.longitude) - parseFloat(postcodeData[0].latitude))
          const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(parseFloat(postcodeData[0].longitude))) * Math.cos(toRad(parseFloat(item.latitude))) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
          const distanceKm = R * c

          item.distance_between = distanceKm
          item.walkTimeMin = Math.round(distanceKm / kmPerMinute)

          return distanceKm <= walkDistanceKm10
        }).sort((a, b) => a.walkTimeMin - b.walkTimeMin)


        setEv1(nearbyChargers)
      }
      getData()
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  useEffect(() => {
    if (postcodeData) {
      loadEVdata()
    }
  }, [postcodeData])




  // ? Section 10: Load in pubs data
  const loadPubsData = () => {
    // Assuming th user is authorised, we want to load their profile information and set states based on relevant sections of this
    try {
      const getData = async () => {
        const { data } = await axios.get('/api/pubs/')
        // console.log('pub data ->', data)
        setPubs(data)
      }
      getData()
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  useEffect(() => {
    if (postcodeData) {
      loadPubsData()
    }
  }, [postcodeData])

  // calculatgion for adding distances to the data based on the input coordinates

  // function for restaurants with least walking distance
  const getNearbyPubs = () => {

    // filter out restaurants firther than 15 mins walk away
    const nearbyPubs = pubs.filter(item => {
      const dLat = toRad(parseFloat(item.latitude) - parseFloat(postcodeData[0].longitude))
      const dLon = toRad(parseFloat(item.longitude) - parseFloat(postcodeData[0].latitude))
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(parseFloat(postcodeData[0].longitude))) * Math.cos(toRad(parseFloat(item.latitude))) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      const distanceKm = R * c

      item.distance_between = distanceKm
      item.walkTimeMin = Math.round(distanceKm / kmPerMinute)

      return distanceKm <= walkDistanceKm15
    }).sort((a, b) => a.walkTimeMin - b.walkTimeMin)


    // extract the top 3 restaurants
    const topThreePubs = nearbyPubs
      .slice(0, 3)
      .map(pub => pub.name)

    setPubs1(nearbyPubs)
    setTopPubs(topThreePubs)
    // console.log('cuisines ->', countUniqueCuisines(nearbyRestaurants))
    // console.log('Nearby pubs ->', nearbyPubs)
    // console.log('Top restaurants ->', topThreeRestaurants)
  }

  // load data for nearest restaurants
  useEffect(() => {
    if (pubs) {
      getNearbyPubs()
    }
  }, [pubs])



  // ? Section 11: Load and sort tubes data
  const loadTrainsData = () => {
    // Assuming th user is authorised, we want to load their profile information and set states based on relevant sections of this
    try {
      const getData = async () => {
        const { data } = await axios.get('/api/trains/')
        // console.log('trains data ->', data)
        setTrains(data)
      }
      getData()
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  useEffect(() => {
    if (postcodeData) {
      loadTrainsData()
    }
  }, [postcodeData])

  // calculatgion for adding distances to the data based on the input coordinates  
  // function for restaurants with least walking distance
  const getNearbyTrains = () => {

    // filter out restaurants firther than 15 mins walk away
    const nearbyTrains = trains.filter(item => {
      const dLat = toRad(parseFloat(item.latitude) - parseFloat(postcodeData[0].longitude))
      const dLon = toRad(parseFloat(item.longitude) - parseFloat(postcodeData[0].latitude))
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(parseFloat(postcodeData[0].longitude))) * Math.cos(toRad(parseFloat(item.latitude))) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
      const distanceKm = R * c

      item.distance_between = distanceKm
      item.walkTimeMin = Math.round(distanceKm / kmPerMinute)

      return distanceKm <= walkDistanceKm20
    }).sort((b, a) => b.walkTimeMin - a.walkTimeMin)


    setTrains1(nearbyTrains)
    // console.log('Nearby trains ->', nearbyTrains)
  }

  // load data for nearest restaurants
  useEffect(() => {
    if (trains) {
      getNearbyTrains()
    }
  }, [trains])



  // calculation to determine the inputs on the form and the toggle
  const toggleStatus = (key) => {
    setListingFields(prevData => ({
      ...prevData,
      [key]: prevData[key] === 1 ? 0 : 1,
    }))
  }


  // Copy function
  const handleCopyText = () => {
    const htmlContent = textDivRef.current.innerHTML
    const el = document.createElement('div')
    el.contentEditable = true
    el.innerHTML = htmlContent
    document.body.appendChild(el)
    const range = document.createRange()
    range.selectNodeContents(el)
    const sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
    el.focus()
    document.execCommand('copy')
    document.body.removeChild(el)
  }



  // Increase value in db based on successful response
  const increaseUsageCount = async (listingType) => {
    // console.log('trying to increase')
    try {
      const { data } = await axios.post('/api/usage/listing/', { column: listingType }, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      console.log(data)
      if (data.status === 'success') {
        // console.log('Usage count increased successfully')
      } else {
        // console.error('Failed to increase usage count:', data.message)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }



  const handleCheckboxChange = (feature) => {
    setAiFields(prev => {
      // Check if the feature is already in the amenities array
      if (prev.amenities.includes(feature)) {
        // If it is, remove it
        return {
          ...prev,
          amenities: prev.amenities.filter(a => a !== feature),
        }
      } else {
        // If it isn’t, add it
        return {
          ...prev,
          amenities: [...prev.amenities, feature],
        }
      }
    })
  }


  const handleInsightClick = () => {
    loadPostcodeData('listing_insight_total')
    setListingFields(prevState => ({ ...prevState, request_type: 'insights' }))
    setInsightView('Results')
  }

  // remove login token from storage
  const removeItemFromStorage = (token) => {
    localStorage.removeItem('wittle-user-token')
    localStorage.removeItem('wittle-username')
    navigate('/login')
  }


  // check to see if the user has come from the favourites section
  // useEffect(() => {
  //   const listing = JSON.parse(localStorage.getItem('listing-route'))
  //   setListingRoute(listing)
  //   console.log(listing)
  // }, [])


  // useEffect(() => {
  //   const listing = JSON.parse(localStorage.getItem('listing-route'))
  //   console.log('listing route ->', listing)

  const fetchData = async () => {
    const listing = JSON.parse(localStorage.getItem('listing-route'))
    console.log('listing route ->', listing)
    if (listing === 'On') {
      setInsightView('Results')
      const postcodeRoute = JSON.parse(localStorage.getItem('listing-postcode'))
      console.log('postcode-route', postcodeRoute)
      try {
        const { data } = await axios.post('/api/postcodes/', { postcode: postcodeRoute })
        console.log('postcode data ->', data)
        setPostcodes(data)
        window.localStorage.setItem('listing-route', JSON.stringify('Off'))
        setListingRoute('Off')
      } catch (error) {
        console.error('Error fetching postcodes:', error)
      }
    }
  }
  //   fetchData()
  // }, [])


  // load data to trigger data load if user comes from the favourites section
  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (listingRoute === 'On') {
  //       setInsightView('Results')
  //       const postcodeRoute = JSON.parse(localStorage.getItem('listing-postcode'))
  //       try {
  //         const { data } = await axios.post('/api/postcodes/', { postcode: postcodeRoute })
  //         console.log('postcode data ->', data)
  //         setPostcodes(data)
  //         window.localStorage.setItem('listing-route', JSON.stringify('Off'))
  //         setListingRoute('Off')
  //       } catch (error) {
  //         console.error('Error fetching postcodes:', error)
  //       }
  //     }
  //   }

  //   fetchData()
  // }, [listingRoute])




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
          setProfileContent={setProfileContent}
          userData={userData}
        />
        {userData && userData.usage_stats[0].package === 'Trial expired' ?

          <section className='main-body remove-margin' style={{ height: insightView === 'Results' ? 'auto' : 'none', marginTop: insightView === 'Results' ? '3%' : 'none' }}>
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
                </div>
              </section>
            </section>
          </section>
          :

          <section className='main-body remove-margin' style={{ height: insightView === 'Results' ? 'auto' : 'none', marginTop: insightView === 'Results' ? '3%' : 'none' }}>
            <section className='main-body-details'  >
              <section className='listing-generator'>
                {/* <h1>Wittle listing generator</h1> */}
                {/* <h1>Insert your property details to build a listing or explore insights</h1> */}

                <div className='listing-options'>
                  <div className='listing-buttons'>
                    <h5 className='no-print' onClick={() => setListingSelection('Property insights')} style={{ borderBottom: listingSelection === 'Property insights' ? '3px solid #ED6B86' : 'none', textUnderlineOffset: listingSelection === 'Property insights' ? '0.5em' : 'initial', fontWeight: listingSelection === 'Property insights' ? '700' : '400' }}>Property insights</h5>
                    <h5 className='no-print' onClick={() => setListingSelection('Listing generator')} style={{ borderBottom: listingSelection === 'Listing generator' ? '3px solid #ED6B86' : 'none', textUnderlineOffset: listingSelection === 'Listing generator' ? '0.5em' : 'initial', fontWeight: listingSelection === 'Listing generator' ? '700' : '400' }}>Listing generator</h5>
                    <h5 className='no-print' onClick={() => setListingSelection('AI listing generator')} style={{ borderBottom: listingSelection === 'AI listing generator' ? '3px solid #ED6B86' : 'none', textUnderlineOffset: listingSelection === 'AI listing generator' ? '0.5em' : 'initial', fontWeight: listingSelection === 'AI listing generator' ? '700' : '400' }}>AI listing generator</h5>
                    <h5 className='no-print' onClick={() => setListingSelection('Saved searches')} style={{ borderBottom: listingSelection === 'Saved searches' ? '3px solid #ED6B86' : 'none', textUnderlineOffset: listingSelection === 'Saved searches' ? '0.5em' : 'initial', fontWeight: listingSelection === 'Saved searches' ? '700' : '400' }}>Saved searches</h5>
                    {userData && (userData.id === 1 || userData.id === 62 || userData.id === 55) ? <h5 className='no-print' onClick={() => setListingSelection('Top properties')} style={{ borderBottom: listingSelection === 'Top properties' ? '3px solid #ED6B86' : 'none', textUnderlineOffset: listingSelection === 'Top properties' ? '0.5em' : 'initial', fontWeight: listingSelection === 'Top properties' ? '700' : '400' }}>Top properties</h5> : ''}
                  </div>
                  <div className='logout-button' onClick={removeItemFromStorage}>
                    <div className='logout-icon'></div>
                  </div>


                </div>
                <hr className='title-line' />

                {listingSelection === 'Property insights' && userData &&
                  ((userData.usage_stats[0].package === 'Basic' && userData.usage_stats[0].listing_monthly_count < 11) ||
                    (userData.usage_stats[0].package === 'Unlimited') ||
                    (userData.usage_stats[0].package === 'Advanced Pilot' && userData.usage_stats[0].listing_monthly_count < 101)) ?
                  <>
                    {insightView === 'Search' ?
                      <div className='basic-listing-wrapper'>

                        <div className='property-insight-inputs'>
                          <h3 className='insight-title'>Insert full postcode to extract details about property</h3>
                          <div className='double-input-block'>
                            <div className='input-block small'>
                              <h3>Postcode</h3>
                              <input
                                type="text"
                                value={postcodeSubstring}
                                onChange={e => setPostcodeSubstring(e.target.value.toUpperCase().replace(/\s+/g, ''))}
                                placeholder="Enter postcode"></input>
                            </div>
                            <div className='input-block medium'>
                              <h3>Address</h3>
                              <input
                                type="text"
                                value={addressSubstring}
                                onChange={e => {
                                  const value = e.target.value
                                  setAddressSubstring(value)
                                  setListingFields(prevData => ({ ...prevData, address: value }))
                                }}
                                placeholder="Enter address"></input>
                            </div>
                          </div>

                          <div className='input-block large'>
                            <h3>Channel</h3>

                            <select className='listing-dropdown' onChange={e => setListingFields(prevState => ({ ...prevState, channel: e.target.value }))}>
                              <option>--- Select ---</option>
                              <option>Sales</option>
                              <option>Rental</option>
                            </select>
                          </div>
                          <div className='search-section'>
                            <button className='load-insights' onClick={handleInsightClick}>See insights</button>

                          </div>
                        </div>
                      </div>
                      : insightView === 'Results' ?
                        <PropertyInsightsOverview
                          postcodeSubstring={postcodeSubstring}
                          addressSubstring={addressSubstring}
                          listingFields={listingFields}
                          postcodeData={postcodeData}
                          topPrimaries={topPrimaries}
                          topSecondaries={topSecondaries}
                          restaurants1={restaurants1}
                          cuisines={cuisines}
                          topRestaurants={topRestaurants}
                          setRestaurants1={setRestaurants1}
                          gyms1={gyms1}
                          setGyms1={setGyms1}
                          mainGyms={mainGyms}
                          supermarkets1={supermarkets1}
                          setSupermarkets1={setSupermarkets1}
                          mainSupermarkets={mainSupermarkets}
                          pubs1={pubs1}
                          topPubs={topPubs}
                          tubes1={tubes1}
                          setTubes1={setTubes1}
                          trains1={trains1}
                          insightView={insightView}
                          setInsightView={setInsightView}
                          primaryData1={primaryData1}
                          setPrimaryData1={setPrimaryData1}
                          secondaryData1={secondaryData1}
                          setSecondaryData1={setSecondaryData1}
                          ev1={ev1}
                          setEv1={setEv1}
                          secondaryDetail={secondaryDetail}
                          setSecondaryDetail={setSecondaryDetail}
                          primaryDetail={primaryDetail}
                          setPrimaryDetail={setPrimaryDetail}
                        />
                        : ''}
                  </>


                  : listingSelection === 'Listing generator' && userData &&
                    ((userData.usage_stats[0].package === 'Basic' && userData.usage_stats[0].listing_monthly_count < 11) ||
                      (userData.usage_stats[0].package === 'Unlimited') ||
                      (userData.usage_stats[0].package === 'Advanced Pilot' && userData.usage_stats[0].listing_monthly_count < 101)) ?
                    <>
                      <div className='full-listing-wrapper'>
                        <div className='full-listing-inputs'>

                          <div className='property-insight-inputs'>
                            <h3 className='insight-title'>Input details and select features you want to include in your listing</h3>
                            <div className='double-input-block'>
                              <div className='input-block small'>
                                <h3>Postcode</h3>
                                <input
                                  type="text"
                                  value={postcodeSubstring}
                                  onChange={e => setPostcodeSubstring(e.target.value.toUpperCase().replace(/\s+/g, ''))}
                                  placeholder="Enter postcode..."></input>
                              </div>
                              <div className='input-block medium'>
                                <h3>Address</h3>
                                <input
                                  type="text"
                                  value={addressSubstring}
                                  onChange={e => {
                                    const value = e.target.value
                                    setAddressSubstring(value)
                                    setListingFields(prevData => ({ ...prevData, address: value }))
                                  }}
                                  placeholder="Enter address"></input>
                              </div>
                            </div>
                            <div className='single-input-block'>

                              <div className='input-block large'>
                                <h3>Channel</h3>

                                <select className='listing-dropdown' onChange={e => setListingFields(prevState => ({ ...prevState, channel: e.target.value }))}>
                                  <option>--- Select ---</option>
                                  <option>Sales</option>
                                  <option>Rental</option>
                                </select>
                              </div>
                            </div>
                            <div className='single-input-block'>

                              <div className='input-block large'>
                                <h3>Description</h3>
                                <textarea id="description" value={listingFields.description} rows="4" placeholder='Enter description' onChange={e => setListingFields(prevState => ({ ...prevState, description: e.target.value }))}></textarea>
                              </div>
                            </div>
                            <div className='lifestyle-input-block'>
                              <h3 className='insight-title'>Lifestyle elements to include</h3>

                              <div className='lifestyle-input-wrap'>
                                <div className='input-block-icons'>
                                  <div className='lifestyle-icon' id='primaries'></div>
                                  <h3>Primary schools</h3>
                                  <ReactSwitch
                                    checked={listingFields.primary_schools === 1}
                                    onChange={() => toggleStatus('primary_schools')}
                                    onColor='#ED6B86'
                                    offColor='#D5D5D5'
                                    uncheckedIcon={null}
                                    checkedIcon={null}
                                  />
                                </div>
                                <div className='input-block-icons'>
                                  <div className='lifestyle-icon' id='secondaries'></div>
                                  <h3>Secondary schools</h3>
                                  <ReactSwitch
                                    checked={listingFields.secondary_schools === 1}
                                    onChange={() => toggleStatus('secondary_schools')}
                                    onColor='#ED6B86'
                                    offColor='#D5D5D5'
                                    uncheckedIcon={null}
                                    checkedIcon={null}
                                  />
                                </div>
                                <div className='input-block-icons'>
                                  <div className='lifestyle-icon' id='tubes'></div>
                                  <h3>Tubes</h3>
                                  <ReactSwitch
                                    checked={listingFields.tubes === 1}
                                    onChange={() => toggleStatus('tubes')}
                                    onColor='#ED6B86'
                                    offColor='#D5D5D5'
                                    uncheckedIcon={null}
                                    checkedIcon={null}
                                  />
                                </div>
                                <div className='input-block-icons'>
                                  <div className='lifestyle-icon' id='trains'></div>
                                  <h3>Trains</h3>
                                  <ReactSwitch
                                    checked={listingFields.trains === 1}
                                    onChange={() => toggleStatus('trains')}
                                    onColor='#ED6B86'
                                    offColor='#D5D5D5'
                                    uncheckedIcon={null}
                                    checkedIcon={null}
                                  />
                                </div>
                                <div className='input-block-icons'>
                                  <div className='lifestyle-icon' id='evs'></div>
                                  <h3>Electric vehicles</h3>
                                  <ReactSwitch
                                    checked={listingFields.evs === 1}
                                    onChange={() => toggleStatus('evs')}
                                    onColor='#ED6B86'
                                    offColor='#D5D5D5'

                                    uncheckedIcon={null}
                                    checkedIcon={null}
                                  />
                                </div>
                                <div className='input-block-icons'>


                                  <div className='lifestyle-icon' id='restaurants'></div>
                                  <h3>Restaurants</h3>
                                  <ReactSwitch
                                    checked={listingFields.restaurants === 1}
                                    onChange={() => toggleStatus('restaurants')}
                                    onColor='#ED6B86'
                                    offColor='#D5D5D5'

                                    uncheckedIcon={null}
                                    checkedIcon={null}
                                  />
                                </div>
                                <div className='input-block-icons'>

                                  <div className='lifestyle-icon' id='pubs'></div>
                                  <h3>Pubs</h3>
                                  <ReactSwitch
                                    checked={listingFields.pubs === 1}
                                    onChange={() => toggleStatus('pubs')}
                                    onColor='#ED6B86'
                                    offColor='#D5D5D5'

                                    uncheckedIcon={null}
                                    checkedIcon={null}
                                  />
                                </div>
                                <div className='input-block-icons'>
                                  <div className='lifestyle-icon' id='parks'></div>
                                  <h3>Parks</h3>
                                  <ReactSwitch
                                    checked={listingFields.parks === 1}
                                    onChange={() => toggleStatus('parks')}
                                    onColor='#ED6B86'
                                    offColor='#D5D5D5'

                                    uncheckedIcon={null}
                                    checkedIcon={null}
                                  />
                                </div>
                                <div className='input-block-icons'>
                                  <div className='lifestyle-icon' id='gyms'></div>
                                  <h3>Gyms</h3>
                                  <ReactSwitch
                                    checked={listingFields.gyms === 1}
                                    onChange={() => toggleStatus('gyms')}
                                    onColor='#ED6B86'
                                    offColor='#D5D5D5'

                                    uncheckedIcon={null}
                                    checkedIcon={null}
                                  />
                                </div>
                                <div className='input-block-icons'>
                                  <div className='lifestyle-icon' id='supermarkets'></div>
                                  <h3>Supermarkets</h3>
                                  <ReactSwitch
                                    checked={listingFields.supermarkets === 1}
                                    onChange={() => toggleStatus('supermarkets')}
                                    onColor='#ED6B86'
                                    offColor='#D5D5D5'

                                    uncheckedIcon={null}
                                    checkedIcon={null}
                                  />
                                </div>
                                <div className='input-block-icons'>
                                  <div className='lifestyle-icon' id='crime'></div>
                                  <h3>Crime</h3>
                                  <ReactSwitch
                                    checked={listingFields.crime === 1}
                                    onChange={() => toggleStatus('crime')}
                                    onColor='#ED6B86'
                                    offColor='#D5D5D5'

                                    uncheckedIcon={null}
                                    checkedIcon={null}
                                  />
                                </div>
                              </div>

                            </div>
                            <div className='listing-search-section'>
                              <button className='load-insights' onClick={() => loadPostcodeData('listing_normal_total')}>Load description</button>
                            </div>
                          </div>
                        </div>
                        <section className='full-listing-outputs'>
                          <div className='results-header'>
                            <div className='header-text'>
                              <h3 className='results-title'>Your listing</h3>
                            </div>
                            <div className='header-cta'>
                              <div className='copy-button' onClick={handleCopyText}>
                                <div className='copy-icon'></div>
                                <h3>Copy</h3>
                              </div>
                            </div>

                          </div>

                          {/* Results that you will see on the page */}
                          <div className='results-section'>
                            <div className='results-description'>
                              {postcodeData && listingFields.description !== '' ? <h3>{listingFields.description}</h3> : ''}

                            </div>
                            {postcodeData ? <h3 className='results-sub-title'>What you should know about this area</h3> : ''}

                            {restaurants1 && listingFields.restaurants === 1 ?
                              <>
                                <div className='results-block'>
                                  <div className='result-block-header'>
                                    <div className='lifestyle-icon' id='restaurants'></div>
                                    <h3>Restaurants</h3>
                                  </div>
                                  <>
                                    <ul className='results-details'>
                                      <li>{restaurants1.length} restaurants within 15 mins walk</li>
                                      <li>more than {cuisines} cuisines available</li>
                                      <li>{topRestaurants[0]}, {topRestaurants[1]} & {topRestaurants[2]} are well rated</li>
                                    </ul>
                                  </>
                                </div><hr className='results-divider' />
                              </>
                              : ''}
                            {pubs1 && listingFields.pubs === 1 ?

                              <>
                                <div className='results-block'>
                                  <div className='result-block-header'>
                                    <div className='lifestyle-icon' id='pubs'></div>
                                    <h3>Pubs</h3>
                                  </div>
                                  <>
                                    <ul className='results-details'>
                                      <li>{pubs1.length} pubs within 15 mins walk</li>
                                      <li>{topPubs[0]}, {topPubs[1]} & {topPubs[2]} are well rated</li>
                                    </ul>
                                  </>
                                </div><hr className='results-divider' />
                              </>
                              : ''}
                            {primaryData1 && listingFields.primary_schools === 1 ?

                              <>
                                <div className='results-block'>
                                  <div className='result-block-header'>
                                    <div className='lifestyle-icon' id='primaries'></div>
                                    <h3>Primary schools</h3>
                                  </div>
                                  <>
                                    <ul className='results-details'>
                                      {primaryData1.slice(0, 5).map((school, index) => (
                                        <li key={index}>{school.school_name} - {school.ofsted_results} ofsted - {school.walkTimeMin} mins walk</li>
                                      ))}
                                    </ul>

                                  </>
                                </div><hr className='results-divider' />
                              </>
                              : ''}

                            {secondaryData1 && listingFields.secondary_schools === 1 ?
                              <>
                                <div className='results-block'>
                                  <div className='result-block-header'>
                                    <div className='lifestyle-icon' id='secondaries'></div>
                                    <h3>Secondary schools</h3>
                                  </div>
                                  <>
                                    <ul className='results-details'>
                                      {secondaryData1.slice(0, 5).map((school, index) => (
                                        <li key={index}>{school.school_name} - {school.ofsted_results} ofsted - {school.walkTimeMin} mins walk</li>
                                      ))}
                                    </ul>
                                  </>
                                </div><hr className='results-divider' />
                              </>
                              : ''}
                            {gyms1 && listingFields.gyms === 1 ?
                              <>
                                <div className='results-block'>
                                  <div className='result-block-header'>
                                    <div className='lifestyle-icon' id='gyms'></div>
                                    <h3>Gyms</h3>
                                  </div>
                                  <>
                                    <ul className='results-details'>
                                      <li>{gyms1.length} gyms within 15 mins walk</li>
                                      {mainGyms.length === 3 ? <li>includes {mainGyms[0]}, {mainGyms[1]} & {mainGyms[2]}</li> : mainGyms.length === 2 ? <li>includes {mainGyms[0]} & {mainGyms[1]} </li> : mainGyms.length === 1 ? <li>includes {mainGyms[0]}</li> : ''}
                                    </ul>
                                  </>
                                </div><hr className='results-divider' />
                              </>
                              : ''}
                            {supermarkets1 && listingFields.supermarkets === 1 ?
                              <>
                                <div className='results-block'>
                                  <div className='result-block-header'>
                                    <div className='lifestyle-icon' id='supermarkets'></div>
                                    <h3>Supermarkets</h3>
                                  </div>
                                  <>
                                    <ul className='results-details'>
                                      <li>🛒 {supermarkets1.length} supermarkets within 15 mins walk</li>
                                      {mainSupermarkets.length === 3 ? <li>🛒 includes {mainSupermarkets[0]}, {mainSupermarkets[1]} & {mainSupermarkets[2]}</li> : mainSupermarkets.length === 2 ? <li>🛒 includes {mainSupermarkets[0]} & {mainSupermarkets[1]} </li> : mainSupermarkets.length === 1 ? <li>🛒 includes {mainSupermarkets[0]}</li> : ''}
                                    </ul>
                                  </>
                                </div>
                                <hr className='results-divider' />
                              </>
                              : ''}
                            {tubes1 && listingFields.tubes === 1 ?
                              <>
                                <div className='results-block'>
                                  <div className='result-block-header'>
                                    <div className='lifestyle-icon' id='tubes'></div>
                                    <h3>Tubes</h3>
                                  </div>
                                  <>
                                    <ul className='results-details'>
                                      <li>{tubes1.length} stations within 20 mins walk</li>
                                      {
                                        tubes1.slice(0, 3).map((train, index) => (
                                          <li key={index}>{train.station_name} - {train.line} - {train.walkTimeMin} mins walk</li>
                                        ))
                                      } </ul>
                                  </>
                                </div>
                                <hr className='results-divider' />
                              </>
                              : ''}
                            {trains1 && listingFields.trains === 1 ?
                              <>
                                <div className='results-block'>
                                  <div className='result-block-header'>
                                    <div className='lifestyle-icon' id='trains'></div>
                                    <h3>Trains</h3>
                                  </div>
                                  <>
                                    <ul className='results-details'>
                                      <li>{trains1.length} stations within 20 mins walk</li>
                                      {
                                        trains1.slice(0, 3).map((train, index) => (
                                          <li key={index}>{train.station} - {train.walkTimeMin} mins walk</li>
                                        ))
                                      }
                                    </ul>
                                  </>
                                </div>
                                <hr className='results-divider' />
                              </>
                              : ''}
                            {postcodeData && listingFields.parks === 1 ?
                              <>
                                <div className='results-block'>
                                  <div className='result-block-header'>
                                    <div className='lifestyle-icon' id='parks'></div>
                                    <h3>Parks</h3>
                                  </div>
                                  <>
                                    <ul className='results-details'>
                                      <li>within top {100 - postcodeData[0].parks_lsoa[0].london_percentile}% of areas in london for access to greenspace</li>
                                      <li>{postcodeData[0].parks_postcode.park_name0} - {Math.ceil((((postcodeData[0].parks_postcode.distance0) / 1000) / 5) * 60)} mins walk</li>
                                      <li>{postcodeData[0].parks_postcode.park_name1} - {Math.ceil((((postcodeData[0].parks_postcode.distance1) / 1000) / 5) * 60)} mins walk</li>
                                      <li>{postcodeData[0].parks_postcode.park_name2} - {Math.ceil((((postcodeData[0].parks_postcode.distance2) / 1000) / 5) * 60)} mins walk</li>
                                    </ul>
                                  </>
                                </div>
                                <hr className='results-divider' />
                              </>
                              : ''}
                            {ev1 && listingFields.evs === 1 ?
                              <>
                                <div className='results-block'>
                                  <div className='result-block-header'>
                                    <div className='lifestyle-icon' id='evs'></div>
                                    <h3>Electric vehicle charging</h3>
                                  </div>
                                  <>
                                    <ul className='results-details'>
                                      <li>{postcodeData[0].ev.ev_10_mins} charging points within 10 mins walk</li>
                                      <li>in the top {Math.round((1 - postcodeData[0].ev.percentile) * 100)}% of areas in London for ev charging access</li>
                                    </ul>
                                  </>
                                </div>
                                <hr className='results-divider' />
                              </>
                              : ''}
                          </div>


                          {/* Results that you will get when you click export */}
                          <div className='results-section-icons' ref={textDivRef}>
                            <div className='results-description'>
                              {postcodeData && listingFields.description !== '' ? <h3>{listingFields.description}</h3> : ''}

                            </div>
                            {postcodeData ? <h3 className='results-sub-title'>What you should know about this area</h3> : ''}

                            {restaurants1 && listingFields.restaurants === 1 ?
                              <>
                                <div className='results-block'>
                                  <div className='result-block-header'>
                                    <div className='lifestyle-icon' id='restaurants'></div>
                                    <h3>🥘 Restaurants</h3>
                                  </div>
                                  <>
                                    <ul className='results-details'>
                                      {/* <li>{restaurants1.length} restaurants within 15 mins walk</li> */}
                                      <li>more than {cuisines} cuisines available</li>
                                      <li>{topRestaurants[0]}, {topRestaurants[1]} & {topRestaurants[2]} are well rated</li>
                                    </ul>
                                  </>
                                </div><hr className='results-divider' />
                              </>
                              : ''}
                            {pubs1 && listingFields.pubs === 1 ?

                              <>
                                <div className='results-block'>
                                  <div className='result-block-header'>
                                    <div className='lifestyle-icon' id='pubs'></div>
                                    <h3>🍺 Pubs</h3>
                                  </div>
                                  <>
                                    <ul className='results-details'>
                                      <li>{pubs1.length} pubs within 15 mins walk</li>
                                      <li>{topPubs[0]}, {topPubs[1]} & {topPubs[2]} are well rated</li>
                                    </ul>
                                  </>
                                </div><hr className='results-divider' />
                              </>
                              : ''}
                            {primaryData1 && listingFields.primary_schools === 1 ?

                              <>
                                <div className='results-block'>
                                  <div className='result-block-header'>
                                    <div className='lifestyle-icon' id='primaries'></div>
                                    <h3>👶 Primary schools</h3>
                                  </div>
                                  <>
                                    <ul className='results-details'>
                                      {primaryData1.slice(0, 5).map((school, index) => (
                                        <li key={index}>{school.school_name} - {school.ofsted_results} ofsted - {school.walkTimeMin} mins walk</li>
                                      ))}
                                    </ul>

                                  </>
                                </div><hr className='results-divider' />
                              </>
                              : ''}

                            {secondaryData1 && listingFields.secondary_schools === 1 ?
                              <>
                                <div className='results-block'>
                                  <div className='result-block-header'>
                                    <div className='lifestyle-icon' id='secondaries'></div>
                                    <h3>🎓 Secondary schools</h3>
                                  </div>
                                  <>
                                    <ul className='results-details'>
                                      {secondaryData1.slice(0, 5).map((school, index) => (
                                        <li key={index}>{school.school_name} - {school.ofsted_results} ofsted - {school.walkTimeMin} mins walk</li>
                                      ))}
                                    </ul>
                                  </>
                                </div><hr className='results-divider' />
                              </>
                              : ''}
                            {gyms1 && listingFields.gyms === 1 ?
                              <>
                                <div className='results-block'>
                                  <div className='result-block-header'>
                                    <div className='lifestyle-icon' id='gyms'></div>
                                    <h3>🏋️‍♂️ Gyms</h3>
                                  </div>
                                  <>
                                    <ul className='results-details'>
                                      <li>{gyms1.length} gyms within 15 mins walk</li>
                                      {mainGyms.length === 3 ? <li>includes {mainGyms[0]}, {mainGyms[1]} & {mainGyms[2]}</li> : mainGyms.length === 2 ? <li>includes {mainGyms[0]} & {mainGyms[1]} </li> : mainGyms.length === 1 ? <li>includes {mainGyms[0]}</li> : ''}
                                    </ul>
                                  </>
                                </div><hr className='results-divider' />
                              </>
                              : ''}
                            {supermarkets1 && listingFields.supermarkets === 1 ?
                              <>
                                <div className='results-block'>
                                  <div className='result-block-header'>
                                    <div className='lifestyle-icon' id='supermarkets'></div>
                                    <h3>🛒 Supermarkets</h3>
                                  </div>
                                  <>
                                    <ul className='results-details'>
                                      <li>{supermarkets1.length} supermarkets within 15 mins walk</li>
                                      {mainSupermarkets.length === 3 ? <li>includes {mainSupermarkets[0]}, {mainSupermarkets[1]} & {mainSupermarkets[2]}</li> : mainSupermarkets.length === 2 ? <li>Includes {mainSupermarkets[0]} & {mainSupermarkets[1]} </li> : mainSupermarkets.length === 1 ? <li>Iincludes {mainSupermarkets[0]}</li> : ''}
                                    </ul>
                                  </>
                                </div>
                                <hr className='results-divider' />
                              </>
                              : ''}
                            {tubes1 && listingFields.tubes === 1 ?
                              <>
                                <div className='results-block'>
                                  <div className='result-block-header'>
                                    <div className='lifestyle-icon' id='tubes'></div>
                                    <h3>🚇 Tubes</h3>
                                  </div>
                                  <>
                                    <ul className='results-details'>
                                      <li>{tubes1.length} stations within 20 mins walk</li>
                                      {
                                        tubes1.slice(0, 3).map((train, index) => (
                                          <li key={index}>{train.station_name} - {train.line} - {train.walkTimeMin} mins walk</li>
                                        ))
                                      } </ul>
                                  </>
                                </div>
                                <hr className='results-divider' />
                              </>
                              : ''}
                            {trains1 && listingFields.trains === 1 ?
                              <>
                                <div className='results-block'>
                                  <div className='result-block-header'>
                                    <div className='lifestyle-icon' id='trains'></div>
                                    <h3>🚈 Trains</h3>
                                  </div>
                                  <>
                                    <ul className='results-details'>
                                      <li>{trains1.length} stations within 20 mins walk</li>
                                      {
                                        trains1.slice(0, 3).map((train, index) => (
                                          <li key={index}>{train.station} - {train.walkTimeMin} mins walk</li>
                                        ))
                                      }
                                    </ul>
                                  </>
                                </div>
                                <hr className='results-divider' />
                              </>
                              : ''}
                            {postcodeData && listingFields.parks === 1 ?
                              <>
                                <div className='results-block'>
                                  <div className='result-block-header'>
                                    <div className='lifestyle-icon' id='parks'></div>
                                    <h3>🌳 Parks</h3>
                                  </div>
                                  <>
                                    <ul className='results-details'>
                                      <li>within top {100 - postcodeData[0].parks_lsoa[0].london_percentile}% of areas in london for access to greenspace</li>
                                      <li>{postcodeData[0].parks_postcode.park_name0} - {Math.ceil((((postcodeData[0].parks_postcode.distance0) / 1000) / 5) * 60)} mins walk</li>
                                      <li>{postcodeData[0].parks_postcode.park_name1} - {Math.ceil((((postcodeData[0].parks_postcode.distance1) / 1000) / 5) * 60)} mins walk</li>
                                      <li>{postcodeData[0].parks_postcode.park_name2} - {Math.ceil((((postcodeData[0].parks_postcode.distance2) / 1000) / 5) * 60)} mins walk</li>
                                    </ul>
                                  </>
                                </div>
                                <hr className='results-divider' />
                              </>
                              : ''}
                            {ev1 && listingFields.evs === 1 ?
                              <>
                                <div className='results-block'>
                                  <div className='result-block-header'>
                                    <div className='lifestyle-icon' id='evs'></div>
                                    <h3>⛽️ Electric vehicle charging</h3>
                                  </div>
                                  <>
                                    <ul className='results-details'>
                                      <li>{postcodeData[0].ev.ev_10_mins} charging points within 10 mins walk</li>
                                      <li>in the top {Math.round((1 - postcodeData[0].ev.percentile) * 100)}% of areas in London for ev charging access</li>
                                    </ul>
                                  </>
                                </div>
                                <hr className='results-divider' />
                              </>
                              : ''}
                          </div>
                        </section>
                      </div>
                    </>

                    : listingSelection === 'AI listing generator' && userData &&
                      ((userData.usage_stats[0].package === 'Basic' && userData.usage_stats[0].listing_monthly_count < 11) ||
                        (userData.usage_stats[0].package === 'Unlimited') ||
                        (userData.usage_stats[0].package === 'Advanced Pilot' && userData.usage_stats[0].listing_monthly_count < 101)) ?

                      <>
                        <AIListingGenrator />
                      </>


                      : listingSelection === 'Saved searches' && userData && userData.listing_favourites.length > 0 ?

                        <SavedListings
                          userData={userData}
                          loadUserData={loadUserData}
                          setListingSelection={setListingSelection}
                        />


                        : listingSelection === 'Top properties' && userData ?

                          <TopProperties
                            userData={userData}
                            loadUserData={loadUserData}
                            setListingSelection={setListingSelection}
                            fetchData={fetchData}
                          />
                          : ''}


              </section>
            </section>
          </section>
        }


      </section>



    </>
  )
}

export default ListingGenerator



