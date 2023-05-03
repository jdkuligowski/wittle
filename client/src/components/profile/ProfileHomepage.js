import { useParams, useNavigate, Link } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { isUserAuth, getAccessToken, getUserToken } from '../auth/Auth'
import Select from 'react-select'
import NavBar from '../tools/NavBar'
import { Modal } from 'react-bootstrap'
import PropertyComparison from './PropertyComparison'
import { NumericFormat } from 'react-number-format'
import ProfileLifestyle from './ProfileLifestyle'
import ProfileAdmin from './ProfileAdmin'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import debounce from 'lodash/debounce'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import ReactPaginate from 'react-paginate'
import ProfileMobileSlider from '../tools/ProfileMobileSlider'
import AutoCompleteSearch from '../tools/AutoCompleteSearch'
import NavBarRevised from '../tools/NavBarRevised'
import NormalSearch from '../propertySearch/NormalSearch'
import FieldSelectionProfile from '../wittleSearch/FieldSelectionProfile'



const ProfileHomepage = () => {


  // ? Section 1: Define states to be used on page

  // state to enable navigation between pages
  const navigate = useNavigate()

  // states for pop outs on the side
  const [searchSide, setSearchSide] = useState(false)
  const [livingSide, setLivingSide] = useState(false)
  const [adminSide, setAdminSide] = useState(false)
  const [accountSide, setAccountSide] = useState(false)

  // state for determining what content shows
  const [profileContent, setProfileContent] = useState('Profile')
  const [profileDetail, setProfileDetail] = useState('Profile')

  // set params for accessing specific pages
  const { id } = useParams()

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

  // state for cities data
  const [citiesData, setCitiesData] = useState()
  const [localData, setLocalData] = useState()

  // state for the master data
  const [masterLiving, setMasterLiving] = useState()
  const [masterLiving1, setMasterLiving1] = useState()
  const [masterLiving2, setMasterLiving2] = useState()
  const [masterLiving3, setMasterLiving3] = useState()

  // state for declaring cvhange in the filters
  const [filters, setFilters] = useState()

  // state for the master data
  const [filterSearchLiving, setFilterSearchLiving] = useState()
  const [filterSearchLiving1, setFilterSearchLiving1] = useState()

  // state for dropdowns
  const [lifestyleDropdown, setLifestyleDropdown] = useState('Restaurants')

  // staet for long lat
  const [lifestyleLong, setLifestyleLong] = useState()
  const [lifestyleLat, setLifestyleLat] = useState()
  const [homeLong, setHomeLong] = useState()
  const [homeLat, setHomeLat] = useState()

  // states for general lifestyle search coordinates
  const [searchPostcode, setSearchPostcode] = useState('False')

  // states for additional dropdowns
  const [restaurantDropdown, setRestaurantDropdown] = useState('All')
  const [takeawayCuisine, setTakeawayCuisine] = useState('All')
  const [gymType, setGymType] = useState('All')
  const [pubCategory, setPubCategory] = useState('All')
  const [ratingFilter, setRatingFilter] = useState(0)
  const [takeawayRating, setTakeawayRating] = useState(0)
  const [schoolState, setSchoolState] = useState('All')
  const [secondaryState, setSecondaryState] = useState('All')
  const [collegeState, setCollegeState] = useState('All')

  const [filterChange, setFilterChange] = useState()

  const [distanceFilter, setDistanceFilter] = useState(20)
  const [loading, setLoading] = useState(true)
  const [click, setClick] = useState(false)
  const [reset, setReset] = useState(false)
  const [home, setHome] = useState(false)
  const [loaded, setLoaded] = useState(false)

  // states for map
  const [lifestyleView, setLifestyleView] = useState('Tile')

  // control the states for maps
  const [viewport, setViewport] = useState({
    latitude: 51.515419,
    longitude: -0.141099,
    zoom: 11.5,
  })

  // states for handling the popups on the map
  const [showPopup, setShowPopup] = useState(true)
  const [iconId, setIconId] = useState()
  // const openDetail = () => setbuttonActive(!buttonActive)


  // pagination on map
  const ITEMS_PER_PAGE = 50
  const [currentPage, setCurrentPage] = useState(0)

  const [userEmail, setUserEmail] = useState({
    long: '',
    lat: '',
  })

  const [livingData, setLivingData] = useState({
    long: '',
    lat: '',
  })

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
          const storage = JSON.stringify(data.living_details[0])
          setHomeLong(data.living_details[0].long)
          setHomeLat(data.living_details[0].lat)
          window.localStorage.setItem('wittle-living-data', storage)
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
    console.log('carrying out userData load')
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



  // ? Section 5: Lifestyle data loading section - take in the data required to populate the tables
  // Step 1: Load in core cities data that contains all of the information about london
  useEffect(() => {
    const getLivingData = async () => {
      try {
        const { data } = await axios.get('/api/living-details/')
        console.log('all cities data ->', data)
        setCitiesData(data)
      } catch (err) {
        console.log(err)
      }
    }
    getLivingData()
  }, [])

  // function to set the data for all of london
  const getCityData = () => {
    try {
      setLoading(true)
      setFilterSearchLiving(citiesData)
      setViewport({
        latitude: 51.515419,
        longitude: -0.141099,
        zoom: 11.5,
      })
      setFilters(true)
      setFilterChange(true)
    } catch (err) {
      console.log(err)
    }
  }

  // function to set data for the specific inputs a user has put in as their home location
  const getLocalData = () => {
    try {
      setLoading(true)
      setMasterLiving(citiesData)
      setLifestyleLat(livingDetails.lat)
      setLifestyleLong(livingDetails.long)
      setViewport({
        latitude: livingDetails.lat,
        longitude: livingDetails.long,
        zoom: 13,
      })
    } catch (err) {
      console.log(err)
    }
  }

  // load in data in different situations
  useEffect(() => {
    // if user has already inputted their details and hasn't carried out a specific search, use stored postcode
    if (citiesData && livingDetails && livingDetails.long && !click && !reset && !home) {
      getLocalData()
      // if user hasn't put in any detsils and thre's no search criteria, then load all of longon data
    } else if (citiesData && livingDetails && !livingDetails.long && !click && !home && !reset) {
      getCityData()
    } else {
      // console.log('data not ready to be loaded')
    }
  }, [livingDetails, citiesData])


  // additional functions for the buttons to reset to home location or all of london
  // reset to home loncation
  const homeReset = () => {
    setLoading(true)
    setHome(true)
    setLifestyleLat(livingDetails.lat)
    setLifestyleLong(livingDetails.long)
    setViewport({
      latitude: livingDetails.lat,
      longitude: livingDetails.long,
      zoom: 13,
    })
    setReset(false)
  }

  // reset to all of london
  const londonReset = () => {
    setLoading(true)
    getCityData()
    setReset(true)
    setHome(false)
  }


  // ? Section 6: Distance calculations for lifestyle
  // calculatgion for adding distances to the data based on the input coordinates
  const coreMasterCalc = () => {
    setLoading(true)
    const calculation =
      masterLiving.map(city => {
        return {
          ...city,
          restaurants: city.restaurants.map(item => {
            return { ...item, distance_km: (12742 * Math.sin(Math.sqrt(0.5 - Math.cos((item.lat - parseFloat(lifestyleLat)) * (Math.PI / 180)) / 2 + Math.cos(parseFloat(lifestyleLat) * (Math.PI / 180)) * Math.cos(item.lat * (Math.PI / 180)) * (1 - Math.cos((item.long - parseFloat(lifestyleLong)) * (Math.PI / 180))) / 2))) * 1.2 }
          }),
          takeaways: city.takeaways.map(item => {
            return { ...item, distance_km: (12742 * Math.sin(Math.sqrt(0.5 - Math.cos((item.lat - parseFloat(lifestyleLat)) * (Math.PI / 180)) / 2 + Math.cos(parseFloat(lifestyleLat) * (Math.PI / 180)) * Math.cos(item.lat * (Math.PI / 180)) * (1 - Math.cos((item.long - parseFloat(lifestyleLong)) * (Math.PI / 180))) / 2))) * 1.2 }
          }),
          gyms: city.gyms.map(item => {
            return { ...item, distance_km: (12742 * Math.sin(Math.sqrt(0.5 - Math.cos((item.Lat - parseFloat(lifestyleLat)) * (Math.PI / 180)) / 2 + Math.cos(parseFloat(lifestyleLat) * (Math.PI / 180)) * Math.cos(item.Lat * (Math.PI / 180)) * (1 - Math.cos((item.long - parseFloat(lifestyleLong)) * (Math.PI / 180))) / 2))) * 1.2 }
          }),
          pubs: city.pubs.map(item => {
            return { ...item, distance_km: (12742 * Math.sin(Math.sqrt(0.5 - Math.cos((item.Lat - parseFloat(lifestyleLat)) * (Math.PI / 180)) / 2 + Math.cos(parseFloat(lifestyleLat) * (Math.PI / 180)) * Math.cos(item.Lat * (Math.PI / 180)) * (1 - Math.cos((item.long - parseFloat(lifestyleLong)) * (Math.PI / 180))) / 2))) * 1.2 }
          }),
          primaries: city.primaries.map(item => {
            return { ...item, distance_km: (12742 * Math.sin(Math.sqrt(0.5 - Math.cos((item.lat - parseFloat(lifestyleLat)) * (Math.PI / 180)) / 2 + Math.cos(parseFloat(lifestyleLat) * (Math.PI / 180)) * Math.cos(item.lat * (Math.PI / 180)) * (1 - Math.cos((item.long - parseFloat(lifestyleLong)) * (Math.PI / 180))) / 2))) * 1.2 }
          }),
          secondaries: city.secondaries.map(item => {
            return { ...item, distance_km: (12742 * Math.sin(Math.sqrt(0.5 - Math.cos((item.lat - parseFloat(lifestyleLat)) * (Math.PI / 180)) / 2 + Math.cos(parseFloat(lifestyleLat) * (Math.PI / 180)) * Math.cos(item.lat * (Math.PI / 180)) * (1 - Math.cos((item.long - parseFloat(lifestyleLong)) * (Math.PI / 180))) / 2))) * 1.2 }
          }),
          colleges: city.colleges.map(item => {
            return { ...item, distance_km: (12742 * Math.sin(Math.sqrt(0.5 - Math.cos((item.lat - parseFloat(lifestyleLat)) * (Math.PI / 180)) / 2 + Math.cos(parseFloat(lifestyleLat) * (Math.PI / 180)) * Math.cos(item.lat * (Math.PI / 180)) * (1 - Math.cos((item.long - parseFloat(lifestyleLong)) * (Math.PI / 180))) / 2))) * 1.2 }
          }),
        }
      })
    console.log('master calc 1 ->', calculation)
    setMasterLiving1(calculation)
  }

  // carry out first distance calculations
  useEffect(() => {
    if (masterLiving && lifestyleLong || home) {
      coreMasterCalc()
      console.log('carrying out calc 1')
      setHome(false)
    }
  }, [masterLiving, lifestyleLong, home])


  // set out calculation that calculate the distances in mins
  const secondMasterCalc = () => {
    setLoading(true)
    const calculation =
      masterLiving1.map(city => {
        return {
          ...city,
          restaurants: city.restaurants.map(item => {
            return { ...item, distance_walk_mins: ((item.distance_km / 5) * 60).toFixed(0) }
          }),
          takeaways: city.takeaways.map(item => {
            return { ...item, distance_walk_mins: ((item.distance_km / 5) * 60).toFixed(0) }
          }),
          pubs: city.pubs.map(item => {
            return { ...item, distance_walk_mins: ((item.distance_km / 5) * 60).toFixed(0) }
          }),
          gyms: city.gyms.map(item => {
            return { ...item, distance_walk_mins: ((item.distance_km / 5) * 60).toFixed(0) }
          }),
          primaries: city.primaries.map(item => {
            return { ...item, distance_walk_mins: ((item.distance_km / 5) * 60).toFixed(0) }
          }),
          secondaries: city.secondaries.map(item => {
            return { ...item, distance_walk_mins: ((item.distance_km / 5) * 60).toFixed(0) }
          }),
          colleges: city.colleges.map(item => {
            return { ...item, distance_walk_mins: ((item.distance_km / 5) * 60).toFixed(0) }
          }),
        }
      })
    console.log('master calc 2 ->', calculation)
    setMasterLiving2(calculation)
    // setFilterSearchLiving(calculation)
  }

  // cvarry out second distance calculation
  useEffect(() => {
    if (masterLiving1) {
      secondMasterCalc()
    }
  }, [masterLiving1])


  // calculation that filter for an initial distance
  const thirdMasterCalc = () => {
    setLoading(true)
    const calculation =
      masterLiving2.map(city => {
        return {
          ...city,
          restaurants: city.restaurants.filter(item => {
            return item.distance_walk_mins <= 20
          }),
          takeaways: city.takeaways.filter(item => {
            return item.distance_walk_mins <= 20
          }),
          pubs: city.pubs.filter(item => {
            return item.distance_walk_mins <= 20
          }),
          gyms: city.gyms.filter(item => {
            return item.distance_walk_mins <= 20
          }),
          primaries: city.primaries.filter(item => {
            return item.distance_walk_mins <= 20
          }),
          secondaries: city.secondaries.filter(item => {
            return item.distance_walk_mins <= 20
          }),
          colleges: city.colleges.filter(item => {
            return item.distance_walk_mins <= 20
          }),
        }
      })
    console.log('local master data ->', calculation)
    setMasterLiving3(calculation)
    setFilterSearchLiving(calculation)
    setFilters(true)
  }

  // filter out any that are not in the local area
  useEffect(() => {
    if (masterLiving2) {
      thirdMasterCalc()
    }
  }, [masterLiving2])




  // ? Section 7: Filter section - determine drop down filters and run calculation that allows them to work 
  // function to run the filter calculation when there is a change in location
  useEffect(() => {
    if (filters) {
      filterFunction()
      setFilters(false)
      setViewport(viewport)
    }
  })

  // function to change state for the pub dropdown
  const pubChange = (selected) => {
    setPubCategory(selected.value)
    setFilterChange(true)
  }
  const pubChange2 = (e) => {
    setPubCategory(e.target.value)
    setFilterChange(true)
  }

  // function to change state for gym studio dropdown
  const gymStudioChange = (selected) => {
    setGymType(selected.value)
    setFilterChange(true)
  }
  const gymStudioChange2 = (e) => {
    setGymType(e.target.value)
    setFilterChange(true)
  }

  // function to change state for takeaway cuisine dropdown
  const takeawayCuisineChange = (selected) => {
    setTakeawayCuisine(selected.value)
    setFilterChange(true)
  }
  const takeawayCuisineChange2 = (e) => {
    setTakeawayCuisine(e.target.value)
    setFilterChange(true)
  }

  // function to change state for the lifestyle dropdown
  const restaurantCuisineChange = (selected) => {
    setRestaurantDropdown(selected.value)
    setFilterChange(true)
  }

  const restaurantCuisineChange2 = (e) => {
    setRestaurantDropdown(e.target.value)
    setFilterChange(true)
  }

  // primary school dropdown change
  const schoolRating = (selected) => {
    setSchoolState(selected.value)
    setFilterChange(true)
  }
  const schoolRating4 = (e) => {
    setSchoolState(e.target.value)
    setFilterChange(true)
  }

  // secondary school dropdown change
  const schoolRating2 = (selected) => {
    setSecondaryState(selected.value)
    setFilterChange(true)
  }
  const schoolRating5 = (e) => {
    setSecondaryState(e.target.value)
    setFilterChange(true)
  }

  // college dropdown change
  const schoolRating3 = (selected) => {
    setCollegeState(selected.value)
    setFilterChange(true)
  }
  const schoolRating6 = (e) => {
    setCollegeState(e.target.value)
    setFilterChange(true)
  }

  // function to change state for the restaurant dropdown
  const lifestyleChange = (selected) => {
    setLifestyleDropdown(selected.value)
    setFilterChange(true)
  }
  const lifestyleChange2 = (e) => {
    setLifestyleDropdown(e.target.value)
    setFilterChange(true)
  }

  // state to add a postcode for the lifestyle search page
  const postcodeChange = (e) => {
    setSearchPostcode(e.target.value)
    console.log(e.target.value)
  }

  // state for altering the restaurant rating state
  const ratingChange = debounce((e) => {
    setRatingFilter(e.target.value)
    console.log(e.target.value)
    setFilterChange(true)
  }, 400)

  // state for altering the takeaway rating state
  const ratingChange2 = debounce((e) => {
    setTakeawayRating(e.target.value)
    setFilterChange(true)
  }, 400)



  // function that enables filtering of values in the table
  const filterFunction = () => {
    // setFilterSearchLiving1(filterSearchLiving)
    // Restaurrant Filters
    if (lifestyleDropdown === 'Restaurants' & restaurantDropdown === 'All') {
      console.log('cuisine value ->', restaurantDropdown)
      const calculation = filterSearchLiving.map((city) => {
        return {
          ...city,
          restaurants: city.restaurants.filter((item) => {
            return item.rating >= parseFloat(ratingFilter)
          }),
        }
      })
      setFilterSearchLiving1(calculation)
    } else if ((lifestyleDropdown === 'Restaurants' & restaurantDropdown !== 'All')) {
      console.log('cuisine value ->', restaurantDropdown)
      const calculation = filterSearchLiving.map((city) => {
        return {
          ...city,
          restaurants: city.restaurants.filter((item) => {
            return item.master_cuisine === restaurantDropdown && item.rating >= parseFloat(ratingFilter)
          }),
        }
      })
      setFilterSearchLiving1(calculation)
      // console.log('filtered results -> ', calculation)

      // Pubs filters
    } else if (lifestyleDropdown === 'Pubs' & pubCategory === 'All') {
      setFilterSearchLiving1(filterSearchLiving)
    } else if (lifestyleDropdown === 'Pubs' & pubCategory !== 'All') {
      const calculation = filterSearchLiving.map((city) => {
        return {
          ...city,
          pubs: city.pubs.filter((item) => {
            return item.Pub_category === pubCategory
          }),
        }
      })
      setFilterSearchLiving1(calculation)

      // Gyms filters
    } else if (lifestyleDropdown === 'Gyms' & gymType === 'All') {
      setFilterSearchLiving1(filterSearchLiving)
    } else if (lifestyleDropdown === 'Gyms' & gymType !== 'All') {
      const calculation = filterSearchLiving.map((city) => {
        return {
          ...city,
          gyms: city.gyms.filter((item) => {
            return item.class_type.includes(gymType)
          }),
        }
      })
      setFilterSearchLiving1(calculation)

      // Takeaway Filters
    } else if (lifestyleDropdown === 'Takeaways' & takeawayCuisine === 'All') {
      const calculation = filterSearchLiving.map((city) => {
        return {
          ...city,
          takeaways: city.takeaways.filter((item) => {
            return item.wittle_rating >= parseFloat(takeawayRating)
          }),
        }
      })
      setFilterSearchLiving1(calculation)
    } else if ((lifestyleDropdown === 'Takeaways' & takeawayCuisine !== 'All')) {
      const calculation = filterSearchLiving.map((city) => {
        return {
          ...city,
          takeaways: city.takeaways.filter((item) => {
            return item.cuisine.includes(takeawayCuisine) && item.wittle_rating >= parseFloat(takeawayRating)
          }),
        }
      })
      setFilterSearchLiving1(calculation)
      // console.log('filtered results -> ', calculation)


      // primary school filters
    } else if (lifestyleDropdown === 'Primary schools' & schoolState === 'All') {
      setFilterSearchLiving1(filterSearchLiving)
    } else if (lifestyleDropdown === 'Primary schools' & schoolState !== 'All') {
      const calculation = filterSearchLiving.map((city) => {
        return {
          ...city,
          primaries: city.primaries.filter((item) => {
            return item.ofsted_results === schoolState
          }),
        }
      })
      setFilterSearchLiving1(calculation)

      // secondary school filters
    } else if (lifestyleDropdown === 'Secondary schools' & secondaryState === 'All') {
      setFilterSearchLiving1(filterSearchLiving)
    } else if (lifestyleDropdown === 'Secondary schools' & secondaryState !== 'All') {
      const calculation = filterSearchLiving.map((city) => {
        return {
          ...city,
          secondaries: city.secondaries.filter((item) => {
            return item.ofsted_results === secondaryState
          }),
        }
      })
      setFilterSearchLiving1(calculation)

      // 6th form school filters
    } else if (lifestyleDropdown === '6th forms' & collegeState === 'All') {
      setFilterSearchLiving1(filterSearchLiving)
    } else if (lifestyleDropdown === '6th forms' & collegeState !== 'All') {
      const calculation = filterSearchLiving.map((city) => {
        return {
          ...city,
          colleges: city.secondaries.filter((item) => {
            return item.ofsted_results === collegeState
          }),
        }
      })
      setFilterSearchLiving1(calculation)
    }
    setFilterChange(false)
    setLoading(false)
  }

  // function that reruns the filter calculation every time the filter changes
  useEffect(() => {
    if (filterChange) {
      filterFunction()
    }
  }, [filterChange])




  // functions for handling the drop downs
  const restaurantList = ['American', 'Asian', 'Bar', 'British', 'Central American', 'Central Asian', 'Chicken', 'Chinese', 'European', 'French',
    'Gastro Pub', 'Greek', 'Indian', 'International', 'Italian', 'Japanese', 'Meat & Grill', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Modern',
    'North African', 'Pizza', 'Pub food', 'Seafood', 'South African', 'South American', 'South East Asian', 'Spanish', 'Thai', 'Turkish',
    'Vegetarian/ Vegan', 'Vietnamese', 'Wine Bar']


  //  ? Section 8: Maps
  // set current page when you clicjk button for pagination
  const handlePageClick = (data) => {
    const { selected } = data
    setCurrentPage(selected)
  }

  const startIndex = currentPage * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE


  const iconSetting = (e) => {
    setShowPopup(true)
    console.log(showPopup)
    setIconId(parseInt(e.target.id))
    console.log(parseInt(e.target.id))
  }




  return (
    <>
      <section className='profile-page'>
        <div className='normal-nav-wrap'>
          <NavBar />

        </div>
        <div className='centre-nav-wrap'>
          <NavBarRevised
            setProfileContent={setProfileContent}
            profileContent={profileContent}
            profileDetail={profileDetail}
            setProfileDetail={setProfileDetail}
          />
        </div>
        <section className='profile-sidebar-open'>
          <div className='logo'>
            <h2 onClick={() => navigate('/')}>Wittle</h2>
          </div>
          <div className='profile-buttons'>
            <div className='profile-button-title'>
              <h2 onClick={() => {
                setProfileDetail('Profile')
                setProfileContent('Profile')
              }}>🧘‍♂️ Wittle Home</h2>
            </div>
            <div className='profile-button-title' id='second-title'>
              <h2 onClick={() => {
                setProfileContent('Search')
                setSearchSide(!searchSide)
              }
              }>🔎 Wittle Search</h2>
              {searchSide ? <h4>v</h4> : <h4>^</h4>}
            </div>
            {searchSide ?
              <div className='profile-button-sub'>
                <h3 onClick={() => setProfileDetail('Wittle search')}>🏠 Wittle search</h3>
                <h3 onClick={() => setProfileDetail('Property search')}>🔎 Property search</h3>
                <h3 onClick={() => setProfileDetail('Saved properties')}>🤍 Saved properties</h3>
                <h3 onClick={() => setProfileDetail('Saved searches')}>🔎 Saved searches</h3>
                <h3 onClick={() => setProfileDetail('Property comparison')}>🧐 Property comparison</h3>
              </div>
              :
              ''}
            <div className='profile-button-title' id='second-title'>
              <h2 onClick={() => {
                setProfileContent('Lifestyle')
                setLivingSide(!livingSide)
              }
              }>🏠 Wittle Lifestyle</h2>
              {livingSide ? <h4>v</h4> : <h4>^</h4>}
            </div>
            {livingSide ?
              <div className='profile-button-sub'>
                <h3 onClick={() => {
                  setViewport({
                    latitude: 51.515419,
                    longitude: -0.141099,
                    zoom: 11.5,
                  })
                  setProfileDetail('Lifestyle search')
                }
                }>💃 Find something</h3>
                <h3 onClick={() => setProfileDetail('List')}>📱 Saved items</h3>
                <h3 onClick={() => setProfileDetail('Lifestyle insights')}>🏠 Insights</h3>
              </div>
              :
              ''}
            <div className='profile-button-title' id='second-title'>
              <h2 onClick={() => {
                setProfileContent('Admin')
                setAdminSide(!adminSide)
              }}>🏠 Wittle Admin</h2>
              {adminSide ? <h4>v</h4> : <h4>^</h4>}
            </div>
            {adminSide ?
              <div className='profile-button-sub'>
                <h3 onClick={() => setProfileDetail('Admin dashboard')}>💃 Dashboard</h3>
                <h3 onClick={() => setProfileDetail('Admin opportunities')}>📱 Opportunities </h3>
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
                {profileDetail === 'Profile' ?
                  <>
                    <div className='profile-top'>
                      <div className='profile-intro'>
                        <h1 className='profile-name'>👋 {userData ? userData.first_name : ''}</h1>
                        <p className='profile-bio'>Welcome to Wittle</p>
                      </div>
                      <div className='top-insights'>
                        <div onClick={() => setProfileDetail('Saved properties')} className='box-insights'>
                          <h1>{favouriteProperties ? favouriteProperties.length : ''}</h1>
                          <p>Saved properties</p>
                        </div>
                        <div onClick={() => setProfileDetail('Saved searches')} className='box-insights'>
                          <h1>{propertySearch ? propertySearch.length : ''}</h1>
                          <p>Saved searches</p>
                        </div>
                        <div onClick={() => setProfileDetail('Admin')} className='box-insights'>
                          <h1>£1,300</h1>
                          <p>Monthly bills</p>
                        </div>
                        <div onClick={() => setProfileDetail('Lifestyle portal')} className='box-insights'>
                          <h1>3</h1>
                          <p>Saved locations</p>
                        </div>
                      </div>
                    </div>
                    <ProfileMobileSlider
                      setProfileContent={setProfileContent}
                      profileContent={profileContent}
                      profileDetail={profileDetail}
                      setProfileDetail={setProfileDetail}
                    />

                  </>
                  : ''}
                {/* {profileContent === 'Search' ? */}
                {/* <> */}
                <ProfileMobileSlider
                  setProfileContent={setProfileContent}
                  profileContent={profileContent}
                  profileDetail={profileDetail}
                  setProfileDetail={setProfileDetail}
                />
                {profileDetail === 'Wittle search' ?
                  <>
                    <FieldSelectionProfile />
                  </>

                  :
                  profileDetail === 'Property search' ?
                    <>
                      <NormalSearch />
                    </>

                    :
                    profileDetail === 'Saved properties' && favouriteProperties.length > 0 ?
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
                      profileDetail === 'Saved properties' && favouriteProperties.length === 0 ?
                        <>
                          <div className='no-properties'>
                            <ProfileMobileSlider
                              setProfileContent={setProfileContent}
                              profileContent={profileContent}
                              profileDetail={profileDetail}
                              setProfileDetail={setProfileDetail}
                            />
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
                        profileDetail === 'Saved searches' && userData.property_search_details.length > 0 ?
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
                          profileDetail === 'Saved searches' && userData.property_search_details.length === 0 ?
                            <>
                              <div className='no-properties'>
                                <h4 className='no-properties-text'>😕</h4>
                                <h4 className='no-properties-text'>You haven&apos;t saved any searches yet.</h4>
                                <h4 className='no-properties-subtext'>As soon as you&apos;ve saved a search, it&apos;ll show here, then you can change or update it whenever you like.</h4>
                                <button onClick={() => navigate('/wittle-search')}>Start Wittling</button>
                              </div>
                            </>

                            // Property Comparison section //
                            : profileDetail === 'Property comparison' && favouriteProperties.length > 0 ?
                              <>
                                <PropertyComparison
                                  favouritesData={favouritesData}
                                  favouriteProperties={favouriteProperties}
                                  propertyList={propertyList}
                                />
                              </>
                              :
                              profileDetail === 'Property comparison' && favouriteProperties.length === 0 ?
                                <>
                                  <div className='no-properties'>
                                    <ProfileMobileSlider
                                      setProfileContent={setProfileContent}
                                      profileContent={profileContent}
                                    />
                                    <h4 className='no-properties-text'>😕</h4>
                                    <h4 className='no-properties-text'>You haven&apos;t saved any properties yet.</h4>
                                    <h4 className='no-properties-subtext'>Once you&apos;ve saved some properties, you can compare them and decide on your favourite. Then you&apos;ll really be Wittling.</h4>
                                  </div>
                                </>
                                : ''}
                {/* </>
                  : ''} */}

                {/* {profileContent === 'Lifestyle' ?
                  <>
                    <ProfileMobileSlider
                      setProfileContent={setProfileContent}
                      profileContent={profileContent}
                      profileDetail={profileDetail}
                      setProfileDetail={setProfileDetail}
                    /> */}
                {profileDetail === 'Lifestyle search' ?
                  <>
                    <div className='section-title-box'>
                      <h2 className='section-title'>Wittle Lifestyle Search</h2>
                      <div className='search-block'>

                        <button onClick={homeReset}>🏠</button>
                        <button className='reset-button' onClick={londonReset}></button>
                        {/* <input onChange={postcodeChange} className='search-box' value={searchPostcode === 'False' || searchPostcode === livingDetails.postcode ? '' : searchPostcode} placeholder='🔎 Postcode'></input> */}
                        <AutoCompleteSearch
                          setLifestyleLat={setLifestyleLat}
                          setLifestyleLong={setLifestyleLong}
                          setUserEmail={setUserEmail}
                          setLivingData={setLivingData}
                          // getClickData={getClickData}
                          setLoading={setLoading}
                          setViewport={setViewport}
                          setClick={setClick}
                        />
                        {/* <button onClick={getLocalData}>Go</button> */}

                      </div>
                    </div>
                    <ProfileLifestyle
                      masterLiving3={filterSearchLiving1}
                      lifestyleChange={lifestyleChange}
                      lifestyleChange2={lifestyleChange2}
                      lifestyleDropdown={lifestyleDropdown}
                      setLifestyleDropdown={setLifestyleDropdown}
                      restaurantDropdown={restaurantDropdown}
                      restaurantCuisineChange={restaurantCuisineChange}
                      restaurantCuisineChange2={restaurantCuisineChange2}
                      ratingFilter={ratingFilter}
                      pubChange={pubChange}
                      pubChange2={pubChange2}
                      pubCategory={pubCategory}
                      ratingChange={ratingChange}
                      gymStudioChange={gymStudioChange}
                      gymStudioChange2={gymStudioChange2}
                      gymType={gymType}
                      takeawayCuisineChange={takeawayCuisineChange}
                      takeawayCuisineChange2={takeawayCuisineChange2}
                      takeawayCuisine={takeawayCuisine}
                      takeawayRating={takeawayRating}
                      ratingChange2={ratingChange2}
                      schoolRating={schoolRating}
                      schoolState={schoolState}
                      secondaryState={secondaryState}
                      schoolRating2={schoolRating2}
                      collegeState={collegeState}
                      schoolRating3={schoolRating3}
                      schoolRating4={schoolRating4}
                      schoolRating5={schoolRating5}
                      schoolRating6={schoolRating6}
                      loading={loading}
                      lifestyleView={lifestyleView}
                      setLifestyleView={setLifestyleView}
                      viewport={viewport}
                      setViewport={setViewport}
                      startIndex={startIndex}
                      endIndex={endIndex}
                      iconSetting={iconSetting}
                      handlePageClick={handlePageClick}
                      showPopup={showPopup}
                      iconId={iconId}
                      lifestyleLat={lifestyleLat}
                      lifestyleLong={lifestyleLong}
                    />
                  </>
                  :
                  ''}
                {/* </>
                  : ''} */}
                {/* {profileContent === 'Admin' ?
                  <>
                    <ProfileMobileSlider
                      setProfileContent={setProfileContent}
                      profileContent={profileContent}
                      profileDetail={profileDetail}
                      setProfileDetail={setProfileDetail}
                    /> */}
                {profileDetail === 'Admin dashboard' ?
                  <ProfileAdmin
                    livingDetails={livingDetails}
                    loadUserData={loadUserData}
                    setLivingDetails={setLivingDetails}
                    setProfileContent={setProfileContent}

                  />
                  :
                  ''}

                {/* </>
                  : ''
                } */}
              </div>
            </div>
            : ''}

        </section >

      </section >
    </>
  )
}

export default ProfileHomepage