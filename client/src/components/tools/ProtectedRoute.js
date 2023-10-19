import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios' // assuming you're using axios for HTTP requests
import { getAccessToken, getUserToken, isUserAuth } from '../auth/Auth'
// import { getAccessToken, getUserToken, isUserAuth } from './components/auth/Auth'




const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()
  const [userData, setUserData] = useState()
  const [errors, setErrors] = useState()



  useEffect(() => {
    if (isUserAuth()) {
      const getUser = async () => {
        try {
          const { data } = await axios.get(`/api/auth/profile/${getUserToken()}/`, {
            headers: {
              Authorization: `Bearer ${getAccessToken()}`,
            },
          })
          setUserData(data)
        } catch (error) {
          setErrors(true)
          console.log(error)
        }
      }
      getUser()
    } else {
      navigate('/access-denied')
      console.log('no account')
    }
  }, [])

  return (
    <>
      {React.cloneElement(children, { userData })}
    </>
  )
}

export default ProtectedRoute
