import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'



const Timeline1 = () => {




  return (
    <section className='property-search-wrapper'>
      <div className='timeline-bar-1'>
        <div className='progress-circles-1'>
          <div className='milestone-1'>
            <h1>.</h1>
          </div>
          <div className='milestone-2'>
            <h1>.</h1>
          </div>
          <div className='milestone-3'>
            <h1>.</h1>
          </div>
          <div className='milestone-4'>
            <h1>.</h1>
          </div>
          <div className='milestone-5'>
            <h1>.</h1>
          </div>
        </div>
      </div>
      <div className='timeline-background-1'>
        {/* <h1>.</h1> */}
      </div>
    </section>
  )

}

export default Timeline1