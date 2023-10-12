import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getUserToken, isUserAuth, getAccessToken } from '../../auth/Auth'
import { Modal } from 'react-bootstrap'
import { NumericFormat } from 'react-number-format'
import NavBar from '../../tools/NavBar'
import ProfileMobileSlider from '../../tools/ProfileMobileSlider'
import WhiteNavbar from '../../tools/WhiteNavbar'
import WhiteSidebar from '../WhiteSidebar'
import NavBarRevised from '../../tools/NavBarRevised'



axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const ListingGenerator = () => {


  // state to enable navigation between pages
  const navigate = useNavigate()

  // set state for errors
  const [errors, setErrors] = useState()

  // set state for user data
  const [userData, setUserData] = useState()

  // set state for loading
  const [loading, setLoading] = useState()

  // set state for completing a search
  const [search, setSearch] = useState(false)
  
  // state for determining what content shows
  const [profileContent, setProfileContent] = useState('Listing generator')
  const [profileDetail, setProfileDetail] = useState('Listing generator')  
  
  // lisrting options
  const [listingSelection, setListingSelection] = useState('Property insights')
  
  const [postcodeSubstring, setPostcodeSubstring] = useState('')


  // ? Section 2: Load user information
  const loadUserData = () => {
    // Assuming the user is authorized, we want to load their profile information and set states based on relevant sections of this
    if (isUserAuth()) {
      const getUser = async () => {
        try {
          const { data } = await axios.get(`/api/auth/profile/${getUserToken()}/`, {
            headers: {
              Authorization: `Bearer ${getAccessToken()}`,
            },
          })
          console.log('user data ->', data)
          setUserData(data)
        } catch (error) {
          setErrors(true)
          console.log(error)
        }
      }
      getUser()
    } else {
      navigate('/access-denied')
      console.log('no account')
    }
  }


  // carry out calculation to load user data
  useEffect(() => {
    loadUserData()
  }, [])







  return (

    <>
      <section className='agent-profile-page'>
        <div className='desktop-nav'>
          <WhiteNavbar
            navbarColour='#FDF7F0'
          />
        </div>
        <div className='mobile-nav'>
          <NavBarRevised
            setProfileContent={setProfileContent}
            profileContent={profileContent}
            profileDetail={profileDetail}
            setProfileDetail={setProfileDetail}
          />
        </div>
        <WhiteSidebar 
          setProfileDetail={setProfileDetail}
          setProfileContent={setProfileContent} 
          userData={userData}
        />    

        <section className='listing-generator'> 
          {/* <h1>Wittle listing generator</h1> */}
          {/* <h1>Insert your property details to build a listing or explore insights</h1> */}

          <div className='listing-options'>
            <h5 className='no-print' onClick={() => setListingSelection('Property insights')} style={{ textDecoration: listingSelection === 'Property insights' ? 'underline 3px #FFA7E5' : 'none', textUnderlineOffset: listingSelection === 'Property insights' ? '0.5em' : 'initial', fontWeight: listingSelection === 'Property insights' ? '700' : '400' }}>Property insights</h5>
            <h5 className='no-print' onClick={() => setListingSelection('Listing generator')} style={{ textDecoration: listingSelection === 'Listing generator' ? 'underline 3px #FFA7E5' : 'none', textUnderlineOffset: listingSelection === 'Listing generator' ? '0.5em' : 'initial', fontWeight: listingSelection === 'Listing generator' ? '700' : '400'  }}>Listing generator</h5>
          
          </div>

          <div className='insight-inputs'>
            {listingSelection === 'Property insights' ? 
              <>
                <h3>Insert full postcode to extract details about property</h3>
                <div className='input-block'>
                  <h3>Postcode</h3>
                  <input
                    type="text"
                    value={postcodeSubstring}
                    onChange={e => setPostcodeSubstring(e.target.value.toUpperCase().replace(/\s+/g, ''))}
                    placeholder="Enter postcode..."></input>
                </div>
                <button onClick={() => navigate(`/agents/property/${postcodeSubstring}`)}>See insights</button>
              </>
              : listingSelection === 'Listing generator' ?
                <>
                  {/* <h3>Input details and select features you want to include your listing</h3>
                  <div className='input-block'>
                    <h3>Postcode</h3>
                    <input
                      type="text"
                      value={postcodeSubstring}
                      onChange={e => setPostcodeSubstring(e.target.value.toUpperCase().replace(/\s+/g, ''))}
                      placeholder="Enter postcode..."></input>
                  </div>
                  <div className='input-block'>
                    <h3>Bedrooms</h3>
                    <input
                      type="text"
                      value={postcodeSubstring}
                      onChange={e => setPostcodeSubstring(e.target.value.toUpperCase().replace(/\s+/g, ''))}
                      placeholder="Enter postcode..."></input>
                  </div> */}
                  {/* <button onClick={() => navigate(`/agents/property/${postcodeSubstring}`)}>See insights</button> */}
                </>

                : '' }

          </div>


          
        </section>


      </section> 



    </>
  )
}

export default ListingGenerator