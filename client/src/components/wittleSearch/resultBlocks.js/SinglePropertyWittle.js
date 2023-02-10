import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useRef, useParams, useNavigate, Link } from 'react-router-dom'
import { getUserToken, getAccessToken, isUserAuth } from '../../auth/Auth'
import { Modal } from 'react-bootstrap'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { NumericFormat } from 'react-number-format'
import NavBar from '../../tools/NavBar'
import { ModalHover } from 'react-modal-hover'
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image'



const SinglePropertyWittle = () => {

  // state for switching page
  const { id } = useParams()

  // state to collect properties
  const [properties, setProperties] = useState()

  // state to collect properties
  const [restaurants, setRestaurants] = useState()

  // adsitional state for testing 
  const [localProp, setLocalProp] = useState()

  // adsitional state for testing 
  const [secondProp, setSecondProp] = useState()

  // calc1
  const [calc1, setCalc1] = useState()
  const [calc2, setCalc2] = useState()
  const [calc3, setCalc3] = useState()
  const [calc4, setCalc4] = useState()

  // match data
  const [match, setMatch] = useState()

  // state to collect the user information
  const [userData, setUserData] = useState([])

  // state for determining whether a property is favoruited
  const [listFavourites, setListFavourites] = useState()

  const [favouriteDetail, setFavouriteDetail] = useState()

  // state to enable navigation between pages
  const navigate = useNavigate()

  // set error state for capturing errors
  const [errors, setErrors] = useState(false)

  // set state for the contact button at bottom of the page
  const [contactButton, setContact] = useState('Closed')

  // states for handling the popups on the map
  const [showPopup, setShowPopup] = useState(true)
  const [iconId, setIconId] = useState()
  // const openDetail = () => setbuttonActive(!buttonActive)

  const iconSetting = (e) => {
    setShowPopup(true)
    console.log(showPopup)
    setIconId(parseInt(e.target.id))
    console.log(parseInt(e.target.id))
  }

  // states for filling out the form
  const [formData, setFormData] = useState({
    start_search: true,
    search_name: '',
    restaurant_selection: false,
    restaurant_decision: '',
    restaurant_distance: 0,
    restaurant_cuisine_1: '',
    restaurant_cuisine_2: '',
    takeaway_selection: false,
    takeaway_decision: '',
    takeaway_distance: 0,
    takeaway_cuisine_1: '',
    takeaway_cuisine_2: '',
    pubs_selection: false,
    pubs_distance: 0,
    cafes_selection: '',
    cafes_decision: '',
    cafes_detail: '',
    cafes_distance: 0,
    tube_selection: false,
    tube_decision: '',
    tube_detail: '',
    tube_distance: 0,
    train_selection: false,
    train_decision: '',
    train_detail: '',
    train_distance: 0,
    primary_selection: false,
    primary_religion: '',
    primary_mode: '',
    primary_distance: 0,
    college_selection: false,
    college_religion: '',
    college_mode: '',
    college_distance: 0,
    secondary_selection: false,
    secondary_religion: '',
    secondary_mode: '',
    secondary_distance: 0,
    supermarket_selection: false,
    supermarket_decision: '',
    supermarket_segment: '',
    supermarket_size: '',
    supermarket_distance: 0,
    gym_selection: false,
    gym_studio_name: '',
    gym_class_type: '',
    gym_distance: 0,
    park_selection: false,
    park_type: '',
    park_distance: 0,
    workplace_selection: false,
    workplace_detail: '',
    workplace_transport: '',
    workplace_distance: 0,
    family_selection: false,
    family_detail_1: '',
    family_distance_1: 0,
    family_detail_2: '',
    family_distance_2: 0,
    family_detail_3: '',
    family_distance_3: 0,
    property_price_min: '',
    property_price_max: '',
    property_bed_min: '',
    property_bed_max: '',
    property_type: '',
  })

  // set states for proeprty detail buttons
  const [propertyButtons, setPropertyButtons] = useState('Details')

  // set states for proeprty detail buttons
  const [poiButtons, setPOIButtons] = useState({
    selection: 'Restaurants',
  })

  // settng state for tracking the form nputs to arrive at this page
  const [formInputs, setFormInputs] = useState()

  // set state for the image values
  const [imageTracking, setImageTracking] = useState(1)

  // define state for currenmt image
  const [currentImage, setCurrentImage] = useState()

  // ? Section 2: Load in property
  // define function for extracting property from database
  const getProperties = async () => {
    if (isUserAuth()) {
      try {
        const { data } = await axios.get(`/api/properties/results/${id}/`)
        setProperties(data)
        // setRestaurants(data.property_name)
        console.log('property data ->', data)
        // console.log('restaurant data ->', data.property_name)
      } catch (error) {
        setErrors(true)
        console.log(error)
      }
    } else {
      navigate('/access-denied')
    }
  }

  // load in properties
  useEffect(() => {
    getProperties()
  }, [])


  // ? Section 3: Loading in user data and determining whether current property is favourited
  // Section 2: Step 1 - load in user information so w can extract th latest search
  const loadUserData = async () => {
    if (isUserAuth())
      try {
        const { data } = await axios.get(`/api/auth/profile/${getUserToken()}/`, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        setUserData(data)
        console.log('userdata ->', data)
        setListFavourites(data.favourites)
        console.log('favourites ->', data.favourites)
      } catch (error) {
        setErrors(true)
        console.log(error)
      }
    else
      try {
        const { data } = await axios.get('/api/auth/profile/xplw7aq5r/AdminData/')
        setUserData(data)
        console.log('userdata ->', data)
        const favouriteList = []
        data.favourites.forEach(item => favouriteList.includes(item.property) ? '' : favouriteList.push(item.property))
        setListFavourites(favouriteList)
      } catch (error) {
        setErrors(true)
        console.log(error)
      }
  }

  // load in user data
  useEffect(() => {
    if (properties)
      loadUserData()
  }, [properties])


  // Step 2: Extract the dtail for the faviurite so we can use the match score if it exists
  const matchFilter = () => {
    const calculation =
      listFavourites.filter(favourite => {
        return (favourite.property === properties[0].id)
      })
    setFavouriteDetail(calculation)
    console.log('this property favourite ->', calculation)
  }

  // run calculatoin
  useEffect(() => {
    if (listFavourites)
      matchFilter()
  }, [listFavourites])

  // Step 3: Set a value for the matcvh score based on whether the property is favourited or not
  const matchExtraction = () => {
    const data = JSON.parse(localStorage.getItem('wittle-current-match'))
    if (favouriteDetail.length > 0) {
      setMatch(favouriteDetail[0].total_score)
      console.log('match score ->', favouriteDetail[0].total_score)
    } else if (data) {
      setMatch(data)
      console.log('match score ->', data)
    } else {
      setMatch('NA')
      console.log('match data unavailable')
    }
  }

  // run match calculation
  useEffect(() => {
    if (favouriteDetail)
      matchExtraction()
  }, [favouriteDetail])

  // get form data from storage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('wittle-form-input'))
    if (data) setFormData(data)
  }, [])


  // ? Section 4: Setting the form values to be shown on screen
  // if a user arrives on the property through the normal search, then data will be taken from storage. If they come from favourites, the data will come from the favourite model
  const searchInputs = () => {
    if (favouriteDetail.length > 0) {
      const inputData =
      {
        restaurant_input: favouriteDetail[0].restaurant_input,
        takeaway_input: favouriteDetail[0].takeaway_input,
        pubs_input: favouriteDetail[0].pubs_input,
        cafes_input: favouriteDetail[0].cafes_input,
        tube_input: favouriteDetail[0].tube_input,
        train_input: favouriteDetail[0].train_input,
        primary_input: favouriteDetail[0].primary_input,
        secondary_input: favouriteDetail[0].secondary_input,
        college_input: favouriteDetail[0].college_input,
        supermarket_input: favouriteDetail[0].supermarket_input,
        gym_input: favouriteDetail[0].gym_input,
        park_input: favouriteDetail[0].park_input,
        workplace_input: favouriteDetail[0].workplace_input,
        friends_input: favouriteDetail[0].friends_input,
      }
      setFormInputs(inputData)
      console.log('input data ->', inputData)
    } else {
      const inputData =
      {
        restaurant_input: formData.restaurant_distance,
        takeaway_input: formData.takeaway_distance,
        pubs_input: formData.pubs_distance,
        cafes_input: formData.cafes_distance,
        tube_input: formData.tube_distance,
        train_input: formData.train_distance,
        primary_input: formData.primary_distance,
        secondary_input: formData.secondary_distance,
        college_input: formData.college_distance,
        supermarket_input: formData.supermarket_distance,
        gym_input: formData.gym_distance,
        park_input: formData.park_distance,
        workplace_input: formData.workplace_distance,
        friends_input: formData.family_distance_1,
      }
      setFormInputs(inputData)
      console.log('input data ->', inputData)
    }
  }

  // run input calculation
  useEffect(() => {
    if (favouriteDetail)
      searchInputs()
  }, [favouriteDetail])

  // ? Calculation section for lookup values in the data - we need 4 of these based on only one being used for each set of valuees that need to be adjusted
  // 
  const calculation1 = () => {
    const calculation =
      properties.map(property => {
        return {
          ...property,
          restaurants: property.restaurants.map(restaurant => {
            return (restaurant.cuisine_value === 0) ? { ...restaurant, cuisine: 'Indian' } : (restaurant.cuisine_value === 1) ? { ...restaurant, cuisine: 'British' } : (restaurant.cuisine_value === 2) ? { ...restaurant, cuisine: 'American' } : (restaurant.cuisine_value === 3) ? { ...restaurant, cuisine: 'French' } : (restaurant.cuisine_value === 4) ? { ...restaurant, cuisine: 'European' } :
              (restaurant.cuisine_value === 5) ? { ...restaurant, cuisine: 'Spanish' } : (restaurant.cuisine_value === 6) ? { ...restaurant, cuisine: 'Italian' } : (restaurant.cuisine_value === 7) ? { ...restaurant, cuisine: 'South American' } : (restaurant.cuisine_value === 8) ? { ...restaurant, cuisine: 'Chinesee' } : (restaurant.cuisine_value === 9) ? { ...restaurant, cuisine: 'Gastro Pub' } :
                (restaurant.cuisine_value === 10) ? { ...restaurant, cuisine: 'Japanese' } : (restaurant.cuisine_value === 11) ? { ...restaurant, cuisine: 'Pub food' } : (restaurant.cuisine_value === 12) ? { ...restaurant, cuisine: 'Thai' } : (restaurant.cuisine_value === 13) ? { ...restaurant, cuisine: 'Seafood' } : (restaurant.cuisine_value === 14) ? { ...restaurant, cuisine: 'Middle Eastern' } :
                  (restaurant.cuisine_value === 15) ? { ...restaurant, cuisine: 'Pizza' } : (restaurant.cuisine_value === 16) ? { ...restaurant, cuisine: 'Vietnamese' } : (restaurant.cuisine_value === 17) ? { ...restaurant, cuisine: 'Modern' } : (restaurant.cuisine_value === 18) ? { ...restaurant, cuisine: 'North African' } : (restaurant.cuisine_value === 19) ? { ...restaurant, cuisine: 'Central American' } :
                    (restaurant.cuisine_value === 20) ? { ...restaurant, cuisine: 'South East Asian' } : (restaurant.cuisine_value === 21) ? { ...restaurant, cuisine: 'No Cuisine Data' } : (restaurant.cuisine_value === 22) ? { ...restaurant, cuisine: 'No Cuisine Data' } : (restaurant.cuisine_value === 23) ? { ...restaurant, cuisine: 'Turkish' } : (restaurant.cuisine_value === 24) ? { ...restaurant, cuisine: 'Other' } :
                      (restaurant.cuisine_value === 25) ? { ...restaurant, cuisine: 'Mediterranean' } : (restaurant.cuisine_value === 26) ? { ...restaurant, cuisine: 'Asian' } : (restaurant.cuisine_value === 27) ? { ...restaurant, cuisine: 'Meat & Grill' } : (restaurant.cuisine_value === 28) ? { ...restaurant, cuisine: 'International' } : (restaurant.cuisine_value === 29) ? { ...restaurant, cuisine: 'Bar' } :
                        (restaurant.cuisine_value === 30) ? { ...restaurant, cuisine: 'Mexican' } : (restaurant.cuisine_value === 31) ? { ...restaurant, cuisine: 'Greek' } : (restaurant.cuisine_value === 32) ? { ...restaurant, cuisine: 'Afternoon Tea' } : (restaurant.cuisine_value === 33) ? { ...restaurant, cuisine: 'Vegetarian/ Vegan' } : (restaurant.cuisine_value === 34) ? { ...restaurant, cuisine: 'Chicken' } :
                          (restaurant.cuisine_value === 35) ? { ...restaurant, cuisine: 'Wine Bar' } : (restaurant.cuisine_value === 36) ? { ...restaurant, cuisine: 'Central Asian' } : (restaurant.cuisine_value === 37) ? { ...restaurant, cuisine: 'South African' } : { ...restaurant, cuisine: 'No Cuisine Data' }
          }),
          bars: property.bars.map(pub => {
            return (pub.pub_category_value === 0) ? { ...pub, pub_category: 'Worth a visit' } : (pub.pub_category_value === 1) ? { ...pub, pub_category: 'Other pubs' } : (pub.pub_category_value === 2) ? { ...pub, pub_category: 'Timeout100' } : (pub.pub_category_value === 3) ? { ...pub, pub_category: 'Other Pubs' } : { ...pub, pub_category: 'Recommended' }
          }),
          gyms: property.gyms.map(gym => {
            return (gym.gym_group_value === 0) ? { ...gym, gym_group: 'Other' } : (gym.gym_group_value === 1) ? { ...gym, gym_group: 'Fitness First' } : (gym.gym_group_value === 2) ? { ...gym, gym_group: 'MoreYoga' } : (gym.gym_group_value === 3) ? { ...gym, gym_group: 'Virgin' } : (gym.gym_group_value === 4) ? { ...gym, gym_group: 'Pure Gym' } : (gym.gym_group_value === 5) ? { ...gym, gym_group: 'The Gym Group' } : (gym.gym_group_value === 6) ? { ...gym, gym_group: 'Barrecore' } : (gym.gym_group_value === 7) ? { ...gym, gym_group: 'Nuffield Health' } :
              (gym.gym_group_value === 8) ? { ...gym, gym_group: '1Rebel' } : (gym.gym_group_value === 9) ? { ...gym, gym_group: 'Gymbox' } : (gym.gym_group_value === 10) ? { ...gym, gym_group: 'Barrys' } : { ...gym, gym_group: 'Third Space' }
          }),
          supermarkets: property.supermarkets.map(supermarket => {
            return (supermarket.cleansed_name_value === 0) ? { ...supermarket, cleansed_name: 'Co-op' } : (supermarket.cleansed_name_value === 1) ? { ...supermarket, cleansed_name: 'Tesco' } : (supermarket.cleansed_name_value === 2) ? { ...supermarket, cleansed_name: 'Sainsburys' } : (supermarket.cleansed_name_value === 3) ? { ...supermarket, cleansed_name: 'Nisa' } : (supermarket.cleansed_name_value === 4) ? { ...supermarket, cleansed_name: 'Budgens' } : (supermarket.cleansed_name_value === 5) ? { ...supermarket, cleansed_name: 'Amazon Fresh' } :
              (supermarket.cleansed_name_value === 6) ? { ...supermarket, cleansed_name: 'Spar' } : (supermarket.cleansed_name_value === 7) ? { ...supermarket, cleansed_name: 'Asda' } : (supermarket.cleansed_name_value === 8) ? { ...supermarket, cleansed_name: 'Morrisons' } : (supermarket.cleansed_name_value === 9) ? { ...supermarket, cleansed_name: 'M&S Food' } : (supermarket.cleansed_name_value === 10) ? { ...supermarket, cleansed_name: 'Waitrose' } : (supermarket.cleansed_name_value === 11) ? { ...supermarket, cleansed_name: 'Whole Foods' } :
                (supermarket.cleansed_name_value === 12) ? { ...supermarket, cleansed_name: 'Iceland' } : (supermarket.cleansed_name_value === 13) ? { ...supermarket, cleansed_name: 'Farmfoods' } : (supermarket.cleansed_name_value === 14) ? { ...supermarket, cleansed_name: 'Lidl' } : (supermarket.cleansed_name_value === 16) ? { ...supermarket, cleansed_name: 'Londis' } : (supermarket.cleansed_name_value === 17) ? { ...supermarket, cleansed_name: 'Local Convenience Store' } : (supermarket.cleansed_name_value === 18) ? { ...supermarket, cleansed_name: 'Costcutter' } :
                  (supermarket.segment_value === 0) ? { ...supermarket, segment: 'Mainstream' } : (supermarket.segment_value === 1) ? { ...supermarket, segment: 'Premium' } : (supermarket.segment_value === 2) ? { ...supermarket, segment: 'Budget' } : (supermarket.segment_value === 3) ? { ...supermarket, segment: 'Convenience' } :
                    (supermarket.size_value === 0) ? { ...supermarket, size: 'Local' } : (supermarket.size_value === 1) ? { ...supermarket, size: 'Convenience' } : { ...supermarket, size: 'Large' }
          }),
          primaries: property.primaries.map(school => {
            return (school.ofsted_value === 0) ? { ...school, ofsted_results: 'Outstanding' } : (school.ofsted_value === 1) ? { ...school, ofsted_results: 'Good' } : (school.ofsted_value === 2) ? { ...school, ofsted_results: 'No assessment' } : (school.ofsted_value === 3) ? { ...school, ofsted_results: 'Requires Improvement' } : (school.ofsted_value === 4) ? { ...school, ofsted_results: 'Serious Weaknesses' } : { ...school, ofsted_results: 'Special Measures' }
          }),
          secondaries: property.secondaries.map(school => {
            return (school.ofsted_value === 0) ? { ...school, ofsted_results: 'Outstanding' } : (school.ofsted_value === 1) ? { ...school, ofsted_results: 'Good' } : (school.ofsted_value === 2) ? { ...school, ofsted_results: 'No assessment' } : (school.ofsted_value === 3) ? { ...school, ofsted_results: 'Requires Improvement' } : (school.ofsted_value === 4) ? { ...school, ofsted_results: 'Serious Weaknesses' } : { ...school, ofsted_results: 'Special Measures' }
          }),
          // colleges: property.colleges.map(school => {
          //   return (school.ofsted_value === 0) ? { ...school, ofsted_results: 'Outstanding' } : (school.ofsted_value === 1) ? { ...school, ofsted_results: 'Good' } : (school.ofsted_value === 2) ? { ...school, ofsted_results: 'No assessment' } : (school.ofsted_value === 3) ? { ...school, ofsted_results: 'Requires Improvement' } : (school.ofsted_value === 4) ? { ...school, ofsted_results: 'Serious Weaknesses' } : { ...school, ofsted_results: 'Special Measures' }
          // }),
          property_images: [
            { url: property.property_image_1 },
            { url: property.property_image_2 }
          ],
        }
      })
    console.log('calculation 1 ->', calculation)
    setCalc1(calculation)
  }

  // run calculation
  useEffect(() => {
    if (formInputs)
      calculation1()
  }, [formInputs])

  // second calculation
  const calculation2 = () => {
    const calculation =
      calc1.map(property => {
        return {
          ...property,
          restaurants: property.restaurants.map(restaurant => {
            return (restaurant.source_value === 0) ? { ...restaurant, source: 'Open Table' } : (restaurant.source_value === 1) ? { ...restaurant, source: 'Google' } : (restaurant.source_value === 2) ? { ...restaurant, source: 'Open Table & Google' } : (restaurant.source_value === 3) ? { ...restaurant, source: 'Michelin Guide' } : (restaurant.source_value === 0) ? { ...restaurant, source: 'Michelin & Google' } : (restaurant.source_value === 5) ? { ...restaurant, source: 'Open Table & Michelin' } : { ...restaurant, source: 'Open Table, Michelin & Google' }
          }),
          supermarkets: property.supermarkets.map(supermarket => {
            return (supermarket.segment_value === 0) ? { ...supermarket, segment: 'Mainstream' } : (supermarket.segment_value === 1) ? { ...supermarket, segment: 'Premium' } : (supermarket.segment_value === 2) ? { ...supermarket, segment: 'Budget' } : { ...supermarket, segment: 'Convenience' }
          }),
          primaries: property.primaries.map(school => {
            return (school.ofsted_recency_value === 0) ? { ...school, ofsted_recncy: 'Over 8 Years' } : (school.ofsted_recency_value === 1) ? { ...school, ofsted_recency: 'Within 5 Years' } : (school.ofsted_recency_value === 2) ? { ...school, ofsted_recency: 'Within 8 Years' } : (school.ofsted_recency_value === 3) ? { ...school, ofsted_recency: 'Within 3 Years' } : (school.ofsted_recency_value === 4) ? { ...school, ofsted_recency: 'Within 1 Year' } : { ...school, ofsted_results: 'No assessment' }
          }),
          secondaries: property.secondaries.map(school => {
            return (school.ofsted_recency_value === 0) ? { ...school, ofsted_recncy: 'Over 8 Years' } : (school.ofsted_recency_value === 1) ? { ...school, ofsted_recency: 'Within 5 Years' } : (school.ofsted_recency_value === 2) ? { ...school, ofsted_recency: 'Within 8 Years' } : (school.ofsted_recency_value === 3) ? { ...school, ofsted_recency: 'Within 3 Years' } : (school.ofsted_recency_value === 4) ? { ...school, ofsted_recency: 'Within 1 Year' } : { ...school, ofsted_results: 'No assessment' }
          }),
          // colleges: property.colleges.map(school => {
          //   return (school.ofsted_recency_value === 0) ? { ...school, ofsted_recncy: 'Over 8 Years' } : (school.ofsted_recency_value === 1) ? { ...school, ofsted_recency: 'Within 5 Years' } : (school.ofsted_recency_value === 2) ? { ...school, ofsted_recency: 'Within 8 Years' } : (school.ofsted_recency_value === 3) ? { ...school, ofsted_recency: 'Within 3 Years' } : (school.ofsted_recency_value === 4) ? { ...school, ofsted_recency: 'Within 1 Year' } : { ...school, ofsted_results: 'No assessment' }
          // }),
        }
      })
    console.log('calculation 2 ->', calculation)
    setCalc2(calculation)
  }

  // run calculation
  useEffect(() => {
    if (calc1)
      calculation2()
  }, [calc1])

  // third calculation
  const calculation3 = () => {
    const calculation =
      calc2.map(property => {
        return {
          ...property,
          supermarkets: property.supermarkets.map(supermarket => {
            return (supermarket.size_value === 0) ? { ...supermarket, size: 'Local' } : (supermarket.size_value === 1) ? { ...supermarket, size: 'Convenience' } : { ...supermarket, size: 'Large' }
          }),
          primaries: property.primaries.map(school => {
            return (school.religion_value === 0) ? { ...school, religious_grouping: 'Does not apply' } : (school.religion_value === 1) ? { ...school, religious_grouping: 'Church of England' } : (school.religion_value === 2) ? { ...school, religious_grouping: 'Roman Catholic' } : (school.religion_value === 3) ? { ...school, religious_grouping: 'None' } : (school.religion_value === 4) ? { ...school, religious_grouping: 'Muslim' } : (school.religion_value === 5) ? { ...school, religious_grouping: 'Jewish' } : (school.religion_value === 6) ? { ...school, religious_grouping: 'Christian' } : (school.religion_value === 7) ? { ...school, religious_grouping: 'Catholic' } : (school.religion_value === 4) ? { ...school, religious_grouping: 'Church of England/Christian' } : { ...school, religious_grouping: 'Hindu' }
          }),
          secondaries: property.secondaries.map(school => {
            return (school.religion_value === 0) ? { ...school, religious_grouping: 'Does not apply' } : (school.religion_value === 1) ? { ...school, religious_grouping: 'Church of England' } : (school.religion_value === 2) ? { ...school, religious_grouping: 'Roman Catholic' } : (school.religion_value === 3) ? { ...school, religious_grouping: 'None' } : (school.religion_value === 4) ? { ...school, religious_grouping: 'Muslim' } : (school.religion_value === 5) ? { ...school, religious_grouping: 'Jewish' } : (school.religion_value === 6) ? { ...school, religious_grouping: 'Christian' } : (school.religion_value === 7) ? { ...school, religious_grouping: 'Catholic' } : (school.religion_value === 4) ? { ...school, religious_grouping: 'Church of England/Christian' } : { ...school, religious_grouping: 'Hindu' }
          }),
          // colleges: property.colleges.map(school => {
          //   return (school.religion_value === 0) ? { ...school, religious_grouping: 'Does not apply' } : (school.religion_value === 1) ? { ...school, religious_grouping: 'Church of England' } : (school.religion_value === 2) ? { ...school, religious_grouping: 'Roman Catholic' } : (school.religion_value === 3) ? { ...school, religious_grouping: 'None' } : (school.religion_value === 4) ? { ...school, religious_grouping: 'Muslim' } : (school.religion_value === 5) ? { ...school, religious_grouping: 'Jewish' } : (school.religion_value === 6) ? { ...school, religious_grouping: 'Christian' } : (school.religion_value === 7) ? { ...school, religious_grouping: 'Catholic' } : (school.religion_value === 4) ? { ...school, religious_grouping: 'Church of England/Christian' } : { ...school, religious_grouping: 'Hindu' }
          // }),
        }
      })
    console.log('calculation 3 ->', calculation)
    setCalc3(calculation)
  }

  // run calculation
  useEffect(() => {
    if (calc2)
      calculation3()
  }, [calc2])

  // fourth calculation
  const calculation4 = () => {
    const calculation =
      calc3.map(property => {
        return {
          ...property,
          primaries: property.primaries.map(school => {
            return (school.gender_value === 0) ? { ...school, gender: 'Mixed' } : (school.gender_value === 1) ? { ...school, gender: 'Girls' } : { ...school, gender: 'Boys' }
          }),
          secondaries: property.secondaries.map(school => {
            return (school.gender_value === 0) ? { ...school, gender: 'Mixed' } : (school.gender_value === 1) ? { ...school, gender: 'Girls' } : { ...school, gender: 'Boys' }
          }),
          // colleges: property.colleges.map(school => {
          //   return (school.gender_value === 0) ? { ...school, gender: 'Mixed' } : (school.gender_value === 1) ? { ...school, gender: 'Girls' } : { ...school, gender: 'Boys' }
          // }),
        }
      })
    console.log('calculation 4 ->', calculation)
    setCalc4(calculation)
  }

  // run calculation
  useEffect(() => {
    if (calc3)
      calculation4()
  }, [calc3])


  // control thee states for maps
  const [viewport, setViewport] = useState({
    latitude: 51.515419,
    longitude: -0.141099,
    zoom: 11,
  })


  // ? Section 6: Creating a carousel for the images to scroll on click or swipe
  // creating the calculation for the image to rotate between the different values
  const imageClick = () => {
    if (imageTracking === 1) {
      setImageTracking(2)
      setCurrentImage(properties[0].property_image_2)
    } else if (imageTracking === 2) {
      setImageTracking(1)
      setCurrentImage(properties[0].property_image_1)
    }
  }



  // const imageSetting = () => {
  //   if (imageTracking === 1) {
  //     setCurrentImage(properties[0].property_image_1)
  //   } else if (imageTracking === 2) {
  //     setCurrentImage(properties[0].property_image_2)
  //   }
  // }




  return (
    <>
      <section className='property-detail-pages'>
        <NavBar />
        <div className='sub-nav'>
          <button className='back' onClick={() => navigate('/wittle-results')}>Go back</button>
        </div>
        {calc4 ?
          <section className='header-section'>
            {calc4.map((property, index) => {
              return (
                <>
                  <div className='mobile-image-section'>
                    <Slide className='slide-import' autoplay={false} transitionDuration={300} arrows={false} indicators={true}>
                      {property.property_images.map((images, index) => {
                        return (
                          <>
                            <div key={index} className='left-image' style={{ backgroundImage: `url('${images.url}')` }}></div>
                          </>
                        )
                      })}
                    </Slide>
                  </div>
                  <div className='desktop-image-section'>
                    <div key={index} className='left-image' style={{ backgroundImage: `url('${property.property_image_2}')` }}></div>
                  </div>
                  <div className='right-image'>
                    <div className='right-top' style={{ backgroundImage: `url('${property.property_image_2}')` }}></div>
                    <div className='right-bottom' style={{ backgroundImage: `url('${property.property_image_1}')` }}></div>
                  </div>
                </>
              )
            })}

          </section>
          : ''}
        <section className='property-main-section'>
          <div className='main-section-body'>
            {calc4 ?
              <div className='property-top-content'>
                {calc4.map((property, index) => {
                  return (
                    <>
                      <div className='property-content' key={index}>
                        <div className='property-content-title'>
                          <div className='property-title-description'>
                            <div className='property-content-title-1'>
                              <h4>{property.property_name}</h4>
                              <h6>🔥 {match}% match</h6>
                            </div>
                            <div className='property-content-title-2'>
                              {property.channel === 'Rent' ?
                                <h4><NumericFormat value={property.monthly} displayType={'text'} thousandSeparator={true} prefix={'£'} /> pcm</h4>
                                :
                                <h4><NumericFormat value={property.value} displayType={'text'} thousandSeparator={true} prefix={'£'} /> offers over</h4>
                              }
                            </div>
                          </div>
                          <div className='mobile-titles'>
                            <h4>{property.property_name}</h4>
                            <h5><NumericFormat value={property.value} displayType={'text'} thousandSeparator={true} prefix={'£'} /> offers over</h5>
                            <h6>🔥 {match}% match</h6>
                          </div>
                          <hr className='mobile-single-line' />
                          {/* <hr /> */}
                          <div className='property-buttons'>
                            <h5 onClick={() => setPropertyButtons('Details')} style={{ color: propertyButtons === 'Details' ? '#FFA7E5' : '#051885' }}>Details</h5>
                            <h5 onClick={() => setPropertyButtons('Insights')} style={{ color: propertyButtons === 'Insights' ? '#FFA7E5' : '#051885' }}>Insights</h5>
                            <h5 onClick={() => setPropertyButtons('Floorplan')} style={{ color: propertyButtons === 'Floorplan' ? '#FFA7E5' : '#051885' }}>Floorplan</h5>
                            <h5 onClick={() => setPropertyButtons('Documents')} style={{ color: propertyButtons === 'Documents' ? '#FFA7E5' : '#051885' }}>Documents</h5>
                          </div>

                          {/* top detail section  */}
                          <div className='core-content'>
                            {propertyButtons === 'Details' ?
                              <>
                                <div className='details-and-description'>
                                  <div className='property-details-section'>
                                    <h5 className='detail-title'>Property details</h5>
                                    <div className='property-details-list'>
                                      <h5>🏠 Property type: {property.type}</h5>
                                      <h5>🛌 Bedrooms: {property.bedrooms}</h5>
                                      <h5>🛁 Bathrooms: 2</h5>
                                      <h5>🫴 Size: <NumericFormat value={property.sqft} displayType={'text'} thousandSeparator={true} /> sqft</h5>
                                    </div>
                                  </div>
                                  <div className='property-details-section'>
                                    {property.channel === 'Rent' ?
                                      <>
                                        <h5 className='detail-title'>Letting details</h5>
                                        <div className='property-details-list'>
                                          <h5>⏰ Available from: 12/04/2023</h5>
                                          <h5>💷 Deposit: <NumericFormat value={1500} displayType={'text'} thousandSeparator={true} /></h5>
                                          <h5>🛋 Furnish type: furnished</h5>
                                          <h5>⏰ Min tenancy: 12 months</h5>
                                        </div>
                                      </>
                                      :
                                      property.channel === 'Sale' ?
                                        <>
                                          <h5 className='detail-title'>Additional details</h5>
                                          <div className='property-details-list'>
                                            <h5>📝 Tenure: {property.tenure}</h5>
                                            <h5>🌳 Garden: 1 acre</h5>
                                            <h5>🧾 Council tax: Band {property.council_tax}</h5>
                                            <h5>🚘 Parking: on road</h5>
                                          </div>
                                        </>
                                        :
                                        ''
                                    }
                                  </div>
                                </div>
                                <div className='details-and-description'>
                                  <p className='description-text'>{property.property_description}</p>
                                </div>
                              </>
                              // :
                              // propertyButtons === 'Description' ?
                              //   <>


                              //   </>
                              :
                              propertyButtons === 'Insights' ?
                                <>
                                  <div className='insight-details' key={id}>
                                    {property.restaurants && formInputs.restaurant_input > 0 ? <p className='insight-bullets'>👨‍🍳 {property.restaurants.length} restaurants <span>(within {formData.restaurant_distance} min walk)</span></p> : ''}
                                    {property.bars && formInputs.pubs_input > 0 ? <p className='insight-bullets'>🍻{property.bars.length} bars <span>(within {formData.pubs_distance} min walk)</span></p> : ''}
                                    {property.cafes && formInputs.cafes_input > 0 ? <p className='insight-bullets'>☕️ {property.cafes.length} cafes <span>(within {formData.cafes_distance} min walk)</span></p> : ''}
                                    {property.takeaways && formInputs.takeaway_input > 0 ? <p className='insight-bullets'>☕️ {property.takeaways.length} takeaways <span>(within {formData.takeaway_distance} min walk)</span></p> : ''}
                                    {property.primaries && formInputs.primary_input > 0 ? <p className='insight-bullets'>🏫 {property.primaries.length} primary schools <span>(within {formData.primary_distance} min walk)</span></p> : ''}
                                    {property.secondaries && formInputs.secondary_input > 0 ? <p className='insight-bullets'>🏫 {property.secondaries.length} secondary schools <span>(within {formData.secondary_distance} min walk)</span></p> : ''}
                                    {property.colleges && formInputs.college_input > 0 ? <p className='insight-bullets'>🏫 {property.colleges.length} 6th forms <span>(within {formData.college_distance} min walk)</span></p> : ''}
                                    {property.colleges && formInputs.college_input > 0 ? <p className='insight-bullets'>🏫 {property.colleges.length} 6th forms <span>(within {formData.college_distance} min walk)</span></p> : ''}
                                    {property.supermarkets && formInputs.supermarket_input > 0 ? <p className='insight-bullets'>🛒 {property.supermarkets.length} supermarkets <span>(within {formData.supermarket_distance} min walk)</span></p> : ''}
                                    {property.gyms && formInputs.gym_input > 0 ? <p className='insight-bullets'>🏋️‍♂️ {property.gyms.length} gyms <span>(within {formData.gym_distance} min walk)</span></p> : ''}
                                    {property.parks && formInputs.park_input > 0 ? <p className='insight-bullets'>🌳 {property.parks.length} parks <span>(within {formData.park_distance} min walk)</span></p> : ''}
                                    {property.tubes && formInputs.tube_input > 0 ? <p className='insight-bullets'>🚇 {property.tubes.length} tube stations <span>(within {formData.tube_distance} min walk)</span></p> : ''}
                                    {property.trains && formInputs.train_input > 0 ? <p className='insight-bullets'>🚊 {property.trains.length} train stations <span>(within {formData.train_distance} min walk)</span></p> : ''}
                                  </div>
                                </>
                                : ''}
                          </div>
                          <hr className='mobile-single-line' />
                          {/* : ''} */}

                        </div>

                        {/* section determined by whether the insights button is chosen */}
                        <div className='secondary-content'>
                          {
                            propertyButtons === 'Insights' ?
                              <>
                                <div className='insight-headers'>
                                  {property.restaurants && formInputs.restaurant_input > 0 ? <h5 className='first-selection' onClick={() => setPOIButtons({ ...poiButtons, selection: 'Restaurants' })} style={{ color: poiButtons.selection === 'Restaurants' ? '#FFA7E5' : '#051885' }}>Restaurants</h5> : ''}
                                  {property.bars && formInputs.pubs_input > 0 ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Pubs' })} style={{ color: poiButtons.selection === 'Pubs' ? '#FFA7E5' : '#051885' }}>Pubs</h5> : ''}
                                  {property.cafes && formInputs.cafes_input > 0 ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Cafes' })} style={{ color: poiButtons.selection === 'Cafes' ? '#FFA7E5' : '#051885' }}>Cafes</h5> : ''}
                                  {property.takeaways && formInputs.takeaway_input > 0 ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Takeaways' })} style={{ color: poiButtons.selection === 'Takeaways' ? '#FFA7E5' : '#051885' }}>Takeaways</h5> : ''}
                                  {property.tubes && formInputs.tube_input > 0 ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Tubes' })} style={{ color: poiButtons.selection === 'Tubes' ? '#FFA7E5' : '#051885' }}>Tubes</h5> : ''}
                                  {property.trains && formInputs.train_input > 0 ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Trains' })} style={{ color: poiButtons.selection === 'Trains' ? '#FFA7E5' : '#051885' }}>Trains</h5> : ''}
                                  {property.supermarkets && formInputs.supermarket_input > 0 ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Supermarkets' })} style={{ color: poiButtons.selection === 'Supermarkets' ? '#FFA7E5' : '#051885' }}>Supermarkets</h5> : ''}
                                  {property.gyms && formInputs.gym_input > 0 ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Gyms' })} style={{ color: poiButtons.selection === 'Gyms' ? '#FFA7E5' : '#051885' }}>Gyms</h5> : ''}
                                  {property.parks && formInputs.park_input > 0 ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Parks' })} style={{ color: poiButtons.selection === 'Parks' ? '#FFA7E5' : '#051885' }}>Parks</h5> : ''}
                                  {property.primaries && formInputs.primary_input > 0 ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Primary Schools' })} style={{ color: poiButtons.selection === 'Primary Schools' ? '#FFA7E5' : '#051885' }}>Primaries</h5> : ''}
                                  {property.secondaries && formInputs.secondary_input > 0 ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Secondary Schools' })} style={{ color: poiButtons.selection === 'Secondary Schools' ? '#FFA7E5' : '#051885' }}>Secondaries</h5> : ''}
                                  {property.colleges && formInputs.college_input > 0 ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: '6th Forms' })} style={{ color: poiButtons.selection === '6th Forms' ? '#FFA7E5' : '#051885' }}>6th Forms</h5> : ''}
                                </div>
                                <div className='insight-details' key={id}>
                                  {
                                    propertyButtons === 'Insights' & poiButtons.selection === 'Restaurants' ?
                                      <>
                                        <div className='insight-detail-title'>
                                          <h5 id='header-1'>Name</h5>
                                          <h5 id='header-2'>Rating (/5)</h5>
                                          <h5 id='header-3'>Cuisine</h5>
                                          <h5 id='header-4'>Distance (kms)</h5>
                                        </div>
                                        <div className='insight-details-text'>
                                          {property.restaurants.map((restaurant, index) => {
                                            return (
                                              <>
                                                <div className="insight-details-content" key={index}>
                                                  <div className='insight-details-name'>
                                                    <h5>{restaurant.restaurant_name}</h5>
                                                  </div>
                                                  <div className='insight-details-rating'>
                                                    <h5>{restaurant.Rating}</h5>
                                                  </div>
                                                  <div className='insight-details-cuisine'>
                                                    <h5>{restaurant.cuisine}</h5>
                                                  </div>
                                                  <div className='insight-details-distance'>
                                                    <h5>{restaurant.adjusted_dist_km}</h5>
                                                  </div>
                                                </div>
                                                <hr className='table' />
                                              </>
                                            )
                                          })}
                                        </div>
                                      </>
                                      :
                                      propertyButtons === 'Insights' & poiButtons.selection === 'Pubs' ?
                                        <>
                                          <div className='insight-detail-title'>
                                            <h5 id='header-1'>Name</h5>
                                            <h5 id='header-2'>Category</h5>
                                            <h5 id='header-3'>Time to walk (mins)</h5>
                                            <h5 id='header-4'>Distance (kms)</h5>
                                          </div>
                                          <div className='insight-details-text'>
                                            {property.bars.map((bar, index) => {
                                              return (
                                                <>
                                                  <div className="insight-details-content" key={index}>
                                                    <div className='insight-details-name'>
                                                      <h5>{bar.pub_name}</h5>
                                                    </div>
                                                    <div className='insight-details-rating'>
                                                      <h5>{bar.pub_category}</h5>
                                                    </div>
                                                    <div className='insight-details-cuisine'>
                                                      <h5>{bar.walking_time_mins}</h5>
                                                    </div>
                                                    <div className='insight-details-distance'>
                                                      <h5>{bar.adjusted_dist_km}</h5>
                                                    </div>
                                                  </div>
                                                  <hr className='table' />
                                                </>
                                              )
                                            })}
                                          </div>
                                        </> :
                                        propertyButtons === 'Insights' & poiButtons.selection === 'Cafes' ?
                                          <>
                                            <div className='insight-detail-title'>
                                              <h5 id='header-1' style={{ width: 'calc(100%/3)' }}>Name</h5>
                                              <h5 id='header-2' style={{ width: 'calc(100%/3)' }}>Distance (kms)</h5>
                                              {/* <h5 id='header-3' style={{ width: 'calc(100%/3)' }}>Distance (mins)</h5> */}
                                              <h5 id='header-4' style={{ width: 'calc(100%/3)' }}>Time to walk (mins)</h5>
                                            </div>
                                            <div className='insight-details-text'>
                                              {property.cafes.map((cafe, index) => {
                                                return (
                                                  <>
                                                    <div className="insight-details-content" key={index}>
                                                      <div className='insight-details-name' style={{ width: 'calc(100%/3)' }}>
                                                        <h5>{cafe.cleansed_name}</h5>
                                                      </div>
                                                      <div className='insight-details-rating' style={{ width: 'calc(100%/3)' }}>
                                                        <h5>{cafe.adjusted_dist_km}</h5>
                                                      </div>
                                                      {/* <div className='insight-details-cuisine'>
                                                    <h5>{cafe.walking_time_mins}</h5>
                                                  </div> */}
                                                      <div className='insight-details-distance' style={{ width: 'calc(100%/3)' }}>
                                                        <h5>{cafe.walking_time_mins}</h5>
                                                      </div>
                                                    </div>
                                                    <hr className='table' />
                                                  </>
                                                )
                                              })}
                                            </div>
                                          </> :
                                          propertyButtons === 'Insights' & poiButtons.selection === 'Takeaways' ?
                                            <>
                                              <div className='insight-detail-title'>
                                                <h5 id='header-1' >Name</h5>
                                                <h5 id='header-2'>Rating (/10)</h5>
                                                <h5 id='header-3'>Cuisine</h5>
                                                <h5 id='header-4'>Time to walk (mins)</h5>
                                              </div>
                                              <div className='insight-details-text'>
                                                {property.takeaways.map((takeaway, index) => {
                                                  return (
                                                    <>
                                                      <div className="insight-details-content" key={index}>
                                                        <div className='insight-details-name'>
                                                          <h5>{takeaway.takeaway_name}</h5>
                                                        </div>
                                                        <div className='insight-details-rating'>
                                                          <h5>{takeaway.wittle_rating}</h5>
                                                        </div>
                                                        <div className='insight-details-cuisine'>
                                                          <h5>{takeaway.cuisine}</h5>
                                                        </div>
                                                        <div className='insight-details-distance'>
                                                          <h5>{takeaway.walking_time_mins}</h5>
                                                        </div>
                                                      </div>
                                                      <hr className='table' />
                                                    </>
                                                  )
                                                })}
                                              </div>
                                            </> :
                                            propertyButtons === 'Insights' & poiButtons.selection === 'Tubes' ?
                                              <>
                                                <div className='insight-detail-title'>
                                                  <h5 id='header-1' style={{ width: 'calc(100%/3)' }}>Station name</h5>
                                                  <h5 id='header-2' style={{ width: 'calc(100%/3)' }}>Line</h5>
                                                  <h5 id='header-4' style={{ width: 'calc(100%/3)' }}>Time to walk (mins)</h5>
                                                </div>
                                                <div className='insight-details-text'>
                                                  {property.tubes.map((tube, index) => {
                                                    return (
                                                      <>
                                                        <div className="insight-details-content" key={index}>
                                                          <div className='insight-details-name' style={{ width: 'calc(100%/3)' }}>
                                                            <h5>{tube.station_name}</h5>
                                                          </div>
                                                          <div className='insight-details-rating' style={{ width: 'calc(100%/3)' }}>
                                                            <h5>{tube.line}</h5>
                                                          </div>
                                                          <div className='insight-details-distance' style={{ width: 'calc(100%/3)' }}>
                                                            <h5>{tube.walking_time_mins}</h5>
                                                          </div>
                                                        </div>
                                                        <hr className='table' />
                                                      </>
                                                    )
                                                  })}
                                                </div>
                                              </>
                                              :
                                              propertyButtons === 'Insights' & poiButtons.selection === 'Supermarkets' ?
                                                <>
                                                  <div className='insight-detail-title'>
                                                    <h5 id='header-1' style={{ width: 'calc(100%/3)' }}>Name</h5>
                                                    <h5 id='header-2' style={{ width: 'calc(100%/3)' }}>Size</h5>
                                                    {/* <h5 id='header-3'>Segment</h5> */}
                                                    <h5 id='header-4' style={{ width: 'calc(100%/3)' }}>Time to walk (mins)</h5>
                                                  </div>
                                                  <div className='insight-details-text'>
                                                    {property.supermarkets.map((shop, index) => {
                                                      return (
                                                        <>
                                                          <div className="insight-details-content" key={index}>
                                                            <div className='insight-details-name' style={{ width: 'calc(100%/3)' }}>
                                                              <h5>{shop.cleansed_name}</h5>
                                                            </div>
                                                            <div className='insight-details-rating' style={{ width: 'calc(100%/3)' }}>
                                                              <h5>{shop.size}</h5>
                                                            </div>
                                                            {/* <div className='insight-details-cuisine'>
                                                              <h5>{shop.segment}</h5>
                                                            </div> */}
                                                            <div className='insight-details-distance' style={{ width: 'calc(100%/3)' }}>
                                                              <h5>{shop.walking_time_mins}</h5>
                                                            </div>
                                                          </div>
                                                          <hr className='table' />
                                                        </>
                                                      )
                                                    })}
                                                  </div>
                                                </>
                                                :
                                                propertyButtons === 'Insights' & poiButtons.selection === 'Gyms' ?
                                                  <>
                                                    <div className='insight-detail-title'>
                                                      <h5 id='header-1'>Name</h5>
                                                      <h5 id='header-2'>Group</h5>
                                                      <h5 id='header-3'>Class Type</h5>
                                                      <h5 id='header-4'>Time to walk (mins)</h5>
                                                    </div>
                                                    <div className='insight-details-text'>
                                                      {property.gyms.map((gym, index) => {
                                                        return (
                                                          <>
                                                            <div className="insight-details-content" key={index}>
                                                              <div className='insight-details-name'>
                                                                <h5>{gym.gym_name}</h5>
                                                              </div>
                                                              <div className='insight-details-rating'>
                                                                <h5>{gym.gym_group}</h5>
                                                              </div>
                                                              <div className='insight-details-cuisine'>
                                                                <h5>{gym.class_type}</h5>
                                                              </div>
                                                              <div className='insight-details-distance'>
                                                                <h5>{gym.walking_time_mins}</h5>
                                                              </div>
                                                            </div>
                                                            <hr className='table' />
                                                          </>
                                                        )
                                                      })}
                                                    </div>
                                                  </> :
                                                  propertyButtons === 'Insights' & poiButtons.selection === 'Parks' ?
                                                    <>
                                                      <div className='insight-detail-title'>
                                                        <h5 id='header-1' style={{ width: 'calc(100%/3)' }}>Name</h5>
                                                        <h5 id='header-2' style={{ width: 'calc(100%/3)' }}>Park Type</h5>
                                                        <h5 id='header-4' style={{ width: 'calc(100%/3)' }}>Time to walk (mins)</h5>
                                                      </div>
                                                      <div className='insight-details-text'>
                                                        {property.parks.map((park, index) => {
                                                          return (
                                                            <>
                                                              <div className="insight-details-content" key={index}>
                                                                <div className='insight-details-name' style={{ width: 'calc(100%/3)' }}>
                                                                  <h5>{park.park_name}</h5>
                                                                </div>
                                                                <div className='insight-details-rating' style={{ width: 'calc(100%/3)' }}>
                                                                  <h5>{park.park_type}</h5>
                                                                </div>
                                                                <div className='insight-details-distance' style={{ width: 'calc(100%/3)' }}>
                                                                  <h5>{park.walking_time_mins}</h5>
                                                                </div>
                                                              </div>
                                                              <hr className='table' />
                                                            </>
                                                          )
                                                        })}
                                                      </div>
                                                    </> :
                                                    propertyButtons === 'Insights' & poiButtons.selection === 'Primary Schools' ?
                                                      <>
                                                        <div className='insight-detail-title'>
                                                          <h5 id='header-1'>Name</h5>
                                                          <h5 id='header-2'>Ofsted</h5>
                                                          <h5 id='header-3'>Religion</h5>
                                                          <h5 id='header-4'>Time to walk (mins)</h5>
                                                        </div>
                                                        <div className='insight-details-text'>
                                                          {property.primaries.map((school, index) => {
                                                            return (
                                                              <>
                                                                <div className="insight-details-content" key={index}>
                                                                  <div className='insight-details-name'>
                                                                    <h5>{school.school_name}</h5>
                                                                  </div>
                                                                  <div className='insight-details-rating'>
                                                                    <h5>{school.ofsted_results}</h5>
                                                                  </div>
                                                                  <div className='insight-details-cuisine'>
                                                                    <h5>{school.religious_grouping}</h5>
                                                                  </div>
                                                                  <div className='insight-details-distance'>
                                                                    <h5>{school.walking_time_mins}</h5>
                                                                  </div>
                                                                </div>
                                                                <hr className='table' />
                                                              </>
                                                            )
                                                          })}
                                                        </div>
                                                      </> :
                                                      propertyButtons === 'Insights' & poiButtons.selection === 'Secondary Schools' ?
                                                        <>
                                                          <div className='insight-detail-title'>
                                                            <h5 id='header-1'>Name</h5>
                                                            <h5 id='header-2'>Ofsted</h5>
                                                            <h5 id='header-3'>Religion</h5>
                                                            <h5 id='header-4'>Time to walk (mins)</h5>
                                                          </div>
                                                          <div className='insight-details-text'>
                                                            {property.secondaries.map((school, index) => {
                                                              return (
                                                                <>
                                                                  <div className="insight-details-content" key={index}>
                                                                    <div className='insight-details-name'>
                                                                      <h5>{school.school_name}</h5>
                                                                    </div>
                                                                    <div className='insight-details-rating'>
                                                                      <h5>{school.ofsted_results}</h5>
                                                                    </div>
                                                                    <div className='insight-details-cuisine'>
                                                                      <h5>{school.religious_grouping}</h5>
                                                                    </div>
                                                                    <div className='insight-details-distance'>
                                                                      <h5>{school.walking_time_mins}</h5>
                                                                    </div>
                                                                  </div>
                                                                  <hr className='table' />
                                                                </>
                                                              )
                                                            })}
                                                          </div>
                                                        </>
                                                        : ''
                                  }
                                </div>
                              </>
                              : ''}

                          {/* </>
                            : ''} */}

                        </div>
                      </div>
                    </>
                  )
                })}

              </div>
              : ''}
            {/* <hr className='divider' /> */}
            {/* <div className='property-description-section'> */}
            {/* <hr className='divider' /> */}

            <div className='property-map-detail'>
              {calc4 ?
                <>
                  <div className='property-map-title'>
                    {calc4.map((property, index) => {
                      return (
                        <>
                          <div className='property-map-title-text' key={index}>
                            <h1>{property.property_name}</h1>
                          </div>
                        </>
                      )
                    })}
                  </div>
                  {calc4.map((property, index) => {
                    return (
                      <>
                        <div className='map-headers' key={index}>
                          {property.restaurants && formInputs.restaurant_input > 0 ? <h5 className='first-selection' onClick={() => setPOIButtons({ ...poiButtons, selection: 'Restaurants' })} style={{ color: poiButtons.selection === 'Restaurants' ? '#FFA7E5' : '#051885' }}>Restaurants</h5> : ''}
                          {property.bars && formInputs.pubs_input > 0 ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Pubs' })} style={{ color: poiButtons.selection === 'Pubs' ? '#FFA7E5' : '#051885' }}>Pubs</h5> : ''}
                          {property.cafes && formInputs.cafes_input > 0 ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Cafes' })} style={{ color: poiButtons.selection === 'Cafes' ? '#FFA7E5' : '#051885' }}>Cafes</h5> : ''}
                          {property.takeaways && formInputs.takeaway_input > 0 ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Takeaways' })} style={{ color: poiButtons.selection === 'Takeaways' ? '#FFA7E5' : '#051885' }}>Takeaways</h5> : ''}
                          {property.tubes && formInputs.tube_input > 0 ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Tubes' })} style={{ color: poiButtons.selection === 'Tubes' ? '#FFA7E5' : '#051885' }}>Tubes</h5> : ''}
                          {property.trains && formInputs.train_input > 0 ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Trains' })} style={{ color: poiButtons.selection === 'Trains' ? '#FFA7E5' : '#051885' }}>Trains</h5> : ''}
                          {property.supermarkets && formInputs.supermarket_input > 0 ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Supermarkets' })} style={{ color: poiButtons.selection === 'Supermarkets' ? '#FFA7E5' : '#051885' }}>Supermarkets</h5> : ''}
                          {property.gyms && formInputs.gym_input > 0 ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Gyms' })} style={{ color: poiButtons.selection === 'Gyms' ? '#FFA7E5' : '#051885' }}>Gyms</h5> : ''}
                          {property.parks && formInputs.park_input > 0 ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Parks' })} style={{ color: poiButtons.selection === 'Parks' ? '#FFA7E5' : '#051885' }}>Parks</h5> : ''}
                          {property.primaries && formInputs.primary_input > 0 ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Primary Schools' })} style={{ color: poiButtons.selection === 'Primary Schools' ? '#FFA7E5' : '#051885' }}>Primaries</h5> : ''}
                          {property.secondaries && formInputs.secondary_input > 0 ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: 'Secondary Schools' })} style={{ color: poiButtons.selection === 'Secondary Schools' ? '#FFA7E5' : '#051885' }}>Secondaries</h5> : ''}
                          {property.colleges && formInputs.college_input > 0 ? <h5 onClick={() => setPOIButtons({ ...poiButtons, selection: '6th Forms' })} style={{ color: poiButtons.selection === '6th Forms' ? '#FFA7E5' : '#051885' }}>6th Forms</h5> : ''}
                        </div>
                      </>
                    )
                  })}
                </>
                : ''}
              <ReactMapGL {...viewport}
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                mapStyle='mapbox://styles/mapbox/streets-v11'
                onViewportChange={viewport => {
                  setViewport(viewport)
                }}
                center={viewport}
                onMove={evt => setViewport(evt.viewport)}>
                {calc4 ?
                  <div className='poi-icons'>
                    {calc4.map(property => {
                      return (
                        <>
                          <Marker longitude={property.long} latitude={property.Lat} key={id} titleAccess={property.property_name} id='house-icon' >
                            {/* <div className='house-background'> */}
                            <div className='house-btn'></div>
                            {/* </div> */}
                          </Marker>
                          {poiButtons.selection === 'Restaurants' ?
                            <div className='poi-icons'>
                              {property.restaurants.map((icon, index) => {
                                return (
                                  <>
                                    <div key={icon._id}>
                                      <Marker id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat}>
                                        <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                          <div className='restaurant-btn' id={icon.id}>
                                          </div>
                                        </div>
                                      </Marker>
                                      {(showPopup & icon.id === iconId) && (
                                        <Popup key={index} id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat} closeOnClick={false}>
                                          <h1>{icon.restaurant_name}</h1>
                                          <h4>{icon.cuisine}</h4>
                                          <h4>{icon.Rating}/5</h4>
                                        </Popup>
                                      )}
                                    </div>
                                  </>
                                )
                              })}
                            </div>
                            : ''}
                          {poiButtons.selection === 'Pubs' ?
                            <div className='poi-icons'>
                              {property.bars.map((icon, index) => {
                                return (
                                  <div key={icon._id}>
                                    <Marker id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat}>
                                      <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                        <div className='pubs-btn' id={icon.id}>
                                        </div>
                                      </div>
                                    </Marker>
                                    {(showPopup & icon.id === iconId) && (
                                      <Popup key={index} id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat} closeOnClick={false}>
                                        <h1>{icon.pub_name}</h1>
                                      </Popup>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                            : ''}
                          {poiButtons.selection === 'Cafes' ?
                            <div className='poi-icons'>
                              {property.cafes.map((icon, index) => {
                                return (
                                  <div key={icon._id}>
                                    <Marker id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat}>
                                      <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                        <div className='cafes-btn' id={icon.id}>
                                        </div>
                                      </div>
                                    </Marker>
                                    {(showPopup & icon.id === iconId) && (
                                      <Popup key={index} id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat} closeOnClick={false}>
                                        <h1>{icon.cleansed_name}</h1>
                                      </Popup>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                            : ''}
                          {poiButtons.selection === 'Takeaways' ?
                            <div className='poi-icons'>
                              {property.takeaways.map((icon, index) => {
                                return (
                                  <div key={icon._id}>
                                    <Marker id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat}>
                                      <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                        <div className='restaurant-btn' id={icon.id}>
                                        </div>
                                      </div>
                                    </Marker>
                                    {(showPopup & icon.id === iconId) && (
                                      <Popup key={index} id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat} closeOnClick={false}>
                                        <h1>{icon.takeaway_name}</h1>
                                        <h4>{icon.cuisine}</h4>
                                        <h4>{icon.wittle_rating}/10</h4>
                                      </Popup>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                            : ''}
                          {poiButtons.selection === 'Tubes' ?
                            <div className='poi-icons'>
                              {property.tubes.map((icon, index) => {
                                return (
                                  <div key={icon._id}>
                                    <Marker id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat}>
                                      <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                        <div className='tubes-btn' id={icon.id}>
                                        </div>
                                      </div>
                                    </Marker>
                                    {(showPopup & icon.id === iconId) && (
                                      <Popup key={index} id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat} closeOnClick={false}>
                                        <h1>{icon.station_name}</h1>
                                        <h4>{icon.line}</h4>
                                      </Popup>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                            : ''}
                          {poiButtons.selection === 'Supermarkets' ?
                            <div className='poi-icons'>
                              {property.supermarkets.map((icon, index) => {
                                return (
                                  <div key={icon._id}>
                                    <Marker id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat}>
                                      <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                        <div className='supermarket-btn' id={icon.id}>
                                        </div>
                                      </div>
                                    </Marker>
                                    {(showPopup & icon.id === iconId) && (
                                      <Popup key={index} id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat} closeOnClick={false}>
                                        <h1>{icon.cleansed_name}</h1>
                                        <h4>{icon.size}</h4>
                                      </Popup>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                            : ''}
                          {poiButtons.selection === 'Gyms' ?
                            <div className='poi-icons'>
                              {property.gyms.map((icon, index) => {
                                return (
                                  <div key={icon._id}>
                                    <Marker id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat}>
                                      <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                        <div className='gyms-btn' id={icon.id}>
                                        </div>
                                      </div>
                                    </Marker>
                                    {(showPopup & icon.id === iconId) && (
                                      <Popup key={index} id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat} closeOnClick={false}>
                                        <h1>{icon.gym_name}</h1>
                                        <h4>{icon.gym_group}</h4>
                                        <h4>{icon.class_type}</h4>
                                      </Popup>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                            : ''}
                          {poiButtons.selection === 'Parks' ?
                            <div className='poi-icons'>
                              {property.parks.map((icon, index) => {
                                return (
                                  <div key={icon._id}>
                                    <Marker id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat}>
                                      <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                        <div className='parks-btn' id={icon.id}>
                                        </div>
                                      </div>
                                    </Marker>
                                    {(showPopup & icon.id === iconId) && (
                                      <Popup key={index} id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat} closeOnClick={false}>
                                        <h1>{icon.park_name}</h1>
                                        <h4>{icon.park_type}</h4>
                                      </Popup>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                            : ''}
                          {poiButtons.selection === 'Primaries' ?
                            <div className='poi-icons'>
                              {property.primaries.map((icon, index) => {
                                return (
                                  <div key={icon._id}>
                                    <Marker id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat}>
                                      <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                        <div className='primary-btn' id={icon.id}>
                                        </div>
                                      </div>
                                    </Marker>
                                    {(showPopup & icon.id === iconId) && (
                                      <Popup key={index} id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat} closeOnClick={false}>
                                        <h1>{icon.school_name}</h1>
                                        <h4>Ofsted: {icon.ofsted_results}</h4>
                                        <h4>{icon.religious_grouping}</h4>
                                      </Popup>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                            : ''}
                          {poiButtons.selection === 'Secondaries' ?
                            <div className='poi-icons'>
                              {property.secondaries.map((icon, index) => {
                                return (
                                  <div key={icon._id}>
                                    <Marker id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat}>
                                      <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                        <div className='primary-btn' id={icon.id}>
                                        </div>
                                      </div>
                                    </Marker>
                                    {(showPopup & icon.id === iconId) && (
                                      <Popup key={index} id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat} closeOnClick={false}>
                                        <h1>{icon.school_name}</h1>
                                        <h4>Ofsted: {icon.ofsted_results}</h4>
                                        <h4>{icon.religious_grouping}</h4>
                                      </Popup>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                            : ''}
                          {poiButtons.selection === 'Colleges' ?
                            <div className='poi-icons'>
                              {property.colleges.map((icon, index) => {
                                return (
                                  <div key={icon._id}>
                                    <Marker id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat}>
                                      <div className='poi-background' id={icon.id} onMouseEnter={iconSetting}>
                                        <div className='primary-btn' id={icon.id}>
                                        </div>
                                      </div>
                                    </Marker>
                                    {(showPopup & icon.id === iconId) && (
                                      <Popup key={index} id={icon.id} longitude={icon.POI_long} latitude={icon.POI_lat} closeOnClick={false}>
                                        <h1>{icon.school_name}</h1>
                                        <h4>Ofsted: {icon.ofsted_results}</h4>
                                        <h4>{icon.religious_grouping}</h4>
                                      </Popup>
                                    )}
                                  </div>
                                )
                              })}
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
          <div className='estate-details'>
            <h3>Managed by</h3>
            <div className='estate-image'></div>
            <h3>Contact us</h3>
            <button className='contact'>Get in touch</button>
            <h3>Call us</h3>
            <p>07771388710</p>
          </div>

        </section>

        {/* footer section to show contact details */}
        {contactButton === 'Open' ?
          <section className='contact-footer' style={{ height: '110px' }} >
            <div className='contact-title'>
              <h4 onClick={() => setContact('Closed')}>Contact Agent</h4>
            </div>
            <div className='contact-details'>
              <button>Email agent</button>
              <button>Call agent</button>
            </div>
            <div className='contact-bottom'>

            </div>
          </section>
          : contactButton === 'Closed' ?
            <section className='contact-footer' style={{ height: '70px' }} >
              <div className='contact-title'>
                <h4 onClick={() => setContact('Open')}>Contact Agent</h4>
              </div>
            </section>
            : ''}


      </section>

    </>
  )

}

export default SinglePropertyWittle