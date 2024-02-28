import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getUserToken, getAccessToken, isUserAuth } from '../../auth/Auth'
import { Modal } from 'react-bootstrap'
import NormalPropertySearchModal from './NormalPropertySearchModal'




const MenuModal = ({ menuShow, handleMenuClose, setMenuShow, removeItemFromStorage }) => {

  // state to enable navigation between pages
  const navigate = useNavigate()

  // manageing the modal pop up for property search
  const [propertySearch, setPropertySearch] = useState(false)

  // close modal
  const handleSearchClose = () => {
    setPropertySearch(false)
  }

  // show the modal
  const handleSearchShow = (e) => {
    setPropertySearch(true)
    handleMenuClose()
  }


  // ? Functions for where each link takes the user
  // home
  const goConsumers = () => {
    navigate('/home-searchers')
    handleMenuClose()
  }

  // profile
  const goProfile = () => {
    navigate('/profile')
    handleMenuClose()
  }

  // wittle search
  const goWittleSearch = () => {
    navigate('/wittle-search/fields')
    handleMenuClose()
  }

  // about Wittle search
  const goAboutSearch = () => {
    navigate('/wittle-search')
    handleMenuClose()
  }

  // about Wittle search
  const goAgents = () => {
    navigate('/')
    handleMenuClose()
  }

  // login
  const goLogin = () => {
    navigate('/login')
    handleMenuClose()
  }

  // insights
  const goInsights = () => {
    navigate('/blogs/school-search-simplified')
    handleMenuClose()
  }

  return (
    <>
      <Modal show={menuShow} onHide={handleMenuClose} backdrop='static' className='menu-modal' onExited={() => setMenuShow(false)} animation={true}>
        <Modal.Body>
          <div className='menu-header'>
            <h1 onClick={handleMenuClose}>X</h1>

          </div>
          <div className='menu-body'>
            {/* <h1 onClick={goProfile}>My property hub</h1>
            <h1 onClick={goWittleSearch}>New Wittle Search</h1>
            <h1 onClick={handleSearchShow}>New Property Search</h1> */}
            {/* <h1 onClick={goAgents}>For agents </h1>
            <h1 onClick={goConsumers}>For home searchers </h1>
            <h1 onClick={goInsights}>Insights </h1> */}
            {/* <h1 onClick={goAboutSearch}>About</h1>
            <h1>Terms</h1> */}
            {isUserAuth() ? <h1 className='action' onClick={removeItemFromStorage}>Log out</h1> : <h1 className='action' onClick={goLogin}>Agent login</h1>}
          </div>
        </Modal.Body>
      </Modal>
      <NormalPropertySearchModal
        propertySearch={propertySearch}
        handleSearchClose={handleSearchClose}
      />
    </>
  )
}

export default MenuModal