import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import PrimaryDetails from '../propertyDetails/componentDetails/PrimaryDetails'
import SecondaryDetails from '../propertyDetails/componentDetails/SecondaryDetails'
import RestaurantDetails from '../propertyDetails/componentDetails/RestaurantDetails'
import FitnessDetails from '../propertyDetails/componentDetails/FitnessDetails'
import SupermarketDetails from '../propertyDetails/componentDetails/SupermarketDetails'
import WhiteNavbar from '../../tools/WhiteNavbar'
import WhiteSidebar from '../WhiteSidebar'




const VariablesPage = () => {

  // state to enable navigation between pages
  const navigate = useNavigate()

  // set state for errors
  const [errors, setErrors] = useState()

  // set state for schools data
  const [primaryData, setPrimaryData] = useState()
  const [primaryData1, setPrimaryData1] = useState()
  const [secondaryData, setSecondaryData] = useState()
  const [secondaryData1, setSecondaryData1] = useState()

  // set states for lifestyle information
  const [restaurants, setRestaurants] = useState()
  const [gyms, setGyms] = useState()
  const [pubs, setPubs] = useState()
  const [supermarkets, setSupermarkets] = useState()

  // set states for lifestyle information
  const [tubes, setTubes] = useState()
  const [evs, setEvs] = useState()

  // state for determining what content shows
  const [profileContent, setProfileContent] = useState('Variables')
  const [profileDetail, setProfileDetail] = useState('Variables')  

  // states for pop outs on the side
  const [variableSide, setVariableSide] = useState(true)


  // ? Section 3: Load primaries data
  const loadPrimaryData = () => {
    // Assuming th user is authorised, we want to load their profile information and set states based on relevant sections of this
    try {
      const getPrimaries = async () => {
        const { data } = await axios.get('/api/primaries/')
        const sortedData = data.sort((a, b) => b.pupils_at_standard - a.pupils_at_standard)
        setPrimaryData(sortedData)
        console.log('all primaries ->', sortedData)
      }
      getPrimaries()
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  useEffect(() => {
    loadPrimaryData()
  }, [])


  // ? Section 4: Load secondary school data  
  const loadSecondaryData = () => {
    // Assuming th user is authorised, we want to load their profile information and set states based on relevant sections of this
    try {
      const getSecondaries = async () => {
        const { data } = await axios.get('/api/secondaries/')
        const sortedData = data.sort((a, b) => b.total_pass_rate - a.total_pass_rate)
        setSecondaryData(sortedData)
        console.log('all secondaries ->', sortedData)
      }
      getSecondaries()
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }
  
  useEffect(() =>{
    loadSecondaryData()
  }, [])


  // ? Section 5: Load and sort restaurant data
  const loadRestaurantData = () => {
    // Assuming th user is authorised, we want to load their profile information and set states based on relevant sections of this
    try {
      const getData = async () => {
        const { data } = await axios.get('/api/restaurants/')
        const sortedData = data.sort((a, b) => b.rating - a.rating)
        setRestaurants(sortedData)
        console.log('all restaurants ->', sortedData)
      }
      getData()
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }
  
  useEffect(() =>{
    loadRestaurantData()
  }, [])


  // ? Section 6: Load and sort fitness data
  const loadFitnessData = () => {
    // Assuming th user is authorised, we want to load their profile information and set states based on relevant sections of this
    try {
      const getData = async () => {
        const { data } = await axios.get('/api/gyms/')
        // console.log('gyms data ->', data)
        setGyms(data)
      }
      getData()
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  useEffect(() =>{
    loadFitnessData()
  }, [])


  // ? Section 7: Load and sort supermarket data
  const loadSupermarketData = () => {
    // Assuming th user is authorised, we want to load their profile information and set states based on relevant sections of this
    try {
      const getData = async () => {
        const { data } = await axios.get('/api/supermarkets/')
        console.log('supermarkets data ->', data)
        setSupermarkets(data)
      }
      getData()
    } catch (error) {
      setErrors(true)
      console.log(error)
    }
  }

  useEffect(() =>{
    loadSupermarketData()
  }, [])


  return (
    <>
      <section className='agent-profile-page'>
        <WhiteNavbar
          navbarColour='#FDF7F0'
        />
        <WhiteSidebar 
          setProfileDetail={setProfileDetail}
          variableSide={variableSide} 
          setProfileContent={setProfileContent} 
          setVariableSide={setVariableSide}
        />    
        {profileDetail === 'Variables' ?  
          <section className='variables-section'>

            <h1>Explore the different variables</h1>
            <div className='variables-list'>
              <div className='variable' onClick={() => setProfileDetail('Primary schools')}>
                <h1>🏫</h1>
                <h3>Primary schools</h3>
              </div>
              <div className='variable' onClick={() => setProfileDetail('Secondary schools')}>
                <h1>👨‍🏫</h1>
                <h3>Secondary schools</h3>
              </div>
              <div className='variable'>
                <h1>🎓</h1>
                <h3>6th form colleges</h3>
              </div>
              <div className='variable'>
                <h1>🌳</h1>
                <h3>Green space</h3>
              </div>
              <div className='variable' onClick={() => setProfileDetail('Restaurants')}>
                <h1>🍽</h1>
                <h3>Restaurants</h3>
              </div>
              <div className='variable'>
                <h1>🚇</h1>
                <h3>Tube stations</h3>
              </div>
              <div className='variable'>
                <h1>⛽️</h1>
                <h3>Electric vehicles</h3>
              </div>
              <div className='variable'>
                <h1>🍻</h1>
                <h3>Pubs</h3>
              </div>
              <div className='variable' onClick={() => setProfileDetail('Fitness')}>
                <h1>🏋️‍♂️</h1>
                <h3>Fitness</h3>
              </div>
              <div className='variable' onClick={() => setProfileDetail('Supermarkets')}>
                <h1>🛒</h1>
                <h3>Supermarkets</h3>
              </div>
            </div>

          </section>
          : profileDetail === 'Primary schools' ?
            <section  className='variables-single-section'>
              <PrimaryDetails
                primaryData1={primaryData}
                setPrimaryData1={setPrimaryData}
                listType={'long list'}
              />

            </section>

            : profileDetail === 'Secondary schools' ?
              <section  className='variables-single-section'>
                <SecondaryDetails
                  secondaryData1={secondaryData}
                  setSecondaryData1={setSecondaryData}
                  listType={'long list'}
                />

              </section>

              : profileDetail === 'Restaurants' ?
                <section  className='variables-single-section'>
                  <RestaurantDetails
                    restaurants1={restaurants}
                    setRestaurants1={setRestaurants}
                    listType={'long list'}
                  />

                </section>

                : profileDetail === 'Fitness' ?
                  <section  className='variables-single-section'>
                    <FitnessDetails
                      gyms1={gyms}
                      setGyms1={setGyms}
                      listType={'long list'}
                    />

                  </section>

                  : profileDetail === 'Supermarkets' ?
                    <section className='variables-single-section'>
                      <SupermarketDetails
                        supermarkets1={supermarkets}
                        setSupermarkets1={setSupermarkets}
                        listType={'long list'}
                      />

                    </section>

                    : ''}
    

      </section>
    </>
  )
}

export default VariablesPage