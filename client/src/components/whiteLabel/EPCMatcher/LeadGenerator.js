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
import ManualMatcher from '../EPCMatcher/ManualMatcher'
import RemoveProperty from '../b2bModals/RemoveProperties'
import RemoveProperties from '../b2bModals/RemoveProperties'
import LeadGenSaved from './LeadGenSections/LeadGenSaved'
import HiddenProperties from './LeadGenSections/HiddenProperties'
import ArchivedProperties from './LeadGenSections/ArchivedProperties'
import { ToastContainer, toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { eventBus } from '../../../utils/EventBus'
import LettersHub from './LetterSection/LettersHubs'




axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const LeadGenerator = () => {


  // state to enable navigation between pages
  const navigate = useNavigate()

  // set state for errors
  const [errors, setErrors] = useState()

  // set state for the number of extracts left left
  const [leadGenRemaining, setLeadGenRemaining] = useState()

  // set state for user
  const [userData, setUserData] = useState()
  const [userPackage, setUserPackage] = useState()

  // set state for rentalLoading
  const [rentalLoading, setRentalLoading] = useState()
  const [salesLoading, setSalesLoading] = useState()
  const [campaignLoading, setCampaignLoading] = useState()

  // set state for completing a search
  const [search, setSearch] = useState(false)

  // state for determining what content shows
  const [profileContent, setProfileContent] = useState('Comparison')
  const [profileDetail, setProfileDetail] = useState('Comparison')

  // states for pop outs on the side
  const [variableSide, setVariableSide] = useState(false)

  const [postcodeSubstring, setPostcodeSubstring] = useState('')
  const [subcodeSubstring, setSubcodeString] = useState('')
  const [roadSubstring, setRoadSubstring] = useState('')
  const [currentEnergy, setCurrentEnergy] = useState()
  const [potentialEnergy, setPotentialEnergy] = useState()
  const [longPropertyList, setLongPropertyList] = useState([])
  const [propertyList, setPropertyList] = useState([])
  const [channel, setChannel] = useState('')

  const [inputType, setInputType] = useState('Efficiency')


  const [favouritedProperties, setFavouritedProperties] = useState([])

  const [savedProperties, setSavedProperties] = useState()
  const [savedRemanining, setSaveddRemaining] = useState()
  const [archivedProperties, setArchivedProperties] = useState()
  const [hiddenProperties, setHiddenProperties] = useState()
  const [letterProperties, setLetterProperties] = useState()

  const [sessionName, setSessionName] = useState(sessionStorage.getItem('sessionName') || '')

  const [targetPostcode, setTargetPostcode] = useState(['SW8'])
  const [combiniedProperties, setCombinedProperties] = useState()

  const [leadGenSection, setLeadGenSection] = useState('Inputs')

  const [noMatches, setNoMatches] = useState([])
  const [singleMatches, setSingleMatches] = useState([])
  const [multipleMatches, setMultipleMatches] = useState([])

  const [salesNoMatches, setSalesNoMatches] = useState([])
  const [salesSingleMatches, setSalesSingleMatches] = useState([])
  const [salesMultipleMatches, setSalesMultipleMatches] = useState([])

  const [channelView, setChannelView] = useState('Lettings')

  const [expand, setExpand] = useState(false)

  const [availableCredits, setAvailableCredits] = useState(null)

  const [leadGenDetails, setLeadGenDetails] = useState({
    postcode: '',
    subcode: '',
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

  // managing state for the signature
  const [signature, setSignature] = useState({
    first_name: '',
    last_name: '',
    company_name: '',
    title: '',
    role: '',
    mobile: null,
    landline: null,
    address: '',
    email: '',
    letter_footer: '',
    logo: '',
  })

  // manage state for list of letters
  const [letterTemplates, setLetterTemplates] = useState()

  // manage state for list of letter campaigns
  const [letterCampaigns, setLetterCampaigns] = useState()

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
  const [removedIds, setRemovedIds] = useState([])

  const [filteredProperties, setFilteredProperties] = useState([])
  const [flteredSalesProperties, setFilteredSalesProperties] = useState([])
  const [filteredMatchingProperties, setFilteredMatchingProperties] = useState([])
  const [filteredSalesMatchingProperties, setFilteredSalesMatchingProperties] = useState([])
  const [filteredNoProperties, setFiltedNoProperties] = useState([])
  const [filteredSalesNoProperties, setFiltedSalesNoProperties] = useState([])

  // State variables for sorting
  const [sortPriceOrder, setSortPriceOrder] = useState('asc')
  const [sortPostcodeOrder, setSortPostcodeOrder] = useState('asc')

  const [latestFavourites, setLatestFavourites] = useState()

  const [matchType, setMatchType] = useState('Matching')
  const [salesMatchType, setSalesMatchType] = useState('Matching')
  const [expandedMultipleMatches, setExpandedMultpleMatches] = useState(new Set())
  const [expandedSalesMultipleMatches, setExpandedSalesMultpleMatches] = useState(new Set())



  // ? Section 2: Load user information
  const loadUserData = () => {
    // Assuming the user is authorized, we want to load their profile information and set states based on relevant sections of this
    if (isUserAuth()) {
      const getUser = async () => {
        try {
          setRentalLoading(true)
          setSalesLoading(true)
          setCampaignLoading(true)
          const { data } = await axios.get(`/api/auth/profile/${getUserToken()}/`, {
            headers: {
              Authorization: `Bearer ${getAccessToken()}`,
            },
          })
          console.log('user data ->', data)
          setUserData(data)
          setUserPackage(data.usage_stats[0].package)
          setAvailableCredits(data.usage_stats[0].credits)


          // for the inputs page, sdetermine whether the user has already added them, if they have then set these values
          if (data.lead_gen_details.length > 0) {
            setLeadGenDetails(data.lead_gen_details[0])

            // const updatedFavorites = await updateFavoritesMarketStatus(data)

            const filteredFavourites = data.company_favourites.filter(fav => fav.rightmove_id !== null && fav.action === 'Saved')
            const letters = data.company_favourites.filter(fav => fav.rightmove_id !== null && fav.action === 'Saved' && fav.letter_sequence === 1)
            const archivedFavourites = data.company_favourites.filter(fav => fav.rightmove_id !== null && fav.action === 'Extracted')
            const removedProperties = data.company_favourites.filter(fav => fav.rightmove_id !== null && fav.action === 'Removed')
            const newFavouriteIds = [...filteredFavourites, ...archivedFavourites, ...removedProperties].map(fav => fav.rightmove_id)

            setFavouriteIds(newFavouriteIds)
            setRemovedIds(removedProperties)
            console.log('removed properties ->', removedProperties)
            const dataCsv = transformCSVData(data.company_favourites)

            if (data.lead_gen_details[0].channel === 'Lettings') {
              setSalesLoading(false)
              loadCombinedPropertiesFromUser(data, removedProperties, dateFilter)
            } else if (data.lead_gen_details[0].channel === 'Sales') {
              setRentalLoading(false)
              loadCombinedSalesFromUser(data, removedProperties, dateFilter)
            } else if (data.lead_gen_details[0].channel === 'Both') {
              loadCombinedSalesFromUser(data, removedProperties, dateFilter)
              loadCombinedPropertiesFromUser(data, removedProperties, dateFilter)
            }
            setSavedProperties(filteredFavourites)
            setLetterProperties(letters)
            setSignature(data.letter_signatures[0])
            setLetterTemplates(data.letter_templates)
            setLetterCampaigns(data.letter_campaigns)
            console.log('letter properties ->', letters)
            console.log('saved properties ->', filteredFavourites)
            setArchivedProperties(archivedFavourites)
            setHiddenProperties(removedProperties)
            // setCsvData(dataCsv)
            console.log('existing dtails ->', data.lead_gen_details[0])
            increaseUsageCount()
            eventBus.emit('userDataUpdated')
            setCampaignLoading(false)
          } else {
            const allFavouriteIds = []
            // loadCombinedPropertiesFromUser(data, allFavouriteIds, dateFilter)
            // loadCombinedSalesFromUser(data, allFavouriteIds, dateFilter)
            console.log('date -> ', dateFilter)
            setCampaignLoading(false)

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
    const credits = JSON.parse(localStorage.getItem('wittle-latest-credits'))
    console.log('credit path ->', credits)
    const value = JSON.parse(localStorage.getItem('wittle-credit-value'))
    console.log('credit value ->', value)
    const params = new URLSearchParams(window.location.search)
    if (credits === 'Yes' && params.get('success')) {
      Swal.fire({
        title: '😎 action complete',
        text: `£${value} added to your letter credits`,
        confirmButtonText: 'Thanks 🤝',
        confirmButtonColor: '#ED6B86',
        cancelButtonText: 'Stay here',
        backdrop: true,
        background: '#FDF7F0',
        customClass: {
          title: 'popup-swal-title',
          popup: 'popup-swal-body',
          confirmButton: 'popup-swal-confirm',
          cancelButton: 'popup-swal-cancel',
        },
      })
      navigate('/agents/lead-gen')
      setLeadGenSection('Letter campaigns')
      loadUserData()
      localStorage.removeItem('wittle-latest-credits')
      localStorage.removeItem('wittle-credit-value')
    } else if (credits === 'Yes' && params.get('cancelled')) {
      navigate('/agents/lead-gen')
      setLeadGenSection('Letter campaigns')
      loadUserData()
      Swal.fire({
        title: '🫡 Wittle alerts',
        text: 'There was an error processing your payment',
        confirmButtonText: 'Thanks 🤝',
        confirmButtonColor: '#ED6B86',
        cancelButtonText: 'Stay here',
        backdrop: true,
        background: '#FDF7F0',
        customClass: {
          title: 'popup-swal-title',
          popup: 'popup-swal-body',
          confirmButton: 'popup-swal-confirm',
          cancelButton: 'popup-swal-cancel',
        },
      })
      localStorage.removeItem('wittle-latest-credits')
      localStorage.removeItem('wittle-credit-value')
    } else {
      loadUserData()
    }
  }, [])




  // ? Section 3: Handling favourites data - selecting, adding, editing and  deleting
  // function for adding favourites based on relevant row
  const addFavourite = async () => {
    if (isUserAuth()) {
      // get a list of existing favourite ids from the user schema
      const existingFavouriteIds = new Set(userData.company_favourites.map(fav => fav.rightmove_id))
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
        Swal.fire({
          title: '😎 action complete',
          text: `${newFavourites.length} properties added to your saved properties`,
          confirmButtonText: 'Go to saved',
          confirmButtonColor: '#ED6B86',
          cancelButtonText: 'Stay here',
          backdrop: true,
          background: '#FDF7F0',
          customClass: {
            title: 'popup-swal-title',
            popup: 'popup-swal-body',
            confirmButton: 'popup-swal-confirm',
            cancelButton: 'popup-swal-cancel',
          },
        }).then((result) => {
          if (result.isConfirmed) {
            setLeadGenSection('Tracking')
          }
        })
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
  const removeProperty = async () => {
    if (isUserAuth()) {
      // get a list of existing favourite ids from the user schema
      const existingFavouriteIds = new Set(userData.company_favourites.map(fav => fav.rightmove_id))

      // create a list of new unique favourites so we don't have any duplicates in the database
      // console.log(selectedRows)
      const combinedFavourites = [...selectedRows, ...selectedSalesRows]

      const newFavourites = combinedFavourites.filter(row => !existingFavouriteIds.has(row.rightmove_id))

      console.log(newFavourites)

      if (newFavourites.length === 0) {
        console.log('No properties to remove')
        return
      }

      try {
        const response = await axios.post('/api/epc_favourite/remove_property/', newFavourites, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        console.log('Response:', response.data)
        setLatestFavourites(newFavourites.length)
        loadUserData()
        setMatchType('Matching')
        setSelectedRows([])
        setSelectedSalesRows([])
        setCheckboxStatus(singleMatches.map(() => false))
        setSalesCheckboxStatus(salesSingleMatches.map(() => false))
        handleRemovePropertyClose()
      } catch (error) {
        console.error('Error saving favourite:', error)
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

    console.log('selected property->', selectedProperty)
    if (e.target.checked) {
      console.log('checked')
      setSelectedRows(prevRows => [...prevRows, selectedProperty])
    } else {
      // Assuming 'rightmove_id' is a unique identifier
      setSelectedRows(prevRows => prevRows.filter(row => row.rightmove_id !== selectedProperty.rightmove_id))
    }
  }


  // create function to select all rows
  const selectAllRows = () => {
    const existingCombinations = new Set(userData.company_favourites.map(fav => fav.rightmove_id))

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
    const existingCombinations = new Set(userData.company_favourites.map(fav => fav.rightmove_id))

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
        owner_name: item.owner_name,
        owner_email: item.owner_email,
        owner_mobile: item.owner_mobile,
        emails_sent: item.emails_sent,
        letters_sent: item.letters_sent,
        valuation_booked: item.valuation_booked,
        notes: item.notes,
      }
    })
  }


  // ? Section 4: Property data rentalLoading
  //  Loading latest data from the database based on the postcode areas applied by the user
  const loadCombinedPropertiesFromUser = async (data, deletedProperties, dateFilter) => {
    // setRentalLoading(true)
    const postcodeValue = data.lead_gen_details[0].postcode
    const subcodeValue = data.lead_gen_details[0].subcode
    const bedroomsMin = data.lead_gen_details[0].bedrooms_min
    const bedroomsMax = data.lead_gen_details[0].bedrooms_max
    const priceMin = data.lead_gen_details[0].rental_price_min
    const priceMax = data.lead_gen_details[0].rental_price_max
    const additionalRental = data.lead_gen_details[0].rental_additional

    try {
      const url = `/api/epc_properties_rental/combined-epc-results/?postcode=${postcodeValue}&subcode=${subcodeValue}&min_bedrooms=${bedroomsMin}&max_bedrooms=${bedroomsMax}&rental_price_min=${priceMin}&rental_price_max=${priceMax}&rental_additional=${additionalRental}`

      // extract data based on url
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      console.log('combined data ->', data)

      const deletedPropertyIds = deletedProperties.map(property => property.rightmove_id)
      const filteredData = data.filter(item => !deletedPropertyIds.includes(item.property_data.rightmove_id))

      // Process and categorize the data
      const noMatchesData = filteredData.filter(item => item.epc_data_list.length === 0)
      const singleMatchesData = filteredData.filter(item => item.epc_data_list.length === 1)
      const multipleMatchesData = filteredData.filter(item => item.epc_data_list.length > 1)

      console.log('sngle matches ->', singleMatchesData)
      console.log('no matches ->', noMatchesData)
      console.log('multiple matches ->', multipleMatchesData)

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
  const loadCombinedSalesFromUser = async (data, deletedProperties, dateFilter) => {
    // setSalesLoading(true)
    const postcodeValue = data.lead_gen_details[0].postcode
    const subcodeValue = data.lead_gen_details[0].subcode
    const bedroomsMin = data.lead_gen_details[0].bedrooms_min
    const bedroomsMax = data.lead_gen_details[0].bedrooms_max
    const priceMin = data.lead_gen_details[0].sales_price_min
    const priceMax = data.lead_gen_details[0].sales_price_max

    try {
      const url = `/api/epc_properties/combined-epc-results/?postcode=${postcodeValue}&subcode=${subcodeValue}&min_bedrooms=${bedroomsMin}&max_bedrooms=${bedroomsMax}&sales_price_min=${priceMin}&sales_price_max=${priceMax}`

      // extract data based on url
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      console.log('combined data ->', data)

      const deletedPropertyIds = deletedProperties.map(property => property.rightmove_id)
      const filteredData = data.filter(item => !deletedPropertyIds.includes(item.property_data.rightmove_id))

      // Process and categorize the data
      const noMatchesData = filteredData.filter(item => item.epc_data_list.length === 0)
      const singleMatchesData = filteredData.filter(item => item.epc_data_list.length === 1)
      const multipleMatchesData = filteredData.filter(item => item.epc_data_list.length > 1)

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



  // const updateFavoritesMarketStatus = async (data) => {
  //   const propertyIds = data.company_favourites.filter(fav => fav.rightmove_id !== null).map(fav => fav.rightmove_id)

  //   try {
  //     const response = await axios.post('/api/epc_favourite/update_favourites/status_check/', {
  //       propertyIds,
  //     }, {
  //       headers: {
  //         Authorization: `Bearer ${getAccessToken()}`,
  //       },
  //     })
  //     return response.data // Assuming the backend returns the full updated list

  //   } catch (error) {
  //     console.error('Failed to update market status:', error)
  //   }
  // }

  // Then call this function within loadUserData or wherever appropriate



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
      if (userData.lead_gen_details.channel === 'Lettings') {
        setRentalLoading(true)
      } else if (userData.lead_gen_details.channel === 'Sales') {
        setSalesLoading(true)
      } else if (userData.lead_gen_details.channel === 'Both') {
        setRentalLoading(true)
        setSalesLoading(true)
      }
      setLeadGenSection('Explore')

    } else {
      // POST request for new details
      response = await axios.post('/api/lead_gen_details/', leadGenDetails, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      if (userData.lead_gen_details.channel === 'Lettings') {
        setRentalLoading(true)
      } else if (userData.lead_gen_details.channel === 'Sales') {
        setSalesLoading(true)
      } else if (userData.lead_gen_details.channel === 'Both') {
        setRentalLoading(true)
        setSalesLoading(true)
      }
      setLeadGenSection('Explore')
    }
    loadUserData()
  }


  // input the postcode on the form
  const inputPostcode = (e) => {
    // Convert input to uppercase and remove spaces
    let inputVal = e.target.value.toUpperCase().replace(/\s+/g, '')
    // Split the input value by comma to get individual postcode sections
    const postcodeSections = inputVal.split(',')

    // Check if the number of postcode sections is more than 6
    if (postcodeSections.length > 6) {
      // Optionally, inform the user they can't add more than 6 postcode sections
      Swal.fire({
        title: '🫡 Wittle alerts',
        text: 'To optimise your experience, you can only add up to 6 postcode areas.',
        // icon: 'error',
        confirmButtonText: '🤝 thanks',
        confirmButtonColor: '#ED6B86',
        backdrop: true,
        background: '#FDF7F0',
        customClass: {
          title: 'popup-swal-title',
          popup: 'popup-swal-body',
          confirmButton: 'popup-swal-confirm',
        },
      })
      // Prevent adding more by keeping only the first 6 sections
      inputVal = postcodeSections.slice(0, 6).join(',')
    }

    // Set the formatted input value
    setPostcodeSubstring(inputVal)
    setLeadGenDetails(prevData => ({ ...prevData, postcode: inputVal }))
  }

  // input the sub postcode on the form
  const inputSubcode = (e) => {
    setSubcodeString(e.target.value.toUpperCase().replace(/\s+/g, ''))
    setLeadGenDetails(prevData => ({ ...prevData, subcode: e.target.value.toUpperCase().replace(/\s+/g, '') }))
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

    let days
    let filterType = 'within' // Default filter type

    switch (dateFilter) {
      case '1day': days = 1; break
      case '2days': days = 2; break
      case '3days': days = 3; break
      case '7days': days = 7; break
      case '4weeks': days = 28; break
      case '8weeks': days = 56; break
      case '12weeks': days = 84; break
      case '16weeks': days = 112; break
      case '>8weeks': days = 56; filterType = 'beyond'; break
      case '>12weeks': days = 84; filterType = 'beyond'; break
      case '>16weeks': days = 112; filterType = 'beyond'; break
      default: return properties
    }

    return properties.filter(property => {
      const addedDate = parseDate(property.property_data.added_revised)
      const reducedDate = parseDate(property.property_data.reduced_revised)

      const mostRecentDate = addedDate || reducedDate // Use the non-null date
      if (!mostRecentDate) {
        return false // Skip this property if both dates are null
      }

      return filterType === 'within' ? isWithinLastDays(mostRecentDate, days) : isBeyondDays(mostRecentDate, days)
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

  useEffect(() => {
    const filtered = filterPropertiesByDate(multipleMatches, dateFilter)
    setFilteredMatchingProperties(filtered)
  }, [multipleMatches, dateFilter])


  useEffect(() => {
    const filtered = filterPropertiesByDate(salesMultipleMatches, dateFilter)
    setFilteredSalesMatchingProperties(filtered)
  }, [salesMultipleMatches, dateFilter])


  useEffect(() => {
    const filtered = filterPropertiesByDate(noMatches, dateFilter)
    setFiltedNoProperties(filtered)
  }, [noMatches, dateFilter])


  useEffect(() => {
    const filtered = filterPropertiesByDate(salesNoMatches, dateFilter)
    setFiltedSalesNoProperties(filtered)
  }, [salesNoMatches, dateFilter])



  const parseDate = (dateStr) => {
    if (!dateStr) return null
    const [day, month, year] = dateStr.split('/')
    return new Date(year, month - 1, day)
  }

  const isWithinLastDays = (date, days) => {
    const now = new Date()
    return date >= new Date(now.getFullYear(), now.getMonth(), now.getDate() - days)
  }

  const isBeyondDays = (date, days) => {
    const now = new Date()
    return date < new Date(now.getFullYear(), now.getMonth(), now.getDate() - days)
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
    const multipleRentalSorted = [...filteredMatchingProperties].sort((a, b) => {
      const priceA = parseInt(a.property_data.price.replace(/[^\d.]/g, ''))
      const priceB = parseInt(b.property_data.price.replace(/[^\d.]/g, ''))
      return sortPriceOrder === 'asc' ? priceA - priceB : priceB - priceA
    })
    const multipleSalesSorted = [...filteredSalesMatchingProperties].sort((a, b) => {
      const priceA = parseInt(a.property_data.price.replace(/[^\d.]/g, ''))
      const priceB = parseInt(b.property_data.price.replace(/[^\d.]/g, ''))
      return sortPriceOrder === 'asc' ? priceA - priceB : priceB - priceA
    })
    const noRentalSorted = [...filteredNoProperties].sort((a, b) => {
      const priceA = parseInt(a.property_data.price.replace(/[^\d.]/g, ''))
      const priceB = parseInt(b.property_data.price.replace(/[^\d.]/g, ''))
      return sortPriceOrder === 'asc' ? priceA - priceB : priceB - priceA
    })
    const noSalesSorted = [...filteredSalesNoProperties].sort((a, b) => {
      const priceA = parseInt(a.property_data.price.replace(/[^\d.]/g, ''))
      const priceB = parseInt(b.property_data.price.replace(/[^\d.]/g, ''))
      return sortPriceOrder === 'asc' ? priceA - priceB : priceB - priceA
    })
    setFilteredProperties(sorted)
    setFilteredSalesProperties(salesSorted)
    setFilteredMatchingProperties(multipleRentalSorted)
    setFilteredSalesMatchingProperties(multipleSalesSorted)
    setFiltedNoProperties(noRentalSorted)
    setFiltedSalesNoProperties(noSalesSorted)
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
    const multipleRentalSorted = [...filteredMatchingProperties].sort((a, b) => {
      return sortPostcodeOrder === 'asc' ? a.property_data.postcode.localeCompare(b.property_data.postcode) : b.property_data.postcode.localeCompare(a.property_data.postcode)
    })
    const multipleSalesSorted = [...filteredSalesMatchingProperties].sort((a, b) => {
      return sortPostcodeOrder === 'asc' ? a.property_data.postcode.localeCompare(b.property_data.postcode) : b.property_data.postcode.localeCompare(a.property_data.postcode)
    })
    const noRentalSorted = [...filteredNoProperties].sort((a, b) => {
      return sortPostcodeOrder === 'asc' ? a.property_data.postcode.localeCompare(b.property_data.postcode) : b.property_data.postcode.localeCompare(a.property_data.postcode)
    })
    const noSalesSorted = [...filteredSalesNoProperties].sort((a, b) => {
      return sortPostcodeOrder === 'asc' ? a.property_data.postcode.localeCompare(b.property_data.postcode) : b.property_data.postcode.localeCompare(a.property_data.postcode)
    })
    setFilteredProperties(sorted)
    setFilteredSalesProperties(salesSorted)
    setFilteredMatchingProperties(multipleRentalSorted)
    setFilteredSalesMatchingProperties(multipleSalesSorted)
    setFiltedNoProperties(noRentalSorted)
    setFiltedSalesNoProperties(noSalesSorted)
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

  // managing modal for properties to be removed from list
  const [propertyRemoveShow, setPropertyRemoveShow] = useState(false)

  // close modal
  const handleRemovePropertyClose = () => {
    setPropertyRemoveShow(false)
  }

  // show the modal
  const handlePropertyRemoveShow = (e) => {
    setPropertyRemoveShow(true)
  }

  // increase value in db based on successful response
  const increaseUsageCount = async () => {
    if (isUserAuth()) {
      console.log('trying to increase')
      try {
        const { data } = await axios.post('/api/usage/', {}, {
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
    } else {
      navigate('/access-denied')
      console.log('logged out')
    }
  }


  const toggleRowExpansion = (index) => {
    setExpandedMultpleMatches(prevExpandedRows => {
      const newExpandedRows = new Set(prevExpandedRows)
      if (newExpandedRows.has(index)) {
        newExpandedRows.delete(index)
      } else {
        newExpandedRows.add(index)
      }
      return newExpandedRows
    })
  }

  const toggleSalesRowExpansion = (index) => {
    setExpandedSalesMultpleMatches(prevExpandedRows => {
      const newExpandedRows = new Set(prevExpandedRows)
      if (newExpandedRows.has(index)) {
        newExpandedRows.delete(index)
      } else {
        newExpandedRows.add(index)
      }
      return newExpandedRows
    })
  }

  const addManualFavourite = async (matchingProperties, epcData, index) => {
    if (isUserAuth()) {


      const newFavourites = [{
        'rightmove_id': matchingProperties.property_data.rightmove_id,
        'postcode': matchingProperties.property_data.postcode,
        'address': epcData.address,
        'agent': matchingProperties.property_data.agent,
        'type': matchingProperties.property_data.type,
        'addedOn': matchingProperties.property_data.addedOn,
        'propertyType': matchingProperties.property_data.propertyType,
        'price': matchingProperties.property_data.price,
        'price_numeric': matchingProperties.property_data.price_numeric,
        'bathrooms': matchingProperties.property_data.bathrooms,
        'bedrooms': matchingProperties.property_data.bedrooms,
        'let_available_date': matchingProperties.property_data.let_available_date,
        'date_added_db': matchingProperties.property_data.date_added_db,
        'url': matchingProperties.property_data.url,
        'current_epc': matchingProperties.property_data.current_epc,
        'potential_epc': matchingProperties.property_data.potential_epc,
        'action': 'Saved',
        'added_revised': matchingProperties.property_data.added_revised,
        'reduced_revised': matchingProperties.property_data.reduced_revised,
        'market_status': matchingProperties.property_data.market_status,
      }]

      try {
        const response = await axios.post('/api/epc_favourite/', newFavourites, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })

        console.log('Response:', response.data)
        toggleRowExpansion(index)
        toggleSalesRowExpansion(index)
        Swal.fire({
          title: '😎 action complete',
          text: 'New property added to your saved properties',
          confirmButtonText: 'Thanks 🤝',
          confirmButtonColor: '#ED6B86',
          cancelButtonText: 'Stay here',
          backdrop: true,
          background: '#FDF7F0',
          customClass: {
            title: 'popup-swal-title',
            popup: 'popup-swal-body',
            confirmButton: 'popup-swal-confirm',
            cancelButton: 'popup-swal-cancel',
          },
        })
        loadUserData()


      } catch (error) {
        console.error('Error saving favourite:', error)
      }
    } else {
      navigate('/access-denied')
      console.log('logged out')
    }
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
        {userData && userData.usage_stats[0].package === 'Trial expired' ?

          <section className='main-body remove-margin'>
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
                  {/* <div className='no-access-email'>
                    <a href="mailto:james@wittle.co" style={{ textDecoration: 'none' }}>
                      <button className='email-button'>Get in touch</button>
                    </a>
                  </div> */}
                </div>
              </section>
            </section>
          </section>
          :
          <section className='main-body'>
            <section className='main-body-details'>

              <>

                <section className='property-finder'>
                  <div className='listing-options'>
                    <div className='listing-buttons'>
                      <h5 className='no-print' onClick={() => setLeadGenSection('Inputs')} style={{ borderBottom: leadGenSection === 'Inputs' ? '3px solid #ED6B86' : 'none', textUnderlineOffset: leadGenSection === 'Inputs' ? '0.5em' : 'initial', fontWeight: leadGenSection === 'Inputs' ? '700' : '400' }}>Inputs</h5>
                      <h5 className='no-print' onClick={() => setLeadGenSection('Explore')} style={{ borderBottom: leadGenSection === 'Explore' ? '3px solid #ED6B86' : 'none', textUnderlineOffset: leadGenSection === 'Explore' ? '0.5em' : 'initial', fontWeight: leadGenSection === 'Explore' ? '700' : '400' }}>Explore</h5>
                      <h5 className='no-print' onClick={() => setLeadGenSection('Tracking')} style={{ borderBottom: leadGenSection === 'Tracking' ? '3px solid #ED6B86' : 'none', textUnderlineOffset: leadGenSection === 'Tracking' ? '0.5em' : 'initial', fontWeight: leadGenSection === 'Tracking' ? '700' : '400' }}>Tracking</h5>
                      {userData && (userData.id === 1 || userData.id === 55 || userData.id === 147) ? <h5 className='no-print' onClick={() => setLeadGenSection('Letter campaigns')} style={{ borderBottom: leadGenSection === 'Letter campaigns' ? '3px solid #ED6B86' : 'none', textUnderlineOffset: leadGenSection === 'Letter campaigns' ? '0.5em' : 'initial', fontWeight: leadGenSection === 'Letter campaigns' ? '700' : '400' }}>Letter campaigns</h5> : ''}
                      <h5 className='no-print' onClick={() => setLeadGenSection('Archived')} style={{ borderBottom: leadGenSection === 'Archived' ? '3px solid #ED6B86' : 'none', textUnderlineOffset: leadGenSection === 'Archived' ? '0.5em' : 'initial', fontWeight: leadGenSection === 'Archived' ? '700' : '400' }}>Archived</h5>
                      <h5 className='no-print' id='manual-matcher' onClick={() => setLeadGenSection('Manual matcher')} style={{ borderBottom: leadGenSection === 'Manual matcher' ? '3px solid #ED6B86' : 'none', textUnderlineOffset: leadGenSection === 'Manual matcher' ? '0.5em' : 'initial', fontWeight: leadGenSection === 'Manual matcher' ? '700' : '400' }}>Manual matcher</h5>
                      <h5 className='no-print' onClick={() => setLeadGenSection('Hidden properties')} style={{ borderBottom: leadGenSection === 'Hidden properties' ? '3px solid #ED6B86' : 'none', textUnderlineOffset: leadGenSection === 'Hidden properties' ? '0.5em' : 'initial', fontWeight: leadGenSection === 'Hidden properties' ? '700' : '400' }}>Hidden properties</h5>
                    </div>
                    <div className='logout-button' onClick={removeItemFromStorage}>
                      <div className='logout-icon'></div>
                    </div>


                  </div>
                  <hr className='title-line' />

                  <div className='lead-generator'>

                    <div className='property-results'>
                      {leadGenSection === 'Inputs' ?
                        <>
                          <div className='lead-gen-inputs'>
                            <h3 className='sub-title'>Set your search criteria</h3>
                            <div className='single-input-block'>
                              <div className='input-block large'>
                                <h3>Postcode(s)</h3>
                                <p>Add multiple postcodes by separating with a comma, and include any part of the postcode, e.g. &ldquo;SW4,SW5&rdquo;. For efficiency, this is limited to 6 postcode areas.</p>
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
                                <h3>Sub postcode(s)</h3>
                                <p>Add sub postcodes, e.g. &ldquo;SW4 0,SW5 0&rdquo;. You can also chain these.</p>
                                <input
                                  type="text"
                                  value={leadGenDetails.subcode}
                                  onChange={inputSubcode}
                                  placeholder="Enter subcode..."
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

                                  {
                                    leadGenDetails.channel === 'Lettings' ?
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
                        leadGenSection === 'Explore' && !rentalLoading ?
                          <>
                            <div className='results-block'>
                              <div className="property-insight-nav">
                                <div className="property-insight-buttons">
                                  <h3 className={`insight-button ${channelView === 'Lettings' ? 'active' : 'inactive'}`} id='left' onClick={() => setChannelView('Lettings')}>Lettings</h3>
                                  <h3 className={`insight-button ${channelView === 'Sales' ? 'active' : 'inactive'}`} id='right' onClick={() => setChannelView('Sales')}>Sales</h3>
                                </div>
                                <div className='action-section'>
                                  <div className='save-section'>
                                    <div className="bin-icon"></div>
                                    <h3 onClick={handlePropertyRemoveShow}>Hide selection</h3>
                                  </div>
                                  <div className='save-section'>
                                    <div className="print-icon"></div>
                                    <h3 onClick={addFavourite}>Track selection</h3>
                                  </div>

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
                                      <option value="all">All properties</option>
                                      <option value=">8weeks">Added over 8 weeks ago</option>
                                      <option value=">12weeks">Added over 12 weeks ago</option>
                                      <option value=">16weeks">Added over 16 weeks ago</option>
                                    </select>
                                  </div>
                                  <div className='matching-status'>
                                    <h3 className='matching-pill' onClick={() => setMatchType('Matching')} style={{ color: matchType === 'Matching' ? 'white' : '#1A276C', backgroundColor: matchType === 'Matching' ? '#ED6B86' : 'rgba(26, 39, 108, 0.15)' }}>Matching</h3>
                                    <h3 className='matching-pill' onClick={() => setMatchType('Multiple matches')} style={{ color: matchType === 'Multiple matches' ? 'white' : '#1A276C', backgroundColor: matchType === 'Multiple matches' ? '#ED6B86' : 'rgba(26, 39, 108, 0.15)' }}>Multiple matches</h3>
                                    <h3 className='matching-pill' onClick={() => setMatchType('No matches')} style={{ color: matchType === 'No matches' ? 'white' : '#1A276C', backgroundColor: matchType === 'No matches' ? '#ED6B86' : 'rgba(26, 39, 108, 0.15)' }}>No matches</h3>
                                  </div>

                                  {matchType === 'Matching' ?
                                    <>
                                      <div className='title-section'>
                                        <h3 className='sub-title'>There are {filteredProperties.length} rental properties that match your criteria</h3>
                                      </div>
                                      <div className='results-table'>
                                        <div className='results-headers'>
                                          <div id='column11' className='column'>
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
                                          <h5 id='column1' className='column'>#</h5>
                                          <div id='column2' className='column' >
                                            <h5>Address</h5>
                                          </div>
                                          <div id='column3' className='column' onClick={sortByPostcode}>
                                            <h5>Postcode</h5>
                                            {/* <h5>⬇️</h5> */}
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
                                            {/* <h5>⬇️</h5> */}
                                          </div>
                                          <div id='column8' className='column'>
                                            <h5>Bedrooms</h5>
                                          </div>
                                          <div id='column9' className='column'>
                                            <h5>Bathrooms</h5>
                                          </div>
                                          <div id='column10' className='column'>
                                            <h5>Agent</h5>
                                          </div>

                                        </div>
                                        <hr className='property-divider' />
                                        <div className='results-details explore'>
                                          {filteredProperties ? filteredProperties.map((item, index) => {
                                            const isRowSelected = selectedRows.some(selectedRow => selectedRow.rightmove_id === item.property_data.rightmove_id)

                                            return (
                                              <>
                                                <div className={`results-content ${isRowSelected ? 'highlighted-row' : ''}`}>
                                                  <div className='column' id='column11'>
                                                    {savedProperties.some(property => property.rightmove_id === item.property_data.rightmove_id) ?
                                                      <div className='saved-message'>
                                                        <h3>❤️</h3>
                                                        {/* <h3>Saved</h3> */}
                                                      </div>
                                                      :
                                                      archivedProperties.some(property => property.rightmove_id === item.property_data.rightmove_id) ?
                                                        <div className='saved-message'>
                                                          <h3>⭐️</h3>
                                                          {/* <h3>Archived</h3> */}
                                                        </div>
                                                        :
                                                        <div className='custom-checkbox'>

                                                          <input
                                                            className='checkbox'
                                                            type="checkbox"
                                                            checked={checkboxStatus[index]}
                                                            onChange={(e) => handleCheckboxChange(e, index)}
                                                          />
                                                          <label className='label'>

                                                          </label>
                                                        </div>
                                                    }
                                                  </div>
                                                  <div className='column' id='column1' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                    <h5>{index + 1}</h5>
                                                  </div>
                                                  <div className='column' id='column2' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                    {userPackage && userPackage === 'Free' ? <h5>{item.property_data.displayAddress}</h5> : <h5>{item.epc_data_list[0].address}</h5>}
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
                                                    <h5>{item.property_data.bathrooms}</h5>
                                                  </div>
                                                  <div className='column' id='column10' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                    <h5>{item.property_data.agent}</h5>
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
                                    : matchType === 'Multiple matches' ?
                                      <>
                                        <div className='title-section'>
                                          <h3 className='sub-title'>There are {filteredMatchingProperties.length} rental properties that we do not have an exact match for</h3>
                                        </div>
                                        <div className='results-table'>

                                          <div className='results-headers'>
                                            <div id='column1' className='column' >
                                              <h5>#</h5>
                                            </div>
                                            <div id='column2' className='column' >
                                              <h5>Listed address</h5>
                                            </div>
                                            <div id='column3' className='column' onClick={sortByPostcode}>
                                              <h5>Postcode</h5>
                                              {/* <h5>⬇️</h5> */}
                                            </div>
                                            <div id='column4' className='column'>
                                              <h5>Added</h5>
                                            </div>
                                            <div id='column5' className='column'>
                                              <h5>Size (sq. m)</h5>
                                            </div>
                                            <div id='column6' className='column'>
                                              <h5>Property type</h5>
                                            </div>
                                            <div id='column7' className='column' onClick={sortByPrice}>
                                              <h5>Price</h5>
                                              {/* <h5>⬇️</h5> */}
                                            </div>
                                            <div id='column8' className='column'>
                                              <h5>Bedrooms</h5>
                                            </div>
                                            <div id='column9' className='column'>
                                              <h5>Bathrooms</h5>
                                            </div>
                                            <div id='column10' className='column'>
                                              <h5>Agent</h5>
                                            </div>
                                            <div id='column11' className='column'>
                                              <h5>Action</h5>
                                            </div>
                                          </div>
                                          <hr className='property-divider' />
                                          <div className='results-details explore'>
                                            {filteredMatchingProperties ? filteredMatchingProperties.map((item, index) => {
                                              const isExpanded = expandedMultipleMatches.has(index)
                                              return (
                                                <>
                                                  <div className={'results-content'}>
                                                    <div className='column' id='column1' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                      <h5>{index + 1}</h5>
                                                    </div>
                                                    <div className='column' id='column2' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                      <h5>{item.property_data.displayAddress}</h5>
                                                    </div>
                                                    <div className='column' id='column3' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                      <h5>{item.property_data.postcode}</h5>
                                                    </div>
                                                    <div className='column' id='column4' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                      <h5>{item.property_data.added_revised === null && item.property_data.reduced_revised ? `Reduced ${item.property_data.reduced_revised}` : item.property_data.added_revised && item.property_data.reduced_revised === null ? item.property_data.added_revised : 'N/a'}</h5>
                                                    </div>
                                                    <div className='column' id='column5' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                      <h5>{item.property_data.size === 'nan' ? '' : (item.property_data.size * 0.092903).toFixed(1)}</h5>
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
                                                      <h5>{item.property_data.bathrooms}</h5>
                                                    </div>
                                                    <div className='column' id='column10' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                      <h5>{item.property_data.agent}</h5>
                                                    </div>
                                                    <div className='column' id='column11'>
                                                      {savedProperties.some(property => property.rightmove_id === item.property_data.rightmove_id) ?
                                                        <div className='saved-message'>
                                                          <h3>❤️</h3>
                                                          {/* <h3>Saved</h3> */}
                                                        </div>
                                                        :
                                                        archivedProperties.some(property => property.rightmove_id === item.property_data.rightmove_id) ?
                                                          <div className='saved-message'>
                                                            <h3>⭐️</h3>
                                                            {/* <h3>Archived</h3> */}
                                                          </div>
                                                          :

                                                          <h3 className='expansion' onClick={() => toggleRowExpansion(index)}>
                                                            {expandedMultipleMatches.has(index) ? '^' : 'v'}
                                                          </h3>}
                                                    </div>
                                                  </div>
                                                  <hr className='property-divider' />
                                                  {isExpanded && (
                                                    <>
                                                      <h3 className='matching-title'>Matching properties</h3>
                                                      <div className='expanded-section-titles'>
                                                        <p className='column' id='column1'>#</p>
                                                        <p className='column' id='column2'>Address</p>
                                                        <p className='column' id='column3'>Postcode</p>
                                                        <p className='column' id='column4'>Current EPC</p>
                                                        <p className='column' id='column5'>Potential EPC</p>
                                                        <p className='column' id='column6'>Floor</p>
                                                        <p className='column' id='column7'>Size</p>
                                                        <p className='column' id='column8'></p>
                                                      </div>

                                                      {item.epc_data_list.map((epcItem, epcIndex) => (
                                                        <div className='expanded-content' key={epcIndex} >
                                                          <p className='column' id='column1' onClick={() => handleVisitUrl(epcItem.url)}>{epcIndex + 1} </p>
                                                          <p className='column' id='column2' onClick={() => handleVisitUrl(epcItem.url)}>{epcItem.address}</p>
                                                          <p className='column' id='column3' onClick={() => handleVisitUrl(epcItem.url)}>{epcItem.postcode}</p>
                                                          <p className='column' id='column4' onClick={() => handleVisitUrl(epcItem.url)}>{epcItem.current_energy_efficiency}</p>
                                                          <p className='column' id='column5' onClick={() => handleVisitUrl(epcItem.url)}>{epcItem.potential_energy_efficiency}</p>
                                                          <p className='column' id='column6' onClick={() => handleVisitUrl(epcItem.url)}>{epcItem.final_floor_level}</p>
                                                          <p className='column' id='column7' onClick={() => handleVisitUrl(epcItem.url)}>{epcItem.floor_area}</p>
                                                          <div className='column' id='column8' >
                                                            {/* <div className='heart-icon' onClick={() => addManualFavourite(item, epcItem, index)} ></div> */}
                                                            <button className='add-property' onClick={() => addManualFavourite(item, epcItem, index)} >+</button>
                                                          </div>
                                                        </div>
                                                      ))}
                                                    </>
                                                  )}
                                                </>
                                              )
                                            })
                                              : ' '}
                                          </div>
                                        </div>

                                      </>

                                      : matchType === 'No matches' ?
                                        <>
                                          <div className='title-section'>
                                            <h3 className='sub-title'>There are {filteredNoProperties.length} rental properties that we do not have any match for</h3>
                                          </div>
                                          <div className='results-table'>

                                            <div className='results-headers'>
                                              <h5 id='column1' className='column'>#</h5>
                                              <div id='column2' className='column' >
                                                <h5>Listed address</h5>
                                              </div>
                                              <div id='column3' className='column' onClick={sortByPostcode}>
                                                <h5>Postcode</h5>
                                                {/* <h5>⬇️</h5> */}
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
                                                {/* <h5>⬇️</h5> */}
                                              </div>
                                              <div id='column8' className='column'>
                                                <h5>Bedrooms</h5>
                                              </div>
                                              <div id='column9' className='column'>
                                                <h5>Agent</h5>
                                              </div>
                                              {/* <div id='column11' className='column'>
                                            <h5></h5>
                                          </div> */}
                                            </div>
                                            <hr className='property-divider' />
                                            <div className='results-details explore'>
                                              {filteredNoProperties ? filteredNoProperties.map((item, index) => {

                                                return (
                                                  <>
                                                    <div className={'results-content'}>
                                                      <div className='column' id='column1' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                        <h5>{index + 1}</h5>
                                                      </div>
                                                      <div className='column' id='column2' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                        <h5>{item.property_data.displayAddress}</h5>
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
                                                      {/* <div className='column' id='column11'>
                                                    {savedProperties.some(property => property.rightmove_id === item.property_data.rightmove_id) ?
                                                      <div className='saved-message'>
                                                        // <h3>❤️</h3>
                                                        <h3>Saved</h3>
                                                      </div>
                                                      :
                                                      archivedProperties.some(property => property.rightmove_id === item.property_data.rightmove_id) ?
                                                        <div className='saved-message'>
                                                          // <h3>⭐️</h3>
                                                          <h3>Archived</h3>
                                                        </div>
                                                        :

                                                        ''
                                                    }
                                                  </div> */}
                                                    </div>
                                                    <hr className='property-divider' />

                                                  </>
                                                )
                                              })
                                                : ' '}
                                            </div>
                                          </div>

                                        </>

                                        : ''
                                  }


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
                                        <option value="all">All properties</option>
                                        <option value=">8weeks">Added over 8 weeks ago</option>
                                        <option value=">12weeks">Added over 12 weeks ago</option>
                                        <option value=">16weeks">Added over 16 weeks ago</option>

                                      </select>
                                    </div>
                                    <div className='matching-status'>
                                      <h3 className='matching-pill' onClick={() => setSalesMatchType('Matching')} style={{ color: salesMatchType === 'Matching' ? 'white' : '#1A276C', backgroundColor: salesMatchType === 'Matching' ? '#ED6B86' : 'rgba(26, 39, 108, 0.15)' }}>Matching</h3>
                                      <h3 className='matching-pill' onClick={() => setSalesMatchType('Multiple matches')} style={{ color: salesMatchType === 'Multiple matches' ? 'white' : '#1A276C', backgroundColor: salesMatchType === 'Multiple matches' ? '#ED6B86' : 'rgba(26, 39, 108, 0.15)' }}>Multiple matches</h3>
                                      <h3 className='matching-pill' onClick={() => setSalesMatchType('No matches')} style={{ color: salesMatchType === 'No matches' ? 'white' : '#1A276C', backgroundColor: salesMatchType === 'No matches' ? '#ED6B86' : 'rgba(26, 39, 108, 0.15)' }}>No matches</h3>
                                    </div>
                                    {salesLoading ?
                                      <div className='property-table-loading'>
                                        <Loading />
                                      </div>
                                      : !salesLoading ?
                                        <>
                                          {salesMatchType === 'Matching' ?
                                            <>
                                              <div className='title-section'>
                                                <h3 className='sub-title'>There are {flteredSalesProperties.length} properties for sale that match your criteria</h3>

                                              </div>
                                              <div className='results-table'>

                                                <div className='results-headers'>
                                                  <div id='column11' className='column'>
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
                                                  <h5 id='column1' className='column'>#</h5>
                                                  <div id='column2' className='column' >
                                                    <h5>Address</h5>
                                                  </div>
                                                  <div id='column3' className='column' onClick={sortByPostcode}>
                                                    <h5>Postcode</h5>
                                                    {/* <h5>⬇️</h5> */}
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
                                                    {/* <h5>⬇️</h5> */}
                                                  </div>
                                                  <div id='column8' className='column'>
                                                    <h5>Bedrooms</h5>
                                                  </div>
                                                  <div id='column9' className='column'>
                                                    <h5>Bathrooms</h5>
                                                  </div>
                                                  <div id='column10' className='column'>
                                                    <h5>Agent</h5>
                                                  </div>

                                                </div>
                                                <hr className='property-divider' />
                                                <div className='results-details explore'>
                                                  {flteredSalesProperties ? flteredSalesProperties.map((item, index) => {
                                                    const isRowSelected = selectedSalesRows.some(selectedRow => selectedRow.rightmove_id === item.property_data.rightmove_id)

                                                    return (
                                                      <>
                                                        <div className={`results-content ${isRowSelected ? 'highlighted-row' : ''}`}>
                                                          <div className='column' id='column11'>
                                                            {savedProperties.some(property => property.rightmove_id === item.property_data.rightmove_id) ?
                                                              <div className='saved-message'>
                                                                <h3>❤️</h3>
                                                                {/* <h3>Saved</h3> */}
                                                              </div>
                                                              :
                                                              archivedProperties.some(property => property.rightmove_id === item.property_data.rightmove_id) ?
                                                                <div className='saved-message'>
                                                                  <h3>⭐️</h3>
                                                                  {/* <h3>Archived</h3> */}
                                                                </div>
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
                                                          <div className='column' id='column1' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                            <h5>{index + 1}</h5>
                                                          </div>
                                                          <div className='column' id='column2' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                            {userPackage && userPackage === 'Free' ? <h5>{item.property_data.displayAddress}</h5> : <h5>{item.epc_data_list[0].address}</h5>}
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
                                                            <h5>{item.property_data.bathrooms}</h5>
                                                          </div>
                                                          <div className='column' id='column10' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                            <h5>{item.property_data.agent}</h5>
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

                                            : salesMatchType === 'Multiple matches' ?

                                              <>
                                                <div className='title-section'>
                                                  <h3 className='sub-title'>There are {filteredSalesMatchingProperties.length} properties for sale that we do not have an exact match for</h3>
                                                </div>
                                                <div className='results-table'>
                                                  <div className='results-headers'>
                                                    <h5 id='column1' className='column'>#</h5>
                                                    <div id='column2' className='column' >
                                                      <h5>Listed address</h5>
                                                    </div>
                                                    <div id='column3' className='column' onClick={sortByPostcode}>
                                                      <h5>Postcode</h5>
                                                      {/* <h5>⬇️</h5> */}
                                                    </div>
                                                    <div id='column4' className='column'>
                                                      <h5>Added</h5>
                                                    </div>
                                                    <div id='column5' className='column'>
                                                      <h5>Size (sq. m)</h5>
                                                    </div>
                                                    <div id='column6' className='column'>
                                                      <h5>Property type</h5>
                                                    </div>
                                                    <div id='column7' className='column' onClick={sortByPrice}>
                                                      <h5>Price</h5>
                                                      {/* <h5>⬇️</h5> */}
                                                    </div>
                                                    <div id='column8' className='column'>
                                                      <h5>Bedrooms</h5>
                                                    </div>
                                                    <div id='column9' className='column'>
                                                      <h5>Bathrooms</h5>
                                                    </div>
                                                    <div id='column10' className='column'>
                                                      <h5>Agent</h5>
                                                    </div>
                                                    <div id='column11' className='column'>
                                                      <h5>Action</h5>
                                                    </div>
                                                  </div>
                                                  <hr className='property-divider' />
                                                  <div className='results-details explore'>
                                                    {filteredSalesMatchingProperties ? filteredSalesMatchingProperties.map((item, index) => {
                                                      const isExpanded = expandedSalesMultipleMatches.has(index)
                                                      return (
                                                        <>
                                                          <div className={'results-content'}>
                                                            <div className='column' id='column1' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                              <h5>{index + 1}</h5>
                                                            </div>
                                                            <div className='column' id='column2' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                              <h5>{item.property_data.displayAddress}</h5>
                                                            </div>
                                                            <div className='column' id='column3' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                              <h5>{item.property_data.postcode}</h5>
                                                            </div>
                                                            <div className='column' id='column4' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                              <h5>{item.property_data.added_revised === null && item.property_data.reduced_revised ? `Reduced ${item.property_data.reduced_revised}` : item.property_data.added_revised && item.property_data.reduced_revised === null ? item.property_data.added_revised : 'N/a'}</h5>
                                                            </div>
                                                            <div className='column' id='column5' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                              <h5>{item.property_data.size === 'nan' ? '' : (item.property_data.size * 0.092903).toFixed(1)}</h5>
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
                                                              <h5>{item.property_data.bathrooms}</h5>
                                                            </div>
                                                            <div className='column' id='column10' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                              <h5>{item.property_data.agent}</h5>
                                                            </div>
                                                            <div className='column' id='column11'>
                                                              {savedProperties.some(property => property.rightmove_id === item.property_data.rightmove_id) ?
                                                                <div className='saved-message'>
                                                                  {/* <h3>❤️</h3> */}
                                                                  <h3>Saved</h3>
                                                                </div>
                                                                :
                                                                archivedProperties.some(property => property.rightmove_id === item.property_data.rightmove_id) ?
                                                                  <div className='saved-message'>
                                                                    {/* <h3>⭐️</h3> */}
                                                                    <h3>Archived</h3>
                                                                  </div>
                                                                  :

                                                                  <h3 className='expansion' onClick={() => toggleSalesRowExpansion(index)}>
                                                                    {expandedSalesMultipleMatches.has(index) ? '^' : 'v'}
                                                                  </h3>}
                                                            </div>
                                                          </div>
                                                          <hr className='property-divider' />
                                                          {isExpanded && (
                                                            <>
                                                              <h3 className='matching-title'>Matching properties</h3>
                                                              <div className='expanded-section-titles'>
                                                                <p className='column' id='column1'>#</p>
                                                                <p className='column' id='column2'>Address</p>
                                                                <p className='column' id='column3'>Postcode</p>
                                                                <p className='column' id='column4'>Current EPC</p>
                                                                <p className='column' id='column5'>Potential EPC</p>
                                                                <p className='column' id='column6'>Floor</p>
                                                                <p className='column' id='column7'>Size</p>
                                                                <p className='column' id='column8'></p>
                                                              </div>
                                                              {item.epc_data_list.map((epcItem, epcIndex) => (
                                                                <div className='expanded-content' key={epcIndex} >
                                                                  <p className='column' id='column1' onClick={() => handleVisitUrl(epcItem.url)}>{epcIndex + 1} </p>
                                                                  <p className='column' id='column2' onClick={() => handleVisitUrl(epcItem.url)}>{epcItem.address}</p>
                                                                  <p className='column' id='column3' onClick={() => handleVisitUrl(epcItem.url)}>{epcItem.postcode}</p>
                                                                  <p className='column' id='column4' onClick={() => handleVisitUrl(epcItem.url)}>{epcItem.current_energy_efficiency}</p>
                                                                  <p className='column' id='column5' onClick={() => handleVisitUrl(epcItem.url)}>{epcItem.potential_energy_efficiency}</p>
                                                                  <p className='column' id='column6' onClick={() => handleVisitUrl(epcItem.url)}>{epcItem.final_floor_level}</p>
                                                                  <p className='column' id='column7' onClick={() => handleVisitUrl(epcItem.url)}>{epcItem.floor_area}</p>
                                                                  <div className='column' id='column8' >
                                                                    <button className='add-property' onClick={() => addManualFavourite(item, epcItem, index)} >+</button>
                                                                  </div>
                                                                </div>
                                                              ))}
                                                            </>
                                                          )}
                                                        </>
                                                      )
                                                    })
                                                      : ' '}
                                                  </div>
                                                </div>

                                              </>
                                              : salesMatchType === 'No matches' ?
                                                <>
                                                  <div className='title-section'>
                                                    <h3 className='sub-title'>There are {filteredSalesNoProperties.length} properties for sale that we do not have any match for</h3>
                                                  </div>
                                                  <div className='results-table'>

                                                    <div className='results-headers'>
                                                      <h5 id='column1' className='column'>#</h5>
                                                      <div id='column2' className='column' >
                                                        <h5>Listed address</h5>
                                                      </div>
                                                      <div id='column3' className='column' onClick={sortByPostcode}>
                                                        <h5>Postcode</h5>
                                                        {/* <h5>⬇️</h5> */}
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
                                                        {/* <h5>⬇️</h5> */}
                                                      </div>
                                                      <div id='column8' className='column'>
                                                        <h5>Bedrooms</h5>
                                                      </div>
                                                      <div id='column9' className='column'>
                                                        <h5>Agent</h5>
                                                      </div>
                                                      {/* <div id='column11' className='column'>
                                                <h5></h5>
                                              </div> */}
                                                    </div>
                                                    <hr className='property-divider' />
                                                    <div className='results-details explore'>
                                                      {filteredSalesNoProperties ? filteredSalesNoProperties.map((item, index) => {

                                                        return (
                                                          <>
                                                            <div className={'results-content'}>
                                                              <div className='column' id='column1' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                                <h5>{index + 1}</h5>
                                                              </div>
                                                              <div className='column' id='column2' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                                <h5>{item.property_data.displayAddress}</h5>
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

                                                            </div>
                                                            <hr className='property-divider' />

                                                          </>
                                                        )
                                                      })
                                                        : ' '}
                                                    </div>
                                                  </div>

                                                </>
                                                : ''}


                                        </>
                                        : ''}
                                  </>
                                  :

                                  ''}
                            </div>
                          </>
                          : leadGenSection === 'Explore' && rentalLoading ?
                            <div className='property-table-loading'>
                              <Loading />
                            </div>
                            : leadGenSection === 'Tracking' ?
                              <>
                                <LeadGenSaved
                                  savedProperties={savedProperties}
                                  userData={userData}
                                  csvData={csvData}
                                  setCsvData={setCsvData}
                                  getCurrentDate={getCurrentDate}
                                  handleVisitUrl={handleVisitUrl}
                                  loadUserData={loadUserData}
                                  setSavedProperties={setSavedProperties}
                                  latestFavourites={latestFavourites}
                                  setLatestFavourites={setLatestFavourites}
                                  setLeadGenSection={setLeadGenSection}
                                />
                              </>
                              : leadGenSection === 'Letter campaigns' ?
                                <>
                                  <LettersHub
                                    letterProperties={letterProperties}
                                    setLetterProperties={letterProperties}
                                    userData={userData}
                                    loadUserData={loadUserData}
                                    setLeadGenSection={setLeadGenSection}
                                    signature={signature}
                                    setSignature={setSignature}
                                    letterTemplates={letterTemplates}
                                    setLetterTemplates={setLetterTemplates}
                                    setLetterCampaigns={setLetterCampaigns}
                                    letterCampaigns={letterCampaigns}
                                    campaignLoading={campaignLoading}
                                    setCampaignLoading={setCampaignLoading}
                                    availableCredits={availableCredits}
                                    setAvailableCredits={setAvailableCredits}
                                  />
                                </>
                                : leadGenSection === 'Archived' ?
                                  <>
                                    <ArchivedProperties
                                      handleVisitUrl={handleVisitUrl}
                                      archivedProperties={archivedProperties}
                                      loadUserData={loadUserData}
                                      setLeadGenSection={setLeadGenSection}
                                      latestFavourites={latestFavourites}
                                      setLatestFavourites={setLatestFavourites}
                                    />


                                  </>
                                  : leadGenSection === 'Manual matcher' ?
                                    <ManualMatcher
                                      increaseUsageCount={increaseUsageCount}
                                      setErrors={setErrors}
                                      userData={userData}
                                      loadUserData={loadUserData}
                                      savedProperties={savedProperties}
                                      archivedProperties={archivedProperties}
                                      handleVisitUrl={handleVisitUrl}
                                      savedActionShow={savedActionShow}
                                      setSavedActionShow={setSavedActionShow}
                                      handleSavedActionClose={handleSavedActionClose}
                                      setLeadGenSection={setLeadGenSection}
                                      latestFavourites={latestFavourites}
                                      handleSavedActionShow={handleSavedActionShow}
                                      setLatestFavourites={setLatestFavourites}
                                    />
                                    : leadGenSection === 'Hidden properties' ?
                                      <HiddenProperties
                                        hiddenProperties={hiddenProperties}
                                        handleVisitUrl={handleVisitUrl}
                                        loadUserData={loadUserData}
                                        setLeadGenSection={setLeadGenSection}
                                        latestFavourites={latestFavourites}
                                        setLatestFavourites={setLatestFavourites}
                                      />

                                      :
                                      ''
                      }
                    </div>
                  </div>


                </section>


              </>

            </section>
          </section>
        }
      </section >

      {/* Modals */}
      < SavedProperties
        savedActionShow={savedActionShow}
        handleSavedActionClose={handleSavedActionClose}
        setLeadGenSection={setLeadGenSection}
        latestFavourites={latestFavourites}
      />
      < RemoveProperties
        propertyRemoveShow={propertyRemoveShow}
        handleRemovePropertyClose={handleRemovePropertyClose}
        removeProperty={removeProperty}
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