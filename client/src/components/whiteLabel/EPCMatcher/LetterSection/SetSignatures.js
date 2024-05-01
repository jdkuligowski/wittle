import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { getUserToken, isUserAuth, getAccessToken } from '../../../auth/Auth'
import Swal from 'sweetalert2'
import Loading from '../../../helpers/Loading'



const SetSignatures = ({ letterTab, setLetterTab, signature, setSignature, loadUserData, editCredts,
  setEditCredits, initiateCheckoutSession, creditValue, addCreditValue, availableCredits }) => {

  // state for loading the signatures
  const [loadSignatures, setLoadSignatures] = useState(false)

  // state for editing or not
  const [editSignatures, setEditSignatures] = useState(false)


  // function to chabnge the signatures
  const signatureChange = (e) => {
    const { name, value, type, files } = e.target
    if (type === 'file') {
      // Update the state with the file object for logo
      setSignature(prevState => ({
        ...prevState,
        [name]: files[0], // Assuming single file upload
      }))
    } else {
      // Update the state with value for text inputs
      setSignature(prevState => ({
        ...prevState,
        [name]: value,
      }))
    }
  }


  // function to update the signature details
  const updateSignatures = async () => {
    setLoadSignatures(true)
    const formData = new FormData()

    // Append signature details to formData
    Object.entries(signature).forEach(([key, value]) => {
      if (key === 'logo' && value) {
        // Append the file object for logo
        formData.append(key, value)
      } else {
        // Append other text-based details
        formData.append(key, value)
      }
    })

    try {
      const response = await axios.put('/api/letter_signatures/', formData, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
          // Content-Type is automatically set for FormData, so it's not specified here
        },
      })
      console.log('Letter signature ->', response)
      // Success handling with Swal or any other logic
      loadUserData()
    } catch (error) {
      console.error('Error updating letters:', error)
    } finally {
      setLoadSignatures(false)
    }
  }



  return (


    <>
      <div className='top-line'>
        <div className='matching-status'>
          <h3 className='matching-pill' onClick={() => setLetterTab('My signatures')} style={{ color: letterTab === 'My signatures' ? 'white' : '#1A276C', backgroundColor: letterTab === 'My signatures' ? '#ED6B86' : 'rgba(26, 39, 108, 0.15)' }}>My signatures</h3>
          <h3 className='matching-pill' onClick={() => setLetterTab('Templates')} style={{ color: letterTab === 'Templates' ? 'white' : '#1A276C', backgroundColor: letterTab === 'Templates' ? '#ED6B86' : 'rgba(26, 39, 108, 0.15)' }}>Templates</h3>
          <h3 className='matching-pill' onClick={() => setLetterTab('Campaigns')} style={{ color: letterTab === 'Campaigns' ? 'white' : '#1A276C', backgroundColor: letterTab === 'Campaigns' ? '#ED6B86' : 'rgba(26, 39, 108, 0.15)' }}>Campaigns</h3>
          <h3 className='matching-pill' onClick={() => setLetterTab('Home')} style={{ color: letterTab === 'Home' ? 'white' : '#1A276C', backgroundColor: letterTab === 'Home' ? '#ED6B86' : 'rgba(26, 39, 108, 0.15)' }}>Home</h3>
        </div>
        {editCredts ?
          <div className='credits-section'>
            <input type='number' value={creditValue} onChange={addCreditValue}></input>
            <button className='add-credts' onClick={() => initiateCheckoutSession(creditValue)}>Add</button>
            <h3 className='close-credits' onClick={() => setEditCredits(false)}>❌</h3>
          </div>
          : <div className='credits-section'>
            <h3 className='credit-balance'>{availableCredits ? `Current balance £${availableCredits}` : ''}</h3>
            <button className='add-credts' onClick={() => setEditCredits(true)}>Top up</button>
          </div>}
      </div>

      <div className='my-details-section'>
        <h1 className='my-details-title'>Add or update the details you want to include in your letters</h1>
        {signature && !loadSignatures ?
          <>
            <div className='details-columns'>
              <div className='my-details-content'>
                <div className='details-row'>
                  <h3 className='detail-title'>Title</h3>
                  {editSignatures ? <input name="title" type='text' value={signature.title} onChange={signatureChange}></input> : <h3 className='signature-fixed'>{signature.title}</h3>}
                </div>
                <div className='details-row'>
                  <h3 className='detail-title'>First name</h3>
                  {editSignatures ? <input name="first_name" type='text' value={signature.first_name} onChange={signatureChange}></input> : <h3 className='signature-fixed'>{signature.first_name}</h3>}
                </div>
                <div className='details-row'>
                  <h3 className='detail-title'>Last name</h3>
                  {editSignatures ? <input name="last_name" type='text' value={signature.last_name} onChange={signatureChange}></input> : <h3 className='signature-fixed'>{signature.last_name}</h3>}
                </div>
                <div className='details-row'>
                  <h3 className='detail-title'>Company</h3>
                  {editSignatures ? <input name="company_name" type='text' value={signature.company_name} onChange={signatureChange}></input> : <h3 className='signature-fixed'>{signature.company_name}</h3>}
                </div>
                <div className='details-row'>
                  <h3 className='detail-title'>Role</h3>
                  {editSignatures ? <input name="role" type='text' value={signature.role} onChange={signatureChange}></input> : <h3 className='signature-fixed'>{signature.role}</h3>}
                </div>
                <div className='details-row'>
                  <h3 className='detail-title'>Mobile</h3>
                  {editSignatures ? <input name="mobile" type='text' pattern="\d*" value={signature.mobile} onChange={signatureChange}></input> : <h3 className='signature-fixed'>{signature.mobile}</h3>}
                </div>
                <div className='details-row'>
                  <h3 className='detail-title'>Landline</h3>
                  {editSignatures ? <input name="landline" type='text' pattern="\d*" value={signature.landline} onChange={signatureChange}></input> : <h3 className='signature-fixed'>{signature.landline}</h3>}
                </div>
                <div className='details-row'>
                  <h3 className='detail-title'>Email</h3>
                  {editSignatures ? <input name="email" type='text' value={signature.email} onChange={signatureChange}></input> : <h3 className='signature-fixed'>{signature.email}</h3>}
                </div>
                <div className='details-row'>
                  <h3 className='detail-title'>Address</h3>
                  {editSignatures ? <input name="address" type='text' value={signature.address} onChange={signatureChange}></input> : <h3 className='signature-fixed'>{signature.address}</h3>}
                </div>
                <div className='details-row'>
                  <h3 className='detail-title'>Website</h3>
                  {editSignatures ? <input name="website" type='text' value={signature.website} onChange={signatureChange}></input> : <h3 className='signature-fixed'>{signature.website}</h3>}
                </div>
                {/* <div className='details-row'>
                <h3 className='detail-title'>Footer</h3>
                {editSignatures ? <input name="letter_footer" type='text' value={signature.letter_footer} onChange={signatureChange}></input> : <h3 className='signature-fixed'>{signature.letter_footer}</h3>}
              </div> */}
                <div className='details-row'>
                  <h3 className='detail-title'>Logo</h3>
                  {editSignatures ?
                    <input
                      type="file"
                      name="logo"
                      accept="image/png, image/jpeg"
                      className='image-input'
                      onChange={signatureChange}
                    />
                    // : signature.logo ? <h3>{signature.logo}</h3> : null
                    : signature.logo ?
                      <div className='logo-box'>
                        <img src={signature.logo} alt="Logo" className='signature-logo' />
                      </div>
                      : null
                  }
                </div>
              </div>
              <div className='my-details-content'>
                <div className='details-row'>
                  <h3 className='detail-title'>TikTok</h3>
                  {editSignatures ? <input name="tiktok" type='text' value={signature.tiktok} onChange={signatureChange}></input> : <h3 className='signature-fixed'>{signature.tiktok}</h3>}
                </div>
                <div className='details-row'>
                  <h3 className='detail-title'>Instagram</h3>
                  {editSignatures ? <input name="instagram" type='text' value={signature.instagram} onChange={signatureChange}></input> : <h3 className='signature-fixed'>{signature.instagram}</h3>}
                </div>
                <div className='details-row'>
                  <h3 className='detail-title'>QR code location</h3>
                  {editSignatures ? <input name="qr_location" type='text' value={signature.qr_location} onChange={signatureChange}></input> : <h3 className='signature-fixed'>{signature.qr_location}</h3>}
                </div>
                <div className='details-row'>
                  <h3 className='detail-title'>Digital signature</h3>
                  {editSignatures ? <input name="digital_signature" type='text' value={signature.digital_signature} onChange={signatureChange}></input> : <h3 className='signature-fixed'>{signature.digital_signature}</h3>}
                </div>
                <div className='details-row'>
                  <h3 className='detail-title'>Banner image</h3>
                  {editSignatures ? <input name="banner_image" type='text' value={signature.banner_image} onChange={signatureChange}></input> : <h3 className='signature-fixed'>{signature.banner_image}</h3>}
                </div>
              </div>
            </div>
            <div className='save'>
              {!editSignatures ?
                <button onClick={() => setEditSignatures(true)}>Edit details</button>
                :
                <>
                  <button onClick={() => updateSignatures()}>Save details</button>
                  <button className='stop-edit' onClick={() => setEditSignatures(false)}>Stop editing</button>
                </>
              }
            </div>
          </>
          : loadSignatures ?
            <div className='property-table-loading'>
              <Loading />
            </div>
            : ''}
      </div>
    </>
  )
}

export default SetSignatures