import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import ReactMapGL, { Marker, Popup, Source, Layer } from 'react-map-gl'
import * as turf from '@turf/turf'
import Footer from '../../../tools/Footer'
import Loading from '../../../helpers/Loading'



const SupermarketDetails = ({ propertyData, supermarkets1, listType, setSupermarkets1, postcodeData, tableMapView }) => {

  // ? Section 1: load states
  // state to enable navigation between pages
  const navigate = useNavigate()

  // state for storing new supermarket data 
  const [supermarkets2, setSupermarkets2] = useState([])

  // state for clicking the supermnarkewt icon
  const [selectedSupermarkets, setSelectedSupermarkts] = useState()

  // set sort fields
  const [sortField, setSortField] = useState(null)
  const [sortDirection, setSortDirection] = useState(null)

  // set search state
  const [searchTerm, setSearchTerm] = useState('')

  // control the states for maps
  const [viewport, setViewport] = useState({
    latitude: 51.515419,
    longitude: -0.141099,
    zoom: 11.5,
  })

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
  const handleSupermarketClick = (supermarket) => {
    console.log('selectd supermarket ->', supermarket)
    setSelectedSupermarkts(supermarket)
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
  
    const sortedData = [...supermarkets1].sort((a, b) => {
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
  
    setSupermarkets1(sortedData)
  }




  // ? Section 4: Table search
  // function for searching the table
  const handleSearch = (term) => {
    if (term === '') {
      // if search term is empty, reset primaryData2 to be the same as supermarkets1
      setSupermarkets2([...supermarkets1])
    } else {
      setSupermarkets2(
        supermarkets1.filter(item => {
          return (
            item.cleansed_name.toLowerCase().includes(term.toLowerCase()) ||
            item.segment.toLowerCase().includes(term.toLowerCase()) ||
            item.size.toLowerCase().includes(term.toLowerCase()) 
          )
        })
      )
    }
  }
  
  useEffect(() => {
    if (supermarkets1) {
      handleSearch(searchTerm)
    }
  }, [searchTerm, supermarkets1])

  

  return (
    <>
      {supermarkets1 ?
        <section className="primary-details-section">

          {tableMapView === 'Table' ?
            <div className='school-block'>
              <div className='school-table-headers'>
                <h5 id='column1'>#</h5>
                <div id='column2' className='gym-name sort-section' onClick={() => handleSort('supermarket_store_name')}>
                  <h5>Supermarket name</h5>
                  <h5 className='sort-button'>↕️</h5>
                </div>             
                <div id='column3' className='sort-section supermarket' onClick={() => handleSort('segment')}>
                  <h5>Segment</h5>
                  <h5 className='sort-button'>↕️</h5>
                </div>  
                <div id='column4' className='sort-section' onClick={() => handleSort('store_size')}>
                  <h5>Size</h5>
                  <h5 className='sort-button'>↕️</h5>
                </div> 
                {listType === 'short list' ?
                  <div id='column5' className='sort-section' onClick={() => handleSort('walkTimeMin')}>
                    <h5>Distance</h5>
                    <h5 className='sort-button'>↕️</h5>
                  </div>                
                  :
                  <h5 id='column5'></h5>
                }

              </div>
              <div className='school-table-details'>
                {supermarkets2 ? supermarkets2.map((item, index) => {
                  return (
                    <>
                      <div className='school-content'>
                        <div className='column' id='column1'>
                          <h5>{index + 1}</h5>
                        </div>
                        <div className='column gym-name' id='column2'>
                          <h5>{item.supermarket_store_name}</h5>
                        </div>
                        <div className='column supermarket' id='column3'>
                          <h5>{item.segment}</h5>
                        </div>
                        <div className='column' id='column4'>
                          <h5>{item.store_size}</h5>
                        </div>
                      
                        <div className='column' id='column5'>
                          {listType === 'short list' ?
                            <h5>{item.walkTimeMin} mins</h5>
                            :
                            <h5></h5>
                          }
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
                    {supermarkets2 ? supermarkets2.map((item, index) => {
                      return (
                        <>
                          <div className='school-content'>
                            <div className='grid-left'>
                              <h5>{index + 1}</h5>

                            </div>
                            <div className='grid-right' id={item.id} onMouseEnter={iconSetting} >
                              <h5 className='title'>{item.supermarket_store_name}</h5>
                              <h5>{item.store_size}</h5>
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
                      {supermarkets2 &&
                    supermarkets2.map((item, index) => (
                      <Marker
                        key={index}
                        id={item.id}
                        longitude={item.longitude}
                        latitude={item.latitude}
                        onClick={() => handleSupermarketClick(item)}

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
                      {selectedSupermarkets ? 
                        <Popup
                          longitude={selectedSupermarkets.longitude}
                          latitude={selectedSupermarkets.latitude}
                          closeOnClick={false}
                          className="item-popup"
                          onClose={() => setSelectedSupermarkts(null)} 

                        >
                          <div className="popup-content">

                            <div className='popup-border'>
                              <h5 className='title'>{selectedSupermarkets.supermarket_store_name}</h5>
                              <p>{selectedSupermarkets.store_size}</p>
                            </div>                      
                          </div>
                        </Popup>
                        : ''
                      }
                    </ReactMapGL>
                  </div>
                </div>



              </div>

              : '' }
          {supermarkets2 ? 
            <ReactPaginate
              pageCount={Math.ceil(supermarkets2.length / 10)}
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
        : 
        <section className='loading-screen'>
          <Loading />
        </section>
      }
    </>
  )
}

export default SupermarketDetails



