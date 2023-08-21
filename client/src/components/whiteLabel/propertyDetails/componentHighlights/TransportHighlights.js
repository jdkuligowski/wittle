import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import NavBar from '../../../tools/NavBar'
import { isUserAuth, getUserToken , getAccessToken } from '../../../auth/Auth'





const TransportHighlights = ({ postcodeData, tubes1, trains1 }) => {





  return (
    <>
      <section className='box-highlights'>
        <div className='row'>
          <div className='column'>
            <h5 className='block-title'>Underground & Overground</h5>
            {tubes1 && tubes1.length > 0 ? 
              <>
                <h5>🚇 {tubes1.length} tube stations within 20 mins walk</h5>
                <h5>🚇 {tubes1[0].station_name} is {tubes1[0].walkTimeMin} mins away</h5>
                {tubes1.length > 2 ? <h5>🚇 {tubes1[1].station_name} and {tubes1[2].station_name} are also nearby</h5> : tubes1.length === 1 ? <h5>🚇 {tubes1[1].station_name} is also nearby</h5> : '' }
              </>
              : 
              <h5>🚇 No tube stations within 20 min walk of this property</h5> }

          </div>
          <div className='column'>
            <h5 className='block-title'>Electric vehicles</h5>
            {postcodeData ? 
              <>
                <h5>🚇 {postcodeData[0].ev.ev_10_mins} charging points within 10 mins walk</h5>
                <h5>🚇 in the top {Math.round((1 - postcodeData[0].ev.percentile) * 100)}% of areas in London for ev charging access</h5>
              </>
              : '' }
          </div>
        </div>
        <div className='row'>
          <div className='column'>
            <h5 className='block-title'>National Rail</h5>
            {trains1 && trains1.length > 0 ? 
              <>
                <h5>🚊 {trains1.length} rail stations within 20 mins walk</h5>
                <h5>🚊 {trains1[0].station} is {trains1[0].walkTimeMin} mins away</h5>
                {trains1.length > 2 ? <h5>🚊 {trains1[1].station} and {trains1[2].station} are also nearby</h5> : trains1.length === 1 ? <h5>🚊 {trains1[1].station} is also nearby</h5> : '' }
              </>
              : 
              <h5>🚊 No rail stations within 20 min walk of this property</h5> }

          </div>
        </div>
        
      </section>
    </>
  )
}

export default TransportHighlights