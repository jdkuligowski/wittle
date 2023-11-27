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
import Loading from '../../helpers/Loading'
import { CSVLink } from 'react-csv'
import SavedProperties from '../b2bModals/SavedProperties'





axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const LeadGenerator = () => {


  // state to enable navigation between pages
  const navigate = useNavigate()

  // set state for errors
  const [errors, setErrors] = useState()

  // set state for user
  const [userData, setUserData] = useState()

  // set state for rentalLoading
  const [rentalLoading, setRentalLoading] = useState()
  const [salesLoading, setSalesLoading] = useState()

  // set state for completing a search
  const [search, setSearch] = useState(false)

  // state for determining what content shows
  const [profileContent, setProfileContent] = useState('Comparison')
  const [profileDetail, setProfileDetail] = useState('Comparison')

  // states for pop outs on the side
  const [variableSide, setVariableSide] = useState(false)

  const [postcodeSubstring, setPostcodeSubstring] = useState('')
  const [roadSubstring, setRoadSubstring] = useState('')
  const [currentEnergy, setCurrentEnergy] = useState()
  const [potentialEnergy, setPotentialEnergy] = useState()
  const [longPropertyList, setLongPropertyList] = useState([])
  const [propertyList, setPropertyList] = useState([])
  const [channel, setChannel] = useState('')

  const [inputType, setInputType] = useState('Efficiency')


  const [favouritedProperties, setFavouritedProperties] = useState([])

  const [savedProperties, setSavedProperties] = useState()
  const [archivedProperties, setArchivedProperties] = useState()

  const [sessionName, setSessionName] = useState(sessionStorage.getItem('sessionName') || '')

  const [targetPostcode, setTargetPostcode] = useState(['SW8'])
  const [combiniedProperties, setCombinedProperties] = useState()

  const [leadGenSection, setLeadGenSection] = useState('Home')

  const [noMatches, setNoMatches] = useState([])
  const [singleMatches, setSingleMatches] = useState([])
  const [multipleMatches, setMultipleMatches] = useState([])

  const [salesNoMatches, setSalesNoMatches] = useState([])
  const [salesSingleMatches, setSalesSingleMatches] = useState([])
  const [salesMultipleMatches, setSalesMultipleMatches] = useState([])

  const [channelView, setChannelView] = useState('Lettings')

  const [expand, setExpand] = useState(false)

  const [leadGenDetails, setLeadGenDetails] = useState({
    postcode: '',
    bathrooms_min: null,
    bathrooms_max: null,
    bedrooms_min: null,
    bedrooms_max: null,
    rental_price_min: null,
    rental_price_max: null,
    sales_price_min: null,
    sales_price_max: null,
    channel: '',
    rental_additional: '',
  })


  const [selectedRows, setSelectedRows] = useState([])
  const [selectedSalesRows, setSelectedSalesRows] = useState([])

  // set state for csv data
  const [csvData, setCsvData] = useState()

  // control the states for maps
  const [viewport, setViewport] = useState({
    latitude: 51.515419,
    longitude: -0.141099,
    zoom: 11.5,
  })

  const [drawnPolygons, setDrawnPolygons] = useState([])

  const [checkboxStatus, setCheckboxStatus] = useState(singleMatches.map(() => false))
  const [salesCheckboxStatus, setSalesCheckboxStatus] = useState(salesSingleMatches.map(() => false))

  const [dateFilter, setDateFilter] = useState('2days')

  const [favouriteIds, setFavouriteIds] = useState([])

  const [filteredProperties, setFilteredProperties] = useState([])
  const [flteredSalesProperties, setFilteredSalesProperties] = useState([])

  // State variables for sorting
  const [sortPriceOrder, setSortPriceOrder] = useState('asc')
  const [sortPostcodeOrder, setSortPostcodeOrder] = useState('asc')

  const [latestFavourites, setLatestFavourites] = useState()


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


          // for the inputs page, sdetermine whether the user has already added them, if they have then set these values
          if (data.lead_gen_details.length > 0) {
            setLeadGenDetails(data.lead_gen_details[0])

            const filteredFavourites = data.epc_favourites.filter(fav => fav.rightmove_id !== null && fav.action === 'Saved')
            const archivedFavourites = data.epc_favourites.filter(fav => fav.rightmove_id !== null && fav.action === 'Extracted')
            const newFavouriteIds = [...filteredFavourites, ...archivedFavourites].map(fav => fav.rightmove_id)

            setFavouriteIds(newFavouriteIds)
            const dataCsv = transformCSVData(data.epc_favourites)

            if (data.lead_gen_details[0].channel === 'Lettings') {
              loadCombinedPropertiesFromUser(data, newFavouriteIds, dateFilter)
            } else if (data.lead_gen_details[0].channel === 'Sales') {
              loadCombinedSalesFromUser(data, newFavouriteIds, dateFilter)
            } else if (data.lead_gen_details[0].channel === 'Both') {
              loadCombinedSalesFromUser(data, newFavouriteIds, dateFilter)
              loadCombinedPropertiesFromUser(data, newFavouriteIds, dateFilter)
            }
            setSavedProperties(filteredFavourites)
            setArchivedProperties(archivedFavourites)
            setCsvData(dataCsv)
            console.log('existing dtails ->', data.lead_gen_details[0])
          } else {
            const allFavouriteIds = []
            loadCombinedPropertiesFromUser(data, allFavouriteIds, dateFilter)
            loadCombinedSalesFromUser(data, allFavouriteIds, dateFilter)
            console.log('date -> ', dateFilter)

          }


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





  // ? Section 3: Handling favourites data - selecting, adding, editing and  deleting
  // function for adding favourites based on relevant row
  const addFavourite = async () => {
    if (isUserAuth()) {
      // get a list of existing favourite ids from the user schema
      const existingFavouriteIds = new Set(userData.epc_favourites.map(fav => fav.rightmove_id))

      // create a list of new unique favourites so we don't have any duplicates in the database
      const combinedFavourites = [...selectedRows, ...selectedSalesRows]

      const newFavourites = combinedFavourites.filter(row => !existingFavouriteIds.has(row.rightmove_id))

      console.log(newFavourites)

      if (newFavourites.length === 0) {
        console.log('No new favourites to add')
        return
      }

      try {
        const response = await axios.post('/api/epc_favourite/', newFavourites, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })

        console.log('Response:', response.data)
        setLatestFavourites(newFavourites.length)
        loadUserData()
        handleSavedActionShow()
        setSelectedRows([])
        setSelectedSalesRows([])
        setCheckboxStatus(singleMatches.map(() => false))
        setSalesCheckboxStatus(salesSingleMatches.map(() => false))


      } catch (error) {
        console.error('Error saving favourite:', error)
      }
    } else {
      navigate('/access-denied')
      console.log('logged out')
    }
  }


  // function to setting the favurites to the archives: 
  const archiveFavourite = async (favouriteIds) => {  // Adjusted to take an array of IDs
    if (isUserAuth()) {
      try {
        const response = await axios.put('/api/epc_favourite/update_favourites/', { favourite_ids: favouriteIds }, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })

        console.log('Response:', response.data)
        loadUserData()
        // Optionally, refresh data or update UI accordingly
      } catch (error) {
        console.error('Error updating favorite:', error)
      }
    } else {
      navigate('/access-denied')
      console.log('logged out')
    }
  }


  // function to remove favourite from the saved list in case user doesn't want it in there anymore
  const deleteFavourite = async (id) => {
    if (isUserAuth()) {

      try {
        const response = await axios.delete('/api/epc_favourite/delete_favourite/', {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
          data: { rightmove_id: id },
        })
        loadUserData()
      } catch (error) {
        console.error('Error updating favourite:', error)
      }
    } else {
      navigate('/access-denied')
      console.log('logged out')
    }
  }


  // select rows that will be added to the favourites then saved to file
  const handleCheckboxChange = (e, index) => {
    const updatedStatus = [...checkboxStatus]
    updatedStatus[index] = e.target.checked
    setCheckboxStatus(updatedStatus)


    const selectedProperty = {
      ...filteredProperties[index].property_data,
      address: filteredProperties[index].epc_data_list[0].address,
    }

    console.log(selectedProperty)
    if (e.target.checked) {
      setSelectedRows(prevRows => [...prevRows, selectedProperty])
    } else {
      // Assuming 'rightmove_id' is a unique identifier
      setSelectedRows(prevRows => prevRows.filter(row => row.rightmove_id !== selectedProperty.rightmove_id))
    }
  }


  // create function to select all rows
  const selectAllRows = () => {
    const existingCombinations = new Set(userData.epc_favourites.map(fav => fav.rightmove_id))

    const allRows = filteredProperties.map(item => ({
      ...item.property_data,
      address: item.epc_data_list[0].address,
      // Add any other fields from epc_data_list you need
    })).filter(row => !existingCombinations.has(row.rightmove_id))
    setCheckboxStatus(filteredProperties.map(() => true))

    setSelectedRows(allRows)
  }

  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      selectAllRows() // Function that selects all rows
    } else {
      deselectAllRows() // Function that deselects all rows
    }
  }

  // Function to deselect all rows
  const deselectAllRows = () => {
    setCheckboxStatus(filteredProperties.map(() => false))
    setSelectedRows([])
  }

  // select rows that will be added to the favourites then saved to file
  const salesCheckboxChange = (e, index) => {
    const updatedStatus = [...salesCheckboxStatus]
    updatedStatus[index] = e.target.checked
    setSalesCheckboxStatus(updatedStatus)


    const selectedProperty = {
      ...flteredSalesProperties[index].property_data,
      address: flteredSalesProperties[index].epc_data_list[0].address,
    }

    console.log(selectedProperty)
    if (e.target.checked) {
      setSelectedSalesRows(prevRows => [...prevRows, selectedProperty])
    } else {
      // Assuming 'rightmove_id' is a unique identifier
      setSelectedSalesRows(prevRows => prevRows.filter(row => row.rightmove_id !== selectedProperty.rightmove_id))
    }
  }


  // create function to select all rows
  const selectAllSalesRows = () => {
    const existingCombinations = new Set(userData.epc_favourites.map(fav => fav.rightmove_id))

    const allRows = flteredSalesProperties.map(item => ({
      ...item.property_data,
      address: item.epc_data_list[0].address,
      // Add any other fields from epc_data_list you need
    })).filter(row => !existingCombinations.has(row.rightmove_id))
    setSalesCheckboxStatus(flteredSalesProperties.map(() => true))

    setSelectedSalesRows(allRows)
  }

  const handleSelectAllSalesChange = (e) => {
    if (e.target.checked) {
      selectAllSalesRows() // Function that selects all rows
    } else {
      deselectAllSalesRows() // Function that deselects all rows
    }
  }

  // Function to deselect all rows
  const deselectAllSalesRows = () => {
    setSalesCheckboxStatus(flteredSalesProperties.map(() => false))
    setSelectedSalesRows([])
  }


  // function to populate the csv data that will eb extracted to file
  const transformCSVData = (data) => {
    const filteredData = data.filter(fav => fav.rightmove_id !== null && fav.action === 'Saved')
    return filteredData.map((item, index) => {
      return {
        item: index + 1,
        url: item.url,
        address: item.address,
        postcode: item.postcode,
        addressPostcode: `${item.address}, ${item.postcode}`,
        addedOn: item.added_revised,
        property_type: item.property_type,
        price: item.price,
        bedrooms: item.bedrooms,
        bathrooms: item.bathrooms,
        let_available_date: item.let_available_date,
        date_added: item.date_added_db,
        agent: item.agent,
        channel: item.channel,
      }
    })
  }


  // ? Section 4: Property data rentalLoading
  //  Loading latest data from the database based on the postcode areas applied by the user
  const loadCombinedPropertiesFromUser = async (data, favouriteIds, dateFilter) => {
    setRentalLoading(true)
    const postcodeValue = data.lead_gen_details[0].postcode
    const bedroomsMin = data.lead_gen_details[0].bedrooms_min
    const bedroomsMax = data.lead_gen_details[0].bedrooms_max
    const priceMin = data.lead_gen_details[0].rental_price_min
    const priceMax = data.lead_gen_details[0].rental_price_max
    const additionalRental = data.lead_gen_details[0].rental_additional

    try {
      let url = `/api/epc_properties_rental/combined-epc-results/?postcode=${postcodeValue}&min_bedrooms=${bedroomsMin}&max_bedrooms=${bedroomsMax}&rental_price_min=${priceMin}&rental_price_max=${priceMax}&rental_additional=${additionalRental}`

      // Append date filter criteria to the URL
      if (dateFilter) {
        url += `&date_filter=${dateFilter}`
      }

      // Append favouriteIds to the URL if present
      if (favouriteIds && favouriteIds.length > 0) {
        url += `&exclude_ids=${favouriteIds.join(',')}`
      }

      // extract data based on url
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      console.log('combined data ->', data)

      // Process and categorize the data
      const noMatchesData = data.filter(item => item.epc_data_list.length === 0)
      const singleMatchesData = data.filter(item => item.epc_data_list.length === 1)
      const multipleMatchesData = data.filter(item => item.epc_data_list.length > 1)

      console.log('sngle matches ->', singleMatchesData)
      // console.log('no matches ->', noMatchesData)
      // console.log('multiple matches ->', multipleMatchesData)

      // Update states
      setNoMatches(noMatchesData)
      setSingleMatches(singleMatchesData)
      setMultipleMatches(multipleMatchesData)
      setRentalLoading(false)

    } catch (error) {
      console.error('can\'t access combined data ->', error)
    }
  }


  //  Loading latest data from the database based on the postcode areas applied by the user
  const loadCombinedSalesFromUser = async (data, favouriteIds, dateFilter) => {
    setSalesLoading(true)
    const postcodeValue = data.lead_gen_details[0].postcode
    const bedroomsMin = data.lead_gen_details[0].bedrooms_min
    const bedroomsMax = data.lead_gen_details[0].bedrooms_max
    const priceMin = data.lead_gen_details[0].sales_price_min
    const priceMax = data.lead_gen_details[0].sales_price_max

    try {
      let url = `/api/epc_properties/combined-epc-results/?postcode=${postcodeValue}&min_bedrooms=${bedroomsMin}&max_bedrooms=${bedroomsMax}&sales_price_min=${priceMin}&sales_price_max=${priceMax}`

      // Append date filter criteria to the URL
      if (dateFilter) {
        url += `&date_filter=${dateFilter}`
      }

      // Append favouriteIds to the URL if present
      if (favouriteIds && favouriteIds.length > 0) {
        url += `&exclude_ids=${favouriteIds.join(',')}`
      }

      // extract data based on url
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      console.log('combined data ->', data)

      // Process and categorize the data
      const noMatchesData = data.filter(item => item.epc_data_list.length === 0)
      const singleMatchesData = data.filter(item => item.epc_data_list.length === 1)
      const multipleMatchesData = data.filter(item => item.epc_data_list.length > 1)

      console.log('sales single matches ->', singleMatchesData)
      console.log('sales no matches ->', noMatchesData)
      console.log('sales multiple matches ->', multipleMatchesData)

      // Update states
      setSalesNoMatches(noMatchesData)
      setSalesSingleMatches(singleMatchesData)
      setSalesMultipleMatches(multipleMatchesData)
      setSalesLoading(false)

    } catch (error) {
      console.error('can\'t access combined data ->', error)
    }
  }







  // ? Section 5: Inputting seach criteria
  // post search criteria from the form to the database
  const addSearchCriteria = async () => {
    let response

    // Check if userData exists and has lead_gen_details
    if (userData && userData.lead_gen_details && userData.lead_gen_details.length > 0) {
      // PUT request for existing details
      response = await axios.put(`/api/lead_gen_details/${userData.id}/`, leadGenDetails, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      setLeadGenSection('Explore properties')

    } else {
      // POST request for new details
      response = await axios.post('/api/lead_gen_details/', leadGenDetails, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      setLeadGenSection('Explore properties')
    }


    // setRentalLoading(true)
    // setSalesLoading(true)
    loadUserData()
  }

  // input the postcode on the form
  const inputPostcode = (e) => {
    setPostcodeSubstring(e.target.value.toUpperCase().replace(/\s+/g, ''))
    setLeadGenDetails(prevData => ({ ...prevData, postcode: e.target.value.toUpperCase().replace(/\s+/g, '') }))
  }





  // ? Section 6: Addtional extra functions
  // go to url in table
  const handleVisitUrl = (url) => {
    // window.open(url, '_blank') // This will open the URL in a new tab

    const windowFeatures = 'width=1200,height=800,resizable=yes,scrollbars=yes,status=yes'

    // Open the URL in a new window
    window.open(url, '_blank', windowFeatures)
  }



  // extract current date to be sued as part of csv file
  const getCurrentDate = () => {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    return `${day}-${month}-${year}`
  }

  // remove login token from storage
  const removeItemFromStorage = (token) => {
    localStorage.removeItem('wittle-user-token')
    localStorage.removeItem('wittle-username')
    navigate('/login')
  }


  // sales prices
  const salesPrices = [
    '200000', '300000', '400000', '500000', '600000', '700000', '800000', '900000', '1000000', '1250000', '1500000', '1750000', '2000000', '2250000', '2500000',
    '2750000', '3000000', '3500000', '4000000', '5000000', '7500000', '10000000', '12500000', '15000000', '20000000', '30000000', '40000000', '50000000'
  ]

  // rental prices
  const rentalPrices = [
    '500', '600', '700', '800', '900', '1000', '1100', '1200', '1300', '1400', '1500', '1600', '1700', '1800', '1900', '2000', '2250', '2500', '2750', '3000', '3250', '3500',
    '4000', '4500', '5000', '5500', '6000', '7000', '8000', '9000', '10000', '12500', '15000', '20000', '25000', '30000', '40000', '50000', '60000'
  ]



  // function to filter properties
  const filterPropertiesByDate = (properties, dateFilter) => {
    if (!dateFilter || dateFilter === 'all') {
      return properties
    }

    const days = dateFilter === '1day' ? 2 :
      dateFilter === '2days' ? 3 :
        dateFilter === '3days' ? 4 :
          dateFilter === '7days' ? 8 :
            dateFilter === '4weeks' ? 28 :
              dateFilter === '8weeks' ? 56 :
                dateFilter === '12weeks' ? 84 :
                  dateFilter === '16weeks' ? 112 : 0
    // dateFilter === 'all' ? 10000 : 0

    return properties.filter(property => {
      const addedDate = parseDate(property.property_data.added_revised)
      const reducedDate = parseDate(property.property_data.reduced_revised)

      let mostRecentDate
      if (addedDate && reducedDate) {
        mostRecentDate = addedDate > reducedDate ? addedDate : reducedDate
      } else {
        mostRecentDate = addedDate || reducedDate // Use the non-null date
      }

      if (!mostRecentDate) {
        return false // Skip this property if both dates are null
      }

      const isWithin = isWithinLastDays(mostRecentDate, days)

      return isWithin
    })
  }


  useEffect(() => {
    const filtered = filterPropertiesByDate(singleMatches, dateFilter)
    setFilteredProperties(filtered)
  }, [singleMatches, dateFilter])


  useEffect(() => {
    const filtered = filterPropertiesByDate(salesSingleMatches, dateFilter)
    setFilteredSalesProperties(filtered)
  }, [salesSingleMatches, dateFilter])



  const parseDate = (dateStr) => {
    if (!dateStr) return null
    const [day, month, year] = dateStr.split('/')
    return new Date(year, month - 1, day)
  }

  const isWithinLastDays = (date, days) => {
    const now = new Date()
    const pastDate = new Date()
    pastDate.setDate(now.getDate() - days)
    // console.log(`Comparing ${date} with ${pastDate}`)
    return date >= pastDate
  }


  // Function to sort by price for letting
  const sortByPrice = () => {
    const sorted = [...filteredProperties].sort((a, b) => {
      const priceA = parseInt(a.property_data.price.replace(/[^\d.]/g, ''))
      const priceB = parseInt(b.property_data.price.replace(/[^\d.]/g, ''))
      return sortPriceOrder === 'asc' ? priceA - priceB : priceB - priceA
    })
    const salesSorted = [...flteredSalesProperties].sort((a, b) => {
      const priceA = parseInt(a.property_data.price.replace(/[^\d.]/g, ''))
      const priceB = parseInt(b.property_data.price.replace(/[^\d.]/g, ''))
      return sortPriceOrder === 'asc' ? priceA - priceB : priceB - priceA
    })
    setFilteredProperties(sorted)
    setFilteredSalesProperties(salesSorted)
    setSortPriceOrder(sortPriceOrder === 'asc' ? 'desc' : 'asc')
  }


  // Function to sort by postcode
  const sortByPostcode = () => {
    const sorted = [...filteredProperties].sort((a, b) => {
      return sortPostcodeOrder === 'asc' ? a.property_data.postcode.localeCompare(b.property_data.postcode) : b.property_data.postcode.localeCompare(a.property_data.postcode)
    })
    const salesSorted = [...flteredSalesProperties].sort((a, b) => {
      return sortPostcodeOrder === 'asc' ? a.property_data.postcode.localeCompare(b.property_data.postcode) : b.property_data.postcode.localeCompare(a.property_data.postcode)
    })
    setFilteredProperties(sorted)
    setFilteredSalesProperties(salesSorted)
    setSortPostcodeOrder(sortPostcodeOrder === 'asc' ? 'desc' : 'asc')
  }


  // ? Section 7: Modals

  // manageing modal for saved iitems added 
  const [savedActionShow, setSavedActionShow] = useState(false)

  // close modal
  const handleSavedActionClose = () => {
    setSavedActionShow(false)
  }

  // show the modal
  const handleSavedActionShow = (e) => {
    setSavedActionShow(true)
    setSelectedRows([])
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
          variableSide={variableSide}
          setProfileContent={setProfileContent}
          setVariableSide={setVariableSide}
          userData={userData}
        />
        <section className='main-body'>
          <section className='main-body-details'  >

            <>
              {/*             
              {userData && userData.usage_stats[0] &&
                ((userData.usage_stats[0].package === 'Basic' && userData.usage_stats[0].epc_monthly_count < 11) ||
                  (userData.usage_stats[0].package === 'Unlimited') ||
                  (userData.usage_stats[0].package === 'Advanced Pilot' && userData.usage_stats[0].epc_monthly_count < 101)) ? */}
              <section className='property-finder'>
                <div className='listing-options'>
                  <div className='listing-buttons'>
                    <h5 className='no-print' onClick={() => setLeadGenSection('Home')} style={{ borderBottom: leadGenSection === 'Home' ? '3px solid #ED6B86' : 'none', textUnderlineOffset: leadGenSection === 'Home' ? '0.5em' : 'initial', fontWeight: leadGenSection === 'Home' ? '700' : '400' }}>Home</h5>
                    <h5 className='no-print' onClick={() => setLeadGenSection('Explore properties')} style={{ borderBottom: leadGenSection === 'Explore properties' ? '3px solid #ED6B86' : 'none', textUnderlineOffset: leadGenSection === 'Explore properties' ? '0.5em' : 'initial', fontWeight: leadGenSection === 'Explore properties' ? '700' : '400' }}>Explore properties</h5>
                    <h5 className='no-print' onClick={() => setLeadGenSection('Saved properties')} style={{ borderBottom: leadGenSection === 'Saved properties' ? '3px solid #ED6B86' : 'none', textUnderlineOffset: leadGenSection === 'Saved properties' ? '0.5em' : 'initial', fontWeight: leadGenSection === 'Saved properties' ? '700' : '400' }}>Saved properties</h5>
                    <h5 className='no-print' onClick={() => setLeadGenSection('Archived properties')} style={{ borderBottom: leadGenSection === 'Archived properties' ? '3px solid #ED6B86' : 'none', textUnderlineOffset: leadGenSection === 'Archived properties' ? '0.5em' : 'initial', fontWeight: leadGenSection === 'Archived properties' ? '700' : '400' }}>Archived properties</h5>
                  </div>
                  <div className='logout-button' onClick={removeItemFromStorage}>
                    <div className='logout-icon'></div>
                  </div>


                </div>
                <hr className='title-line' />

                <div className='lead-generator'>

                  <div className='property-results'>
                    {leadGenSection === 'Home' ?
                      <>
                        <div className='lead-gen-inputs'>
                          <h3 className='sub-title'>Set your search criteria</h3>
                          <div className='single-input-block'>
                            <div className='input-block large'>
                              <h3>Postcode(s)</h3>
                              <p>Add multiple postcodes by separating with a comma, and include any part of the postcode, e.g. &ldquo;SW4,SW5&rdquo;</p>
                              <input
                                type="text"
                                value={leadGenDetails.postcode}
                                onChange={inputPostcode}
                                placeholder="Enter postcode..."
                              />
                            </div>
                          </div>
                          <div className='single-input-block'>
                            <div className='input-block large'>
                              <h3>Channel</h3>
                              <select className='dropdown' value={leadGenDetails.channel || 'Lettings'} onChange={(e) => setLeadGenDetails(prevData => ({ ...prevData, channel: e.target.value }))}>
                                <option>Lettings</option>
                                <option>Sales</option>
                                <option>Both</option>

                              </select>
                            </div>
                          </div>
                          <div>

                            <div className='see-more-section' onClick={() => setExpand(!expand)}>
                              <h3 className='sub-title'>Add some more detail</h3>

                              {expand ? <h3 className='sub-title'>^</h3> : <h3 className='sub-title'>v</h3>}
                            </div>
                            {expand ?
                              <>
                                <div className='single-title-double'>
                                  <h3>Bedrooms</h3>
                                  <div className='double-dropdowns'>
                                    <select
                                      className='dropdown'
                                      value={leadGenDetails.bedrooms_min || ''}
                                      onChange={(e) => setLeadGenDetails(prevData => ({
                                        ...prevData,
                                        bedrooms_min: e.target.value === '' ? null : e.target.value,
                                      }))}
                                    >
                                      <option value=''>No min</option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                      <option value="5">5</option>
                                      <option value="6">6</option>
                                    </select>
                                    <select
                                      className='dropdown'
                                      value={leadGenDetails.bedrooms_max || ''}
                                      onChange={(e) => setLeadGenDetails(prevData => ({
                                        ...prevData,
                                        bedrooms_max: e.target.value === '' ? null : e.target.value,
                                      }))}
                                    >
                                      <option value=''>No max</option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                      <option value="5">5</option>
                                      <option value="6">6</option>
                                      <option value="7">7</option>
                                    </select>
                                  </div>

                                </div>
                                {
                                  leadGenDetails.channel === 'Lettings' ?
                                    <>
                                      <div className='single-title-double'>
                                        <h3>Price</h3>
                                        <div className='double-dropdowns'>
                                          <select
                                            className='dropdown'
                                            value={leadGenDetails.rental_price_min || ''}
                                            onChange={(e) => setLeadGenDetails(prevData => ({ ...prevData, rental_price_min: e.target.value }))}
                                          >
                                            <option value={0}>No min</option>
                                            {rentalPrices.map((price, index) => (
                                              <option key={index} value={price}>
                                                <NumericFormat
                                                  value={price}
                                                  displayType={'text'}
                                                  thousandSeparator={true}
                                                  prefix={'£'}
                                                />
                                              </option>
                                            ))}
                                          </select>
                                          <select
                                            className='dropdown'
                                            value={leadGenDetails.rental_price_max || ''}
                                            onChange={(e) => setLeadGenDetails(prevData => ({ ...prevData, rental_price_max: e.target.value }))}
                                          >
                                            <option value={10000000}>No max</option>
                                            {rentalPrices.map((price, index) => (
                                              <option key={index} value={price}>
                                                <NumericFormat
                                                  value={price}
                                                  displayType={'text'}
                                                  thousandSeparator={true}
                                                  prefix={'£'}
                                                />
                                              </option>
                                            ))}
                                          </select>

                                        </div>

                                      </div>
                                      <div className='single-input-block'>
                                        <div className='input-block large'>
                                          <h3>Furnishing status</h3>
                                          <select className='dropdown' value={leadGenDetails.rental_additional || 'Either furnished or unfurnished'} onChange={(e) => setLeadGenDetails(prevData => ({ ...prevData, rental_additional: e.target.value }))}>
                                            <option>Either furnished or unfurnished</option>
                                            <option>Furnished</option>
                                            <option>Unfurnished</option>
                                          </select>
                                        </div>
                                      </div>
                                    </>
                                    :
                                    leadGenDetails.channel === 'Sales' ?
                                      <>
                                        <div className='single-title-double'>
                                          <h3>Price</h3>
                                          <div className='double-dropdowns'>
                                            <select
                                              className='dropdown'
                                              value={leadGenDetails.sales_price_min || ''}
                                              onChange={(e) => setLeadGenDetails(prevData => ({ ...prevData, sales_price_min: e.target.value }))}
                                            >
                                              <option value={0}>No min</option>
                                              {salesPrices.map((price, index) => (
                                                <option key={index} value={price}>
                                                  <NumericFormat
                                                    value={price}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    prefix={'£'}
                                                  />
                                                </option>
                                              ))}
                                            </select>
                                            <select
                                              className='dropdown'
                                              value={leadGenDetails.sales_price_max || ''}
                                              onChange={(e) => setLeadGenDetails(prevData => ({ ...prevData, sales_price_max: e.target.value }))}
                                            >
                                              <option value={100000000}>No max</option>
                                              {salesPrices.map((price, index) => (
                                                <option key={index} value={price}>
                                                  <NumericFormat
                                                    value={price}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    prefix={'£'}
                                                  />
                                                </option>
                                              ))}
                                            </select>

                                          </div>

                                        </div>
                                      </>
                                      :
                                      leadGenDetails.channel === 'Both' ?
                                        <>
                                          <div className='single-title-double'>
                                            <h3>Rental price</h3>
                                            <div className='double-dropdowns'>
                                              <select
                                                className='dropdown'
                                                value={leadGenDetails.rental_price_min || ''}
                                                onChange={(e) => setLeadGenDetails(prevData => ({ ...prevData, rental_price_min: e.target.value }))}
                                              >
                                                <option value={0}>No min</option>
                                                {rentalPrices.map((price, index) => (
                                                  <option key={index} value={price}>
                                                    <NumericFormat
                                                      value={price}
                                                      displayType={'text'}
                                                      thousandSeparator={true}
                                                      prefix={'£'}
                                                    />
                                                  </option>
                                                ))}
                                              </select>
                                              <select
                                                className='dropdown'
                                                value={leadGenDetails.rental_price_max || ''}
                                                onChange={(e) => setLeadGenDetails(prevData => ({ ...prevData, rental_price_max: e.target.value }))}
                                              >
                                                <option value={10000000}>No max</option>
                                                {rentalPrices.map((price, index) => (
                                                  <option key={index} value={price}>
                                                    <NumericFormat
                                                      value={price}
                                                      displayType={'text'}
                                                      thousandSeparator={true}
                                                      prefix={'£'}
                                                    />
                                                  </option>
                                                ))}
                                              </select>

                                            </div>

                                          </div>
                                          <div className='single-input-block'>
                                            <div className='input-block large'>
                                              <h3>Rental furnishing status</h3>
                                              <select className='dropdown' value={leadGenDetails.rental_additional || 'Either furnished or unfurnished'} onChange={(e) => setLeadGenDetails(prevData => ({ ...prevData, rental_additional: e.target.value }))}>
                                                <option>Either furnished or unfurnished</option>
                                                <option>Furnished</option>
                                                <option>Unfurnished</option>
                                              </select>
                                            </div>
                                          </div>
                                          <div className='single-title-double'>
                                            <h3>Sales price</h3>
                                            <div className='double-dropdowns'>
                                              <select
                                                className='dropdown'
                                                value={leadGenDetails.sales_price_min || ''}
                                                onChange={(e) => setLeadGenDetails(prevData => ({ ...prevData, sales_price_min: e.target.value }))}
                                              >
                                                <option value={0}>No min</option>
                                                {salesPrices.map((price, index) => (
                                                  <option key={index} value={price}>
                                                    <NumericFormat
                                                      value={price}
                                                      displayType={'text'}
                                                      thousandSeparator={true}
                                                      prefix={'£'}
                                                    />
                                                  </option>
                                                ))}
                                              </select>
                                              <select
                                                className='dropdown'
                                                value={leadGenDetails.sales_price_max || ''}
                                                onChange={(e) => setLeadGenDetails(prevData => ({ ...prevData, sales_price_max: e.target.value }))}
                                              >
                                                <option value={100000000}>No max</option>
                                                {salesPrices.map((price, index) => (
                                                  <option key={index} value={price}>
                                                    <NumericFormat
                                                      value={price}
                                                      displayType={'text'}
                                                      thousandSeparator={true}
                                                      prefix={'£'}
                                                    />
                                                  </option>
                                                ))}
                                              </select>

                                            </div>

                                          </div>
                                        </>


                                        : ''}

                              </>
                              : ''}
                          </div>
                          <div className='lead-gen-save'>
                            <button className='save-details' onClick={addSearchCriteria}>Save details</button>
                          </div>
                        </div>

                      </>
                      :
                      leadGenSection === 'Explore properties' && !rentalLoading ?
                        <>
                          <div className='results-block'>
                            <div className="property-insight-nav">
                              <div className="property-insight-buttons">
                                <h3 className={`insight-button ${channelView === 'Lettings' ? 'active' : 'inactive'}`} id='left' onClick={() => setChannelView('Lettings')}>Lettings</h3>
                                <h3 className={`insight-button ${channelView === 'Sales' ? 'active' : 'inactive'}`} id='right' onClick={() => setChannelView('Sales')}>Sales</h3>
                              </div>
                              <div className='save-section'>
                                <div className="print-icon"></div>

                                <h3 onClick={addFavourite}>Save selection</h3>
                              </div>
                            </div>
                            {channelView === 'Lettings' ?
                              <>
                                <div className='filter-section'>
                                  <h3>Filter properties</h3>
                                  <select
                                    className='dropdown'
                                    value={dateFilter}
                                    onChange={(e) => setDateFilter(e.target.value)}
                                  >
                                    <option value="1day">Updated in the last 24 hours</option>
                                    <option value="2days">Updated in the last 48 hours</option>
                                    <option value="3days">Updated in the last 72 hours</option>
                                    <option value="7days">Updated in the last week</option>
                                    <option value="4weeks">Updated in the last 4 weeks</option>
                                    <option value="8weeks">Updated in the last 8 weeks</option>
                                    <option value="12weeks">Updated in the last 12 weeks</option>
                                    <option value="16weeks">Updated in the last 16 weeks</option>
                                    <option value="all">All matching properties</option>
                                  </select>
                                </div>
                                {rentalLoading ?
                                  <div className='property-table-loading'>
                                    <Loading />
                                  </div>
                                  : !rentalLoading ?
                                    <>
                                      <div className='title-section'>
                                        <h3 className='sub-title'>There are {filteredProperties.length} rental properties that match your criteria</h3>
                                        <div className='select-all-box'>
                                          <h5>Select all</h5>
                                          <div className='custom-checkbox'>
                                            <input
                                              className='checkbox'
                                              type="checkbox"
                                              checked={checkboxStatus.length > 0 && checkboxStatus.every(Boolean)}
                                              onChange={handleSelectAllChange}
                                            />
                                            <label className='label'>

                                            </label>

                                          </div>
                                        </div>
                                      </div>

                                      <div className='results-headers'>
                                        <h5 id='column1' className='column'>#</h5>
                                        <div id='column2' className='column' >
                                          <h5>Address</h5>
                                        </div>
                                        <div id='column3' className='column' onClick={sortByPostcode}>
                                          <h5>Postcode</h5>
                                          <h5>⬇️</h5>
                                        </div>
                                        <div id='column4' className='column'>
                                          <h5>Added</h5>
                                        </div>
                                        <div id='column5' className='column'>
                                          <h5>Reduced</h5>
                                        </div>
                                        <div id='column6' className='column'>
                                          <h5>Property type</h5>
                                        </div>
                                        <div id='column7' className='column' onClick={sortByPrice}>
                                          <h5>Price</h5>
                                          <h5>⬇️</h5>
                                        </div>
                                        <div id='column8' className='column'>
                                          <h5>Bedrooms</h5>
                                        </div>
                                        <div id='column9' className='column'>
                                          <h5>Agent</h5>
                                        </div>
                                        <div id='column10' className='column'>
                                          <h5>Select</h5>
                                        </div>
                                      </div>
                                      <hr className='property-divider' />
                                      <div className='results-details'>
                                        {filteredProperties ? filteredProperties.map((item, index) => {
                                          const isRowSelected = selectedRows.some(selectedRow => selectedRow.rightmove_id === item.property_data.rightmove_id)

                                          return (
                                            <>
                                              <div className={`results-content ${isRowSelected ? 'highlighted-row' : ''}`}>
                                                <div className='column' id='column1' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                  <h5>{index + 1}</h5>
                                                </div>
                                                <div className='column' id='column2' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                  <h5>{item.epc_data_list[0].address}</h5>
                                                </div>
                                                <div className='column' id='column3' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                  <h5>{item.property_data.postcode}</h5>
                                                </div>
                                                <div className='column' id='column4' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                  <h5>{item.property_data.added_revised === null ? 'N/a' : item.property_data.added_revised}</h5>
                                                </div>
                                                <div className='column' id='column5' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                  <h5>{item.property_data.reduced_revised === null ? 'N/a' : item.property_data.reduced_revised}</h5>
                                                </div>
                                                <div className='column' id='column6' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                  <h5>{item.property_data.propertyType}</h5>
                                                </div>
                                                <div className='column' id='column7' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                  <h5>{item.property_data.price}</h5>
                                                </div>
                                                <div className='column' id='column8' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                  <h5>{item.property_data.bedrooms}</h5>
                                                </div>
                                                <div className='column' id='column9' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                  <h5>{item.property_data.agent}</h5>
                                                </div>
                                                <div className='column' id='column10'>
                                                  <div className='custom-checkbox'>

                                                    <input
                                                      className='checkbox'
                                                      type="checkbox"
                                                      checked={checkboxStatus[index]}
                                                      onChange={(e) => handleCheckboxChange(e, index)} // Pass the index here
                                                    />
                                                    <label className='label'>

                                                    </label>
                                                  </div>
                                                </div>
                                              </div>
                                              <hr className='property-divider' />

                                            </>
                                          )
                                        })
                                          : ' '}
                                      </div>


                                    </>
                                    : ''}
                              </>
                              : channelView === 'Sales' ?
                                <>
                                  <div className='filter-section'>
                                    <h3>Filter properties</h3>
                                    <select
                                      className='dropdown'
                                      value={dateFilter}
                                      onChange={(e) => setDateFilter(e.target.value)}
                                    >
                                      <option value="1day">Updated in the last 24 hours</option>
                                      <option value="2days">Updated in the last 48 hours</option>
                                      <option value="3days">Updated in the last 72 hours</option>
                                      <option value="7days">Updated in the last week</option>
                                      <option value="4weeks">Updated in the last 4 weeks</option>
                                      <option value="8weeks">Updated in the last 8 weeks</option>
                                      <option value="12weeks">Updated in the last 12 weeks</option>
                                      <option value="16weeks">Updated in the last 16 weeks</option>
                                      <option value="all">All matching properties</option>
                                    </select>
                                  </div>
                                  {salesLoading ?
                                    <div className='property-table-loading'>
                                      <Loading />
                                    </div>
                                    : !salesLoading ?
                                      <>
                                        <div className='title-section'>
                                          <h3 className='sub-title'>There are {flteredSalesProperties.length} properties for sale that match your criteria</h3>
                                          <div className='select-all-box'>
                                            <h5>Select all</h5>
                                            <div className='custom-checkbox'>
                                              <input
                                                className='checkbox'
                                                type="checkbox"
                                                checked={salesCheckboxStatus.length > 0 && salesCheckboxStatus.every(Boolean)}
                                                onChange={handleSelectAllSalesChange}
                                              />
                                              <label className='label'>

                                              </label>

                                            </div>
                                          </div>
                                        </div>

                                        <div className='results-headers'>
                                          <h5 id='column1' className='column'>#</h5>
                                          <div id='column2' className='column' >
                                            <h5>Address</h5>
                                          </div>
                                          <div id='column3' className='column' onClick={sortByPostcode}>
                                            <h5>Postcode</h5>
                                            <h5>⬇️</h5>
                                          </div>
                                          <div id='column4' className='column'>
                                            <h5>Added</h5>
                                          </div>
                                          <div id='column5' className='column'>
                                            <h5>Reduced</h5>
                                          </div>
                                          <div id='column6' className='column'>
                                            <h5>Property type</h5>
                                          </div>
                                          <div id='column7' className='column' onClick={sortByPrice}>
                                            <h5>Price</h5>
                                            <h5>⬇️</h5>
                                          </div>
                                          <div id='column8' className='column'>
                                            <h5>Bedrooms</h5>
                                          </div>
                                          <div id='column9' className='column'>
                                            <h5>Agent</h5>
                                          </div>
                                          <div id='column10' className='column'>
                                            <h5>Select</h5>
                                          </div>
                                        </div>
                                        <hr className='property-divider' />
                                        <div className='results-details'>
                                          {flteredSalesProperties ? flteredSalesProperties.map((item, index) => {
                                            const isRowSelected = selectedSalesRows.some(selectedRow => selectedRow.rightmove_id === item.property_data.rightmove_id)

                                            return (
                                              <>
                                                <div className={`results-content ${isRowSelected ? 'highlighted-row' : ''}`}>
                                                  <div className='column' id='column1' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                    <h5>{index + 1}</h5>
                                                  </div>
                                                  <div className='column' id='column2' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                    <h5>{item.epc_data_list[0].address}</h5>
                                                  </div>
                                                  <div className='column' id='column3' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                    <h5>{item.property_data.postcode}</h5>
                                                  </div>
                                                  <div className='column' id='column4' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                    <h5>{item.property_data.added_revised === null ? 'N/a' : item.property_data.added_revised}</h5>
                                                  </div>
                                                  <div className='column' id='column5' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                    <h5>{item.property_data.reduced_revised === null ? 'N/a' : item.property_data.reduced_revised}</h5>
                                                  </div>
                                                  <div className='column' id='column6' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                    <h5>{item.property_data.propertyType}</h5>
                                                  </div>
                                                  <div className='column' id='column7' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                    <h5>{item.property_data.price}</h5>
                                                  </div>
                                                  <div className='column' id='column8' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                    <h5>{item.property_data.bedrooms}</h5>
                                                  </div>
                                                  <div className='column' id='column9' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                    <h5>{item.property_data.agent}</h5>
                                                  </div>
                                                  <div className='column' id='column10'>
                                                    {archivedProperties.some(fav => fav.rightmove_id === item.property_data.rightmove_id) || savedProperties.some(fav => fav.rightmove_id === item.property_data.rightmove_id) ?
                                                      <p>Saved</p>
                                                      :
                                                      <div className='custom-checkbox'>

                                                        <input
                                                          className='checkbox'
                                                          type="checkbox"
                                                          checked={salesCheckboxStatus[index]}
                                                          onChange={(e) => salesCheckboxChange(e, index)} // Pass the index here
                                                        />
                                                        <label className='label'>

                                                        </label>
                                                      </div>
                                                    }
                                                  </div>
                                                </div>
                                                <hr className='property-divider' />

                                              </>
                                            )
                                          })
                                            : ' '}
                                        </div>


                                      </>
                                      : ''}
                                </>
                                :

                                ''}
                          </div>
                        </>
                        : leadGenSection === 'Explore properties' && rentalLoading ?
                          <div className='property-table-loading'>
                            <Loading />
                          </div>
                          : leadGenSection === 'Saved properties' ?
                            <>
                              <div className='results-block'>
                                {savedProperties && savedProperties.length > 0 ?
                                  <>
                                    <div className='title-section'>
                                      <h3 className='sub-title'>You have {savedProperties.length} properties ready to be extracted</h3>
                                      {userData && userData.epc_favourites && (
                                        <>
                                          <CSVLink
                                            data={csvData}
                                            className='export'
                                            filename={`Wittle Lead Generator Extract - ${getCurrentDate()}.csv`}
                                            style={{ textDecoration: 'none' }}
                                          >
                                            <div className='header-cta' onClick={() => archiveFavourite(userData.epc_favourites.map(fav => fav.rightmove_id))}>
                                              <div className='copy-button'>
                                                <div className='export-icon'></div>
                                                <h3 style={{ textDecoration: 'none' }}>Export</h3>
                                              </div>
                                            </div>
                                          </CSVLink>
                                        </>
                                      )}
                                    </div><div className='results-headers'>
                                      <h5 id='column1' className='column'>#</h5>
                                      <div id='column2' className='column'>
                                        <h5>Address</h5>
                                      </div>
                                      <div id='column3' className='column'>
                                        <h5>Postcode</h5>
                                      </div>
                                      <div id='column4' className='column'>
                                        <h5>Added</h5>
                                      </div>
                                      <div id='column5' className='column'>
                                        <h5>Reduced</h5>
                                      </div>
                                      <div id='column6' className='column'>
                                        <h5>Channel</h5>
                                      </div>
                                      <div id='column7' className='column'>
                                        <h5>Price</h5>
                                      </div>
                                      <div id='column8' className='column'>
                                        <h5>Bedrooms</h5>
                                      </div>
                                      <div id='column9' className='column'>
                                        <h5>Agent</h5>
                                      </div>
                                      <div id='column10' className='column'>
                                        <h5></h5>
                                      </div>
                                    </div>
                                    <hr className='property-divider' />
                                    <div className='saved-properties'>

                                      <div className='results-details'>
                                        {savedProperties ? savedProperties.map((item, index) => {
                                          return (
                                            <>
                                              <div className='results-content'>
                                                <div className='column' id='column1' onClick={() => handleVisitUrl(item.url)}>
                                                  <h5>{index + 1}</h5>
                                                </div>
                                                <div className='column' id='column2' onClick={() => handleVisitUrl(item.url)}>
                                                  <h5>{item.address}</h5>
                                                </div>
                                                <div className='column' id='column3' onClick={() => handleVisitUrl(item.url)}>
                                                  <h5>{item.postcode}</h5>
                                                </div>
                                                <div className='column' id='column4' onClick={() => handleVisitUrl(item.url)}>
                                                  <h5>{item.added_revised === null ? 'N/a' : item.added_revised}</h5>
                                                </div>
                                                <div className='column' id='column5' onClick={() => handleVisitUrl(item.url)}>
                                                  <h5>{item.reduced_revised === null ? 'N/a' : item.reduced_revised}</h5>
                                                </div>
                                                <div className='column' id='column6' onClick={() => handleVisitUrl(item.url)}>
                                                  <h5>{item.channel}</h5>
                                                </div>
                                                <div className='column' id='column7' onClick={() => handleVisitUrl(item.url)}>
                                                  <h5>{item.price}</h5>
                                                </div>
                                                <div className='column' id='column8' onClick={() => handleVisitUrl(item.url)}>
                                                  <h5>{item.bedrooms}</h5>
                                                </div>
                                                <div className='column' id='column9' onClick={() => handleVisitUrl(item.url)}>
                                                  <h5>{item.agent}</h5>
                                                </div>
                                                <div className='column' id='column10'>
                                                  <button className='minus' onClick={() => deleteFavourite(item.rightmove_id)}>-</button>
                                                </div>
                                              </div>
                                              <hr className='property-divider' />


                                            </>
                                          )
                                        })

                                          : ' '}
                                      </div>
                                    </div>

                                  </>
                                  : <h3 className='sub-title'>You haven&apos;t saved any properties yet! Once you&apos;ve saved some properties, you&apos;ll be able to extract them.</h3>
                                }
                              </div>


                            </>
                            : leadGenSection === 'Archived properties' ?
                              <>
                                <div className='results-block'>
                                  {archivedProperties && archivedProperties.length > 0 ?
                                    <>
                                      <div className='title-section'>
                                        <h3 className='sub-title'>You have archived {archivedProperties.length} properties</h3>


                                      </div><div className='results-headers'>
                                        <h5 id='column1' className='column'>#</h5>
                                        <div id='column2' className='column'>
                                          <h5>Address</h5>
                                        </div>
                                        <div id='column3' className='column'>
                                          <h5>Postcode</h5>
                                        </div>
                                        <div id='column4' className='column'>
                                          <h5>Added</h5>
                                        </div>
                                        <div id='column5' className='column'>
                                          <h5>Reduced</h5>
                                        </div>
                                        <div id='column6' className='column'>
                                          <h5>Property type</h5>
                                        </div>
                                        <div id='column7' className='column'>
                                          <h5>Price</h5>
                                        </div>
                                        <div id='column8' className='column'>
                                          <h5>Bedrooms</h5>
                                        </div>
                                        <div id='column9' className='column'>
                                          <h5>Agent</h5>
                                        </div>
                                        <div id='column10' className='column'>
                                          <h5>Channel</h5>
                                        </div>
                                      </div><hr className='property-divider' /><div className='results-details'>
                                        {archivedProperties ? archivedProperties.map((item, index) => {
                                          return (
                                            <>
                                              <div className='results-content'>
                                                <div className='column' id='column1' onClick={() => handleVisitUrl(item.url)}>
                                                  <h5>{index + 1}</h5>
                                                </div>
                                                <div className='column' id='column2' onClick={() => handleVisitUrl(item.url)}>
                                                  <h5>{item.address}</h5>
                                                </div>
                                                <div className='column' id='column3' onClick={() => handleVisitUrl(item.url)}>
                                                  <h5>{item.postcode}</h5>
                                                </div>
                                                <div className='column' id='column4' onClick={() => handleVisitUrl(item.url)}>
                                                  <h5>{item.added_revised}</h5>
                                                </div>
                                                <div className='column' id='column5' onClick={() => handleVisitUrl(item.url)}>
                                                  <h5>{item.reduced_revised}</h5>
                                                </div>
                                                <div className='column' id='column6' onClick={() => handleVisitUrl(item.url)}>
                                                  <h5>{item.property_type}</h5>
                                                </div>
                                                <div className='column' id='column7' onClick={() => handleVisitUrl(item.url)}>
                                                  <h5>{item.price}</h5>
                                                </div>
                                                <div className='column' id='column8' onClick={() => handleVisitUrl(item.url)}>
                                                  <h5>{item.bedrooms}</h5>
                                                </div>
                                                <div className='column' id='column9' onClick={() => handleVisitUrl(item.url)}>
                                                  <h5>{item.agent}</h5>
                                                </div>
                                                <div className='column' id='column10' onClick={() => handleVisitUrl(item.url)}>
                                                  <h5>{item.channel}</h5>
                                                </div>
                                              </div>
                                              <hr className='property-divider' />


                                            </>
                                          )
                                        })
                                          : ' '}
                                      </div>
                                    </>
                                    : <h3 className='sub-title'>You haven&apos;t archived any properties yet! Once you&apos;ve extracted properties to your files, you&apo;ll see them here.</h3>
                                  }
                                </div>


                              </>
                              :
                              ''
                    }
                  </div>
                </div>


              </section>


            </>

          </section>
        </section>
      </section >

      {/* Modals */}
      < SavedProperties
        savedActionShow={savedActionShow}
        handleSavedActionClose={handleSavedActionClose}
        setLeadGenSection={setLeadGenSection}
        latestFavourites={latestFavourites}
      />




    </>
  )
}

export default LeadGenerator


// : userData && userData.usage_stats[0].package === 'Basic' && userData.usage_stats[0].epc_monthly_count >= 11 ?
//   <section className='property-finder'>
//     <h1>🙏 Thanks for enjoying Wittle!</h1>
//     <h3 className='limit-reached'>You have reached the free limit of matches for this month, get in touch to unlock another 90 matches.</h3>
//   </section>

//   : userData && userData.usage_stats[0].package === 'Advanced pilot' && userData.usage_stats[0].epc_monthly_count >= 101 ?
//     <section className='property-finder'>
//       <h1>🙏 Thanks for enjoying Wittle!</h1>
//       <h3 className='limit-reached'>You have carried out 100 matches this month, get in touch to discuss increasing your limit.</h3>
//     </section>

//     : ''}