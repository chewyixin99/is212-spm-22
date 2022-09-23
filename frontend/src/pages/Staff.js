import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Staff = () => {
    // call staff api end points here and pass to navbar and outlet so all the child components can share
  return (
    <>
        <Navbar role='staff' />
        <Outlet context={{role: 'staff'}}/>
    </>

  )
}


export default Staff