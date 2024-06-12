import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { CSVLink } from 'react-csv'
import { getUserToken, isUserAuth, getAccessToken } from '../../../auth/Auth'
import Select from 'react-select'
import ArchivedPropertiesModal from '../../b2bModals/ArchivedPropertiesModal'
import Swal from 'sweetalert2'
import Loading from '../../../helpers/Loading'


const LeadGenSaved = ({ savedProperties, userData, csvData, setCsvData, getCurrentDate, handleVisitUrl, loadUserData, setSavedProperties,
  setLatestFavourites, latestFavourites, setLeadGenSection }) => {

  // state to enable navigation between pages
  const navigate = useNavigate()

  // state to determine what kind of view we want to see on the page
  const [savedPropertyView, setSavedPropertyView] = useState('Grid')

  // state to determine whether the row has been expanded or not
  const [expandedRows, setExpandedRows] = useState({})

  // state to determmine whether the item is being edited or not
  const [editModes, setEditModes] = useState({})

  // state for the expanded row data
  const [formData, setFormData] = useState({})

  const [selectedRows, setSelectedRows] = useState([])
  const [selectAllStatus, setSelectAllStatus] = useState(false)

  const [onMarket, setOnMarket] = useState([])
  const [offMarket, setOffMarket] = useState([])

  // state for whether we see on market or off market
  const [marketView, setMarketView] = useState('Live')

  // state for controlling the filters opening and closing
  const [filterView, setFilterView] = useState(false)

  const [channel, setChannel] = useState('')
  const [postcode, setPostcode] = useState('')
  const [bedroomsMin, setBedroomsMin] = useState('')
  const [bedroomsMax, setBedroomsMax] = useState('')
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const [trackingData, setTrackingData] = useState('')
  const [minPriceOptions, setMinPriceOptions] = useState([])
  const [maxPriceOptions, setMaxPriceOptions] = useState([])

  const [favouriteDetailsLoading, setFavouriteDetailsLoading] = useState(false)

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' })


  const parsePrice = (price) => {
    if (!price) return 0 // Handle null or undefined prices

    // Remove non-numeric characters except for decimal points and commas
    let numericPrice = price.replace(/[^0-9.,]+/g, '')

    // If the price is a rental price per month (indicated by "pcm"), convert it to an annual equivalent for consistent comparison
    if (price.toLowerCase().includes('pcm')) {
      numericPrice = numericPrice.replace(/,/g, '') // Remove commas
      return parseFloat(numericPrice) * 12 // Convert monthly price to annual
    } else {
      return parseFloat(numericPrice.replace(/,/g, '')) // Remove commas and convert to float
    }
  }


  useEffect(() => {
    if (savedProperties) {
      let data = savedProperties

      if (channel) {
        data = data.filter(item => item.channel === channel)
      }
      if (postcode) {
        data = data.filter(item => item.postcode.toUpperCase().startsWith(postcode.toUpperCase()))
      }
      if (bedroomsMin) {
        data = data.filter(item => parseInt(item.bedrooms) >= parseInt(bedroomsMin))
      }
      if (bedroomsMax) {
        data = data.filter(item => parseInt(item.bedrooms) <= parseInt(bedroomsMax))
      }
      if (priceMin) {
        data = data.filter(item => parsePrice(item.price) >= parseFloat(priceMin))
      }
      if (priceMax) {
        data = data.filter(item => parsePrice(item.price) <= parseFloat(priceMax))
      }
      if (trackingData) {
        data = data.filter(item => parseInt(item.live_tracking) === parseInt(trackingData))
      }

      // Sort the filtered data
      const sortedData = getSortedProperties(data)

      const offMarketProperties = sortedData.filter(item => item.market_status === 'Off Market')
      const onMarketProperties = sortedData.filter(item => item.market_status === 'Live')
      setOffMarket(offMarketProperties)
      setOnMarket(onMarketProperties)
    }
  }, [savedProperties, channel, postcode, bedroomsMin, bedroomsMax, priceMin, priceMax, trackingData, sortConfig])



  useEffect(() => {
    // Conditionally set price options based on the channel
    if (channel === 'rent') {
      setMinPriceOptions(rentalPriceOptions)
      setMaxPriceOptions(rentalPriceOptions)
    } else if (channel === 'sale') {
      setMinPriceOptions(salesPriceOptions)
      setMaxPriceOptions(salesPriceOptions)
    } else {
      setMinPriceOptions([])
      setMaxPriceOptions([])
    }
  }, [channel])

  const bedroomOptions = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' }
  ]

  const rentalPriceOptions = [
    ...Array.from({ length: 9 }, (_, i) => ({ value: `${100 + i * 100}`, label: `£${100 + i * 100}` })),
    ...Array.from({ length: 5 }, (_, i) => ({ value: `${1000 + i * 200}`, label: `£${1000 + i * 200}` })),
    ...Array.from({ length: 8 }, (_, i) => ({ value: `${2000 + i * 250}`, label: `£${2000 + i * 250}` })),
    ...Array.from({ length: 8 }, (_, i) => ({ value: `${4000 + i * 500}`, label: `£${4000 + i * 500}` })),
    ...Array.from({ length: 4 }, (_, i) => ({ value: `${8000 + i * 1000}`, label: `£${8000 + i * 1000}` })),
    ...Array.from({ length: 4 }, (_, i) => ({ value: `${12000 + i * 2000}`, label: `£${12000 + i * 2000}` }))
  ]

  const salesPriceOptions = [
    ...Array.from({ length: 9 }, (_, i) => ({ value: `${100000 + i * 100000}`, label: `£${(100000 + i * 100000).toLocaleString()}` })),
    ...Array.from({ length: 5 }, (_, i) => ({ value: `${1000000 + i * 200000}`, label: `£${(1000000 + i * 200000).toLocaleString()}` })),
    ...Array.from({ length: 8 }, (_, i) => ({ value: `${2000000 + i * 250000}`, label: `£${(2000000 + i * 250000).toLocaleString()}` })),
    ...Array.from({ length: 8 }, (_, i) => ({ value: `${4000000 + i * 500000}`, label: `£${(4000000 + i * 500000).toLocaleString()}` })),
    ...Array.from({ length: 4 }, (_, i) => ({ value: `${8000000 + i * 1000000}`, label: `£${(8000000 + i * 1000000).toLocaleString()}` })),
    ...Array.from({ length: 6 }, (_, i) => ({ value: `${12000000 + i * 2000000}`, label: `£${(12000000 + i * 2000000).toLocaleString()}` }))
  ]


  // function for clearing filters
  const clearFilters = () => {
    setChannel('')
    setPostcode('')
    setBedroomsMin('')
    setBedroomsMax('')
    setTrackingData('')
    setPriceMin('')
    setPriceMax('')
  }

  // Function to toggle row expansion
  const toggleRowExpansion = (rightmoveId) => {
    const item = savedProperties.find(prop => prop.rightmove_id === rightmoveId)

    // Toggle the expanded state
    setExpandedRows(prevExpandedRows => ({
      ...prevExpandedRows,
      [rightmoveId]: !prevExpandedRows[rightmoveId],
    }))

    // Reinitialize formData for the item if expanding
    if (!expandedRows[rightmoveId]) {
      // Check if formData already exists for this item to avoid overwriting unsaved edits
      if (!formData[rightmoveId]) {
        setFormData(prevFormData => ({
          ...prevFormData,
          [rightmoveId]: {
            owner_name: item.owner_name || '',
            owner_email: item.owner_email || '',
            owner_mobile: item.owner_mobile || null,
            emails_sent: item.emails_sent || null,
            letters_sent: item.letters_sent || null,
            hand_cards: item.hand_cards || null,
            notes: item.notes || '',
            live_tracking: item.live_tracking || 0,
          },
        }))
      }
    } else {
      // Optionally, clear formData for the item if collapsing the row
      // Comment out or adjust based on whether you want to retain formData for collapsed rows
      /*
      setFormData(prevFormData => {
        const newData = { ...prevFormData };
        delete newData[rightmoveId];
        return newData;
      });
      */
    }
  }


  // Function to toggle edit mode
  const toggleEditMode = (rightmoveId, item) => {
    if (!editModes[rightmoveId]) {
      // Initialize formData for the specific item
      setFormData(prevFormData => ({
        ...prevFormData,
        [rightmoveId]: {
          owner_name: item.owner_name || '',
          owner_email: item.owner_email || '',
          owner_mobile: item.owner_mobile || null,
          emails_sent: item.emails_sent || null,
          letters_sent: item.letters_sent || null,
          hand_cards: item.hand_cards || null,
          notes: item.notes || '',
          live_tracking: item.live_tracking || 0,

        },
      }))
    } else {
      // Optionally clear formData for the item if exiting edit mode
      // setFormData(prevFormData => {
      //   const newData = { ...prevFormData }
      //   delete newData[rightmoveId]
      //   return newData
      // })
    }

    setEditModes(prevEditModes => ({
      ...prevEditModes,
      [rightmoveId]: !prevEditModes[rightmoveId],
    }))
  }

  const getSortedProperties = (properties) => {
    const sortedProperties = [...properties]

    if (sortConfig.key) {
      sortedProperties.sort((a, b) => {
        if (sortConfig.key === 'price') {
          // Use parsePrice to convert price to a numeric value
          const priceA = parsePrice(a.price)
          const priceB = parsePrice(b.price)

          if (priceA < priceB) return sortConfig.direction === 'ascending' ? -1 : 1
          if (priceA > priceB) return sortConfig.direction === 'ascending' ? 1 : -1
          return 0
        } else if (sortConfig.key === 'date_added') {
          const dateA = new Date(a.date_added)
          const dateB = new Date(b.date_added)

          if (dateA < dateB) return sortConfig.direction === 'ascending' ? -1 : 1
          if (dateA > dateB) return sortConfig.direction === 'ascending' ? 1 : -1
          return 0
        }
        return 0
      })
    }
    return sortedProperties
  }
  

  const handleSort = (key) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
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

  // function to setting the favurites to the archives: 
  const archiveFavourite = async (favouriteIds) => {
    if (isUserAuth()) {
      try {
        const response = await axios.put('/api/epc_favourite/update_favourites/', { favourite_ids: favouriteIds }, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })

        console.log('Response:', response.data)
        setLatestFavourites(favouriteIds.length)
        loadUserData()
        handleArchivedActionShow()
        setSelectedRows([])

      } catch (error) {
        console.error('Error updating favorite:', error)
      }
    } else {
      navigate('/access-denied')
      console.log('logged out')
    }
  }


  // function to update the saved item: 
  const handleSave = async (rightmoveId) => {
    setFavouriteDetailsLoading(true)
    if (isUserAuth()) {
      try {
        const response = await axios.patch(`/api/epc_favourite/update_favourites/${rightmoveId}/`, formData[rightmoveId], {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        await loadUserData()
        setEditModes(prevEditModes => ({
          ...prevEditModes,
          [rightmoveId]: false,
        }))
      } catch (error) {
        console.error('Error updating favourite:', error)
      } finally {
        setFavouriteDetailsLoading(false)  // Ensure loading state is set to false in both success and error cases
      }
    } else {
      navigate('/access-denied')
      console.log('logged out')
      setFavouriteDetailsLoading(false)
    }
  }


  // function to move properties into the letter sequence
  const moveToLetters = async (favouriteIds) => {
    if (isUserAuth()) {
      try {
        const response = await axios.put('/api/epc_favourite/move_to_letters/', { favourite_ids: favouriteIds }, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        console.log('Response:', response.data)
        Swal.fire({
          title: '😎 action complete',
          text: `${favouriteIds.length} properties prepared for outbound letters`,
          confirmButtonText: 'Go to letter hub',
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
            setLeadGenSection('Letter campaigns')
          }
        })
        loadUserData()
        setSelectedRows([])

      } catch (error) {
        console.error('Error updating favorite:', error)
      }
    } else {
      navigate('/access-denied')
      console.log('logged out')
    }
  }

  // function for determining what to do with the drop down selector
  const handleDropdownChange = (selectedOption) => {
    if (selectedOption.value === 'export') {
      // Handle Export
      // You might need to programmatically click a hidden CSVLink here
      document.querySelector('.csv-link').click()
      setSelectedRows([])
    } if (selectedOption.value === 'archive') {
      // Handle Archive
      archiveFavourite(selectedRows.map(row => row.rightmove_id))
    } else if (selectedOption.value === 'letter') {
      // Handle Archive
      moveToLetters(selectedRows.map(row => row.rightmove_id))
    }
  }

  const options = [
    { value: 'export', label: 'Extract' },
    { value: 'archive', label: 'Archive' },
    { value: 'letter', label: 'Letters' }
  ]


  // ? Section 4: Select row functionality
  const handleRowSelectionChange = (e, item) => {
    const selectedProperty = { ...item }
    console.log('selected row ->', item)
    if (e.target.checked) {
      setSelectedRows(prevRows => [...prevRows, selectedProperty])
    } else {
      setSelectedRows(prevRows => prevRows.filter(row => row.rightmove_id !== selectedProperty.rightmove_id))
    }

    // Check or uncheck the 'Select All' checkbox based on whether all rows are selected
    setSelectAllStatus(savedProperties.length === selectedRows.length)
  }

  const selectAllRows = () => {
    if (marketView === 'Live') {
      setSelectedRows(onMarket)
    } else if (marketView === 'Off Market') {
      setSelectedRows(offMarket)
    }
    setSelectAllStatus(true)
  }

  const deselectAllRows = () => {
    setSelectedRows([])
    setSelectAllStatus(false)
  }

  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      selectAllRows() // Function that selects all rows
    } else {
      deselectAllRows() // Function that deselects all rows
    }
  }

  const transformSelectedRowsToCSV = (selectedRows) => {
    return selectedRows.map((item, index) => ({
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
      hand_cards: item.hand_cards,
      notes: item.notes,

    }))
  }

  useEffect(() => {
    if (selectedRows) {
      const csvData = transformSelectedRowsToCSV(selectedRows)
      setCsvData(csvData)
    }
  }, [selectedRows]) // Re-run when selectedRows changes

  // manageing modal for saved iitems added 
  const [archivedActionShow, setArchivedActionShow] = useState(false)

  // close modal
  const handleArchivedActionClose = () => {
    setArchivedActionShow(false)
  }

  // show the modal
  const handleArchivedActionShow = (e) => {
    setArchivedActionShow(true)
    setSelectedRows([])
  }


  const formatDate = (dateStr) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December']
    const suffixes = ['th', 'st', 'nd', 'rd']

    const date = new Date(dateStr)
    const day = date.getDate()
    const monthIndex = date.getMonth()
    const year = date.getFullYear()

    // Find the correct suffix for the day
    const tensDigit = day % 10
    const suffixIndex = (day < 10 || day > 20) ? tensDigit : 0
    const suffix = suffixes[suffixIndex] || suffixes[0]

    return `${day}${suffix} ${months[monthIndex]} ${year}`
  }




  return (

    <>
      <div className='results-block'>
        {savedProperties && savedProperties.length > 0 ?
          <>
            <div className="property-insight-nav">

              <div className="property-insight-buttons">
                <h3 className={`insight-button ${marketView === 'Live' ? 'active' : 'inactive'}`} id='left' onClick={() => setMarketView('Live')}>Live properties</h3>
                <h3 className={`insight-button ${marketView === 'Off Market' ? 'active' : 'inactive'}`} id='right' onClick={() => setMarketView('Off Market')}>Withdrawn or sold</h3>
              </div>
            </div>

            <div className='title-section'>
              <h3 className='sub-title'>You have {onMarket && marketView === 'Live' ? `${onMarket.length} on market` : offMarket && marketView === 'Off Market' ? `${offMarket.length} off market` : ''} properties ready to be extracted</h3>
              <div className='tracking-actions'>
                {userData && userData.company_favourites && (
                  <>
                    <Select
                      className='select-dropdown'
                      options={options}
                      onChange={handleDropdownChange}
                      isSearchable={false}
                      placeholder="Select an action"
                    />
                    <CSVLink
                      data={csvData || []}
                      className='export csv-link' // Added a class for easy selection
                      filename={`Wittle Lead Generator Extract - ${getCurrentDate()}.csv`}
                      style={{ display: 'none' }} // Hide the link as it's now triggered programmatically
                    >
                    </CSVLink>
                  </>
                )}
                <div
                  className={`filter-icon ${filterView ? 'active' : 'inactive'}`}
                  onClick={() => setFilterView(!filterView)}
                  style={{ backgroundColor: filterView ? '#1A276C' : 'inherit' }}>
                </div>
              </div>
            </div>
            {filterView ?
              <div className={`filter-row-section ${filterView ? 'active' : 'inactive'}`}>
                <div className='filter-block'>
                  <h3 className='filter-title'>Channel</h3>
                  <select onChange={(e) => setChannel(e.target.value)}>
                    <option value={''}>Select...</option>
                    <option value={'sale'}>Sale</option>
                    <option value={'rent'}>Rent</option>
                  </select>
                </div>
                <div className='filter-block'>
                  <h3 className='filter-title'>Postcode</h3>
                  <input className='filter-input' onChange={(e) => setPostcode(e.target.value)}></input>
                </div>
                <div className='filter-block'>
                  <h3 className='filter-title'>Bedrooms</h3>
                  <select className='small' value={bedroomsMin} onChange={e => setBedroomsMin(e.target.value)}>
                    <option value={''}>Min</option>
                    {bedroomOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  <select className='small' value={bedroomsMax} onChange={e => setBedroomsMax(e.target.value)}>
                    <option value={''}>Max</option>
                    {bedroomOptions.filter(option => option.value >= bedroomsMin).map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div className='filter-block'>
                  <h3 className='filter-title'>Price</h3>
                  <select className='small' value={priceMin} onChange={e => setPriceMin(e.target.value)}>
                    <option value={''}>Min</option>
                    {minPriceOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  <select className='small' value={priceMax} onChange={e => setPriceMax(e.target.value)}>
                    <option value={''}>Max</option>
                    {maxPriceOptions.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div className='filter-block'>
                  <h3 className='filter-title'>Tracking</h3>
                  <select onChange={(e) => setTrackingData(e.target.value)}>
                    <option value={''}>All</option>
                    <option value={'1'}>Yes</option>
                    <option value={'0'}>No</option>
                  </select>
                </div>
                <button className='clear-filters' onClick={clearFilters}>Clear</button>
              </div>
              : ''}

            <div className='results-table'>
              <div className='results-headers'>
                <div id='column11' className='column'>
                  <div className='custom-checkbox'>
                    <input
                      className='checkbox'
                      type="checkbox"
                      checked={
                        marketView === 'Live' && selectedRows && onMarket ? selectedRows.length === onMarket.length && onMarket.length > 0 :
                          marketView === 'Off Market' && selectedRows && offMarket ? selectedRows.length === offMarket.length && offMarket.length > 0 :
                            false
                      }
                      onChange={handleSelectAllChange}
                    />
                    <label className='label'></label>
                  </div>
                </div>
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
                  <h5
                    onClick={() => handleSort('price')}
                    style={{ cursor: 'pointer' }}
                  >
                    Price {sortConfig.key === 'price' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </h5>
                </div>
                <div id='column8' className='column'>
                  <h5>Bedrooms</h5>
                </div>
                <div id='column9saved' className='column'>
                  <h5
                    onClick={() => handleSort('date_added')}
                    style={{ cursor: 'pointer' }}
                  >
                    Date Saved {sortConfig.key === 'date_added' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </h5>
                </div>
                <div id='column10saved' className='column'>
                  <h5></h5>
                </div>
              </div>
              <hr className='property-divider' />
              {/* <div className='saved-properties'> */}
              <div className={`results-details archive ${filterView ? 'active' : 'inactive'}`}>
                {(marketView === 'Live' ? onMarket : offMarket).map((item, index) => {
                  const isRowExpanded = expandedRows[item.rightmove_id]
                  const isEditMode = editModes[item.rightmove_id]
                  const isRowSelected = selectedRows.some(selectedRow => selectedRow.rightmove_id === item.rightmove_id)
                  return (
                    <>
                      <div className={`results-content ${isRowSelected ? 'highlighted-row' : ''}`}>
                        <div className='column' id='column11'>
                          <div className='custom-checkbox'>
                            <input
                              className='checkbox'
                              type='checkbox'
                              checked={selectedRows.some(row => row.rightmove_id === item.rightmove_id)}
                              onChange={(e) => handleRowSelectionChange(e, item)}
                            />
                            <label className='label'>
                            </label>
                          </div>
                        </div>
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
                        <div className='column' id='column9saved' onClick={() => handleVisitUrl(item.url)}>
                          <h5>{formatDate(item.date_added)}</h5>
                        </div>
                        {savedPropertyView === 'Grid' ?
                          <>
                            <div className='column' id='column10saved' onClick={() => toggleRowExpansion(item.rightmove_id)}>
                              <h5 className='expander'>{isRowExpanded ? 'v' : '^'}</h5>
                            </div>

                          </>
                          : savedPropertyView === 'Table' ?
                            <>
                            </>
                            : ''}
                      </div>
                      {isRowExpanded && !favouriteDetailsLoading ?
                        <div className='expanded-tracking-details'>
                          <div className='expanded-tracking-content'>
                            <div className='tracking-left'>
                              <div className='tracking-row'>
                                <h3 className='row-title'>Owner name: </h3>
                                {!isEditMode ?
                                  <h3 className='row-result'>{item.owner_name}</h3> :
                                  <input
                                    type='text'
                                    value={formData[item.rightmove_id].owner_name || ''}
                                    onChange={e => setFormData({
                                      ...formData,
                                      [item.rightmove_id]: { ...formData[item.rightmove_id], owner_name: e.target.value },
                                    })}
                                    className='row-input wide'
                                  />
                                }
                              </div>
                              <div className='tracking-row'>
                                <h3 className='row-title'>Owner email: </h3>
                                {!isEditMode ?
                                  <h3 className='row-result'>{item.owner_email}</h3> :
                                  <input
                                    type='text'
                                    value={formData[item.rightmove_id].owner_email || ''}
                                    onChange={e => setFormData({
                                      ...formData,
                                      [item.rightmove_id]: { ...formData[item.rightmove_id], owner_email: e.target.value },
                                    })}
                                    className='row-input wide'
                                  />
                                }
                              </div>
                              <div className='tracking-row'>
                                <h3 className='row-title'>Owner phone: </h3>
                                {!isEditMode ?
                                  <h3 className='row-result'>{item.owner_mobile}</h3> :
                                  <input
                                    type='text'
                                    value={formData[item.rightmove_id].owner_mobile || null}
                                    onChange={e => setFormData({
                                      ...formData,
                                      [item.rightmove_id]: { ...formData[item.rightmove_id], owner_mobile: e.target.value },
                                    })}
                                    className='row-input wide'
                                  />
                                }
                              </div>
                              <div className='tracking-row'>
                                <h3 className='row-title'>Currently Tracking: </h3>
                                {!isEditMode ?
                                  <h3 className='row-result'>{item.live_tracking === 1 ? 'Yes' : 'No'}</h3> :
                                  <input
                                    type='checkbox'
                                    checked={!!formData[item.rightmove_id].live_tracking} // Convert `live_tracking` to boolean for checked attribute
                                    onChange={(e) => setFormData({
                                      ...formData,
                                      [item.rightmove_id]: {
                                        ...formData[item.rightmove_id],
                                        live_tracking: e.target.checked ? 1 : 0, // Assign 1 if checked, 0 if not
                                      },
                                    })}
                                    className='row-input wide'
                                  />
                                }
                              </div>
                            </div>
                            <div className='tracking-middle'>
                              <div className='tracking-row'>
                                <h3 className='row-title'>Emails sent: </h3>
                                {!isEditMode ?
                                  <h3 className='row-result'>{item.emails_sent}</h3> :
                                  <input
                                    type='text'
                                    value={formData[item.rightmove_id].emails_sent || null}
                                    onChange={e => setFormData({
                                      ...formData,
                                      [item.rightmove_id]: { ...formData[item.rightmove_id], emails_sent: e.target.value },
                                    })}
                                    className='row-input wide'
                                  />
                                }
                              </div>
                              <div className='tracking-row'>
                                <h3 className='row-title'>Letters sent: </h3>
                                {!isEditMode ?
                                  <h3 className='row-result'>{item.letters_sent}</h3> :
                                  <input
                                    type='text'
                                    value={formData[item.rightmove_id].letters_sent || null}
                                    onChange={e => setFormData({
                                      ...formData,
                                      [item.rightmove_id]: { ...formData[item.rightmove_id], letters_sent: e.target.value },
                                    })}
                                    className='row-input wide'
                                  />
                                }
                              </div>
                              <div className='tracking-row'>
                                <h3 className='row-title'>Hand written cards: </h3>
                                {!isEditMode ?
                                  <h3 className='row-result'>{item.hand_cards}</h3> :
                                  <input
                                    type='text'
                                    value={formData[item.rightmove_id].hand_cards || null}
                                    onChange={e => setFormData({
                                      ...formData,
                                      [item.rightmove_id]: { ...formData[item.rightmove_id], hand_cards: e.target.value },
                                    })}
                                    className='row-input wide'
                                  />
                                }
                              </div>
                            </div>
                            <div className='tracking-right'>
                              <div className='tracking-row'>
                                {!isEditMode ? (
                                  <h3 className='row-result'>{item.notes}</h3>
                                ) : (
                                  <textarea
                                    placeholder='Notes'
                                    value={formData[item.rightmove_id].notes || ''}
                                    onChange={e => setFormData({
                                      ...formData,
                                      [item.rightmove_id]: {
                                        ...formData[item.rightmove_id],
                                        notes: e.target.value,
                                      },
                                    })}
                                  ></textarea>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className='expanded-tracking-actions'>
                            <button className='save' onClick={() => {
                              if (isEditMode) {
                                handleSave(item.rightmove_id)
                              } else {
                                toggleEditMode(item.rightmove_id, item) // Pass 'item' to populate formData for edit mode
                              }
                            }}>
                              {isEditMode ? 'Save' : 'Edit'}
                            </button>
                            <button className='delete' onClick={() => deleteFavourite(item.rightmove_id)}>Delete</button>
                          </div>
                        </div>
                        : isRowExpanded && favouriteDetailsLoading ?
                          <div className='expanded-tracking-details'>
                            <div className='expanded-tracking-content'>
                              <div className='loading-tracking'>
                                <Loading />
                              </div>
                            </div>
                          </div >
                          : ''}
                      <hr className='property-divider' />
                    </>
                  )
                })}
                {/* </div> */}
              </div>
            </div>

          </>
          : <h3 className='sub-title'>You haven&apos;t saved any properties yet! Once you&apos;ve saved some properties, you&apos;ll be able to extract them.</h3>
        }
      </div >
      <ArchivedPropertiesModal
        archivedActionShow={archivedActionShow}
        handleArchivedActionClose={handleArchivedActionClose}
        setLeadGenSection={setLeadGenSection}
        latestFavourites={latestFavourites}
      />
    </>
  )
}

export default LeadGenSaved

