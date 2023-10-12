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
  
  // lisrting options
  const [listingSelection, setListingSelection] = useState('Property insights')
  
  const [postcodeSubstring, setPostcodeSubstring] = useState('')


  // listing generator form
  const [listingFields, setListingFields] = useState({
    postcode: '',
    description: '',
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


  // // ? Section 2: Load user information
  // const loadUserData = () => {
  //   // Assuming the user is authorized, we want to load their profile information and set states based on relevant sections of this
  //   if (isUserAuth()) {
  //     const getUser = async () => {
  //       try {
  //         const { data } = await axios.get(`/api/auth/profile/${getUserToken()}/`, {
  //           headers: {
  //             Authorization: `Bearer ${getAccessToken()}`,
  //           },
  //         })
  //         console.log('user data ->', data)
  //         setUserData(data)
  //       } catch (error) {
  //         setErrors(true)
  //         console.log(error)
  //       }
  //     }
  //     getUser()
  //   } else {
  //     navigate('/access-denied')
  //     console.log('no account')
  //   }
  // }


  // // carry out calculation to load user data
  // useEffect(() => {
  //   loadUserData()
  // }, [])


  // ? Section 2: Load postcode and user data
  const loadPostcodeData = () => {
    // Assuming th user is authorised, we want to load their profile information and set states based on relevant sections of this
    try {
      const getPostcode = async () => {
        const { data } = await axios.get(`/api/postcodes/${postcodeSubstring}`)
        console.log('postcode data ->', data)
        setPostcodes(data)
      }
      getPostcode()
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
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
      if (specificSupermarkets.includes(supermarket.supermarket_brand.toLowerCase()) && !uniqueSupermarkets.has(supermarket.supermarket_store_name)) {
        topThreeSupermarkets.push(supermarket.supermarket_store_name)
        uniqueSupermarkets.add(supermarket.supermarket_store_name)
        
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



  // ? Section 11: Load and sort tubes data
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



  // calculation to determine the inputs on the form and the toggle
  const toggleStatus = (key) => {
    setListingFields(prevData => ({
      ...prevData,
      [key]: prevData[key] === 1 ? 0 : 1,
    }))
  }


  // Copy function
  const handleCopyText = () => {
    const text = textDivRef.current.innerText

    // Copy text to clipboard
    const textarea = document.createElement('textarea')
    textarea.value = text
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
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
          setProfileContent={setProfileContent} 
          userData={userData}
        />    

        <section className='listing-generator'> 
          {/* <h1>Wittle listing generator</h1> */}
          {/* <h1>Insert your property details to build a listing or explore insights</h1> */}

          <div className='listing-options'>
            <h5 className='no-print' onClick={() => setListingSelection('Property insights')} style={{ textDecoration: listingSelection === 'Property insights' ? 'underline 3px #FFA7E5' : 'none', textUnderlineOffset: listingSelection === 'Property insights' ? '0.5em' : 'initial', fontWeight: listingSelection === 'Property insights' ? '700' : '400' }}>Property insights</h5>
            <h5 className='no-print' onClick={() => setListingSelection('Listing generator')} style={{ textDecoration: listingSelection === 'Listing generator' ? 'underline 3px #FFA7E5' : 'none', textUnderlineOffset: listingSelection === 'Listing generator' ? '0.5em' : 'initial', fontWeight: listingSelection === 'Listing generator' ? '700' : '400'  }}>Listing generator</h5>
          
          </div>
          <div className='listing-wrapper'>

            <div className='insight-inputs'>
              {listingSelection === 'Property insights' ? 
                <>
                  <h3>Insert full postcode to extract details about property</h3>
                  <div className='input-block'>
                    <h3>📍 Postcode</h3>
                    <input
                      type="text"
                      value={postcodeSubstring}
                      onChange={e => setPostcodeSubstring(e.target.value.toUpperCase().replace(/\s+/g, ''))}
                      placeholder="Enter postcode..."></input>
                  </div>
                  <button onClick={() => navigate(`/agents/property/${postcodeSubstring}`)}>See insights</button>
                </>
                : listingSelection === 'Listing generator' ?
                  <>
                    <h3>Input details and select features you want to include your listing</h3>
                    <div className='input-block'>
                      <h3>📍 Postcode</h3>
                      <input
                        type="text"
                        value={postcodeSubstring}
                        onChange={e => setPostcodeSubstring(e.target.value.toUpperCase().replace(/\s+/g, ''))}
                        placeholder="Enter postcode..."></input>
                    </div>
                    <div className='input-block'>
                      <h3>✍🏼 Description</h3>
                      <textarea id="description" value={listingFields.description} rows="5" placeholder='Enter your description here...' onChange={e => setListingFields(prevState => ({ ...prevState, description: e.target.value }))}></textarea>
                    </div>
                    <h3 className='lifestyle-indicator'>Lifestyle elements to include</h3>
                    <div className='input-block'>
                      <h3>👶 Primary schools</h3>
                      <ReactSwitch
                        checked={listingFields.primary_schools === 1}
                        onChange={() => toggleStatus('primary_schools')}
                        onColor='#FFA7E5'
                        offColor='#051885'  
                      />
                    </div>
                    <div className='input-block'>
                      <h3>🎓 Secondary schools</h3>
                      <ReactSwitch
                        checked={listingFields.secondary_schools === 1}
                        onChange={() => toggleStatus('secondary_schools')}
                        onColor='#FFA7E5'
                        offColor='#051885'  
                      />
                    </div>
                    <div className='input-block'>
                      <h3>🚇 Tubes</h3>
                      <ReactSwitch
                        checked={listingFields.tubes === 1}
                        onChange={() => toggleStatus('tubes')}
                        onColor='#FFA7E5'
                        offColor='#051885'  
                      />
                    </div>
                    <div className='input-block'>
                      <h3>🚈 Trains</h3>
                      <ReactSwitch
                        checked={listingFields.trains === 1}
                        onChange={() => toggleStatus('trains')}
                        onColor='#FFA7E5'
                        offColor='#051885'  
                      />
                    </div>
                    <div className='input-block'>
                      <h3>⛽️ Electric vehicles</h3>
                      <ReactSwitch
                        checked={listingFields.evs === 1}
                        onChange={() => toggleStatus('evs')}
                        onColor='#FFA7E5'
                        offColor='#051885'  
                      />
                    </div>
                    <div className='input-block'>
                      <h3>🍽 Restaurants</h3>
                      <ReactSwitch
                        checked={listingFields.restaurants === 1}
                        onChange={() => toggleStatus('restaurants')}
                        onColor='#FFA7E5'
                        offColor='#051885'  
                      />
                    </div>
                    <div className='input-block'>
                      <h3>🍺 Pubs</h3>
                      <ReactSwitch
                        checked={listingFields.pubs === 1}
                        onChange={() => toggleStatus('pubs')}
                        onColor='#FFA7E5'
                        offColor='#051885'  
                      />
                    </div>
                    <div className='input-block'>
                      <h3>🌳 Parks</h3>
                      <ReactSwitch
                        checked={listingFields.parks === 1}
                        onChange={() => toggleStatus('parks')}
                        onColor='#FFA7E5'
                        offColor='#051885'  
                      />
                    </div>
                    <div className='input-block'>
                      <h3>🏋️‍♂️ Gyms</h3>
                      <ReactSwitch
                        checked={listingFields.gyms === 1}
                        onChange={() => toggleStatus('gyms')}
                        onColor='#FFA7E5'
                        offColor='#051885'  
                      />
                    </div>
                    <div className='input-block'>
                      <h3>🛒 Supermarkets</h3>
                      <ReactSwitch
                        checked={listingFields.supermarkets === 1}
                        onChange={() => toggleStatus('supermarkets')}
                        onColor='#FFA7E5'
                        offColor='#051885'  
                      />
                    </div>
                    <div className='input-block'>
                      <h3>🚔 Crime</h3>
                      <ReactSwitch
                        checked={listingFields.crime === 1}
                        onChange={() => toggleStatus('crime')}
                        onColor='#FFA7E5'
                        offColor='#051885'  
                      />
                    </div>

                    <button onClick={loadPostcodeData}>Load description</button>


                    {/* <div className='input-block'>
                    <h3>🛌 Bedrooms</h3>
                    <select className='listing-dropdown'>
                      <option value={0}>Studio</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                    </select>
                  </div>
                  <div className='input-block'>
                    <h3>🛁 Bathrooms</h3>
                    <select className='listing-dropdown'>
                      <option>0</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                    </select>
                  </div>
                  <div className='input-block'>
                    <h3>🏡 Property type</h3>
                    <select className='listing-dropdown'>
                      <option>Flat</option>
                      <option>Bungalow</option>
                      <option>Terraced house</option>
                      <option>Semi-detached house</option>
                      <option>Detached house</option>
                    </select>
                  </div>
                  <div className='input-block'>
                    <h3>🌍 Size</h3>
                    <input
                      type="text"
                      value={postcodeSubstring}
                      onChange={e => setPostcodeSubstring(e.target.value.toUpperCase().replace(/\s+/g, ''))}>
                    </input>
                  </div>
                  <div className='input-block-column'>
                    <h3>🤝 Other features</h3>
                  </div> */}
                    {/* <button onClick={() => navigate(`/agents/property/${postcodeSubstring}`)}>See insights</button> */}
                  </>

                  : '' }

            </div>
            <div className='insight-inputs'>
              {postcodeData ? 
                <div className='results-header'>
                  <h3 className='results-title'>Your listing</h3>
                  <h3 onClick={handleCopyText} className='copy-button'>📑</h3>
                </div>
                : '' }

              <div className='input-block' ref={textDivRef}>
                <div className='results-box' name="description">
                  {/* Description title */}
                  {postcodeData && listingFields.description !== '' ? 
                    <>
                      <div className='lifestyle-block'>
                        <h1>About this property</h1>
                        <p>{listingFields.description}</p>
                      </div>
                    </>

                    : '' }



                  {/* Lifestyle */}
                  {postcodeData ? 
                    <h1>What you should know about this area</h1>
                    : '' }
                  {/* Restaurants */}
                  {restaurants1 && listingFields.restaurants === 1 ? 
                    <>
                      <div className='lifestyle-block'>
                        <h4>Restaurants</h4>
                        <h5>🍽 {restaurants1.length} restaurants within 15 mins walk</h5>
                        <h5>🍽 more than {cuisines} cuisines available</h5>
                        <h5>🍽 {topRestaurants[0]}, {topRestaurants[1]} & {topRestaurants[2]} are well rated</h5>
                      </div>
                    </>
                    : '' }
                  {/* Pubs */}
                  {pubs1 && listingFields.pubs === 1 ? 
                    <>
                      <div className='lifestyle-block'>

                        <h4>Pubs</h4>
                        <h5>🍺 {pubs1.length} pubs within 15 mins walk</h5>
                        <h5>🍺 {topPubs[0]}, {topPubs[1]} & {topPubs[2]} are well rated</h5>
                      </div>
                    </>
                    : '' }
                  {/* Gyms */}
                  {gyms1 && listingFields.gyms === 1 ? 
                    <>
                      <div className='lifestyle-block'>

                        <h4>Gyms</h4>
                        <h5>🏋️‍♂️ {gyms1.length} gyms within 15 mins walk</h5>
                        {mainGyms.length === 3 ? <h5>🏋️‍♂️ includes {mainGyms[0]}, {mainGyms[1]} & {mainGyms[2]}</h5> : mainGyms.length === 2 ? <h5>🏋️‍♂️ includes {mainGyms[0]} & {mainGyms[1]} </h5> : mainGyms.length === 1 ? <h5>🏋️‍♂️ includes {mainGyms[0]}</h5> : '' }
                      </div>
                    </>
                    : '' }
                  {/* Supermarkets */}
                  {supermarkets1 && listingFields.supermarkets === 1 ? 
                    <>
                      <div className='lifestyle-block'>

                        <h4>Supermarkets</h4>
                        <h5>🛒 {supermarkets1.length} supermarkets within 15 mins walk</h5>
                        {mainSupermarkets.length === 3 ? <h5>🛒 includes {mainSupermarkets[0]}, {mainSupermarkets[1]} & {mainSupermarkets[2]}</h5> : mainSupermarkets.length === 2 ? <h5>🛒 includes {mainSupermarkets[0]} & {mainSupermarkets[1]} </h5> : mainSupermarkets.length === 1 ? <h5>🛒 includes {mainSupermarkets[0]}</h5> : '' }
                      </div>
                    </>
                    : '' }
                  {/* Tubes */}
                  {tubes1 && listingFields.tubes === 1 ? 
                    <>
                      <div className='lifestyle-block'>
                        <h4>Tube stations</h4>
                        <h5>🚇 {tubes1.length} stations within 20 mins walk</h5>
                        {
                          tubes1.slice(0, 5).map((train, index) => (
                            <h5 key={index}>🚇 {train.station_name} - {train.line} - {train.walkTimeMin} mins walk</h5>
                          ))
                        }
                      </div>
                    </>
                    : '' }
                  {/* Trains */}
                  {trains1 && listingFields.trains === 1 ? 
                    <>
                      <div className='lifestyle-block'>
                        <h4>Train stations</h4>
                        <h5>🚈 {trains1.length} stations within 20 mins walk</h5>
                        {
                          trains1.slice(0, 5).map((train, index) => (
                            <h5 key={index}>🚈 {train.station} - {train.walkTimeMin} mins walk</h5>
                          ))
                        }
                      </div>
                    </>
                    : '' }
                  {/* Parks */}
                  {postcodeData && listingFields.parks === 1 ? 
                    <>
                      <div className='lifestyle-block'>
                        <h4>Green space</h4>
                        <h5>🌳 within top {100 - postcodeData[0].parks_lsoa[0].london_percentile}% of areas in london for access to greenspace</h5>
                        <h5>🌳 {postcodeData[0].parks_postcode.park_name0} - {Math.ceil((((postcodeData[0].parks_postcode.distance0) / 1000) / 5) * 60)} mins walk</h5>
                        <h5>🌳 {postcodeData[0].parks_postcode.park_name1} - {Math.ceil((((postcodeData[0].parks_postcode.distance1) / 1000) / 5) * 60)} mins walk</h5>
                        <h5>🌳 {postcodeData[0].parks_postcode.park_name2} - {Math.ceil((((postcodeData[0].parks_postcode.distance2) / 1000) / 5) * 60)} mins walk</h5>
                      </div>
                    </>
                    : '' }
                  {/* EVs */}
                  {postcodeData && listingFields.evs === 1 ? 
                    <>
                      <div className='lifestyle-block'>
                        <h4>Electric vehicles</h4>
                        <h5>🚇 {postcodeData[0].ev.ev_10_mins} charging points within 10 mins walk</h5>
                        <h5>🚇 in the top {Math.round((1 - postcodeData[0].ev.percentile) * 100)}% of areas in London for ev charging access</h5>
                      </div>
                    </>
                    : '' }
                  {/* Primary schools */}
                  {primaryData1 && listingFields.primary_schools === 1 ? 
                    <>
                      <div className='lifestyle-block'>
                        <h4>Primary schools</h4>
                        {
                          primaryData1.slice(0, 5).map((school, index) => (
                            <h5 key={index}>👶 {school.school_name} - {school.ofsted_results} ofsted - {school.walkTimeMin} mins walk</h5>
                          ))
                        }
                        {/* <h5>👶 {primaryData[0].school_name} - {primaryData[0].ofsted_results} ofsted - {primaryData1[0].walkTimeMin} mins walk</h5>
                        <h5>👶 {primaryData[1].school_name} - {primaryData[0].ofsted_results} ofsted - {primaryData1[0].walkTimeMin} mins walk</h5>
                        <h5>👶 {primaryData[2].school_name} - {primaryData[0].ofsted_results} ofsted - {primaryData1[0].walkTimeMin} mins walk</h5>
                        <h5>👶 {primaryData[3].school_name} - {primaryData[0].ofsted_results} ofsted - {primaryData1[0].walkTimeMin} mins walk</h5>
                        <h5>👶 {primaryData[5].school_name} - {primaryData[0].ofsted_results} ofsted - {primaryData1[0].walkTimeMin} mins walk</h5> */}
                      </div>
                    </>
                    : '' }


                </div>
              </div>

            </div>
          </div>


          
        </section>


      </section> 



    </>
  )
}

export default ListingGenerator