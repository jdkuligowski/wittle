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



const TemplateOptions = ({ createTemplateShow, handleCreateTemplateClose, signature, loadUserData, templateAction, currentTemplate, exampleData, setCampaignLoading }) => {

  // loading for template
  const [templateLoading, setTemplateLoading] = useState(false)

  // state for errors
  const [errors, setErrors] = useState({})

  // Template details including full URLs to PDFs
  const templates = [
    { number: 1, title: 'Top banner', description: 'Profile image', pdf: 'https://wittle23images.blob.core.windows.net/letter-pdfs/Wittle%20Letter%20Templates%20-%20core%20examples%20(2).pdf' },
    { number: 2, title: 'Top banner', description: 'No profile image', pdf: 'https://wittle23images.blob.core.windows.net/letter-pdfs/Wittle%20Letter%20Templates%20-%20core%20examples%20(3).pdf' },
    { number: 3, title: 'Bottom banner', description: 'Profile image', pdf: 'https://wittle23images.blob.core.windows.net/letter-pdfs/Wittle%20Letter%20Templates%20-%20core%20examples%20(4).pdf' },
    { number: 4, title: 'Bottom banner', description: 'No profile image', pdf: 'https://wittle23images.blob.core.windows.net/letter-pdfs/Wittle%20Letter%20Templates%20-%20core%20examples%20(5).pdf' },
    { number: 5, title: 'No banner', description: 'Profile image', pdf: 'https://wittle23images.blob.core.windows.net/letter-pdfs/Wittle%20Letter%20Templates%20-%20core%20examples%20(6).pdf' },
    { number: 6, title: 'No banner', description: 'No profile image', pdf: 'https://wittle23images.blob.core.windows.net/letter-pdfs/Wittle%20Letter%20Templates%20-%20core%20examples%20(7).pdf' }
  ]

  // state for handling the position of components on the letter template
  const [letterTemplate, setLetterTemplate] = useState({
    template_name: '',
    template_body_1: '',
    template_body_2: '',
    template_body_3: '',
    template_body_4: '',
    template_body_5: '',
    template_type: 'Option 1',
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
        template_type: 'Option 1',
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

  const areRequiredFieldsFilled = (signature) => {
    const requiredFields = [
      'first_name',
      'last_name',
      'company_name',
      'title',
      'role',
      'mobile',
      'landline',
      'address',
      'email',
      'logo',
      'digital_signature'
    ]

    return requiredFields.every(field => signature[field])
  }

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

    if (!areRequiredFieldsFilled(signature)) {
      handleCreateTemplateClose()
      const result = await Swal.fire({
        title: '🫡 Wittle alerts',
        text: 'You need to populate your signatures before you can submit this template',
        icon: 'warning', // Adds a warning icon to the alert
        // showCancelButton: true, // Shows a cancel button alongside the confirm button
        confirmButtonText: 'OK, thanks 🤝',
        confirmButtonColor: '#ED6B86',
        cancelButtonText: 'No thanks',
        backdrop: true,
        background: '#FDF7F0',
        customClass: {
          title: 'popup-swal-title',
          popup: 'popup-swal-body',
          confirmButton: 'popup-swal-confirm',
          cancelButton: 'popup-swal-cancel',
        },
      })
      return
    }

    setCampaignLoading(true)


    // const extractedAddress = exampleData.address
    // const addressComponents = extractedAddress.split(',').map(component => component.trim())
    // const titleCaseAddress = addressComponents
    //   .slice(0, 4)
    //   .map(component => component.toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase()))
    // if (exampleData.postcode) {
    //   titleCaseAddress.push(exampleData.postcode)
    // }

    console.log('template ->', letterTemplate)
    // Generate the HTML content for the template
    // const htmlContent = ReactDOMServer.renderToStaticMarkup(
    //   <BasicTemplate
    //     signature={signature}
    //     selectedTemplate={letterTemplate}
    //     ownerData={exampleData}
    //     // address={titleCaseAddress}
    //   />
    // )

    // Prepare the data for the API request
    const templateData = {
      ...letterTemplate,
      // htmlContent, // Include the generated HTML content
      // recipient: exampleData,
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
                  <div className='input-second'>
                    <h3 className='template-name'>Template type</h3>
                    <div className='template-array'>
                      {templates ? templates.map((template) => (
                        <div className='template-box' key={template.number}>
                          <div
                            className='template-button'
                            onClick={() => setLetterTemplate({ ...letterTemplate, template_type: `Option ${template.number}` })}
                            style={{
                              border: letterTemplate.template_type === `Option ${template.number}` ? '2px solid #ED6B86' : '0.5px solid #1A276C',
                            }}
                          >
                            <h1>{template.number}</h1>
                            <h3>{template.title}</h3>
                            <h3>{template.description}</h3>
                          </div>
                          <h3 style={{ cursor: 'pointer' }} onClick={() => window.open(template.pdf, '_blank')}>See example</h3>
                        </div>
                      )) : ''}
                    </div>
                  </div>
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
                {/* <div className='template-section'>
                  <div className='top-banner'>
                    {signature ? <img src={signature.banner_image} alt="banner" className='banner-image' /> : ''}
                  </div>
                  <div className='address-section'>
                    <h3 className='address-details'>Owner</h3>
                    <h3 className='address-details'>Address line 1</h3>
                    <h3 className='address-details'>Address line 2</h3>
                    <h3 className='address-details'>Address line 3</h3>
                    <h3 className='address-details'>Postcode</h3>
                  </div>
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
                  {signature ?
                    <>
                      <div className='signature-section'>
                        <h3 className='sign-off-line'>{letterTemplate.closing},</h3>
                        <div className='detailed-signature'>
                          <div className='signature-image'>
                            <img src={signature.profile_image} alt="profile image" className='profile-image' />
                          </div>
                          <div className='signature-text'>
                            <div className='digital-signature-box'>
                              <img src={signature.digital_signature} alt="digital signature" className='digital-signature' />
                            </div>
                            <h3>{signature.first_name} {signature.last_name}</h3>
                            <h3>{signature.role}, {signature.company_name}</h3>
                          </div>
                        </div>
                      </div>
                      <div className='additional-signature-details'>
                        <div className='left-additional'>
                          <h3 className='additional-detail-point'>{signature.email}</h3>
                          <h3 className='additional-detail-point'>{signature.mobile}</h3>
                          <h3 className='additional-detail-point'>{signature.website}</h3>
                        </div>
                        <div className='right-additional'>
                          <div className='social-row'>
                            <div className='social-icon' id='insta'></div>
                            <h3 className='social-text'>@{signature.instagram}</h3>
                          </div>
                          <div className='social-row'>
                            <div className='social-icon' id='insta'></div>
                            <h3 className='social-text'>@{signature.tiktok}</h3>
                          </div>
                        </div>
                      </div>
                      <div className='footer-section'>
                        <h3 className='footer-text'>{signature.address}</h3>
                      </div>
                    </>
                    : ''}

                </div> */}



              </div>
              {/* </div> */}
            </div>
          </>
        </Modal.Body>
      </Modal>


    </>
  )
}

export default TemplateOptions