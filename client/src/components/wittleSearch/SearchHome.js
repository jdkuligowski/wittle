import { useNavigate, Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import NavBar from '../tools/NavBar'
import NormalPropertySearchModal from '../helpers/modals/NormalPropertySearchModal'

const SearchHome = () => {
  // state to enable navigation between pages
  const navigate = useNavigate()

  // manageing the modal pop up for property search
  const [propertySearch, setPropertySearch] = useState(false)

  // close modal
  const handleSearchClose = () => {
    setPropertySearch(false)
  }

  // show the modal
  const handleSearchShow = (e) => {
    setPropertySearch(true)
  }


  return (
    <>
      <section className='homepage-wrapper'>
        {/* Home page section 1: Opening section to site - introduction page and call to a ction for different user journies */}
        <section className='website-opening'>
          <NavBar />
          <div className='search-title-section'>
            <div className='headline-detail'>
              <h1>Find the perfect property in the perfect location</h1>
              <h3><span>Do you like to grab a Pret every morning? Do you want to be by a certain tube line?</span> Wittle takes everything you care about into account when you&apos;re searching for a property and finds you a place that suits your lifestyle.</h3>
              <div className='call-to-action'>
                <h3>Want help finding the perfect property?</h3>
                <button onClick={() => navigate('/wittle-search/fields')}>Start Wittling</button>
              </div>
              <div className='call-to-action'>
                <h3>Already know where you want to live?</h3>
                <button onClick={() => navigate('/property-search')}>Search properties</button>

              </div>
            </div>
            <div className='headline-right'>
              <div className='headline-image'>
              </div>
            </div>
          </div>
        </section>

        {/* Home page section 2: detail around benefits of product for users that haven't visited site before */}
        <section className='wittle-benefits'>
          <h1>How will Wittle help you?</h1>
          <h3>Decisions don&apos;t get bigger than deciding where to live. Wittle gives you all of the information you need to make a truly informed decision.</h3>
          <div className='wittle-detail-screens'>
            <div className='wittle-detail-content'>
              <div className='wittle-detail-image-1'>
              </div>
              <h4>We give every property a score based on the things you care about</h4>
            </div>
            <div className='wittle-detail-content'>
              <div className='wittle-detail-image-2'>
              </div>
              <h4>And we show you everything that is near to it. From Parks, to Gyms and Primary Schools</h4>
            </div>
            <div className='wittle-detail-content'>
              <div className='wittle-detail-image-3'>
              </div>
              <h4>Then we let you compare the properties so you can make a decision on the most suitable one</h4>
            </div>
          </div>
        </section>

        {/* Section 3: details on how to use the site */}
        <section className='wittle-process'>
          <h1>How does it work?</h1>
          <h3 className='sub-title'>Whether it&apos;s a croissant from Gail&apos;s or an unreal local, tell us what matters to you and our algorithm will serve up the properties that suit you best</h3>

          <div className='process-steps' >
            <div className='process-text-left'>
              <h2>Step 1</h2>
              <h2>Tell us what you care about</h2>
              <h3>Give us an idea about your lifestyle and interests. It will take a few minutes, but choosing where to live is a big decision.</h3>
            </div>
            <div className='process-image-right'>
              <div className='process-image-form'>

              </div>

            </div>
          </div>
          <hr />
          <div className='process-steps' id='process-right'>
            <div className='process-image-left'>
              <div className='process-image-final'>
              </div>
            </div>
            <div className='process-text-right'>
              <h2>Step 2</h2>
              <h2>Tell us about your ideal property</h2>
              <h3>Two bedrooms or three? What kind of property are you looking for…</h3>
            </div>

          </div>
          <hr />
          <div className='process-steps'>
            <div className='process-text-left'>
              <h2>Step 3</h2>
              <h2>Enjoy the benefits of Wittle</h2>
              <h3>See all of the properties which match your criteria, starting with the one&apos;s that most suit your lifestyle. You&apos;ll have everything you need at your fingertips.</h3>
            </div>
            <div className='process-image-right'>
              <div className='process-image-results'>

              </div>

            </div>
          </div>
          <hr />
          <button onClick={() => navigate('/wittle-search/fields')}>Start Wittling</button>
        </section>

      </section>

      <NormalPropertySearchModal
        propertySearch={propertySearch}
        handleSearchClose={handleSearchClose}
      />
    </>
  )
} 

export default SearchHome