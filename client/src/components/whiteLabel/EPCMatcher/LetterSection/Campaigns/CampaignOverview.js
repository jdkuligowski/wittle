
import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getUserToken, isUserAuth, getAccessToken } from '../../../../auth/Auth'
import axios from 'axios'
import Select from 'react-select'
import ReactSwitch from 'react-switch'
import Swal from 'sweetalert2'
import CreateCampaign from '../CreateCampaign'
import BasicTemplate from '../TemplatePDFs.js/BasicTemplate'
import ReactDOMServer from 'react-dom/server'
import Loading from '../../../../helpers/Loading'


const CampaignOverview = ({ letterTab, setLetterTab, letterCampaigns, loadUserData, letterTemplates, letterProperties, signature, editCredts,
  setEditCredits, initiateCheckoutSession, creditValue, addCreditValue, availableCredits }) => {

  // state for the overall campaign screen
  const [campaignScreen, setCampaignScreen] = useState('Overview')

  // state for which campaign is selected
  const [activeCampaign, setActiveCampaign] = useState('')

  // state for which campaign detail tab is selected
  const [campaignDetail, setCampaignDetail] = useState('Leads')

  // managing modal for the building campaign
  const [createCampaignShow, setCreateCampaignShow] = useState(false)

  // state for selecting rows
  const [campaignSelectedRows, setCampaignSelectedRows] = useState([])
  const [campaignSelectAllStatus, setCampaignSelectAllStatus] = useState(false)

  // states for properties in campaign or not
  const [propertiesInCampaign, setPropertiesInCampaign] = useState()
  const [propertiesNotInCampaign, setPropertiesNotInCampaign] = useState()

  // state for storing the campaign analytics
  const [campaignAnalytics, setCampaignAnalytics] = useState()

  // state for the the loading sign when campaign is being launched
  const [campaignLoading, setCampaignLoading] = useState(false)

  // state for determingin the number of columns
  const [maxStep, setMaxStep] = useState(0)

  // states for managing the filterrs
  const [marketStatusFilter, setMarketStatusFilter] = useState('')
  const [sendStatusFilter, setSendStatusFilter] = useState('')
  const [analyticsFilteredProperties, setAnalyticsFilteredProperties] = useState([])

  // functiono to load and reload the filtered data
  useEffect(() => {
    if (campaignAnalytics && letterProperties) {
      // Enhance campaignAnalytics by merging market_status from letterProperties
      let enhancedData = campaignAnalytics.map(campaign => {
        const correspondingProperty = letterProperties.find(prop => prop.rightmove_id === campaign.target_rightmove_id)
        return {
          ...campaign,
          market_status: correspondingProperty ? correspondingProperty.market_status : 'Unknown',
          removed_date: correspondingProperty ? correspondingProperty.week_removed : 'N/a',
        }
      })

      // Filter by market status
      if (marketStatusFilter) {
        enhancedData = enhancedData.filter(item => item.market_status === marketStatusFilter)
      }

      // Filter by send status
      if (sendStatusFilter) {
        enhancedData = enhancedData.filter(item => item.status === sendStatusFilter)
      }

      setAnalyticsFilteredProperties(enhancedData)
    }
  }, [campaignAnalytics, letterProperties, marketStatusFilter, sendStatusFilter])


  // clear filters
  const clearAnalyticsFilters = () => {
    setMarketStatusFilter('')
    setSendStatusFilter('')
  }

  // functiono to split out properties in and out of campaign
  useEffect(() => {
    if (letterProperties && activeCampaign) {
      // Logic to execute when letterProperties updates
      const inCampaign = letterProperties.filter(property => property.letter_campaign === activeCampaign.campaign_name)
      const notInCampaign = letterProperties.filter(property => property.letter_campaign === 'None')
      setPropertiesInCampaign(inCampaign)
      console.log('properties in campaign ->', inCampaign)
      console.log('properties not in campaign ->', notInCampaign)
      setPropertiesNotInCampaign(notInCampaign)
    }
  }, [letterProperties])

  // show campaign modal
  const handleCreateCampaignShow = (e) => {
    setCreateCampaignShow(true)
  }

  // close campaign modal
  const handleCreateCampaignClose = () => {
    setCreateCampaignShow(false)
  }


  // function for going to the specific campaign
  const selectCampaign = (item) => {
    setCampaignScreen('Specific')
    setActiveCampaign(item)
    console.log('selected campaign ->', item)
    const inCampaign = letterProperties.filter(property => property.letter_campaign === item.campaign_name)
    const notInCampaign = letterProperties.filter(property => property.letter_campaign === 'None')
    setPropertiesInCampaign(inCampaign)
    setPropertiesNotInCampaign(notInCampaign)
    console.log('properties in campaign ->', inCampaign)
    console.log('properties not in campaign ->', notInCampaign)
  }


  // delete template
  const deleteCampaign = async (item) => {
    try {
      const response = await axios.delete(`/api/letter_campaigns/delete/${item.id}/`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      loadUserData()
    } catch (error) {
      console.error('Error deleting template:', error)
    }
  }

  // ? Section 1: Select row functionality
  const handleRowSelectionChange = (e, item) => {
    const selectedProperty = { ...item }
    console.log('selected row ->', item)
    if (e.target.checked) {
      setCampaignSelectedRows(prevRows => [...prevRows, selectedProperty])
    } else {
      setCampaignSelectedRows(prevRows => prevRows.filter(row => row.rightmove_id !== selectedProperty.rightmove_id))
    }

    // Check or uncheck the 'Select All' checkbox based on whether all rows are selected
    setCampaignSelectAllStatus(letterProperties.length === campaignSelectedRows.length)
  }

  // function for selecting rows
  const selectAllRows = () => {
    setCampaignSelectedRows(propertiesInCampaign)
    setCampaignSelectAllStatus(true)
  }

  // function for deseleting rows
  const deselectAllRows = () => {
    setCampaignSelectedRows([])
    setCampaignSelectAllStatus(false)
  }

  // function for selecting all rows
  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      selectAllRows() // Function that selects all rows
    } else {
      deselectAllRows() // Function that deselects all rows
    }
  }

  const addPropertiesToCampaign = async (properties, activeCampaign) => {

    const propertyIds = properties.map(property => property.rightmove_id)

    try {
      const response = await axios.put('/api/epc_favourite/add_to_campaign/', {
        property_ids: propertyIds,
        campaign_name: activeCampaign.campaign_name,
      }, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      console.log('Properties added to campaign successfully:', response.data)
      loadUserData()
      setCampaignSelectedRows([])
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
      // Handle success (e.g., showing a success message or updating UI state)
    } catch (error) {
      console.error('Error adding properties to campaign:', error.response.data)
    }
  }



  const removePropertiesFromCampaign = async (properties, activeCampaign) => {
    const propertyIds = properties.map(property => property.rightmove_id)

    if (propertyIds.length === 0) {
      Swal.fire({
        title: '🫡 Wittle alerts',
        text: 'You must select the properties you want to remove from your campaign',
        confirmButtonText: 'Thanks 🤝',
        confirmButtonColor: '#ED6B86',
        backdrop: true,
        background: '#FDF7F0',
        customClass: {
          title: 'popup-swal-title',
          popup: 'popup-swal-body',
          confirmButton: 'popup-swal-confirm',
          cancelButton: 'popup-swal-cancel',
        },
      })
    }

    try {
      const response = await axios.put('/api/epc_favourite/remove_from_campaign/', {
        property_ids: propertyIds,
        campaign_name: activeCampaign,
      }, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      console.log('Properties removed to campaign successfully:', response.data)
      loadUserData()
      setCampaignSelectedRows([])

      Swal.fire({
        title: '😎 action complete',
        text: `${properties.length} properties removed from campaign`,
        confirmButtonText: 'Thanks 🤝',
        confirmButtonColor: '#ED6B86',
        backdrop: true,
        background: '#FDF7F0',
        customClass: {
          title: 'popup-swal-title',
          popup: 'popup-swal-body',
          confirmButton: 'popup-swal-confirm',
          cancelButton: 'popup-swal-cancel',
        },
      })
      // Handle success (e.g., showing a success message or updating UI state)
    } catch (error) {
      console.error('Error removing properties to campaign:', error.response.data)
      // Handle error (e.g., showing an error message)
    }
  }


  // Function to launch campaign with HTML content processing
  const launchCampaign = async (activeCampaign, propertiesInCampaign, letterTemplates, signature) => {
    setCampaignLoading(true)
    // Determine the number of steps/templates required from the campaign_type
    const steps = parseInt(activeCampaign.campaign_type.split(' ')[0])

    const templatesNeeded = []
    for (let i = 1; i <= steps; i++) {
      const templateName = activeCampaign[`template_${i}_name`]
      if (templateName) {
        const template = letterTemplates.find(t => t.template_name === templateName)
        if (template) {
          templatesNeeded.push({ template, step: i }) // Include the step number with the template
        }
      }
    }

    const itemsWithHtmlContent = propertiesInCampaign.flatMap(item => {
      return templatesNeeded.map(({ template, step }) => { // Destructure to get template and step
        const extractedAddress = item.address
        const addressComponents = extractedAddress.split(',').map(component => component.trim())
        const addressFields = addressComponents.slice(0, 4) // Adjust as necessary
        if (item.postcode) {
          addressFields.push(item.postcode) // Include postcode if present
        }

        // Generate HTML content for this item and template
        const htmlContent = ReactDOMServer.renderToStaticMarkup(
          <BasicTemplate
            signature={signature}
            selectedTemplate={template}
            ownerData={item}
            address={addressFields}
          />
        )

        return {
          // campaign: activeCampaign,
          step, // Include the step of the campaign
          template_name: template.template_name,
          htmlContent,
          recipient: item,
        }
      })
    })

    console.log('data for campaign -> ', itemsWithHtmlContent)
    // Post the array of items with HTML content to the backend for processing
    try {
      const response = await axios.post('/api/letter_campaigns/create_campaign/', {
        campaign: activeCampaign,
        sequence_details: itemsWithHtmlContent,
      }, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      console.log('Campaign processing response ->', response.data)
      Swal.fire({
        title: '😎 Action complete',
        text: 'Congrats, you have successfully launched your campaign. Track progress on the analytics tab 📈',
        confirmButtonText: 'Thanks 🤝',
        confirmButtonColor: '#ED6B86',
        backdrop: true,
        background: '#FDF7F0',
        customClass: {
          title: 'popup-swal-title',
          popup: 'popup-swal-body',
          confirmButton: 'popup-swal-confirm',
          cancelButton: 'popup-swal-cancel',
        },
      })
      await loadUserData()
      setCampaignLoading(false)
      // setCampaignScreen('Specific')
      // setCampaignDetail('Analytics')
      // Handle successful response (e.g., show success message or update UI)
    } catch (error) {
      console.error('Error posting campaign data to Django:', error)
      Swal.fire({
        title: '🫡 Wittle alerts',
        text: 'There was an issue launchign your campaign',
        confirmButtonText: 'Thanks 🤝',
        confirmButtonColor: '#ED6B86',
        backdrop: true,
        background: '#FDF7F0',
        customClass: {
          title: 'popup-swal-title',
          popup: 'popup-swal-body',
          confirmButton: 'popup-swal-confirm',
          cancelButton: 'popup-swal-cancel',
        },
      })
      setCampaignLoading(false)
    }
  }


  // get the campaign trakcing analytics
  const getAnalytics = async () => {
    try {
      const campaignName = activeCampaign.campaign_name
      const response = await axios.get('/api/campaign_tracking/', {
        params: { campaign_name: campaignName },
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })

      setCampaignAnalytics(response.data)
    } catch (error) {
      console.error('Error fetching campaign analytics:', error)
    }
  }


  // lloadnig campaign analytics if active campaign is live
  useEffect(() => {
    if (activeCampaign && activeCampaign.campaign_status === 'Live') {
      getAnalytics()
    }
  }, [activeCampaign])



  const duplicateCampaign = async (campaignId) => {
    console.log('campaign for duplication ->', campaignId)
    try {
      const response = await axios.post(`/api/letter_campaigns/duplicate/${campaignId}/`, {}, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,  // Function to get the access token
        },
      })
      loadUserData()
      Swal.fire({
        title: '😎 Action Complete',
        text: 'Campaign duplicated successfully',
        icon: 'success',
        confirmButtonText: 'Thanks 🤝',
        confirmButtonColor: '#ED6B86',
        customClass: {
          title: 'popup-swal-title',
          popup: 'popup-swal-body',
          confirmButton: 'popup-swal-confirm',
        },
      })

      console.log('Duplicate Campaign Response:', response.data)

      // Optionally, refresh list or update state
    } catch (error) {
      console.error('Failed to duplicate the campaign:', error)
      Swal.fire({
        title: '🫡 Wittle alerts',
        text: 'There was an issue duplicating the campaign.',
        icon: 'error',
        confirmButtonText: 'Try Again',
        confirmButtonColor: '#ED6B86',
        customClass: {
          title: 'popup-swal-title',
          popup: 'popup-swal-body',
          confirmButton: 'popup-swal-confirm',
        },
      })
    }
  }

  function formatDate(dateStr) {
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



  const cancelCampaign = async (trackerId) => {
    try {
      const response = await axios.post(`/api/letter_campaigns/cancel_scheduled_letter/${trackerId}/`, {}, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      Swal.fire({
        title: 'Cancelled!',
        text: response.data.message,
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      })
    } catch (error) {
      console.error('Cancellation failed: ', error.response || error)
      Swal.fire({
        title: 'Error!',
        text: 'Failed to cancel the scheduled task.',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      })
    }
  }



  return (

    <>
      {campaignScreen && campaignScreen === 'Overview' && !campaignLoading ?
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
                <input type='number' className='credit-input' value={creditValue} onChange={addCreditValue}></input>
                <button className='add-credts' onClick={() => initiateCheckoutSession(creditValue)}>Add</button>
                <h3 className='close-credits' onClick={() => setEditCredits(false)}>❌</h3>
              </div>
              : <div className='credits-section'>
                <h3 className='credit-balance'>{availableCredits ? `Current balance £${availableCredits}` : ''}</h3>
                <button className='add-credts' onClick={() => setEditCredits(true)}>Top up</button>
              </div>}
          </div>
          <div className='action-section letter'>
            {letterCampaigns ? <h3 className='template-total'>You have {letterCampaigns.length} saved campaigns</h3> : ''}
            <div className='save-section'>
              <div className="print-icon"></div>
              <h3 onClick={() => handleCreateCampaignShow()}>New campaign </h3>
            </div>

          </div>
          <CreateCampaign
            createCampaignShow={createCampaignShow}
            handleCreateCampaignClose={handleCreateCampaignClose}
            letterTemplates={letterTemplates}
            loadUserData={loadUserData}
            editData={'None'}
          />
          <div className='template-list'>
            <div className='template-table'>
              <div className='template-headers'>
                <h3 id='column1'>#</h3>
                <h3 id='column2'>Name</h3>
                <h3 id='column3'>Type</h3>
                <h3 id='column4-campaign'>Status</h3>
                <h3 id='column5-campaign'>Launch date</h3>
                <h3 id='column6-campaign'>Duplicate</h3>
              </div>
              <div className='template-content'>
                {letterCampaigns ?
                  [...letterCampaigns]
                    .sort((a, b) => a.id - b.id)
                    .map((item, index) => (
                      <div key={index} className='template-item' >
                        <h3 className='template-number' id='column1' onClick={() => selectCampaign(item)}>{index + 1}</h3>
                        <h3 className='template-name' id='column2' onClick={() => selectCampaign(item)}>{item.campaign_name}</h3>
                        <h3 className='template-type' id='column3' onClick={() => selectCampaign(item)}>{item.campaign_type}</h3>
                        <h3 className='template-status' id='column4-campaign' onClick={() => selectCampaign(item)}>{item.campaign_status}</h3>
                        <h3 className='launch-date' id='column5-campaign'>{item.campaign_start_date ? formatDate(item.campaign_start_date) : 'N/a'}</h3>
                        <h3 className='duplicate' id='column6-campaign' onClick={() => duplicateCampaign(item.id)}>📑</h3>

                        {/* <div id='column5'>
                          <button className='delete' onClick={() => deleteCampaign(item)}>Delete</button>
                        </div> */}
                      </div>
                    ))
                  : ''}
              </div>

            </div>
          </div>
        </>
        : campaignScreen === 'Specific' && !campaignLoading ?

          <>
            <div className='single-campaign-wrapper'>
              <div className='campaign-detail-header'>
                <div className='go-back-box' onClick={() => setCampaignScreen('Overview')}>
                  <div className='go-back-sign'>&lt;</div>
                  <h3>{activeCampaign ? activeCampaign.campaign_name : ''}</h3>
                </div>
                <div className='actions'>
                  {activeCampaign && activeCampaign.campaign_status === 'Live' ? '' :
                    <>
                      <div className='save-section'>
                        <div className="print-icon">
                        </div>
                        <h3 onClick={() => handleCreateCampaignShow()}>Edit campaign</h3>
                        <CreateCampaign
                          createCampaignShow={createCampaignShow}
                          handleCreateCampaignClose={handleCreateCampaignClose}
                          letterTemplates={letterTemplates}
                          loadUserData={loadUserData}
                          editData={activeCampaign}
                        />
                      </div>
                      <div className='save-section'>
                        <div className="print-icon">
                        </div>
                        <h3 onClick={() => launchCampaign(activeCampaign, propertiesInCampaign, letterTemplates, signature)}>Launch campaign</h3>
                      </div>
                    </>
                  }
                </div>
              </div>
            </div>
            <div className='matching-status'>
              <h3 className='matching-pill' onClick={() => setCampaignDetail('Leads')} style={{ color: campaignDetail === 'Leads' ? 'white' : '#1A276C', backgroundColor: campaignDetail === 'Leads' ? '#ED6B86' : 'rgba(26, 39, 108, 0.15)' }}>Leads</h3>
              <h3 className='matching-pill' onClick={() => setCampaignDetail('Analytics')} style={{ color: campaignDetail === 'Analytics' ? 'white' : '#1A276C', backgroundColor: campaignDetail === 'Analytics' ? '#ED6B86' : 'rgba(26, 39, 108, 0.15)' }}>Analytics</h3>
              {/* <h3 className='matching-pill' onClick={() => setCampaignDetail('Sequences')} style={{ color: campaignDetail === 'Sequences' ? 'white' : '#1A276C', backgroundColor: campaignDetail === 'Sequences' ? '#ED6B86' : 'rgba(26, 39, 108, 0.15)' }}>Sequences</h3> */}
            </div>
            {campaignDetail === 'Leads' ?
              <>
                <div className='campaign-lead-section'>

                  <div className='action-section letter' style={{ marginTop: '1%', marginRight: '3%' }}>
                    {propertiesInCampaign && activeCampaign && activeCampaign.campaign_status === 'Live' ? <h3 className='lead-message' style={{ fontSize: '0.8rem' }}>You have {propertiesInCampaign.length} properties in your campaign</h3> : <h3 className='lead-message' style={{ fontSize: '0.8rem' }}>You have {propertiesInCampaign.length} properties in your unlaunched campaign</h3>}
                    {activeCampaign && activeCampaign.campaign_status === 'Live' ? '' :
                      <div className='save-section'>
                        <div className="print-icon"></div>
                        <h3 onClick={() => removePropertiesFromCampaign(campaignSelectedRows, activeCampaign)}>Remove leads </h3>
                      </div>
                    }
                  </div>
                  <div className='results-table' style={{ marginTop: '1%' }}>
                    <div className='results-headers letter'>
                      {activeCampaign && activeCampaign.campaign_status === 'Live' ? '' :
                        <div id='column11' className='column'>
                          <div className='custom-checkbox'>
                            <input
                              className='checkbox'
                              type="checkbox"
                              checked={campaignSelectedRows && propertiesInCampaign ? campaignSelectedRows.length === propertiesInCampaign.length && propertiesInCampaign.length > 0 : ''}
                              onChange={handleSelectAllChange}
                            />
                            <label className='label'></label>
                          </div>
                        </div>
                      }
                      <h5 id='column1' className='column'>#</h5>
                      <div id='column2' className='column'>
                        <h5>Address</h5>
                      </div>
                      <div id='column3' className='column'>
                        <h5>Postcode</h5>
                      </div>
                      <div id='column4' className='column'>
                        <h5>Agent</h5>
                      </div>
                      <div id='column5' className='column'>
                        <h5>Owner</h5>
                      </div>
                      {/* <div id='column5' className='column'>
                      <h5>Selection</h5>
                    </div> */}

                    </div>
                    <hr className='property-divider' />
                    <div className='results-details letter'>
                      {propertiesInCampaign ? propertiesInCampaign.map((item, index) => {
                        const isRowSelected = campaignSelectedRows.some(selectedRow => selectedRow.rightmove_id === item.rightmove_id)
                        return (
                          <>
                            <div className={`results-content ${isRowSelected ? 'highlighted-row' : ''}`}>
                              {activeCampaign && activeCampaign.campaign_status === 'Live' ? '' :
                                <div className='column' id='column11'>
                                  <div className='custom-checkbox'>
                                    <input
                                      className='checkbox'
                                      type='checkbox'
                                      checked={campaignSelectedRows.some(row => row.rightmove_id === item.rightmove_id)}
                                      onChange={(e) => handleRowSelectionChange(e, item)}
                                    />
                                    <label className='label'>
                                    </label>
                                  </div>
                                </div>
                              }
                              <div className='column' id='column1'>
                                <h5>{index + 1}</h5>
                              </div>
                              <div className='column' id='column2'>
                                <h5>{item.address}</h5>
                              </div>
                              <div className='column' id='column3'>
                                <h5>{item.postcode}</h5>
                              </div>
                              <div className='column' id='column4'>
                                <h5>{item.agent}</h5>
                              </div>
                              <div className='column' id='column5'>
                                <h5>{item.owner_name ? item.owner_name : 'N/a'}</h5>
                              </div>


                            </div>
                            <hr className='property-divider' />

                          </>
                        )
                      })
                        : ' '}
                    </div>
                  </div>

                </div>
              </>

              : campaignDetail === 'Analytics' ?

                <>
                  <div className='campaign-analytics'>
                    <div className='action-section letter' style={{ marginTop: '1%', marginRight: '3%' }}>
                      {activeCampaign && activeCampaign.campaign_status === 'Live' ? <h3 className='status-title'>Status: <span className='status-detail'>Live</span></h3> : activeCampaign.campaign_status === 'Not launched' ? <h3 className='status-title'>Status: <span className='status-detail'>Not launched</span></h3> : ''}
                    </div>
                    {activeCampaign && activeCampaign.campaign_status === 'Live' ?
                      <>
                        <div className='analytics-overview'>
                          <div className='analytics-box'>
                            <h2 className='box-title'>{campaignAnalytics ? campaignAnalytics.length : ''}</h2>
                            <h3 className='box-sub-title'>In campaign</h3>
                          </div>
                          <div className='analytics-box'>
                            <h2 className='box-title'>
                              {campaignAnalytics ? campaignAnalytics.filter(item => item.status === 'Sent').length : 0}
                            </h2>
                            <h3 className='box-sub-title'>Sent letters</h3>
                          </div>
                          <div className='analytics-box'>
                            <h2 className='box-title'>
                              {campaignAnalytics ? campaignAnalytics.filter(item => item.status === 'Scheduled').length : 0}
                            </h2>
                            <h3 className='box-sub-title'>Scheduled letters</h3>
                          </div>
                          <div className='analytics-box'>
                            <h2 className='box-title'>{activeCampaign ? formatDate(activeCampaign.campaign_start_date) : ''}</h2>
                            <h3 className='box-sub-title'>Start date</h3>
                          </div>
                        </div>
                        <div className='filter-row-section active'>
                          <div className='analytics-filter-wrap'>
                            <div className='filter-block'>
                              <h3 className='filter-title'>Market status</h3>
                              <select onChange={(e) => setMarketStatusFilter(e.target.value)}>
                                <option value={''}>Select...</option>
                                <option value={'Live'}>Live</option>
                                <option value={'Off market'}>Off market</option>
                              </select>
                            </div>
                            <div className='filter-block'>
                              <h3 className='filter-title'>Send status</h3>
                              <select onChange={(e) => setSendStatusFilter(e.target.value)}>
                                <option value={''}>Select...</option>
                                <option value={'Sent'}>Sent</option>
                                <option value={'Scheduled'}>Scheduled</option>
                              </select>
                            </div>
                          </div>
                          <button className='clear-filters' onClick={clearAnalyticsFilters}>Clear</button>
                        </div>
                      </>
                      : ''}

                    {activeCampaign && activeCampaign.campaign_status === 'Live' ?
                      <div className='results-table analytics'>
                        <div className='results-headers analytics'>
                          <div id='column1' className='column'><h5>#</h5></div>
                          <div id='column2' className='column'><h5>Address</h5></div>
                          <div id='column3' className='column'><h5>Market status</h5></div>
                          <div id='column4' className='column'><h5>Removed date</h5></div>
                          <div id='column5' className='column'><h5>Send status</h5></div>
                          <div id='column6' className='column'><h5>Pdf</h5></div>
                          <div id='column7' className='column'><h5>Action</h5></div>
                        </div>
                        {/* <hr className='property-divider' /> */}
                        <div className='results-details analytics'>
                          {analyticsFilteredProperties ? analyticsFilteredProperties.map((item, index) => (
                            <>
                              <div key={index} className='results-content analytics'>
                                <div className='column' id='column1'><h5>{index + 1}</h5></div>
                                <div className='column' id='column2'><h5>{item.target_address}</h5></div>
                                <div className='column' id='column3'><h5>{item.market_status ? item.market_status : 'N/a'}</h5></div>
                                <div className='column' id='column4'><h5>{item.removed_date}</h5></div>
                                <div className='column' id='column5'><h5>{item.status}</h5></div>
                                <div className='column' id='column6'>{item.status === 'Sent' ? <h5 onClick={() => window.open(item.pdf, '_blank')} className="open-pdf-button">📑</h5> : ''}</div>
                                <div className='column' id='column7'><h5 onClick={() => cancelCampaign(item.id)}>{item.status === 'Sent' ? '' : '❌'}</h5></div>
                              </div>
                            </>
                          )) : ''}
                        </div>
                      </div>
                      : ''}
                  </div>


                </>

                : campaignDetail === 'Sequences' ?
                  <>

                  </>

                  : ''
            }
          </>

          : campaignScreen === 'Specific' && campaignLoading ?

            <div className='property-table-loading campaign'>
              <Loading />
              <h3>Hold tight, your campaign is being launched. This may take a few minutes 🚀</h3>
            </div>

            : ''}

    </>
  )
}
export default CampaignOverview