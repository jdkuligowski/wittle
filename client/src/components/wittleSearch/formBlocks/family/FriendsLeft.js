

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Slider } from 'material-ui-slider'




const FriendsLeft = () => {


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



  return (
    <div className='form-filling-section-1' id='restaurant-grid'>
      <div className='form-filling-grid'>
        <div className='form-filling-detail-left'>
          <h3>Friends & Family</h3>
          <div className='form-detail'>
            <div className='form-detail-address' id='name'>
              <h4>Name</h4>
              <input type="text" name='family_detail_1' onChange={handleChange} />
            </div>
            <div className='form-detail-address'>
              <h4>Postcode</h4>
              <input type="text" name='family_distance_1' onChange={handleChange} />
            </div>
          </div>
          <p className='distance-text'>How far away from this person do you want to be?</p>
          <div className='slider-container'>
            <input
              type='range'
              onChange={(e) => setFormData({ ...formData, family_distance_1: e.target.value })}
              name={formData.family_distance_1}
              className='slider'
              defaultValue='20'
              min='1'
              max='100'
              step='1'>
            </input>
          </div>
          <p>{formData.family_distance_1} minutes</p>
          <div className='form-detail'>
            <div className='form-detail-address' id='name'>
              <h4>Name</h4>
              <input type="text" name='family_detail_2' onChange={handleChange} />
            </div>
            <div className='form-detail-address'>
              <h4>Postcode</h4>
              <input type="text" name='family_distance_2' onChange={handleChange} />
            </div>
          </div>
          <p className='distance-text'>How far away from this person do you want to be?</p>
          <div className='slider-container'>
            <input
              type='range'
              onChange={(e) => setFormData({ ...formData, family_distance_2: e.target.value })}
              name={formData.family_distance_2}
              className='slider'
              defaultValue='20'
              min='1'
              max='100'
              step='1'>
            </input>
          </div>
          <p>{formData.family_distance_2} minutes</p>
          <div className='form-detail'>
            <div className='form-detail-address' id='name'>
              <h4>Name</h4>
              <input type="text" name='family_detail_3' onChange={handleChange} />
            </div>
            <div className='form-detail-address'>
              <h4>Postcode</h4>
              <input type="text" name='family_distance_3' onChange={handleChange} />
            </div>
          </div>
          <p className='distance-text'>How far away from this person do you want to be?</p>
          <div className='slider-container'>
            <input
              type='range'
              onChange={(e) => setFormData({ ...formData, family_distance_3: e.target.value })}
              name={formData.family_distance_3}
              className='slider'
              defaultValue='20'
              min='1'
              max='100'
              step='1'>
            </input>
          </div>
          <p>{formData.family_distance_3} minutes</p>
        </div>
        <div className='form-filling-image-right' id='friends-image'>

        </div>
      </div>
    </div>

  )



}

export default FriendsLeft