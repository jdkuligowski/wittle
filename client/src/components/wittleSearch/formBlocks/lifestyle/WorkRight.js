import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Modal from 'react-modal'


const WorkRight = () => {

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
    <div className='form-filling-section-2' id='work-grid'>
      <div className='form-filling-grid'>
        <div className='form-filling-detail-right' id='work'>
          <h3>Workplace</h3>
          <p className='distance-text'>What is the postcode of your work?</p>
          <div className='form-detail-address'>
            <input type="text" name='workplace_detail' onChange={handleChange} />
          </div>
          <p className='distance-text'>How would you like to travel to get there?</p>
          <div className='cuisine-dropdowns'>
            <select className='form-control' id='cuisine-drop-1' placeholder='Select transport' name='workplace_selection' onChange={handleChange}>Choose mode of transport
              <option>Choose mode of transport</option>
              <option>Walking</option>
              <option>Cycling</option>
              <option>Driving/ transport</option>
            </select>

          </div>
          <p className='distance-text'>What is the maximum time you want to spend on your journey?</p>
          <div className='slider-container'>
            <input
              type='range'
              onChange={(e) => setFormData({ ...formData, workplace_distance: e.target.value })}
              name={formData.workplace_distance}
              className='slider'
              defaultValue='20'
              min='1'
              max='100'
              step='1'>
            </input>
          </div>
          <p>{formData.workplace_distance} minutes</p>

        </div>
        <div className='form-filling-image-right' id='work-image'>

        </div>
      </div>
    </div>

  )

}

export default WorkRight