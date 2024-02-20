




const NeighbourhoodHighlights = ({ postcodeData }) => {


  return (

    <>
      <section className='box-highlights'>
        <div className='row'>
          <div className='column'>
            <div className='variable-title'>
              <div className='variable-icon' id='parks'></div>
              <h5 className='block-title'>Green space</h5>

            </div>
            {postcodeData ?
              <>
                <ul className='results-details'>
                  <li>within top {Math.round(100 - (postcodeData[0].parks_postcode_summary.percentile * 100))}% of areas in london for access to greenspace</li>
                  <li>{postcodeData[0].parks_postcode.park_name0} - {Math.ceil((((postcodeData[0].parks_postcode.distance0) / 1000) / 5) * 60)} mins walk</li>
                  <li>{postcodeData[0].parks_postcode.park_name1} - {Math.ceil((((postcodeData[0].parks_postcode.distance1) / 1000) / 5) * 60)} mins walk</li>
                  <li>{postcodeData[0].parks_postcode.park_name2} - {Math.ceil((((postcodeData[0].parks_postcode.distance2) / 1000) / 5) * 60)} mins walk</li>
                </ul>
              </>
              : ''}

          </div>
          {/* <div className='column'>
            <div className='variable-title'>
              <div className='variable-icon' id='handcuff'></div>
              <h5 className='block-title'>Crime</h5>

            </div>              {postcodeData ?
              <>
                <h5>🚓 in the lowest {Math.round((postcodeData[0].crime[0].percentile) * 100)}% of areas in London for reported crimes</h5>
                <h5>🚓 in the lowest {Math.round((postcodeData[0].crime[0].area_specific_percentile) * 100)}% of areas in {postcodeData[0].crime[0].borough} for reported crimes</h5>

              </>
              : ''}
          </div> */}
        </div>

      </section>
    </>
  )
}

export default NeighbourhoodHighlights