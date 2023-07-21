




const NeighbourhoodHighlights = ({ postcodeData }) => {


  return (

    <>
      <section className='box-highlights'>
        <div className='row'>
          <div className='column'>
            <h5 className='block-title'>Green space</h5>
            {postcodeData ? 
              <>
                <h5>🌳 within top {100 - postcodeData[0].parks_lsoa[0].london_percentile}% of areas in london for access to greenspace</h5>
                <h5>🌳 {postcodeData[0].parks_postcode.park_name0} within {Math.ceil((((postcodeData[0].parks_postcode.distance0) / 1000) / 5) * 60)} mins walk</h5>
                {/* {tubes1.length > 2 ? <h5>🚇 {tubes1[1].station_name} and {tubes1[2].station_name} are also nearby</h5> : tubes1.length === 1 ? <h5>🚇 {tubes1[1].station_name} is also nearby</h5> : '' } */}
              </>
              : '' }

          </div>
          <div className='column'>
            <h5 className='block-title'>Crime</h5>
            {postcodeData ? 
              <>
                <h5>🚓 in the lowest {Math.round((postcodeData[0].crime[0].percentile) * 100)}% of areas in London for reported crimes</h5>
                <h5>🚓 in the lowest {Math.round((postcodeData[0].crime[0].area_specific_percentile) * 100)}% of areas in {postcodeData[0].crime[0].borough} for reported crimes</h5>

              </>
              : '' }
          </div>
        </div>
        
      </section>
    </>
  )
}

export default NeighbourhoodHighlights