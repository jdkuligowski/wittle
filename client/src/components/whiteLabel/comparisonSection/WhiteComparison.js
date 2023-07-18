import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getUserToken, isUserAuth, getAccessToken } from '../../auth/Auth'
import { Modal } from 'react-bootstrap'
import { NumericFormat } from 'react-number-format'
import NavBar from '../../tools/NavBar'
import ProfileMobileSlider from '../../tools/ProfileMobileSlider'
import Plot from 'react-plotly.js'
import WhiteNavbar from '../../tools/WhiteNavbar'
import WhiteSidebar from '../WhiteSidebar'
import NavBarRevised from '../../tools/NavBarRevised'




const WhiteComparison = () => {


  // state to enable navigation between pages
  const navigate = useNavigate()

  // setting states for property comparison
  const [property1, setProperty1] = useState()
  const [property2, setProperty2] = useState()

  // state for user data
  const [userData, setUserData] = useState()
  const [propertyList, setPropertyList] = useState()


  // define the states to capture the scores of the compared propeerties
  const [property1Numbers, setProperty1Numbers] = useState([])
  const [property2Numbers, setProperty2Numbers] = useState([])

  // set state for errors
  const [errors, setErrors] = useState()

  // state for determining what content shows
  const [profileContent, setProfileContent] = useState('Comparison')
  const [profileDetail, setProfileDetail] = useState('Comparison')  

  // states for pop outs on the side
  const [variableSide, setVariableSide] = useState(false)


  // state to capture the values of the two proeprties that are being compared
  const [propertyColours, setPropertyColours] = useState({
    property1_total: '',
    property2_total: '',
    property1_restaurant: '',
    property2_reestaurant: '',
    property1_pub: '',
    property2_pub: '',
    property1_cafe: '',
    property2_cafe: '',
    property1_takeaway: '',
    property2_takeaway: '',
    property1_tube: '',
    property2_tube: '',
    property1_train: '',
    property2_train: '',
    property1_supermarket: '',
    property2_supermarket: '',
    property1_gym: '',
    property2_gym: '',
    property1_park: '',
    property2_park: '',
    property1_primary: '',
    property2_primary: '',
    property1_secondary: '',
    property2_secondary: '',
  })


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

  // update values for first property comparison
  const updateComparison1 = (e) => {
    setProperty1(e.target.value)
    console.log('property 1 value ->', e.target.value)
  }

  // function for loading the first property data
  const loadProperty1 =  () => {
    try {
      const getPostcode = async () => {
        const { data } = await axios.get(`/api/postcodes/${property1}`)
        console.log('property 1 ->', data[0])
        setProperty1Numbers(data[0])
      }
      getPostcode()
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  // load function
  useEffect(() => {
    if (property1) {
      loadProperty1()
    }
  }, [property1])


  // update values for second property comparison
  const updateComparison2 = (e) => {
    setProperty2(e.target.value)
    console.log('property 2 value ->', e.target.value)
  }

  // function for loading the first property data
  const loadProperty2 =  () => {
    try {
      const getPostcode = async () => {
        const { data } = await axios.get(`/api/postcodes/${property2}`)
        console.log('property 2 ->', data[0])
        setProperty2Numbers(data[0])
      }
      getPostcode()
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  // load function
  useEffect(() => {
    if (property2) {
      loadProperty2()
    }
  }, [property2])

  return (
    <>
      {userData ?
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
          <div className='comparison-grid'>
            <div className='comparison-title'>
              <h1>Property 1</h1>
              <h1 className='desktop-results'>Results</h1>
              <h1>Property 2</h1>
            </div>
            <div className='comparison-subtitle'>
              <select className='comparison-dropdown' onChange={updateComparison1}>
                <option>Select property</option>
                {propertyList.map((property, index) => <option key={index} value={property.postcode}>{property.name}</option>)}
              </select>
              <select className='comparison-dropdown' onChange={updateComparison2}>
                <option>Select property</option>
                {propertyList.map((property, index) => <option key={index} value={property.postcode}>{property.name}</option>)}
              </select>
            </div>
            {/* {property1 || property2 ?
        <> */}
            {/* create section to be used on mobile */}
            <div className='comparison-properties-mobile'>
              {userData ? userData.white_properties.filter(property => property.postcode === property1).map((property, index) => {
                return (
                  <div className='comparison-property' key={index} onClick={() => navigate(`/wittle-results/${property.postcode}`)}>
                    <>
                      <div className='comparison-image' style={{ backgroundImage: `url('${property.image}')` }}></div>
                      <div className='comparison-content'>
                        <h4>{property.name}</h4>
                        <h5><NumericFormat value={property.price} displayType={'text'} thousandSeparator={true} prefix={'£'} /> offers over</h5>
                        <h5>Bedrooms: {property.bedrooms}</h5>
                        <h5>Type: {property.type}</h5>
                      </div>
                    </>
                  </div>
                )
              }) : ''}
              {userData ? userData.white_properties.filter(property => property.postcode === property2).map((property, index) => {
                return (
                  <div className='comparison-property' key={index} onClick={() => navigate(`/wittle-results/${property.postcode}`)}>
                    <>
                      <div className='comparison-image' style={{ backgroundImage: `url('${property.image}')` }}></div>
                      <div className='comparison-content'>
                        <h4>{property.name}</h4>
                        <h5><NumericFormat value={property.price} displayType={'text'} thousandSeparator={true} prefix={'£'} /> offers over</h5>
                        <h5>Bedrooms: {property.bedrooms}</h5>
                        <h5>Type: {property.type}</h5>
                      </div>
                    </>
                  </div>
                )
              }) : ''}
            </div>

            {/* Main section used on desktop */}
            {/* Property on the left hand side of the page */}
            <div className='comparison-body'>
              {userData ? userData.white_properties.filter(property => property.postcode === property1).map((property, index) => {
                return (
                  <div className='comparison-property' key={index} onClick={() => navigate(`/wittle-results/${property.postcode}`)}>
                    <>
                      <div className='comparison-image' style={{ backgroundImage: `url('${property.image}')` }}></div>
                      <div className='comparison-content'>
                        <h4>{property.name}</h4>
                        <h5><NumericFormat value={property.price} displayType={'text'} thousandSeparator={true} prefix={'£'} /> offers over</h5>
                        <h5>Bedrooms: {property.bedrooms}</h5>
                        <h5>Type: {property.type}</h5>
                      </div>
                    </>
                  </div>
                )
              }) : ''}
              <div className='comparison-results'>
                {/* Green space */}
                <div className='result-title'>
                  <h5>Green space</h5>
                </div>

                <div className='results-rows'>
                  <div className='results-left'>
                    {property1Numbers && property1Numbers.parks_lsoa && property1Numbers.parks_lsoa[0] && (
                      [...Array(100 - property1Numbers.parks_lsoa[0].london_percentile)].map((choice, index) => {
                        return (
                          <div className='blank-bars' key={index} >
                            <div>.</div>
                          </div>
                        )
                      }))}
                    <h5 className='left-score' >{property1Numbers && property1Numbers.parks_lsoa && property1Numbers.parks_lsoa[0] ? (property1Numbers.parks_lsoa[0].london_percentile) : ''}%</h5>
                    {property2Numbers && property2Numbers.parks_lsoa && property2Numbers.parks_lsoa[0] && (
                      [...Array(property1Numbers.parks_lsoa[0].london_percentile)].map((choice, index) => {
                        return (
                          <div className='bars' style={{
                            backgroundColor: ((property1Numbers && property1Numbers.parks_lsoa && property1Numbers.parks_lsoa[0]) ?  parseInt(property1Numbers.parks_lsoa[0].london_percentile) : 0) 
                            < ((property2Numbers && property2Numbers.parks_lsoa && property2Numbers.parks_lsoa[0]) ? parseInt(property2Numbers.parks_lsoa[0].london_percentile) : 0) ? '#152BA4' : '#FFA7E5',
                          }} key={index} >
                            <div>.</div>
                          </div>
                        )
                      }))}

                  </div>
                  <div className='results-right'>
                    {property2Numbers && property2Numbers.parks_lsoa && property2Numbers.parks_lsoa[0] && (
                      [...Array(property2Numbers.parks_lsoa[0].london_percentile)].map((choice, index) => {
                        return (
                          <div className='bars' style={{
                            backgroundColor: ((property1Numbers) ?  parseInt(property1Numbers.parks_lsoa[0].london_percentile) : 0) 
                          > ((property2Numbers) ? parseInt(property2Numbers.parks_lsoa[0].london_percentile) : 0) ? '#152BA4' : '#FFA7E5',
                          }} key={index} >
                            <div>.</div>
                          </div>
                        )
                      }))}
                    <h5 className='right-score' >{property2Numbers && property2Numbers.parks_lsoa && property2Numbers.parks_lsoa[0] ? Math.round(property2Numbers.parks_lsoa[0].london_percentile) : ''}%</h5>
                  </div>
                </div>


                {/* Restaurants */}
                <div className='result-title'>
                  <h5>Restaurants</h5>
                </div>

                <div className='results-rows'>
                  <div className='results-left'>
                    {property1Numbers && property1Numbers.restaurants && property1Numbers.restaurants.normal_percentile && (
                      [...Array(parseInt(100 - Math.round((property1Numbers.restaurants.normal_percentile * 100))))].map((choice, index) => {
                        return (
                          <div className='blank-bars' key={index} >
                            <div>.</div>
                          </div>
                        )
                      }))}
                    <h5 className='left-score' >{property1Numbers && property1Numbers.restaurants && property1Numbers.restaurants.normal_percentile ? parseInt((property1Numbers.restaurants.normal_percentile * 100)) : ''}%</h5>
                    {property1Numbers && property1Numbers.restaurants && property1Numbers.restaurants.normal_percentile && (
                      [...Array(parseInt((property1Numbers.restaurants.normal_percentile * 100)))].map((choice, index) => {
                        return (
                          <div className='bars' style={{
                            backgroundColor: ((property1Numbers && property1Numbers.restaurants && property1Numbers.restaurants.normal_percentile) ?  parseInt(property1Numbers.restaurants.normal_percentile * 100) : 0) 
                            < ((property2Numbers && property2Numbers.restaurants && property2Numbers.restaurants.normal_percentile) ? parseInt(property2Numbers.restaurants.normal_percentile * 100) : 0) ? '#152BA4' : '#FFA7E5',
                          }} key={index} >
                            <div>.</div>
                          </div>
                        )
                      }))}

                  </div>
                  <div className='results-right'>
                    {property2Numbers && property2Numbers.restaurants && property1Numbers.restaurants.normal_percentile &&  (
                      [...Array(parseInt(property2Numbers.restaurants.normal_percentile * 100))].map((choice, index) => {
                        return (
                          <div className='bars' style={{
                            backgroundColor: ((property1Numbers && property1Numbers.restaurants && property1Numbers.restaurants.normal_percentile) ?  parseInt(property1Numbers.restaurants.normal_percentile * 100) : 0) 
                          > ((property2Numbers && property2Numbers.restaurants && property2Numbers.restaurants.normal_percentile) ? parseInt(property2Numbers.restaurants.normal_percentile * 100) : 0) ? '#152BA4' : '#FFA7E5',
                          }} key={index} >
                            <div>.</div>
                          </div>
                        )
                      }))}
                    <h5 className='right-score' >{property2Numbers && property2Numbers.restaurants && property2Numbers.restaurants.normal_percentile ? Math.round(property2Numbers.restaurants.normal_percentile * 100) : ''}%</h5>
                  </div>
                </div>

                {/* Fitness */}
                <div className='result-title'>
                  <h5>Fitness</h5>
                </div>

                <div className='results-rows'>
                  <div className='results-left'>
                    {property1Numbers && property1Numbers.fitness && property1Numbers.fitness.percentile && (
                      [...Array(100 - Math.round((property1Numbers.fitness.percentile * 100)))].map((choice, index) => {
                        return (
                          <div className='blank-bars' key={index} >
                            <div>.</div>
                          </div>
                        )
                      }))}
                    <h5 className='left-score' >{property1Numbers && property1Numbers.fitness && property1Numbers.fitness.percentile ? parseInt((property1Numbers.fitness.percentile * 100)) : ''}%</h5>
                    {property1Numbers && property1Numbers.fitness && property1Numbers.fitness.percentile && (
                      [...Array(parseInt((property1Numbers.fitness.percentile * 100)))].map((choice, index) => {
                        return (
                          <div className='bars' style={{
                            backgroundColor: ((property1Numbers && property1Numbers.fitness && property1Numbers.fitness.percentile) ?  parseInt(property1Numbers.fitness.percentile * 100) : 0) 
                            < ((property2Numbers && property2Numbers.fitness && property2Numbers.fitness.percentile) ? parseInt(property2Numbers.fitness.percentile * 100) : 0) ? '#152BA4' : '#FFA7E5',
                          }} key={index} >
                            <div>.</div>
                          </div>
                        )
                      }))}

                  </div>
                  <div className='results-right'>
                    {property2Numbers && property2Numbers.fitness && property1Numbers.fitness.percentile &&  (
                      [...Array(parseInt(property2Numbers.fitness.percentile * 100))].map((choice, index) => {
                        return (
                          <div className='bars' style={{
                            backgroundColor: ((property1Numbers && property1Numbers.fitness && property1Numbers.fitness.percentile) ?  parseInt(property1Numbers.fitness.percentile * 100) : 0) 
                          > ((property2Numbers && property2Numbers.fitness && property2Numbers.fitness.percentile) ? parseInt(property2Numbers.fitness.percentile * 100) : 0) ? '#152BA4' : '#FFA7E5',
                          }} key={index} >
                            <div>.</div>
                          </div>
                        )
                      }))}
                    <h5 className='right-score' >{property2Numbers && property2Numbers.fitness && property2Numbers.fitness.percentile ? Math.round(property2Numbers.fitness.percentile * 100) : ''}%</h5>
                  </div>
                </div>

                {/* EV */}
                <div className='result-title'>
                  <h5>EV</h5>
                </div>

                <div className='results-rows'>
                  <div className='results-left'>
                    {property1Numbers && property1Numbers.ev && property1Numbers.ev.percentile && (
                      [...Array(100 - Math.round((property1Numbers.ev.percentile * 100)))].map((choice, index) => {
                        return (
                          <div className='blank-bars' key={index} >
                            <div>.</div>
                          </div>
                        )
                      }))}
                    <h5 className='left-score' >{property1Numbers && property1Numbers.ev && property1Numbers.ev.percentile ? parseInt((property1Numbers.ev.percentile * 100)) : ''}%</h5>
                    {property1Numbers && property1Numbers.ev && property1Numbers.ev.percentile && (
                      [...Array(parseInt((property1Numbers.ev.percentile * 100)))].map((choice, index) => {
                        return (
                          <div className='bars' style={{
                            backgroundColor: ((property1Numbers && property1Numbers.ev && property1Numbers.ev.percentile) ?  parseInt(property1Numbers.ev.percentile * 100) : 0) 
                            < ((property2Numbers && property2Numbers.ev && property2Numbers.ev.percentile) ? parseInt(property2Numbers.ev.percentile * 100) : 0) ? '#152BA4' : '#FFA7E5',
                          }} key={index} >
                            <div>.</div>
                          </div>
                        )
                      }))}

                  </div>
                  <div className='results-right'>
                    {property2Numbers && property2Numbers.ev && property1Numbers.ev.percentile &&  (
                      [...Array(parseInt(property2Numbers.ev.percentile * 100))].map((choice, index) => {
                        return (
                          <div className='bars' style={{
                            backgroundColor: ((property1Numbers && property1Numbers.ev && property1Numbers.ev.percentile) ?  parseInt(property1Numbers.ev.percentile * 100) : 0) 
                          > ((property2Numbers && property2Numbers.ev && property2Numbers.ev.percentile) ? parseInt(property2Numbers.ev.percentile * 100) : 0) ? '#152BA4' : '#FFA7E5',
                          }} key={index} >
                            <div>.</div>
                          </div>
                        )
                      }))}
                    <h5 className='right-score' >{property2Numbers && property2Numbers.ev && property2Numbers.ev.percentile ? Math.round(property2Numbers.ev.percentile * 100) : ''}%</h5>
                  </div>
                </div>

                {/* Tubes */}
                <div className='result-title'>
                  <h5>Tubes</h5>
                </div>

                <div className='results-rows'>
                  <div className='results-left'>
                    {property1Numbers && property1Numbers.ev && property1Numbers.tubes.percentile && (
                      [...Array(100 - Math.round((property1Numbers.tubes.percentile * 100)))].map((choice, index) => {
                        return (
                          <div className='blank-bars' key={index} >
                            <div>.</div>
                          </div>
                        )
                      }))}
                    <h5 className='left-score' >{property1Numbers && property1Numbers.tubes && property1Numbers.tubes.percentile ? parseInt((property1Numbers.tubes.percentile * 100)) : ''}%</h5>
                    {property1Numbers && property1Numbers.tubes && property1Numbers.tubes.percentile && (
                      [...Array(parseInt((property1Numbers.tubes.percentile * 100)))].map((choice, index) => {
                        return (
                          <div className='bars' style={{
                            backgroundColor: ((property1Numbers && property1Numbers.tubes && property1Numbers.tubes.percentile) ?  parseInt(property1Numbers.tubes.percentile * 100) : 0) 
                            < ((property2Numbers && property2Numbers.tubes && property2Numbers.tubes.percentile) ? parseInt(property2Numbers.tubes.percentile * 100) : 0) ? '#152BA4' : '#FFA7E5',
                          }} key={index} >
                            <div>.</div>
                          </div>
                        )
                      }))}

                  </div>
                  <div className='results-right'>
                    {property2Numbers && property2Numbers.tubes && property1Numbers.tubes.percentile &&  (
                      [...Array(parseInt(property2Numbers.tubes.percentile * 100))].map((choice, index) => {
                        return (
                          <div className='bars' style={{
                            backgroundColor: ((property1Numbers && property1Numbers.tubes && property1Numbers.tubes.percentile) ?  parseInt(property1Numbers.tubes.percentile * 100) : 0) 
                          > ((property2Numbers && property2Numbers.tubes && property2Numbers.tubes.percentile) ? parseInt(property2Numbers.tubes.percentile * 100) : 0) ? '#152BA4' : '#FFA7E5',
                          }} key={index} >
                            <div>.</div>
                          </div>
                        )
                      }))}
                    <h5 className='right-score' >{property2Numbers && property2Numbers.tubes && property2Numbers.tubes.percentile ? Math.round(property2Numbers.tubes.percentile * 100) : ''}%</h5>
                  </div>
                </div>
                  
              </div>


            
              {userData ? userData.white_properties.filter(property => property.postcode === property2).map((property, index) => {
                return (
                  <div className='comparison-property' key={index} onClick={() => navigate(`/wittle-results/${property.postcode}`)}>
                    <>
                      <div className='comparison-image' style={{ backgroundImage: `url('${property.image}')` }}></div>
                      <div className='comparison-content'>
                        <h4>{property.name}</h4>
                        <h5><NumericFormat value={property.price} displayType={'text'} thousandSeparator={true} prefix={'£'} /> offers over</h5>
                        <h5>Bedrooms: {property.bedrooms}</h5>
                        <h5>Type: {property.type}</h5>
                      </div>
                    </>
                  </div>
                )
              }) : ''}
            </div>
            {/* </> */}

          </div>
        </section>
        :

        ''
  
      }
    </>
  )
}

export default WhiteComparison

