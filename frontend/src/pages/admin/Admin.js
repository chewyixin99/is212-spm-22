import React from 'react'
import { Outlet } from 'react-router-dom'

const Admin = () => {
  return (
    <>
    <Outlet context={{ role: "admin"}} />
    </>
  )
}

export default Admin