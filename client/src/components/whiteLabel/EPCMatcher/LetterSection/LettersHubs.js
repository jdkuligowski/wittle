import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { getUserToken, isUserAuth, getAccessToken } from '../../../auth/Auth'
import Swal from 'sweetalert2'
import Loading from '../../../helpers/Loading'
import CreateTemplate from './CreateTemplate'
import Handlebars, { create } from 'handlebars'
import BasicTemplate from './TemplatePDFs.js/BasicTemplate'
import ReactDOMServer from 'react-dom/server'
import CreateCampaign from './CreateCampaign'
import CampaignOverview from './Campaigns/CampaignOverview'
import SetSignatures from './SetSignatures'
import { loadStripe } from '@stripe/stripe-js'



const LettersHub = ({ letterProperties, setLetterProperties, userData, setUserData, signature, setSignature, loadUserData, letterTemplates, setLetterTemplates,
  letterCampaigns, setLetterCampaigns, campaignLoading, setCampaignLoading, setLeadGenSection, availableCredits, setAvailableCredits }) => {


  // state to enable navigation between pages
  const navigate = useNavigate()

  const [letterTab, setLetterTab] = useState('Home')


  // state for selecting rows
  const [selectedRows, setSelectedRows] = useState([])
  const [selectAllStatus, setSelectAllStatus] = useState(false)

  // manageing modal for saved iitems added 
  const [createTemplateShow, setCreateTemplateShow] = useState(false)

  // managing state for campaign selector dropdown
  const [selectedCampaign, setSelectedCampaign] = useState()

  // state to store credits
  const [creditValue, setCreditValue] = useState(0)

  // state for holding the logo
  const [logo, setLogo] = useState(null)

  // state for loading sign during pdf processing
  const [pdfProcessing, setPdfProcessing] = useState(false)

  // state for the selected row
  const [selectedData, setSelectedData] = useState(null)

  // state for selected template
  const [selectedTemplate, setSelectedTemplate] = useState()

  const [selectedTemplateName, setSelectedTemplateName] = useState('')

  // state for whether its a new or ediitedtemplate
  const [templateAction, setTemplateAction] = useState('')
  const [currentTemplate, setCurrentTemplate] = useState('')

  const [isEditPending, setIsEditPending] = useState(false)

  // state for editing credts
  const [editCredts, setEditCredits] = useState(false)

  const [exampleTemplateData, setExampleTemplateData] = useState()

  // state for controlling the filters opening and closing
  const [campaignFilters, setCampaignFilters] = useState(false)

  const [campaignFilteredProperties, setCampaignFilteredProperties] = useState([])

  const [channel, setChannel] = useState('')
  const [postcode, setPostcode] = useState('')
  const [bedroomsMin, setBedroomsMin] = useState('')
  const [bedroomsMax, setBedroomsMax] = useState('')
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')
  const [minPriceOptions, setMinPriceOptions] = useState([])
  const [maxPriceOptions, setMaxPriceOptions] = useState([])

  useEffect(() => {
    if (letterProperties && letterProperties.length > 0) {
      let data = letterProperties
      // filter by channel
      if (channel) {
        data = data.filter(item => item.channel === channel)
      }
      // filter by postcode
      if (postcode) {
        data = data.filter(item => item.postcode.toUpperCase().startsWith(postcode.toUpperCase()))
      }
      // Filter by bedrooms
      if (bedroomsMin) {
        data = data.filter(item => parseInt(item.bedrooms) >= parseInt(bedroomsMin))
      }
      if (bedroomsMax) {
        data = data.filter(item => parseInt(item.bedrooms) <= parseInt(bedroomsMax))
      }
      // Filter by prce
      if (priceMin) {
        data = data.filter(item => parseInt(item.price_numeric) >= parseInt(priceMin))
      }
      if (priceMax) {
        data = data.filter(item => parseInt(item.price_numeric) <= parseInt(priceMax))
      }

      setCampaignFilteredProperties(data)
    }
  }, [letterProperties, channel, postcode, bedroomsMin, bedroomsMax, priceMin, priceMax])

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
    setPriceMin('')
    setPriceMax('')
  }



  useEffect(() => {
    if (userData && userData.epc_favourites.length > 0) {
      setExampleTemplateData(userData.epc_favourites[0])
      console.log('example data for template ->', userData.epc_favourites[0])
    }
  }, [userData])


  // ? Section 1: Select row functionality
  const handleRowSelectionChange = (e, item) => {
    const selectedProperty = { ...item }
    console.log('selected row ->', item)

    if (e.target.checked) {
      setSelectedRows(prevRows => [...prevRows, selectedProperty])
    } else {
      setSelectedRows(prevRows => prevRows.filter(row => row.rightmove_id !== selectedProperty.rightmove_id))
    }

    // Determine the count of rows not in a campaign
    const rowsNotInCampaignCount = campaignFilteredProperties.filter(item => item.letter_campaign === 'None' || item.letter_campaign === null).length

    // Update the 'Select All' checkbox status based on whether all eligible rows are selected
    setSelectAllStatus(selectedRows.length === rowsNotInCampaignCount)
  }


  // function for selecting rows
  const selectAllRows = () => {
    // Filter letterProperties to include only items not in a campaign
    const rowsNotInCampaign = campaignFilteredProperties.filter(item => item.letter_campaign === 'None' || item.letter_campaign === null)

    // Set these filtered items as the selected rows
    setSelectedRows(rowsNotInCampaign)

    // Update select all status to true since all eligible rows are now selected
    setSelectAllStatus(true)
  }


  // function for deseleting rows
  const deselectAllRows = () => {
    setSelectedRows([])
    setSelectAllStatus(false)
  }

  // function for selecting all rows
  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      selectAllRows() // Function that selects all rows
    } else {
      deselectAllRows() // Function that deselects all rows
    }
  }



  // close modal
  const handleCreateTemplateClose = () => {
    setCreateTemplateShow(false)
    setCurrentTemplate({})
    setTemplateAction('new')
  }

  // show the modal
  const handleCreateTemplateShow = (e) => {
    setTemplateAction('new')
    setCurrentTemplate({})
    setCreateTemplateShow(true)
  }

  // show the modal
  const handleEditTemplateShow = (item) => {
    setTemplateAction('edit')
    setCurrentTemplate(item)
    // setCreateTemplateShow(true)
    setIsEditPending(true)
  }


  useEffect(() => {
    if (isEditPending && currentTemplate) {
      setCreateTemplateShow(true)
      setIsEditPending(false)
    }
  }, [currentTemplate, isEditPending])



  // delete template
  const deleteTemplate = async (item) => {
    // Start loading
    setCampaignLoading(true)

    try {
      // Display confirmation dialog
      const result = await Swal.fire({
        title: '🫡 Wittle alerts',
        text: 'Are you sure you want to delete this template?',
        icon: 'warning', // Adds a warning icon to the alert
        showCancelButton: true, // Shows a cancel button alongside the confirm button
        confirmButtonText: 'Yes, delete 🤝',
        confirmButtonColor: '#ED6B86',
        cancelButtonText: 'No thanks',
        backdrop: true,
        background: '#FDF7F0',
        customClass: {
          title: 'popup-swal-title',
          popup: 'popup-swal-body',
          confirmButton: 'popup-swal-confirm',
          cancelButton: 'popup-swal-cancel',
        },
      })

      // Check if user confirmed the deletion
      if (result.isConfirmed) {
        const response = await axios.delete(`/api/letter_templates/delete/${item.id}/`, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })

        // Optionally, alert the user of success
        Swal.fire({
          title: '😎 action complete',
          text: 'The template has been deleted',
          icon: 'success',
          confirmButtonColor: '#ED6B86',
        })

        // Refresh user data if needed
        await loadUserData()
      }
    } catch (error) {
      console.error('Error deleting template:', error)
      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete the template.',
        icon: 'error',
        confirmButtonText: 'OK',
        customClass: {
          confirmButton: 'popup-swal-confirm',
        },
      })
    } finally {
      // Stop loading regardless of result
      setCampaignLoading(false)
    }
  }



  // select campaign to add properties to
  const handleCampaignSelection = (e) => {
    const campaignId = e.target.value
    setSelectedCampaign(campaignId)

    // Assuming `selectedRows` or similar state holds the properties you want to add to the campaign
    const selectedProperties = selectedRows // Or however you have access to the selected properties
    const selectedCampaignDetails = letterCampaigns.find(campaign => campaign.id.toString() === campaignId) // Find the selected campaign details

    if (selectedProperties && selectedProperties.length > 0 && selectedCampaignDetails) {
      // Call addPropertiesToCampaign with the selected properties and campaign name
      addPropertiesToCampaign(selectedProperties, selectedCampaignDetails.campaign_name)
    } else {
      console.log('No properties selected or campaign not found')
    }
  }


  const addPropertiesToCampaign = async (properties, campaignName) => {

    const propertyIds = properties.map(property => property.rightmove_id)

    try {
      const response = await axios.put('/api/epc_favourite/add_to_campaign/', {
        property_ids: propertyIds,
        campaign_name: campaignName,
      }, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      console.log('Properties added to campaign successfully:', response.data)
      loadUserData()
      setSelectedRows([])
      Swal.fire({
        title: '😎 action complete',
        text: `${properties.length} properties added to campaign`,
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
    } catch (error) {
      console.error('Error adding properties to campaign:', error.response.data)
    }
  }



  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    if (!isNaN(date.getTime())) {
      // Date is valid
      const day = date.getDate().toString().padStart(2, '0')
      const month = (date.getMonth() + 1).toString().padStart(2, '0') // getMonth() is zero-based
      const year = date.getFullYear()
      return `${day}/${month}/${year}`
    } else {
      // Date is invalid or input is not a valid date string
      console.warn('Invalid date:', dateStr)
      return dateStr // Return original string or handle as needed
    }
  }

  // add credit to account

  const initiateCheckoutSession = async (creditsAmount) => {
    const numericAmount = Number(creditsAmount)

    try {
      const response = await axios.post('/api/usage/add_credit/', {
        credits_amount: numericAmount,
      }, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      window.localStorage.setItem('wittle-latest-credits', JSON.stringify('Yes'))
      window.localStorage.setItem('wittle-credit-value', JSON.stringify(`${creditValue}`))
      // Redirect the user to Stripe Checkout using the session URL
      const { sessionId } = response.data
      const stripe = await loadStripe(process.env.REACT_APP_STRIPE_API_KEY) // Accessing Stripe key
      await stripe.redirectToCheckout({ sessionId })
      // setCheckoutComplete(true)


    } catch (error) {
      console.error('Error initiating checkout session:', error)
      // Handle error (e.g., displaying an error message)
    }
  }



  // function for adding a value
  const addCreditValue = (e) => {
    setCreditValue(e.target.value)
    console.log('credit input ->', e.target.value)
  }

  return (

    <>
      <section className='letter-section'>
        <div className='results-block'>
          {campaignLoading ?

            <div className='property-table-loading'>
              <Loading />
              {/* <h3>We&apos;re making sure everything is fully loaded for you</h3> */}
            </div>
            :

            letterTab === 'Home' && !campaignLoading ?
              <>
                <div className='top-line'>
                  <div className='matching-status'>

                    <h3 className='matching-pill' onClick={() => setLetterTab('My signatures')} style={{ color: letterTab === 'My signatures' ? 'white' : '#1A276C', backgroundColor: letterTab === 'My signatures' ? '#ED6B86' : 'rgba(26, 39, 108, 0.15)' }}>My signatures</h3>
                    <h3 className='matching-pill' onClick={() => setLetterTab('Templates')} style={{ color: letterTab === 'Templates' ? 'white' : '#1A276C', backgroundColor: letterTab === 'Templates' ? '#ED6B86' : 'rgba(26, 39, 108, 0.15)' }}>Templates</h3>
                    <h3 className='matching-pill' onClick={() => setLetterTab('Campaigns')} style={{ color: letterTab === 'Campaigns' ? 'white' : '#1A276C', backgroundColor: letterTab === 'Campaigns' ? '#ED6B86' : 'rgba(26, 39, 108, 0.15)' }}>Campaigns</h3>
                    <h3 className='matching-pill' onClick={() => setLetterTab('Home')} style={{ color: letterTab === 'Home' ? 'white' : '#1A276C', backgroundColor: letterTab === 'Home' ? '#ED6B86' : 'rgba(26, 39, 108, 0.15)' }}>Home</h3>
                  </div>
                  {editCredts ?
                    <div className='credits-section'>
                      <input type='number' value={creditValue} onChange={addCreditValue}></input>
                      <button className='add-credts' onClick={() => initiateCheckoutSession(creditValue)}>Add</button>
                      <h3 className='close-credits' onClick={() => setEditCredits(false)}>❌</h3>
                    </div>
                    : <div className='credits-section'>
                      <h3 className='credit-balance'>{availableCredits ? `Current balance £${availableCredits}` : ''}</h3>
                      <button className='add-credts' onClick={() => setEditCredits(true)}>Top up</button>
                    </div>}
                </div>
                <div className='action-section letter'>
                  {campaignFilteredProperties ? <h3 className='template-total'>You have {campaignFilteredProperties.length} properties prepared for letter campaigns</h3> : ''}
                  <div className='letter-selections'>
                    <select value={selectedCampaign} onChange={handleCampaignSelection} className='template-select letter'>
                      <option value="">Select a campaign</option>
                      {letterCampaigns
                        ? letterCampaigns
                          .filter(campaign => campaign.campaign_status !== 'Live')
                          .map((campaign, index) => (
                            <option key={index} value={campaign.id}>
                              {campaign.campaign_name}
                            </option>
                          ))
                        : ''}
                    </select>
                    <div
                      className={`filter-icon ${campaignFilters ? 'active' : 'inactive'}`}
                      onClick={() => setCampaignFilters(!campaignFilters)}
                      style={{ backgroundColor: campaignFilters ? '#1A276C' : 'inherit' }}>
                    </div>
                  </div>

                </div>
                {campaignFilters ?
                  <div className={`filter-row-section ${campaignFilters ? 'active' : 'inactive'}`}>
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
                    {channel !== '' &&
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
                    }
                    <button className='clear-filters' onClick={clearFilters}>Clear</button>
                  </div>
                  : ''}


                <div className='results-table'>
                  <div className='results-headers letter'>
                    <div id='column11' className='column'>
                      <div className='custom-checkbox'>
                        <input
                          className='checkbox'
                          type="checkbox"
                          checked={
                            campaignFilteredProperties &&
                            selectedRows.length === campaignFilteredProperties.filter(item => item.letter_campaign === 'None' || item.letter_campaign === null).length
                            && selectedRows.length > 0
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
                      <h5>Date added</h5>
                    </div>
                    <div id='column4' className='column'>
                      <h5>Date removed</h5>
                    </div>
                    <div id='column5' className='column'>
                      <h5>Market status</h5>
                    </div>
                    <div id='column6' className='column'>
                      <h5>Channel</h5>
                    </div>
                    <div id='column7' className='column'>
                      <h5>Price</h5>
                    </div>
                    {/* <div id='column6' className='column'>
                      <h5>Action</h5>
                    </div> */}
                  </div>
                  <hr className='property-divider' />
                  <div className={`results-details letter ${campaignFilters ? 'active' : 'inactive'}`}>
                    {campaignFilteredProperties ? campaignFilteredProperties.map((item, index) => {
                      const isRowSelected = selectedRows.some(selectedRow => selectedRow.rightmove_id === item.rightmove_id)
                      return (
                        <>
                          <div className={`results-content ${isRowSelected ? 'highlighted-row' : ''}`}>
                            {item.letter_campaign === 'None' ?
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
                              :
                              <div className='column' id='column11'>
                                <h6>In campaign</h6>
                              </div>}
                            <div className='column' id='column1'>
                              <h5>{index + 1}</h5>
                            </div>
                            <div className='column' id='column2'>
                              <h5>{item.address}</h5>
                            </div>
                            <div className='column' id='column3'>
                              <h5>{item.added_revised}</h5>
                            </div>
                            <div className='column' id='column4'>
                              <h5>{item.market_status === 'Live' ? '' : item.market_status === 'Off Market' && item.week_removed ? formatDate(item.week_removed) : ''}</h5>
                            </div>
                            <div className='column' id='column5'>
                              <h5>{item.market_status === 'Live' ? item.market_status : `🚩 ${item.market_status}`}</h5>
                            </div>
                            <div className='column' id='column6'>
                              <h5>{item.channel}</h5>
                            </div>
                            <div className='column' id='column7'>
                              <h5>{item.price}</h5>
                            </div>
                            {/* <div className='column' id='column6'>
                              <button key={index} onClick={() => generatePDF(item)}>See example</button>
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

              : letterTab === 'Campaigns' && !campaignLoading ?

                <CampaignOverview
                  letterTab={letterTab}
                  setLetterTab={setLetterTab}
                  letterCampaigns={letterCampaigns}
                  loadUserData={loadUserData}
                  letterTemplates={letterTemplates}
                  letterProperties={letterProperties}
                  signature={signature}
                  campaignLoading={campaignLoading}
                  setCampaignLoading={setCampaignLoading}
                  creditValue={creditValue}
                  editCredts={editCredts}
                  setEditCredits={setEditCredits}
                  availableCredits={availableCredits}
                  initiateCheckoutSession={initiateCheckoutSession}
                  addCreditValue={addCreditValue}
                />

                : letterTab === 'Templates' && !campaignLoading ?

                  <>
                    <div className='top-line'>
                      <div className='matching-status'>
                        <h3 className='matching-pill' onClick={() => setLetterTab('My signatures')} style={{ color: letterTab === 'My signatures' ? 'white' : '#1A276C', backgroundColor: letterTab === 'My signatures' ? '#ED6B86' : 'rgba(26, 39, 108, 0.15)' }}>My signatures</h3>
                        <h3 className='matching-pill' onClick={() => setLetterTab('Templates')} style={{ color: letterTab === 'Templates' ? 'white' : '#1A276C', backgroundColor: letterTab === 'Templates' ? '#ED6B86' : 'rgba(26, 39, 108, 0.15)' }}>Templates</h3>
                        <h3 className='matching-pill' onClick={() => setLetterTab('Campaigns')} style={{ color: letterTab === 'Campaigns' ? 'white' : '#1A276C', backgroundColor: letterTab === 'Campaigns' ? '#ED6B86' : 'rgba(26, 39, 108, 0.15)' }}>Campaigns</h3>
                        <h3 className='matching-pill' onClick={() => setLetterTab('Home')} style={{ color: letterTab === 'Home' ? 'white' : '#1A276C', backgroundColor: letterTab === 'Home' ? '#ED6B86' : 'rgba(26, 39, 108, 0.15)' }}>Home</h3>
                      </div>
                      {editCredts ?
                        <div className='credits-section'>
                          <h3 className='credit-balance'>Top up value:</h3>
                          <input type='number' value={creditValue} onChange={addCreditValue}></input>
                          <button className='add-credts' onClick={() => initiateCheckoutSession(creditValue)}>Add</button>
                          <h3 className='close-credits' onClick={() => setEditCredits(false)}>❌</h3>
                        </div>
                        : <div className='credits-section'>
                          <h3 className='credit-balance'>{availableCredits ? `Current balance £${availableCredits}` : ''}</h3>
                          <button className='add-credts' onClick={() => setEditCredits(true)}>Top up</button>
                        </div>}
                    </div>
                    <div className='action-section letter'>
                      {letterTemplates ? <h3 className='template-total'>You have {letterTemplates.length} saved templates</h3> : <h3 className='template-total'>Create some templates so you can see them here</h3>}
                      <div className='save-section'>
                        <div className="print-icon"></div>
                        <h3 onClick={() => handleCreateTemplateShow()}>New template </h3>
                      </div>
                    </div>

                    <CreateTemplate
                      handleCreateTemplateClose={handleCreateTemplateClose}
                      createTemplateShow={createTemplateShow}
                      signature={signature}
                      loadUserData={loadUserData}
                      templateAction={templateAction}
                      currentTemplate={currentTemplate}
                      exampleData={exampleTemplateData}
                      setCampaignLoading={setCampaignLoading}
                    />
                    <div className='template-list'>
                      <div className='template-table'>
                        <div className='template-headers'>
                          <h3 id='column1'>#</h3>
                          <h3 id='column2'>Name</h3>
                          <h3 id='column3'>Type</h3>
                          <h3 id='column4'>Edit</h3>
                          <h3 id='column5'>View</h3>
                          <h3 id='column6'>Delete</h3>
                        </div>
                        <div className='template-content'>
                          {letterTemplates ?
                            [...letterTemplates]
                              .sort((a, b) => a.template_number - b.template_number)
                              .map((item, index) => (
                                <div key={index} className='template-item'>
                                  <h3 className='template-number' id='column1'>{index + 1}</h3>
                                  <h3 className='template-name' id='column2'>{item.template_name}</h3>
                                  <h3 className='template-type' id='column3'>{item.template_type}</h3>
                                  <div id='column4'>
                                    <h3 className='action' onClick={() => handleEditTemplateShow(item)}>✍🏼</h3>
                                  </div>
                                  <div id='column5'>
                                    <h3 className='action' onClick={() => window.open(item.example_pdf, '_blank')}>👀</h3>
                                  </div>
                                  <div id='column6'>
                                    <h3 className='action' onClick={() => deleteTemplate(item)}>🗑</h3>
                                  </div>
                                </div>
                              ))
                            : ''}
                        </div>

                      </div>
                    </div>

                  </>

                  : letterTab === 'My signatures' && !campaignLoading ?

                    <>
                      <SetSignatures
                        letterTab={letterTab}
                        setLetterTab={setLetterTab}
                        signature={signature}
                        setSignature={setSignature}
                        loadUserData={loadUserData}
                        creditValue={creditValue}
                        editCredts={editCredts}
                        setEditCredits={setEditCredits}
                        availableCredits={availableCredits}
                        initiateCheckoutSession={initiateCheckoutSession}
                        addCreditValue={addCreditValue}
                      />
                    </>
                    : ''
          }
        </div>

      </section>
    </>
  )
}

export default LettersHub