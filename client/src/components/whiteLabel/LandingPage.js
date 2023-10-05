import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'

import NavBar from '../tools/NavBar'
import { isUserAuth, getUserToken , getAccessToken } from '../auth/Auth'
import Footer from '../tools/Footer'
import { NumericFormat } from 'react-number-format'
import WhiteSidebar from './WhiteSidebar'
import WhiteNavbar from '../tools/WhiteNavbar'
import VariablesPage from './variableSummaries/VariablesPage'
import WhiteComparison from './comparisonSection/WhiteComparison'
import NavBarRevised from '../tools/NavBarRevised'





const LandingPage = () => {

  // ? Section 1: Define states
  // state to enable navigation between pages
  const navigate = useNavigate()

  // state for handling locations
  const location = useLocation()
  const [historyStack, setHistoryStack] = useState([])

  // set state for user data
  const [userData, setUserData] = useState()

  // set state for company data
  const [companyData, setCompany] = useState()

  // set state for errors
  const [errors, setErrors] = useState()

  // state for determining what content shows
  const [profileContent, setProfileContent] = useState('My properties')
  const [profileDetail, setProfileDetail] = useState('My properties')  

  // states for pop outs on the side
  const [variableSide, setVariableSide] = useState(false)

  // searchbar state
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  // set sort fields
  const [sortField, setSortField] = useState(null)

  // set state for lisrt of properties
  const [propertyList, setPropertyList] = useState()

  // Set state for the total value of properties
  const [propertyValueSum, setPropertyValueSum] = useState(0)

  // set state for determining the channel
  const [channel, setChannel] = useState()


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
          setCompany(data.company)
          console.log('company ->', data.company)
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


  // ? Section 3: Get properties
  const loadProperties = () => {
    const getProperties = async () => {
      try {
        const { data } = await axios.get(`/api/white_properties/${companyData}`, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        console.log('agent property data ->', data)
    
        if (data && Array.isArray(data) && data.length > 0) {
          setPropertyList(data)
          const totalValue = data.reduce((acc, property) => acc + (property.price || 0), 0)
          setPropertyValueSum(totalValue.toFixed(1))
          setChannel(data[0].status === 'Let' ? 'Rent' : 'Sale')
        } else {
          console.log('No property data available')
          // handle the case when data is not available or not in expected format
        }
      } catch (error) {
        setErrors(true)
        console.log(error)
      }
    }
    getProperties()
  }
  

  // carry out calculation to load user data
  useEffect(() => {
    if (companyData) {
      loadProperties()
    }
  }, [companyData])
  // useEffect(() => {
  //   let isMounted = true // track whether component is mounted
  
  //   if (company && isMounted) {
  //     loadProperties()
  //   }
  
  //   return () => {
  //     isMounted = false // cleanup toggler
  //   }
  // }, [company])
  


  // ? Section4: Other useful functions
  const sortByField = (field) => {
    setSortField(field)
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
        />
        {/* {profileContent === 'My properties' ? */}
        <>
          <section className='profile-summary'>
            <div className='welcome'>
              {userData ? <h1>👋 Welcome back {userData.first_name}!</h1> : ''}
            </div>
            <div className='summary-boxes'>
              <div className='summary-box'>
                {propertyList ?
                  <>
                    <h1>{propertyList.length}</h1>
                    <h5>Properties under management</h5>
                  </>
                  : ''}
              </div>
              <div className='summary-box'>
                {propertyList ?
                  <>
                    {channel === 'Sale' ? <h1>£<NumericFormat value={propertyValueSum / 1000000} displayType={'text'} thousandSeparator={true} prefix={''} />m</h1> : channel === 'Rent' ?  <h1>£<NumericFormat value={propertyValueSum / 1000} displayType={'text'} thousandSeparator={true} prefix={''} />k</h1> : '' }
                    <h5>Properties under management</h5>
                  </>
                  : ''}
              </div>
              {/* <div className='summary-box'>
                {channel === 'Rent' ?
                  <>
                    <h1>£<NumericFormat value={(propertyValueSum / 1000) * 0.2} displayType={'text'} thousandSeparator={true} prefix={''} />k</h1>
                    <h5>Max monthly revenue</h5>
                  </>
                  : ''}
              </div> */}
              {/* <div className='summary-box'>
                <h1>36</h1>
                <h5>Properties sold</h5>
              </div> */}
            </div>

          </section>
          
          <section className='profile-property-list'>
            <div className='search-section'>
              <div className='search-section-left'>
                <h3>Search</h3>
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder='Type property name'></input>
              </div>
              <div className='search-section-right'>
                <h3>Status</h3>
                <input value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} placeholder='All'></input>
              </div>
            </div>
            <div className='agent-property-list'>
              <div className='property-block'>
                <div className='property-table-headers'>
                  <h5 id='column1'></h5>
                  <div id='column2' className='sort-section'>
                    <h5>Street name</h5>
                    <h5 className='sort' onClick={() => sortByField('name')}>↕️</h5>
                  </div>                    
                  <div id='column3' className='sort-section'>
                    <h5>Price</h5>
                    <h5 className='sort' onClick={() => sortByField('price')}>↕️</h5>
                  </div>
                  <h5 id='column4'>Status</h5>
                  {/* <div id='column5' className='sort-section'>
                    <h5>Date added</h5>
                    <h5 className='sort' onClick={() => sortByField('date')}>↕️</h5>
                  </div> */}
                  <h5 id='column5'>Action</h5>
                </div>
                <div className='property-table-details'>
                  {propertyList ? propertyList
                    .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    // .filter((item) => item.status.toLowerCase().includes(statusFilter.toLowerCase()))
                    .sort((a, b) => {
                      if (sortField === 'name') {
                        return a.name.localeCompare(b.name)
                      } else if (sortField === 'price') {
                        return a.price - b.price
                      } else if (sortField === 'date') {
                        return new Date(a.date) - new Date(b.date) // This works if your date is in format 'YYYY/MM/DD'
                      }
                      return 0
                    })
                    .map((item, index) => {
                      return (
                        <>
                          <div className='property-content' key={index}>
                            <div className='column' id='column1'>
                              <div className='property-image' style={{ backgroundImage: `url(${item.image})` }}></div>
                            </div>
                            <div className='column' id='column2'>
                              <h5>{item.name}</h5>
                            </div>
                            <div className='column' id='column3'>

                              <h5><NumericFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h5>
                            </div>
                            <div className='column' id='column4'>
                              <h5>{item.status}</h5>
                            </div>
                            {/* <div className='column' id='column5'>
                              <h5>2023/06/18</h5>
                            </div> */}
                            <div className='column' id='column6'>
                              <button onClick={() => navigate(`/agents/property/${item.postcode}`)}>View</button>
                            </div>
                          </div>
                          <hr className='property-divider' />
                        </>
                      )
                    })
                    : ''}
                </div>
              </div>

            </div>
          </section>
        </>
      </section>

    </>
  )
}

export default LandingPage