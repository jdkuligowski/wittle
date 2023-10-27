import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import NavBar from '../../../tools/NavBar'
import { isUserAuth, getUserToken, getAccessToken } from '../../../auth/Auth'





const TransportHighlights = ({ postcodeData, tubes1, trains1, uniqueTubeLines, uniqueTubeStations }) => {





  return (
    <>
      <section className='box-highlights'>
        <div className='row'>
          <div className='column'>
            <div className='variable-title'>
              <div className='variable-icon' id='tubes'></div>
              <h5 className='block-title'>Underground & Overground</h5>

            </div>            
            {tubes1 && tubes1.length > 0 ?
              <>
                <ul className='results-details'>
                  <li>{tubes1.length} stations within 20 mins walk</li>
                  {
                    tubes1.slice(0, 3).map((train, index) => (
                      <li key={index}>{train.station_name} - {train.line} - {train.walkTimeMin} mins walk</li>
                    ))
                  } </ul>

              </>
              :
              <h5>🚇 No tube stations within 20 min walk of this property</h5>}

          </div>
          <div className='column'>
            <div className='variable-title'>
              <div className='variable-icon' id='evs'></div>
              <h5 className='block-title'>Electric vehicles</h5>

            </div>
            {postcodeData ?
              <>
                <ul className='results-details'>
                  <li>{postcodeData[0].ev.ev_10_mins} charging points within 10 mins walk</li>
                  <li>in the top {Math.round((1 - postcodeData[0].ev.percentile) * 100)}% of areas in London for ev charging access</li>
                </ul>
              </>
              : ''}
          </div>
        </div>
        <div className='row'>
          <div className='column'>
            <div className='variable-title'>
              <div className='variable-icon' id='trains'></div>
              <h5 className='block-title'>National Rail</h5>

            </div>
            {trains1 && trains1.length > 0 ?
              <>
                <ul className='results-details'>
                  <li>{trains1.length} stations within 20 mins walk</li>
                  {
                    trains1.slice(0, 3).map((train, index) => (
                      <li key={index}>{train.station} - {train.walkTimeMin} mins walk</li>
                    ))
                  }
                </ul>
              </>
              :
              <h5>🚊 No rail stations within 20 min walk of this property</h5>}

          </div>
        </div>

      </section>
    </>
  )
}

export default TransportHighlights