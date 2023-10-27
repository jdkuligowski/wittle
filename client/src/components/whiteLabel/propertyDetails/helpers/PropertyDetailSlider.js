




const PropertyDetailSlider = ({ sliderSelection, setSliderSelection }) => {


  return (

    <>
      <div className="detail-slider">
        <div className={`slider-button ${sliderSelection === 'Primary schools' ? 'active' : 'inactive' }` } onClick={() => setSliderSelection('Primary schools')} >
          <div className='slider-icon' id='primaries'></div>
          <h5 className='slider-text'>Primary schools</h5>
        </div>
        <div className={`slider-button ${sliderSelection === 'Secondary schools' ? 'active' : 'inactive' }` } onClick={() => setSliderSelection('Secondary schools')} >
          <div className='slider-icon' id='secondaries'></div>
          <h5 className='slider-text'>Secondary schools</h5>
        </div>
        <div className={`slider-button ${sliderSelection === 'Tubes' ? 'active' : 'inactive' }` } onClick={() => setSliderSelection('Tubes')} >
          <div className='slider-icon' id='tubes'></div>
          <h5 className='slider-text'>Tubes</h5>
        </div>
        {/* <div className={`slider-button ${sliderSelection === 'Trains' ? 'active' : 'inactive' }` } onClick={() => setSliderSelection('Trains')} >
          <div className='slider-icon' id='trains'></div>
          <h5 className='slider-text'>Trains</h5>
        </div> */}
        <div className={`slider-button ${sliderSelection === 'Restaurants' ? 'active' : 'inactive' }` } onClick={() => setSliderSelection('Restaurants')} >
          <div className='slider-icon' id='restaurants'></div>
          <h5 className='slider-text'>Restaurants</h5>
        </div>
        <div className={`slider-button ${sliderSelection === 'Pubs' ? 'active' : 'inactive' }` } onClick={() => setSliderSelection('Pubs')} >
          <div className='slider-icon' id='pubs'></div>
          <h5 className='slider-text'>Pubs</h5>
        </div>
        <div className={`slider-button ${sliderSelection === 'Supermarkets' ? 'active' : 'inactive' }` } onClick={() => setSliderSelection('Supermarkets')} >
          <div className='slider-icon' id='supermarkets'></div>
          <h5 className='slider-text'>Supermarkets</h5>
        </div>
        <div className={`slider-button ${sliderSelection === 'Fitness' ? 'active' : 'inactive' }` } onClick={() => setSliderSelection('Fitness')} >
          <div className='slider-icon' id='gyms'></div>
          <h5 className='slider-text'>Fitness</h5>
        </div>
        <div className={`slider-button ${sliderSelection === 'EVs' ? 'active' : 'inactive' }` } onClick={() => setSliderSelection('EVs')} >
          <div className='slider-icon' id='evs'></div>
          <h5 className='slider-text'>EVs</h5>
        </div>

        {/* <h5 onClick={() => setSliderSelection('Primary schools')} style={{ backgroundColor: sliderSelection === 'Primary schools' ? 'rgba(255, 167, 229, 1)' : 'initial', fontWeight: sliderSelection === 'Primary schools' ? 'bold' : 'initial' }} >Primary schools</h5>
        <h5 onClick={() => setSliderSelection('Secondary schools')} style={{ backgroundColor: sliderSelection === 'Secondary schools' ? 'rgba(255, 167, 229, 1)' : 'initial', fontWeight: sliderSelection === 'Secondary schools' ? 'bold' : 'initial' }} >Secondary schools</h5>
         <h5 onClick={() => setSliderSelection('Tubes')} style={{ backgroundColor: sliderSelection === 'Tubes' ? 'rgba(255, 167, 229, 1)' : 'initial', fontWeight: sliderSelection === 'Tubes' ? 'bold' : 'initial' }} >Tubes</h5>
        <h5 onClick={() => setSliderSelection('Restaurants')} style={{ backgroundColor: sliderSelection === 'Restaurants' ? 'rgba(255, 167, 229, 1)' : 'initial', fontWeight: sliderSelection === 'Restaurants' ? 'bold' : 'initial' }} >Restaurants</h5>
        <h5 onClick={() => setSliderSelection('Pubs')} style={{ backgroundColor: sliderSelection === 'Pubs' ? 'rgba(255, 167, 229, 1)' : 'initial', fontWeight: sliderSelection === 'Pubs' ? 'bold' : 'initial' }} >Pubs</h5>
        <h5 onClick={() => setSliderSelection('Supermarkets')} style={{ backgroundColor: sliderSelection === 'Supermarkets' ? 'rgba(255, 167, 229, 1)' : 'initial', fontWeight: sliderSelection === 'Supermarkets' ? 'bold' : 'initial' }} >Supermarkets</h5>
        <h5 onClick={() => setSliderSelection('Fitness')} style={{ backgroundColor: sliderSelection === 'Fitness' ? 'rgba(255, 167, 229, 1)' : 'initial', fontWeight: sliderSelection === 'Fitness' ? 'bold' : 'initial' }} >Fitness</h5>
        <h5 onClick={() => setSliderSelection('EVs')} style={{ backgroundColor: sliderSelection === 'EVs' ? 'rgba(255, 167, 229, 1)' : 'initial', fontWeight: sliderSelection === 'EVs' ? 'bold' : 'initial' }} >EVs</h5> */}
      </div>
    </>
  )
}

export default PropertyDetailSlider
