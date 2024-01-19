import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import ReactMapGL, { Marker, Popup, Source, Layer } from 'react-map-gl'
import circle from '@turf/circle'
import destination from '@turf/destination'
import Footer from '../../../tools/Footer'
import Loading from '../../../helpers/Loading'
import SinglePrimarySchool from '../variableDetails/SinglePrimarySchool'



const PrimaryDetails = ({ primaryData1, listType, setPrimaryData1, postcodeData, tableMapView, primaryDetail, setPrimaryDetail, setSliderSelection, setPropertyView }) => {

  // ? Section 1: load states
  // state to enable navigation between pages
  const navigate = useNavigate()

  // states for handling the view type
  // const [tableMapView, setPrimaryView] = useState('Table')

  // state for storing new primary data 
  const [primaryData2, setPrimaryData2] = useState([])


  // set search state
  const [searchTerm, setSearchTerm] = useState('')


  // control the states for maps
  const [viewport, setViewport] = useState({
    latitude: 51.515419,
    longitude: -0.141099,
    zoom: 11.5,
  })

  const [selectedSchool, setSelectedSchool] = useState(null)


  // set sort fields
  const [sortField, setSortField] = useState(null)
  const [sortDirection, setSortDirection] = useState(null)


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

  // set current page when you clicjk button for pagination
  const handleSchoolClick = (school) => {
    setSelectedSchool(school)
    console.log(school.longitude)
    console.log(school.latitude)
    console.log(school.max_distance)
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

    const sortedData = [...primaryData1].sort((a, b) => {
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

    setPrimaryData1(sortedData)
  }



  // ? Section 4: Table search
  // function for searching the table
  const handleSearch = (term) => {
    if (term === '') {
      // if search term is empty, reset primaryData2 to be the same as primaryData1
      setPrimaryData2([...primaryData1])
    } else {
      setPrimaryData2(
        primaryData1.filter(item => {
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
    if (primaryData1) {
      handleSearch(searchTerm)
    }
  }, [searchTerm, primaryData1])


  // function to go to the school
  const goToPrimary = (id) => {
    setPropertyView('Details')
    setPrimaryDetail('School')
    setSliderSelection('Primary schools')
    window.localStorage.setItem('school-id', id)
    console.log(id)
  }


  return (
    <>
      {primaryData1 && primaryDetail === 'Table' ?
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
                <div id='column6' className='sort-section' onClick={() => handleSort('pupils_at_standard')}>
                  <h5>At standard</h5>
                  <h5 className='sort-button'>↕️</h5>
                </div>
                <div id='column7' className='sort-section' onClick={() => handleSort('pupils_exceeding_standard')}>
                  <h5>Exceeding standard</h5>
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
                {primaryData2 ? primaryData2.map((item, index) => {
                  return (
                    <>
                      <div className='school-content'>
                        <div className='column' id='column1'>
                          <h5>{index + 1}</h5>
                        </div>
                        <div className='column' id='column2'>
                          <h5 onClick={() => goToPrimary(item.id)}>{item.school_name}</h5>
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
                          {item.school_type === 'Independent school' ? <h5>N/a</h5> : <h5>{Math.round(item.pupils_at_standard * 100)}%</h5>}
                        </div>
                        <div className='column' id='column7'>
                          {item.school_type === 'Independent school' ? <h5>N/a</h5> : <h5>{Math.round(item.pupils_exceeding_standard * 100)}%</h5>}
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
                              {item.max_distance !== null ? <h5>{item.max_distance}</h5> : <h5>Not specified</h5>}
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
                    {primaryData2 ? primaryData2.map((item, index) => {
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
                                <h5>{item.ofsted_results === null ? 'N/a' : item.ofsted_results}</h5>
                              </div>
                              {listType === 'short list' ?
                                <>
                                  <div className='details'>
                                    <div className='icon' id='catchment'></div>
                                    <h5>{item.within_catchment}</h5>
                                  </div>
                                  <div className='details'>
                                    <div className='icon' id='distance'></div>
                                    <h5>{item.walkTimeMin} mins</h5>
                                  </div>
                                </>
                                : listType === 'long list' ?
                                  <div className='details'>
                                    <div className='icon' id='distance'></div>
                                    <h5>{item.walkTimeMin} mins</h5>
                                  </div>
                                  : ''}
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
                      {primaryData2 &&
                        primaryData2.map((item, index) => (
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

                      {selectedSchool && !['Does not apply', 'Check', 'Religion', 'On request', 'N/a', null].includes(selectedSchool.max_distance) ?
                        <>
                          {
                            typeof parseFloat(selectedSchool.longitude) === 'number' &&
                              typeof parseFloat(selectedSchool.latitude) === 'number' &&
                              typeof parseFloat(selectedSchool.max_distance) === 'number'
                              ?
                              <>
                                <Source
                                  id="catchment-area"
                                  type="geojson"
                                  data={circle([parseFloat(selectedSchool.longitude), parseFloat(selectedSchool.latitude)], parseFloat(selectedSchool.max_distance), { units: 'kilometers' })}
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
                                  data={destination([selectedSchool.longitude, selectedSchool.latitude], selectedSchool.max_distance, 90, { units: 'kilometers' }).geometry.coordinates}
                                >
                                  {/* data={lineString([[selectedSchool.longitude, selectedSchool.latitude],
                              destination([selectedSchool.longitude, selectedSchool.latitude], selectedSchool.max_distance, 90, { units: 'kilometers' }).geometry.coordinates])}
                          > */}
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
                                  data={destination([parseFloat(selectedSchool.longitude), parseFloat(selectedSchool.latitude)], parseFloat(selectedSchool.max_distance) / 2, 90, { units: 'kilometers' })}
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
                              :
                              <p>Invalid coordinates or distance.</p>
                          }
                        </>


                        : selectedSchool ?
                          <Popup
                            longitude={parseFloat(selectedSchool.longitude)}
                            latitude={parseFloat(selectedSchool.latitude)}
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
          {primaryData2 ?
            <ReactPaginate
              pageCount={Math.ceil(primaryData2.length / 10)}
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
        : primaryDetail === 'School' ?
          <SinglePrimarySchool />

          :
          <section className='loading-screen'>
            {/* <h1>Pub data loading...</h1> */}
            <Loading />
          </section>
      }

    </>
  )
}

export default PrimaryDetails



