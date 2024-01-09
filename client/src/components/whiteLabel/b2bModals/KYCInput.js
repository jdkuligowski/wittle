import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { isUserAuth, getUserToken, getAccessToken } from '../../auth/Auth'
import { NumericFormat } from 'react-number-format'
import Loading from '../../helpers/Loading'
import { Modal } from 'react-bootstrap'


const KYCInput = ({ propertyInputShow, handlePropertyInputClose, propertyFilters, setPropertyFilters, boroughs, rentalPrices, salesPrices, propertyTypeList, loadProperties }) => {



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
                <div className='selection-block-single'>
                  <h3>Persona</h3>
                  <select className='dropdown' value={propertyFilters.persona || 'Young families'} onChange={(e) => setPropertyFilters(prevData => ({ ...prevData, persona: e.target.value }))}>
                    <option>Young families</option>
                    <option>Young professionals</option>
                    <option>Vibes</option>
                    <option>Commuter convenience</option>
                  </select>
                </div>
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