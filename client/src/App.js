import { useEffect } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import ReactGA from 'react-ga'
import { Suspense, lazy } from 'react'
import RedefiningPropertySearch from './components/blogs/RedefiningPropertySearch'
import BoroughGuides from './components/blogs/BoroughGuides'
import HeatmapTest from './components/HeatmapTest'

// Use React.lazy to dynamically import components
// const Home = lazy(() => import('./components/Home'))
const NewHomepage = lazy(() => import('./components/NewHomepage'))
const AgentsHome = lazy(() => import('./components/AgentsLanding'))
const Login = lazy(() => import('./components/auth/Login'))
const Pricing = lazy(() => import('./components/Pricing'))
const Register = lazy(() => import('./components/auth/Register'))
const RequestReset = lazy(() => import('./components/auth/RequestReset'))
const CompleteReset = lazy(() => import('./components/auth/CompleteReset'))
const Unsubscribe = lazy(() => import('./components/auth/Unsubscribe'))
// const FieldSelection = lazy(() => import('./components/wittleSearch/FieldSelection'))
// const Hospitality = lazy(() => import('./components/wittleSearch/Hospitality'))
// const Travel = lazy(() => import('./components/wittleSearch/Travel'))
// const Lifestyle = lazy(() => import('./components/wittleSearch/Lifestyle'))
// const Family = lazy(() => import('./components/wittleSearch/formBlocks/family/Family'))
// const PropertySubmitWittle = lazy(() => import('./components/wittleSearch/PropertyDetailsWittle'))
// const PropertyResultsWittle = lazy(() => import('./components/wittleSearch/resultBlocks.js/PropertyResultsWittle'))
// const SinglePropertyWittle = lazy(() => import('./components/wittleSearch/resultBlocks.js/SinglePropertyWittle'))
const AccessDenied = lazy(() => import('./components/helpers/AccessDenied'))
const RegistrationSuccessful = lazy(() => import('./components/auth/RegistrationSuccessful'))
// const ProfileHomepage = lazy(() => import('./components/profile/ProfileHomepage'))
const LandingPage = lazy(() => import('./components/whiteLabel/propertyList.js/LandingPage'))
const WhiteHome = lazy(() => import('./components/whiteLabel/WhiteHome'))
const PropertySearch = lazy(() => import('./components/whiteLabel/advancedSearch/PropertySearch'))
const Account = lazy(() => import('./components/whiteLabel/Account'))
const HowToGuide = lazy(() => import('./components/whiteLabel/HowToGuide'))
const ListingGenerator = lazy(() => import('./components/whiteLabel/propertyList.js/ListingGenerator'))
const AIListingGenrator = lazy(() => import('./components/whiteLabel/propertyList.js/AIListingGenrator'))
const VariablesPage = lazy(() => import('./components/whiteLabel/variableSummaries/VariablesPage'))
const WhiteComparison = lazy(() => import('./components/whiteLabel/comparisonSection/WhiteComparison'))
const PropertyFinder = lazy(() => import('./components/whiteLabel/EPCMatcher/PropertyFinder'))
const LeadGenerator = lazy(() => import('./components/whiteLabel/EPCMatcher/LeadGenerator'))
const BasicTemplate = lazy(() => import('./components/whiteLabel/EPCMatcher/LetterSection/TemplatePDFs.js/BasicTemplate'))
const SinglePropertySummary = lazy(() => import('./components/whiteLabel/propertyDetails/SinglePropertySummary'))
const SingleSecondarySchool = lazy(() => import('./components/whiteLabel/propertyDetails/variableDetails/SingleSecondarySchool'))
const SinglePrimarySchool = lazy(() => import('./components/whiteLabel/propertyDetails/variableDetails/SinglePrimarySchool'))
// const FanbaseTest = lazy(() => import('./components/whiteLabel/EPCMatcher/FanbaseTest'))
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
            {/* <Route path='/home-searchers' element={<Home />} /> */}
            <Route path='/' element={<NewHomepage />} />
            {/* <Route path='/' element={<AgentsHome />} /> */}
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/registration-successful' element={<RegistrationSuccessful />} />
            <Route path='/pricing' element={<Pricing />} />
            <Route path='/password-reset-request' element={<RequestReset />} />
            <Route path='/password-reset-complete' element={<CompleteReset />} />
            <Route path='/unsubscribe' element={<Unsubscribe />} />
            {/* <Route path='/wittle-search/fields' element={<FieldSelection />} />
            <Route path='/wittle-search/hospitality' element={<Hospitality />} />
            <Route path='/wittle-search/travel' element={<Travel />} />
            <Route path='/wittle-search/lifestyle' element={<Lifestyle />} />
            <Route path='/wittle-search/family' element={<Family />} />
            <Route path='/wittle-search/property' element={<PropertySubmitWittle />} />
            <Route path='/wittle-results' element={<PropertyResultsWittle />} />
            <Route path='/wittle-results/:id' element={<SinglePropertyWittle />} /> */}
            <Route path='access-denied' element={<AccessDenied />} />
            {/* <Route path='/profile' element={<ProfileHomepage />} /> */}
            <Route path='/agents/account' element={<Account />} />
            <Route path='/agents/profile' element={<WhiteHome />} />
            <Route path='/agents/properties' element={<LandingPage />} />
            <Route path='/agents/explore' element={<VariablesPage />} />
            <Route path='/agents/compare' element={<WhiteComparison />} />
            <Route path='/agents/finder' element={<PropertyFinder />} />
            <Route path='/agents/lead-gen' element={<LeadGenerator />} />
            <Route path='/agents/lead-gen/basic-template' element={<BasicTemplate />} />
            <Route path='/agents/listing-generator' element={<ListingGenerator />} />
            <Route path='/agents/ai-listing-generator' element={<AIListingGenrator />} />
            <Route path='/agents/wittle-search' element={<PropertySearch />} />
            <Route path='/agents/guide' element={<HowToGuide />} />
            <Route path='/agents/property' element={<SinglePropertySummary />} />
            {/* <Route path='/agents/property/:postcode' element={<SinglePropertySummary />} /> */}
            <Route path='/agents/secondary-schools/:id' element={<SingleSecondarySchool />} />
            <Route path='/agents/primary-schools/:id' element={<SinglePrimarySchool />} />
            {/* <Route path='/blogs/school-search-simplified' element={<SchoolSearchSimplified />} />
            <Route path='/blogs/redefining-property-search' element={<RedefiningPropertySearch />} />
            <Route path='/blogs/borough-guides/:borough' element={<BoroughGuides />} /> */}
            {/* <Route path='/heatmap-test' element={<HeatmapTest />} /> */}
            
          </Routes>
        </Suspense>
      </BrowserRouter>
    </main>
  )
}

export default App
