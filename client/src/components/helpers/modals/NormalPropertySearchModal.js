import { Modal } from 'react-bootstrap'
import React, { useState, useEffect, useRef } from 'react'
import { NumericFormat } from 'react-number-format'
import axios from 'axios'



const NormalPropertySearchModal = ({ propertySearch, handleSearchClose }) => {


  // set states for buttons being activated 
  const [renting, setRenting] = useState(true)
  const [buying, setBuying] = useState(false)

  const [locations, setLocations] = useState([])

  // state for handling the property search inputs
  const [formData, setFormData] = useState({
    channel: 'Buy',
    location: '',
    property_price_min: 0,
    property_price_max: 10000000,
    property_beds_min: 1,
    property_beds_max: 5,
    type: 'Any',
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
  }




  return (
    <>
      <Modal show={propertySearch} onHide={handleSearchClose} backdrop='static' className='normal-search-modal'>
        <Modal.Body>
          <section className='normal-search-header'>
            <div className='title-box'>
              <h1 className='title'>Search for properties</h1>
              <h1 className='close' onClick={handleSearchClose}>x</h1>
            </div>
            <p>Look for properties in an area that you are familiar with</p>
          </section>
          <section className='normal-search-content'>
            <div className='content-sections'>
              <h3>What are you looking to do?</h3>
              <div className='button-selectors' name='channel' onClick={() => {
                setRenting(!renting); setBuying(!buying)
              }}>
                <button id='buy' style={{ backgroundColor: !buying ? 'rgba(255, 167, 229, 0.2)' : 'rgba(255, 167, 229, 1)' }} onClick={() => {
                  setFormData({ ...formData, channel: 'Buying' }) 
                }}>Buy</button>
                <button id='rent' style={{ backgroundColor: !renting ? 'rgba(255, 167, 229, 0.2)' : 'rgba(255, 167, 229, 1)' }}onClick={() => {
                  setFormData({ ...formData, channel: 'Renting' }) 
                }}>Rent</button>

              </div>
            </div>
            <div className='content-sections'>
              <h3>Where do you want to look?</h3>
              <div className='location-box'>
                <h1>🔎</h1>
                <input type='text' name='location' onChange={searchUpdate} />

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
              <button className='search-button' onClick={searchSubmit}>Search</button>


            </div>
          </section>
        </Modal.Body>
      </Modal>
    </>
  )
}


export default NormalPropertySearchModal