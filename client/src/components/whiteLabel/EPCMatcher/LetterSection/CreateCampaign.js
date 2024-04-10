import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { Modal } from 'react-bootstrap'
import Select from 'react-select'
import ReactSwitch from 'react-switch'
import { getUserToken, isUserAuth, getAccessToken } from '../../../auth/Auth'
import Swal from 'sweetalert2'


const CreateCampaign = ({ createCampaignShow, handleCreateCampaignClose, letterTemplates, loadUserData, editData }) => {

  const maxSteps = 5 // Assuming 5 is the max number of steps

  const [numberOfSteps, setNumberofSteps] = useState(1)

  const [campaign, setCampaign] = useState({
    campaign_name: '',
    campaign_status: 'Not launched',
    campaign_start_date: null,
    campaign_type: '1 step',
    template_names: ['', '', '', '', ''], // Adjusted for up to 5 steps
    template_dates: [null, null, null, null, null], // Adjusted for dates, first date always null since "on launch"

  })

  useEffect(() => {
    if (editData !== 'None') {
      setCampaign(editData)
      const numberOfSteps = parseInt(editData.campaign_type.split(' ')[0])
      setNumberofSteps(numberOfSteps)
    } else if (campaign) {
      const numberOfSteps = parseInt(campaign.campaign_type.split(' ')[0])
      setNumberofSteps(numberOfSteps)
    }
  }, [editData])

  // useEffect(() => {
  //   if (campaign) {
  //     const numberOfSteps = parseInt(campaign.campaign_type.split(' ')[0])
  //     setNumberofSteps(numberOfSteps)
  //   }
  // }, campaign)

  const handleCampaignChange = (e) => {
    const { name, value } = e.target
    setCampaign({ ...campaign, [name]: value })
  }

  const handleStepChange = (index, e) => {
    const { name, value } = e.target
    const newSteps = [...campaign.steps]
    newSteps[index] = { ...newSteps[index], [name]: value }
    setCampaign({ ...campaign, steps: newSteps })
  }

  const handleTemplateChange = (index, value) => {
    setCampaign({
      ...campaign,
      [`template_${index + 1}_name`]: value,
    })
  }

  const handleDateChange = (index, value) => {
    if (index === 0) return // Skip for the first template since it's "on launch"
    setCampaign({
      ...campaign,
      [`template_${index + 1}_date`]: value,
    })
  }


  const addStep = () => {
    const currentSteps = numberOfSteps

    if (currentSteps < maxSteps) {
      const newCampaignType = `${currentSteps + 1} step${currentSteps + 1 > 1 ? 's' : ''}`

      setCampaign(prevCampaign => ({
        ...prevCampaign,
        campaign_type: newCampaignType,
        [`template_${currentSteps + 1}_name`]: '',
        [`template_${currentSteps + 1}_date`]: '', // Considering all steps except the first can have a date.
      }))

      // Directly setting numberOfSteps here based on the updated campaign_type.
      setNumberofSteps(currentSteps + 1)
    }
  }


  const removeStep = () => {
    // Determine the current number of steps
    const currentSteps = numberOfSteps

    if (currentSteps > 1) {
      // Prepare updates for removing the highest step's data
      const updates = {
        campaign_type: `${currentSteps - 1} step${currentSteps - 1 > 1 ? 's' : ''}`,
      }

      // Use null or an empty string to clear out the data for the highest step
      updates[`template_${currentSteps}_name`] = ''
      updates[`template_${currentSteps}_date`] = null

      setCampaign(prevCampaign => ({
        ...prevCampaign,
        ...updates,
      }))

      // Directly updating numberOfSteps here based on the decrement
      setNumberofSteps(currentSteps - 1)
    }
  }

  const saveCampaign = async () => {
    try {
      const response = await axios.post('/api/letter_campaigns/add/', campaign, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      loadUserData()
      handleCreateCampaignClose()
      Swal.fire({
        title: '😎 action complete',
        text: 'Campaign saved',
        confirmButtonText: 'Thanks 🤝',
        confirmButtonColor: '#ED6B86',
        cancelButtonText: 'Stay here',
        backdrop: true,
        background: '#FDF7F0',
        customClass: {
          title: 'popup-swal-title',
          popup: 'popup-swal-body',
          confirmButton: 'popup-swal-confirm',
          cancelButton: 'popup-swal-cancel',
        },
      })
    } catch (error) {
      console.error('Failed to save the campaign', error)
      Swal.fire('Error', 'There was an issue saving the campaign.', 'error')
    }
  }


  const editCampaign = async () => {
    console.log('edit campaign id ->', editData.id)
    try {
      const response = await axios.put(`/api/letter_campaigns/edit/${editData.id}/`, campaign, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      loadUserData()
      handleCreateCampaignClose()
      Swal.fire({
        title: '😎 action complete',
        text: 'Campaign updated',
        confirmButtonText: 'Thanks 🤝',
        confirmButtonColor: '#ED6B86',
        cancelButtonText: 'Stay here',
        backdrop: true,
        background: '#FDF7F0',
        customClass: {
          title: 'popup-swal-title',
          popup: 'popup-swal-body',
          confirmButton: 'popup-swal-confirm',
          cancelButton: 'popup-swal-cancel',
        },
      })
    } catch (error) {
      console.error('Failed to save the campaign', error)
      Swal.fire('Error', 'There was an issue updating the campaign.', 'error')
    }
  }





  return (
    <Modal show={createCampaignShow} onHide={handleCreateCampaignClose} backdrop='static' className='create-campaign-modal'>
      <Modal.Body>
        <div className='campaign-wrapper'>
          <div className='campaign-header'>
            <h2>Wittle campaign builder</h2>
            <div className='close' onClick={handleCreateCampaignClose}>x</div>
          </div>
          <div className='campaign-sub-header'>
            <h3>Set up your campaign sequences. Select your templates and the dates you&apos;d like them to be sent 📩. You can add up to 5 steps.</h3>
          </div>
          <div className='campaign-title-section'>
            <h3>Campaign name</h3>
            <input
              name="campaign_name"
              value={campaign.campaign_name}
              onChange={handleCampaignChange}
            ></input>
          </div>

          <div className='campaign-headers'>
            <h3 className='step-header'>Step</h3>
            <h3 className='template-header'>Template</h3>
            <h3 className='date-title'>Send date</h3>
          </div>
          <div className="campaign-stages">
            {numberOfSteps && Array.from({ length: numberOfSteps }).map((_, index) => (
              <div key={index} className="campaign-step">
                <h3 className='step-column'>Step {index + 1}</h3>
                <select
                  className='template-dropdown'
                  value={campaign[`template_${index + 1}_name`] || ''}
                  onChange={(e) => handleTemplateChange(index, e.target.value)}

                >
                  <option value="">Select Template</option>
                  {letterTemplates.map((template, templateIndex) => (
                    <option key={templateIndex} value={template.template_name}>
                      {template.template_name}
                    </option>
                  ))}
                </select>

                {index === 0 ? (
                  <div className='on-launch'>On launch</div>
                ) : (
                  <div className='date-input-container'>
                    <input
                      className='date-input'
                      type="number"
                      min="0"
                      value={campaign[`template_${index + 1}_date`] || ''}
                      onChange={(e) => handleDateChange(index, e.target.value)}
                    />
                    <span className='days-later'>days later</span>
                  </div>
                )}

                {numberOfSteps && numberOfSteps > 1 && index === numberOfSteps - 1 && <h3 className='remove' onClick={() => removeStep()}>❌</h3>}
              </div>
            ))}
            <div className='footer-buttons'>
              {numberOfSteps && numberOfSteps < 5 && <button className='add-step' onClick={addStep}>Add Step</button>}
              {editData === 'None' ?
                <button className='save-campaign' onClick={saveCampaign}>Save Campaign</button>
                :
                <button className='save-campaign' onClick={editCampaign}>Update Campaign</button>
              }
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal >
  )
}

export default CreateCampaign