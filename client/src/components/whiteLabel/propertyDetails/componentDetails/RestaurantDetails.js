import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import ReactMapGL, { Marker, Popup, Source, Layer } from 'react-map-gl'
import * as turf from '@turf/turf'
import Footer from '../../../tools/Footer'



const RestaurantDetails = ({ propertyData, restaurants1, listType, setRestaurants1 }) => {


  // state to enable navigation between pages
  const navigate = useNavigate()

  // states for handling the view type
  const [restaurantView, setRestaurantView] = useState('Table')


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
  const ITEMS_PER_PAGE = 50
  const [currentPage, setCurrentPage] = useState(0)


  const iconSetting = (e) => {
    setShowPopup(true)
    console.log(showPopup)
    setIconId(parseInt(e.target.id))
    console.log(parseInt(e.target.id))
  }

  
  const handleSchoolClick = (restaurant) => {
    setSelectdRestaurant(restaurant)
  }



  useEffect(() => {
    if (restaurants1) {
      setViewport((prevViewport) => ({
        ...prevViewport,
        latitude: restaurants1[0].lat,
        longitude: restaurants1[0].long,
        zoom: 12.5,
      }))
    }
  }, [restaurants1])



  // set current page when you clicjk button for pagination
  const handlePageClick = (data) => {
    const { selected } = data
    setCurrentPage(selected)
  }

  const startIndex = currentPage * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE



  // ? Section3: Other useful functions

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
      setRestaurants2([...restaurants2])
    } else {
      setRestaurants2(
        restaurants2.filter(item => {
          return (
            item.school_name.toLowerCase().includes(term.toLowerCase()) ||
            item.local_authority.toLowerCase().includes(term.toLowerCase()) ||
            item.school_type.toLowerCase().includes(term.toLowerCase()) ||
            item.ofsted_results && item.ofsted_results.toString().toLowerCase().includes(term.toLowerCase()) ||
            item.total_pass_rate && item.total_pass_rate.toString().toLowerCase().includes(term.toLowerCase()) ||
            item.total_top_rate && item.total_top_rate.toString().toLowerCase().includes(term.toLowerCase()) ||
            (listType === 'short list' && item.within_catchment.toLowerCase().includes(term.toLowerCase())) ||
            (listType === 'short list' && item.walkTimeMin && item.walkTimeMin.toString().toLowerCase().includes(term.toLowerCase())) ||
            (listType === 'long list' && item.max_distance && item.max_distance.toString().toLowerCase().includes(term.toLowerCase()))
          )
        })
      )
    }
  }
  
  useEffect(() => {
    handleSearch(searchTerm)
  }, [searchTerm, restaurants2])

  

  return (
    <>
      <section className="primary-details-section">
        <div className='title-buttons'>
          {propertyData ? <h1 className="primary-title">Restaurant details near {propertyData.name} </h1> : <h1>Restaurants long list</h1> }
          <div className='icon-selector-section'>
            <div className='icon-selector'>
              <div className='table-icon' onClick={(e) => setRestaurantView('Table')} ></div>

            </div>
            <div className='icon-selector'>
              <div className='map-icon' onClick={(e) => setRestaurantView('Map')} ></div>
            </div>
          </div>
        </div>

        {restaurantView === 'Table' ?
          <div className='school-block'>
            <div className='school-table-headers'>
              <h5 id='column1'>#</h5>
              <div id='column2' className='sort-section' onClick={() => handleSort('restaurant_name')}>
                <h5>Restaurant name</h5>
                <h5 className='sort-button'>↕️</h5>
              </div> 
              <div id='column3' className='sort-section' onClick={() => handleSort('rating')}>
                <h5>Rating (/5)</h5>
                <h5 className='sort-button'>↕️</h5>
              </div>             
              {listType === 'short list' ?
                <div id='column4' className='sort-section' onClick={() => handleSort('walkTimeMin')}>
                  <h5>Distance</h5>
                  <h5 className='sort-button'>↕️</h5>
                </div>                  :
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
                        <h5>{item.rating}</h5>
                      </div>
                      
                      <div className='column' id='column4'>
                        {listType === 'short list' ?
                          <h5>{item.walkTimeMin} mins </h5>
                          :
                          <h5></h5>
                        }
                      </div>
                      <div className='column' id='column5'>
                        <a href={item.url}>Visit website</a>
                      </div>
                
                    </div>
                    <hr className="dividing-line" />
        
                  </>
                )
              }).slice(startIndex, endIndex) : ''}
            </div>

          </div>




          : restaurantView === 'Map' ?

            <div className='school-block'>
              <div className='map-grid-view'>


                <div className='grid-list'>
                  {restaurants2 ? restaurants2.map((item, index) => {
                    return (
                      <>
                        <div className='school-content'>
                          <div className='grid-left'>
                            <h5>{index + 1}</h5>

                          </div>
                          <div className='grid-right' id={item.id} onMouseEnter={iconSetting} >
                            <h5 className='title'>{item.restaurant_name}</h5>
                            <h5>📈 Rating: {item.rating} /5</h5>
                            {listType === 'short list' ?
                              <h5>🌐 Distance: {item.walkTimeMin} mins</h5>
                              : '' }
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
                    mapStyle="mapbox://styles/mapbox/outdoors-v12"
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
                        longitude={item.long}
                        latitude={item.lat}
                        onClick={() => handleSchoolClick(item)}
                      >
                        <div className="poi-background">{index + 1}</div>
                      </Marker>
                    )).slice(startIndex, endIndex)}
                  </ReactMapGL>
                </div>
              </div>



            </div>

            : '' }
        {restaurants2 ? 
          <ReactPaginate
            pageCount={Math.ceil(restaurants2.length / 50)}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
            previousLabel={'<'}
            nextLabel={'>'}
            pageRangeDisplayed={0}
            breakLabel={'...'}
          />
          : '' }

        
      </section>
    </>
  )
}

export default RestaurantDetails



