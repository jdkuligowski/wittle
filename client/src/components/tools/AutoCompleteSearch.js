
import React, { useState, useEffect } from 'react'
import axios from 'axios'



const AutoCompleteSearch = ({ userEmail, setUserEmail, livingData, setLivingData, getLocation, setViewport, getClickData, setLoading, setLifestyleLat, setLifestyleLong, setClick }) => {

  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [isSearching, setIsSearching] = useState(false)


  const handleInputChange = (event) => {
    const inputQuery = event.target.value

    // Update the query state with the new input value
    setQuery(inputQuery)

    // If the input value is at least 3 characters long, fetch search suggestions
    if (inputQuery.length >= 3) {
      // Replace with your own OpenCage API key
      const API_KEY = 'f22a950a93fc47e0a7c4978926488642'
      const URL = `https://api.opencagedata.com/geocode/v1/json?q=${inputQuery}&key=${API_KEY}&countrycode=gb&limit=5&no_annotations=1`

      // Use a debounce function to limit the number of requests sent to the OpenCage API
      const debounceSearch = debounce(() => {
        setIsSearching(true)
        axios
          .get(URL)
          .then((response) => {
            // Update the suggestions state with the search results
            setSuggestions(response.data.results)
          })
          .catch((error) => {
            console.error(error)
          })
          .finally(() => {
            setIsSearching(false)
          })
      }, 1500)
      debounceSearch()
    } else {
      // If the input value is less than 3 characters long, clear the suggestions state
      setSuggestions([])
    }
  }

  const handleSuggestionClick = (location) => {
    // Get the selected location from the suggestion object
    const { geometry, formatted, components } = location

    // Clear the input and suggestions states

    console.log(location)
    setQuery(formatted)
    setUserEmail({ ...userEmail, long: geometry.lng, lat: geometry.lat })
    setLivingData({ ...livingData, long: geometry.lng, lat: geometry.lat })
    setLifestyleLat(parseFloat(geometry.lat))
    setLifestyleLong(parseFloat(geometry.lng))   
    // getClickData()
    setViewport({
      latitude: geometry.lat,
      longitude: geometry.lng,
      zoom: 13,
    })
    setLoading(true)
    setSuggestions([])
    setClick(true)
  }

  function debounce(fn, delay) {
    let timerId
    return function (...args) {
      if (timerId) {
        clearTimeout(timerId)
      }
      timerId = setTimeout(() => {
        fn(...args)
        timerId = null
      }, delay)
    }
  }


  return (
    <>

      <div className='search-bar-input'>
        <input type="text" id='address-border' value={query} onChange={handleInputChange} placeholder='🔎 set address' />
        <div className='search-suggestions-box'>

          {isSearching && <p>Loading...</p>}
          {suggestions.length > 0 && (
            <ul className='suggestions-list'>
              {suggestions.map((suggestion) => (
                <>
                  <li key={suggestion.formatted} onClick={() => handleSuggestionClick(suggestion)}>
                    🔎 {suggestion.formatted}
                  </li>
                  <hr />
                </>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )

}
export default AutoCompleteSearch