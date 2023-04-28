import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import LivingAdminInputs from '../../profile/adminComponents/LivingAdminInputs'
import { isUserAuth, getUserToken, getAccessToken } from '../../auth/Auth'
import { Modal } from 'react-bootstrap'




const EditAdminInputs = ({ livingDetails, setLivingDetails, handleEditAdminClose, editModal }) => {

  // state to enable navigation between pages
  const navigate = useNavigate()

  // defining state for editing the admin details
  const [editDetails, setEditDetails] = useState()

  // load in data for the edit details
  useEffect(() => {
    setEditDetails(livingDetails)
    console.log('loading edit details - >', livingDetails)
  }, [])


  // // Modal 2: edit admin features
  // // states for the edit modal
  // const [editAdminShow, setEditAdminShow] = useState(false)

  // // close modal
  // const handleEditAdminClose = () => {
  //   setEditAdminShow(false)
  // }

  // // show modal
  // const handleEditAdminShow = () => {
  //   setEditAdminShow(true)
  // }


  // create edit search
  const postAdminEdit = async (e) => {
    try {
      const formData = {
        email_address: editDetails.email_address,
        longitude: editDetails.longitude,
        latitude: editDetails.latitude,
        email_status: editDetails.email_status,
        subscription_type: editDetails.subscription_type,
        admin_status: editDetails.admin_status,
        lifestyle_status: editDetails.lifestyle_status,
        property_status: editDetails.property_status,
        id: editDetails.id,
        owner: editDetails.owner,
        admin_populated: editDetails.admin_populated,
        mortgage_status: editDetails.mortgage_status,
        mortgage_provider: editDetails.mortgage_provider,
        mortgage_value: editDetails.mortgage_value,
        mortgage_date: editDetails.mortgage_date,
        nmortgage_notes: editDetails.mortgage_notes,
        boiler_status: editDetails.boiler_status,
        boiler_provider: editDetails.sboiler_provider,
        boiler_value: editDetails.boiler_value,
        boiler_date: editDetails.boiler_date,
        boiler_notes: editDetails.boiler_notes,
        insurance_status: editDetails.insurance_status,
        insurance_provider: editDetails.insurance_provider,
        insurance_value: editDetails.insurance_value,
        insurance_date: editDetails.insurance_date,
        insurance_notes: editDetails.insurance_notes,
        energy_status: editDetails.energy_status,
        energy_detail: editDetails.energy_detail,
        energy_provider: editDetails.energy_provider,
        energy_value: editDetails.energy_value,
        energy_date: editDetails.energy_date,
        energy_notes: editDetails.energy_notes,
        gas_provider: editDetails.gas_provider,
        gas_value: editDetails.gas_value,
        gas_date: editDetails.gas_date,
        gas_notes: editDetails.gas_notes,
        electric_provider: editDetails.electric_provider,
        electric_value: editDetails.electric_value,
        electric_date: editDetails.electric_date,
        electric_notes: editDetails.electric_notes,
        council_tax_status: editDetails.council_tax_status,
        council_tax_value: editDetails.council_tax_value,
        council_tax_date: editDetails.council_tax_date,
        council_tax_notes: editDetails.council_tax_notes,
        broadband_status: editDetails.broadband_status,
        broadband_provider: editDetails.broadband_provider,
        broadband_value: editDetails.broadband_value,
        broadband_date: editDetails.broadband_date,
        broadband_notes: editDetails.broadband_notes,
        sky_status: editDetails.sky_status,
        sky_provider: editDetails.sky_provider,
        sky_value: editDetails.sky_value,
        sky_date: editDetails.sky_date,
        sky_notes: editDetails.sky_notes,
        netflix_status: editDetails.netflix_status,
        netflix_value: editDetails.netflix_value,
        netflix_date: editDetails.netflix_date,
        netflix_notes: editDetails.netflix_notes,
        amazon_status: editDetails.amazon_status,
        amazon_value: editDetails.amazon_value,
        amazon_date: editDetails.amazon_date,
        amazon_notes: editDetails.amazon_notes,
        disney_status: editDetails.disney_status,
        disney_value: editDetails.disney_value,
        disney_date: editDetails.disney_date,
        disney_notes: editDetails.disney_notes,
        apple_status: editDetails.apple_status,
        apple_value: editDetails.apple_value,
        apple_date: editDetails.apple_date,
        apple_notes: editDetails.apple_notes,
        tv_status: editDetails.tv_status,
        tv_value: editDetails.tv_value,
        tv_date: editDetails.tv_date,
        tv_notes: editDetails.tv_notes,
        phone_status: editDetails.phone_status,
        phone_provider: editDetails.phone_provider,
        phone_value: editDetails.phone_value,
        phone_date: editDetails.phone_date,
        phone_notes: editDetails.phone_notes,
        gym_status: editDetails.gym_status,
        gym_provider: editDetails.gym_provider,
        gym_value: editDetails.gym_value,
        gym_date: editDetails.gym_date,
        gym_notes: editDetails.gym_notes,
        other_status_1: editDetails.other_status_1,
        other_type_1: editDetails.other_type_1,
        other_provider_1: editDetails.other_provider_1,
        other_value_1: editDetails.other_value_1,
        other_date_1: editDetails.other_date_1,
        other_notes_1: editDetails.other_notes_1,
        other_status_2: editDetails.other_status_2,
        other_type_2: editDetails.other_type_2,
        other_provider_2: editDetails.other_provider_2,
        other_value_2: editDetails.other_value_2,
        other_date_2: editDetails.other_date_2,
        other_notes_2: editDetails.other_notes_2,
        other_status_3: editDetails.other_status_3,
        other_type_3: editDetails.other_type_3,
        other_provider_3: editDetails.other_provider_3,
        other_value_3: editDetails.other_value_3,
        other_date_3: editDetails.other_date_3,
        other_notes_3: editDetails.other_notes_3,
      }
      const { data } = await axios.put(`/api/living/edit/${parseInt(editDetails.id)}`, formData, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      })
      const storage = JSON.stringify(data)
      window.localStorage.setItem('wittle-living-data', storage)
      console.log('wittle living info ->', data)
      setLivingDetails(data)
      handleEditAdminClose()
    } catch (err) {
      // setErrors(err)
      console.log(err)
      console.log(err.response.data)
    }
  }

  return (
    <>

      <LivingAdminInputs
        livingSubmit={postAdminEdit}
        livingData={editDetails}
        setLivingData={setEditDetails}
        title1='Make changes to your admin inputs'
        title2='Add, remove or update your entries'
        title3='Bills you are tracking'
        submit1='Happy with your selections? Reload the portal'
        submit2=''
        editModal={editModal}
        handleEditAdminClose={handleEditAdminClose}
      />

    </>
  )
}

export default EditAdminInputs