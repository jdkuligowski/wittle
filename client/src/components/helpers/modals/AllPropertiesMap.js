import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { NumericFormat } from 'react-number-format'
import { getUserToken, getAccessToken, isUserAuth } from '../../auth/Auth'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { Modal } from 'react-bootstrap'



const AllPropertiesMap = ({ calc10, formData, mapShow, handleMapClose, viewport, setViewport }) => {

  // state to enable navigation between pages
  const navigate = useNavigate()


  // ? Section 9: MODALS - section for managing the numerous modals on the page
  // * Modal 1 - Map mdoal

  // state for showing map property detail
  const [mapPropertyShow, setMapProperty] = useState(false)

  // function for closing the map detail modal
  const handleMapDetailClose = () => {
    setMapProperty(false)
  }

  // state for showing the map detail
  const handleMapDetailShow = () => setMapProperty(true)

  // states for handling the popups on the map
  const [showPopup, setShowPopup] = useState(true)
  const [iconId, setIconId] = useState()
  // const openDetail = () => setbuttonActive(!buttonActive)

  const iconSetting = (e) => {
    setShowPopup(true)
    console.log(showPopup)
    setIconId(parseInt(e.target.id))
    console.log(parseInt(e.target.id))
  }


  return (
    <>
      <Modal show={mapShow} onHide={handleMapClose} backdrop='static' className='map-modal'>
        <Modal.Body>
          {calc10 ?
            <>
              <div className='map-header'>
                {isUserAuth() ?  <h3 className='map-title'>{formData.search_name}: {calc10.length} properties</h3> : !isUserAuth() ?  <h3 className='map-title'>Wittle Search: {calc10.length} properties</h3> : ''}
                <button onClick={handleMapClose}>Close map</button>
              </div>
              <ReactMapGL {...viewport}
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                mapStyle='mapbox://styles/mapbox/streets-v11'
                onViewportChange={viewport => {
                  setViewport(viewport)
                }}
                center={viewport}
                onMove={evt => setViewport(evt.viewport)}>
                {calc10 ?
                  <div className='poi-icons'>
                    {calc10.map((property, index) => {
                      return (
                        <div key={property.id}>
                          <>
                            <Marker longitude={property.long} latitude={property.Lat} key={index} titleAccess={property.property_name} id='house-icon' >
                              <div className='house-btn' onClick={() => navigate(`/wittle-results/${property.id}`)} id={property.id} onMouseEnter={iconSetting}>
                              </div>
                            </Marker>
                            {(showPopup & property.id === iconId) && (
                              <Popup key={index} id={property.id} longitude={property.long} latitude={property.Lat} closeOnClick={false}>
                                <div className='property-popup'>
                                  <div className='property-image' style={{ backgroundImage: `url('${property.property_image_1}')` }}>
                                  </div>
                                  <div className='property-details'>
                                    <h1>{property.property_name}</h1>
                                    <h4>{property.first_match}% match</h4>
                                    <h4><NumericFormat value={property.value} displayType={'text'} thousandSeparator={true} prefix={'£'} /> offers over</h4>
                                  </div>
                                </div>
                              </Popup>
                            )}
                          </>
                        </div>
                      )
                    })}
                  </div>
                  : ''}
              </ReactMapGL>
            </>
            : ''}
        </Modal.Body>
      </Modal>
    </>
  )

}


export default AllPropertiesMap