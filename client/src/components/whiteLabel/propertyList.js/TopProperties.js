import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { isUserAuth, getUserToken, getAccessToken } from '../../auth/Auth'
import { NumericFormat } from 'react-number-format'
import Loading from '../../helpers/Loading'
import KYCInput from '../b2bModals/KYCInput'
import ReactPaginate from 'react-paginate'
import ReactMapGL, { Marker, Popup, Source, Layer } from 'react-map-gl'
import { set } from 'react-ga'

const TopProperties = ({ setListingSelection, fetchData }) => {

  // state to enable navigation between pages
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [properties, setProperties] = useState()

  // managing modal for properties to be removed from list
  const [propertyInputShow, setPropertyInputShow] = useState(false)

  // set view for the table
  const [propertyViewFormat, setPropertyViewFormat] = useState('Table')

  const [selectedProperties, setSelectedProperties] = useState(null)

  // states for handling the popups on the map
  const [showPopup, setShowPopup] = useState(true)
  const [iconId, setIconId] = useState()

  // state for detail view on property
  const [propertyDetails, setPropertyDetails] = useState('Details')

  // filter array for proeprties to search
  const [propertyFilters, setPropertyFilters] = useState({
    channel: 'Sales',
    area: '',
    persona: 'Young families',
    propertyType: '',
    garden: false,
    size: '',
    bedrooms_min: '',
    bedrooms_max: '',
    rental_price_min: '',
    rental_price_max: '',
    primaries: false,
    primaries_score: null,
    secondaries: false,
    secondaries_score: null,
    parks: false,
    parks_score: null,
    playgrounds: false,
    playgrounds_score: null,
    gyms: false,
    gyms_score: null,
    restaurants: false,
    restaurants_score: null,
    pubs: false,
    pubs_score: null,
    tubes: false,
    tubes_score: null,
    supermarkets: false,
    supermarkets_score: null,
    ev: false,
    ev_score: null,
    crime: false,
    crime_score: null,
  })


  // create 
  useEffect(() => {
    const filters = JSON.parse(localStorage.getItem('top-property-filters'))
    const propertyData = JSON.parse(localStorage.getItem('top-properties'))
    if (filters) {
      setPropertyFilters(filters)
      setProperties(propertyData)
    }
  }, [])


  const loadProperties = async () => {
    setLoading(true)
    handlePropertyInputClose()

    // Create the query string from propertyFilters state
    const queryParams = new URLSearchParams()
    Object.entries(propertyFilters).forEach(([key, value]) => {
      // Exclude null or undefined values and the 'channel' key
      if (value !== null && value !== undefined && key !== 'channel') {
        queryParams.append(key, value)
      }
    })

    try {
      let url = ''
      if (propertyFilters.channel === 'Rental') {
        url = `/api/personas/rental/?${queryParams.toString()}`
      } else if (propertyFilters.channel === 'Sales') {
        url = `/api/personas/sales/?${queryParams.toString()}`
      }

      // Extract data based on url
      const { data } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })

      data.sort((a, b) => b.overall_lifestyle_score - a.overall_lifestyle_score)


      console.log('combined data ->', data)
      setProperties(data)
      window.localStorage.setItem('top-properties', JSON.stringify(data))

      window.localStorage.setItem('top-property-filters', JSON.stringify(propertyFilters))
      setLoading(false)
    } catch (error) {
      console.error('can\'t access combined data ->', error)
    }
  }




  const handleVisitUrl = (url) => {
    // Create a new anchor element
    const link = document.createElement('a')

    // Set the URL
    link.href = url

    // Set the target
    link.target = '_blank'

    // Set rel to noreferrer to prevent sending the referrer
    link.rel = 'noreferrer'

    // Set window features
    link.windowFeatures = 'width=1200,height=800,resizable=yes,scrollbars=yes,status=yes'

    // Append the link to the body
    document.body.appendChild(link)

    // Simulate a click on the link
    link.click()

    // Remove the link from the body
    document.body.removeChild(link)
  }

  // function to move to the listings
  const goToListing = (item) => {
    console.log('postcode ->', item.property_data.postcode)
    window.localStorage.setItem('listing-postcode', JSON.stringify(item.property_data.postcode))
    window.localStorage.setItem('listing-route', JSON.stringify('On'))
    fetchData()
    setListingSelection('Property insights')
    navigate('/agents/listing-generator')
  }

  // close modal
  const handlePropertyInputShow = () => {
    setPropertyInputShow(true)
  }

  // show the modal
  const handlePropertyInputClose = (e) => {
    setPropertyInputShow(false)
  }


  // pagination on map
  const ITEMS_PER_PAGE = 50
  const [currentPage, setCurrentPage] = useState(0)
  const startIndex = currentPage * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE


  // control the states for maps
  const [viewport, setViewport] = useState({
    latitude: 51.515419,
    longitude: -0.141099,
    zoom: 10.5,
  })


  // set current page when you click icon
  const handlePropertyClick = (property) => {
    console.log('selectd property ->', property)
    setSelectedProperties(property)
  }

  // set pop up icon
  const iconSetting = (e) => {
    setShowPopup(true)
    console.log(showPopup)
    setIconId(parseInt(e.target.id))
    console.log(parseInt(e.target.id))
  }

  // set current page when you clicjk button for pagination
  const handlePageClick = (data) => {
    const { selected } = data
    setCurrentPage(selected)
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

  // borough list
  const boroughs = ['Barking and Dagenham', 'Barnet', 'Bexley', 'Brent', 'Camden', 'Croydon', 'Ealing', 'Enfield', 'Greenwich', 'Havering', 'Kensington and Chelsea',
    'Hertfordshire', 'Hillingdon', 'Hounslow', 'Islington', 'Lambeth', 'Lewisham', 'Merton', 'Southwark', 'Sutton', 'Waltham Forest', 'Westminster',
    'Hackney', 'City of London', 'Hammersmith and Fulham', 'Wandsworth', 'Tower Hamlets', 'Bromley', 'Haringey', 'Kingston upon Thames', 'Newham', 'Redbridge', 'Richmond upon Thames']

  // property type list
  const propertyTypeList = ['Flat', 'Apartment', 'Terraced', 'Semi-Detached', 'Detached', 'House', 'End of Terrace', 'Maisonette', 'Studio', 'Retirement Property', 'Ground Flat',
    'Penthouse', 'Bungalow', 'Town House', 'Detached Bungalow', 'Duplex']


  // calculation to determine the inputs on the form and the toggle
  const toggleStatus = (key) => {
    setPropertyFilters(prevData => ({
      ...prevData,
      [key]: prevData[key] === true ? false : true,
    }))
  }

  const mapNumberToWord = (number) => {
    // const value = number * 10s
    if (number > 0.9) return 'Outstanding'
    if (number > 0.8) return 'Excellent'
    if (number > 0.7) return 'Very good'
    if (number > 0.6) return 'Good'
    if (number > 0.5) return 'Quite good'
    if (number > 0.4) return 'Average'
    if (number > 0.3) return 'Below average'
    if (number > 0.2) return 'Bad'
    if (number > 0.1) return 'Poor'
    return 'Terrible'
  }


  return (

    <>
      <section className='top-properties'>

        <section className='top-properties-filters'>
          <div className='filter-block mobile'>
            <button onClick={handlePropertyInputShow}>Edit search</button>
          </div>

        </section>

        {!loading ?
          <section className='top-property-results'>
            <div className='top-property-title'>
              <h3>{properties ? `${properties.length} matching properties` : ''}</h3>
              <div className='view-selectors'>
                <button className='edit-search' onClick={handlePropertyInputShow}>Edit search</button>
                <div className={`icon-box ${propertyViewFormat === 'Table' ? 'active' : 'inactive'}`} onClick={() => setPropertyViewFormat('Table')}>
                  <div className='icon' id='table'></div>
                </div>
                <div className={`icon-box ${propertyViewFormat === 'Map' ? 'active' : 'inactive'}`} onClick={() => setPropertyViewFormat('Map')}>
                  <div className='icon' id='map'></div>
                </div>
                <div className={`icon-box ${propertyViewFormat === 'Grid' ? 'active' : 'inactive'}`} onClick={() => setPropertyViewFormat('Grid')}>
                  <div className='icon' id='grid'></div>
                </div>
              </div>
            </div>


            {propertyViewFormat === 'Table' && properties ?
              <div className='property-table-view'>
                <div className='top-property-table'>
                  <div className='table-headers'>
                    <div id='column1' className='column'>
                      <h5>#</h5>
                    </div>
                    <div id='column2' className='column' >
                      <h5>Address</h5>
                    </div>
                    <div id='column3' className='column'>
                      <h5>Postcode</h5>
                      {/* <h5>⬇️</h5> */}
                    </div>
                    <div id='column4' className='column'>
                      <h5>Area</h5>
                    </div>
                    <div id='column5' className='column'>
                      <h5>Added</h5>
                    </div>
                    <div id='column6' className='column'>
                      <h5>Price</h5>
                      {/* <h5>⬇️</h5> */}
                    </div>
                    <div id='column7' className='column'>
                      <h5>Bedrooms</h5>
                    </div>
                    <div id='column8' className='column'>
                      <h5>Agent</h5>
                    </div>
                    <div id='column9' className='column'>
                      <h5>Score</h5>
                    </div>
                  </div>
                  <hr className='property-divider' />
                  <div className='table-detail'>
                    {properties ? properties.map((item, index) => {
                      return (
                        <>
                          <div className='table-content'>
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
                              <h5>{item.persona_data_list[0].district}</h5>
                            </div>
                            <div className='column' id='column5' onClick={() => handleVisitUrl(item.property_data.url)}>
                              <h5>{item.property_data.added_revised === null ? `Reduced ${item.property_data.reduced_revised}` : item.property_data.added_revised}</h5>
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
                            <div className='column' id='column9' onClick={() => handleVisitUrl(item.property_data.url)}>
                              <h5>{(item.overall_lifestyle_score / 10).toFixed(2)}</h5>
                            </div>
                            <div id='column10' className='column'>
                              <button onClick={() => goToListing(item)}>Go</button>
                            </div>
                          </div>
                          <hr className='property-divider' />

                        </>
                      )
                    }).slice(startIndex, endIndex) : ''}
                  </div>

                </div>
                {properties ?
                  <ReactPaginate
                    pageCount={Math.ceil(properties.length / 50)}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                    previousLabel={'<'}
                    nextLabel={'>'}
                    pageRangeDisplayed={0}
                    breakLabel={'...'}
                  />
                  : ''}

              </div>
              : propertyViewFormat === 'Map' && properties ?
                <div className='property-map-view'>
                  <div className='map-block'>

                    <div className='grid-list'>
                      {properties ? properties.map((item, index) => {
                        return (
                          <>
                            <div className='property-content'>
                              <div className='grid-left'>
                                <div className='property-image' onClick={() => handleVisitUrl(item.property_data.url)} style={{ backgroundImage: `url(${item.property_data.images})` }}></div>
                              </div>
                              <div className='grid-right' id={item.id} onMouseEnter={iconSetting} >
                                <h5 className='title' onClick={() => handleVisitUrl(item.property_data.url)}>{index + 1}. {item.property_data.displayAddress}</h5>
                                <h5 className='sub-title'>Bedrooms: {item.property_data.bedrooms}</h5>
                                <h5 className='sub-title'>Price: {item.property_data.price}</h5>
                                <h5 className='sub-title'>Score: {(item.overall_lifestyle_score / 10).toFixed(2)}</h5>
                              </div>
                            </div>
                            <hr className="dividing-line" />
                          </>
                        )
                      }).slice(startIndex, endIndex) : ''}
                    </div>

                    <div className="map-section">
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
                      >
                        {properties &&
                          properties.map((item, index) => (
                            <Marker
                              key={index}
                              id={item.id}
                              longitude={item.property_data.longitude}
                              latitude={item.property_data.latitude}
                              onClick={() => handlePropertyClick(item)}
                            >
                              <div className="poi-background">{index + 1}</div>
                            </Marker>
                          )).slice(startIndex, endIndex)}

                        {selectedProperties ?
                          <Popup
                            longitude={selectedProperties.property_data.longitude}
                            latitude={selectedProperties.property_data.latitude}
                            closeOnClick={false}
                            className="item-popup"
                            onClose={() => setSelectedProperties(null)}

                          >
                            <div className="popup-content">

                              <div className='popup-border'>
                                <h5 className='title'>{selectedProperties.property_data.displayAddress}</h5>
                                {/* <p>{selectedProperties.master_cuisine}</p> */}
                                {/* <p>{selectedProperties.rating} /5</p> */}
                              </div>
                            </div>
                          </Popup>
                          : ''
                        }
                      </ReactMapGL>
                    </div>
                  </div>
                  {properties ?
                    <ReactPaginate
                      pageCount={Math.ceil(properties.length / 50)}
                      onPageChange={handlePageClick}
                      containerClassName={'pagination'}
                      activeClassName={'active'}
                      previousLabel={'<'}
                      nextLabel={'>'}
                      pageRangeDisplayed={0}
                      breakLabel={'...'}
                    />
                    : ''}
                </div>

                : propertyViewFormat === 'Grid' && properties ?
                  <div className='property-grid-view'>
                    <div className='property-grid-items'>
                      {properties ? properties.map((item, index) => {
                        return (
                          <>
                            <div className='property-item'>
                              <div className='property-item-left'>
                                <div className='property-item-image' onClick={() => handleVisitUrl(item.property_data.url)} style={{ backgroundImage: `url(${item.property_data.images})` }}></div>
                                <div className='property-core-info'>
                                  {propertyFilters.channel === 'Sales' ?
                                    <h3><NumericFormat value={item.property_data.price} displayType={'text'} thousandSeparator={true} prefix={'£'} /> </h3> :
                                    <h3><NumericFormat value={item.property_data.price} displayType={'text'} thousandSeparator={true} prefix={'£'} /> pcm</h3>
                                  }
                                  {item.overall_lifestyle_score ? <h3 className='match-score'>🔥 {(item.overall_lifestyle_score * 10).toFixed(0)}% match</h3> : ''}
                                </div>
                              </div>
                              <div className='property-item-right'>
                                <div className='detail-selections'>
                                  <div className='key-selectors'>
                                    <h3 className='detail-selector' style={{ fontWeight: propertyDetails === 'Details' ? '700' : '500' }} onClick={() => setPropertyDetails('Details')}>Details</h3>
                                    <h3 className='detail-selector' style={{ fontWeight: propertyDetails === 'Insights' ? '700' : '500' }} onClick={() => setPropertyDetails('Insights')}>Insights</h3>
                                    <h3 className='detail-selector' style={{ fontWeight: propertyDetails === 'Floorplan' ? '700' : '500' }} onClick={() => setPropertyDetails('Floorplan')}>Floorplan</h3>
                                    <button onClick={() => goToListing(item)}>Explore</button>


                                  </div>
                                  <div className='action'>
                                  </div>
                                </div>
                                {propertyDetails === 'Details' ?

                                  <div className='property-body'>
                                    <h2 className='property-title'>{item.property_data.displayAddress}, {item.persona_data_list[0].district}</h2>
                                    <h3 className='added-details'>{item.property_data.added_revised ? `Added on ${item.property_data.added_revised}` : `Reduced on ${item.property_data.reduced_revised}`}</h3>
                                    <div className='key-elements'>
                                      <div className='property-element-item'>
                                        <div className='element-icon' id='bed'></div>
                                        <h3>{item.property_data.bedrooms} bedrooms</h3>
                                      </div>
                                      <div className='property-element-item'>
                                        <div className='element-icon' id='bath'></div>
                                        <h3>{item.property_data.bathrooms} bathrooms</h3>
                                      </div>
                                      <div className='property-element-item'>
                                        <div className='element-icon' id='size'></div>
                                        <h3>{item.property_data.size} sq. ft</h3>
                                      </div>
                                      <div className='property-element-item'>
                                        <div className='element-icon' id='type'></div>
                                        <h3>{item.property_data.propertyType}</h3>
                                      </div>
                                    </div>
                                    <div className='property-features'>
                                      <h3 className='features-title'>Features</h3>
                                      <div className='feature-list'>
                                        {item.property_data.features.split(', ').map((feature, index) => (
                                          <li key={index} className='feature-item'>{feature}</li>
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                  : propertyDetails === 'Insights' ?
                                    <div className='property-body'>
                                      <div className='insights-body'>
                                        <div className='insight-row'>
                                          <div className='insight-icon' id='primaries'></div>
                                          <h3 className='insight'>{mapNumberToWord(item.persona_data_list[0].primary_percentile)} for primary schools</h3>
                                        </div>
                                        <div className='insight-row'>
                                          <div className='insight-icon' id='secondaries'></div>
                                          <h3 className='insight'>{mapNumberToWord(item.persona_data_list[0].secondary_percentile)} for secondary schools</h3>
                                        </div>
                                        <div className='insight-row'>
                                          <div className='insight-icon' id='parks'></div>
                                          <h3 className='insight'>{mapNumberToWord(item.persona_data_list[0].park_area_percentile)} for access to parks</h3>
                                        </div>
                                        <div className='insight-row'>
                                          <div className='insight-icon' id='gyms'></div>
                                          <h3 className='insight'>{mapNumberToWord(item.persona_data_list[0].gym_percentile)} for access to gyms</h3>
                                        </div>
                                        <div className='insight-row'>
                                          <div className='insight-icon' id='pubs'></div>
                                          <h3 className='insight'>{mapNumberToWord(item.persona_data_list[0].pub_percentile)} for access to pubs</h3>
                                        </div>
                                        <div className='insight-row'>
                                          <div className='insight-icon' id='restaurants'></div>
                                          <h3 className='insight'>{mapNumberToWord(item.persona_data_list[0].restaurant_percentile)} for restaurants</h3>
                                        </div>
                                        <div className='insight-row'>
                                          <div className='insight-icon' id='crime'></div>
                                          <h3 className='insight'>{mapNumberToWord(item.persona_data_list[0].crime_percentile)} for crime rates</h3>
                                        </div>
                                        <div className='insight-row'>
                                          <div className='insight-icon' id='tubes'></div>
                                          <h3 className='insight'>{mapNumberToWord(item.persona_data_list[0].tube_percentile)} for tube access</h3>
                                        </div>
                                        <div className='insight-row'>
                                          <div className='insight-icon' id='evs'></div>
                                          <h3 className='insight'>{mapNumberToWord(item.persona_data_list[0].ev_percentile)} for EV access</h3>
                                        </div>
                                      </div>
                                    </div>
                                    : propertyDetails === 'Floorplan' ?
                                      <div className='property-body'>
                                        <div className='floorplan-body' onClick={() => handleVisitUrl(item.property_data.floorplan_url)} style={{ backgroundImage: `url(${item.property_data.floorplan_url})` }}></div>
                                      </div>
                                      : ''}



                              </div>
                            </div>
                          </>
                        )
                      }).slice(startIndex, endIndex)

                        : ''}

                    </div>
                    {properties ?
                      <ReactPaginate
                        pageCount={Math.ceil(properties.length / 50)}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                        previousLabel={'<'}
                        nextLabel={'>'}
                        pageRangeDisplayed={0}
                        breakLabel={'...'}
                      />
                      : ''}
                  </div>

                  : !properties ?
                    <div className='no-properties'>
                      <h1>🔎 Start a search to see some properties</h1>
                      <button className='edit-search' onClick={handlePropertyInputShow}>Start search</button>
                    </div>

                    : ''}


          </section>
          : loading ?
            <div className='property-table-loading'>
              <Loading />
            </div>
            : ''}
      </section>
      <KYCInput
        propertyInputShow={propertyInputShow}
        handlePropertyInputClose={handlePropertyInputClose}
        propertyFilters={propertyFilters}
        setPropertyFilters={setPropertyFilters}
        boroughs={boroughs}
        salesPrices={salesPrices}
        rentalPrices={rentalPrices}
        propertyTypeList={propertyTypeList}
        loadProperties={loadProperties}
        toggleStatus={toggleStatus}
      />


    </>

  )
}

export default TopProperties