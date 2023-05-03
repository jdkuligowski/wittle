import { useEffect, useState } from 'react'
import { Route, Routes, BrowserRouter, Link } from 'react-router-dom'
import axios from 'axios'


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
import Profile from './components/profile/Profile'
import AccessDenied from './components/helpers/AccessDenied'
import NormalSearchResultsTemp from './components/propertySearch/NormalSearchResultsTemp'
import NormalSearchResults from './components/propertySearch/NormalSearchResults'
import NormalSingleProperty from './components/propertySearch/NormalSingleProperty'

import LivingHome from './components/living/LivingHome' 
import ProfileHomepage from './components/profile/ProfileHomepage'
import SearchHome from './components/wittleSearch/SearchHome'

const App = () => {


  return (
    <main className='site-wrapper'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/wittle-search' element={<SearchHome />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          {/* <Route path='/wittle-search' element={<PropertyDetailSearch />} /> */}
          <Route path='/wittle-search/fields' element={<FieldSelection />} />
          <Route path='/wittle-search/hospitality' element={<Hospitality />} />
          <Route path='/wittle-search/travel' element={<Travel />} />
          <Route path='/wittle-search/lifestyle' element={<Lifestyle />} />
          <Route path='/wittle-search/family' element={<Family />} />
          <Route path='/wittle-search/property' element={<PropertySubmitWittle />} />
          <Route path='/wittle-results' element={<PropertyResultsWittle />} />
          <Route path='/wittle-results/:id' element={<SinglePropertyWittle />} />
          {/* <Route path='/profile/:username' element={<Profile />} /> */}
          <Route path='access-denied' element={<AccessDenied />} />
          <Route path='/property-search' element={<NormalSearchResultsTemp />} />
          <Route path='/property-results' element={<NormalSearchResults />} />
          <Route path='/property-results/:id' element={<NormalSingleProperty />} />
          <Route path='/living' element={<LivingHome />} />
          <Route path='/profile' element={<ProfileHomepage />} />



        </Routes>
      </BrowserRouter>
    </main>

  )

}

export default App
