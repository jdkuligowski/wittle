import React from 'react'
import 'react-slideshow-image/dist/styles.css'
import { NumericFormat } from 'react-number-format'
import { Modal } from 'react-bootstrap'


const Heatmap = ({ calc11, heatmapShow, handleHeatmapClose, handleHeatmapShow }) => {


  // // set state for showing edit modal
  // const [heatmapShow, setHeatmapShow] = useState(false)

  // // close modal
  // const handleHeatmapClose = () => {
  //   setHeatmapShow(false)
  // }

  // // show the modal
  // const handleHeatmapShow = (e) => {
  //   setHeatmapShow(true)
  // }

  return (
    <>
      <Modal show={heatmapShow} onHide={handleHeatmapClose} backdrop='static' className='heatmap-details'>
        <Modal.Body>
          <div className='heatmap-overall'>
            {calc11 ?
              <>
                <div className='heatmap-rows'>
                  <h2>Properties</h2>
                  {calc11.map((property, index) => {
                    return (
                      <div className='heatmap-content' key={index}>
                        <div className='heatmap-property-title'>
                          <p className='property-names'>{property.index}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
                <div className='heatmap-rows'>
                  <h2>Restaurants</h2>
                  {calc11.map((property, index) => {
                    return (
                      <div className='heatmap-content' key={index} id={property.restaurant_rank_perc}>
                        <div className='heatmap-property-title' >
                          <p className='property-numbers'>{property.restaurant_rank}</p>
                        </div>
                      </div>
                    )

                  })}
                </div>
                <div className='heatmap-rows'>
                  <h2>Pubs</h2>
                  {calc11.map((property, index) => {
                    return (
                      <div className='heatmap-content' key={index} id={property.pub_rank_perc}>
                        <div className='heatmap-property-title'>
                          <p className='property-numbers'>{property.pub_rank}</p>
                        </div>
                      </div>
                    )

                  })}
                </div>
                <div className='heatmap-rows'>
                  <h2>Cafes</h2>
                  {calc11.map((property, index) => {
                    return (
                      <div className='heatmap-content' key={index} id={property.cafe_rank_perc}>
                        <div className='heatmap-property-title'>
                          <p className='property-numbers'>{property.cafe_rank}</p>
                        </div>
                      </div>
                    )

                  })}
                </div>
                <div className='heatmap-rows'>
                  <h2>Takeaways</h2>
                  {calc11.map((property, index) => {
                    return (
                      <div className='heatmap-content' key={index} id={property.takeaway_rank_perc}>
                        <div className='heatmap-property-title'>
                          <p className='property-numbers'>{property.takeaway_rank}</p>
                        </div>
                      </div>
                    )

                  })}
                </div>
                <div className='heatmap-rows'>
                  <h2>Gyms</h2>
                  {calc11.map((property, index) => {
                    return (
                      <div className='heatmap-content' key={index} id={property.gym_rank_perc}>
                        <div className='heatmap-property-title'>
                          <p className='property-numbers'>{property.gym_rank}</p>
                        </div>
                      </div>
                    )

                  })}
                </div>
                <div className='heatmap-rows'>
                  <h2>Supermarkets</h2>
                  {calc11.map((property, index) => {
                    return (
                      <div className='heatmap-content' key={index} id={property.supermarket_rank_perc}>
                        <div className='heatmap-property-title'>
                          <p className='property-numbers'>{property.supermarket_rank}</p>
                        </div>
                      </div>
                    )

                  })}
                </div>
                <div className='heatmap-rows'>
                  <h2>Parks</h2>
                  {calc11.map((property, index) => {
                    return (
                      <div className='heatmap-content' key={index} id={property.park_rank_perc}>
                        <div className='heatmap-property-title'>
                          <p className='property-numbers'>{property.park_rank}</p>
                        </div>
                      </div>
                    )

                  })}
                </div>
                <div className='heatmap-rows'>
                  <h2>Tubes</h2>
                  {calc11.map((property, index) => {
                    return (
                      <div className='heatmap-content' key={index} id={property.tube_rank_perc}>
                        <div className='heatmap-property-title'>
                          <p className='property-numbers'>{property.tube_rank}</p>
                        </div>
                      </div>
                    )

                  })}
                </div>
              </>
              : ''}
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Heatmap