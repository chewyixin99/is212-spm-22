import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/nav/Navbar'
import { ROLES } from '../../constants'

const StaffOutlet = () => {
    // call staff api end points here and pass to navbar and outlet so all the child components can share
  return (
    <>
        <Navbar role={ ROLES.STAFF } />
        <Outlet context={{ role: ROLES.STAFF }}/>
    </>

  )
}


export default StaffOutlet