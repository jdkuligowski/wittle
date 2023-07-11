import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import NavBar from '../../../tools/NavBar'
import { isUserAuth, getUserToken , getAccessToken } from '../../../auth/Auth'




const SchoolHighlights = ({ topPrimaries, topSecondaries }) => {

  // ? Section 1: Define states
  // state to enable navigation between pages
  const navigate = useNavigate()

  // set state for errors
  const [errors, setErrors] = useState()



  return (

    <>
      <section className='school-highlights'>
        <div className='school-block'>
          <h5 className='block-title'>Primary schools</h5>
          <div className='school-table-headers'>
            <h5 id='column1'>#</h5>
            <h5 id='column2'>School name</h5>
            <h5 id='column3'>Ofsted</h5>
            <h5 id='column4'>Catchment</h5>
            <h5 id='column5'>Distance</h5>
          </div>
          <div className='school-table-details'>
            {topPrimaries ? topPrimaries.map((item, index) => {
              return (
                <>
                  <div className='school-content'>
                    <div className='column' id='column1'>
                      <h5>{index + 1}</h5>
                    </div>
                    <div className='column' id='column2'>
                      <h5 onClick={() => navigate(`/agents/primary-schools/${item.id}`)} >{item.school_name}</h5>
                    </div>
                    <div className='column' id='column3'>
                      {item.ofsted_results !== null ? <h5>{item.ofsted_results}</h5> : <h5>N/a</h5>}
                    </div>
                    <div className='column' id='column4'>
                      <h5>{item.within_catchment}</h5>
                    </div>
                    <div className='column' id='column5'>
                      <h5>{item.walkTimeMin} mins</h5>
                    </div>
                  </div>
        
                </>
              )
            }) : ''}
          </div>
        </div>
        <div className='school-block'>
          <h5 className='block-title'>Secondary schools</h5>
          <div className='school-table-headers'>
            <h5 id='column1'>#</h5>
            <h5 id='column2'>School name</h5>
            <h5 id='column3'>Ofsted</h5>
            <h5 id='column4'>Catchment</h5>
            <h5 id='column5'>Distance</h5>
          </div>
          <div className='school-table-details'>
            {topSecondaries ? topSecondaries.map((item, index) => {
              return (
                <>
                  <div className='school-content'>
                    <div className='column' id='column1'>
                      <h5>{index + 1}</h5>
                    </div>
                    <div className='column' id='column2'>
                      <h5 onClick={() => navigate(`/agents/secondary-schools/${item.id}`)} >{item.school_name}</h5>
                    </div>
                    <div className='column' id='column3'>
                      {item.ofsted_results !== null ? <h5>{item.ofsted_results}</h5> : <h5>N/a</h5>}
                    </div>
                    <div className='column' id='column4'>
                      <h5>{item.within_catchment}</h5>
                    </div>
                    <div className='column' id='column5'>
                      <h5>{item.walkTimeMin} mins</h5>
                    </div>
                  </div>
        
                </>
              )
            }) : ''}
          </div>
        </div>
        
      </section>
    </>
  )
}

export default SchoolHighlights