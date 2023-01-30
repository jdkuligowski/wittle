import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Register = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirmation: '',
    first_name: '',
    last_name: '',
  })

  const [errors, setErrors] = useState({
    email: '',
    username: '',
    password: '',
    passwordConfirmation: '',
    // first_name: '',
    // last_name: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    console.log(e.target.name)
    console.log(e.target.value)
    setErrors({ ...errors, [e.target.name]: '' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/auth/register/', formData)
      navigate('/login')
    } catch (err) {
      setErrors(err.response.status + ' ' + err.response.statusText)
    }
  }



  return (

    <section className='login-page'>
      <section className='register-content'>
        <form className='form-detail' onSubmit={handleSubmit} >
          <h1>Unlock the benefits of Wittle</h1>
          <p>Set up an account to help you find the perfect home</p>
          <hr />
          {/* First_name */}
          <label htmlFor='first_name'></label>
          <input type='text' name='first_name' className='input' placeholder='First name' value={formData.first_name} onChange={handleChange} />
          {/* Last name */}
          <label htmlFor='last_name'></label>
          <input type='text' name='last_name' className='input' placeholder='Last name' value={formData.last_name} onChange={handleChange} />
          {/* Username */}
          <label htmlFor='username'></label>
          <input type='text' name='username' className='input' placeholder='username' value={formData.username} onChange={handleChange} />
          {errors && <p className = 'denied-text'>Please input username</p>}
          {/* Email */}
          <label htmlFor='email'></label>
          <input type='email' name='email' className='input' placeholder='Email' value={formData.email} onChange={handleChange} />
          {/* {errors && <p className = 'denied-text'>Please input email</p>} */}
          {/* Password */}
          <label htmlFor='password'></label>
          <input type='password' name='password' className='input' placeholder='Password' value={formData.password} onChange={handleChange} />
          {/* {errors && <p className = 'denied-text'>Please input password</p>} */}
          {/* Password Confirmation */}
          <label htmlFor='passwordConfirmation'></label>
          <input type='password' name='passwordConfirmation' className='input' placeholder='Password confirmation' value={formData.passwordConfirmation} onChange={handleChange} />
          {/* Submit */}
          {/* <hr/> */}
          <button type='submit'>Register</button>
        </form>
      </section>
    </section>

  )
}

export default Register