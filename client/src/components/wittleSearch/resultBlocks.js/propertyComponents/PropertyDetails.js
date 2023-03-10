import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { NumericFormat } from 'react-number-format'




const PropertyDetails = ({ property }) => {


  return (
    <>
      <div className='details-and-description'>
        <div className='property-details-section'>
          <h5 className='detail-title'>Property details</h5>
          <div className='property-details-list'>
            <h5>๐  {property.type}</h5>
            <h5>๐ {property.bedrooms} bedrooms</h5>
            <h5>๐ 2 bathrooms</h5>
            <h5>๐ซด <NumericFormat value={property.sqft} displayType={'text'} thousandSeparator={true} /> sqft</h5>
          </div>
        </div>
        <div className='property-details-section'>
          {property.channel === 'Rent' ?
            <>
              <h5 className='detail-title'>Letting details</h5>
              <div className='property-details-list'>
                <h5>โฐ Available from 12/04/2023</h5>
                <h5>๐ท <NumericFormat value={1500} displayType={'text'} thousandSeparator={true} /> deposit</h5>
                <h5>๐ furnished</h5>
                <h5>โฐ 12 months min tenancy</h5>
              </div>
            </>
            :
            property.channel === 'Sale' ?
              <>
                <h5 className='detail-title'>Additional details</h5>
                <div className='property-details-list'>
                  <h5>๐ {property.tenure}</h5>
                  <h5>๐ณ 1 acre garden</h5>
                  <h5>๐งพ Council tax band {property.council_tax}</h5>
                  <h5>๐ On road parking</h5>
                </div>
              </>
              :
              ''
          }
        </div>
      </div>
      <div className='details-and-description'>
        <p className='description-text'>{property.property_description}</p>
      </div>
    </>
  )
}

export default PropertyDetails