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
import Loading from '../../helpers/Loading'



const AIListingGenrator = () => {


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

  const [aiReady, setAiReady] = useState(false)

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


  // ai listing fields
  const [aiFields, setAiFields] = useState({
    'location': '',
    'size': '',
    'property_type': '',
    'bedrooms': '',
    'bathrooms': '',
    'en_suites': '',
    'amenities': [],
    'phrases': [],
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
    'Balcony', 'On-road parking', 'Off-road parking',
    'Private gated', 'Private garage', 'Shared garage',
    'Lift', 'Open-plan', 'Concierge', 'Gym',
    'Pool & Spa', 'Penthouse', 'Duplex', 'Garden'
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

  // start ai seearch
  const [searchGo, setSearchGo] = useState(false)

  const [phrases, setPhrases] = useState([''])




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
          // console.log('user data ->', data)
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
      setLoading(true)
      // if its an ai load, then we need to set a state to organise the loading of the dataset
      if (listingType === 'listing_ai_total') {
        setAiReady(false) // Before loading the data for AI
      }

      // we need to access the postcode data in all eventualities
      const { data } = await axios.post('/api/postcodes/', { postcode: postcodeSubstring })
      // console.log('postcode data ->', data)
      setPostcodes(data)

      increaseUsageCount(listingType) // Pass the listing type to the increaseUsageCount function

      // if the postcode data arrives and its an ai search, we want to load the rest of the data
      if (listingType === 'listing_ai_total') {
        setSearchGo(true)
      }

    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }


  // set distance
  const walkDistanceKm20 = 5 * (20 / 60) // updated for 20 mins

  const R = 6371 // Radius of the earth in km
  const toRad = (value) => value * Math.PI / 180 // Convert degrees to radians
  const kmPerMinute = 5 / 60 // average walking speed is 5 km per hour



  // ? Section 3: Load primaries data
  const loadPrimaryData = () => {
    // Assuming th user is authorised, we want to load their profile information and set states based on relevant sections of this
    try {
      const getPrimaries = async () => {
        const { data } = await axios.get('/api/primaries/')
        // console.log('primaries data ->', data)
        setPrimaryData(data)
        // function for restaurants with least walking distance
        // filter out restaurants firther than 20 mins walk away and add distanceKm and walkTimeMin to each item
        const nearbyPrimaries = data.filter(item => {
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
      }
      getPrimaries()
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }


  // load primary data
  useEffect(() => {
    if (postcodeData && listingFields.primary_schools === 1) {
      loadPrimaryData()
    }
  }, [postcodeData])



  // function for restaurants with least walking distance

  const walkDistanceKm30 = 5 * (30 / 60) // updated for 20 mins

  // ? Section 4: Load secondary school data  
  const loadSecondaryData = async () => {
    // Assuming th user is authorised, we want to load their profile information and set states based on relevant sections of this
    try {
      const getSecondaries = async () => {
        const { data } = await axios.get('/api/secondaries/')
        // console.log('secondaries data ->', data)
        setSecondaryData(data)

        const nearbySecondaries = data.filter(item => {
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

        const secondaryPercentile = 100 - Math.ceil(100 * postcodeData[0].secondaries.total_score_percentile)

        setAiFields(prevState => {
          let schoolText
          if (secondaryPercentile <= 10) {
            schoolText = `In top 10% of areas in London for secondary schools, with ${postcodeData[0].secondaries.school1_name} and ${postcodeData[0].secondaries.school2_name} nearby`
          } else if (secondaryPercentile <= 20) {
            schoolText = `In top 20% of areas in London for secondary schools, with ${postcodeData[0].secondaries.school1_name} and ${postcodeData[0].secondaries.school2_name} nearby`
          } else if (secondaryPercentile <= 30) {
            schoolText = `In top 30% of areas in London for secondary schools, with ${postcodeData[0].secondaries.school1_name} and ${postcodeData[0].secondaries.school2_name} nearby`
          } else if (secondaryPercentile <= 50) {
            schoolText = `In top 50% of areas in London for secondary schools, with ${postcodeData[0].secondaries.school1_name} and ${postcodeData[0].secondaries.school2_name} nearby`
          } else {
            schoolText = 'Not specified'
          }
          return {
            ...prevState,
            secondary_schools: schoolText,
          }
        })

      }
      await getSecondaries()
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  useEffect(() => {
    if (postcodeData && listingFields.secondary_schools === 1) {
      loadSecondaryData()
    }
  }, [postcodeData])




  // ? Section 5: Load and sort restaurant data

  // calculatgion for adding distances to the data based on the input coordinates
  // Average walking speed is 5km/h. Therefore, in 15 minutes, a person can walk approximately 1.25 km
  const walkDistanceKm15 = 5 * (15 / 60)

  const loadRestaurantData = async () => {
    // Assuming th user is authorised, we want to load their profile information and set states based on relevant sections of this
    try {
      const getData = async () => {
        const { data } = await axios.get('/api/restaurants/')
        // console.log('restaurant data ->', data)
        setRestaurants(data)

        const nearbyRestaurants = data.filter(item => {
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

        const cuisinesSize = countUniqueCuisines(nearbyRestaurants)


        // extract the top 3 restaurants
        const topThreeRestaurants = nearbyRestaurants
          .filter(restaurant => restaurant.cuisine !== 'No Cuisine Data')
          .slice(0, 3)
          .map(restaurant => restaurant.restaurant_name)

        setCuisines(cuisinesSize)
        setRestaurants1(nearbyRestaurants)
        setTopRestaurants(topThreeRestaurants)
        // console.log('cuisines ->', countUniqueCuisines(nearbyRestaurants))
        // console.log('Nearby restaurants ->', nearbyRestaurants)
        // console.log('Top restaurants ->', topThreeRestaurants)
        if (listingFields.restaurants === 1) {
          setAiFields(prevState => ({
            ...prevState,
            restaurants: `${nearbyRestaurants.length} restaurants within 15 min walk, with more than ${cuisinesSize} cuisines available`,
          }))
        }
      }
      await getData()
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  // load data for nearest restaurants
  useEffect(() => {
    if (postcodeData && listingFields.restaurants === 1) {
      loadRestaurantData()
    }
  }, [postcodeData])





  // ? Section 6: Load and sort fitness data
  const loadFitnessData = async () => {
    // Assuming th user is authorised, we want to load their profile information and set states based on relevant sections of this
    try {
      const getData = async () => {
        const { data } = await axios.get('/api/gyms/')
        console.log('gyms data ->', data)
        setGyms(data)


        const specificGyms = ['third space', 'pure gym', '1 rebel', 'virgin', 'barry\'s', 'the gym group']
        const uniqueGyms = new Set() // Used to store unique gym names



        // filter out restaurants firther than 15 mins walk away
        const nearbyStudios = data.filter(item => {
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
          if (gym.gym_group && gym.gym_group.toLowerCase() !== 'other' && !uniqueGyms.has(gym.gym_group)) {
            topThreeStudios.push(gym.gym_group)
            uniqueGyms.add(gym.gym_group)

            if (topThreeStudios.length === 3) {
              break
            }
          }
        }

        setGyms1(nearbyStudios)
        setMainGyms(topThreeStudios)
        // console.log('nearby gyms ->', nearbyStudios)
        // console.log('top 3 gyms ->', topThreeStudios)

        if (listingFields.gyms === 1) {
          setAiFields(prevState => ({
            ...prevState,
            gyms: `${nearbyStudios.length} gyms within 15 min walk, including ${topThreeStudios[0]}, ${topThreeStudios[1]} and ${topThreeStudios[2]}`,
          }))
        }
      }
      await getData()
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  useEffect(() => {
    if (postcodeData && listingFields.gyms === 1) {
      loadFitnessData()
    }
  }, [postcodeData])



  // ? Section 7: Load and sort supermarket data
  const loadSupermarketData = async () => {
    // Assuming th user is authorised, we want to load their profile information and set states based on relevant sections of this
    try {
      const getData = async () => {
        const { data } = await axios.get('/api/supermarkets/')
        // console.log('supermarkets data ->', data)
        // setSupermarkets(data)

        const specificSupermarkets = ['m&s', 'waitrose', 'aldi', 'lidl', 'sainsburys', 'tesco', 'asda']
        const uniqueSupermarkets = new Set() // Used to store unique gym names



        // filter out restaurants firther than 15 mins walk away
        const allSupermarkets = data.map(item => {
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
        // if (listingFields.supermarkets === 1) {
        setAiFields(prevState => ({
          ...prevState,
          supermarkets: `${nearbySupermarkets.length} supermarkets within 15 min walk, including ${topThreeSupermarkets[0]}, ${topThreeSupermarkets[1]} and ${topThreeSupermarkets[2]}`,
        }))
      }
      await getData()
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  useEffect(() => {
    if (postcodeData && listingFields.supermarkets === 1) {
      loadSupermarketData()
    }
  }, [postcodeData])




  // ? Section 8: Load and sort tubes data
  const loadTubesData = async () => {
    // Assuming th user is authorised, we want to load their profile information and set states based on relevant sections of this
    try {
      const getData = async () => {
        const { data } = await axios.get('/api/tubes/')


        // filter out restaurants firther than 15 mins walk away
        const nearbyTubes = data.filter(item => {
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

        // Get a list of tube stations with no duplicates.
        const uniqueStations = [...new Set(nearbyTubes.map(tube => tube.station_name))]

        // Count the number of distinct lines.
        const lineCounts = nearbyTubes.reduce((acc, tube) => {
          acc[tube.line] = (acc[tube.line] || 0) + 1
          return acc
        }, {})

        const distinctLineCount = Object.keys(lineCounts).length

        // console.log('Unique Stations:', uniqueStations)
        // console.log('Number of Distinct Lines:', distinctLineCount)

        setAiFields(prevState => ({
          ...prevState,
          tube: uniqueStations.length === 1 ? `${uniqueStations.length} within 20 min walk, across ${distinctLineCount} line, including ${uniqueStations[0]}` :
            uniqueStations.length > 1 ? `${uniqueStations.length} within 20 min walk, across ${distinctLineCount} line, including ${uniqueStations[0]} and ${uniqueStations[1]}` : '',
        }
        ))

      }
      await getData()
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }


  useEffect(() => {
    if (postcodeData && listingFields.tubes === 1) {
      loadTubesData()
    }
  }, [postcodeData])


  // Average walking speed is 5km/h. 
  const walkDistanceKm10 = 5 * (10 / 60)


  // ? Section 9: Load and sort EV data
  const loadEVdata = async () => {
    // Assuming th user is authorised, we want to load their profile information and set states based on relevant sections of this
    try {
      const getData = async () => {
        const { data } = await axios.get('/api/evs/')
        // console.log('ev data ->', data)
        setEv(data)
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

        const EVPercentile = Math.round((1 - postcodeData[0].ev.percentile) * 100)


        setAiFields(prevState => ({
          ...prevState,
          evs: `${nearbyChargers.length} within 10 min walk${EVPercentile < 30 ? `, which is in the top ${EVPercentile}% of areas in London for EV access` : ''}`,
        }))

      }

      await getData()
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  useEffect(() => {
    if (postcodeData && listingFields.evs === 1) {
      loadEVdata()
    }
  }, [postcodeData])





  // ? Section 10: Load in pubs data
  const loadPubsData = async () => {
    // Assuming th user is authorised, we want to load their profile information and set states based on relevant sections of this
    try {
      const getData = async () => {
        const { data } = await axios.get('/api/pubs/')
        // console.log('pub data ->', data)
        setPubs(data)

        const nearbyPubs = data.filter(item => {
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
        setAiFields(prevState => ({
          ...prevState,
          pubs: `${nearbyPubs.length} within 15 min walk, including ${topThreePubs[0]} and ${topThreePubs[1]}, which are well rated`,
        }
        ))
      }
      await getData()
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  useEffect(() => {
    if (postcodeData && listingFields.pubs === 1) {
      loadPubsData()
    }
  }, [postcodeData])



  // ? Section 11: Load and sort tubes data
  const loadTrainsData = async () => {
    // Assuming th user is authorised, we want to load their profile information and set states based on relevant sections of this
    try {
      const getData = async () => {
        const { data } = await axios.get('/api/trains/')
        console.log('trains data ->', data)
        setTrains(data)

        // filter out restaurants firther than 15 mins walk away
        const nearbyTrains = data.filter(item => {
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
        setAiFields(prevState => ({
          ...prevState,
          trains: nearbyTrains.length === 1  ? `${nearbyTrains.length} within 20 min walk, including ${nearbyTrains[0].station}` : 
            nearbyTrains.length > 1  ? `${nearbyTrains.length} within 20 min walk, including ${nearbyTrains[0].station} and ${nearbyTrains[1].station}` : '',
        }
        ))
      }
      await getData()
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  useEffect(() => {
    if (postcodeData && listingFields.trains === 1) {
      loadTrainsData()
    }
  }, [postcodeData])


  // ? Section 12: Sort out the parks data
  // parks data is already laodd from the postcode array, but we want to add it to the AI object
  const loadParks = () => {
    const parkPercentile = 100 - postcodeData[0].parks_lsoa[0].london_percentile

    setAiFields(prevState => ({
      ...prevState,
      parks: `${parkPercentile <= 10 ? 'In top 10% of areas in London for access to green space, with ' :
        parkPercentile <= 20 ? 'In top 20% of areas in London for access to green space, with ' :
          parkPercentile <= 30 ? 'In a very good area of London for access to green space, with ' :
            parkPercentile <= 60 ? 'In a good area of London for access to green space, with' : 'In an OK area of London for access to green space, with '} ${postcodeData[0].parks_postcode.park_name0} and ${postcodeData[0].parks_postcode.park_name1} nearby`,
    }
    ))
  }

  useEffect(() => {
    if (postcodeData && listingFields.parks === 1) {
      loadParks()
    }
  }, [postcodeData])


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



  // increase value in db based on successful response
  const increaseUsageCount = async (listingType) => {
    console.log('trying to increase')
    try {
      const { data } = await axios.post('/api/usage/listing/', { column: listingType }, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      console.log(data)
      if (data.status === 'success') {
        console.log('Usage count increased successfully')
      } else {
        console.error('Failed to increase usage count:', data.message)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  // move to insights page
  const insightLoad = () => {
    increaseUsageCount()
    navigate(`/agents/property/${postcodeSubstring}`)
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


  // state for ai text
  const [generatedText, setGeneratedText] = useState()

  const loadAI = async (e) => {
    try {

      // console.log('in ai loader')

      // Using Axios
      // console.log('ai selection ->', aiFields)
      // console.log('listing selections ->', listingFields)
      const { data } = await axios.post('/api/generate_listing/generate_text/', { details: aiFields })

      const paragraphs = data.message.split('\n')

      // Update the state with the paragraphs
      setGeneratedText(paragraphs)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching data: ', error)
      // Handle error appropriately in UI
    }
  }


  useEffect(() => {
    if (postcodeData &&
      searchGo &&
      ((aiFields.supermarkets !== '' && listingFields.supermarkets === 1) || (listingFields.supermarkets === 0)) &&
      ((aiFields.tube !== '' && listingFields.tubes === 1) || (listingFields.tubes === 0)) &&
      ((aiFields.trains !== '' && listingFields.trains === 1) || (listingFields.trains === 0)) &&
      ((aiFields.gyms !== '' && listingFields.gyms === 1) || (listingFields.gyms === 0)) &&
      ((aiFields.restaurants !== '' && listingFields.restaurants === 1) || (listingFields.restaurants === 0)) &&
      ((aiFields.pubs !== '' && listingFields.pubs === 1) || (listingFields.pubs === 0)) &&
      ((aiFields.evs !== '' && listingFields.evs === 1) || (listingFields.evs === 0)) &&
      ((aiFields.parks !== '' && listingFields.parks === 1) || (listingFields.parks === 0)) &&
      ((aiFields.secondary_schools !== '' && listingFields.secondary_schools === 1) || (listingFields.secondary_schools === 0))) {
      // console.log('in use effect')
      setSearchGo(false)

      loadAI()

    }
  }, [postcodeData, aiFields, searchGo])




  const handleInputChange = (index, value) => {
    const newPhrases = phrases.map((phrase, i) => i === index ? value : phrase)
    setPhrases(newPhrases)
    console.log('phrases ->', newPhrases)
    setAiFields(prevState => ({ ...prevState, phrases: newPhrases }))
  }

  const addPhrase = () => {
    setPhrases([...phrases, ''])
  }

  const removePhrase = index => {
    if (phrases.length > 1) {
      const newPhrases = phrases.filter((_, i) => i !== index)
      setPhrases(newPhrases)
    }
  }


  return (

    <>

      <div className='full-listing-wrapper'>

        <div className='ai-listing-inputs'>


          <>
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
                    value={aiFields.location}
                    onChange={e => setAiFields(prevState => ({ ...prevState, location: e.target.value }))}
                    placeholder="Enter location..."
                  ></input>
                </div>
              </div>

              <div className='double-input-block'>
                <div className='input-block half'>
                  <h3>Size</h3>
                  <input
                    type="number"
                    value={aiFields.size}
                    onChange={e => setAiFields(prevState => ({ ...prevState, size: e.target.value }))}
                    placeholder="Enter size in sq.ft..."
                  ></input>
                </div>
                <div className='input-block half'>
                  <h3>Property type</h3>
                  <select className='listing-dropdown' onChange={e => setAiFields(prevState => ({ ...prevState, property_type: e.target.value }))}>
                    <option>--- Select ---</option>
                    <option>Flat</option>
                    <option>Bungalow</option>
                    <option>Terraced house</option>
                    <option>Semi-detached house</option>
                    <option>Detached house</option>
                  </select>
                </div>
              </div>


              <div className='double-input-block'>
                <div className='input-block half'>
                  <h3>Bedrooms</h3>
                  <select className='listing-dropdown' onChange={e => setAiFields(prevState => ({ ...prevState, bedrooms: e.target.value }))}>
                    <option>--- Select ---</option>
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
                <div className='input-block half'>
                  <h3>Bathrooms</h3>
                  <select className='listing-dropdown' onChange={e => setAiFields(prevState => ({ ...prevState, bathrooms: e.target.value }))}>
                    <option>--- Select ---</option>
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
              </div>
              <div className='input-block large' >
                <h3>Channel</h3>
                <select className='listing-dropdown' onChange={e => setAiFields(prevState => ({ ...prevState, channel: e.target.value }))}>
                  <option>--- Select ---</option>
                  <option>Sales</option>
                  <option>Rental</option>
                </select>
              </div>

              <div className='double-input-block'>
                <div className='input-block half'>
                  <h3>Additional info</h3>
                  {aiFields.channel === 'Rental' ?
                    <select className='listing-dropdown' onChange={e => setAiFields(prevState => ({ ...prevState, additional_info: e.target.value }))}>
                      <option>--- Select ---</option>
                      <option>Furnished</option>
                      <option>Unfurnished</option>
                      <option>Part furnished</option>
                      <option>Furnished or unfurnished</option>
                    </select>
                    :
                    // aiFields.channel === 'Sales' 
                    <select className='listing-dropdown' onChange={e => setAiFields(prevState => ({ ...prevState, additional_info: e.target.value }))}>
                      <option>--- Select ---</option>
                      <option>Freehold</option>
                      <option>Share of Freehold</option>
                      <option>Leasehold</option>
                    </select>
                  }
                </div>
                <div className='input-block half'>
                  <h3>Price</h3>
                  <input
                    type="number"
                    value={aiFields.price}
                    onChange={e => setAiFields(prevState => ({ ...prevState, price: e.target.value }))}
                    placeholder="Enter price..."
                  ></input>
                </div>
              </div>




              <div className='feature-input-block' id='features'>
                <h3>Feature Selector</h3>
                <div className='feature-section'>
                  {features.map(feature => (
                    <div className='feature' key={feature}>
                      <div className='custom-checkbox'>
                        <input className='checkbox'
                          type="checkbox"
                          checked={aiFields.amenities.includes(feature)}
                          onChange={() => handleCheckboxChange(feature)}
                        />
                        <label className='label'>
                          {feature}
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              <div className='lifestyle-input-block'>
                <h3 className='insight-title'>Specific phrases to include</h3>
                {phrases.map((phrase, index) => (
                  <div key={index} className='phrase-line'>
                    <input
                      type="text"
                      value={phrase}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      placeholder='Enter text...'
                    />
                    <button className='plus' onClick={addPhrase}>+</button>
                    {phrases.length > 1 && (
                      <button className='minus' onClick={() => removePhrase(index)}>-</button>
                    )}
                  </div>
                ))}
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
                <button className='load-insights' onClick={() => loadPostcodeData('listing_ai_total')}>Load description</button>
              </div>




            </div>
          </>






        </div>
        <div className='ai-listing-outputs'>
          <div className='results-header'>
            <div className='header-text'>
              <h3 className='results-title'>Your listing</h3>
              {/* {postcodeData && generatedText ? <h3 className='results-sub-title'>What you should know about this property</h3> : ''} */}
            </div>
            <div className='header-cta'>
              <div className='copy-button' onClick={handleCopyText}>
                <div className='copy-icon'></div>
                <h3>Copy</h3>
              </div>
            </div>

          </div>

          <div className='results-section' ref={textDivRef}>
            {!loading ?

              <div className='results-box' name="description">
                {/* Description title */}
                {postcodeData && generatedText ?
                  <>
                    <div className='description-block'>
                      <h1>Key information</h1>
                      <div className='info-block'>
                        <h5>Address: </h5>
                        <h6>{aiFields.location}</h6>
                      </div>
                      <div className='info-block'>
                        <h5>Price: </h5>
                        <h6>£{aiFields.price}</h6>
                      </div>
                      <div className='info-block'>
                        <h5>Size: </h5>
                        <h6>{aiFields.size} sq.ft</h6>
                      </div>

                    </div>
                  </>

                  : ''}
                {postcodeData && generatedText ?
                  <>
                    <div className='description-block'>
                      <h1>About this property</h1>
                      {/* <p>{generatedText}</p> */}
                      {
                        generatedText.map((paragraph, index) => (
                          <p className='results-text' key={index}>{paragraph}</p>
                        ))
                      }
                    </div>
                  </>

                  : ''}
                {postcodeData && generatedText ?
                  <>
                    <div className='description-block'>
                      <h1>Key features</h1>
                      <ul className='results-details'>
                        {aiFields.amenities.map((amenity, index) => (
                          <li key={index}>{amenity}</li>
                        ))}
                      </ul>
                    </div>
                  </>

                  : ''}



                {/* Lifestyle */}
                {postcodeData && generatedText ?

                  <h3 className='results-sub-title'>What you should know about this area</h3>
                  : ''}
                {/* Restaurants */}
                {restaurants1 && listingFields.restaurants === 1 && generatedText ?
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
                {/* Pubs */}
                {pubs1 && listingFields.pubs === 1 && generatedText ?
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
                {/* Gyms */}
                {gyms1 && listingFields.gyms === 1 && generatedText ?
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
                {/* Supermarkets */}
                {supermarkets1 && listingFields.supermarkets === 1 && generatedText ?
                  <>
                    <div className='results-block'>
                      <div className='result-block-header'>
                        <div className='lifestyle-icon' id='supermarkets'></div>
                        <h3>Supermarkets</h3>
                      </div>
                      <>
                        <ul className='results-details'>
                          <li>{supermarkets1.length} supermarkets within 15 mins walk</li>
                          {mainSupermarkets.length === 3 ? <li>includes {mainSupermarkets[0]}, {mainSupermarkets[1]} & {mainSupermarkets[2]}</li> : mainSupermarkets.length === 2 ? <li>🛒 includes {mainSupermarkets[0]} & {mainSupermarkets[1]} </li> : mainSupermarkets.length === 1 ? <li>🛒 includes {mainSupermarkets[0]}</li> : ''}
                        </ul>
                      </>
                    </div>
                    <hr className='results-divider' />
                  </>
                  : ''}
                {/* Tubes */}
                {tubes1 && listingFields.tubes === 1 && generatedText ?
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
                {/* Trains */}
                {trains1 && listingFields.trains === 1 && generatedText ?
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
                {/* Parks */}
                {postcodeData && listingFields.parks === 1 && generatedText ?
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
                {/* EVs */}
                {postcodeData && listingFields.evs === 1 && generatedText ?
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
                {/* Primary schools */}
                {primaryData1 && listingFields.primary_schools === 1 && generatedText ?
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
                {/* Secondary schools */}
                {secondaryData1 && listingFields.secondary_schools === 1 && generatedText ?
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


              </div>
              :
              <Loading />

            }
          </div>

        </div>
      </div>







    </>
  )
}

export default AIListingGenrator