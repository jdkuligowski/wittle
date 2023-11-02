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

  // set state for user
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

  const [inputType, setInputType] = useState('Efficiency')


  const [favouritedProperties, setFavouritedProperties] = useState([])

  const [sessionName, setSessionName] = useState(sessionStorage.getItem('sessionName') || '')



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

    const sanitizedPostcode = postcodeSubstring.replace(/\s+/g, '')


    try {
      const { data } = await axios.get(`/api/epc/${sanitizedPostcode}`)
      console.log('Postcode data ->', data)
      setLongPropertyList(data)

      if (data && Array.isArray(data) && data.length > 0) {
        let filteredData = data

        if (inputType === 'Efficiency') {
          filteredData = filteredData.filter(property =>
            (!roadSubstring || property.address.toLowerCase().includes(roadSubstring.toLowerCase())) &&
            (!currentEnergy || property.current_energy_efficiency === Number(currentEnergy)) &&
            (!potentialEnergy || property.potential_energy_efficiency === Number(potentialEnergy))
          )
        } else if (inputType === 'Rating') {
          filteredData = filteredData.filter(property =>
            (!roadSubstring || property.address.toLowerCase().includes(roadSubstring.toLowerCase())) &&
            (!currentEnergy || property.current_energy_rating === currentEnergy.toUpperCase()) &&
            (!potentialEnergy || property.potential_energy_rating === potentialEnergy.toUpperCase())
          )
        }

        filteredData = filteredData.sort((a, b) => new Date(b.inspection_date) - new Date(a.inspection_date))

        if (filteredData.length > 0) {
          setPropertyList(filteredData)
          console.log('filtered data->', filteredData)
          increaseUsageCount()
        } else if (filteredData.length === 0) {
          setPropertyList('')
        }

        setLoading(false)
      } else {
        console.log('No postcode data available')
        setLoading(false)
      }
    } catch (error) {
      setPropertyList('')
      setErrors(true)
      console.log(error)
      setLoading(false)
    }

    setSearch(true)
  }




  // increase value in db based on successful response
  const increaseUsageCount = async () => {
    if (isUserAuth()) {
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
    } else {
      navigate('/access-denied')
      console.log('logged out')
    }
  }

  // function for adding favourites based on relevant row
  const addFavourite = async (property) => {
    if (isUserAuth()) {
      try {
        const { data } = await axios.post('/api/epc_favourite/', {
          postcode: property.postcode,
          address: property.address,
          category: sessionName,
        }, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        console.log('session name->', sessionName)

        if (data.message && !isFavourited(property)) {
          setFavouritedProperties(prevState => [...prevState, { postcode: property.postcode, address: property.address, category: sessionName }])
        }
      } catch (error) {
        console.error('Error saving favourite:', error)
      }
    } else {
      navigate('/access-denied')
      console.log('logged out')
    }
  }


  // function to delete favourites
  const deleteFavourite = async (property) => {
    if (isUserAuth()) {

      try {
        const { data } = await axios.delete('/api/epc_favourite/', {
          data: {
            postcode: property.postcode,
            address: property.address,
          },
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        if (data.message) {
          setFavouritedProperties(prevState => prevState.filter(fav => fav.postcode !== property.postcode || fav.address !== property.address))
        }
      } catch (error) {
        console.error('Error deleting favourite:', error)
      }
    } else {
      navigate('/access-denied')
      console.log('logged out')
    }
  }






  function isFavourited(item) {
    return favouritedProperties.some(fav => fav.postcode === item.postcode && fav.address === item.address)
  }


  const fetchFavourites = async () => {
    try {
      const { data } = await axios.get('/api/epc_favourite/', {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      setFavouritedProperties(data)
    } catch (error) {
      console.error('Error fetching favourites:', error)
    }
  }

  useEffect(() => {
    fetchFavourites()
  }, [])




  useEffect(() => {
    if (sessionName) {
      sessionStorage.setItem('sessionName', sessionName)
    }
  }, [sessionName])



  // remove login token from storage
  const removeItemFromStorage = (token) => {
    localStorage.removeItem('wittle-user-token')
    localStorage.removeItem('wittle-username')
    // window.location.reload()

    navigate('/login')
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
        <section className='main-body'>
          <section className='main-body-details'  >

            <>
              {userData && userData.usage_stats[0] &&
                ((userData.usage_stats[0].package === 'Basic' && userData.usage_stats[0].epc_monthly_count < 11) ||
                  (userData.usage_stats[0].package === 'Unlimited') ||
                  (userData.usage_stats[0].package === 'Advanced Pilot' && userData.usage_stats[0].epc_monthly_count < 101)) ?
                <section className='property-finder'>
                  <div className='listing-options'>
                    <div className='listing-buttons'>
                      {/* <h5 onClick={() => setFavouriteTab('Listings')} style={{ borderBottom: favouriteTab === 'Listings' ? '3px solid #ED6B86' : 'none', textUnderlineOffset: favouriteTab === 'Listings' ? '0.5em' : 'initial', fontWeight: favouriteTab === 'Listings' ? '700' : '400' }}>Listings</h5>
                      <h5 onClick={() => setFavouriteTab('Property prospects')} style={{ borderBottom: favouriteTab === 'Property prospects' ? '3px solid #ED6B86' : 'none', textUnderlineOffset: favouriteTab === 'Property prospects' ? '0.5em' : 'initial', fontWeight: favouriteTab === 'Property prospects' ? '700' : '400' }}>Property prospects</h5> */}
                    </div>
                    <div className='logout-button' onClick={removeItemFromStorage}>
                      <div className='logout-icon'></div>
                    </div>


                  </div>
                  <hr className='title-line' />
                  <div className='epc-matcher'>
                    <div className='input-section'>
                      <h3 className='sub-title'>Input property details to find  details about live listings</h3>
                      {!loading ?
                        <>
                          <div className='single-input-block'>

                            <div className='input-block large'>
                              <h3>Property category</h3>
                              <input
                                type="text"
                                value={sessionName}
                                onChange={e => setSessionName(e.target.value)}
                                placeholder="Enter category"
                              />
                            </div>
                          </div>
                          <div className='double-input-block'>

                            <div className='input-block half'>
                              <h3>Postcode</h3>
                              <input
                                type="text"
                                value={postcodeSubstring}
                                onChange={e => setPostcodeSubstring(e.target.value)}
                                placeholder="Enter postcode..."></input>
                            </div>
                            <div className='input-block half'>
                              <h3>Road name</h3>
                              <input
                                type="text"
                                value={roadSubstring}
                                onChange={e => setRoadSubstring(e.target.value)}
                              ></input>
                            </div>
                          </div>
                          <div className='single-input-block'>

                            <div className='input-block large'>
                              <h3>Efficiency (numbers) or Rating (letters)</h3>
                              <select onChange={(e) => setInputType(e.target.value)}>
                                <option>Efficiency</option>
                                <option>Rating</option>
                              </select>
                            </div>
                          </div>
                          {inputType === 'Efficiency' ?
                            <>
                              <div className='double-input-block'>

                                <div className='input-block half'>
                                  <h3>Current Energy Efficiency</h3>
                                  <input
                                    type="number"
                                    value={currentEnergy}
                                    onChange={e => setCurrentEnergy(e.target.value)}
                                  ></input>
                                </div>
                                <div className='input-block half'>
                                  <h3>Potential Energy Efficiency</h3>
                                  <input
                                    type="number"
                                    value={potentialEnergy}
                                    onChange={e => setPotentialEnergy(e.target.value)}
                                  ></input>
                                </div>
                              </div>
                            </>
                            :
                            <>
                              <div className='double-input-block'>

                                <div className='input-block half'>
                                  <h3>Current Energy Rating</h3>
                                  <input
                                    type="text"
                                    value={currentEnergy}
                                    onChange={e => setCurrentEnergy(e.target.value)}
                                  ></input>
                                </div>
                                <div className='input-block half'>
                                  <h3>Potential Energy Rating</h3>
                                  <input
                                    type="text"
                                    value={potentialEnergy}
                                    onChange={e => setPotentialEnergy(e.target.value)}
                                  ></input>
                                </div>
                              </div>
                            </>
                          }
                          <div className='search-section'>
                            <button className='load-insights' onClick={loadProperties}>Load Properties</button>

                          </div>
                        </>
                        :
                        <Loading />}
                    </div>


                    <div className='property-results'>
                      <div className='results-block'>
                        {longPropertyList.length === 0 && !search ? <h3 className='sub-title'>Start new search to see results</h3> :
                          search && propertyList.length === 0 ? <h3 className='sub-title'>We couldn&apos;t find anything that matched your search</h3> :
                            search && propertyList.length > 0 ?
                              <>
                                <h3 className='sub-title'>You have {propertyList.length} matching results</h3>
                                {/* <div className='results-headers'>
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
                                  <div id='column5' className='column'>
                                    <h5></h5>
                                  </div>
                                </div>
                                <hr className='property-divider' /> */}
                                <div className='results-details'>
                                  {propertyList ? propertyList
                                    .map((item, index) => {
                                      return (
                                        <>
                                          <div className='results-content' key={index}>
                                            <h5 className='row-value'>{index + 1}</h5>
                                            <div className='results-items'>
                                              <div className='results-line'>
                                                <div className='result-icon' id='catchment'></div>
                                                <div className='results-text'>
                                                  <h5 className='text-title' >Address: </h5>
                                                  <h5 className='text-result'>{item.address}</h5>
                                                </div>
                                              </div>
                                              <div className='results-line'>
                                                <div className='result-icon' id='house'></div>
                                                <div className='results-text'>
                                                  <h5 className='text-title'>Floor area: </h5>
                                                  <h5 className='text-result'>{item.floor_area} sq.m</h5>
                                                </div>
                                              </div>
                                              <div className='results-line'>
                                                <div className='result-icon' id='location'></div>
                                                <div className='results-text'>
                                                  <h5 className='text-title'>Postcode: </h5>
                                                  <h5 className='text-result'>{item.postcode}</h5>
                                                </div>
                                              </div>
                                              <div className='results-line'>
                                                <div className='result-icon' id='building'></div>
                                                <div className='results-text'>
                                                  <h5 className='text-title'>Floor level: </h5>
                                                  <h5 className='text-result'>{item.final_floor_level}</h5>
                                                </div>
                                              </div>
                                              <div className='results-line'>
                                                <div className='result-icon' id='search'></div>
                                                <div className='results-text'>
                                                  <h5 className='text-title'>last inspection: </h5>
                                                  <h5 className='text-result'>{item.inspection_date}</h5>
                                                </div>
                                              </div>
                                            </div>
                                            <div className='column' id='column5'>
                                              {isFavourited(item) ?
                                                <button className='added' onClick={() => deleteFavourite(item, index)}>✔️</button> :
                                                <button className='add' onClick={() => addFavourite(item, index)}>+</button>
                                              }
                                            </div>
                                            {/* <div className='column' id='column1'>
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
                                            <div className='column' id='column5'>
                                              {isFavourited(item) ?
                                                <button className='added' onClick={() => deleteFavourite(item, index)}>✔️</button> :
                                                <button className='add' onClick={() => addFavourite(item, index)}>+</button>
                                              }
                                            </div> */}
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
                : userData && userData.usage_stats[0].package === 'Basic' && userData.usage_stats[0].epc_monthly_count >= 11 ?
                  <section className='property-finder'>
                    <h1>🙏 Thanks for enjoying Wittle!</h1>
                    <h3 className='limit-reached'>You have reached the free limit of matches for this month, get in touch to unlock another 90 matches.</h3>
                  </section>

                  : userData && userData.usage_stats[0].package === 'Advanced pilot' && userData.usage_stats[0].epc_monthly_count >= 101 ?
                    <section className='property-finder'>
                      <h1>🙏 Thanks for enjoying Wittle!</h1>
                      <h3 className='limit-reached'>You have carried out 100 matches this month, get in touch to discuss increasing your limit.</h3>
                    </section>

                    : ''}

            </>

          </section>
        </section>
      </section>




    </>
  )
}

export default PropertyFinder