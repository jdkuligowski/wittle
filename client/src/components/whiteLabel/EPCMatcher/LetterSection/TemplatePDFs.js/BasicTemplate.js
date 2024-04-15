import React, { useState, useEffect, useRef } from 'react'
// import { Modal } from 'react-bootstrap'

const BasicTemplate = ({ signature, selectedTemplate, ownerData, address }) => {


  return (
    <>
      <section className="basic-template" style={{
        // backgroundColor: '#FDF7F0',
      }}>
        <div className="template-section" style={{
        }}>
          <div className='template-content'>
            <div className="logo-section" style={{
              position: 'relative', // Make this a positioned ancestor for absolute children
              textAlign: selectedTemplate.logo_position === 'Left' ? 'left' :
                selectedTemplate.logo_position === 'Centre' ? 'center' :
                  'right', // Control alignment with text-align
              height: `${selectedTemplate.logo_height}px`, // Set a height for the section
            }}>
              <div className="logo-box" style={{
                display: 'inline-block', // Make the logo box inline for text-align to affect it
                width: `${selectedTemplate.logo_width}px`,
                height: `${selectedTemplate.logo_height}px`,
              }}>
                {signature && <img src={signature.logo} alt="Logo" style={{
                  maxWidth: `${selectedTemplate.logo_width}px`,
                  maxHeight: `${selectedTemplate.logo_height}px`,
                  width: 'auto', // Adjust based on actual image size, could be '100%' if you want it to fill the logo-box
                  height: 'auto', // Same as width, maintain aspect ratio
                }} />}
              </div>
            </div>
            <div className="address-section" style={{
              position: 'absolute',
              top: '100px',
            }}>
              <h3 className="address-details" style={{ fontSize: '16px', fontWeight: '500', marginTop: '2px', padding: '0', lineHeight: '1.2' }}>
                {ownerData.owner_name ? ownerData.owner_name : 'The Owner'}<br />
                {address ? address[0] : ''}<br />
                {address ? address[1] : ''}<br />
                {address ? address[2] : ''}<br />
                {address ? address[3] : ''}<br />
                {address ? address[4] : ''}<br />
              </h3>

            </div>
            <div className="body-section" style={{
              position: 'absolute',
              top: '200px',
            }}>
              <div className="letter-intro" style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: '30px',

              }}>
                <h3 className="intro" style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  marginRight: '3px',
                }}>{selectedTemplate.opening} </h3>
                <h3 className="intro" style={{
                  fontSize: '16px',
                  fontWeight: '500',
                }}>{
                    ownerData.owner_name ? `${ownerData.owner_name.split(' ')[0]}, ` : 'Homeowner,'
                  }</h3>
              </div>
              <h3 className="letter-paragraph" style={{
                marginTop: '15px',
                fontSize: '16px',
                fontWeight: '500',
              }}>{selectedTemplate.template_body_1}</h3>
              <h3 className="letter-paragraph" style={{
                marginTop: '15px',
                fontSize: '16px',
                fontWeight: '500',
              }}>{selectedTemplate.template_body_2}</h3>
              <h3 className="letter-paragraph" style={{
                marginTop: '15px',
                fontSize: '16px',
                fontWeight: '500',
              }}>{selectedTemplate.template_body_3}</h3>
              <h3 className="letter-paragraph" style={{
                marginTop: '15px',
                fontSize: '16px',
                fontWeight: '500',
              }}>{selectedTemplate.template_body_4}</h3>
              <h3 className='sign-off-line' style={{ fontSize: '16px', fontWeight: '500', marginTop: '5px', padding: '0', lineHeight: '1.2' }}>
                {selectedTemplate.closing && (
                  <>{selectedTemplate.closing}<br /></>
                )}
                {selectedTemplate.sender_name && (
                  <>{signature.first_name} {signature.last_name}<br /></>
                )}
                <>
                  {selectedTemplate.sender_role && selectedTemplate.sender_company ? (
                    <>{signature.role}, {signature.company_name}<br /></>
                  ) : selectedTemplate.sender_role ? (
                    <>{signature.role}<br /></>
                  ) : selectedTemplate.sender_company ? (
                    <>{signature.company_name}<br /></>
                  ) : null}
                </>
                {selectedTemplate.sender_mobile && (
                  <>{signature.mobile}<br /></>
                )}
                {selectedTemplate.sender_landline && (
                  <>{signature.landline}<br /></>
                )}
                {selectedTemplate.sender_email && (
                  <>{signature.email}<br /></>
                )}
                {selectedTemplate.sender_email && (
                  <>{signature.website}<br /></>
                )}
              </h3>
              {/* </div> */}
            </div>

          </div>

          {signature && <h3 className="letter-footer" style={{
            position: 'absolute',
            bottom: '-10px',
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: '500',
            left: '0',
            right: '0',
            width: '100%',
          }}>{signature.letter_footer}</h3>}
        </div>
      </section>
    </>
  )
}

export default BasicTemplate
