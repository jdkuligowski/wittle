import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image'
import { NumericFormat } from 'react-number-format'
// import { getUserToken, getAccessToken, isUserAuth } from '../../auth/Auth'



const ImageSlider = ({ calc10, formData, listFavourites, postFavourite }) => {

  // // state for determining whether a property is favoruited - this is used on the conditional for adding/deleting a favourite
  // const [listFavourites, setListFavourites] = useState()

  // // ? Section 8: FAVOURITES - section toi handle favouriting and deleting properties from favourites
  // // Favorite button handler
  // const [favouriteError, setFavouriteError] = useState()

  // const postFavourite = async (e) => {
  //   if (isUserAuth())
  //     if (listFavourites.includes(parseInt(e.target.id)))
  //       try {
  //         console.log('deleting favourite')
  //         const { data } = await axios.delete(`/api/favourites/${parseInt(e.target.id)}/`, {
  //           headers: {
  //             Authorization: `Bearer ${getAccessToken()}`,
  //           },
  //         })
  //         loadUserData()
  //       } catch (error) {
  //         console.log(error)
  //       }
  //     else
  //       try {
  //         const propertyData = calc10.filter(property => {
  //           return property.id === parseInt(e.target.id)
  //         })
  //         console.log('property to favourite', propertyData)
  //         console.log('form data to favourite ->', formData)
  //         const additionalData =
  //         {
  //           favourite: true,
  //           property: e.target.id,
  //           owner: parseInt(userData.id),
  //           property_name: propertyData[0].property_name,
  //           restaurant_score: propertyData[0].final_restaurant,
  //           takeaway_score: propertyData[0].final_takeaway,
  //           pubs_score: propertyData[0].final_pub,
  //           cafes_score: propertyData[0].final_cafe,
  //           tube_score: propertyData[0].final_tube,
  //           train_score: propertyData[0].final_train,
  //           primary_score: propertyData[0].final_primary,
  //           secondary_score: propertyData[0].final_secondary,
  //           college_score: propertyData[0].final_college,
  //           supermarket_score: propertyData[0].final_supermarket,
  //           gym_score: propertyData[0].final_gym,
  //           park_score: propertyData[0].final_park,
  //           workplace_score: propertyData[0].final_workplace,
  //           family1_score: propertyData[0].final_family1,
  //           total_score: propertyData[0].first_match,
  //           restaurant_input: formData.restaurant_distance,
  //           takeaway_input: formData.takeaway_distance,
  //           pubs_input: formData.pubs_distance,
  //           cafes_input: formData.cafes_distance,
  //           tube_input: formData.tube_distance,
  //           train_input: formData.train_distance,
  //           primary_input: formData.primary_distance,
  //           secondary_input: formData.secondary_distance,
  //           college_input: formData.college_distance,
  //           supermarket_input: formData.supermarket_distance,
  //           gym_input: formData.gym_distance,
  //           park_input: formData.park_distance,
  //           workplace_input: formData.workplace_distance,
  //           friends_input: formData.family_distance_1,
  //           restaurant_selection: formData.restaurant_selection,
  //           takeaway_selection: formData.takeaway_selection,
  //           pubs_selection: formData.pubs_selection,
  //           cafes_selection: formData.cafes_selection,
  //           tube_selection: formData.tube_selection,
  //           train_selection: formData.train_selection,
  //           primary_selection: formData.primary_selection,
  //           secondary_selection: formData.secondary_selection,
  //           college_selection: formData.college_selection,
  //           supermarket_selection: formData.supermarket_selection,
  //           gym_selection: formData.gym_selection,
  //           park_selection: formData.park_selection,
  //           workplace_selection: formData.workplace_selection,
  //           friends_selection: formData.family_selection,
  //         }
  //         const { data } = await axios.post('/api/favourites/', additionalData, {
  //           headers: {
  //             Authorization: `Bearer ${getAccessToken()}`,
  //           },
  //         })
  //         console.log('favourited data ->', data)
  //         loadUserData()
  //       } catch (error) {
  //         console.log(error)
  //       }
  //   else
  //     try {
  //       setFavouriteError(true)
  //       console.log('must have an account to favourite')
  //     } catch (error) {
  //       console.log('error')
  //     }
  // }


  return (
    <>


      <Slide className='slide-import' autoplay={false} transitionDuration={750} arrows={true} indicators={true}>
        {calc10.map((property, index) => {
          {
            property.property_images.map((images, index) => {
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
                </>
              )
            })
          }
        })
        }
      </Slide>


    </>
  )

}


export default ImageSlider