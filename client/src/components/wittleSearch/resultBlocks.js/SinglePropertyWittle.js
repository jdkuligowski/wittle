import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRef, useParams, useNavigate, Link } from 'react-router-dom'
import { getUserToken, getAccessToken, isUserAuth } from '../../auth/Auth'
import { Modal } from 'react-bootstrap'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { NumericFormat } from 'react-number-format'
import NavBar from '../../tools/NavBar'
import { ModalHover } from 'react-modal-hover'




const SinglePropertyWittle = () => {

  // state for switching page
  const { id } = useParams()

  // state to collect properties
  const [properties, setProperties] = useState()

  // state to collect properties
  const [restaurants, setRestaurants] = useState()

  // adsitional state for testing 
  const [localProp, setLocalProp] = useState()

  // adsitional state for testing 
  const [secondProp, setSecondProp] = useState()

  // calc1
  const [calc1, setCalc1] = useState()

  // match data
  const [match, setMatch] = useState()

  // state to enable navigation between pages
  const navigate = useNavigate()

  // set error state for capturing errors
  const [errors, setErrors] = useState(false)

  // set state for the contact button at bottom of the page
  const [contactButton, setContact] = useState('Closed')

  // states for handling the popups on the map
  const [showPopup, setShowPopup] = useState(true)
  const [iconId, setIconId] = useState()
  // const openDetail = () => setbuttonActive(!buttonActive)

  const iconSetting = (e) => {
    setShowPopup(true)
    console.log(showPopup)
    setIconId(parseInt(e.target.id))
    console.log(parseInt(e.target.id))
  }

  // states for filling out the form
  const [formData, setFormData] = useState({
    start_search: true,
    search_name: '',
    restaurant_selection: false,
    restaurant_decision: '',
    restaurant_distance: 0,
    restaurant_cuisine_1: '',
    restaurant_cuisine_2: '',
    takeaway_selection: false,
    takeaway_decision: '',
    takeaway_distance: 0,
    takeaway_cuisine_1: '',
    takeaway_cuisine_2: '',
    pubs_selection: false,
    pubs_distance: 0,
    cafes_selection: '',
    cafes_decision: '',
    cafes_detail: '',
    cafes_distance: 0,
    tube_selection: false,
    tube_decision: '',
    tube_detail: '',
    tube_distance: 0,
    train_selection: false,
    train_decision: '',
    train_detail: '',
    train_distance: 0,
    primary_selection: false,
    primary_religion: '',
    primary_mode: '',
    primary_distance: 0,
    college_selection: false,
    college_religion: '',
    college_mode: '',
    college_distance: 0,
    secondary_selection: false,
    secondary_religion: '',
    secondary_mode: '',
    secondary_distance: 0,
    supermarket_selection: false,
    supermarket_decision: '',
    supermarket_segment: '',
    supermarket_size: '',
    supermarket_distance: 0,
    gym_selection: false,
    gym_studio_name: '',
    gym_class_type: '',
    gym_distance: 0,
    park_selection: false,
    park_type: '',
    park_distance: 0,
    workplace_selection: false,
    workplace_detail: '',
    workplace_transport: '',
    workplace_distance: 0,
    family_selection: false,
    family_detail_1: '',
    family_distance_1: 0,
    family_detail_2: '',
    family_distance_2: 0,
    family_detail_3: '',
    family_distance_3: 0,
    property_price_min: '',
    property_price_max: '',
    property_bed_min: '',
    property_bed_max: '',
    property_type: '',
  })

  // set states for proeprty detail buttons
  const [propertyButtons, setPropertyButtons] = useState('Description')

  // set states for proeprty detail buttons
  const [poiButtons, setPOIButtons] = useState({
    selection: 'Restaurants',
  })

  // // set states for proeprty detail buttons
  // const [poiButtons, setpoiButtonss] = useState({
  //   selection: '',
  // })


  // get form data from storage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('wittle-form-input'))
    if (data) setFormData(data)
  }, [])

  // get results from local storage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('wittle-results'))
    if (data) setSecondProp(data)
    console.log('filtered data->', data)
  }, [])


  // get match % from storage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('wittle-current-match'))
    if (data) setMatch(data)
  }, [])

  // droop down for tabular insights
  const handleChange = e => {
    setPOIButtons({ ...poiButtons, [e.target.name]: e.target.value })
  }

  // extract the property data from the database
  useEffect(() => {
    const getProperties = async () => {
      if (isUserAuth()) {
        try {
          const { data } = await axios.get(`/api/properties/results/${id}`)
          setProperties(data)
          // setRestaurants(data.property_name)
          console.log('property data ->', data)
          // console.log('restaurant data ->', data.property_name)
        } catch (error) {
          setErrors(true)
          console.log(error)
        }
      } else {
        navigate('/access-denied')
      }
    }
    getProperties()
  }, [])

  // control thee states for maps
  const [viewport, setViewport] = useState({
    latitude: 51.515419,
    longitude: -0.141099,
    zoom: 11,
  })

  return (
    <>
      <section className='property-detail-pages'>
        <NavBar />
        <div className='sub-nav'>
          <button className='back' onClick={() => navigate('/wittle-results')}>Go back</button>
        </div>
        {properties ?
          <section className='header-section'>
            {properties.map(property => {
              return (
                <>
                  <div className='left-image' style={{ backgroundImage: `url('${property.property_image_1}')` }}></div>
                  <div className='right-image'>
                    <div className='right-top' style={{ backgroundImage: `url('${property.property_image_2}')` }}></div>
                    <div className='right-bottom' style={{ backgroundImage: `url('${property.property_image_1}')` }}></div>
                  </div>
                </>
              )
            })}

          </section>
          : ''}
        <section className='property-main-section'>
          <div className='main-section-body'>
            {properties ?

              <div className='property-top-content'>
                {properties.map(property => {
                  return (
                    <>
                      <div className='property-content'>
                        <div className='property-content-title'>
                          <div className='property-title-description'>
                            <div className='property-content-title-1'>
                              <h4>{property.property_name}</h4>
                              <h6>🔥 {match}% match</h6>
                            </div>
                            <div className='property-content-title-2'>
                              <h4><NumericFormat value={property.value} displayType={'text'} thousandSeparator={true} prefix={'£'} /> offers over</h4>
                            </div>
                          </div>
                          <div className='mobile-titles'>
                            <h4>{property.property_name}</h4>
                            <h5><NumericFormat value={property.value} displayType={'text'} thousandSeparator={true} prefix={'£'} /> offers over</h5>
                            <h6>🔥 {match}% match</h6>
                          </div>
                          <hr className='mobile-single-line' />
                          {/* <hr /> */}
                          <div className='property-buttons'>
                            <h5 onClick={() => setPropertyButtons('Description')} style={{ color: propertyButtons === 'Description' ? '#FFA7E5' : 'black' }}>Description</h5>
                            <h5 onClick={() => setPropertyButtons('Insights')} style={{ color: propertyButtons === 'Insights' ? '#FFA7E5' : 'black' }}>Insights</h5>
                            <h5 onClick={() => setPropertyButtons('Floorplan')} style={{ color: propertyButtons === 'Floorplan' ? '#FFA7E5' : 'black' }}>Floorplan</h5>
                            <h5 onClick={() => setPropertyButtons('Documents')} style={{ color: propertyButtons === 'Documents' ? '#FFA7E5' : 'black' }}>Documents</h5>
                          </div>

                          {/* top detail section  */}
                          <div className='core-content'>
                            {propertyButtons === 'Description' ?
                              <>
                                <div className='description-stats'>
                                  <p className='description-text'>Type: {property.type}</p>
                                  <p className='description-text'>Bedrooms: {property.bedrooms}</p>
                                  <p className='description-text'>Bathrooms: 2</p>
                                </div>
                                <p className='description-text'>{property.property_description}</p>
                              </>
                              :
                              propertyButtons === 'Insights' ?
                                <>
                                  <div className='insight-details' key={id}>
                                    {property.restaurants ? <p className='insight-bullets'>👨‍🍳 {property.restaurants.length} restaurants <span>(within {formData.restaurant_distance} min walk)</span></p> : ''}
                                    {property.bars ? <p className='insight-bullets'>🍻{property.bars.length} bars <span>(within {formData.pubs_distance} min walk)</span></p> : ''}
                                    {property.cafes ? <p className='insight-bullets'>☕️ {property.cafes.length} cafes <span>(within {formData.cafes_distance} min walk)</span></p> : ''}
                                    {property.takeaways ? <p className='insight-bullets'>☕️ {property.takeaways.length} takeaways <span>(within {formData.takeaway_distance} min walk)</span></p> : ''}
                                    {property.primaries ? <p className='insight-bullets'>🏫 {property.primaries.length} primary schools <span>(within {formData.primary_distance} min walk)</span></p> : ''}
                                    {property.secondaries ? <p className='insight-bullets'>🏫 {property.secondaries.length} secondary schools <span>(within {formData.secondary_distance} min walk)</span></p> : ''}
                                    {property.colleges ? <p className='insight-bullets'>🏫 {property.colleges.length} 6th forms <span>(within {formData.college_distance} min walk)</span></p> : ''}
                                    {property.supermarkets ? <p className='insight-bullets'>🛒 {property.supermarkets.length} supermarkets <span>(within {formData.supermarket_distance} min walk)</span></p> : ''}
                                    {property.gyms ? <p className='insight-bullets'>🏋️‍♂️ {property.gyms.length} gyms <span>(within {formData.gym_distance} min walk)</span></p> : ''}
                                    {property.parks ? <p className='insight-bullets'>🌳 {property.parks.length} parks <span>(within {formData.park_distance} min walk)</span></p> : ''}
                                    {property.tubes ? <p className='insight-bullets'>🚇 {property.tubes.length} tube stations <span>(within {formData.tube_distance} min walk)</span></p> : ''}
                                    {property.trains ? <p className='insight-bullets'>🚊 {property.trains.length} train stations <span>(within {formData.train_distance} min walk)</span></p> : ''}
                                  </div>
                                </>
                                : ''}
                          </div>
                          <hr className='mobile-single-line' />
                          {/* : ''} */}

                        </div>

                        {/* section determined by whether the insights button is chosen */}
                        <div className='secondary-content'>
                          {
                            propertyButtons === 'Insights' ?
                              <>
                                <div className='insight-headers'>
                                  {property.restaurants ? <h5 className='first-selection' onClick={() => setPOIButtons({ ...poiButtons, selection: 'Restaurants' })} style={{ color: poiButtons.selection === 'Restaurants' ? '#FFA7E5' : 'black' }}>Restaurants</h5> : ''}
                                  {property.bars ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Pubs' })} style={{ color: poiButtons.selection === 'Pubs' ? '#FFA7E5' : 'black' }}>Pubs</h5> : ''}
                                  {property.cafes ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Cafes' })} style={{ color: poiButtons.selection === 'Cafes' ? '#FFA7E5' : 'black' }}>Cafes</h5> : ''}
                                  {property.takeaways ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Takeaways' })} style={{ color: poiButtons.selection === 'Takeaways' ? '#FFA7E5' : 'black' }}>Takeaways</h5> : ''}
                                  {property.tubes ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Tubes' })} style={{ color: poiButtons.selection === 'Tubes' ? '#FFA7E5' : 'black' }}>Tubes</h5> : ''}
                                  {property.trains ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Trains' })} style={{ color: poiButtons.selection === 'Trains' ? '#FFA7E5' : 'black' }}>Trains</h5> : ''}
                                  {property.supermarkets ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Supermarkets' })} style={{ color: poiButtons.selection === 'Supermarkets' ? '#FFA7E5' : 'black' }}>Supermarkets</h5> : ''}
                                  {property.gyms ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Gyms' })} style={{ color: poiButtons.selection === 'Gyms' ? '#FFA7E5' : 'black' }}>Gyms</h5> : ''}
                                  {property.parks ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Parks' })} style={{ color: poiButtons.selection === 'Parks' ? '#FFA7E5' : 'black' }}>Parks</h5> : ''}
                                  {property.primaries ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Primary Schools' })} style={{ color: poiButtons.selection === 'Primary Schools' ? '#FFA7E5' : 'black' }}>Primaries</h5> : ''}
                                  {property.secondaries ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Secondary Schools' })} style={{ color: poiButtons.selection === 'Secondary Schools' ? '#FFA7E5' : 'black' }}>Secondaries</h5> : ''}
                                  {property.colleges ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: '6th Forms' })} style={{ color: poiButtons.selection === '6th Forms' ? '#FFA7E5' : 'black' }}>6th Forms</h5> : ''}
                                </div>
                                <div className='insight-details' key={id}>
                                  {
                                    propertyButtons === 'Insights' & poiButtons.selection === 'Restaurants' ?
                                      <>
                                        <div className='insight-detail-title'>
                                          <h5 id='header-1'>Name</h5>
                                          <h5 id='header-2'>Rating (/5)</h5>
                                          <h5 id='header-3'>Cuisine</h5>
                                          <h5 id='header-4'>Distance (kms)</h5>
                                        </div>
                                        <div className='insight-details-text'>
                                          {property.restaurants.map((restaurant, index) => {
                                            return (
                                              <>
                                                <div className="insight-details-content" key={index}>
                                                  <div className='insight-details-name'>
                                                    <h5>{restaurant.restaurant_name}</h5>
                                                  </div>
                                                  <div className='insight-details-rating'>
                                                    <h5>{restaurant.rating}</h5>
                                                  </div>
                                                  <div className='insight-details-cuisine'>
                                                    <h5>{restaurant.master_cuisine}</h5>
                                                  </div>
                                                  <div className='insight-details-distance'>
                                                    <h5>{restaurant.adjusted_dist_km}</h5>
                                                  </div>
                                                </div>
                                                <hr className='table' />
                                              </>
                                            )
                                          })}
                                        </div>
                                      </>
                                      :
                                      propertyButtons === 'Insights' & poiButtons.selection === 'Pubs' ?
                                        <>
                                          <div className='insight-detail-title'>
                                            <h5 id='header-1'>Name</h5>
                                            <h5 id='header-2'>Category</h5>
                                            <h5 id='header-3'>Time to walk (mins)</h5>
                                            <h5 id='header-4'>Distance (kms)</h5>
                                          </div>
                                          <div className='insight-details-text'>
                                            {property.bars.map((bar, index) => {
                                              return (
                                                <>
                                                  <div className="insight-details-content" key={index}>
                                                    <div className='insight-details-name'>
                                                      <h5>{bar.pub_name}</h5>
                                                    </div>
                                                    <div className='insight-details-rating'>
                                                      <h5>{bar.pub_category}</h5>
                                                    </div>
                                                    <div className='insight-details-cuisine'>
                                                      <h5>{bar.walking_time_mins}</h5>
                                                    </div>
                                                    <div className='insight-details-distance'>
                                                      <h5>{bar.adjusted_dist_km}</h5>
                                                    </div>
                                                  </div>
                                                  <hr className='table' />
                                                </>
                                              )
                                            })}
                                          </div>
                                        </> :
                                        propertyButtons === 'Insights' & poiButtons.selection === 'Cafes' ?
                                          <>
                                            <div className='insight-detail-title'>
                                              <h5 id='header-1' style={{ width: 'calc(100%/3)' }}>Name</h5>
                                              <h5 id='header-2' style={{ width: 'calc(100%/3)' }}>Distance (kms)</h5>
                                              {/* <h5 id='header-3' style={{ width: 'calc(100%/3)' }}>Distance (mins)</h5> */}
                                              <h5 id='header-4' style={{ width: 'calc(100%/3)' }}>Time to walk (mins)</h5>
                                            </div>
                                            <div className='insight-details-text'>
                                              {property.cafes.map((cafe, index) => {
                                                return (
                                                  <>
                                                    <div className="insight-details-content" key={index}>
                                                      <div className='insight-details-name' style={{ width: 'calc(100%/3)' }}>
                                                        <h5>{cafe.cafe_name}</h5>
                                                      </div>
                                                      <div className='insight-details-rating' style={{ width: 'calc(100%/3)' }}>
                                                        <h5>{cafe.adjusted_dist_km}</h5>
                                                      </div>
                                                      {/* <div className='insight-details-cuisine'>
                                                    <h5>{cafe.walking_time_mins}</h5>
                                                  </div> */}
                                                      <div className='insight-details-distance' style={{ width: 'calc(100%/3)' }}>
                                                        <h5>{cafe.walking_time_mins}</h5>
                                                      </div>
                                                    </div>
                                                    <hr className='table' />
                                                  </>
                                                )
                                              })}
                                            </div>
                                          </> :
                                          propertyButtons === 'Insights' & poiButtons.selection === 'Takeaways' ?
                                            <>
                                              <div className='insight-detail-title'>
                                                <h5 id='header-1' >Name</h5>
                                                <h5 id='header-2'>Rating (/10)</h5>
                                                <h5 id='header-3'>Cuisine</h5>
                                                <h5 id='header-4'>Time to walk (mins)</h5>
                                              </div>
                                              <div className='insight-details-text'>
                                                {property.takeaways.map((takeaway, index) => {
                                                  return (
                                                    <>
                                                      <div className="insight-details-content" key={index}>
                                                        <div className='insight-details-name'>
                                                          <h5>{takeaway.takeaway_name}</h5>
                                                        </div>
                                                        <div className='insight-details-rating'>
                                                          <h5>{takeaway.wittle_rating}</h5>
                                                        </div>
                                                        <div className='insight-details-cuisine'>
                                                          <h5>{takeaway.cuisine}</h5>
                                                        </div>
                                                        <div className='insight-details-distance'>
                                                          <h5>{takeaway.walking_time_mins}</h5>
                                                        </div>
                                                      </div>
                                                      <hr className='table' />
                                                    </>
                                                  )
                                                })}
                                              </div>
                                            </> :
                                            propertyButtons === 'Insights' & poiButtons.selection === 'Tubes' ?
                                              <>
                                                <div className='insight-detail-title'>
                                                  <h5 id='header-1' style={{ width: 'calc(100%/3)' }}>Station name</h5>
                                                  <h5 id='header-2' style={{ width: 'calc(100%/3)' }}>Line</h5>
                                                  <h5 id='header-4' style={{ width: 'calc(100%/3)' }}>Time to walk (mins)</h5>
                                                </div>
                                                <div className='insight-details-text'>
                                                  {property.tubes.map((tube, index) => {
                                                    return (
                                                      <>
                                                        <div className="insight-details-content" key={index}>
                                                          <div className='insight-details-name' style={{ width: 'calc(100%/3)' }}>
                                                            <h5>{tube.station_name}</h5>
                                                          </div>
                                                          <div className='insight-details-rating' style={{ width: 'calc(100%/3)' }}>
                                                            <h5>{tube.line}</h5>
                                                          </div>
                                                          <div className='insight-details-distance' style={{ width: 'calc(100%/3)' }}>
                                                            <h5>{tube.walking_time_mins}</h5>
                                                          </div>
                                                        </div>
                                                        <hr className='table' />
                                                      </>
                                                    )
                                                  })}
                                                </div>
                                              </>
                                              :
                                              propertyButtons === 'Insights' & poiButtons.selection === 'Supermarkets' ?
                                                <>
                                                  <div className='insight-detail-title'>
                                                    <h5 id='header-1' style={{ width: 'calc(100%/3)' }}>Name</h5>
                                                    <h5 id='header-2' style={{ width: 'calc(100%/3)' }}>Size</h5>
                                                    {/* <h5 id='header-3'>Segment</h5> */}
                                                    <h5 id='header-4' style={{ width: 'calc(100%/3)' }}>Time to walk (mins)</h5>
                                                  </div>
                                                  <div className='insight-details-text'>
                                                    {property.supermarkets.map((shop, index) => {
                                                      return (
                                                        <>
                                                          <div className="insight-details-content" key={index}>
                                                            <div className='insight-details-name' style={{ width: 'calc(100%/3)' }}>
                                                              <h5>{shop.supermarket_name}</h5>
                                                            </div>
                                                            <div className='insight-details-rating' style={{ width: 'calc(100%/3)' }}>
                                                              <h5>{shop.size}</h5>
                                                            </div>
                                                            {/* <div className='insight-details-cuisine'>
                                                              <h5>{shop.segment}</h5>
                                                            </div> */}
                                                            <div className='insight-details-distance' style={{ width: 'calc(100%/3)' }}>
                                                              <h5>{shop.walking_time_mins}</h5>
                                                            </div>
                                                          </div>
                                                          <hr className='table' />
                                                        </>
                                                      )
                                                    })}
                                                  </div>
                                                </>
                                                :
                                                propertyButtons === 'Insights' & poiButtons.selection === 'Gyms' ?
                                                  <>
                                                    <div className='insight-detail-title'>
                                                      <h5 id='header-1'>Name</h5>
                                                      <h5 id='header-2'>Group</h5>
                                                      <h5 id='header-3'>Class Type</h5>
                                                      <h5 id='header-4'>Time to walk (mins)</h5>
                                                    </div>
                                                    <div className='insight-details-text'>
                                                      {property.gyms.map((gym, index) => {
                                                        return (
                                                          <>
                                                            <div className="insight-details-content" key={index}>
                                                              <div className='insight-details-name'>
                                                                <h5>{gym.gym_name}</h5>
                                                              </div>
                                                              <div className='insight-details-rating'>
                                                                <h5>{gym.gym_group}</h5>
                                                              </div>
                                                              <div className='insight-details-cuisine'>
                                                                <h5>{gym.class_type}</h5>
                                                              </div>
                                                              <div className='insight-details-distance'>
                                                                <h5>{gym.walking_time_mins}</h5>
                                                              </div>
                                                            </div>
                                                            <hr className='table' />
                                                          </>
                                                        )
                                                      })}
                                                    </div>
                                                  </> :
                                                  propertyButtons === 'Insights' & poiButtons.selection === 'Parks' ?
                                                    <>
                                                      <div className='insight-detail-title'>
                                                        <h5 id='header-1' style={{ width: 'calc(100%/3)' }}>Name</h5>
                                                        <h5 id='header-2' style={{ width: 'calc(100%/3)' }}>Park Type</h5>
                                                        <h5 id='header-4' style={{ width: 'calc(100%/3)' }}>Time to walk (mins)</h5>
                                                      </div>
                                                      <div className='insight-details-text'>
                                                        {property.parks.map((park, index) => {
                                                          return (
                                                            <>
                                                              <div className="insight-details-content" key={index}>
                                                                <div className='insight-details-name' style={{ width: 'calc(100%/3)' }}>
                                                                  <h5>{park.park_name}</h5>
                                                                </div>
                                                                <div className='insight-details-rating' style={{ width: 'calc(100%/3)' }}>
                                                                  <h5>{park.park_type}</h5>
                                                                </div>
                                                                <div className='insight-details-distance' style={{ width: 'calc(100%/3)' }}>
                                                                  <h5>{park.walking_time_mins}</h5>
                                                                </div>
                                                              </div>
                                                              <hr className='table' />
                                                            </>
                                                          )
                                                        })}
                                                      </div>
                                                    </> :
                                                    propertyButtons === 'Insights' & poiButtons.selection === 'Primary Schools' ?
                                                      <>
                                                        <div className='insight-detail-title'>
                                                          <h5 id='header-1'>Name</h5>
                                                          <h5 id='header-2'>Ofsted</h5>
                                                          <h5 id='header-3'>Religion</h5>
                                                          <h5 id='header-4'>Time to walk (mins)</h5>
                                                        </div>
                                                        <div className='insight-details-text'>
                                                          {property.primaries.map((school, index) => {
                                                            return (
                                                              <>
                                                                <div className="insight-details-content" key={index}>
                                                                  <div className='insight-details-name'>
                                                                    <h5>{school.school_name}</h5>
                                                                  </div>
                                                                  <div className='insight-details-rating'>
                                                                    <h5>{school.ofsted_results}</h5>
                                                                  </div>
                                                                  <div className='insight-details-cuisine'>
                                                                    <h5>{school.religious_grouping}</h5>
                                                                  </div>
                                                                  <div className='insight-details-distance'>
                                                                    <h5>{school.walking_time_mins}</h5>
                                                                  </div>
                                                                </div>
                                                                <hr className='table' />
                                                              </>
                                                            )
                                                          })}
                                                        </div>
                                                      </> :
                                                      propertyButtons === 'Insights' & poiButtons.selection === 'Secondary Schools' ?
                                                        <>
                                                          <div className='insight-detail-title'>
                                                            <h5 id='header-1'>Name</h5>
                                                            <h5 id='header-2'>Ofsted</h5>
                                                            <h5 id='header-3'>Religion</h5>
                                                            <h5 id='header-4'>Time to walk (mins)</h5>
                                                          </div>
                                                          <div className='insight-details-text'>
                                                            {property.secondaries.map((school, index) => {
                                                              return (
                                                                <>
                                                                  <div className="insight-details-content" key={index}>
                                                                    <div className='insight-details-name'>
                                                                      <h5>{school.school_name}</h5>
                                                                    </div>
                                                                    <div className='insight-details-rating'>
                                                                      <h5>{school.ofsted_results}</h5>
                                                                    </div>
                                                                    <div className='insight-details-cuisine'>
                                                                      <h5>{school.religious_grouping}</h5>
                                                                    </div>
                                                                    <div className='insight-details-distance'>
                                                                      <h5>{school.walking_time_mins}</h5>
                                                                    </div>
                                                                  </div>
                                                                  <hr className='table' />
                                                                </>
                                                              )
                                                            })}
                                                          </div>
                                                        </>
                                                        : ''
                                  }
                                </div>
                              </>
                              : ''}

                          {/* </>
                            : ''} */}

                        </div>
                      </div>
                    </>
                  )
                })}

              </div>
              : ''}
            {/* <hr className='divider' /> */}
            {/* <div className='property-description-section'> */}
            {/* <hr className='divider' /> */}

            <div className='property-map-detail'>
              {properties ?
                <>
                  <div className='property-map-title'>
                    {properties.map((property, index) => {
                      return (
                        <>
                          <div className='property-map-title-text' key={index}>
                            <h1>{property.property_name}</h1>
                          </div>
                        </>
                      )
                    })}
                  </div>
                  {properties.map((property, index) => {
                    return (
                      <>
                        <div className='map-headers'>
                          {property.restaurants ? <h5 className='first-selection' onClick={() => setPOIButtons({ ...poiButtons, selection: 'Restaurants' })} style={{ color: poiButtons.selection === 'Restaurants' ? '#FFA7E5' : 'black' }}>Restaurants</h5> : ''}
                          {property.bars ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Pubs' })} style={{ color: poiButtons.selection === 'Pubs' ? '#FFA7E5' : 'black' }}>Pubs</h5> : ''}
                          {property.cafes ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Cafes' })} style={{ color: poiButtons.selection === 'Cafes' ? '#FFA7E5' : 'black' }}>Cafes</h5> : ''}
                          {property.takeaways ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Takeaways' })} style={{ color: poiButtons.selection === 'Takeaways' ? '#FFA7E5' : 'black' }}>Takeaways</h5> : ''}
                          {property.tubes ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Tubes' })} style={{ color: poiButtons.selection === 'Tubes' ? '#FFA7E5' : 'black' }}>Tubes</h5> : ''}
                          {property.trains ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Trains' })} style={{ color: poiButtons.selection === 'Trains' ? '#FFA7E5' : 'black' }}>Trains</h5> : ''}
                          {property.supermarkets ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Supermarkets' })} style={{ color: poiButtons.selection === 'Supermarkets' ? '#FFA7E5' : 'black' }}>Supermarkets</h5> : ''}
                          {property.gyms ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Gyms' })} style={{ color: poiButtons.selection === 'Gyms' ? '#FFA7E5' : 'black' }}>Gyms</h5> : ''}
                          {property.parks ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Parks' })} style={{ color: poiButtons.selection === 'Parks' ? '#FFA7E5' : 'black' }}>Parks</h5> : ''}
                          {property.primaries ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Primaries' })} style={{ color: poiButtons.selection === 'Primaries' ? '#FFA7E5' : 'black' }}>Primaries</h5> : ''}
                          {property.secondaries ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Secondaries' })} style={{ color: poiButtons.selection === 'Secondaries' ? '#FFA7E5' : 'black' }}>Secondaries</h5> : ''}
                          {property.colleges ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Colleges' })} style={{ color: poiButtons.selection === 'Colleges' ? '#FFA7E5' : 'black' }}>Colleges</h5> : ''}
                        </div>
                      </>
                    )
                  })}

                </>
                : ''}

              <ReactMapGL {...viewport}
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                mapStyle='mapbox://styles/mapbox/streets-v11'
                onViewportChange={viewport => {
                  setViewport(viewport)
                }}
                center={viewport}
                onMove={evt => setViewport(evt.viewport)}>
                {properties ?
                  <div className='poi-icons'>
                    {properties.map(property => {
                      return (
                        <>
                          <Marker longitude={property.long} latitude={property.Lat} key={id} titleAccess={property.property_name} id='house-icon' >
                            {/* <div className='house-background'> */}
                            <div className='house-btn'></div>
                            {/* </div> */}
                          </Marker>
                          {poiButtons.selection === 'Restaurants' ?
                            <div className='poi-icons'>
                              {property.restaurants.map((icon, index) => {
                                return (
                                  <>
                                    <div key={icon._id}>
                                      <Marker id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat}>
                                        <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                          <div className='restaurant-btn' id={icon.id}>
                                          </div>
                                        </div>
                                      </Marker>
                                      {(showPopup & icon.id === iconId) && (
                                        <Popup key={index} id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat} closeOnClick={false}>
                                          <h1>{icon.restaurant_name}</h1>
                                          <h4>{icon.master_cuisine}</h4>
                                          <h4>{icon.rating}/5</h4>
                                        </Popup>
                                      )}
                                    </div>
                                  </>
                                )
                              })}
                            </div>
                            : ''}
                          {poiButtons.selection === 'Pubs' ?
                            <div className='poi-icons'>
                              {property.bars.map((icon, index) => {
                                return (
                                  <div key={icon._id}>
                                    <Marker id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat}>
                                      <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                        <div className='pubs-btn' id={icon.id}>
                                        </div>
                                      </div>
                                    </Marker>
                                    {(showPopup & icon.id === iconId) && (
                                      <Popup key={index} id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat} closeOnClick={false}>
                                        <h1>{icon.pub_name}</h1>
                                      </Popup>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                            : ''}
                          {poiButtons.selection === 'Cafes' ?
                            <div className='poi-icons'>
                              {property.cafes.map((icon, index) => {
                                return (
                                  <div key={icon._id}>
                                    <Marker id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat}>
                                      <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                        <div className='cafes-btn' id={icon.id}>
                                        </div>
                                      </div>
                                    </Marker>
                                    {(showPopup & icon.id === iconId) && (
                                      <Popup key={index} id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat} closeOnClick={false}>
                                        <h1>{icon.cafe_name}</h1>
                                      </Popup>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                            : ''}
                          {poiButtons.selection === 'Takeaways' ?
                            <div className='poi-icons'>
                              {property.takeaways.map((icon, index) => {
                                return (
                                  <div key={icon._id}>
                                    <Marker id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat}>
                                      <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                        <div className='restaurant-btn' id={icon.id}>
                                        </div>
                                      </div>
                                    </Marker>
                                    {(showPopup & icon.id === iconId) && (
                                      <Popup key={index} id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat} closeOnClick={false}>
                                        <h1>{icon.takeaway_name}</h1>
                                        <h4>{icon.cuisine}</h4>
                                        <h4>{icon.wittle_rating}/10</h4>
                                      </Popup>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                            : ''}
                          {poiButtons.selection === 'Tubes' ?
                            <div className='poi-icons'>
                              {property.tubes.map((icon, index) => {
                                return (
                                  <div key={icon._id}>
                                    <Marker id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat}>
                                      <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                        <div className='tubes-btn' id={icon.id}>
                                        </div>
                                      </div>
                                    </Marker>
                                    {(showPopup & icon.id === iconId) && (
                                      <Popup key={index} id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat} closeOnClick={false}>
                                        <h1>{icon.station_name}</h1>
                                        <h4>{icon.line}</h4>
                                      </Popup>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                            : ''}
                          {poiButtons.selection === 'Supermarkets' ?
                            <div className='poi-icons'>
                              {property.supermarkets.map((icon, index) => {
                                return (
                                  <div key={icon._id}>
                                    <Marker id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat}>
                                      <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                        <div className='supermarket-btn' id={icon.id}>
                                        </div>
                                      </div>
                                    </Marker>
                                    {(showPopup & icon.id === iconId) && (
                                      <Popup key={index} id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat} closeOnClick={false}>
                                        <h1>{icon.cleansed_name}</h1>
                                        <h4>{icon.size}</h4>
                                      </Popup>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                            : ''}
                          {poiButtons.selection === 'Gyms' ?
                            <div className='poi-icons'>
                              {property.gyms.map((icon, index) => {
                                return (
                                  <div key={icon._id}>
                                    <Marker id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat}>
                                      <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                        <div className='gyms-btn' id={icon.id}>
                                        </div>
                                      </div>
                                    </Marker>
                                    {(showPopup & icon.id === iconId) && (
                                      <Popup key={index} id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat} closeOnClick={false}>
                                        <h1>{icon.gym_name}</h1>
                                        <h4>{icon.gym_group}</h4>
                                        <h4>{icon.class_type}</h4>
                                      </Popup>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                            : ''}
                          {poiButtons.selection === 'Parks' ?
                            <div className='poi-icons'>
                              {property.parks.map((icon, index) => {
                                return (
                                  <div key={icon._id}>
                                    <Marker id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat}>
                                      <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                        <div className='parks-btn' id={icon.id}>
                                        </div>
                                      </div>
                                    </Marker>
                                    {(showPopup & icon.id === iconId) && (
                                      <Popup key={index} id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat} closeOnClick={false}>
                                        <h1>{icon.park_name}</h1>
                                        <h4>{icon.park_type}</h4>
                                      </Popup>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                            : ''}
                          {poiButtons.selection === 'Primaries' ?
                            <div className='poi-icons'>
                              {property.primaries.map((icon, index) => {
                                return (
                                  <div key={icon._id}>
                                    <Marker id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat}>
                                      <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                        <div className='primary-btn' id={icon.id}>
                                        </div>
                                      </div>
                                    </Marker>
                                    {(showPopup & icon.id === iconId) && (
                                      <Popup key={index} id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat} closeOnClick={false}>
                                        <h1>{icon.school_name}</h1>
                                        <h4>Ofsted: {icon.ofsted_results}</h4>
                                        <h4>{icon.religious_grouping}</h4>
                                      </Popup>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                            : ''}
                          {poiButtons.selection === 'Secondaries' ?
                            <div className='poi-icons'>
                              {property.secondaries.map((icon, index) => {
                                return (
                                  <div key={icon._id}>
                                    <Marker id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat}>
                                      <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                        <div className='primary-btn' id={icon.id}>
                                        </div>
                                      </div>
                                    </Marker>
                                    {(showPopup & icon.id === iconId) && (
                                      <Popup key={index} id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat} closeOnClick={false}>
                                        <h1>{icon.school_name}</h1>
                                        <h4>Ofsted: {icon.ofsted_results}</h4>
                                        <h4>{icon.religious_grouping}</h4>
                                      </Popup>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                            : ''}
                          {poiButtons.selection === 'Colleges' ?
                            <div className='poi-icons'>
                              {property.colleges.map((icon, index) => {
                                return (
                                  <div key={icon._id}>
                                    <Marker id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat}>
                                      <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                        <div className='primary-btn' id={icon.id}>
                                        </div>
                                      </div>
                                    </Marker>
                                    {(showPopup & icon.id === iconId) && (
                                      <Popup key={index} id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat} closeOnClick={false}>
                                        <h1>{icon.school_name}</h1>
                                        <h4>Ofsted: {icon.ofsted_results}</h4>
                                        <h4>{icon.religious_grouping}</h4>
                                      </Popup>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                            : ''}
                        </>
                      )
                    })}
                  </div>
                  : ''}
              </ReactMapGL>

            </div>
          </div>
          <div className='estate-details'>
            <h3>Managed by</h3>
            <div className='estate-image'></div>
            <h3>Contact us</h3>
            <button className='contact'>Get in touch</button>
            <h3>Call us</h3>
            <p>07771388710</p>
          </div>

        </section>

        {/* footer section to show contact details */}
        {contactButton === 'Open' ?
          <section className='contact-footer' style={{ height: '110px' }} >
            <div className='contact-title'>
              <h4 onClick={() => setContact('Closed')}>Contact Retties</h4>
            </div>
            <div className='contact-details'>
              <button>Email agent</button>
              <button>Call agent</button>
            </div>
            <div className='contact-bottom'>

            </div>
          </section>
          : contactButton === 'Closed' ?
            <section className='contact-footer' style={{ height: '70px' }} >
              <div className='contact-title'>
                <h4 onClick={() => setContact('Open')}>Contact Retties</h4>
              </div>
            </section>
            : ''}


      </section>

    </>
  )

}

export default SinglePropertyWittle