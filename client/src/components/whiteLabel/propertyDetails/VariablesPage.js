import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'




const VariablesPage = () => {


  return (
    <>
      <section className='variables-section'>
        <h1>Explore the different variables</h1>
        <div className='variables-list'>
          <div className='variable'>
            <h1>🏫</h1>
            <h3>Primary schools</h3>
          </div>
          <div className='variable'>
            <h1>👨‍🏫</h1>
            <h3>Secondary schools</h3>
          </div>
          <div className='variable'>
            <h1>🎓</h1>
            <h3>6th form colleges</h3>
          </div>
          <div className='variable'>
            <h1>🌳</h1>
            <h3>Green space</h3>
          </div>
          <div className='variable'>
            <h1>🍽</h1>
            <h3>Restaurants</h3>
          </div>
          <div className='variable'>
            <h1>🚇</h1>
            <h3>Tube stations</h3>
          </div>
          <div className='variable'>
            <h1>⛽️</h1>
            <h3>Electric vehicles</h3>
          </div>
          <div className='variable'>
            <h1>🍻</h1>
            <h3>Pubs</h3>
          </div>
          <div className='variable'>
            <h1>🏋️‍♂️</h1>
            <h3>Fitness</h3>
          </div>
          <div className='variable'>
            <h1>🛒</h1>
            <h3>Supermarkets</h3>
          </div>
        </div>
      </section>
    
    </>
  )
}

export default VariablesPage