import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { CSVLink } from 'react-csv'
import { getUserToken, isUserAuth, getAccessToken } from '../../../auth/Auth'
import Select from 'react-select'
import ArchivedPropertiesModal from '../../b2bModals/ArchivedPropertiesModal'


const LeadGenSaved = ({ savedProperties, userData, csvData, setCsvData, getCurrentDate, handleVisitUrl, loadUserData, setSavedProperties, 
  setLatestFavourites, latestFavourites, setLeadGenSection }) => {

  // state to enable navigation between pages
  const navigate = useNavigate()

  // state to determine what kind of view we want to see on the page
  const [savedPropertyView, setSavedPropertyView] = useState('Grid')

  // state to determine whether the row has been expanded or not
  const [expandedRows, setExpandedRows] = useState({})

  // state to determmine whether the item is being edited or not
  const [editModes, setEditModes] = useState({})

  // state for the expanded row data
  const [formData, setFormData] = useState({})

  const [selectedRows, setSelectedRows] = useState([])
  const [selectAllStatus, setSelectAllStatus] = useState(false)


  // Function to toggle row expansion
  const toggleRowExpansion = (rightmoveId) => {
    const item = savedProperties.find(prop => prop.rightmove_id === rightmoveId)
    if (!expandedRows[rightmoveId]) {
      setFormData({
        owner_name: item.owner_name,
        owner_email: item.owner_email,
        owner_mobile: item.owner_mobile,
        emails_sent: item.emails_sent,
        letters_sent: item.letters_sent,
        valuation_booked: item.valuation_booked,
        notes: item.notes || '',
      })
    }
    setExpandedRows(prevExpandedRows => ({
      ...prevExpandedRows,
      [rightmoveId]: !prevExpandedRows[rightmoveId],
    }))
  }

  // Function to toggle edit mode
  const toggleEditMode = rightmoveId => {
    setEditModes(prevEditModes => ({
      ...prevEditModes,
      [rightmoveId]: !prevEditModes[rightmoveId],
    }))
  }



  // function to remove favourite from the saved list in case user doesn't want it in there anymore
  const deleteFavourite = async (id) => {
    if (isUserAuth()) {

      try {
        const response = await axios.delete('/api/epc_favourite/delete_favourite/', {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
          data: { rightmove_id: id },
        })
        loadUserData()
      } catch (error) {
        console.error('Error updating favourite:', error)
      }
    } else {
      navigate('/access-denied')
      console.log('logged out')
    }
  }

  // function to setting the favurites to the archives: 
  const archiveFavourite = async (favouriteIds) => {
    if (isUserAuth()) {
      try {
        const response = await axios.put('/api/epc_favourite/update_favourites/', { favourite_ids: favouriteIds }, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })

        console.log('Response:', response.data)
        setLatestFavourites(favouriteIds.length)
        loadUserData()
        handleArchivedActionShow()
        setSelectedRows([])

      } catch (error) {
        console.error('Error updating favorite:', error)
      }
    } else {
      navigate('/access-denied')
      console.log('logged out')
    }
  }


  // function to update the saved item: 
  const handleSave = async (rightmoveId) => {
    if (isUserAuth()) {
      try {
        const response = await axios.patch(`/api/epc_favourite/update_favourites/${rightmoveId}/`, formData, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        loadUserData()
        toggleEditMode(rightmoveId) // Exit edit mode
      } catch (error) {
        console.error('Error updating favourite:', error)
      }
    } else {
      navigate('/access-denied')
      console.log('logged out')
    }
  }

  const handleDropdownChange = (selectedOption) => {
    if (selectedOption.value === 'export') {
      // Handle Export
      // You might need to programmatically click a hidden CSVLink here
      document.querySelector('.csv-link').click()
      setSelectedRows([])
    } else if (selectedOption.value === 'archive') {
      // Handle Archive
      archiveFavourite(selectedRows.map(row => row.rightmove_id))
    }
  }

  const options = [
    { value: 'export', label: 'Extract' },
    { value: 'archive', label: 'Archive' }
  ]


  // ? Section 4: Select row functionality
  const handleRowSelectionChange = (e, item) => {
    const selectedProperty = { ...item }

    if (e.target.checked) {
      setSelectedRows(prevRows => [...prevRows, selectedProperty])
    } else {
      setSelectedRows(prevRows => prevRows.filter(row => row.rightmove_id !== selectedProperty.rightmove_id))
    }

    // Check or uncheck the 'Select All' checkbox based on whether all rows are selected
    setSelectAllStatus(savedProperties.length === selectedRows.length)
  }

  const selectAllRows = () => {
    setSelectedRows(savedProperties)
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

  const transformSelectedRowsToCSV = (selectedRows) => {
    return selectedRows.map((item, index) => ({
      item: index + 1,
      url: item.url,
      address: item.address,
      postcode: item.postcode,
      addressPostcode: `${item.address}, ${item.postcode}`,
      addedOn: item.added_revised,
      property_type: item.property_type,
      price: item.price,
      bedrooms: item.bedrooms,
      bathrooms: item.bathrooms,
      let_available_date: item.let_available_date,
      date_added: item.date_added_db,
      agent: item.agent,
      channel: item.channel,
      owner_name: item.owner_name,
      owner_email: item.owner_email,
      owner_mobile: item.owner_mobile,
      emails_sent: item.emails_sent,
      letters_sent: item.letters_sent,
      valuation_booked: item.valuation_booked,
      notes: item.notes,
    }))
  }

  useEffect(() => {
    if (selectedRows) {
      const csvData = transformSelectedRowsToCSV(selectedRows)
      setCsvData(csvData)
    }
  }, [selectedRows]) // Re-run when selectedRows changes

  // manageing modal for saved iitems added 
  const [archivedActionShow, setArchivedActionShow] = useState(false)

  // close modal
  const handleArchivedActionClose = () => {
    setArchivedActionShow(false)
  }

  // show the modal
  const handleArchivedActionShow = (e) => {
    setArchivedActionShow(true)
    setSelectedRows([])
  }



  return (

    <>
      <div className='results-block'>
        {savedProperties && savedProperties.length > 0 ?
          <>
            <div className='title-section'>
              <h3 className='sub-title'>You have {savedProperties.length} properties ready to be extracted</h3>
              {userData && userData.epc_favourites && (
                <>
                  <Select
                    className='select-dropdown'
                    options={options}
                    onChange={handleDropdownChange}
                    isSearchable={false}
                    placeholder="Select an action"
                  />
                  <CSVLink
                    data={csvData || []}
                    className='export csv-link' // Added a class for easy selection
                    filename={`Wittle Lead Generator Extract - ${getCurrentDate()}.csv`}
                    style={{ display: 'none' }} // Hide the link as it's now triggered programmatically
                  >
                  </CSVLink>
                </>
              )}
            </div>
            <div className='saved-select-row'>
              <div className='select-all-box saved'>
                <div className='custom-checkbox'>
                  <input
                    className='checkbox'
                    type="checkbox"
                    checked={selectedRows.length === savedProperties.length && savedProperties.length > 0}
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
                  <h5>Channel</h5>
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
                  <h5></h5>
                </div>
              </div>
              <hr className='property-divider' />
              <div className='saved-properties'>
                <div className='results-details'>
                  {savedProperties ? savedProperties.map((item, index) => {
                    const isRowExpanded = expandedRows[item.rightmove_id]
                    const isEditMode = editModes[item.rightmove_id]
                    const isRowSelected = selectedRows.some(selectedRow => selectedRow.rightmove_id === item.rightmove_id)
                    return (
                      <>
                        <div className={`results-content ${isRowSelected ? 'highlighted-row' : ''}`}>
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
                            <h5>{item.added_revised === null ? 'N/a' : item.added_revised}</h5>
                          </div>
                          <div className='column' id='column5' onClick={() => handleVisitUrl(item.url)}>
                            <h5>{item.reduced_revised === null ? 'N/a' : item.reduced_revised}</h5>
                          </div>
                          <div className='column' id='column6' onClick={() => handleVisitUrl(item.url)}>
                            <h5>{item.channel}</h5>
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
                          {savedPropertyView === 'Grid' ?
                            <>
                              <div className='column' id='column10' onClick={() => toggleRowExpansion(item.rightmove_id)}>
                                <h5 className='expander'>{isRowExpanded ? 'v' : '^'}</h5>
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
                            </>
                            : savedPropertyView === 'Table' ?
                              <>
                              </>
                              : ''}
                        </div>
                        {isRowExpanded && (
                          <div className='expanded-tracking-details'>
                            <div className='expanded-tracking-content'>
                              <div className='tracking-left'>
                                <div className='tracking-row'>
                                  <h3 className='row-title'>Owner name: </h3>
                                  {!isEditMode ? <h3 className='row-result'>{item.owner_name}</h3> : <input type='text' value={formData.owner_name} onChange={e => setFormData({ ...formData, owner_name: e.target.value })} className='row-input wide'></input>}
                                </div>
                                <div className='tracking-row'>
                                  <h3 className='row-title'>Owner email: </h3>
                                  {!isEditMode ? <h3 className='row-result'>{item.owner_email}</h3> : <input type='text' value={formData.owner_email} onChange={e => setFormData({ ...formData, owner_email: e.target.value })} className='row-input wide'></input>}
                                </div>
                                <div className='tracking-row'>
                                  <h3 className='row-title'>Owner phone: </h3>
                                  {!isEditMode ? <h3 className='row-result'>{item.owner_mobile}</h3> : <input type='text' value={formData.owner_mobile} onChange={e => setFormData({ ...formData, owner_mobile: e.target.value })} className='row-input wide'></input>}
                                </div>
                              </div>
                              <div className='tracking-middle'>
                                <div className='tracking-row'>
                                  <h3 className='row-title'>Emails sent: </h3>
                                  {!isEditMode ? <h3 className='row-result'>{item.emails_sent}</h3> : <input type='text' value={formData.emails_sent} onChange={e => setFormData({ ...formData, emails_sent: e.target.value })} className='row-input narrow'></input>}
                                </div>
                                <div className='tracking-row'>
                                  <h3 className='row-title'>Letters sent: </h3>
                                  {!isEditMode ? <h3 className='row-result'>{item.letters_sent}</h3> : <input type='text' value={formData.letters_sent} onChange={e => setFormData({ ...formData, letters_sent: e.target.value })} className='row-input narrow'></input>}
                                </div>
                                <div className='tracking-row'>
                                  <h3 className='row-title'>Valuation booked: </h3>
                                  {!isEditMode ? <h3 className='row-result'>{item.valuation_booked}</h3> : <input type='text' value={formData.valuation_booked} onChange={e => setFormData({ ...formData, valuation_booked: e.target.value })} className='row-input narrow'></input>}
                                </div>
                              </div>
                              <div className='tracking-right'>
                                <div className='tracking-row'>
                                  {!isEditMode ? <h3 className='row-result'>{item.notes}</h3> : <textarea placeholder='Notes' value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })}></textarea>}
                                </div>
                              </div>
                            </div>
                            <div className='expanded-tracking-actions'>
                              <button className='save' onClick={() => {
                                if (isEditMode) {
                                  handleSave(item.rightmove_id)
                                } else {
                                  toggleEditMode(item.rightmove_id)
                                }
                              }}>
                                {isEditMode ? 'Save' : 'Edit'}
                              </button>
                              <button className='delete' onClick={() => deleteFavourite(item.rightmove_id)}>Delete</button>
                            </div>
                          </div>
                        )}
                        <hr className='property-divider' />
                      </>
                    )
                  })
                    : ' '}
                </div>
              </div>
            </div>

          </>
          : <h3 className='sub-title'>You haven&apos;t saved any properties yet! Once you&apos;ve saved some properties, you&apos;ll be able to extract them.</h3>
        }
      </div>
      <ArchivedPropertiesModal
        archivedActionShow={archivedActionShow}
        handleArchivedActionClose={handleArchivedActionClose}
        setLeadGenSection={setLeadGenSection}
        latestFavourites={latestFavourites}
      />
    </>
  )
}

export default LeadGenSaved

