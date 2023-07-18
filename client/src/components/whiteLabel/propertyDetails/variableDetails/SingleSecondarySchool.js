import React, { useState, useEffect, useInsertionEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import NavBar from '../../../tools/NavBar'
import { isUserAuth, getUserToken , getAccessToken } from '../../../auth/Auth'
import { NumericFormat } from 'react-number-format'
import Footer from '../../../tools/Footer'
import WhiteSidebar from '../../WhiteSidebar'
import WhiteNavbar from '../../../tools/WhiteNavbar'
import NavBarRevised from '../../../tools/NavBarRevised'





const SingleSecondarySchool = () => {

  // state for errors
  const [errors, setErrors] = useState()

  // state for navigateion
  const navigate = useNavigate()

  // state for school information
  const [secondaryData, setSecondaryData] = useState()

  // id for searching for property
  const { id } = useParams()

  // state for determining what content shows
  const [profileContent, setProfileContent] = useState('My properties')
  const [profileDetail, setProfileDetail] = useState('My properties')  

  // states for pop outs on the side
  const [variableSide, setVariableSide] = useState(false)

  // load in specfic secondary school
  const loadSecondaryData = () => {
    const getSecondaries = async () => {
      try {
        const { data } = await axios.get(`/api/secondaries/${id}`)
        console.log('secondaries data ->', data)
        setSecondaryData(data)
      } catch (error) {
        setErrors(true)
        console.log(error)
      }
    }
    getSecondaries()
  }

  // carry out calculation
  useEffect(() =>{
    loadSecondaryData()
  }, [])


  return (

    <>
      <section className='agent-specific-property'>
        <div className='desktop-nav'>
          <WhiteNavbar
            navbarColour='#FDF7F0'
          />
        </div>
        <div className='mobile-nav'>
          <NavBarRevised
            setProfileContent={setProfileContent}
            profileContent={profileContent}
            profileDetail={profileDetail}
            setProfileDetail={setProfileDetail}
          />
        </div>
        <div className='go-back-button'>
          <h5 onClick={() =>  navigate('/agents/profile')}>&lt;- back to profile</h5>
        </div>
        <WhiteSidebar
          setProfileDetail={setProfileDetail}
          variableSide={variableSide} 
          setProfileContent={setProfileContent} 
          setVariableSide={setVariableSide}
        />
        {secondaryData ? 
          <><section className="single-school-profile">
            <div className="school-core-info">
              <div className="info-left">
                <h1>{secondaryData[0].school_name}</h1>
                <h3 className='normal'>📈 Ofsted: {secondaryData[0].ofsted_results}</h3>
                <h3 className='normal'>🎓 {secondaryData[0].students} students per year</h3>
                <h3 className='normal'>👨‍👧 Gender: {secondaryData[0].gender}</h3>
                <h3 className='normal'>🙏 Faith: {secondaryData[0].religion === null ? 'All' : secondaryData[0].religion}</h3>
                {/* <h3 className='website'>💻 {secondaryData[0].school_url}</h3> */}
                <a href={secondaryData[0].school_url} target='_blank' className='website' rel="noreferrer">💻 {secondaryData[0].school_url}</a>

              </div>
              <div className="info-right">
                <div className='school-image' id='secondary' style={{ backgroundImage: secondaryData[0].image_url === null ? undefined : `url(${secondaryData[0].image_url})` }}></div>
              </div>
            </div>
            <div className='school-academic-highlights'>
              <h1>Academic highlights</h1>
              <div className='row'>
                <div className='item'>
                  <h1>{Math.round((1 - secondaryData[0].percentile) * 100)}%</h1>
                  <p>In the top {Math.round((1 - secondaryData[0].percentile) * 100)}% of schools in London</p>
                </div>
                <div className='item'>
                  <h1>{Math.round((1 - secondaryData[0].borough_percentile) * 100)}%</h1>
                  <p>In the top {Math.round((1 - secondaryData[0].borough_percentile) * 100)}% of schools in {secondaryData[0].local_authority}</p>
                </div>
                <div className='item'>
                  <h1>{secondaryData[0].results.length}</h1>
                  <p>Good curriculum with {secondaryData[0].results.length} subjects</p>
                </div>
              </div>
            </div>
            <div className='school-results'>
              <h1>GCSE Results</h1>
              <div className='school-table-headers'>
                <h5 id='column1'>#</h5>
                <h5 id='column2'>Subject</h5>
                <h5 id='column3'>Pass rate (%)</h5>
                <h5 id='column4'>A/ A* (%)</h5>
              </div>
              <div className='school-table-details'>
                {secondaryData[0].results.map((item, index) => {
                  return (
                    <>
                      <div className='school-content'>
                        <div className='column' id='column1'>
                          <h5>{index + 1}</h5>
                        </div>
                        <div className='column' id='column2'>
                          <h5>{item.subject}</h5>
                        </div>
                        <div className='column' id='column3'>
                          <h5>{Math.round(item.pass_rate)}</h5>
                        </div>
                        <div className='column' id='column4'>
                          <h5>{Math.round(item.top_rate)}</h5>
                        </div>
                      </div>
                      <hr className='dividing-line' />

                    </>
                  )
                })}
              </div>
            </div>
          </section>
          </>
          : '' }
      </section> 

    
    </>
  )
}

export default SingleSecondarySchool