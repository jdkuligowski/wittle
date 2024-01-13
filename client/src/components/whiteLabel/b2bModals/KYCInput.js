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


const KYCInput = ({ propertyInputShow, handlePropertyInputClose, propertyFilters, setPropertyFilters, boroughs, rentalPrices, salesPrices,
  propertyTypeList, loadProperties, toggleStatus }) => {



  return (

    <>
      <Modal show={propertyInputShow} onHide={handlePropertyInputClose} backdrop='static' className='KYC-input-modal'>
        <Modal.Body>
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
                    <option>Rental</option>
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
                  {propertyFilters.channel === 'Rental' ?
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
                          <option value={10000000}>No max</option>
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
                      value={propertyFilters.bedrooms_min || ''}
                      onChange={(e) => setPropertyFilters(prevData => ({
                        ...prevData,
                        bedrooms_min: e.target.value === '' ? null : e.target.value,
                      }))}
                    >
                      <option value=''>No min</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                    </select>
                    <select
                      className='dropdown'
                      value={propertyFilters.bedrooms_max || ''}
                      onChange={(e) => setPropertyFilters(prevData => ({
                        ...prevData,
                        bedrooms_max: e.target.value === '' ? null : e.target.value,
                      }))}
                    >
                      <option value=''>No max</option>
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
                  <input placeholder='Input min size' className='dropdown' value={propertyFilters.size || ''} onChange={(e) => setPropertyFilters(prevData => ({ ...prevData, size: e.target.value }))}></input>
                </div>
              </div>
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

            </section>

            <section className='input-footer'>
              <button className='load-properties' onClick={loadProperties}>Load results</button>
            </section>
          </section>


        </Modal.Body>
      </Modal >

    </>

  )
}

export default KYCInput