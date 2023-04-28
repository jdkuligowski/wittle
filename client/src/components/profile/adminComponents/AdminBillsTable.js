
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { isUserAuth, getAccessToken, getUserToken } from '../../auth/Auth'
import { Modal } from 'react-bootstrap'
import { NumericFormat } from 'react-number-format'


const AdminBillsTable = ({ livingDetails, handleEditAdminShow, tableRow, setTableRow }) => {


  return (
    <>
      <div className='admin-list-section'>
        <div className='bills-table-title'>
          <h1 className='admin-title'>Your bills</h1>
          <button onClick={handleEditAdminShow}>Edit</button>

        </div>
        {livingDetails ?
          <>
            <div className='bills-table-headers'>
              <div className='bills-row'>
                <div className='bills-columns'>
                  <h3 className='column-1'>Item</h3>
                  <h3 className='column-2'>Cost (£)</h3>
                  <h3 className='column-3'>Day of spend</h3>
                  <h3 className='column-4'></h3>
                </div>
              </div>
            </div>
            <div className='bills-table-content'>
              {livingDetails.mortgage_status === 1 ?
                <div className='bills-row'>
                  <div className='bills-columns'>
                    <h3 className='column-1'>🧾 Mortgage</h3>
                    <h3 className='column-2'><NumericFormat value={livingDetails.mortgage_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                    <h3 className='column-3'>{livingDetails.mortgage_date}</h3>
                    {tableRow ? tableRow.mortgage === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, mortgage: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, mortgage: 1 })}>^</h3> : ''}
                  </div>
                  {tableRow.mortgage === 1 ?
                    <>
                      <hr className='notes-divider' />
                      <div className='bills-notes'>
                        <div className='notes-details'>
                          <h4>Notes</h4>
                          <h3>{livingDetails.mortgage_notes}</h3>
                        </div>
                        <div className='actions'>
                          <h4>Actions</h4>
                          <h3>Close account</h3>
                          <h3>Change bill date</h3>
                          <h3>Edit input</h3>
                        </div>
                      </div>
                    </>
                    : ''
                  }
                </div>
                : ''}
              {livingDetails.rent_status === 1 ?
                <div className='bills-row'>
                  <div className='bills-columns'>
                    <h3 className='column-1'>🧾 Rent</h3>
                    <h3 className='column-2'><NumericFormat value={livingDetails.rent_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                    <h3 className='column-3'>{livingDetails.rent_date}</h3>
                    {tableRow ? tableRow.rent === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, rent: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, rent: 1 })}>^</h3> : ''}
                    <h3></h3>

                  </div>
                  {tableRow.rent === 1 ?
                    <>
                      <hr className='notes-divider' />
                      <div className='bills-notes'>
                        <div className='notes-details'>
                          <h4>Notes</h4>
                          <h3>{livingDetails.rent_notes}</h3>

                        </div>
                        <div className='actions'>
                          <h4>Actions</h4>
                          <h3>Close account</h3>
                          <h3>Change bill date</h3>
                          <h3>Edit input</h3>
                        </div>
                      </div>
                    </>
                    : ''
                  }
                </div>
                : ''}
              {livingDetails.insurance_status === 1 ?
                <div className='bills-row'>
                  <div className='bills-columns'>
                    <h3 className='column-1'>🏠 House insurance</h3>
                    <h3 className='column-2'><NumericFormat value={livingDetails.insurance_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                    <h3 className='column-3'>{livingDetails.insurance_date}</h3>
                    {tableRow ? tableRow.insurance === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, insurance: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, insurance: 1 })}>^</h3> : ''}
                    <h3></h3>
                  </div>
                  {tableRow.insurance === 1 ?
                    <>
                      <hr className='notes-divider' />
                      <div className='bills-notes'>
                        <div className='notes-details'>
                          <h4>Notes</h4>
                          <h3>{livingDetails.insurance_notes}</h3>

                        </div>
                        <div className='actions'>
                          <h4>Actions</h4>
                          <h3>Close account</h3>
                          <h3>Change bill date</h3>
                          <h3>Edit input</h3>
                        </div>
                      </div>
                    </>
                    : ''
                  }
                </div>
                : ''}
              {livingDetails.boiler_status === 1 ?
                <div className='bills-row'>
                  <div className='bills-columns'>
                    <h3 className='column-1'>🔧 Boiler maintenance</h3>
                    <h3 className='column-2'><NumericFormat value={livingDetails.boiler_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                    <h3 className='column-3'>{livingDetails.boiler_date}</h3>
                    {tableRow ? tableRow.boiler === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, boiler: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, boiler: 1 })}>^</h3> : ''}
                    <h3></h3>
                  </div>
                  {tableRow.boiler === 1 ?
                    <>
                      <hr className='notes-divider' />
                      <div className='bills-notes'>
                        <div className='notes-details'>
                          <h4>Notes</h4>
                          <h3>{livingDetails.boiler_notes}</h3>

                        </div>
                        <div className='actions'>
                          <h4>Actions</h4>
                          <h3>Close account</h3>
                          <h3>Change bill date</h3>
                          <h3>Edit input</h3>
                        </div>
                      </div>
                    </>
                    : ''
                  }
                </div>
                : ''}
              {livingDetails.council_tax_status === 1 ?
                <div className='bills-row'>
                  <div className='bills-columns'>
                    <h3 className='column-1'>🏛 Council Tax</h3>
                    <h3 className='column-2'><NumericFormat value={livingDetails.council_tax_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                    <h3 className='column-3'>{livingDetails.council_tax_date}</h3>
                    {tableRow ? tableRow.council === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, council: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, council: 1 })}>^</h3> : ''}
                    <h3></h3>
                  </div>
                  {tableRow.council === 1 ?
                    <>
                      <hr className='notes-divider' />
                      <div className='bills-notes'>
                        <div className='notes-details'>
                          <h4>Notes</h4>
                          <h3>{livingDetails.council_tax_notes}</h3>
                        </div>
                        <div className='actions'>
                          <h4>Actions</h4>
                          <h3>Close account</h3>
                          <h3>Change bill date</h3>
                          <h3>Edit input</h3>
                        </div>
                      </div>
                    </>
                    : ''
                  }
                </div>
                : ''}
              {livingDetails.energy_status === 1 ?
                <div className='bills-row'>
                  <div className='bills-columns'>
                    <h3 className='column-1'>🔥 Energy</h3>
                    <h3 className='column-2'><NumericFormat value={livingDetails.energy_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                    <h3 className='column-3'>{livingDetails.energy_date}</h3>
                    {tableRow ? tableRow.energy === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, energy: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, energy: 1 })}>^</h3> : ''}
                    <h3></h3>
                  </div>
                  {tableRow.energy === 1 ?
                    <>
                      <hr className='notes-divider' />
                      <div className='bills-notes'>
                        <div className='notes-details'>
                          <h4>Notes</h4>
                          <h3>{livingDetails.energy_notes}</h3>
                        </div>
                        <div className='actions'>
                          <h4>Actions</h4>
                          <h3>Close account</h3>
                          <h3>Change bill date</h3>
                          <h3>Edit input</h3>
                        </div>
                      </div>
                    </>
                    : ''
                  }
                </div>
                : ''}
              {livingDetails.gas_status === 1 ?
                <div className='bills-row'>
                  <div className='bills-columns'>
                    <h3 className='column-1'>⛽️ Gas</h3>
                    <h3 className='column-2'><NumericFormat value={livingDetails.gas_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                    <h3 className='column-3'>{livingDetails.gas_date}</h3>
                    {tableRow ? tableRow.gas === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, gas: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, gas: 1 })}>^</h3> : ''}
                    <h3></h3>
                  </div>
                  {tableRow.gas === 1 ?
                    <>
                      <hr className='notes-divider' />
                      <div className='bills-notes'>
                        <div className='notes-details'>
                          <h4>Notes</h4>
                          <h3>{livingDetails.gas_notes}</h3>

                        </div>
                        <div className='actions'>
                          <h4>Actions</h4>
                          <h3>Close account</h3>
                          <h3>Change bill date</h3>
                          <h3>Edit input</h3>
                        </div>
                      </div>
                    </>
                    : ''
                  }
                </div>
                : ''}
              {livingDetails.electric_value === 1 ?
                <div className='bills-row'>
                  <div className='bills-columns'>
                    <h3 className='column-1'>💡 Electric</h3>
                    <h3 className='column-2'><NumericFormat value={livingDetails.electric_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                    <h3 className='column-3'>{livingDetails.electric_date}</h3>
                    {tableRow ? tableRow.electric === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, electric: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, electric: 1 })}>^</h3> : ''}
                    <h3></h3>
                  </div>
                  {tableRow.electric === 1 ?
                    <>
                      <hr className='notes-divider' />
                      <div className='bills-notes'>
                        <div className='notes-details'>
                          <h4>Notes</h4>
                          <h3>{livingDetails.electric_notes}</h3>

                        </div>
                        <div className='actions'>
                          <h4>Actions</h4>
                          <h3>Close account</h3>
                          <h3>Change bill date</h3>
                          <h3>Edit input</h3>
                        </div>
                      </div>
                    </>
                    : ''
                  }
                </div>
                : ''}
              {livingDetails.broadband_status === 1 ?
                <div className='bills-row'>
                  <div className='bills-columns'>
                    <h3 className='column-1'>📶 Broadband</h3>
                    <h3 className='column-2'><NumericFormat value={livingDetails.broadband_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                    <h3 className='column-3'>{livingDetails.broadband_date}</h3>
                    {tableRow ? tableRow.broadband === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, broadband: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, broadband: 1 })}>^</h3> : ''}
                    <h3></h3>
                  </div>
                  {tableRow.broadband === 1 ?
                    <>
                      <hr className='notes-divider' />
                      <div className='bills-notes'>
                        <div className='notes-details'>
                          <h4>Notes</h4>
                          <h3>{livingDetails.broadband_notes}</h3>

                        </div>
                        <div className='actions'>
                          <h4>Actions</h4>
                          <h3>Close account</h3>
                          <h3>Change bill date</h3>
                          <h3>Edit input</h3>
                        </div>
                      </div>
                    </>
                    : ''
                  }
                </div>
                : ''}
              {livingDetails.sky_status === 1 ?
                <div className='bills-row'>
                  <div className='bills-columns'>
                    <h3 className='column-1'>📺 Satelite TV</h3>
                    <h3 className='column-2'><NumericFormat value={livingDetails.sky_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                    <h3 className='column-3'>{livingDetails.sky_date}</h3>
                    {tableRow ? tableRow.satellite === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, satellite: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, satellite: 1 })}>^</h3> : ''}
                    <h3></h3>
                  </div>
                  {tableRow.satellite === 1 ?
                    <>
                      <hr className='notes-divider' />
                      <div className='bills-notes'>
                        <div className='notes-details'>
                          <h4>Notes</h4>
                          <h3>{livingDetails.satellite_notes}</h3>

                        </div>
                        <div className='actions'>
                          <h4>Actions</h4>
                          <h3>Close account</h3>
                          <h3>Change bill date</h3>
                          <h3>Edit input</h3>
                        </div>
                      </div>
                    </>
                    : ''
                  }
                </div>
                : ''}
              {livingDetails.netflix_status === 1 ?
                <div className='bills-row'>
                  <div className='bills-columns'>
                    <h3 className='column-1'>💻 Netflix</h3>
                    <h3 className='column-2'><NumericFormat value={livingDetails.netflix_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                    <h3 className='column-3'>{livingDetails.netflix_date}</h3>
                    {tableRow ? tableRow.netflix === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, netflix: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, netflix: 1 })}>^</h3> : ''}
                    <h3></h3>
                  </div>
                  {tableRow.netflix === 1 ?
                    <>
                      <hr className='notes-divider' />
                      <div className='bills-notes'>
                        <div className='notes-details'>
                          <h4>Notes</h4>
                          <h3>{livingDetails.netflix_notes}</h3>

                        </div>
                        <div className='actions'>
                          <h4>Actions</h4>
                          <h3>Close account</h3>
                          <h3>Change bill date</h3>
                          <h3>Edit input</h3>
                        </div>
                      </div>
                    </>
                    : ''
                  }
                </div>
                : ''}
              {livingDetails.amazon_status === 1 ?
                <div className='bills-row'>
                  <div className='bills-columns'>
                    <h3 className='column-1'>📦 Amazon</h3>
                    <h3 className='column-2'><NumericFormat value={livingDetails.amazon_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                    <h3 className='column-3'>{livingDetails.amazon_date}</h3>
                    {tableRow ? tableRow.amazon === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, amazon: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, amazon: 1 })}>^</h3> : ''}
                    <h3></h3>
                  </div>
                  {tableRow.amazon === 1 ?
                    <>
                      <hr className='notes-divider' />
                      <div className='bills-notes'>
                        <div className='notes-details'>
                          <h4>Notes</h4>
                          <h3>{livingDetails.amazon_notes}</h3>

                        </div>
                        <div className='actions'>
                          <h4>Actions</h4>
                          <h3>Close account</h3>
                          <h3>Change bill date</h3>
                          <h3>Edit input</h3>
                        </div>
                      </div>
                    </>
                    : ''
                  }
                </div>
                : ''}
              {livingDetails.disney_status === 1 ?
                <div className='bills-row'>
                  <div className='bills-columns'>
                    <h3 className='column-1'>🦄 Disney</h3>
                    <h3 className='column-2'><NumericFormat value={livingDetails.disney_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                    <h3 className='column-3'>{livingDetails.disney_date}</h3>
                    {tableRow ? tableRow.disney === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, disney: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, disney: 1 })}>^</h3> : ''}
                    <h3></h3>
                  </div>
                  {tableRow.disney === 1 ?
                    <>
                      <hr className='notes-divider' />
                      <div className='bills-notes'>
                        <div className='notes-details'>
                          <h4>Notes</h4>
                          <h3>{livingDetails.disney_notes}</h3>

                        </div>
                        <div className='actions'>
                          <h4>Actions</h4>
                          <h3>Close account</h3>
                          <h3>Change bill date</h3>
                          <h3>Edit input</h3>
                        </div>
                      </div>
                    </>
                    : ''
                  }
                </div>
                : ''}
              {livingDetails.apple_status === 1 ?
                <div className='bills-row'>
                  <div className='bills-columns'>
                    <h3 className='column-1'>🍏 Apple TV</h3>
                    <h3 className='column-2'><NumericFormat value={livingDetails.apple_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                    <h3 className='column-3'>{livingDetails.apple_date}</h3>
                    {tableRow ? tableRow.apple === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, apple: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, apple: 1 })}>^</h3> : ''}
                    <h3></h3>
                  </div>
                  {tableRow.apple === 1 ?
                    <>
                      <hr className='notes-divider' />
                      <div className='bills-notes'>
                        <div className='notes-details'>
                          <h4>Notes</h4>
                          <h3>{livingDetails.apple_notes}</h3>

                        </div>
                        <div className='actions'>
                          <h4>Actions</h4>
                          <h3>Close account</h3>
                          <h3>Change bill date</h3>
                          <h3>Edit input</h3>
                        </div>
                      </div>
                    </>
                    : ''
                  }
                </div>
                : ''}
              {livingDetails.tv_status === 1 ?
                <div className='bills-row'>
                  <div className='bills-columns'>
                    <h3 className='column-1'>📺 TV license</h3>
                    <h3 className='column-2'><NumericFormat value={livingDetails.tv_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                    <h3 className='column-3'>{livingDetails.tv_date}</h3>
                    {tableRow ? tableRow.tv_license === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, tv_license: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, tv_license: 1 })}>^</h3> : ''}
                    <h3></h3>
                  </div>
                  {tableRow.tv_license === 1 ?
                    <>
                      <hr className='notes-divider' />
                      <div className='bills-notes'>
                        <div className='notes-details'>
                          <h4>Notes</h4>
                          <h3>{livingDetails.tv_license_notes}</h3>

                        </div>
                        <div className='actions'>
                          <h4>Actions</h4>
                          <h3>Close account</h3>
                          <h3>Change bill date</h3>
                          <h3>Edit input</h3>
                        </div>
                      </div>
                    </>
                    : ''
                  }
                </div>
                : ''}
              {livingDetails.phone_status === 1 ?
                <div className='bills-row'>
                  <div className='bills-columns'>
                    <h3 className='column-1'>📱 Phone contract</h3>
                    <h3 className='column-2'><NumericFormat value={livingDetails.phone_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                    <h3 className='column-3'>{livingDetails.phone_date}</h3>
                    {tableRow ? tableRow.phone === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, phone: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, phone: 1 })}>^</h3> : ''}
                    <h3></h3>
                  </div>
                  {tableRow.phone === 1 ?
                    <>
                      <hr className='notes-divider' />
                      <div className='bills-notes'>
                        <div className='notes-details'>
                          <h4>Notes</h4>
                          <h3>{livingDetails.phone_notes}</h3>

                        </div>
                        <div className='actions'>
                          <h4>Actions</h4>
                          <h3>Close account</h3>
                          <h3>Change bill date</h3>
                          <h3>Edit input</h3>
                        </div>
                      </div>
                    </>
                    : ''
                  }
                </div>
                : ''}
              {livingDetails.gym_status === 1 ?
                <div className='bills-row'>
                  <div className='bills-columns'>
                    <h3 className='column-1'>🏋️‍♂️ Gym</h3>
                    <h3 className='column-2'><NumericFormat value={livingDetails.gym_value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                    <h3 className='column-3'>{livingDetails.gym_date}</h3>
                    {tableRow ? tableRow.gym === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, gym: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, gym: 1 })}>^</h3> : ''}
                    <h3></h3>
                  </div>
                  {tableRow.gym === 1 ?
                    <>
                      <hr className='notes-divider' />
                      <div className='bills-notes'>
                        <div className='notes-details'>
                          <h4>Notes</h4>
                          <h3>{livingDetails.gym_notes}</h3>
                        </div>
                        <div className='actions'>
                          <h4>Actions</h4>
                          <h3>Close account</h3>
                          <h3>Change bill date</h3>
                          <h3>Edit input</h3>
                        </div>
                      </div>
                    </>
                    : ''
                  }
                </div>
                : ''}
              {livingDetails.other_status_1 === 1 ?
                <div className='bills-row'>
                  <div className='bills-columns'>
                    <h3 className='column-1'>{livingDetails.other_type_1}</h3>
                    <h3 className='column-2'><NumericFormat value={livingDetails.other_value_1} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                    <h3 className='column-3'>{livingDetails.other_date_1}</h3>
                    {tableRow ? tableRow.other_1 === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, other_1: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, other_1: 1 })}>^</h3> : ''}
                    <h3></h3>
                  </div>
                  {tableRow.other_1 === 1 ?
                    <>
                      <hr className='notes-divider' />
                      <div className='bills-notes'>
                        <div className='notes-details'>
                          <h4>Notes</h4>
                          <h3>{livingDetails.other_notes_1}</h3>

                        </div>
                        <div className='actions'>
                          <h4>Actions</h4>
                          <h3>Close account</h3>
                          <h3>Change bill date</h3>
                          <h3>Edit input</h3>
                        </div>
                      </div>
                    </>
                    : ''
                  }
                </div>
                : ''}
              {livingDetails.other_status_2 === 1 ?
                <div className='bills-row'>
                  <div className='bills-columns'>
                    <h3 className='column-1'>{livingDetails.other_type_2}</h3>
                    <h3 className='column-2'><NumericFormat value={livingDetails.other_value_2} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                    <h3 className='column-3'>{livingDetails.other_date_2}</h3>
                    {tableRow ? tableRow.other_2 === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, other_2: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, other_2: 1 })}>^</h3> : ''}
                    <h3></h3>
                  </div>
                  {tableRow.other_2 === 1 ?
                    <>
                      <hr className='notes-divider' />
                      <div className='bills-notes'>
                        <div className='notes-details'>
                          <h4>Notes</h4>
                          <h3>{livingDetails.other_notes_2}</h3>

                        </div>
                        <div className='actions'>
                          <h4>Actions</h4>
                          <h3>Close account</h3>
                          <h3>Change bill date</h3>
                          <h3>Edit input</h3>
                        </div>
                      </div>
                    </>
                    : ''
                  }
                </div>
                : ''}
              {livingDetails.other_status_3 === 1 ?
                <div className='bills-row'>
                  <div className='bills-columns'>
                    <h3 className='column-1'>{livingDetails.other_type_3}</h3>
                    <h3 className='column-2'><NumericFormat value={livingDetails.other_value_3} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h3>
                    <h3 className='column-3'>{livingDetails.other_date_2}</h3>
                    {tableRow ? tableRow.other_3 === 1 ? <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, other_3: 0 })}>v</h3> : <h3 className='column-4' onClick={() => setTableRow({ ...tableRow, other_3: 1 })}>^</h3> : ''}
                    <h3></h3>
                  </div>
                  {tableRow.other_3 === 1 ?
                    <>
                      <hr className='notes-divider' />
                      <div className='bills-notes'>
                        <div className='notes-details'>
                          <h4>Notes</h4>
                          <h3>{livingDetails.other_notes_3}</h3>

                        </div>
                        <div className='actions'>
                          <h4>Actions</h4>
                          <h3>Close account</h3>
                          <h3>Change bill date</h3>
                          <h3>Edit input</h3>
                        </div>
                      </div>
                    </>
                    : ''
                  }
                </div>
                : ''}
            </div>
          </>
          : ''
        }
      </div>
    </>
  )
}

export default AdminBillsTable