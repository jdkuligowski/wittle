import { Modal } from 'react-bootstrap'
import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { NumericFormat } from 'react-number-format'
import axios from 'axios'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { AddressAutofill } from '@mapbox/search-js-react'
import AutoCompleteSearch from '../tools/AutoCompleteSearch'


const NormalSearch = ({ handleSearchClose }) => {

  // state to enable navigation between pages
  const navigate = useNavigate()

  // set states for buttons being activated 
  const [renting, setRenting] = useState(true)
  const [buying, setBuying] = useState(false)

  const [locations, setLocations] = useState([])

  // unused states for the autocomplete search
  const [userEmail, setUserEmail] = useState()
  const [lifestyleLat, setLifestyleLat] = useState()
  const [lifestyleLong, setLifestyleLong] = useState()
  const [viewport, setViewport] = useState()
  const [loading, setLoading] = useState()
  const [click, setClick] = useState()


  // state for handling the property search inputs
  const [formData, setFormData] = useState({
    channel: 'Sale',
    location: 'London',
    property_price_min: 0,
    property_price_max: 10000000,
    property_beds_min: 1,
    property_beds_max: 5,
    type: 'Any',
    search_area: 0.25,
    long: -0.127816,
    lat: 51.507602,
  })

  // ? Get our API Data
  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get('/api/locations/')
        console.log(data)
        setLocations(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  // function for updating values when fields change
  const searchUpdate = (e) => {
    const test = e.target.value
    if (test.includes('£')) {
      const newValue = test.replace('£', '').replace(',', '').replace(',', '')
      setFormData({ ...formData, [e.target.name]: newValue })
      console.log(newValue)
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  }

  // function for adding values to state when the form is complete
  const searchSubmit = () => {
    window.localStorage.setItem('property-search-input', JSON.stringify(formData))
    navigate('/property-results')
  }




  return (
    <>
      <section className='normal-search-content'>
        <div className='content-sections'>
          <h3>What are you looking to do?</h3>
          <div className='button-selectors' name='channel' onClick={() => {
            setRenting(!renting); setBuying(!buying)
          }}>
            <button id='buy' style={{ backgroundColor: !buying ? 'rgba(255, 167, 229, 0.2)' : 'rgba(255, 167, 229, 1)' }} onClick={() => {
              setFormData({ ...formData, channel: 'Sale' })
            }}>Buy</button>
            <button id='rent' style={{ backgroundColor: !renting ? 'rgba(255, 167, 229, 0.2)' : 'rgba(255, 167, 229, 1)' }} onClick={() => {
              setFormData({ ...formData, channel: 'Rent' })
            }}>Rent</button>

          </div>
        </div>
        <div className='content-sections'>
          <h3>Where do you want to look?</h3>
          <div className='location-box'>
            <h1>🔎</h1>
            {/* <AddressAutofill accessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN} style={{ zindex: 99 }}> */}
            {/* <input type='text' name='location' placeholder='location...' onChange={searchUpdate} /> */}
            <AutoCompleteSearch
              livingData={formData}
              setLivingData={setFormData}
              userEmail={userEmail}
              setUserEmail={setUserEmail}
              lifestyleLat={lifestyleLat}
              setLifestyleLat={setLifestyleLat}
              lifestyleLong={lifestyleLong}
              setLifestyleLong={setLifestyleLong}
              viewport={viewport}
              setViewport={setViewport}
              loading={loading}
              setLoading={setLoading}
              click={click}
              setClick={setClick}
            />
            {/* </AddressAutofill> */}

          </div>
        </div>
        <div className='content-sections'>
          <h3>What&apos;s your price range?</h3>
          {renting ?
            <>
              <div className='dropdown-sections'>
                <div className='dropdowns' id='property'>
                  <select className='property-control' name='property_price_min' onChange={searchUpdate}>
                    <option value={0}>No min</option>
                    <option><NumericFormat value={500} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={600} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={700} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={800} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={900} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={1000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={1250} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={1500} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={1750} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={2000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={2250} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={2500} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={2750} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={3000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={3500} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={4000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={4500} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={5000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={6000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={7000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={8000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                  </select>
                </div>
                <div className='dropdowns'>
                  <select className='property-control' name='property_price_max' onChange={searchUpdate}>
                    <option value={10000000}>No max</option>
                    <option><NumericFormat value={500} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={600} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={700} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={800} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={900} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={1000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={1250} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={1500} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={1750} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={2000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={2250} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={2500} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={2750} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={3000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={3500} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={4000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={4500} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={5000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={6000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={7000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={8000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    <option><NumericFormat value={10000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                  </select>
                </div>
              </div>
            </>

            : buying ?
              <>
                <div className='dropdown-sections' id='final-step'>
                  <div className='dropdowns' id='property'>
                    <select className='property-control' name='property_price_min' onChange={searchUpdate}>
                      <option value={0}>No min</option>
                      <option><NumericFormat value={200000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                      <option><NumericFormat value={300000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                      <option><NumericFormat value={400000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                      <option><NumericFormat value={500000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                      <option><NumericFormat value={600000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                      <option><NumericFormat value={700000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                      <option><NumericFormat value={800000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                      <option><NumericFormat value={900000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                      <option><NumericFormat value={1000000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                      <option><NumericFormat value={1250000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                      <option><NumericFormat value={1500000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                      <option><NumericFormat value={1750000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                      <option><NumericFormat value={2000000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                      <option><NumericFormat value={2500000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                      <option><NumericFormat value={3000000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                      <option><NumericFormat value={3500000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                      <option><NumericFormat value={4000000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                      <option><NumericFormat value={5000000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    </select>
                  </div>
                  <div className='dropdowns'>
                    <select className='property-control' name='property_price_max' onChange={searchUpdate}>
                      <option value={10000000}>No max</option>
                      <option><NumericFormat value={300000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                      <option><NumericFormat value={400000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                      <option><NumericFormat value={500000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                      <option><NumericFormat value={600000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                      <option><NumericFormat value={700000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                      <option><NumericFormat value={800000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                      <option><NumericFormat value={900000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                      <option><NumericFormat value={1000000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                      <option><NumericFormat value={1250000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                      <option><NumericFormat value={1500000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                      <option><NumericFormat value={1750000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                      <option><NumericFormat value={2000000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                      <option><NumericFormat value={2500000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                      <option><NumericFormat value={3000000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                      <option><NumericFormat value={3500000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                      <option><NumericFormat value={4000000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                      <option><NumericFormat value={5000000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                      <option><NumericFormat value={10000000} displayType={'text'} thousandSeparator={true} prefix={'£'} /></option>
                    </select>
                  </div>
                </div>
              </>
              :
              ''}
        </div>
        <div className='content-sections'>
          <h3>How many bedrooms?</h3>
          <div className='dropdown-sections' id='final-step'>
            <div className='dropdowns' id='property'>
              <select className='property-control' name='property_beds_min' onChange={searchUpdate}>
                <option value={0}>No min</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>
            <div className='dropdowns'>
              <select className='property-control' name='property_beds_max' onChange={searchUpdate}>
                <option value={5}>No max</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
          </div>
        </div>
        <div className='content-sections'>
          <h3>What kind of property do you want?</h3>
          <div className='dropdown-sections' id='final-step'>
            <div className='dropdowns' id='property'>
              <select className='property-control' name='property_type' onChange={searchUpdate}>
                <option>Any</option>
                <option>House</option>
                <option>Flat</option>
              </select>
            </div>
          </div>
        </div>
        <div className='content-sections'>
          <h3>How far do you want to search?</h3>
          <div className='dropdown-sections' id='final-step'>
            <div className='dropdowns' id='property'>
              <select className='property-control' name='search_area' onChange={searchUpdate}>
                <option value={0.25}>Within 1/4 mile</option>
                <option value={0.5}>Within 1/2 mile</option>
                <option value={0.75}>Within 3/4 mile</option>
                <option value={1}>Within 1 mile</option>
                <option value={1.5}>Within 1.5 miles</option>
                <option value={2}>Within 2 miles</option>
                <option value={3}>Within 3 miles</option>
                <option value={4}>Within 4 miles</option>
                <option value={5}>Within 5 miles</option>
                <option value={30}>No limit</option>
              </select>
            </div>
          </div>

        </div>
        <div className='content-sections'>
          <button className='search-button' onClick={searchSubmit}>Search</button>


        </div>
      </section>
    </>
  )
}


export default NormalSearch