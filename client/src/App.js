// import { useEffect, useState } from 'react'
// import { Route, Routes, BrowserRouter, Link } from 'react-router-dom'
// import axios from 'axios'
// import ReactGA from 'react-ga'


// // Import pages for use on the site
// import Home from './components/Home'
// import NavBar from './components/tools/NavBar'
// import Login from './components/auth/Login'
// import Register from './components/auth/Register'
// // import PropertyDetailSearch from './components/wittleSearch/FieldSelection'
// import FieldSelection from './components/wittleSearch/FieldSelection'
// import Hospitality from './components/wittleSearch/Hospitality'
// import Travel from './components/wittleSearch/Travel'
// import Lifestyle from './components/wittleSearch/Lifestyle'
// import Family from './components/wittleSearch/formBlocks/family/Family'
// import PropertySubmitWittle from './components/wittleSearch/PropertyDetailsWittle'
// import PropertyResultsWittle from './components/wittleSearch/resultBlocks.js/PropertyResultsWittle'
// import SinglePropertyWittle from './components/wittleSearch/resultBlocks.js/SinglePropertyWittle'
// import AccessDenied from './components/helpers/AccessDenied'
// import NormalSearchResultsTemp from './components/propertySearch/NormalSearchResultsTemp'
// import NormalSearchResults from './components/propertySearch/NormalSearchResults'
// import NormalSingleProperty from './components/propertySearch/NormalSingleProperty'

// import LivingHome from './components/living/LivingHome' 
// import ProfileHomepage from './components/profile/ProfileHomepage'
// import SearchHome from './components/wittleSearch/SearchHome'
// import AgentsHome from './components/AgentsLanding'
// import LandingPage from './components/whiteLabel/LandingPage'
// import SinglePropertySummary from './components/whiteLabel/propertyDetails/SinglePropertySummary'
// import SingleSecondarySchool from './components/whiteLabel/propertyDetails/variableDetails/SingleSecondarySchool'
// import SinglePrimarySchool from './components/whiteLabel/propertyDetails/variableDetails/SinglePrimarySchool'
// import PrimaryDetails from './components/whiteLabel/propertyDetails/componentDetails/PrimaryDetails'
// import RequestReset from './components/auth/RequestReset'
// import CompleteReset from './components/auth/CompleteReset'
// import VariablesPage from './components/whiteLabel/variableSummaries/VariablesPage'
// import WhiteComparison from './components/whiteLabel/comparisonSection/WhiteComparison'
// import Unsubscribe from './components/auth/Unsubscribe'
// import SchoolSearchSimplified from './components/blogs/SchoolSearchSimplified'

// const App = () => {
 
//   // initialize google analytics account and load for each page
//   useEffect(() => {
//     ReactGA.initialize('G-B899F8SK12')
//     ReactGA.pageview(window.location.pathname + window.location.search)
//   }, [])
  

//   return (
//     <main className='site-wrapper'>
//       <BrowserRouter>
//         <Routes>
//           <Route path='/' element={<Home />} />
//           <Route path='/agents' element={<AgentsHome />} />
          
//           {/* <Route path='/wittle-search' element={<SearchHome />} /> */}
//           <Route path='/login' element={<Login />} />
//           <Route path='/password-reset-request' element={<RequestReset />} />
//           <Route path='/password-reset-complete' element={<CompleteReset />} />
//           <Route path='/unsubscribe' element={<Unsubscribe />} />
//           {/* <Route path='/register' element={<Register />} />  */}
//           {/* <Route path='/wittle-search' element={<PropertyDetailSearch />} /> */}
//           <Route path='/wittle-search/fields' element={<FieldSelection />} />
//           <Route path='/wittle-search/hospitality' element={<Hospitality />} />
//           <Route path='/wittle-search/travel' element={<Travel />} />
//           <Route path='/wittle-search/lifestyle' element={<Lifestyle />} />
//           <Route path='/wittle-search/family' element={<Family />} />
//           <Route path='/wittle-search/property' element={<PropertySubmitWittle />} />
//           <Route path='/wittle-results' element={<PropertyResultsWittle />} />
//           <Route path='/wittle-results/:id' element={<SinglePropertyWittle />} />
//           <Route path='access-denied' element={<AccessDenied />} />
//           {/* <Route path='/property-search' element={<NormalSearchResultsTemp />} />
//           <Route path='/property-results' element={<NormalSearchResults />} />
//           <Route path='/property-results/:id' element={<NormalSingleProperty />} /> */}
//           {/* <Route path='/living' element={<LivingHome />} /> */}
//           <Route path='/profile' element={<ProfileHomepage />} />
//           <Route path='/agents/profile' element={<LandingPage />} />
//           <Route path='/agents/explore' element={<VariablesPage />} />
//           <Route path='/agents/compare' element={<WhiteComparison />} />
//           <Route path='/agents/property/:postcode' element={<SinglePropertySummary />} />
//           <Route path='/agents/secondary-schools/:id' element={<SingleSecondarySchool />} />

//           <Route path='/agents/primary-schools/:id' element={<SinglePrimarySchool />} />


//           <Route path='/blogs/school-search-simplified' element={<SchoolSearchSimplified />} />


          




//         </Routes>
//       </BrowserRouter>
//     </main>

//   )

// }

// export default App



import { useEffect } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import ReactGA from 'react-ga'
import { Suspense, lazy } from 'react'
import RedefiningPropertySearch from './components/blogs/RedefiningPropertySearch'
import BoroughGuides from './components/blogs/BoroughGuides'
import HeatmapTest from './components/HeatmapTest'

// Use React.lazy to dynamically import components
const Home = lazy(() => import('./components/Home'))
const AgentsHome = lazy(() => import('./components/AgentsLanding'))
const Login = lazy(() => import('./components/auth/Login'))
const Register = lazy(() => import('./components/auth/Register'))
const RequestReset = lazy(() => import('./components/auth/RequestReset'))
const CompleteReset = lazy(() => import('./components/auth/CompleteReset'))
const Unsubscribe = lazy(() => import('./components/auth/Unsubscribe'))
const FieldSelection = lazy(() => import('./components/wittleSearch/FieldSelection'))
const Hospitality = lazy(() => import('./components/wittleSearch/Hospitality'))
const Travel = lazy(() => import('./components/wittleSearch/Travel'))
const Lifestyle = lazy(() => import('./components/wittleSearch/Lifestyle'))
const Family = lazy(() => import('./components/wittleSearch/formBlocks/family/Family'))
const PropertySubmitWittle = lazy(() => import('./components/wittleSearch/PropertyDetailsWittle'))
const PropertyResultsWittle = lazy(() => import('./components/wittleSearch/resultBlocks.js/PropertyResultsWittle'))
const SinglePropertyWittle = lazy(() => import('./components/wittleSearch/resultBlocks.js/SinglePropertyWittle'))
const AccessDenied = lazy(() => import('./components/helpers/AccessDenied'))
const ProfileHomepage = lazy(() => import('./components/profile/ProfileHomepage'))
const LandingPage = lazy(() => import('./components/whiteLabel/propertyList.js/LandingPage'))
const SavedItems = lazy(() => import('./components/whiteLabel/favourites/SavedItems'))
const WhiteHome = lazy(() => import('./components/whiteLabel/WhiteHome'))
const ListingGenerator = lazy(() => import('./components/whiteLabel/propertyList.js/ListingGenerator'))
const AIListingGenrator = lazy(() => import('./components/whiteLabel/propertyList.js/AIListingGenrator'))
const VariablesPage = lazy(() => import('./components/whiteLabel/variableSummaries/VariablesPage'))
const WhiteComparison = lazy(() => import('./components/whiteLabel/comparisonSection/WhiteComparison'))
const PropertyFinder = lazy(() => import('./components/whiteLabel/EPCMatcher/PropertyFinder'))
const SinglePropertySummary = lazy(() => import('./components/whiteLabel/propertyDetails/SinglePropertySummary'))
const SingleSecondarySchool = lazy(() => import('./components/whiteLabel/propertyDetails/variableDetails/SingleSecondarySchool'))
const SinglePrimarySchool = lazy(() => import('./components/whiteLabel/propertyDetails/variableDetails/SinglePrimarySchool'))
const SchoolSearchSimplified = lazy(() => import('./components/blogs/SchoolSearchSimplified'))

const App = () => {
  useEffect(() => {
    ReactGA.initialize('G-B899F8SK12')
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])

  

  return (
    <main className='site-wrapper'>
      <BrowserRouter>
        <Suspense fallback={ '' }>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/agents' element={<AgentsHome />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/password-reset-request' element={<RequestReset />} />
            <Route path='/password-reset-complete' element={<CompleteReset />} />
            <Route path='/unsubscribe' element={<Unsubscribe />} />
            <Route path='/wittle-search/fields' element={<FieldSelection />} />
            <Route path='/wittle-search/hospitality' element={<Hospitality />} />
            <Route path='/wittle-search/travel' element={<Travel />} />
            <Route path='/wittle-search/lifestyle' element={<Lifestyle />} />
            <Route path='/wittle-search/family' element={<Family />} />
            <Route path='/wittle-search/property' element={<PropertySubmitWittle />} />
            <Route path='/wittle-results' element={<PropertyResultsWittle />} />
            <Route path='/wittle-results/:id' element={<SinglePropertyWittle />} />
            <Route path='access-denied' element={<AccessDenied />} />
            <Route path='/profile' element={<ProfileHomepage />} />
            <Route path='/agents/profile' element={<WhiteHome />} />
            <Route path='/agents/properties' element={<LandingPage />} />
            <Route path='/agents/favourites' element={<SavedItems />} />
            <Route path='/agents/explore' element={<VariablesPage />} />
            <Route path='/agents/compare' element={<WhiteComparison />} />
            <Route path='/agents/finder' element={<PropertyFinder />} />
            <Route path='/agents/listing-generator' element={<ListingGenerator />} />
            <Route path='/agents/ai-listing-generator' element={<AIListingGenrator />} />
            <Route path='/agents/property' element={<SinglePropertySummary />} />
            {/* <Route path='/agents/property/:postcode' element={<SinglePropertySummary />} /> */}
            <Route path='/agents/secondary-schools/:id' element={<SingleSecondarySchool />} />
            <Route path='/agents/primary-schools/:id' element={<SinglePrimarySchool />} />
            <Route path='/blogs/school-search-simplified' element={<SchoolSearchSimplified />} />
            <Route path='/blogs/redefining-property-search' element={<RedefiningPropertySearch />} />
            <Route path='/blogs/borough-guides/:borough' element={<BoroughGuides />} />
            <Route path='/heatmap-test' element={<HeatmapTest />} />
            
          </Routes>
        </Suspense>
      </BrowserRouter>
    </main>
  )
}

export default App
