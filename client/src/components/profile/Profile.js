/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getUserToken, isUserAuth, getAccessToken } from '../auth/Auth'
import { Modal } from 'react-bootstrap'
import { NumericFormat } from 'react-number-format'
import NavBar from '../tools/NavBar'
import Loading from '../helpers/Loading'
import EditSearch from '../helpers/modals/EditSearch'
import PropertyComparison from './PropertyComparison'



const Profile = ({ handleSearchClose, searchShow, calc10 }) => {

  // ? Section 1: Define states to be used on page
  // set params for accessing specific pages
  const { id } = useParams()

  // setting formdata
  const [formData, setFormData] = useState({})

  // state to enable navigation between pages
  const navigate = useNavigate()

  // set error state for capturing errors
  const [errors, setErrors] = useState(false)

  // set state for user data
  const [userData, setUserData] = useState([])

  // state to collect properties
  const [properties, setProperties] = useState()

  // state for favourite data
  const [favouritesData, setFavouritesData] = useState()

  // state for favourite ids
  const [favouriteIds, setFavouriteIds] = useState()

  // state for setting the property search data
  const [propertySearch, setPropertySearch] = useState({})

  // set for capturing the id of the edit search
  const [editSearch, setEditSearch] = useState()

  // state for determining length of time been a user
  const [joinedDate, setJoinedDate] = useState()
  const [memberTime, setMemberTime] = useState()

  // state for controlling the buttons at the top of the page
  const [selection, setSelection] = useState({
    choice: 'My properties',
  })

  // state for list of favourite properties
  const [favouriteProperties, setFavouriteProperties] = useState()

  // define a list of properties that can be cmpared
  const [propertyList, setPropertyList] = useState()


  // create dropdown property list with proeprtties that can be compared
  useEffect(() => {
    if (favouriteProperties) {
      const list = []
      favouriteProperties.forEach(property => list.includes(property.property_name) ? '' : list.push(property.property_name))
      setPropertyList(list)
      console.log('names of favourite properties ->', list)
    }
  }, [favouriteProperties])


  // ? Section 2: User and property information - load in key info required for profile
  // load in the user information
  const loadUserData = () => {
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
          setFavouritesData(data.favourites)
          console.log('favourite propertes ->', data.favourites)
          setJoinedDate(data.date_joined)
          setPropertySearch(data.property_search_details)
        }
        getUser()
      } catch (error) {
        setErrors(true)
        console.log(error)
      }
    } else {
      console.log('no access')
      navigate('/access-denied')
    }
  }

  // carry out calculation to load user data
  useEffect(() => {
    loadUserData()
  }, [])

  // load in property data
  const getProperties = async () => {
    try {
      const { data } = await axios.get('/api/properties/')
      setProperties(data)
      console.log('property data ->', data)
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  // carry oiut calculationo to load propeerty data
  useEffect(() => {
    getProperties()
  }, [])



  // ? Section 3: Favourite properties and saved searcheds
  // define the id of favourite properties
  useEffect(() => {
    if (favouritesData) {
      const favouriteList = []
      favouritesData.forEach(user => favouriteList.includes(user.property) ? '' : favouriteList.push(user.property))
      setFavouriteIds(favouriteList)
      console.log('favourite ids ->', favouriteList)
    }
  }, [favouritesData])


  // filter property data to only show the favourite properties
  useEffect(() => {
    if (properties && favouriteIds) {
      const result = properties.filter(property => favouriteIds.includes(property.id))
      setFavouriteProperties(result)
      console.log('favourited properties ->', result)
    }
  }, [properties])


  // set specific searech details on click of button
  const setID = e => {
    const result = propertySearch.filter(property => {
      return property.result_id === parseInt(e.target.id)
    })
    window.localStorage.setItem('wittle-form-input', JSON.stringify(result[0]))
    // console.log('indivdual search ->', result)
    navigate('/wittle-results/')
  }

  // state to handle the properties for sale or rent
  const [channel, setChannel] = useState({
    channel: 'For Sale',
  })



  // ? Section 4: Editing and deleting  a search
  // set state for showing insights modal
  const [editShow, setEditShow] = useState(false)

  // close modal
  const handleEditClose = () => {
    setEditShow(false)
  }

  // show the modal
  const handleEditShow = (e) => {
    const result = propertySearch.filter(property => {
      return property.result_id === parseInt(e.target.id)
    })
    setEditSearch(result[0])
    console.log('edit parameters ->', result)
    setEditShow(true)
  }


  // function to delete the search
  const deleteSearch = async (e) => {
    try {
      const { data } = await axios.delete(`/api/property-search/${parseInt(e.target.id)}`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
    } catch (error) {
      console.log('error message ->', error)
      console.log('error detail ->', error.response.data)
    }
    loadUserData()
    getProperties()
  }


  // Function to delete property
  const deleteProperty = async (e) => {
    try {
      const { data } = await axios.delete(`/api/favourites/${parseInt(e.target.id)}/`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
    } catch (error) {
      console.log(error)
      console.log('error detail ->', error.response.data)
    }
    loadUserData()
    getProperties()
  }




  return (
    <>
      <section className='profile-page'>
        <NavBar />
        {!favouriteProperties ?
          <section className='loading-screen'>
            <h1>Wittle profile loading...</h1>
            <h3>Hold on while we load your profile details.</h3>
            {/* <div className='loading-gif'></div> */}
            <Loading />

          </section>
          :
          <>
            <section className='profile-page-body'>
              <div className='profile-top'>
                <div className='profile-intro'>
                  <h1 className='profile-name'>{userData ? userData.first_name : ''}</h1>
                  <p className='profile-bio'>Thanks for being part of Wittle. Welcome to your account, this is a collection of everything you like on Wittle.. enjoy!</p>
                </div>
                <div className='top-insights'>
                  <div onClick={() => setSelection({ ...selection, choice: 'My properties' })} className='box-insights'>
                    <h1>{favouriteProperties ? favouriteProperties.length : ''}</h1>
                    <p>Saved properties</p>
                  </div>
                  <div onClick={() => setSelection({ ...selection, choice: 'My searches' })} className='box-insights'>
                    <h1>{propertySearch ? propertySearch.length : ''}</h1>
                    <p>Saved searches</p>
                  </div>
                </div>
              </div>
              {favouriteProperties ?
                <div className='profile-content'>
                  <div className='selection-buttons'>
                    <h4 onClick={() => setSelection({ ...selection, choice: 'My properties' })} style={{ color: selection.choice === 'My properties' ? '#152BA4' : '#152BA4', textDecoration: selection.choice === 'My properties' ? 'underline 3px #FFA7E5' : 'none', fontWeight: selection.choice === 'My properties' ? '700' : '400' }}>My properties</h4>
                    <h4 onClick={() => setSelection({ ...selection, choice: 'My searches' })} style={{ color: selection.choice === 'My searches' ? '#152BA4' : '#152BA4', textDecoration: selection.choice === 'My searches' ? 'underline 3px #FFA7E5' : 'none', fontWeight: selection.choice === 'My searches' ? '700' : '400' }}>My searches</h4>
                    <h4 onClick={() => setSelection({ ...selection, choice: 'Property comparison' })} style={{ color: selection.choice === 'Property comparison' ? '#152BA4' : '#152BA4', textDecoration: selection.choice === 'Property comparison' ? 'underline 3px #FFA7E5' : 'none', fontWeight: selection.choice === 'Property comparison' ? '700' : '400' }}>Property comparison</h4>
                    <h4 onClick={() => setSelection({ ...selection, choice: 'Personal details' })} style={{ color: selection.choice === 'Personal details' ? '#152BA4' : '#152BA4', textDecoration: selection.choice === 'Personal details' ? 'underline 3px #FFA7E5' : 'none', fontWeight: selection.choice === 'Personal details' ? '700' : '400' }}>Personal details</h4>
                    <h4 onClick={() => setSelection({ ...selection, choice: 'Contact preferences' })} style={{ color: selection.choice === 'Contact preferences' ? '#152BA4' : '#152BA4', textDecoration: selection.choice === 'Contact preferences' ? 'underline 3px #FFA7E5' : 'none', fontWeight: selection.choice === 'Contact preferences' ? '700' : '400' }}>Contact preferences</h4>
                  </div>
                  <div className='selection-detail'>
                    {selection.choice === 'My properties' && favouriteProperties.length > 0 ?
                      <>
                        <div className='property-choice' name='channel' onChange={(e) => setChannel({ ...channel, channel: e.target.value })}>
                          <select>
                            <option>For Sale</option>
                            <option>For Rent</option>
                          </select>
                        </div>
                        <div className='property-grid'>
                          {favouriteProperties && channel.channel === 'For Rent' ?
                            <div className='property-card'>
                              {favouriteProperties.filter(property => property.channel === 'Rent').map(property => {
                                return (
                                  <>
                                    <div className='property-detail'>
                                      <div className='property-image' onClick={() => navigate(`/wittle-results/${property.id}`)} style={{ backgroundImage: `url('${property.property_image_1}')` }}>
                                      </div>
                                      <div className='property-text-top'>
                                        <h5>{property.property_name}</h5>
                                        <h5><NumericFormat value={property.monthly} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h5>
                                      </div>
                                      <div className='property-text-bottom'>
                                        <h5>{property.type}</h5>
                                        <h5>🛌 {property.bedrooms}</h5>
                                        <button id={property.id} onClick={deleteProperty}>Delete</button>
                                      </div>
                                    </div>
                                  </>
                                )
                              })}
                            </div>
                            :
                            favouriteProperties && channel.channel === 'For Sale' ?
                              <div className='property-card'>
                                {favouriteProperties.filter(property => property.channel === 'Sale').map(property => {
                                  return (
                                    <>
                                      <div className='property-detail'>
                                        <div className='property-image' onClick={() => navigate(`/wittle-results/${property.id}`)} style={{ backgroundImage: `url('${property.property_image_1}')` }}>
                                        </div>
                                        <div className='property-text-top'>
                                          <h5>{property.property_name}</h5>
                                          <h5><NumericFormat value={property.value} displayType={'text'} thousandSeparator={true} prefix={'£'} /></h5>
                                        </div>
                                        <div className='property-text-bottom'>
                                          <h5>{property.type}</h5>
                                          <h5>🛌 {property.bedrooms}</h5>
                                          <button id={property.id} onClick={deleteProperty}>Delete</button>
                                        </div>
                                      </div>
                                    </>
                                  )
                                })}
                              </div>
                              : ''}
                        </div>
                      </>
                      :
                      selection.choice === 'My properties' && favouriteProperties.length === 0 ?
                        <>
                          <div className='no-properties'>
                            <h4 className='no-properties-text'>😕</h4>
                            <h4 className='no-properties-text'>You don&apos;t have any properties saved yet.</h4>
                            <h4 className='no-properties-subtext'>Once you&apos;ve found somewhere you like, favourite it and you&apos;ll find it here.</h4>
                            <div className='favourite-instructions'>
                              <div className='favourite-button-on'>

                              </div>
                              {/* <h3>^</h3> */}
                              <h4>Look out for this icon when you&apos;re looking at properties</h4>
                            </div>
                          </div>
                        </>
                        :
                        selection.choice === 'My searches' && userData.property_search_details.length > 0 ?
                          <>
                            <div className='search-grid'>
                              {userData ?
                                <div className='search-card'>
                                  {userData.property_search_details.map((search, index) => {
                                    return (
                                      <>
                                        <div className='search-detail' key={index}>
                                          <div className='search-title'>
                                            <h3>{search.search_name}</h3>
                                            <div className='search-buttons'>
                                              <button onClick={deleteSearch} id={search.result_id} className='transparent-btn'>Delete</button>
                                              <button onClick={handleEditShow} id={search.result_id} className='transparent-btn'>Edit</button>
                                              <button onClick={setID} key={index} id={search.result_id} className='block-btn'>Results</button>
                                            </div>
                                          </div>
                                          <div className='search-footer'>
                                            <div className='search-footer-property'>
                                              <div className='search-summary'>
                                                <h1 className='search-count'>{search.total_properties}</h1>
                                                <p className='search-description'>properties</p>
                                              </div>
                                            </div>
                                            <div className='search-footer-scores'>
                                              <div className='search-summary'>
                                                <h1 className='search-count'>🔥 {search.top_score}%</h1>
                                                <p className='search-description'>max match</p>
                                              </div>
                                              <div className='search-summary'>
                                                <h1 className='search-count'>🔥 {search.average_score}%</h1>
                                                <p className='search-description'>avg match</p>
                                              </div>
                                            </div>
                                          </div>
                                          <div className='search-content'>
                                            <div className='search-left'>
                                              <h4>Property criteria</h4>
                                              <div className='search-section-detail'>
                                                <p>🏠  Type: {search.property_type}</p>
                                                <p>💷  Price: <NumericFormat value={search.property_price_min} displayType={'text'} thousandSeparator={true} prefix={'£'} /> - <NumericFormat value={search.property_price_max} displayType={'text'} thousandSeparator={true} prefix={'£'} /></p>
                                                <p>🛌  Bedrooms: {search.property_bed_min} - {search.property_bed_max}</p>
                                              </div>
                                            </div>
                                            <div className='search-right'>
                                              <h4>Search requirements</h4>
                                              {propertySearch ?
                                                <div className='search-section-detail'>
                                                  {search.restaurant_selection ? <button className='pills'>Restaurants</button> : ''}
                                                  {search.takeaway_selection ? <button className='pills'>Takeaways</button> : ''}
                                                  {search.pubs_selection ? <button className='pills'>Pubs</button> : ''}
                                                  {search.cafes_selection ? <button className='pills'>Cafes</button> : ''}
                                                  {search.supermarket_selection ? <button className='pills'>Supermarkets</button> : ''}
                                                  {search.gym_selection ? <button className='pills'>Gyms</button> : ''}
                                                  {search.park_selection ? <button className='pills'>Parks</button> : ''}
                                                  {search.workplace_selection ? <button className='pills'>Work</button> : ''}
                                                  {search.tube_selection ? <button className='pills'>Tubes</button> : ''}
                                                  {search.train_selection ? <button className='pills'>Trains</button> : ''}
                                                  {search.primary_selection ? <button className='pills'>Primaries</button> : ''}
                                                  {search.secondary_selection ? <button className='pills'>Secondaries</button> : ''}
                                                  {search.college_selection ? <button className='pills'>Colleges</button> : ''}
                                                  {search.family_selection ? <button className='pills'>Family</button> : ''}
                                                </div>
                                                : ''}
                                            </div>
                                          </div>
                                        </div>
                                      </>
                                    )
                                  }).sort((a, b) => b.result_id - a.result_id)}
                                </div> : ''}
                            </div>
                          </>
                          :
                          selection.choice === 'My searches' && userData.property_search_details.length === 0 ?
                            <>
                              <div className='no-properties'>
                                <h4 className='no-properties-text'>😕</h4>
                                <h4 className='no-properties-text'>You haven&apos;t saved any searches yet.</h4>
                                <h4 className='no-properties-subtext'>As soon as you&apos;ve saved a search, it&apos;ll show here, then you can change or update it whenever you like.</h4>
                                <button onClick={() => navigate('/wittle-search')}>Start Wittling</button>
                              </div>
                            </>

                            // Property Comparison section //
                            : selection.choice === 'Property comparison' && favouriteProperties.length > 0 ?
                              <PropertyComparison
                                favouritesData={favouritesData}
                                favouriteProperties={favouriteProperties}
                                propertyList={propertyList}
                              />
                              :
                              selection.choice === 'Property comparison' && favouriteProperties.length === 0 ?
                                <>
                                  <div className='no-properties'>
                                    <h4 className='no-properties-text'>😕</h4>
                                    <h4 className='no-properties-text'>You haven&apos;t saved any properties yet.</h4>
                                    <h4 className='no-properties-subtext'>Once you&apos;ve saved some properties, you can compare them and decide on your favourite. Then you&apos;ll really be Wittling.</h4>
                                  </div>
                                </>

                                : ''}
                  </div>
                </div>
                : ''}
            </section>

          </>
        }
      </section>
      <div className='edit-modal-section'>
        <EditSearch
          editShow={editShow}
          handleEditClose={handleEditClose}
          handleEditShow={handleEditShow}
          editSearch={editSearch}
          setEditSearch={setEditSearch}
          handleSearchClose={handleSearchClose}
          searchShow={searchShow}
          calc10={calc10}
          formData={formData}
          setFormData={setFormData}
          setErrors={setErrors}
          setEditShow={setEditShow}
          loadUserData={loadUserData}
          getProperties={getProperties}
        />
      </div>

    </>
  )

}

export default Profile

