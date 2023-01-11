import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import Modal from 'react-modal'
// import Button from 'react-native-button'
// import Form from 'react-bootstrap/Form'
import NavBar from '../tools/NavBar'
import Timeline1 from '../tools/Timeline1'
import Timeline2 from '../tools/TImeline2'
import Timeline3 from '../tools/Timeline3'
import Timeline4 from '../tools/Timeline4'
import Timeline5 from '../tools/Timeline5'

const FieldSelection = () => {

  // state to enable navigation between pages
  const navigate = useNavigate()

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

  // ? Setting up the ability to retain the form data across pages by saving the data to local storage for us to access on another pagee
  // define function to set state to storage
  const setStateToLocalStorage = (token) => {
    window.localStorage.setItem('wittle-form-input', JSON.stringify(formData))
  }

  // execute setting state to local storage
  useEffect(() => {
    if (formData) {
      setStateToLocalStorage()
    }
  }, [formData])



  return (
    <>
      <section className='main-form-pages'>
        <NavBar />
        <section className='form-input-page'>
          {/* Top section of the page with header and timeline bar */}
          <section className='title-section'>
            <h1><span>What</span> would you like to have nearby?</h1>
            <Timeline2 />
          </section>

          {/* Lower section of the page containing the main content */}
          <section className='main-content'>
            <div className='form-selection'>
              <div className='form-selection-detail'>
                <div className='form-cards' id='hospitality'>
                  <h3>Hospitality</h3>
                  <div className='selection-buttons'>
                    <button className='selectors' name='restaurant_selection' onClick={() => setFormData({ ...formData, restaurant_selection: !formData.restaurant_selection })} style={{ backgroundColor: formData.restaurant_selection ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.2)' }}>Restaurants</button>
                    <button className='selectors' name='takeaway_selection' onClick={() => setFormData({ ...formData, takeaway_selection: !formData.takeaway_selection })} style={{ backgroundColor: formData.takeaway_selection ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.2)' }}>Takeaways</button>
                    <button className='selectors' name='cafes_selection' onClick={() => setFormData({ ...formData, cafes_selection: !formData.cafes_selection })} style={{ backgroundColor: formData.cafes_selection ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.2)' }}>Cafes</button>
                    <button className='selectors' name='pubs_selection' onClick={() => setFormData({ ...formData, pubs_selection: !formData.pubs_selection })} style={{ backgroundColor: formData.pubs_selection ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.2)' }}>Pubs & Bars</button>
                  </div>
                </div>
                <div className='form-cards' id='travel'>
                  <h3>Travel</h3>
                  <div className='selection-buttons'>
                    <button className='selectors' name='tube_selection' onClick={() => setFormData({ ...formData, tube_selection: !formData.tube_selection })} style={{ backgroundColor: formData.tube_selection ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.2)' }}>Tube stations</button>
                    <button className='selectors' name='train_selection' onClick={() => setFormData({ ...formData, train_selection: !formData.train_selection })} style={{ backgroundColor: formData.train_selection ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.2)' }}>Train stations</button>
                  </div>
                </div>
                <div className='form-cards' id='lifestyle'>
                  <h3>Lifestyle</h3>
                  <div className='selection-buttons'>
                    <button className='selectors' name='supermarket_selection' onClick={() => setFormData({ ...formData, supermarket_selection: !formData.supermarket_selection })} style={{ backgroundColor: formData.supermarket_selection ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.2)' }}>Supermarkets</button>
                    <button className='selectors' name='gym_selection' onClick={() => setFormData({ ...formData, gym_selection: !formData.gym_selection })} style={{ backgroundColor: formData.gym_selection ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.2)' }}>Gyms</button>
                    <button className='selectors' name='park_selection' onClick={() => setFormData({ ...formData, park_selection: !formData.park_selection })} style={{ backgroundColor: formData.park_selection ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.2)' }}>Green space</button>
                    <button className='selectors' name='workplace_selection' onClick={() => setFormData({ ...formData, workplace_selection: !formData.workplace_selection })} style={{ backgroundColor: formData.workplace_selection ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.2)' }}>Workplace</button>
                  </div>
                </div>
                <div className='form-cards' id='family'>
                  <h3>Family</h3>
                  <div className='selection-buttons'>
                    <button className='selectors' name='primary_selection' onClick={() => setFormData({ ...formData, primary_selection: !formData.primary_selection })} style={{ backgroundColor: formData.primary_selection ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.2)' }}>Primary Schools</button>
                    <button className='selectors' name='secondary_selection' onClick={() => setFormData({ ...formData, secondary_selection: !formData.secondary_selection })} style={{ backgroundColor: formData.secondary_selection ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.2)' }}>Secondary Schools</button>
                    <button className='selectors' name='college_selection' onClick={() => setFormData({ ...formData, college_selection: !formData.college_selection })} style={{ backgroundColor: formData.college_selection ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.2)' }}>6th Forms</button>
                    <button className='selectors' name='family_selection' onClick={() => setFormData({ ...formData, family_selection: !formData.family_selection })} style={{ backgroundColor: formData.family_selection ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.2)' }}>Friends & Family</button>
                  </div>
                </div>
              </div>
              <Link to={'/wittle-search/hospitality'}><button className='next' >Next</button></Link>
            </div>
            <div className='key-image'>

            </div>
          </section>
        </section>
      </section>
    </>
  )

}

export default FieldSelection