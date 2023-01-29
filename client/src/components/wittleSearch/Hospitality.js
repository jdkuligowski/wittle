import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { Slider } from 'material-ui-slider'

import Timeline3 from '../tools/Timeline3'

import RestaurantsLeft from './formBlocks/hospitality/RestaurantsLeft'
import RestaurantsRight from './formBlocks/hospitality/RestaurantsRight'
import CafesRight from './formBlocks/hospitality/CafesRight'
import CafesLeft from './formBlocks/hospitality/CafesLeft'
import TakeawaysLeft from './formBlocks/hospitality/TakeawaysLeft'
import TakeawaysRight from './formBlocks/hospitality/TakeawaysRight'
import PubsRight from './formBlocks/hospitality/PubsRight'
import PubsLeft from './formBlocks/hospitality/PubsLeft'
import NavBar from '../tools/NavBar'


const Hospitalty = () => {

  // states for changing button colours
  const [anyRestaurants, setAny] = useState(false)
  const [specificCuisine, setSpecific] = useState(false)
  const [anyCafe, setAnyCafe] = useState(false)
  const [specificCafe, setSpecificCafe] = useState(false)
  const [specificTakeaway, setSpecificTakeaway] = useState(false)
  const [anyTakeaway, setAnyTakeaway] = useState(false)

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


  const checkingState = () => {
    const array = [formData.restaurant_selection, formData.cafes_selection, formData.takeaway_selection, formData.pubs_selection]
    const count = array.filter(Boolean).length
    setTruths(count)
  }

  useEffect(() => {
    checkingState()
  })

  // handling the slider states

  // general update for drop down menus
  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // update for the specific vs general question - restaurants
  useEffect(() => {
    if (anyRestaurants & specificCuisine)
      formData.restaurant_decision = 'Both'
    else if (anyRestaurants)
      formData.restaurant_decision = 'Restaurants'
    else if (specificCuisine)
      formData.restaurant_decision = 'Cuisine'
    else
      ''
  })

  // update for the specific vs general question - restaurants
  useEffect(() => {
    if (anyCafe & specificCafe)
      formData.cafes_decision = 'Both'
    else if (anyCafe)
      formData.cafes_decision = 'Cafes'
    else if (specificCafe)
      formData.cafes_decision = 'Specific'
    else
      ''
  })

  // update for the specific vs general question - restaurants
  useEffect(() => {
    if (anyTakeaway & specificTakeaway)
      formData.takeaway_decision = 'Both'
    else if (anyTakeaway)
      formData.takeaway_decision = 'Takeaways'
    else if (specificTakeaway)
      formData.takeaway_decision = 'Specific'
    else
      ''
  })


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
            {formData.restaurant_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 1)' }}>Restaurants</button> : ''}
            {formData.cafes_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 1)' }}>Cafes</button> : ''}
            {formData.takeaway_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 1)' }}>Takeaways</button> : ''}
            {formData.pubs_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 1)' }}>Pubs & Bars</button> : ''}
            {formData.tube_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 0.2)' }}>Tubes</button> : ''}
            {formData.train_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 0.2)' }}>Trains</button> : ''}
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
            {formData.restaurant_selection || formData.cafes_selection || formData.takeaway_selection || formData.pubs_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 1)' }}>Hospitality</button> : ''}
            {formData.train_selection || formData.tube_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 0.2)' }}>Travel</button> : ''}
            {formData.supermarket_selection || formData.gym_selection || formData.park_selection || formData.workplace_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 0.2)' }}>Lifestyle</button> : ''}
            {formData.primary_selection || formData.secondary_selection || formData.college_selection || formData.family_selection ? <button className='selectors' style={{ backgroundColor: 'rgba(255, 167, 229, 0.2)' }}>Family</button> : ''}

          </div>
        </section>
        <section className='main-content-detail'>
          <div className='form-selection'>
            <h1>Hospitality</h1>
            {/* Split out logic for when different hospitality options are selected */}
            {/* Restaurants selected or not */}
            {formData.restaurant_selection ?
              <div className='form-filling-section-1' id='restaurant-grid'>
                <div className='form-filling-grid'>
                  <div className='form-filling-detail-left'>
                    <h3>Restaurants</h3>
                    <p>Do you want to be near all types of good restaurants, or a specific cuisine, or both?</p>
                    <div className='button-selectors' name='restaurant_decision' value={anyRestaurants & specificCuisine ? 'Both' : anyRestaurants ? 'Restaurants' : 'Cuisine'} >
                      <button id='any' onClick={() => setAny(!anyRestaurants)} style={{ backgroundColor: anyRestaurants ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.2)' }}>Any restaurants</button>
                      <button id='specific' onClick={() => setSpecific(!specificCuisine)} style={{ backgroundColor: specificCuisine ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.2)' }}>Specific cuisine</button>
                    </div>
                    {specificCuisine ?
                      <>
                        <p className='cuisine-choice'>Choose cuisine</p><div className='cuisine-dropdowns'>
                          <select className='form-control' id='cuisine-drop-1' placeholder='Pick cuisine' name='restaurant_cuisine_1' onChange={handleChange}>Pick cuisine
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
                        </div>
                      </>
                      : ''}
                    <p className='distance-text'>What is the furthest distance you would like to walk to a restaurant?</p>
                    <div className='slider-container'>
                      <input
                        type='range'
                        onChange={(e) => setFormData({ ...formData, restaurant_distance: e.target.value })}
                        name={formData.restaurant_distance}
                        className='slider'
                        defaultValue='0'
                        min='1'
                        max='20'
                        step='1'>
                      </input>
                    </div>
                    <p>{formData.restaurant_distance} minutes</p>
                  </div>
                  <div className='form-filling-image-right' id='restaurant-image'>

                  </div>
                </div>
              </div>
              : ''}

            {/* Cafes selected or not */}
            {/* Cafes and restaurants selected - cafes needs to sit on right */}
            {formData.cafes_selection & formData.restaurant_selection ?
              <div className='form-filling-section-2' id='cafe-grid'>
                <div className='form-filling-grid'>
                  <div className='form-filling-detail-right'>
                    <h3>Cafes</h3>
                    <p>Do you want to be in an area with nice cafes or be near to a specific cafe, or both?</p>
                    <div className='button-selectors' name='cafes_decision' >
                      <button id='any' onClick={() => setAnyCafe(!anyCafe)} style={{ backgroundColor: anyCafe ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.2)' }}>General cafes</button>
                      <button id='specific' onClick={() => setSpecificCafe(!specificCafe)} style={{ backgroundColor: specificCafe ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.2)' }}>Specific cafe</button>
                    </div>
                    {specificCafe ?
                      <>
                        <p className='cuisine-choice'>Select a cafe</p>
                        <div className='cuisine-dropdowns'>
                          <select className='form-control' id='cuisine-drop-1' placeholder='Pick cafe' name='cafes_detail' onChange={handleChange}>Pick cafe
                            <option>Pick cafe</option>
                            <option>Black Sheep Coffee</option>
                            <option>Cafe Nero</option>
                            <option>Costa Coffee</option>
                            <option>Gail&apos;s</option>
                            <option>Grind</option>
                            <option>Joe & The Juice</option>
                            <option>Pattiserie Valerie</option>
                            <option>Pret</option>
                          </select>
                        </div>
                      </>
                      : ''}
                    <p className='distance-text'>What is the furthest distance you would like to walk to a cafe?</p>
                    <div className='slider-container'>
                      <input
                        type='range'
                        onChange={(e) => setFormData({ ...formData, cafes_distance: e.target.value })}
                        name={formData.cafes_distance}
                        className='slider'
                        defaultValue='0'
                        min='1'
                        max='20'
                        step='1'>
                      </input>
                    </div>
                    <p>{formData.cafes_distance} minutes</p>
                  </div>
                  <div className='form-filling-image-right' id='cafe-image'>

                  </div>
                </div>
              </div>
              // Only cafes selected - needs to sit on the left
              : ''}
            {(formData.cafes_selection & !formData.restaurant_selection) ?
              <div className='form-filling-section-1' id='cafe-grid'>
                <div className='form-filling-grid'>
                  <div className='form-filling-detail-left'>
                    <h3>Cafes</h3>
                    <p>Do you want to be in an area with nice cafes or be near to a specific cafe, or both?</p>
                    <div className='button-selectors' name='cafes_decision' >
                      <button id='any' onClick={() => setAnyCafe(!anyCafe)} style={{ backgroundColor: anyCafe ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.2)' }}>General cafes</button>
                      <button id='specific' onClick={() => setSpecificCafe(!specificCafe)} style={{ backgroundColor: specificCafe ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.2)' }}>Specific cafe</button>
                    </div>
                    {specificCafe ?
                      <>
                        <p className='cuisine-choice'>Select a cafe</p>
                        <div className='cuisine-dropdowns'>
                          <select className='form-control' id='cuisine-drop-1' placeholder='Pick cafe' name='cafes_detail' onChange={handleChange}>Pick cafe
                            <option>Pick cafe</option>
                            <option>Black Sheep Coffee</option>
                            <option>Cafe Nero</option>
                            <option>Costa Coffee</option>
                            <option>Gail&apos;s</option>
                            <option>Grind</option>
                            <option>Joe & The Juice</option>
                            <option>Pattiserie Valerie</option>
                            <option>Pret</option>
                          </select>
                        </div>
                      </>
                      : ''}
                    <p className='distance-text'>What is the furthest distance you would like to walk to a cafe?</p>
                    <div className='slider-container'>
                      <input
                        type='range'
                        onChange={(e) => setFormData({ ...formData, cafes_distance: e.target.value })}
                        name={formData.cafes_distance}
                        className='slider'
                        defaultValue='0'
                        min='1'
                        max='20'
                        step='1'>
                      </input>
                    </div>
                    <p>{formData.cafes_distance} minutes</p>
                  </div>
                  <div className='form-filling-image-right' id='cafe-image'>

                  </div>
                </div>
              </div>
              : ''}

            {/* Are Takeaways selected or not */}
            {/* Either two things selected or none - takeaways sits on the left */}
            {(formData.takeaway_selection & (truths === 1 || truths === 4 || (formData.restaurant_selection & formData.cafes_selection) || (formData.pubs_selection & truths === 2))) ?
              <div className='form-filling-section-1' id='takeaway-grid'>
                <div className='form-filling-grid'>
                  <div className='form-filling-detail-left'>
                    <h3>Takeaways</h3>
                    <p>Do you want to be near all types of good takeaways, or a specific cuisine, or both?</p>
                    <div className='button-selectors' name='takeaway_decision' value={anyTakeaway & specificTakeaway ? 'Both' : anyTakeaway ? 'Restaurants' : 'Cuisine'} >
                      <button id='any' onClick={() => setAnyTakeaway(!anyTakeaway)} style={{ backgroundColor: anyTakeaway ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.2)' }}>Any takeaways</button>
                      <button id='specific' onClick={() => setSpecificTakeaway(!specificTakeaway)} style={{ backgroundColor: specificTakeaway ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.2)' }}>Specific cuisine</button>
                    </div>
                    {specificTakeaway ?
                      <>
                        <p className='cuisine-choice'>Choose cuisine</p>
                        <div className='cuisine-dropdowns'>
                          <select className='form-control' id='cuisine-drop-1' placeholder='Pick cuisine' name='takeaway_cuisine_1' onChange={handleChange}>Pick cuisine
                            <option>Pick cuisine</option>
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
                        </div>
                      </>
                      : ''}
                    <p className='distance-text'>What is the furthest distance you would like to walk to a restaurant?</p>
                    <div className='slider-container'>
                      <input
                        type='range'
                        onChange={(e) => setFormData({ ...formData, takeaway_distance: e.target.value })}
                        name={formData.takeaway_distance}
                        className='slider'
                        defaultValue='0'
                        min='1'
                        max='20'
                        step='1'>
                      </input>
                    </div>
                    <p>{formData.takeaway_distance} minutes</p>
                  </div>
                  <div className='form-filling-image-right' id='takeaway-image'>

                  </div>
                </div>
              </div>
              // Only restaurants or cafes selected - needs to sit on the right
              : ''}
            {(formData.takeaway_selection & (((!formData.cafes_selection) & truths === 3) || (formData.cafes_selection & formData.pubs_selection & truths === 3) || (!formData.cafes_selection & formData.restaurant_selection & truths === 2) || (formData.cafes_selection & truths === 2))) ?
              <div className='form-filling-section-2' id='takeaway-grid'>
                <div className='form-filling-grid'>
                  <div className='form-filling-detail-right'>
                    <h3>Takeaways</h3>
                    <p>Do you want to be near all types of good takeaways, or a specific cuisine, or both?</p>
                    <div className='button-selectors' name='takeaway_decision' value={anyTakeaway & specificTakeaway ? 'Both' : anyTakeaway ? 'Restaurants' : 'Cuisine'} >
                      <button id='any' onClick={() => setAnyTakeaway(!anyTakeaway)} style={{ backgroundColor: anyTakeaway ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.2)' }}>Any takeaways</button>
                      <button id='specific' onClick={() => setSpecificTakeaway(!specificTakeaway)} style={{ backgroundColor: specificTakeaway ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.2)' }}>Specific cuisine</button>
                    </div>
                    {specificTakeaway ?
                      <>
                        <p className='cuisine-choice'>Choose cuisine</p>
                        <div className='cuisine-dropdowns'>
                          <select className='form-control' id='cuisine-drop-1' placeholder='Pick cuisine' name='takeaway_cuisine_1' onChange={handleChange}>Pick cuisine
                            <option>Pick cuisine</option>
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
                        </div>
                      </>
                      : ''}
                    <p className='distance-text'>What is the furthest distance you would like to walk to a restaurant?</p>
                    <div className='slider-container'>
                      <input
                        type='range'
                        onChange={(e) => setFormData({ ...formData, takeaway_distance: e.target.value })}
                        name={formData.takeaway_distance}
                        className='slider'
                        defaultValue='0'
                        min='1'
                        max='20'
                        step='1'>
                      </input>
                    </div>
                    <p>{formData.takeaway_distance} minutes</p>
                  </div>
                  <div className='form-filling-image-right' id='takeaway-image'>

                  </div>
                </div>
              </div>
              : ''}

            {/* Are pubs selected or not */}
            {/* Either 3 things selected or one - pubs will sit on the right */}
            {(formData.pubs_selection & (truths === 2 || truths === 4)) ?
              <div className='form-filling-section-2' id='pub-grid'>
                <div className='form-filling-grid'>
                  <div className='form-filling-detail-right' id='pubs'>
                    <h3>Pubs & Bars</h3>
                    <p className='distance-text'>What is the furthest distance you would like to walk to a pub?</p>
                    <div className='slider-container'>
                      <input
                        type='range'
                        onChange={(e) => setFormData({ ...formData, pubs_distance: e.target.value })}
                        name={formData.pubs_distance}
                        className='slider'
                        defaultValue='0'
                        min='1'
                        max='20'
                        step='1'>
                      </input>
                    </div>
                    <p>{formData.pubs_distance} minutes</p>

                  </div>
                  <div className='form-filling-image-right' id='pub-image'>

                  </div>
                </div>
              </div>
              : ''}
            {(formData.pubs_selection & (truths === 1 || truths === 3)) ?
              // Only 2 things or no things selected
              <div className='form-filling-section-1' id='pub-grid'>
                <div className='form-filling-grid'>
                  <div className='form-filling-detail-left' id='pubs'>
                    <h3>Pubs & Bars</h3>
                    <p className='distance-text'>What is the furthest distance you would like to walk to a pub?</p>
                    <div className='slider-container'>
                      <input
                        type='range'
                        onChange={(e) => setFormData({ ...formData, pubs_distance: e.target.value })}
                        name={formData.pubs_distance}
                        className='slider'
                        defaultValue='0'
                        min='1'
                        max='20'
                        step='1'>
                      </input>
                    </div>
                    <p>{formData.pubs_distance} minutes</p>

                  </div>
                  <div className='form-filling-image-right' id='pub-image'>

                  </div>
                </div>
              </div>
              : ''}
            {formData.tube_selection || formData.train_selection ?
              <Link to={'/wittle-search/travel'}><button className='next' >Next</button></Link>
              :
              formData.supermarket_selection || formData.gym_selection || formData.park_selection || formData.workplace_selection ?
                <Link to={'/wittle-search/lifestyle'}><button className='next' >Next</button></Link>
                :
                formData.primary_selection || formData.secondary_selection || formData.college_selection || formData.family_selection ?
                  <Link to={'/wittle-search/family'}><button className='next' >Next</button></Link>
                  :
                  <Link to={'/wittle-search/property'}><button className='next' >Next</button></Link>
            }
          </div>

        </section>
      </section>
    </section >
  )

}

export default Hospitalty