import { useParams, useNavigate, Link } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { isUserAuth, getAccessToken, getUserToken } from '../auth/Auth'
import { Modal } from 'react-bootstrap'
import { NumericFormat } from 'react-number-format'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import Loading from '../helpers/Loading'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'




const ProfileMapModal = ({ lifestyleDropdown, masterLiving3, viewport, setViewport, iconSetting, iconId,
  showPopup, startIndex, endIndex, mapShow, handleMapClose }) => {


  return (
    <>
      <Modal show={mapShow} onHide={handleMapClose} backdrop='static' className='lifestyle-map-modal'>
        <Modal.Body>
          {masterLiving3 && lifestyleDropdown === 'Restaurants' ?
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
                          {lifestyleDropdown === 'Restaurants' ?
                            <div className='poi-icons' key={index}>
                              {city.restaurants.map((icon, index) => {
                                return (
                                  <div key={icon._id}>
                                    <Marker id={icon.id} longitude={icon.long} latitude={icon.lat}>
                                      <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                        {index + 1}
                                      </div>
                                    </Marker>
                                    {(showPopup & icon.id === iconId) && (
                                      <Popup key={index} id={icon.id} longitude={icon.long} latitude={icon.lat} closeOnClick={false} className='icon-popup'>
                                        <div className='top-box'>
                                          <div className='icon-image' style={{ backgroundImage: `url('${icon.image_url}')` }}></div>
                                        </div>
                                        <div className='bottom-box'>
                                          <h1>{index + 1} - {icon.restaurant_name}</h1>
                                          <h3>🍽 {icon.master_cuisine}</h3>
                                          <h3>📈 {icon.rating}/ 5</h3>
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
            :

            masterLiving3 && lifestyleDropdown === 'Pubs' ?

              <div className='selection-detail'>
                <div className='lifestyle-map'>
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
                                {lifestyleDropdown === 'Pubs' ?
                                  <div className='poi-icons' key={index}>
                                    {city.pubs.map((icon, index) => {
                                      return (
                                        <div key={icon._id}>
                                          <Marker id={icon.id} longitude={icon.long} latitude={icon.Lat}>
                                            <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                              {index + 1}
                                            </div>
                                          </Marker>
                                          {(showPopup & icon.id === iconId) && (
                                            <Popup key={index} id={icon.id} longitude={icon.long} latitude={icon.Lat} closeOnClick={false}>
                                              <h1>{index + 1} - {icon.Pub_name}</h1>
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
              :

              masterLiving3 && lifestyleDropdown === 'Takeaways' ?

                <div className='selection-detail'>
                  <div className='lifestyle-map'>
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
                                  {lifestyleDropdown === 'Takeaways' ?
                                    <div className='poi-icons' key={index}>
                                      {city.takeaways.map((icon, index) => {
                                        return (
                                          <div key={icon._id}>
                                            <Marker id={icon.id} longitude={icon.long} latitude={icon.lat}>
                                              <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                                {index + 1}
                                              </div>
                                            </Marker>
                                            {(showPopup & icon.id === iconId) && (
                                              <Popup key={index} id={icon.id} longitude={icon.long} latitude={icon.lat} closeOnClick={false}>
                                                <h1 style={{ color: '#051885' }}>{index + 1} - {icon.name}</h1>
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
                :

                masterLiving3 && lifestyleDropdown === 'Gyms' ?

                  <div className='selection-detail'>
                    <div className='lifestyle-map'>
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
                                    {lifestyleDropdown === 'Gyms' ?
                                      <div className='poi-icons' key={index}>
                                        {city.gyms.map((icon, index) => {
                                          return (
                                            <div key={icon._id}>
                                              <Marker id={icon.id} longitude={icon.long} latitude={icon.Lat}>
                                                <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                                  {index + 1}
                                                </div>
                                              </Marker>
                                              {(showPopup & icon.id === iconId) && (
                                                <Popup key={index} id={icon.id} longitude={icon.long} latitude={icon.Lat} closeOnClick={false} className='icon-popup'>
                                                  <div className='top-box'>
                                                    <div className='icon-image' style={{ backgroundImage: `url('${icon.image_url}')` }}></div>
                                                  </div>
                                                  <div className='bottom-box'>
                                                    <h1>{index + 1} - {icon.gym_name}</h1>
                                                    <h3>📈 {icon.class_type}</h3>
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

                  :

                  masterLiving3 && lifestyleDropdown === 'Primary schools' ?

                    <div className='selection-detail'>
                      <div className='lifestyle-map'>
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
                                      {lifestyleDropdown === 'Primary schools' ?
                                        <div className='poi-icons' key={index}>
                                          {city.primaries.map((icon, index) => {
                                            return (
                                              <div key={icon._id}>
                                                <Marker id={icon.id} longitude={icon.long} latitude={icon.lat}>
                                                  <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                                    {index + 1}
                                                  </div>
                                                </Marker>
                                                {(showPopup & icon.id === iconId) && (
                                                  <Popup key={index} id={icon.id} longitude={icon.long} latitude={icon.lat} closeOnClick={false}>
                                                    <h1 style={{ color: '#051885' }}>{index + 1} - {icon.school_name}</h1>
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

                    :

                    masterLiving3 && lifestyleDropdown === 'Secondary schools' ?

                      <div className='selection-detail'>
                        <div className='lifestyle-map'>
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
                                        {lifestyleDropdown === 'Secondary schools' ?
                                          <div className='poi-icons' key={index}>
                                            {city.secondaries.map((icon, index) => {
                                              return (
                                                <div key={icon._id}>
                                                  <Marker id={icon.id} longitude={icon.long} latitude={icon.lat}>
                                                    <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                                      {index + 1}
                                                    </div>
                                                  </Marker>
                                                  {(showPopup & icon.id === iconId) && (
                                                    <Popup key={index} id={icon.id} longitude={icon.long} latitude={icon.lat} closeOnClick={false}>
                                                      <h1 style={{ color: '#051885' }}>{index + 1} - {icon.school_name}</h1>
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
                      :
                      masterLiving3 && lifestyleDropdown === '6th forms' ?
                        <div className='selection-detail'>
                          <div className='lifestyle-map'>
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
                                          {lifestyleDropdown === '6th forms' ?
                                            <div className='poi-icons' key={index}>
                                              {city.colleges.map((icon, index) => {
                                                return (
                                                  <div key={icon._id}>
                                                    <Marker id={icon.id} longitude={icon.long} latitude={icon.lat}>
                                                      <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                                        {index + 1}
                                                      </div>
                                                    </Marker>
                                                    {(showPopup & icon.id === iconId) && (
                                                      <Popup key={index} id={icon.id} longitude={icon.long} latitude={icon.lat} closeOnClick={false}>
                                                        <h1 style={{ color: '#051885' }}>{index + 1} - {icon.school_name}</h1>
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
                        : ''}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ProfileMapModal