import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Modal from 'react-modal'
// import Button from 'react-native-button'
// import Form from 'react-bootstrap/Form'


import Timeline3 from '../tools/Timeline3'
import TubesLeft from './formBlocks/travel/TubesLeft'
import TubesRight from './formBlocks/travel/TubesRight'
import TrainsLeft from './formBlocks/travel/TrainsLeft'
import TrainsRight from './formBlocks/travel/TrainsRight'
import NavBar from '../tools/NavBar'


const Travel = () => {

  // states for holding the tube information
  const [tubeDataset, setTubeDataset] = useState([])
  const [stations, setStations] = useState([])
  const [lines, setLines] = useState([])

  // states for holding the train information
  const [trains, setTrains] = useState([])
  const [trainStations, setTrainStations] = useState([])

  const [errors, setErrors] = useState()

  // states for filling out the form
  const [formData, setFormData] = useState({
    start_search: true,
    search_name: '',
    restaurant_selection: false,
    restaurant_decision: '',
    restaurant_distance: 0,
    restaurant_cuisine_1: '',
    restaurant_cuisine_2: '',
    takeaway_selection: false,
    takeaway_decision: '',
    takeaway_distance: 0,
    takeaway_cuisine_1: '',
    takeaway_cuisine_2: '',
    pubs_selection: false,
    pubs_distance: 0,
    cafes_selection: '',
    cafes_decision: '',
    cafes_detail: '',
    cafes_distance: 0,
    tube_selection: false,
    tube_decision: 'Select option',
    tube_detail: '',
    tube_distance: 0,
    train_selection: false,
    train_decision: 'Select option',
    train_detail: '',
    train_distance: 0,
    primary_selection: false,
    primary_religion: '',
    primary_mode: '',
    primary_distance: 0,
    college_selection: false,
    college_religion: '',
    college_mode: '',
    college_distance: 0,
    secondary_selection: false,
    secondary_religion: '',
    secondary_mode: '',
    secondary_distance: 0,
    supermarket_selection: false,
    supermarket_decision: '',
    supermarket_segment: '',
    supermarket_size: '',
    supermarket_distance: 0,
    gym_selection: false,
    gym_studio_name: '',
    gym_class_type: '',
    gym_distance: 0,
    park_selection: false,
    park_type: '',
    park_distance: 0,
    workplace_selection: false,
    workplace_detail: '',
    workplace_transport: '',
    workplace_distance: 0,
    family_selection: false,
    family_detail_1: '',
    family_distance_1: 0,
    family_detail_2: '',
    family_distance_2: 0,
    family_detail_3: '',
    family_distance_3: 0,
    property_price_min: '',
    property_price_max: '',
    property_bed_min: '',
    property_bed_max: '',
    property_type: '',
  })

  // get form data from storage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('wittle-form-input'))
    if (data) setFormData(data)
  }, [])

  // handling the slider states

  // general update for drop down menus
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // define function to set state to storage
  const setStateToLocalStorage = (token) => {
    window.localStorage.setItem('wittle-form-input', JSON.stringify(formData))
  }

  // execute setting state to local storage
  useEffect(() => {
    // if (formData) {
    setStateToLocalStorage()
    // }
  }, [formData])


  // ? Managing states for the drop down menus of stations and lines
  // ectract tube data from the database
  useEffect(() => {
    const getTubes = async () => {
      try {
        const { data } = await axios.get('/api/tubes/')
        setTubeDataset(data)
        console.log('tube data ->', data)
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
        console.log('train data ->', data)
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
    <><section className='main-form-pages'>
      <NavBar />
      <section className='form-input-page'>
        {/* Top section of the page with header and timeline bar */}
        <section className='title-section'>
          <h1>Now for the detail</h1>
          <Timeline3 />
          <div className='form-selections-large'>
            {formData.restaurant_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 0.2)' }}>Restaurants</button> : ''}
            {formData.cafes_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 0.2)' }}>Cafes</button> : ''}
            {formData.takeaway_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 0.2)' }}>Takeaways</button> : ''}
            {formData.pubs_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 0.2)' }}>Pubs & Bars</button> : ''}
            {formData.tube_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 1)' }}>Tubes</button> : ''}
            {formData.train_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 1)' }}>Trains</button> : ''}
            {formData.supermarket_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 0.2)' }}>Supermarkets</button> : ''}
            {formData.gym_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 0.2)' }}>Gyms</button> : ''}
            {formData.park_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 0.2)' }}>Parks</button> : ''}
            {formData.workplace_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 0.2)' }}>Workplace</button> : ''}
            {formData.primary_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 0.2)' }}>Primary Schools</button> : ''}
            {formData.secondary_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 0.2)' }}>Secondary Schools</button> : ''}
            {formData.college_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 0.2)' }}>6th Forms</button> : ''}
            {formData.family_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 0.2)' }}>Friends & Family</button> : ''}
          </div>
          <div className='form-selections-small'>
            {formData.restaurant_selection || formData.cafes_selection || formData.takeaway_selection || formData.pubs_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 0.2)' }}>Hospitality</button> : ''}
            {formData.train_selection || formData.tube_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 1)' }}>Travel</button> : ''}
            {formData.supermarket_selection || formData.gym_selection || formData.park_selection || formData.workplace_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 0.2)' }}>Lifestyle</button> : ''}
            {formData.primary_selection || formData.secondary_selection || formData.college_selection || formData.family_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 0.2)' }}>Family</button> : ''}
          </div>
        </section>
        <section className='main-content-detail'>
          <div className='form-selection'>
            <h1>Travel</h1>
            {(formData.tube_selection & formData.train_selection) ?
              <><div className='form-filling-section-1'>
                <div className='form-filling-grid'>
                  <div className='form-filling-detail-left'>
                    <h3>Tubes</h3>
                    <p>Do you want to generally be close to any tube station, a specific tube station, or a specific line?</p>
                    <div className='button-selectors' name='tube_decision'>
                      <select className='form-control' placeholder='Select option' name='tube_decision' onChange={handleChange}>Select option
                        <option>Select option</option>
                        <option>General tube station</option>
                        <option>Specific tube station</option>
                        <option>Specific tube line</option>
                      </select>
                    </div>
                    {formData.tube_decision === '' ? <h4></h4> :
                      formData.tube_decision === 'General tube station' ? <h4></h4> :
                        formData.tube_decision === 'Select option' ? <h4></h4> :
                          formData.tube_decision === 'Specific tube station' ?
                            <>
                              <p className='cuisine-choice'>Select your tube station</p>
                              <div className='cuisine-dropdowns'>
                                <select className='form-control' id='cuisine-drop-1' placeholder='Select station' name='tube_detail' onChange={handleChange}>Select station
                                  <option>Select station</option>
                                  {stations ? stations.map(station => <option key={station} value={station}>{station}</option>) : ''}
                                </select>
                              </div>
                            </>
                            :
                            <>
                              <p className='cuisine-choice'>Select your tube line</p>
                              <div className='cuisine-dropdowns'>
                                <select className='form-control' id='cuisine-drop-1' placeholder='Select line' name='tube_detail' onChange={handleChange}>Select line
                                  <option>Select line</option>
                                  {lines.map(line => <option key={line} value={line}>{line}</option>)}
                                </select>
                              </div>
                            </>}
                    <p className='distance-text'>What is the furthest distance you would like to walk to get there?</p><div className='slider-container'>
                      <input
                        type='range'
                        onChange={(e) => setFormData({ ...formData, tube_distance: e.target.value })}
                        name={formData.tube_distance}
                        className='slider'
                        defaultValue='20'
                        min='1'
                        max='100'
                        step='1'>
                      </input>
                    </div><p>{formData.tube_distance} minutes</p>
                  </div>
                  <div className='form-filling-image-right' id='tube-image'>

                  </div>
                </div>
              </div>
              <div className='form-filling-section-2' id='cafe-grid'>
                <div className='form-filling-grid'>
                  <div className='form-filling-detail-right'>
                    <h3>Trains</h3>
                    <p>Do you want to generally be close to any train stations or a specific station?</p>
                    <div className='button-selectors' name='train_decision'>
                      <select className='form-control' placeholder='Select option' name='train_decision' onChange={handleChange}>Select option
                        <option>Select option</option>
                        <option>General train station</option>
                        <option>Specific train station</option>
                      </select>
                    </div>
                    {formData.train_decision === '' ? <h4></h4> :
                      formData.train_decision === 'General train station' ? <h4></h4> :
                        formData.train_decision === 'Select option' ? <h4></h4>
                          :
                          <>
                            <p className='cuisine-choice'>Select your train station</p>
                            <div className='cuisine-dropdowns'>
                              <select className='form-control' id='cuisine-drop-1' placeholder='Select station' name='train_detail' onChange={handleChange}>Select station
                                <option>Select station</option>
                                {trainStations.map(station => <option key={station} value={station}>{station}</option>)}
                              </select>
                            </div>
                          </>}
                    <p className='distance-text'>What is the furthest distance you would like to walk to get there?</p><div className='slider-container'>
                      <input
                        type='range'
                        onChange={(e) => setFormData({ ...formData, train_distance: e.target.value })}
                        name={formData.train_distance}
                        className='slider'
                        defaultValue='20'
                        min='1'
                        max='100'
                        step='1'>
                      </input>
                    </div>
                    <p>{formData.train_distance} minutes</p>
                  </div>
                  <div className='form-filling-image-right' id='train-image'>

                  </div>
                </div>

              </div></>
              : ''}

            {/* Tubes but no trains */}
            {(formData.tube_selection & !formData.train_selection) ?
              <><div className='form-filling-section-1'>
                <div className='form-filling-grid'>
                  <div className='form-filling-detail-left'>
                    <h3>Tubes</h3>
                    <p>Do you want to generally be close to any tube station, a specific tube station, or a specific line?</p>
                    <div className='button-selectors' name='tube_decision'>
                      <select className='form-control' placeholder='Select option' name='tube_decision' onChange={handleChange}>Select option
                        <option>Select option</option>
                        <option>General tube station</option>
                        <option>Specific tube station</option>
                        <option>Specific tube line</option>
                      </select>
                    </div>
                    {formData.tube_decision === '' ? <h4></h4> :
                      formData.tube_decision === 'General tube station' ? <h4></h4> :
                        formData.tube_decision === 'Select option' ? <h4></h4> :
                          formData.tube_decision === 'Specific tube station' ?
                            <>
                              <p className='cuisine-choice'>Select your tube station</p>
                              <div className='cuisine-dropdowns'>
                                <select className='form-control' id='cuisine-drop-1' placeholder='Select station' name='tube_detail' onChange={handleChange}>Select station
                                  <option>Select station</option>
                                  {stations ? stations.map(station => <option key={station} value={station}>{station}</option>) : ''}
                                </select>
                              </div>
                            </>
                            :
                            <>
                              <p className='cuisine-choice'>Select your tube line</p>
                              <div className='cuisine-dropdowns'>
                                <select className='form-control' id='cuisine-drop-1' placeholder='Select line' name='tube_detail' onChange={handleChange}>Select line
                                  <option>Select line</option>
                                  {lines.map(line => <option key={line} value={line}>{line}</option>)}
                                </select>
                              </div>
                            </>}
                    <p className='distance-text'>What is the furthest distance you would like to walk to get there?</p><div className='slider-container'>
                      <input
                        type='range'
                        onChange={(e) => setFormData({ ...formData, tube_distance: e.target.value })}
                        name={formData.tube_distance}
                        className='slider'
                        defaultValue='20'
                        min='1'
                        max='100'
                        step='1'>
                      </input>
                    </div><p>{formData.tube_distance} minutes</p>
                  </div>
                  <div className='form-filling-image-right' id='tube-image'>

                  </div>
                </div>
              </div>
              </>
              : ''}

            {/* Trains but no tubes */}
            {(!formData.tube_selection & formData.train_selection) ?
              <>
                <div className='form-filling-section-1' id='cafe-grid'>
                  <div className='form-filling-grid'>
                    <div className='form-filling-detail-left'>
                      <h3>Trains</h3>
                      <p>Do you want to generally be close to any train stations or a specific station?</p>
                      <div className='button-selectors' name='train_decision'>
                        <select className='form-control' placeholder='Select option' name='train_decision' onChange={handleChange}>Select option
                          <option>Select option</option>
                          <option>General train station</option>
                          <option>Specific train station</option>
                        </select>
                      </div>
                      {formData.train_decision === '' ? <h4></h4> :
                        formData.train_decision === 'General train station' ? <h4></h4> :
                          formData.train_decision === 'Select option' ? <h4></h4>
                            :
                            <>
                              <p className='cuisine-choice'>Select your train station</p>
                              <div className='cuisine-dropdowns'>
                                <select className='form-control' id='cuisine-drop-1' placeholder='Select station' name='train_detail' onChange={handleChange}>Select station
                                  <option>Select station</option>
                                  {trainStations.map(station => <option key={station} value={station}>{station}</option>)}
                                </select>
                              </div>
                            </>}
                      <p className='distance-text'>What is the furthest distance you would like to walk to get there?</p><div className='slider-container'>
                        <input
                          type='range'
                          onChange={(e) => setFormData({ ...formData, train_distance: e.target.value })}
                          name={formData.train_distance}
                          className='slider'
                          defaultValue='20'
                          min='1'
                          max='100'
                          step='1'>
                        </input>
                      </div>
                      <p>{formData.train_distance} minutes</p>
                    </div>
                    <div className='form-filling-image-right' id='train-image'>

                    </div>
                  </div>

                </div></>
              : ''}
            <Link to={'/wittle-search/lifestyle'}><button className='next'>Next</button></Link>
          </div>
        </section >
      </section>
    </section ></>
  )

}

export default Travel