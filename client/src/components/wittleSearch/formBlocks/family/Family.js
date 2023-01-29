import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Modal from 'react-modal'
// import Button from 'react-native-button'
// import Form from 'react-bootstrap/Form'


import Timeline3 from '../../../tools/Timeline3'
import Primaries from './Primaries'
import SecondariesRight from './SecondariesRight'
import SecondariesLeft from './SecondariesLeft'
import CollegesLeft from './CollegesLeft'
import CollegesRight from './CollegesRight'
import FriendsRight from './FriendsRight'
import FriendsLeft from './FriendsLeft'
import NavBar from '../../../tools/NavBar'



const Family = () => {


  // set state for the number of true values in hospitality
  const [truths, setTruths] = useState()

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
    tube_decision: '',
    tube_detail: '',
    tube_distance: 0,
    train_selection: false,
    train_decision: '',
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


  // check the number of elements populated - to be used in the logic to fill the page
  const checkingState = () => {
    const array = [formData.primary_selection, formData.secondary_selection, formData.college_selection, formData.family_selection]
    const count = array.filter(Boolean).length
    setTruths(count)
  }

  // carry out the calculation for checking the number of true elements populated
  useEffect(() => {
    checkingState()
  })

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


  return (
    <section className='main-form-pages'>
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
            {formData.tube_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 0.2)' }}>Tubes</button> : ''}
            {formData.train_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 0.2)' }}>Trains</button> : ''}
            {formData.supermarket_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 0.2)' }}>Supermarkets</button> : ''}
            {formData.gym_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 0.2)' }}>Gyms</button> : ''}
            {formData.park_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 0.2)' }}>Parks</button> : ''}
            {formData.workplace_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 0.2)' }}>Workplace</button> : ''}
            {formData.primary_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 1)' }}>Primary Schools</button> : ''}
            {formData.secondary_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 1)' }}>Secondary Schools</button> : ''}
            {formData.college_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 1)' }}>6th Forms</button> : ''}
            {formData.family_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 1)' }}>Friends & Family</button> : ''}
          </div>
          <div className='form-selections-small'>
            {formData.restaurant_selection || formData.cafes_selection || formData.takeaway_selection || formData.pubs_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 0.2)' }}>Hospitality</button> : ''}
            {formData.train_selection || formData.tube_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 0.2)' }}>Travel</button> : ''}
            {formData.supermarket_selection || formData.gym_selection || formData.park_selection || formData.workplace_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 0.2)' }}>Lifestyle</button> : ''}
            {formData.primary_selection || formData.secondary_selection || formData.college_selection || formData.family_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 1)' }}>Family</button> : ''}

          </div>
        </section>
        <section className='main-content-detail'>
          <div className='form-selection'>
            <h1>Family</h1>
            {/* Split out logic for when different lifestyle options are selected */}
            {/* Supermarkets selected or not */}
            {formData.primary_selection ?
              <div className='form-filling-section-1' id='restaurant-grid'>
                <div className='form-filling-grid'>
                  <div className='form-filling-detail-left'>
                    <h3>Primary Schools</h3>
                    <p className='distance-text'>What is the longest amount of time you would like to take to get there?</p>
                    <div className='slider-container'>
                      <input
                        type='range'
                        onChange={(e) => setFormData({ ...formData, primary_distance: e.target.value })}
                        name={formData.primary_distance}
                        className='slider'
                        defaultValue='0'
                        min='1'
                        max='20'
                        step='1'>
                      </input>
                    </div>
                    <p>{formData.primary_distance} minutes</p>
                    <p>How would you like to be able to travel there?</p>
                    <select className='form-control' id='cuisine-drop-1' placeholder='Pick transport' name='primary_mode' onChange={handleChange} >Choose mode
                      <option>Choose mode</option>
                      <option>Walk</option>
                      <option>Cycle</option>
                      <option>Drive/ transport</option>
                    </select>
                    <p className='cuisine-choice'>Do you have any religious requirements for the school?</p>
                    <div className='cuisine-dropdowns'>
                      <select className='form-control' id='cuisine-drop-1' placeholder='Pick relgious requirement' name='primary_religion' onChange={handleChange} >Pick relgion
                        <option>No requirement</option>
                        <option>Anglican/ Church of England</option>
                        <option>Islam</option>
                        <option>Jewish</option>
                        <option>Roman Catholic</option>
                      </select>
                    </div>

                  </div>
                  <div className='form-filling-image-right' id='primary-image'>

                  </div>
                </div>
              </div>
              : ''}

            {/* Gyms selected or not */}
            {/* Gyms and supermarkets selected - gym needs to sit on right */}
            {formData.secondary_selection & formData.primary_selection ?
              <div className='form-filling-section-2' id='restaurant-grid'>
                <div className='form-filling-grid'>
                  <div className='form-filling-detail-right'>
                    <h3>Secondary Schools</h3>
                    <p className='distance-text'>What is the longest amount of time you would like to take to get there?</p>
                    <div className='slider-container'>
                      <input
                        type='range'
                        onChange={(e) => setFormData({ ...formData, secondary_distance: e.target.value })}
                        name={formData.secondary_distance}
                        className='slider'
                        defaultValue='0'
                        min='1'
                        max='20'
                        step='1'>
                      </input>
                    </div>
                    <p>{formData.secondary_distance} minutes</p>
                    <p>How would you like to be able to travel there?</p>
                    <select className='form-control' id='cuisine-drop-1' placeholder='Pick transport' name='secondary_mode' onChange={handleChange} >Choose mode
                      <option>Choose mode</option>
                      <option>Walk</option>
                      <option>Cycle</option>
                      <option>Drive/ transport</option>
                    </select>
                    <p className='cuisine-choice'>Do you have any religious requirements for the school?</p>
                    <div className='cuisine-dropdowns'>
                      <select className='form-control' id='cuisine-drop-1' placeholder='Pick relgious requirement' name='secondary_relgion' onChange={handleChange} >Pick relgion
                        <option>No requirement</option>
                        <option>Anglican/ Church of England</option>
                        <option>Islam</option>
                        <option>Jewish</option>
                        <option>Roman Catholic</option>
                      </select>
                    </div>

                  </div>
                  <div className='form-filling-image-right' id='secondary-image'>

                  </div>
                </div>
              </div>
              : ''}
            {/* Otherwise gyms should sit on the left */}
            {(formData.secondary_selection & !formData.primary_selection) ?
              <div className='form-filling-section-1' id='restaurant-grid'>
                <div className='form-filling-grid'>
                  <div className='form-filling-detail-left'>
                    <h3>Secondary Schools</h3>
                    <p className='distance-text'>What is the longest amount of time you would like to take to get there?</p>
                    <div className='slider-container'>
                      <input
                        type='range'
                        onChange={(e) => setFormData({ ...formData, secondary_distance: e.target.value })}
                        name={formData.secondary_distance}
                        className='slider'
                        defaultValue='0'
                        min='1'
                        max='20'
                        step='1'>
                      </input>
                    </div>
                    <p>{formData.secondary_distance} minutes</p>
                    <p>How would you like to be able to travel there?</p>
                    <select className='form-control' id='cuisine-drop-1' placeholder='Pick transport' name='secondary_mode' onChange={handleChange} >Choose mode
                      <option>Choose mode</option>
                      <option>Walk</option>
                      <option>Cycle</option>
                      <option>Drive/ transport</option>
                    </select>
                    <p className='cuisine-choice'>Do you have any religious requirements for the school?</p>
                    <div className='cuisine-dropdowns'>
                      <select className='form-control' id='cuisine-drop-1' placeholder='Pick relgious requirement' name='secondary_relgion' onChange={handleChange} >Pick relgion
                        <option>No requirement</option>
                        <option>Anglican/ Church of England</option>
                        <option>Islam</option>
                        <option>Jewish</option>
                        <option>Roman Catholic</option>
                      </select>
                    </div>

                  </div>
                  <div className='form-filling-image-right' id='secondary-image'>

                  </div>
                </div>
              </div>
              : ''}

            {/* Are parks selected or not */}
            {/* Either two things selected or none - parks sits on the left */}
            {(formData.college_selection & (truths === 1 || truths === 4 || (formData.primary_selection & formData.secondary_selection) || (formData.family_selection & truths === 2))) ?
              <div className='form-filling-section-1' id='college-grid'>
                <div className='form-filling-grid'>
                  <div className='form-filling-detail-left'>
                    <h3>Sixth Forms</h3>
                    <p className='distance-text'>What is the longest amount of time you would like to take to get there?</p>
                    <div className='slider-container'>
                      <input
                        type='range'
                        onChange={(e) => setFormData({ ...formData, college_distance: e.target.value })}
                        name={formData.college_distance}
                        className='slider'
                        defaultValue='0'
                        min='1'
                        max='20'
                        step='1'>
                      </input>
                    </div>
                    <p>{formData.college_distance} minutes</p>
                    <p>How would you like to be able to travel there?</p>
                    <select className='form-control' id='cuisine-drop-1' placeholder='Pick transport' name='college_mode' onChange={handleChange} >Choose mode
                      <option>Choose mode</option>
                      <option>Walk</option>
                      <option>Cycle</option>
                      <option>Drive/ transport</option>
                    </select>
                    <p className='cuisine-choice'>Do you have any religious requirements for the school?</p>
                    <div className='cuisine-dropdowns'>
                      <select className='form-control' id='cuisine-drop-1' placeholder='Pick relgious requirement' name='college_religion' onChange={handleChange} >Pick relgion
                        <option>No requirement</option>
                        <option>Anglican/ Church of England</option>
                        <option>Islam</option>
                        <option>Jewish</option>
                        <option>Roman Catholic</option>
                      </select>
                    </div>

                  </div>
                  <div className='form-filling-image-right' id='college-image'>

                  </div>
                </div>
              </div>
              : ''}
            {/* Otherwise parks sit on the right */}
            {(formData.college_selection & (((!formData.secondary_selection) & truths === 3) || (formData.secondary_selection & formData.family_selection & truths === 3) || (!formData.secondary_selection & formData.primary_selection & truths === 2) || (formData.secondary_selection & truths === 2))) ?
              <div className='form-filling-section-2' id='college-grid'>
                <div className='form-filling-grid'>
                  <div className='form-filling-detail-right'>
                    <h3>Sixth Forms</h3>
                    <p className='distance-text'>What is the longest amount of time you would like to take to get there?</p>
                    <div className='slider-container'>
                      <input
                        type='range'
                        onChange={(e) => setFormData({ ...formData, college_distance: e.target.value })}
                        name={formData.college_distance}
                        className='slider'
                        defaultValue='0'
                        min='1'
                        max='20'
                        step='1'>
                      </input>
                    </div>
                    <p>{formData.college_distance} minutes</p>
                    <p>How would you like to be able to travel there?</p>
                    <select className='form-control' id='cuisine-drop-1' placeholder='Pick transport' name='college_mode' onChange={handleChange} >Choose mode
                      <option>Choose mode</option>
                      <option>Walk</option>
                      <option>Cycle</option>
                      <option>Drive/ transport</option>
                    </select>
                    <p className='cuisine-choice'>Do you have any religious requirements for the school?</p>
                    <div className='cuisine-dropdowns'>
                      <select className='form-control' id='cuisine-drop-1' placeholder='Pick relgious requirement' name='college_religion' onChange={handleChange} >Pick relgion
                        <option>No requirement</option>
                        <option>Anglican/ Church of England</option>
                        <option>Islam</option>
                        <option>Jewish</option>
                        <option>Roman Catholic</option>
                      </select>
                    </div>

                  </div>
                  <div className='form-filling-image-right' id='college-image'>

                  </div>
                </div>
              </div>
              : ''}

            {/* Is workplace selected or not */}
            {/* Either 3 things selected or one - workplace will sit on the right */}
            {(formData.family_selection & (truths === 2 || truths === 4)) ?
              <div className='form-filling-section-2' id='restaurant-grid'>
                <div className='form-filling-grid'>
                  <div className='form-filling-detail-right'>
                    <h3>Friends & Family</h3>
                    <div className='form-detail'>
                      <div className='form-detail-address' id='name'>
                        <h4>Name</h4>
                        <input type="text" name='family_name_1' onChange={handleChange} />
                      </div>
                      <div className='form-detail-address'>
                        <h4>Postcode</h4>
                        <input type="text" name='family_detail_1' onChange={handleChange} />
                      </div>
                    </div>
                    <p className='distance-text'>How far away from this person do you want to be?</p>
                    <div className='slider-container'>
                      <input
                        type='range'
                        onChange={(e) => setFormData({ ...formData, family_distance_1: e.target.value })}
                        name={formData.family_distance_1}
                        className='slider'
                        defaultValue='0'
                        min='1'
                        max='20'
                        step='1'>
                      </input>
                    </div>
                    <p>{formData.family_distance_1} minutes</p>
                    <div className='form-detail'>
                      <div className='form-detail-address' id='name'>
                        <h4>Name</h4>
                        <input type="text" name='family_name_2' onChange={handleChange} />
                      </div>
                      <div className='form-detail-address'>
                        <h4>Postcode</h4>
                        <input type="text" name='family_detail_2' onChange={handleChange} />
                      </div>
                    </div>
                    <p className='distance-text'>How far away from this person do you want to be?</p>
                    <div className='slider-container'>
                      <input
                        type='range'
                        onChange={(e) => setFormData({ ...formData, family_distance_2: e.target.value })}
                        name={formData.family_distance_2}
                        className='slider'
                        defaultValue='0'
                        min='1'
                        max='20'
                        step='1'>
                      </input>
                    </div>
                    <p>{formData.family_distance_2} minutes</p>
                    <div className='form-detail'>
                      <div className='form-detail-address' id='name'>
                        <h4>Name</h4>
                        <input type="text" name='family_name_3' onChange={handleChange} />
                      </div>
                      <div className='form-detail-address'>
                        <h4>Postcode</h4>
                        <input type="text" name='family_detail_3' onChange={handleChange} />
                      </div>
                    </div>
                    <p className='distance-text'>How far away from this person do you want to be?</p>
                    <div className='slider-container'>
                      <input
                        type='range'
                        onChange={(e) => setFormData({ ...formData, family_distance_3: e.target.value })}
                        name={formData.family_distance_3}
                        className='slider'
                        defaultValue='0'
                        min='1'
                        max='20'
                        step='1'>
                      </input>
                    </div>
                    <p>{formData.family_distance_3} minutes</p>
                  </div>
                  <div className='form-filling-image-right' id='friends-image'>

                  </div>
                </div>
              </div>
              : ''}
            {(formData.family_selection & (truths === 1 || truths === 3)) ?
              // Only 2 things or no things selected
              <div className='form-filling-section-1' id='restaurant-grid'>
                <div className='form-filling-grid'>
                  <div className='form-filling-detail-left'>
                    <h3>Friends & Family</h3>
                    <div className='form-detail'>
                      <div className='form-detail-address' id='name'>
                        <h4>Name</h4>
                        <input type="text" name='family_name_1' onChange={handleChange} />
                      </div>
                      <div className='form-detail-address'>
                        <h4>Postcode</h4>
                        <input type="text" name='family_detail_1' onChange={handleChange} />
                      </div>
                    </div>
                    <p className='distance-text'>How far away from this person do you want to be?</p>
                    <div className='slider-container'>
                      <input
                        type='range'
                        onChange={(e) => setFormData({ ...formData, family_distance_1: e.target.value })}
                        name={formData.family_distance_1}
                        className='slider'
                        defaultValue='0'
                        min='1'
                        max='20'
                        step='1'>
                      </input>
                    </div>
                    <p>{formData.family_distance_1} minutes</p>
                    <div className='form-detail'>
                      <div className='form-detail-address' id='name'>
                        <h4>Name</h4>
                        <input type="text" name='family_name_2' onChange={handleChange} />
                      </div>
                      <div className='form-detail-address'>
                        <h4>Postcode</h4>
                        <input type="text" name='family_detail_2' onChange={handleChange} />
                      </div>
                    </div>
                    <p className='distance-text'>How far away from this person do you want to be?</p>
                    <div className='slider-container'>
                      <input
                        type='range'
                        onChange={(e) => setFormData({ ...formData, family_distance_2: e.target.value })}
                        name={formData.family_distance_2}
                        className='slider'
                        defaultValue='0'
                        min='1'
                        max='20'
                        step='1'>
                      </input>
                    </div>
                    <p>{formData.family_distance_2} minutes</p>
                    <div className='form-detail'>
                      <div className='form-detail-address' id='name'>
                        <h4>Name</h4>
                        <input type="text" name='family_name_3' onChange={handleChange} />
                      </div>
                      <div className='form-detail-address'>
                        <h4>Postcode</h4>
                        <input type="text" name='family_detail_3' onChange={handleChange} />
                      </div>
                    </div>
                    <p className='distance-text'>How far away from this person do you want to be?</p>
                    <div className='slider-container'>
                      <input
                        type='range'
                        onChange={(e) => setFormData({ ...formData, family_distance_3: e.target.value })}
                        name={formData.family_distance_3}
                        className='slider'
                        defaultValue='0'
                        min='1'
                        max='20'
                        step='1'>
                      </input>
                    </div>
                    <p>{formData.family_distance_3} minutes</p>
                  </div>
                  <div className='form-filling-image-right' id='friends-image'>

                  </div>
                </div>
              </div>
              : ''}
            <Link to={'/wittle-search/property'}><button className='next' >Next</button></Link>
          </div>


        </section>
      </section>
    </section>
  )

}

export default Family