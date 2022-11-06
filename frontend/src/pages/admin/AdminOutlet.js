import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/nav/Navbar'

function AdminOutlet() {
  const role = JSON.parse(localStorage.getItem('role'))
  const staffId = JSON.parse(localStorage.getItem('staffId'))
  return (
    <>
      <Navbar role={role} />
      <Outlet context={{ role: role, staffId: staffId }} />
    </>
  )
}

export default AdminOutlet
