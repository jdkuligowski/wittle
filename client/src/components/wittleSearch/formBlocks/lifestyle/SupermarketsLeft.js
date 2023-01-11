import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Modal from 'react-modal'
// import Button from 'react-native-button'
// import Form from 'react-bootstrap/Form'




const SupermarketsLeft = () => {


  const [anySupermarket, setAnySupermarket] = useState(true)
  const [specificSupermarket, setSpecificSupermarket] = useState(false)


  // states for filling out the form
  const [formData, setFormData] = useState({
    start_search: true,
    search_name: '',
    restaurant_selection: false,
    restaurant_decision: '',
    restaurant_distance: '',
    restaurant_cuisine_1: '',
    restaurant_cuisine_2: '',
    takeaway_selection: false,
    takeaway_decision: '',
    takeaway_distance: '',
    takeaway_cuisine_1: '',
    takeaway_cuisine_2: '',
    pubs_selection: false,
    pubs_distance: '',
    cafes_selection: '',
    cafes_decision: '',
    cafes_detail: '',
    cafes_distance: '',
    tube_selection: false,
    tube_decision: '',
    tube_detail: '',
    tube_distance: '',
    train_selection: false,
    train_decision: '',
    train_detail: '',
    train_distance: '',
    primary_selection: false,
    primary_religion: '',
    primary_mode: '',
    primary_distance: '',
    college_selection: false,
    college_religion: '',
    college_mode: '',
    college_distance: '',
    secondary_selection: false,
    secondary_religion: '',
    secondary_mode: '',
    secondary_distance: '',
    supermarket_selection: false,
    supermarket_decision: '',
    supermarket_segment: '',
    supermarket_size: '',
    supermarket_distance: '',
    gym_selection: false,
    gym_studio_name: '',
    gym_class_type: '',
    gym_distance: '',
    park_selection: false,
    park_type: '',
    park_distance: '',
    workplace_selection: false,
    workplace_detail: '',
    workplace_transport: '',
    workplace_distance: '',
    family_selection: false,
    family_detail_1: '',
    family_distance_1: '',
    family_detail_2: '',
    family_distance_2: '',
    family_detail_3: '',
    family_distance_3: '',
  })

  // get form data from storage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('wittle-form-input'))
    if (data) setFormData(data)
  }, [])

  // update for the specific vs general question - restaurants
  useEffect(() => {
    if (anySupermarket)
      formData.supermarket_decision = 'Any'
    else if (specificSupermarket)
      formData.supermarket_decision = 'Specific'
    else
      ''
  })

  // general update for drop down menus
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }



  return (
    <div className='form-filling-section-1' id='supermarket-grid'>
      <div className='form-filling-grid'>
        <div className='form-filling-detail-left'>
          <h3>Supermarkets</h3>
          <p>Do you want to be near any supermarket or a specfic type of supermarket?</p>
          <div className='button-selectors' name='supermarket_decision' onClick={() => {
            setAnySupermarket(!anySupermarket); setSpecificSupermarket(!specificSupermarket)
          }}>
            <button id='any' style={{ backgroundColor: !anySupermarket ? 'rgba(255, 167, 229, 0.2)' : 'rgba(255, 167, 229, 1)' }}>Any supermarket</button>
            <button id='specific' style={{ backgroundColor: !specificSupermarket ? 'rgba(255, 167, 229, 0.2)' : 'rgba(255, 167, 229, 1)' }}>Specific supermarket</button>
          </div>
          {formData.supermarket_decision === '' ? <h4></h4> :
            anySupermarket ? <h4></h4> :
              <>
                <p className='cuisine-choice'>Choose the type of supermarket</p><div className='cuisine-dropdowns'>
                  <select className='form-control' id='cuisine-drop-1' placeholder='Pick cuisine' name='supermarket_segment' onChange={handleChange}>Pick supermarket
                    <option>Pick supermarket</option>
                    <option>Budget</option>
                    <option>Convenience</option>
                    <option>Mainstream</option>
                    <option>Premium</option>
                  </select>
                </div></>}
          <p className='distance-text'>Are you looking for a certain size of store?</p>
          <select className='form-control' id='cuisine-drop-2' placeholder='Pick cuisine' name='supermarket_size' onChange={handleChange}>Pick supermarket
            <option>Select option</option>
            <option>Don&apos;t mind</option>
            <option>Small </option>
            <option>Medium</option>
            <option>Large</option>
          </select>
          <p className='distance-text'>How far away do you want to be from the supermarket?</p>
          <div className='slider-container'>
            <input
              type='range'
              onChange={(e) => setFormData({ ...formData, supermarket_distance: e.target.value })}
              name={formData.supermarket_distance}
              className='slider'
              defaultValue='20'
              min='1'
              max='100'
              step='1'>
            </input>
          </div>
          <p>{formData.supermarket_distance} minutes</p>
        </div>
        <div className='form-filling-image-right' id='supermarket-image'>

        </div>
      </div>
    </div>

  )

}

export default SupermarketsLeft