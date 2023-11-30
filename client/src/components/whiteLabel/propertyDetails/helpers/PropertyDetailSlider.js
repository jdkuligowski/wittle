




const PropertyDetailSlider = ({ sliderSelection, setSliderSelection, setSecondaryDetail }) => {

  const setPrimaries = () => { 
    setSliderSelection('Primary schools')
    setSecondaryDetail('Table')
  }

  const setSecondaries = () => { 
    setSliderSelection('Secondary schools')
    setSecondaryDetail('Table')
  }

  const setTubes = () => { 
    setSliderSelection('Tubes')
    setSecondaryDetail('Table')
  }

  const setRestaurants = () => { 
    setSliderSelection('Restaurants')
    setSecondaryDetail('Table')
  }

  const setPubs = () => { 
    setSliderSelection('Pubs')
    setSecondaryDetail('Table')
  }

  const setSupermarkets = () => { 
    setSliderSelection('Supermarkets')
    setSecondaryDetail('Table')
  }

  const setFitness = () => { 
    setSliderSelection('Fitness')
    setSecondaryDetail('Table')
  }

  const setEVs = () => { 
    setSliderSelection('EVs')
    setSecondaryDetail('Table')
  }



  return (

    <>
      <div className="detail-slider">
        <div className={`slider-button ${sliderSelection === 'Primary schools' ? 'active' : 'inactive'}`} onClick={() => setPrimaries()}>
          <div className='slider-icon' id='primaries'></div>
          <h5 className='slider-text'>Primary schools</h5>
        </div>
        <div className={`slider-button ${sliderSelection === 'Secondary schools' ? 'active' : 'inactive'}`} onClick={() => setSecondaries()} >
          <div className='slider-icon' id='secondaries'></div>
          <h5 className='slider-text'>Secondary schools</h5>
        </div>
        <div className={`slider-button ${sliderSelection === 'Tubes' ? 'active' : 'inactive'}`} onClick={() => setTubes()}>
          <div className='slider-icon' id='tubes'></div>
          <h5 className='slider-text'>Tubes</h5>
        </div>
        {/* <div className={`slider-button ${sliderSelection === 'Trains' ? 'active' : 'inactive' }` } onClick={() => setSliderSelection('Trains')} >
          <div className='slider-icon' id='trains'></div>
          <h5 className='slider-text'>Trains</h5>
        </div> */}
        <div className={`slider-button ${sliderSelection === 'Restaurants' ? 'active' : 'inactive'}`} onClick={() => setRestaurants()} >
          <div className='slider-icon' id='restaurants'></div>
          <h5 className='slider-text'>Restaurants</h5>
        </div>
        <div className={`slider-button ${sliderSelection === 'Pubs' ? 'active' : 'inactive'}`} onClick={() => setPubs()} >
          <div className='slider-icon' id='pubs'></div>
          <h5 className='slider-text'>Pubs</h5>
        </div>
        <div className={`slider-button ${sliderSelection === 'Supermarkets' ? 'active' : 'inactive'}`} onClick={() => setSupermarkets()} >
          <div className='slider-icon' id='supermarkets'></div>
          <h5 className='slider-text'>Supermarkets</h5>
        </div>
        <div className={`slider-button ${sliderSelection === 'Fitness' ? 'active' : 'inactive'}`} onClick={() => setFitness()} >
          <div className='slider-icon' id='gyms'></div>
          <h5 className='slider-text'>Fitness</h5>
        </div>
        <div className={`slider-button ${sliderSelection === 'EVs' ? 'active' : 'inactive'}`} onClick={() => setEVs()} >
          <div className='slider-icon' id='evs'></div>
          <h5 className='slider-text'>EVs</h5>
        </div>

      </div>
    </>
  )
}

export default PropertyDetailSlider
