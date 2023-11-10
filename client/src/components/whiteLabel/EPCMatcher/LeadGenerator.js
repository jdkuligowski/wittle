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
// import ReactMapGL, { Marker, Popup, Source, Layer } from 'react-map-gl'
import ReactMapGL from 'react-map-gl'

import mapboxgl from 'mapbox-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'





axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const LeadGenerator = () => {


  // state to enable navigation between pages
  const navigate = useNavigate()

  // set state for errors
  const [errors, setErrors] = useState()

  // set state for user
  const [userData, setUserData] = useState()

  // set state for loading
  const [loading, setLoading] = useState()

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

  const [sessionName, setSessionName] = useState(sessionStorage.getItem('sessionName') || '')

  const [targetPostcode, setTargetPostcode] = useState(['SW8'])
  const [combiniedProperties, setCombinedProperties] = useState()

  const [leadGenSection, setLeadGenSecton] = useState('Home')

  const [noMatches, setNoMatches] = useState([])
  const [singleMatches, setSingleMatches] = useState([])
  const [multipleMatches, setMultipleMatches] = useState([])

  const [channelView, setChannelView] = useState('Lettings')

  const [expand, setExpand] = useState(false)

  const [leadGenDetails, setLeadGenDetails] = useState({
    postcode: '',
    // area: '',
    bathrooms_min: null,
    bathrooms_max: null,
    bedrooms_min: null,
    bedrooms_max: null,
    price_min: null,
    price_max: null,
    channel: '',
  })


  const [selectedRows, setSelectedRows] = useState([])

  // set state for csv data
  const [csvData, setCsvData] = useState()

  // control the states for maps
  const [viewport, setViewport] = useState({
    latitude: 51.515419,
    longitude: -0.141099,
    zoom: 11.5,
  })

  const [drawnPolygons, setDrawnPolygons] = useState([])


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
            setLeadGenSecton('Properties')
            setLeadGenDetails(data.lead_gen_details[0])
            loadCombinedPropertiesFromUser(data)
            console.log('existing dtails ->', data.lead_gen_details[0])
          }

          // set favourites for the fsavd proprties tab
          const filteredFavourites = data.epc_favourites.filter(fav => fav.rightmove_id !== null)
          setSavedProperties(filteredFavourites)

          // set the data to be extracted to csv in the saved properties tab
          const dataCsv = transformCSVData(data.epc_favourites)
          setCsvData(dataCsv)

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
  const addFavourite = async (property) => {
    if (isUserAuth()) {
      console.log(selectedRows)
      try {
        const response = await axios.post('/api/epc_favourite/', selectedRows, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        loadUserData()

        console.log('Response:', response.data)
        // Handle response data as needed
        setSelectedRows([])
      } catch (error) {
        console.error('Error saving favourite:', error)
      }
    } else {
      navigate('/access-denied')
      console.log('logged out')
    }
  }


  // function to delete favourites
  const deleteFavourite = async (property) => {
    if (isUserAuth()) {

      try {
        const { data } = await axios.delete('/api/epc_favourite/', {
          data: {
            postcode: property.postcode,
            address: property.address,
          },
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        if (data.message) {
          setFavouritedProperties(prevState => prevState.filter(fav => fav.postcode !== property.postcode || fav.address !== property.address))
        }
      } catch (error) {
        console.error('Error deleting favourite:', error)
      }
    } else {
      navigate('/access-denied')
      console.log('logged out')
    }
  }


  // select rows that will be added to the favourites then saved to file
  const handleCheckboxChange = (e, item) => {

    const propertyData = {
      ...item.property_data,
      address: item.epc_data_list[0].address,
      // Add any other fields from epc_data_list you need
    }

    if (e.target.checked) {
      setSelectedRows([...selectedRows, propertyData])
    } else {
      setSelectedRows(selectedRows.filter(row => row.id !== propertyData.id))
    }
  }

  // function to populate the csv data that will eb extracted to file
  const transformCSVData = (data) => {
    const filteredData = data.filter(fav => fav.rightmove_id !== null)
    return filteredData.map((item, index) => {
      return {
        item: index + 1,
        url: item.url,
        address: item.address,
        postcode: item.postcode,
        addedOn: item.market_status,
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


  // ? Section 4: Property data loading
  //  Loading latest data from the database based on the postcode areas applied by the user
  const loadCombinedPropertiesFromUser = async (data) => {
    setLoading(true)
    const postcodeValue = data.lead_gen_details[0].postcode
    try {
      const { data } = await axios.get(`/api/epc_properties_rental/combined-epc-results/?postcode=${postcodeValue}`)
      console.log('combined data ->', data)

      // Process and categorize the data
      const noMatchesData = data.filter(item => item.epc_data_list.length === 0)
      const singleMatchesData = data.filter(item => item.epc_data_list.length === 1)
      const multipleMatchesData = data.filter(item => item.epc_data_list.length > 1)

      console.log('sngle matches ->', singleMatchesData)
      console.log('no matches ->', noMatchesData)
      console.log('multiple matches ->', multipleMatchesData)
      // Update states
      setNoMatches(noMatchesData)
      setSingleMatches(singleMatchesData)
      setMultipleMatches(multipleMatchesData)
      setLoading(false)

    } catch (error) {
      console.error('can\'t access combined data ->', error)
    }
  }







  // ? Section 5: Inputting seach criteria
  // post search criteria from the form to the database
  const addSearchCriteria = async () => {
    let response
    if (userData.id) {
      // PUT request for existing details
      response = await axios.put(`/api/lead_gen_details/${userData.id}/`, leadGenDetails, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      setLeadGenSecton('Properties')

    } else {
      // POST request for new details
      response = await axios.post('/api/lead_gen_details/', leadGenDetails, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      setLeadGenSecton('Properties')

    }
    setLoading(true)
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
    window.open(url, '_blank') // This will open the URL in a new tab
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
              {userData && userData.usage_stats[0] &&
                ((userData.usage_stats[0].package === 'Basic' && userData.usage_stats[0].epc_monthly_count < 11) ||
                  (userData.usage_stats[0].package === 'Unlimited') ||
                  (userData.usage_stats[0].package === 'Advanced Pilot' && userData.usage_stats[0].epc_monthly_count < 101)) ?
                <section className='property-finder'>
                  <div className='listing-options'>
                    <div className='listing-buttons'>
                      <h5 className='no-print' onClick={() => setLeadGenSecton('Home')} style={{ borderBottom: leadGenSection === 'Home' ? '3px solid #ED6B86' : 'none', textUnderlineOffset: leadGenSection === 'Home' ? '0.5em' : 'initial', fontWeight: leadGenSection === 'Home' ? '700' : '400' }}>Home</h5>
                      <h5 className='no-print' onClick={() => setLeadGenSecton('Properties')} style={{ borderBottom: leadGenSection === 'Properties' ? '3px solid #ED6B86' : 'none', textUnderlineOffset: leadGenSection === 'Properties' ? '0.5em' : 'initial', fontWeight: leadGenSection === 'Properties' ? '700' : '400' }}>Properties</h5>
                      <h5 className='no-print' onClick={() => setLeadGenSecton('Saved properties')} style={{ borderBottom: leadGenSection === 'Saved properties' ? '3px solid #ED6B86' : 'none', textUnderlineOffset: leadGenSection === 'Saved properties' ? '0.5em' : 'initial', fontWeight: leadGenSection === 'Saved properties' ? '700' : '400' }}>Saved properties</h5>
                      {/* <h5 className='no-print' onClick={() => setLeadGenSecton('AI listing generator')} style={{ borderBottom: leadGenSection === 'AI listing generator' ? '3px solid #ED6B86' : 'none', textUnderlineOffset: leadGenSection === 'AI listing generator' ? '0.5em' : 'initial', fontWeight: leadGenSection === 'AI listing generator' ? '700' : '400' }}>AI listing generator</h5> */}
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
                                <select className='dropdown' value={leadGenDetails.channel || 'Both'} onChange={(e) => setLeadGenDetails(prevData => ({ ...prevData, channel: e.target.value }))}>
                                  <option>Both</option>
                                  <option>Lettings</option>
                                  <option>Sales</option>
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
                                      <select className='dropdown' value={leadGenDetails.bedrooms_min || null} onChange={(e) => setLeadGenDetails(prevData => ({ ...prevData, bedrooms_min: e.target.value }))}>
                                        <option value={0}>No min</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                      </select>
                                      <select className='dropdown' value={leadGenDetails.bedrooms_max || null} onChange={(e) => setLeadGenDetails(prevData => ({ ...prevData, bedrooms_max: e.target.value }))}>
                                        <option>No max</option>
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
                                  <div className='single-title-double'>
                                    <h3>Bathrooms</h3>
                                    <div className='double-dropdowns'>
                                      <select className='dropdown' value={leadGenDetails.bathrooms_min || null} onChange={(e) => setLeadGenDetails(prevData => ({ ...prevData, bathrooms_min: e.target.value }))}>
                                        <option>No min</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                      </select>
                                      <select className='dropdown' value={leadGenDetails.bathrooms_max || null} onChange={(e) => setLeadGenDetails(prevData => ({ ...prevData, bathrooms_max: e.target.value }))}>
                                        <option>No max</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                      </select>
                                    </div>

                                  </div><div className='single-title-double'>
                                    <h3>Price</h3>
                                    <div className='double-dropdowns'>
                                      <select className='dropdown' value={leadGenDetails.price_min || null} onChange={(e) => setLeadGenDetails(prevData => ({ ...prevData, price_min: e.target.value }))}>
                                        <option>No min</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                      </select>
                                      <select className='dropdown' value={leadGenDetails.price_max || null} onChange={(e) => setLeadGenDetails(prevData => ({ ...prevData, price_max: e.target.value }))}>
                                        <option>No max</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                      </select>
                                    </div>

                                  </div>

                                </>
                                : ''}
                            </div>
                            <div className='lead-gen-save'>
                              <button className='save-details' onClick={addSearchCriteria}>Save details</button>
                            </div>
                          </div>
                          {/* <div className="map-section">
                            <ReactMapGL
                              {...viewport}
                              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                              mapStyle="mapbox://styles/jdkuligowskii/clo8fop0l004b01pq000y65pb"
                              onViewportChange={viewport => {
                                setViewport(viewport)
                              }}
                              center={viewport}
                              onMove={evt => setViewport(evt.viewport)}
                              className="profile-map"
                              onLoad={event => initializeDraw(event.target)}

                            >
                            </ReactMapGL>
                          </div> */}
                          {/* <div className="map-section" ref={mapContainerRef}>

                          </div> */}

                        </>
                        :
                        leadGenSection === 'Properties' && !loading ?
                          <>
                            <div className='results-block'>
                              <div className="property-insight-nav">
                                <div className="property-insight-buttons">
                                  <h3 className={`insight-button ${channelView === 'Lettings' ? 'active' : 'inactive'}`} id='left' onClick={() => setChannelView('Lettings')}>Lettings</h3>
                                  <h3 className={`insight-button ${channelView === 'Sales' ? 'active' : 'inactive'}`} id='right' onClick={() => setChannelView('Sales')}>Sales</h3>
                                </div>
                              </div>
                              {channelView === 'Lettings' ?
                                <>
                                  <div className='title-section'>
                                    <h3 className='sub-title'>There are {singleMatches.length} rental properties that match your criteria</h3>

                                    <div className='save-section'>
                                      <div className="print-icon"></div>

                                      <h3 onClick={addFavourite}>Save selection</h3>
                                    </div>
                                  </div>
                                  <div className='results-headers'>
                                    <h5 id='column1' className='column'>#</h5>
                                    <div id='column2' className='column' >
                                      <h5>Address</h5>
                                    </div>
                                    <div id='column3' className='column'>
                                      <h5>Postcode</h5>
                                    </div>
                                    <div id='column4' className='column'>
                                      <h5>Added</h5>
                                    </div>
                                    <div id='column5' className='column'>
                                      <h5>Property type</h5>
                                    </div>
                                    <div id='column6' className='column'>
                                      <h5>Price</h5>
                                    </div>
                                    <div id='column7' className='column'>
                                      <h5>Bedrooms</h5>
                                    </div>
                                    <div id='column8' className='column'>
                                      <h5>Agent</h5>
                                    </div>
                                    <div id='column9' className='column'>
                                      <h5>Select</h5>
                                    </div>
                                  </div>
                                  <hr className='property-divider' />
                                  <div className='results-details'>
                                    {singleMatches ? singleMatches.map((item, index) => {
                                      return (
                                        <>
                                          <div className='results-content'>
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
                                              <h5>{item.property_data.addedOn}</h5>
                                            </div>
                                            <div className='column' id='column5' onClick={() => handleVisitUrl(item.property_data.url)}>
                                              <h5>{item.property_data.propertyType}</h5>
                                            </div>
                                            <div className='column' id='column6' onClick={() => handleVisitUrl(item.property_data.url)}>
                                              <h5>{item.property_data.price}</h5>
                                            </div>
                                            <div className='column' id='column7' onClick={() => handleVisitUrl(item.property_data.url)}>
                                              <h5>{item.property_data.bedrooms}</h5>
                                            </div>
                                            <div className='column' id='column8' onClick={() => handleVisitUrl(item.property_data.url)}>
                                              <h5>{item.property_data.agent}</h5>
                                            </div>
                                            <div className='column' id='column9'>
                                              <input
                                                type="checkbox"
                                                onChange={(e) => handleCheckboxChange(e, item)}
                                              />
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
                            </div>
                          </>
                          : leadGenSection === 'Properties' && loading ?
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
                                          <CSVLink data={csvData} className='export' filename={`Wittle Lead Generator Extract - ${getCurrentDate()}.csv`} style={{ textDecoration: 'none' }}>
                                            <div className='header-cta'>
                                              <div className='copy-button'>
                                                <div className='export-icon'></div>
                                                <h3 style={{ textDecoration: 'none' }}>Export</h3>
                                              </div>
                                            </div>
                                          </CSVLink>
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
                                          <h5>Property type</h5>
                                        </div>
                                        <div id='column6' className='column'>
                                          <h5>Price</h5>
                                        </div>
                                        <div id='column7' className='column'>
                                          <h5>Bedrooms</h5>
                                        </div>
                                        <div id='column8' className='column'>
                                          <h5>Agent</h5>
                                        </div>
                                        <div id='column9' className='column'>
                                          <h5>Channel</h5>
                                        </div>
                                      </div><hr className='property-divider' /><div className='results-details'>
                                        {savedProperties ? savedProperties.map((item, index) => {
                                          return (
                                            <>
                                              <div className='results-content'>
                                                <div className='column' id='column1' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                  <h5>{index + 1}</h5>
                                                </div>
                                                <div className='column' id='column2' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                  <h5>{item.address}</h5>
                                                </div>
                                                <div className='column' id='column3' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                  <h5>{item.postcode}</h5>
                                                </div>
                                                <div className='column' id='column4' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                  <h5>{item.market_status}</h5>
                                                </div>
                                                <div className='column' id='column5' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                  <h5>{item.property_type}</h5>
                                                </div>
                                                <div className='column' id='column6' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                  <h5>{item.price}</h5>
                                                </div>
                                                <div className='column' id='column7' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                  <h5>{item.bedrooms}</h5>
                                                </div>
                                                <div className='column' id='column8' onClick={() => handleVisitUrl(item.property_data.url)}>
                                                  <h5>{item.agent}</h5>
                                                </div>
                                                <div className='column' id='column9' onClick={() => handleVisitUrl(item.property_data.url)}>
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
                                    : <h3 className='sub-title'>You haven&apos;t saved any properties yet! Once you&apos;ve saved some properties, you&apos;ll be able to extract them.</h3>
                                  }
                                </div>


                              </>
                              :
                              ''
                      }
                    </div>
                  </div>


                </section>
                : userData && userData.usage_stats[0].package === 'Basic' && userData.usage_stats[0].epc_monthly_count >= 11 ?
                  <section className='property-finder'>
                    <h1>🙏 Thanks for enjoying Wittle!</h1>
                    <h3 className='limit-reached'>You have reached the free limit of matches for this month, get in touch to unlock another 90 matches.</h3>
                  </section>

                  : userData && userData.usage_stats[0].package === 'Advanced pilot' && userData.usage_stats[0].epc_monthly_count >= 101 ?
                    <section className='property-finder'>
                      <h1>🙏 Thanks for enjoying Wittle!</h1>
                      <h3 className='limit-reached'>You have carried out 100 matches this month, get in touch to discuss increasing your limit.</h3>
                    </section>

                    : ''}

            </>

          </section>
        </section>
      </section>




    </>
  )
}

export default LeadGenerator