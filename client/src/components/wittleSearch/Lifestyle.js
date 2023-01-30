import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Modal from 'react-modal'

import Timeline3 from '../tools/Timeline3'
import NavBar from '../tools/NavBar'



const Lifestyle = () => {

  // set states for buttons being activated 
  const [anySupermarket, setAnySupermarket] = useState(true)
  const [specificSupermarket, setSpecificSupermarket] = useState(false)

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
    property_price_min: '0',
    property_price_max: '10000000',
    property_bed_min: '0',
    property_bed_max: '5',
    property_type: 'Any',
  })

  // get form data from storage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('wittle-form-input'))
    if (data) setFormData(data)
  }, [])

  // check the number of elements populated - to be used in the logic to fill the page
  const checkingState = () => {
    const array = [formData.supermarket_selection, formData.gym_selection, formData.park_selection, formData.workplace_selection]
    const count = array.filter(Boolean).length
    setTruths(count)
  }

  // carry out the calculation for checking the number of true elements populated
  useEffect(() => {
    checkingState()
  })

  // general update for drop down menus and text fields
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
            {formData.supermarket_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 1)' }}>Supermarkets</button> : ''}
            {formData.gym_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 1)' }}>Gyms</button> : ''}
            {formData.park_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 1)' }}>Parks</button> : ''}
            {formData.workplace_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 1)' }}>Workplace</button> : ''}
            {formData.primary_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 0.2)' }}>Primary Schools</button> : ''}
            {formData.secondary_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 0.2)' }}>Secondary Schools</button> : ''}
            {formData.college_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 0.2)' }}>6th Forms</button> : ''}
            {formData.family_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 0.2)' }}>Friends & Family</button> : ''}
          </div>
          <div className='form-selections-small'>
            {formData.restaurant_selection || formData.cafes_selection || formData.takeaway_selection || formData.pubs_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 0.2)' }}>Hospitality</button> : ''}
            {formData.train_selection || formData.tube_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 0.2)' }}>Travel</button> : ''}
            {formData.supermarket_selection || formData.gym_selection || formData.park_selection || formData.workplace_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 1)' }}>Lifestyle</button> : ''}
            {formData.primary_selection || formData.secondary_selection || formData.college_selection || formData.family_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 0.2)' }}>Family</button> : ''}

          </div>
        </section>
        <section className='main-content-detail'>
          <div className='form-selection'>
            <h1>Lifestyle</h1>

            {/* Split out logic for when different lifestyle options are selected */}
            {/* Supermarkets selected or not */}
            {formData.supermarket_selection ?
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

                    {specificSupermarket ?
                      <>
                        <p className='cuisine-choice'>Choose the type of supermarket</p><div className='cuisine-dropdowns'>
                          <select className='form-control' id='cuisine-drop-1' placeholder='Pick cuisine' name='supermarket_segment' onChange={handleChange}>Pick supermarket
                            <option>Pick supermarket</option>
                            <option>Budget</option>
                            <option>Convenience</option>
                            <option>Mainstream</option>
                            <option>Premium</option>
                          </select>
                        </div>
                      </>
                      : ''}




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
                        defaultValue='0'
                        min='1'
                        max='20'
                        step='1'>
                      </input>
                    </div>
                    <p>{formData.supermarket_distance} minutes</p>
                  </div>
                  <div className='form-filling-image-right' id='supermarket-image'>

                  </div>
                </div>
              </div>

              : ''}

            {/* Gyms selected or not */}
            {/* Gyms and supermarkets selected - gym needs to sit on right */}
            {formData.gym_selection & formData.supermarket_selection ?
              <div className='form-filling-section-2' id='gym-grid'>
                <div className='form-filling-grid'>
                  <div className='form-filling-detail-right'>
                    <h3>Gyms</h3>
                    <p>Are there any studios or gyms you would like to be near?</p>
                    <p className='cuisine-choice'>Select a gym/studio</p>
                    <div className='cuisine-dropdowns'>
                      <select className='form-control' id='cuisine-drop-1' placeholder='Pick cafe' name='gym_studio_name' onChange={handleChange}>Pick gym/ studio
                        <option>Select option</option>
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
                    </div>
                    <p className='distance-text'>What is the furthest distance you would like to walk to get there?</p>
                    <div className='slider-container'>
                      <input
                        type='range'
                        onChange={(e) => setFormData({ ...formData, gym_distance: e.target.value })}
                        name={formData.gym_distance}
                        className='slider'
                        defaultValue='0'
                        min='1'
                        max='20'
                        step='1'>
                      </input>
                    </div>
                    <p>{formData.gym_distance} minutes</p>
                  </div>
                  <div className='form-filling-image-right' id='gyms-image'>

                  </div>
                </div>
              </div>
              : ''}
            {/* Otherwise gyms should sit on the left */}
            {(formData.gym_selection & !formData.supermarket_selection) ?
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
                    </div>
                    <p className='distance-text'>What is the furthest distance you would like to walk to get there?</p>
                    <div className='slider-container'>
                      <input
                        type='range'
                        onChange={(e) => setFormData({ ...formData, gym_distance: e.target.value })}
                        name={formData.gym_distance}
                        className='slider'
                        defaultValue='0'
                        min='1'
                        max='20'
                        step='1'>
                      </input>
                    </div>
                    <p>{formData.gym_distance} minutes</p>
                  </div>
                  <div className='form-filling-image-right' id='gyms-image'>

                  </div>
                </div>
              </div>
              : ''}

            {/* Are parks selected or not */}
            {/* Either two things selected or none - parks sits on the left */}
            {(formData.park_selection & (truths === 1 || truths === 4 || (formData.supermarket_selection & formData.gym_selection) || (formData.workplace_selection & truths === 2))) ?
              <div className='form-filling-section-1' id='park-grid'>
                <div className='form-filling-grid'>
                  <div className='form-filling-detail-left'>
                    <h3>Parks</h3>
                    <p>What kind of green space do you want to be near?</p>
                    <div className='cuisine-dropdowns'>
                      <select className='form-control' id='cuisine-drop-1' placeholder='Select park type' name='park_type' onChange={handleChange}>Choose green space
                        <option>Pick green space</option>
                        <option>Large park &#40;long walks or runs&#41;</option>
                        <option>Medium sized park &#40;big enough for activities&#41;</option>
                        <option>Small square &#40;read a book&#41;</option>
                      </select>

                    </div>
                    <p className='distance-text'>What is the furthest distance you would like to walk to a parkl?</p>
                    <div className='slider-container'>
                      <input
                        type='range'
                        onChange={(e) => setFormData({ ...formData, park_distance: e.target.value })}
                        name={formData.park_distance}
                        className='slider'
                        defaultValue='0'
                        min='1'
                        max='20'
                        step='1'>
                      </input>
                    </div>
                    <p>{formData.park_distance} minutes</p>
                  </div>
                  <div className='form-filling-image-right' id='park-image'>

                  </div>
                </div>
              </div>
              : ''}
            {/* Otherwise parks sit on the right */}
            {(formData.park_selection & (((!formData.gym_selection) & truths === 3) || (formData.gym_selection & formData.workplace_selection & truths === 3) || (!formData.gym_selection & formData.supermarket_selection & truths === 2) || (formData.gym_selection & truths === 2))) ?
              <div className='form-filling-section-2' id='park-grid'>
                <div className='form-filling-grid'>
                  <div className='form-filling-detail-right'>
                    <h3>Parks</h3>
                    <p>What kind of green space do you want to be near?</p>
                    <div className='cuisine-dropdowns'>
                      <select className='form-control' id='cuisine-drop-1' placeholder='Select park type' name='park_type' onChange={handleChange}>Choose green space
                        <option>Pick green space</option>
                        <option>Large park &#40;long walks or runs&#41;</option>
                        <option>Medium sized park &#40;big enough for activities&#41;</option>
                        <option>Small square &#40;read a book&#41;</option>
                      </select>

                    </div>
                    <p className='distance-text'>What is the furthest distance you would like to walk to a parkl?</p>
                    <div className='slider-container'>
                      <input
                        type='range'
                        onChange={(e) => setFormData({ ...formData, park_distance: e.target.value })}
                        name={formData.park_distance}
                        className='slider'
                        defaultValue='0'
                        min='1'
                        max='20'
                        step='1'>
                      </input>
                    </div>
                    <p>{formData.park_distance} minutes</p>
                  </div>
                  <div className='form-filling-image-right' id='park-image'>

                  </div>
                </div>
              </div>
              : ''}

            {/* Is workplace selected or not */}
            {/* Either 3 things selected or one - workplace will sit on the right */}
            {(formData.workplace_selection & (truths === 2 || truths === 4)) ?
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
                      <select className='form-control' id='cuisine-drop-1' placeholder='Select transport' name='workplace_transport' onChange={handleChange}>Choose mode of transport
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
                        defaultValue='0'
                        min='1'
                        max='20'
                        step='1'>
                      </input>
                    </div>
                    <p>{formData.workplace_distance} minutes</p>

                  </div>
                  <div className='form-filling-image-right' id='work-image'>

                  </div>
                </div>
              </div>
              : ''}
            {(formData.workplace_selection & (truths === 1 || truths === 3)) ?

              // Only 2 things or no things selected
              <div className='form-filling-section-1' id='work-grid'>
                <div className='form-filling-grid'>
                  <div className='form-filling-detail-left' id='work'>
                    <h3>Workplace</h3>
                    <p className='distance-text'>What is the postcode of your work?</p>
                    <div className='form-detail-address'>
                      <input type="text" name='workplace_detail' onChange={handleChange} />
                    </div>
                    <p className='distance-text'>How would you like to travel to get there?</p>
                    <div className='cuisine-dropdowns'>
                      <select className='form-control' id='cuisine-drop-1' placeholder='Select transport' name='workplace_transport' onChange={handleChange}>Choose mode of transport
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
                        defaultValue='0'
                        min='1'
                        max='20'
                        step='1'>
                      </input>
                    </div>
                    <p>{formData.workplace_distance} minutes</p>

                  </div>
                  <div className='form-filling-image-right' id='work-image'>

                  </div>
                </div>
              </div>
              : ''}
            {formData.primary_selection || formData.secondary_selection || formData.college_selection || formData.family_selection ?
              <Link to={'/wittle-search/family'}><button className='next' >Next</button></Link>
              :
              <Link to={'/wittle-search/property'}><button className='next' >Next</button></Link>
            }          </div>


        </section>
      </section>
    </section>
  )

}

export default Lifestyle