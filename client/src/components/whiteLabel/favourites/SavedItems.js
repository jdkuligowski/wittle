import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { isUserAuth, getUserToken , getAccessToken } from '../../auth/Auth'
import { NumericFormat } from 'react-number-format'
import WhiteSidebar from '../WhiteSidebar'
import WhiteNavbar from '../../tools/WhiteNavbar'
import NavBarRevised from '../../tools/NavBarRevised'
import { CSVLink } from 'react-csv'





const SavedItems = () => {

  // ? Section 1: Define states
  // state to enable navigation between pages
  const navigate = useNavigate()

  // state for handling locations
  const location = useLocation()
  const [historyStack, setHistoryStack] = useState([])

  // set state for user data
  const [userData, setUserData] = useState()

  // set state for company data
  const [companyData, setCompany] = useState()

  // set state for errors
  const [errors, setErrors] = useState()

  // state for determining what content shows
  const [profileContent, setProfileContent] = useState('My saved items')
  const [profileDetail, setProfileDetail] = useState('My saved items')  

  // states for pop outs on the side
  const [variableSide, setVariableSide] = useState(false)

  // searchbar state
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  // set sort fields
  const [sortField, setSortField] = useState(null)

  // set state for lisrt of properties
  const [propertyList, setPropertyList] = useState()

  // Set state for the total value of properties
  const [propertyValueSum, setPropertyValueSum] = useState(0)

  // set state for determining the channel
  const [channel, setChannel] = useState()

  // set state for determineing which favourites you see
  const [favouriteTab, setFavouriteTab] = useState('Property prospects')

  // set state for csv data
  const [csvData, setCsvData] = useState()


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
          const dataCsv = data.epc_favourites.map((item, index) => ({
            number: index + 1,
            postcode: item.postcode || '',
            address: item.address || '',
            dateSaved: item.date_added ? new Date(item.date_added).toLocaleDateString() : '',
          }))
          setCsvData(dataCsv)

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


  // // define function for setting results to storage
  // const setResultsToLocalStorage = (token) => {
  //   window.localStorage.setItem('listing-postcode', JSON.stringify(postcodeSubstring))
  // }


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
          variableSide={variableSide} 
          setProfileContent={setProfileContent} 
          setVariableSide={setVariableSide}
          userData={userData}
        />
        <section className='favourites-section'>
          <div className='favourite-options'>
            <h5 onClick={() => setFavouriteTab('Listings')} style={{ textDecoration: favouriteTab === 'Listings' ? 'underline 3px #ED6B86' : 'none', textUnderlineOffset: favouriteTab === 'Listings' ? '0.5em' : 'initial', fontWeight: favouriteTab === 'Listings' ? '700' : '400' }}>Listings</h5>
            <h5 onClick={() => setFavouriteTab('Property prospects')} style={{ textDecoration: favouriteTab === 'Property prospects' ? 'underline 3px #ED6B86' : 'none', textUnderlineOffset: favouriteTab === 'Property prospects' ? '0.5em' : 'initial', fontWeight: favouriteTab === 'Property prospects' ? '700' : '400'  }}>Property prospects</h5>
          
          </div>

          {favouriteTab === 'Property prospects' && userData && userData.epc_favourites.length > 0 ? 

            <>
              <div className='favourite-count'>
                <h3>You have {userData ? userData.epc_favourites.length : '' } prospective properties saved</h3>
                {userData && userData.epc_favourites && (
                  <CSVLink data={csvData} className='export' filename={'Wittle property list.csv'}>
                    Export to CSV
                  </CSVLink>
                )}

              </div>

              <div className='table-section'>
                <div className='table-headers'>
                  <h5 id='column1' className='column'>#</h5>
                  <div id='column2' className='column'>
                    <h5>Address</h5>
                  </div>
                  <div id='column3' className='column'>
                    <h5>Postcode</h5>
                  </div>
                  <div id='column4' className='column'>
                    <h5>Date saved</h5>
                  </div>
                  <div id='column5' className='column'>
                    <h5>Search category</h5>
                  </div>
                  <div id='column6' className='column'>
                    <h5></h5>
                  </div>
                </div>
                <hr className='property-divider' />
                <div className='table-details'>
                  {userData ? userData.epc_favourites
                    .map((item, index) => {
                      return (
                        <>
                          <div key={index}
                            className='results-content' 
                            onClick={() => { 
                              window.localStorage.setItem('listing-postcode', JSON.stringify(item.postcode))
                              navigate('/agents/property/')
                            }}
                          >
                            <div className='column' id='column1'>
                              <h5>{index + 1}</h5>
                            </div>
                            <div className='column' id='column2'>
                              <h5>{item.address === null ? 'N/a' : item.address}</h5>
                            </div>
                            <div className='column' id='column3'>
                              <h5>{item.postcode}</h5>
                            </div>
                            <div className='column' id='column4'>
                              <h5>{item.date_added}</h5>
                            </div>
                            <div className='column' id='column5'>
                              <h5>{item.category}</h5>
                            </div>
                            <div className='column' id='column6'>
                              {/* {isFavourited(item) ? 
                                <button className='added'>✔️</button> : 
                                <button className='add' onClick={() => addFavourite(item, index)}>+</button>
                              } */}
                            </div>
                          </div>
                          <hr className='property-divider' />
                        </>
                      )
                    })
                    : ''}

                </div>

              </div>
            </>

            : favouriteTab === 'Property prospects' && userData && userData.epc_favourites.length === 0 ?
              <>
                <div className='favourite-count'>
                  <h3>😕 You don&apos;t have any properties saved here. Head to the property services tab to get started!</h3>

                </div>
              </>

              : favouriteTab === 'Listings' && userData && userData.listing_favourites.length > 0 ? 
                <>
                  <div className='favourite-count'>
                    <h3>You have {userData ? userData.listing_favourites.length : '' } listings properties saved</h3>

                  </div>

                  <div className='table-section'>
                    <div className='table-headers'>
                      <h5 id='column1' className='column'>#</h5>
                      <div id='column2' className='column'>
                        <h5>Address</h5>
                      </div>
                      <div id='column3' className='column'>
                        <h5>Postcode</h5>
                      </div>
                      <div id='column4' className='column'>
                        <h5>Date saved</h5>
                      </div>
                      {/* <div id='column5' className='column'>
                        <h5>Search category</h5>
                      </div> */}
                      <div id='column6' className='column'>
                        <h5></h5>
                      </div>
                    </div>
                    <hr className='property-divider' />
                    <div className='table-details'>
                      {userData ? userData.listing_favourites
                        .map((item, index) => {
                          return (
                            <>
                              <div key={index}
                                className='results-content' 
                                onClick={() => { 
                                  window.localStorage.setItem('listing-postcode', JSON.stringify(item.postcode))
                                  navigate('/agents/property/')
                                }}
                              >
                                <div className='column' id='column1'>
                                  <h5>{index + 1}</h5>
                                </div>
                                <div className='column' id='column2'>
                                  <h5>{item.address === '' ? 'N/a' : item.address}</h5>
                                </div>
                                <div className='column' id='column3'>
                                  <h5>{item.postcode === '' ? 'N/a' : item.postcode}</h5>
                                </div>
                                <div className='column' id='column4'>
                                  <h5>{item.date_added}</h5>
                                </div>
                                {/* <div className='column' id='column5'>
                                  <h5>{item.category}</h5>
                                </div> */}
                                <div className='column' id='column6'>
                                  {/* {isFavourited(item) ? 
                                <button className='added'>✔️</button> : 
                                <button className='add' onClick={() => addFavourite(item, index)}>+</button>
                              } */}
                                </div>
                              </div>
                              <hr className='property-divider' />
                            </>
                          )
                        })
                        : ''}

                    </div>

                  </div>
                </>
                : ''
          }
          
        </section>

      </section>


    </>
  )
}

export default SavedItems