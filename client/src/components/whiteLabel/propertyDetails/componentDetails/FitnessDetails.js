import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import ReactMapGL, { Marker, Popup, Source, Layer } from 'react-map-gl'
import * as turf from '@turf/turf'
import Footer from '../../../tools/Footer'



const FitnessDetails = ({ propertyData, gyms1, listType }) => {


  // state to enable navigation between pages
  const navigate = useNavigate()

  // states for handling the view type
  const [fitnessView, setFitnessView] = useState('Table')


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


  const iconSetting = (e) => {
    setShowPopup(true)
    console.log(showPopup)
    setIconId(parseInt(e.target.id))
    console.log(parseInt(e.target.id))
  }


  useEffect(() => {
    if (gyms1) {
      setViewport((prevViewport) => ({
        ...prevViewport,
        latitude: gyms1[0].Lat,
        longitude: gyms1[0].long,
        zoom: 12.5,
      }))
    }
  }, [gyms1])



  // set current page when you clicjk button for pagination
  const handlePageClick = (data) => {
    const { selected } = data
    setCurrentPage(selected)
  }

  const startIndex = currentPage * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE

  return (
    <>
      <section className="primary-details-section">
        <div className='title-buttons'>
          {propertyData ? <h1 className="primary-title">Fitness details near {propertyData.name} </h1> : <h1>Fitness long list</h1> }
          <div className='icon-selector-section'>
            <div className='icon-selector'>
              <div className='table-icon' onClick={(e) => setFitnessView('Table')} ></div>

            </div>
            <div className='icon-selector'>
              <div className='map-icon' onClick={(e) => setFitnessView('Map')} ></div>
            </div>
          </div>
        </div>

        {fitnessView === 'Table' ?
          <div className='school-block'>
            <div className='school-table-headers'>
              <h5 id='column1'>#</h5>
              <h5 className='gym-name' id='column2'>Studio name</h5>
              <h5 id='column3'>Studio Group</h5>
              {listType === 'short list' ?
                <h5 id='column4'>Distance (mins)</h5>
                :
                <h5 id='column4'></h5>
              }

              <h5 id='column5' className='gym-final'>Class types</h5>
            </div>
            <div className='school-table-details'>
              {gyms1 ? gyms1.map((item, index) => {
                return (
                  <>
                    <div className='school-content'>
                      <div className='column' id='column1'>
                        <h5>{index + 1}</h5>
                      </div>
                      <div className='column gym-name' id='column2'>
                        <h5>{item.gym_name}</h5>
                      </div>
                      <div className='column' id='column3'>
                        <h5>{item.gym_group}</h5>
                      </div>
                      
                      <div className='column' id='column4'>
                        {listType === 'short list' ?
                          <h5 id='column4'>{item.walkTimeMin}</h5>
                          :
                          <h5 id='column4'></h5>
                        }
                      </div>
                      <div className='column gym-final' id='column5'>
                        <h5>{item.class_type}</h5>
                      </div>
                
                    </div>
                    <hr className="dividing-line" />
        
                  </>
                )
              }).slice(startIndex, endIndex) : ''}
            </div>

          </div>




          : fitnessView === 'Map' ?

            <div className='school-block'>
              <div className='map-grid-view'>


                <div className='grid-list'>
                  {gyms1 ? gyms1.map((item, index) => {
                    return (
                      <>
                        <div className='school-content'>
                          <div className='grid-left'>
                            <h5>{index + 1}</h5>

                          </div>
                          <div className='grid-right' id={item.id} onMouseEnter={iconSetting} >
                            <h5 className='title'>{item.gym_name}</h5>
                            <h5>{item.gym_group}</h5>
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
                    {gyms1 &&
                    gyms1.map((item, index) => (
                      <Marker
                        key={index}
                        id={item.id}
                        longitude={item.long}
                        latitude={item.Lat}
                      >
                        <div className="poi-background">{index + 1}</div>
                      </Marker>
                    )).slice(startIndex, endIndex)}
                  </ReactMapGL>
                </div>
              </div>



            </div>

            : '' }
        {gyms1 ? 
          <ReactPaginate
            pageCount={Math.ceil(gyms1.length / 50)}
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

export default FitnessDetails


