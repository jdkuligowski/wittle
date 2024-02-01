
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getUserToken, isUserAuth, getAccessToken } from '../../auth/Auth'
import { NumericFormat } from 'react-number-format'
import PropertySummary from '../propertyDetails/componentHighlights/PropertySummary'
import SchoolHighlights from '../propertyDetails/componentHighlights/SchoolHighlights'
import LifestyleHighlights from '../propertyDetails/componentHighlights/LifestyleHighlights'
import TransportHighlights from '../propertyDetails/componentHighlights/TransportHighlights'
import NeighbourhoodHighlights from '../propertyDetails/componentHighlights/NeighbourhoodHighlights'
import PropertyDetailSlider from '../propertyDetails/helpers/PropertyDetailSlider'
import PrimaryDetails from '../propertyDetails/componentDetails/PrimaryDetails'
import SecondaryDetails from '../propertyDetails/componentDetails/SecondaryDetails'
import TubeDetails from '../propertyDetails/componentDetails/TubeDetails'
import RestaurantDetails from '../propertyDetails/componentDetails/RestaurantDetails'
import PubDetails from '../propertyDetails/componentDetails/PubDetails'
import SupermarketDetails from '../propertyDetails/componentDetails/SupermarketDetails'
import FitnessDetails from '../propertyDetails/componentDetails/FitnessDetails'
import EVDetails from '../propertyDetails/componentDetails/EVDetails'





const SinglePropertyInsights = ({ setSingleProperty }) => {

  const [propertyView, setPropertyView] = useState('Overview')

  const [errors, setErrors] = useState()

  const [neighbourhoodScore, setNeighbourhoodScore] = useState()

  const [schoolSection, setSchoolSection] = useState(false)
  const [lifestyleSection, setLifestyleSection] = useState(false)
  const [transportSection, setTransportSection] = useState(false)
  const [neighbourhoodSection, setNeighbourhoodSection] = useState(false)

  const [sliderSelection, setSliderSelection] = useState('Primary schools')

  const [tableMapView, setTableMapView] = useState('Table')

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


  // We want to load the postcode data on first load
  useEffect(() => {
    const postcodeData = JSON.parse(localStorage.getItem('listing-postcode'))
    loadPostcodeData(postcodeData)
  }, [])


  // ? Section 2: Load postcode and user data
  const loadPostcodeData = async (postcodeValue) => {
    try {
      const { data } = await axios.post('/api/postcodes/', { postcode: postcodeValue })
      console.log('postcode data ->', data)
      setPostcodes(data)
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

  // overview navigation
  const goToOverview = () => {
    setPropertyView('Overview')
    setPrimaryDetail('Table')
    setSecondaryDetail('Table')
  }

  return (
    <>
      <section className="insights-results-wrapper remove-margin" id='property-search-insights-wrapper'>
        <section className="property-insights-wrapper">
          {/* <div className="property-insight-nav no-print remove-margin">
            <div className="property-insight-buttons no-print remove-margin">
              <h3 className={`insight-button ${propertyView === 'Overview' ? 'active' : 'inactive'}`} id='left' onClick={() => goToOverview()}>Overview</h3>
              <h3 className={`insight-button ${propertyView === 'Details' ? 'active' : 'inactive'}`} id='right' onClick={() => setPropertyView('Details')}>Details</h3>
            </div>
          </div> */}
          <div className='return-to-properties'>
            <h3 onClick={() => setSingleProperty(false)}>&lt;- back to properties</h3>
          </div>
          <div className='single-property-navigation'>
            {/* <h3 className='matching-pill' onClick={() => setPropertyView('Overview')} style={{ color: propertyView === 'Overview' ? 'white' : '#1A276C', backgroundColor: propertyView === 'Overview' ? '#ED6B86' : 'rgba(26, 39, 108, 0.15)' }}>Overview</h3>
            <h3 className='matching-pill' onClick={() => setPropertyView('Details')} style={{ color: propertyView === 'Details' ? 'white' : '#1A276C', backgroundColor: propertyView === 'Details' ? '#ED6B86' : 'rgba(26, 39, 108, 0.15)' }}>Details</h3> */}
            <div className="section-selectors">
              <div className="property-insight-buttons no-print remove-margin">

                <h3 className={`selector-button ${propertyView === 'Overview' ? 'active' : 'inactive'}`} id='left' onClick={() => setPropertyView('Overview')}>Overview</h3>
                <h3 className={`selector-button ${propertyView === 'Details' ? 'active' : 'inactive'}`} id='right' onClick={() => setPropertyView('Details')}>Details</h3>
              </div>
            </div>
          </div>
          {propertyView === 'Overview' ?
            <div className='insight-dropdowns'>
              <div className='summary-header'>
                <h3>Property Summary</h3>
                <hr className='header-line' />
              </div>
              <PropertySummary
                neighbourhoodScore={neighbourhoodScore}
                postcodeData={postcodeData}
              />
              <div className='summary-header' onClick={() => setSchoolSection(!schoolSection)}>
                <h3>School highlights</h3>
                <hr className='header-line' />
              </div>
              {schoolSection ?
                <SchoolHighlights
                  topPrimaries={topPrimaries}
                  topSecondaries={topSecondaries}
                  setPropertyView={setPropertyView}
                  setSecondaryDetail={setSecondaryDetail}
                  setPrimaryDetail={setPrimaryDetail}
                  setSliderSelection={setSliderSelection}
                />
                : ''
              }
              <div className='summary-header' onClick={() => setLifestyleSection(!lifestyleSection)}>
                <h3>Lifestyle highlights</h3>
                <hr className='header-line' />
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
                : ''
              }
              <div className='summary-header' onClick={() => setTransportSection(!transportSection)}>
                <h3>Transport highlights</h3>
                <hr className='header-line' />
              </div>
              {transportSection ?
                <TransportHighlights
                  postcodeData={postcodeData}
                  tubes1={tubes1}
                  trains1={trains1}
                />
                : ''
              }
              <div className='summary-header' onClick={() => setNeighbourhoodSection(!neighbourhoodSection)}>
                <h3>Neighbourhoood highlights</h3>
                <hr className='header-line' />
              </div>
              {neighbourhoodSection ?
                <NeighbourhoodHighlights
                  postcodeData={postcodeData}
                />
                : ''
              }
            </div>

            : propertyView === 'Details' ?
              <>

                <div className='property-details-wrapper'>
                  <PropertyDetailSlider
                    sliderSelection={sliderSelection}
                    setSliderSelection={setSliderSelection}
                    setSecondaryDetail={setSecondaryDetail}
                    setPrimaryDetail={setPrimaryDetail}
                  />
                  {secondaryDetail === 'School' ?
                    <h3 className='go-back' onClick={() => setSecondaryDetail('Table')}>&lt;- Back to secondary school long list</h3>
                    :
                    primaryDetail === 'School' ?
                      <h3 className='go-back' onClick={() => setPrimaryDetail('Table')}>&lt;- Back to primary school long list</h3>
                      :
                      <div className='detail-table-title'>
                        <h3>{sliderSelection} list</h3>
                        <hr className='table-title-line' />
                        <input placeholder='Explore the data'></input>
                        <div className={`icon-box ${tableMapView === 'Table' ? 'active' : 'inactive'}`} onClick={() => setTableMapView('Table')}>
                          <div className='icon' id='table'></div>
                        </div>
                        <div className={`icon-box ${tableMapView === 'Map' ? 'active' : 'inactive'}`} onClick={() => setTableMapView('Map')}>
                          <div className='icon' id='map'></div>
                        </div>

                      </div>
                  }
                  <div className='insight-tables'>
                    {sliderSelection === 'Primary schools' ?
                      <PrimaryDetails
                        primaryData1={primaryData1}
                        setPrimaryData1={setPrimaryData1}
                        postcodeData={postcodeData}
                        tableMapView={tableMapView}
                        listType={'short list'}
                        primaryDetail={primaryDetail}
                        setPrimaryDetail={setPrimaryDetail}
                        setSliderSelection={setSliderSelection}
                        setPropertyView={setPropertyView}
                      />

                      : sliderSelection === 'Secondary schools' ?

                        <SecondaryDetails
                          secondaryData1={secondaryData1}
                          setSecondaryData1={setSecondaryData1}
                          postcodeData={postcodeData}
                          tableMapView={tableMapView}
                          listType={'short list'}
                          secondaryDetail={secondaryDetail}
                          setSecondaryDetail={setSecondaryDetail}
                          setSliderSelection={setSliderSelection}
                          setPropertyView={setPropertyView}
                        />

                        : sliderSelection === 'Tubes' ?
                          <TubeDetails
                            tubes1={tubes1}
                            setTubes1={setTubes1}
                            listType={'short list'}
                            postcodeData={postcodeData}
                            tableMapView={tableMapView}
                          />

                          : sliderSelection === 'Restaurants' ?
                            <RestaurantDetails
                              restaurants1={restaurants1}
                              setRestaurants1={setRestaurants1}
                              listType={'short list'}
                              postcodeData={postcodeData}
                              tableMapView={tableMapView}
                            />

                            : sliderSelection === 'Pubs' ?
                              <PubDetails
                                pubs1={pubs1}
                                setPubs1={setPubs1}
                                listType={'short list'}
                                postcodeData={postcodeData}
                                tableMapView={tableMapView}

                              />

                              : sliderSelection === 'Supermarkets' ?
                                <SupermarketDetails
                                  supermarkets1={supermarkets1}
                                  setSupermarkets1={setSupermarkets1}
                                  listType={'short list'}
                                  postcodeData={postcodeData}
                                  tableMapView={tableMapView}

                                />

                                : sliderSelection === 'Fitness' ?
                                  <FitnessDetails
                                    gyms1={gyms1}
                                    setGyms1={setGyms1}
                                    listType={'short list'}
                                    postcodeData={postcodeData}
                                    tableMapView={tableMapView}

                                  />

                                  : sliderSelection === 'EVs' ?
                                    <EVDetails
                                      ev1={ev1}
                                      setEv1={setEv1}
                                      listType={'short list'}
                                      postcodeData={postcodeData}
                                      tableMapView={tableMapView}

                                    />
                                    :
                                    ''}
                  </div>



                </div>



              </>

              : ''}
        </section>

      </section>

    </>

  )
}


export default SinglePropertyInsights