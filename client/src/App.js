import { useEffect, useState } from 'react'
import { Route, Routes, BrowserRouter, Link } from 'react-router-dom'
import axios from 'axios'
import ReactGA from 'react-ga'


// Import pages for use on the site
import Home from './components/Home'
import NavBar from './components/tools/NavBar'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
// import PropertyDetailSearch from './components/wittleSearch/FieldSelection'
import FieldSelection from './components/wittleSearch/FieldSelection'
import Hospitality from './components/wittleSearch/Hospitality'
import Travel from './components/wittleSearch/Travel'
import Lifestyle from './components/wittleSearch/Lifestyle'
import Family from './components/wittleSearch/formBlocks/family/Family'
import PropertySubmitWittle from './components/wittleSearch/PropertyDetailsWittle'
import PropertyResultsWittle from './components/wittleSearch/resultBlocks.js/PropertyResultsWittle'
import SinglePropertyWittle from './components/wittleSearch/resultBlocks.js/SinglePropertyWittle'
import AccessDenied from './components/helpers/AccessDenied'
import NormalSearchResultsTemp from './components/propertySearch/NormalSearchResultsTemp'
import NormalSearchResults from './components/propertySearch/NormalSearchResults'
import NormalSingleProperty from './components/propertySearch/NormalSingleProperty'

import LivingHome from './components/living/LivingHome' 
import ProfileHomepage from './components/profile/ProfileHomepage'
import SearchHome from './components/wittleSearch/SearchHome'
import AgentsHome from './components/AgentsLanding'
import LandingPage from './components/whiteLabel/LandingPage'
import SinglePropertySummary from './components/whiteLabel/propertyDetails/SinglePropertySummary'
import SingleSecondarySchool from './components/whiteLabel/propertyDetails/variableDetails/SingleSecondarySchool'
import SinglePrimarySchool from './components/whiteLabel/propertyDetails/variableDetails/SinglePrimarySchool'
import PrimaryDetails from './components/whiteLabel/propertyDetails/componentDetails/PrimaryDetails'
import RequestReset from './components/auth/RequestReset'
import CompleteReset from './components/auth/CompleteReset'
import VariablesPage from './components/whiteLabel/variableSummaries/VariablesPage'
import WhiteComparison from './components/whiteLabel/comparisonSection/WhiteComparison'

const App = () => {
 
  // initialize google analytics account and load for each page
  useEffect(() => {
    ReactGA.initialize('G-B899F8SK12')
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])
  

  return (
    <main className='site-wrapper'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/agents' element={<AgentsHome />} />
          
          {/* <Route path='/wittle-search' element={<SearchHome />} /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/password-reset-request' element={<RequestReset />} />
          <Route path='/password-reset-complete' element={<CompleteReset />} />
          {/* <Route path='/register' element={<Register />} />  */}
          {/* <Route path='/wittle-search' element={<PropertyDetailSearch />} /> */}
          <Route path='/wittle-search/fields' element={<FieldSelection />} />
          <Route path='/wittle-search/hospitality' element={<Hospitality />} />
          <Route path='/wittle-search/travel' element={<Travel />} />
          <Route path='/wittle-search/lifestyle' element={<Lifestyle />} />
          <Route path='/wittle-search/family' element={<Family />} />
          <Route path='/wittle-search/property' element={<PropertySubmitWittle />} />
          <Route path='/wittle-results' element={<PropertyResultsWittle />} />
          <Route path='/wittle-results/:id' element={<SinglePropertyWittle />} />
          <Route path='access-denied' element={<AccessDenied />} />
          {/* <Route path='/property-search' element={<NormalSearchResultsTemp />} />
          <Route path='/property-results' element={<NormalSearchResults />} />
          <Route path='/property-results/:id' element={<NormalSingleProperty />} /> */}
          {/* <Route path='/living' element={<LivingHome />} /> */}
          <Route path='/profile' element={<ProfileHomepage />} />
          <Route path='/agents/profile' element={<LandingPage />} />
          <Route path='/agents/explore' element={<VariablesPage />} />
          <Route path='/agents/compare' element={<WhiteComparison />} />
          <Route path='/agents/property/:postcode' element={<SinglePropertySummary />} />
          <Route path='/agents/secondary-schools/:id' element={<SingleSecondarySchool />} />

          <Route path='/agents/primary-schools/:id' element={<SinglePrimarySchool />} />






        </Routes>
      </BrowserRouter>
    </main>

  )

}

export default App
