import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { isUserAuth, getUserToken, getAccessToken } from '../../auth/Auth'
import { NumericFormat } from 'react-number-format'
import Loading from '../../helpers/Loading'
import KYCInput from '../b2bModals/KYCInput'
import ReactPaginate from 'react-paginate'
import ReactMapGL, { Marker, Popup, Source, Layer } from 'react-map-gl'

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

  //  Loading latest data from the database based on the postcode areas applied by the user
  const loadProperties = async () => {
    setLoading(true)
    handlePropertyInputClose()
    const channelValue = propertyFilters.channel
    const areaValue = propertyFilters.area
    const personaValue = propertyFilters.persona
    const propertyTypeValue = propertyFilters.propertyType
    const gardenValue = propertyFilters.garden
    const sizeValue = propertyFilters.size
    const bedroomsMin = propertyFilters.bedrooms_min
    const bedroomsMax = propertyFilters.bedrooms_max
    const priceMin = propertyFilters.rental_price_min
    const priceMax = propertyFilters.rental_price_max
    const personaAttributeToSortBy = personaValue.toLowerCase().replace(/ /g, '_')

    try {
      if (channelValue === 'Rental') {
        const url = `/api/personas/rental/?area=${areaValue}&persona=${personaValue}&min_bedrooms=${bedroomsMin}&max_bedrooms=${bedroomsMax}&rental_price_min=${priceMin}&rental_price_max=${priceMax}&garden=${gardenValue}&property_type=${propertyTypeValue}`
        // extract data based on url
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        // Sort data based on the adjusted persona attribute
        data.sort((a, b) => {
          const personaValueA = a.persona_data_list[0][personaAttributeToSortBy]
          const personaValueB = b.persona_data_list[0][personaAttributeToSortBy]
          return personaValueB - personaValueA // Sorting in descending order
        })
        console.log('combined data ->', data)
        setProperties(data)
        window.localStorage.setItem('top-properties', JSON.stringify(data))

      } else if (channelValue === 'Sales') {
        const url = `/api/personas/sales/?area=${areaValue}&persona=${personaValue}&min_bedrooms=${bedroomsMin}&max_bedrooms=${bedroomsMax}&rental_price_min=${priceMin}&rental_price_max=${priceMax}&garden=${gardenValue}&propertyTypeValue=${propertyTypeValue}&size=${sizeValue}`
        // extract data based on url
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        // Sort data based on the adjusted persona attribute
        data.sort((a, b) => {
          const personaValueA = a.persona_data_list[0][personaAttributeToSortBy]
          const personaValueB = b.persona_data_list[0][personaAttributeToSortBy]
          return personaValueB - personaValueA // Sorting in descending order
        })
        console.log('combined data ->', data)
        setProperties(data)
        window.localStorage.setItem('top-properties', JSON.stringify(data))
      }
      window.localStorage.setItem('top-property-filters', JSON.stringify(propertyFilters))
      setLoading(false)
    } catch (error) {
      console.error('can\'t access combined data ->', error)
    }
  }


  // go to url in table
  const handleVisitUrl = (url) => {
    // window.open(url, '_blank') // This will open the URL in a new tab
    const windowFeatures = 'width=1200,height=800,resizable=yes,scrollbars=yes,status=yes'
    // Open the URL in a new window
    window.open(url, '_blank', windowFeatures)
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







  return (

    <>
      <section className='top-properties'>

        <section className='top-properties-filters'>
          <div className='filter-block'>
            <button onClick={handlePropertyInputShow}>Edit inputs</button>
          </div>

        </section>

        {!loading ?
          <section className='top-property-results'>
            <div className='top-property-title'>
              <h3>{properties ? `There are ${properties.length} properties that match your criteria` : ''}</h3>
              <div className='view-selectors'>
                <div className={`icon-box ${propertyViewFormat === 'Table' ? 'active' : 'inactive'}`} onClick={() => setPropertyViewFormat('Table')}>
                  <div className='icon' id='table'></div>
                </div>
                <div className={`icon-box ${propertyViewFormat === 'Map' ? 'active' : 'inactive'}`} onClick={() => setPropertyViewFormat('Map')}>
                  <div className='icon' id='map'></div>
                </div>
              </div>
            </div>
            {propertyViewFormat === 'Table' ?
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
                              <h5>{item.persona_data_list[0].lsoa}</h5>
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
                              {propertyFilters.persona === 'Young families' ? <h5>{(item.persona_data_list[0].young_families).toFixed(4)}</h5> :
                                propertyFilters.persona === 'Young professionals' ? <h5>{(item.persona_data_list[0].young_professionals).toFixed(4)}</h5> :
                                  propertyFilters.persona === 'Vibes' ? <h5>{(item.persona_data_list[0].vibes).toFixed(4)}</h5> :
                                    propertyFilters.persona === 'Commuter convenience' ? <h5>{(item.persona_data_list[0].commuter_convenience).toFixed(4)}</h5> : ''}
                            </div>
                            <div id='column10' className='column'>
                              <button onClick={() => goToListing(item)}>Go</button>
                            </div>
                          </div>
                          <hr className='property-divider' />

                        </>
                      )
                    }) : ''}
                  </div>
                </div>
              </div>
              : propertyViewFormat === 'Map' ?
                <div className='property-map-view'>
                  <div className='map-block'>

                    <div className='grid-list'>
                      {properties ? properties.map((item, index) => {
                        return (
                          <>
                            <div className='property-content'>

                              <div className='grid-right' id={item.id} onMouseEnter={iconSetting} >
                                <h5 className='title'>{index + 1}. {item.property_data.displayAddress}</h5>
                                {/* <div className='details'>
                                  <div className='icon' id='catchment'></div>
                                  <h5>{item.rating > 4.8 ? 'Excellent' : item.rating > 4.5 ? 'Very good' : item.rating > 4.2 ? 'Good' : item.rating > 3.9 ? 'Average' : item.rating > 0 ? 'Poor' : 'N/a'}</h5>
                                </div> */}
                                <h5 className='sub-title'>Bedrooms: {item.property_data.bedrooms}</h5>
                                <h5 className='sub-title'>Price: {item.property_data.price}</h5>
                                <h5 className='sub-title'>Score: {(item.persona_data_list[0].young_professionals).toFixed(4)}</h5>

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
      />


    </>

  )
}

export default TopProperties