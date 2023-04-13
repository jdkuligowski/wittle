import { useParams, useNavigate, Link } from 'react-router-dom'
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { isUserAuth, getAccessToken, getUserToken } from '../auth/Auth'
import { Modal } from 'react-bootstrap'
import { NumericFormat } from 'react-number-format'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import Loading from '../helpers/Loading'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import ReactPaginate from 'react-paginate'
import ProfileMapModal from './ProfileMapModal'


const ProfileLifestyle = ({ masterLiving3, lifestyleChange, lifestyleChange2, lifestyleDropdown, restaurantDropdown, restaurantCuisineChange, restaurantCuisineChange2,
  ratingFilter, pubCategory, pubChange, pubChange2, ratingChange, gymStudioChange, gymStudioChange2, gymType, takeawayCuisineChange, takeawayCuisineChange2, takeawayCuisine,
  ratingChange2, takeawayRating, schoolRating, schoolState, secondaryState, schoolRating2, collegeState, schoolRating3, schoolRating4, schoolRating5, schoolRating6, loading,
  lifestyleView, setLifestyleView, viewport, setViewport, startIndex, endIndex, iconSetting, handlePageClick, iconId, showPopup }) => {


  const restaurantList = ['All', 'American', 'Asian', 'Bar', 'British', 'Central American', 'Central Asian', 'Chicken', 'Chinese', 'European', 'French',
    'Gastro Pub', 'Greek', 'Indian', 'International', 'Italian', 'Japanese', 'Meat & Grill', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Modern',
    'North African', 'Pizza', 'Pub food', 'Seafood', 'South African', 'South American', 'South East Asian', 'Spanish', 'Thai', 'Turkish',
    'Vegetarian/ Vegan', 'Vietnamese', 'Wine Bar']

  const lifestyleList = ['Restaurants', 'Pubs', 'Takeaways', 'Gyms', 'Primary schools', 'Secondary schools', '6th forms']

  const pubList = ['All', 'Timeout100', 'Recommended', 'Worth a visit', 'Other pubs']

  const gymList = ['All', 'Barre', 'Dance', 'Boxing & Martial Arts', 'Cycling', 'HIIT', 'Open Gym', 'Other', 'Outdoor', 'Rowing', 'Strength Training',
    'Yoga & Pilates']

  const takeawayList = ['All', 'American', 'Asianfusion', 'Breakfast', 'British', 'Brunch', 'Chinese', 'Healthy', 'Indian', 'Italian', 'Japanese', 'Korean', 'Mediterranean', 'Mexican', 'Thai', 'Turkish', 'Vietnamese']

  const ofstedList = ['All', 'Good', 'No assessment', 'Outstanding', 'Requires improvement', 'Serious Weaknesses']

  const pageViews = ['Tile', 'Table']

  const [restaurants, setRestaurants] = useState()
  const [lifestyle, setLifestyle] = useState()
  const [pubs, setPubs] = useState()
  const [gyms, setGyms] = useState()
  const [takeaway, setTakeaway] = useState()
  const [ofsted, setOfsted] = useState()
  const [views, setViews] = useState()

  // Creating dropdown list for restaurasnts on mobile
  useEffect(() => {
    const newList = []
    restaurantList.forEach(item => newList.includes(item) ? '' : newList.push(item))
    setRestaurants(newList)
    const newList2 = []
    lifestyleList.forEach(item => newList2.includes(item) ? '' : newList2.push(item))
    setLifestyle(newList2)
    const newList3 = []
    pubList.forEach(item => newList3.includes(item) ? '' : newList3.push(item))
    setPubs(newList3)
    const newList4 = []
    gymList.forEach(item => newList4.includes(item) ? '' : newList4.push(item))
    setGyms(newList4)
    const newList5 = []
    takeawayList.forEach(item => newList5.includes(item) ? '' : newList5.push(item))
    setTakeaway(newList5)
    const newList6 = []
    ofstedList.forEach(item => newList6.includes(item) ? '' : newList6.push(item))
    setOfsted(newList6)
    const newList7 = []
    pageViews.forEach(item => newList7.includes(item) ? '' : newList7.push(item))
    setViews(newList7)
  }, [])


  // set state for showing full wittle living modal
  const [mapShow, setMapShow] = useState(false)

  // close modal
  const handleMapClose = () => {
    setMapShow(false)
  }

  // show living modal
  const handleMapShow = () => {
    setMapShow(true)
  }

  return (
    <>
      <div className='lifestyle-table'>
        <div className='table-filters'>
          <div className='filter'>
            <h3 className='filter-title'>Lifestyle feature</h3>
            <div className='desktop-dropdown'>
              <Dropdown
                options={lifestyleList}
                value={lifestyleDropdown}
                // value={value}
                onChange={lifestyleChange}
              />
            </div>
            <div className='mobile-dropdown'>
              <select onChange={lifestyleChange2}>
                {lifestyle ? lifestyle.map(item => <option key={item} value={item}>{item}</option>) : ''}
              </select>
            </div>
          </div>
          {lifestyleDropdown === 'Restaurants' ?
            <div className='filter'>
              <h3 className='filter-title'>Cuisine</h3>
              <div className='desktop-dropdown'>
                <Dropdown
                  options={restaurantList}
                  value={restaurantDropdown}
                  onChange={restaurantCuisineChange}
                />
              </div>
              <div className='mobile-dropdown'>
                <select onChange={restaurantCuisineChange2}>
                  {restaurants ? restaurants.map(item => <option key={item} value={item}>{item}</option>) : ''}
                </select>
              </div>
            </div>
            : lifestyleDropdown === 'Pubs' ?
              <div className='filter'>
                <h3 className='filter-title'>Pub category</h3>
                <div className='desktop-dropdown'>
                  <Dropdown
                    options={pubList}
                    value={pubCategory}
                    onChange={pubChange}
                  />
                </div>
                <div className='mobile-dropdown'>
                  <select onChange={pubChange2}>
                    {pubs ? pubs.map(item => <option key={item} value={item}>{item}</option>) : ''}
                  </select>
                </div>
              </div>
              : lifestyleDropdown === 'Gyms' ?
                <div className='filter'>
                  <h3 className='filter-title'>Gym type</h3>
                  <div className='desktop-dropdown'>
                    <Dropdown
                      options={gymList}
                      value={gymType}
                      onChange={gymStudioChange}
                    />
                  </div>
                  <div className='mobile-dropdown'>
                    <select onChange={gymStudioChange2}>
                      {gyms ? gyms.map(item => <option key={item} value={item}>{item}</option>) : ''}
                    </select>
                  </div>
                </div>
                : lifestyleDropdown === 'Takeaways' ?
                  <div className='filter'>
                    <h3 className='filter-title'>Cuisine</h3>
                    <div className='desktop-dropdown'>
                      <Dropdown
                        options={takeawayList}
                        value={takeawayCuisine}
                        onChange={takeawayCuisineChange}
                      />
                    </div>
                    <div className='mobile-dropdown'>
                      <select onChange={takeawayCuisineChange2}>
                        {takeaway ? takeaway.map(item => <option key={item} value={item}>{item}</option>) : ''}
                      </select>
                    </div>
                  </div>
                  : lifestyleDropdown === 'Primary schools' ?
                    <div className='filter'>
                      <h3 className='filter-title'>Ofsted rating</h3>
                      <div className='desktop-dropdown'>
                        <Dropdown
                          options={ofstedList}
                          value={schoolState}
                          onChange={schoolRating}
                        />
                      </div>
                      <div className='mobile-dropdown'>
                        <select onChange={schoolRating4}>
                          {ofsted ? ofsted.map(item => <option key={item} value={item}>{item}</option>) : ''}
                        </select>
                      </div>
                    </div>
                    : lifestyleDropdown === 'Secondary schools' ?
                      <div className='filter'>
                        <h3 className='filter-title'>Ofsted rating</h3>
                        <div className='desktop-dropdown'>
                          <Dropdown
                            options={ofstedList}
                            value={secondaryState}
                            onChange={schoolRating2}
                          />
                        </div>
                        <div className='mobile-dropdown'>
                          <select onChange={schoolRating5}>
                            {ofsted ? ofsted.map(item => <option key={item} value={item}>{item}</option>) : ''}
                          </select>
                        </div>
                      </div>
                      : lifestyleDropdown === '6th forms' ?
                        <div className='filter'>
                          <h3 className='filter-title'>Ofsted rating</h3>
                          <div className='desktop-dropdown'>
                            <Dropdown
                              options={ofstedList}
                              value={collegeState}
                              onChange={schoolRating3}
                            />
                          </div>
                          <div className='mobile-dropdown'>
                            <select onChange={schoolRating6}>
                              {ofsted ? ofsted.map(item => <option key={item} value={item}>{item}</option>) : ''}
                            </select>
                          </div>
                        </div>
                        :
                        ''
          }
          {lifestyleDropdown === 'Restaurants' ?
            <div className='filter' id='mobile-rating'>
              <h3 className='filter-title'>Minimum rating ({ratingFilter})</h3>
              <div className='slider-container'>
                <input
                  type='range'
                  onChange={ratingChange}
                  className='slider'
                  defaultValue={ratingFilter}
                  min='0'
                  max='5'
                  step='0.1'>
                </input>
              </div>
            </div>
            : lifestyleDropdown === 'Takeaways' ?
              <div className='filter' id='mobile-rating'>
                <h3 className='filter-title'>Minimum rating ({takeawayRating})</h3>
                <div className='slider-container'>
                  <input
                    type='range'
                    onChange={ratingChange2}
                    className='slider'
                    defaultValue={takeawayRating}
                    min='0'
                    max='10'
                    step='0.2'>
                  </input>
                </div>
              </div>
              : ''
          }
          {/* <div className='filter'>
            <h3 className='filter-title'>Distance (mins)</h3>

            <div className='slider-container'>
              <input
                type='range'

                className='slider'
                defaultValue='10'
                min='1'
                max='20'
                step='1'>
              </input>
            </div>
          </div> */}
        </div>
        {loading ?

          <section className='loading-screen'>
            {/* <h1>Wittle magic loading...</h1>
              <h3>Sit tight while the algorithm does its work. This usually takes about a minute the first time you search.</h3> */}
            {/* <div className='loading-gif'></div> */}
            <Loading />
          </section>
          :

          lifestyleView === 'Table' && masterLiving3 && lifestyleDropdown === 'Restaurants' ?
            <div className='table-content'>
              {masterLiving3.map((city, index) => {
                return (
                  <>
                    <div className='sub-title'>
                      <h1 key={index}>{city.restaurants.length} total restaurants</h1>
                      <div className='icon-selector-section'>
                        <div className='icon-selector'>
                          <div className='map-icon' id='map-icon'  onClick={(e) => setLifestyleView('Map')} ></div>
                        </div>
                        <div className='icon-selector'>
                          <div className='grid-icon' onClick={(e) => setLifestyleView('Tile')} ></div>
                        </div>
                      </div>



                    </div>
                  </>
                )
              })}
              <div className='table-titles'>
                <h5 className='column-1'>#</h5>
                <h5 className='column-2'>Name</h5>
                <h5 className='column-3'>Cuisine</h5>
                <h5 className='column-4'>Rating</h5>
                <h5 className='column-5'>Distance (mins)</h5>
                {/* <h5 className='column-6'>Contact</h5> */}
              </div>
              {
                masterLiving3.map((item, index) => {
                  return (
                    <div className='table-details-wrap' key={index}>
                      {item.restaurants.map((item, index) => {
                        return (
                          <>
                            <div className='table-details' key={index}>
                              <h5 className='column-1'>{index + 1}</h5>
                              <h5 className='column-2'>{item.restaurant_name}</h5>
                              <h5 className='column-3'>{item.master_cuisine}</h5>
                              <h5 className='column-4'>{item.rating}</h5>
                              <h5 className='column-5'>{item.distance_walk_mins}</h5>
                              {/* <h5 className='column-6'><a href={item.url} style={{ textDecoration: 'none', color: '#051885' }}>Go to site</a></h5> */}
                            </div>
                          </>
                        )
                      }).slice(startIndex, endIndex)}
                      <ReactPaginate
                        pageCount={Math.ceil(item.restaurants.length / 50)}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                        previousLabel={'<'}
                        nextLabel={'>'}
                        pageRangeDisplayed={0}
                        breakLabel={'...'}
                      />
                    </div>
                  )
                })
              }

            </div>
            :
            lifestyleView === 'Table' && masterLiving3 && lifestyleDropdown === 'Gyms' ?
              <div className='table-content'>
                {masterLiving3.map((city, index) => {
                  return (
                    <>
                      <div className='sub-title'>
                        <h1 key={index}>{city.gyms.length} total gyms</h1>
                        <div className='icon-selector-section'>
                          <div className='icon-selector'>
                            <div className='map-icon' id='map-icon'  onClick={(e) => setLifestyleView('Map')} ></div>
                          </div>
                          <div className='icon-selector'>
                            <div className='grid-icon' onClick={(e) => setLifestyleView('Tile')} ></div>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                })}
                <div className='table-titles'>
                  <h5 className='column-1'>#</h5>
                  <h5 className='column-2'>Studio</h5>
                  <h5 className='column-3' id='gym-option'>Studio offering</h5>
                  {/* <h5 className='column-4'>Rating</h5> */}
                  <h5 className='column-5'>Distance (mins)</h5>
                  {/* <h5 className='column-6'>Contact</h5> */}
                </div>
                {masterLiving3.map((item, index) => {
                  return (
                    <div className='table-details-wrap' key={index}>
                      {item.gyms.map((item, index) => {
                        return (
                          <>
                            <div className='table-details' key={index}>
                              <h5 className='column-1'>{index + 1}</h5>
                              <h5 className='column-2'>{item.gym_name}</h5>
                              <h5 className='column-3' id='gym-option'>{item.class_type}</h5>
                              <h5 className='column-5'>{item.distance_walk_mins}</h5>
                              {/* <h5 className='column-6'><a href={item.url} style={{ textDecoration: 'none', color: '#051885' }}>Go to site</a></h5> */}
                            </div>
                          </>
                        )
                      }).slice(startIndex, endIndex)}
                      <ReactPaginate
                        pageCount={Math.ceil(item.gyms.length / 50)}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                        previousLabel={'<'}
                        nextLabel={'>'}
                        pageRangeDisplayed={0}
                        breakLabel={'...'}
                      />
                    </div>
                  )
                })}
              </div>
              :
              lifestyleView === 'Table' && masterLiving3 && lifestyleDropdown === 'Pubs' ?
                <div className='table-content'>
                  {masterLiving3.map((city, index) => {
                    return (
                      <>
                        <div className='sub-title'>
                          <h1 key={index}>{city.pubs.length} total pubs</h1>
                          <div className='icon-selector-section'>
                            <div className='icon-selector'>
                              <div className='map-icon' id='map-icon'  onClick={(e) => setLifestyleView('Map')} ></div>
                            </div>
                            <div className='icon-selector'>
                              <div className='grid-icon' onClick={(e) => setLifestyleView('Tile')} ></div>
                            </div>

                          </div>
                        </div>
                      </>
                    )
                  })}
                  <div className='table-titles'>
                    <h5 className='column-1'>#</h5>
                    <h5 className='column-2'>Name</h5>
                    <h5 className='column-3' id='gym-option'>Category</h5>
                    {/* <h5 className='column-4'>Rating</h5> */}
                    <h5 className='column-5'>Distance (mins)</h5>
                    {/* <h5 className='column-6'>Contact</h5> */}
                  </div>
                  {masterLiving3.map((item, index) => {
                    return (
                      <div className='table-details-wrap' key={index}>
                        {item.pubs.map((item, index) => {
                          return (
                            <>
                              <div className='table-details' key={index}>
                                <h5 className='column-1'>{index + 1}</h5>
                                <h5 className='column-2'>{item.Pub_name}</h5>
                                <h5 className='column-3' id='gym-option'>{item.Pub_category}</h5>
                                <h5 className='column-5'>{item.distance_walk_mins}</h5>
                                {/* <h5 className='column-6'><a href={item.url} style={{ textDecoration: 'none', color: '#051885' }}>Go to site</a></h5> */}
                              </div>
                            </>
                          )
                        }).slice(startIndex, endIndex)}
                        <ReactPaginate
                          pageCount={Math.ceil(item.pubs.length / 50)}
                          onPageChange={handlePageClick}
                          containerClassName={'pagination'}
                          activeClassName={'active'}
                          previousLabel={'<'}
                          nextLabel={'>'}
                          pageRangeDisplayed={0}
                          breakLabel={'...'}
                        />
                      </div>
                    )
                  })}
                </div>
                :

                lifestyleView === 'Table' && masterLiving3 && lifestyleDropdown === 'Takeaways' ?
                  <div className='table-content'>
                    {masterLiving3.map((city, index) => {
                      return (
                        <>
                          <div className='sub-title'>
                            <h1 key={index}>{city.takeaways.length} total takeaways</h1>
                            <div className='icon-selector-section'>
                              <div className='icon-selector'>
                                <div className='map-icon' id='map-icon'  onClick={(e) => setLifestyleView('Map')} ></div>
                              </div>
                              <div className='icon-selector'>
                                <div className='grid-icon' onClick={(e) => setLifestyleView('Tile')} ></div>
                              </div>
                            </div>
                          </div>
                        </>
                      )
                    })}
                    <div className='table-titles'>
                      <h5 className='column-1'>#</h5>
                      <h5 className='column-2'>Name</h5>
                      <h5 className='column-3'>Cuisine</h5>
                      <h5 className='column-4'>Rating</h5>
                      <h5 className='column-5'>Distance (mins)</h5>
                      {/* <h5 className='column-6'>Contact</h5> */}
                    </div>
                    {masterLiving3.map((item, index) => {
                      return (
                        <div className='table-details-wrap' key={index}>
                          {item.takeaways.map((item, index) => {
                            return (
                              <>
                                <div className='table-details' key={index}>
                                  <h5 className='column-1'>{index + 1}</h5>
                                  <h5 className='column-2'>{item.name}</h5>
                                  <h5 className='column-3'>{item.cuisine}</h5>
                                  <h5 className='column-4'>{item.wittle_rating}</h5>
                                  <h5 className='column-5'>{item.distance_walk_mins}</h5>
                                  {/* <h5 className='column-6'><a href={item.url} style={{ textDecoration: 'none', color: '#051885' }}>Go to site</a></h5> */}
                                </div>
                              </>
                            )
                          }).slice(startIndex, endIndex)}
                          <ReactPaginate
                            pageCount={Math.ceil(item.takeaways.length / 50)}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                            previousLabel={'<'}
                            nextLabel={'>'}
                            pageRangeDisplayed={0}
                            breakLabel={'...'}
                          />
                        </div>
                      )
                    })}
                  </div>
                  :

                  lifestyleView === 'Table' && masterLiving3 && lifestyleDropdown === 'Primary schools' ?
                    <div className='table-content'>
                      {masterLiving3.map((city, index) => {
                        return (
                          <>
                            <div className='sub-title'>
                              <h1 key={index}>{city.primaries.length} total primary schools</h1>
                              <div className='icon-selector-section'>
                                <div className='icon-selector'>
                                  <div className='map-icon' id='map-icon'  onClick={(e) => setLifestyleView('Map')} ></div>
                                </div>
                                <div className='icon-selector'>
                                  <div className='grid-icon' onClick={(e) => setLifestyleView('Tile')} ></div>
                                </div>
                              </div>
                            </div>
                          </>
                        )
                      })}
                      <div className='table-titles'>
                        <h5 className='column-1'>#</h5>
                        <h5 className='column-2'>Name</h5>
                        <h5 className='column-3'>Type</h5>
                        <h5 className='column-4'>Ofsted Rating</h5>
                        <h5 className='column-5'>Distance (mins)</h5>
                        {/* <h5 className='column-6'>Contact</h5> */}
                      </div>
                      {masterLiving3.map((item, index) => {
                        return (
                          <div className='table-details-wrap' key={index}>
                            {item.primaries.map((item, index) => {
                              return (
                                <>
                                  <div className='table-details' key={index}>
                                    <h5 className='column-1'>{index + 1}</h5>
                                    <h5 className='column-2'>{item.school_name}</h5>
                                    <h5 className='column-3'>{item.school_grouping}</h5>
                                    <h5 className='column-4'>{item.ofsted_results}</h5>
                                    <h5 className='column-5'>{item.distance_walk_mins}</h5>
                                    {/* <h5 className='column-6'><a href={item.url} style={{ textDecoration: 'none', color: '#051885' }}>Go to site</a></h5> */}
                                  </div>
                                </>
                              )
                            }).slice(startIndex, endIndex)}
                            <ReactPaginate
                              pageCount={Math.ceil(item.primaries.length / 50)}
                              onPageChange={handlePageClick}
                              containerClassName={'pagination'}
                              activeClassName={'active'}
                              previousLabel={'<'}
                              nextLabel={'>'}
                              pageRangeDisplayed={0}
                              breakLabel={'...'}
                            />
                          </div>
                        )
                      })}
                    </div>
                    :
                    lifestyleView === 'Table' && lifestyleDropdown === 'Secondary schools' ?
                      <div className='table-content'>
                        {masterLiving3.map((city, index) => {
                          return (
                            <>
                              <div className='sub-title'>
                                <h1 key={index}>{city.secondaries.length} total secondary schools</h1>
                                <div className='icon-selector-section'>
                                  <div className='icon-selector'>
                                    <div className='map-icon' id='map-icon' onClick={(e) => setLifestyleView('Map')} ></div>
                                  </div>
                                  <div className='icon-selector'>
                                    <div className='grid-icon' onClick={(e) => setLifestyleView('Tile')} ></div>
                                  </div>
                                </div>
                              </div>
                            </>
                          )
                        })}
                        <div className='table-titles'>
                          <h5 className='column-1'>#</h5>
                          <h5 className='column-2'>Name</h5>
                          <h5 className='column-3'>Type</h5>
                          <h5 className='column-4'>Ofsted Rating</h5>
                          <h5 className='column-5'>Distance (mins)</h5>
                          {/* <h5 className='column-6'>Contact</h5> */}
                        </div>
                        {masterLiving3.map((item, index) => {
                          return (
                            <div className='table-details-wrap' key={index}>
                              {item.secondaries.map((item, index) => {
                                return (
                                  <>
                                    <div className='table-details' key={index}>
                                      <h5 className='column-1'>{index + 1}</h5>
                                      <h5 className='column-2'>{item.school_name}</h5>
                                      <h5 className='column-3'>{item.school_grouping}</h5>
                                      <h5 className='column-4'>{item.ofsted_results}</h5>
                                      <h5 className='column-5'>{item.distance_walk_mins}</h5>
                                      {/* <h5 className='column-6'><a href={item.url} style={{ textDecoration: 'none', color: '#051885' }}>Go to site</a></h5> */}
                                    </div>
                                  </>
                                )
                              }).slice(startIndex, endIndex)}
                              <ReactPaginate
                                pageCount={Math.ceil(item.secondaries.length / 50)}
                                onPageChange={handlePageClick}
                                containerClassName={'pagination'}
                                activeClassName={'active'}
                                previousLabel={'<'}
                                nextLabel={'>'}
                                pageRangeDisplayed={0}
                                breakLabel={'...'}
                              />
                            </div>
                          )
                        })}
                      </div>
                      :
                      lifestyleView === 'Table' && lifestyleDropdown === '6th forms' ?
                        <div className='table-content'>
                          {masterLiving3.map((city, index) => {
                            return (
                              <>
                                <div className='sub-title'>
                                  <h1 key={index}>{city.colleges.length} total colleges</h1>
                                  <div className='icon-selector-section'>
                                    <div className='icon-selector'>
                                      <div className='map-icon' id='map-icon'  onClick={(e) => setLifestyleView('Map')} ></div>
                                    </div>
                                    <div className='icon-selector'>
                                      <div className='grid-icon' onClick={(e) => setLifestyleView('Tile')} ></div>
                                      
                                    </div>
                                  </div>
                                </div>
                              </>
                            )
                          })}
                          <div className='table-titles'>
                            <h5 className='column-1'>#</h5>
                            <h5 className='column-2'>Name</h5>
                            <h5 className='column-3'>Type</h5>
                            <h5 className='column-4'>Ofsted Rating</h5>
                            <h5 className='column-5'>Distance (mins)</h5>
                            {/* <h5 className='column-6'>Contact</h5> */}
                          </div>
                          {masterLiving3.map((item, index) => {
                            return (
                              <div className='table-details-wrap' key={index}>
                                {item.colleges.map((item, index) => {
                                  return (
                                    <>
                                      <div className='table-details' key={index}>
                                        <h5 className='column-1'>{index + 1}</h5>
                                        <h5 className='column-2'>{item.school_name}</h5>
                                        <h5 className='column-3'>{item.school_grouping}</h5>
                                        <h5 className='column-4'>{item.ofsted_results}</h5>
                                        <h5 className='column-5'>{item.distance_walk_mins}</h5>
                                        {/* <h5 className='column-6'><a href={item.url} style={{ textDecoration: 'none', color: '#051885' }}>Go to site</a></h5> */}
                                      </div>
                                    </>
                                  )
                                }).slice(startIndex, endIndex)}
                                <ReactPaginate
                                  pageCount={Math.ceil(item.colleges.length / 50)}
                                  onPageChange={handlePageClick}
                                  containerClassName={'pagination'}
                                  activeClassName={'active'}
                                  previousLabel={'<'}
                                  nextLabel={'>'}
                                  pageRangeDisplayed={0}
                                  breakLabel={'...'}
                                />
                              </div>
                            )
                          })}
                        </div>
                        :
                        lifestyleView === 'Tile' && masterLiving3 && lifestyleDropdown === 'Restaurants' ?
                          <div className='selection-detail'>
                            <div className='lifestyle-map'>
                              <div className='content-section'>
                                <div className='map-list-title'>
                                  {masterLiving3 ?
                                    masterLiving3.map((city, index) => {
                                      return (
                                        <>
                                          <div className='sub-title'>
                                            <h1 key={index}>{city.restaurants.length} total restaurants</h1>
                                            <div className='icon-selector-section'>
                                              <div className='icon-selector'>
                                                <div className='map-icon' id='map-icon'  onClick={(e) => setLifestyleView('Map')} ></div>    
                                              </div>
                                              <div className='icon-selector'>
                                                <div className='table-icon' onClick={(e) => setLifestyleView('Table')} ></div>
                                              </div>
                                            </div>
                                          </div>
                                          <ReactPaginate
                                            pageCount={Math.ceil(city.restaurants.length / 50)}
                                            onPageChange={handlePageClick}
                                            containerClassName={'pagination'}
                                            activeClassName={'active'}
                                            previousLabel={'<'}
                                            nextLabel={'>'}
                                            pageRangeDisplayed={0}
                                            breakLabel={'...'}
                                          />
                                          <div className='item-list'>
                                            {city.restaurants.map((item, index) => {
                                              return (
                                                <>
                                                  <div className='item' id={item.id} key={index}>
                                                    <div className='item-left'>
                                                      <div className='icon-image' style={{ backgroundImage: `url('${item.image_url}')` }}></div>
                                                    </div>
                                                    <div className='item-right' id={item.id}>
                                                      <h1>{index + 1} - {item.restaurant_name}</h1>
                                                      <h3>🍽 {item.master_cuisine}</h3>
                                                      <h3>📈 {item.rating}/ 5</h3>
                                                    </div>
                                                  </div>
                                                  <hr />
                                                </>
                                              )
                                            }).slice(startIndex, endIndex)}
                                          </div>
                                          {/* <ReactPaginate
                                            pageCount={Math.ceil(city.restaurants.length / 50)}
                                            onPageChange={handlePageClick}
                                            containerClassName={'pagination'}
                                            activeClassName={'active'}
                                            previousLabel={'<'}
                                            nextLabel={'>'}
                                            pageRangeDisplayed={0}
                                            breakLabel={'...'}
                                          /> */}
                                        </>
                                      )
                                    })
                                    : ''}
                                </div>
                              </div>
                              <div className='map-section'>
                                <ReactMapGL {...viewport}
                                  mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                                  mapStyle='mapbox://styles/mapbox/streets-v12'
                                  onViewportChange={viewport => {
                                    setViewport(viewport)
                                  }}
                                  center={viewport}
                                  onMove={evt => setViewport(evt.viewport)}
                                  className='profile-map'>
                                  {masterLiving3 ?
                                    <div className='icon-wrapper'>
                                      {masterLiving3.map((city, index) => {
                                        return (
                                          <>
                                            {lifestyleDropdown === 'Restaurants' ?
                                              <div className='poi-icons' key={index}>
                                                {city.restaurants.map((icon, index) => {
                                                  return (
                                                    <div key={icon._id}>
                                                      <Marker id={icon.id} longitude={icon.long} latitude={icon.lat}>
                                                        <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                                          {index + 1}
                                                        </div>
                                                      </Marker>
                                                      {(showPopup & icon.id === iconId) && (
                                                        <Popup key={index} id={icon.id} longitude={icon.long} latitude={icon.lat} closeOnClick={false} className='icon-popup'>
                                                          <div className='top-box'>
                                                            <div className='icon-image' style={{ backgroundImage: `url('${icon.image_url}')` }}></div>
                                                          </div>
                                                          <div className='bottom-box'>
                                                            <h1>{index + 1} - {icon.restaurant_name}</h1>
                                                            <h3>🍽 {icon.master_cuisine}</h3>
                                                            <h3>📈 {icon.rating}/ 5</h3>
                                                            <a href={icon.url} target='_blank' rel='noopener noreferrer' style={{ color: '#FFA7E5', textDecoration: 'none', fontWeight: 'bold' }}>👀 Visit website</a>
                                                          </div>

                                                        </Popup>
                                                      )}
                                                    </div>
                                                  )
                                                }).slice(startIndex, endIndex)}
                                              </div>
                                              : ''}
                                          </>
                                        )
                                      })}
                                    </div>
                                    : ''}
                                </ReactMapGL>
                              </div>
                            </div>
                          </div>
                          :

                          lifestyleView === 'Tile' && masterLiving3 && lifestyleDropdown === 'Pubs' ?

                            <div className='selection-detail'>
                              <div className='lifestyle-map'>
                                <div className='content-section'>
                                  <div className='map-list-title'>
                                    {masterLiving3 ?
                                      masterLiving3.map((city, index) => {
                                        return (
                                          <>
                                            <div className='sub-title'>
                                              <h1 key={index}>{city.pubs.length} total pubs</h1>
                                              <div className='icon-selector-section'>
                                                <div className='icon-selector'>
                                                  <div className='map-icon' id='map-icon'  onClick={(e) => setLifestyleView('Map')} ></div>
                                                </div>
                                                <div className='icon-selector'>
                                                  <div className='table-icon' onClick={(e) => setLifestyleView('Table')} ></div>

                                                </div>
                                              </div>
                                            </div>
                                            <ReactPaginate
                                              pageCount={Math.ceil(city.pubs.length / 50)}
                                              onPageChange={handlePageClick}
                                              containerClassName={'pagination'}
                                              activeClassName={'active'}
                                              previousLabel={'<'}
                                              nextLabel={'>'}
                                              pageRangeDisplayed={0}
                                              breakLabel={'...'}
                                            />
                                            <div className='item-list'>
                                              {city.pubs.map((item, index) => {
                                                return (
                                                  <>
                                                    <div className='item' id={item.id} key={index}>
                                                      <div className='item-left'>
                                                        <h1>Image</h1>
                                                      </div>
                                                      <div className='item-right' id={item.id}>
                                                        <h1>{index + 1} - {item.Pub_name}</h1>
                                                        {/* <h3>🍽 {item.master_cuisine}</h3> */}
                                                        <h3>📈 {item.Pub_category}</h3>
                                                      </div>
                                                    </div>
                                                    <hr />
                                                  </>
                                                )
                                              }).slice(startIndex, endIndex)}
                                            </div>
                                          </>
                                        )
                                      })
                                      : ''}
                                  </div>
                                </div>
                                <div className='map-section'>
                                  <ReactMapGL {...viewport}
                                    mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                                    mapStyle='mapbox://styles/mapbox/streets-v12'
                                    onViewportChange={viewport => {
                                      setViewport(viewport)
                                    }}
                                    center={viewport}
                                    onMove={evt => setViewport(evt.viewport)}
                                    className='profile-map'>
                                    {masterLiving3 ?
                                      <div className='icon-wrapper'>
                                        {masterLiving3.map((city, index) => {
                                          return (
                                            <>
                                              {lifestyleDropdown === 'Pubs' ?
                                                <div className='poi-icons' key={index}>
                                                  {city.pubs.map((icon, index) => {
                                                    return (
                                                      <div key={icon._id}>
                                                        <Marker id={icon.id} longitude={icon.long} latitude={icon.Lat}>
                                                          <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                                            {index + 1}
                                                          </div>
                                                        </Marker>
                                                        {(showPopup & icon.id === iconId) && (
                                                          <Popup key={index} id={icon.id} longitude={icon.long} latitude={icon.Lat} closeOnClick={false}>
                                                            <h1>{index + 1} - {icon.Pub_name}</h1>
                                                          </Popup>
                                                        )}
                                                      </div>
                                                    )
                                                  }).slice(startIndex, endIndex)}
                                                </div>
                                                : ''}
                                            </>
                                          )
                                        })}
                                      </div>
                                      : ''}
                                  </ReactMapGL>
                                </div>
                              </div>
                            </div>
                            :

                            lifestyleView === 'Tile' && masterLiving3 && lifestyleDropdown === 'Takeaways' ?

                              <div className='selection-detail'>
                                <div className='lifestyle-map'>
                                  <div className='content-section'>
                                    <div className='map-list-title'>
                                      {masterLiving3 ?
                                        masterLiving3.map((city, index) => {
                                          return (
                                            <>
                                              <div className='sub-title'>
                                                <h1 key={index}>{city.takeaways.length} total takeaways</h1>
                                                <div className='icon-selector-section'>
                                                  <div className='icon-selector'>
                                                    <div className='map-icon' id='map-icon'  onClick={(e) => setLifestyleView('Map')} ></div>
                                                  </div>
                                                  <div className='icon-selector'>
                                                    <div className='table-icon' onClick={(e) => setLifestyleView('Table')} ></div>

                                                  </div>
                                                </div>
                                              </div>
                                              <ReactPaginate
                                                pageCount={Math.ceil(city.takeaways.length / 50)}
                                                onPageChange={handlePageClick}
                                                containerClassName={'pagination'}
                                                activeClassName={'active'}
                                                previousLabel={'<'}
                                                nextLabel={'>'}
                                                pageRangeDisplayed={0}
                                                breakLabel={'...'}
                                              />
                                              <div className='item-list'>
                                                {city.takeaways.map((item, index) => {
                                                  return (
                                                    <>
                                                      <div className='item' id={item.id} key={index}>
                                                        <div className='item-left'>
                                                          <h1>Image</h1>
                                                        </div>
                                                        <div className='item-right' id={item.id}>
                                                          <h1>{index + 1} - {item.name}</h1>
                                                          <h3>🍽 {item.cuisine}</h3>
                                                          <h3>📈 {item.wittle_rating}/ 10</h3>
                                                        </div>
                                                      </div>
                                                      <hr />
                                                    </>
                                                  )
                                                }).slice(startIndex, endIndex)}
                                              </div>
                                            </>
                                          )
                                        })
                                        : ''}
                                    </div>
                                  </div>
                                  <div className='map-section'>
                                    <ReactMapGL {...viewport}
                                      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                                      mapStyle='mapbox://styles/mapbox/streets-v12'
                                      onViewportChange={viewport => {
                                        setViewport(viewport)
                                      }}
                                      center={viewport}
                                      onMove={evt => setViewport(evt.viewport)}
                                      className='profile-map'>
                                      {masterLiving3 ?
                                        <div className='icon-wrapper'>
                                          {masterLiving3.map((city, index) => {
                                            return (
                                              <>
                                                {lifestyleDropdown === 'Takeaways' ?
                                                  <div className='poi-icons' key={index}>
                                                    {city.takeaways.map((icon, index) => {
                                                      return (
                                                        <div key={icon._id}>
                                                          <Marker id={icon.id} longitude={icon.long} latitude={icon.lat}>
                                                            <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                                              {index + 1}
                                                            </div>
                                                          </Marker>
                                                          {(showPopup & icon.id === iconId) && (
                                                            <Popup key={index} id={icon.id} longitude={icon.long} latitude={icon.lat} closeOnClick={false}>
                                                              <h1 style={{ color: '#051885' }}>{index + 1} - {icon.name}</h1>
                                                            </Popup>
                                                          )}
                                                        </div>
                                                      )
                                                    }).slice(startIndex, endIndex)}
                                                  </div>
                                                  : ''}
                                              </>
                                            )
                                          })}
                                        </div>
                                        : ''}
                                    </ReactMapGL>
                                  </div>
                                </div>
                              </div>
                              :

                              lifestyleView === 'Tile' && masterLiving3 && lifestyleDropdown === 'Gyms' ?

                                <div className='selection-detail'>
                                  <div className='lifestyle-map'>
                                    <div className='content-section'>
                                      <div className='map-list-title'>
                                        {masterLiving3 ?
                                          masterLiving3.map((city, index) => {
                                            return (
                                              <>
                                                <div className='sub-title'>
                                                  <h1 key={index}>{city.gyms.length} total gyms</h1>
                                                  <div className='icon-selector-section'>
                                                    <div className='icon-selector'>
                                                      <div className='map-icon' id='map-icon'  onClick={(e) => setLifestyleView('Map')} ></div>
                                                    </div>
                                                    <div className='icon-selector'>
                                                      <div className='table-icon' onClick={(e) => setLifestyleView('Table')} ></div>

                                                    </div>
                                                  </div>
                                                </div>
                                                <ReactPaginate
                                                  pageCount={Math.ceil(city.gyms.length / 50)}
                                                  onPageChange={handlePageClick}
                                                  containerClassName={'pagination'}
                                                  activeClassName={'active'}
                                                  previousLabel={'<'}
                                                  nextLabel={'>'}
                                                  pageRangeDisplayed={0}
                                                  breakLabel={'...'}
                                                />
                                                <div className='item-list'>
                                                  {city.gyms.map((item, index) => {
                                                    return (
                                                      <>
                                                        <div className='item' id={item.id} key={index}>
                                                          <div className='item-left'>
                                                            <div className='icon-image' style={{ backgroundImage: `url('${item.image_url}')` }}></div>
                                                          </div>
                                                          <div className='item-right' id={item.id}>
                                                            <h1>{index + 1} - {item.gym_name}</h1>
                                                            <h3>🏋️‍♂️ {item.class_type}</h3>
                                                            {/* <h3>📈 {item.wittle_rating}/ 10</h3> */}
                                                          </div>
                                                        </div>
                                                        <hr />
                                                      </>
                                                    )
                                                  }).slice(startIndex, endIndex)}
                                                </div>
                                              </>
                                            )
                                          })
                                          : ''}
                                      </div>
                                    </div>
                                    <div className='map-section'>
                                      <ReactMapGL {...viewport}
                                        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                                        mapStyle='mapbox://styles/mapbox/streets-v12'
                                        onViewportChange={viewport => {
                                          setViewport(viewport)
                                        }}
                                        center={viewport}
                                        onMove={evt => setViewport(evt.viewport)}
                                        className='profile-map'>
                                        {masterLiving3 ?
                                          <div className='icon-wrapper'>
                                            {masterLiving3.map((city, index) => {
                                              return (
                                                <>
                                                  {lifestyleDropdown === 'Gyms' ?
                                                    <div className='poi-icons' key={index}>
                                                      {city.gyms.map((icon, index) => {
                                                        return (
                                                          <div key={icon._id}>
                                                            <Marker id={icon.id} longitude={icon.long} latitude={icon.Lat}>
                                                              <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                                                {index + 1}
                                                              </div>
                                                            </Marker>
                                                            {(showPopup & icon.id === iconId) && (
                                                              <Popup key={index} id={icon.id} longitude={icon.long} latitude={icon.Lat} closeOnClick={false} className='icon-popup'>
                                                                <div className='top-box'>
                                                                  <div className='icon-image' style={{ backgroundImage: `url('${icon.image_url}')` }}></div>
                                                                </div>
                                                                <div className='bottom-box'>
                                                                  <h1>{index + 1} - {icon.gym_name}</h1>
                                                                  <h3>📈 {icon.class_type}</h3>
                                                                  <a href={icon.url} target='_blank' rel='noopener noreferrer' style={{ color: '#FFA7E5', textDecoration: 'none', fontWeight: 'bold' }}>👀 Visit website</a>
                                                                </div>
                                                              </Popup>
                                                            )}
                                                          </div>
                                                        )
                                                      }).slice(startIndex, endIndex)}
                                                    </div>
                                                    : ''}
                                                </>
                                              )
                                            })}
                                          </div>
                                          : ''}
                                      </ReactMapGL>
                                    </div>
                                  </div>
                                </div>

                                :

                                lifestyleView === 'Tile' && masterLiving3 && lifestyleDropdown === 'Primary schools' ?

                                  <div className='selection-detail'>
                                    <div className='lifestyle-map'>
                                      <div className='content-section'>
                                        <div className='map-list-title'>
                                          {masterLiving3 ?
                                            masterLiving3.map((city, index) => {
                                              return (
                                                <>
                                                  <div className='sub-title'>
                                                    <h1 key={index}>{city.primaries.length} total primary schools</h1>
                                                    <div className='icon-selector-section'>
                                                      <div className='icon-selector'>
                                                        <div className='map-icon' id='map-icon'  onClick={(e) => setLifestyleView('Map')} ></div>
                                                      </div>
                                                      <div className='icon-selector'>
                                                        <div className='table-icon' onClick={(e) => setLifestyleView('Table')} ></div>

                                                      </div>
                                                    </div>
                                                  </div>
                                                  <ReactPaginate
                                                    pageCount={Math.ceil(city.primaries.length / 50)}
                                                    onPageChange={handlePageClick}
                                                    containerClassName={'pagination'}
                                                    activeClassName={'active'}
                                                    previousLabel={'<'}
                                                    nextLabel={'>'}
                                                    pageRangeDisplayed={0}
                                                    breakLabel={'...'}
                                                  />
                                                  <div className='item-list'>
                                                    {city.primaries.map((item, index) => {
                                                      return (
                                                        <>
                                                          <div className='item' id={item.id} key={index}>
                                                            <div className='item-left'>
                                                              <h1>Image</h1>
                                                            </div>
                                                            <div className='item-right' id={item.id}>
                                                              <h1>{index + 1} - {item.school_name}</h1>
                                                              <h3>🎓 Ofsted: {item.ofsted_results}</h3>
                                                              {/* <h3>📈 {item.wittle_rating}/ 10</h3> */}
                                                            </div>
                                                          </div>
                                                          <hr />
                                                        </>
                                                      )
                                                    }).slice(startIndex, endIndex)}
                                                  </div>
                                                </>
                                              )
                                            })
                                            : ''}
                                        </div>
                                      </div>
                                      <div className='map-section'>
                                        <ReactMapGL {...viewport}
                                          mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                                          mapStyle='mapbox://styles/mapbox/streets-v12'
                                          onViewportChange={viewport => {
                                            setViewport(viewport)
                                          }}
                                          center={viewport}
                                          onMove={evt => setViewport(evt.viewport)}
                                          className='profile-map'>
                                          {masterLiving3 ?
                                            <div className='icon-wrapper'>
                                              {masterLiving3.map((city, index) => {
                                                return (
                                                  <>
                                                    {lifestyleDropdown === 'Primary schools' ?
                                                      <div className='poi-icons' key={index}>
                                                        {city.primaries.map((icon, index) => {
                                                          return (
                                                            <div key={icon._id}>
                                                              <Marker id={icon.id} longitude={icon.long} latitude={icon.lat}>
                                                                <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                                                  {index + 1}
                                                                </div>
                                                              </Marker>
                                                              {(showPopup & icon.id === iconId) && (
                                                                <Popup key={index} id={icon.id} longitude={icon.long} latitude={icon.lat} closeOnClick={false}>
                                                                  <h1 style={{ color: '#051885' }}>{index + 1} - {icon.school_name}</h1>
                                                                </Popup>
                                                              )}
                                                            </div>
                                                          )
                                                        }).slice(startIndex, endIndex)}
                                                      </div>
                                                      : ''}
                                                  </>
                                                )
                                              })}
                                            </div>
                                            : ''}
                                        </ReactMapGL>
                                      </div>
                                    </div>
                                  </div>

                                  :

                                  lifestyleView === 'Tile' && masterLiving3 && lifestyleDropdown === 'Secondary schools' ?

                                    <div className='selection-detail'>
                                      <div className='lifestyle-map'>
                                        <div className='content-section'>
                                          <div className='map-list-title'>
                                            {masterLiving3 ?
                                              masterLiving3.map((city, index) => {
                                                return (
                                                  <>
                                                    <div className='sub-title'>
                                                      <h1 key={index}>{city.secondaries.length} total secondary schools</h1>
                                                      <div className='icon-selector-section'>
                                                        <div className='icon-selector'>
                                                          <div className='map-icon' id='map-icon'  onClick={(e) => setLifestyleView('Map')} ></div>
                                                        </div>
                                                        <div className='icon-selector'>
                                                          <div className='table-icon' onClick={(e) => setLifestyleView('Table')} ></div>

                                                        </div>
                                                      </div>
                                                    </div>
                                                    <ReactPaginate
                                                      pageCount={Math.ceil(city.secondaries.length / 50)}
                                                      onPageChange={handlePageClick}
                                                      containerClassName={'pagination'}
                                                      activeClassName={'active'}
                                                      previousLabel={'<'}
                                                      nextLabel={'>'}
                                                      pageRangeDisplayed={0}
                                                      breakLabel={'...'}
                                                    />
                                                    <div className='item-list'>
                                                      {city.secondaries.map((item, index) => {
                                                        return (
                                                          <>
                                                            <div className='item' id={item.id} key={index}>
                                                              <div className='item-left'>
                                                                <h1>Image</h1>
                                                              </div>
                                                              <div className='item-right' id={item.id}>
                                                                <h1>{index + 1} - {item.school_name}</h1>
                                                                <h3>🎓 Ofsted: {item.ofsted_results}</h3>
                                                                {/* <h3>📈 {item.wittle_rating}/ 10</h3> */}
                                                              </div>
                                                            </div>
                                                            <hr />
                                                          </>
                                                        )
                                                      }).slice(startIndex, endIndex)}
                                                    </div>
                                                  </>
                                                )
                                              })
                                              : ''}
                                          </div>
                                        </div>
                                        <div className='map-section'>
                                          <ReactMapGL {...viewport}
                                            mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                                            mapStyle='mapbox://styles/mapbox/streets-v12'
                                            onViewportChange={viewport => {
                                              setViewport(viewport)
                                            }}
                                            center={viewport}
                                            onMove={evt => setViewport(evt.viewport)}
                                            className='profile-map'>
                                            {masterLiving3 ?
                                              <div className='icon-wrapper'>
                                                {masterLiving3.map((city, index) => {
                                                  return (
                                                    <>
                                                      {lifestyleDropdown === 'Secondary schools' ?
                                                        <div className='poi-icons' key={index}>
                                                          {city.secondaries.map((icon, index) => {
                                                            return (
                                                              <div key={icon._id}>
                                                                <Marker id={icon.id} longitude={icon.long} latitude={icon.lat}>
                                                                  <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                                                    {index + 1}
                                                                  </div>
                                                                </Marker>
                                                                {(showPopup & icon.id === iconId) && (
                                                                  <Popup key={index} id={icon.id} longitude={icon.long} latitude={icon.lat} closeOnClick={false}>
                                                                    <h1 style={{ color: '#051885' }}>{index + 1} - {icon.school_name}</h1>
                                                                  </Popup>
                                                                )}
                                                              </div>
                                                            )
                                                          }).slice(startIndex, endIndex)}
                                                        </div>
                                                        : ''}
                                                    </>
                                                  )
                                                })}
                                              </div>
                                              : ''}
                                          </ReactMapGL>
                                        </div>
                                      </div>
                                    </div>

                                    :

                                    lifestyleView === 'Tile' && masterLiving3 && lifestyleDropdown === '6th forms' ?

                                      <div className='selection-detail'>
                                        <div className='lifestyle-map'>
                                          <div className='content-section'>
                                            <div className='map-list-title'>
                                              {masterLiving3 ?
                                                masterLiving3.map((city, index) => {
                                                  return (
                                                    <>
                                                      <div className='sub-title'>
                                                        <h1 key={index}>{city.colleges.length} total 6th form colleges</h1>
                                                        <div className='icon-selector-section'>
                                                          <div className='icon-selector'>
                                                            <div className='map-icon' id='map-icon'  onClick={(e) => setLifestyleView('Map')} ></div>
                                                          </div>
                                                          <div className='icon-selector'>
                                                            <div className='table-icon' onClick={(e) => setLifestyleView('Table')} ></div>

                                                          </div>
                                                        </div>
                                                      </div>
                                                      <ReactPaginate
                                                        pageCount={Math.ceil(city.colleges.length / 50)}
                                                        onPageChange={handlePageClick}
                                                        containerClassName={'pagination'}
                                                        activeClassName={'active'}
                                                        previousLabel={'<'}
                                                        nextLabel={'>'}
                                                        pageRangeDisplayed={0}
                                                        breakLabel={'...'}
                                                      />
                                                      <div className='item-list'>
                                                        {city.colleges.map((item, index) => {
                                                          return (
                                                            <>
                                                              <div className='item' id={item.id} key={index}>
                                                                <div className='item-left'>
                                                                  <h1>Image</h1>
                                                                </div>
                                                                <div className='item-right' id={item.id}>
                                                                  <h1>{index + 1} - {item.school_name}</h1>
                                                                  <h3>🎓 Ofsted: {item.ofsted_results}</h3>
                                                                  {/* <h3>📈 {item.wittle_rating}/ 10</h3> */}
                                                                </div>
                                                              </div>
                                                              <hr />
                                                            </>
                                                          )
                                                        }).slice(startIndex, endIndex)}
                                                      </div>
                                                    </>
                                                  )
                                                })
                                                : ''}
                                            </div>
                                          </div>
                                          <div className='map-section'>
                                            <ReactMapGL {...viewport}
                                              mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                                              mapStyle='mapbox://styles/mapbox/streets-v12'
                                              onViewportChange={viewport => {
                                                setViewport(viewport)
                                              }}
                                              center={viewport}
                                              onMove={evt => setViewport(evt.viewport)}
                                              className='profile-map'>
                                              {masterLiving3 ?
                                                <div className='icon-wrapper'>
                                                  {masterLiving3.map((city, index) => {
                                                    return (
                                                      <>
                                                        {lifestyleDropdown === '6th forms' ?
                                                          <div className='poi-icons' key={index}>
                                                            {city.colleges.map((icon, index) => {
                                                              return (
                                                                <div key={icon._id}>
                                                                  <Marker id={icon.id} longitude={icon.long} latitude={icon.lat}>
                                                                    <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                                                      {index + 1}
                                                                    </div>
                                                                  </Marker>
                                                                  {(showPopup & icon.id === iconId) && (
                                                                    <Popup key={index} id={icon.id} longitude={icon.long} latitude={icon.lat} closeOnClick={false}>
                                                                      <h1 style={{ color: '#051885' }}>{index + 1} - {icon.school_name}</h1>
                                                                    </Popup>
                                                                  )}
                                                                </div>
                                                              )
                                                            }).slice(startIndex, endIndex)}
                                                          </div>
                                                          : ''}
                                                      </>
                                                    )
                                                  })}
                                                </div>
                                                : ''}
                                            </ReactMapGL>
                                          </div>
                                        </div>
                                      </div>

                                      :
                                      lifestyleView === 'Map' && masterLiving3 && lifestyleDropdown === 'Restaurants' ?

                                        <div className='selection-detail'>
                                          <div className='lifestyle-map'>
                                            <div className='mobile-content'>
                                              <div className='content-section'>
                                                <div className='map-list-title'>
                                                  {masterLiving3 ?
                                                    masterLiving3.map((city, index) => {
                                                      return (
                                                        <>
                                                          <div className='sub-title'>
                                                            <h1 key={index}>{city.restaurants.length} total restaurants</h1>
                                                            <div className='icon-selector-section'>
                                                              <div className='icon-selector'>
                                                                <div className='table-icon' onClick={(e) => setLifestyleView('Table')} ></div>

                                                              </div>
                                                              <div className='icon-selector'>
                                                                <div className='grid-icon' onClick={(e) => setLifestyleView('Tile')} ></div>
                                                              </div>
                                                            </div>
                                                          </div>
                                                          <ReactPaginate
                                                            pageCount={Math.ceil(city.restaurants.length / 50)}
                                                            onPageChange={handlePageClick}
                                                            containerClassName={'pagination'}
                                                            activeClassName={'active'}
                                                            previousLabel={'<'}
                                                            nextLabel={'>'}
                                                            pageRangeDisplayed={0}
                                                            breakLabel={'...'}
                                                          />
                                                        </>
                                                      )
                                                    })
                                                    : ''}
                                                </div>
                                              </div>
                                              <div className='map-section'>
                                                <ReactMapGL {...viewport}
                                                  mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                                                  mapStyle='mapbox://styles/mapbox/streets-v12'
                                                  onViewportChange={viewport => {
                                                    setViewport(viewport)
                                                  }}
                                                  center={viewport}
                                                  onMove={evt => setViewport(evt.viewport)}
                                                  className='profile-map'>
                                                  {masterLiving3 ?
                                                    <div className='icon-wrapper'>
                                                      {masterLiving3.map((city, index) => {
                                                        return (
                                                          <>
                                                            {lifestyleDropdown === 'Restaurants' ?
                                                              <div className='poi-icons' key={index}>
                                                                {city.restaurants.map((icon, index) => {
                                                                  return (
                                                                    <div key={icon._id}>
                                                                      <Marker id={icon.id} longitude={icon.long} latitude={icon.lat}>
                                                                        <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                                                          {index + 1}
                                                                        </div>
                                                                      </Marker>
                                                                      {(showPopup & icon.id === iconId) && (
                                                                        <Popup key={index} id={icon.id} longitude={icon.long} latitude={icon.lat} closeOnClick={false} className='icon-popup'>
                                                                          <div className='top-box'>
                                                                            <div className='icon-image' style={{ backgroundImage: `url('${icon.image_url}')` }}></div>
                                                                          </div>
                                                                          <div className='bottom-box'>
                                                                            <h1>{index + 1} - {icon.restaurant_name}</h1>
                                                                            <h3>🍽 {icon.master_cuisine}</h3>
                                                                            <h3>📈 {icon.rating}/ 5</h3>
                                                                            <a href={icon.url} target='_blank' rel='noopener noreferrer' style={{ color: '#FFA7E5', textDecoration: 'none', fontWeight: 'bold' }}>👀 Visit website</a>
                                                                          </div>

                                                                        </Popup>
                                                                      )}
                                                                    </div>
                                                                  )
                                                                }).slice(startIndex, endIndex)}
                                                              </div>
                                                              : ''}
                                                          </>
                                                        )
                                                      })}
                                                    </div>
                                                    : ''}
                                                </ReactMapGL>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        :

                                        lifestyleView === 'Tile' && masterLiving3 && lifestyleDropdown === 'Pubs' ?

                                          <div className='selection-detail'>
                                            <div className='lifestyle-map'>
                                              <div className='mobile-content'>
                                                <div className='content-section'>
                                                  <div className='map-list-title'>
                                                    {masterLiving3 ?
                                                      masterLiving3.map((city, index) => {
                                                        return (
                                                          <>
                                                            <div className='sub-title'>
                                                              <h1 key={index}>{city.pubs.length} total pubs</h1>
                                                              <div className='icon-selector-section'>
                                                                <div className='icon-selector'>
                                                                  <div className='table-icon' onClick={(e) => setLifestyleView('Table')} ></div>

                                                                </div>
                                                                <div className='icon-selector'>
                                                                  <div className='grid-icon' onClick={(e) => setLifestyleView('Tile')} ></div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                            <ReactPaginate
                                                              pageCount={Math.ceil(city.pubs.length / 50)}
                                                              onPageChange={handlePageClick}
                                                              containerClassName={'pagination'}
                                                              activeClassName={'active'}
                                                              previousLabel={'<'}
                                                              nextLabel={'>'}
                                                              pageRangeDisplayed={0}
                                                              breakLabel={'...'}
                                                            />
                                                            <div className='item-list'>
                                                              {city.pubs.map((item, index) => {
                                                                return (
                                                                  <>
                                                                    <div className='item' id={item.id} key={index}>
                                                                      <div className='item-left'>
                                                                        <h1>Image</h1>
                                                                      </div>
                                                                      <div className='item-right' id={item.id}>
                                                                        <h1>{index + 1} - {item.Pub_name}</h1>
                                                                        {/* <h3>🍽 {item.master_cuisine}</h3> */}
                                                                        <h3>📈 {item.Pub_category}</h3>
                                                                      </div>
                                                                    </div>
                                                                    <hr />
                                                                  </>
                                                                )
                                                              }).slice(startIndex, endIndex)}
                                                            </div>
                                                          </>
                                                        )
                                                      })
                                                      : ''}
                                                  </div>
                                                </div>
                                                <div className='map-section'>
                                                  <ReactMapGL {...viewport}
                                                    mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                                                    mapStyle='mapbox://styles/mapbox/streets-v12'
                                                    onViewportChange={viewport => {
                                                      setViewport(viewport)
                                                    }}
                                                    center={viewport}
                                                    onMove={evt => setViewport(evt.viewport)}
                                                    className='profile-map'>
                                                    {masterLiving3 ?
                                                      <div className='icon-wrapper'>
                                                        {masterLiving3.map((city, index) => {
                                                          return (
                                                            <>
                                                              {lifestyleDropdown === 'Pubs' ?
                                                                <div className='poi-icons' key={index}>
                                                                  {city.pubs.map((icon, index) => {
                                                                    return (
                                                                      <div key={icon._id}>
                                                                        <Marker id={icon.id} longitude={icon.long} latitude={icon.Lat}>
                                                                          <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                                                            {index + 1}
                                                                          </div>
                                                                        </Marker>
                                                                        {(showPopup & icon.id === iconId) && (
                                                                          <Popup key={index} id={icon.id} longitude={icon.long} latitude={icon.Lat} closeOnClick={false}>
                                                                            <h1>{index + 1} - {icon.Pub_name}</h1>
                                                                          </Popup>
                                                                        )}
                                                                      </div>
                                                                    )
                                                                  }).slice(startIndex, endIndex)}
                                                                </div>
                                                                : ''}
                                                            </>
                                                          )
                                                        })}
                                                      </div>
                                                      : ''}
                                                  </ReactMapGL>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          :

                                          lifestyleView === 'Tile' && masterLiving3 && lifestyleDropdown === 'Takeaways' ?

                                            <div className='selection-detail'>
                                              <div className='lifestyle-map'>
                                                <div className='mobile-content'>
                                                  <div className='content-section'>
                                                    <div className='map-list-title'>
                                                      {masterLiving3 ?
                                                        masterLiving3.map((city, index) => {
                                                          return (
                                                            <>
                                                              <div className='sub-title'>
                                                                <h1 key={index}>{city.takeaways.length} total takeaways</h1>
                                                                <div className='icon-selector-section'>
                                                                  <div className='icon-selector'>
                                                                    <div className='table-icon' onClick={(e) => setLifestyleView('Table')} ></div>

                                                                  </div>
                                                                  <div className='icon-selector'>
                                                                    <div className='grid-icon' onClick={(e) => setLifestyleView('Tile')} ></div>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                              <ReactPaginate
                                                                pageCount={Math.ceil(city.takeaways.length / 50)}
                                                                onPageChange={handlePageClick}
                                                                containerClassName={'pagination'}
                                                                activeClassName={'active'}
                                                                previousLabel={'<'}
                                                                nextLabel={'>'}
                                                                pageRangeDisplayed={0}
                                                                breakLabel={'...'}
                                                              />
                                                              <div className='item-list'>
                                                                {city.takeaways.map((item, index) => {
                                                                  return (
                                                                    <>
                                                                      <div className='item' id={item.id} key={index}>
                                                                        <div className='item-left'>
                                                                          <h1>Image</h1>
                                                                        </div>
                                                                        <div className='item-right' id={item.id}>
                                                                          <h1>{index + 1} - {item.name}</h1>
                                                                          <h3>🍽 {item.cuisine}</h3>
                                                                          <h3>📈 {item.wittle_rating}/ 10</h3>
                                                                        </div>
                                                                      </div>
                                                                      <hr />
                                                                    </>
                                                                  )
                                                                }).slice(startIndex, endIndex)}
                                                              </div>
                                                            </>
                                                          )
                                                        })
                                                        : ''}
                                                    </div>
                                                  </div>
                                                  <div className='map-section'>
                                                    <ReactMapGL {...viewport}
                                                      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                                                      mapStyle='mapbox://styles/mapbox/streets-v12'
                                                      onViewportChange={viewport => {
                                                        setViewport(viewport)
                                                      }}
                                                      center={viewport}
                                                      onMove={evt => setViewport(evt.viewport)}
                                                      className='profile-map'>
                                                      {masterLiving3 ?
                                                        <div className='icon-wrapper'>
                                                          {masterLiving3.map((city, index) => {
                                                            return (
                                                              <>
                                                                {lifestyleDropdown === 'Takeaways' ?
                                                                  <div className='poi-icons' key={index}>
                                                                    {city.takeaways.map((icon, index) => {
                                                                      return (
                                                                        <div key={icon._id}>
                                                                          <Marker id={icon.id} longitude={icon.long} latitude={icon.lat}>
                                                                            <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                                                              {index + 1}
                                                                            </div>
                                                                          </Marker>
                                                                          {(showPopup & icon.id === iconId) && (
                                                                            <Popup key={index} id={icon.id} longitude={icon.long} latitude={icon.lat} closeOnClick={false}>
                                                                              <h1 style={{ color: '#051885' }}>{index + 1} - {icon.name}</h1>
                                                                            </Popup>
                                                                          )}
                                                                        </div>
                                                                      )
                                                                    }).slice(startIndex, endIndex)}
                                                                  </div>
                                                                  : ''}
                                                              </>
                                                            )
                                                          })}
                                                        </div>
                                                        : ''}
                                                    </ReactMapGL>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            :

                                            lifestyleView === 'Tile' && masterLiving3 && lifestyleDropdown === 'Gyms' ?

                                              <div className='selection-detail'>
                                                <div className='lifestyle-map'>
                                                  <div className='mobile-content'>
                                                    <div className='content-section'>
                                                      <div className='map-list-title'>
                                                        {masterLiving3 ?
                                                          masterLiving3.map((city, index) => {
                                                            return (
                                                              <>
                                                                <div className='sub-title'>
                                                                  <h1 key={index}>{city.gyms.length} total gyms</h1>
                                                                  <div className='icon-selector-section'>
                                                                    <div className='icon-selector'>
                                                                      <div className='table-icon' onClick={(e) => setLifestyleView('Table')} ></div>

                                                                    </div>
                                                                    <div className='icon-selector'>
                                                                      <div className='grid-icon' onClick={(e) => setLifestyleView('Tile')} ></div>
                                                                    </div>
                                                                  </div>
                                                                </div>
                                                                <ReactPaginate
                                                                  pageCount={Math.ceil(city.gyms.length / 50)}
                                                                  onPageChange={handlePageClick}
                                                                  containerClassName={'pagination'}
                                                                  activeClassName={'active'}
                                                                  previousLabel={'<'}
                                                                  nextLabel={'>'}
                                                                  pageRangeDisplayed={0}
                                                                  breakLabel={'...'}
                                                                />
                                                                <div className='item-list'>
                                                                  {city.gyms.map((item, index) => {
                                                                    return (
                                                                      <>
                                                                        <div className='item' id={item.id} key={index}>
                                                                          <div className='item-left'>
                                                                            <div className='icon-image' style={{ backgroundImage: `url('${item.image_url}')` }}></div>
                                                                          </div>
                                                                          <div className='item-right' id={item.id}>
                                                                            <h1>{index + 1} - {item.gym_name}</h1>
                                                                            <h3>🏋️‍♂️ {item.class_type}</h3>
                                                                            {/* <h3>📈 {item.wittle_rating}/ 10</h3> */}
                                                                          </div>
                                                                        </div>
                                                                        <hr />
                                                                      </>
                                                                    )
                                                                  }).slice(startIndex, endIndex)}
                                                                </div>
                                                              </>
                                                            )
                                                          })
                                                          : ''}
                                                      </div>
                                                    </div>
                                                    <div className='map-section'>
                                                      <ReactMapGL {...viewport}
                                                        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                                                        mapStyle='mapbox://styles/mapbox/streets-v12'
                                                        onViewportChange={viewport => {
                                                          setViewport(viewport)
                                                        }}
                                                        center={viewport}
                                                        onMove={evt => setViewport(evt.viewport)}
                                                        className='profile-map'>
                                                        {masterLiving3 ?
                                                          <div className='icon-wrapper'>
                                                            {masterLiving3.map((city, index) => {
                                                              return (
                                                                <>
                                                                  {lifestyleDropdown === 'Gyms' ?
                                                                    <div className='poi-icons' key={index}>
                                                                      {city.gyms.map((icon, index) => {
                                                                        return (
                                                                          <div key={icon._id}>
                                                                            <Marker id={icon.id} longitude={icon.long} latitude={icon.Lat}>
                                                                              <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                                                                {index + 1}
                                                                              </div>
                                                                            </Marker>
                                                                            {(showPopup & icon.id === iconId) && (
                                                                              <Popup key={index} id={icon.id} longitude={icon.long} latitude={icon.Lat} closeOnClick={false} className='icon-popup'>
                                                                                <div className='top-box'>
                                                                                  <div className='icon-image' style={{ backgroundImage: `url('${icon.image_url}')` }}></div>
                                                                                </div>
                                                                                <div className='bottom-box'>
                                                                                  <h1>{index + 1} - {icon.gym_name}</h1>
                                                                                  <h3>📈 {icon.class_type}</h3>
                                                                                  <a href={icon.url} target='_blank' rel='noopener noreferrer' style={{ color: '#FFA7E5', textDecoration: 'none', fontWeight: 'bold' }}>👀 Visit website</a>
                                                                                </div>
                                                                              </Popup>
                                                                            )}
                                                                          </div>
                                                                        )
                                                                      }).slice(startIndex, endIndex)}
                                                                    </div>
                                                                    : ''}
                                                                </>
                                                              )
                                                            })}
                                                          </div>
                                                          : ''}
                                                      </ReactMapGL>
                                                    </div>
                                                  </div>
                                                </div>
                                              </div>

                                              :

                                              lifestyleView === 'Tile' && masterLiving3 && lifestyleDropdown === 'Primary schools' ?

                                                <div className='selection-detail'>
                                                  <div className='lifestyle-map'>
                                                    <div className='mobile-content'>
                                                      <div className='content-section'>
                                                        <div className='map-list-title'>
                                                          {masterLiving3 ?
                                                            masterLiving3.map((city, index) => {
                                                              return (
                                                                <>
                                                                  <div className='sub-title'>
                                                                    <h1 key={index}>{city.primaries.length} total primary schools</h1>
                                                                    <div className='icon-selector-section'>
                                                                      <div className='icon-selector'>
                                                                        <div className='table-icon' onClick={(e) => setLifestyleView('Table')} ></div>

                                                                      </div>
                                                                      <div className='icon-selector'>
                                                                        <div className='grid-icon' onClick={(e) => setLifestyleView('Tile')} ></div>
                                                                      </div>
                                                                    </div>
                                                                  </div>
                                                                  <ReactPaginate
                                                                    pageCount={Math.ceil(city.primaries.length / 50)}
                                                                    onPageChange={handlePageClick}
                                                                    containerClassName={'pagination'}
                                                                    activeClassName={'active'}
                                                                    previousLabel={'<'}
                                                                    nextLabel={'>'}
                                                                    pageRangeDisplayed={0}
                                                                    breakLabel={'...'}
                                                                  />
                                                                  <div className='item-list'>
                                                                    {city.primaries.map((item, index) => {
                                                                      return (
                                                                        <>
                                                                          <div className='item' id={item.id} key={index}>
                                                                            <div className='item-left'>
                                                                              <h1>Image</h1>
                                                                            </div>
                                                                            <div className='item-right' id={item.id}>
                                                                              <h1>{index + 1} - {item.school_name}</h1>
                                                                              <h3>🎓 Ofsted: {item.ofsted_results}</h3>
                                                                              {/* <h3>📈 {item.wittle_rating}/ 10</h3> */}
                                                                            </div>
                                                                          </div>
                                                                          <hr />
                                                                        </>
                                                                      )
                                                                    }).slice(startIndex, endIndex)}
                                                                  </div>
                                                                </>
                                                              )
                                                            })
                                                            : ''}
                                                        </div>
                                                      </div>
                                                      <div className='map-section'>
                                                        <ReactMapGL {...viewport}
                                                          mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                                                          mapStyle='mapbox://styles/mapbox/streets-v12'
                                                          onViewportChange={viewport => {
                                                            setViewport(viewport)
                                                          }}
                                                          center={viewport}
                                                          onMove={evt => setViewport(evt.viewport)}
                                                          className='profile-map'>
                                                          {masterLiving3 ?
                                                            <div className='icon-wrapper'>
                                                              {masterLiving3.map((city, index) => {
                                                                return (
                                                                  <>
                                                                    {lifestyleDropdown === 'Primary schools' ?
                                                                      <div className='poi-icons' key={index}>
                                                                        {city.primaries.map((icon, index) => {
                                                                          return (
                                                                            <div key={icon._id}>
                                                                              <Marker id={icon.id} longitude={icon.long} latitude={icon.lat}>
                                                                                <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                                                                  {index + 1}
                                                                                </div>
                                                                              </Marker>
                                                                              {(showPopup & icon.id === iconId) && (
                                                                                <Popup key={index} id={icon.id} longitude={icon.long} latitude={icon.lat} closeOnClick={false}>
                                                                                  <h1 style={{ color: '#051885' }}>{index + 1} - {icon.school_name}</h1>
                                                                                </Popup>
                                                                              )}
                                                                            </div>
                                                                          )
                                                                        }).slice(startIndex, endIndex)}
                                                                      </div>
                                                                      : ''}
                                                                  </>
                                                                )
                                                              })}
                                                            </div>
                                                            : ''}
                                                        </ReactMapGL>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>

                                                :

                                                lifestyleView === 'Tile' && masterLiving3 && lifestyleDropdown === 'Secondary schools' ?

                                                  <div className='selection-detail'>
                                                    <div className='lifestyle-map'>
                                                      <div className='mobile-content'>
                                                        <div className='content-section'>
                                                          <div className='map-list-title'>
                                                            {masterLiving3 ?
                                                              masterLiving3.map((city, index) => {
                                                                return (
                                                                  <>
                                                                    <div className='sub-title'>
                                                                      <h1 key={index}>{city.secondaries.length} total secondary schools</h1>
                                                                      <div className='icon-selector-section'>
                                                                        <div className='icon-selector'>
                                                                          <div className='table-icon' onClick={(e) => setLifestyleView('Table')} ></div>

                                                                        </div>
                                                                        <div className='icon-selector'>
                                                                          <div className='grid-icon' onClick={(e) => setLifestyleView('Tile')} ></div>
                                                                        </div>
                                                                      </div>
                                                                    </div>                                                    <ReactPaginate
                                                                      pageCount={Math.ceil(city.secondaries.length / 50)}
                                                                      onPageChange={handlePageClick}
                                                                      containerClassName={'pagination'}
                                                                      activeClassName={'active'}
                                                                      previousLabel={'<'}
                                                                      nextLabel={'>'}
                                                                      pageRangeDisplayed={0}
                                                                      breakLabel={'...'}
                                                                    />
                                                                    <div className='item-list'>
                                                                      {city.secondaries.map((item, index) => {
                                                                        return (
                                                                          <>
                                                                            <div className='item' id={item.id} key={index}>
                                                                              <div className='item-left'>
                                                                                <h1>Image</h1>
                                                                              </div>
                                                                              <div className='item-right' id={item.id}>
                                                                                <h1>{index + 1} - {item.school_name}</h1>
                                                                                <h3>🎓 Ofsted: {item.ofsted_results}</h3>
                                                                                {/* <h3>📈 {item.wittle_rating}/ 10</h3> */}
                                                                              </div>
                                                                            </div>
                                                                            <hr />
                                                                          </>
                                                                        )
                                                                      }).slice(startIndex, endIndex)}
                                                                    </div>
                                                                  </>
                                                                )
                                                              })
                                                              : ''}
                                                          </div>
                                                        </div>
                                                        <div className='map-section'>
                                                          <ReactMapGL {...viewport}
                                                            mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                                                            mapStyle='mapbox://styles/mapbox/streets-v12'
                                                            onViewportChange={viewport => {
                                                              setViewport(viewport)
                                                            }}
                                                            center={viewport}
                                                            onMove={evt => setViewport(evt.viewport)}
                                                            className='profile-map'>
                                                            {masterLiving3 ?
                                                              <div className='icon-wrapper'>
                                                                {masterLiving3.map((city, index) => {
                                                                  return (
                                                                    <>
                                                                      {lifestyleDropdown === 'Secondary schools' ?
                                                                        <div className='poi-icons' key={index}>
                                                                          {city.secondaries.map((icon, index) => {
                                                                            return (
                                                                              <div key={icon._id}>
                                                                                <Marker id={icon.id} longitude={icon.long} latitude={icon.lat}>
                                                                                  <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                                                                    {index + 1}
                                                                                  </div>
                                                                                </Marker>
                                                                                {(showPopup & icon.id === iconId) && (
                                                                                  <Popup key={index} id={icon.id} longitude={icon.long} latitude={icon.lat} closeOnClick={false}>
                                                                                    <h1 style={{ color: '#051885' }}>{index + 1} - {icon.school_name}</h1>
                                                                                  </Popup>
                                                                                )}
                                                                              </div>
                                                                            )
                                                                          }).slice(startIndex, endIndex)}
                                                                        </div>
                                                                        : ''}
                                                                    </>
                                                                  )
                                                                })}
                                                              </div>
                                                              : ''}
                                                          </ReactMapGL>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>

                                                  :

                                                  lifestyleView === 'Tile' && masterLiving3 && lifestyleDropdown === '6th forms' ?

                                                    <div className='selection-detail'>
                                                      <div className='lifestyle-map'>
                                                        <div className='mobile-content'>
                                                          <div className='content-section'>
                                                            <div className='map-list-title'>
                                                              {masterLiving3 ?
                                                                masterLiving3.map((city, index) => {
                                                                  return (
                                                                    <>
                                                                      <div className='sub-title'>
                                                                        <h1 key={index}>{city.colleges.length} total 6th form colleges</h1>
                                                                        <div className='icon-selector-section'>
                                                                          <div className='icon-selector'>
                                                                            <div className='table-icon' onClick={(e) => setLifestyleView('Table')} ></div>

                                                                          </div>
                                                                          <div className='icon-selector'>
                                                                            <div className='grid-icon' onClick={(e) => setLifestyleView('Tile')} ></div>
                                                                          </div>
                                                                        </div>
                                                                      </div>
                                                                      <ReactPaginate
                                                                        pageCount={Math.ceil(city.colleges.length / 50)}
                                                                        onPageChange={handlePageClick}
                                                                        containerClassName={'pagination'}
                                                                        activeClassName={'active'}
                                                                        previousLabel={'<'}
                                                                        nextLabel={'>'}
                                                                        pageRangeDisplayed={0}
                                                                        breakLabel={'...'}
                                                                      />
                                                                      <div className='item-list'>
                                                                        {city.colleges.map((item, index) => {
                                                                          return (
                                                                            <>
                                                                              <div className='item' id={item.id} key={index}>
                                                                                <div className='item-left'>
                                                                                  <h1>Image</h1>
                                                                                </div>
                                                                                <div className='item-right' id={item.id}>
                                                                                  <h1>{index + 1} - {item.school_name}</h1>
                                                                                  <h3>🎓 Ofsted: {item.ofsted_results}</h3>
                                                                                  {/* <h3>📈 {item.wittle_rating}/ 10</h3> */}
                                                                                </div>
                                                                              </div>
                                                                              <hr />
                                                                            </>
                                                                          )
                                                                        }).slice(startIndex, endIndex)}
                                                                      </div>
                                                                    </>
                                                                  )
                                                                })
                                                                : ''}
                                                            </div>
                                                          </div>
                                                          <div className='map-section'>
                                                            <ReactMapGL {...viewport}
                                                              mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                                                              mapStyle='mapbox://styles/mapbox/streets-v12'
                                                              onViewportChange={viewport => {
                                                                setViewport(viewport)
                                                              }}
                                                              center={viewport}
                                                              onMove={evt => setViewport(evt.viewport)}
                                                              className='profile-map'>
                                                              {masterLiving3 ?
                                                                <div className='icon-wrapper'>
                                                                  {masterLiving3.map((city, index) => {
                                                                    return (
                                                                      <>
                                                                        {lifestyleDropdown === '6th forms' ?
                                                                          <div className='poi-icons' key={index}>
                                                                            {city.colleges.map((icon, index) => {
                                                                              return (
                                                                                <div key={icon._id}>
                                                                                  <Marker id={icon.id} longitude={icon.long} latitude={icon.lat}>
                                                                                    <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                                                                      {index + 1}
                                                                                    </div>
                                                                                  </Marker>
                                                                                  {(showPopup & icon.id === iconId) && (
                                                                                    <Popup key={index} id={icon.id} longitude={icon.long} latitude={icon.lat} closeOnClick={false}>
                                                                                      <h1 style={{ color: '#051885' }}>{index + 1} - {icon.school_name}</h1>
                                                                                    </Popup>
                                                                                  )}
                                                                                </div>
                                                                              )
                                                                            }).slice(startIndex, endIndex)}
                                                                          </div>
                                                                          : ''}
                                                                      </>
                                                                    )
                                                                  })}
                                                                </div>
                                                                : ''}
                                                            </ReactMapGL>
                                                          </div>
                                                        </div>
                                                      </div>
                                                    </div>

                                                    :

                                                    ''}




      </div>
    </>
  )

}

export default ProfileLifestyle