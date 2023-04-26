import React, { useState, useEffect, useRef } from 'react'
import { NumericFormat } from 'react-number-format'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'


const LifestyleDropdowns = ({ options, values, onChangeDesktop, onChangeMobile, array, title }) => {


  return (
    <>
      <div className='filter'>
        <h3 className='filter-title'>{title}</h3>
        <div className='desktop-dropdown'>
          <Dropdown
            options={options}
            value={values}
            // value={value}
            onChange={onChangeDesktop}
          />
        </div>
        <div className='mobile-dropdown'>
          <select onChange={onChangeMobile}>
            {array ? array.map(item => <option key={item} value={item}>{item}</option>) : ''}
          </select>
        </div>
      </div>
    </>
  )
}

export default LifestyleDropdowns