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

const FieldSelectionProfile = () => {

  // state to enable navigation between pages
  const navigate = useNavigate()

  // states for filling out the form
  const [formData, setFormData] = useState({
    start_search: true,
    search_name: '',
    search_type: 'Wittle',
    search_channel: 'Buying',
    restaurant_selection: false,
    restaurant_decision: '',
    restaurant_distance: 10,
    restaurant_cuisine_1: '',
    restaurant_cuisine_2: '',
    takeaway_selection: false,
    takeaway_decision: '',
    takeaway_distance: 10,
    takeaway_cuisine_1: '',
    takeaway_cuisine_2: '',
    pubs_selection: false,
    pubs_distance: 10,
    cafes_selection: '',
    cafes_decision: '',
    cafes_detail: '',
    cafes_distance: 10,
    tube_selection: false,
    tube_decision: '',
    tube_detail: '',
    tube_distance: 10,
    train_selection: false,
    train_decision: '',
    train_detail: '',
    train_distance: 10,
    primary_selection: false,
    primary_religion: '',
    primary_mode: '',
    primary_distance: 10,
    college_selection: false,
    college_religion: '',
    college_mode: '',
    college_distance: 10,
    secondary_selection: false,
    secondary_religion: '',
    secondary_mode: '',
    secondary_distance: 10,
    supermarket_selection: false,
    supermarket_decision: '',
    supermarket_segment: '',
    supermarket_size: '',
    supermarket_distance: 10,
    gym_selection: false,
    gym_studio_name: '',
    gym_class_type: '',
    gym_distance: 10,
    park_selection: false,
    park_type: '',
    park_distance: 10,
    workplace_selection: false,
    workplace_detail: '',
    workplace_transport: '',
    workplace_distance: 10,
    family_selection: false,
    family_detail_1: '',
    family_distance_1: 10,
    family_detail_2: '',
    family_distance_2: 0,
    family_detail_3: '',
    family_distance_3: 0,
    family_mode_1: '',
    family_mode_2: '',
    family_mode_3: '',
    property_price_min: '0',
    property_price_max: '10000000',
    property_bed_min: '0',
    property_bed_max: '5',
    property_type: 'Any',
    owner: 31,
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

      <section className='form-input-page'>
        {/* Top section of the page with header and timeline bar */}
        <section className='title-section'>
          <h1><span>Select what</span> would you like to have nearby</h1>
        </section>

        {/* Lower section of the page containing the main content */}
        <section className='main-content'>
          <div className='form-selection'>
            <div className='form-selection-detail'>
              <div className='form-cards' id='hospitality'>
                <h3>Hospitality</h3>
                <div className='selection-buttons'>
                  <button className='selectors' name='restaurant_selection' onClick={() => setFormData({ ...formData, restaurant_selection: !formData.restaurant_selection })} style={{ fontWeight: formData.restaurant_selection ? '700' : '500', backgroundColor: formData.restaurant_selection ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.1)' }}>Restaurants</button>
                  <button className='selectors' name='takeaway_selection' onClick={() => setFormData({ ...formData, takeaway_selection: !formData.takeaway_selection })} style={{ fontWeight: formData.takeaway_selection ? '700' : '500', backgroundColor: formData.takeaway_selection ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.1)' }}>Takeaways</button>
                  <button className='selectors' name='cafes_selection' onClick={() => setFormData({ ...formData, cafes_selection: !formData.cafes_selection })} style={{ fontWeight: formData.cafes_selection ? '700' : '500', backgroundColor: formData.cafes_selection ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.1)' }}>Cafes</button>
                  <button className='selectors' name='pubs_selection' onClick={() => setFormData({ ...formData, pubs_selection: !formData.pubs_selection })} style={{ fontWeight: formData.pubs_selection ? '700' : '500', backgroundColor: formData.pubs_selection ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.1)' }}>Pubs & Bars</button>
                </div>
              </div>
              <div className='form-cards' id='travel'>
                <h3>Travel</h3>
                <div className='selection-buttons'>
                  <button className='selectors' name='tube_selection' onClick={() => setFormData({ ...formData, tube_selection: !formData.tube_selection })} style={{ fontWeight: formData.tube_selection ? '700' : '500', backgroundColor: formData.tube_selection ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.1)' }}>Tube stations</button>
                  <button className='selectors' name='train_selection' onClick={() => setFormData({ ...formData, train_selection: !formData.train_selection })} style={{ fontWeight: formData.train_selection ? '700' : '500', backgroundColor: formData.train_selection ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.1)' }}>Train stations</button>
                </div>
              </div>
              <div className='form-cards' id='lifestyle'>
                <h3>Lifestyle</h3>
                <div className='selection-buttons'>
                  <button className='selectors' name='supermarket_selection' onClick={() => setFormData({ ...formData, supermarket_selection: !formData.supermarket_selection })} style={{ fontWeight: formData.supermarket_selection ? '700' : '500', backgroundColor: formData.supermarket_selection ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.1)' }}>Supermarkets</button>
                  <button className='selectors' name='gym_selection' onClick={() => setFormData({ ...formData, gym_selection: !formData.gym_selection })} style={{ fontWeight: formData.gym_selection ? '700' : '500', backgroundColor: formData.gym_selection ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.1)' }}>Gyms</button>
                  <button className='selectors' name='park_selection' onClick={() => setFormData({ ...formData, park_selection: !formData.park_selection })} style={{ fontWeight: formData.park_selection ? '700' : '500', backgroundColor: formData.park_selection ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.1)' }}>Green space</button>
                  <button className='selectors' name='workplace_selection' onClick={() => setFormData({ ...formData, workplace_selection: !formData.workplace_selection })} style={{ fontWeight: formData.workplace_selection ? '700' : '500', backgroundColor: formData.workplace_selection ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.1)' }}>Workplace</button>
                </div>
              </div>
              <div className='form-cards' id='family'>
                <h3>Family</h3>
                <div className='selection-buttons'>
                  <button className='selectors' name='primary_selection' onClick={() => setFormData({ ...formData, primary_selection: !formData.primary_selection })} style={{ fontWeight: formData.primary_selection ? '700' : '500', backgroundColor: formData.primary_selection ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.1)' }}>Primary Schools</button>
                  <button className='selectors' name='secondary_selection' onClick={() => setFormData({ ...formData, secondary_selection: !formData.secondary_selection })} style={{ fontWeight: formData.secondary_selection ? '700' : '500', backgroundColor: formData.secondary_selection ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.1)' }}>Secondary Schools</button>
                  <button className='selectors' name='college_selection' onClick={() => setFormData({ ...formData, college_selection: !formData.college_selection })} style={{ fontWeight: formData.college_selection ? '700' : '500', backgroundColor: formData.college_selection ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.1)' }}>6th Forms</button>
                  <button className='selectors' name='family_selection' onClick={() => setFormData({ ...formData, family_selection: !formData.family_selection })} style={{ fontWeight: formData.family_selection ? '700' : '500', backgroundColor: formData.family_selection ? 'rgba(255, 167, 229, 1)' : 'rgba(255, 167, 229, 0.1)' }}>Friends & Family</button>
                </div>
              </div>
            </div>
            {formData.restaurant_selection || formData.cafes_selection || formData.takeaway_selection || formData.pubs_selection ?
              <Link to={'/wittle-search/hospitality'}><button className='next' >Next</button></Link>
              :
              formData.tube_selection || formData.train_selection ?
                <Link to={'/wittle-search/travel'}><button className='next' >Next</button></Link>
                :
                formData.supermarket_selection || formData.gym_selection || formData.park_selection || formData.workplace_selection ?
                  <Link to={'/wittle-search/lifestyle'}><button className='next' >Next</button></Link>
                  :
                  formData.primary_selection || formData.secondary_selection || formData.college_selection || formData.family_selection ?
                    <Link to={'/wittle-search/family'}><button className='next' >Next</button></Link>
                    : ''}
          </div>
          <div className='key-image'>

          </div>
        </section>
      </section>
    </>
  )

}

export default FieldSelectionProfile