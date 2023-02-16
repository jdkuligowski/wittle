import React, { useState, useEffect, useRef } from 'react'
import 'react-slideshow-image/dist/styles.css'
import { NumericFormat } from 'react-number-format'
import { Modal } from 'react-bootstrap'
import { useParams, useNavigate, Link } from 'react-router-dom'

import axios from 'axios'
import { isUserAuth, getUserToken, getAccessToken } from '../../auth/Auth'



const EditSearch = ({ editSearch, setEditSearch, handleSearchClose, searchShow, calc10, formData, setFormData, setErrors, editShow, setEditShow, handleEditClose, handleEditShow }) => {


  // state to enable navigation between pages
  const navigate = useNavigate()

  // state for determining whether a property is favoruited - this is used on the conditional for adding/deleting a favourite
  const [listFavourites, setListFavourites] = useState()

  // state to collect properties
  const [properties, setProperties] = useState()

  // state to collect the user information
  const [userData, setUserData] = useState([])

  // state for extracting the users searches from user data
  const [propertySearch, setPropertySearch] = useState({})

  // set first run of the form data
  const [initialForm, setInitialForm] = useState()

  // adsitional state for testing - used for extracting the results from state when saved there
  const [localProp, setLocalProp] = useState()

  // another state for properties - this is used as the final property list before calculations are carried out
  const [finalProp, setFinalProp] = useState()

  // loadinig user information
  const loadUserData = async () => {
    if (isUserAuth())
      try {
        const { data } = await axios.get(`/api/auth/profile/${getUserToken()}/`, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        setPropertySearch(data.property_search_details)
        console.log('property search array ->', data.property_search_details)
        setUserData(data)
        console.log('userdata ->', data)
        const favouriteList = []
        data.favourites.forEach(item => favouriteList.includes(item.property) ? '' : favouriteList.push(item.property))
        setListFavourites(favouriteList)
      } catch (error) {
        setErrors(true)
        console.log(error)
      }
    else
      try {
        const { data } = await axios.get('/api/auth/profile/xplw7aq5r/AdminData/')
        setPropertySearch(data.property_search_details)
        console.log('property search array ->', data.property_search_details)
        setUserData(data)
        console.log('userdata ->', data)
        const favouriteList = []
        data.favourites.forEach(item => favouriteList.includes(item.property) ? '' : favouriteList.push(item.property))
        setListFavourites(favouriteList)
      } catch (error) {
        setErrors(true)
        console.log(error)
      }
    const input = JSON.parse(localStorage.getItem('wittle-form-input'))
    setInitialForm(input)
    console.log('initial form ->', input)
  }

  // loadnig property data
  const getProperties = async () => {
    if (!localProp)
      try {
        const { data } = await axios.get('/api/properties/results')
        setProperties(data)
        console.log('property data ->', data)
        setResultsToLocalStorage()
      } catch (error) {
        setErrors(true)
        console.log(error)
      }
  }

  // define function for setting results to storage
  const setResultsToLocalStorage = (token) => {
    window.localStorage.setItem('wittle-results', JSON.stringify(localProp))
    setFinalProp(localProp)
  }

  // function for posting an edit to the search
  const postEditSearch = async (e) => {
    try {
      const formData = {
        owner: editSearch.owner,
        start_search: editSearch.start_search,
        search_name: editSearch.search_name,
        search_type: 'Wittle',
        search_channel: editSearch.search_channel,
        restaurant_selection: editSearch.restaurant_selection,
        restaurant_decision: editSearch.restaurant_decision,
        restaurant_distance: editSearch.restaurant_distance,
        restaurant_cuisine_1: editSearch.restaurant_cuisine_1,
        restaurant_cuisine_2: editSearch.restaurant_cuisine_2,
        takeaway_selection: editSearch.takeaway_selection,
        takeaway_decision: editSearch.takeaway_decision,
        takeaway_distance: editSearch.takeaway_distance,
        takeaway_cuisine_1: editSearch.takeaway_cuisine_1,
        takeaway_cuisine_2: editSearch.takeaway_cuisine_2,
        pubs_selection: editSearch.pubs_selection,
        pubs_distance: editSearch.pubs_distance,
        cafes_selection: editSearch.cafes_selection,
        cafes_decision: editSearch.cafes_decision,
        cafes_detail: editSearch.cafes_detail,
        cafes_distance: editSearch.cafes_distance,
        tube_selection: editSearch.tube_selection,
        tube_decision: editSearch.tube_decision,
        tube_detail: editSearch.tube_detail,
        tube_distance: editSearch.tube_distance,
        train_selection: editSearch.train_selection,
        train_decision: editSearch.train_decision,
        train_detail: editSearch.train_detail,
        train_distance: editSearch.train_distance,
        primary_selection: editSearch.primary_selection,
        primary_religion: editSearch.primary_religion,
        primary_mode: editSearch.primary_mode,
        primary_distance: editSearch.primary_distance,
        college_selection: editSearch.college_selection,
        college_religion: editSearch.college_religion,
        college_mode: editSearch.college_mode,
        college_distance: editSearch.college_distance,
        secondary_selection: editSearch.secondary_selection,
        secondary_religion: editSearch.secondary_religion,
        secondary_mode: editSearch.secondary_mode,
        secondary_distance: editSearch.secondary_distance,
        supermarket_selection: editSearch.supermarket_selection,
        supermarket_decision: editSearch.supermarket_decision,
        supermarket_segment: editSearch.supermarket_segment,
        supermarket_size: editSearch.supermarket_size,
        supermarket_distance: editSearch.supermarket_distance,
        gym_selection: editSearch.gym_selection,
        gym_studio_name: editSearch.gym_studio_name,
        gym_class_type: editSearch.gym_class_type,
        gym_distance: editSearch.gym_distance,
        park_selection: editSearch.park_selection,
        park_type: editSearch.park_type,
        park_distance: editSearch.park_distance,
        workplace_selection: editSearch.workplace_selection,
        workplace_detail: editSearch.workplace_detail,
        workplace_transport: editSearch.workplace_transport,
        workplace_distance: editSearch.workplace_distance,
        family_selection: editSearch.family_selection,
        family_detail_1: editSearch.family_detail_1,
        family_distance_1: editSearch.family_distance_1,
        family_detail_2: editSearch.family_detail_2,
        family_distance_2: editSearch.family_distance_2,
        family_detail_3: editSearch.family_detail_3,
        family_distance_3: editSearch.family_distance_3,
        family_mode_1: editSearch.family_mode_1,
        family_mode_2: editSearch.family_mode_2,
        family_mode_3: editSearch.family_mode_3,
        property_price_min: editSearch.property_price_min,
        property_price_max: editSearch.property_price_max,
        property_bed_min: editSearch.property_bed_min,
        property_bed_max: editSearch.property_bed_max,
        property_type: editSearch.property_type,
      }
      console.log(e.target.value)
      const { data } = await axios.put(`/api/property-search/${e.target.value}`, formData, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      window.localStorage.setItem('wittle-form-input', JSON.stringify(data))
      console.log('new form data->', data)
      if (e.target.id === 'Submit')
        navigate('/wittle-results/')
      else if (e.target.id === 'Save')
        getProperties()
      setEditShow(false)
      loadUserData()
      setFormData(data)
    } catch (error) {
      console.log(error)
    }
  }



  // Managing states for the drop down menus of stations and lines to be used in the edit search modal
  // states for holding the tube information
  const [tubeDataset, setTubeDataset] = useState([])
  const [stations, setStations] = useState([])
  const [lines, setLines] = useState([])

  // states for holding the train information
  const [trains, setTrains] = useState([])
  const [trainStations, setTrainStations] = useState([])

  // ectract tube data from the database
  useEffect(() => {
    const getTubes = async () => {
      try {
        const { data } = await axios.get('/api/tubes/')
        setTubeDataset(data)
        // console.log('tube data ->', data)
      } catch (error) {
        setErrors(true)
        console.log(error)
      }
    }
    getTubes()
  }, [])

  // extract train data from the database
  useEffect(() => {
    const getTrains = async () => {
      try {
        const { data } = await axios.get('/api/trains/')
        setTrains(data)
        // console.log('train data ->', data)
      } catch (error) {
        setErrors(true)
        console.log(error)
      }
    }
    getTrains()
  }, [])

  // create lsits so we have a dropdown
  useEffect(() => {
    if (trains.length) {
      const stationList = []
      trains.forEach(station => stationList.includes(station.station_name) ? '' : stationList.push(station.station_name))
      setTrainStations(stationList)
    }
  }, [trains])

  // create lsits so we have a dropdown
  useEffect(() => {
    if (tubeDataset.length) {
      const stationList = []
      const lineList = []
      tubeDataset.forEach(station => stationList.includes(station.station_name) ? '' : stationList.push(station.station_name))
      tubeDataset.forEach(line => lineList.includes(line.line) ? '' : lineList.push(line.line))
      setStations(stationList)
      setLines(lineList)
    }
  }, [tubeDataset])



  return (
    <>
      <Modal show={editShow} onHide={handleEditClose} backdrop='static' className='edit-modal'>
        <Modal.Body>
          {editSearch ?
            <>
              <div className='modal-header'>
                <div className='modal-header-text'>
                  <h1 className='submit-title'>Edit your Wittle search</h1>
                  <p className='submit-detail'>Make changes to current inputs, or add some that you missed off last time</p>

                </div>
                <button onClick={handleEditClose} className='edit-close'>Close</button>
              </div>
              <hr className='edit-divider' />
              <div className='modal-detail'>
                <div className='input-section'>
                  <h1 className='section-header'>Hospitality</h1>
                  {/* Restaurants */}

                  <div className='input-line'>
                    <div className='title-section'>
                      <h3 className='sub-title'>Restaurants</h3>

                      <div className='section-buttons'>
                        {editSearch.restaurant_selection ? <button name='restaurant_selection' onClick={() => setEditSearch({ ...editSearch, restaurant_selection: false })} value='false' className='delete-button'>Remove</button> : <button name='restaurant_selection' onClick={() => setEditSearch({ ...editSearch, restaurant_selection: true })} value='true' className='add-button'>Add</button>}
                      </div>
                    </div>
                    {editSearch.restaurant_selection ?
                      <div className='section-detail'>
                        <h3>Restaurant decision</h3>
                        <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, restaurant_decision: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='restaurant_decision'>
                          <option>{editSearch.restaurant_decision} (selected)</option>
                          <option>Any restaurants</option>
                          <option>Specific cuisine</option>
                        </select>

                        <h3>Cuisine</h3>
                        <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, restaurant_cuisine_1: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='restaurant_cuisine_1'>
                          <option>{editSearch.restaurant_cuisine_1} (selected)</option>
                          <option>American</option>
                          <option>Asian</option>
                          <option>Bar</option>
                          <option>British</option>
                          <option>Central American</option>
                          <option>Central Asian</option>
                          <option>Chicken</option>
                          <option>Chinese</option>
                          <option>European</option>
                          <option>French</option>
                          <option>Gastro Pub</option>
                          <option>Greek</option>
                          <option>Indian</option>
                          <option>International</option>
                          <option>Italian</option>
                          <option>Japanese</option>
                          <option>Meat & Grill</option>
                          <option>Mediterranean</option>
                          <option>Mexican</option>
                          <option>Middle Eastern</option>
                          <option>Modern</option>
                          <option>North African</option>
                          <option>Pizza</option>
                          <option>Pub food</option>
                          <option>Seafood</option>
                          <option>South African</option>
                          <option>South American</option>
                          <option>South East Asian</option>
                          <option>Spanish</option>
                          <option>Thai</option>
                          <option>Turkish</option>
                          <option>Vegetarian/ Vegan</option>
                          <option>Vietnamese</option>
                          <option>Wine Bar</option>
                        </select>
                        <h3>Walking distance</h3>
                        <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, restaurant_distance: e.target.value })} name='restaurant_distance' placeholder={editSearch.restaurant_distance}></input>
                      </div>
                      : ''}
                  </div>
                  {/* Cafes */}
                  <div className='input-line'>
                    <div className='title-section'>
                      <h3 className='sub-title'>Cafes</h3>
                      <div className='section-buttons'>
                        {editSearch.cafes_selection ? <button name='cafes_selection' onClick={() => setEditSearch({ ...editSearch, cafes_selection: false })} value='false' className='delete-button'>Remove</button> : <button name='cafes_selection' onClick={() => setEditSearch({ ...editSearch, cafes_selection: true })} value='true' className='add-button'>Add</button>}
                      </div>
                    </div>
                    {editSearch.cafes_selection ?
                      <div className='section-detail'>
                        <h3>Cafe decision</h3>
                        <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, cafes_decision: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='cafes_decision'>
                          <option>{editSearch.cafes_decision} (selected)</option>
                          <option>General cafes</option>
                          <option>Specific cafe</option>
                        </select>
                        {editSearch.cafes_decision !== '' || editSearch.cafes_decision === 'Specific cafe' ?
                          <>
                            <h3>Cafe</h3>
                            <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, cafes_detail: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='cafes_detail'>
                              <option>{editSearch.cafes_detail} (selected)</option>
                              <option>Black Sheep Coffee</option>
                              <option>Cafe Nero</option>
                              <option>Costa Coffee</option>
                              <option>Gail&apos;s</option>
                              <option>Grind</option>
                              <option>Joe & The Juice</option>
                              <option>Pattiserie Valerie</option>
                              <option>Pret</option>
                            </select>
                          </>
                          : ''}
                        <h3>Walking distance</h3>
                        <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, cafes_distance: e.target.value })} name='cafes_distance' placeholder={editSearch.cafes_distance}></input>
                      </div>
                      : ''}
                  </div>
                  {/* Takeaways */}
                  <div className='input-line'>
                    <div className='title-section'>
                      <h3 className='sub-title'>Takeaways</h3>

                      <div className='section-buttons'>
                        {editSearch.takeaway_selection ? <button name='takeaway_selection' onClick={() => setEditSearch({ ...editSearch, takeaway_selection: false })} value='false' className='delete-button'>Remove</button> : <button name='takeaway_selection' onClick={() => setEditSearch({ ...editSearch, takeaway_selection: true })} value='true' className='add-button'>Add</button>}
                      </div>
                    </div>
                    {editSearch.takeaway_selection ?
                      <div className='section-detail'>
                        <h3>Takeaway decision</h3>
                        <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, takeaway_decision: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='takeaway_decision'>
                          <option>{editSearch.takeaway_decision} (selected)</option>
                          <option>Any takeaway</option>
                          <option>Specific cuisine</option>
                        </select>
                        <h3>Cuisine</h3>
                        <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, takeaway_cuisine_1: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='takeaway_cuisine_1'>
                          <option>{editSearch.takeaway_cuisine_1} (selected)</option>
                          <option>American</option>
                          <option>Asianfusion</option>
                          <option>Breakfast</option>
                          <option>British</option>
                          <option>Brunch</option>
                          <option>Chinese</option>
                          <option>Healthy</option>
                          <option>Indian</option>
                          <option>Italian</option>
                          <option>Japanese</option>
                          <option>Korean</option>
                          <option>Mediterranean</option>
                          <option>Mexican</option>
                          <option>Thai</option>
                          <option>Turkish</option>
                          <option>Vietnamese</option>
                        </select>
                        <h3>Walking distance</h3>
                        <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, takeaway_distance: e.target.value })} name='takeaway_distance' placeholder={editSearch.takeaway_distance}></input>
                      </div>
                      : ''}
                  </div>
                  {/* Pubs */}
                  <div className='input-line'>
                    <div className='title-section'>
                      <h3 className='sub-title'>Pubs</h3>
                      <div className='section-buttons'>
                        {editSearch.pubs_selection ? <button name='pubs_selection' onClick={() => setEditSearch({ ...editSearch, pubs_selection: false })} value='false' className='delete-button'>Remove</button> : <button name='pubs_selection' onClick={() => setEditSearch({ ...editSearch, pubs_selection: true })} value='true' className='add-button'>Add</button>}
                      </div>
                    </div>
                    {editSearch.pubs_selection ?
                      <div className='section-detail'>
                        <h3>Walking distance</h3>
                        <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, pubs_distance: e.target.value })} name='pubs_distance' placeholder={editSearch.pubs_distance}></input>
                      </div>
                      : ''}
                  </div>
                  <hr className='inner-divider' />
                  {/* Second section - lifestyle */}
                  <h1 className='section-header'>Lifestyle</h1>
                  {/* Supermarkets */}
                  <div className='input-line'>
                    <div className='title-section'>
                      <h3 className='sub-title'>Supermarkets</h3>
                      <div className='section-buttons'>
                        {editSearch.supermarket_selection ? <button name='supermarket_selection' onClick={() => setEditSearch({ ...editSearch, supermarket_selection: false })} value='false' className='delete-button'>Remove</button> : <button name='supermarket_selection' onClick={() => setEditSearch({ ...editSearch, supermarket_selection: true })} value='true' className='add-button'>Add</button>}
                      </div>
                    </div>
                    {editSearch.supermarket_selection ?
                      <div className='section-detail'>
                        <h3>Supermarket decision</h3>
                        <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, supermarket_decision: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='supermarket_decision'>
                          <option>{editSearch.supermarket_decision} (selected)</option>
                          <option>Any supermarket</option>
                          <option>Specific supermarket</option>
                        </select>
                        <h3>Type</h3>
                        <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, supermarket_segment: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='supermarket_segment'>
                          <option>{editSearch.supermarket_segment} (selected)</option>
                          <option>Budget</option>
                          <option>Convenience</option>
                          <option>Mainstream</option>
                          <option>Premium</option>
                        </select>
                        <h3>Size</h3>
                        <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, supermarket_size: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='supermarket_size'>
                          <option>{editSearch.supermarket_size} (selected)</option>
                          <option>Don&apos;t mind</option>
                          <option>Small </option>
                          <option>Medium</option>
                          <option>Large</option>
                        </select>
                        <h3>Walking distance</h3>
                        <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, supermarket_distance: e.target.value })} name='supermarket_distance' placeholder={editSearch.supermarket_distance}></input>
                      </div>
                      : ''}
                  </div>
                  {/* Gyms */}
                  <div className='input-line'>
                    <div className='title-section'>
                      <h3 className='sub-title'>Gyms</h3>
                      <div className='section-buttons'>
                        {editSearch.gym_selection ? <button name='gym_selection' onClick={() => setEditSearch({ ...editSearch, gym_selection: false })} value='false' className='delete-button'>Remove</button> : <button name='gym_selection' onClick={() => setEditSearch({ ...editSearch, gym_selection: true })} value='true' className='add-button'>Add</button>}
                      </div>
                    </div>
                    {editSearch.gym_selection ?
                      <div className='section-detail'>
                        <h3>Studio</h3>
                        <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, gym_studio_name: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='gym_studio_name'>
                          <option>{editSearch.gym_studio_name} (selected)</option>
                          <option>No preference</option>
                          <option>1Rebel</option>
                          <option>Barry&apos;s</option>
                          <option>Fitness First</option>
                          <option>Gymbox</option>
                          <option>MoreYoga</option>
                          <option>Nuffield Health</option>
                          <option>Pure Gym</option>
                          <option>The Gym Group</option>
                          <option>Third Space</option>
                          <option>Virgin</option>
                        </select>
                        <h3>Walking distance</h3>
                        <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, gym_distance: e.target.value })} name='gym_distance' placeholder={editSearch.gym_distance}></input>
                      </div>
                      : ''}
                  </div>
                  {/* Parks */}
                  <div className='input-line'>
                    <div className='title-section'>
                      <h3 className='sub-title'>Parks</h3>

                      <div className='section-buttons'>
                        {editSearch.park_selection ? <button name='park_selection' onClick={() => setEditSearch({ ...editSearch, park_selection: false })} value='false' className='delete-button'>Remove</button> : <button name='park_selection' onClick={() => setEditSearch({ ...editSearch, park_selection: true })} value='true' className='add-button'>Add</button>}
                      </div>
                    </div>
                    {editSearch.park_selection ?
                      <div className='section-detail'>
                        <h3>Park</h3>
                        <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, park_type: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='park_type'>
                          <option>{editSearch.park_type} (selected)</option>
                          <option>Large park &#40;long walks or runs&#41;</option>
                          <option>Medium sized park &#40;big enough for activities&#41;</option>
                          <option>Small square &#40;read a book&#41;</option>
                        </select>

                        <h3>Walking distance</h3>
                        <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, park_distance: e.target.value })} name='park_distance' placeholder={editSearch.park_distance}></input>
                      </div>
                      : ''}
                  </div>
                  {/* Workplace */}
                  <div className='input-line'>
                    <div className='title-section'>
                      <h3 className='sub-title'>Workplace</h3>
                      <div className='section-buttons'>
                        {editSearch.workplace_selection ? <button name='workplace_selection' onClick={() => setEditSearch({ ...editSearch, workplace_selection: false })} value='false' className='delete-button'>Remove</button> : <button name='workplace_selection' onClick={() => setEditSearch({ ...editSearch, workplace_selection: true })} value='true' className='add-button'>Add</button>}
                      </div>
                    </div>
                    {editSearch.workplace_selection ?
                      <div className='section-detail'>
                        <h3>Postcode</h3>
                        <input className='input-postcode' onChange={(e) => setEditSearch({ ...editSearch, workplace_detail: e.target.value })} name='workplace_detail' placeholder={editSearch.workplace_detail}></input>
                        <h3>Transport</h3>
                        <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, workplace_transport: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='workplace_transport'>
                          <option>{editSearch.workplace_transport} (selected)</option>
                          <option>Walking</option>
                          <option>Cycling</option>
                          <option>Driving/ transport</option>
                        </select>
                        <h3>Walking distance</h3>
                        <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, workplace_distance: e.target.value })} name='workplace_distance' placeholder={editSearch.workplace_distance}></input>
                      </div>
                      : ''}
                  </div>
                  <hr className='inner-divider' />

                  {/* Third section - Travel */}
                  <h1 className='section-header'>Travel</h1>
                  {/* Tubes */}
                  <div className='input-line'>
                    <div className='title-section'>
                      <h3 className='sub-title'>Tubes</h3>
                      <div className='section-buttons'>
                        {editSearch.tube_selection ? <button name='tube_selection' onClick={() => setEditSearch({ ...editSearch, tube_selection: false })} value='false' className='delete-button'>Remove</button> : <button name='tube_selection' onClick={() => setEditSearch({ ...editSearch, tube_selection: true })} value='true' className='add-button'>Add</button>}
                      </div>
                    </div>
                    {editSearch.tube_selection ?
                      <div className='section-detail'>
                        <h3>Tube decision</h3>
                        <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, tube_decision: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='tube_decision'>
                          <option>{editSearch.tube_decision} (selected)</option>
                          <option>General tube station</option>
                          <option>Specific tube station</option>
                          <option>Specific tube line</option>
                        </select>
                        {editSearch.tube_decision === 'Specific tube station' ?
                          <>
                            <h3>Station</h3>
                            <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, tube_detail: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='tube_detail'>
                              <option>{editSearch.tube_detail} (selected)</option>
                              {stations ? stations.map(station => <option key={station} value={station}>{station}</option>) : ''}
                            </select>
                          </>
                          : editSearch.tube_decision === 'Specific tube line' ?
                            <>
                              <h3>Line</h3>
                              <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, tube_detail: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='tube_detail'>
                                <option>{editSearch.tube_detail} (selected)</option>
                                {lines.map(line => <option key={line} value={line}>{line}</option>)}
                              </select>
                            </>
                            : ''}
                        <h3>Walking distance</h3>
                        <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, tube_distance: e.target.value })} name='tube_distance' placeholder={editSearch.tube_distance}></input>
                      </div>
                      : ''}
                  </div>
                  {/* Trains */}
                  <div className='input-line'>
                    <div className='title-section'>
                      <h3 className='sub-title'>Trains</h3>
                      <div className='section-buttons'>
                        {editSearch.train_selection ? <button name='train_selection' onClick={() => setEditSearch({ ...editSearch, train_selection: false })} value='false' className='delete-button'>Remove</button> : <button name='train_selection' onClick={() => setEditSearch({ ...editSearch, train_selection: true })} value='true' className='add-button'>Add</button>}
                      </div>
                    </div>
                    {editSearch.train_selection ?
                      <div className='section-detail'>
                        <h3>Train decision</h3>
                        <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, train_decision: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='train_decision'>
                          <option>{editSearch.train_decision} (selected)</option>
                          <option>General train station</option>
                          <option>Specific train station</option>
                        </select>
                        {editSearch.tube_decision === 'Specific train station' ?
                          <>
                            <h3>Station</h3>
                            <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, train_detail: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='train_detail'>
                              <option>{editSearch.train_detail} (selected)</option>
                              {trainStations.map(station => <option key={station} value={station}>{station}</option>)}
                            </select>
                          </>
                          : ''}
                        <h3>Walking distance</h3>
                        <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, train_distance: e.target.value })} name='train_distance' placeholder={editSearch.train_distance}></input>
                      </div>
                      : ''}
                  </div>
                  <hr className='inner-divider' />

                  {/* Fourth section - Family */}
                  <h1 className='section-header'>Family</h1>
                  {/* Primary schools */}
                  <div className='input-line'>
                    <div className='title-section'>
                      <h3 className='sub-title'>Primary Schools</h3>
                      <div className='section-buttons'>
                        {editSearch.primary_selection ? <button name='primary_selection' onClick={() => setEditSearch({ ...editSearch, primary_selection: false })} value='false' className='delete-button'>Remove</button> : <button name='primary_selection' onClick={() => setEditSearch({ ...editSearch, primary_selection: true })} value='true' className='add-button'>Add</button>}
                      </div>
                    </div>
                    {editSearch.primary_selection ?
                      <div className='section-detail'>
                        <h3>Distance</h3>
                        <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, primary_distance: e.target.value })} name='primary_distance' placeholder={editSearch.primary_distance}></input>
                        <h3>Transport</h3>
                        <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, primary_mode: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='primary_mode'>
                          <option>{editSearch.primary_mode} (selected)</option>
                          <option>Walk</option>
                          <option>Cycle</option>
                          <option>Drive/ transport</option>
                        </select>
                        <h3>Religion</h3>
                        <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, primary_religion: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='primary_religion'>
                          <option>{editSearch.primary_religion} (selected)</option>
                          <option>No requirement</option>
                          <option>Anglican/ Church of England</option>
                          <option>Islam</option>
                          <option>Jewish</option>
                          <option>Roman Catholic</option>
                        </select>
                      </div>
                      : ''}
                  </div>
                  {/* Secondary schools */}
                  <div className='input-line'>
                    <div className='title-section'>
                      <h3 className='sub-title'>Secondary Schools</h3>
                      <div className='section-buttons'>
                        {editSearch.secondary_selection ? <button name='secondary_selection' onClick={() => setEditSearch({ ...editSearch, secondary_selection: false })} value={false} className='delete-button'>Remove</button> : <button name='secondary_selection' onClick={() => setEditSearch({ ...editSearch, secondary_selection: true })} value={true} className='add-button'>Add</button>}
                      </div>
                    </div>
                    {editSearch.secondary_selection ?
                      <div className='section-detail'>
                        <h3>Distance</h3>
                        <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, secondary_distance: e.target.value })} name='secondary_distance' placeholder={editSearch.secondary_distance}></input>
                        <h3>Transport</h3>
                        <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, secondary_mode: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='secondary_mode'>
                          <option>{editSearch.secondary_mode} (selected)</option>
                          <option>Walk</option>
                          <option>Cycle</option>
                          <option>Drive/ transport</option>
                        </select>
                        <h3>Religion</h3>
                        <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, secondary_religion: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='secondary_religion'>
                          <option>{editSearch.secondary_religion} (selected)</option>
                          <option>No requirement</option>
                          <option>Anglican/ Church of England</option>
                          <option>Islam</option>
                          <option>Jewish</option>
                          <option>Roman Catholic</option>
                        </select>
                      </div>
                      : ''}
                  </div>
                  {/* 6th forms */}
                  <div className='input-line'>
                    <div className='title-section'>
                      <h3 className='sub-title'>6th Forms</h3>
                      <div className='section-buttons'>
                        {editSearch.college_selection ? <button name='college_selection' onClick={() => setEditSearch({ ...editSearch, college_selection: false })} value='false' className='delete-button'>Remove</button> : <button name='college_selection' onClick={() => setEditSearch({ ...editSearch, college_selection: true })} value='true' className='add-button'>Add</button>}
                      </div>
                    </div>
                    {editSearch.college_selection ?
                      <div className='section-detail'>
                        <h3>Distance</h3>
                        <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, college_distance: e.target.value })} name='college_distance' placeholder={editSearch.college_distance}></input>
                        <h3>Transport</h3>
                        <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, college_mode: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='college_mode'>
                          <option>{editSearch.college_mode} (selected)</option>
                          <option>Walk</option>
                          <option>Cycle</option>
                          <option>Drive/ transport</option>
                        </select>
                        <h3>Religion</h3>
                        <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, college_religion: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='college_religion'>
                          <option>{editSearch.college_religion} (selected)</option>
                          <option>No requirement</option>
                          <option>Anglican/ Church of England</option>
                          <option>Islam</option>
                          <option>Jewish</option>
                          <option>Roman Catholic</option>
                        </select>
                      </div>
                      : ''}
                  </div>
                  <hr className='inner-divider' />
                  <h1 className='section-header'>Property details</h1>
                  {/* Property price */}
                  <div className='input-line'>
                    <div className='title-section'>
                      <h3 className='sub-title'>Price</h3>
                    </div>
                    <div className='section-detail'>
                      <h3>Min price</h3>
                      <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, property_price_min: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='property_price_min'>
                        <option><NumericFormat value={editSearch.property_price_min} displayType={'text'} thousandSeparator={true} prefix={'£'} /> (selected)</option>                          <option>No min</option>
                        <option>£200,000</option>
                        <option>£300,000</option>
                        <option>£400,000</option>
                        <option>£500,000</option>
                        <option>£600,000</option>
                        <option>£700,000</option>
                        <option>£800,000</option>
                        <option>£900,000</option>
                        <option>£1,000,000</option>
                        <option>£1,250,000</option>
                        <option>£1,500,000</option>
                        <option>£1,750,000</option>
                        <option>£2,000,000</option>
                        <option>£2,500,000</option>
                        <option>£3,000,000</option>
                        <option>£3,500,000</option>
                        <option>£4,000,000</option>
                        <option>£5,000,000</option>
                      </select>
                      <h3>Max price</h3>
                      <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, property_price_max: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='property_price_max'>
                        <option><NumericFormat value={editSearch.property_price_max} displayType={'text'} thousandSeparator={true} prefix={'£'} /> (selected)</option>
                        <option>No max</option>
                        <option>£300,000</option>
                        <option>£400,000</option>
                        <option>£500,000</option>
                        <option>£600,000</option>
                        <option>£700,000</option>
                        <option>£800,000</option>
                        <option>£900,000</option>
                        <option>£1,000,000</option>
                        <option>£1,250,000</option>
                        <option>£1,500,000</option>
                        <option>£1,750,000</option>
                        <option>£2,000,000</option>
                        <option>£2,500,000</option>
                        <option>£3,000,000</option>
                        <option>£3,500,000</option>
                        <option>£4,000,000</option>
                        <option>£5,000,000</option>
                        <option>£10,000,000</option>
                      </select>
                    </div>
                  </div>
                  {/* Property Bedrooms */}
                  <div className='input-line'>
                    <div className='title-section'>
                      <h3 className='sub-title'>Bedrooms</h3>
                    </div>
                    <div className='section-detail'>
                      <h3>Min bedrooms</h3>
                      <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, property_bed_min: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='property_bed_min'>
                        <option>{editSearch.property_bed_min} (selected)</option>
                        <option>No min</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                      </select>
                      <h3>Max bedrooms</h3>
                      <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, property_bed_max: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='property_bed_max'>
                        <option>{editSearch.property_bed_max} (selected)</option>
                        <option>No min</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </select>
                    </div>
                  </div>
                  {/* Property type */}
                  <div className='input-line'>
                    <div className='title-section'>
                      <h3 className='sub-title'>Other details</h3>
                    </div>
                    <div className='section-detail'>
                      <h3>Type</h3>
                      <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, property_type: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='property_type'>
                        <option>{editSearch.property_type} (selected)</option>
                        <option>Any</option>
                        <option>House</option>
                        <option>Flat</option>
                      </select>
                    </div>
                  </div>
                </div>
                <hr className='inner-divider' />
              </div>
              <div className='edit-footer'>
                <div className='submission'>
                  <button name='result_id' value={editSearch.result_id} id='Save' onClick={postEditSearch} className='edit-submit'>Save</button>
                  <button name='result_id' value={editSearch.result_id} id='Submit' onClick={postEditSearch} className='edit-submit'>View Results</button>
                </div>
                <button onClick={handleEditClose} className='edit-close'>Close</button>

              </div>
            </>
            : ''}
        </Modal.Body>
      </Modal>
      <Modal show={searchShow} onHide={handleSearchClose} backdrop='static' className='search-details'>
        <Modal.Body>
          {calc10 ?
            <>
              <h3>Search details &gt;</h3>
              <div className='input-sections'>
                <h5>Property</h5>
                <div className='poi'><p>Type: {formData.property_type}</p></div>


                <div className='poi'><p>Price: <NumericFormat value={formData.property_price_min} displayType={'text'} thousandSeparator={true} prefix={'£'} /> - <NumericFormat value={formData.property_price_max} displayType={'text'} thousandSeparator={true} prefix={'£'} /> </p></div>
                <div className='poi'><p>Bedrooms: {formData.property_bed_min} - {formData.property_bed_max}</p></div>
              </div>
              <div className='input-sections'>
                <h5>Points of interest</h5>
                {formData.restaurant_selection ? <div className='poi'><p>👨‍🍳 Restaurants: {formData.restaurant_distance} min walk</p></div> : ''}
                {formData.takeaway_selection ? <div className='poi'><p>🍜 Takeaways: {formData.takeaway_distance} min walk</p></div> : ''}
                {formData.cafes_selection ? <div className='poi'><p>☕️ Cafes: {formData.cafes_distance} min walk</p></div> : ''}
                {formData.pubs_selection ? <div className='poi'><p>🍻 Pubs: {formData.pubs_distance} min walk</p></div> : ''}
                {formData.supermarket_selection ? <div className='poi'><p>🛒 Supermarkets: {formData.supermarket_distance} min walk</p></div> : ''}
                {formData.gym_selection ? <div className='poi'><p>🏋️‍♂️ Gyms: {formData.gym_distance} min walk</p></div> : ''}
                {formData.park_selection ? <div className='poi'><p>🌳 Park: {formData.park_distance} min walk</p></div> : ''}
                {formData.workplace_selection ? <div className='poi'><p>✍🏼 Workplace: {formData.workplace_distance} min walk</p></div> : ''}
                {formData.tube_selection ? <div className='poi'><p>🚇 Tube stations: {formData.tube_distance} min walk</p></div> : ''}
                {formData.train_selection ? <div className='poi'><p>🚅 Train stations: {formData.train_distance} min walk</p></div> : ''}
                {formData.primary_selection ? <div className='poi'><p>🏫 Primary schools: {formData.primary_distance} min walk</p></div> : ''}
                {formData.secondary_selection ? <div className='poi'><p>🏫 Secondary schools: {formData.secondary_distance} min walk</p></div> : ''}
                {formData.college_distance ? <div className='poi'><p>🏫 6th forms: {formData.college_distance} min walk</p></div> : ''}
                {formData.family_distance_1 ? <div className='poi'><p>👨‍👩‍👧‍👦 Friends & family: {formData.family_distance_1} min walk</p></div> : ''}
              </div>
              <div className='bottom-buttons'>
                <button onClick={handleEditShow} className='edit-button'>Edit</button>
                <button onClick={handleSearchClose} className='close-button'>Close</button>
              </div>
            </>
            : ''}
        </Modal.Body>
      </Modal>

    </>

  )
}

export default EditSearch

