import React from 'react'
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image'
import { NumericFormat } from 'react-number-format'



const ImageSlider = ({ calc10, formData, listFavourites, postFavourite }) => {


  return (
    <>
      {calc10.map((property, index) => {
        <div className='slide-section-desktop' key={index}>

          <Slide className='slide-import' autoplay={false} transitionDuration={750} arrows={true} indicators={true}>
            {property.property_images.map((images, index) => {
              return (
                <>
                  <div className='image-card' id={property.id} style={{ backgroundImage: `url('${images.url}')` }} key={index}>
                    <div className='property-image-details'>
                      {formData.search_channel === 'Renting' ?
                        <h3><NumericFormat value={property.monthly} displayType={'text'} thousandSeparator={true} prefix={'£'} /> pcm</h3>
                        :
                        <h3>Fixed Price: <NumericFormat value={property.value} displayType={'text'} thousandSeparator={true} prefix={'£'} /> </h3>
                      }
                    </div>
                    {listFavourites ?
                      <div className='favourite-section' id={property.id} onClick={postFavourite}>
                        {listFavourites.includes(property.id) ?
                          <div className='favourite-button-on' id={property.id} ></div>
                          :
                          <div className='favourite-button-off' id={property.id} ></div>
                        }
                      </div>
                      : ''}
                  </div>
                  {/* <div className='image-card' id={property.id} style={{ backgroundImage: `url('${images.url}')` }} key={index}>
                      <div className='property-image-details'>
                        {formData.search_channel === 'Renting' ?
                          <h3><NumericFormat value={property.monthly} displayType={'text'} thousandSeparator={true} prefix={'£'} /> pcm</h3>
                          :
                          <h3>Fixed Price: <NumericFormat value={property.value} displayType={'text'} thousandSeparator={true} prefix={'£'} /> </h3>
                        }
                      </div>
                      {listFavourites ?
                        <div className='favourite-section' id={property.id} onClick={postFavourite}>
                          {listFavourites.includes(property.id) ?
                            <div className='favourite-button-on' id={property.id} ></div>
                            :
                            <div className='favourite-button-off' id={property.id} ></div>
                          }
                        </div>
                        : ''}
                    </div> */}
                </>
              )
            })}
          </Slide>

        </div>
      })
      }
    </>
  )

}


export default ImageSlider