import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import ReactMapGL, { Marker, Popup, Source, Layer } from 'react-map-gl'



const BoroughMap = ({ sliderSelection, statePrimaries, stateSecondaries, restaurants, pubs, evs, boroughs }) => {


  // states for handling the popups on the map
  const [showPopup, setShowPopup] = useState(true)
  const [iconId, setIconId] = useState()

  // set pop up icon
  const iconSetting = (e) => {
    setShowPopup(true)
    console.log(showPopup)
    setIconId(parseInt(e.target.id))
    console.log(parseInt(e.target.id))
  }

  // pagination on map
  const ITEMS_PER_PAGE = 150
  const [currentPage, setCurrentPage] = useState(0)
  const startIndex = currentPage * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE

  // set current page when you clicjk button for pagination
  const handlePageClick = (data) => {
    const { selected } = data
    setCurrentPage(selected)
  }


  // control the states for maps
  const [viewport, setViewport] = useState({
    latitude: 51.515419,
    longitude: -0.141099,
    zoom: 11.5,
  })

  // load in viewport data based on location of the property
  useEffect(() => {
    if (boroughs) {
      setViewport((prevViewport) => ({
        ...prevViewport,
        latitude: boroughs.longitude,
        longitude: boroughs.latitude,
        zoom: 11,
      }))
    }
  }, [boroughs])



  return (
    <>
      {sliderSelection === 'Primary schools' ?

        <div className='school-block'>
          <div className='map-grid-view'>


            <div className='grid-list'>
              {statePrimaries ? statePrimaries.map((item, index) => {
                return (
                  <>
                    <div className='school-content'>
                      <div className='grid-left'>
                        <h5>{index + 1}</h5>

                      </div>
                      <div className='grid-right' id={item.id} onMouseEnter={iconSetting} >
                        <h5 className='title'>{item.school_name}</h5>
                        <h5>🎓{item.school_type}</h5>
                        <h5>📈 {item.ofsted_results === null ? 'N/a' : item.ofsted_results}</h5>
                      </div>
                    </div>
                    <hr className="dividing-line" />
        
                  </>
                )
              }) : ''}


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
                {statePrimaries &&
                    statePrimaries.map((item, index) => (
                      <Marker
                        key={index}
                        id={item.id}
                        longitude={item.longitude}
                        latitude={item.latitude}
                        // onClick={() => handleSchoolClick(item)}
                      >
                        <div className="poi-background">{index + 1}</div>
                      </Marker>
                    ))}
              </ReactMapGL>
            </div>
          </div>



        </div>



        : sliderSelection === 'Secondary schools' ?


          <div className='school-block'>
            <div className='map-grid-view'>


              <div className='grid-list'>
                {stateSecondaries ? stateSecondaries.map((item, index) => {
                  return (
                    <>
                      <div className='school-content'>
                        <div className='grid-left'>
                          <h5>{index + 1}</h5>

                        </div>
                        <div className='grid-right' id={item.id} onMouseEnter={iconSetting} >
                          <h5 className='title'>{item.school_name}</h5>
                          <h5>🎓{item.school_type}</h5>
                          <h5>📈 {item.ofsted_results === null ? 'N/a' : item.ofsted_results}</h5>
                        </div>
                      </div>
                      <hr className="dividing-line" />
      
                    </>
                  )
                }) : ''}


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
                  {stateSecondaries &&
                  stateSecondaries.map((item, index) => (
                    <Marker
                      key={index}
                      id={item.id}
                      longitude={item.longitude}
                      latitude={item.latitude}
                      // onClick={() => handleSchoolClick(item)}
                    >
                      <div className="poi-background">{index + 1}</div>
                    </Marker>
                  ))}
                </ReactMapGL>
              </div>
            </div>



          </div>

          : sliderSelection === 'Restaurants' ?

            <div className='school-block'>
              <div className='map-grid-view'>


                <div className='grid-list'>
                  {restaurants ? restaurants.map((item, index) => {
                    return (
                      <>
                        <div className='school-content'>
                          <div className='grid-left'>
                            <h5>{index + 1}</h5>

                          </div>
                          <div className='grid-right' id={item.id} onMouseEnter={iconSetting} >
                            <h5 className='title'>{item.restaurant_name}</h5>
                            <h5>🍽 {item.master_cuisine}</h5>
                            <h5>👩‍💻 {item.website} </h5>
                          </div>
                        </div>
                        <hr className="dividing-line" />
    
                      </>
                    )
                  }) : ''}


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
                    {restaurants &&
                restaurants.map((item, index) => (
                  <Marker
                    key={index}
                    id={item.id}
                    longitude={item.longitude}
                    latitude={item.latitude}
                    // onClick={() => handleSchoolClick(item)}
                  >
                    <div className="poi-background">{index + 1}</div>
                  </Marker>
                ))}
                  </ReactMapGL>
                </div>
              </div>



            </div>

            : sliderSelection === 'Pubs' ?

              <div className='school-block'>
                <div className='map-grid-view'>


                  <div className='grid-list'>
                    {pubs ? pubs.map((item, index) => {
                      return (
                        <>
                          <div className='school-content'>
                            <div className='grid-left'>
                              <h5>{index + 1}</h5>

                            </div>
                            <div className='grid-right' id={item.id} onMouseEnter={iconSetting} >
                              <h5 className='title'>{item.name}</h5>
                            </div>
                          </div>
                          <hr className="dividing-line" />
    
                        </>
                      )
                    }) : ''}


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
                      {pubs && pubs.map((item, index) => (
                        <Marker
                          key={index}
                          id={item.id}
                          longitude={item.longitude}
                          latitude={item.latitude}
                          // onClick={() => handleSchoolClick(item)}
                        >
                          <div className="poi-background">{index + 1}</div>
                        </Marker>
                      ))}
                    </ReactMapGL>
                  </div>
                </div>



              </div>

              : sliderSelection === 'EVs' ?

                <div className='school-block'>
                  <div className='map-grid-view'>


                    <div className='grid-list'>
                      {evs ? evs.map((item, index) => {
                        return (
                          <>
                            <div className='school-content'>
                              <div className='grid-left'>
                                <h5>{index + 1}</h5>

                              </div>
                              <div className='grid-right' id={item.id} onMouseEnter={iconSetting} >
                                <h5 className='title'>{item.location}</h5>
                                <h5 className='title'>⛽️{item.power}kW</h5>
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
                        {evs && evs.map((item, index) => (
                          <Marker
                            key={index}
                            id={item.id}
                            longitude={item.longitude}
                            latitude={item.latitude}
                          // onClick={() => handleSchoolClick(item)}
                          >
                            <div className="poi-background">{index + 1}</div>
                          </Marker>
                        )).slice(startIndex, endIndex)}
                      </ReactMapGL>
                    </div>
                  </div>
                  {evs ? 
                    <ReactPaginate
                      pageCount={Math.ceil(evs.length / 50)}
                      onPageChange={handlePageClick}
                      containerClassName={'pagination'}
                      activeClassName={'active'}
                      previousLabel={'<'}
                      nextLabel={'>'}
                      pageRangeDisplayed={0}
                      breakLabel={'...'}
                    />
                    : '' }



                </div>

                : ''
      }

    
    </>
  )
}

export default BoroughMap