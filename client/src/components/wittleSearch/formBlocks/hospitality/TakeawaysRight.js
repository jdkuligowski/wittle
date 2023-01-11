


import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Slider } from 'material-ui-slider'




const TakeawaysRight = () => {

  // states for changing button colours
  const [specificTakeaway, setSpecificTakeaway] = useState(false)
  const [anyTakeaway, setAnyTakeaway] = useState(false)


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


  // handling the slider states

  // general update for drop down menus
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // update for the specific vs general question - restaurants
  useEffect(() => {
    if (anyTakeaway & specificTakeaway)
      formData.takeaway_decision = 'Both'
    else if (anyTakeaway)
      formData.specificTakeaway = 'Takeaways'
    else if (specificTakeaway)
      formData.takeaway_decision = 'Specific'
    else
      ''
  })

  return (

    <div className='form-filling-section-2' id='takeaway-grid'>
      <div className='form-filling-grid'>
        <div className='form-filling-detail-right'>
          <h3>Takeaways</h3>
          <p>Do you want to be near all types of good takeaways, or a specific cuisine, or both?</p>
          <div className='button-selectors' name='takeaway_decision' value={anyTakeaway & specificTakeaway ? 'Both' : anyTakeaway ? 'Restaurants' : 'Cuisine'} >
            <button id='any' onClick={() => setAnyTakeaway(!anyTakeaway)} style={{ backgroundColor: anyTakeaway ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.2)' }}>Any takeaways</button>
            <button id='specific' onClick={() => setSpecificTakeaway(!specificTakeaway)} style={{ backgroundColor: specificTakeaway ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.2)' }}>Specific cuisine</button>
          </div>
          <p className='cuisine-choice'>Choose up to 2 cuisines</p>
          <div className='cuisine-dropdowns'>
            <select className='form-control' id='cuisine-drop-1' placeholder='Pick cuisine' name='takeaway_cuisine_1' onChange={handleChange}>Pick cuisine
              <option>Pick cuisine</option>
              <option>Cuisine 1</option>
              <option>Cuisine 2</option>
              <option>Cuisine 3</option>
            </select>
            <select className='form-control' id='cuisine-drop-2' placeholder='Pick cuisine' name='takeaway_cuisine_2' onChange={handleChange}>Pick cuisine
              <option>Pick cuisine</option>
              <option>Cuisine 1</option>
              <option>Cuisine 2</option>
              <option>Cuisine 3</option>
            </select>
          </div>
          <p className='distance-text'>What is the furthest distance you would like to walk to a restaurant?</p>
          <div className='slider-container'>
            <input
              type='range'
              onChange={(e) => setFormData({ ...formData, takeaway_distance: e.target.value })}
              name={formData.takeaway_distance}
              className='slider'
              defaultValue='20'
              min='1'
              max='100'
              step='1'>
            </input>
          </div>
          <p>{formData.takeaway_distance} minutes</p>
        </div>
        <div className='form-filling-image-right' id='takeaway-image'>

        </div>
      </div>
    </div>

  )
}
export default TakeawaysRight


