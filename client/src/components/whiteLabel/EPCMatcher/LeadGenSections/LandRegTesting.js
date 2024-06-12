import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import { CSVLink } from 'react-csv'
import { getUserToken, isUserAuth, getAccessToken } from '../../../auth/Auth'
import Select from 'react-select'
import ArchivedPropertiesModal from '../../b2bModals/ArchivedPropertiesModal'
import Swal from 'sweetalert2'
import Loading from '../../../helpers/Loading'


const LandRegTesting = () => {

  // state to enable navigation between pages
  const navigate = useNavigate()

  const [testOuput, setTestOutput] = useState('')




  // ? Test scenario 1
  // Test 1a - Property description search
  const searchProperty1a = async () => {
    const requestData = {
      user_id: 'BGUser001',
      password: 'landreg001',
      message_id: 'unique_message_id',
      external_reference: 'external_reference',
      customer_reference: 'customer_reference',
      building_number: '99',
      postcode: 'TQ56 4HY',
    }

    try {
      const res = await axios.post('/api/land_reg_deeds/test1a/search_property_description/', requestData)
      setTestOutput(res.data)
    } catch (error) {
      console.error('There was an error!', error)
    }
  }

  return (

    <>

      <section className='land-reg-testing'>
        <div className='testing-wrapper'>
          <div className='land-reg-test-buttons'>
            <button className='test-button' onClick={searchProperty1a}>Test 1a - Property description search</button>

          </div>
          <div className='land-reg-output'>
            <div className='test-outputs'>
              <h3>{testOuput ? testOuput : ''}</h3>
            </div>

          </div>
        </div>


      </section>

    </>
  )
}

export default LandRegTesting