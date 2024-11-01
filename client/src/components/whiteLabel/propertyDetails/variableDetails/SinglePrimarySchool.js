import React, { useState, useEffect, useInsertionEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import NavBar from '../../../tools/NavBar'
import { isUserAuth, getUserToken, getAccessToken } from '../../../auth/Auth'
import { NumericFormat } from 'react-number-format'
import Footer from '../../../tools/Footer'
import WhiteSidebar from '../../WhiteSidebar'
import WhiteNavbar from '../../../tools/WhiteNavbar'
import NavBarRevised from '../../../tools/NavBarRevised'





const SinglePrimarySchool = () => {

  // state for errors
  const [errors, setErrors] = useState()

  // state for navigateion
  const navigate = useNavigate()

  // state for school information
  const [primaryData, setPrimaryData] = useState()


  // load in specfic secondary school
  const loadPrimaryData = () => {
    const getPrimaries = async () => {
      try {
        const id = JSON.parse(localStorage.getItem('school-id'))
        const { data } = await axios.get(`/api/primaries/${id}`)
        console.log('single primary data ->', data)
        setPrimaryData(data)
      } catch (error) {
        setErrors(true)
        console.log(error)
      }
    }
    getPrimaries()
  }

  // carry out calculation
  useEffect(() => {
    loadPrimaryData()
  }, [])


  return (

    <>

      {primaryData ?
        <>
          <section className="single-school-profile">
            <div className="school-core-info">
              <div className="info-left">
                <h1>{primaryData[0].school_name}</h1>
                <h3 className='normal'>📈 Ofsted: {primaryData[0].ofsted_results === null ? 'N/a' : primaryData[0].ofsted_results}</h3>
                <h3 className='normal'>🎓 {primaryData[0].students} students per year</h3>
                <h3 className='normal'>👨‍👧 Gender: {primaryData[0].gender}</h3>
                <h3 className='normal'>🙏 Faith: {primaryData[0].religion === null ? 'All' : primaryData[0].religion}</h3>
                {/* <h3 className='website'>💻 {primaryData[0].school_url}</h3> */}
                <a href={primaryData[0].school_url} target='_blank' className='website' rel="noreferrer">💻 {primaryData[0].school_url}</a>

              </div>
              <div className="info-right">
                <div className='school-image' id='primary' style={{ backgroundImage: primaryData[0].image_url === null ? undefined : `url(${primaryData[0].image_url})` }}></div>
              </div>
            </div>
            <div className='school-academic-highlights'>
              <h1>Academic highlights</h1>
              <div className='row'>
                <div className='item'>
                  <div className='circle'>
                    <h1>{primaryData[0].percentile === null ? 'N/a' : Math.round(primaryData[0].percentile * 100) + 1}%</h1>
                  </div>
                  {primaryData[0].percentile !== null ? <p>In the top {Math.round(primaryData[0].percentile * 100) + 1}% of primary schools in London</p> : <p>No performance data available for this school</p>}
                </div>
                <div className='item'>
                  <div className='circle'>
                    <h1>{primaryData[0].borough_percentile === null ? 'N/a' : Math.round(primaryData[0].borough_percentile * 100) + 1}%</h1>
                  </div>
                  {primaryData[0].borough_percentile !== null ? <p>In the top {Math.round(primaryData[0].borough_percentile * 100) + 1}% of primary schools in {primaryData[0].local_authority}</p> : <p>No performance data available for this school</p>}
                </div>
              </div>
            </div>
            <div className='school-results'>
              <h1>KS2 Results</h1>

              {primaryData && primaryData[0].school_type === 'Independent school' ?
                <h5 className='no-results'>No KS2 results for Independent schools</h5>
                : primaryData ?
                  <>
                    <div className='school-table-headers'>
                      <h5 id='column1'>#</h5>
                      <h5 id='column2'>Subject</h5>
                      <h5 id='column3'>At standard (%)</h5>
                      <h5 id='column4'>Exceeding standard (%)</h5>
                    </div><div className='school-table-details'>

                      <div className='school-content'>
                        <div className='column' id='column1'>
                          <h5>{1}</h5>
                        </div>
                        <div className='column' id='column2'>
                          <h5>Reading</h5>
                        </div>
                        <div className='column' id='column3'>
                          {primaryData[0].at_standard_reading !== null ? <h5>{primaryData[0].at_standard_reading}</h5> : <h5>No reading data avilable for this school</h5>}
                        </div>
                        <div className='column' id='column4'>
                          {primaryData[0].exceeding_standard_reading !== null ? <h5>{primaryData[0].exceeding_standard_reading}</h5> : ''}
                        </div>
                      </div>
                      <hr className='dividing-line' />

                    </div><div className='school-table-details'>

                      <div className='school-content'>
                        <div className='column' id='column1'>
                          <h5>{2}</h5>
                        </div>
                        <div className='column' id='column2'>
                          <h5>Writing</h5>
                        </div>
                        <div className='column' id='column3'>
                          {primaryData[0].at_standard_writing !== null ? <h5>{primaryData[0].at_standard_writing}</h5> : <h5>No writing data avilable for this school</h5>}
                        </div>
                        <div className='column' id='column4'>
                          {primaryData[0].exceeding_standard_writing !== null ? <h5>{primaryData[0].exceeding_standard_writing}</h5> : ''}
                        </div>
                      </div>
                      <hr className='dividing-line' />

                    </div><div className='school-table-details'>

                      <div className='school-content'>
                        <div className='column' id='column1'>
                          <h5>{3}</h5>
                        </div>
                        <div className='column' id='column2'>
                          <h5>Maths</h5>
                        </div>
                        <div className='column' id='column3'>
                          {primaryData[0].at_standard_maths !== null ? <h5>{primaryData[0].at_standard_maths}</h5> : <h5>No maths data avilable for this school</h5>}
                        </div>
                        <div className='column' id='column4'>
                          {primaryData[0].at_standard_maths !== null ? <h5>{primaryData[0].at_standard_maths}</h5> : ''}
                        </div>
                      </div>
                      <hr className='dividing-line' />

                    </div><div className='school-table-details'>

                      <div className='school-content'>
                        <div className='column' id='column1'>
                          <h5>{4}</h5>
                        </div>
                        <div className='column' id='column2'>
                          <h5>Grammar, punctuation and spelling</h5>
                        </div>
                        <div className='column' id='column3'>
                          {primaryData[0].at_standard_gps !== null ? <h5>{primaryData[0].at_standard_gps}</h5> : <h5>No GPS data avilable for this school</h5>}
                        </div>
                        <div className='column' id='column4'>
                          {primaryData[0].at_standard_gps !== null ? <h5>{primaryData[0].at_standard_gps}</h5> : ''}
                        </div>
                      </div>
                      <hr className='dividing-line' />

                    </div><div className='school-table-details'>

                      <div className='school-content'>
                        <div className='column' id='column1'>
                          <h5>{5}</h5>
                        </div>
                        <div className='column' id='column2'>
                          <h5>Science</h5>
                        </div>
                        <div className='column' id='column3'>
                          {primaryData[0].at_standard_science !== null ? <h5>{primaryData[0].at_standard_science}</h5> : <h5>No science data avilable for this school</h5>}
                        </div>
                        <div className='column' id='column4'>
                          {primaryData[0].at_standard_science !== null ? <h5>{primaryData[0].at_standard_science}</h5> : ''}
                        </div>
                      </div>
                      <hr className='dividing-line' />

                    </div>
                  </>
                  : ''}
            </div>

          </section>
        </>
        : ''}


    </>
  )
}

export default SinglePrimarySchool