import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { useNavigate, useParams } from 'react-router-dom'
import ReactPaginate from 'react-paginate'
import ReactMapGL, { Marker, Popup, Source, Layer } from 'react-map-gl'





const HeatmapTest = () => {

  // ? Section 1: states
  // postcodes
  const [postcodes, setPostcodes] = useState()

  // errors
  const [errors, setErrors] = useState()

  // control the states for maps
  const [viewport, setViewport] = useState({
    latitude: 51.515419,
    longitude: -0.141099,
    zoom: 11.5,
  })


  // ? Section 2: Load postcode and user data
  const loadPostcodeData = () => {
    // Assuming th user is authorised, we want to load their profile information and set states based on relevant sections of this
    try {
      const getPostcode = async () => {
        const { data } = await axios.get('/api/postcodes/')
        console.log('postcode data ->', data)
        setPostcodes(data)
      }
      getPostcode()
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  useEffect(() =>{
    loadPostcodeData()
  }, [])


  // Convert postcodes to GeoJSON format and include 'percentile' from 'fitness' object
  const postcodesGeoJSON = {
    type: 'FeatureCollection',
    features: postcodes ? postcodes.map((postcode, i) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [postcode.longitude, postcode.latitude],
      },
      properties: {
        id: i + 1,
        percentile: postcode.fitness.percentile || 0,  // Adding the percentile here
      },
    })) : [],
  }

  return (
    <>
      <div className="map-section">
        <ReactMapGL
          {...viewport}
          mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
          mapStyle="mapbox://styles/mapbox/outdoors-v12"
          onViewportChange={setViewport}
        >
          {/* Existing Marker Logic */}
          {postcodes &&
                  postcodes.map((item, index) => (
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

          {/* Add heatmap layer */}
          <Source type="geojson" data={postcodesGeoJSON}>
            <Layer
              id="heatmapLayer"
              type="heatmap"
              paint={{
                'heatmap-weight': ['get', 'percentile'],  // Using the percentile here for weight
                'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 15, 3],
                'heatmap-color': [
                  'interpolate',
                  ['linear'],
                  ['heatmap-density'],
                  0, 'rgba(33,102,172,0)',
                  0.2, 'rgb(103,169,207)',
                  0.4, 'rgb(209,229,240)',
                  0.6, 'rgb(253,219,199)',
                  0.8, 'rgb(239,138,98)',
                  1, 'rgb(178,24,43)'
                ],
                'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 15, 30],
              }}
            />
          </Source>
        </ReactMapGL>
      </div>
    </>
  )
}


export default HeatmapTest