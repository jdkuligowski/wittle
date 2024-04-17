import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { Modal } from 'react-bootstrap'
import Select from 'react-select'
import ReactSwitch from 'react-switch'
import { getUserToken, isUserAuth, getAccessToken } from '../../../auth/Auth'
import Swal from 'sweetalert2'
import BasicTemplate from './TemplatePDFs.js/BasicTemplate'
import ReactDOMServer from 'react-dom/server'



const CreateTemplate = ({ createTemplateShow, handleCreateTemplateClose, signature, loadUserData, templateAction, currentTemplate, exampleData, setCampaignLoading }) => {

  // loading for template
  const [templateLoading, setTemplateLoading] = useState(false)

  // state for errors
  const [errors, setErrors] = useState({})

  // state for handling the position of components on the letter template
  const [letterTemplate, setLetterTemplate] = useState({
    template_name: '',
    template_body_1: '',
    template_body_2: '',
    template_body_3: '',
    template_body_4: '',
    template_body_5: '',
    template_type: 'Basic template',
    sender_name: true,
    sender_company: true,
    sender_role: true,
    sender_mobile: true,
    sender_landline: true,
    sender_email: true,
    sender_footer: true,
    sender_website: true,
    logo_width: 250,
    logo_height: 50,
    logo_position: 'Right',
    opening: 'Dear ',
    closing: 'Best wishes',
  })

  useEffect(() => {
    if (templateAction === 'edit') {
      setLetterTemplate(currentTemplate)
    } else if (templateAction === 'new') {
      setLetterTemplate({
        template_name: '',
        template_body_1: '',
        template_body_2: '',
        template_body_3: '',
        template_body_4: '',
        template_body_5: '',
        template_type: 'Basic template',
        sender_name: true,
        sender_company: true,
        sender_role: true,
        sender_mobile: true,
        sender_landline: true,
        sender_email: true,
        sender_footer: true,
        sender_website: true,
        logo_width: 250,
        logo_height: 50,
        logo_position: 'Right',
        opening: 'Dear ',
        closing: 'Best wishes',
      })
    }
  }, [templateAction])

  // update paragraphs and characters remaining
  const paragraphChange = (e) => {
    const { name, value } = e.target

    // Ensure letterTemplate is defined and has properties before proceeding
    if (letterTemplate) {
      const otherTotal = Object.keys(letterTemplate).reduce((total, key) => {
        // Use optional chaining and nullish coalescing to avoid errors
        return key !== name ? total + ((letterTemplate[key] && letterTemplate[key].length) || 0) : total
      }, 0)

      const maxCharsForThis = 2200 - otherTotal
      const newText = value.slice(0, Math.max(0, maxCharsForThis)) // Ensure non-negative

      setLetterTemplate(prevState => ({
        ...prevState,
        [name]: newText,
      }))
    }
  }



  // calculation to determine the inputs on the form and the toggle
  const toggleStatus = (key) => {
    setLetterTemplate(prevData => ({
      ...prevData,
      [key]: prevData[key] === true ? false : true,
    }))
  }

  // function to validate the template
  const validateTemplate = () => {
    const tempErrors = {}
    let isValid = true
    if (!letterTemplate.template_name) {
      tempErrors.template_name = '* Template name is required'
      isValid = false
    }
    setErrors(tempErrors)
    return isValid
  }

  // function to save the template
  const postTemplate = async () => {


    if (!validateTemplate()) {
      // setCampaignLoading(false)
      return  // Stop the function if validation fails
    }
    setCampaignLoading(true)


    const extractedAddress = exampleData.address
    const addressComponents = extractedAddress.split(',').map(component => component.trim())
    const titleCaseAddress = addressComponents
      .slice(0, 4)
      .map(component => component.toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase()))
    if (exampleData.postcode) {
      titleCaseAddress.push(exampleData.postcode)
    }

    console.log('template ->', letterTemplate)
    // Generate the HTML content for the template
    const htmlContent = ReactDOMServer.renderToStaticMarkup(
      <BasicTemplate
        signature={signature}
        selectedTemplate={letterTemplate}
        ownerData={exampleData}
        address={titleCaseAddress}
      />
    )

    // Prepare the data for the API request
    const templateData = {
      ...letterTemplate,
      htmlContent, // Include the generated HTML content
      recipient: exampleData,
    }

    console.log('template body ->', templateData)
    try {
      const response = await axios.post('/api/letter_templates/add/', templateData, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      console.log('Letter template ->', response)
      await loadUserData() // Reload user data to reflect the new template
      handleCreateTemplateClose()

      // Show a success message
      Swal.fire({
        title: '😎 Action complete',
        text: 'New template added successfully',
        confirmButtonText: 'Thanks 🤝',
        confirmButtonColor: '#ED6B86',
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
      console.error('Error adding template:', error)
      // Show an error message
      Swal.fire({
        title: '🫡 Wittle alerts',
        text: 'There was an issue adding your template',
        confirmButtonText: 'Try Again 🔄',
        confirmButtonColor: '#ED6B86',
        backdrop: true,
        background: '#FDF7F0',
        customClass: {
          title: 'popup-swal-title',
          popup: 'popup-swal-body',
          confirmButton: 'popup-swal-confirm',
          cancelButton: 'popup-swal-cancel',
        },
      })
    } finally {
      setCampaignLoading(false) // Reset loading state
    }
  }



  // function to save the editedtemplate
  const editTemplate = async () => {
    setTemplateLoading(true)
    try {
      const response = await axios.put(`/api/letter_templates/edit/${letterTemplate.id}/`, letterTemplate, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      console.log('Letter template ->', response)
      loadUserData()
      handleCreateTemplateClose()
      Swal.fire({
        title: '😎 action complete',
        text: 'Template updated',
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
      console.error('Error updating template:', error)
    } finally {
      setTemplateLoading(false)
    }
  }

  return (

    <>
      <Modal show={createTemplateShow} onHide={handleCreateTemplateClose} backdrop='static' className='create-template-modal'>
        <Modal.Body>
          <>
            <div className='template-wrapper'>
              <div className='template-header'>
                <h1>Wittle letter template builder</h1>
                <div className='close' onClick={handleCreateTemplateClose}>x</div>
              </div>
              <div className='template-body'>
                <div className='template-inputs'>
                  <div className='input-top'>
                    <h3 className='template-name'>Template name</h3>
                    <input className='template-name-input' value={letterTemplate.template_name} onChange={(e) => setLetterTemplate({ ...letterTemplate, template_name: e.target.value })}></input>
                  </div>
                  {errors.template_name && (
                    <div id="templateNameError" className="error-text">
                      {errors.template_name}
                    </div>
                  )}
                  <div className='input-details'>
                    <div className='sub-title'>
                      <h3>Details</h3>
                    </div>
                    <div className='details-array'>
                      <div className='detail-line'>
                        <h3>Intro</h3>
                        <input className='detail-inputs' value={letterTemplate.opening} onChange={(e) => setLetterTemplate({ ...letterTemplate, opening: e.target.value })}></input>
                      </div>
                      <div className='detail-line'>
                        <h3>Outro</h3>
                        <input className='detail-inputs' value={letterTemplate.closing} onChange={(e) => setLetterTemplate({ ...letterTemplate, closing: e.target.value })}></input>
                      </div>
                      <div className='detail-line'>
                        <h3>Name</h3>
                        <ReactSwitch
                          checked={letterTemplate.sender_name === true}
                          onChange={() => toggleStatus('sender_name')}
                          onColor='#ED6B86'
                          offColor='#D5D5D5'
                          uncheckedIcon={null}
                          checkedIcon={null}
                        />
                      </div>
                      <div className='detail-line'>
                        <h3>Company</h3>
                        <ReactSwitch
                          checked={letterTemplate.sender_company === true}
                          onChange={() => toggleStatus('sender_company')}
                          onColor='#ED6B86'
                          offColor='#D5D5D5'
                          uncheckedIcon={null}
                          checkedIcon={null}
                        />
                      </div>
                      <div className='detail-line'>
                        <h3>Role</h3>
                        <ReactSwitch
                          checked={letterTemplate.sender_role === true}
                          onChange={() => toggleStatus('sender_role')}
                          onColor='#ED6B86'
                          offColor='#D5D5D5'
                          uncheckedIcon={null}
                          checkedIcon={null}
                        />
                      </div>
                      <div className='detail-line'>
                        <h3>Mobile</h3>
                        <ReactSwitch
                          checked={letterTemplate.sender_mobile === true}
                          onChange={() => toggleStatus('sender_mobile')}
                          onColor='#ED6B86'
                          offColor='#D5D5D5'
                          uncheckedIcon={null}
                          checkedIcon={null}
                        />
                      </div>
                      <div className='detail-line'>
                        <h3>Landline</h3>
                        <ReactSwitch
                          checked={letterTemplate.sender_landline === true}
                          onChange={() => toggleStatus('sender_landline')}
                          onColor='#ED6B86'
                          offColor='#D5D5D5'
                          uncheckedIcon={null}
                          checkedIcon={null}
                        />
                      </div>
                      <div className='detail-line'>
                        <h3>Email</h3>
                        <ReactSwitch
                          checked={letterTemplate.sender_email === true}
                          onChange={() => toggleStatus('sender_email')}
                          onColor='#ED6B86'
                          offColor='#D5D5D5'
                          uncheckedIcon={null}
                          checkedIcon={null}
                        />
                      </div>
                      <div className='detail-line'>
                        <h3>Website</h3>
                        <ReactSwitch
                          checked={letterTemplate.sender_website === true}
                          onChange={() => toggleStatus('sender_website')}
                          onColor='#ED6B86'
                          offColor='#D5D5D5'
                          uncheckedIcon={null}
                          checkedIcon={null}
                        />
                      </div>
                      <div className='detail-line'>
                        <h3>Footer</h3>
                        <ReactSwitch
                          checked={letterTemplate.sender_footer === true}
                          onChange={() => toggleStatus('sender_footer')}
                          onColor='#ED6B86'
                          offColor='#D5D5D5'
                          uncheckedIcon={null}
                          checkedIcon={null}
                        />
                      </div>
                    </div>

                  </div>
                  <div className='input-details'>
                    <div className='sub-title'>
                      <h3>Logo details</h3>
                      <div className='logo-position'>
                        <button className='position-button' onClick={() => setLetterTemplate({ ...letterTemplate, logo_position: 'Left' })} style={{ backgroundColor: letterTemplate.logo_position === 'Left' ? '#ED6B86' : 'inherit' }}>Left</button>
                        <button className='position-button' onClick={() => setLetterTemplate({ ...letterTemplate, logo_position: 'Centre' })} style={{ backgroundColor: letterTemplate.logo_position === 'Centre' ? '#ED6B86' : 'inherit' }}>Centre</button>
                        <button className='position-button' onClick={() => setLetterTemplate({ ...letterTemplate, logo_position: 'Right' })} style={{ backgroundColor: letterTemplate.logo_position === 'Right' ? '#ED6B86' : 'inherit' }}>Right</button>
                      </div>
                      <div className='logo-sizing'>
                        <div className='logo-size-item'>
                          <h3>Height</h3>
                          <input type='number' max={125} value={letterTemplate.logo_height} onChange={(e) => setLetterTemplate({ ...letterTemplate, logo_height: e.target.value })}></input>
                        </div>
                        <div className='logo-size-item'>
                          <h3>Width</h3>
                          <input type='number' max={350} value={letterTemplate.logo_width} onChange={(e) => setLetterTemplate({ ...letterTemplate, logo_width: e.target.value })}></input>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='input-body'>
                    <div className='sub-title'>
                      <h3>Template body</h3>
                      {letterTemplate ? (
                        <div className='characters'>
                          {2200 - (
                            (letterTemplate.template_body_1 ? letterTemplate.template_body_1.length : 0) +
                            (letterTemplate.template_body_2 ? letterTemplate.template_body_2.length : 0) +
                            (letterTemplate.template_body_3 ? letterTemplate.template_body_3.length : 0) +
                            (letterTemplate.template_body_4 ? letterTemplate.template_body_4.length : 0) +
                            (letterTemplate.template_body_5 ? letterTemplate.template_body_5.length : 0)
                          )} characters remaining
                        </div>
                      ) : ''}
                    </div>
                    <div className='text-block'>
                      <div className='sub-sub-title'>
                        <h3>Paragraph 1</h3>
                        {/* <h3 className='characters'>{550 - letterTemplate.template_body_1.length} characters remaining</h3> */}
                      </div>
                      <textarea name='template_body_1' value={letterTemplate.template_body_1} className='input-text-body' onChange={paragraphChange}></textarea>
                      <div className='sub-sub-title'>
                        <h3>Paragraph 2</h3>
                        {/* <h3 className='characters'>{550 - letterTemplate.template_body_2.length} characters remaining</h3> */}
                      </div>
                      <textarea name='template_body_2' value={letterTemplate.template_body_2} className='input-text-body' onChange={paragraphChange}></textarea>
                      <div className='sub-sub-title'>
                        <h3>Paragraph 3</h3>
                        {/* <h3 className='characters'>{550 - letterTemplate.template_body_3.length} characters remaining</h3> */}
                      </div>
                      <textarea name='template_body_3' value={letterTemplate.template_body_3} className='input-text-body' onChange={paragraphChange}></textarea>
                      <div className='sub-sub-title'>
                        <h3>Paragraph 4</h3>
                        {/* <h3 className='characters'>{550 - letterTemplate.template_body_4.length} characters remaining</h3> */}
                      </div>
                      <textarea name='template_body_4' value={letterTemplate.template_body_4} className='input-text-body' onChange={paragraphChange}></textarea>
                      <div className='sub-sub-title'>
                        <h3>Paragraph 5</h3>
                        {/* <h3 className='characters'>{550 - letterTemplate.template_body_4.length} characters remaining</h3> */}
                      </div>
                      <textarea name='template_body_5' value={letterTemplate.template_body_5} className='input-text-body' onChange={paragraphChange}></textarea>
                    </div>

                  </div>
                  <div className='save-section'>
                    {templateAction === 'new' ? <button onClick={() => postTemplate()}>Save template</button> : templateAction === 'edit' ? <button onClick={() => editTemplate()}>Save template</button> : ''}
                  </div>

                </div>
                <div className='template-section'>
                  {/* <div className='template-border'> */}
                  <div className='template-content'>
                    <div className='logo-section' style={{ justifyContent: letterTemplate.logo_position === 'Left' ? 'Flex-start' : letterTemplate.logo_position === 'Centre' ? 'Center' : 'flex-end' }}>
                      <div className='logo-box' style={{ justifyContent: letterTemplate.logo_position === 'Left' ? 'Flex-start' : letterTemplate.logo_position === 'Centre' ? 'Center' : 'flex-end', height: `${letterTemplate.logo_height}px`, width: `${letterTemplate.logo_width}px` }}>
                        {signature ? <img src={signature.logo} alt="Logo" className='logo' /> : ''}

                      </div>
                    </div>
                    <div className='address-section'>
                      <h3 className='address-details'>Owner</h3>
                      <h3 className='address-details'>Address line 1</h3>
                      <h3 className='address-details'>Address line 2</h3>
                      <h3 className='address-details'>Address line 3</h3>
                      <h3 className='address-details'>Postcode</h3>
                    </div>
                    {letterTemplate ?
                      <div className='body-section'>
                        <div className='letter-intro'>
                          <h3 className='intro'>{letterTemplate.opening} </h3>
                          <h3 className='intro'> Homeowner,</h3>
                        </div>
                        <h3 className='letter-paragraph'>{letterTemplate.template_body_1}</h3>
                        <h3 className='letter-paragraph'>{letterTemplate.template_body_2}</h3>
                        <h3 className='letter-paragraph'>{letterTemplate.template_body_3}</h3>
                        <h3 className='letter-paragraph'>{letterTemplate.template_body_4}</h3>
                        <h3 className='letter-paragraph'>{letterTemplate.template_body_5}</h3>
                      </div>
                      : ''}

                    {signature ?
                      <div className='sign-off-section'>
                        <h3 className='sign-off-line'>{letterTemplate.closing}</h3>
                        {letterTemplate.sender_name ? <h3 className='sign-off-line'>{signature.first_name} {signature.last_name}</h3> : ''}
                        {letterTemplate.sender_role ? <h3 className='sign-off-line'>{signature.role}</h3> : ''}
                        {letterTemplate.sender_company ? <h3 className='sign-off-line'>{signature.company_name}</h3> : ''}
                        {letterTemplate.sender_mobile ? <h3 className='sign-off-line'>{signature.mobile}</h3> : ''}
                        {letterTemplate.sender_landline ? <h3 className='sign-off-line'>{signature.landline}</h3> : ''}
                        {letterTemplate.sender_email ? <h3 className='sign-off-line'>{signature.email}</h3> : ''}
                        {letterTemplate.sender_website ? <h3 className='sign-off-line'>{signature.website}</h3> : ''}
                      </div>
                      : ''}
                  </div>
                  {signature && letterTemplate.sender_footer ? <h3 className='letter-footer'>{signature.letter_footer}</h3> : ''}
                </div>
              </div>
              {/* </div> */}
            </div>
          </>
        </Modal.Body>
      </Modal>


    </>
  )
}

export default CreateTemplate