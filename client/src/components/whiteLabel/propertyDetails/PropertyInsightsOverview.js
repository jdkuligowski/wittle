
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getUserToken, isUserAuth, getAccessToken } from '../../auth/Auth'
import { NumericFormat } from 'react-number-format'
import PropertySummary from './componentHighlights/PropertySummary'
import SchoolHighlights from './componentHighlights/SchoolHighlights'
import LifestyleHighlights from './componentHighlights/LifestyleHighlights'
import TransportHighlights from './componentHighlights/TransportHighlights'
import NeighbourhoodHighlights from './componentHighlights/NeighbourhoodHighlights'
import PropertyDetailSlider from './helpers/PropertyDetailSlider'
import PrimaryDetails from './componentDetails/PrimaryDetails'
import SecondaryDetails from './componentDetails/SecondaryDetails'
import TubeDetails from './componentDetails/TubeDetails'
import RestaurantDetails from './componentDetails/RestaurantDetails'
import PubDetails from './componentDetails/PubDetails'
import SupermarketDetails from './componentDetails/SupermarketDetails'
import FitnessDetails from './componentDetails/FitnessDetails'
import EVDetails from './componentDetails/EVDetails'




const PropertyInsightsOverview = ({ addressSubstring, postcodeSubstring, listingFields, postcodeData, topPrimaries, topSecondaries,
  restaurants1, cuisines, topRestaurants, gyms1, mainGyms, supermarkets1, mainSupermarkets, pubs1, topPubs, tubes1, trains1, setInsightView,
  primaryData1, setPrimaryData1, secondaryData1, setSecondaryData1, setTubes1, setRestaurants1, setPubs1, setSupermarkets1, setGyms1,
  ev1, setEv1, secondaryDetail, setSecondaryDetail, primaryDetail, setPrimaryDetail }) => {

  const [propertyView, setPropertyView] = useState('Overview')



  const [neighbourhoodScore, setNeighbourhoodScore] = useState()

  const [schoolSection, setSchoolSection] = useState(false)
  const [lifestyleSection, setLifestyleSection] = useState(false)
  const [transportSection, setTransportSection] = useState(false)
  const [neighbourhoodSection, setNeighbourhoodSection] = useState(false)

  const [sliderSelection, setSliderSelection] = useState('Primary schools')

  const [tableMapView, setTableMapView] = useState('Table')


  // neighbourhood score calculation
  const calculateScore = () => {
    const calculation = Math.ceil((((1 - postcodeData[0].crime[0].percentile) +
      postcodeData[0].ev.percentile +
      postcodeData[0].fitness.percentile +
      (1 - (postcodeData[0].parks_lsoa[0].london_percentile / 100)) +
      postcodeData[0].restaurants.normal_percentile +
      postcodeData[0].supermarkets.percentile +
      postcodeData[0].tubes.percentile) / 7) * 100)
    setNeighbourhoodScore(calculation)
    // console.log('neighbourhood score ->', calculation)
  }


  // run calculation
  useEffect(() => {
    if (postcodeData) {
      calculateScore()
    }
  })

  // overview navigation
  const goToOverview = () => {
    setPropertyView('Overview')
    setPrimaryDetail('Table')
    setSecondaryDetail('Table')
  }

  return (
    <>
      <section className="insights-results-wrapper">
        <section className="insights-navigation">
          <div className="direction-arrow" onClick={() => setInsightView('Search')}></div>
          <div className="navigation-input">
            <h3 className="title">Postcode</h3>
            <h3 className="result">{postcodeSubstring}</h3>
          </div>
          <div className="navigation-input">
            <h3 className="title">Address</h3>
            <h3 className="result">{addressSubstring}</h3>
          </div>
          <div className="navigation-input">
            <h3 className="title">Channel</h3>
            <h3 className="result">{listingFields.channel}</h3>
          </div>
        </section>

        <section className="property-insights-wrapper">
          <div className="property-insight-nav">
            <div className="property-insight-buttons">
              <h3 className={`insight-button ${propertyView === 'Overview' ? 'active' : 'inactive'}`} id='left' onClick={() => goToOverview()}>Property overview</h3>
              <h3 className={`insight-button ${propertyView === 'Details' ? 'active' : 'inactive'}`} id='right' onClick={() => setPropertyView('Details')}>Property details</h3>
            </div>
            <div className='print-section'>
              <div className="print-icon"></div>
              <h3>Print</h3>

            </div>
          </div>
          {propertyView === 'Overview' ?
            <div className='insight-dropdowns'>
              <div className='summary-header'>
                <h3>Property Summary</h3>
                <hr className='header-line' />
              </div>
              <PropertySummary
                neighbourhoodScore={neighbourhoodScore}
                postcodeData={postcodeData}
              />
              <div className='summary-header' onClick={() => setSchoolSection(!schoolSection)}>
                <h3>School highlights</h3>
                <hr className='header-line' />
              </div>
              {schoolSection ?
                <SchoolHighlights
                  topPrimaries={topPrimaries}
                  topSecondaries={topSecondaries}
                  setPropertyView={setPropertyView}
                  setSecondaryDetail={setSecondaryDetail}
                  setPrimaryDetail={setPrimaryDetail}
                  setSliderSelection={setSliderSelection}
                />
                : ''
              }
              <div className='summary-header' onClick={() => setLifestyleSection(!lifestyleSection)}>
                <h3>Lifestyle highlights</h3>
                <hr className='header-line' />
              </div>
              {lifestyleSection ?
                <LifestyleHighlights
                  restaurants1={restaurants1}
                  cuisines={cuisines}
                  topRestaurants={topRestaurants}
                  gyms1={gyms1}
                  mainGyms={mainGyms}
                  supermarkets1={supermarkets1}
                  mainSupermarkets={mainSupermarkets}
                  pubs1={pubs1}
                  topPubs={topPubs}
                />
                : ''
              }
              <div className='summary-header' onClick={() => setTransportSection(!transportSection)}>
                <h3>Transport highlights</h3>
                <hr className='header-line' />
              </div>
              {transportSection ?
                <TransportHighlights
                  postcodeData={postcodeData}
                  tubes1={tubes1}
                  trains1={trains1}
                />
                : ''
              }
              <div className='summary-header' onClick={() => setNeighbourhoodSection(!neighbourhoodSection)}>
                <h3>Neighbourhoood highlights</h3>
                <hr className='header-line' />
              </div>
              {neighbourhoodSection ?
                <NeighbourhoodHighlights
                  postcodeData={postcodeData}
                />
                : ''
              }
            </div>

            : propertyView === 'Details' ?
              <>

                <div className='property-details-wrapper'>
                  <PropertyDetailSlider
                    sliderSelection={sliderSelection}
                    setSliderSelection={setSliderSelection}
                    setSecondaryDetail={setSecondaryDetail}
                    setPrimaryDetail={setPrimaryDetail}
                  />
                  {secondaryDetail === 'School' ?
                    <h3 className='go-back' onClick={() => setSecondaryDetail('Table')}>&lt;- Back to secondary school long list</h3>
                    :
                    primaryDetail === 'School' ?
                      <h3 className='go-back' onClick={() => setPrimaryDetail('Table')}>&lt;- Back to primary school long list</h3>
                      :
                      <div className='detail-table-title'>
                        <h3>{sliderSelection} list</h3>
                        <hr className='table-title-line' />
                        <input placeholder='Explore the data'></input>
                        <div className={`icon-box ${tableMapView === 'Table' ? 'active' : 'inactive'}`} onClick={() => setTableMapView('Table')}>
                          <div className='icon' id='table'></div>
                        </div>
                        <div className={`icon-box ${tableMapView === 'Map' ? 'active' : 'inactive'}`} onClick={() => setTableMapView('Map')}>
                          <div className='icon' id='map'></div>
                        </div>

                      </div>
                  }
                  <div className='insight-tables'>
                    {sliderSelection === 'Primary schools' ?
                      <PrimaryDetails
                        primaryData1={primaryData1}
                        setPrimaryData1={setPrimaryData1}
                        postcodeData={postcodeData}
                        tableMapView={tableMapView}
                        listType={'short list'}
                        primaryDetail={primaryDetail}
                        setPrimaryDetail={setPrimaryDetail}
                        setSliderSelection={setSliderSelection}
                        setPropertyView={setPropertyView}
                      />

                      : sliderSelection === 'Secondary schools' ?

                        <SecondaryDetails
                          secondaryData1={secondaryData1}
                          setSecondaryData1={setSecondaryData1}
                          postcodeData={postcodeData}
                          tableMapView={tableMapView}
                          listType={'short list'}
                          secondaryDetail={secondaryDetail}
                          setSecondaryDetail={setSecondaryDetail}
                          setSliderSelection={setSliderSelection}
                          setPropertyView={setPropertyView}
                        />

                        : sliderSelection === 'Tubes' ?
                          <TubeDetails
                            tubes1={tubes1}
                            setTubes1={setTubes1}
                            listType={'short list'}
                            postcodeData={postcodeData}
                            tableMapView={tableMapView}
                          />

                          : sliderSelection === 'Restaurants' ?
                            <RestaurantDetails
                              restaurants1={restaurants1}
                              setRestaurants1={setRestaurants1}
                              listType={'short list'}
                              postcodeData={postcodeData}
                              tableMapView={tableMapView}
                            />

                            : sliderSelection === 'Pubs' ?
                              <PubDetails
                                pubs1={pubs1}
                                setPubs1={setPubs1}
                                listType={'short list'}
                                postcodeData={postcodeData}
                                tableMapView={tableMapView}

                              />

                              : sliderSelection === 'Supermarkets' ?
                                <SupermarketDetails
                                  supermarkets1={supermarkets1}
                                  setSupermarkets1={setSupermarkets1}
                                  listType={'short list'}
                                  postcodeData={postcodeData}
                                  tableMapView={tableMapView}

                                />

                                : sliderSelection === 'Fitness' ?
                                  <FitnessDetails
                                    gyms1={gyms1}
                                    setGyms1={setGyms1}
                                    listType={'short list'}
                                    postcodeData={postcodeData}
                                    tableMapView={tableMapView}

                                  />

                                  : sliderSelection === 'EVs' ?
                                    <EVDetails
                                      ev1={ev1}
                                      setEv1={setEv1}
                                      listType={'short list'}
                                      postcodeData={postcodeData}
                                      tableMapView={tableMapView}

                                    />
                                    :
                                    ''}
                  </div>



                </div>



              </>

              : ''}
        </section>

      </section>

    </>

  )
}


export default PropertyInsightsOverview