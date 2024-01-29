/* eslint-disable camelcase */
/* eslint-disable no-undef */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { isUserAuth, getUserToken, getAccessToken } from '../../auth/Auth'
import { NumericFormat } from 'react-number-format'
import Loading from '../../helpers/Loading'
import { Modal } from 'react-bootstrap'
import ReactSwitch from 'react-switch'
import Select from 'react-select'


const KYCInput = ({ propertyInputShow, handlePropertyInputClose, propertyFilters, setPropertyFilters, adjustedFilters, loadProperties, toggleStatus, previousLocation, editAgentSearch,
  primarySearchDetails, setPrimarySearchDetails, selectedPrimary, setSelectedPrimary }) => {

  const formatSize = (size) => {
    if (size === null) return ''

    const num = parseFloat(size)
    return num % 1 === 0 ? num.toString() : num.toFixed(1)
  }


  // sales prices
  const salesPrices = [
    '200000', '300000', '400000', '500000', '600000', '700000', '800000', '900000', '1000000', '1250000', '1500000', '1750000', '2000000', '2250000', '2500000',
    '2750000', '3000000', '3500000', '4000000', '5000000', '7500000', '10000000', '12500000', '15000000', '20000000', '30000000', '40000000', '50000000', '2'
  ]

  // rental prices
  const rentalPrices = [
    '500', '600', '700', '800', '900', '1000', '1100', '1200', '1300', '1400', '1500', '1600', '1700', '1800', '1900', '2000', '2250', '2500', '2750', '3000', '3250', '3500',
    '4000', '4500', '5000', '5500', '6000', '7000', '8000', '9000', '10000', '12500', '15000', '20000', '25000', '30000', '40000', '50000', '60000'
  ]

  // borough list
  const boroughs = ['Barking and Dagenham', 'Barnet', 'Bexley', 'Brent', 'Camden', 'Croydon', 'Ealing', 'Enfield', 'Greenwich', 'Havering', 'Kensington and Chelsea',
    'Hertfordshire', 'Hillingdon', 'Hounslow', 'Islington', 'Lambeth', 'Lewisham', 'Merton', 'Southwark', 'Sutton', 'Waltham Forest', 'Westminster',
    'Hackney', 'City of London', 'Hammersmith and Fulham', 'Wandsworth', 'Tower Hamlets', 'Bromley', 'Haringey', 'Kingston upon Thames', 'Newham', 'Redbridge', 'Richmond upon Thames']

  // property type list
  const propertyTypeList = ['Flat', 'Apartment', 'Terraced', 'Semi-Detached', 'Detached', 'House', 'End of Terrace', 'Maisonette', 'Studio', 'Retirement Property', 'Ground Flat',
    'Penthouse', 'Bungalow', 'Town House', 'Detached Bungalow', 'Duplex']


  const schoolChange = selectedOption => {
    setSelectedPrimary(selectedOption)
    console.log('selected primary for search -> ', selectedOption)
    // Additional actions on select, e.g., form updates, API calls, etc.
  }

  const schoolOptions = primarySearchDetails && Array.isArray(primarySearchDetails)
    ? primarySearchDetails.map(school => ({
      label: school.school_name,
      value: school,
    }))
    : []



  return (

    <>
      <Modal show={propertyInputShow} onHide={handlePropertyInputClose} backdrop='static' className='KYC-input-modal'>
        <Modal.Body>
          {propertyFilters ?

            <section className='overall-body'>
              <section className='input-header'>
                <div className='input-title'>
                  <h1>Find a property based on what matters to you</h1>
                  <h1 className='close-modal' onClick={handlePropertyInputClose}>X</h1>
                </div>
              </section>
              <section className='input-main'>
                <div className='input-section'>
                  <h2 className='section-sub-title'>Search details</h2>
                  <div className='selection-block-single'>
                    <h3>Channel</h3>
                    <select className='dropdown' value={propertyFilters.channel || 'Sales'} onChange={(e) => setPropertyFilters(prevData => ({ ...prevData, channel: e.target.value }))}>
                      <option>Sales</option>
                      <option>Lettings</option>
                    </select>
                  </div>
                  <div className='selection-block-single'>
                    <h3>Area</h3>
                    <select className='dropdown' value={propertyFilters.area || ''} onChange={(e) => setPropertyFilters(prevData => ({ ...prevData, area: e.target.value }))}>
                      <option value=''>All</option>
                      {boroughs.map((borough, index) => (
                        <option key={index} value={borough}>{borough}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className='input-section'>
                  <h2 className='section-sub-title'>Property details</h2>
                  <div className='selection-block-double'>
                    <h3>Price</h3>
                    {propertyFilters.channel === 'Lettings' ?
                      <div className='double-dropdowns'>
                        <select
                          className='dropdown'
                          value={propertyFilters.rental_price_min || ''}
                          onChange={(e) => setPropertyFilters(prevData => ({ ...prevData, rental_price_min: e.target.value }))}
                        >
                          <option value={0}>No min</option>
                          {rentalPrices.map((price, index) => (
                            <option key={index} value={price}>
                              <NumericFormat
                                value={price}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'£'}
                              />
                            </option>
                          ))}
                        </select>
                        <select
                          className='dropdown'
                          value={propertyFilters.rental_price_max || ''}
                          onChange={(e) => setPropertyFilters(prevData => ({ ...prevData, rental_price_max: e.target.value }))}
                        >
                          <option value={10000000}>No max</option>
                          {rentalPrices.map((price, index) => (
                            <option key={index} value={price}>
                              <NumericFormat
                                value={price}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'£'}
                              />
                            </option>
                          ))}
                        </select>

                      </div>
                      : propertyFilters.channel === 'Sales' ?
                        <div className='double-dropdowns'>
                          <select
                            className='dropdown'
                            value={propertyFilters.rental_price_min || ''}
                            onChange={(e) => setPropertyFilters(prevData => ({ ...prevData, rental_price_min: e.target.value }))}
                          >
                            <option value={0}>No min</option>
                            {salesPrices.map((price, index) => (
                              <option key={index} value={price}>
                                <NumericFormat
                                  value={price}
                                  displayType={'text'}
                                  thousandSeparator={true}
                                  prefix={'£'}
                                />
                              </option>
                            ))}
                          </select>
                          <select
                            className='dropdown'
                            value={propertyFilters.rental_price_max || ''}
                            onChange={(e) => setPropertyFilters(prevData => ({ ...prevData, rental_price_max: e.target.value }))}
                          >
                            <option value={1000000000}>No max</option>
                            {salesPrices.map((price, index) => (
                              <option key={index} value={price}>
                                <NumericFormat
                                  value={price}
                                  displayType={'text'}
                                  thousandSeparator={true}
                                  prefix={'£'}
                                />
                              </option>
                            ))}
                          </select>

                        </div>
                        : ''}
                  </div>
                  <div className='selection-block-double'>
                    <h3>Bedrooms</h3>
                    <div className='double-dropdowns'>
                      <select
                        className='dropdown'
                        value={propertyFilters.bedrooms_min || null}
                        onChange={(e) => setPropertyFilters(prevData => ({
                          ...prevData,
                          bedrooms_min: e.target.value ? parseInt(e.target.value, 10) : null,
                        }))}
                      >
                        <option value={null}>No min</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                      </select>
                      <select
                        className='dropdown'
                        value={propertyFilters.bedrooms_max || null}
                        onChange={(e) => setPropertyFilters(prevData => ({
                          ...prevData,
                          bedrooms_max: e.target.value ? parseInt(e.target.value, 10) : null,
                        }))}
                      >
                        <option value={null}>No max</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                      </select>
                    </div>
                  </div>
                  <div className='selection-block-single'>
                    <h3>Property type</h3>
                    <select className='dropdown' value={propertyFilters.propertyType || ''} onChange={(e) => setPropertyFilters(prevData => ({ ...prevData, propertyType: e.target.value }))}>
                      <option value=''>All</option>
                      {propertyTypeList.map((property, index) => (
                        <option key={index} value={property}>{property}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className='selection-block-single'>
                    <h3>Features</h3>
                    <div className='select-box'>
                      <input type="checkbox" id="myCheckbox" name="myCheckbox" checked={propertyFilters.garden} onChange={(e) => setPropertyFilters(prevData => ({ ...prevData, garden: e.target.checked }))} />
                      <label htmlFor="myCheckbox">Garden</label>
                    </div>
                  </div>
                  <div className='selection-block-single'>
                    <h3>Size</h3>
                    <input placeholder='Input min size' className='dropdown' value={formatSize(propertyFilters.size)}
                      onChange={(e) => {
                        const value = e.target.value
                        setPropertyFilters(prevData => ({
                          ...prevData,
                          size: value ? parseFloat(value) : null,
                        }))
                      }}></input>
                  </div>
                </div>
                <div className='input-section'>
                  <h2 className='section-sub-title'>Advanced search type</h2>
                  <p className='explanation'>Choose how you want to tailor your search</p>
                  <div className='section-search-buttons'>
                    <button className='selector' value='Wittle' onClick={(e) => setPropertyFilters(prevData => ({ ...prevData, search_type: e.target.value }))}>Wittle</button>
                    <button className='selector' value='Amenity' onClick={(e) => setPropertyFilters(prevData => ({ ...prevData, search_type: e.target.value }))}>Amenity</button>
                  </div>
                </div>
                {propertyFilters.search_type === 'Wittle' ?
                  <div className='input-section'>
                    <h2 className='section-sub-title'>Lifestyle details</h2>
                    <p className='explanation'>Select what you want to include as part of your search and how much they matter</p>
                    <div className='selection-block-single lifestyle'>
                      <h3>Primary schools</h3>
                      <ReactSwitch
                        checked={propertyFilters.primaries === true}
                        onChange={() => toggleStatus('primaries')}
                        onColor='#ED6B86'
                        offColor='#D5D5D5'
                        uncheckedIcon={null}
                        checkedIcon={null}
                      />
                    </div>
                    {propertyFilters.primaries === true ?
                      <div className='slider-container'>
                        <input
                          type='range'
                          onChange={(e) => setPropertyFilters(prevData => ({ ...prevData, primaries_score: e.target.value }))}
                          name={propertyFilters.primaries_score}
                          className='slider'
                          defaultValue={propertyFilters.primaries_score ? propertyFilters.primaries_score : 0}
                          min='0'
                          max='10'
                          step='1'>
                        </input>
                        <h3>{propertyFilters.primaries_score}</h3>
                      </div> : ''}
                    <div className='selection-block-single lifestyle'>
                      <h3>Secondary schools</h3>
                      <ReactSwitch
                        checked={propertyFilters.secondaries === true}
                        onChange={() => toggleStatus('secondaries')}
                        onColor='#ED6B86'
                        offColor='#D5D5D5'
                        uncheckedIcon={null}
                        checkedIcon={null}
                      />
                    </div>
                    {propertyFilters.secondaries === true ?
                      <div className='slider-container'>
                        <input
                          type='range'
                          onChange={(e) => setPropertyFilters(prevData => ({ ...prevData, secondaries_score: e.target.value }))}
                          name={propertyFilters.secondaries_score}
                          className='slider'
                          defaultValue={propertyFilters.secondaries_score ? propertyFilters.secondaries_score : 0}
                          min='0'
                          max='10'
                          step='1'>
                        </input>
                        <h3>{propertyFilters.secondaries_score}</h3>
                      </div> : ''}
                    <div className='selection-block-single lifestyle'>
                      <h3>Parks</h3>
                      <ReactSwitch
                        checked={propertyFilters.parks === true}
                        onChange={() => toggleStatus('parks')}
                        onColor='#ED6B86'
                        offColor='#D5D5D5'
                        uncheckedIcon={null}
                        checkedIcon={null}
                      />
                    </div>
                    {propertyFilters.parks === true ?
                      <div className='slider-container'>
                        <input
                          type='range'
                          onChange={(e) => setPropertyFilters(prevData => ({ ...prevData, parks_score: e.target.value }))}
                          name={propertyFilters.parks_score}
                          className='slider'
                          defaultValue={propertyFilters.parks_score ? propertyFilters.parks_score : 0}
                          min='0'
                          max='10'
                          step='1'>
                        </input>
                        <h3>{propertyFilters.parks_score}</h3>
                      </div> : ''}
                    <div className='selection-block-single lifestyle'>
                      <h3>Playgrounds</h3>
                      <ReactSwitch
                        checked={propertyFilters.playgrounds === true}
                        onChange={() => toggleStatus('playgrounds')}
                        onColor='#ED6B86'
                        offColor='#D5D5D5'
                        uncheckedIcon={null}
                        checkedIcon={null}
                      />
                    </div>
                    {propertyFilters.playgrounds === true ?
                      <div className='slider-container'>
                        <input
                          type='range'
                          onChange={(e) => setPropertyFilters(prevData => ({ ...prevData, playgrounds_score: e.target.value }))}
                          name={propertyFilters.playgrounds_score}
                          className='slider'
                          defaultValue={propertyFilters.playgrounds_score ? propertyFilters.playgrounds_score : 0}
                          min='0'
                          max='10'
                          step='1'>
                        </input>
                        <h3>{propertyFilters.playgrounds_score}</h3>
                      </div> : ''}
                    <div className='selection-block-single lifestyle'>
                      <h3>Gyms</h3>
                      <ReactSwitch
                        checked={propertyFilters.gyms === true}
                        onChange={() => toggleStatus('gyms')}
                        onColor='#ED6B86'
                        offColor='#D5D5D5'
                        uncheckedIcon={null}
                        checkedIcon={null}
                      />
                    </div>
                    {propertyFilters.gyms === true ?
                      <div className='slider-container'>
                        <input
                          type='range'
                          onChange={(e) => setPropertyFilters(prevData => ({ ...prevData, gyms_score: e.target.value }))}
                          name={propertyFilters.gyms_score}
                          className='slider'
                          defaultValue={propertyFilters.gyms_score ? propertyFilters.gyms_score : 0}
                          min='0'
                          max='10'
                          step='1'>
                        </input>
                        <h3>{propertyFilters.gyms_score}</h3>
                      </div> : ''}
                    <div className='selection-block-single lifestyle'>
                      <h3>Restaurants</h3>
                      <ReactSwitch
                        checked={propertyFilters.restaurants === true}
                        onChange={() => toggleStatus('restaurants')}
                        onColor='#ED6B86'
                        offColor='#D5D5D5'
                        uncheckedIcon={null}
                        checkedIcon={null}
                      />
                    </div>
                    {propertyFilters.restaurants === true ?
                      <div className='slider-container'>
                        <input
                          type='range'
                          onChange={(e) => setPropertyFilters(prevData => ({ ...prevData, restaurants_score: e.target.value }))}
                          name={propertyFilters.restaurants_score}
                          className='slider'
                          defaultValue={propertyFilters.restaurants_score ? propertyFilters.restaurants_score : 0}
                          min='0'
                          max='10'
                          step='1'>
                        </input>
                        <h3>{propertyFilters.restaurants_score}</h3>
                      </div> : ''}
                    <div className='selection-block-single lifestyle'>
                      <h3>Pubs</h3>
                      <ReactSwitch
                        checked={propertyFilters.pubs === true}
                        onChange={() => toggleStatus('pubs')}
                        onColor='#ED6B86'
                        offColor='#D5D5D5'
                        uncheckedIcon={null}
                        checkedIcon={null}
                      />
                    </div>
                    {propertyFilters.pubs === true ?
                      <div className='slider-container'>
                        <input
                          type='range'
                          onChange={(e) => setPropertyFilters(prevData => ({ ...prevData, pubs_score: e.target.value }))}
                          name={propertyFilters.pubs_score}
                          className='slider'
                          defaultValue={propertyFilters.pubs_score ? propertyFilters.pubs_score : 0}
                          min='0'
                          max='10'
                          step='1'>
                        </input>
                        <h3>{propertyFilters.pubs_score}</h3>
                      </div> : ''}
                    <div className='selection-block-single lifestyle'>
                      <h3>Tubes</h3>
                      <ReactSwitch
                        checked={propertyFilters.tubes === true}
                        onChange={() => toggleStatus('tubes')}
                        onColor='#ED6B86'
                        offColor='#D5D5D5'
                        uncheckedIcon={null}
                        checkedIcon={null}
                      />
                    </div>
                    {propertyFilters.tubes === true ?
                      <div className='slider-container'>
                        <input
                          type='range'
                          onChange={(e) => setPropertyFilters(prevData => ({ ...prevData, tubes_score: e.target.value }))}
                          name={propertyFilters.tubes_score}
                          className='slider'
                          defaultValue={propertyFilters.tubes_score ? propertyFilters.tubes_score : 0}
                          min='0'
                          max='10'
                          step='1'>
                        </input>
                        <h3>{propertyFilters.tubes_score}</h3>
                      </div> : ''}
                    <div className='selection-block-single lifestyle'>
                      <h3>Supermarkets</h3>
                      <ReactSwitch
                        checked={propertyFilters.supermarkets === true}
                        onChange={() => toggleStatus('supermarkets')}
                        onColor='#ED6B86'
                        offColor='#D5D5D5'
                        uncheckedIcon={null}
                        checkedIcon={null}
                      />
                    </div>
                    {propertyFilters.supermarkets === true ?
                      <div className='slider-container'>
                        <input
                          type='range'
                          onChange={(e) => setPropertyFilters(prevData => ({ ...prevData, supermarkets_score: e.target.value }))}
                          name={propertyFilters.supermarkets_score}
                          className='slider'
                          defaultValue={propertyFilters.supermarkets_score ? propertyFilters.supermarkets_score : 0}
                          min='0'
                          max='10'
                          step='1'>
                        </input>
                        <h3>{propertyFilters.supermarkets_score}</h3>
                      </div> : ''}
                    <div className='selection-block-single lifestyle'>
                      <h3>EVs</h3>
                      <ReactSwitch
                        checked={propertyFilters.ev === true}
                        onChange={() => toggleStatus('ev')}
                        onColor='#ED6B86'
                        offColor='#D5D5D5'
                        uncheckedIcon={null}
                        checkedIcon={null}
                      />
                    </div>
                    {propertyFilters.ev === true ?
                      <div className='slider-container'>
                        <input
                          type='range'
                          onChange={(e) => setPropertyFilters(prevData => ({ ...prevData, ev_score: e.target.value }))}
                          name={propertyFilters.ev_score}
                          className='slider'
                          defaultValue={propertyFilters.ev_score ? propertyFilters.ev_score : 0}
                          min='0'
                          max='10'
                          step='1'>
                        </input>
                        <h3>{propertyFilters.ev_score}</h3>
                      </div> : ''}
                    <div className='selection-block-single lifestyle'>
                      <h3>Crime</h3>
                      <ReactSwitch
                        checked={propertyFilters.crime === true}
                        onChange={() => toggleStatus('crime')}
                        onColor='#ED6B86'
                        offColor='#D5D5D5'
                        uncheckedIcon={null}
                        checkedIcon={null}
                      />
                    </div>
                    {propertyFilters.crime === true ?
                      <div className='slider-container'>
                        <input
                          type='range'
                          onChange={(e) => setPropertyFilters(prevData => ({ ...prevData, crime_score: e.target.value }))}
                          name={propertyFilters.crime_score}
                          className='slider'
                          defaultValue={propertyFilters.crime_score ? propertyFilters.crime_score : 0}
                          min='0'
                          max='10'
                          step='1'>
                        </input>
                        <h3>{propertyFilters.crime_score}</h3>
                      </div> : ''}
                  </div>
                  : propertyFilters.search_type === 'Amenity' ?
                    <div className='input-section'>
                      <h2 className='section-sub-title'>Lifestyle details</h2>
                      <p className='explanation'>Select what you want to include as part of your search and how much they matter</p>
                      <div className='selection-block-single lifestyle'>
                        <h3>Primary schools</h3>
                        {primarySearchDetails ?
                          <Select className='select-dropdown'
                            options={schoolOptions}
                            value={selectedPrimary}
                            onChange={schoolChange}
                            isSearchable={true}
                            placeholder="Select a School"
                          >School</Select>
                          : ''}
                      </div>
                    </div>

                    : ''}

              </section>
              <section className='search-name-section'>
                <h3>Give your search a name to save it</h3>
                <input value={propertyFilters.search_name || ''} onChange={(e) => setPropertyFilters(prevData => ({ ...prevData, search_name: e.target.value }))}></input>
              </section>

              <section className='input-footer'>
                {previousLocation === 'Edit' ? <button className='load-properties' onClick={editAgentSearch}>Load results</button> : <button className='load-properties' onClick={loadProperties}>Load results</button>}
              </section>
            </section>
            : ''}


        </Modal.Body>
      </Modal >

    </>

  )
}

export default KYCInput