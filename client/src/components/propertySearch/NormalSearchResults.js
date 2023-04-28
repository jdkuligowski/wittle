import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getUserToken, getAccessToken, isUserAuth } from '../auth/Auth'
import { NumericFormat } from 'react-number-format'
import { Slide } from 'react-slideshow-image'
import NavBar from '../tools/NavBar'
import LazyLoad from 'react-lazyload'
import InfiniteScroll from 'react-infinite-scroll-component'
import PropertyDetails from '../wittleSearch/resultBlocks.js/propertyComponents/PropertyDetails'
import AllPropertiesMap from '../helpers/modals/AllPropertiesMap'
import Loading from '../helpers/Loading'



const NormalSearchResults = () => {

  // state to enable navigation between pages
  const navigate = useNavigate()

  // set errors state
  const [errors, setErrors] = useState()

  // state to collect properties
  const [properties, setProperties] = useState()

  // define state for search data
  const [formData, setFormData] = useState()

  // set location data
  const [locations, setLocations] = useState([])

  // set long and lat of current search
  const [searchLong, setSearchLong] = useState()
  const [searchLat, setSearchLat] = useState()

  // set state for calcualtions on property data
  const [calc1, setCalc1] = useState()
  const [calc2, setCalc2] = useState()
  const [calc3, setCalc3] = useState()

  //  set states for proeprty detail buttons
  const [propertyButtons, setPropertyButtons] = useState('Details')

  // set states for sidebar feature
  const [sidebar, setSidebar] = useState('Close')

  // ? Section 1: Handling form data and organising it to be used to enable the porperty search
  // set up extraction of form from storage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('property-search-input'))
    if (data) setFormData(data)
    console.log('search data ->', data)
  }, [])

  // // location data extarction
  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const { data } = await axios.get('/api/locations/')
  //       console.log('locations ->', data)
  //       setLocations(data)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   }
  //   getData()
  // }, [])

  // // filter for coordinates at the location user has inputted
  // const coordinateExtraction = () => {
  //   if (formData) {
  //     setSearchLat(formData.lat)
  //     setSearchLong(formData.long)
  //     // console.log('lat ->', calculation[0].lat)
  //   }
  // }

  // carry out calculation
  useEffect(() => {
    if (formData) {
      setSearchLat(formData.lat)
      setSearchLong(formData.long)
    }
  }, [formData])



  // ? Section 2: Load in properties from database
  // function for loading properties
  const getProperties = async () => {
    try {
      const { data } = await axios.get('/api/properties/', {
        params: {
          // page: page,
          min_price: formData.property_price_min || undefined,
          max_price: formData.property_price_max || undefined,
          min_bedrooms: formData.property_beds_min || undefined,
          max_bedrooms: formData.property_beds_max || undefined,
          channel: formData.channel || undefined,
        },
      })
      setProperties(data)
      console.log('properties ->', data)
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  // execute properties being exctracted on render
  useEffect(() => {
    if (searchLong) {
      getProperties()
    }
  }, [searchLong])



  // ? Section 3: Property calculations to determine the distance 
  // create function for calculating the distance between proeprties
  const searchDistances = () => {
    const calculation =
      properties.map(property => {
        return {
          ...property,
          search_distance: (12742 * Math.sin(Math.sqrt(0.5 - Math.cos((property.Lat - parseFloat(searchLat)) * (Math.PI / 180)) / 2 + Math.cos(parseFloat(searchLat) * (Math.PI / 180)) * Math.cos(property.Lat * (Math.PI / 180)) * (1 - Math.cos((property.long - parseFloat(searchLong)) * (Math.PI / 180))) / 2))) * 1.2,
          property_images: [
            { url: property.property_image_1 },
            { url: property.property_image_2 }
          ],
        }
      })
    console.log('property calc 1 ->', calculation)
    setCalc1(calculation)
    setViewport({ ...viewport, latitude: parseFloat(searchLat), longitude: parseFloat(searchLong), zoom: 12 })
  }

  // carry out calc
  useEffect(() => {
    if (properties) {
      searchDistances()
    }
  }, [properties])


  // fiiltr data to only show properties that match the seacrch criteriia
  const filterProperties = () => {
    const calculation =
      calc1.filter(property => {
        return (
          // return (property.bedrooms >= parseInt(formData.property_beds_min) &&
          //   property.bedrooms <= parseInt(formData.property_beds_max) &&
          //   property.value >= parseInt(formData.property_price_min) &&
          //   property.value <= parseInt(formData.property_price_max) &&
          property.search_distance <= (0.5 + (parseFloat(formData.search_area) * 1.6))
          // property.search_distance <= (parseInt(formData.search_area) * 1.6))
        )
      })
    console.log('form filtered properties ->', calculation)
    setCalc2(calculation)
  }


  useEffect(() => {
    if (calc1) {
      filterProperties()
    }
  }, [calc1])

  // set up function for loading more data each time you reach the bottom of the page
  useEffect(() => {
    if (calc2) {
      const calculation = calc2.slice(0, 10)
      console.log('reduced propeties ->', calculation)
      setCalc3(calculation)
    }
  }, [calc2])





  // change the value
  const handleAddProperties = () => {
    if (calc2 && calc3) {
      const calculation = calc2.slice(0, (calc3.length + 10))
      setCalc3(calculation)
    }
  }


  // * Modal 1 - Map mdoal
  // Setting state and handles for submit modal
  const [normalMapShow, setNormalMapShow] = useState(false)

  // closing thee modal
  const normalMapClose = () => {
    setNormalMapShow(false)
    setViewport(viewport)
  }

  // states for handling the popups on the map
  const [showPopup, setShowPopup] = useState(true)

  // showing the modal
  const normalHandleMapShow = () => {
    setShowPopup(false)
    setNormalMapShow(true)
    setViewport({ ...viewport, latitude: parseFloat(searchLat), longitude: parseFloat(searchLong), zoom: 12 })
  }

  // control the states for maps
  const [viewport, setViewport] = useState({

  })





  return (
    <section className='property-detail-pages'>
      <NavBar />
      {calc3 ?
        <InfiniteScroll
          dataLength={calc2.length} //This is important field to render the next data
          scrollThreshold={0.95}
          next={handleAddProperties}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>You&apos;ve seen everything</b>
            </p>
          }
          {...calc3}
        >

          <section className='property-main-page'>
            {sidebar === 'Open' ?
              <section className='title-section' id='form-buttons'>
                <div className='logo-section'>
                  <div className='logo'>
                    <h2 onClick={() => navigate('/')}>Wittle</h2>
                  </div>
                </div>
                <h3>Search details &gt;</h3>
                <div className='input-sections'>
                  <h5>Property</h5>
                  <div className='poi'><p>🔎 Area: {formData.location}</p></div>
                  <div className='poi'><p>🏠 Type: {formData.type}</p></div>
                  <div className='poi'><p>💷 Price: <NumericFormat value={formData.property_price_min} displayType={'text'} thousandSeparator={true} prefix={'£'} /> - <NumericFormat value={formData.property_price_max} displayType={'text'} thousandSeparator={true} prefix={'£'} /> </p></div>
                  <div className='poi'><p>🛌 Bedrooms: {formData.property_beds_min} - {formData.property_beds_max}</p></div>
                  <div className='poi'><p>🦴 Radius: {formData.search_area} miles</p></div>
                </div>
                <button className='edit-button'>Edit</button>
                <div className='sidebar-button'>
                  <button onClick={() => sidebar === 'Open' ? setSidebar('Close') : sidebar}>&#60;</button>
                </div>
              </section>
              :
              sidebar === 'Close' ?
                <section className='title-section' style={{ width: '0px' }} id='form-buttons'>
                  <div className="closed-sidebar">
                    <div className='sidebar-button'>
                    </div>
                  </div>
                </section>
                : ''}
            {calc3 ? sidebar === 'Open' ?
              <>
                <section className='property-results' style={{ marginLeft: '200px' }}>
                  <div className='property-results-title'>
                    <div className='title-buttons'>
                      <button className='modal-map' data-toggle='modal' onClick={normalHandleMapShow}>View on map</button>
                      <AllPropertiesMap
                        normalMapShow={normalMapShow}
                        calc10={calc3}
                        normalMapClose={normalMapClose}
                        viewport={viewport}
                        setViewport={setViewport}
                      />

                    </div>
                    <div className='title-centre'>
                      <h1 className='property-count'>{calc2.length} properties</h1>
                    </div>
                  </div>
                  <div className='property-grid'>
                    {calc3.map((property, index) => {
                      return (
                        <>
                          <div className='property-card' key={index} name={index}>
                            <div className='mobile-name'>
                              <h2>{property.property_name}</h2>
                            </div>
                            <div className='slide-section-desktop'>
                              <LazyLoad offset={2000}>
                                <Slide className='slide-import' autoplay={false} transitionDuration={750} arrows={true} indicators={true}>
                                  {property.property_images.map((images, index) => {
                                    return (
                                      <>
                                        <div className='image-card' id={property.id} style={{ backgroundImage: `url('${images.url}')` }} key={index}>
                                          <div className='property-image-details'>
                                            {formData.search_channel === 'Renting' ?
                                              <h3><NumericFormat value={property.monthly} displayType={'text'} thousandSeparator={true} prefix={'£'} /> pcm</h3>
                                              :
                                              <h3>Fixed Price: <NumericFormat value={property.value} displayType={'text'} thousandSeparator={true} prefix={'£'} /> </h3>
                                            }
                                          </div>
                                          {/* {listFavourites ?
                                            <div className='favourite-section' id={property.id} onClick={postFavourite}>
                                              {listFavourites.includes(property.id) ?
                                                <div className='favourite-button-on' id={property.id} ></div>
                                                :
                                                <div className='favourite-button-off' id={property.id} ></div>
                                              }
                                            </div>
                                            : ''} */}
                                        </div>
                                      </>
                                    )
                                  })}
                                </Slide>
                              </LazyLoad>

                            </div>
                            {/* <div className='detail-section' onClick={setID} id={property.first_match}> */}
                            <div className='detail-section'>
                              <Link to={(`/property-results/${property.id}`)} style={{ textDecoration: 'none' }}><h2 className='property-desktop'>{property.property_name}</h2></Link>
                              <div className='property-buttons'>
                                <h5 onClick={() => setPropertyButtons('Details')} style={{ color: propertyButtons === 'Details' ? '#FFA7E5' : '#051885' }}>Details</h5>
                                <h5 onClick={() => setPropertyButtons('Insights')} style={{ color: propertyButtons === 'Insights' ? '#FFA7E5' : '#051885' }}>Insights</h5>
                                <h5 onClick={() => setPropertyButtons('Floorplan')} style={{ color: propertyButtons === 'Floorplan' ? '#FFA7E5' : '#051885' }}>Floorplan</h5>
                                <h5 onClick={() => setPropertyButtons('Documents')} style={{ color: propertyButtons === 'Documents' ? '#FFA7E5' : '#051885' }}>Documents</h5>
                              </div>
                              <div className='property-button-expansion'>
                                {propertyButtons === 'Details' ?
                                  <>
                                    <div className='wittle-all-detail'>

                                      <PropertyDetails
                                        property={property}
                                      />
                                    </div>

                                  </>
                                  : ''}
                                {propertyButtons === 'Insights' ?
                                  <>
                                  </>
                                  : ''}
                              </div>
                            </div>
                          </div>
                          <hr className='mobile-line' />
                        </>
                      )
                    })}
                  </div>
                </section>
              </>
              :
              sidebar === 'Close' ?
                <>
                  <section className='property-results' id='close' style={{ marginLeft: '0px' }}>
                    <div className='property-results-title'>
                      <div className='title-buttons'>
                        <button className='filter-button' onClick={() => sidebar === 'Close' ? setSidebar('Open') : sidebar}>My filters</button>
                        <button className='modal-map' onClick={normalHandleMapShow}>View on map</button>
                        {/* <div className='property-map-detail'> */}
                        <AllPropertiesMap
                          normalMapShow={normalMapShow}
                          calc10={calc2}
                          normalMapClose={normalMapClose}
                          viewport={viewport}
                          setViewport={setViewport}
                          navigation='property-results'
                        />
                        {/* </div> */}
                        <button className='mobile-filter-button'>My filters</button>

                      </div>
                      <div className='title-centre'>
                        <h1 className='property-count'>{calc2.length} properties</h1>
                      </div>
                    </div>
                    <div className='property-grid'>
                      {calc3.map((property, index) => {
                        return (
                          <>
                            <div className='property-card' key={index} id={property.first_match} name={index}>
                              <div className='mobile-name' >
                                <Link to={(`/property-results/${property.id}`)} style={{ textDecoration: 'none' }}>
                                  <div className='name-box'>
                                    <h2>{property.property_name}</h2>
                                  </div>
                                </Link>
                              </div>
                              {/* <ImageSlider calc10={calc10} formData={formData} listFavourites={listFavourites} postFavourite={postFavourite} /> */}
                              <div className='slide-section-desktop'>

                                <LazyLoad offset={2000}>
                                  <Slide className='slide-import' autoplay={false} transitionDuration={750} arrows={true} indicators={true}>
                                    {property.property_images.map((images, index) => {
                                      return (
                                        <>
                                          <div className='image-card' id={property.id} style={{ backgroundImage: `url('${images.url}')` }} key={index}>
                                            <div className='property-image-details'>
                                              {formData.search_channel === 'Renting' ?
                                                <h3><NumericFormat value={property.monthly} displayType={'text'} thousandSeparator={true} prefix={'£'} /> pcm</h3>
                                                :
                                                <h3>Fixed Price: <NumericFormat value={property.value} displayType={'text'} thousandSeparator={true} prefix={'£'} /> </h3>
                                              }
                                            </div>
                                            {/* {listFavourites ?
                                              <div className='favourite-section' id={property.id} onClick={postFavourite}>
                                                {listFavourites.includes(property.id) ?
                                                  <div className='favourite-button-on' id={property.id} ></div>
                                                  :
                                                  <div className='favourite-button-off' id={property.id} ></div>
                                                }
                                              </div>
                                              : ''} */}
                                          </div>
                                        </>
                                      )
                                    })}
                                  </Slide>
                                </LazyLoad>

                              </div>
                              <div className='slide-section-mobile'>

                                <LazyLoad offset={2000}>
                                  <Slide className='slide-import' autoplay={false} transitionDuration={500} arrows={false} indicators={true}>
                                    {property.property_images.map((images, index) => {
                                      return (
                                        <>
                                          <div className='image-card' id={property.id} style={{ backgroundImage: `url('${images.url}')` }} key={index}>
                                            <div className='property-image-details'>
                                              {formData.channel === 'Renting' ?
                                                <h3><NumericFormat value={property.monthly} displayType={'text'} thousandSeparator={true} prefix={'£'} /> pcm</h3>
                                                :
                                                <h3>Fixed Price: <NumericFormat value={property.value} displayType={'text'} thousandSeparator={true} prefix={'£'} /> </h3>
                                              }
                                            </div>
                                            {/* {listFavourites ?
                                            <div className='favourite-section' id={property.id} onClick={postFavourite}>
                                              {listFavourites.includes(property.id) ?
                                                <div className='favourite-button-on' id={property.id} ></div>
                                                :
                                                <div className='favourite-button-off' id={property.id} ></div>
                                              }
                                            </div>
                                            : ''} */}
                                          </div>
                                        </>
                                      )
                                    })}
                                  </Slide>
                                </LazyLoad>

                              </div>
                              <div className='detail-section' id={property.first_match}>
                                {/* <Link to={(`/wittle-results/${property.id}`)} style={{ textDecoration: 'none' }}><h2 className='property-desktop' id={property.first_match}>{property.property_name}</h2></Link> */}
                                <Link to={(`/property-results/${property.id}`)} style={{ textDecoration: 'none' }}>
                                  <div className='name-box'>
                                    <h2 className='property-desktop'>{property.property_name}</h2>
                                  </div>
                                </Link>
                                <div className='property-buttons'>
                                  <h5 onClick={() => setPropertyButtons('Details')} style={{ color: propertyButtons === 'Details' ? '#FFA7E5' : '#051885' }}>Details</h5>
                                  <h5 onClick={() => setPropertyButtons('Insights')} style={{ color: propertyButtons === 'Insights' ? '#FFA7E5' : '#051885' }}>Insights</h5>
                                  <h5 onClick={() => setPropertyButtons('Floorplan')} style={{ color: propertyButtons === 'Floorplan' ? '#FFA7E5' : '#051885' }}>Floorplan</h5>
                                  <h5 onClick={() => setPropertyButtons('Documents')} style={{ color: propertyButtons === 'Documents' ? '#FFA7E5' : '#051885' }}>Documents</h5>
                                </div>
                                <div className='property-button-expansion'>
                                  {propertyButtons === 'Details' ?
                                    <>
                                      <div className='wittle-all-detail'>

                                        <PropertyDetails
                                          property={property}
                                        />
                                      </div>

                                    </>
                                    : ''}
                                </div>
                              </div>
                            </div>
                            <hr className='mobile-line' />
                          </>
                        )
                      })}
                    </div>
                  </section>
                </>
                : '' : ''}

          </section>
        </InfiniteScroll>
        :
        <section className='loading-screen'>
          <h1>Properties loading...</h1>

          <h3>Your properties {formData ? <span>near {formData.location}</span> : ''} will be loaded in a second</h3>
          <Loading />

        </section>
      }
    </section >
  )
}

export default NormalSearchResults