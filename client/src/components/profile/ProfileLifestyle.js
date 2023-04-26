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
import LifestyleDropdowns from './lifestyleComponents/LifestyleDropdowns'
import TableView from './lifestyleComponents/TableView'
import TileView from './lifestyleComponents/TileView'
import MapView from './lifestyleComponents/MapView'


const ProfileLifestyle = ({ masterLiving3, lifestyleChange, lifestyleChange2, lifestyleDropdown, restaurantDropdown, restaurantCuisineChange, restaurantCuisineChange2,
  ratingFilter, pubCategory, pubChange, pubChange2, ratingChange, gymStudioChange, gymStudioChange2, gymType, takeawayCuisineChange, takeawayCuisineChange2, takeawayCuisine,
  ratingChange2, takeawayRating, schoolRating, schoolState, secondaryState, schoolRating2, collegeState, schoolRating3, schoolRating4, schoolRating5, schoolRating6, loading,
  lifestyleView, setLifestyleView, startIndex, endIndex, iconSetting, handlePageClick, iconId, showPopup, viewport, setViewport, lifestyleLong, lifestyleLat }) => {


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

  // action when clicking the map button to show the map
  const mapSelect = (e) => {
    if (lifestyleLat) {
      setViewport({
        latitude: lifestyleLat,
        longitude: lifestyleLong,
        zoom: 12,
      })
    } else {
      setViewport({
        latitude: 51.515419,
        longitude: -0.141099,
        zoom: 10.5,
      })
    }
    setLifestyleView('Map')
  }


  return (
    <>
      <div className='lifestyle-table'>
        {/* Dropdown section at the top of the page */}
        <div className='table-filters'>
          <LifestyleDropdowns
            title={'Lifestyle feature'}
            options={lifestyleList}
            values={lifestyleDropdown}
            onChangeDesktop={lifestyleChange}
            onChangeMobile={lifestyleChange2}
            array={lifestyle}
          />

          {lifestyleDropdown === 'Restaurants' ?
            <LifestyleDropdowns
              title={'Cuisine'}
              options={restaurantList}
              values={restaurantDropdown}
              onChangeDesktop={restaurantCuisineChange}
              onChangeMobile={restaurantCuisineChange2}
              array={restaurants}
            />

            : lifestyleDropdown === 'Pubs' ?
              <LifestyleDropdowns
                title={'Pub category'}
                options={pubList}
                values={pubCategory}
                onChangeDesktop={pubChange}
                onChangeMobile={pubChange2}
                array={pubs}
              />
              : lifestyleDropdown === 'Gyms' ?
                <LifestyleDropdowns
                  title={'Gym type'}
                  options={gymList}
                  values={gymType}
                  onChangeDesktop={gymStudioChange}
                  onChangeMobile={gymStudioChange2}
                  array={gyms}
                />
                : lifestyleDropdown === 'Takeaways' ?
                  <LifestyleDropdowns
                    title={'Cuisine'}
                    options={takeawayList}
                    values={takeawayCuisine}
                    onChangeDesktop={takeawayCuisineChange}
                    onChangeMobile={takeawayCuisineChange2}
                    array={takeaway}
                  />

                  : lifestyleDropdown === 'Primary schools' ?
                    <LifestyleDropdowns
                      title={'Ofsted rating'}
                      options={ofstedList}
                      values={schoolState}
                      onChangeDesktop={schoolRating}
                      onChangeMobile={schoolRating4}
                      array={ofsted}
                    />

                    : lifestyleDropdown === 'Secondary schools' ?
                      <LifestyleDropdowns
                        title={'Ofsted rating'}
                        options={ofstedList}
                        values={secondaryState}
                        onChangeDesktop={schoolRating2}
                        onChangeMobile={schoolRating5}
                        array={ofsted}
                      />
                      : lifestyleDropdown === '6th forms' ?
                        <LifestyleDropdowns
                          title={'Ofsted rating'}
                          options={ofstedList}
                          values={collegeState}
                          onChangeDesktop={schoolRating3}
                          onChangeMobile={schoolRating6}
                          array={ofsted}
                        />
                        :
                        ''
          }

          {/* Section for sliders */}
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
        </div>
        {loading ?

          <section className='loading-screen'>
            <Loading />
          </section>

          // Section for the tables
          :

          lifestyleView === 'Table' && masterLiving3 && lifestyleDropdown === 'Restaurants' ?
            <TableView
              masterLiving3={masterLiving3}
              variableValue='restaurants'
              mapSelect={mapSelect}
              setLifestyleView={setLifestyleView}
              column2Title='Name'
              column2Detail='restaurant_name'
              column3Title='Cuisines'
              column3Detail='master_cuisine'
              column4Title='Rating'
              column4Detail='rating'
              startIndex={startIndex}
              endIndex={endIndex}
              handlePageClick={handlePageClick}
            />

            :
            lifestyleView === 'Table' && masterLiving3 && lifestyleDropdown === 'Gyms' ?
              <TableView
                masterLiving3={masterLiving3}
                variableValue='gyms'
                mapSelect={mapSelect}
                setLifestyleView={setLifestyleView}
                column2Title='Studio'
                column2Detail='gym_name'
                column3Title='Studio offering'
                column3Detail='class_type'
                column4Title='Rating'
                column4Detail='rating'
                startIndex={startIndex}
                endIndex={endIndex}
                handlePageClick={handlePageClick}
              />

              :
              lifestyleView === 'Table' && masterLiving3 && lifestyleDropdown === 'Pubs' ?
                <TableView
                  masterLiving3={masterLiving3}
                  variableValue='pubs'
                  mapSelect={mapSelect}
                  setLifestyleView={setLifestyleView}
                  column2Title='Namee'
                  column2Detail='Pub_name'
                  column3Title='Category'
                  column3Detail='Pub_category'
                  column4Title=''
                  column4Detail=''
                  startIndex={startIndex}
                  endIndex={endIndex}
                  handlePageClick={handlePageClick}
                />

                :

                lifestyleView === 'Table' && masterLiving3 && lifestyleDropdown === 'Takeaways' ?
                  <TableView
                    masterLiving3={masterLiving3}
                    variableValue='takeaways'
                    mapSelect={mapSelect}
                    setLifestyleView={setLifestyleView}
                    column2Title='Name'
                    column2Detail='name'
                    column3Title='Cuisine'
                    column3Detail='cuisine'
                    column4Title='Rating'
                    column4Detail='wittle_rating'
                    startIndex={startIndex}
                    endIndex={endIndex}
                    handlePageClick={handlePageClick}
                  />
                  :

                  lifestyleView === 'Table' && masterLiving3 && lifestyleDropdown === 'Primary schools' ?
                    <TableView
                      masterLiving3={masterLiving3}
                      variableValue='primaries'
                      mapSelect={mapSelect}
                      setLifestyleView={setLifestyleView}
                      column2Title='Name'
                      column2Detail='school_name'
                      column3Title=''
                      column3Detail=''
                      column4Title='Ofsted rating'
                      column4Detail='ofsted_results'
                      startIndex={startIndex}
                      endIndex={endIndex}
                      handlePageClick={handlePageClick}
                    />

                    :
                    lifestyleView === 'Table' && lifestyleDropdown === 'Secondary schools' ?
                      <TableView
                        masterLiving3={masterLiving3}
                        variableValue='secondaries'
                        mapSelect={mapSelect}
                        setLifestyleView={setLifestyleView}
                        column2Title='Name'
                        column2Detail='school_name'
                        column3Title=''
                        column3Detail=''
                        column4Title='Ofsted rating'
                        column4Detail='ofsted_results'
                        startIndex={startIndex}
                        endIndex={endIndex}
                        handlePageClick={handlePageClick}
                      />
                      :
                      lifestyleView === 'Table' && lifestyleDropdown === '6th forms' ?
                        <TableView
                          masterLiving3={masterLiving3}
                          variableValue='colleges'
                          mapSelect={mapSelect}
                          setLifestyleView={setLifestyleView}
                          column2Title='Name'
                          column2Detail='school_name'
                          column3Title=''
                          column3Detail=''
                          column4Title='Ofsted rating'
                          column4Detail='ofsted_results'
                          startIndex={startIndex}
                          endIndex={endIndex}
                          handlePageClick={handlePageClick}
                        />
                        :
                        lifestyleView === 'Tile' && masterLiving3 && lifestyleDropdown === 'Restaurants' ?

                          <TileView
                            masterLiving3={masterLiving3}
                            variableValue='restaurants'
                            mapSelect={mapSelect}
                            setLifestyleView={setLifestyleView}
                            detail1='restaurant_name'
                            detail2='master_cuisine'
                            detail3='rating'
                            startIndex={startIndex}
                            endIndex={endIndex}
                            handlePageClick={handlePageClick}
                            viewport={viewport}
                            setViewport={setViewport}
                            dropdownValue='Restaurants'
                            lifestyleDropdown={lifestyleDropdown}
                            iconSetting={iconSetting}
                            iconId={iconId}
                            showPopup={showPopup}
                            lat='lat'
                          />
                          :

                          lifestyleView === 'Tile' && masterLiving3 && lifestyleDropdown === 'Pubs' ?
                            <TileView
                              masterLiving3={masterLiving3}
                              variableValue='pubs'
                              mapSelect={mapSelect}
                              setLifestyleView={setLifestyleView}
                              detail1='Pub_name'
                              detail2=''
                              detail3='Pub_category'
                              startIndex={startIndex}
                              endIndex={endIndex}
                              handlePageClick={handlePageClick}
                              viewport={viewport}
                              setViewport={setViewport}
                              dropdownValue='Pubs'
                              lifestyleDropdown={lifestyleDropdown}
                              iconSetting={iconSetting}
                              iconId={iconId}
                              showPopup={showPopup}
                              lat='Lat'
                            />
                            :

                            lifestyleView === 'Tile' && masterLiving3 && lifestyleDropdown === 'Takeaways' ?
                              <TileView
                                masterLiving3={masterLiving3}
                                variableValue='takeaways'
                                mapSelect={mapSelect}
                                setLifestyleView={setLifestyleView}
                                detail1='name'
                                detail2='cuisine'
                                detail3='wittle_rating'
                                startIndex={startIndex}
                                endIndex={endIndex}
                                handlePageClick={handlePageClick}
                                viewport={viewport}
                                setViewport={setViewport}
                                dropdownValue='Takeaways'
                                lifestyleDropdown={lifestyleDropdown}
                                iconSetting={iconSetting}
                                iconId={iconId}
                                showPopup={showPopup}
                                lat='lat'
                              />

                              :

                              lifestyleView === 'Tile' && masterLiving3 && lifestyleDropdown === 'Gyms' ?
                                <TileView
                                  masterLiving3={masterLiving3}
                                  variableValue='gyms'
                                  mapSelect={mapSelect}
                                  setLifestyleView={setLifestyleView}
                                  detail1='gym_name'
                                  detail2='class_type'
                                  detail3=''
                                  startIndex={startIndex}
                                  endIndex={endIndex}
                                  handlePageClick={handlePageClick}
                                  viewport={viewport}
                                  setViewport={setViewport}
                                  dropdownValue='Gyms'
                                  lifestyleDropdown={lifestyleDropdown}
                                  iconSetting={iconSetting}
                                  iconId={iconId}
                                  showPopup={showPopup}
                                  lat='Lat'
                                />
                                :
                                lifestyleView === 'Tile' && masterLiving3 && lifestyleDropdown === 'Primary schools' ?
                                  <TileView
                                    masterLiving3={masterLiving3}
                                    variableValue='primaries'
                                    mapSelect={mapSelect}
                                    setLifestyleView={setLifestyleView}
                                    detail1='school_name'
                                    detail2='ofsted_results'
                                    detail3=''
                                    startIndex={startIndex}
                                    endIndex={endIndex}
                                    handlePageClick={handlePageClick}
                                    viewport={viewport}
                                    setViewport={setViewport}
                                    dropdownValue='Primary schools'
                                    lifestyleDropdown={lifestyleDropdown}
                                    iconSetting={iconSetting}
                                    iconId={iconId}
                                    showPopup={showPopup}
                                    lat='lat'
                                  />
                                  :

                                  lifestyleView === 'Tile' && masterLiving3 && lifestyleDropdown === 'Secondary schools' ?

                                    <TileView
                                      masterLiving3={masterLiving3}
                                      variableValue='secondaries'
                                      mapSelect={mapSelect}
                                      setLifestyleView={setLifestyleView}
                                      detail1='school_name'
                                      detail2='ofsted_results'
                                      detail3=''
                                      startIndex={startIndex}
                                      endIndex={endIndex}
                                      handlePageClick={handlePageClick}
                                      viewport={viewport}
                                      setViewport={setViewport}
                                      dropdownValue='Secondary schools'
                                      lifestyleDropdown={lifestyleDropdown}
                                      iconSetting={iconSetting}
                                      iconId={iconId}
                                      showPopup={showPopup}
                                      lat='lat'
                                    />

                                    :

                                    lifestyleView === 'Tile' && masterLiving3 && lifestyleDropdown === '6th forms' ?

                                      <TileView
                                        masterLiving3={masterLiving3}
                                        variableValue='colleges'
                                        mapSelect={mapSelect}
                                        setLifestyleView={setLifestyleView}
                                        detail1='school_name'
                                        detail2='ofsted_results'
                                        detail3=''
                                        startIndex={startIndex}
                                        endIndex={endIndex}
                                        handlePageClick={handlePageClick}
                                        viewport={viewport}
                                        setViewport={setViewport}
                                        dropdownValue='6th forms'
                                        lifestyleDropdown={lifestyleDropdown}
                                        iconSetting={iconSetting}
                                        iconId={iconId}
                                        showPopup={showPopup}
                                        lat='lat'
                                      />


                                      // Section for Map detail on mobile
                                      :
                                      lifestyleView === 'Map' && masterLiving3 && lifestyleDropdown === 'Restaurants' ?
                                        <MapView
                                          masterLiving3={masterLiving3}
                                          variableValue='restaurants'
                                          setLifestyleView={setLifestyleView}
                                          detail1='restaurant_name'
                                          detail2='master_cuisine'
                                          detail3='rating'
                                          startIndex={startIndex}
                                          endIndex={endIndex}
                                          handlePageClick={handlePageClick}
                                          viewport={viewport}
                                          setViewport={setViewport}
                                          lifestyleDropdown={lifestyleDropdown}
                                          dropdownValue='Restaurants'
                                          iconSetting={iconSetting}
                                          iconId={iconId}
                                          showPopup={showPopup}
                                          lat='lat'
                                        />

                                        :

                                        lifestyleView === 'Map' && masterLiving3 && lifestyleDropdown === 'Pubs' ?
                                          <MapView
                                            masterLiving3={masterLiving3}
                                            variableValue='pubs'
                                            setLifestyleView={setLifestyleView}
                                            detail1='Pub_name'
                                            detail2=''
                                            detail3='Pub_category'
                                            startIndex={startIndex}
                                            endIndex={endIndex}
                                            handlePageClick={handlePageClick}
                                            viewport={viewport}
                                            setViewport={setViewport}
                                            dropdownValue='Pubs'
                                            lifestyleDropdown={lifestyleDropdown}
                                            iconSetting={iconSetting}
                                            iconId={iconId}
                                            showPopup={showPopup}
                                            lat='Lat'
                                          />

                                          :

                                          lifestyleView === 'Map' && masterLiving3 && lifestyleDropdown === 'Takeaways' ?

                                            <MapView
                                              masterLiving3={masterLiving3}
                                              variableValue='takeaways'
                                              setLifestyleView={setLifestyleView}
                                              detail1='name'
                                              detail2='cuisine'
                                              detail3='wittle_rating'
                                              startIndex={startIndex}
                                              endIndex={endIndex}
                                              handlePageClick={handlePageClick}
                                              viewport={viewport}
                                              setViewport={setViewport}
                                              dropdownValue='Takeaways'
                                              lifestyleDropdown={lifestyleDropdown}
                                              iconSetting={iconSetting}
                                              iconId={iconId}
                                              showPopup={showPopup}
                                              lat='lat'
                                            />
                                            :

                                            lifestyleView === 'Map' && masterLiving3 && lifestyleDropdown === 'Gyms' ?

                                              <MapView
                                                masterLiving3={masterLiving3}
                                                variableValue='gyms'
                                                setLifestyleView={setLifestyleView}
                                                detail1='gym_name'
                                                detail2='class_type'
                                                detail3=''
                                                startIndex={startIndex}
                                                endIndex={endIndex}
                                                handlePageClick={handlePageClick}
                                                viewport={viewport}
                                                setViewport={setViewport}
                                                dropdownValue='Gyms'
                                                lifestyleDropdown={lifestyleDropdown}
                                                iconSetting={iconSetting}
                                                iconId={iconId}
                                                showPopup={showPopup}
                                                lat='Lat'
                                              />

                                              :

                                              lifestyleView === 'Map' && masterLiving3 && lifestyleDropdown === 'Primary schools' ?

                                                <MapView
                                                  masterLiving3={masterLiving3}
                                                  variableValue='primaries'
                                                  setLifestyleView={setLifestyleView}
                                                  detail1='school_name'
                                                  detail2='ofsted_results'
                                                  detail3=''
                                                  startIndex={startIndex}
                                                  endIndex={endIndex}
                                                  handlePageClick={handlePageClick}
                                                  viewport={viewport}
                                                  setViewport={setViewport}
                                                  dropdownValue='Primary schools'
                                                  lifestyleDropdown={lifestyleDropdown}
                                                  iconSetting={iconSetting}
                                                  iconId={iconId}
                                                  showPopup={showPopup}
                                                  lat='lat'
                                                />

                                                :

                                                lifestyleView === 'Map' && masterLiving3 && lifestyleDropdown === 'Secondary schools' ?

                                                  <MapView
                                                    masterLiving3={masterLiving3}
                                                    variableValue='secondaries'
                                                    setLifestyleView={setLifestyleView}
                                                    detail1='school_name'
                                                    detail2='ofsted_results'
                                                    detail3=''
                                                    startIndex={startIndex}
                                                    endIndex={endIndex}
                                                    handlePageClick={handlePageClick}
                                                    viewport={viewport}
                                                    setViewport={setViewport}
                                                    dropdownValue='Secondary schools'
                                                    lifestyleDropdown={lifestyleDropdown}
                                                    iconSetting={iconSetting}
                                                    iconId={iconId}
                                                    showPopup={showPopup}
                                                    lat='lat'
                                                  />

                                                  :

                                                  lifestyleView === 'Map' && masterLiving3 && lifestyleDropdown === '6th forms' ?

                                                    <MapView
                                                      masterLiving3={masterLiving3}
                                                      variableValue='colleges'
                                                      setLifestyleView={setLifestyleView}
                                                      detail1='school_name'
                                                      detail2='ofsted_results'
                                                      detail3=''
                                                      startIndex={startIndex}
                                                      endIndex={endIndex}
                                                      handlePageClick={handlePageClick}
                                                      viewport={viewport}
                                                      setViewport={setViewport}
                                                      dropdownValue='6th forms'
                                                      lifestyleDropdown={lifestyleDropdown}
                                                      iconSetting={iconSetting}
                                                      iconId={iconId}
                                                      showPopup={showPopup}
                                                      lat='lat'
                                                    />

                                                    :

                                                    ''}




      </div>
    </>
  )

}

export default ProfileLifestyle