import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/nav/Navbar'
import { ROLES } from '../../constants'

function StaffOutlet() {
  // call staff api end points here
  // pass data to navbar and outlet so all the child components can share
  const role = JSON.parse(localStorage.getItem('role'))
  const staffId = JSON.parse(localStorage.getItem('staffId'))
  return (
    <>
      <Navbar role={role} />
      <Outlet context={{ role: role, staffId: staffId }} />
    </>
  )
}

export default StaffOutlet
