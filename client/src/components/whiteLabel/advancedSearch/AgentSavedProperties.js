import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { isUserAuth, getUserToken, getAccessToken } from '../../auth/Auth'
import { NumericFormat } from 'react-number-format'


const AgentSavedProperties = ({ agentFavourites, loadUserData, deleteAgentFavourite, currentClient }) => {

  // state for which properties to show on screen
  const [displayChannel, setDisplayChannel] = useState('Sales')



  return (


    <>
      <section className='agent-saved-properties'>
        <div className='saved-property-channel'>
          <h5 className={`channel-pills ${displayChannel === 'Sales' ? 'active' : 'inactive'}`} onClick={() => setDisplayChannel('Sales')}>Sales</h5>
          <h5 className={`channel-pills ${displayChannel === 'Lettings' ? 'active' : 'inactive'}`} onClick={() => setDisplayChannel('Lettings')}>Lettings</h5>
        </div>

        {agentFavourites ?
          <div className='saved-properties-body'>
            {currentClient ? <h3 className='saved-number'>{currentClient.first_name} {currentClient.last_name} has {(agentFavourites.filter(item => item.channel === displayChannel)).length} saved {(displayChannel).toLocaleLowerCase()} properties </h3> :
              <h3 className='saved-number'>You have {(agentFavourites.filter(item => item.channel === displayChannel)).length} saved {(displayChannel).toLocaleLowerCase()} properties </h3>}

            <div className='saved-properties-grid'>
              <div className='saved-properties-array'>
                {agentFavourites ? agentFavourites
                  .filter(item => item.channel === displayChannel)
                  .map((item, index) => {
                    return (
                      <>
                        <div className='saved-property'>
                          <div className='saved-image' style={{ backgroundImage: `url(${item.images})` }}></div>
                          <div className='saved-body'>
                            <h3 className='saved-title'>{item.displayAddress}</h3>
                            <div className='saved-block'>
                              <div className='saved-item'>
                                <div className='saved-icon' id='money'></div>
                                {item.channel === 'Sales' ?
                                  <h3><NumericFormat value={item.price_numeric} displayType={'text'} thousandSeparator={true} prefix={'£'} /> </h3> :
                                  <h3><NumericFormat value={item.price_numeric} displayType={'text'} thousandSeparator={true} prefix={'£'} /> pcm</h3>
                                }
                              </div>
                              <div className='saved-item'>
                                <div className='saved-icon' id='flame'></div>
                                <h3>{(item.score * 10).toFixed(0)}% match</h3>
                              </div>
                            </div>
                            <div className='saved-block'>
                              <div className='saved-item'>
                                <div className='saved-icon' id='bed'></div>
                                <h3>{item.bedrooms} bedrooms</h3>
                              </div>
                              <div className='saved-item'>
                                <div className='saved-icon' id='bath'></div>
                                <h3>{item.bathrooms} bathrooms</h3>
                              </div>
                            </div>
                            <div className='final-block'>
                              <h3>{item.agent}</h3>
                              <button onClick={() => deleteAgentFavourite(item)}>Delete</button>
                            </div>
                          </div>
                        </div>
                      </>
                    )
                  })
                  : ''}
              </div>
            </div>
          </div>


          : ''}
      </section>


    </>
  )
}

export default AgentSavedProperties