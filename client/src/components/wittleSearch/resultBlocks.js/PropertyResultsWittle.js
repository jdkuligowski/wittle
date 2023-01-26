/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getUserToken, getAccessToken, isUserAuth } from '../../auth/Auth'
import { Modal } from 'react-bootstrap'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { NumericFormat } from 'react-number-format'
import NavBar from '../../tools/NavBar'



const PropertyResultsWittle = () => {

  // state for switching page
  const { id } = useParams()

  // state for setting the current property id clicked
  const [currentId, setCurrentId] = useState(0)

  // state for setting the favourite of current property id clicked
  const [favouriteID, setCurrentFavouriteId] = useState(0)

  // state for setting the favourite of a property
  const [favourite, setFavouritee] = useState(false)

  // state for determining whether a property is favoruited
  const [listFavourites, setListFavourites] = useState()

  // state for determining which properties are favourited 
  const [favouritesData, setFavouritesData] = useState()

  // state to collect properties
  const [properties, setProperties] = useState()

  // set state for user data
  const [userData, setUserData] = useState([])

  // adsitional state for testing 
  const [localProp, setLocalProp] = useState()

  // adsitional state for testing 
  const [secondProp, setSecondProp] = useState()

  // states for calculatino fields
  const [calc1, setCalc1] = useState()
  const [calc2, setCalc2] = useState()
  const [calc3, setCalc3] = useState()
  const [calc4, setCalc4] = useState()
  const [calc5, setCalc5] = useState()
  const [calc6, setCalc6] = useState()
  const [calc7, setCalc7] = useState()

  // state to enable navigation between pages
  const navigate = useNavigate()

  // set error state for capturing errors
  const [errors, setErrors] = useState(false)


  // set for capturing the id of the edit search
  const [editSearch, setEditSearch] = useState()

  // states for filling out the form
  const [formData, setFormData] = useState({
    start_search: true,
    search_name: '',
    search_type: 'Wittle',
    search_channel: '',
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
  const [propertyButtons, setPropertyButtons] = useState('Description')

  // set states for sidebar feature
  const [sidebar, setSidebar] = useState('Close')


  // get form data from storage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('wittle-form-input'))
    if (data) setFormData(data)
    console.log('form-data ->', data)
  }, [])

  // dropdown for insight summary
  const insightChange = e => {
    setInsightToggle({ ...insightToggle, [e.target.name]: e.target.value })
  }


  // ? Setting up the ability to retain the form data across pages by saving the data to local storage for us to access on another pagee
  // define function to set state to storage
  // const setStateToLocalStorage = (token) => {
  //   window.localStorage.setItem('wittle-form-input', JSON.stringify(formData))
  // }


  // execute setting state to local storage
  // useEffect(() => {
  //   if (formData) {
  //     setStateToLocalStorage()
  //   }
  // }, [formData])


  // ? Requests to the database
  // get properties from the database
  useEffect(() => {
    const getProperties = async () => {
      try {
        const { data } = await axios.get('/api/properties/results')
        setProperties(data)
        console.log('property data ->', data)
      } catch (error) {
        setErrors(true)
        console.log(error)
      }
    }
    getProperties()
  }, [])

  // set results to local storage
  // const setResultsToLocalStorage = (token) => {
  //   window.localStorage.setItem('wittle-results', JSON.stringify(localProp))
  // }



  // get results from local storage
  // useEffect(() => {
  //   if (isUserAuth()) {
  //     const data = JSON.parse(localStorage.getItem('wittle-results'))
  //     if (data) setSecondProp(data)
  //     console.log('filtered data->', data)
  //   } else {
  //     navigate('/access-denied')
  //   }
  // }, [])


  const removeEmpties = () => {
    const calculation =
      properties.filter(property => property.gyms.length !== 0 & property.primaries.length !== 0 & property.supermarkets.length !== 0 & property.restaurants.length !== 0 & property.parks.length !== 0 & property.cafes.length !== 0 & property.tubes.length !== 0 & property.bars.length !== 0 & property.takeaways.length !== 0 & property.secondaries.length !== 0 & property.colleges.length !== 0 & property.trains.length !== 0)
    console.log('cleansed properrty data ->', calculation)
    setLocalProp(calculation)
  }

  useEffect(() => {
    if (properties)
      removeEmpties()
  }, [properties])

  // useEffect(() => {
  //   if (localProp) {
  //     setResultsToLocalStorage()
  //   }
  // }, [localProp])




  // ? Calculation section for setting the match score
  // First key calculation that will give a value for the variables on each property
  const calculation1 = () => {
    const calculation =
      localProp.map(property => {
        return {
          ...property,
          restaurant_calcs: formData.restaurant_selection ? property.restaurants.map(restaurant => {
            return (restaurant.rating >= 4.9) ? { ...restaurant, restaurant_score: 15 } : (restaurant.rating >= 4.7) ? { ...restaurant, restaurant_score: 12 } : (restaurant.rating >= 4.5) ? { ...restaurant, restaurant_score: 9 } : (restaurant.rating >= 4.3) ? { ...restaurant, restaurant_score: 6 } : (restaurant.rating >= 4.1) ? { ...restaurant, restaurant_score: 4 } : (restaurant.rating >= 3.8) ? { ...restaurant, restaurant_score: 2 } : { ...restaurant, restaurant_score: 1 }
          }) : 'Not selected',
          pub_calcs: formData.pubs_selection ? property.bars.map(pub => {
            return (pub.pub_category === 'Recommended' || pub.pub_category === 'Timeout100') ? { ...pub, pub_score: 100 } : (pub.pub_category === 'Worth a visit') ? { ...pub, pub_score: 50 } : { ...pub, pub_score: 5 }
          }) : 'Not selected',
          primaries_calcs: formData.primary_selection ? property.primaries.map(primary => {
            return (primary.ofsted_results === 'Outstanding') ? { ...primary, primary_score: 100 } : (primary.ofsted_results === 'Good') ? { ...primary, primary_score: 20 } : { ...primary, primary_score: 10 }
          }) : 'Not selected',
          tubes_calcs: formData.tube_selection ? property.tubes.map(tube => {
            return { ...tube, tube_score: (1 - (tube.walking_time_mins / 5)) }
          }) : 'Not selected',
          cafes_calcs: formData.cafes_selection ? property.cafes.map(cafe => {
            return (formData.cafes_decision === 'Specific' & formData.cafes_detail === cafe.cleansed_name) ? { ...cafe, cafe_score: 100 } : { ...cafe, cafe_score: 10 }
          }) : 'Not selected',
          supermarkets_calcs: formData.supermarket_selection ? property.supermarkets.map(supermarket => {
            return (formData.supermarket_segment === supermarket.segment) ? { ...supermarket, supermarket_match: 1 } : { ...supermarket, supermarket_match: 0 }
          }) : 'Not selected',
          parks_calcs: formData.park_selection ? property.parks.map(park => {
            return (formData.park_type === park.park_type) ? { ...park, park_match: 1 } : { ...park, park_match: 0 }
          }) : 'Not selected',
          gym_calcs: formData.gym_selection ? property.gyms.map(gym => {
            return (formData.gym_studio_name === gym.gym_group) ? { ...gym, gym_match: 1 } : { ...gym, gym_match: 0 }
          }) : 'Not selected',
          train_calcs: property.trains ? property.trains.map(train => {
            return { ...train, train_score: (1 - (train.walking_time_mins / 5)) }
          }) : 'Not selected',
          secondaries_calcs: formData.secondary_selection ? property.secondaries.map(secondary => {
            return (secondary.ofsted_results === 'Outstanding') ? { ...secondary, secondary_score: 100 } : (secondary.ofsted_results === 'Good') ? { ...secondary, secondary_score: 20 } : { ...secondary, secondary_score: 10 }
          }) : 'Not selected',
          colleges_calcs: property.colleges ? property.colleges.map(college => {
            return (college.ofsted_results === 'Outstanding') ? { ...college, college_score: 100 } : (college.ofsted_results === 'Good') ? { ...college, college_score: 20 } : { ...college, college_score: 10 }
          }) : 'Not selected',
          takeaway_calcs: formData.takeaway_selection ? property.takeaways.map(restaurant => {
            return (restaurant.wittle_rating >= 9.6) ? { ...restaurant, takeaway_score: 15 } : (restaurant.wittle_rating >= 9.2) ? { ...restaurant, takeaway_score: 12 } : (restaurant.wittle_rating >= 9.0) ? { ...restaurant, takeaway_score: 9 } : (restaurant.wittle_rating >= 8.6) ? { ...restaurant, takeaway_score: 6 } : (restaurant.wittle_rating >= 8.2) ? { ...restaurant, takeaway_score: 4 } : (restaurant.wittle_rating >= 7.9) ? { ...restaurant, takeaway_score: 2 } : { ...restaurant, takeaway_score: 1 }
          }) : 'Not selected',

        }
      })
    console.log('calculation 1 ->', calculation)
    setCalc1(calculation)
  }

  // Second key calculation that will give a total value for each variable per property that we can use to give a match %
  const calculation2 = () => {
    const calculation =
      calc1.map(property => {
        return {
          ...property,
          restaurant_total: property.restaurant_calcs !== 'Not selected' ? property.restaurant_calcs.reduce((a, v) => {
            return a + v.restaurant_score
          }, 0) : 'Not selected',
          pub_total: property.pub_calcs !== 'Not selected' ? property.pub_calcs.reduce((a, v) => {
            return a + v.pub_score
          }, 0) : 'Not selected',
          primaries_total: property.primaries_calcs !== 'Not selected' ? property.primaries_calcs.reduce((a, v) => {
            return a + v.primary_score
          }, 0) : 'Not selected',
          tubes_total: property.tubes_calcs !== 'Not selected' ? Math.max(...property.tubes_calcs.map(o => o.tube_score), 0) : 'Not selected',
          cafes_total: property.cafes_calcs !== 'Not selected' ? property.cafes_calcs.reduce((a, v) => {
            return a + v.cafe_score
          }, 0) : 'Not selected',
          supermarkets_total: property.supermarkets_calcs !== 'Not selected' ? property.supermarkets_calcs.reduce((a, v) => {
            return a + v.supermarket_match
          }, 0) : 'Not selected',
          parks_total: property.parks_calcs !== 'Not selected' ? property.parks_calcs.reduce((a, v) => {
            return a + v.park_match
          }, 0) : 'Not selected',
          gyms_total: property.gym_calcs !== 'Not selected' ? property.gym_calcs.reduce((a, v) => {
            return a + v.gym_match
          }, 0) : 'Not selected',
          trains_total: property.train_calcs !== 'Not selected' ? Math.max(...property.train_calcs.map(o => o.train_score), 0) : 'Not selected',
          secondaries_total: property.secondaries_calcs !== 'Not selected' ? property.secondaries_calcs.reduce((a, v) => {
            return a + v.secondary_score
          }, 0) : 'Not selected',
          colleges_total: property.colleges_calcs !== 'Not selected' ? property.colleges_calcs.reduce((a, v) => {
            return a + v.college_score
          }, 0) : 'Not selected',
          takeaway_total: property.takeaway_calcs !== 'Not selected' ? property.takeaway_calcs.reduce((a, v) => {
            return a + v.takeaway_score
          }, 0) : 'Not selected',
        }
      })
    console.log('calculation 2 ->', calculation)
    setCalc2(calculation)
  }

  // Third key calculation that will allow us to establish the highest of each of the values, so we can create a %
  const calculation3 = () => {
    const calculation =
      calc2.map(property => {
        return {
          ...property,
          restaurant_max: property.restaurant_calcs !== 'Not selected' ? Math.max(...calc2.map(o => o.restaurant_total), 0) : 'Not selected',
          pub_max: property.pub_calcs !== 'Not selected' ? Math.max(...calc2.map(o => o.pub_total), 0) : 'Not selected',
          primaries_max: property.primaries_calcs !== 'Not selected' ? Math.max(...calc2.map(o => o.primaries_total), 0) : 'Not selected',
          secondaries_max: property.secondaries_calcs !== 'Not selected' ? Math.max(...calc2.map(o => o.secondaries_total), 0) : 'Not selected',
          colleges_max: property.colleges_calcs !== 'Not selected' ? Math.max(...calc2.map(o => o.colleges_total), 0) : 'Not selected',
          cafes_max: property.cafes_calcs !== 'Not selected' ? Math.max(...calc2.map(o => o.cafes_total), 0) : 'Not selected',
          takeaway_max: property.takeaway_calcs !== 'Not selected' ? Math.max(...calc2.map(o => o.takeaway_total), 0) : 'Not selected',
          restaurant_chosen: property.restaurant_total !== 'Not selected' ? 1 : 0,
          pub_chosen: property.pub_total !== 'Not selected' ? 1 : 0,
          primaries_chosen: property.primaries_total !== 'Not selected' ? 1 : 0,
          cafe_chosen: property.cafes_total !== 'Not selected' ? 1 : 0,
          tube_chosen: property.tubes_total !== 'Not selected' ? 1 : 0,
          supermarkets_chosen: property.supermarkets_total !== 'Not selected' ? 1 : 0,
          parks_chosen: property.parks_total !== 'Not selected' ? 1 : 0,
          gym_chosen: property.gyms_total !== 'Not selected' ? 1 : 0,
          secondary_chosen: property.secondaries_total !== 'Not selected' ? 1 : 0,
          college_chosen: property.colleges_total !== 'Not selected' ? 1 : 0,
          train_chosen: property.trains_total !== 'Not selected' ? 1 : 0,
          takeaway_chosen: property.takeaway_total !== 'Not selected' ? 1 : 0,
        }
      })
    console.log('calculation 3 ->', calculation)
    setCalc3(calculation)
  }

  // Fourth key calculation that will give each variable a % score
  const calculation4 = () => {
    const calculation =
      calc3.map(property => {
        return {
          ...property,
          restaurant_perc: property.restaurant_calcs !== 'Not selected' ? property.restaurant_total / property.restaurant_max : 0,
          pub_perc: property.pub_calcs !== 'Not selected' ? property.pub_total / property.pub_max : 0,
          primary_perc: property.primaries_calcs !== 'Not selected' ? property.primaries_total / property.primaries_max : 0,
          tube_perc: property.tubes_calcs !== 'Not selected' ? property.tubes_total > 0.66 ? 1 : 0.66 + (0.33 * property.tubes_total) : 0,
          cafe_perc: property.cafes_calcs !== 'Not selected' ? property.cafes_total / property.cafes_max : 0,
          supermarket_perc: property.supermarkets_calcs !== 'Not selected' ? ((property.supermarkets.length > 3 & property.supermarkets_total > 0) ? 1 : (property.supermarkets.length > 2 & property.supermarkets_total > 0) ? 0.95 : (property.supermarkets.length > 1 & property.supermarkets_total > 0) ? 0.9 : (property.supermarkets.length > 0 & property.supermarkets_total > 0) ? 0.85 : (property.supermarkets.length > 3 & property.supermarkets_total === 0) ? 0.7 : (property.supermarkets.length > 2 & property.supermarkets_total === 0) ? 0.65 : (property.supermarkets.length > 1 & property.supermarkets_total === 0) ? 0.6 : (property.supermarkets.length > 0 & property.supermarkets_total === 0) ? 0.55 : 0) : 0,
          park_perc: property.parks_calcs !== 'Not selected' ? ((property.parks_total > 1) ? 1 : (property.parks_total > 0) ? 0.90 : (property.parks_total === 0) ? 0.75 : 0) : 0,
          gym_perc: property.gym_calcs !== 'Not selected' ? ((property.gyms_total > 0 & property.gyms.length > 2) ? 1 : (property.gyms_total > 0 & property.gyms.length > 1) ? 0.95 : (property.gyms_total > 0 & property.gyms.length > 0) ? 0.9 : (property.gyms_total === 0 & property.gyms.length > 4) ? 0.85 : (property.gyms_total === 0 & property.gyms.length > 3) ? 0.8 : (property.gyms_total === 0 & property.gyms.length > 2) ? 0.75 : (property.gyms_total === 0 & property.gyms.length > 1) ? 0.7 : 0.65) : 0,
          train_perc: property.trains_total !== 'Not selected' ? (property.trains_total > 0.66 ? 1 : 0.66 + (0.66 * property.trains_total)) : 0,
          secondary_perc: property.secondaries_calcs !== 'Not selected' ? property.secondaries_total / property.secondaries_max : 0,
          college_perc: property.colleges_calcs !== 'Not selected' ? property.colleges_total / property.colleges_max : 0,
          takeaway_perc: property.takeaway_calcs !== 'Not selected' ? property.takeaway_total / property.takeaway_max : 0,
          options_chosen: property.restaurant_chosen + property.pub_chosen + property.primaries_chosen + property.cafe_chosen + property.tube_chosen + property.supermarkets_chosen + property.parks_chosen + property.gym_chosen + property.train_chosen + property.secondary_chosen + property.college_chosen + property.takeaway_chosen,
        }
      })
    console.log('calculation 4 ->', calculation)
    setCalc4(calculation)
  }

  // 5th key calculation that will give the total property a score
  const calculation5 = () => {
    const calculation =
      calc4.map(property => {
        return {
          ...property,
          first_match: parseInt(((property.restaurant_perc + property.pub_perc + property.primary_perc + property.tube_perc + property.cafe_perc + property.supermarket_perc + property.park_perc + property.gym_perc + property.train_perc + property.secondary_perc + property.college_perc + property.takeaway_perc) / property.options_chosen) * 100),
          final_restaurant: parseFloat((property.restaurant_perc * 100).toFixed(0)),
          final_takeaway: parseFloat((property.takeaway_perc * 100).toFixed(0)),
          final_cafe: parseFloat((property.cafe_perc * 100).toFixed(0)),
          final_pub: parseFloat((property.pub_perc * 100).toFixed(0)),
          final_supermarket: parseFloat((property.supermarket_perc * 100).toFixed(0)),
          final_gym: parseFloat((property.gym_perc * 100).toFixed(0)),
          final_park: parseFloat((property.park_perc * 100).toFixed(0)),
          final_tube: parseFloat((property.tube_perc * 100).toFixed(0)),
          final_train: parseFloat((property.train_perc * 100).toFixed(0)),
          final_primary: parseFloat((property.primary_perc * 100).toFixed(0)),
          final_secondary: parseFloat((property.secondary_perc * 100).toFixed(0)),
          final_college: parseFloat((property.college_perc * 100).toFixed(0)),
        }
      }).sort((a, b) => b.first_match - a.first_match)
    console.log('calculation 5 ->', calculation)
    setCalc5(calculation)
  }

  const calculation6 = () => {
    const restaurant_ranks = calc5.map(e => e.final_restaurant).sort((a, b) => b - a)
    const takeaway_ranks = calc5.map(e => e.final_takeaway).sort((a, b) => b - a)
    const pub_ranks = calc5.map(e => e.final_pub).sort((a, b) => b - a)
    const cafe_ranks = calc5.map(e => e.final_cafe).sort((a, b) => b - a)
    const supermarket_ranks = calc5.map(e => e.final_supermarket).sort((a, b) => b - a)
    const gym_ranks = calc5.map(e => e.final_gym).sort((a, b) => b - a)
    const park_ranks = calc5.map(e => e.final_park).sort((a, b) => b - a)
    const tube_ranks = calc5.map(e => e.final_tube).sort((a, b) => b - a)
    const train_ranks = calc5.map(e => e.final_train).sort((a, b) => b - a)
    const primary_ranks = calc5.map(e => e.final_primary).sort((a, b) => b - a)
    const secondary_ranks = calc5.map(e => e.final_secondary).sort((a, b) => b - a)
    const college_ranks = calc5.map(e => e.final_college).sort((a, b) => b - a)
    const average_score = calc5.reduce((a, v) => {
      return (a + v.first_match)
    }, 0) / calc5.length
    const calculation =
      calc5.map(property => {
        return {
          ...property,
          restaurant_rank: (restaurant_ranks.indexOf(property.final_restaurant) + 1),
          takeaway_rank: (takeaway_ranks.indexOf(property.final_takeaway) + 1),
          cafe_rank: (cafe_ranks.indexOf(property.final_cafe) + 1),
          pub_rank: (pub_ranks.indexOf(property.final_pub) + 1),
          supermarket_rank: (supermarket_ranks.indexOf(property.final_supermarket) + 1),
          gym_rank: (gym_ranks.indexOf(property.final_gym) + 1),
          park_rank: (park_ranks.indexOf(property.final_park) + 1),
          tube_rank: (tube_ranks.indexOf(property.final_tube) + 1),
          train_rank: (train_ranks.indexOf(property.final_train) + 1),
          primary_rank: (primary_ranks.indexOf(property.final_primary) + 1),
          secondary_rank: (secondary_ranks.indexOf(property.final_secondary) + 1),
          college_rank: (college_ranks.indexOf(property.final_college) + 1),
          average_score: parseInt(average_score),
        }
      }).sort((a, b) => b.first_match - a.first_match)
    console.log('calculation 6 ->', calculation)
    setCalc6(calculation)
    // if (calc6) {
    // addResults()
    // } else {
    //   console.log('summary values not added')
    // }
  }


  // Use effects for loading the calculation data in at the right time
  useEffect(() => {
    if (localProp)
      calculation1()
  }, [localProp])

  useEffect(() => {
    if (calc1)
      calculation2()
  }, [calc1])

  useEffect(() => {
    if (calc2)
      calculation3()
  }, [calc2])

  useEffect(() => {
    if (calc3)
      calculation4()
  }, [calc3])

  useEffect(() => {
    if (calc4)
      calculation5()
  }, [calc4])

  useEffect(() => {
    if (calc5)
      calculation6()
  }, [calc5])

  // useEffect(() => {
  //   // if (calc6)
  //   const addResults = async () => {
  //     try {
  //       console.log('in the try')
  //       const newData = {
  //         top_score: calc6[parseInt(0)].first_match,
  //         average_score: calc6[parseInt(0)].average_score,
  //         total_properties: secondProp.length,
  //       }
  //       console.log('search id ->', formData.result_id)
  //       const { data } = await axios.put(`/api/property-search/${parseInt(formData.result_id)}`, newData, {
  //         headers: {
  //           Authorization: `Bearer ${getAccessToken()}`,
  //         },
  //       })
  //       window.localStorage.setItem('wittle-form-input', JSON.stringify(data))
  //       console.log('new form data->', data)
  //       setFormData(data)
  //     } catch (error) {
  //       console.log('in the catch')
  //       console.log(error)
  //     }
  //   }
  //   addResults()
  // }, [calc6])


  // adding additional search results to form
  // const addResults = async () => {
  //   try {
  //     console.log('in the try')
  //     const newData = {
  //       top_score: calc6[parseInt(0)].first_match,
  //       average_score: calc6[parseInt(0)].average_score,
  //       total_properties: secondProp.length,
  //     }
  //     console.log('search id ->', formData.result_id)
  //     const { data } = await axios.put(`/api/property-search/${parseInt(formData.result_id)}`, newData, {
  //       headers: {
  //         Authorization: `Bearer ${getAccessToken()}`,
  //       },
  //     })
  //     window.localStorage.setItem('wittle-form-input', JSON.stringify(data))
  //     console.log('new form data->', data)
  //     setFormData(data)
  //   } catch (error) {
  //     console.log('in the catch')
  //     console.log(error)
  //   }
  // }


  // ? Managing state for modal pop up for viewing the properties on a map
  // Setting state and handles for submit modal
  const [mapShow, setMapShow] = useState(false)

  // closing thee modal
  const handleMapClose = () => {
    setMapShow(false)
    setViewport(viewport)
  }

  // showing the modal
  const handleMapShow = () => setMapShow(true)

  // control the states for maps
  const [viewport, setViewport] = useState({
    latitude: 51.515419,
    longitude: -0.141099,
    zoom: 10.5,
  })

  // state for showing map property detail
  const [mapPropertyShow, setMapProperty] = useState(false)

  // function for closing the map detail modal
  const handleMapDetailClose = () => {
    setMapProperty(false)
  }

  // state for showing the map detail
  const handleMapDetailShow = () => setMapProperty(true)


  // ? Managing states for modal to show insights on each property
  // set state for showing insights modal
  const [insightShow, setInsightShow] = useState(false)

  // state for toggling the results in the insights modal
  const [insightToggle, setInsightToggle] = useState({
    selection: '',
  })

  // close modal
  const handleInsightClose = () => {
    setInsightShow(false)
  }

  // show the modal
  const handleInsightShow = () => {
    setInsightShow(true)
    setInsightToggle({ ...insightToggle, selection: 'rank' })
  }

  // set current id on click
  const setID = e => {
    setCurrentId(parseInt(e.target.id))
  }

  // set id of property to be favourited on click
  const handleFavouriteID = e => {
    setCurrentFavouriteId(parseInt(e.target.id))
    console.log(e.target.id)
  }


  // ? Managing statez for modal to see search details in mobile view
  // set state for showing the modal
  const [searchShow, setSearchShow] = useState(false)

  // set state for closing the modal
  const handleSearchClose = () => {
    setSearchShow(false)
  }

  // set state for the modal popping up
  const handleSearchShow = () => {
    setSearchShow(true)
  }



  // ? Managing states for modal to edit a search
  // set state for showing insights modal
  const [editShow, setEditShow] = useState(false)

  // close modal
  const handleEditClose = () => {
    setEditShow(false)
  }

  // show the modal
  const handleEditShow = (e) => {
    setEditSearch(formData)
    // console.log('edit parameters ->', result)
    setEditShow(true)
  }

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


  const postEditSearch = async (e) => {
    try {
      const formData = {
        owner: editSearch.owner,
        start_search: editSearch.start_search,
        search_name: editSearch.search_name,
        search_type: 'Wittle',
        search_channel: editSearch.search_channel,
        restaurant_selection: editSearch.restaurant_selection,
        restaurant_decision: editSearch.restaurant_decision,
        restaurant_distance: editSearch.restaurant_distance,
        restaurant_cuisine_1: editSearch.restaurant_cuisine_1,
        restaurant_cuisine_2: editSearch.restaurant_cuisine_2,
        takeaway_selection: editSearch.takeaway_selection,
        takeaway_decision: editSearch.takeaway_decision,
        takeaway_distance: editSearch.takeaway_distance,
        takeaway_cuisine_1: editSearch.takeaway_cuisine_1,
        takeaway_cuisine_2: editSearch.takeaway_cuisine_2,
        pubs_selection: editSearch.pubs_selection,
        pubs_distance: editSearch.pubs_distance,
        cafes_selection: editSearch.cafes_selection,
        cafes_decision: editSearch.cafes_decision,
        cafes_detail: editSearch.cafes_detail,
        cafes_distance: editSearch.cafes_distance,
        tube_selection: editSearch.tube_selection,
        tube_decision: editSearch.tube_decision,
        tube_detail: editSearch.tube_detail,
        tube_distance: editSearch.tube_distance,
        train_selection: editSearch.train_selection,
        train_decision: editSearch.train_decision,
        train_detail: editSearch.train_detail,
        train_distance: editSearch.train_distance,
        primary_selection: editSearch.primary_selection,
        primary_religion: editSearch.primary_religion,
        primary_mode: editSearch.primary_mode,
        primary_distance: editSearch.primary_distance,
        college_selection: editSearch.college_selection,
        college_religion: editSearch.college_religion,
        college_mode: editSearch.college_mode,
        college_distance: editSearch.college_distance,
        secondary_selection: editSearch.secondary_selection,
        secondary_religion: editSearch.secondary_religion,
        secondary_mode: editSearch.secondary_mode,
        secondary_distance: editSearch.secondary_distance,
        supermarket_selection: editSearch.supermarket_selection,
        supermarket_decision: editSearch.supermarket_decision,
        supermarket_segment: editSearch.supermarket_segment,
        supermarket_size: editSearch.supermarket_size,
        supermarket_distance: editSearch.supermarket_distance,
        gym_selection: editSearch.gym_selection,
        gym_studio_name: editSearch.gym_studio_name,
        gym_class_type: editSearch.gym_class_type,
        gym_distance: editSearch.gym_distance,
        park_selection: editSearch.park_selection,
        park_type: editSearch.park_type,
        park_distance: editSearch.park_distance,
        workplace_selection: editSearch.workplace_selection,
        workplace_detail: editSearch.workplace_detail,
        workplace_transport: editSearch.workplace_transport,
        workplace_distance: editSearch.workplace_distance,
        family_selection: editSearch.family_selection,
        family_detail_1: editSearch.family_detail_1,
        family_distance_1: editSearch.family_distance_1,
        family_detail_2: editSearch.family_detail_2,
        family_distance_2: editSearch.family_distance_2,
        family_detail_3: editSearch.family_detail_3,
        family_distance_3: editSearch.family_distance_3,
        property_price_min: editSearch.property_price_min,
        property_price_max: editSearch.property_price_max,
        property_bed_min: editSearch.property_bed_min,
        property_bed_max: editSearch.property_bed_max,
        property_type: editSearch.property_type,
      }
      const { data } = await axios.put(`/api/property-search/${e.target.value}`, formData, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      window.localStorage.setItem('wittle-form-input', JSON.stringify(data))
      console.log('new form data->', data)
      setFormData(data)
      window.location.reload()
      setEditShow(false)
    } catch (error) {
      console.log(error)
    }
  }


  // ? Managing states for the drop down menus of stations and lines

  // states for holding the tube information
  const [tubeDataset, setTubeDataset] = useState([])
  const [stations, setStations] = useState([])
  const [lines, setLines] = useState([])

  // states for holding the train information
  const [trains, setTrains] = useState([])
  const [trainStations, setTrainStations] = useState([])


  // ectract tube data from the database
  useEffect(() => {
    const getTubes = async () => {
      try {
        const { data } = await axios.get('/api/tubes/')
        setTubeDataset(data)
        // console.log('tube data ->', data)
      } catch (error) {
        setErrors(true)
        console.log(error)
      }
    }
    getTubes()
  }, [])

  // extract train data from the database
  useEffect(() => {
    const getTrains = async () => {
      try {
        const { data } = await axios.get('/api/trains/')
        setTrains(data)
        // console.log('train data ->', data)
      } catch (error) {
        setErrors(true)
        console.log(error)
      }
    }
    getTrains()
  }, [])

  // create lsits so we have a dropdown
  useEffect(() => {
    if (trains.length) {
      const stationList = []
      trains.forEach(station => stationList.includes(station.station_name) ? '' : stationList.push(station.station_name))
      setTrainStations(stationList)
    }
  }, [trains])

  // create lsits so we have a dropdown
  useEffect(() => {
    if (tubeDataset.length) {
      const stationList = []
      const lineList = []
      tubeDataset.forEach(station => stationList.includes(station.station_name) ? '' : stationList.push(station.station_name))
      tubeDataset.forEach(line => lineList.includes(line.line) ? '' : lineList.push(line.line))
      setStations(stationList)
      setLines(lineList)
    }
  }, [tubeDataset])


  // ? Section to determine favouriting
  // load in the user information
  const userDataLoading = () => {
    if (isUserAuth()) {
      try {
        const getUser = async () => {
          const { data } = await axios.get(`/api/auth/profile/${getUserToken()}/`, {
            headers: {
              Authorization: `Bearer ${getAccessToken()}`,
            },
          })
          console.log('user data ->', data)
          console.log('favourites data ->', data.favourites)
          setUserData(data)
          const favouriteList = []
          data.favourites.forEach(item => favouriteList.includes(item.property) ? '' : favouriteList.push(item.property))
          setListFavourites(favouriteList)
          // setFavouritesData(data.favourites)
        }
        getUser()
      } catch (error) {
        setErrors(true)
        console.log(error)
      }
    }
  }

  // allow the user data to load on first render
  useEffect(() => {
    userDataLoading()
  }, [])


  // Favorite button handler
  const postFavourite = async (e) => {
    if (listFavourites.includes(parseInt(e.target.id)))
      try {
        const { data } = await axios.delete(`/api/favourites/${parseInt(e.target.id)}/`, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
      } catch (error) {
        console.log(error)
      }
    else
      try {
        const propertyData = calc6.filter(property => {
          return property.id === parseInt(e.target.id)
        })
        console.log(propertyData)
        const formData =
        {
          favourite: true,
          property: e.target.id,
          owner: parseInt(userData.id),
          property_name: propertyData[0].property_name,
          restaurant_score: propertyData[0].final_restaurant,
          takeaway_score: propertyData[0].final_takeaway,
          pubs_score: propertyData[0].final_pub,
          cafes_score: propertyData[0].final_cafe,
          tube_score: propertyData[0].final_tube,
          train_score: propertyData[0].final_train,
          primary_score: propertyData[0].final_primary,
          secondary_score: propertyData[0].final_secondary,
          college_score: propertyData[0].final_college,
          supermarket_score: propertyData[0].final_supermarket,
          gym_score: propertyData[0].final_gym,
          park_score: propertyData[0].final_park,
          total_score: propertyData[0].first_match,
        }
        const { data } = await axios.post('/api/favourites/', formData, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    userDataLoading()
  }


  return (
    <>
      <section className='property-detail-pages'>
        <NavBar />
        <section className='property-main-page'>
          {sidebar === 'Open' ?
            <section className='title-section' id='form-buttons'>
              <div className='logo-section'>
                <div className='logo'>
                  <h2 onClick={() => navigate('/')}>Wittle</h2>
                </div>
              </div>
              <h3>Search details &gt;</h3>
              <div className='input-sections'>
                <h5>Property</h5>
                <div className='poi'><p>Type: {formData.property_type}</p></div>


                <div className='poi'><p>Price: <NumericFormat value={formData.property_price_min} displayType={'text'} thousandSeparator={true} prefix={'£'} /> - <NumericFormat value={formData.property_price_max} displayType={'text'} thousandSeparator={true} prefix={'£'} /> </p></div>
                <div className='poi'><p>Bedrooms: {formData.property_bed_min} - {formData.property_bed_max}</p></div>
              </div>
              <div className='input-sections'>
                <h5>Points of interest</h5>
                {formData.restaurant_selection ? <div className='poi'><p>👨‍🍳 Restaurants: {formData.restaurant_distance} min walk</p></div> : ''}
                {formData.takeaway_selection ? <div className='poi'><p>🍜 Takeaways: {formData.takeaway_distance} min walk</p></div> : ''}
                {formData.cafes_selection ? <div className='poi'><p>☕️ Cafes: {formData.cafes_distance} min walk</p></div> : ''}
                {formData.pubs_selection ? <div className='poi'><p>🍻 Pubs: {formData.pubs_distance} min walk</p></div> : ''}
                {formData.supermarket_selection ? <div className='poi'><p>🛒 Supermarkets: {formData.supermarket_distance} min walk</p></div> : ''}
                {formData.gym_selection ? <div className='poi'><p>🏋️‍♂️ Gyms: {formData.gym_distance} min walk</p></div> : ''}
                {formData.park_selection ? <div className='poi'><p>🌳 Park: {formData.park_distance} min walk</p></div> : ''}
                {formData.workplace_selection ? <div className='poi'><p>✍🏼 Workplace: {formData.workplace_distance} min walk</p></div> : ''}
                {formData.tube_selection ? <div className='poi'><p>🚇 Tube stations: {formData.tube_distance} min walk</p></div> : ''}
                {formData.train_selection ? <div className='poi'><p>🚅 Train stations: {formData.train_distance} min walk</p></div> : ''}
                {formData.primary_selection ? <div className='poi'><p>🏫 Primary schools: {formData.primary_distance} min walk</p></div> : ''}
                {formData.secondary_selection ? <div className='poi'><p>🏫 Secondary schools: {formData.secondary_distance} min walk</p></div> : ''}
                {formData.college_distance ? <div className='poi'><p>🏫 6th forms: {formData.college_distance} min walk</p></div> : ''}
                {formData.family_distance_1 ? <div className='poi'><p>👨‍👩‍👧‍👦 Friends & family: {formData.family_distance_1} min walk</p></div> : ''}
              </div>
              <button onClick={handleEditShow} className='edit-button'>Edit</button>
              <div className='sidebar-button'>
                <button onClick={() => sidebar === 'Open' ? setSidebar('Close') : sidebar}>&#60;</button>
              </div>
            </section>
            :
            sidebar === 'Close' ?
              <section className='title-section' style={{ width: '0px' }} id='form-buttons'>
                <div className="closed-sidebar">
                  <div className='sidebar-button'>
                    {/* <button onClick={() => sidebar === 'Close' ? setSidebar('Open') : sidebar}>&#62;</button> */}
                  </div>
                </div>
              </section>
              : ''}
          {calc5 ? sidebar === 'Open' ?
            <>
              <section className='property-results' style={{ marginLeft: '200px' }}>
                <div className='property-results-title'>
                  <div className='title-buttons'>
                    <button className='modal-map' onClick={handleMapShow} data-toggle='modal' >View on map</button>
                  </div>
                  <div className='title-centre'>
                    <h1 className='property-count'>{formData.search_name}: {calc5.length} potential properties</h1>
                  </div>
                </div>
                <div className='property-grid'>
                  {calc5.map((property, index) => {
                    return (
                      <>
                        <div className='property-card' key={index} onClick={setID} name={index}>
                          <div className='mobile-name'>
                            <h2>{property.property_name}</h2>
                            <h4 onClick={handleInsightShow} id={index}>🔥 {property.first_match}% match</h4>
                          </div>
                          <div className='image-card' style={{ backgroundImage: `url('${property.property_image_1}')` }} >
                            <div className='property-image-details'>
                              {formData.search_channel === 'Renting' ?
                                <h3 onClick={() => navigate(`/wittle-results/${property.id}`)}><NumericFormat value={property.monthly} displayType={'text'} thousandSeparator={true} prefix={'£'} /> pcm</h3>
                                :
                                <h3 onClick={() => navigate(`/wittle-results/${property.id}`)}>Fixed Price: <NumericFormat value={property.value} displayType={'text'} thousandSeparator={true} prefix={'£'} /> </h3>
                              }
                            </div>
                          </div>
                          <div className='detail-section' onClick={setID} id={property.id}>
                            <Link to={(`/wittle-results/${property.id}`)} style={{ textDecoration: 'none' }}><h2 className='property-desktop' onClick={(e) => window.localStorage.setItem('wittle-current-match', JSON.stringify(e.target.id))} id={property.first_match}>{property.property_name}</h2></Link>
                            <h4 className='property-desktop' id={property.id} onClick={handleInsightShow}>🔥 {property.first_match}% match</h4>
                            <div className='property-buttons'>
                              <h5 onClick={() => setPropertyButtons('Insights')} style={{ color: propertyButtons === 'Insights' ? '#FFA7E5' : '#051885' }}>Insights</h5>
                              <h5 onClick={() => setPropertyButtons('Description')} style={{ color: propertyButtons === 'Description' ? '#FFA7E5' : '#051885' }}>Description</h5>
                              <h5 onClick={() => setPropertyButtons('Floorplan')} style={{ color: propertyButtons === 'Floorplan' ? '#FFA7E5' : '#051885' }}>Floorplan</h5>
                              <h5 onClick={() => setPropertyButtons('Documents')} style={{ color: propertyButtons === 'Documents' ? '#FFA7E5' : '#051885' }}>Documents</h5>
                            </div>
                            <div className='property-button-expansion'>
                              {propertyButtons === 'Description' ?
                                <>
                                  <div className='description-stats'>
                                    <p className='description-text'>Type: {property.type}</p>
                                    <p className='description-text'>Bedrooms: {property.bedrooms}</p>
                                    <p className='description-text'>Bathrooms: 2</p>
                                  </div>
                                  <p className='description-text'>{property.property_description}</p>
                                </>
                                : ''}
                              {propertyButtons === 'Insights' ?
                                <>
                                  {formData.restaurant_selection & property.restaurant_chosen === 1 ? <p className='insight-bullets'>👨‍🍳 {property.restaurants.length} restaurants <span>(within {formData.restaurant_distance} min walk)</span></p> : ''}
                                  {formData.pubs_selection & property.pub_chosen === 1 ? <p className='insight-bullets'>🍻{property.bars.length} bars <span>(within {formData.pubs_distance} min walk)</span></p> : ''}
                                  {formData.cafes_selection & property.cafe_chosen === 1 ? <p className='insight-bullets'>☕️ {property.cafes.length} cafes <span>(within {formData.cafes_distance} min walk)</span></p> : ''}
                                  {formData.takeaway_selection & property.takeaway_chosen === 1 ? <p className='insight-bullets'>☕️ {property.takeaways.length} takeaways <span>(within {formData.takeaway_distance} min walk)</span></p> : ''}
                                  {formData.primary_selection & property.primaries_chosen === 1 ? <p className='insight-bullets'>🏫 {property.primaries.length} primary schools <span>(within {formData.primary_distance} min walk)</span></p> : ''}
                                  {formData.secondary_selection & property.secondary_chosen === 1 ? <p className='insight-bullets'>🏫 {property.secondaries.length} secondary schools <span>(within {formData.secondary_distance} min walk)</span></p> : ''}
                                  {formData.college_selection & property.college_chosen === 1 ? <p className='insight-bullets'>🏫 {property.colleges.length} 6th forms <span>(within {formData.college_distance} min walk)</span></p> : ''}
                                  {formData.supermarket_selection & property.supermarkets_chosen === 1 ? <p className='insight-bullets'>🛒 {property.supermarkets.length} supermarkets <span>(within {formData.supermarket_distance} min walk)</span></p> : ''}
                                  {formData.gym_selection & property.gym_chosen === 1 ? <p className='insight-bullets'>🏋️‍♂️ {property.gyms.length} gyms <span>(within {formData.gym_distance} min walk)</span></p> : ''}
                                  {formData.park_selection & property.parks_chosen === 1 ? <p className='insight-bullets'>🌳 {property.parks.length} parks <span>(within {formData.park_distance} min walk)</span></p> : ''}
                                  {formData.tube_selection & property.tube_chosen === 1 ? <p className='insight-bullets'>🚇 {property.tubes.length} tube stations <span>(within {formData.tube_distance} min walk)</span></p> : ''}
                                  {formData.train_selection & property.train_chosen === 1 ? <p className='insight-bullets'>🚊 {property.trains.length} train stations <span>(within {formData.train_distance} min walk)</span></p> : ''}
                                </>
                                : ''}
                            </div>
                          </div>
                        </div>
                        <hr className='mobile-line' />
                      </>
                    )
                  })}
                </div>
              </section>
            </>
            :
            sidebar === 'Close' ?
              <>
                <section className='property-results' id='close' style={{ marginLeft: '0px' }}>
                  <div className='property-results-title'>
                    <div className='title-buttons'>
                      <button className='filter-button' onClick={() => sidebar === 'Close' ? setSidebar('Open') : sidebar}>My filters</button>
                      <button className='modal-map' onClick={handleMapShow} data-toggle='modal' >View on map</button>
                      <button className='mobile-filter-button' onClick={handleSearchShow}>My filters</button>

                    </div>
                    <div className='title-centre'>
                      <h1 className='property-count'>{formData.search_name}: {calc5.length} potential properties</h1>
                    </div>
                  </div>
                  <div className='property-grid'>
                    {calc5.map((property, index) => {
                      return (
                        <>
                          <div className='property-card' key={index}>
                            <div className='mobile-name'>
                              <h2>{property.property_name}</h2>
                              <h4 onClick={handleInsightShow} id={property.id}>🔥 {property.first_match}% match</h4>
                            </div>
                            <div className='image-card' id={property.id} style={{ backgroundImage: `url('${property.property_image_1}')` }}>
                              <div className='property-image-details'>
                                {formData.search_channel === 'Renting' ?
                                  <h3 onClick={() => navigate(`/wittle-results/${property.id}`)}><NumericFormat value={property.monthly} displayType={'text'} thousandSeparator={true} prefix={'£'} /> pcm</h3>
                                  :
                                  <h3 onClick={() => navigate(`/wittle-results/${property.id}`)}>Fixed Price: <NumericFormat value={property.value} displayType={'text'} thousandSeparator={true} prefix={'£'} /> </h3>
                                }
                              </div>
                              {listFavourites ?
                                <div className='favourite-section' id={property.id} onClick={postFavourite}>
                                  {listFavourites.includes(property.id) ?
                                    <div className='favourite-button-on' id={property.id} ></div>
                                    :
                                    <div className='favourite-button-off' id={property.id} ></div>
                                  }
                                </div>
                                : ''}
                            </div>
                            <div className='detail-section' value={parseInt(property.first_match)} onClick={setID} id={property.id}>
                              <Link to={(`/wittle-results/${property.id}`)} style={{ textDecoration: 'none' }}><h2 className='property-desktop' onClick={(e) => window.localStorage.setItem('wittle-current-match', JSON.stringify(e.target.id))} id={property.first_match}>{property.property_name}</h2></Link>
                              <h4 onClick={handleInsightShow} id={property.id} className='property-desktop'>🔥 {property.first_match}% match</h4>
                              <div className='property-buttons'>
                                <h5 onClick={() => setPropertyButtons('Insights')} style={{ color: propertyButtons === 'Insights' ? '#FFA7E5' : '#051885' }}>Insights</h5>
                                <h5 onClick={() => setPropertyButtons('Description')} style={{ color: propertyButtons === 'Description' ? '#FFA7E5' : '#051885' }}>Description</h5>                                
                                <h5 onClick={() => setPropertyButtons('Floorplan')} style={{ color: propertyButtons === 'Floorplan' ? '#FFA7E5' : '#051885' }}>Floorplan</h5>
                                <h5 onClick={() => setPropertyButtons('Documents')} style={{ color: propertyButtons === 'Documents' ? '#FFA7E5' : '#051885' }}>Documents</h5>
                              </div>
                              <div className='property-button-expansion'>
                                {propertyButtons === 'Description' ?
                                  <>
                                    <div className='description-stats'>
                                      <p className='description-text'>Type: {property.type}</p>
                                      <p className='description-text'>Bedrooms: {property.bedrooms}</p>
                                      <p className='description-text'>Bathrooms: 2</p>
                                    </div>
                                    <p className='description-text'>{property.property_description}</p>
                                  </>
                                  : ''}
                                {propertyButtons === 'Insights' ?
                                  <>
                                    {formData.restaurant_selection & property.restaurant_chosen === 1 ? <p className='insight-bullets'>👨‍🍳 {property.restaurants.length} restaurants <span>(within {formData.restaurant_distance} min walk)</span></p> : ''}
                                    {formData.pubs_selection & property.pub_chosen === 1 ? <p className='insight-bullets'>🍻{property.bars.length} bars <span>(within {formData.pubs_distance} min walk)</span></p> : ''}
                                    {formData.cafes_selection & property.cafe_chosen === 1 ? <p className='insight-bullets'>☕️ {property.cafes.length} cafes <span>(within {formData.cafes_distance} min walk)</span></p> : ''}
                                    {formData.takeaway_selection & property.takeaway_chosen === 1 ? <p className='insight-bullets'>☕️ {property.takeaways.length} takeaways <span>(within {formData.takeaway_distance} min walk)</span></p> : ''}
                                    {formData.primary_selection & property.primaries_chosen === 1 ? <p className='insight-bullets'>🏫 {property.primaries.length} primary schools <span>(within {formData.primary_distance} min walk)</span></p> : ''}
                                    {formData.secondary_selection & property.secondary_chosen === 1 ? <p className='insight-bullets'>🏫 {property.secondaries.length} secondary schools <span>(within {formData.secondary_distance} min walk)</span></p> : ''}
                                    {formData.college_selection & property.college_chosen === 1 ? <p className='insight-bullets'>🏫 {property.colleges.length} 6th forms <span>(within {formData.college_distance} min walk)</span></p> : ''}
                                    {formData.supermarket_selection & property.supermarkets_chosen === 1 ? <p className='insight-bullets'>🛒 {property.supermarkets.length} supermarkets <span>(within {formData.supermarket_distance} min walk)</span></p> : ''}
                                    {formData.gym_selection & property.gym_chosen === 1 ? <p className='insight-bullets'>🏋️‍♂️ {property.gyms.length} gyms <span>(within {formData.gym_distance} min walk)</span></p> : ''}
                                    {formData.park_selection & property.parks_chosen === 1 ? <p className='insight-bullets'>🌳 {property.parks.length} parks <span>(within {formData.park_distance} min walk)</span></p> : ''}
                                    {formData.tube_selection & property.tube_chosen === 1 ? <p className='insight-bullets'>🚇 {property.tubes.length} tube stations <span>(within {formData.tube_distance} min walk)</span></p> : ''}
                                    {formData.train_selection & property.train_chosen === 1 ? <p className='insight-bullets'>🚊 {property.trains.length} train stations <span>(within {formData.train_distance} min walk)</span></p> : ''}
                                  </>
                                  : ''}
                              </div>
                            </div>
                          </div>
                          <hr className='mobile-line' />
                        </>
                      )
                    })}
                  </div>
                </section>
              </>
              : '' : ''}
        </section>
      </section>
      <div className='property-map-detail'>
        <Modal show={mapShow} onHide={handleMapClose} backdrop='static' className='map-modal'>
          <Modal.Body>
            {calc5 ?
              <>
                <div className='map-header'>
                  <h3 className='map-title'>{formData.search_name}: {calc5.length} potential properties</h3>
                  <button onClick={handleMapClose}>Close map</button>
                </div>
                <ReactMapGL {...viewport}
                  mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                  mapStyle='mapbox://styles/mapbox/streets-v11'
                  onViewportChange={viewport => {
                    setViewport(viewport)
                  }}
                  center={viewport}
                  onMove={evt => setViewport(evt.viewport)}>
                  {calc5 ?
                    <div className='poi-icons'>
                      {calc5.map((property, index) => {
                        return (
                          <div key={property.id}>
                            <>
                              <Marker longitude={property.long} latitude={property.Lat} key={index} titleAccess={property.property_name} id='house-icon' >
                                <div className='house-btn' onClick={() => navigate(`/wittle-results/${property.id}`)} id={property.id} onMouseEnter={iconSetting}>

                                </div>
                              </Marker>
                              {(showPopup & property.id === iconId) && (
                                <Popup key={index} id={property.id} longitude={property.long} latitude={property.Lat} closeOnClick={false}>
                                  <div className='property-popup'>
                                    <div className='property-image' style={{ backgroundImage: `url('${property.property_image_1}')` }}>

                                    </div>
                                    <div className='property-details'>
                                      <h1>{property.property_name}</h1>
                                      <h4>{property.first_match}% match</h4>
                                      <h4><NumericFormat value={property.value} displayType={'text'} thousandSeparator={true} prefix={'£'} /> offers over</h4>
                                    </div>

                                  </div>

                                </Popup>

                              )}
                            </>
                          </div>
                        )
                      })}

                    </div>
                    : ''}
                </ReactMapGL>
              </>
              : ''}

          </Modal.Body>
        </Modal>
      </div>
      <div className='property-insights-container'>
        <Modal show={insightShow} onHide={handleInsightClose} backdrop='static' className='insights-modal'>
          <Modal.Body>
            {calc6 ?
              <>
                <div className='insights-body'>
                  {calc6.filter(property => property.id === currentId).map((property, index) => {
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
                                {insightToggle.selection === 'Match %' ? <h4 className='insights-modal-score'>{property.final_restaurant}%</h4> : <h4 className='insights-modal-score'>#{property.restaurant_rank}</h4>}
                              </div>
                            </div>
                            : ''}

                          {/* takeaways bars */}
                          {formData.takeaway_selection ?
                            <div className='insights-modal-results'>
                              <h4 className='insights-modal-variables'>🍜 Takeaways</h4>
                              <div className='insights-modal-right'>
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
                                {insightToggle.selection === 'Match %' ? <h4 className='insights-modal-score'>{property.final_takeaway}%</h4> : <h4 className='insights-modal-score'>#{property.takeaway_rank}</h4>}
                              </div>
                            </div>
                            : ''}
                          {/* pub bars */}
                          {formData.pubs_selection ?
                            <div className='insights-modal-results'>
                              <h4 className='insights-modal-variables'>🍻 Pubs</h4>
                              <div className='insights-modal-right'>
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
                                {insightToggle.selection === 'Match %' ? <h4 className='insights-modal-score'>{property.final_pub}%</h4> : <h4 className='insights-modal-score'>#{property.pub_rank}</h4>}
                              </div>
                            </div>
                            : ''}
                          {/* cafe bars */}
                          {formData.cafes_selection ?
                            <div className='insights-modal-results'>
                              <h4 className='insights-modal-variables'>☕️ Cafes</h4>
                              <div className='insights-modal-right'>
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
                                {insightToggle.selection === 'Match %' ? <h4 className='insights-modal-score'>{property.final_cafe}%</h4> : <h4 className='insights-modal-score'>#{property.cafe_rank}</h4>}
                              </div>
                            </div>
                            : ''}
                          {/* primaries bars */}
                          {formData.primary_selection ?
                            <div className='insights-modal-results'>
                              <h4 className='insights-modal-variables'>🏫 Primaries</h4>
                              <div className='insights-modal-right'>
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
                                {insightToggle.selection === 'Match %' ? <h4 className='insights-modal-score'>{property.final_primary}%</h4> : <h4 className='insights-modal-score'>#{property.primary_rank}</h4>}
                              </div>
                            </div>
                            : ''}
                          {/* secondaries bars */}
                          {formData.secondary_selection ?
                            <div className='insights-modal-results'>
                              <h4 className='insights-modal-variables'>🏫 Secondaries</h4>
                              <div className='insights-modal-right'>
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
                                {insightToggle.selection === 'Match %' ? <h4 className='insights-modal-score'>{property.final_secondary}%</h4> : <h4 className='insights-modal-score'>#{property.secondary_rank}</h4>}
                              </div>
                            </div>
                            : ''}
                          {/* supermarkets bars */}
                          {formData.supermarket_selection ?
                            <div className='insights-modal-results'>
                              <h4 className='insights-modal-variables'>👨‍🍳 Supermarkets</h4>
                              <div className='insights-modal-right'>
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
                                {insightToggle.selection === 'Match %' ? <h4 className='insights-modal-score'>{property.final_supermarket}%</h4> : <h4 className='insights-modal-score'>#{property.supermarket_rank}</h4>}
                              </div>
                            </div>
                            : ''}
                          {/* gyms bars */}
                          {formData.gym_selection ?
                            <div className='insights-modal-results'>
                              <h4 className='insights-modal-variables'>🏋️‍♂️ Gyms</h4>
                              <div className='insights-modal-right'>
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
                                {insightToggle.selection === 'Match %' ? <h4 className='insights-modal-score'>{property.final_gym}%</h4> : <h4 className='insights-modal-score'>#{property.gym_rank}</h4>}
                              </div>
                            </div>
                            : ''}
                          {/* tubes bars */}
                          {formData.tube_selection ?
                            <div className='insights-modal-results'>
                              <h4 className='insights-modal-variables'>🚇 Tubes</h4>
                              <div className='insights-modal-right'>
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
                                {insightToggle.selection === 'Match %' ? <h4 className='insights-modal-score'>{property.final_tube}%</h4> : <h4 className='insights-modal-score'>#{property.tube_rank}</h4>}
                              </div>
                            </div>
                            : ''}
                          {/* parks bars */}
                          {formData.park_selection ?
                            <div className='insights-modal-results'>
                              <h4 className='insights-modal-variables'>🌳 Parks</h4>
                              <div className='insights-modal-right'>
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
                                {insightToggle.selection === 'Match %' ? <h4 className='insights-modal-score'>{property.final_park}%</h4> : <h4 className='insights-modal-score'>#{property.park_rank}</h4>}
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
      </div>
      <div className='edit-modal-section'>
        <Modal show={editShow} onHide={handleEditClose} backdrop='static' className='edit-modal'>
          <Modal.Body>
            {editSearch ?
              <>
                <div className='modal-header'>
                  <div className='modal-header-text'>
                    <h1 className='submit-title'>Edit your Wittle search</h1>
                  </div>
                  <div className='modal-sub-text'>
                    <p className='submit-detail'>Make changes to current inputs, or add some that you missed off last time</p>
                    <button onClick={handleEditClose} className='add-button'>Close</button>
                  </div>
                </div>
                <hr className='edit-divider' />
                <div className='modal-detail'>
                  <div className='input-section'>
                    <h1 className='submit-title'>Hospitality</h1>
                    {/* Restaurants */}

                    <div className='input-line'>
                      <div className='title-section'>
                        <h3 className='sub-title'>Restaurants</h3>

                        <div className='section-buttons'>
                          {editSearch.restaurant_selection ? <button name='restaurant_selection' onClick={() => setEditSearch({ ...editSearch, restaurant_selection: false })} value='false' className='delete-button'>Remove</button> : <button name='restaurant_selection' onClick={() => setEditSearch({ ...editSearch, restaurant_selection: true })} value='true' className='add-button'>Add</button>}
                        </div>
                      </div>
                      {editSearch.restaurant_selection ?
                        <div className='section-detail'>
                          <div className='section-blocks'>
                            <h3>Restaurant decision</h3>
                            <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, restaurant_decision: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='restaurant_decision'>
                              <option>{editSearch.restaurant_decision} (selected)</option>
                              <option>Any restaurants</option>
                              <option>Specific cuisine</option>
                            </select>
                          </div>
                          <div className='section-blocks'>
                            <h3>Cuisine</h3>
                            <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, restaurant_cuisine_1: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='restaurant_cuisine_1'>
                              <option>{editSearch.restaurant_cuisine_1} (selected)</option>
                              <option>American</option>
                              <option>Asian</option>
                              <option>Bar</option>
                              <option>British</option>
                              <option>Central American</option>
                              <option>Central Asian</option>
                              <option>Chicken</option>
                              <option>Chinese</option>
                              <option>European</option>
                              <option>French</option>
                              <option>Gastro Pub</option>
                              <option>Greek</option>
                              <option>Indian</option>
                              <option>International</option>
                              <option>Italian</option>
                              <option>Japanese</option>
                              <option>Meat & Grill</option>
                              <option>Mediterranean</option>
                              <option>Mexican</option>
                              <option>Middle Eastern</option>
                              <option>Modern</option>
                              <option>North African</option>
                              <option>Pizza</option>
                              <option>Pub food</option>
                              <option>Seafood</option>
                              <option>South African</option>
                              <option>South American</option>
                              <option>South East Asian</option>
                              <option>Spanish</option>
                              <option>Thai</option>
                              <option>Turkish</option>
                              <option>Vegetarian/ Vegan</option>
                              <option>Vietnamese</option>
                              <option>Wine Bar</option>
                            </select>
                          </div>
                          <div className='section-blocks'>

                            <h3>Walking distance</h3>
                            <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, restaurant_distance: e.target.value })} name='restaurant_distance' placeholder={editSearch.restaurant_distance}></input>
                          </div>
                        </div>
                        : ''}
                    </div>
                    {/* Cafes */}
                    <div className='input-line'>
                      <div className='title-section'>
                        <h3 className='sub-title'>Cafes</h3>
                        <div className='section-buttons'>
                          {editSearch.cafes_selection ? <button name='cafes_selection' onClick={() => setEditSearch({ ...editSearch, cafes_selection: false })} value='false' className='delete-button'>Remove</button> : <button name='cafes_selection' onClick={() => setEditSearch({ ...editSearch, cafes_selection: true })} value='true' className='add-button'>Add</button>}
                        </div>
                      </div>
                      {editSearch.cafes_selection ?
                        <div className='section-detail'>
                          <div className='section-blocks'>
                            <h3>Cafe decision</h3>
                            <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, cafes_decision: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='cafes_decision'>
                              <option>{editSearch.cafes_decision} (selected)</option>
                              <option>General cafes</option>
                              <option>Specific cafe</option>
                            </select>
                          </div>
                          {editSearch.cafes_decision !== '' || editSearch.cafes_decision === 'Specific cafe' ?
                            <>
                              <div className='section-blocks'>
                                <h3>Cafe</h3>
                                <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, cafes_detail: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='cafes_detail'>
                                  <option>{editSearch.cafes_detail} (selected)</option>
                                  <option>Black Sheep Coffee</option>
                                  <option>Cafe Nero</option>
                                  <option>Costa Coffee</option>
                                  <option>Gail&apos;s</option>
                                  <option>Grind</option>
                                  <option>Joe & The Juice</option>
                                  <option>Pattiserie Valerie</option>
                                  <option>Pret</option>
                                </select>
                              </div>
                            </>
                            : ''}
                          <div className='section-blocks'>
                            <h3>Walking distance</h3>
                            <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, cafes_distance: e.target.value })} name='cafes_distance' placeholder={editSearch.cafes_distance}></input>
                          </div>
                        </div>
                        : ''}
                    </div>
                    {/* Takeaways */}
                    <div className='input-line'>
                      <div className='title-section'>
                        <h3 className='sub-title'>Takeaways</h3>

                        <div className='section-buttons'>
                          {editSearch.takeaway_selection ? <button name='takeaway_selection' onClick={() => setEditSearch({ ...editSearch, takeaway_selection: false })} value='false' className='delete-button'>Remove</button> : <button name='takeaway_selection' onClick={() => setEditSearch({ ...editSearch, takeaway_selection: true })} value='true' className='add-button'>Add</button>}
                        </div>
                      </div>
                      {editSearch.takeaway_selection ?
                        <div className='section-detail'>
                          <div className='section-blocks'>
                            <h3>Takeaway decision</h3>
                            <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, takeaway_decision: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='takeaway_decision'>
                              <option>{editSearch.takeaway_decision} (selected)</option>
                              <option>Any takeaway</option>
                              <option>Specific cuisine</option>
                            </select>
                          </div>
                          <div className='section-blocks'>
                            <h3>Cuisine</h3>
                            <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, takeaway_cuisine_1: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='takeaway_cuisine_1'>
                              <option>{editSearch.takeaway_cuisine_1} (selected)</option>
                              <option>American</option>
                              <option>Asianfusion</option>
                              <option>Breakfast</option>
                              <option>British</option>
                              <option>Brunch</option>
                              <option>Chinese</option>
                              <option>Healthy</option>
                              <option>Indian</option>
                              <option>Italian</option>
                              <option>Japanese</option>
                              <option>Korean</option>
                              <option>Mediterranean</option>
                              <option>Mexican</option>
                              <option>Thai</option>
                              <option>Turkish</option>
                              <option>Vietnamese</option>
                            </select>
                          </div>
                          <div className='section-blocks'>
                            <h3>Walking distance</h3>
                            <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, takeaway_distance: e.target.value })} name='takeaway_distance' placeholder={editSearch.takeaway_distance}></input>
                          </div>
                        </div>
                        : ''}
                    </div>
                    {/* Pubs */}
                    <div className='input-line'>
                      <div className='title-section'>
                        <h3 className='sub-title'>Pubs</h3>
                        <div className='section-buttons'>
                          {editSearch.pubs_selection ? <button name='pubs_selection' onClick={() => setEditSearch({ ...editSearch, pubs_selection: false })} value='false' className='delete-button'>Remove</button> : <button name='pubs_selection' onClick={() => setEditSearch({ ...editSearch, pubs_selection: true })} value='true' className='add-button'>Add</button>}
                        </div>
                      </div>
                      {editSearch.pubs_selection ?
                        <div className='section-detail'>
                          <div className='section-blocks'>
                            <h3>Walking distance</h3>
                            <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, pubs_distance: e.target.value })} name='pubs_distance' placeholder={editSearch.pubs_distance}></input>
                          </div>
                        </div>
                        : ''}
                    </div>
                    <hr className='inner-divider' />
                    {/* Second section - lifestyle */}
                    <h1 className='section-header'>Lifestyle</h1>
                    {/* Supermarkets */}
                    <div className='input-line'>
                      <div className='title-section'>
                        <h3 className='sub-title'>Supermarkets</h3>
                        <div className='section-buttons'>
                          {editSearch.supermarket_selection ? <button name='supermarket_selection' onClick={() => setEditSearch({ ...editSearch, supermarket_selection: false })} value='false' className='delete-button'>Remove</button> : <button name='supermarket_selection' onClick={() => setEditSearch({ ...editSearch, supermarket_selection: true })} value='true' className='add-button'>Add</button>}
                        </div>
                      </div>
                      {editSearch.supermarket_selection ?
                        <div className='section-detail'>
                          <div className='section-blocks'>
                            <h3>Supermarket decision</h3>
                            <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, supermarket_decision: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='supermarket_decision'>
                              <option>{editSearch.supermarket_decision} (selected)</option>
                              <option>Any supermarket</option>
                              <option>Specific supermarket</option>
                            </select>
                          </div>
                          <div className='section-blocks'>
                            <h3>Type</h3>
                            <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, supermarket_segment: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='supermarket_segment'>
                              <option>{editSearch.supermarket_segment} (selected)</option>
                              <option>Budget</option>
                              <option>Convenience</option>
                              <option>Mainstream</option>
                              <option>Premium</option>
                            </select>
                          </div>
                          <div className='section-blocks'>
                            <h3>Size</h3>
                            <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, supermarket_size: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='supermarket_size'>
                              <option>{editSearch.supermarket_size} (selected)</option>
                              <option>Don&apos;t mind</option>
                              <option>Small </option>
                              <option>Medium</option>
                              <option>Large</option>
                            </select>
                          </div>
                          <div className='section-blocks'>
                            <h3>Walking distance</h3>
                            <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, supermarket_distance: e.target.value })} name='supermarket_distance' placeholder={editSearch.supermarket_distance}></input>
                          </div>
                        </div>
                        : ''}
                    </div>
                    {/* Gyms */}
                    <div className='input-line'>
                      <div className='title-section'>
                        <h3 className='sub-title'>Gyms</h3>
                        <div className='section-buttons'>
                          {editSearch.gym_selection ? <button name='gym_selection' onClick={() => setEditSearch({ ...editSearch, gym_selection: false })} value='false' className='delete-button'>Remove</button> : <button name='gym_selection' onClick={() => setEditSearch({ ...editSearch, gym_selection: true })} value='true' className='add-button'>Add</button>}
                        </div>
                      </div>
                      {editSearch.gym_selection ?
                        <div className='section-detail'>
                          <div className='section-blocks'>
                            <h3>Studio</h3>
                            <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, gym_studio_name: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='gym_studio_name'>
                              <option>{editSearch.gym_studio_name} (selected)</option>
                              <option>No preference</option>
                              <option>1Rebel</option>
                              <option>Barry&apos;s</option>
                              <option>Fitness First</option>
                              <option>Gymbox</option>
                              <option>MoreYoga</option>
                              <option>Nuffield Health</option>
                              <option>Pure Gym</option>
                              <option>The Gym Group</option>
                              <option>Third Space</option>
                              <option>Virgin</option>
                            </select>
                          </div>
                          <div className='section-blocks'>
                            <h3>Walking distance</h3>
                            <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, gym_distance: e.target.value })} name='gym_distance' placeholder={editSearch.gym_distance}></input>
                          </div>
                        </div>
                        : ''}
                    </div>
                    {/* Parks */}
                    <div className='input-line'>
                      <div className='title-section'>
                        <h3 className='sub-title'>Parks</h3>

                        <div className='section-buttons'>
                          {editSearch.park_selection ? <button name='park_selection' onClick={() => setEditSearch({ ...editSearch, park_selection: false })} value='false' className='delete-button'>Remove</button> : <button name='park_selection' onClick={() => setEditSearch({ ...editSearch, park_selection: true })} value='true' className='add-button'>Add</button>}
                        </div>
                      </div>
                      {editSearch.park_selection ?
                        <div className='section-detail'>
                          <div className='section-blocks'>
                            <h3>Park</h3>
                            <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, park_type: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='park_type'>
                              <option>{editSearch.park_type} (selected)</option>
                              <option>Large park &#40;long walks or runs&#41;</option>
                              <option>Medium sized park &#40;big enough for activities&#41;</option>
                              <option>Small square &#40;read a book&#41;</option>
                            </select>
                          </div>
                          <div className='section-blocks'>
                            <h3>Walking distance</h3>
                            <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, park_distance: e.target.value })} name='park_distance' placeholder={editSearch.park_distance}></input>
                          </div>
                        </div>
                        : ''}
                    </div>
                    {/* Workplace */}
                    <div className='input-line'>
                      <div className='title-section'>
                        <h3 className='sub-title'>Workplace</h3>
                        <div className='section-buttons'>
                          {editSearch.workplace_selection ? <button name='workplace_selection' onClick={() => setEditSearch({ ...editSearch, workplace_selection: false })} value='false' className='delete-button'>Remove</button> : <button name='workplace_selection' onClick={() => setEditSearch({ ...editSearch, workplace_selection: true })} value='true' className='add-button'>Add</button>}
                        </div>
                      </div>
                      {editSearch.workplace_selection ?
                        <div className='section-detail'>
                          <div className='section-blocks'>
                            <h3>Postcode</h3>
                          </div>
                          <input className='input-postcode' onChange={(e) => setEditSearch({ ...editSearch, workplace_detail: e.target.value })} name='workplace_detail' placeholder={editSearch.workplace_detail}></input>
                          <div className='section-blocks'>
                            <h3>Transport</h3>
                            <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, workplace_transport: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='workplace_transport'>
                              <option>{editSearch.workplace_transport} (selected)</option>
                              <option>Walking</option>
                              <option>Cycling</option>
                              <option>Driving/ transport</option>
                            </select>
                          </div>
                          <div className='section-blocks'>
                            <h3>Walking distance</h3>
                            <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, workplace_distance: e.target.value })} name='workplace_distance' placeholder={editSearch.workplace_distance}></input>
                          </div>
                        </div>
                        : ''}
                    </div>
                    <hr className='inner-divider' />

                    {/* Third section - Travel */}
                    <h1 className='section-header'>Travel</h1>
                    {/* Tubes */}
                    <div className='input-line'>
                      <div className='title-section'>
                        <h3 className='sub-title'>Tubes</h3>
                        <div className='section-buttons'>
                          {editSearch.tube_selection ? <button name='tube_selection' onClick={() => setEditSearch({ ...editSearch, tube_selection: false })} value='false' className='delete-button'>Remove</button> : <button name='tube_selection' onClick={() => setEditSearch({ ...editSearch, tube_selection: true })} value='true' className='add-button'>Add</button>}
                        </div>
                      </div>
                      {editSearch.tube_selection ?
                        <div className='section-detail'>
                          <div className='section-blocks'>
                            <h3>Tube decision</h3>
                            <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, tube_decision: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='tube_decision'>
                              <option>{editSearch.tube_decision} (selected)</option>
                              <option>General tube station</option>
                              <option>Specific tube station</option>
                              <option>Specific tube line</option>
                            </select>
                          </div>
                          {editSearch.tube_decision === 'Specific tube station' ?
                            <div className='section-blocks'>
                              <>
                                <h3>Station</h3>
                                <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, tube_detail: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='tube_detail'>
                                  <option>{editSearch.tube_detail} (selected)</option>
                                  {stations ? stations.map(station => <option key={station} value={station}>{station}</option>) : ''}
                                </select>

                              </>
                            </div>
                            : editSearch.tube_decision === 'Specific tube line' ?
                              <div className='section-blocks'>
                                <>
                                  <h3>Line</h3>
                                  <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, tube_detail: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='tube_detail'>
                                    <option>{editSearch.tube_detail} (selected)</option>
                                    {lines.map(line => <option key={line} value={line}>{line}</option>)}
                                  </select>
                                </>
                              </div>
                              : ''}
                          <div className='section-blocks'>
                            <h3>Walking distance</h3>
                            <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, tube_distance: e.target.value })} name='tube_distance' placeholder={editSearch.tube_distance}></input>
                          </div>
                        </div>
                        : ''}
                    </div>
                    {/* Trains */}
                    <div className='input-line'>
                      <div className='title-section'>
                        <h3 className='sub-title'>Trains</h3>
                        <div className='section-buttons'>
                          {editSearch.train_selection ? <button name='train_selection' onClick={() => setEditSearch({ ...editSearch, train_selection: false })} value='false' className='delete-button'>Remove</button> : <button name='train_selection' onClick={() => setEditSearch({ ...editSearch, train_selection: true })} value='true' className='add-button'>Add</button>}
                        </div>
                      </div>
                      {editSearch.train_selection ?
                        <div className='section-detail'>
                          <div className='section-blocks'>
                            <h3>Train decision</h3>
                            <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, train_decision: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='train_decision'>
                              <option>{editSearch.train_decision} (selected)</option>
                              <option>General train station</option>
                              <option>Specific train station</option>
                            </select>
                          </div>
                          {editSearch.train_decision === 'Specific train station' ?
                            <div className='section-blocks'>
                              <>
                                <h3>Station</h3>
                                <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, train_detail: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='train_detail'>
                                  <option>{editSearch.train_detail} (selected)</option>
                                  {trainStations.map(station => <option key={station} value={station}>{station}</option>)}
                                </select>
                              </>
                            </div>
                            : ''}
                          <div className='section-blocks'>
                            <h3>Walking distance</h3>
                            <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, train_distance: e.target.value })} name='train_distance' placeholder={editSearch.train_distance}></input>
                          </div>
                        </div>
                        : ''}
                    </div>
                    <hr className='inner-divider' />

                    {/* Fourth section - Family */}
                    <h1 className='section-header'>Family</h1>
                    {/* Primary schools */}
                    <div className='input-line'>
                      <div className='title-section'>
                        <h3 className='sub-title'>Primary Schools</h3>
                        <div className='section-buttons'>
                          {editSearch.primary_selection ? <button name='primary_selection' onClick={() => setEditSearch({ ...editSearch, primary_selection: false })} value='false' className='delete-button'>Remove</button> : <button name='primary_selection' onClick={() => setEditSearch({ ...editSearch, primary_selection: true })} value='true' className='add-button'>Add</button>}
                        </div>
                      </div>
                      {editSearch.primary_selection ?
                        <div className='section-detail'>
                          <div className='section-blocks'>
                            <h3>Distance</h3>
                            <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, primary_distance: e.target.value })} name='primary_distance' placeholder={editSearch.primary_distance}></input>
                          </div>
                          <div className='section-blocks'>
                            <h3>Transport</h3>
                            <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, primary_mode: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='primary_mode'>
                              <option>{editSearch.primary_mode} (selected)</option>
                              <option>Walk</option>
                              <option>Cycle</option>
                              <option>Drive/ transport</option>
                            </select>
                          </div>
                          <div className='section-blocks'>
                            <h3>Religion</h3>
                            <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, primary_religion: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='primary_religion'>
                              <option>{editSearch.primary_religion} (selected)</option>
                              <option>No requirement</option>
                              <option>Anglican/ Church of England</option>
                              <option>Islam</option>
                              <option>Jewish</option>
                              <option>Roman Catholic</option>
                            </select>
                          </div>
                        </div>
                        : ''}
                    </div>
                    {/* Secondary schools */}
                    <div className='input-line'>
                      <div className='title-section'>
                        <h3 className='sub-title'>Secondary Schools</h3>
                        <div className='section-buttons'>
                          {editSearch.secondary_selection ? <button name='secondary_selection' onClick={() => setEditSearch({ ...editSearch, secondary_selection: false })} value={false} className='delete-button'>Remove</button> : <button name='secondary_selection' onClick={() => setEditSearch({ ...editSearch, secondary_selection: true })} value={true} className='add-button'>Add</button>}
                        </div>
                      </div>
                      {editSearch.secondary_selection ?
                        <div className='section-detail'>
                          <div className='section-blocks'>
                            <h3>Distance</h3>
                            <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, secondary_distance: e.target.value })} name='secondary_distance' placeholder={editSearch.secondary_distance}></input>
                          </div>
                          <div className='section-blocks'>
                            <h3>Transport</h3>
                            <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, secondary_mode: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='secondary_mode'>
                              <option>{editSearch.secondary_mode} (selected)</option>
                              <option>Walk</option>
                              <option>Cycle</option>
                              <option>Drive/ transport</option>
                            </select>
                          </div>
                          <div className='section-blocks'>
                            <h3>Religion</h3>
                            <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, secondary_religion: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='secondary_religion'>
                              <option>{editSearch.secondary_religion} (selected)</option>
                              <option>No requirement</option>
                              <option>Anglican/ Church of England</option>
                              <option>Islam</option>
                              <option>Jewish</option>
                              <option>Roman Catholic</option>
                            </select>
                          </div>
                        </div>
                        : ''}
                    </div>
                    {/* 6th forms */}
                    <div className='input-line'>
                      <div className='title-section'>
                        <h3 className='sub-title'>6th Forms</h3>
                        <div className='section-buttons'>
                          {editSearch.college_selection ? <button name='college_selection' onClick={() => setEditSearch({ ...editSearch, college_selection: false })} value='false' className='delete-button'>Remove</button> : <button name='college_selection' onClick={() => setEditSearch({ ...editSearch, college_selection: true })} value='true' className='add-button'>Add</button>}
                        </div>
                      </div>
                      {editSearch.college_selection ?
                        <div className='section-detail'>
                          <div className='section-blocks'>
                            <h3>Distance</h3>
                            <input className='input-number' onChange={(e) => setEditSearch({ ...editSearch, college_distance: e.target.value })} name='college_distance' placeholder={editSearch.college_distance}></input>
                          </div>
                          <div className='section-blocks'>
                            <h3>Transport</h3>
                            <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, college_mode: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='college_mode'>
                              <option>{editSearch.college_mode} (selected)</option>
                              <option>Walk</option>
                              <option>Cycle</option>
                              <option>Drive/ transport</option>
                            </select>
                          </div>
                          <div className='section-blocks'>
                            <h3>Religion</h3>
                            <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, college_religion: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='college_religion'>
                              <option>{editSearch.college_religion} (selected)</option>
                              <option>No requirement</option>
                              <option>Anglican/ Church of England</option>
                              <option>Islam</option>
                              <option>Jewish</option>
                              <option>Roman Catholic</option>
                            </select>
                          </div>
                        </div>
                        : ''}
                    </div>
                    <hr className='inner-divider' />
                    <h1 className='section-header'>Property details</h1>
                    {/* Property price */}
                    <div className='input-line'>
                      <div className='title-section'>
                        <h3 className='sub-title'>Price</h3>
                      </div>
                      <div className='section-detail'>
                        <div className='section-blocks'>
                          <h3>Min price</h3>
                          <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, property_price_min: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='property_price_min'>
                            <option><NumericFormat value={editSearch.property_price_min} displayType={'text'} thousandSeparator={true} prefix={'£'} /> (selected)</option>                          <option>No min</option>
                            <option>£200,000</option>
                            <option>£300,000</option>
                            <option>£400,000</option>
                            <option>£500,000</option>
                            <option>£600,000</option>
                            <option>£700,000</option>
                            <option>£800,000</option>
                            <option>£900,000</option>
                            <option>£1,000,000</option>
                            <option>£1,250,000</option>
                            <option>£1,500,000</option>
                            <option>£1,750,000</option>
                            <option>£2,000,000</option>
                            <option>£2,500,000</option>
                            <option>£3,000,000</option>
                            <option>£3,500,000</option>
                            <option>£4,000,000</option>
                            <option>£5,000,000</option>
                          </select>
                        </div>
                        <div className='section-blocks'>
                          <h3>Max price</h3>
                          <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, property_price_max: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='property_price_max'>
                            <option><NumericFormat value={editSearch.property_price_max} displayType={'text'} thousandSeparator={true} prefix={'£'} /> (selected)</option>
                            <option>No max</option>
                            <option>£300,000</option>
                            <option>£400,000</option>
                            <option>£500,000</option>
                            <option>£600,000</option>
                            <option>£700,000</option>
                            <option>£800,000</option>
                            <option>£900,000</option>
                            <option>£1,000,000</option>
                            <option>£1,250,000</option>
                            <option>£1,500,000</option>
                            <option>£1,750,000</option>
                            <option>£2,000,000</option>
                            <option>£2,500,000</option>
                            <option>£3,000,000</option>
                            <option>£3,500,000</option>
                            <option>£4,000,000</option>
                            <option>£5,000,000</option>
                            <option>£10,000,000</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {/* Property Bedrooms */}
                    <div className='input-line'>
                      <div className='title-section'>
                        <h3 className='sub-title'>Bedrooms</h3>
                      </div>
                      <div className='section-detail'>
                        <div className='section-blocks'>
                          <h3>Min bedrooms</h3>
                          <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, property_bed_min: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='property_bed_min'>
                            <option>{editSearch.property_bed_min} (selected)</option>
                            <option>No min</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                          </select>
                        </div>
                        <div className='section-blocks'>
                          <h3>Max bedrooms</h3>
                          <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, property_bed_max: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='property_bed_max'>
                            <option>{editSearch.property_bed_max} (selected)</option>
                            <option>No min</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {/* Property type */}
                    <div className='input-line'>
                      <div className='title-section'>
                        <h3 className='sub-title'>Other details</h3>
                      </div>
                      <div className='section-detail'>
                        <div className='section-blocks'>
                          <h3>Type</h3>
                          <select className='form-control' onChange={(e) => setEditSearch({ ...editSearch, property_type: e.target.value })} id='cuisine-drop-1' placeholder='Pick cuisine' name='property_type'>
                            <option>{editSearch.property_type} (selected)</option>
                            <option>Any</option>
                            <option>House</option>
                            <option>Flat</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr className='inner-divider' />
                </div>
                <div className='edit-footer'>
                  <div className='submission'>
                    <button name='result_id' value={editSearch.result_id} id='Save' onClick={postEditSearch} className='edit-submit'>Save</button>
                    <button name='result_id' value={editSearch.result_id} id='Submit' onClick={postEditSearch} className='edit-submit'>View Results</button>
                  </div>
                  <button onClick={handleEditClose} className='edit-close'>Close</button>

                </div>
              </>
              : ''}
          </Modal.Body>
        </Modal>
        <Modal show={searchShow} onHide={handleSearchClose} backdrop='static' className='search-details'>
          <Modal.Body>
            <h3>Search details &gt;</h3>
            <div className='input-sections'>
              <h5>Property</h5>
              <div className='poi'><p>Type: {formData.property_type}</p></div>


              <div className='poi'><p>Price: <NumericFormat value={formData.property_price_min} displayType={'text'} thousandSeparator={true} prefix={'£'} /> - <NumericFormat value={formData.property_price_max} displayType={'text'} thousandSeparator={true} prefix={'£'} /> </p></div>
              <div className='poi'><p>Bedrooms: {formData.property_bed_min} - {formData.property_bed_max}</p></div>
            </div>
            <div className='input-sections'>
              <h5>Points of interest</h5>
              {formData.restaurant_selection ? <div className='poi'><p>👨‍🍳 Restaurants: {formData.restaurant_distance} min walk</p></div> : ''}
              {formData.takeaway_selection ? <div className='poi'><p>🍜 Takeaways: {formData.takeaway_distance} min walk</p></div> : ''}
              {formData.cafes_selection ? <div className='poi'><p>☕️ Cafes: {formData.cafes_distance} min walk</p></div> : ''}
              {formData.pubs_selection ? <div className='poi'><p>🍻 Pubs: {formData.pubs_distance} min walk</p></div> : ''}
              {formData.supermarket_selection ? <div className='poi'><p>🛒 Supermarkets: {formData.supermarket_distance} min walk</p></div> : ''}
              {formData.gym_selection ? <div className='poi'><p>🏋️‍♂️ Gyms: {formData.gym_distance} min walk</p></div> : ''}
              {formData.park_selection ? <div className='poi'><p>🌳 Park: {formData.park_distance} min walk</p></div> : ''}
              {formData.workplace_selection ? <div className='poi'><p>✍🏼 Workplace: {formData.workplace_distance} min walk</p></div> : ''}
              {formData.tube_selection ? <div className='poi'><p>🚇 Tube stations: {formData.tube_distance} min walk</p></div> : ''}
              {formData.train_selection ? <div className='poi'><p>🚅 Train stations: {formData.train_distance} min walk</p></div> : ''}
              {formData.primary_selection ? <div className='poi'><p>🏫 Primary schools: {formData.primary_distance} min walk</p></div> : ''}
              {formData.secondary_selection ? <div className='poi'><p>🏫 Secondary schools: {formData.secondary_distance} min walk</p></div> : ''}
              {formData.college_distance ? <div className='poi'><p>🏫 6th forms: {formData.college_distance} min walk</p></div> : ''}
              {formData.family_distance_1 ? <div className='poi'><p>👨‍👩‍👧‍👦 Friends & family: {formData.family_distance_1} min walk</p></div> : ''}
            </div>
            <div className='bottom-buttons'>
              <button onClick={handleEditShow} className='edit-button'>Edit</button>
              <button onClick={handleSearchClose} className='close-button'>Close</button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  )

}

export default PropertyResultsWittle

