import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getUserToken, isUserAuth, getAccessToken } from '../../auth/Auth'
import { Modal } from 'react-bootstrap'
import { NumericFormat } from 'react-number-format'
import NavBar from '../../tools/NavBar'
import ProfileMobileSlider from '../../tools/ProfileMobileSlider'
import WhiteNavbar from '../../tools/WhiteNavbar'
import WhiteSidebar from '../WhiteSidebar'
import NavBarRevised from '../../tools/NavBarRevised'
import Loading from '../../helpers/Loading'


axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const PropertyFinder = () => {


  // state to enable navigation between pages
  const navigate = useNavigate()

  // set state for errors
  const [errors, setErrors] = useState()

  // set state for user data
  const [userData, setUserData] = useState()

  // set state for loading
  const [loading, setLoading] = useState()

  // set state for completing a search
  const [search, setSearch] = useState(false)
  
  // state for determining what content shows
  const [profileContent, setProfileContent] = useState('Comparison')
  const [profileDetail, setProfileDetail] = useState('Comparison')  
  
  // states for pop outs on the side
  const [variableSide, setVariableSide] = useState(false)
  
  const [postcodeSubstring, setPostcodeSubstring] = useState('')
  const [roadSubstring, setRoadSubstring] = useState('')
  const [currentEnergy, setCurrentEnergy] = useState()
  const [potentialEnergy, setPotentialEnergy] = useState()
  const [longPropertyList, setLongPropertyList] = useState([])
  const [propertyList, setPropertyList] = useState([])
  const [channel, setChannel] = useState('')



  // ? Section 2: Load user information
  const loadUserData = () => {
    // Assuming the user is authorized, we want to load their profile information and set states based on relevant sections of this
    if (isUserAuth()) {
      const getUser = async () => {
        try {
          const { data } = await axios.get(`/api/auth/profile/${getUserToken()}/`, {
            headers: {
              Authorization: `Bearer ${getAccessToken()}`,
            },
          })
          console.log('user data ->', data)
          setUserData(data)
        } catch (error) {
          setErrors(true)
          console.log(error)
        }
      }
      getUser()
    } else {
      navigate('/access-denied')
      console.log('no account')
    }
  }


  // carry out calculation to load user data
  useEffect(() => {
    loadUserData()
  }, [])



  // function to load properties from EPC database
  const loadProperties = async () => {
    setLoading(true)
    setSearch(false)
    try {
      const { data } = await axios.get(`/api/epc/${postcodeSubstring}`)
      console.log('Postcode data ->', data)
      setLongPropertyList(data)
  
      if (data && Array.isArray(data) && data.length > 0) {
        const filteredData = data.filter(property => 
          property.address.toLowerCase().includes(roadSubstring.toLowerCase()) &&
          property.current_energy_efficiency === Number(currentEnergy) &&
          property.potential_energy_efficiency === Number(potentialEnergy)
        ).sort((a, b) => new Date(b.inspection_date) - new Date(a.inspection_date))
        
        
        setPropertyList(filteredData)
        console.log('filtered data->', filteredData)
        if (filteredData.length > 0) {
          increaseUsageCount()
        }
        setLoading(false)
      } else {
        console.log('No postcode data available')
        setLoading(false)
      }
    } catch (error) {
      setErrors(true)
      console.log(error)
      setLoading(false)
    }
    setSearch(true)
    loadUserData()
  }



  // increase value in db based on successful response
  const increaseUsageCount = async () => {
    console.log('trying to increase')
    try {
      const { data } = await axios.post('/api/usage/', {}, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      console.log(data)
      if (data.status === 'success') {
        console.log('Usage count increased successfully')
      } else {
        console.error('Failed to increase usage count:', data.message)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }



  return (

    <>
      <section className='agent-profile-page'>
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
        <WhiteSidebar 
          setProfileDetail={setProfileDetail}
          variableSide={variableSide} 
          setProfileContent={setProfileContent} 
          setVariableSide={setVariableSide}
          userData={userData}
        />    

        <>
          {userData ?
            <section className='property-finder'>
              <h1>Find the full address of properties listed on the market</h1>
              <div className='epc-matcher'>
                <div className='input-section'>
                  <h3 className='sub-title'>Add property details</h3>
                  {!loading ?
                    <>
                      <div className='input-block'>
                        <h3>Postcode</h3>
                        <input  
                          type="text" 
                          value={postcodeSubstring} 
                          onChange={e => setPostcodeSubstring(e.target.value)} 
                          placeholder="Enter postcode..."></input>
                      </div>
                      <div className='input-block'>
                        <h3>Road name</h3>
                        <input  
                          type="text" 
                          value={roadSubstring} 
                          onChange={e => setRoadSubstring(e.target.value)} 
                        ></input>
                      </div>
                      <div className='input-block'>
                        <h3>Current Energy Efficiency</h3>
                        <input
                          type="number" 
                          value={currentEnergy} 
                          onChange={e => setCurrentEnergy(e.target.value)} 
                        ></input>
                      </div>
                      <div className='input-block'>
                        <h3>Potential Energy Efficiency</h3>
                        <input
                          type="number" 
                          value={potentialEnergy} 
                          onChange={e => setPotentialEnergy(e.target.value)} 
                        ></input>
                      </div>
                      <button onClick={loadProperties}>Load Properties</button>  
                    </>
                    :
                    <Loading /> }    
                  <div className='tracking-results'>
                    <h3 className='sub-title'>💻 Current plan: {userData && userData.usage_stats[0].epc_tier === 1 ? 'Limited pilot' : userData && userData.usage_stats[0].epc_tier === 2 ? 'Unlimited' : 'Advanced pilot' }</h3>
                    <h3 className='sub-title'>🔎 Searches this month: {userData ? userData.usage_stats[0].epc_monthly_count : ''}</h3>
                    <p>🤝 {userData && userData.usage_stats[0].epc_tier === 1 ? 'Upgrade to the advanced pilot for up to 100 searches per month' : userData && userData.usage_stats[0].epc_tier === 0 ? '' : 'You have the highest tier account' }</p>
                  </div>
                </div>
      

                <div className='property-results'>
                  <h3 className='sub-title'>Matching properties</h3>
                  <div className='results-block'>
                    {longPropertyList.length === 0 && !search ? <h3 className='response'>🔎 Start new search to see results</h3> :
                      search && propertyList.length === 0 ? <h3 className='response'>🤦‍♀️ we couldn&apos;t find anything that matched your search</h3> :
                        search && propertyList.length > 0 ?
                          <>
                            <div className='results-headers'>
                              <h5 id='column1' className='column'>#</h5>
                              <div id='column2' className='column'>
                                <h5>Address</h5>
                              </div>
                              <div id='column3' className='column'>
                                <h5>Postcode</h5>
                              </div>
                              <div id='column4' className='column'>
                                <h5>Last inspection</h5>
                              </div>
                            </div>
                            <hr className='property-divider' />
                            <div className='results-details'>
                              {propertyList ? propertyList
                                .map((item, index) => {
                                  return (
                                    <>
                                      <div className='results-content' key={index}>
                                        <div className='column' id='column1'>
                                          <h5>{index + 1}</h5>
                                        </div>
                                        <div className='column' id='column2'>
                                          <h5>{item.address}</h5>
                                        </div>
                                        <div className='column' id='column3'>
                                          <h5>{item.postcode}</h5>
                                        </div>
                                        <div className='column' id='column4'>
                                          <h5>{item.inspection_date}</h5>
                                        </div>
                                      </div>
                                      <hr className='property-divider' />
                                    </>
                                  )
                                })
                                : ''}

                            </div>
                          </>
                          : ''}
                  </div>


                </div>
              </div>



   


            </section>
            : ''}
        </>

      </section>
 



    </>
  )
}

export default PropertyFinder