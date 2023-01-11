import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Modal from 'react-modal'




const GymsLeft = () => {


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

  // general update for drop down menus
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }


  return (
    <div className='form-filling-section-1' id='gym-grid'>
      <div className='form-filling-grid'>
        <div className='form-filling-detail-left'>
          <h3>Gyms</h3>
          <p>Are there any studios or gyms you would like to be near?</p>
          <p className='cuisine-choice'>Select a gym/studio</p>
          <div className='cuisine-dropdowns'>
            <select className='form-control' id='cuisine-drop-1' placeholder='Pick cafe' name='gym_studio_name' onChange={handleChange}>Pick gym/ studio
              <option>Select option</option>
              <option>No preference</option>
              <option>1Rebel</option>
              <option>Gymbox</option>
              <option>Pure Gym</option>
              <option>The Gym Group</option>
              <option>Third Space</option>
            </select>
          </div>
          <p className='distance-text'>What is the furthest distance you would like to walk to get there?</p>
          <div className='slider-container'>
            <input
              type='range'
              onChange={(e) => setFormData({ ...formData, gym_distance: e.target.value })}
              name={formData.gym_distance}
              className='slider'
              defaultValue='20'
              min='1'
              max='100'
              step='1'>
            </input>
          </div>
          <p>{formData.gym_distance} minutes</p>
        </div>
        <div className='form-filling-image-right' id='gyms-image'>

        </div>
      </div>
    </div>

  )

}

export default GymsLeft