import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/nav/Navbar'
import { ROLES } from '../../constants'

const AdminOutlet = () => {
  return (
    <>
      <Navbar role={ ROLES.ADMIN } />
      <Outlet context={{ role: ROLES.ADMIN }} />
    </>
  )
}

export default AdminOutlet;
