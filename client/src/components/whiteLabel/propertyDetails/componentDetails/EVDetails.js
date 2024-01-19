import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import ReactMapGL, { Marker, Popup, Source, Layer } from 'react-map-gl'
import Footer from '../../../tools/Footer'
import Loading from '../../../helpers/Loading'



const EVDetails = ({ ev1, listType, setEv1, postcodeData, tableMapView }) => {

  // ? Section 1: load states
  // state to enable navigation between pages
  const navigate = useNavigate()


  // state for storing new supermarket data 
  const [ev2, setEv2] = useState([])

  // set sort fields
  const [sortField, setSortField] = useState(null)
  const [sortDirection, setSortDirection] = useState(null)

  // set state for icon selection
  const [selectedEvs, setSelectedEvs] = useState()

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
  const ITEMS_PER_PAGE = 50
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
  const handleEvClick = (gym) => {
    console.log('selectd gym ->', gym)
    setSelectedEvs(gym)
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

    const sortedData = [...ev1].sort((a, b) => {
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

    setEv1(sortedData)
  }



  // ? Section 4: Table search
  // function for searching the table
  const handleSearch = (term) => {
    if (term === '') {
      // if search term is empty, reset primaryData2 to be the same as ev2
      setEv2([...ev1])
    } else {
      setEv2(
        ev1.filter(item => {
          return (
            item.location.toLowerCase().includes(term.toLowerCase()) ||
            // item.power.toLowerCase().includes(term.toLowerCase()) ||
            item.fast_charging.toLowerCase().includes(term.toLowerCase())
          )
        })
      )
    }
  }

  useEffect(() => {
    if (ev1) {
      handleSearch(searchTerm)
    }
  }, [searchTerm, ev1])



  return (
    <>
      {ev1 ?
        <section className="primary-details-section">

          {tableMapView === 'Table' ?
            <div className='school-block'>
              <div className='school-table-headers'>
                <h5 id='column1'>#</h5>
                <div id='column2' className='gym-name sort-section' onClick={() => handleSort('location')}>
                  <h5>Charger location</h5>
                  <h5 className='sort-button'>↕️</h5>
                </div>
                <div id='column3' className='gym-group sort-section' onClick={() => handleSort('power')}>
                  <h5>Power</h5>
                  <h5 className='sort-button'>↕️</h5>
                </div>
                {listType === 'short list' ?
                  <div id='column4' className='sort-section' onClick={() => handleSort('walkTimeMin')}>
                    <h5>Distance</h5>
                    <h5 className='sort-button'>↕️</h5>
                  </div>
                  :
                  <h5 id='column4'></h5>
                }

                <h5 id='column5' className='gym-final'>Fast Charging</h5>
              </div>
              <div className='school-table-details'>
                {ev2 ? ev2.map((item, index) => {
                  return (
                    <>
                      <div className='school-content'>
                        <div className='column' id='column1'>
                          <h5>{index + 1}</h5>
                        </div>
                        <div className='column gym-name' id='column2'>
                          <h5>{item.location}</h5>
                        </div>
                        <div className='column gym-group' id='column3'>
                          <h5>{item.power} kW</h5>
                        </div>

                        <div className='column' id='column4'>
                          {listType === 'short list' ?
                            <h5>{item.walkTimeMin} mins</h5>
                            :
                            <h5></h5>
                          }
                        </div>
                        <div className='column gym-final' id='column5'>
                          <h5>{item.fast_charging}</h5>
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
                    {ev2 ? ev2.map((item, index) => {
                      return (
                        <>
                          <div className='school-content'>
                            <div className='grid-right' id={item.id} onMouseEnter={iconSetting} >
                              <h5 className='title'>{index + 1}. {item.location}</h5>
                              <div className='details'>
                                <div className='icon' id='evs'></div>
                                <h5>{item.power}kW</h5>
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
                      {ev2 &&
                        ev2.map((item, index) => (
                          <Marker
                            key={index}
                            id={item.id}
                            longitude={item.longitude}
                            latitude={item.latitude}
                            onClick={() => handleEvClick(item)}
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

                      {selectedEvs ?
                        <Popup
                          longitude={selectedEvs.longitude}
                          latitude={selectedEvs.latitude}
                          closeOnClick={false}
                          className="item-popup"
                          onClose={() => setSelectedEvs(null)}

                        >
                          <div className="popup-content">

                            <div className='popup-border'>
                              <h5 className='title'>{selectedEvs.location}</h5>
                              <p>⛽️ Power:{selectedEvs.power} kW</p>
                              <p>⛽️ Fast charging: {selectedEvs.fast_charging}</p>
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
          {ev2 ?
            <ReactPaginate
              pageCount={Math.ceil(ev2.length / 50)}
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

export default EVDetails



