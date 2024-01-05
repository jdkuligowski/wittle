import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import { isUserAuth, getUserToken, getAccessToken } from '../../auth/Auth'
import { NumericFormat } from 'react-number-format'
import Loading from '../../helpers/Loading'


const TopProperties = ({ setListingSelection, fetchData }) => {

  // state to enable navigation between pages
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [properties, setProperties] = useState()

  // filter array for proeprties to search
  const [propertyFilters, setPropertyFilters] = useState({
    channel: 'Sales',
    area: '',
    persona: 'Young families',
    bedrooms_min: '',
    bedrooms_max: '',
    rental_price_min: '',
    rental_price_max: '',
  })


  //  Loading latest data from the database based on the postcode areas applied by the user
  const loadProperties = async () => {
    setLoading(true)
    const channelValue = propertyFilters.channel
    const areaValue = propertyFilters.area
    const personaValue = propertyFilters.persona
    const bedroomsMin = propertyFilters.bedrooms_min
    const bedroomsMax = propertyFilters.bedrooms_max
    const priceMin = propertyFilters.rental_price_min
    const priceMax = propertyFilters.rental_price_max
    const personaAttributeToSortBy = personaValue.toLowerCase().replace(/ /g, '_')

    try {
      if (channelValue === 'Rental') {
        const url = `/api/personas/rental/?area=${areaValue}&persona=${personaValue}&min_bedrooms=${bedroomsMin}&max_bedrooms=${bedroomsMax}&rental_price_min=${priceMin}&rental_price_max=${priceMax}`
        // extract data based on url
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        // Sort data based on the adjusted persona attribute
        data.sort((a, b) => {
          const personaValueA = a.persona_data_list[0][personaAttributeToSortBy]
          const personaValueB = b.persona_data_list[0][personaAttributeToSortBy]
          return personaValueB - personaValueA // Sorting in descending order
        })
        console.log('combined data ->', data)
        setProperties(data)

      } else if (channelValue === 'Sales') {
        const url = `/api/personas/sales/?area=${areaValue}&persona=${personaValue}&min_bedrooms=${bedroomsMin}&max_bedrooms=${bedroomsMax}&rental_price_min=${priceMin}&rental_price_max=${priceMax}`
        // extract data based on url
        const { data } = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`,
          },
        })
        // Sort data based on the adjusted persona attribute
        data.sort((a, b) => {
          const personaValueA = a.persona_data_list[0][personaAttributeToSortBy]
          const personaValueB = b.persona_data_list[0][personaAttributeToSortBy]
          return personaValueB - personaValueA // Sorting in descending order
        })
        console.log('combined data ->', data)
        setProperties(data)
      }
      setLoading(false)
    } catch (error) {
      console.error('can\'t access combined data ->', error)
    }
  }


  // go to url in table
  const handleVisitUrl = (url) => {
    // window.open(url, '_blank') // This will open the URL in a new tab
    const windowFeatures = 'width=1200,height=800,resizable=yes,scrollbars=yes,status=yes'
    // Open the URL in a new window
    window.open(url, '_blank', windowFeatures)
  }

  // function to move to the listings
  const goToListing = (item) => {
    console.log('postcode ->', item.property_data.postcode)
    window.localStorage.setItem('listing-postcode', JSON.stringify(item.property_data.postcode))
    window.localStorage.setItem('listing-route', JSON.stringify('On'))
    fetchData()
    setListingSelection('Property insights')
    navigate('/agents/listing-generator')
  }



  // sales prices
  const salesPrices = [
    '200000', '300000', '400000', '500000', '600000', '700000', '800000', '900000', '1000000', '1250000', '1500000', '1750000', '2000000', '2250000', '2500000',
    '2750000', '3000000', '3500000', '4000000', '5000000', '7500000', '10000000', '12500000', '15000000', '20000000', '30000000', '40000000', '50000000'
  ]

  // rental prices
  const rentalPrices = [
    '500', '600', '700', '800', '900', '1000', '1100', '1200', '1300', '1400', '1500', '1600', '1700', '1800', '1900', '2000', '2250', '2500', '2750', '3000', '3250', '3500',
    '4000', '4500', '5000', '5500', '6000', '7000', '8000', '9000', '10000', '12500', '15000', '20000', '25000', '30000', '40000', '50000', '60000'
  ]

  // borough list
  const boroughs = ['Barking and Dagenham', 'Barnet', 'Bexley', 'Brent', 'Camden', 'Croydon', 'Ealing', 'Enfield', 'Greenwich', 'Havering', 'Kensington and Chelsea',
    'Hertfordshire', 'Hillingdon', 'Hounslow', 'Islington', 'Lambeth', 'Lewisham', 'Merton', 'Southwark', 'Sutton', 'Waltham Forest', 'Westminster',
    'Hackney', 'City of London', 'Hammersmith and Fulham', 'Wandsworth', 'Tower Hamlets', 'Bromley', 'Haringey', 'Kingston upon Thames', 'Newham', 'Redbridge', 'Richmond upon Thames']


  return (

    <>
      <section className='top-properties'>

        <section className='top-properties-filters'>
          <div className='filter-block'>
            <div className='single-dropdowns'>
              <h3>Channel</h3>
              <select className='dropdown' value={propertyFilters.channel || 'Sales'} onChange={(e) => setPropertyFilters(prevData => ({ ...prevData, channel: e.target.value }))}>
                <option>Sales</option>
                <option>Rental</option>
              </select>
            </div>
          </div>
          <div className='filter-block'>
            <div className='single-dropdowns'>
              <h3>Area</h3>
              <select className='dropdown' value={propertyFilters.area || null} onChange={(e) => setPropertyFilters(prevData => ({ ...prevData, area: e.target.value }))}>
                <option value={null}>All</option>
                {boroughs.map((borough, index) => (
                  <option key={index} value={borough}>{borough}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className='filter-block'>
            <div className='single-dropdowns'>
              <h3>Persona</h3>
              <select className='dropdown' value={propertyFilters.persona || 'Young families'} onChange={(e) => setPropertyFilters(prevData => ({ ...prevData, persona: e.target.value }))}>
                <option>Young families</option>
                <option>Young professionals</option>
                <option>Vibes</option>
                <option>Commuter convenience</option>
              </select>
            </div>
          </div>
          <div className='filter-block'>
            <h3>Bedrooms</h3>
            <div className='double-dropdowns'>
              <select
                className='dropdown'
                value={propertyFilters.bedrooms_min || ''}
                onChange={(e) => setPropertyFilters(prevData => ({
                  ...prevData,
                  bedrooms_min: e.target.value === '' ? null : e.target.value,
                }))}
              >
                <option value=''>No min</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
              <select
                className='dropdown'
                value={propertyFilters.bedrooms_max || ''}
                onChange={(e) => setPropertyFilters(prevData => ({
                  ...prevData,
                  bedrooms_max: e.target.value === '' ? null : e.target.value,
                }))}
              >
                <option value=''>No max</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
              </select>
            </div>

          </div>
          <div className='filter-block'>
            <h3>Price</h3>
            {propertyFilters.channel === 'Rental' ?
              <div className='double-dropdowns'>
                <select
                  className='dropdown'
                  value={propertyFilters.rental_price_min || ''}
                  onChange={(e) => setPropertyFilters(prevData => ({ ...prevData, rental_price_min: e.target.value }))}
                >
                  <option value={0}>No min</option>
                  {rentalPrices.map((price, index) => (
                    <option key={index} value={price}>
                      <NumericFormat
                        value={price}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'£'}
                      />
                    </option>
                  ))}
                </select>
                <select
                  className='dropdown'
                  value={propertyFilters.rental_price_max || ''}
                  onChange={(e) => setPropertyFilters(prevData => ({ ...prevData, rental_price_max: e.target.value }))}
                >
                  <option value={10000000}>No max</option>
                  {rentalPrices.map((price, index) => (
                    <option key={index} value={price}>
                      <NumericFormat
                        value={price}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'£'}
                      />
                    </option>
                  ))}
                </select>

              </div>
              : propertyFilters.channel === 'Sales' ?
                <div className='double-dropdowns'>
                  <select
                    className='dropdown'
                    value={propertyFilters.rental_price_min || ''}
                    onChange={(e) => setPropertyFilters(prevData => ({ ...prevData, rental_price_min: e.target.value }))}
                  >
                    <option value={0}>No min</option>
                    {salesPrices.map((price, index) => (
                      <option key={index} value={price}>
                        <NumericFormat
                          value={price}
                          displayType={'text'}
                          thousandSeparator={true}
                          prefix={'£'}
                        />
                      </option>
                    ))}
                  </select>
                  <select
                    className='dropdown'
                    value={propertyFilters.rental_price_max || ''}
                    onChange={(e) => setPropertyFilters(prevData => ({ ...prevData, rental_price_max: e.target.value }))}
                  >
                    <option value={10000000}>No max</option>
                    {salesPrices.map((price, index) => (
                      <option key={index} value={price}>
                        <NumericFormat
                          value={price}
                          displayType={'text'}
                          thousandSeparator={true}
                          prefix={'£'}
                        />
                      </option>
                    ))}
                  </select>

                </div>
                : ''}

          </div>
          {loading ? '' : <button className='load-properties' onClick={loadProperties}>Load</button>}

        </section>

        {!loading ?
          <section className='top-property-results'>
            <div className='top-property-title'>
              <h3>{properties ? `Here are ${properties.length} properties that match your criteria` : ''}</h3>
            </div>

            <div className='top-property-table'>
              <div className='table-headers'>
                <div id='column1' className='column'>
                  <h5>#</h5>

                </div>
                <div id='column2' className='column' >
                  <h5>Address</h5>
                </div>
                <div id='column3' className='column'>
                  <h5>Postcode</h5>
                  {/* <h5>⬇️</h5> */}
                </div>
                <div id='column4' className='column'>
                  <h5>Area</h5>
                </div>
                <div id='column5' className='column'>
                  <h5>Added</h5>
                </div>
                <div id='column6' className='column'>
                  <h5>Price</h5>
                  {/* <h5>⬇️</h5> */}
                </div>
                <div id='column7' className='column'>
                  <h5>Bedrooms</h5>
                </div>
                <div id='column8' className='column'>
                  <h5>Agent</h5>
                </div>
                <div id='column9' className='column'>
                  <h5>Score</h5>
                </div>

              </div>
              <hr className='property-divider' />

              <div className='table-detail'>
                {properties ? properties.map((item, index) => {
                  return (
                    <>
                      <div className='table-content'>
                        <div className='column' id='column1' onClick={() => handleVisitUrl(item.property_data.url)}>
                          <h5>{index + 1}</h5>
                        </div>
                        <div className='column' id='column2' onClick={() => handleVisitUrl(item.property_data.url)}>
                          <h5>{item.property_data.displayAddress}</h5>
                        </div>
                        <div className='column' id='column3' onClick={() => handleVisitUrl(item.property_data.url)}>
                          <h5>{item.property_data.postcode}</h5>
                        </div>
                        <div className='column' id='column4' onClick={() => handleVisitUrl(item.property_data.url)}>
                          <h5>{item.persona_data_list[0].lsoa}</h5>
                        </div>
                        <div className='column' id='column5' onClick={() => handleVisitUrl(item.property_data.url)}>
                          <h5>{item.property_data.added_revised === null ? `Reduced ${item.property_data.reduced_revised}` : item.property_data.added_revised}</h5>
                        </div>
                        <div className='column' id='column6' onClick={() => handleVisitUrl(item.property_data.url)}>
                          <h5>{item.property_data.price}</h5>
                        </div>
                        <div className='column' id='column7' onClick={() => handleVisitUrl(item.property_data.url)}>
                          <h5>{item.property_data.bedrooms}</h5>
                        </div>
                        <div className='column' id='column8' onClick={() => handleVisitUrl(item.property_data.url)}>
                          <h5>{item.property_data.agent}</h5>
                        </div>
                        <div className='column' id='column9' onClick={() => handleVisitUrl(item.property_data.url)}>
                          {propertyFilters.persona === 'Young families' ? <h5>{(item.persona_data_list[0].young_families).toFixed(4)}</h5> :
                            propertyFilters.persona === 'Young professionals' ? <h5>{(item.persona_data_list[0].young_professionals).toFixed(4)}</h5> :
                              propertyFilters.persona === 'Vibes' ? <h5>{(item.persona_data_list[0].vibes).toFixed(4)}</h5> :
                                propertyFilters.persona === 'Commuter convenience' ? <h5>{(item.persona_data_list[0].commuter_convenience).toFixed(4)}</h5> : ''}
                        </div>
                        <div id='column10' className='column'>
                          <button onClick={() => goToListing(item)}>Go</button>
                        </div>
                      </div>
                      <hr className='property-divider' />

                    </>
                  )
                }) : ''}
              </div>
            </div>
          </section>
          : loading ?
            <div className='property-table-loading'>
              <Loading />
            </div>
            : ''}
      </section>


    </>

  )
}

export default TopProperties