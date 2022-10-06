import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/nav/Navbar'
import { ROLES } from '../../constants'

function StaffOutlet() {
  // call staff api end points here
  // pass data to navbar and outlet so all the child components can share
  return (
    <>
      <Navbar role={ROLES.STAFF} />
      <Outlet context={{ role: ROLES.STAFF }} />
    </>
  )
}

export default StaffOutlet
