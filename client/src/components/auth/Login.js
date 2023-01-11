import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'



const Login = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState(false)

  const setUserTokenToLocalStorage = (token) => {
    window.localStorage.setItem('wittle-user-token', token)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await axios.post('/api/auth/login/', formData)
      console.log(formData)
      setUserTokenToLocalStorage(data.token)
      //console.log(data.token)
      console.log({ data })
      window.localStorage.setItem('wittle-username', data.username)
      navigate('/')
    } catch (error) {
      setErrors(true)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors(false)
  }



  return (
    <section className='login-page'>
      <section className='login-content'>
        <section className='form-section'>
          <form className='form-detail' onSubmit={handleSubmit}>
 
            <h1>Wittle</h1>
            <p>Log in to your account</p>
            <hr />
            {/* Email */}
            <label htmlFor='email'></label>
            <input type='email' name='email' className='input' placeholder='Email' value={formData.email} onChange={handleChange} />
            {/* Password */}
            <label htmlFor='password'></label>
            <input type='password' name='password' className='input' placeholder='Password' value={formData.password} onChange={handleChange} />
            {/* {errors && <p className='denied-text'>Please enter the correct login details</p>} */}
            {/* Submit */}
            <button className='sign-up' type='submit'>Sign in</button>
            <h5>Don&apos;t have an account yet? <Link to={'/register'}>
              <span>Sign up</span></Link> </h5>
            {/* <button className = 'sign-in'>Sign up</button> */}
          </form>
        </section>
        <section className='login-overview'>
          <h1>Set up an account to unlock all of the potential Wittle has to offer</h1>
          <Link to={'/register'}><button>Set up account</button></Link>
        </section>
      </section>
    </section>
  )
}

export default Login

