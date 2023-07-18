import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'

import NavBar from '../tools/NavBar'
import { isUserAuth, getUserToken , getAccessToken
} from '../auth/Auth'
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



  // ? Section 2: Load user information
  const loadUserData = () => {
    // Assuming th user is authorised, we want to load their profile information and set states based on relevant sections of this
    if (isUserAuth()) {
      try {
        const getUser = async () => {
          const { data } = await axios.get(`/api/auth/profile/${getUserToken()}/`, {
            headers: {
              Authorization: `Bearer ${getAccessToken()}`,
            },
          })
          console.log('user data ->', data)
          setUserData(data)
          setPropertyList(data.white_properties)

          // Calculate the total value of properties in millions
          const totalValue = data.white_properties.reduce((acc, property) => acc + property.price, 0) / 1000000
          setPropertyValueSum(totalValue.toFixed(1))

        }
        getUser()
      } catch (error) {
        setErrors(true)
        console.log(error)
      }
    } else {
      navigate('/access-denied')
      console.log('no account')
    }
  }

  // carry out calculation to load user data
  useEffect(() => {
    loadUserData()
    console.log('carrying out userData load')
  }, [])


  // ? Section3: Other useful functions
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
                {userData ?
                  <>
                    <h1>{userData.white_properties.length}</h1>
                    <h5>Properties under management</h5>
                  </>
                  : ''}
              </div>
              <div className='summary-box'>
                {userData ?
                  <>
                    <h1>£<NumericFormat value={propertyValueSum} displayType={'text'} thousandSeparator={true} prefix={''} />m</h1>
                    <h5>Properties under management</h5>
                  </>
                  : ''}
              </div>
              <div className='summary-box'>
                <h1>36</h1>
                <h5>Properties sold</h5>
              </div>
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
                  <div id='column5' className='sort-section'>
                    <h5>Date added</h5>
                    <h5 className='sort' onClick={() => sortByField('date')}>↕️</h5>
                  </div>
                  <h5 id='column5'>Action</h5>
                </div>
                <div className='property-table-details'>
                  {userData ? userData.white_properties
                    .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
                    .filter((item) => item.status.toLowerCase().includes(statusFilter.toLowerCase()))
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
                            <div className='column' id='column5'>
                              <h5>2023/06/18</h5>
                            </div>
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
        {/* // : profileContent === 'Variables' ?

        //   <>
        //     <VariablesPage 
        //       profileDetail={profileDetail}  
        //       setProfileDetail={setProfileDetail}
        //     />
        
      
              
          //   </>
          : profileContent === 'Comparison' ?

            <>
              <WhiteComparison
                userData={userData}
                propertyList={propertyList}
              />
              
            </>

            : '' } */}
      </section>

    </>
  )
}

export default LandingPage