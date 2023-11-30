import React, { useState, useEffect, useInsertionEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import ReactMapGL, { Marker, Popup, Source, Layer } from 'react-map-gl'
import * as turf from '@turf/turf'
import Footer from '../../../tools/Footer'
import Loading from '../../../helpers/Loading'
import SingleSecondarySchool from '../variableDetails/SingleSecondarySchool'


const SecondaryDetails = ({ propertyData, secondaryData1, listType, setSecondaryData1, postcodeData, tableMapView, secondaryDetail, setSecondaryDetail, setSliderSelection, setPropertyView }) => {


  // ? Section 1: load states
  // state to enable navigation between pages
  const navigate = useNavigate()

  // state for storing new primary data 
  const [secondaryData2, setSecondaryData2] = useState([])


  const [selectedSchool, setSelectedSchool] = useState(null)

  // set sort fields
  const [sortField, setSortField] = useState(null)
  const [sortDirection, setSortDirection] = useState(null)


  // set search state
  const [searchTerm, setSearchTerm] = useState('')

  // states for handling the popups on the map
  const [showPopup, setShowPopup] = useState(true)
  const [iconId, setIconId] = useState()

  // control the states for maps
  const [viewport, setViewport] = useState({
    latitude: 51.515419,
    longitude: -0.141099,
    zoom: 11.5,
  })

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

  // trigger icon pop up
  const handleSchoolClick = (school) => {
    setSelectedSchool(school)
  }

  // set current page when you clicjk button for pagination
  const handlePageClick = (data) => {
    const { selected } = data
    setCurrentPage(selected)
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



  // ? Section3: Ability to sort data by different column names
  // function to sort data by column name
  const handleSort = (field) => {
    let direction = 'asc'

    if (sortField === field && sortDirection === 'asc') {
      direction = 'desc'
    }

    setSortField(field)
    setSortDirection(direction)

    const sortedData = [...secondaryData1].sort((a, b) => {
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

    setSecondaryData1(sortedData)
  }


  // ? Section 4: Table search
  // function for searching the table
  const handleSearch = (term) => {
    if (term === '') {
      // if search term is empty, reset primaryData2 to be the same as secondaryData1
      setSecondaryData2([...secondaryData1])
    } else {
      setSecondaryData2(
        secondaryData1.filter(item => {
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
    if (secondaryData1) {
      handleSearch(searchTerm)
    }
  }, [searchTerm, secondaryData1])


  // function to go to the school
  const goToSecondary = (id) => {
    setPropertyView('Details')
    setSecondaryDetail('School')
    setSliderSelection('Secondary schools')
    window.localStorage.setItem('school-id', id)
    console.log(id)
  }

  return (

    <>
      {secondaryData1 && secondaryDetail === 'Table' ?
        <section className="primary-details-section">
          {tableMapView === 'Table' ?
            <div className='school-block'>
              <div className='school-table-headers'>
                <h5 id='column1'>#</h5>
                <div id='column2' className='sort-section' onClick={() => handleSort('school_name')}>
                  <h5>School name</h5>
                  <h5 className='sort-button'>↕️</h5>
                </div>
                <h5 id='column3'>Local authority</h5>
                <h5 id='column4'>Type</h5>
                <div id='column5' className='sort-section' onClick={() => handleSort('ofsted_results')}>
                  <h5>Ofsted</h5>
                  <h5 className='sort-button'>↕️</h5>
                </div>
                <div id='column6' className='sort-section' onClick={() => handleSort('total_pass_rate')}>
                  <h5>GCSE pass rate</h5>
                  <h5 className='sort-button'>↕️</h5>
                </div>
                <div id='column7' className='sort-section' onClick={() => handleSort('total_top_rate')}>
                  <h5>GCSE A/A*</h5>
                  <h5 className='sort-button'>↕️</h5>
                </div>
                {listType === 'short list' ?
                  <>
                    <h5 id='column8'>Catchment</h5>
                    <div id='column9' className='sort-section' onClick={() => handleSort('distance_between')}>
                      <h5>Dist</h5>
                      <h5 className='sort-button'>↕️</h5>
                    </div>
                  </>

                  : listType === 'long list' ?
                    <>
                      <div id='column8' className='sort-section' onClick={() => handleSort('max_distance')}>
                        <h5>Catchment distance</h5>
                        <h5 className='sort-button'>↕️</h5>
                      </div>
                    </>
                    : ''}
              </div>
              <div className='school-table-details'>
                {secondaryData2 ? secondaryData2.map((item, index) => {
                  return (
                    <>
                      <div className='school-content'>
                        <div className='column' id='column1'>
                          <h5>{index + 1}</h5>
                        </div>
                        <div className='column' id='column2'>
                          <h5 onClick={() => goToSecondary(item.id)}>{item.school_name}</h5>
                        </div>
                        <div className='column' id='column3'>
                          <h5>{item.local_authority}</h5>
                        </div>
                        <div className='column' id='column4'>
                          <h5>{item.school_type}</h5>
                        </div>
                        <div className='column' id='column5'>
                          <h5>{item.ofsted_results === null ? 'N/a' : item.ofsted_results}</h5>
                        </div>
                        <div className='column' id='column6'>
                          <h5>{(item.total_pass_rate === null ? 'N/a' : item.total_pass_rate)}</h5>
                        </div>
                        <div className='column' id='column7'>
                          <h5>{(item.total_top_rate === null ? 'N/a' : item.total_top_rate)}</h5>
                        </div>
                        {listType === 'short list' ?
                          <>
                            <div className='column' id='column8'>
                              <h5>{item.within_catchment}</h5>
                            </div><div className='column' id='column9'>
                              <h5>{item.walkTimeMin} mins</h5>
                            </div>
                          </>
                          : listType === 'long list' ?
                            <div className='column' id='column8'>
                              <h5>{item.school_type === 'Independent school' ? 'N/a' : item.max_distance}</h5>
                            </div>
                            : ''
                        }
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
                    {secondaryData2 ? secondaryData2.map((item, index) => {
                      return (
                        <>
                          <div className='school-content'>

                            <div className='grid-right' id={item.id} onMouseEnter={iconSetting} >
                              <h5 className='title'>{index + 1}. {item.school_name}</h5>
                              <div className='details'>
                                <div className='icon' id='secondaries'></div>
                                <h5>{item.school_type}</h5>
                              </div>
                              <div className='details'>
                                <div className='icon' id='ofsted'></div>
                                <h5>{item.ofsted_results}</h5>
                              </div>
                              <div className='details'>
                                <div className='icon' id='catchment'></div>
                                <h5>{item.within_catchment}</h5>
                              </div>
                              <div className='details'>
                                <div className='icon' id='distance'></div>
                                <h5>{item.walkTimeMin} mins</h5>
                              </div>
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
                      {secondaryData2 &&
                        secondaryData2.map((item, index) => (
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

                      {selectedSchool && !['Does not apply', 'Check', 'Religion', null].includes(selectedSchool.max_distance) ?
                        <>
                          <Source
                            id="catchment-area"
                            type="geojson"
                            data={turf.circle([selectedSchool.longitude, selectedSchool.latitude], selectedSchool.max_distance, { units: 'kilometers' })}
                          >
                            <Layer
                              id="catchment-area-ring"
                              type="fill"
                              paint={{
                                'fill-color': '#FFA7E5',
                                'fill-opacity': 0.3,
                              }} />
                            <Layer
                              id="catchment-area-outline"
                              type="line"
                              paint={{
                                'line-color': '#FFA7E5',
                                'line-width': 2,
                              }} />
                          </Source>
                          <Source
                            id="radius-line"
                            type="geojson"
                            data={turf.lineString([[selectedSchool.longitude, selectedSchool.latitude],
                              turf.destination([selectedSchool.longitude, selectedSchool.latitude], selectedSchool.max_distance, 90, { units: 'kilometers' }).geometry.coordinates])}
                          >
                            <Layer
                              id="radius"
                              type="line"
                              paint={{
                                'line-color': '#051885',
                                'line-width': 2,
                                'line-dasharray': [2, 1],
                              }} />
                          </Source>
                          <Source
                            id="radius-label"
                            type="geojson"
                            data={turf.destination([selectedSchool.longitude, selectedSchool.latitude], selectedSchool.max_distance / 2, 90, { units: 'kilometers' })}
                          >
                            <Layer
                              id="radius-label"
                              type="symbol"
                              layout={{
                                'text-field': `${selectedSchool.max_distance} km`,
                                'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
                                'text-size': 12,
                                'text-offset': [0, -1],
                              }}
                              paint={{
                                'text-color': '#051885',

                              }}
                            />
                          </Source>
                        </>
                        : selectedSchool ?
                          <Popup
                            longitude={selectedSchool.longitude}
                            latitude={selectedSchool.latitude}
                            closeOnClick={false}
                            className="item-popup"
                            onClose={() => setSelectedSchool(null)}
                          >
                            <div className="popup-content">

                              <div className='popup-border'>
                                <h5 className='title'>This school has no catchment area</h5>
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
          {secondaryData2 ?
            <ReactPaginate
              pageCount={Math.ceil(secondaryData2.length / 10)}
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
        : secondaryDetail === 'School' ?
          <SingleSecondarySchool />
          :
          <section className='loading-screen'>
            <Loading />
          </section>
      }
    </>
  )
}

export default SecondaryDetails