import { useParams, useNavigate, Link } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { isUserAuth, getAccessToken, getUserToken } from '../auth/Auth'
import Select from 'react-select'
import NavBar from '../tools/NavBar'
import { Modal } from 'react-bootstrap'
import PropertyComparison from './searchComponents/PropertyComparison'
import { NumericFormat } from 'react-number-format'
import ProfileLifestyle from './lifestyleComponents/ProfileLifestyle'
import ProfileAdmin from './adminComponents/ProfileAdmin'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import debounce from 'lodash/debounce'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import ReactPaginate from 'react-paginate'
import ProfileMobileSlider from '../tools/ProfileMobileSlider'
import AutoCompleteSearch from '../tools/AutoCompleteSearch'
import NavBarRevised from '../tools/NavBarRevised'
import NormalSearch from './searchComponents/NormalSearch'
import FieldSelectionProfile from './searchComponents/FieldSelectionProfile'
import ProfileSidebar from './homeComponents/ProfileSidebar'
import ProfileHubHome from './homeComponents/ProfileHubHome'
import SavedProperties from './searchComponents/SavedProperties'
import SavedSearches from './searchComponents/SavedSearches'


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

      // If user doesn't have an account, we want to load the city data so that users can use the lifestyle features 
    } else {
      console.log('no account')
      const getDetails = async () => {
        const { data } = await axios.get('/api/living-details/')
        console.log('all cities data ->', data)
        setFilterSearchLiving(data)
        setViewport({
          latitude: 51.515419,
          longitude: -0.141099,
          zoom: 11.5,
        })
        setFilters(true)
        setFilterChange(true)
      }
      getDetails()
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

        {/* Sidebar */}
        <ProfileSidebar
          setProfileDetail={setProfileDetail}
          searchSide={searchSide}
          setProfileContent={setProfileContent}
          livingSide={livingSide}
          adminSide={adminSide}
          setSearchSide={setSearchSide}
          setLivingSide={setLivingSide}
          setAdminSide={setAdminSide}
          setViewport={setViewport}
        />

        <section className='profile-main-section'>
          <div className='profile-content'>
            <div className='selection-detail'>
              {profileDetail === 'Profile' ?
                <>

                  <ProfileHubHome
                    userData={userData}
                    setProfileDetail={setProfileDetail}
                    favouriteProperties={favouriteProperties}
                    propertySearch={propertySearch}
                  />

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
                  profileDetail === 'Saved properties' ?
                    <>
                      <SavedProperties
                        profileContent={profileContent}
                        profileDetaiil={profileDetail}
                        favouriteProperties={favouriteProperties}
                        setChannel={setChannel}
                        channel={channel}
                        deleteProperty={deleteProperty}
                        setProfileContent={setProfileContent}
                        setProfileDetail={setProfileDetail}
                      />
                    </>
                    :
                    profileDetail === 'Saved searches' ?
                      <>
                        <SavedSearches
                          profileDetail={profileDetail}
                          userData={userData}
                          propertySearch={propertySearch}
                          deleteSearch={deleteSearch}
                          handleEditShow={handleEditShow}
                          setID={setID}
                        />
                      </>

                      // Property Comparison section //
                      : profileDetail === 'Property comparison'  ?
                        <>
                          <PropertyComparison
                            favouritesData={favouritesData}
                            favouriteProperties={favouriteProperties}
                            propertyList={propertyList}
                            setProfileContent={setProfileContent}
                            profileContent={profileContent}
                          />
                        </>

                        : ''}


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


              {profileDetail === 'Admin dashboard' ?
                <ProfileAdmin
                  livingDetails={livingDetails}
                  loadUserData={loadUserData}
                  setLivingDetails={setLivingDetails}
                  setProfileContent={setProfileContent}

                />
                :
                ''}
            </div>
          </div>
        </section >

      </section >
    </>
  )
}

export default ProfileHomepage