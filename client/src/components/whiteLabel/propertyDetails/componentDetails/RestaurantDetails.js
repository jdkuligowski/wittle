import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import ReactMapGL, { Marker, Popup, Source, Layer } from 'react-map-gl'
import Footer from '../../../tools/Footer'
import Loading from '../../../helpers/Loading'



const RestaurantDetails = ({ restaurants1, listType, setRestaurants1, postcodeData, tableMapView }) => {

  // ? Section 1: load states
  // state to enable navigation between pages
  const navigate = useNavigate()



  // control the states for maps
  const [viewport, setViewport] = useState({
    latitude: 51.515419,
    longitude: -0.141099,
    zoom: 11.5,
  })

  const [selectedRestaurants, setSelectdRestaurant] = useState(null)


  // state for storing new supermarket data 
  const [restaurants2, setRestaurants2] = useState([])


  // set sort fields
  const [sortField, setSortField] = useState(null)
  const [sortDirection, setSortDirection] = useState(null)

  // set search state
  const [searchTerm, setSearchTerm] = useState('')


  // states for handling the popups on the map
  const [showPopup, setShowPopup] = useState(true)
  const [iconId, setIconId] = useState()


  // pagination on map
  const ITEMS_PER_PAGE = 10
  const [currentPage, setCurrentPage] = useState(0)
  const startIndex = currentPage * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE


  // ? Section 2: Functions relating to the map
  // set pop up icon
  const iconSetting = (e) => {
    setShowPopup(true)
    console.log(showPopup)
    setIconId(parseInt(e.target.id))
    console.log(parseInt(e.target.id))
  }

  // set current page when you click icon
  const handleSchoolClick = (restaurant) => {
    console.log('selectd restaurant ->', restaurant)
    setSelectdRestaurant(restaurant)
  }

  // load in viewport data based on location of the property
  useEffect(() => {
    if (postcodeData) {
      setViewport((prevViewport) => ({
        ...prevViewport,
        latitude: postcodeData[0].longitude,
        longitude: postcodeData[0].latitude,
        zoom: 12.5,
      }))
    }
  }, [postcodeData])


  // set current page when you clicjk button for pagination
  const handlePageClick = (data) => {
    const { selected } = data
    setCurrentPage(selected)
  }


  // ? Section 3: Functinos for sorting table headers
  const handleSort = (field) => {
    let direction = 'asc'

    if (sortField === field && sortDirection === 'asc') {
      direction = 'desc'
    }

    setSortField(field)
    setSortDirection(direction)

    const sortedData = [...restaurants1].sort((a, b) => {
      if (!isNaN(a[field]) && !isNaN(b[field])) {
        return direction === 'asc' ? a[field] - b[field] : b[field] - a[field]
      }

      if (a[field] < b[field]) {
        return direction === 'asc' ? -1 : 1
      }

      if (a[field] > b[field]) {
        return direction === 'asc' ? 1 : -1
      }

      return 0
    })

    setRestaurants1(sortedData)
  }



  // ? Section 4: Table search
  // function for searching the table
  const handleSearch = (term) => {
    if (term === '') {
      // if search term is empty, reset primaryData2 to be the same as restaurants2
      setRestaurants2([...restaurants1])
    } else {
      setRestaurants2(
        restaurants1.filter(item => {
          return (
            item.restaurant_name.toLowerCase().includes(term.toLowerCase())
          )
        })
      )
    }
  }

  useEffect(() => {
    if (restaurants1) {
      handleSearch(searchTerm)
    }
  }, [searchTerm, restaurants1])



  return (
    <>
      {restaurants1 ?
        <section className="primary-details-section">

          {tableMapView === 'Table' ?
            <div className='school-block'>
              <div className='school-table-headers'>
                <h5 id='column1'>#</h5>
                <div id='column2' className='sort-section' onClick={() => handleSort('restaurant_name')}>
                  <h5>Restaurant name</h5>
                  <h5 className='sort-button'>↕️</h5>
                </div>
                <div id='column3' className='sort-section' onClick={() => handleSort('rating')}>
                  <h5>Rating</h5>
                  <h5 className='sort-button'>↕️</h5>
                </div>
                {listType === 'short list' ?
                  <div id='column4' className='sort-section' onClick={() => handleSort('walkTimeMin')}>
                    <h5>Distance</h5>
                    <h5 className='sort-button'>↕️</h5>
                  </div> :
                  <h5 id='column4'></h5>
                }

                <h5 id='column5'>Website</h5>
              </div>
              <div className='school-table-details'>
                {restaurants2 ? restaurants2.map((item, index) => {
                  return (
                    <>
                      <div className='school-content'>
                        <div className='column' id='column1'>
                          <h5>{index + 1}</h5>
                        </div>
                        <div className='column' id='column2'>
                          <h5>{item.restaurant_name}</h5>
                        </div>
                        <div className='column' id='column3'>
                          <h5>{item.rating > 4.8 ? 'Excellent' : item.rating > 4.5 ? 'Very good' : item.rating > 4.2 ? 'Good' : item.rating > 3.9 ? 'Average' : item.rating > 0 ? 'Poor' : 'N/a'}</h5>
                        </div>

                        <div className='column' id='column4'>
                          {listType === 'short list' ?
                            <h5>{item.walkTimeMin} mins </h5>
                            :
                            <h5></h5>
                          }
                        </div>
                        <div className='column' id='column5'>
                          <a target="_blank" rel='noreferrer' href={item.url}>Visit website</a>
                        </div>

                      </div>
                      <hr className="dividing-line" />

                    </>
                  )
                }).slice(startIndex, endIndex) : ''}
              </div>

            </div>




            : tableMapView === 'Map' ?

              <div className='school-block'>
                <div className='map-grid-view'>


                  <div className='grid-list'>
                    {restaurants2 ? restaurants2.map((item, index) => {
                      return (
                        <>
                          <div className='school-content'>

                            <div className='grid-right' id={item.id} onMouseEnter={iconSetting} >
                              <h5 className='title'>{index + 1}. {item.restaurant_name}</h5>
                              <div className='details'>
                                <div className='icon' id='catchment'></div>
                                <h5>{item.rating > 4.8 ? 'Excellent' : item.rating > 4.5 ? 'Very good' : item.rating > 4.2 ? 'Good' : item.rating > 3.9 ? 'Average' : item.rating > 0 ? 'Poor' : 'N/a'}</h5>
                              </div>
                              {listType === 'short list' ?
                                <div className='details'>
                                  <div className='icon' id='distance'></div>
                                  <h5>{item.walkTimeMin} mins</h5>
                                </div> : ''}
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
                      {restaurants2 &&
                        restaurants2.map((item, index) => (
                          <Marker
                            key={index}
                            id={item.id}
                            longitude={item.longitude}
                            latitude={item.latitude}
                            onClick={() => handleSchoolClick(item)}
                          >
                            <div className="poi-background">{index + 1}</div>
                          </Marker>
                        )).slice(startIndex, endIndex)}
                      {postcodeData &&
                        <Marker
                          id={postcodeData[0].id}
                          longitude={postcodeData[0].latitude}
                          latitude={postcodeData[0].longitude}
                        >
                          {/* <div className="poi-background">99</div> */}
                          <h1 className='property-icon'>🏠</h1>

                        </Marker>}

                      {selectedRestaurants ?
                        <Popup
                          longitude={selectedRestaurants.longitude}
                          latitude={selectedRestaurants.latitude}
                          closeOnClick={false}
                          className="item-popup"
                          onClose={() => setSelectdRestaurant(null)}

                        >
                          <div className="popup-content">

                            <div className='popup-border'>
                              <h5 className='title'>{selectedRestaurants.restaurant_name}</h5>
                              <p>{selectedRestaurants.master_cuisine}</p>
                              {/* <p>{selectedRestaurants.rating} /5</p> */}
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
          {restaurants2 ?
            <ReactPaginate
              pageCount={Math.ceil(restaurants2.length / 10)}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              activeClassName={'active'}
              previousLabel={'<'}
              nextLabel={'>'}
              pageRangeDisplayed={0}
              breakLabel={'...'}
            />
            : ''}


        </section>
        :
        <section className='loading-screen'>
          <Loading />
        </section>
      }
    </>
  )
}

export default RestaurantDetails



