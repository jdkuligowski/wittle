import React, { useState, useEffect, useRef } from 'react'
import { NumericFormat } from 'react-number-format'
import ReactPaginate from 'react-paginate'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'




const TileView = ({ masterLiving3, variableValue, mapSelect, setLifestyleView, detail1, detail2, detail3, startIndex, endIndex, handlePageClick,
  viewport, setViewport, dropdownValue, lifestyleDropdown, iconSetting, iconId, showPopup, lat }) => {


  return (
    <>
      <div className='selection-detail'>
        <div className='lifestyle-map'>
          <div className='content-section'>
            <div className='map-list-title'>
              {masterLiving3 ?
                masterLiving3.map((city, index) => {
                  return (
                    <>
                      <div className='sub-title'>
                        <h1 key={index}><NumericFormat value={city[variableValue].length} displayType={'text'} thousandSeparator={true} /> {variableValue}</h1>

                        <div className='icon-selector-section'>
                          <div className='icon-selector'>
                            <div className='map-icon' id='map-icon' onClick={mapSelect}  ></div>
                          </div>
                          <div className='icon-selector'>
                            <div className='table-icon' onClick={(e) => setLifestyleView('Table')} ></div>
                          </div>
                        </div>
                      </div>
                      <div className='item-list'>
                        {city[variableValue].map((item, index) => {
                          return (
                            <>
                              <div className='item' id={item.id} key={index}>
                                <div className='item-left'>
                                  {item.image_url === 'No image' ? <div className='icon-image' style={{ backgroundImage: 'url(\'../../../public/website_images/park-image.png\')' }}></div> : <div className='icon-image' style={{ backgroundImage: `url('${item.image_url}')` }}></div>}
                                </div>
                                <div className='item-right' id={item.id}>
                                  <h1>{index + 1} - {item[detail1]}</h1>
                                  <h3>🍽 {item[detail2]}</h3>
                                  {variableValue === 'restaurants' ? <h3>📈 {item[detail3]}/ 5</h3> : variableValue === 'takeaways' ? <h3>📈 {item[detail3]}/ 10</h3> : ''}

                                </div>
                              </div>
                              <hr />
                            </>
                          )
                        }).slice(startIndex, endIndex)}
                        <ReactPaginate
                          pageCount={Math.ceil(city[variableValue].length / 50)}
                          onPageChange={handlePageClick}
                          containerClassName={'pagination'}
                          activeClassName={'active'}
                          previousLabel={'<'}
                          nextLabel={'>'}
                          pageRangeDisplayed={0}
                          breakLabel={'...'}
                        />
                      </div>
                    </>
                  )
                })
                : ''}
            </div>
          </div>
          <div className='map-section'>
            <ReactMapGL {...viewport}
              mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
              mapStyle='mapbox://styles/mapbox/streets-v12'
              onViewportChange={viewport => {
                setViewport(viewport)
              }}
              center={viewport}
              onMove={evt => setViewport(evt.viewport)}
              className='profile-map'>
              {masterLiving3 ?
                <div className='icon-wrapper'>
                  {masterLiving3.map((city, index) => {
                    return (
                      <>
                        {lifestyleDropdown === dropdownValue ?
                          <div className='poi-icons' key={index}>
                            {city[variableValue].map((icon, index) => {
                              return (
                                <div key={icon._id}>
                                  <Marker id={icon.id} longitude={icon.long} latitude={icon[lat]}>
                                    <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                      {index + 1}
                                    </div>
                                  </Marker>
                                  {(showPopup & icon.id === iconId) && (
                                    <Popup key={index} id={icon.id} longitude={icon.long} latitude={icon[lat]} closeOnClick={false} className='icon-popup'>
                                      <div className='top-box'>
                                        {icon.image_url === 'No image' ? <div className='icon-image' style={{ backgroundImage: 'url(\'../../../../public/website_images/secondary-image\')' }}></div> : <div className='icon-image' style={{ backgroundImage: `url('${icon.image_url}')` }}></div>}
                                      </div>
                                      <div className='bottom-box'>
                                        <h1>{index + 1} - {icon[detail1]}</h1>
                                        <h3>🍽 {icon[detail2]}</h3>
                                        {variableValue === 'restaurants' ? <h3>📈 {icon[detail3]}/ 5</h3> : variableValue === 'takeaways' ? <h3>📈 {icon[detail3]}/ 10</h3> : ''}
                                        <a href={icon.url} target='_blank' rel='noopener noreferrer' style={{ color: '#FFA7E5', textDecoration: 'none', fontWeight: 'bold' }}>👀 Visit website</a>
                                      </div>

                                    </Popup>
                                  )}
                                </div>
                              )
                            }).slice(startIndex, endIndex)}
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
      </div>
    </>
  )
}

export default TileView