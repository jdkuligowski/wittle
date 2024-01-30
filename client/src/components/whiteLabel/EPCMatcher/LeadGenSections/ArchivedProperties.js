import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { CSVLink } from 'react-csv'
import { getUserToken, isUserAuth, getAccessToken } from '../../../auth/Auth'


const ArchivedProperties = ({ archivedProperties, handleVisitUrl, loadUserData }) => {

  // state to enable navigation between pages
  const navigate = useNavigate()

  const [selectedRows, setSelectedRows] = useState([])
  const [selectAllStatus, setSelectAllStatus] = useState(false)


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
        loadUserData()
        setSelectedRows([])
      } catch (error) {
        console.error('Error saving favourite:', error)
      }
    } else {
      navigate('/access-denied')
      console.log('logged out')
    }
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
            <div className='saved-select-row hidden'>
              <div className='select-all-box hidden'>
                <div className='custom-checkbox'>
                  <input
                    className='checkbox'
                    type="checkbox"
                    checked={selectedRows.length === archivedProperties.length && archivedProperties.length > 0}
                    onChange={handleSelectAllChange}
                  />
                  <label className='label'></label>
                </div>
              </div>
            </div>

            <div className='results-table'>

              <div className='results-headers'>
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
                  <h5>Price</h5>
                </div>
                <div id='column8' className='column'>
                  <h5>Bedrooms</h5>
                </div>
                <div id='column9' className='column'>
                  <h5>Agent</h5>
                </div>
                <div id='column10' className='column'>
                  <h5>Channel</h5>
                </div>
                <div id='column11' className='column'>
                  <h5></h5>
                </div>
              </div>
              <hr className='property-divider' />
              <div className='results-details archive'>
                {archivedProperties ? archivedProperties.map((item, index) => {
                  return (
                    <>
                      <div className='results-content'>
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
                          <h5>{item.agent}</h5>
                        </div>
                        <div className='column' id='column10' onClick={() => handleVisitUrl(item.url)}>
                          <h5>{item.channel}</h5>
                        </div>
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
                      </div>
                      <hr className='property-divider' />


                    </>
                  )
                })
                  : ' '}
              </div>
            </div>
          </>
          : <h3 className='sub-title'>You haven&apos;t archived any properties yet! Once you&apos;ve extracted properties to your files, you&apo;ll see them here.</h3>
        }
      </div>

    </>
  )
}

export default ArchivedProperties