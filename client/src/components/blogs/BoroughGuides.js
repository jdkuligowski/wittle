import NavBar from '../tools/NavBar'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { isEmail } from 'validator'
import ReactGA from 'react-ga'
import WaitlistSignup from '../helpers/modals/WaitlistSignup'
import { NumericFormat } from 'react-number-format'
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, Label, BarChart, Bar, Line, LineChart, ComposedChart, ResponsiveContainer } from 'recharts'
import PropertyDetailSlider from '../whiteLabel/propertyDetails/helpers/PropertyDetailSlider'
import BlogSlider from './BlogSlider'
import BoroughMap from './BoroughMap'








const BoroughGuides = () => {

  // state for switching page
  const { borough } = useParams()

  // state to enable navigation between pages
  const navigate = useNavigate()

  // state for completion
  const [complete, setComplete] = useState(false)

  // manageing the modal pop up for property search
  const [waitlistShow, setWaitlistShow] = useState(false)
  
  // cstate for whether email eexists
  const [emailExists, setEmailExists] = useState(false)

  // state for errors
  const [errors, setErrors] = useState(false)

  // set state if email is valid
  const [validEmail, setValidEmail] = useState(false)

  // borough states
  const [boroughs, setBoroughs] = useState()

  // ward state
  const [ward, setWards] = useState()

  // wdith for chart
  const [barWidth, setBarWidth] = useState()

  // state for slider
  const [sliderSelection, setSliderSelection] = useState('Primary schools')

  // states for opening and closing the sections
  const [primarySection, setPrimarySection] = useState(false)
  const [secondarySection, setSecondarySection] = useState(false)
  const [lifestyleSection, setLifestyleSection] = useState(false)
  const [transportSection, setTransportSection] = useState(false)
  const [neighbourhoodSection, setNeighbourhoodSection] = useState(false)
  const [propertySection, setPropertySection] = useState(false)
  const [mapSection, setMapSection] = useState(false)

  // states for the different variable sections
  const [statePrimaries, setStatePrimaries] = useState()
  const [independentPrimaries, setIndependentPrimaries] = useState()
  const [stateSecondaries, setStateSecondasries] = useState()
  const [independentSecondaries, setIndependentSecondaries] = useState()

  // state for lifestyle variables
  const [restaurants, setRestaurants] = useState()
  const [pubNames, setPubNames] = useState()
  const [pubs, setPubs] = useState()
  const [gyms, setGyms] = useState()
  const [tubeLines, setTubeLines] = useState()
  const [tubeStations, setTubeStations] = useState()
  const [trainStations, setTrainStations] = useState()
  const [evs, setEvs] = useState()
  const [trains, setTrains] = useState()


  // ? Section 2: Consumer and agent waitlist handling
  // close modal
  const handleWaitlistClose = () => {
    setWaitlistShow(false)
  }
  
  // show the modal
  const handleWaitlistShow = (e) => {
    setErrors(true)
    setComplete(false)
    setWaitlistShow(true)
  }
  
  // set the state for the waitlist signup data capture
  const [waitlistData, setWaitlistData] = useState({
    email: '',
    channel: 'consumer',
    preferences: false,
  })
  
  // determine whether the waitlist email entered is valid
  const handleChange = (e) => {
    setWaitlistData({ ...waitlistData, [e.target.name]: e.target.value.toLowerCase() })
    // console.log(e.target.value)
  }
  
  useEffect(() => {
    if (isEmail(waitlistData.email)) {
      setValidEmail(true)
      setErrors(false)
    } else if (!isEmail(waitlistData.email)) {
      setValidEmail(false)
    }
  }, [waitlistData.email])
  
  // submit email address to waitlist
  const handleSubmit = async (e) => {
    setErrors(false)
    e.preventDefault()
    // console.log('trying')
    ReactGA.event({
      category: 'User',
      action: 'Clicked Button', 
      label: 'Submit join waitlist',
    })
  
    try {
      // console.log('trying')
      const { data } = await axios.post('/api/waitlist/', waitlistData)
      setComplete(true)
    } catch (err) {
      // console.log('incorrect data error')
      setErrors(true)
    }
  }
    
  // cheeck email
  const checkEmail = async (e) => {
    e.preventDefault()
    setComplete(false)
    setWaitlistShow(true)
    ReactGA.event({
      category: 'User',
      action: 'Clicked Button', 
      label: 'Join waitlist',
    })
  
    try {
      const response = await axios.post('/api/waitlist/check-email/', waitlistData)
      setEmailExists(true)
    } catch (err) {
      console.error('An error occurred while making the request:', err)
      if (err.response) {
        setEmailExists(false)
      } 
    }
  }


  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])


  // ? Section 3: handling borough data
  // load in borughs
  const loadBoroughs = () => {
    const getBoroughs = async () => {
      try {
        const { data } = await axios.get('/api/boroughs/')
        const currentBorough = data.filter(object => object.borough === borough)

        console.log('borough data ->', currentBorough[0])
        setBoroughs(currentBorough[0])
      } catch (error) {
        setErrors(true)
        console.log(error)
      }
    }
    getBoroughs()
  }

  // carry out calculation
  useEffect(() =>{
    loadBoroughs()
  }, [])



  // ? Section 4: Load primaries data
  const loadPrimaryData = () => {
    try {
      const getPrimaries = async () => {
        const { data } = await axios.get('/api/primaries/')
        // Filter for schools in 'borough'
        const richmondSchools = data.filter(school => school.local_authority === borough)
        console.log('primaries ->', richmondSchools)

        // Split into independent and other schools
        const stateSchools = ['Voluntary aided school', 'Community school', 'Foundation school', 'Voluntary controlled school', 'Academy sponsor led', 'Academy converter', 'Free schools']
        const independentSchools = richmondSchools.filter(school => school.school_type === 'Other independent school')
        const otherSchools = richmondSchools.filter(school => stateSchools.includes(school.school_type))
  
        // Sort by rank and get the top schools
        const top5Independent = independentSchools.sort((a, b) => a.rank - b.rank).slice(0, 5)
        const top10Other = otherSchools.sort((b, a) => a.pupils_at_standard - b.pupils_at_standard).slice(0, 10)
        console.log('state ->', top10Other)
        console.log('independent ->', top5Independent)

        

        // Set to state (assuming you have setPrimaries state setter and appropriate state structure)
        setStatePrimaries(top10Other)
        setIndependentPrimaries(top5Independent)
      }
      getPrimaries()
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }
  
  // carry out calculation
  useEffect(() =>{
    loadPrimaryData()
  }, [])


  // ? Section 5: Load secondaries data
  const loadSecondaryData = () => {
    try {
      const getSecondaries = async () => {
        const { data } = await axios.get('/api/secondaries/')
        // Filter for schools in 'Camden'
        const richmondSchools = data.filter(school => school.local_authority === borough)
        console.log('secondaries ->', richmondSchools)

        // Split into independent and other schools

        // Split into independent and other schools
        const stateSchools = ['Voluntary aided school', 'Community school', 'Foundation school', 'Voluntary controlled school', 'Academy sponsor led', 'Academy converter', 'Free schools']
        const independentSchools = richmondSchools.filter(school => school.school_type === 'Other independent school')
        const otherSchools = richmondSchools.filter(school => stateSchools.includes(school.school_type))
  
  
        // Sort by rank and get the top schools
        const top5Independent = independentSchools.sort((b, a) => a.total_pass_rate - b.total_pass_rate).slice(0, 5)
        const top10Other = otherSchools.sort((b, a) => a.total_pass_rate - b.total_pass_rate).slice(0, 10)
        console.log('state secondary ->', top10Other)
        console.log('independent secondary ->', top5Independent)

        

        // Set to state (assuming you have setPrimaries state setter and appropriate state structure)
        setStateSecondasries(top10Other)
        setIndependentSecondaries(top5Independent)
      }
      getSecondaries()
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }
  
  // carry out calculation
  useEffect(() =>{
    loadSecondaryData()
  }, [])


  // ? Section 6: Load in restaurant data
  // load in restaurants
  const loadRestaurants = () => {
    const getRestaurants = async () => {
      try {
        const { data } = await axios.get('/api/restaurants/')
        const data2 = data.filter(object => object.district === borough)

        const top10Restaurants = data2.sort((b, a) => a.rating - b.rating).slice(0, 10)

        console.log('restaurant data ->', top10Restaurants)
        setRestaurants(top10Restaurants)
      } catch (error) {
        setErrors(true)
        console.log(error)
      }
    }
    getRestaurants()
  }

  // carry out calculation
  useEffect(() =>{
    loadRestaurants()
  }, [])


  
  // ? Section 7: Load in pubs data
  // load in pubs
  const loadPubs = () => {
    const getPubs = async () => {
      try {
        const { data } = await axios.get('/api/pubs/')
        const data2 = data.filter(object => object.district === borough).filter(object => object.rank === 'Recommended')

        const top5pubs = data2.sort((b, a) => a.rating - b.rating).slice(0, 5)

        const pubNames = top5pubs.map(pub => pub.name)

        console.log('pubNames data ->', pubNames)
        console.log('pubs data ->', top5pubs)
        setPubNames(pubNames)
        setPubs(top5pubs)
      } catch (error) {
        setErrors(true)
        console.log(error)
      }
    }
    getPubs()
  }

  // carry out calculation
  useEffect(() =>{
    loadPubs()
  }, [])


  // ? Section 8: Load in tubes data
  // load in restaurants
  const loadTubes = () => {
    const getTubes = async () => {
      try {
        const { data } = await axios.get('/api/tubes/')
        const data2 = data.filter(object => object.district === borough)

        // Extract unique lines
        const uniqueLines = [...new Set(data2.map(station => station.line))].sort((a, b) => a.localeCompare(b))

        // Extract unique station names
        const uniqueStationNames = [...new Set(data2.map(station => station.station_name))].sort((a, b) => a.localeCompare(b))

        console.log('Unique lines:', uniqueLines)
        console.log('Unique station names:', uniqueStationNames)

        setTubeLines(uniqueLines)
        setTubeStations(uniqueStationNames)
      } catch (error) {
        setErrors(true)
        console.log(error)
      }
    }
    getTubes()
  }

  // carry out calculation
  useEffect(() =>{
    loadTubes()
  }, [])

  // ? Section 9: Load in tubes data
  // load in restaurants
  const loadTrains = () => {
    const getTrains = async () => {
      try {
        const { data } = await axios.get('/api/trains/')

        const data2 = data.filter(object => object.local_authority === borough)

        // Extract unique station names
        const uniqueStationNames = [...new Set(data2.map(station => station.station))].sort((a, b) => a.localeCompare(b))

        console.log('Unique train names:', uniqueStationNames)

        setTrains(uniqueStationNames)
      } catch (error) {
        setErrors(true)
        console.log(error)
      }
    }
    getTrains()
  }

  // carry out calculation
  useEffect(() =>{
    loadTrains()
  }, [])


  // ? Section 10: handling ward data
  // load in borughs
  const loadWards = () => {
    const getWards = async () => {
      try {
        const { data } = await axios.get('/api/wards/')
        const currentBorough = data.filter(object => object.borough === borough).sort((b, a) => a.ward_avg_price - b.ward_avg_price)

        console.log('ward data ->', currentBorough)
        const barWidth = 35 
        const totalBars = currentBorough.length
        const chartWidth = barWidth * totalBars + 200 
        setBarWidth(chartWidth)
        setWards(currentBorough)
      } catch (error) {
        setErrors(true)
        console.log(error)
      }
    }
    getWards()
  }

  // carry out calculation
  useEffect(() =>{
    loadWards()
  }, [])


  // ? Section 11: handling ward data
  // load in evs
  const loadEVs = () => {
    const getEVs = async () => {
      try {
        const { data } = await axios.get('/api/evs/')
        const currentBorough = data.filter(object => object.borough === borough)

        console.log('ev data ->', currentBorough)
        // const barWidth = 35 
        // const totalBars = currentBorough.length
        // const chartWidth = barWidth * totalBars + 200 
        // setBarWidth(chartWidth)
        // setWards(currentBorough)
        setEvs(currentBorough)
      } catch (error) {
        setErrors(true)
        console.log(error)
      }
    }
    getEVs()
  }

  // carry out calculation
  useEffect(() =>{
    loadEVs()
  }, [])


  // ? Section 12: Graphs
  const formatTickValue = (value) => {
    return `£${value / 1000000}m`
  }


  const toTitleCase = (str) => {
    return str.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
      }
    )
  }



  return (

    <>
      <section className='blog-page'>
        <NavBar />
        {boroughs ? 
          <>
            <section className='borough-guide-header' style={{ backgroundImage: `url('${boroughs.borough_image}')` }}>
              <h1 className='borough-title'>{boroughs.borough}</h1>
              <h5 className='borough-sub-title'>London Borough Guide</h5>
              <div className='borough-stats'>
                <h3 className='single-stat'>👶 #{boroughs.primary_rank} for primary schools</h3>
                <h3 className='single-stat'>🎓 #{boroughs.secondary_rank} for secondary schools</h3>
                <h3 className='single-stat'>🌳 #{boroughs.parks_rank} for greenspace</h3>
                <h3 className='single-stat'>🚔 #{boroughs.crime_rank} lowest crime rate</h3>
                <h3 className='single-stat'>🍺 #{boroughs.pubs_rank} for pubs</h3>
                <h3 className='single-stat'>🍽 #{boroughs.restaurants_rank} for restaurants</h3>
                <h3 className='single-stat'>⛽️ #{boroughs.evs_rank} for EV access</h3>
                {/* <h3 className='single-stat'>🚇 #{boroughs.ev_rank} for commute to city</h3> */}
              </div>
              <div className='bottom-insights'>
                <h4>👨‍👧 Population: <NumericFormat value={boroughs.population} displayType={'text'} thousandSeparator={true} /></h4>
                <h4>🏡 Households: <NumericFormat value={boroughs.households} displayType={'text'} thousandSeparator={true} /></h4>
                <h4>💷 Average house price: <NumericFormat value={boroughs.borough_avg_price} displayType={'text'} thousandSeparator={true} prefix='£' /></h4>
              </div>
            </section>
            <section className='borough-detail-section'>
              <h1>Get to know {boroughs.borough}</h1>
              <div className='summary-section'>
                <p className='summary-bio'>{boroughs.borough_description}</p>
              </div>

              <div className='property-highlight' onClick={() => setPrimarySection(!primarySection)}>
                <h3>Primary School Highlights</h3>
                <div className='click-downs'>
                  {primarySection ? <h4>^</h4> : <h4>v</h4> }
                </div>
              </div>

              {primarySection ?
                <div className='school-section'>
                  <div className='primary-detail'>
                    <div className='primary-stats'>
                      <h3>Key stats</h3>
                      <h5>👶 #{boroughs.primary_rank} borough for primary schools</h5>
                      <h5>👶 44 state primary schools</h5>
                      <h5>👶 10 independent primary schools</h5>
                      <h5>👶 3 special primary schools</h5>
                      <h5>👶 #15 for primary school competitiveness</h5>
                      <h5>👶 1.34km average catchment area size</h5>
                      <h5>👶 57% primary schools rated Outstanding</h5>
                    </div>
                    <div className='primary-table-section'>
                      <h3>{boroughs.borough} primary school picks</h3>
                      <h6>State schools</h6>
                      <div className='table'>
                        <div className='table-headers'>
                          <div className='state' id='headers'>

                            <h5 className='column' id='column0'>#</h5>
                            <h5 className='column' id='column1'>Name</h5>
                            <h5 className='column' id='column2'>Gender</h5>
                            <h5 className='column' id='column3'>Ofsted</h5>
                            <h5 className='column' id='column4'>Pupils at standard</h5>
                            <h5 className='column' id='column5'>Pupils exceeding standard</h5>
                            <h5 className='column' id='column6'>Website</h5>
                          </div>
                        </div>
              
                        <div className='table-content'>
                          {statePrimaries ? statePrimaries.map((item, index) => {
                            return (
                              <>
                                <div className='state' id='content'>
                                  <h5 className='column' id='column0'>{index + 1}</h5>
                                  <h5 className='column' id='column1'>{item.school_name}</h5>
                                  <h5 className='column' id='column2'>{item.gender}</h5>
                                  <h5 className='column' id='column3'>{item.ofsted_results}</h5>
                                  <h5 className='column' id='column4'>{Math.ceil(item.pupils_at_standard * 100)}%</h5>
                                  <h5 className='column' id='column5'>{Math.ceil(item.pupils_exceeding_standard * 100)}%</h5>
                                  <h5 className='column' id='column6'><a href={item.school_url} target="_blank" rel="noopener noreferrer">👩‍💻</a></h5>
                                </div>
                                <hr id='state-separator' className='table-separator'/>

  
                              </>
                            )
                          })

                            : '' }
                        </div>
                      </div>
                      <h6 className='independent-title'>Independent schools</h6>
                      <div className='table'>
                        <div className='table-headers'>
                          <div className='state' id='headers'>

                            <h5 className='column' id='column0'>#</h5>
                            <h5 className='column' id='column1'>Name</h5>
                            <h5 className='column' id='column2'>Gender</h5>
                            <h5 className='column' id='column3'>Ofsted</h5>
                            <h5 className='column' id='column4'>Website</h5>
                          </div>
                        </div>
              
                        <div className='table-content'>
                          {independentPrimaries ? independentPrimaries.map((item, index) => {
                            return (
                              <>
                                <div className='state' id='content'>
                                  <h5 className='column' id='column0'>{index + 1}</h5>
                                  <h5 className='column' id='column1'>{item.school_name}</h5>
                                  <h5 className='column' id='column2'>{item.gender}</h5>
                                  <h5 className='column' id='column3'>{item.ofsted_results === null ? 'N/a' : item.ofsted_results}</h5>
                                  <h5 className='column' id='column4'><a href={item.school_url} target="_blank" rel="noopener noreferrer">👩‍💻</a></h5>
                                </div>
                                <hr id='independent-separator' className='table-separator'/>

                              </>
                            )
                          })

                            : '' }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                : ''
              }


              <hr className='highlight-separator'/>

              <div className='property-highlight' onClick={() => setSecondarySection(!secondarySection)}>
                <h3>Secondary School Highlights</h3>
                <div className='click-downs'>
                  {secondarySection ? <h4>^</h4> : <h4>v</h4> }
                </div>
              </div>

              {secondarySection ?
                <div className='school-section'>
                  <div className='primary-detail'>
                    <div className='primary-stats'>
                      <h3>Key stats</h3>
                      <h5>🎓 #{boroughs.secondary_rank} borough for secondary schools</h5>
                      <h5>🎓 44 state secondary schools</h5>
                      <h5>🎓 10 independent secondary schools</h5>
                      <h5>🎓 3 special secondary schools</h5>
                      <h5>🎓 #15 for secondary school competitiveness</h5>
                      <h5>🎓 1.34km average catchment area size</h5>
                      <h5>🎓 57% secondary schools rated Outstanding</h5>
                    </div>
                    <div className='primary-table-section'>
                      <h3>{boroughs.borough} secondary school picks</h3>
                      <h6>State schools</h6>
                      <div className='table'>
                        <div className='table-headers'>
                          <div className='state' id='headers'>

                            <h5 className='column' id='column0'>#</h5>
                            <h5 className='column' id='column1'>Name</h5>
                            <h5 className='column' id='column2'>Gender</h5>
                            <h5 className='column' id='column3'>Ofsted</h5>
                            <h5 className='column' id='column4'>Pass rate</h5>
                            <h5 className='column' id='column5'>A/A* rate</h5>
                            <h5 className='column' id='column6'>Website</h5>
                          </div>
                        </div>
              
                        <div className='table-content'>
                          {stateSecondaries ? stateSecondaries.map((item, index) => {
                            return (
                              <>
                                <div className='state' id='content'>
                                  <h5 className='column' id='column0'>{index + 1}</h5>
                                  <h5 className='column' id='column1'>{item.school_name}</h5>
                                  <h5 className='column' id='column2'>{item.gender}</h5>
                                  <h5 className='column' id='column3'>{item.ofsted_results}</h5>
                                  <h5 className='column' id='column4'>{item.total_pass_rate}%</h5>
                                  <h5 className='column' id='column5'>{item.total_top_rate}%</h5>
                                  <h5 className='column' id='column6'><a href={item.school_url} target="_blank" rel="noopener noreferrer">👩‍💻</a></h5>
                                </div>
                                <hr id='state-separator' className='table-separator'/>

  
                              </>
                            )
                          })

                            : '' }
                        </div>
                      </div>
                      <h6 className='independent-title'>Independent schools</h6>
                      <div className='table'>
                        <div className='table-headers'>
                          <div className='state' id='headers'>

                            <h5 className='column' id='column0'>#</h5>
                            <h5 className='column' id='column1'>Name</h5>
                            <h5 className='column' id='column2'>Gender</h5>
                            <h5 className='column' id='column3'>Ofsted</h5>
                            <h5 className='column' id='column4'>Pass rate</h5>
                            <h5 className='column' id='column5'>A/A* rate</h5>
                            <h5 className='column' id='column6'>Website</h5>
                          </div>
                        </div>
              
                        <div className='table-content'>
                          {independentSecondaries ? independentSecondaries.map((item, index) => {
                            return (
                              <>
                                <div className='state' id='content'>
                                  <h5 className='column' id='column0'>{index + 1}</h5>
                                  <h5 className='column' id='column1'>{item.school_name}</h5>
                                  <h5 className='column' id='column2'>{item.gender}</h5>
                                  <h5 className='column' id='column3'>{item.ofsted_results === null ? 'N/a' : item.ofsted_results}</h5>
                                  <h5 className='column' id='column4'>{item.total_pass_rate}%</h5>
                                  <h5 className='column' id='column5'>{(item.total_top_rate)}%</h5>
                                  <h5 className='column' id='column6'><a href={item.school_url} target="_blank" rel="noopener noreferrer">👩‍💻</a></h5>
                                </div>
                                <hr id='state-separator' className='table-separator'/>

  
                              </>
                            )
                          })

                            : '' }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                : ''
              }


              <hr className='highlight-separator'/>

              <div className='property-highlight' onClick={() => setLifestyleSection(!lifestyleSection)}>
                <h3>Lifestyle Highlights</h3>
                <div className='click-downs'>
                  {lifestyleSection ? <h4>^</h4> : <h4>v</h4> }
                </div>
              </div>

              {lifestyleSection ?
                <div className='school-section'>
                  <div className='primary-detail'>
                    <div className='primary-stats'>
                      <h3>Key stats</h3>
                      <h5>🍽 #{boroughs.restaurants_rank} borough for restaurants</h5>
                      <h5>🍽 {boroughs.restaurant_count}+ places to eat </h5>
                      {boroughs.michelin_spots === 0 ? '' : boroughs.michelin_spots === 1 ? <h5>🍽 1 place in the michelin guide</h5> : <h5>🍽 {boroughs.michelin_spots} places in the michelin guide</h5>}
                      <h5>🍺 #{boroughs.pubs_rank} borough for pubs</h5>
                      <h5>🍺 {boroughs.pubs_count}+ pubs</h5>
                      {/* <h5>🏋️‍♂️ {borough.gym_count} gyms</h5> */}
                    </div>
                    <div className='primary-table-section'>
                      <h3>{boroughs.borough} restaurant picks</h3>
                      <div className='table'>
                        <div className='table-headers'>
                          <div className='state' id='headers'>

                            <h5 className='column' id='column0'>#</h5>
                            <h5 className='column' id='column1'>Name</h5>
                            <h5 className='column' id='column2'>Cuisine</h5>
                            <h5 className='column' id='column3'>Website</h5>
                          </div>
                        </div>
              
                        <div className='table-content'>
                          {restaurants ? restaurants.map((item, index) => {
                            return (
                              <>
                                <div className='state' id='content'>
                                  <h5 className='column' id='column0'>{index + 1}</h5>
                                  <h5 className='column' id='column1'>{item.restaurant_name}</h5>
                                  <h5 className='column' id='column2'>{item.master_cuisine}</h5>
                                  <h5 className='column' id='column3'>Link</h5>
                                </div>
                                <hr className='table-separator'/>
                              </>
                            )
                          })
                            : '' }
                        </div>
                      </div>
                      <h3 className='secondary-title'>{boroughs.borough} pub picks</h3>
                      <p className='description'>Our top 5 must visit pubs in {boroughs.borough} are:</p>
                      <p className='description'>🍺 {pubNames && toTitleCase(pubNames[0])}</p>
                      <p className='description'>🍺 {pubNames && toTitleCase(pubNames[1])}</p>
                      <p className='description'>🍺 {pubNames && toTitleCase(pubNames[2])}</p>
                      <p className='description'>🍺 {pubNames && toTitleCase(pubNames[3])}</p>
                      <p className='description'>🍺 {pubNames && toTitleCase(pubNames[4])}</p>
                    </div>
                  </div>
                </div>
                : ''
              }



              <hr className='highlight-separator'/>
              <div className='property-highlight' onClick={() => setTransportSection(!transportSection)}>
                <h3>Transport Highlights</h3>
                <div className='click-downs'>
                  {transportSection ? <h4>^</h4> : <h4>v</h4> }
                </div>
              </div>

              {transportSection ?
                <div className='school-section'>
                  <div className='primary-detail'>
                    <div className='primary-stats'>
                      <h3>Key stats</h3>
                      <h5>🚇 {tubeLines && tubeLines.length} tube lines</h5>
                      <h5>🚇 {tubeStations && tubeStations.length} tube stations </h5>
                      <h5>🚊 {trains && trains.length} train stations </h5>
                      <h5>⛽️ #{boroughs.evs_rank} borough for ev charging access</h5>
                      <h5>⛽️ {boroughs.ev_number} public ev charging points across the borough</h5>
                      {/* <h5>🏋️‍♂️ {borough.gym_count} gyms</h5> */}
                    </div>
                    <div className='primary-table-section'>
                      <h3>{boroughs.borough} tube stations</h3>
                      <p className='description'>There are {tubeStations.length} tube stations in {boroughs.borough}:</p>
                      <div className='detail-content'>
                        {tubeStations && tubeStations.map((item, index) => {
                          return (
                            <>
                              <h5 className='line-item'>🚇 {item}</h5>
                            </>
                          )
                        })}
                      </div>
                      <p className='description'>And these operate across {tubeLines.length} lines:</p>
                      <div className='detail-content'>
                        {tubeLines && tubeLines.map((item, index) => {
                          return (
                            <>
                              <h5 className='line-item'>🛤 {item}</h5>
                            </>
                          )
                        })}
                      </div>

                      <h3>{boroughs.borough} train stations</h3>
                      <p className='description'>There are {trains ? trains.length : ''} train stations in {boroughs.borough}:</p>
                      <div className='detail-content'>
                        {trains && trains.map((item, index) => {
                          return (
                            <>
                              <h5 className='line-item'>🚊 {item}</h5>
                            </>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                : ''
              }


              {/* <hr className='highlight-separator'/>
              <div className='property-highlight' onClick={() => setNeighbourhoodSection(!neighbourhoodSection)}>
                <h3>Neighbourhood Highlights</h3>
                <div className='click-downs'>
                  {neighbourhoodSection ? <h4>^</h4> : <h4>v</h4> }
                </div>
              </div> */}

              <hr className='highlight-separator'/>
              <div className='property-highlight' onClick={() => setPropertySection(!propertySection)}>
                <h3>Property Highlights</h3>
                <div className='click-downs'>
                  {propertySection ? <h4>^</h4> : <h4>v</h4> }
                </div>
              </div>

              {propertySection ?
                <div className='school-section'>
                  <div className='primary-detail'>
                    <div className='primary-stats'>
                      <h3>Key stats</h3>
                      <h5>🏡 #{boroughs.property_price_rank} most expensive borough on average</h5>
                      <h5>🏡 Average house price: <NumericFormat value={boroughs.borough_avg_price} displayType={'text'} thousandSeparator={true} prefix='£' /> </h5>
                      <h5>🏡 {ward && ward.length} areas to live </h5>
                      
                    </div>
                    <div className='primary-table-section'>
                      <h3>Average property price and number of sales since August 2022 in {boroughs.borough}</h3>
                      <div className='chart-container'>
                        <ResponsiveContainer width={barWidth} height={400}>
                          <ComposedChart data={ward} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                            <XAxis dataKey="ward" colorProfile='#051885' tick={{ fill: '#051885', fontSize: '0.7rem', fontFamily: 'Poppins' }} angle={45} textAnchor="start" height={120} interval={0}   />
                            <YAxis yAxisId="left" orientation="left" width={70} tick={{ fill: '#051885', fontSize: '0.7rem', fontFamily: 'Poppins' }} tickFormatter={formatTickValue} >
                              <Label value="Average Price" angle={-90} position='insideLeft' offset={5} style={{ textAnchor: 'middle', fill: '#051885', fontFamily: 'Poppins', fontSize: '0.7rem' }} />
                            </YAxis>
                            <YAxis yAxisId="right" orientation="right" width={70} domain={[0, 100]}  tick={{ fill: '#051885', fontSize: '0.7rem', fontFamily: 'Poppins' }}>
                              <Label value="# of sales" angle={90} position='insideLeft' offset={50} style={{ textAnchor: 'middle', fill: '#051885', fontFamily: 'Poppins', fontSize: '0.7rem' }} />
                            </YAxis>
                            <Tooltip />

                            <Legend verticalAlign="top" align="center" offset={20}  wrapperStyle={{ fontSize: '0.7rem', fontFamily: 'Poppins' }} />
                            <Bar yAxisId="left" dataKey="ward_avg_price" fill="#051885" name="Average Price" />
                            <Line yAxisId="right" type="monotone" dataKey="ward_transactions" stroke="#FFA7E5" name="Transactions" dot={true} />
                          </ComposedChart>
                        </ResponsiveContainer>
                      </div>

                    </div>
                  </div>
                </div>
                : ''
              }

              <hr className='highlight-separator'/>
              <div className='property-highlight' onClick={() => setMapSection(!mapSection)}>
                <h3>Map Highlights</h3>
                <div className='click-downs'>
                  {mapSection ? <h4>^</h4> : <h4>v</h4> }
                </div>
              </div>

              {mapSection ? 

                <>
                  <BlogSlider
                    sliderSelection={sliderSelection}
                    setSliderSelection={setSliderSelection} 
                  />
                  <BoroughMap
                    statePrimaries={statePrimaries}
                    stateSecondaries={stateSecondaries}
                    restaurants={restaurants}
                    pubs={pubs}
                    evs={evs}
                    boroughs={boroughs}
                    sliderSelection={sliderSelection} 
                  />
                </>
                : ''}

            </section>

            
          </>
          : '' }
      </section>

    </>
  )
}

export default BoroughGuides