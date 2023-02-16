import React, { useState, useEffect, useRef } from 'react'
import 'react-slideshow-image/dist/styles.css'
import { NumericFormat } from 'react-number-format'
import { Modal } from 'react-bootstrap'
import axios from 'axios'
import { isUserAuth, getUserToken, getAccessToken } from '../../auth/Auth'



const MatchInsights = ({ calc10, formData, insightShow, handleInsightClose, currentId, insightChange, insightToggle }) => {


  return (
    <>
      <Modal show={insightShow} onHide={handleInsightClose} backdrop='static' className='insights-modal'>
        <Modal.Body>
          {calc10 ?
            <>
              <div className='insights-body'>
                {calc10.filter(property => property.id === currentId).map((property, index) => {
                  return (
                    <>
                      <div className='insights-modal-header'>
                        <h3 className='insights-title'>Property insight summary</h3>
                        <button onClick={handleInsightClose} className='insights-modal-close'>Close</button>
                      </div>
                      <div className='insights-modal-title' key={index}>
                        <h3 className='insights-property-name'>{property.property_name}</h3>
                        <h3 className='insights-match'>🔥 {property.first_match}% match</h3>
                      </div>
                      <div className='insights-modal-sub-title'>
                        <h5>Variable</h5>
                        <select className='insight-toggle' name='selection' onChange={insightChange}>
                          <option>Rank</option>
                          <option>Match %</option>
                        </select>
                      </div>
                      <div className='insights-modal-content'>
                        {/* restaurant bars */}
                        {formData.restaurant_selection ?
                          <div className='insights-modal-results'>
                            <h4 className='insights-modal-variables'>👨‍🍳 Restaurants</h4>
                            <div className='insights-modal-right'>
                              {property.restaurants.length > 0 ?
                                <div className='bar-container'>
                                  {[...Array(property.final_restaurant)].map((choice, index) => {
                                    return (
                                      <div className='bars' key={index} >
                                        <div>.</div>
                                      </div>
                                    )
                                  })}
                                  {
                                    [...Array(100 - property.final_restaurant)].map((choice, index) => {
                                      return (
                                        <div className='blank-bars' key={index} >
                                          <div>.</div>
                                        </div>
                                      )
                                    })
                                  }
                                </div>
                                :
                                <div className='bar-container'>
                                  <h5>😕 No restaurants within {formData.restaurant_distance} min walk from this property</h5>
                                </div>
                              }
                              {insightToggle.selection === 'Match %' ? <h4 className='insights-modal-score'>{property.final_restaurant}%</h4> : <h4 className='insights-modal-score'>#{property.restaurant_rank}</h4>}
                            </div>
                          </div>
                          : ''}

                        {/* takeaways bars */}
                        {formData.takeaway_selection ?
                          <div className='insights-modal-results'>
                            <h4 className='insights-modal-variables'>🍜 Takeaways</h4>
                            <div className='insights-modal-right'>
                              {property.takeaways.length > 0 ?
                                <div className='bar-container'>
                                  {[...Array(property.final_takeaway)].map((choice, index) => {
                                    return (
                                      <div className='bars' key={index} >
                                        <div>.</div>
                                      </div>
                                    )
                                  })}
                                  {
                                    [...Array(100 - property.final_takeaway)].map((choice, index) => {
                                      return (
                                        <div className='blank-bars' key={index} >
                                          <div>.</div>
                                        </div>
                                      )
                                    })
                                  }
                                </div>
                                :
                                <div className='bar-container'>
                                  <h5>😕 No takeaways within {formData.takeaway_distance} min walk from this property</h5>
                                </div>
                              }
                              {insightToggle.selection === 'Match %' ? <h4 className='insights-modal-score'>{property.final_takeaway}%</h4> : <h4 className='insights-modal-score'>#{property.takeaway_rank}</h4>}
                            </div>
                          </div>
                          : ''}
                        {/* pub bars */}
                        {formData.pubs_selection ?
                          <div className='insights-modal-results'>
                            <h4 className='insights-modal-variables'>🍻 Pubs</h4>
                            <div className='insights-modal-right'>
                              {property.bars.length > 0 ?
                                <div className='bar-container'>
                                  {[...Array(property.final_pub)].map((choice, index) => {
                                    return (
                                      <div className='bars' key={index} >
                                        <div>.</div>
                                      </div>
                                    )
                                  })}
                                  {
                                    [...Array(100 - property.final_pub)].map((choice, index) => {
                                      return (
                                        <div className='blank-bars' key={index} >
                                          <div>.</div>
                                        </div>
                                      )
                                    })
                                  }
                                </div>
                                :
                                <div className='bar-container'>
                                  <h5>😕 No pubs within {formData.pubs_distance} min walk from this property</h5>
                                </div>
                              }
                              {insightToggle.selection === 'Match %' ? <h4 className='insights-modal-score'>{property.final_pub}%</h4> : <h4 className='insights-modal-score'>#{property.pub_rank}</h4>}
                            </div>
                          </div>
                          : ''}
                        {/* cafe bars */}
                        {formData.cafes_selection ?
                          <div className='insights-modal-results'>
                            <h4 className='insights-modal-variables'>☕️ Cafes</h4>
                            <div className='insights-modal-right'>
                              {property.cafes.length > 0 ?
                                <div className='bar-container'>
                                  {[...Array(property.final_cafe)].map((choice, index) => {
                                    return (
                                      <div className='bars' key={index} >
                                        <div>.</div>
                                      </div>
                                    )
                                  })}
                                  {
                                    [...Array(100 - property.final_cafe)].map((choice, index) => {
                                      return (
                                        <div className='blank-bars' key={index} >
                                          <div>.</div>
                                        </div>
                                      )
                                    })
                                  }
                                </div>
                                :
                                <div className='bar-container'>
                                  <h5>😕 No cafes within {formData.cafes_distance} min walk from this property</h5>
                                </div>
                              }
                              {insightToggle.selection === 'Match %' ? <h4 className='insights-modal-score'>{property.final_cafe}%</h4> : <h4 className='insights-modal-score'>#{property.cafe_rank}</h4>}
                            </div>
                          </div>
                          : ''}
                        {/* primaries bars */}
                        {formData.primary_selection ?
                          <div className='insights-modal-results'>
                            <h4 className='insights-modal-variables'>🏫 Primaries</h4>
                            <div className='insights-modal-right'>
                              {property.primaries.length > 0 ?
                                <div className='bar-container'>
                                  {[...Array(property.final_primary)].map((choice, index) => {
                                    return (
                                      <div className='bars' key={index} >
                                        <div>.</div>
                                      </div>
                                    )
                                  })}
                                  {
                                    [...Array(100 - property.final_primary)].map((choice, index) => {
                                      return (
                                        <div className='blank-bars' key={index} >
                                          <div>.</div>
                                        </div>
                                      )
                                    })
                                  }
                                </div>
                                :
                                <div className='bar-container'>
                                  <h5>😕 No Primary Schools within {formData.primary_distance} min walk from this property</h5>
                                </div>
                              }
                              {insightToggle.selection === 'Match %' ? <h4 className='insights-modal-score'>{property.final_primary}%</h4> : <h4 className='insights-modal-score'>#{property.primary_rank}</h4>}
                            </div>
                          </div>
                          : ''}
                        {/* secondaries bars */}
                        {formData.secondary_selection ?
                          <div className='insights-modal-results'>
                            <h4 className='insights-modal-variables'>🏫 Secondaries</h4>
                            <div className='insights-modal-right'>
                              {property.secondaries.length > 0 ?
                                <div className='bar-container'>
                                  {[...Array(property.final_secondary)].map((choice, index) => {
                                    return (
                                      <div className='bars' key={index} >
                                        <div>.</div>
                                      </div>
                                    )
                                  })}
                                  {
                                    [...Array(100 - property.final_secondary)].map((choice, index) => {
                                      return (
                                        <div className='blank-bars' key={index} >
                                          <div>.</div>
                                        </div>
                                      )
                                    })
                                  }
                                </div>
                                :
                                <div className='bar-container'>
                                  <h5>😕 No Secondary Schools within {formData.secondary_distance} min walk from this property</h5>
                                </div>
                              }
                              {insightToggle.selection === 'Match %' ? <h4 className='insights-modal-score'>{property.final_secondary}%</h4> : <h4 className='insights-modal-score'>#{property.secondary_rank}</h4>}
                            </div>
                          </div>
                          : ''}
                        {/* supermarkets bars */}
                        {formData.supermarket_selection ?
                          <div className='insights-modal-results'>
                            <h4 className='insights-modal-variables'>👨‍🍳 Supermarkets</h4>
                            <div className='insights-modal-right'>
                              {property.supermarkets.length > 0 ?
                                <div className='bar-container'>
                                  {[...Array(property.final_supermarket)].map((choice, index) => {
                                    return (
                                      <div className='bars' key={index} >
                                        <div>.</div>
                                      </div>
                                    )
                                  })}
                                  {
                                    [...Array(100 - property.final_supermarket)].map((choice, index) => {
                                      return (
                                        <div className='blank-bars' key={index} >
                                          <div>.</div>
                                        </div>
                                      )
                                    })
                                  }
                                </div>
                                :
                                <div className='bar-container'>
                                  <h5>😕 No supermarkets within {formData.supermarket_distance} min walk from this property</h5>
                                </div>
                              }
                              {insightToggle.selection === 'Match %' ? <h4 className='insights-modal-score'>{property.final_supermarket}%</h4> : <h4 className='insights-modal-score'>#{property.supermarket_rank}</h4>}
                            </div>
                          </div>
                          : ''}
                        {/* gyms bars */}
                        {formData.gym_selection ?
                          <div className='insights-modal-results'>
                            <h4 className='insights-modal-variables'>🏋️‍♂️ Gyms</h4>
                            <div className='insights-modal-right'>
                              {property.gyms.length > 0 ?
                                <div className='bar-container'>
                                  {[...Array(property.final_gym)].map((choice, index) => {
                                    return (
                                      <div className='bars' key={index} >
                                        <div>.</div>
                                      </div>
                                    )
                                  })}
                                  {
                                    [...Array(100 - property.final_gym)].map((choice, index) => {
                                      return (
                                        <div className='blank-bars' key={index} >
                                          <div>.</div>
                                        </div>
                                      )
                                    })
                                  }
                                </div>
                                :
                                <div className='bar-container'>
                                  <h5>😕 No gyms within {formData.gym_distance} min walk from this property</h5>
                                </div>
                              }
                              {insightToggle.selection === 'Match %' ? <h4 className='insights-modal-score'>{property.final_gym}%</h4> : <h4 className='insights-modal-score'>#{property.gym_rank}</h4>}
                            </div>
                          </div>
                          : ''}
                        {/* tubes bars */}
                        {formData.tube_selection ?
                          <div className='insights-modal-results'>
                            <h4 className='insights-modal-variables'>🚇 Tubes</h4>
                            <div className='insights-modal-right'>
                              {property.tubes.length > 0 ?
                                <div className='bar-container'>
                                  {[...Array(property.final_tube)].map((choice, index) => {
                                    return (
                                      <div className='bars' key={index} >
                                        <div>.</div>
                                      </div>
                                    )
                                  })}
                                  {
                                    [...Array(100 - property.final_tube)].map((choice, index) => {
                                      return (
                                        <div className='blank-bars' key={index} >
                                          <div>.</div>
                                        </div>
                                      )
                                    })
                                  }
                                </div>
                                :
                                <div className='bar-container'>
                                  <h5>😕 No tube stations within {formData.tube_distance} min walk from this property</h5>
                                </div>
                              }
                              {insightToggle.selection === 'Match %' ? <h4 className='insights-modal-score'>{property.final_tube}%</h4> : <h4 className='insights-modal-score'>#{property.tube_rank}</h4>}
                            </div>
                          </div>
                          : ''}
                        {/* parks bars */}
                        {formData.park_selection ?
                          <div className='insights-modal-results'>
                            <h4 className='insights-modal-variables'>🌳 Parks</h4>
                            <div className='insights-modal-right'>
                              {property.parks.length > 0 ?
                                <div className='bar-container'>
                                  {[...Array(property.final_park)].map((choice, index) => {
                                    return (
                                      <div className='bars' key={index} >
                                        <div>.</div>
                                      </div>
                                    )
                                  })}
                                  {
                                    [...Array(100 - property.final_park)].map((choice, index) => {
                                      return (
                                        <div className='blank-bars' key={index} >
                                          <div>.</div>
                                        </div>
                                      )
                                    })
                                  }
                                </div>
                                :
                                <div className='bar-container'>
                                  <h5>😕 No parks within {formData.park_distance} min walk from this property</h5>
                                </div>
                              }
                              {insightToggle.selection === 'Match %' ? <h4 className='insights-modal-score'>{property.final_park}%</h4> : <h4 className='insights-modal-score'>#{property.park_rank}</h4>}
                            </div>
                          </div>
                          : ''}
                        {/* workplace bars */}
                        {formData.workplace_selection ?
                          <div className='insights-modal-results'>
                            <h4 className='insights-modal-variables'>🏢 Office</h4>
                            <div className='insights-modal-right'>
                              <div className='bar-container'>
                                {[...Array(property.final_workplace)].map((choice, index) => {
                                  return (
                                    <div className='bars' key={index} >
                                      <div>.</div>
                                    </div>
                                  )
                                })}
                                {
                                  [...Array(100 - property.final_workplace)].map((choice, index) => {
                                    return (
                                      <div className='blank-bars' key={index} >
                                        <div>.</div>
                                      </div>
                                    )
                                  })
                                }
                              </div>
                              {insightToggle.selection === 'Match %' ? <h4 className='insights-modal-score'>{property.final_workplace}%</h4> : <h4 className='insights-modal-score'>#{property.workplace_rank}</h4>}
                            </div>
                          </div>
                          : ''}
                        {/* family 1 bars */}
                        {formData.family_selection ?
                          <div className='insights-modal-results'>
                            <h4 className='insights-modal-variables'>👨‍👩‍👧‍👦 Friends & Fam</h4>
                            <div className='insights-modal-right'>
                              <div className='bar-container'>
                                {[...Array(property.final_family1)].map((choice, index) => {
                                  return (
                                    <div className='bars' key={index} >
                                      <div>.</div>
                                    </div>
                                  )
                                })}
                                {
                                  [...Array(100 - property.final_family1)].map((choice, index) => {
                                    return (
                                      <div className='blank-bars' key={index} >
                                        <div>.</div>
                                      </div>
                                    )
                                  })
                                }
                              </div>
                              {insightToggle.selection === 'Match %' ? <h4 className='insights-modal-score'>{property.final_family1}%</h4> : <h4 className='insights-modal-score'>#{property.family1_rank}</h4>}
                            </div>
                          </div>
                          : ''}
                      </div>
                    </>
                  )
                })}
              </div>
            </>
            : ''}
        </Modal.Body>
      </Modal>

    </>

  )
}

export default MatchInsights