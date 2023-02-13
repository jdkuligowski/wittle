/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getUserToken, getAccessToken, isUserAuth } from '../../auth/Auth'
import { Modal } from 'react-bootstrap'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { NumericFormat } from 'react-number-format'
import NavBar from '../../tools/NavBar'
import Loading from '../../helpers/Loading'
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image'
import ImageSlider from '../../helpers/ImageSlider'




const PropertyResultsWittle = () => {

  // ? Section 1: Set the states for the items throughout the page

  // state for switching page
  const { id } = useParams()

  // state for setting the current property id clicked - this will be used for the insigfhts modal
  const [currentId, setCurrentId] = useState(0)

  // state for determining whether a property is favoruited - this is used on the conditional for adding/deleting a favourite
  const [listFavourites, setListFavourites] = useState()

  // state to collect properties
  const [properties, setProperties] = useState()

  // state to collect the user information
  const [userData, setUserData] = useState([])

  // state for extracting the users searches from user data
  const [propertySearch, setPropertySearch] = useState({})

  // state for defining the name of the current property search
  const [searchName, setSearchName] = useState()

  // set first run of the form data
  const [initialForm, setInitialForm] = useState()

  // adsitional state for testing - used for extracting the results from state when saved there
  const [localProp, setLocalProp] = useState()

  // another state for properties - this is used as the final property list before calculations are carried out
  const [finalProp, setFinalProp] = useState()

  // states for calculation fields - there are a number of levels of calculation casrried out to transform the data
  const [filteredProperties1, setFilteredProperties1] = useState()
  const [filteredProperties2, setFilteredProperties2] = useState()
  const [filteredProperties3, setFilteredProperties3] = useState()
  const [filteredProperties4, setFilteredProperties4] = useState()
  const [workFamilyCalc1, setWorkFamilyCalc1] = useState()
  const [workFamilyCalc2, setWorkFamilyCalc2] = useState()
  const [calc1, setCalc1] = useState()
  const [calc2, setCalc2] = useState()
  const [calc3, setCalc3] = useState()
  const [calc4, setCalc4] = useState()
  const [calc5, setCalc5] = useState()
  const [calc6, setCalc6] = useState()
  const [calc7, setCalc7] = useState()
  const [calc8, setCalc8] = useState()
  const [calc9, setCalc9] = useState()
  const [calc10, setCalc10] = useState()

  // state to enable navigation between pages
  const navigate = useNavigate()

  // set error state for capturing errors
  const [errors, setErrors] = useState(false)

  // set for capturing the id of the edit search - used when editing a search and submitting to the database
  const [editSearch, setEditSearch] = useState()

  // states for filling out the form
  const [formData, setFormData] = useState({
    start_search: true,
    search_name: '',
    search_type: 'Wittle',
    search_channel: '',
    restaurant_selection: false,
    restaurant_decision: '',
    restaurant_distance: 0,
    restaurant_cuisine_1: '',
    restaurant_cuisine_2: '',
    takeaway_selection: false,
    takeaway_decision: '',
    takeaway_distance: 0,
    takeaway_cuisine_1: '',
    takeaway_cuisine_2: '',
    pubs_selection: false,
    pubs_distance: 0,
    cafes_selection: '',
    cafes_decision: '',
    cafes_detail: '',
    cafes_distance: 0,
    tube_selection: false,
    tube_decision: '',
    tube_detail: '',
    tube_distance: 0,
    train_selection: false,
    train_decision: '',
    train_detail: '',
    train_distance: 0,
    primary_selection: false,
    primary_religion: '',
    primary_mode: '',
    primary_distance: 0,
    college_selection: false,
    college_religion: '',
    college_mode: '',
    college_distance: 0,
    secondary_selection: false,
    secondary_religion: '',
    secondary_mode: '',
    secondary_distance: 0,
    supermarket_selection: false,
    supermarket_decision: '',
    supermarket_segment: '',
    supermarket_size: '',
    supermarket_distance: 0,
    gym_selection: false,
    gym_studio_name: '',
    gym_class_type: '',
    gym_distance: 0,
    park_selection: false,
    park_type: '',
    park_distance: 0,
    workplace_selection: false,
    workplace_detail: '',
    workplace_transport: '',
    workplace_distance: 0,
    family_selection: false,
    family_detail_1: '',
    family_distance_1: 0,
    family_detail_2: '',
    family_distance_2: 0,
    family_detail_3: '',
    family_distance_3: 0,
    family_mode_1: '',
    family_mode_2: '',
    family_mode_3: '',
    property_price_min: '',
    property_price_max: '',
    property_bed_min: '',
    property_bed_max: '',
    property_type: '',
    owner: 31,
  })

  // set states for proeprty detail buttons
  const [propertyButtons, setPropertyButtons] = useState('Description')

  // set states for sidebar feature
  const [sidebar, setSidebar] = useState('Close')

  // set states for calculating the longitude and latitude of the workplaces
  const [workLong, setWorkLong] = useState()
  const [workLat, setWorkLat] = useState()
  const [famLong1, setFamLong1] = useState()
  const [famLat1, setFamLat1] = useState()
  const [famLong2, setFamLong2] = useState()
  const [famLat2, setFamLat2] = useState()
  const [geoData, setGeoData] = useState()
  const [workRun, setWorkRun] = useState(false)
  const [famRun, setFamRun] = useState(false)

  // set state for the image values
  const [imageTracking, setImageTracking] = useState(1)

  // define state for currenmt image
  const [currentImage, setCurrentImage] = useState()

  // ? Section 2: SETTING SEARCH CRITERIA - Define the search criteria that we will be using to filter the properties
  // Section 2: Step 1 - load in user information so w can extract th latest search
  const loadUserData = async () => {
    if (isUserAuth())
      try {
        const { data } = await axios.get(`/api/auth/profile/${getUserToken()}/`, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        setPropertySearch(data.property_search_details)
        console.log('property search array ->', data.property_search_details)
        setUserData(data)
        console.log('userdata ->', data)
        const favouriteList = []
        data.favourites.forEach(item => favouriteList.includes(item.property) ? '' : favouriteList.push(item.property))
        setListFavourites(favouriteList)
      } catch (error) {
        setErrors(true)
        console.log(error)
      }
    else
      try {
        const { data } = await axios.get('/api/auth/profile/xplw7aq5r/AdminData/')
        setPropertySearch(data.property_search_details)
        console.log('property search array ->', data.property_search_details)
        setUserData(data)
        console.log('userdata ->', data)
        const favouriteList = []
        data.favourites.forEach(item => favouriteList.includes(item.property) ? '' : favouriteList.push(item.property))
        setListFavourites(favouriteList)
      } catch (error) {
        setErrors(true)
        console.log(error)
      }
    const input = JSON.parse(localStorage.getItem('wittle-form-input'))
    setInitialForm(input)
    console.log('initial form ->', input)
  }

  // load this data in
  useEffect(() => {
    loadUserData()
  }, [])


  // Section 2: Step 2 - extract the name of the search from storage and filter to get the current search
  // if we just use the wholke form data from storage, we don't get access to the 'result_id' (pk), which stops us from editing it effectively
  const extractFormName = () => {
    if (initialForm)
      try {
        const result = propertySearch.filter(property => {
          return property.search_name === initialForm.search_name
        })
        setFormData(result[0])
        console.log('form data', result[0])
        setSearchName(result[0])
        if (result[0] === undefined)
          navigate('/access-denied')
      } catch (error) {
        console.log('unable to set form name')
      }
  }

  // load this data in
  useEffect(() => {
    if (propertySearch.length > 0)
      extractFormName()
  }, [propertySearch])


  // useEffect(() => {
  //   if (initialForm)
  //     contentChecking()
  // }, [initialForm])



  // ? Section 3: FETCHING PROPERTIES - extract properties from the database and apply initialy filters to these
  // Section 3: Step 1 - get properties from the database
  // Option 1 - search hasn't been done before and isn't in storage
  // useEffect(() => {
  const getProperties = async () => {
    if (!localProp)
      try {
        const { data } = await axios.get('/api/properties/results')
        setProperties(data)
        console.log('property data ->', data)
        setResultsToLocalStorage()
      } catch (error) {
        setErrors(true)
        console.log(error)
      }
  }


  // const contentChecking = () => {
  //   if (initialForm.search_name === '') 
  //     navigate('/access-denied') 
  // }


  useEffect(() => {
    if (propertySearch.length > 0)
      getProperties()
  }, [propertySearch])

  // Option 2 - search has been carried out before and is contained in storage
  const getResults = (token) => {
    if (propertySearch.length > 0)
      try {
        const data = JSON.parse(localStorage.getItem('wittle-results'))
        if (data)
          setLocalProp(data)
        console.log('properties from storage ->', data)
        setFinalProp(data)
        // setProperties(data)
      } catch (error) {
        console.log('no storage data')
      }
  }


  // Section 3: Step 2 - define criteria to remove any properties that don't fit the criteria
  const removeEmpties = () => {
    const calculation =
      properties.filter(property =>
        property.gyms.length !== 0 &
        property.primaries.length !== 0 &
        property.supermarkets.length !== 0 &
        property.restaurants.length !== 0 &
        property.parks.length !== 0 &
        property.cafes.length !== 0 &
        property.tubes.length !== 0 &
        property.bars.length !== 0 &
        property.takeaways.length !== 0 &
        property.secondaries.length !== 0)
    console.log('cleansed properrty data ->', calculation)
    setLocalProp(calculation)
    setFinalProp(calculation)
  }


  // apply the changes from section 3
  useEffect(() => {
    (properties && propertySearch) ? removeEmpties() : getResults()
  }, [properties, propertySearch])

  // define function for setting results to storage
  const setResultsToLocalStorage = (token) => {
    window.localStorage.setItem('wittle-results', JSON.stringify(localProp))
    setFinalProp(localProp)
  }


  // ? Section 4: APPLY FORM FILTERS - take the inputs freom the form and apply these to the properties before we carry out calculations
  // Section 4: Step 1 - filter the properties based on the bvalue inputted by the user
  const propertyFilter = () => {
    const calculation =
      finalProp.filter(property => {
        return (formData.search_channel === 'Buying') ? (property.value <= formData.property_price_max && property.value >= formData.property_price_min) : (formData.search_channel === 'Renting') ? (property.monthly <= formData.property_price_max && property.monthly >= formData.property_price_min) : property
      })
    console.log('filtered properties ->', calculation)
    setFilteredProperties1(calculation)
  }

  // apply the value filterr
  useEffect(() => {
    if (finalProp)
      propertyFilter()
  }, [finalProp])


  // Section 4: Step 2 - filter the property based on the number of bedrooms inputted by the user
  const bedroomFilter = () => {
    const calculation2 =
      filteredProperties1.filter(property => {
        return (property.bedrooms <= formData.property_bed_max && property.bedrooms >= formData.property_bed_min)
      })
    console.log('filtered properties 2 ->', calculation2)
    setFilteredProperties2(calculation2)
  }

  // apply the bedroom filter
  useEffect(() => {
    if (filteredProperties1)
      bedroomFilter()
  }, [filteredProperties1])


  // Section 4: Step 3 - fitler the property based on the type of property
  const propertyType = () => {
    const calculation =
      filteredProperties2.filter(property => {
        return (formData.property_type === 'House' ? property.type = 'house' : formData.property_type === 'Flat' ? property.type = 'flat' : property)
      })
    console.log('filtered properties 3 ->', calculation)
    setFilteredProperties3(calculation)
  }

  // apply the property type filter
  useEffect(() => {
    if (filteredProperties2)
      propertyType()
  }, [filteredProperties2])


  // Section 4: Step 4 - filter out any restaurants not in the desired radius
  const formFilters = () => {
    const calculation =
      filteredProperties3.map(property => {
        return {
          ...property,
          restaurants: formData.restaurant_selection ? property.restaurants.filter(restaurant => {
            return restaurant.walking_time_mins <= formData.restaurant_distance
          }) : property.restaurants,
          takeaways: formData.takeaway_selection ? property.takeaways.filter(restaurant => {
            return restaurant.walking_time_mins <= formData.takeaway_distance
          }) : property.takeaways,
          bars: formData.pubs_selection ? property.bars.filter(bar => {
            return bar.walking_time_mins <= formData.pubs_distance
          }) : property.bars,
          cafes: formData.cafes_selection ? property.cafes.filter(cafe => {
            return cafe.walking_time_mins <= formData.cafes_distance
          }) : property.cafes,
          supermarkets: formData.supermarket_selection ? property.supermarkets.filter(shop => {
            return shop.walking_time_mins <= formData.supermarket_distance
          }) : property.supermarkets,
          gyms: formData.gym_selection ? property.gyms.filter(gym => {
            return gym.walking_time_mins <= formData.gym_distance
          }) : property.gyms,
          parks: formData.park_selection ? property.parks.filter(park => {
            return park.walking_time_mins <= formData.park_distance
          }) : property.parks,
          tubes: formData.tube_selection ? property.tubes.filter(tube => {
            return tube.walking_time_mins <= formData.tube_distance
          }) : property.tubes,
          primaries: formData.primary_selection ? property.primaries.filter(school => {
            return school.walking_time_mins <= formData.primary_distance
          }) : property.primaries,
          secondaries: formData.secondary_selection ? property.secondaries.filter(school => {
            return school.walking_time_mins <= formData.secondary_distance
          }) : property.secondaries,
        }
      })
    console.log('filtered properties 4->', calculation)
    setFilteredProperties4(calculation)
  }

  useEffect(() => {
    if (filteredProperties3)
      formFilters()
  }, [filteredProperties3])


  // ? Section 5: CALCULATE MISSING FIELDS - if a user selects workplace or family as options, we need to calculate distances for these so we can filter on them
  // Step 1: Extract coordinates from the postcvode using 3rd party API
  const getWork = async () => {
    try {
      let postcode = initialForm.workplace_detail
      if (postcode === 'False')
        postcode = ''
      else
        postcode === postcode
      console.log('workplace postcode ->', postcode)
      const { data } = await axios.get(`https://api.postcodes.io/postcodes/${postcode}`)
      console.log('workplace data ->', data)
      // const { data } = await axios.get('http://getthedata.com/postcode/E11NH')
      setWorkLat(parseFloat(data.result.latitude))
      setWorkLong(parseFloat(data.result.longitude))
      console.log(data.result.longitude)
      setGeoData(data)
      console.log('workplace coordinates retrieved')
    } catch (error) {
      setErrors(true)
      console.log('workplace postcode error ->', error.response.data.error)
    }
    setWorkRun(true)
  }

  // run calculation for work postcode data
  useEffect(() => {
    if (filteredProperties4)
      getWork()
  }, [filteredProperties4])


  // extract family postcode from third party api
  const getFam = async () => {
    if (initialForm)
      try {
        let postcode = initialForm.family_detail_1
        if (postcode === 'False')
          postcode = ''
        else
          postcode === postcode
        console.log('family postcode 1 ->', postcode)
        const { data } = await axios.get(`https://api.postcodes.io/postcodes/${postcode}`)
        console.log('family 1 data ->', data)
        setFamLat1(parseFloat(data.result.latitude))
        setFamLong1(parseFloat(data.result.longitude))
        console.log(data.result.longitude)

        console.log('family coordinates retrieved')
      } catch (error) {
        setErrors(true)
        console.log('family postcode error ->', error.response.data.error)
      }
    setFamRun(true)
  }

  // run calculation for family postcode fata 
  useEffect(() => {
    if (workRun)
      getFam()
  }, [workRun])


  // Step 2: calculate the distance between the properties and the workplace
  const workPlaceCalc1 = () => {
    const calculation =
      filteredProperties4.map(property => {
        return {
          ...property,
          workplace:
          {
            workplace_long: workLong,
            workplace_lat: workLat,
            workplace_distance_km: (12742 * Math.sin(Math.sqrt(0.5 - Math.cos((property.Lat - parseFloat(workLat)) * (Math.PI / 180)) / 2 + Math.cos(parseFloat(workLat) * (Math.PI / 180)) * Math.cos(property.Lat * (Math.PI / 180)) * (1 - Math.cos((property.long - parseFloat(workLong)) * (Math.PI / 180))) / 2))) * 1.2,
          },
          family1:
          {
            family_long: famLong1,
            family_lat: famLat1,
            family_distance_km: (12742 * Math.sin(Math.sqrt(0.5 - Math.cos((property.Lat - parseFloat(famLat1)) * (Math.PI / 180)) / 2 + Math.cos(parseFloat(famLat1) * (Math.PI / 180)) * Math.cos(property.Lat * (Math.PI / 180)) * (1 - Math.cos((property.long - parseFloat(famLong1)) * (Math.PI / 180))) / 2))) * 1.2,
          },
        }
      })
    console.log('work calculated 1 ->', calculation)
    setWorkFamilyCalc1(calculation)
  }

  // run calculation - we need to wait for the work and family postcode calculatinos to runpostcode 
  useEffect(() => {
    // if (filteredProperties3 & workRun & famRun)
    if (famRun)
      workPlaceCalc1()
  }, [famRun])


  // Step 3: define the drive/cycle/walk time between the workplace and properties
  const workPlaceCalc2 = () => {
    const calculation =
      workFamilyCalc1.map(property => {
        return {
          ...property,
          workplace:
            [{
              workplace_long: property.workplace.workplace_long,
              workplace_lat: property.workplace.workplace_lat,
              workplace_distance_km: property.workplace.workplace_distance_km,
              workplace_cycling_mins: (property.workplace.workplace_distance_km / 20) * 60,
              workplace_walking_mins: (property.workplace.workplace_distance_km / 5) * 60,
              workplace_driving_mins: (property.workplace.workplace_distance_km / 22) * 60,
            }],
          workplace_extra:
          {
            workplace_long: property.workplace.workplace_long,
            workplace_lat: property.workplace.workplace_lat,
            workplace_distance_km: property.workplace.workplace_distance_km,
            workplace_cycling_mins: ((property.workplace.workplace_distance_km / 20) * 60).toFixed(0),
            workplace_walking_mins: ((property.workplace.workplace_distance_km / 5) * 60).toFixed(0),
            workplace_driving_mins: ((property.workplace.workplace_distance_km / 22) * 60).toFixed(0),
          },
          family1:
            [{
              family_long: property.family1.family_long,
              family_lat: property.family1.family_lat,
              family_distance_km: property.family1.family_distance_km,
              family_cycling_mins: (property.family1.family_distance_km / 20) * 60,
              family_walking_mins: (property.family1.family_distance_km / 5) * 60,
              family_driving_mins: (property.family1.family_distance_km / 22) * 60,
            }],
          family1_extra:
          {
            family_long: property.family1.family_long,
            family_lat: property.family1.family_lat,
            family_distance_km: property.family1.family_distance_km,
            family_cycling_mins: ((property.family1.family_distance_km / 20) * 60).toFixed(0),
            family_walking_mins: ((property.family1.family_distance_km / 5) * 60).toFixed(0),
            family_driving_mins: ((property.family1.family_distance_km / 22) * 60).toFixed(0),
          },
        }
      })
    console.log('work calculated 2 ->', calculation)
    setWorkFamilyCalc2(calculation)
  }

  // run calculation
  useEffect(() => {
    if (workFamilyCalc1)
      workPlaceCalc2()
  }, [workFamilyCalc1])



  // ? Section 6: CONVERT VARIABLE VALUES - to imporve database efficiency, some fields have been converted to numbers. These need to be updated to show actual values
  // Section 6: Step 1 - updating first set of values
  const calculation1 = () => {
    const calculation =
      workFamilyCalc2.map(property => {
        return {
          ...property,
          restaurants: property.restaurants.map(restaurant => {
            return (restaurant.cuisine_value === 0) ? { ...restaurant, cuisine: 'Indian' } : (restaurant.cuisine_value === 1) ? { ...restaurant, cuisine: 'British' } : (restaurant.cuisine_value === 2) ? { ...restaurant, cuisine: 'American' } : (restaurant.cuisine_value === 3) ? { ...restaurant, cuisine: 'French' } : (restaurant.cuisine_value === 4) ? { ...restaurant, cuisine: 'European' } :
              (restaurant.cuisine_value === 5) ? { ...restaurant, cuisine: 'Spanish' } : (restaurant.cuisine_value === 6) ? { ...restaurant, cuisine: 'Italian' } : (restaurant.cuisine_value === 7) ? { ...restaurant, cuisine: 'South American' } : (restaurant.cuisine_value === 8) ? { ...restaurant, cuisine: 'Chinesee' } : (restaurant.cuisine_value === 9) ? { ...restaurant, cuisine: 'Gastro Pub' } :
                (restaurant.cuisine_value === 10) ? { ...restaurant, cuisine: 'Japanese' } : (restaurant.cuisine_value === 11) ? { ...restaurant, cuisine: 'Pub food' } : (restaurant.cuisine_value === 12) ? { ...restaurant, cuisine: 'Thai' } : (restaurant.cuisine_value === 13) ? { ...restaurant, cuisine: 'Seafood' } : (restaurant.cuisine_value === 14) ? { ...restaurant, cuisine: 'Middle Eastern' } :
                  (restaurant.cuisine_value === 15) ? { ...restaurant, cuisine: 'Pizza' } : (restaurant.cuisine_value === 16) ? { ...restaurant, cuisine: 'Vietnamese' } : (restaurant.cuisine_value === 17) ? { ...restaurant, cuisine: 'Modern' } : (restaurant.cuisine_value === 18) ? { ...restaurant, cuisine: 'North African' } : (restaurant.cuisine_value === 19) ? { ...restaurant, cuisine: 'Central American' } :
                    (restaurant.cuisine_value === 20) ? { ...restaurant, cuisine: 'South East Asian' } : (restaurant.cuisine_value === 21) ? { ...restaurant, cuisine: 'No Cuisine Data' } : (restaurant.cuisine_value === 22) ? { ...restaurant, cuisine: 'No Cuisine Data' } : (restaurant.cuisine_value === 23) ? { ...restaurant, cuisine: 'Turkish' } : (restaurant.cuisine_value === 24) ? { ...restaurant, cuisine: 'Other' } :
                      (restaurant.cuisine_value === 25) ? { ...restaurant, cuisine: 'Mediterranean' } : (restaurant.cuisine_value === 26) ? { ...restaurant, cuisine: 'Asian' } : (restaurant.cuisine_value === 27) ? { ...restaurant, cuisine: 'Meat & Grill' } : (restaurant.cuisine_value === 28) ? { ...restaurant, cuisine: 'International' } : (restaurant.cuisine_value === 29) ? { ...restaurant, cuisine: 'Bar' } :
                        (restaurant.cuisine_value === 30) ? { ...restaurant, cuisine: 'Mexican' } : (restaurant.cuisine_value === 31) ? { ...restaurant, cuisine: 'Greek' } : (restaurant.cuisine_value === 32) ? { ...restaurant, cuisine: 'Afternoon Tea' } : (restaurant.cuisine_value === 33) ? { ...restaurant, cuisine: 'Vegetarian/ Vegan' } : (restaurant.cuisine_value === 34) ? { ...restaurant, cuisine: 'Chicken' } :
                          (restaurant.cuisine_value === 35) ? { ...restaurant, cuisine: 'Wine Bar' } : (restaurant.cuisine_value === 36) ? { ...restaurant, cuisine: 'Central Asian' } : (restaurant.cuisine_value === 37) ? { ...restaurant, cuisine: 'South African' } : { ...restaurant, cuisine: 'No Cuisine Data' }
          }),
          takeaways: property.takeaways.map(restaurant => {
            return (restaurant.cuisine.length > 50) ? { ...restaurant, cuisine: 'Multiple' } : { ...restaurant, cuisine: restaurant.cuisine }
          }),
          bars: property.bars.map(pub => {
            return (pub.pub_category_value === 0) ? { ...pub, pub_category: 'Worth a visit' } : (pub.pub_category_value === 1) ? { ...pub, pub_category: 'Other pubs' } : (pub.pub_category_value === 2) ? { ...pub, pub_category: 'Timeout100' } : (pub.pub_category_value === 3) ? { ...pub, pub_category: 'Other Pubs' } : { ...pub, pub_category: 'Recommended' }
          }),
          gyms: property.gyms.map(gym => {
            return (gym.gym_group_value === 0) ? { ...gym, gym_group: 'Other' } : (gym.gym_group_value === 1) ? { ...gym, gym_group: 'Fitness First' } : (gym.gym_group_value === 2) ? { ...gym, gym_group: 'MoreYoga' } : (gym.gym_group_value === 3) ? { ...gym, gym_group: 'Virgin' } : (gym.gym_group_value === 4) ? { ...gym, gym_group: 'Pure Gym' } : (gym.gym_group_value === 5) ? { ...gym, gym_group: 'The Gym Group' } : (gym.gym_group_value === 6) ? { ...gym, gym_group: 'Barrecore' } : (gym.gym_group_value === 7) ? { ...gym, gym_group: 'Nuffield Health' } :
              (gym.gym_group_value === 8) ? { ...gym, gym_group: '1Rebel' } : (gym.gym_group_value === 9) ? { ...gym, gym_group: 'Gymbox' } : (gym.gym_group_value === 10) ? { ...gym, gym_group: 'Barrys' } : { ...gym, gym_group: 'Third Space' }
          }),
          supermarkets: property.supermarkets.map(supermarket => {
            return (supermarket.cleansed_name_value === 0) ? { ...supermarket, cleansed_name: 'Co-op' } : (supermarket.cleansed_name_value === 1) ? { ...supermarket, cleansed_name: 'Tesco' } : (supermarket.cleansed_name_value === 2) ? { ...supermarket, cleansed_name: 'Sainsburys' } : (supermarket.cleansed_name_value === 3) ? { ...supermarket, cleansed_name: 'Nisa' } : (supermarket.cleansed_name_value === 4) ? { ...supermarket, cleansed_name: 'Budgens' } : (supermarket.cleansed_name_value === 5) ? { ...supermarket, cleansed_name: 'Amazon Fresh' } :
              (supermarket.cleansed_name_value === 6) ? { ...supermarket, cleansed_name: 'Spar' } : (supermarket.cleansed_name_value === 7) ? { ...supermarket, cleansed_name: 'Asda' } : (supermarket.cleansed_name_value === 8) ? { ...supermarket, cleansed_name: 'Morrisons' } : (supermarket.cleansed_name_value === 9) ? { ...supermarket, cleansed_name: 'M&S Food' } : (supermarket.cleansed_name_value === 10) ? { ...supermarket, cleansed_name: 'Waitrose' } : (supermarket.cleansed_name_value === 11) ? { ...supermarket, cleansed_name: 'Whole Foods' } :
                (supermarket.cleansed_name_value === 12) ? { ...supermarket, cleansed_name: 'Iceland' } : (supermarket.cleansed_name_value === 13) ? { ...supermarket, cleansed_name: 'Farmfoods' } : (supermarket.cleansed_name_value === 14) ? { ...supermarket, cleansed_name: 'Lidl' } : (supermarket.cleansed_name_value === 16) ? { ...supermarket, cleansed_name: 'Londis' } : (supermarket.cleansed_name_value === 17) ? { ...supermarket, cleansed_name: 'Local Convenience Store' } : (supermarket.cleansed_name_value === 18) ? { ...supermarket, cleansed_name: 'Costcutter' } :
                  (supermarket.segment_value === 0) ? { ...supermarket, segment: 'Mainstream' } : (supermarket.segment_value === 1) ? { ...supermarket, segment: 'Premium' } : (supermarket.segment_value === 2) ? { ...supermarket, segment: 'Budget' } : (supermarket.segment_value === 3) ? { ...supermarket, segment: 'Convenience' } :
                    (supermarket.size_value === 0) ? { ...supermarket, size: 'Local' } : (supermarket.size_value === 1) ? { ...supermarket, size: 'Convenience' } : { ...supermarket, size: 'Large' }
          }),
          primaries: property.primaries.map(school => {
            return (school.ofsted_value === 0) ? { ...school, ofsted_results: 'Outstanding' } : (school.ofsted_value === 1) ? { ...school, ofsted_results: 'Good' } : (school.ofsted_value === 2) ? { ...school, ofsted_results: 'No assessment' } : (school.ofsted_value === 3) ? { ...school, ofsted_results: 'Requires Improvement' } : (school.ofsted_value === 4) ? { ...school, ofsted_results: 'Serious Weaknesses' } : { ...school, ofsted_results: 'Special Measures' }
          }),
          secondaries: property.secondaries.map(school => {
            return (school.ofsted_value === 0) ? { ...school, ofsted_results: 'Outstanding' } : (school.ofsted_value === 1) ? { ...school, ofsted_results: 'Good' } : (school.ofsted_value === 2) ? { ...school, ofsted_results: 'No assessment' } : (school.ofsted_value === 3) ? { ...school, ofsted_results: 'Requires Improvement' } : (school.ofsted_value === 4) ? { ...school, ofsted_results: 'Serious Weaknesses' } : { ...school, ofsted_results: 'Special Measures' }
          }),
          // colleges: property.colleges.map(school => {
          //   return (school.ofsted_value === 0) ? { ...school, ofsted_results: 'Outstanding' } : (school.ofsted_value === 1) ? { ...school, ofsted_results: 'Good' } : (school.ofsted_value === 2) ? { ...school, ofsted_results: 'No assessment' } : (school.ofsted_value === 3) ? { ...school, ofsted_results: 'Requires Improvement' } : (school.ofsted_value === 4) ? { ...school, ofsted_results: 'Serious Weaknesses' } : { ...school, ofsted_results: 'Special Measures' }
          // }),
        }
      })
    console.log('calculation 1 ->', calculation)
    setCalc1(calculation)
  }

  // run calculation
  useEffect(() => {
    if (workFamilyCalc2)
      calculation1()
  }, [workFamilyCalc2])


  // Section 6: Step 2 - updating second set of values  
  const calculation2 = () => {
    const calculation =
      calc1.map(property => {
        return {
          ...property,
          restaurants: property.restaurants.map(restaurant => {
            return (restaurant.source_value === 0) ? { ...restaurant, source: 'Open Table' } : (restaurant.source_value === 1) ? { ...restaurant, source: 'Google' } : (restaurant.source_value === 2) ? { ...restaurant, source: 'Open Table & Google' } : (restaurant.source_value === 3) ? { ...restaurant, source: 'Michelin Guide' } : (restaurant.source_value === 0) ? { ...restaurant, source: 'Michelin & Google' } : (restaurant.source_value === 5) ? { ...restaurant, source: 'Open Table & Michelin' } : { ...restaurant, source: 'Open Table, Michelin & Google' }
          }),
          supermarkets: property.supermarkets.map(supermarket => {
            return (supermarket.segment_value === 0) ? { ...supermarket, segment: 'Mainstream' } : (supermarket.segment_value === 1) ? { ...supermarket, segment: 'Premium' } : (supermarket.segment_value === 2) ? { ...supermarket, segment: 'Budget' } : { ...supermarket, segment: 'Convenience' }
          }),
          primaries: property.primaries.map(school => {
            return (school.ofsted_recency_value === 0) ? { ...school, ofsted_recncy: 'Over 8 Years' } : (school.ofsted_recency_value === 1) ? { ...school, ofsted_recency: 'Within 5 Years' } : (school.ofsted_recency_value === 2) ? { ...school, ofsted_recency: 'Within 8 Years' } : (school.ofsted_recency_value === 3) ? { ...school, ofsted_recency: 'Within 3 Years' } : (school.ofsted_recency_value === 4) ? { ...school, ofsted_recency: 'Within 1 Year' } : { ...school, ofsted_results: 'No assessment' }
          }),
          secondaries: property.secondaries.map(school => {
            return (school.ofsted_recency_value === 0) ? { ...school, ofsted_recncy: 'Over 8 Years' } : (school.ofsted_recency_value === 1) ? { ...school, ofsted_recency: 'Within 5 Years' } : (school.ofsted_recency_value === 2) ? { ...school, ofsted_recency: 'Within 8 Years' } : (school.ofsted_recency_value === 3) ? { ...school, ofsted_recency: 'Within 3 Years' } : (school.ofsted_recency_value === 4) ? { ...school, ofsted_recency: 'Within 1 Year' } : { ...school, ofsted_results: 'No assessment' }
          }),
          // colleges: property.colleges.map(school => {
          //   return (school.ofsted_recency_value === 0) ? { ...school, ofsted_recncy: 'Over 8 Years' } : (school.ofsted_recency_value === 1) ? { ...school, ofsted_recency: 'Within 5 Years' } : (school.ofsted_recency_value === 2) ? { ...school, ofsted_recency: 'Within 8 Years' } : (school.ofsted_recency_value === 3) ? { ...school, ofsted_recency: 'Within 3 Years' } : (school.ofsted_recency_value === 4) ? { ...school, ofsted_recency: 'Within 1 Year' } : { ...school, ofsted_results: 'No assessment' }
          // }),
        }
      })
    console.log('calculation 2 ->', calculation)
    setCalc2(calculation)
  }

  // run calculatino
  useEffect(() => {
    if (calc1)
      calculation2()
  }, [calc1])


  // Section 6: Step 3 - updating third set of values  
  const calculation3 = () => {
    const calculation =
      calc2.map(property => {
        return {
          ...property,
          supermarkets: property.supermarkets.map(supermarket => {
            return (supermarket.size_value === 0) ? { ...supermarket, size: 'Local' } : (supermarket.size_value === 1) ? { ...supermarket, size: 'Convenience' } : { ...supermarket, size: 'Large' }
          }),
          primaries: property.primaries.map(school => {
            return (school.religion_value === 0) ? { ...school, religious_grouping: 'Does not apply' } : (school.religion_value === 1) ? { ...school, religious_grouping: 'Church of England' } : (school.religion_value === 2) ? { ...school, religious_grouping: 'Roman Catholic' } : (school.religion_value === 3) ? { ...school, religious_grouping: 'None' } : (school.religion_value === 4) ? { ...school, religious_grouping: 'Muslim' } : (school.religion_value === 5) ? { ...school, religious_grouping: 'Jewish' } : (school.religion_value === 6) ? { ...school, religious_grouping: 'Christian' } : (school.religion_value === 7) ? { ...school, religious_grouping: 'Catholic' } : (school.religion_value === 4) ? { ...school, religious_grouping: 'Church of England/Christian' } : { ...school, religious_grouping: 'Hindu' }
          }),
          secondaries: property.secondaries.map(school => {
            return (school.religion_value === 0) ? { ...school, religious_grouping: 'Does not apply' } : (school.religion_value === 1) ? { ...school, religious_grouping: 'Church of England' } : (school.religion_value === 2) ? { ...school, religious_grouping: 'Roman Catholic' } : (school.religion_value === 3) ? { ...school, religious_grouping: 'None' } : (school.religion_value === 4) ? { ...school, religious_grouping: 'Muslim' } : (school.religion_value === 5) ? { ...school, religious_grouping: 'Jewish' } : (school.religion_value === 6) ? { ...school, religious_grouping: 'Christian' } : (school.religion_value === 7) ? { ...school, religious_grouping: 'Catholic' } : (school.religion_value === 4) ? { ...school, religious_grouping: 'Church of England/Christian' } : { ...school, religious_grouping: 'Hindu' }
          }),
          // colleges: property.colleges.map(school => {
          //   return (school.religion_value === 0) ? { ...school, religious_grouping: 'Does not apply' } : (school.religion_value === 1) ? { ...school, religious_grouping: 'Church of England' } : (school.religion_value === 2) ? { ...school, religious_grouping: 'Roman Catholic' } : (school.religion_value === 3) ? { ...school, religious_grouping: 'None' } : (school.religion_value === 4) ? { ...school, religious_grouping: 'Muslim' } : (school.religion_value === 5) ? { ...school, religious_grouping: 'Jewish' } : (school.religion_value === 6) ? { ...school, religious_grouping: 'Christian' } : (school.religion_value === 7) ? { ...school, religious_grouping: 'Catholic' } : (school.religion_value === 4) ? { ...school, religious_grouping: 'Church of England/Christian' } : { ...school, religious_grouping: 'Hindu' }
          // }),
        }
      })
    console.log('calculation 3 ->', calculation)
    setCalc3(calculation)
  }

  // run calculation
  useEffect(() => {
    if (calc2)
      calculation3()
  }, [calc2])


  // Section 6: Step 4 - updating fourth set of values  
  const calculation4 = () => {
    const calculation =
      calc3.map(property => {
        return {
          ...property,
          primaries: property.primaries.map(school => {
            return (school.gender_value === 0) ? { ...school, gender: 'Mixed' } : (school.gender_value === 1) ? { ...school, gender: 'Girls' } : { ...school, gender: 'Boys' }
          }),
          secondaries: property.secondaries.map(school => {
            return (school.gender_value === 0) ? { ...school, gender: 'Mixed' } : (school.gender_value === 1) ? { ...school, gender: 'Girls' } : { ...school, gender: 'Boys' }
          }),
          // colleges: property.colleges.map(school => {
          //   return (school.gender_value === 0) ? { ...school, gender: 'Mixed' } : (school.gender_value === 1) ? { ...school, gender: 'Girls' } : { ...school, gender: 'Boys' }
          // }),
        }
      })
    console.log('calculation 4 ->', calculation)
    setCalc4(calculation)
  }

  // run calculation
  useEffect(() => {
    if (calc3)
      calculation4()
  }, [calc3])


  // ? Section 7: CALCULATIONS FOR WITTLE ALGORITHM - key calculations that will complete the match score
  // First key calculation that will give a value for the variables on each property
  const calculation5 = () => {
    const calculation =
      calc4.map(property => {
        return {
          ...property,
          restaurant_calcs: formData.restaurant_selection ? property.restaurants.map(restaurant => {
            return (restaurant.Rating >= 4.9) ? { ...restaurant, restaurant_score: 15 } : (restaurant.Rating >= 4.7) ? { ...restaurant, restaurant_score: 12 } : (restaurant.Rating >= 4.5) ? { ...restaurant, restaurant_score: 9 } : (restaurant.Rating >= 4.3) ? { ...restaurant, restaurant_score: 6 } : (restaurant.Rating >= 4.1) ? { ...restaurant, restaurant_score: 4 } : (restaurant.Rating >= 3.8) ? { ...restaurant, restaurant_score: 2 } : { ...restaurant, restaurant_score: 1 }
          }) : 'Not selected',
          pub_calcs: formData.pubs_selection ? property.bars.map(pub => {
            return (pub.pub_category === 'Recommended' || pub.pub_category === 'Timeout100') ? { ...pub, pub_score: 100 } : (pub.pub_category === 'Worth a visit') ? { ...pub, pub_score: 50 } : { ...pub, pub_score: 5 }
          }) : 'Not selected',
          primaries_calcs: formData.primary_selection ? property.primaries.map(primary => {
            return (primary.ofsted_results === 'Outstanding') ? { ...primary, primary_score: 100 } : (primary.ofsted_results === 'Good') ? { ...primary, primary_score: 20 } : { ...primary, primary_score: 10 }
          }) : 'Not selected',
          tubes_calcs: formData.tube_selection ? property.tubes.map(tube => {
            return (formData.tube_distance === 0) ? { ...tube, tube_score: 0 } : (formData.tube_distance <= 15 && tube.walking_time_mins <= 5) ? { ...tube, tube_score: 1 } : (formData.tube_distance > 15 && tube.walking_time_mins <= (formData.tube_distance / 3)) ? { ...tube, tube_score: 1 } : (formData.tube_distance <= 15 && tube.walking_time_mins > 5) ? { ...tube, tube_score: 1 - (((tube.walking_time_mins - 5) / (formData.tube_distance - 5)) * 0.3) } : (formData.tube_distance > 15 && tube.walking_time_mins > 5) ? { ...tube, tube_score: 1 - ((tube.walking_time_mins - (formData.tube_distance * 0.33)) / (formData.tube_distance - (formData.tube_distance * 0.33)) * 0.3) } : { ...tube, tube_score: 0 }
          }) : 'Not selected',
          cafes_calcs: formData.cafes_selection ? property.cafes.map(cafe => {
            return (formData.cafes_decision === 'Specific' & formData.cafes_detail === cafe.cleansed_name) ? { ...cafe, cafe_score: 100 } : { ...cafe, cafe_score: 10 }
          }) : 'Not selected',
          supermarkets_calcs: formData.supermarket_selection ? property.supermarkets.map(supermarket => {
            return (formData.supermarket_segment === supermarket.segment) ? { ...supermarket, supermarket_match: 1 } : { ...supermarket, supermarket_match: 0 }
          }) : 'Not selected',
          parks_calcs: formData.park_selection ? property.parks.map(park => {
            return (formData.park_type === park.park_type) ? { ...park, park_match: 1 } : { ...park, park_match: 0 }
          }) : 'Not selected',
          gym_calcs: formData.gym_selection ? property.gyms.map(gym => {
            return (formData.gym_studio_name === gym.gym_group) ? { ...gym, gym_match: 1 } : { ...gym, gym_match: 0 }
          }) : 'Not selected',
          train_calcs: formData.train_selection && property.trains ? property.trains.map(train => {
            return (formData.train_distance === 0) ? { ...train, train_score: 0 } : (formData.train_distance <= 15 && train.walking_time_mins <= 5) ? { ...train, train_score: 1 } : (formData.train_distance > 15 && train.walking_time_mins <= (formData.train_distance / 3)) ? { ...train, train_score: 1 } : (formData.train_distance <= 15 && train.walking_time_mins > 5) ? { ...train, train_score: 1 - (((train.walking_time_mins - 5) / (formData.train_distance - 5)) * 0.3) } : (formData.train_distance > 15 && train.walking_time_mins > 5) ? { ...train, train_score: 1 - ((train.walking_time_mins - (formData.train_distance * 0.33)) / (formData.train_distance - (formData.train_distance * 0.33)) * 0.3) } : { ...train, train_score: 0 }
          }) : 'Not selected',
          secondaries_calcs: formData.secondary_selection ? property.secondaries.map(secondary => {
            return (secondary.ofsted_results === 'Outstanding') ? { ...secondary, secondary_score: 100 } : (secondary.ofsted_results === 'Good') ? { ...secondary, secondary_score: 20 } : { ...secondary, secondary_score: 10 }
          }) : 'Not selected',
          colleges_calcs: property.colleges ? property.colleges.map(college => {
            return (college.ofsted_results === 'Outstanding') ? { ...college, college_score: 100 } : (college.ofsted_results === 'Good') ? { ...college, college_score: 20 } : { ...college, college_score: 10 }
          }) : 'Not selected',
          takeaway_calcs: formData.takeaway_selection ? property.takeaways.map(restaurant => {
            return (restaurant.wittle_rating >= 9.6) ? { ...restaurant, takeaway_score: 15 } : (restaurant.wittle_rating >= 9.2) ? { ...restaurant, takeaway_score: 12 } : (restaurant.wittle_rating >= 9.0) ? { ...restaurant, takeaway_score: 9 } : (restaurant.wittle_rating >= 8.6) ? { ...restaurant, takeaway_score: 6 } : (restaurant.wittle_rating >= 8.2) ? { ...restaurant, takeaway_score: 4 } : (restaurant.wittle_rating >= 7.9) ? { ...restaurant, takeaway_score: 2 } : { ...restaurant, takeaway_score: 1 }
          }) : 'Not selected',
          workplace_score: formData.workplace_selection ? property.workplace.map(workplace => {
            return (formData.workplace_transport === 'Driving/ transport' & workplace.workplace_driving_mins <= formData.workplace_distance) ? (0.8 + (0.2 - ((workplace.workplace_driving_mins / formData.workplace_distance) * 0.2))) : (formData.workplace_transport === 'Driving/ transport' & workplace.workplace_driving_mins > formData.workplace_distance) ? 0.2
              : (formData.workplace_transport === 'Cycling' & workplace.workplace_cycling_mins <= formData.workplace_distance) ? (0.8 + (0.2 - ((workplace.workplace_cycling_mins / formData.workplace_distance) * 0.2))) : (formData.workplace_transport === 'Cycling' & workplace.workplace_cycling_mins > formData.workplace_distance) ? 0.2
                : (formData.workplace_transport === 'Walking' & workplace.workplace_walking_mins <= formData.workplace_distance) ? (0.8 + (0.2 - ((workplace.workplace_walking_mins / formData.workplace_distance) * 0.2))) : 0.2
          })[0] : 'Not selected',
          family1_score: formData.family_selection ? property.family1.map(workplace => {
            return (formData.family_mode_1 === 'Driving/ transport' & workplace.family_driving_mins <= formData.family_distance_1) ? (0.8 + (0.2 - ((workplace.family_driving_mins / formData.family_distance_1) * 0.2))) : (formData.family_mode_1 === 'Driving/ transport' & workplace.family_driving_mins > formData.family_distance_1) ? 0.2
              : (formData.family_mode_1 === 'Cycling' & workplace.family_cycling_mins <= formData.family_distance_1) ? (0.8 + (0.2 - ((workplace.family_cycling_mins / formData.family_distance_1) * 0.2))) : (formData.family_mode_1 === 'Cycling' & workplace.family_cycling_mins > formData.family_distance_1) ? 0.2
                : (formData.family_mode_1 === 'Walking' & workplace.family_walking_mins <= formData.family_distance_1) ? (0.8 + (0.2 - ((workplace.family_walking_mins / formData.family_distance_1) * 0.2))) : 0.2
          })[0] : 'Not selected',
          // property_images: [property.property_image_1, property.property_image_2],
          property_images: [
            { url: property.property_image_1 },
            { url: property.property_image_2 }
          ],
        }
      })
    console.log('calculation 5 ->', calculation)
    setCalc5(calculation)
  }

  // run calculation
  useEffect(() => {
    if (calc4)
      calculation5()
  }, [calc4])


  // Second key calculation that will give a total value for each variable per property that we can use to give a match %
  const calculation6 = () => {
    const calculation =
      calc5.map(property => {
        return {
          ...property,
          restaurant_total: property.restaurant_calcs !== 'Not selected' ? property.restaurant_calcs.reduce((a, v) => {
            return a + v.restaurant_score
          }, 0) : 'Not selected',
          pub_total: property.pub_calcs !== 'Not selected' ? property.pub_calcs.reduce((a, v) => {
            return a + v.pub_score
          }, 0) : 'Not selected',
          primaries_total: property.primaries_calcs !== 'Not selected' ? property.primaries_calcs.reduce((a, v) => {
            return a + v.primary_score
          }, 0) : 'Not selected',
          tubes_total: property.tubes_calcs !== 'Not selected' ? Math.max(...property.tubes_calcs.map(o => o.tube_score), 0) : 'Not selected',
          cafes_total: property.cafes_calcs !== 'Not selected' ? property.cafes_calcs.reduce((a, v) => {
            return a + v.cafe_score
          }, 0) : 'Not selected',
          supermarkets_total: property.supermarkets_calcs !== 'Not selected' ? property.supermarkets_calcs.reduce((a, v) => {
            return a + v.supermarket_match
          }, 0) : 'Not selected',
          parks_total: property.parks_calcs !== 'Not selected' ? property.parks_calcs.reduce((a, v) => {
            return a + v.park_match
          }, 0) : 'Not selected',
          gyms_total: property.gym_calcs !== 'Not selected' ? property.gym_calcs.reduce((a, v) => {
            return a + v.gym_match
          }, 0) : 'Not selected',
          trains_total: property.train_calcs !== 'Not selected' ? Math.max(...property.train_calcs.map(o => o.train_score), 0) : 'Not selected',
          secondaries_total: property.secondaries_calcs !== 'Not selected' ? property.secondaries_calcs.reduce((a, v) => {
            return a + v.secondary_score
          }, 0) : 'Not selected',
          colleges_total: property.colleges_calcs !== 'Not selected' ? property.colleges_calcs.reduce((a, v) => {
            return a + v.college_score
          }, 0) : 'Not selected',
          takeaway_total: property.takeaway_calcs !== 'Not selected' ? property.takeaway_calcs.reduce((a, v) => {
            return a + v.takeaway_score
          }, 0) : 'Not selected',
        }
      })
    console.log('calculation 6 ->', calculation)
    setCalc6(calculation)
  }

  // run calculation
  useEffect(() => {
    if (calc5)
      calculation6()
  }, [calc5])


  // Third key calculation that will allow us to establish the highest of each of the values, so we can create a %
  const calculation7 = () => {
    const calculation =
      calc6.map(property => {
        return {
          ...property,
          restaurant_max: property.restaurant_calcs !== 'Not selected' ? Math.max(...calc6.map(o => o.restaurant_total), 0) : 'Not selected',
          pub_max: property.pub_calcs !== 'Not selected' ? Math.max(...calc6.map(o => o.pub_total), 0) : 'Not selected',
          primaries_max: property.primaries_calcs !== 'Not selected' ? Math.max(...calc6.map(o => o.primaries_total), 0) : 'Not selected',
          secondaries_max: property.secondaries_calcs !== 'Not selected' ? Math.max(...calc6.map(o => o.secondaries_total), 0) : 'Not selected',
          colleges_max: property.colleges_calcs !== 'Not selected' ? Math.max(...calc6.map(o => o.colleges_total), 0) : 'Not selected',
          cafes_max: property.cafes_calcs !== 'Not selected' ? Math.max(...calc6.map(o => o.cafes_total), 0) : 'Not selected',
          takeaway_max: property.takeaway_calcs !== 'Not selected' ? Math.max(...calc6.map(o => o.takeaway_total), 0) : 'Not selected',
          restaurant_chosen: property.restaurant_total !== 'Not selected' ? 1 : 0,
          pub_chosen: property.pub_total !== 'Not selected' ? 1 : 0,
          primaries_chosen: property.primaries_total !== 'Not selected' ? 1 : 0,
          cafe_chosen: property.cafes_total !== 'Not selected' ? 1 : 0,
          tube_chosen: property.tubes_total !== 'Not selected' ? 1 : 0,
          supermarkets_chosen: property.supermarkets_total !== 'Not selected' ? 1 : 0,
          parks_chosen: property.parks_total !== 'Not selected' ? 1 : 0,
          gym_chosen: property.gyms_total !== 'Not selected' ? 1 : 0,
          secondary_chosen: property.secondaries_total !== 'Not selected' ? 1 : 0,
          college_chosen: property.colleges_total !== 'Not selected' ? 1 : 0,
          train_chosen: property.trains_total !== 'Not selected' ? 1 : 0,
          takeaway_chosen: property.takeaway_total !== 'Not selected' ? 1 : 0,
          workplace_chosen: property.workplace_score !== 'Not selected' ? 1 : 0,
          family1_chosen: property.family1_score !== 'Not selected' ? 1 : 0,
        }
      })
    console.log('calculation 7 ->', calculation)
    setCalc7(calculation)
  }

  // run calculation
  useEffect(() => {
    if (calc6)
      calculation7()
  }, [calc6])


  // Fourth key calculation that will give each variable a % score
  const calculation8 = () => {
    const calculation =
      calc7.map(property => {
        return {
          ...property,
          restaurant_perc: property.restaurant_calcs !== 'Not selected' ? property.restaurant_total / property.restaurant_max : 0,
          pub_perc: property.pub_calcs !== 'Not selected' ? property.pub_total / property.pub_max : 0,
          primary_perc: property.primaries_calcs !== 'Not selected' ? property.primaries_total / property.primaries_max : 0,
          tube_perc: property.tubes_calcs !== 'Not selected' ? property.tubes_total : 0,
          cafe_perc: property.cafes_calcs !== 'Not selected' ? property.cafes_total / property.cafes_max : 0,
          supermarket_perc: property.supermarkets_calcs !== 'Not selected' ? ((property.supermarkets.length > 3 & property.supermarkets_total > 0) ? 1 : (property.supermarkets.length > 2 & property.supermarkets_total > 0) ? 0.95 : (property.supermarkets.length > 1 & property.supermarkets_total > 0) ? 0.9 : (property.supermarkets.length > 0 & property.supermarkets_total > 0) ? 0.85 : (property.supermarkets.length > 3 & property.supermarkets_total === 0) ? 0.7 : (property.supermarkets.length > 2 & property.supermarkets_total === 0) ? 0.65 : (property.supermarkets.length > 1 & property.supermarkets_total === 0) ? 0.6 : (property.supermarkets.length > 0 & property.supermarkets_total === 0) ? 0.55 : 0) : 0,
          park_perc: property.parks_calcs !== 'Not selected' ? ((property.parks_total > 1) ? 1 : (property.parks_total > 0) ? 0.90 : (property.parks_total === 0) ? 0.75 : 0) : 0,
          gym_perc: property.gym_calcs !== 'Not selected' ? ((property.gyms_total > 0 & property.gyms.length > 2) ? 1 : (property.gyms_total > 0 & property.gyms.length > 1) ? 0.95 : (property.gyms_total > 0 & property.gyms.length > 0) ? 0.9 : (property.gyms_total === 0 & property.gyms.length > 4) ? 0.85 : (property.gyms_total === 0 & property.gyms.length > 3) ? 0.8 : (property.gyms_total === 0 & property.gyms.length > 2) ? 0.75 : (property.gyms_total === 0 & property.gyms.length > 1) ? 0.7 : (property.gyms_total === 0 & property.gyms.length > 0) ? 0.65 : 0) : 0,
          train_perc: property.train_calcs !== 'Not selected' ? property.trains_total : 0,
          secondary_perc: property.secondaries_calcs !== 'Not selected' ? property.secondaries_total / property.secondaries_max : 0,
          college_perc: property.colleges_calcs !== 'Not selected' ? property.colleges_total / property.colleges_max : 0,
          takeaway_perc: property.takeaway_calcs !== 'Not selected' ? property.takeaway_total / property.takeaway_max : 0,
          workplace_perc: property.workplace_score !== 'Not selected' ? property.workplace_score : 0,
          family1_perc: property.family1_score !== 'Not selected' ? property.family1_score : 0,
          options_chosen: property.restaurant_chosen + property.pub_chosen + property.primaries_chosen + property.cafe_chosen + property.tube_chosen + property.supermarkets_chosen + property.parks_chosen + property.gym_chosen + property.train_chosen + property.secondary_chosen + property.college_chosen + property.takeaway_chosen + property.workplace_chosen + property.family1_chosen,
        }
      })
    console.log('calculation 8 ->', calculation)
    setCalc8(calculation)
  }


  // run calculation
  useEffect(() => {
    if (calc7)
      calculation8()
  }, [calc7])


  // 5th key calculation that will give the total property a score
  const calculation9 = () => {
    const calculation =
      calc8.map(property => {
        return {
          ...property,
          first_match: parseInt(((property.restaurant_perc + property.pub_perc + property.primary_perc + property.tube_perc + property.cafe_perc + property.supermarket_perc + property.park_perc + property.gym_perc + property.train_perc + property.secondary_perc + property.college_perc + property.takeaway_perc + property.workplace_perc + property.family1_perc) / property.options_chosen) * 100),
          final_restaurant: parseFloat((property.restaurant_perc * 100).toFixed(0)),
          final_takeaway: parseFloat((property.takeaway_perc * 100).toFixed(0)),
          final_cafe: parseFloat((property.cafe_perc * 100).toFixed(0)),
          final_pub: parseFloat((property.pub_perc * 100).toFixed(0)),
          final_supermarket: parseFloat((property.supermarket_perc * 100).toFixed(0)),
          final_gym: parseFloat((property.gym_perc * 100).toFixed(0)),
          final_park: parseFloat((property.park_perc * 100).toFixed(0)),
          final_tube: parseFloat((property.tube_perc * 100).toFixed(0)),
          final_train: parseFloat((property.train_perc * 100).toFixed(0)),
          final_primary: parseFloat((property.primary_perc * 100).toFixed(0)),
          final_secondary: parseFloat((property.secondary_perc * 100).toFixed(0)),
          final_college: parseFloat((property.college_perc * 100).toFixed(0)),
          final_workplace: parseFloat((property.workplace_perc * 100).toFixed(0)),
          final_family1: parseFloat((property.family1_perc * 100).toFixed(0)),
        }
      }).sort((a, b) => b.first_match - a.first_match)
    console.log('calculation 9 ->', calculation)
    setCalc9(calculation)
  }

  // run calculation
  useEffect(() => {
    if (calc8)
      calculation9()
  }, [calc8])


  // Final key calculation that will rank each of the variables
  const calculation10 = () => {
    const restaurant_ranks = calc9.map(e => e.final_restaurant).sort((a, b) => b - a)
    const takeaway_ranks = calc9.map(e => e.final_takeaway).sort((a, b) => b - a)
    const pub_ranks = calc9.map(e => e.final_pub).sort((a, b) => b - a)
    const cafe_ranks = calc9.map(e => e.final_cafe).sort((a, b) => b - a)
    const supermarket_ranks = calc9.map(e => e.final_supermarket).sort((a, b) => b - a)
    const gym_ranks = calc9.map(e => e.final_gym).sort((a, b) => b - a)
    const park_ranks = calc9.map(e => e.final_park).sort((a, b) => b - a)
    const tube_ranks = calc9.map(e => e.final_tube).sort((a, b) => b - a)
    const train_ranks = calc9.map(e => e.final_train).sort((a, b) => b - a)
    const primary_ranks = calc9.map(e => e.final_primary).sort((a, b) => b - a)
    const secondary_ranks = calc9.map(e => e.final_secondary).sort((a, b) => b - a)
    const college_ranks = calc9.map(e => e.final_college).sort((a, b) => b - a)
    const workplace_ranks = calc9.map(e => e.final_workplace).sort((a, b) => b - a)
    const family1_ranks = calc9.map(e => e.final_family1).sort((a, b) => b - a)
    const average_score = calc9.reduce((a, v) => {
      return (a + v.first_match)
    }, 0) / calc9.length
    const calculation =
      calc9.map(property => {
        return {
          ...property,
          restaurant_rank: (restaurant_ranks.indexOf(property.final_restaurant) + 1),
          takeaway_rank: (takeaway_ranks.indexOf(property.final_takeaway) + 1),
          cafe_rank: (cafe_ranks.indexOf(property.final_cafe) + 1),
          pub_rank: (pub_ranks.indexOf(property.final_pub) + 1),
          supermarket_rank: (supermarket_ranks.indexOf(property.final_supermarket) + 1),
          gym_rank: (gym_ranks.indexOf(property.final_gym) + 1),
          park_rank: (park_ranks.indexOf(property.final_park) + 1),
          tube_rank: (tube_ranks.indexOf(property.final_tube) + 1),
          train_rank: (train_ranks.indexOf(property.final_train) + 1),
          primary_rank: (primary_ranks.indexOf(property.final_primary) + 1),
          secondary_rank: (secondary_ranks.indexOf(property.final_secondary) + 1),
          college_rank: (college_ranks.indexOf(property.final_college) + 1),
          workplace_rank: (workplace_ranks.indexOf(property.final_workplace) + 1),
          family1_rank: (family1_ranks.indexOf(property.final_family1) + 1),
          average_score: parseInt(average_score),
        }
      }).sort((a, b) => b.first_match - a.first_match)
    console.log('calculation 10 ->', calculation)
    setCalc10(calculation)
  }

  // run calculation
  useEffect(() => {
    if (calc9)
      calculation10()
  }, [calc9])


  // Update the search result with summary scores
  const calculation11 = async () => {
    if (isUserAuth())
      try {
        console.log('in the try - calculation 11')
        const newData = {
          top_score: calc10[parseInt(0)].first_match,
          average_score: calc10[parseInt(0)].average_score,
          total_properties: calc10.length,
          search_name: formData.search_name,
          owner: formData.owner,
          search_type: 'Wittle',
          search_channel: formData.search_channel,
        }
        console.log('search id ->', formData.result_id)
        const { data } = await axios.put(`/api/property-search/${parseInt(formData.result_id)}`, newData, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        window.localStorage.setItem('wittle-form-input', JSON.stringify(data))
        console.log('new form data (calculation 11) ->', data)
        setFormData(data)
      } catch (error) {
        console.log('in the catch - calculation 11')
        console.log(error)
      }
    else
      try {
        console.log('in the try - calculation 11')
        const newData = {
          top_score: calc10[parseInt(0)].first_match,
          average_score: calc10[parseInt(0)].average_score,
          total_properties: calc10.length,
          search_name: formData.search_name,
          owner: formData.owner,
          search_type: 'Wittle',
          search_channel: formData.search_channel,
        }
        console.log('search id ->', formData.result_id)
        const { data } = await axios.put(`/api/property-search/xplw7aq5r/${parseInt(formData.result_id)}`, newData)
        window.localStorage.setItem('wittle-form-input', JSON.stringify(data))
        console.log('new form data (calculation 11) ->', data)
        setFormData(data)
      } catch (error) {
        console.log('in the catch - calculation 11')
        console.log(error)
      }
    window.localStorage.setItem('wittle-results', JSON.stringify(finalProp))
  }

  // run calculation
  useEffect(() => {
    if (calc10)
      calculation11()
  }, [calc10])





  // ? Section 8: FAVOURITES - section toi handle favouriting and deleting properties from favourites
  // Favorite button handler
  const [favouriteError, setFavouriteError] = useState()

  const postFavourite = async (e) => {
    if (isUserAuth())
      if (listFavourites.includes(parseInt(e.target.id)))
        try {
          console.log('deleting favourite')
          const { data } = await axios.delete(`/api/favourites/${parseInt(e.target.id)}/`, {
            headers: {
              Authorization: `Bearer ${getAccessToken()}`,
            },
          })
          loadUserData()
        } catch (error) {
          console.log(error)
        }
      else
        try {
          const propertyData = calc10.filter(property => {
            return property.id === parseInt(e.target.id)
          })
          console.log('property to favourite', propertyData)
          console.log('form data to favourite ->', formData)
          const additionalData =
          {
            favourite: true,
            property: e.target.id,
            owner: parseInt(userData.id),
            property_name: propertyData[0].property_name,
            restaurant_score: propertyData[0].final_restaurant,
            takeaway_score: propertyData[0].final_takeaway,
            pubs_score: propertyData[0].final_pub,
            cafes_score: propertyData[0].final_cafe,
            tube_score: propertyData[0].final_tube,
            train_score: propertyData[0].final_train,
            primary_score: propertyData[0].final_primary,
            secondary_score: propertyData[0].final_secondary,
            college_score: propertyData[0].final_college,
            supermarket_score: propertyData[0].final_supermarket,
            gym_score: propertyData[0].final_gym,
            park_score: propertyData[0].final_park,
            workplace_score: propertyData[0].final_workplace,
            family1_score: propertyData[0].final_family1,
            total_score: propertyData[0].first_match,
            restaurant_input: formData.restaurant_distance,
            takeaway_input: formData.takeaway_distance,
            pubs_input: formData.pubs_distance,
            cafes_input: formData.cafes_distance,
            tube_input: formData.tube_distance,
            train_input: formData.train_distance,
            primary_input: formData.primary_distance,
            secondary_input: formData.secondary_distance,
            college_input: formData.college_distance,
            supermarket_input: formData.supermarket_distance,
            gym_input: formData.gym_distance,
            park_input: formData.park_distance,
            workplace_input: formData.workplace_distance,
            friends_input: formData.family_distance_1,
            restaurant_selection: formData.restaurant_selection,
            takeaway_selection: formData.takeaway_selection,
            pubs_selection: formData.pubs_selection,
            cafes_selection: formData.cafes_selection,
            tube_selection: formData.tube_selection,
            train_selection: formData.train_selection,
            primary_selection: formData.primary_selection,
            secondary_selection: formData.secondary_selection,
            college_selection: formData.college_selection,
            supermarket_selection: formData.supermarket_selection,
            gym_selection: formData.gym_selection,
            park_selection: formData.park_selection,
            workplace_selection: formData.workplace_selection,
            friends_selection: formData.family_selection,
          }
          const { data } = await axios.post('/api/favourites/', additionalData, {
            headers: {
              Authorization: `Bearer ${getAccessToken()}`,
            },
          })
          console.log('favourited data ->',data)
          loadUserData()
        } catch (error) {
          console.log(error)
        }
    else
      try {
        setFavouriteError(true)
        console.log('must have an account to favourite')
      } catch (error) {
        console.log('error')
      }
  }


  // ? Section 9: MODALS - section for managing the numerous modals on the page
  // * Modal 1 - Map mdoal
  // Setting state and handles for submit modal
  const [mapShow, setMapShow] = useState(false)

  // closing thee modal
  const handleMapClose = () => {
    setMapShow(false)
    setViewport(viewport)
  }

  // showing the modal
  const handleMapShow = () => setMapShow(true)

  // control the states for maps
  const [viewport, setViewport] = useState({
    latitude: 51.515419,
    longitude: -0.141099,
    zoom: 10.5,
  })

  // state for showing map property detail
  const [mapPropertyShow, setMapProperty] = useState(false)

  // function for closing the map detail modal
  const handleMapDetailClose = () => {
    setMapProperty(false)
  }

  // state for showing the map detail
  const handleMapDetailShow = () => setMapProperty(true)

  // states for handling the popups on the map
  const [showPopup, setShowPopup] = useState(true)
  const [iconId, setIconId] = useState()
  // const openDetail = () => setbuttonActive(!buttonActive)

  const iconSetting = (e) => {
    setShowPopup(true)
    console.log(showPopup)
    setIconId(parseInt(e.target.id))
    console.log(parseInt(e.target.id))
  }


  // * Modal 2 - Insights modal
  // set state for showing insights modal
  const [insightShow, setInsightShow] = useState(false)

  // state for toggling the results in the insights modal
  const [insightToggle, setInsightToggle] = useState({
    selection: '',
  })

  // close modal
  const handleInsightClose = () => {
    setInsightShow(false)
  }

  // show the modal
  const handleInsightShow = (e) => {
    setInsightShow(true)
    setInsightToggle({ ...insightToggle, selection: 'rank' })
    setCurrentId(parseInt(e.target.id))
  }

  // set current id on click
  const setID = e => {
    setCurrentId(parseInt(e.target.id))
    console.log('property id ->', e.target.id)
    console.log('match score ->', e.target.value)
    window.localStorage.setItem('wittle-current-match', JSON.stringify(e.target.id))
  }


  // dropdown for insight summary
  const insightChange = e => {
    setInsightToggle({ ...insightToggle, [e.target.name]: e.target.value })
  }

  //  Managing statez for modal to see search details in mobile view
  // set state for showing the modal
  const [searchShow, setSearchShow] = useState(false)

  // set state for closing the modal
  const handleSearchClose = () => {
    setSearchShow(false)
  }

  // set state for the modal popping up
  const handleSearchShow = () => {
    setSearchShow(true)
  }



  // * Modal 3: Edit search modal
  // set state for showing edit modal
  const [editShow, setEditShow] = useState(false)

  // close modal
  const handleEditClose = () => {
    setEditShow(false)
  }

  // show the modal
  const handleEditShow = (e) => {
    setEditSearch(formData)
    // console.log('edit parameters ->', result)
    setEditShow(true)
  }

  // function for posting an edit to the search
  const postEditSearch = async (e) => {
    try {
      const formData = {
        owner: editSearch.owner,
        start_search: editSearch.start_search,
        search_name: editSearch.search_name,
        search_type: 'Wittle',
        search_channel: editSearch.search_channel,
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
        family_mode_1: editSearch.family_mode_1,
        family_mode_2: editSearch.family_mode_2,
        family_mode_3: editSearch.family_mode_3,
        property_price_min: editSearch.property_price_min,
        property_price_max: editSearch.property_price_max,
        property_bed_min: editSearch.property_bed_min,
        property_bed_max: editSearch.property_bed_max,
        property_type: editSearch.property_type,
      }
      console.log(e.target.value)
      const { data } = await axios.put(`/api/property-search/${e.target.value}`, formData, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      window.localStorage.setItem('wittle-form-input', JSON.stringify(data))
      console.log('new form data->', data)
      setFormData(data)
      window.location.reload()
      setEditShow(false)
    } catch (error) {
      console.log(error)
    }
  }

  // Managing states for the drop down menus of stations and lines to be used in the edit search modal
  // states for holding the tube information
  const [tubeDataset, setTubeDataset] = useState([])
  const [stations, setStations] = useState([])
  const [lines, setLines] = useState([])

  // states for holding the train information
  const [trains, setTrains] = useState([])
  const [trainStations, setTrainStations] = useState([])

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


  // ? Section 10: Creating a carousel for the images to scroll on click or swipe
  // creating the calculation for the image to rotate between the different values
  const imageClick = (e) => {
    console.log(e.target.id)
    if (imageTracking === 1) {
      setImageTracking(2)
      // const currentProperty = 
      //   calc10.filter(property => {
      //     return (property.id === e.target.id)
      //   })
      // console.log(currentProperty)
      setCurrentImage(calc10[0].property_image_2)
      setCurrentId(e.target.id)
    } else if (imageTracking === 2) {
      setImageTracking(1)
      setCurrentImage(calc10[0].property_image_1)
      setCurrentId(e.target.id)
    }
  }

  const slideImages = [
    'https://res.cloudinary.com/ddqsv9w3r/image/upload/v1668765057/wittle/property_images/Property-outside-4_q6nccu.jpg',
    'https://res.cloudinary.com/ddqsv9w3r/image/upload/v1668765053/wittle/property_images/Property-interiror-4png_sy6ky0.jpg'
  ]


  return (
    <>
      <section className='property-detail-pages'>
        <NavBar />
        {calc10 ?
          <section className='property-main-page'>
            {sidebar === 'Open' ?
              <section className='title-section' id='form-buttons'>
                <div className='logo-section'>
                  <div className='logo'>
                    <h2 onClick={() => navigate('/')}>Wittle</h2>
                  </div>
                </div>
                <h3>Search details &gt;</h3>
                <div className='input-sections'>
                  <h5>Property</h5>
                  <div className='poi'><p>Type: {formData.property_type}</p></div>


                  <div className='poi'><p>Price: <NumericFormat value={formData.property_price_min} displayType={'text'} thousandSeparator={true} prefix={'£'} /> - <NumericFormat value={formData.property_price_max} displayType={'text'} thousandSeparator={true} prefix={'£'} /> </p></div>
                  <div className='poi'><p>Bedrooms: {formData.property_bed_min} - {formData.property_bed_max}</p></div>
                </div>
                <div className='input-sections'>
                  <h5>Points of interest</h5>
                  {formData.restaurant_selection ? <div className='poi'><p>👨‍🍳 Restaurants: {formData.restaurant_distance} min walk</p></div> : ''}
                  {formData.takeaway_selection ? <div className='poi'><p>🍜 Takeaways: {formData.takeaway_distance} min walk</p></div> : ''}
                  {formData.cafes_selection ? <div className='poi'><p>☕️ Cafes: {formData.cafes_distance} min walk</p></div> : ''}
                  {formData.pubs_selection ? <div className='poi'><p>🍻 Pubs: {formData.pubs_distance} min walk</p></div> : ''}
                  {formData.supermarket_selection ? <div className='poi'><p>🛒 Supermarkets: {formData.supermarket_distance} min walk</p></div> : ''}
                  {formData.gym_selection ? <div className='poi'><p>🏋️‍♂️ Gyms: {formData.gym_distance} min walk</p></div> : ''}
                  {formData.park_selection ? <div className='poi'><p>🌳 Park: {formData.park_distance} min walk</p></div> : ''}
                  {formData.workplace_selection ? <div className='poi'><p>✍🏼 Office: {formData.workplace_distance} min walk</p></div> : ''}
                  {formData.tube_selection ? <div className='poi'><p>🚇 Tube stations: {formData.tube_distance} min walk</p></div> : ''}
                  {formData.train_selection ? <div className='poi'><p>🚅 Train stations: {formData.train_distance} min walk</p></div> : ''}
                  {formData.primary_selection ? <div className='poi'><p>🏫 Primary schools: {formData.primary_distance} min walk</p></div> : ''}
                  {formData.secondary_selection ? <div className='poi'><p>🏫 Secondary schools: {formData.secondary_distance} min walk</p></div> : ''}
                  {formData.college_distance ? <div className='poi'><p>🏫 6th forms: {formData.college_distance} min walk</p></div> : ''}
                  {formData.family_distance_1 ? <div className='poi'><p>👨‍👩‍👧‍👦 Friends & family: {formData.family_distance_1} min walk</p></div> : ''}
                </div>
                <button onClick={handleEditShow} className='edit-button'>Edit</button>
                <div className='sidebar-button'>
                  <button onClick={() => sidebar === 'Open' ? setSidebar('Close') : sidebar}>&#60;</button>
                </div>
              </section>
              :
              sidebar === 'Close' ?
                <section className='title-section' style={{ width: '0px' }} id='form-buttons'>
                  <div className="closed-sidebar">
                    <div className='sidebar-button'>
                      {/* <button onClick={() => sidebar === 'Close' ? setSidebar('Open') : sidebar}>&#62;</button> */}
                    </div>
                  </div>
                </section>
                : ''}
            {calc10 ? sidebar === 'Open' ?
              <>
                <section className='property-results' style={{ marginLeft: '200px' }}>
                  <div className='property-results-title'>
                    <div className='title-buttons'>
                      <button className='modal-map' onClick={handleMapShow} data-toggle='modal' >View on map</button>
                    </div>
                    <div className='title-centre'>
                      {isUserAuth ? <h1 className='property-count'>{formData.search_name}: {calc10.length} properties</h1> : <h1 className='property-count'>Wittle Search: {calc10.length} properties</h1>}
                    </div>
                  </div>
                  <div className='property-grid'>
                    {calc10.map((property, index) => {
                      return (
                        <>
                          {/* <div className='property-card' key={index} onClick={setID} id={property.first_match} name={index}> */}
                          <div className='property-card' key={index} id={property.first_match} name={index}>
                            <div className='mobile-name'>
                              <h2>{property.property_name}</h2>
                              <h4 onClick={handleInsightShow} id={property.id}>🔥 {property.first_match}% match</h4>
                            </div>
                            <div className='slide-section-desktop'>

                              <Slide className='slide-import' autoplay={false} transitionDuration={750} arrows={true} indicators={true}>
                                {property.property_images.map((images, index) => {
                                  return (
                                    <>
                                      <div className='image-card' id={property.id} style={{ backgroundImage: `url('${images.url}')` }} key={index}>
                                        <div className='property-image-details'>
                                          {formData.search_channel === 'Renting' ?
                                            <h3><NumericFormat value={property.monthly} displayType={'text'} thousandSeparator={true} prefix={'£'} /> pcm</h3>
                                            :
                                            <h3>Fixed Price: <NumericFormat value={property.value} displayType={'text'} thousandSeparator={true} prefix={'£'} /> </h3>
                                          }
                                        </div>
                                        {listFavourites ?
                                          <div className='favourite-section' id={property.id} onClick={postFavourite}>
                                            {listFavourites.includes(property.id) ?
                                              <div className='favourite-button-on' id={property.id} ></div>
                                              :
                                              <div className='favourite-button-off' id={property.id} ></div>
                                            }
                                          </div>
                                          : ''}
                                      </div>
                                    </>
                                  )
                                })}
                              </Slide>

                            </div>
                            {/* <div className='detail-section' onClick={setID} id={property.first_match}> */}
                            <div className='detail-section' id={property.first_match}>
                              <Link to={(`/wittle-results/${property.id}`)} style={{ textDecoration: 'none' }}><h2 className='property-desktop' onClick={(e) => window.localStorage.setItem('wittle-current-match', JSON.stringify(e.target.id))} id={property.first_match}>{property.property_name}</h2></Link>
                              <h4 className='property-desktop' id={property.id} onClick={handleInsightShow}>🔥 {property.first_match}% match</h4>
                              <div className='property-buttons'>
                                <h5 onClick={() => setPropertyButtons('Insights')} style={{ color: propertyButtons === 'Insights' ? '#FFA7E5' : '#051885' }}>Insights</h5>
                                <h5 onClick={() => setPropertyButtons('Description')} style={{ color: propertyButtons === 'Description' ? '#FFA7E5' : '#051885' }}>Description</h5>
                                <h5 onClick={() => setPropertyButtons('Floorplan')} style={{ color: propertyButtons === 'Floorplan' ? '#FFA7E5' : '#051885' }}>Floorplan</h5>
                                <h5 onClick={() => setPropertyButtons('Documents')} style={{ color: propertyButtons === 'Documents' ? '#FFA7E5' : '#051885' }}>Documents</h5>
                              </div>
                              <div className='property-button-expansion'>
                                {propertyButtons === 'Description' ?
                                  <>
                                    <div className='description-stats'>
                                      <p className='description-text'>Type: {property.type}</p>
                                      <p className='description-text'>Bedrooms: {property.bedrooms}</p>
                                      <p className='description-text'>Bathrooms: 2</p>
                                    </div>
                                    <p className='description-text'>{property.property_description}</p>
                                  </>
                                  : ''}
                                {propertyButtons === 'Insights' ?
                                  <>
                                    {formData.restaurant_selection & property.restaurant_chosen === 1 ? <p className='insight-bullets'>👨‍🍳 {property.restaurants.length} restaurants <span>(within {formData.restaurant_distance} min walk)</span></p> : ''}
                                    {formData.pubs_selection & property.pub_chosen === 1 ? <p className='insight-bullets'>🍻{property.bars.length} bars <span>(within {formData.pubs_distance} min walk)</span></p> : ''}
                                    {formData.cafes_selection & property.cafe_chosen === 1 ? <p className='insight-bullets'>☕️ {property.cafes.length} cafes <span>(within {formData.cafes_distance} min walk)</span></p> : ''}
                                    {formData.takeaway_selection & property.takeaway_chosen === 1 ? <p className='insight-bullets'>☕️ {property.takeaways.length} takeaways <span>(within {formData.takeaway_distance} min walk)</span></p> : ''}
                                    {formData.primary_selection & property.primaries_chosen === 1 ? <p className='insight-bullets'>🏫 {property.primaries.length} primary schools <span>(within {formData.primary_distance} min walk)</span></p> : ''}
                                    {formData.secondary_selection & property.secondary_chosen === 1 ? <p className='insight-bullets'>🏫 {property.secondaries.length} secondary schools <span>(within {formData.secondary_distance} min walk)</span></p> : ''}
                                    {formData.college_selection & property.college_chosen === 1 ? <p className='insight-bullets'>🏫 {property.colleges.length} 6th forms <span>(within {formData.college_distance} min walk)</span></p> : ''}
                                    {formData.supermarket_selection & property.supermarkets_chosen === 1 ? <p className='insight-bullets'>🛒 {property.supermarkets.length} supermarkets <span>(within {formData.supermarket_distance} min walk)</span></p> : ''}
                                    {formData.gym_selection & property.gym_chosen === 1 ? <p className='insight-bullets'>🏋️‍♂️ {property.gyms.length} gyms <span>(within {formData.gym_distance} min walk)</span></p> : ''}
                                    {formData.park_selection & property.parks_chosen === 1 ? <p className='insight-bullets'>🌳 {property.parks.length} parks <span>(within {formData.park_distance} min walk)</span></p> : ''}
                                    {formData.workplace_selection & property.workplace_chosen === 1 & formData.workplace_transport === 'Driving/ transport' ? <p className='insight-bullets'>🏢 Office <span>({property.workplace_extra.workplace_driving_mins} mins drive)</span></p> : formData.workplace_selection & property.workplace_chosen === 1 & formData.workplace_transport === 'Cycling' ? <p className='insight-bullets'>🏢 Office <span>({property.workplace_extra.workplace_cycling_mins} mins cycle)</span></p> : formData.workplace_selection & property.workplace_chosen === 1 & formData.workplace_transport === 'Walking' ? <p className='insight-bullets'>🏢 Office <span>({property.workplace_extra.workplace_walking_mins} mins walk)</span></p> : ''}
                                    {formData.family_selection & property.family_chosen === 1 & formData.family_mode_1 === 'Driving/ transport' ? <p className='insight-bullets'>👨‍👩‍👧‍👦 Friends & Fam <span>({property.family1_extra.family1_driving_mins} mins drive)</span></p> : formData.family_selection & property.family1_chosen === 1 & formData.family_mode_1 === 'Cycling' ? <p className='insight-bullets'>👨‍👩‍👧‍👦 Friends & Fam <span>({property.family1_extra.family1_cycling_mins} mins cycle)</span></p> : formData.family_selection & property.family1_chosen === 1 & formData.family_mode_1 === 'Walking' ? <p className='insight-bullets'>👨‍👩‍👧‍👦 Friends & Fam <span>({property.family1_extra.family_walking_mins} mins walk)</span></p> : ''}
                                    {formData.tube_selection & property.tube_chosen === 1 ? <p className='insight-bullets'>🚇 {property.tubes.length} tube stations <span>(within {formData.tube_distance} min walk)</span></p> : ''}
                                    {formData.train_selection & property.train_chosen === 1 ? <p className='insight-bullets'>🚊 {property.trains.length} train stations <span>(within {formData.train_distance} min walk)</span></p> : ''}
                                  </>
                                  : ''}
                              </div>
                            </div>
                          </div>
                          <hr className='mobile-line' />
                        </>
                      )
                    })}
                  </div>
                </section>
              </>
              :
              sidebar === 'Close' ?
                <>
                  <section className='property-results' id='close' style={{ marginLeft: '0px' }}>
                    <div className='property-results-title'>
                      <div className='title-buttons'>
                        <button className='filter-button' onClick={() => sidebar === 'Close' ? setSidebar('Open') : sidebar}>My filters</button>
                        <button className='modal-map' onClick={handleMapShow} data-toggle='modal' >View on map</button>
                        <button className='mobile-filter-button' onClick={handleSearchShow}>My filters</button>

                      </div>
                      <div className='title-centre'>
                        {calc10 && isUserAuth ? <h1 className='property-count'>{formData.search_name}: {calc10.length} properties</h1> : calc10 && !isUserAuth ? <h1 className='property-count'>Wittle : {calc10.length} properties</h1> : ''}
                      </div>
                    </div>
                    <div className='property-grid'>
                      {calc10.map((property, index) => {
                        return (
                          <>
                            <div className='property-card' key={index} id={property.first_match} name={index}>
                              <div className='mobile-name' >
                                <Link to={(`/wittle-results/${property.id}`)} style={{ textDecoration: 'none' }}>
                                  <div className='name-box'>
                                    <h2 id={property.first_match} onClick={(e) => window.localStorage.setItem('wittle-current-match', JSON.stringify(e.target.id))}>{property.property_name}</h2>
                                  </div>
                                </Link>
                                <h4 onClick={handleInsightShow} id={property.id}>🔥 {property.first_match}% match</h4>
                              </div>
                              {/* <ImageSlider calc10={calc10} formData={formData} listFavourites={listFavourites} postFavourite={postFavourite} /> */}
                              <div className='slide-section-desktop'>

                                <Slide className='slide-import' autoplay={false} transitionDuration={750} arrows={true} indicators={true}>
                                  {property.property_images.map((images, index) => {
                                    return (
                                      <>
                                        <div className='image-card' id={property.id} style={{ backgroundImage: `url('${images.url}')` }} key={index}>
                                          <div className='property-image-details'>
                                            {formData.search_channel === 'Renting' ?
                                              <h3><NumericFormat value={property.monthly} displayType={'text'} thousandSeparator={true} prefix={'£'} /> pcm</h3>
                                              :
                                              <h3>Fixed Price: <NumericFormat value={property.value} displayType={'text'} thousandSeparator={true} prefix={'£'} /> </h3>
                                            }
                                          </div>
                                          {listFavourites ?
                                            <div className='favourite-section' id={property.id} onClick={postFavourite}>
                                              {listFavourites.includes(property.id) ?
                                                <div className='favourite-button-on' id={property.id} ></div>
                                                :
                                                <div className='favourite-button-off' id={property.id} ></div>
                                              }
                                            </div>
                                            : ''}
                                        </div>
                                      </>
                                    )
                                  })}
                                </Slide>

                              </div>
                              <div className='slide-section-mobile'>

                                <Slide className='slide-import' autoplay={false} transitionDuration={500} arrows={false} indicators={true}>
                                  {property.property_images.map((images, index) => {
                                    return (
                                      <>
                                        <div className='image-card' id={property.id} style={{ backgroundImage: `url('${images.url}')` }} key={index}>
                                          <div className='property-image-details'>
                                            {formData.search_channel === 'Renting' ?
                                              <h3><NumericFormat value={property.monthly} displayType={'text'} thousandSeparator={true} prefix={'£'} /> pcm</h3>
                                              :
                                              <h3>Fixed Price: <NumericFormat value={property.value} displayType={'text'} thousandSeparator={true} prefix={'£'} /> </h3>
                                            }
                                          </div>
                                          {listFavourites ?
                                            <div className='favourite-section' id={property.id} onClick={postFavourite}>
                                              {listFavourites.includes(property.id) ?
                                                <div className='favourite-button-on' id={property.id} ></div>
                                                :
                                                <div className='favourite-button-off' id={property.id} ></div>
                                              }
                                            </div>
                                            : ''}
                                        </div>
                                      </>
                                    )
                                  })}
                                </Slide>


                              </div>
                              <div className='detail-section' id={property.first_match}>
                                {/* <Link to={(`/wittle-results/${property.id}`)} style={{ textDecoration: 'none' }}><h2 className='property-desktop' id={property.first_match}>{property.property_name}</h2></Link> */}
                                <Link to={(`/wittle-results/${property.id}`)} style={{ textDecoration: 'none' }}>
                                  <div className='name-box'>
                                    <h2 className='property-desktop' id={property.first_match} onClick={(e) => window.localStorage.setItem('wittle-current-match', JSON.stringify(e.target.id))}>{property.property_name}</h2>
                                  </div>
                                </Link>
                                <h4 onClick={handleInsightShow} id={property.id} className='property-desktop'>🔥 {property.first_match}% match</h4>
                                <div className='property-buttons'>
                                  <h5 onClick={() => setPropertyButtons('Insights')} style={{ color: propertyButtons === 'Insights' ? '#FFA7E5' : '#051885' }}>Insights</h5>
                                  <h5 onClick={() => setPropertyButtons('Description')} style={{ color: propertyButtons === 'Description' ? '#FFA7E5' : '#051885' }}>Description</h5>
                                  <h5 onClick={() => setPropertyButtons('Floorplan')} style={{ color: propertyButtons === 'Floorplan' ? '#FFA7E5' : '#051885' }}>Floorplan</h5>
                                  <h5 onClick={() => setPropertyButtons('Documents')} style={{ color: propertyButtons === 'Documents' ? '#FFA7E5' : '#051885' }}>Documents</h5>
                                </div>
                                <div className='property-button-expansion'>
                                  {propertyButtons === 'Description' ?
                                    <>
                                      <div className='description-stats'>
                                        <p className='description-text'>Type: {property.type}</p>
                                        <p className='description-text'>Bedrooms: {property.bedrooms}</p>
                                        <p className='description-text'>Bathrooms: 2</p>
                                      </div>
                                      <p className='description-text'>{property.property_description}</p>
                                    </>
                                    : ''}
                                  {propertyButtons === 'Insights' ?
                                    <>
                                      {formData.restaurant_selection & property.restaurant_chosen === 1 ? <p className='insight-bullets'>👨‍🍳 {property.restaurants.length} restaurants <span>(within {formData.restaurant_distance} min walk)</span></p> : ''}
                                      {formData.pubs_selection & property.pub_chosen === 1 ? <p className='insight-bullets'>🍻{property.bars.length} bars <span>(within {formData.pubs_distance} min walk)</span></p> : ''}
                                      {formData.cafes_selection & property.cafe_chosen === 1 ? <p className='insight-bullets'>☕️ {property.cafes.length} cafes <span>(within {formData.cafes_distance} min walk)</span></p> : ''}
                                      {formData.takeaway_selection & property.takeaway_chosen === 1 ? <p className='insight-bullets'>☕️ {property.takeaways.length} takeaways <span>(within {formData.takeaway_distance} min walk)</span></p> : ''}
                                      {formData.primary_selection & property.primaries_chosen === 1 ? <p className='insight-bullets'>🏫 {property.primaries.length} primary schools <span>(within {formData.primary_distance} min walk)</span></p> : ''}
                                      {formData.secondary_selection & property.secondary_chosen === 1 ? <p className='insight-bullets'>🏫 {property.secondaries.length} secondary schools <span>(within {formData.secondary_distance} min walk)</span></p> : ''}
                                      {formData.college_selection & property.college_chosen === 1 ? <p className='insight-bullets'>🏫 {property.colleges.length} 6th forms <span>(within {formData.college_distance} min walk)</span></p> : ''}
                                      {formData.supermarket_selection & property.supermarkets_chosen === 1 ? <p className='insight-bullets'>🛒 {property.supermarkets.length} supermarkets <span>(within {formData.supermarket_distance} min walk)</span></p> : ''}
                                      {formData.gym_selection & property.gym_chosen === 1 ? <p className='insight-bullets'>🏋️‍♂️ {property.gyms.length} gyms <span>(within {formData.gym_distance} min walk)</span></p> : ''}
                                      {formData.park_selection & property.parks_chosen === 1 ? <p className='insight-bullets'>🌳 {property.parks.length} parks <span>(within {formData.park_distance} min walk)</span></p> : ''}
                                      {formData.workplace_selection & property.workplace_chosen === 1 & formData.workplace_transport === 'Driving/ transport' ? <p className='insight-bullets'>🏢 Office <span>({property.workplace_extra.workplace_driving_mins} mins drive)</span></p> : formData.workplace_selection & property.workplace_chosen === 1 & formData.workplace_transport === 'Cycling' ? <p className='insight-bullets'>🏢 Office <span>({property.workplace_extra.workplace_cycling_mins} mins cycle)</span></p> : formData.workplace_selection & property.workplace_chosen === 1 & formData.workplace_transport === 'Walking' ? <p className='insight-bullets'>🏢 Office <span>({property.workplace_extra.workplace_walking_mins} mins walk)</span></p> : ''}
                                      {formData.family_selection & property.family_chosen === 1 & formData.family_mode_1 === 'Driving/ transport' ? <p className='insight-bullets'>👨‍👩‍👧‍👦 Friends & Fam <span>({property.family1_extra.family1_driving_mins} mins drive)</span></p> : formData.family_selection & property.family1_chosen === 1 & formData.family_mode_1 === 'Cycling' ? <p className='insight-bullets'>👨‍👩‍👧‍👦 Friends & Fam <span>({property.family1_extra.family1_cycling_mins} mins cycle)</span></p> : formData.family_selection & property.family1_chosen === 1 & formData.family_mode_1 === 'Walking' ? <p className='insight-bullets'>👨‍👩‍👧‍👦 Friends & Fam <span>({property.family1_extra.family_walking_mins} mins walk)</span></p> : ''}
                                      {formData.tube_selection & property.tube_chosen === 1 ? <p className='insight-bullets'>🚇 {property.tubes.length} tube stations <span>(within {formData.tube_distance} min walk)</span></p> : ''}
                                      {formData.train_selection & property.train_chosen === 1 ? <p className='insight-bullets'>🚊 {property.trains.length} train stations <span>(within {formData.train_distance} min walk)</span></p> : ''}
                                    </>
                                    : ''}
                                </div>
                              </div>
                            </div>
                            <hr className='mobile-line' />
                          </>
                        )
                      })}
                    </div>
                  </section>
                </>
                : '' : ''}
          </section>
          :
          // formData === undefined ?
          //   <>
          //     <section className='loading-screen'>
          //       <h1>Wittle data missing</h1>
          //       <h3>You need to make a Wittle search to see the content here.</h3>
          //       <button onClick={() => navigate('/wittle-search')}>Start Wittling</button>
          //     </section>
          //   </>
          //   :
          <>
            <section className='loading-screen'>
              <h1>Wittle magic loading...</h1>
              <h3>Sit tight while the algorithm does its work. This usually takes about a minute the first time you search.</h3>
              {/* <div className='loading-gif'></div> */}
              <Loading />

            </section>
          </>
        }
      </section>

      <div className='property-map-detail'>
        <Modal show={mapShow} onHide={handleMapClose} backdrop='static' className='map-modal'>
          <Modal.Body>
            {calc10 ?
              <>
                <div className='map-header'>
                  <h3 className='map-title'>{formData.search_name}: {calc10.length} properties</h3>
                  <button onClick={handleMapClose}>Close map</button>
                </div>
                <ReactMapGL {...viewport}
                  mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                  mapStyle='mapbox://styles/mapbox/streets-v11'
                  onViewportChange={viewport => {
                    setViewport(viewport)
                  }}
                  center={viewport}
                  onMove={evt => setViewport(evt.viewport)}>
                  {calc10 ?
                    <div className='poi-icons'>
                      {calc10.map((property, index) => {
                        return (
                          <div key={property.id}>
                            <>
                              <Marker longitude={property.long} latitude={property.Lat} key={index} titleAccess={property.property_name} id='house-icon' >
                                <div className='house-btn' onClick={() => navigate(`/wittle-results/${property.id}`)} id={property.id} onMouseEnter={iconSetting}>

                                </div>
                              </Marker>
                              {(showPopup & property.id === iconId) && (
                                <Popup key={index} id={property.id} longitude={property.long} latitude={property.Lat} closeOnClick={false}>
                                  <div className='property-popup'>
                                    <div className='property-image' style={{ backgroundImage: `url('${property.property_image_1}')` }}>

                                    </div>
                                    <div className='property-details'>
                                      <h1>{property.property_name}</h1>
                                      <h4>{property.first_match}% match</h4>
                                      <h4><NumericFormat value={property.value} displayType={'text'} thousandSeparator={true} prefix={'£'} /> offers over</h4>
                                    </div>

                                  </div>

                                </Popup>

                              )}
                            </>
                          </div>
                        )
                      })}

                    </div>
                    : ''}
                </ReactMapGL>
              </>
              : ''}

          </Modal.Body>
        </Modal>
      </div>
      <div className='property-insights-container'>
        <Modal show={insightShow} onHide={handleInsightClose} backdrop='static' className='insights-modal'>
          <Modal.Body>
            {calc10 ?
              <>
                <div className='insights-body'>
                  {calc10.filter(property => property.id === currentId).map((property, index) => {
                    return (
                      <>
                        <div className='insights-modal-header'>
                          <h3 className='insights-title'>Property insight summary</h3>
                          <button onClick={handleInsightClose} className='insights-modal-close'>Close</button>
                        </div>
                        <div className='insights-modal-title' key={index}>
                          <h3 className='insights-property-name'>{property.property_name}</h3>
                          <h3 className='insights-match'>🔥 {property.first_match}% match</h3>
                        </div>
                        <div className='insights-modal-sub-title'>
                          <h5>Variable</h5>
                          <select className='insight-toggle' name='selection' onChange={insightChange}>
                            <option>Rank</option>
                            <option>Match %</option>
                          </select>
                        </div>
                        <div className='insights-modal-content'>
                          {/* restaurant bars */}
                          {formData.restaurant_selection ?
                            <div className='insights-modal-results'>
                              <h4 className='insights-modal-variables'>👨‍🍳 Restaurants</h4>
                              <div className='insights-modal-right'>
                                {property.restaurants.length > 0 ?
                                  <div className='bar-container'>
                                    {[...Array(property.final_restaurant)].map((choice, index) => {
                                      return (
                                        <div className='bars' key={index} >
                                          <div>.</div>
                                        </div>
                                      )
                                    })}
                                    {
                                      [...Array(100 - property.final_restaurant)].map((choice, index) => {
                                        return (
                                          <div className='blank-bars' key={index} >
                                            <div>.</div>
                                          </div>
                                        )
                                      })
                                    }
                                  </div>
                                  :
                                  <div className='bar-container'>
                                    <h5>😕 No restaurants within {formData.restaurant_distance} min walk from this property</h5>
                                  </div>
                                }
                                {insightToggle.selection === 'Match %' ? <h4 className='insights-modal-score'>{property.final_restaurant}%</h4> : <h4 className='insights-modal-score'>#{property.restaurant_rank}</h4>}
                              </div>
                            </div>
                            : ''}

                          {/* takeaways bars */}
                          {formData.takeaway_selection ?
                            <div className='insights-modal-results'>
                              <h4 className='insights-modal-variables'>🍜 Takeaways</h4>
                              <div className='insights-modal-right'>
                                {property.takeaways.length > 0 ?
                                  <div className='bar-container'>
                                    {[...Array(property.final_takeaway)].map((choice, index) => {
                                      return (
                                        <div className='bars' key={index} >
                                          <div>.</div>
                                        </div>
                                      )
                                    })}
                                    {
                                      [...Array(100 - property.final_takeaway)].map((choice, index) => {
                                        return (
                                          <div className='blank-bars' key={index} >
                                            <div>.</div>
                                          </div>
                                        )
                                      })
                                    }
                                  </div>
                                  :
                                  <div className='bar-container'>
                                    <h5>😕 No takeaways within {formData.takeaway_distance} min walk from this property</h5>
                                  </div>
                                }
                                {insightToggle.selection === 'Match %' ? <h4 className='insights-modal-score'>{property.final_takeaway}%</h4> : <h4 className='insights-modal-score'>#{property.takeaway_rank}</h4>}
                              </div>
                            </div>
                            : ''}
                          {/* pub bars */}
                          {formData.pubs_selection ?
                            <div className='insights-modal-results'>
                              <h4 className='insights-modal-variables'>🍻 Pubs</h4>
                              <div className='insights-modal-right'>
                                {property.bars.length > 0 ?
                                  <div className='bar-container'>
                                    {[...Array(property.final_pub)].map((choice, index) => {
                                      return (
                                        <div className='bars' key={index} >
                                          <div>.</div>
                                        </div>
                                      )
                                    })}
                                    {
                                      [...Array(100 - property.final_pub)].map((choice, index) => {
                                        return (
                                          <div className='blank-bars' key={index} >
                                            <div>.</div>
                                          </div>
                                        )
                                      })
                                    }
                                  </div>
                                  :
                                  <div className='bar-container'>
                                    <h5>😕 No pubs within {formData.pubs_distance} min walk from this property</h5>
                                  </div>
                                }
                                {insightToggle.selection === 'Match %' ? <h4 className='insights-modal-score'>{property.final_pub}%</h4> : <h4 className='insights-modal-score'>#{property.pub_rank}</h4>}
                              </div>
                            </div>
                            : ''}
                          {/* cafe bars */}
                          {formData.cafes_selection ?
                            <div className='insights-modal-results'>
                              <h4 className='insights-modal-variables'>☕️ Cafes</h4>
                              <div className='insights-modal-right'>
                                {property.cafes.length > 0 ?
                                  <div className='bar-container'>
                                    {[...Array(property.final_cafe)].map((choice, index) => {
                                      return (
                                        <div className='bars' key={index} >
                                          <div>.</div>
                                        </div>
                                      )
                                    })}
                                    {
                                      [...Array(100 - property.final_cafe)].map((choice, index) => {
                                        return (
                                          <div className='blank-bars' key={index} >
                                            <div>.</div>
                                          </div>
                                        )
                                      })
                                    }
                                  </div>
                                  :
                                  <div className='bar-container'>
                                    <h5>😕 No cafes within {formData.cafes_distance} min walk from this property</h5>
                                  </div>
                                }
                                {insightToggle.selection === 'Match %' ? <h4 className='insights-modal-score'>{property.final_cafe}%</h4> : <h4 className='insights-modal-score'>#{property.cafe_rank}</h4>}
                              </div>
                            </div>
                            : ''}
                          {/* primaries bars */}
                          {formData.primary_selection ?
                            <div className='insights-modal-results'>
                              <h4 className='insights-modal-variables'>🏫 Primaries</h4>
                              <div className='insights-modal-right'>
                                {property.primaries.length > 0 ?
                                  <div className='bar-container'>
                                    {[...Array(property.final_primary)].map((choice, index) => {
                                      return (
                                        <div className='bars' key={index} >
                                          <div>.</div>
                                        </div>
                                      )
                                    })}
                                    {
                                      [...Array(100 - property.final_primary)].map((choice, index) => {
                                        return (
                                          <div className='blank-bars' key={index} >
                                            <div>.</div>
                                          </div>
                                        )
                                      })
                                    }
                                  </div>
                                  :
                                  <div className='bar-container'>
                                    <h5>😕 No Primary Schools within {formData.primary_distance} min walk from this property</h5>
                                  </div>
                                }
                                {insightToggle.selection === 'Match %' ? <h4 className='insights-modal-score'>{property.final_primary}%</h4> : <h4 className='insights-modal-score'>#{property.primary_rank}</h4>}
                              </div>
                            </div>
                            : ''}
                          {/* secondaries bars */}
                          {formData.secondary_selection ?
                            <div className='insights-modal-results'>
                              <h4 className='insights-modal-variables'>🏫 Secondaries</h4>
                              <div className='insights-modal-right'>
                                {property.secondaries.length > 0 ?
                                  <div className='bar-container'>
                                    {[...Array(property.final_secondary)].map((choice, index) => {
                                      return (
                                        <div className='bars' key={index} >
                                          <div>.</div>
                                        </div>
                                      )
                                    })}
                                    {
                                      [...Array(100 - property.final_secondary)].map((choice, index) => {
                                        return (
                                          <div className='blank-bars' key={index} >
                                            <div>.</div>
                                          </div>
                                        )
                                      })
                                    }
                                  </div>
                                  :
                                  <div className='bar-container'>
                                    <h5>😕 No Secondary Schools within {formData.secondary_distance} min walk from this property</h5>
                                  </div>
                                }
                                {insightToggle.selection === 'Match %' ? <h4 className='insights-modal-score'>{property.final_secondary}%</h4> : <h4 className='insights-modal-score'>#{property.secondary_rank}</h4>}
                              </div>
                            </div>
                            : ''}
                          {/* supermarkets bars */}
                          {formData.supermarket_selection ?
                            <div className='insights-modal-results'>
                              <h4 className='insights-modal-variables'>👨‍🍳 Supermarkets</h4>
                              <div className='insights-modal-right'>
                                {property.supermarkets.length > 0 ?
                                  <div className='bar-container'>
                                    {[...Array(property.final_supermarket)].map((choice, index) => {
                                      return (
                                        <div className='bars' key={index} >
                                          <div>.</div>
                                        </div>
                                      )
                                    })}
                                    {
                                      [...Array(100 - property.final_supermarket)].map((choice, index) => {
                                        return (
                                          <div className='blank-bars' key={index} >
                                            <div>.</div>
                                          </div>
                                        )
                                      })
                                    }
                                  </div>
                                  :
                                  <div className='bar-container'>
                                    <h5>😕 No supermarkets within {formData.supermarket_distance} min walk from this property</h5>
                                  </div>
                                }
                                {insightToggle.selection === 'Match %' ? <h4 className='insights-modal-score'>{property.final_supermarket}%</h4> : <h4 className='insights-modal-score'>#{property.supermarket_rank}</h4>}
                              </div>
                            </div>
                            : ''}
                          {/* gyms bars */}
                          {formData.gym_selection ?
                            <div className='insights-modal-results'>
                              <h4 className='insights-modal-variables'>🏋️‍♂️ Gyms</h4>
                              <div className='insights-modal-right'>
                                {property.gyms.length > 0 ?
                                  <div className='bar-container'>
                                    {[...Array(property.final_gym)].map((choice, index) => {
                                      return (
                                        <div className='bars' key={index} >
                                          <div>.</div>
                                        </div>
                                      )
                                    })}
                                    {
                                      [...Array(100 - property.final_gym)].map((choice, index) => {
                                        return (
                                          <div className='blank-bars' key={index} >
                                            <div>.</div>
                                          </div>
                                        )
                                      })
                                    }
                                  </div>
                                  :
                                  <div className='bar-container'>
                                    <h5>😕 No gyms within {formData.gym_distance} min walk from this property</h5>
                                  </div>
                                }
                                {insightToggle.selection === 'Match %' ? <h4 className='insights-modal-score'>{property.final_gym}%</h4> : <h4 className='insights-modal-score'>#{property.gym_rank}</h4>}
                              </div>
                            </div>
                            : ''}
                          {/* tubes bars */}
                          {formData.tube_selection ?
                            <div className='insights-modal-results'>
                              <h4 className='insights-modal-variables'>🚇 Tubes</h4>
                              <div className='insights-modal-right'>
                                {property.tubes.length > 0 ?
                                  <div className='bar-container'>
                                    {[...Array(property.final_tube)].map((choice, index) => {
                                      return (
                                        <div className='bars' key={index} >
                                          <div>.</div>
                                        </div>
                                      )
                                    })}
                                    {
                                      [...Array(100 - property.final_tube)].map((choice, index) => {
                                        return (
                                          <div className='blank-bars' key={index} >
                                            <div>.</div>
                                          </div>
                                        )
                                      })
                                    }
                                  </div>
                                  :
                                  <div className='bar-container'>
                                    <h5>😕 No tube stations within {formData.tube_distance} min walk from this property</h5>
                                  </div>
                                }
                                {insightToggle.selection === 'Match %' ? <h4 className='insights-modal-score'>{property.final_tube}%</h4> : <h4 className='insights-modal-score'>#{property.tube_rank}</h4>}
                              </div>
                            </div>
                            : ''}
                          {/* parks bars */}
                          {formData.park_selection ?
                            <div className='insights-modal-results'>
                              <h4 className='insights-modal-variables'>🌳 Parks</h4>
                              <div className='insights-modal-right'>
                                {property.parks.length > 0 ?
                                  <div className='bar-container'>
                                    {[...Array(property.final_park)].map((choice, index) => {
                                      return (
                                        <div className='bars' key={index} >
                                          <div>.</div>
                                        </div>
                                      )
                                    })}
                                    {
                                      [...Array(100 - property.final_park)].map((choice, index) => {
                                        return (
                                          <div className='blank-bars' key={index} >
                                            <div>.</div>
                                          </div>
                                        )
                                      })
                                    }
                                  </div>
                                  :
                                  <div className='bar-container'>
                                    <h5>😕 No parks within {formData.park_distance} min walk from this property</h5>
                                  </div>
                                }
                                {insightToggle.selection === 'Match %' ? <h4 className='insights-modal-score'>{property.final_park}%</h4> : <h4 className='insights-modal-score'>#{property.park_rank}</h4>}
                              </div>
                            </div>
                            : ''}
                          {/* workplace bars */}
                          {formData.workplace_selection ?
                            <div className='insights-modal-results'>
                              <h4 className='insights-modal-variables'>🏢 Office</h4>
                              <div className='insights-modal-right'>
                                <div className='bar-container'>
                                  {[...Array(property.final_workplace)].map((choice, index) => {
                                    return (
                                      <div className='bars' key={index} >
                                        <div>.</div>
                                      </div>
                                    )
                                  })}
                                  {
                                    [...Array(100 - property.final_workplace)].map((choice, index) => {
                                      return (
                                        <div className='blank-bars' key={index} >
                                          <div>.</div>
                                        </div>
                                      )
                                    })
                                  }
                                </div>
                                {insightToggle.selection === 'Match %' ? <h4 className='insights-modal-score'>{property.final_workplace}%</h4> : <h4 className='insights-modal-score'>#{property.workplace_rank}</h4>}
                              </div>
                            </div>
                            : ''}
                          {/* family 1 bars */}
                          {formData.family_selection ?
                            <div className='insights-modal-results'>
                              <h4 className='insights-modal-variables'>👨‍👩‍👧‍👦 Friends & Fam</h4>
                              <div className='insights-modal-right'>
                                <div className='bar-container'>
                                  {[...Array(property.final_family1)].map((choice, index) => {
                                    return (
                                      <div className='bars' key={index} >
                                        <div>.</div>
                                      </div>
                                    )
                                  })}
                                  {
                                    [...Array(100 - property.final_family1)].map((choice, index) => {
                                      return (
                                        <div className='blank-bars' key={index} >
                                          <div>.</div>
                                        </div>
                                      )
                                    })
                                  }
                                </div>
                                {insightToggle.selection === 'Match %' ? <h4 className='insights-modal-score'>{property.final_family1}%</h4> : <h4 className='insights-modal-score'>#{property.family1_rank}</h4>}
                              </div>
                            </div>
                            : ''}
                        </div>
                      </>
                    )
                  })}
                </div>
              </>
              : ''}
          </Modal.Body>
        </Modal>
      </div>
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
                    <h1 className='section-header'>Hospitality</h1>
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
        <Modal show={searchShow} onHide={handleSearchClose} backdrop='static' className='search-details'>
          <Modal.Body>
            {calc10 ?
              <>
                <h3>Search details &gt;</h3>
                <div className='input-sections'>
                  <h5>Property</h5>
                  <div className='poi'><p>Type: {formData.property_type}</p></div>


                  <div className='poi'><p>Price: <NumericFormat value={formData.property_price_min} displayType={'text'} thousandSeparator={true} prefix={'£'} /> - <NumericFormat value={formData.property_price_max} displayType={'text'} thousandSeparator={true} prefix={'£'} /> </p></div>
                  <div className='poi'><p>Bedrooms: {formData.property_bed_min} - {formData.property_bed_max}</p></div>
                </div>
                <div className='input-sections'>
                  <h5>Points of interest</h5>
                  {formData.restaurant_selection ? <div className='poi'><p>👨‍🍳 Restaurants: {formData.restaurant_distance} min walk</p></div> : ''}
                  {formData.takeaway_selection ? <div className='poi'><p>🍜 Takeaways: {formData.takeaway_distance} min walk</p></div> : ''}
                  {formData.cafes_selection ? <div className='poi'><p>☕️ Cafes: {formData.cafes_distance} min walk</p></div> : ''}
                  {formData.pubs_selection ? <div className='poi'><p>🍻 Pubs: {formData.pubs_distance} min walk</p></div> : ''}
                  {formData.supermarket_selection ? <div className='poi'><p>🛒 Supermarkets: {formData.supermarket_distance} min walk</p></div> : ''}
                  {formData.gym_selection ? <div className='poi'><p>🏋️‍♂️ Gyms: {formData.gym_distance} min walk</p></div> : ''}
                  {formData.park_selection ? <div className='poi'><p>🌳 Park: {formData.park_distance} min walk</p></div> : ''}
                  {formData.workplace_selection ? <div className='poi'><p>✍🏼 Workplace: {formData.workplace_distance} min walk</p></div> : ''}
                  {formData.tube_selection ? <div className='poi'><p>🚇 Tube stations: {formData.tube_distance} min walk</p></div> : ''}
                  {formData.train_selection ? <div className='poi'><p>🚅 Train stations: {formData.train_distance} min walk</p></div> : ''}
                  {formData.primary_selection ? <div className='poi'><p>🏫 Primary schools: {formData.primary_distance} min walk</p></div> : ''}
                  {formData.secondary_selection ? <div className='poi'><p>🏫 Secondary schools: {formData.secondary_distance} min walk</p></div> : ''}
                  {formData.college_distance ? <div className='poi'><p>🏫 6th forms: {formData.college_distance} min walk</p></div> : ''}
                  {formData.family_distance_1 ? <div className='poi'><p>👨‍👩‍👧‍👦 Friends & family: {formData.family_distance_1} min walk</p></div> : ''}
                </div>
                <div className='bottom-buttons'>
                  <button onClick={handleEditShow} className='edit-button'>Edit</button>
                  <button onClick={handleSearchClose} className='close-button'>Close</button>
                </div>
              </>
              : ''}
          </Modal.Body>
        </Modal>
      </div>
    </>
  )

}

export default PropertyResultsWittle

