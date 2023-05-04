import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getUserToken, isUserAuth, getAccessToken } from '../../auth/Auth'
import { Modal } from 'react-bootstrap'
import { NumericFormat } from 'react-number-format'
import NavBar from '../../tools/NavBar'
import ProfileMobileSlider from '../../tools/ProfileMobileSlider'



const PropertyComparison = ({ favouritesData, favouriteProperties, propertyList, profileContent, setProfileContent }) => {


  // state to enable navigation between pages
  const navigate = useNavigate()

  // setting states for property comparison
  const [property1, setProperty1] = useState()
  const [property2, setProperty2] = useState()


  // define the states to capture the scores of the compared propeerties
  const [property1Numbers, setProperty1Numbers] = useState([])
  const [property2Numbers, setProperty2Numbers] = useState()





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




  // update values for first property comparison
  const updateComparison1 = (e) => {
    setProperty1(e.target.value)
    const result = favouritesData.filter(property => {
      return property.property_name === e.target.value
    })
    setProperty1Numbers(result)
    console.log('1 ->', result)
  }

  // update values for second property comparison
  const updateComparison2 = (e) => {
    setProperty2(e.target.value)
    const result = favouritesData.filter(property => {
      return property.property_name === e.target.value
    })
    setProperty2Numbers(result)
    console.log('2 ->', result)
  }


  return (
    <>
      {isUserAuth() && favouriteProperties && favouriteProperties.length > 0 ?
        <div className='comparison-grid'>
          <div className='comparison-title'>
            <h1>Property 1</h1>
            <h1 className='desktop-results'>Results</h1>
            <h1>Property 2</h1>
          </div>
          <div className='comparison-subtitle'>
            <select className='comparison-dropdown' onChange={updateComparison1}>
              <option>Select property</option>
              {propertyList.map((property, index) => <option key={index} value={property}>{property}</option>)}
            </select>
            <select className='comparison-dropdown' onChange={updateComparison2}>
              <option>Select property</option>
              {propertyList.map((property, index) => <option key={index} value={property}>{property}</option>)}
            </select>
          </div>
          {/* {property1 || property2 ?
        <> */}
          {/* create section to be used on mobile */}
          <div className='comparison-properties-mobile'>
            {favouriteProperties ? favouriteProperties.filter(property => property.property_name === property1).map((property, index) => {
              return (
                <div className='comparison-property' key={index} onClick={() => navigate(`/wittle-results/${property.id}`)}>
                  <>
                    <div className='comparison-image' style={{ backgroundImage: `url('${property.property_image_1}')` }}></div>
                    <div className='comparison-content'>
                      <h4>{property.property_name}</h4>
                      <h5><NumericFormat value={property.value} displayType={'text'} thousandSeparator={true} prefix={'£'} /> offers over</h5>
                      <h5>Bedrooms: {property.bedrooms}</h5>
                      <h5>Type: {property.type}</h5>
                    </div>
                  </>
                </div>
              )
            }) : ''}
            {favouriteProperties ? favouriteProperties.filter(property => property.property_name === property2).map((property, index) => {
              return (
                <div className='comparison-property' key={index} onClick={() => navigate(`/wittle-results/${property.id}`)}>
                  <>
                    <div className='comparison-image' style={{ backgroundImage: `url('${property.property_image_1}')` }}></div>
                    <div className='comparison-content'>
                      <h4>{property.property_name}</h4>
                      <h5><NumericFormat value={property.value} displayType={'text'} thousandSeparator={true} prefix={'£'} /> offers over</h5>
                      <h5>Bedrooms: {property.bedrooms}</h5>
                      <h5>Type: {property.type}</h5>
                    </div>
                  </>
                </div>
              )
            }) : ''}
          </div>

          {/* Main section used on desktop */}
          <div className='comparison-body'>
            {favouriteProperties ? favouriteProperties.filter(property => property.property_name === property1).map((property, index) => {
              return (
                <div className='comparison-property' key={index} onClick={() => navigate(`/wittle-results/${property.id}`)}>
                  <>
                    <div className='comparison-image' style={{ backgroundImage: `url('${property.property_image_1}')` }}></div>
                    <div className='comparison-content'>
                      <h4>{property.property_name}</h4>
                      <h5><NumericFormat value={property.value} displayType={'text'} thousandSeparator={true} prefix={'£'} /> offers over</h5>
                      <h5>Bedrooms: {property.bedrooms}</h5>
                      <h5>Type: {property.type}</h5>
                    </div>
                  </>
                </div>
              )
            }) : ''}
            <div className='comparison-results'>
              {(property1 || property2) ?
                <>
                  {/* Total */}
                  <div className='result-title'>
                    <h5>Total score</h5>
                  </div>
                  <div className='results-rows'>
                    <div className='results-left'>
                      {favouritesData.filter(property => property.property_name === property1).map((property, index) => {
                        return (
                          <>
                            {[...Array(100 - property.total_score)].map((choice, index) => {
                              return (
                                <div className='blank-bars' key={index} >
                                  <div>.</div>
                                </div>
                              )
                            })}
                            <h5 className='left-score' name={propertyColours.property1_total}>{property.total_score}%</h5>
                            {[...Array(property.total_score)].map((choice, index) => {
                              return (
                                <div className='bars' style={{
                                  backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                    return parseInt(property.total_score)
                                  })) : 0) < ((property2Numbers) ? parseInt(property2Numbers.map((property, index) => {
                                    return parseInt(property.total_score)
                                  })) : 0) ? '#152BA4' : '#FFA7E5',
                                }} key={index} >
                                  <div>.</div>
                                </div>
                              )
                            })}
                          </>
                        )
                      })}
                    </div>
                    <div className='results-right'>
                      {favouritesData.filter(property => property.property_name === property2).map((property, index) => {
                        return (
                          <>
                            {[...Array(property.total_score)].map((choice, index) => {
                              return (
                                <div className='bars' style={{
                                  backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                    return property.total_score
                                  })) : 0) > (property2Numbers ? parseInt(property2Numbers.map((property, index) => {
                                    return property.total_score
                                  })) : 0) ? '#152BA4' : '#FFA7E5',
                                }} key={index} >
                                  <div>.</div>
                                </div>
                              )
                            })}
                            <h5 className='right-score'>{property.total_score}%</h5>
                          </>
                        )
                      })}
                    </div>
                  </div>
                  {/* Restaurants */}
                  <div className='result-title'>
                    <h5>Restaurants</h5>
                  </div>
                  <div className='results-rows'>
                    <div className='results-left'>
                      {favouritesData.filter(property => property.property_name === property1).map((property, index) => {
                        return (
                          <>
                            {[...Array(100 - property.restaurant_score)].map((choice, index) => {
                              return (
                                <div className='blank-bars' key={index} >
                                  <div>.</div>
                                </div>
                              )
                            })}
                            <h5 className='left-score' name={propertyColours.property1_total}>{property.restaurant_score}%</h5>
                            {[...Array(property.restaurant_score)].map((choice, index) => {
                              return (
                                <div className='bars' style={{
                                  backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                    return parseInt(property.restaurant_score)
                                  })) : 0) < ((property2Numbers) ? parseInt(property2Numbers.map((property, index) => {
                                    return parseInt(property.restaurant_score)
                                  })) : 0) ? '#152BA4' : '#FFA7E5',
                                }} key={index} >
                                  <div>.</div>
                                </div>
                              )
                            })}
                          </>
                        )
                      })}
                    </div>
                    <div className='results-right'>
                      {favouritesData.filter(property => property.property_name === property2).map((property, index) => {
                        return (
                          <>
                            {[...Array(property.restaurant_score)].map((choice, index) => {
                              return (
                                <div className='bars' style={{
                                  backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                    return property.restaurant_score
                                  })) : 0) > (property2Numbers ? parseInt(property2Numbers.map((property, index) => {
                                    return property.restaurant_score
                                  })) : 0) ? '#152BA4' : '#FFA7E5',
                                }} key={index} >
                                  <div>.</div>
                                </div>
                              )
                            })}
                            <h5 className='right-score'>{property.restaurant_score}%</h5>
                          </>
                        )
                      })}
                    </div>
                  </div>
                  {/* Pubs */}
                  <div className='result-title'>
                    <h5>Pubs</h5>
                  </div>
                  <div className='results-rows'>
                    <div className='results-left'>
                      {favouritesData.filter(property => property.property_name === property1).map((property, index) => {
                        return (
                          <>
                            {[...Array(100 - property.pubs_score)].map((choice, index) => {
                              return (
                                <div className='blank-bars' key={index} >
                                  <div>.</div>
                                </div>
                              )
                            })}
                            <h5 className='left-score' name={propertyColours.property1_total}>{property.pubs_score}%</h5>
                            {[...Array(property.pubs_score)].map((choice, index) => {
                              return (
                                <div className='bars' style={{
                                  backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                    return parseInt(property.pubs_score)
                                  })) : 0) < ((property2Numbers) ? parseInt(property2Numbers.map((property, index) => {
                                    return parseInt(property.pubs_score)
                                  })) : 0) ? '#152BA4' : '#FFA7E5',
                                }} key={index} >
                                  <div>.</div>
                                </div>
                              )
                            })}
                          </>
                        )
                      })}
                    </div>
                    <div className='results-right'>
                      {favouritesData.filter(property => property.property_name === property2).map((property, index) => {
                        return (
                          <>
                            {[...Array(property.pubs_score)].map((choice, index) => {
                              return (
                                <div className='bars' style={{
                                  backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                    return property.pubs_score
                                  })) : 0) > (property2Numbers ? parseInt(property2Numbers.map((property, index) => {
                                    return property.pubs_score
                                  })) : 0) ? '#152BA4' : '#FFA7E5',
                                }} key={index} >
                                  <div>.</div>
                                </div>
                              )
                            })}
                            <h5 className='right-score'>{property.pubs_score}%</h5>
                          </>
                        )
                      })}
                    </div>
                  </div>
                  {/* Takeaways */}
                  <div className='result-title'>
                    <h5>Takeaways</h5>
                  </div>
                  <div className='results-rows'>
                    <div className='results-left'>
                      {favouritesData.filter(property => property.property_name === property1).map((property, index) => {
                        return (
                          <>
                            {[...Array(100 - property.takeaway_score)].map((choice, index) => {
                              return (
                                <div className='blank-bars' key={index} >
                                  <div>.</div>
                                </div>
                              )
                            })}
                            <h5 className='left-score' name={propertyColours.property1_total}>{property.takeaway_score}%</h5>
                            {[...Array(property.takeaway_score)].map((choice, index) => {
                              return (
                                <div className='bars' style={{
                                  backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                    return parseInt(property.takeaway_score)
                                  })) : 0) < ((property2Numbers) ? parseInt(property2Numbers.map((property, index) => {
                                    return parseInt(property.takeaway_score)
                                  })) : 0) ? '#152BA4' : '#FFA7E5',
                                }} key={index} >
                                  <div>.</div>
                                </div>
                              )
                            })}
                          </>
                        )
                      })}
                    </div>
                    <div className='results-right'>
                      {favouritesData.filter(property => property.property_name === property2).map((property, index) => {
                        return (
                          <>
                            {[...Array(property.takeaway_score)].map((choice, index) => {
                              return (
                                <div className='bars' style={{
                                  backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                    return property.takeaway_score
                                  })) : 0) > (property2Numbers ? parseInt(property2Numbers.map((property, index) => {
                                    return property.takeaway_score
                                  })) : 0) ? '#152BA4' : '#FFA7E5',
                                }} key={index} >
                                  <div>.</div>
                                </div>
                              )
                            })}
                            <h5 className='right-score'>{property.takeaway_score}%</h5>
                          </>
                        )
                      })}
                    </div>
                  </div>
                  {/* Cafes */}
                  <div className='result-title'>
                    <h5>Cafes</h5>
                  </div>
                  <div className='results-rows'>
                    <div className='results-left'>
                      {favouritesData.filter(property => property.property_name === property1).map((property, index) => {
                        return (
                          <>
                            {[...Array(100 - property.cafes_score)].map((choice, index) => {
                              return (
                                <div className='blank-bars' key={index} >
                                  <div>.</div>
                                </div>
                              )
                            })}
                            <h5 className='left-score' name={propertyColours.property1_total}>{property.cafes_score}%</h5>
                            {[...Array(property.cafes_score)].map((choice, index) => {
                              return (
                                <div className='bars' style={{
                                  backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                    return parseInt(property.cafes_score)
                                  })) : 0) < ((property2Numbers) ? parseInt(property2Numbers.map((property, index) => {
                                    return parseInt(property.cafes_score)
                                  })) : 0) ? '#152BA4' : '#FFA7E5',
                                }} key={index} >
                                  <div>.</div>
                                </div>
                              )
                            })}
                          </>
                        )
                      })}
                    </div>
                    <div className='results-right'>
                      {favouritesData.filter(property => property.property_name === property2).map((property, index) => {
                        return (
                          <>
                            {[...Array(property.cafes_score)].map((choice, index) => {
                              return (
                                <div className='bars' style={{
                                  backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                    return property.cafes_score
                                  })) : 0) > (property2Numbers ? parseInt(property2Numbers.map((property, index) => {
                                    return property.cafes_score
                                  })) : 0) ? '#152BA4' : '#FFA7E5',
                                }} key={index} >
                                  <div>.</div>
                                </div>
                              )
                            })}
                            <h5 className='right-score'>{property.cafes_score}%</h5>
                          </>
                        )
                      })}
                    </div>
                  </div>
                  {/* Tubes */}
                  <div className='result-title'>
                    <h5>Tubes</h5>
                  </div>
                  <div className='results-rows'>
                    <div className='results-left'>
                      {favouritesData.filter(property => property.property_name === property1).map((property, index) => {
                        return (
                          <>
                            {[...Array(100 - property.tube_score)].map((choice, index) => {
                              return (
                                <div className='blank-bars' key={index} >
                                  <div>.</div>
                                </div>
                              )
                            })}
                            <h5 className='left-score' name={propertyColours.property1_total}>{property.tube_score}%</h5>
                            {[...Array(property.tube_score)].map((choice, index) => {
                              return (
                                <div className='bars' style={{
                                  backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                    return parseInt(property.tube_score)
                                  })) : 0) < ((property2Numbers) ? parseInt(property2Numbers.map((property, index) => {
                                    return parseInt(property.tube_score)
                                  })) : 0) ? '#152BA4' : '#FFA7E5',
                                }} key={index} >
                                  <div>.</div>
                                </div>
                              )
                            })}
                          </>
                        )
                      })}
                    </div>
                    <div className='results-right'>
                      {favouritesData.filter(property => property.property_name === property2).map((property, index) => {
                        return (
                          <>
                            {[...Array(property.tube_score)].map((choice, index) => {
                              return (
                                <div className='bars' style={{
                                  backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                    return property.tube_score
                                  })) : 0) > (property2Numbers ? parseInt(property2Numbers.map((property, index) => {
                                    return property.tube_score
                                  })) : 0) ? '#152BA4' : '#FFA7E5',
                                }} key={index} >
                                  <div>.</div>
                                </div>
                              )
                            })}
                            <h5 className='right-score'>{property.tube_score}%</h5>
                          </>
                        )
                      })}
                    </div>
                  </div>
                  {/* Supermarkets */}
                  <div className='result-title'>
                    <h5>Supermarkets</h5>
                  </div>
                  <div className='results-rows'>
                    <div className='results-left'>
                      {favouritesData.filter(property => property.property_name === property1).map((property, index) => {
                        return (
                          <>
                            {[...Array(100 - property.supermarket_score)].map((choice, index) => {
                              return (
                                <div className='blank-bars' key={index} >
                                  <div>.</div>
                                </div>
                              )
                            })}
                            <h5 className='left-score' name={propertyColours.property1_total}>{property.supermarket_score}%</h5>
                            {[...Array(property.supermarket_score)].map((choice, index) => {
                              return (
                                <div className='bars' style={{
                                  backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                    return parseInt(property.supermarket_score)
                                  })) : 0) < ((property2Numbers) ? parseInt(property2Numbers.map((property, index) => {
                                    return parseInt(property.supermarket_score)
                                  })) : 0) ? '#152BA4' : '#FFA7E5',
                                }} key={index} >
                                  <div>.</div>
                                </div>
                              )
                            })}
                          </>
                        )
                      })}
                    </div>
                    <div className='results-right'>
                      {favouritesData.filter(property => property.property_name === property2).map((property, index) => {
                        return (
                          <>
                            {[...Array(property.supermarket_score)].map((choice, index) => {
                              return (
                                <div className='bars' style={{
                                  backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                    return property.supermarket_score
                                  })) : 0) > (property2Numbers ? parseInt(property2Numbers.map((property, index) => {
                                    return property.supermarket_score
                                  })) : 0) ? '#152BA4' : '#FFA7E5',
                                }} key={index} >
                                  <div>.</div>
                                </div>
                              )
                            })}
                            <h5 className='right-score'>{property.supermarket_score}%</h5>
                          </>
                        )
                      })}
                    </div>
                  </div>
                  {/* Gyms */}
                  <div className='result-title'>
                    <h5>Gyms</h5>
                  </div>
                  <div className='results-rows'>
                    <div className='results-left'>
                      {favouritesData.filter(property => property.property_name === property1).map((property, index) => {
                        return (
                          <>
                            {[...Array(100 - property.gym_score)].map((choice, index) => {
                              return (
                                <div className='blank-bars' key={index} >
                                  <div>.</div>
                                </div>
                              )
                            })}
                            <h5 className='left-score' name={propertyColours.property1_total}>{property.gym_score}%</h5>
                            {[...Array(property.gym_score)].map((choice, index) => {
                              return (
                                <div className='bars' style={{
                                  backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                    return parseInt(property.gym_score)
                                  })) : 0) < ((property2Numbers) ? parseInt(property2Numbers.map((property, index) => {
                                    return parseInt(property.gym_score)
                                  })) : 0) ? '#152BA4' : '#FFA7E5',
                                }} key={index} >
                                  <div>.</div>
                                </div>
                              )
                            })}
                          </>
                        )
                      })}
                    </div>
                    <div className='results-right'>
                      {favouritesData.filter(property => property.property_name === property2).map((property, index) => {
                        return (
                          <>
                            {[...Array(property.gym_score)].map((choice, index) => {
                              return (
                                <div className='bars' style={{
                                  backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                    return property.gym_score
                                  })) : 0) > (property2Numbers ? parseInt(property2Numbers.map((property, index) => {
                                    return property.gym_score
                                  })) : 0) ? '#152BA4' : '#FFA7E5',
                                }} key={index} >
                                  <div>.</div>
                                </div>
                              )
                            })}
                            <h5 className='right-score'>{property.gym_score}%</h5>
                          </>
                        )
                      })}
                    </div>
                  </div>
                  {/* Parks */}
                  <div className='result-title'>
                    <h5>Parks</h5>
                  </div>
                  <div className='results-rows'>
                    <div className='results-left'>
                      {favouritesData.filter(property => property.property_name === property1).map((property, index) => {
                        return (
                          <>
                            {[...Array(100 - property.park_score)].map((choice, index) => {
                              return (
                                <div className='blank-bars' key={index} >
                                  <div>.</div>
                                </div>
                              )
                            })}
                            <h5 className='left-score' name={propertyColours.property1_total}>{property.park_score}%</h5>
                            {[...Array(property.park_score)].map((choice, index) => {
                              return (
                                <div className='bars' style={{
                                  backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                    return parseInt(property.park_score)
                                  })) : 0) < ((property2Numbers) ? parseInt(property2Numbers.map((property, index) => {
                                    return parseInt(property.park_score)
                                  })) : 0) ? '#152BA4' : '#FFA7E5',
                                }} key={index} >
                                  <div>.</div>
                                </div>
                              )
                            })}
                          </>
                        )
                      })}
                    </div>
                    <div className='results-right'>
                      {favouritesData.filter(property => property.property_name === property2).map((property, index) => {
                        return (
                          <>
                            {[...Array(property.park_score)].map((choice, index) => {
                              return (
                                <div className='bars' style={{
                                  backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                    return property.park_score
                                  })) : 0) > (property2Numbers ? parseInt(property2Numbers.map((property, index) => {
                                    return property.park_score
                                  })) : 0) ? '#152BA4' : '#FFA7E5',
                                }} key={index} >
                                  <div>.</div>
                                </div>
                              )
                            })}
                            <h5 className='right-score'>{property.park_score}%</h5>
                          </>
                        )
                      })}
                    </div>
                  </div>
                  {/* Primaries */}
                  <div className='result-title'>
                    <h5>Primary Schools</h5>
                  </div>
                  <div className='results-rows'>
                    <div className='results-left'>
                      {favouritesData.filter(property => property.property_name === property1).map((property, index) => {
                        return (
                          <>
                            {[...Array(100 - property.primary_score)].map((choice, index) => {
                              return (
                                <div className='blank-bars' key={index} >
                                  <div>.</div>
                                </div>
                              )
                            })}
                            <h5 className='left-score' name={propertyColours.property1_total}>{property.primary_score}%</h5>
                            {[...Array(property.primary_score)].map((choice, index) => {
                              return (
                                <div className='bars' style={{
                                  backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                    return parseInt(property.primary_score)
                                  })) : 0) < ((property2Numbers) ? parseInt(property2Numbers.map((property, index) => {
                                    return parseInt(property.primary_score)
                                  })) : 0) ? '#152BA4' : '#FFA7E5',
                                }} key={index} >
                                  <div>.</div>
                                </div>
                              )
                            })}
                          </>
                        )
                      })}
                    </div>
                    <div className='results-right'>
                      {favouritesData.filter(property => property.property_name === property2).map((property, index) => {
                        return (
                          <>
                            {[...Array(property.primary_score)].map((choice, index) => {
                              return (
                                <div className='bars' style={{
                                  backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                    return property.primary_score
                                  })) : 0) > (property2Numbers ? parseInt(property2Numbers.map((property, index) => {
                                    return property.primary_score
                                  })) : 0) ? '#152BA4' : '#FFA7E5',
                                }} key={index} >
                                  <div>.</div>
                                </div>
                              )
                            })}
                            <h5 className='right-score'>{property.primary_score}%</h5>
                          </>
                        )
                      })}
                    </div>
                  </div>
                  {/* Secondaries*/}
                  <div className='result-title'>
                    <h5>Secondary Schools</h5>
                  </div>
                  <div className='results-rows'>
                    <div className='results-left'>
                      {favouritesData.filter(property => property.property_name === property1).map((property, index) => {
                        return (
                          <>
                            {[...Array(100 - property.secondary_score)].map((choice, index) => {
                              return (
                                <div className='blank-bars' key={index} >
                                  <div>.</div>
                                </div>
                              )
                            })}
                            <h5 className='left-score' name={propertyColours.property1_total}>{property.secondary_score}%</h5>
                            {[...Array(property.secondary_score)].map((choice, index) => {
                              return (
                                <div className='bars' style={{
                                  backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                    return parseInt(property.secondary_score)
                                  })) : 0) < ((property2Numbers) ? parseInt(property2Numbers.map((property, index) => {
                                    return parseInt(property.secondary_score)
                                  })) : 0) ? '#152BA4' : '#FFA7E5',
                                }} key={index} >
                                  <div>.</div>
                                </div>
                              )
                            })}
                          </>
                        )
                      })}
                    </div>
                    <div className='results-right'>
                      {favouritesData.filter(property => property.property_name === property2).map((property, index) => {
                        return (
                          <>
                            {[...Array(property.secondary_score)].map((choice, index) => {
                              return (
                                <div className='bars' style={{
                                  backgroundColor: ((property1Numbers) ? parseInt(property1Numbers.map((property, index) => {
                                    return property.secondary_score
                                  })) : 0) > (property2Numbers ? parseInt(property2Numbers.map((property, index) => {
                                    return property.secondary_score
                                  })) : 0) ? '#152BA4' : '#FFA7E5',
                                }} key={index} >
                                  <div>.</div>
                                </div>
                              )
                            })}
                            <h5 className='right-score'>{property.secondary_score}%</h5>
                          </>
                        )
                      })}
                    </div>
                  </div>
                </>
                : ''}
            </div>

            {favouriteProperties ? favouriteProperties.filter(property => property.property_name === property2).map((property, index) => {
              return (
                <div className='comparison-property' key={index} onClick={() => navigate(`/wittle-results/${property.id}`)}>
                  <>
                    <div className='comparison-image' style={{ backgroundImage: `url('${property.property_image_1}')` }}></div>
                    <div className='comparison-content'>
                      <h4>{property.property_name}</h4>
                      <h5><NumericFormat value={property.value} displayType={'text'} thousandSeparator={true} prefix={'£'} /> offers over</h5>
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

        :
        isUserAuth() && favouriteProperties && favouriteProperties.length === 0 ?
          <>
            <div className='no-properties'>
              <ProfileMobileSlider
                setProfileContent={setProfileContent}
                profileContent={profileContent}
              />
              <h4 className='no-properties-text'>😕</h4>
              <h4 className='no-properties-text'>You haven&apos;t saved any properties yet.</h4>
              <h4 className='no-properties-subtext'>Once you&apos;ve saved some properties, you can compare them and decide on your favourite. Then you&apos;ll really be Wittling.</h4>
            </div>
          </>
          : !isUserAuth() ? 
            <h1>need an account to see this</h1>
            : 
            ''
      }
    </>
  )
}

export default PropertyComparison