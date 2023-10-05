import React, { useState, useEffect, useInsertionEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import NavBar from '../../tools/NavBar'
import { isUserAuth, getUserToken , getAccessToken } from '../../auth/Auth'
import { NumericFormat } from 'react-number-format'
import Footer from '../../tools/Footer'
import LifestyleHighlights from './componentHighlights/LifestyleHighlights'
import SchoolHighlights from './componentHighlights/SchoolHighlights'
import TransportHighlights from './componentHighlights/TransportHighlights'
import NeighbourhoodHighlights from './componentHighlights/NeighbourhoodHighlights'
import PropertySummary from './componentHighlights/PropertySummary'
import PropertyDetailSlider from './helpers/PropertyDetailSlider'
import PrimaryDetails from './componentDetails/PrimaryDetails'
import SecondaryDetails from './componentDetails/SecondaryDetails'
import WhiteSidebar from '../WhiteSidebar'
import WhiteNavbar from '../../tools/WhiteNavbar'
import RestaurantDetails from './componentDetails/RestaurantDetails'
import FitnessDetails from './componentDetails/FitnessDetails'
import SupermarketDetails from './componentDetails/SupermarketDetails'
import VariablesPage from '../variableSummaries/VariablesPage'
import WhiteComparison from '../comparisonSection/WhiteComparison'
import NavBarRevised from '../../tools/NavBarRevised'
import EVDetails from './componentDetails/EVDetails'
import PubDetails from './componentDetails/PubDetails'

const SinglePropertySummary = () => {

  // ? Section 1: Define states
  // state for switching page
  const { postcode } = useParams()

  // state to enable navigation between pages
  const navigate = useNavigate()
  
  // state for handling moving back between pages
  const location = useLocation()
  const [historyStack, setHistoryStack] = useState([])

  // state for determining what content shows
  const [profileContent, setProfileContent] = useState('My properties')
  const [profileDetail, setProfileDetail] = useState('My properties')  

  // states for pop outs on the side
  const [variableSide, setVariableSide] = useState(false)

  // set state for user data
  const [postcodeData, setPostcodes] = useState()

  // set state for user data
  const [userData, setUserData] = useState()

  // set state for property info
  const [propertyData, setPropertyData] = useState()

  // set state for company data
  const [company, setCompany] = useState()

  // set state for errors
  const [errors, setErrors] = useState()

  // state for what information is shown
  const [propertyContent, setPropertyContent] = useState('Property overview')

  // states for opening and closing the sections
  const [summarySection, setSummarySection] = useState(false)
  const [schoolSection, setSchoolSection] = useState(false)
  const [lifestyleSection, setLifestyleSection] = useState(false)
  const [transportSection, setTransportSection] = useState(false)
  const [neighbourhoodSection, setNeighbourhoodSection] = useState(false)

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
  const [topRestaurants, setTopRestaurants]  = useState([])
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

  // neghbourhood score
  const [neighbourhoodScore, setNeighbourhoodScore] = useState()

  // slider selection
  const [sliderSelection, setSliderSelection] = useState('Primary schools')

  // set state for lisrt of properties
  const [propertyList, setPropertyList] = useState()



  // ? Section 2: Load postcode and user data
  const loadPostcodeData = () => {
    // Assuming th user is authorised, we want to load their profile information and set states based on relevant sections of this
    try {
      const getPostcode = async () => {
        const { data } = await axios.get(`/api/postcodes/${postcode}`)
        console.log('postcode data ->', data)
        setPostcodes(data)
      }
      getPostcode()
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  useEffect(() =>{
    loadPostcodeData()
  }, [])

  // user data
  const loadUserData = () => {
    // Assuming th user is authorised, we want to load their profile information and set states based on relevant sections of this
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
          setCompany(data.company)
        }
        getUser()
      } catch (error) {
        setErrors(true)
        console.log(error)
      }
    } else {
      navigate('/access-denied')
      console.log('no account')
    }
  }

  // carry out calculation to load user data
  useEffect(() => {
    if (postcodeData) {
      loadUserData()
    }
  }, [postcodeData])


  // ? Section 3: Get properties
  const loadProperties = () => {
    // Assuming th user is authorised, we want to load their profile information and set states based on relevant sections of this
    try {
      const getProperties = async () => {
        const { data } = await axios.get(`/api/white_properties/${company}`, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        const matchedProperty = data.find(item => item.postcode === postcode)
        setPropertyData(matchedProperty)
        console.log('current-property ->', matchedProperty)
      }
      getProperties()
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  // carry out calculation to load user data
  useEffect(() => {
    if (company) {
      loadProperties()
    }
  }, [company])


  // // extract property information
  // const currentProperty = () => {
  //   const matchedProperty = userData.white_properties.find(item => item.postcode === postcode)
  //   setPropertyData(matchedProperty)
  //   console.log('current-property ->', matchedProperty)
  // }

  // // load property data
  // useEffect(() => {
  //   if (postcodeData && userData) {
  //     currentProperty()
  //   }
  // }, [postcodeData, userData])




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

  useEffect(() =>{
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
      if (item.school_type ===  'Independent school') {
        item.within_catchment =  'N/a'

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

  useEffect(() =>{
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
      }  else if (item.school_type.includes('special')) {
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

    console.log('nearby secondaries ->', nearbySecondaries)
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

  useEffect(() =>{
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
    console.log('Nearby restaurants ->', nearbyRestaurants)
    // console.log('Top restaurants ->', topThreeRestaurants)
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
        console.log('gyms data ->', data)
        setGyms(data)
      }
      getData()
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  useEffect(() =>{
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

  useEffect(() =>{
    if (postcodeData) {
      loadSupermarketData()
    }
  }, [postcodeData])

  // calculatgion for adding distances to the data based on the input coordinates
  // Average walking speed is 5km/h. Therefore, in 15 minutes, a person can walk approximately 1.25 km
  
  // function for restaurants with least walking distance
  const getNearbySupermatkets = () => {

    const specificSupermarkets = ['m&s food', 'waitrose', 'aldi', 'lidl', 'sainsbury\'s', 'tesco', 'asda']
    const uniqueSupermarkets = new Set() // Used to store unique gym names


    
    // filter out restaurants firther than 15 mins walk away
    const allSupermarkets = supermarkets.map(item => {
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
  
      return { ...item, distance: distanceKm }
    })

    const nearbySupermarkets = allSupermarkets
      .filter(item => item.distance <= walkDistanceKm15)
    
    // extract the key studios
    const topThreeSupermarkets = []
  
    for (let i = 0; i < nearbySupermarkets.length; i++) {
      const supermarket = nearbySupermarkets[i]
      if (specificSupermarkets.includes(supermarket.cleansed_name.toLowerCase()) && !uniqueSupermarkets.has(supermarket.cleansed_name)) {
        topThreeSupermarkets.push(supermarket.cleansed_name)
        uniqueSupermarkets.add(supermarket.cleansed_name)
        
        if (topThreeSupermarkets.length === 3) {
          break
        }
      }
    }

    setSupermarkets1(nearbySupermarkets)
    setMainSupermarkets(topThreeSupermarkets)
    console.log('Nearby supermarkets ->', nearbySupermarkets)
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

  useEffect(() =>{
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
        console.log('ev data ->', data)
        setEv(data)
      }
      getData()
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  useEffect(() =>{
    if (postcodeData) {
      loadEVdata()
    }
  }, [postcodeData])


  
  // function for restaurants with least walking distance
  const getNearbyChargers = () => {

    // Average walking speed is 5km/h. 
    const walkDistanceKm10 = 5 * (10 / 60)
    
    // filter out restaurants firther than 15 mins walk away
    const nearbyChargers = ev.filter(item => {
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
    // console.log('Nearby gyms ->', nearbyStudios)
    // console.log('Main gyms ->', topThreeStudios)
  }
  
  // load data for nearest restaurants
  useEffect(() => {
    if (ev) {
      getNearbyChargers()
    }
  }, [ev])


  // ? Section 10: Load in pubs data
  const loadPubsData = () => {
    // Assuming th user is authorised, we want to load their profile information and set states based on relevant sections of this
    try {
      const getData = async () => {
        const { data } = await axios.get('/api/pubs/')
        console.log('pub data ->', data)
        setPubs(data)
      }
      getData()
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  useEffect(() =>{
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
    console.log('Nearby pubs ->', nearbyPubs)
    // console.log('Top restaurants ->', topThreeRestaurants)
  }
  
  // load data for nearest restaurants
  useEffect(() => {
    if (pubs) {
      getNearbyPubs()
    }
  }, [pubs])



  // ? Section 11: Calculate a neighbourhood score
  // neighbourhood score calculation
  const calculateScore = () => {
    const calculation = Math.ceil((((1 - postcodeData[0].crime[0].percentile) +
                                postcodeData[0].ev.percentile +
                                postcodeData[0].fitness.percentile +
                                (1 - (postcodeData[0].parks_lsoa[0].london_percentile / 100)) +
                                postcodeData[0].restaurants.normal_percentile +
                                postcodeData[0].supermarkets.percentile +
                                postcodeData[0].tubes.percentile) / 7) * 100)
    setNeighbourhoodScore(calculation)
    // console.log('neighbourhood score ->', calculation)
  }

  // run calculation
  useEffect(() => {
    if (postcodeData) {
      calculateScore()
    }
  })

  // // This function computes the raw score for a given neighborhood
  // const computeRawScore = (neighborhood) => {
  //   return (((1 - neighborhood.crime[0].percentile) +
  //           neighborhood.ev.percentile +
  //           neighborhood.fitness.percentile +
  //           (1 - (neighborhood.parks_lsoa[0].london_percentile / 100)) +
  //           neighborhood.restaurants.normal_percentile +
  //           neighborhood.supermarkets.percentile +
  //           neighborhood.tubes.percentile) / 7) * 100
  // }

  // // This function returns the normalized score for a given raw score
  // const normalizeScore = (rawScore, min, max) => {
  //   return (rawScore - min) / (max - min) * 100
  // }

  // useEffect(() => {
  //   if (postcodeData && postcodeData[0]) {
  //     const rawScore = ((((1 - postcodeData[0].crime[0].percentile) +
  //                           postcodeData[0].ev.percentile +
  //                           postcodeData[0].fitness.percentile +
  //                           (1 - (postcodeData[0].parks_lsoa[0].london_percentile / 100)) +
  //                           postcodeData[0].restaurants.normal_percentile +
  //                           postcodeData[0].supermarkets.percentile +
  //                           postcodeData[0].tubes.percentile) / 7) * 100)
  
  //     console.log('raw->', rawScore)
  
  //     // Assuming you have a dataset to extract actual min and max from.
  //     // const allScores = postcodeData.map(data => computeRawScore(data))
  //     // const actualMinScore = Math.min(...allScores)
  //     // const actualMaxScore = Math.max(...allScores)

  //     // console.log('all->', allScores)
  
  //     const normalizedScore = Math.ceil(normalizeScore(rawScore, 5.04371029960676, 59.7024933139881))
  //     setNeighbourhoodScore(normalizedScore)

  //   }
  // }, [postcodeData])
  


  // ? Section 12: Load and sort tubes data
  const loadTrainsData = () => {
  // Assuming th user is authorised, we want to load their profile information and set states based on relevant sections of this
    try {
      const getData = async () => {
        const { data } = await axios.get('/api/trains/')
        console.log('trains data ->', data)
        setTrains(data)
      }
      getData()
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  useEffect(() =>{
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
    console.log('Nearby trains ->', nearbyTrains)
  }

  // load data for nearest restaurants
  useEffect(() => {
    if (trains) {
      getNearbyTrains()
    }
  }, [trains])


  // ?Section 13: Other helpful functions
  // handle moving to the oprevious page
  // When location changes, add the new location to the history stack
  useEffect(() => {
    setHistoryStack((prevStack) => [...prevStack, location.pathname])
  }, [location])


  // To navigate back:
  const goBack = () => {
    // Remove the current location from the stack
    const newStack = [...historyStack]
    newStack.pop()
    setHistoryStack(newStack)

    // Get the last location from the new stack
    const lastLocation = newStack[newStack.length - 1]

    // Navigate to the last location, or to a default location if the stack is empty
    navigate(lastLocation || '/')
  }

  useEffect(() => {
    console.log(`profileContent updated to: ${profileContent}`)
  }, [profileContent])

  return (

    <>
      <section className='agent-specific-property print-container' >
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
        />
        <div className='go-back-button no-print remove-margin'>
          <h5 onClick={() =>  navigate('/agents/profile')}>&lt;- back to profile</h5>
        </div>
        <div className='property-options no-print'>
          <div className='left-section'>
            <h5 className='no-print' onClick={() => setPropertyContent('Property overview')} style={{ textDecoration: propertyContent === 'Property overview' ? 'underline 2px #FFA7E5' : 'none', textUnderlineOffset: propertyContent === 'Property overview' ? '0.5em' : 'initial', fontWeight: propertyContent === 'Property overview' ? '700' : '400' }}>Property overview</h5>
            <h5 className='no-print' onClick={() => setPropertyContent('Property details')} style={{ textDecoration: propertyContent === 'Property details' ? 'underline 2px #FFA7E5' : 'none', textUnderlineOffset: propertyContent === 'Property details' ? '0.5em' : 'initial', fontWeight: propertyContent === 'Property details' ? '700' : '400'  }}>Property details</h5>
          </div>
          <h1 className='print-button no-print' onClick={() => window.print()}>🖨</h1>
        </div>

        {propertyContent === 'Property overview' ?
          <section className='property-wrapper'>

            {propertyData ?
              <section className='property-details remove-margin'>
                <img className='property-image' src={propertyData.image} alt='property-image' />

                <div className='property-content'>
                  <div className='content-blocks'>
                    <div className='content-summary'>
                      <div className='content-top-line'>
                        <h1>{propertyData.name}</h1>
                        <h1><NumericFormat value={propertyData.price} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h1>
                      </div>
                      <h3>{propertyData.address}</h3>
                    </div>
                    <div className='content-details'>
                      <div className='content-details-top'>
                        <h4>🏠 {propertyData.type}</h4>
                        <h4>📦 {propertyData.size}</h4>
                      </div>
                      <div className='content-details-bottom'>
                        <h4>🛌 x {propertyData.bedrooms}</h4>
                        <h4>🛁 x {propertyData.bathrooms}</h4>
                        <h4>🛋 x {propertyData.living_rooms}</h4>
                      </div>
                    </div>


                  </div>


                </div>
              </section>
              : '' }

            <section className='property-summary-sections remove-margin'>
              <div className='property-highlight' onClick={() => setSummarySection(!summarySection)}>
                <h3>Property Summary</h3>
                <div className='click-downs'>
                  {summarySection ? <h4>^</h4> : <h4>v</h4> }
                </div>
              </div>
              { postcodeData && summarySection ?
                <PropertySummary 
                  neighbourhoodScore={neighbourhoodScore}
                  postcodeData={postcodeData}
                />
                : '' }
              <hr className='highlight-separator'/>
              <div className='property-highlight' onClick={() => setSchoolSection(!schoolSection)}>
                <h3>School Highlights</h3>
                <div className='click-downs'>
                  {schoolSection ? <h4>^</h4> : <h4>v</h4> }
                </div>
              </div>

              {schoolSection ? 
                <SchoolHighlights 
                  topPrimaries={topPrimaries}
                  topSecondaries={topSecondaries}
                />
                : '' }
              <hr className='highlight-separator'/>
              <div className='property-highlight' onClick={() => setLifestyleSection(!lifestyleSection)}>
                <h3>Lifestyle Highlights</h3>
                <div className='click-downs'>
                  {lifestyleSection ? <h4>^</h4> : <h4>v</h4> }
                </div>
              </div>
              {lifestyleSection ? 
                <LifestyleHighlights
                  restaurants1={restaurants1}
                  cuisines={cuisines}
                  topRestaurants={topRestaurants}
                  gyms1={gyms1}
                  mainGyms={mainGyms}
                  supermarkets1={supermarkets1}
                  mainSupermarkets={mainSupermarkets}
                  pubs1={pubs1}
                  topPubs={topPubs}
                />
                : '' }
              <hr className='highlight-separator'/>
              <div className='property-highlight' onClick={() => setTransportSection(!transportSection)}>
                <h3>Transport Highlights</h3>
                <div className='click-downs'>
                  {transportSection ? <h4>^</h4> : <h4>v</h4> }
                </div>
              </div>
              {transportSection ? 
                <TransportHighlights 
                  postcodeData={postcodeData}
                  tubes1={tubes1}
                  trains1={trains1}
                />
                : '' }

              <hr className='highlight-separator'/>
              <div className='property-highlight' onClick={() => setNeighbourhoodSection(!neighbourhoodSection)}>
                <h3>Neighbourhood Highlights</h3>
                <div className='click-downs'>
                  {neighbourhoodSection ? <h4>^</h4> : <h4>v</h4> }
                </div>
              </div>
              {neighbourhoodSection ? 
                <NeighbourhoodHighlights 
                  postcodeData={postcodeData}
                />
                : '' }

            </section>

          </section>

          : propertyContent === 'Property details' ?
            <section className='property-wrapper'>
              <PropertyDetailSlider 
                sliderSelection={sliderSelection}
                setSliderSelection={setSliderSelection}
              />

              {sliderSelection === 'Primary schools' ? 
                <PrimaryDetails
                  primaryData1={primaryData1}
                  setPrimaryData1={setPrimaryData1}
                  propertyData={propertyData}
                  listType={'short list'}
                  postcodeData={postcodeData}
                />

                : sliderSelection === 'Secondary schools' ?
                  <SecondaryDetails
                    secondaryData1={secondaryData1}
                    setSecondaryData1={setSecondaryData1}
                    propertyData={propertyData}
                    listType={'short list'}
                    postcodeData={postcodeData}
                  />
              
                  : sliderSelection === 'Restaurants' ?
                    <RestaurantDetails
                      restaurants1={restaurants1}
                      setRestaurants1={setRestaurants1}
                      propertyData={propertyData}
                      listType={'short list'}
                      postcodeData={postcodeData}
                    />
              
                    : sliderSelection === 'Fitness' ?
                      <FitnessDetails
                        gyms1={gyms1}
                        setGyms1={setGyms1}
                        propertyData={propertyData}
                        listType={'short list'}
                        postcodeData={postcodeData}
                      />
              
                      : sliderSelection === 'Supermarkets' ?
                        <SupermarketDetails
                          supermarkets1={supermarkets1}
                          setSupermarkets1={setSupermarkets1}
                          propertyData={propertyData}
                          listType={'short list'}
                          postcodeData={postcodeData}
                        />
              
                        : sliderSelection === 'EVs' ?
                          <EVDetails
                            ev1={ev1}
                            setEv1={setEv1}
                            propertyData={propertyData}
                            listType={'short list'}
                            postcodeData={postcodeData}
                          />
              
                          : sliderSelection === 'Pubs' ?
                            <PubDetails
                              pubs1={pubs1}
                              setPubs1={setPubs1}
                              propertyData={propertyData}
                              listType={'short list'}
                              postcodeData={postcodeData}
                            />
                            : '' }
                
            </section>
            : propertyContent === 'Variables' ?
              <>
                <VariablesPage 
                  profileDetail={profileDetail}  
                  setProfileDetail={setProfileDetail}
                  profileContent={profileContent}
                />
    
  
          
              </>
              : profileContent === 'Comparison' ?

                <>
                  <WhiteComparison
                    userData={userData}
                    propertyList={propertyList}

                  />
             
                </>

                : '' 

        }


      </section>
    </>
  )


}

export default SinglePropertySummary