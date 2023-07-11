import React, { useState, useEffect, useInsertionEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import ReactMapGL, { Marker, Popup, Source, Layer } from 'react-map-gl'
import * as turf from '@turf/turf'
import Footer from '../../../tools/Footer'


const SecondaryDetails = ({ propertyData, secondaryData1, listType }) => {

  // state to enable navigation between pages
  const navigate = useNavigate()


  // states for handling the view type
  const [secondaryView, setSecondaryView] = useState('Table')


  const [selectedSchool, setSelectedSchool] = useState(null)


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
  const ITEMS_PER_PAGE = 50
  const [currentPage, setCurrentPage] = useState(0)


  const iconSetting = (e) => {
    setShowPopup(true)
    console.log(showPopup)
    setIconId(parseInt(e.target.id))
    console.log(parseInt(e.target.id))
  }

  
  const handleSchoolClick = (school) => {
    setSelectedSchool(school)
  }

  const getGeoJSONCircle = (center, radiusInKm, points = 64) => {
    const coords = {
      latitude: center[1],
      longitude: center[0],
    }
  
    const distances = [radiusInKm]
  
    const data = {
      type: 'FeatureCollection',
      features: [],
    }
  
    distances.forEach((distance) => {
      const twoPi = Math.PI * 2 
      const geometry = {
        type: 'Polygon',
        coordinates: [[]],
      }
    
      for (let i = 0; i < points; i++) {
        const bearing = i * twoPi / points
        const destination = turf.destination(coords, distance, bearing, { units: 'kilometers' })
        geometry.coordinates[0].push(destination.geometry.coordinates)
      }
    
      data.features.push({
        type: 'Feature',
        properties: {
          distance: distance,
        },
        geometry: geometry,
      })
    })
  
    return data
  }




  // set current page when you clicjk button for pagination
  const handlePageClick = (data) => {
    const { selected } = data
    setCurrentPage(selected)
  }

  const startIndex = currentPage * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE


  useEffect(() => {
    if (secondaryData1) {
      setViewport((prevViewport) => ({
        ...prevViewport,
        latitude: secondaryData1[0].latitude,
        longitude: secondaryData1[0].longitude,
        zoom: 12.5,
      }))
    }
  }, [secondaryData1])

  return (

    <>
      <section className="primary-details-section">


        <div className='title-buttons'>
          {propertyData ? <h1 className="primary-title">Secondary school details near {propertyData.name} </h1> : <h1>Secondary school long list</h1> }
          <div className='icon-selector-section'>
            <div className='icon-selector'>
              <div className='table-icon' onClick={(e) => setSecondaryView('Table')} ></div>

            </div>
            <div className='icon-selector'>
              <div className='map-icon' onClick={(e) => setSecondaryView('Map')} ></div>
            </div>
          </div>
        </div>
        {secondaryView === 'Table' ? 
          <div className='school-block'>
            <div className='school-table-headers'>
              <h5 id='column1'>#</h5>
              <h5 id='column2'>School name</h5>
              <h5 id='column3'>Local authority</h5>
              <h5 id='column4'>Type</h5>
              <h5 id='column5'>Ofsted</h5>
              <h5 id='column6'>GCSE Pass rate </h5>
              <h5 id='column7'>GCSE A/A*</h5>
              {listType === 'short list' ?
                <>
                  <h5 id='column8'>Catchment</h5>
                  <h5 id='column9'>Distance</h5>
                </>

                : listType === 'long list' ?
                  <>
                    <h5 id='column8'>Catchment distance</h5>

                  </>
                  : '' }
            </div>
            <div className='school-table-details'>
              {secondaryData1 ? secondaryData1.map((item, index) => {
                return (
                  <>
                    <div className='school-content'>
                      <div className='column' id='column1'>
                        <h5>{index + 1}</h5>
                      </div>
                      <div className='column' id='column2'>
                        <h5 onClick={() => navigate(`/agents/secondary-schools/${item.id}`)}>{item.school_name}</h5>
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
                            <h5>{item.max_distance}</h5>
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

          : secondaryView === 'Map' ?

            <div className='school-block'>
              <div className='map-grid-view'>


                <div className='grid-list'>
                  {secondaryData1 ? secondaryData1.map((item, index) => {
                    return (
                      <>
                        <div className='school-content'>
                          <div className='grid-left'>
                            <h5>{index + 1}</h5>

                          </div>
                          <div className='grid-right' id={item.id} onMouseEnter={iconSetting} >
                            <h5 className='title' onClick={() => navigate(`/agents/secondary-schools/${item.id}`)}>{item.school_name}</h5>
                            <h5>🎓{item.school_type}</h5>
                            <h5>📈 {item.ofsted_results === null ? 'N/a' : item.ofsted_results}</h5>
                            <h5>🌍 {item.within_catchment}</h5>
                            <h5>⏰ {item.walkTimeMin} mins</h5>
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
                    {secondaryData1 &&
                    secondaryData1.map((item, index) => (
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

            : '' }
        {secondaryData1 ? 
          <ReactPaginate
            pageCount={Math.ceil(secondaryData1.length / 50)}
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

export default SecondaryDetails