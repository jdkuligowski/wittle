




const PropertyDetailSlider = ({ sliderSelection, setSliderSelection }) => {


  return (

    <>
      <div className="detail-slider">
        <h5 onClick={() => setSliderSelection('Primary schools')} style={{ backgroundColor: sliderSelection === 'Primary schools' ? 'rgba(255, 167, 229, 1)' : 'initial', fontWeight: sliderSelection === 'Primary schools' ? 'bold' : 'initial' }} >Primary schools</h5>
        <h5 onClick={() => setSliderSelection('Secondary schools')} style={{ backgroundColor: sliderSelection === 'Secondary schools' ? 'rgba(255, 167, 229, 1)' : 'initial', fontWeight: sliderSelection === 'Secondary schools' ? 'bold' : 'initial' }} >Secondary schools</h5>
        {/* <h5 onClick={() => setSliderSelection('6th forms')} style={{ backgroundColor: sliderSelection === '6th forms' ? 'rgba(255, 167, 229, 1)' : 'initial', fontWeight: sliderSelection === '6th forms' ? 'bold' : 'initial' }} >6th forms</h5> */}
        {/* <h5 onClick={() => setSliderSelection('Greenspace')} style={{ backgroundColor: sliderSelection === 'Greenspace' ? 'rgba(255, 167, 229, 1)' : 'initial', fontWeight: sliderSelection === 'Greenspace' ? 'bold' : 'initial' }} >Greenspace</h5> */}
        {/* <h5 onClick={() => setSliderSelection('Tubes')} style={{ backgroundColor: sliderSelection === 'Tubes' ? 'rgba(255, 167, 229, 1)' : 'initial', fontWeight: sliderSelection === 'Tubes' ? 'bold' : 'initial' }} >Tubes</h5> */}
        <h5 onClick={() => setSliderSelection('Restaurants')} style={{ backgroundColor: sliderSelection === 'Restaurants' ? 'rgba(255, 167, 229, 1)' : 'initial', fontWeight: sliderSelection === 'Restaurants' ? 'bold' : 'initial' }} >Restaurants</h5>
        <h5 onClick={() => setSliderSelection('Supermarkets')} style={{ backgroundColor: sliderSelection === 'Supermarkets' ? 'rgba(255, 167, 229, 1)' : 'initial', fontWeight: sliderSelection === 'Supermarkets' ? 'bold' : 'initial' }} >Supermarkets</h5>
        <h5 onClick={() => setSliderSelection('Fitness')} style={{ backgroundColor: sliderSelection === 'Fitness' ? 'rgba(255, 167, 229, 1)' : 'initial', fontWeight: sliderSelection === 'Fitness' ? 'bold' : 'initial' }} >Fitness</h5>
        <h5 onClick={() => setSliderSelection('EVs')} style={{ backgroundColor: sliderSelection === 'EVs' ? 'rgba(255, 167, 229, 1)' : 'initial', fontWeight: sliderSelection === 'EVs' ? 'bold' : 'initial' }} >EVs</h5>
        {/* <h5 onClick={() => setSliderSelection('Pubs')} style={{ backgroundColor: sliderSelection === 'Pubs' ? 'rgba(255, 167, 229, 1)' : 'initial', fontWeight: sliderSelection === 'Pubs' ? 'bold' : 'initial' }} >Pubs</h5> */}
      </div>
    </>
  )
}

export default PropertyDetailSlider
