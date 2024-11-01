import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { CSVLink } from 'react-csv'
import { getUserToken, isUserAuth, getAccessToken } from '../../../auth/Auth'
import ArchviedToSavedModal from '../../b2bModals/ArchivedToSavedModal'


const ArchivedProperties = ({ archivedProperties, handleVisitUrl, loadUserData, setLeadGenSection, latestFavourites, setLatestFavourites }) => {

  // state to enable navigation between pages
  const navigate = useNavigate()

  const [selectedRows, setSelectedRows] = useState([])
  const [selectAllStatus, setSelectAllStatus] = useState(false)

  const [searchQuery, setSearchQuery] = useState('')
  const [postcode, setPostcode] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' })


  // ? Section 4: Select row functionality
  const handleRowSelectionChange = (e, item) => {
    const selectedProperty = { ...item }

    if (e.target.checked) {
      setSelectedRows(prevRows => [...prevRows, selectedProperty])
    } else {
      setSelectedRows(prevRows => prevRows.filter(row => row.rightmove_id !== selectedProperty.rightmove_id))
    }

    // Check or uncheck the 'Select All' checkbox based on whether all rows are selected
    setSelectAllStatus(archivedProperties.length === selectedRows.length)
  }

  const selectAllRows = () => {
    setSelectedRows(archivedProperties)
    setSelectAllStatus(true)
  }

  const deselectAllRows = () => {
    setSelectedRows([])
    setSelectAllStatus(false)
  }

  const handleSelectAllChange = (e) => {
    if (e.target.checked) {
      selectAllRows() // Function that selects all rows
    } else {
      deselectAllRows() // Function that deselects all rows
    }
  }

  const updateFavourites = async (selectedRows) => {
    if (isUserAuth()) {
      try {
        const rightmoveIds = selectedRows.map(row => row.rightmove_id)
        const response = await axios.put('/api/epc_favourite/update_favourites/archive-to-saved/', { favourite_ids: rightmoveIds }, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        console.log('Response:', response.data)
        setLatestFavourites(rightmoveIds.length)
        loadUserData()
        handleArchivedSavedShow()
        setSelectedRows([])
      } catch (error) {
        console.error('Error saving favourite:', error)
      }
    } else {
      navigate('/access-denied')
      console.log('logged out')
    }
  }

  // manageing modal for saved iitems added 
  const [archviedSavedShow, setArchivedSavedShow] = useState(false)

  // close modal
  const handleArchivedSavedClose = (e) => {
    setArchivedSavedShow(false)
  }

  // show the modal
  const handleArchivedSavedShow = (e) => {
    setArchivedSavedShow(true)
    setSelectedRows([])
  }


  // Updated filter function to include agent
  const getFilteredProperties = () => {
    let filteredProperties = archivedProperties

    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase()
      filteredProperties = filteredProperties.filter(property =>
        property.address.toLowerCase().includes(lowerCaseQuery) ||
        property.postcode.toLowerCase().includes(lowerCaseQuery) ||
        property.agent.toLowerCase().includes(lowerCaseQuery)
      )
    }

    if (sortConfig.key) {
      filteredProperties = filteredProperties.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
      })
    }

    return filteredProperties
  }



  const handleSort = (key) => {
    let direction = 'ascending'
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }



  return (

    <>
      <div className='results-block'>
        {archivedProperties && archivedProperties.length > 0 ?
          <>
            <div className='title-section'>
              <h3 className='sub-title'>You have archived {archivedProperties.length} properties</h3>
              <div className='action-section hidden'>
                <div className='save-section'>
                  <h3 onClick={() => updateFavourites(selectedRows)}>Move properties</h3>
                </div>
              </div>
            </div>
            <div className='search-section'>
              <input
                type="text"
                placeholder="🔎 Search data"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='archive-search'
              />
            </div>

            <div className='results-table'>

              <div className='results-headers'>
                <div id='column11' className='column'>
                  <div className='custom-checkbox'>
                    <input
                      className='checkbox'
                      type="checkbox"
                      checked={selectedRows.length === archivedProperties.length && archivedProperties.length > 0}
                      onChange={handleSelectAllChange}
                    />
                    <label className='label'></label>
                  </div>                </div>
                <h5 id='column1' className='column'>#</h5>
                <div id='column2' className='column'>
                  <h5>Address</h5>
                </div>
                <div id='column3' className='column'>
                  <h5>Postcode</h5>
                </div>
                <div id='column4' className='column'>
                  <h5>Added</h5>
                </div>
                <div id='column5' className='column'>
                  <h5>Reduced</h5>
                </div>
                <div id='column6' className='column'>
                  <h5>Property type</h5>
                </div>
                <div id='column7' className='column'>
                  <h5
                    onClick={() => handleSort('price_numeric')}
                    style={{ cursor: 'pointer' }}
                  >
                    Price {sortConfig.key === 'price_numeric' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
                  </h5>                </div>
                <div id='column8' className='column'>
                  <h5>Bedrooms</h5>
                </div>
                <div id='column9' className='column'>
                  <h5>Channel</h5>
                </div>
                <div id='column10' className='column'>
                  <h5>Agent</h5>
                </div>
              </div>
              <hr className='property-divider' />
              <div className='results-details archive'>
                {getFilteredProperties().map((item, index) => {
                  // {archivedProperties ? archivedProperties.map((item, index) => {
                  return (
                    <>
                      <div className='results-content'>
                        <div className='column' id='column11'>
                          <div className='custom-checkbox'>
                            <input
                              className='checkbox'
                              type='checkbox'
                              checked={selectedRows.some(row => row.rightmove_id === item.rightmove_id)}
                              onChange={(e) => handleRowSelectionChange(e, item)}
                            />
                            <label className='label'>
                            </label>
                          </div>
                        </div>
                        <div className='column' id='column1' onClick={() => handleVisitUrl(item.url)}>
                          <h5>{index + 1}</h5>
                        </div>
                        <div className='column' id='column2' onClick={() => handleVisitUrl(item.url)}>
                          <h5>{item.address}</h5>
                        </div>
                        <div className='column' id='column3' onClick={() => handleVisitUrl(item.url)}>
                          <h5>{item.postcode}</h5>
                        </div>
                        <div className='column' id='column4' onClick={() => handleVisitUrl(item.url)}>
                          <h5>{item.added_revised}</h5>
                        </div>
                        <div className='column' id='column5' onClick={() => handleVisitUrl(item.url)}>
                          <h5>{item.reduced_revised}</h5>
                        </div>
                        <div className='column' id='column6' onClick={() => handleVisitUrl(item.url)}>
                          <h5>{item.property_type}</h5>
                        </div>
                        <div className='column' id='column7' onClick={() => handleVisitUrl(item.url)}>
                          <h5>{item.price}</h5>
                        </div>
                        <div className='column' id='column8' onClick={() => handleVisitUrl(item.url)}>
                          <h5>{item.bedrooms}</h5>
                        </div>
                        <div className='column' id='column9' onClick={() => handleVisitUrl(item.url)}>
                          <h5>{item.channel}</h5>
                        </div>
                        <div className='column' id='column10' onClick={() => handleVisitUrl(item.url)}>
                          <h5>{item.agent}</h5>
                        </div>

                      </div>

                      <hr className='property-divider' />


                    </>
                  )
                })
                }
              </div>
            </div>
          </>
          : <h3 className='sub-title'>You haven&apos;t archived any properties yet! Once you&apos;ve extracted properties to your files, you&apos;ll see them here.</h3>
        }
      </div>
      <ArchviedToSavedModal
        archviedSavedShow={archviedSavedShow}
        handleArchivedSavedClose={handleArchivedSavedClose}
        setLeadGenSection={setLeadGenSection}
        latestFavourites={latestFavourites}
      />


    </>
  )
}

export default ArchivedProperties