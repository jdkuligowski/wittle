import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getUserToken, getAccessToken, isUserAuth } from '../../auth/Auth'
import { Modal } from 'react-bootstrap'



const LivingAdminInputs = ({ livingData, setLivingData, livingSubmit, title1, title2, title3, submit1, submit2, editModal, handleEditAdminClose }) => {

  const [extra, setExtra] = useState(false)


  return (

    <>
      <section className='living-inputs-form'>
        {livingData ?
          <>
            <section className='living-modal-details'>
              <div className='modal-title'>
                <h3 className='title-message'>{title1}</h3>
                {editModal ? <h3 className='close' onClick={handleEditAdminClose}>x</h3> : ''}
              </div>
              <h5>{title2}</h5>
              <h5 className='logic-sub-title'>{title3}</h5>

              {/* Mortgage */}
              <div className='selection-logic'>
                <h5 className='selection'>🧾 Mortgage</h5>
                {livingData.mortgage_status === 1 ? <button name='mortgage_status' onClick={() => setLivingData({ ...livingData, mortgage_status: 0, mortgage_value: 0 })} value='false' className='delete-button'>Remove</button> : <button name='mortgage_status' onClick={() => setLivingData({ ...livingData, mortgage_status: 1 })} value='true' className='add-button'>Add</button>}
              </div>
              {livingData.mortgage_status === 1 ?
                <>
                  <div className='selection-block'>
                    <div className='selection-detail'>
                      <h5 className='detail-title'>Provider</h5>
                      <input className='selection-input' type='text' name='mortgage_provider' onChange={(e) => setLivingData({ ...livingData, mortgage_provider: e.target.value })} placeholder={livingData.mortgage_provider}></input>
                    </div>
                    <div className='selection-detail'>
                      <h5 className='detail-title'>Monthly payment</h5>
                      <input className='selection-input' type='number' name='mortgage_value' onChange={(e) => setLivingData({ ...livingData, mortgage_value: e.target.value })} placeholder={livingData.mortgage_value}></input>
                    </div>
                    <div className='selection-detail'>
                      <h5 className='detail-title'>Renewal date</h5>
                      <input className='selection-input' type='date' name='mortgage_date' onChange={(e) => setLivingData({ ...livingData, mortgage_date: e.target.value })} placeholder={livingData.mortgage_date}></input>
                    </div>
                  </div>
                  <div className='selection-block'>
                    <div className='selection-detail'>
                      <input className='selection-input-text' type='textarea' rows='2' name='mortgage_notes' onChange={(e) => setLivingData({ ...livingData, mortgage_notes: e.target.value })} placeholder='Additional info you want to keep about this bill'></input>
                    </div>
                  </div>
                </>
                : ''
              }

              {/* Rent */}
              <div className='selection-logic'>
                <h5 className='selection'>🧾 Rent</h5>
                {livingData.rent_status === 1 ? <button name='rent_status' onClick={() => setLivingData({ ...livingData, rent_status: 0, rent_value: 0 })} value='false' className='delete-button'>Remove</button> : <button name='rent_status' onClick={() => setLivingData({ ...livingData, rent_status: 1 })} value='true' className='add-button'>Add</button>}
              </div>
              {livingData.rent_status === 1 ?
                <>
                  <div className='selection-block'>
                    <div className='selection-detail'>
                      <h5 className='detail-title'>Monthly payment</h5>
                      <input className='selection-input' type='number' name='rent_value' onChange={(e) => setLivingData({ ...livingData, rent_value: e.target.value })} placeholder={livingData.rent_value}></input>
                    </div>
                    <div className='selection-detail'>
                      <h5 className='detail-title'>Bill date</h5>
                      <input className='selection-input' type='date' name='rent_date' onChange={(e) => setLivingData({ ...livingData, rent_date: e.target.value })} placeholder={livingData.rent_date}></input>
                    </div>
                  </div>
                  <div className='selection-block'>
                    <div className='selection-detail'>
                      <input className='selection-input-text' type='textarea' rows='2' name='rent_notes' onChange={(e) => setLivingData({ ...livingData, rent_notes: e.target.value })} placeholder='Additional info you want to keep about this bill'></input>
                    </div>
                  </div>
                </>
                : ''
              }

              {/* Boiler */}
              <div className='selection-logic'>
                <h5 className='selection'>🔧 Boiler maintenance</h5>
                {livingData.boiler_status === 1 ? <button name='boiler_status' onClick={() => setLivingData({ ...livingData, boiler_status: 0, boiler_value: 0 })} value='false' className='delete-button'>Remove</button> : <button name='boiler_status' onClick={() => setLivingData({ ...livingData, boiler_status: 1 })} value='true' className='add-button'>Add</button>}
              </div>
              {livingData.boiler_status === 1 ?
                <>
                  <div className='selection-block'>
                    <div className='selection-detail'>
                      <h5 className='detail-title'>Provider</h5>
                      <input className='selection-input' type='text' name='boiler_provider' onChange={(e) => setLivingData({ ...livingData, boiler_provider: e.target.value })} placeholder={livingData.boiler_provider}></input>
                    </div>
                    <div className='selection-detail'>
                      <h5 className='detail-title'>Annual payment</h5>
                      <input className='selection-input' type='number' name='boiler_value' onChange={(e) => setLivingData({ ...livingData, boiler_value: e.target.value })} placeholder={livingData.boiler_value}></input>
                    </div>
                    <div className='selection-detail'>
                      <h5 className='detail-title'>Renewal date</h5>
                      <input className='selection-input' type='date' name='boiler_date' onChange={(e) => setLivingData({ ...livingData, boiler_date: e.target.value })} placeholder={livingData.boiler_date}></input>
                    </div>
                  </div>
                  <div className='selection-block'>
                    <div className='selection-detail'>
                      <input className='selection-input-text' type='textarea' rows='2' name='boiler_notes' onChange={(e) => setLivingData({ ...livingData, boiler_notes: e.target.value })} placeholder='Additional info you want to keep about this bill'></input>
                    </div>
                  </div>
                </>
                : ''
              }

              {/* House insurance */}
              <div className='selection-logic'>
                <h5 className='selection'>🏠 House insurance</h5>
                {livingData.insurance_status === 1 ? <button name='insurance_status' onClick={() => setLivingData({ ...livingData, insurance_status: 0, insurance_value: 0 })} value='false' className='delete-button'>Remove</button> : <button name='insurance_status' onClick={() => setLivingData({ ...livingData, insurance_status: 1 })} value='true' className='add-button'>Add</button>}
              </div>
              {livingData.insurance_status === 1 ?
                <>
                  <div className='selection-block'>
                    <div className='selection-detail'>
                      <h5 className='detail-title'>Provider</h5>
                      <input className='selection-input' type='text' name='insurance_provider' onChange={(e) => setLivingData({ ...livingData, insurance_provider: e.target.value })} placeholder={livingData.insurance_provider}></input>
                    </div>
                    <div className='selection-detail'>
                      <h5 className='detail-title'>Annual payment</h5>
                      <input className='selection-input' type='number' name='insurance_value' onChange={(e) => setLivingData({ ...livingData, insurance_value: e.target.value })} placeholder={livingData.insurance_value}></input>
                    </div>
                    <div className='selection-detail'>
                      <h5 className='detail-title'>Renewal date</h5>
                      <input className='selection-input' type='date' name='insurance_date' onChange={(e) => setLivingData({ ...livingData, insurance_date: e.target.value })} placeholder={livingData.insurance_date}></input>
                    </div>
                  </div>
                  <div className='selection-block'>
                    <div className='selection-detail'>
                      <input className='selection-input-text' type='textarea' rows='2' name='insurance_notes' onChange={(e) => setLivingData({ ...livingData, insurance_notes: e.target.value })} placeholder='Additional info you want to keep about this bill'></input>
                    </div>
                  </div>
                </>
                : ''
              }

              {/* Council Tax */}
              <div className='selection-logic'>
                <h5 className='selection'>🏛 Council Tax</h5>
                {livingData.council_tax_status === 1 ? <button name='council_tax_status' onClick={() => setLivingData({ ...livingData, council_tax_status: 0, council_tax_value: 0 })} value='false' className='delete-button'>Remove</button> : <button name='council_tax_status' onClick={() => setLivingData({ ...livingData, council_tax_status: 1 })} value='true' className='add-button'>Add</button>}
              </div>
              {livingData.council_tax_status === 1 ?
                <>
                  <div className='selection-block'>
                    <div className='selection-detail'>
                      <h5 className='detail-title'>Monthly payment</h5>
                      <input className='selection-input' type='number' name='council_tax_value' onChange={(e) => setLivingData({ ...livingData, council_tax_value: e.target.value })} placeholder={livingData.council_tax_value}></input>
                    </div>
                    <div className='selection-detail'>
                      <h5 className='detail-title'>Bill date</h5>
                      <input className='selection-input' type='date' name='council_tax_date' onChange={(e) => setLivingData({ ...livingData, council_tax_date: e.target.value })} placeholder={livingData.council_tax_date}></input>
                    </div>
                  </div>
                  <div className='selection-block'>
                    <div className='selection-detail'>
                      <input className='selection-input-text' type='textarea' rows='2' name='council_tax_notes' onChange={(e) => setLivingData({ ...livingData, council_tax_notes: e.target.value })} placeholder='Additional info you want to keep about this bill'></input>
                    </div>
                  </div>
                </>
                : ''
              }

              {/* Energy */}
              <div className='selection-logic'>
                <h5 className='selection'>🔥 Energy</h5>
                {livingData.energy_status === 1 ? <button name='energy_status' onClick={() => setLivingData({ ...livingData, energy_status: 0, energy_value: 0 })} value='false' className='delete-button'>Remove</button> : <button name='energy_status' onClick={() => setLivingData({ ...livingData, energy_status: 1 })} value='true' className='add-button'>Add</button>}
              </div>
              {livingData.energy_status === 1 ?
                <>
                  <div className='selection-logic-2'>
                    <h5 className='additional-logic'>Do you have one provider or two?</h5>
                    <select name='energy_detail' onChange={(e) => setLivingData({ ...livingData, energy_detail: parseFloat(e.target.value) })}>
                      <option value={1} type='number'>1</option>
                      <option value={2} type='number'>2</option>
                    </select>
                  </div>
                  {livingData.energy_detail === 1 ?
                    <>
                      <div className='selection-block'>
                        <div className='selection-detail'>
                          <h5 className='detail-title'>Energy Provider</h5>
                          <input className='selection-input' type='text' name='energy_provider' onChange={(e) => setLivingData({ ...livingData, energy_provider: e.target.value })} placeholder={livingData.energy_provider}></input>
                        </div>
                        <div className='selection-detail'>
                          <h5 className='detail-title'>Monthly payment</h5>
                          <input className='selection-input' type='number' name='energy_value' onChange={(e) => setLivingData({ ...livingData, energy_value: e.target.value })} placeholder={livingData.energy_value}></input>
                        </div>
                        <div className='selection-detail'>
                          <h5 className='detail-title'>Bill date</h5>
                          <input className='selection-input' type='date' name='energy_date' onChange={(e) => setLivingData({ ...livingData, energy_date: e.target.value })} placeholder={livingData.energy_date}></input>
                        </div>
                      </div>
                      <div className='selection-block'>
                        <div className='selection-detail'>
                          <input className='selection-input-text' type='textarea' rows='2' name='energy_notes' onChange={(e) => setLivingData({ ...livingData, energy_notes: e.target.value })} placeholder='Additional info you want to keep about this bill'></input>
                        </div>
                      </div>
                    </>
                    : livingData.energy_detail === 2 ?
                      <>
                        <div className='selection-block'>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Gas Provider</h5>
                            <input className='selection-input' type='text' name='gas_provider' onChange={(e) => setLivingData({ ...livingData, gas_provider: e.target.value })} placeholder={livingData.gas_provider}></input>
                          </div>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Monthly payment</h5>
                            <input className='selection-input' type='number' name='gas_value' onChange={(e) => setLivingData({ ...livingData, gas_value: e.target.value })} placeholder={livingData.gas_value}></input>
                          </div>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Bill date</h5>
                            <input className='selection-input' type='date' name='gas_date' onChange={(e) => setLivingData({ ...livingData, gas_date: e.target.value })} placeholder={livingData.gas_date}></input>
                          </div>
                        </div>
                        <div className='selection-block'>
                          <div className='selection-detail'>
                            <input className='selection-input-text' type='textarea' rows='2' name='gas_notes' onChange={(e) => setLivingData({ ...livingData, gas_notes: e.target.value })} placeholder='Additional info you want to keep about this bill'></input>
                          </div>
                        </div>
                        <div className='selection-block'>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Electricity Provider</h5>
                            <input className='selection-input' type='text' name='electric_provider' onChange={(e) => setLivingData({ ...livingData, electric_provider: e.target.value })} placeholder={livingData.electric_provider}></input>
                          </div>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Monthly payment</h5>
                            <input className='selection-input' type='number' name='electric_value' onChange={(e) => setLivingData({ ...livingData, electric_value: e.target.value })} placeholder={livingData.electric_value}></input>
                          </div>
                          <div className='selection-detail'>
                            <h5 className='detail-title'>Bill date</h5>
                            <input className='selection-input' type='date' name='electric_date' onChange={(e) => setLivingData({ ...livingData, electric_date: e.target.value })} placeholder={livingData.electric_date}></input>
                          </div>
                        </div>
                        <div className='selection-block'>
                          <div className='selection-detail'>
                            <input className='selection-input-text' type='textarea' rows='2' name='electricity_notes' onChange={(e) => setLivingData({ ...livingData, electricity_notes: e.target.value })} placeholder='Additional info you want to keep about this bill'></input>
                          </div>
                        </div>
                      </>
                      : ''
                  }

                </>
                : ''
              }

              {/* Broadband */}
              <div className='selection-logic'>
                <h5 className='selection'>📶 Broadband</h5>
                {livingData.broadband_status === 1 ? <button name='broadband_status' onClick={() => setLivingData({ ...livingData, broadband_status: 0, broadband_value: 0 })} value='false' className='delete-button'>Remove</button> : <button name='broadband_status' onClick={() => setLivingData({ ...livingData, broadband_status: 1 })} value='true' className='add-button'>Add</button>}
              </div>
              {livingData.broadband_status === 1 ?
                <>
                  <div className='selection-block'>
                    <div className='selection-detail'>
                      <h5 className='detail-title'>Provider</h5>
                      <input className='selection-input' type='text' name='broadband_provider' onChange={(e) => setLivingData({ ...livingData, broadband_provider: e.target.value })} placeholder={livingData.broadband_provider}></input>
                    </div>
                    <div className='selection-detail'>
                      <h5 className='detail-title'>Monthly payment</h5>
                      <input className='selection-input' type='number' name='broadband_value' onChange={(e) => setLivingData({ ...livingData, broadband_value: e.target.value })} placeholder={livingData.broadband_value}></input>
                    </div>
                    <div className='selection-detail'>
                      <h5 className='detail-title'>Bill date</h5>
                      <input className='selection-input' type='date' name='broadband_date' onChange={(e) => setLivingData({ ...livingData, broadband_date: e.target.value })} placeholder={livingData.broadband_date}></input>
                    </div>
                  </div>
                  <div className='selection-block'>
                    <div className='selection-detail'>
                      <input className='selection-input-text' type='textarea' rows='2' name='broadband_notes' onChange={(e) => setLivingData({ ...livingData, broadband_notes: e.target.value })} placeholder='Additional info you want to keep about this bill'></input>
                    </div>
                  </div>
                </>
                : ''
              }

              {/* Sky */}
              <div className='selection-logic'>
                <h5 className='selection'>📺 Satelite TV</h5>
                {livingData.sky_status === 1 ? <button name='sky_status' onClick={() => setLivingData({ ...livingData, sky_status: 0, sky_value: 0 })} value='false' className='delete-button'>Remove</button> : <button name='sky_status' onClick={() => setLivingData({ ...livingData, sky_status: 1 })} value='true' className='add-button'>Add</button>}
              </div>
              {livingData.sky_status === 1 ?
                <>
                  <div className='selection-block'>
                    <div className='selection-detail'>
                      <h5 className='detail-title'>Provider</h5>
                      <select name='sky_provider' className='provider-dropdown' onChange={(e) => setLivingData({ ...livingData, sky_provider: e.target.value })}>
                        <option>Sky</option>
                        <option>Virgin</option>
                        <option>TalkTalk</option>
                        <option>Now TV</option>
                      </select>
                    </div>
                    <div className='selection-detail'>
                      <h5 className='detail-title'>Monthly payment</h5>
                      <input className='selection-input' type='number' name='sky_value' onChange={(e) => setLivingData({ ...livingData, sky_value: e.target.value })} placeholder={livingData.sky_value}></input>
                    </div>
                    <div className='selection-detail'>
                      <h5 className='detail-title'>Bill date</h5>
                      <input className='selection-input' type='date' name='sky_date' onChange={(e) => setLivingData({ ...livingData, sky_date: e.target.value })} placeholder={livingData.sky_date}></input>
                    </div>
                  </div>
                  <div className='selection-block'>
                    <div className='selection-detail'>
                      <input className='selection-input-text' type='textarea' rows='2' name='sky_notes' onChange={(e) => setLivingData({ ...livingData, sky_notes: e.target.value })} placeholder='Additional info you want to keep about this bill'></input>
                    </div>
                  </div>
                </>
                : ''
              }

              {/* Netflix */}
              <div className='selection-logic'>
                <h5 className='selection'>💻 Netflix</h5>
                {livingData.netflix_status === 1 ? <button name='netflix_status' onClick={() => setLivingData({ ...livingData, netflix_status: 0, netflix_value: 0 })} value='false' className='delete-button'>Remove</button> : <button name='netflix_status' onClick={() => setLivingData({ ...livingData, netflix_status: 1 })} value='true' className='add-button'>Add</button>}
              </div>
              {livingData.netflix_status === 1 ?
                <>
                  <div className='selection-block'>
                    <div className='selection-detail'>
                      <h5 className='detail-title'>Monthly payment</h5>
                      <select name='netflix_value' className='provider-dropdown' onChange={(e) => setLivingData({ ...livingData, netflix_value: e.target.value })}>
                        <option value={6.99}>Basic (with ads)</option>
                        <option value={10.99}>Standard (no ads)</option>
                        <option value={15.99}>Premium (multi device)</option>
                      </select>
                    </div>
                    <div className='selection-detail'>
                      <h5 className='detail-title'>Bill date</h5>
                      <input className='selection-input' type='date' name='netflix_date' onChange={(e) => setLivingData({ ...livingData, netflix_date: e.target.value })} placeholder={livingData.netflix_date}></input>
                    </div>
                  </div>
                  <div className='selection-block'>
                    <div className='selection-detail'>
                      <input className='selection-input-text' type='textarea' rows='2' name='netflix_notes' onChange={(e) => setLivingData({ ...livingData, netflix_notes: e.target.value })} placeholder='Additional info you want to keep about this bill'></input>
                    </div>
                  </div>
                </>
                : ''
              }

              {/* Amazon */}
              <div className='selection-logic'>
                <h5 className='selection'>📦 Amazon</h5>
                {livingData.amazon_status === 1 ? <button name='amazon_status' onClick={() => setLivingData({ ...livingData, amazon_status: 0, amazon_value: 0 })} value='false' className='delete-button'>Remove</button> : <button name='amazon_status' onClick={() => setLivingData({ ...livingData, amazon_status: 1, amazon_value: 8.99 })} value='true' className='add-button'>Add</button>}
              </div>
              {livingData.amazon_status === 1 ?
                <>
                  <div className='selection-block'>
                    <div className='selection-detail'>
                      <h5 className='detail-title'>Bill date</h5>
                      <input className='selection-input' type='date' name='amazon_date' onChange={(e) => setLivingData({ ...livingData, amazon_date: e.target.value })} placeholder={livingData.amazon_date}></input>
                    </div>
                  </div>
                  <div className='selection-block'>
                    <div className='selection-detail'>
                      <input className='selection-input-text' type='textarea' rows='2' name='amazon_notes' onChange={(e) => setLivingData({ ...livingData, amazon_notes: e.target.value })} placeholder='Additional info you want to keep about this bill'></input>
                    </div>
                  </div>
                </>
                : ''
              }

              {/* Disney */}
              <div className='selection-logic'>
                <h5 className='selection'>🦄 Disney</h5>
                {livingData.disney_status === 1 ? <button name='disney_status' onClick={() => setLivingData({ ...livingData, disney_status: 0, disney_value: 0 })} value='false' className='delete-button'>Remove</button> : <button name='disney_status' onClick={() => setLivingData({ ...livingData, disney_status: 1, disney_value: 7.99 })} value='true' className='add-button'>Add</button>}
              </div>
              {livingData.disney_status === 1 ?
                <>
                  <div className='selection-block'>
                    <div className='selection-detail'>
                      <h5 className='detail-title'>Bill date</h5>
                      <input className='selection-input' type='date' name='disney_date' onChange={(e) => setLivingData({ ...livingData, disney_date: e.target.value })} placeholder={livingData.disney_date}></input>
                    </div>
                  </div>
                  <div className='selection-block'>
                    <div className='selection-detail'>
                      <input className='selection-input-text' type='textarea' rows='2' name='disney_notes' onChange={(e) => setLivingData({ ...livingData, disney_notes: e.target.value })} placeholder='Additional info you want to keep about this bill'></input>
                    </div>
                  </div>
                </>
                : ''
              }

              {/* Apple */}
              <div className='selection-logic'>
                <h5 className='selection'>🍏 Apple TV</h5>
                {livingData.apple_status === 1 ? <button name='apple_status' onClick={() => setLivingData({ ...livingData, apple_status: 0, apple_value: 0 })} value='false' className='delete-button'>Remove</button> : <button name='apple_status' onClick={() => setLivingData({ ...livingData, apple_status: 1, apple_value: 6.99 })} value='true' className='add-button'>Add</button>}
              </div>
              {livingData.apple_status === 1 ?
                <>
                  <div className='selection-block'>
                    <div className='selection-detail'>
                      <h5 className='detail-title'>Bill date</h5>
                      <input className='selection-input' type='date' name='apple_date' onChange={(e) => setLivingData({ ...livingData, apple_date: e.target.value })} placeholder={livingData.apple_date}></input>
                    </div>
                  </div>
                  <div className='selection-block'>
                    <div className='selection-detail'>
                      <input className='selection-input-text' type='textarea' rows='2' name='apple_notes' onChange={(e) => setLivingData({ ...livingData, apple_notes: e.target.value })} placeholder='Additional info you want to keep about this bill'></input>
                    </div>
                  </div>
                </>
                : ''
              }

              {/* TV license */}
              <div className='selection-logic'>
                <h5 className='selection'>📺 TV license</h5>
                {livingData.tv_status === 1 ? <button name='tv_status' onClick={() => setLivingData({ ...livingData, tv_status: 0, tv_value: 0 })} value='false' className='delete-button'>Remove</button> : <button name='tv_status' onClick={() => setLivingData({ ...livingData, tv_status: 1 })} value='true' className='add-button'>Add</button>}
              </div>
              {livingData.tv_status === 1 ?
                <>
                  <div className='selection-block'>
                    <div className='selection-detail'>
                      <h5 className='detail-title'>Monthly payment</h5>
                      <select name='tv_value' className='provider-dropdown' onChange={(e) => setLivingData({ ...livingData, tv_value: e.target.value })}>
                        <option value={13.25}>Monthly</option>
                        <option value={39.75}>Quarterly</option>
                        <option value={15.99}>Annually</option>
                      </select>                  </div>
                    <div className='selection-detail'>
                      <h5 className='detail-title'>Bill date</h5>
                      <input className='selection-input' type='date' name='tv_date' onChange={(e) => setLivingData({ ...livingData, tv_date: e.target.value })} placeholder={livingData.tv_date}></input>
                    </div>
                  </div>
                  <div className='selection-block'>
                    <div className='selection-detail'>
                      <input className='selection-input-text' type='textarea' rows='2' name='tv_notes' onChange={(e) => setLivingData({ ...livingData, tv_notes: e.target.value })} placeholder='Additional info you want to keep about this bill'></input>
                    </div>
                  </div>
                </>
                : ''
              }

              {/* Phone contract */}
              <div className='selection-logic'>
                <h5 className='selection'>📱 Phone contract</h5>
                {livingData.phone_status === 1 ? <button name='phone_status' onClick={() => setLivingData({ ...livingData, phone_status: 0, phone_value: 0 })} value='false' className='delete-button'>Remove</button> : <button name='phone_status' onClick={() => setLivingData({ ...livingData, phone_status: 1 })} value='true' className='add-button'>Add</button>}
              </div>
              {livingData.phone_status === 1 ?
                <>
                  <div className='selection-block'>
                    <div className='selection-detail'>
                      <h5 className='detail-title'>Provider</h5>
                      <input className='selection-input' type='text' name='phone_provider' onChange={(e) => setLivingData({ ...livingData, phone_provider: e.target.value })} placeholder={livingData.phone_provider}></input>
                    </div>
                    <div className='selection-detail'>
                      <h5 className='detail-title'>Monthly payment</h5>
                      <input className='selection-input' type='number' name='phone_value' onChange={(e) => setLivingData({ ...livingData, phone_value: e.target.value })} placeholder={livingData.phone_value}></input>
                    </div>
                    <div className='selection-detail'>
                      <h5 className='detail-title'>Bill date</h5>
                      <input className='selection-input' type='date' name='phone_date' onChange={(e) => setLivingData({ ...livingData, phone_date: e.target.value })} placeholder={livingData.phone_date}></input>
                    </div>
                  </div>
                  <div className='selection-block'>
                    <div className='selection-detail'>
                      <input className='selection-input-text' type='textarea' rows='2' name='phone_notes' onChange={(e) => setLivingData({ ...livingData, phone_notes: e.target.value })} placeholder='Additional info you want to keep about this bill'></input>
                    </div>
                  </div>
                </>
                : ''
              }

              {/* Gym */}
              <div className='selection-logic'>
                <h5 className='selection'>🏋️‍♂️ Gym</h5>
                {livingData.gym_status === 1 ? <button name='gym_status' onClick={() => setLivingData({ ...livingData, gym_status: 0, gym_value: 0 })} value='false' className='delete-button'>Remove</button> : <button name='gym_status' onClick={() => setLivingData({ ...livingData, gym_status: 1 })} value='true' className='add-button'>Add</button>}
              </div>
              {livingData.gym_status === 1 ?
                <>
                  <div className='selection-block'>
                    <div className='selection-detail'>
                      <h5 className='detail-title'>Studio</h5>
                      <input className='selection-input' type='text' name='gym_provider' onChange={(e) => setLivingData({ ...livingData, gym_provider: e.target.value })} placeholder={livingData.gym_provider}></input>
                    </div>
                    <div className='selection-detail'>
                      <h5 className='detail-title'>Monthly payment</h5>
                      <input className='selection-input' type='number' name='gym_value' onChange={(e) => setLivingData({ ...livingData, gym_value: e.target.value })} placeholder={livingData.gym_value}></input>
                    </div>
                    <div className='selection-detail'>
                      <h5 className='detail-title'>Bill date</h5>
                      <input className='selection-input' type='date' name='gym_date' onChange={(e) => setLivingData({ ...livingData, gym_date: e.target.value })} placeholder={livingData.gym_date}></input>
                    </div>
                  </div>
                  <div className='selection-block'>
                    <div className='selection-detail'>
                      <input className='selection-input-text' type='textarea' rows='2' name='gym_notes' onChange={(e) => setLivingData({ ...livingData, gym_notes: e.target.value })} placeholder='Additional info you want to keep about this bill'></input>
                    </div>
                  </div>
                </>
                : ''
              }

              {/* Additional elements */}
              <div className='selection-logic'>
                <h5 className='missing-title'>Something missing? Add up to 3 more</h5>
                {extra ? <button onClick={() => setExtra(false)} value='false' className='delete-button'>Remove</button> : <button onClick={() => setExtra(true)} value='true' className='add-button'>Add</button>}
              </div>

              {extra ?
                <>
                  <div className='selection-logic'>
                    <h5 className='selection'>❓ Extra #1</h5>
                    {livingData.other_status_1 === 1 ? <button name='other_status_1' onClick={() => setLivingData({ ...livingData, other_status_1: 0, other_value_1: 0 })} value='false' className='delete-button'>Remove</button> : <button name='other_status_1' onClick={() => setLivingData({ ...livingData, other_status_1: 1 })} value='true' className='add-button'>Add</button>}
                  </div>
                  {livingData.other_status_1 === 1 ?
                    <>
                      <div className='selection-block-other'>
                        <div className='selection-detail'>
                          <h5 className='detail-title'>Bill type</h5>
                          <input className='selection-input' type='text' name='other_type_1' onChange={(e) => setLivingData({ ...livingData, other_type_1: e.target.value })} placeholder={livingData.other_type_1}></input>
                        </div>
                        <div className='selection-detail'>
                          <h5 className='detail-title'>Provider</h5>
                          <input className='selection-input' type='text' name='other_provider_1' onChange={(e) => setLivingData({ ...livingData, other_provider_1: e.target.value })} placeholder={livingData.other_provider_1}></input>
                        </div>
                        <div className='selection-detail'>
                          <h5 className='detail-title'>Monthly payment</h5>
                          <input className='selection-input' type='number' name='other_value_1' onChange={(e) => setLivingData({ ...livingData, other_value_1: e.target.value })} placeholder={livingData.other_value_1}></input>
                        </div>
                        <div className='selection-detail'>
                          <h5 className='detail-title'>Bill date</h5>
                          <input className='selection-input' type='date' name='other_date_1' onChange={(e) => setLivingData({ ...livingData, other_date_1: e.target.value })} placeholder={livingData.other_date_1}></input>
                        </div>
                      </div>
                      <div className='selection-block'>
                        <div className='selection-detail'>
                          <input className='selection-input-text' type='textarea' rows='2' name='other_notes_1' onChange={(e) => setLivingData({ ...livingData, other_notes_1: e.target.value })} placeholder='Additional info you want to keep about this bill'></input>
                        </div>
                      </div>
                    </>
                    : ''
                  }
                  <div className='selection-logic'>
                    <h5 className='selection'>❓ Extra #2</h5>
                    {livingData.other_status_2 === 1 ? <button name='other_status_2' onClick={() => setLivingData({ ...livingData, other_status_2: 0, other_value_2: 0 })} value='false' className='delete-button'>Remove</button> : <button name='other_status_2' onClick={() => setLivingData({ ...livingData, other_status_2: 1 })} value='true' className='add-button'>Add</button>}
                  </div>
                  {livingData.other_status_2 === 1 ?
                    <>
                      <div className='selection-block-other'>
                        <div className='selection-detail'>
                          <h5 className='detail-title'>Bill type</h5>
                          <input className='selection-input' type='text' name='other_type_2' onChange={(e) => setLivingData({ ...livingData, other_type_2: e.target.value })} placeholder={livingData.other_type_2}></input>
                        </div>
                        <div className='selection-detail'>
                          <h5 className='detail-title'>Provider</h5>
                          <input className='selection-input' type='text' name='other_provider_2' onChange={(e) => setLivingData({ ...livingData, other_provider_2: e.target.value })} placeholder={livingData.other_provider_2}></input>
                        </div>
                        <div className='selection-detail'>
                          <h5 className='detail-title'>Monthly payment</h5>
                          <input className='selection-input' type='number' name='other_value_2' onChange={(e) => setLivingData({ ...livingData, other_value_2: e.target.value })} placeholder={livingData.other_value_2}></input>
                        </div>
                        <div className='selection-detail'>
                          <h5 className='detail-title'>Bill date</h5>
                          <input className='selection-input' type='date' name='other_date_2' onChange={(e) => setLivingData({ ...livingData, other_date_2: e.target.value })} placeholder={livingData.other_date_2}></input>
                        </div>
                      </div>
                      <div className='selection-block'>
                        <div className='selection-detail'>
                          <input className='selection-input-text' type='textarea' rows='2' name='other_notes_2' onChange={(e) => setLivingData({ ...livingData, other_notes_2: e.target.value })} placeholder='Additional info you want to keep about this bill'></input>
                        </div>
                      </div>
                    </>
                    : ''
                  }
                  <div className='selection-logic'>
                    <h5 className='selection'>❓ Extra #3</h5>
                    {livingData.other_status_3 === 1 ? <button name='other_status_3' onClick={() => setLivingData({ ...livingData, other_status_3: 0, other_value_3: 0 })} value='false' className='delete-button'>Remove</button> : <button name='other_status_3' onClick={() => setLivingData({ ...livingData, other_status_3: 1 })} value='true' className='add-button'>Add</button>}
                  </div>
                  {livingData.other_status_3 === 1 ?
                    <>
                      <div className='selection-block-other'>
                        <div className='selection-detail'>
                          <h5 className='detail-title'>Bill type</h5>
                          <input className='selection-input' type='text' name='other_type_3' onChange={(e) => setLivingData({ ...livingData, other_type_3: e.target.value })} placeholder={livingData.other_type_3}></input>
                        </div>
                        <div className='selection-detail'>
                          <h5 className='detail-title'>Provider</h5>
                          <input className='selection-input' type='text' name='other_provider_3' onChange={(e) => setLivingData({ ...livingData, other_provider_3: e.target.value })} placeholder={livingData.other_provider_3}></input>
                        </div>
                        <div className='selection-detail'>
                          <h5 className='detail-title'>Monthly payment</h5>
                          <input className='selection-input' type='number' name='other_value_3' onChange={(e) => setLivingData({ ...livingData, other_value_3: e.target.value })} placeholder={livingData.other_value_3}></input>
                        </div>
                        <div className='selection-detail'>
                          <h5 className='detail-title'>Bill date</h5>
                          <input className='selection-input' type='date' name='other_date_3' onChange={(e) => setLivingData({ ...livingData, other_date_3: e.target.value })} placeholder={livingData.other_date_3}></input>
                        </div>
                      </div>
                      <div className='selection-block'>
                        <div className='selection-detail'>
                          <input className='selection-input-text' type='textarea' rows='2' name='other_notes_3' onChange={(e) => setLivingData({ ...livingData, other_notes_3: e.target.value })} placeholder='Additional info you want to keep about this bill'></input>
                        </div>
                      </div>
                    </>
                    : ''
                  }
                </>
                : ''
              }
              <hr className='living-divider' />

              <div className='living-modal-footer'>
                <div className='footer-submit'>
                  <h5 className='submit-text'>{submit1} 🚀</h5>
                  <button className='submit-button' onClick={livingSubmit}>Submit</button>
                </div>
                <div className='footer-details'>
                  <h5 className='submit-sub-text'>{submit2}</h5>
                </div>
              </div>

            </section>
            <section className='living-admin-image'>
              <div className='admin-image'></div>
            </section>
          </>
          :
          ''}
      </section>
    </>

  )


}

export default LivingAdminInputs